// Run with: node --test demo-core.test.js
const test = require("node:test");
const assert = require("node:assert");
const { createTreatment, createProcedure, createHeart, createSurgery, createQte, createDialogue, createFighterCase } = require("./demo-core.js");

const SURGERY_STEPS = [
  { name: "Stop the bleeding", kind: "medical", bpm: 88, ask: "Q1", answers: ["a", "b", "c"] },
  { name: "Deactivate the cyberware", kind: "cyber", alert: true },
  { name: "Reconnect the cyberware", kind: "cyber", bpm: 72 },
];
function surgery(options) {
  return createSurgery(Object.assign({ steps: SURGERY_STEPS, promptsPerStep: 2, windowSeconds: 1 }, options));
}
// Plays key prompts until the given events have happened or the surgery waits for a decision.
function advance(su, until) {
  const seen = [];
  for (let i = 0; i < 5000; i++) {
    if (su.state.phase === "treat" && su.proc.state.phase === "ready") su.proc.begin();
    const key = su.prompt();
    const input = key ? { press: { [key.button]: true }, held: { [key.button]: true } } : {};
    for (const e of su.update(0.05, input)) {
      seen.push(e.type);
      if (e.type === until) return seen;
    }
  }
  throw new Error(`never saw ${until}: ${seen.join()}`);
}

test("heart: the rate moves to its target, an alarm makes beats irregular, and a skipped beat is flat", () => {
  const h = createHeart({ bpm: 100, random: () => 0.5 });
  h.setTarget(70);
  for (let i = 0; i < 400; i++) h.update(0.05);
  assert.ok(Math.abs(h.state.bpm - 70) < 1);

  let n = 0;
  const steady = createHeart({ bpm: 60 });
  for (let i = 0; i < 1000; i++) if (steady.update(0.01)) n += 1;
  assert.ok(n >= 9 && n <= 10, `60 bpm over 10 s gave ${n}`);

  const rand = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
  const a = createHeart({ bpm: 180, random: () => rand.shift() ?? 0.5 });
  a.alarm(180);
  const gaps = [];
  let since = 0;
  for (let i = 0; i < 400; i++) {
    since += 0.01;
    if (a.update(0.01)) { gaps.push(since); since = 0; }
  }
  assert.ok(Math.max(...gaps.slice(1, 6)) > Math.min(...gaps.slice(1, 6)) * 1.5, `gaps ${gaps.slice(1, 6)}`);

  const skip = createHeart({ bpm: 60 });
  skip.skipBeat();
  let skipped = 0;
  for (let i = 0; i < 300; i++) {
    skip.update(0.01);
    if (skip.state.skipping) { skipped += 1; assert.equal(skip.value(), 0); }
  }
  assert.ok(skipped > 50);
});

test("surgery: a checkpoint waits for its answer, then the deactivate step forces the alert and the hack", () => {
  const su = surgery();
  advance(su, "checkpoint");
  assert.equal(su.state.phase, "checkpoint");
  assert.ok(!su.canLeave());
  su.answer("a");
  assert.equal(su.state.phase, "treat");
  assert.equal(su.heart.state.target, 88);
  const seen = advance(su, "hackStart");
  assert.ok(seen.includes("alert"));
  assert.ok(su.heart.state.erratic);
  assert.ok(su.heart.state.target > 150);
  assert.equal(su.state.phase, "hack");
  assert.ok(!su.canLeave());
});

test("surgery: every specialty plays the forced hack", () => {
  for (const spec of ["Netrunning", "Tech", "Enforcer"]) {
    const su = surgery({ spec });
    advance(su, "checkpoint");
    su.answer("a");
    advance(su, "hackStart");
    assert.equal(su.state.phase, "hack");
  }
});

test("surgery: a forced hack that works carries on, and a failure brings the companion in and costs reputation", () => {
  const good = surgery();
  advance(good, "checkpoint");
  good.answer("a");
  advance(good, "hackStart");
  assert.deepEqual(good.hackFinished(true), []);
  assert.equal(good.state.phase, "treat");
  assert.equal(good.heart.state.erratic, false);
  assert.equal(good.state.repLost, 0);

  const bad = surgery();
  advance(bad, "checkpoint");
  bad.answer("a");
  advance(bad, "hackStart");
  assert.equal(bad.hackFinished(false)[0].type, "companionStart");
  assert.equal(bad.state.phase, "companion");
  assert.ok(bad.heart.state.erratic, "the alarm runs until the companion is done");
  advance(bad, "companionDone");
  assert.equal(bad.state.phase, "treat");
  assert.equal(bad.heart.state.erratic, false);
  assert.equal(bad.state.repLost, 1);
  assert.equal(bad.proc.state.misses, 0, "the penalty is reputation, not a complication");
  assert.equal(bad.proc.current().name, "Reconnect the cyberware");
});

function toDoubt(options) {
  const su = surgery(options);
  advance(su, "checkpoint");
  su.answer("a");
  advance(su, "hackStart");
  su.hackFinished(true);
  const seen = advance(su, "doubt");
  assert.ok(seen.includes("diagnostics"));
  assert.ok(seen.includes("passed"));
  return su;
}

test("surgery: saying it's fine ends the case with the malware missed", () => {
  const su = toDoubt();
  su.doubt(false);
  assert.equal(su.state.phase, "closed");
  assert.equal(su.state.outcome, "missed");
});

function toFound(options) {
  const su = toDoubt(options);
  su.doubt(true);
  advance(su, "found");
  return su;
}

test("surgery: a hacker chooses at removal, and nothing starts until they do", () => {
  const su = toFound();
  assert.equal(su.decide("remove")[0].type, "removalChoice");
  assert.equal(su.state.phase, "removalChoice");
  for (let i = 0; i < 100; i++) su.update(0.05, {});
  assert.equal(su.state.phase, "removalChoice", "it waits for the player");
  assert.equal(su.state.removedBy, null);
});

test("surgery: doing the removal hack yourself earns more reputation than the companion", () => {
  const self = toFound();
  self.decide("remove");
  assert.equal(self.removalChoice(true)[0].type, "removalHackStart");
  assert.equal(self.state.phase, "removalHack");
  self.removalHackFinished(true);
  assert.equal(self.state.removedBy, "self");
  assert.equal(self.repGained(), 2);

  const helped = toFound();
  helped.decide("remove");
  assert.equal(helped.removalChoice(false)[0].type, "companionStart");
  advance(helped, "removed");
  assert.equal(helped.state.removedBy, "companion");
  assert.equal(helped.repGained(), 1);
});

test("surgery: a failed removal hack brings the companion in, still removes the malware, and costs reputation", () => {
  const su = toFound();
  su.decide("remove");
  su.removalChoice(true);
  const events = su.removalHackFinished(false);
  assert.equal(events[0].type, "companionStart");
  assert.equal(events[0].failed, true);
  advance(su, "removed");
  assert.equal(su.state.phase, "closed");
  assert.equal(su.state.outcome, "remove");
  assert.equal(su.state.removedBy, "companion");
  assert.equal(su.proc.state.misses, 0);
  assert.equal(su.repGained(), 0);
  assert.equal(su.heart.state.erratic, false);
});

test("surgery: leaving the malware in still pays +1 now, and sets up the rumor", () => {
  const missed = toDoubt();
  missed.doubt(false);
  assert.equal(missed.repGained(), 1);
  assert.ok(missed.rumorLater());

  const ignored = toFound();
  ignored.decide("ignore");
  assert.equal(ignored.repGained(), 1);
  assert.ok(ignored.rumorLater());

  const told = toFound();
  told.decide("tell");
  assert.ok(!told.rumorLater());

  const removed = toFound();
  removed.decide("remove");
  removed.removalChoice(false);
  advance(removed, "removed");
  assert.ok(!removed.rumorLater());
});

test("surgery: failing both hacks can take reputation below zero", () => {
  const su = surgery();
  advance(su, "checkpoint");
  su.answer("a");
  advance(su, "hackStart");
  su.hackFinished(false);
  advance(su, "doubt");
  su.doubt(true);
  advance(su, "found");
  su.decide("remove");
  su.removalChoice(true);
  su.removalHackFinished(false);
  advance(su, "removed");
  assert.equal(su.repGained(), -1);
});

test("surgery: for a Tech or Enforcer, the companion does the removal with no choice", () => {
  for (const spec of ["Tech", "Enforcer"]) {
    const su = toFound({ spec });
    const events = su.decide("remove");
    assert.equal(events[0].type, "companionStart");
    assert.equal(events[0].failed, false);
    advance(su, "removed");
    assert.equal(su.state.removedBy, "companion");
    assert.equal(su.repGained(), 1);
  }
});

test("surgery: a second run repeats the same numbers, finds the malware and skips a beat, and tell or ignore close the case", () => {
  for (const decision of ["tell", "ignore"]) {
    const su = toDoubt();
    const first = JSON.stringify(su.state.results);
    assert.equal(su.doubt(true)[0].run, 2);
    advance(su, "found");
    assert.equal(JSON.stringify(su.state.results), first);
    assert.ok(su.heart.state.skipNext || su.heart.state.skipping);
    su.decide(decision);
    assert.equal(su.state.outcome, decision);
    assert.equal(su.state.phase, "closed");
  }
});

test("surgery: with checkpoints off, steps close with no choice", () => {
  const su = surgery({ checkpoints: false });
  const seen = advance(su, "hackStart");
  assert.ok(!seen.includes("checkpoint"));
});

test("surgery: the bar covers every step plus diagnostics and ends full", () => {
  const su = toDoubt();
  const bar = su.barState();
  assert.equal(bar.steps.length, 4);
  assert.equal(bar.steps.at(-1).name, "Run diagnostics");
  assert.equal(bar.index, 4);
});

const PROC_STEPS = [
  { name: "Stop the bleeding", kind: "medical", needs: "clamp" },
  { name: "Fix the arm", kind: "cyber" },
];
// Answers every prompt the moment it shows, or misses them all if answer is false.
function runStep(p, answer) {
  const events = [];
  for (let i = 0; i < 2000 && p.state.phase === "process"; i++) {
    const prompt = p.prompt();
    const input = prompt && answer ? { press: { [prompt.button]: true }, held: { [prompt.button]: true } } : {};
    events.push(...p.update(0.05, input));
  }
  return events;
}

test("procedure: a missing part blocks the step until given or waived", () => {
  const p = createProcedure({ steps: PROC_STEPS });
  assert.ok(p.blocked());
  assert.equal(p.begin(), false);
  assert.equal(p.state.phase, "ready");
  p.give("clamp");
  assert.ok(p.begin());
  const w = createProcedure({ steps: PROC_STEPS });
  w.goWithout();
  assert.ok(w.begin());
});

test("procedure: QTEs fill the step, it ends on a hold, and the player is locked until the choice", () => {
  const p = createProcedure({ steps: PROC_STEPS, promptsPerStep: 3 });
  p.give("clamp");
  assert.ok(p.canLeave());
  p.begin();
  assert.ok(!p.canLeave());
  assert.equal(p.state.qte.cfg.prompts.at(-1).type, "hold");
  assert.ok(p.state.qte.cfg.prompts.slice(0, -1).every((x) => x.type === "press"));
  const events = runStep(p, true);
  assert.equal(events.at(-1).type, "checkpoint");
  assert.equal(p.state.progress, 1);
  assert.equal(p.state.phase, "checkpoint");
  assert.ok(!p.canLeave());
  assert.equal(p.state.index, 0, "the step stays open until the choice");
});

test("procedure: the choice closes the step, is logged, and the last one finishes the case", () => {
  const p = createProcedure({ steps: PROC_STEPS, promptsPerStep: 2 });
  p.give("clamp");
  p.begin();
  runStep(p, true);
  assert.ok(p.choose("Hold still."));
  assert.equal(p.state.index, 1);
  assert.equal(p.state.phase, "ready");
  assert.ok(p.canLeave());
  p.begin();
  runStep(p, true);
  p.choose("Full price.");
  assert.ok(p.done());
  assert.deepEqual(p.state.stepLog.map((x) => x.choice), ["Hold still.", "Full price."]);
});

test("procedure: misses are counted and the step still reaches its checkpoint", () => {
  const p = createProcedure({ steps: PROC_STEPS, promptsPerStep: 3, windowSeconds: 0.2 });
  p.give("clamp");
  p.begin();
  const events = runStep(p, false);
  assert.equal(p.state.misses, 3);
  assert.equal(p.state.hits, 0);
  assert.equal(events.at(-1).type, "checkpoint");
});

test("procedure: Tech gets one prompt fewer on cyberware, never below two, and buttons do not repeat", () => {
  const p = createProcedure({ steps: PROC_STEPS, promptsPerStep: 6, tech: true });
  p.give("clamp");
  p.begin();
  const medical = p.state.qte.cfg.prompts;
  assert.equal(medical.length, 6);
  for (let i = 1; i < medical.length; i++) assert.notEqual(medical[i].button, medical[i - 1].button);
  runStep(p, true);
  p.choose("x");
  p.begin();
  assert.equal(p.state.qte.cfg.prompts.length, 5);
  const low = createProcedure({ steps: [PROC_STEPS[1]], promptsPerStep: 2, tech: true });
  low.begin();
  assert.equal(low.state.qte.cfg.prompts.length, 2);
});

const STEPS = [
  { name: "Stop the bleeding", critical: true, kind: "medical", needs: "clamp" },
  { name: "Remove the bullet", critical: false, kind: "medical" },
  { name: "Disconnect the arm", critical: true, kind: "cyber" },
];

test("treatment: a part blocks its step until given or waived", () => {
  const t = createTreatment({ steps: STEPS });
  assert.ok(t.blocked());
  assert.equal(t.update(5, true).length, 0);
  assert.equal(t.state.progress, 0);
  t.give("clamp");
  assert.ok(!t.blocked());
  const w = createTreatment({ steps: STEPS });
  w.goWithout();
  assert.ok(!w.blocked());
});

test("treatment: a critical step locks the player once started, and a safe one does not", () => {
  const t = createTreatment({ steps: STEPS, segmentSeconds: 2 });
  t.give("clamp");
  assert.ok(t.canLeave());
  t.update(1, true);
  assert.ok(!t.canLeave());
  t.update(0, false);
  assert.ok(!t.canLeave(), "letting go does not free the player");
  t.update(1, true);
  assert.equal(t.state.index, 1);
  t.update(0, false);
  t.update(1, true);
  t.update(0, false);
  assert.ok(t.canLeave(), "a non-critical step can be left part way");
});

test("treatment: the fill never drains, and the hold pauses at each checkpoint", () => {
  const t = createTreatment({ steps: STEPS, segmentSeconds: 2 });
  t.give("clamp");
  t.update(1, true);
  t.update(5, false);
  assert.equal(t.state.progress, 0.5);
  assert.equal(t.update(1, true)[0].type, "stepDone");
  t.update(1, true);
  assert.equal(t.state.progress, 0, "must let go at the checkpoint");
  t.update(0.1, false);
  t.update(1, true);
  assert.equal(t.state.progress, 0.5);
});

test("treatment: Tech is faster on cyberware steps only, and skips nothing", () => {
  const t = createTreatment({ steps: STEPS, segmentSeconds: 2, tech: true, techFactor: 0.5 });
  assert.equal(t.secondsFor(STEPS[0]), 2);
  assert.equal(t.secondsFor(STEPS[2]), 1);
  assert.equal(t.state.steps.length, 3);
});

test("treatment: the rig does one medical step unattended, once", () => {
  const t = createTreatment({ steps: STEPS.slice(1), segmentSeconds: 1, rig: true });
  assert.ok(t.startRig());
  assert.ok(t.canLeave());
  const events = t.update(1.1, false);
  assert.equal(events[0].name, "Remove the bullet");
  assert.ok(!t.canUseRig());
  assert.equal(t.state.heldSeconds, 0);
});

test("treatment: an inserted step runs next and completion is reported", () => {
  const t = createTreatment({ steps: [{ name: "Close", kind: "medical" }], segmentSeconds: 1 });
  t.insertStep({ name: "Remove malware", critical: true, kind: "cyber" });
  assert.equal(t.update(1.1, true)[0].name, "Remove malware");
  t.update(0, false);
  const last = t.update(1.1, true);
  assert.deepEqual(last.map((e) => e.type), ["stepDone", "done"]);
});

const PROMPTS = [{ lead: 1, type: "press", button: "x" }, { lead: 1, type: "hold", button: "a" }];

test("qte: the scene slows only during a prompt", () => {
  const q = createQte({ prompts: PROMPTS, sceneSpeed: 0.3 });
  q.update(0.5);
  assert.equal(q.state.sceneTime, 0.5);
  q.update(0.6);
  assert.equal(q.state.phase, "prompt");
  const t = q.state.sceneTime;
  q.update(1);
  assert.ok(Math.abs(q.state.sceneTime - t - 0.3) < 1e-9);
});

test("qte: a press in time hits, a late one misses, the wrong button does nothing, and play continues", () => {
  const q = createQte({ prompts: [PROMPTS[0]], windowSeconds: 2 });
  q.update(1.1);
  q.update(0.1, { press: { y: true } });
  assert.equal(q.state.phase, "prompt");
  assert.equal(q.update(0.1, { press: { x: true } })[0].type, "hit");

  const late = createQte({ prompts: PROMPTS, windowSeconds: 2 });
  late.update(1.1);
  assert.equal(late.update(2.1)[0].type, "miss");
  late.update(0.6);
  assert.equal(late.state.index, 1, "a miss still moves on");
});

test("qte: a hold must be kept up, and the window stops while holding", () => {
  const q = createQte({ prompts: [{ lead: 0, type: "hold", button: "a" }], windowSeconds: 0.5, holdSeconds: 1 });
  q.update(0.01);
  q.update(0.4, { held: { a: true } });
  q.update(0.3, { held: { a: true } });
  assert.equal(q.state.phase, "prompt");
  assert.equal(q.update(0.4, { held: { a: true } })[0].type, "hit");
});

test("qte: assists return a hit", () => {
  const wait = createQte({ prompts: [PROMPTS[0]], assist: "wait", windowSeconds: 0.1 });
  wait.update(1.1);
  wait.update(100);
  assert.equal(wait.state.phase, "prompt");
  assert.equal(wait.update(0.1, { press: { x: true } })[0].type, "hit");

  const auto = createQte({ prompts: [PROMPTS[0]], assist: "auto" });
  assert.deepEqual(auto.update(1.1).map((e) => e.type), ["prompt", "hit"]);

  const tap = createQte({ prompts: [{ lead: 0, type: "hold", button: "a" }], tapIsHold: true });
  tap.update(0.01);
  assert.equal(tap.update(0.01, { press: { a: true } })[0].type, "hit");
});

const NODES = {
  one: { seconds: 5, defaultChoice: 1, choices: [{ label: "L", next: "two", flag: "left" }, { label: "M", next: "two", flag: "mid" }, { label: "R", next: "two" }],
    spec: { Netrunning: { label: "Hack" } } },
  two: { seconds: 1, next: "three" },
  three: { seconds: 5, choices: [{ label: "End", next: null }] },
};

test("dialogue: three choices sit on X, Y and B, and the spec option adds A only if the player qualifies", () => {
  const net = createDialogue({ nodes: NODES, start: "one", spec: "Netrunning" });
  assert.deepEqual(net.options().map((o) => o.button), ["x", "y", "b", "a"]);
  const tech = createDialogue({ nodes: NODES, start: "one", spec: "Tech" });
  assert.deepEqual(tech.options().map((o) => o.button), ["x", "y", "b"]);
  const three = createDialogue({ nodes: NODES, start: "three" });
  assert.deepEqual(three.options().map((o) => o.button), ["a"]);
});

test("dialogue: a timeout picks the default, and the node then plays through", () => {
  const d = createDialogue({ nodes: NODES, start: "one" });
  const e = d.update(5.1);
  assert.equal(e[0].timedOut, true);
  assert.ok(d.state.flags.mid);
  assert.equal(d.state.node, "two");
  d.update(1.1);
  assert.equal(d.state.node, "three");
});

test("dialogue: the choice timer stops during a quick hack and resumes after", () => {
  const d = createDialogue({ nodes: NODES, start: "one", spec: "Netrunning" });
  assert.equal(d.update(0.1, { a: true })[0].type, "specStarted");
  assert.ok(d.state.hackLive);
  d.update(100);
  assert.equal(d.state.node, "one");
  assert.equal(d.options().some((o) => o.isSpec), false, "the option is used up");
  d.update(0.1, { x: true });
  assert.ok(d.state.flags.left, "the player can still answer during the hack");
  d.hackFinished(true);
  assert.ok(d.state.flags.hackWorked);
});

test("dialogue: the end is reported", () => {
  const d = createDialogue({ nodes: NODES, start: "three" });
  assert.equal(d.update(0.1, { a: true }).at(-1).type, "end");
  assert.ok(d.state.ended);
});

test("case: only a Tech crafts, and it costs one material", () => {
  const n = createFighterCase({ spec: "Netrunning" });
  assert.equal(n.craftClamp(), false);
  const t = createFighterCase({ spec: "Tech", materials: 1 });
  assert.equal(t.craftClamp(), true);
  assert.equal(t.state.materials, 0);
  assert.equal(t.canCraft(), false);
});

test("case: an asked-for clamp arrives at the table and leaves a return job, and low rep gets a substitute", () => {
  const c = createFighterCase({ spec: "Enforcer", rep: 1 });
  assert.ok(c.askClamp());
  assert.equal(c.state.clamp, false);
  assert.equal(c.returnToTable().length, 1);
  assert.ok(c.state.clamp);
  assert.equal(c.state.clampSubstitute, false);
  assert.ok(c.state.returnJob);
  const low = createFighterCase({ rep: 0 });
  low.askClamp();
  low.returnToTable();
  assert.ok(low.state.clampSubstitute);
});

test("case: fact routes open only after the suspicion, and each spec has its own", () => {
  const n = createFighterCase({ spec: "Netrunning" });
  assert.equal(n.talk(), false);
  n.state.suspicion = true;
  assert.ok(n.canSelfHack());
  assert.ok(!n.canTrace());
  const t = createFighterCase({ spec: "Tech" });
  t.state.suspicion = true;
  assert.ok(t.trace());
  assert.equal(t.state.fact, "full");
});

test("case: the Hacker Contact costs materials, and needs to be available", () => {
  const c = createFighterCase({ materials: 2 });
  c.state.suspicion = true;
  assert.ok(c.payHacker());
  assert.equal(c.state.materials, 0);
  const poor = createFighterCase({ materials: 1 });
  poor.state.suspicion = true;
  assert.ok(!poor.canPayHacker());
  const away = createFighterCase({ hackerAvailable: false });
  away.state.suspicion = true;
  assert.ok(!away.canPayHacker());
});

test("case: the Intel Contact's rumour arrives at the table, and asking for a clamp still works meanwhile", () => {
  const c = createFighterCase({ spec: "Enforcer" });
  c.state.suspicion = true;
  assert.ok(c.send());
  assert.ok(c.state.intelBusy);
  assert.ok(c.askClamp());
  c.returnToTable();
  assert.equal(c.state.fact, "partial");
  assert.equal(c.state.intelBusy, false);
});

test("case: a player with nothing can always reach the fact and finish", () => {
  const c = createFighterCase({ spec: "Enforcer", materials: 0, rep: 0, hackerAvailable: false });
  c.goWithoutClamp();
  c.state.suspicion = true;
  assert.ok(c.talk());
  c.choose("removed");
  assert.equal(c.state.removalMethod, "pulled the controller by hand");
  c.close(true);
  assert.ok(c.state.closed);
  assert.equal(c.state.marks, 1);
});

test("case: accepting a lockout sets noticed with less detail", () => {
  const c = createFighterCase({ spec: "Netrunning" });
  c.state.suspicion = true;
  c.hackAcceptCost();
  assert.equal(c.state.fact, "partial");
  assert.ok(c.state.noticed);
});

test("case: charging raises reputation, waiving adds a Medis mark", () => {
  const paid = createFighterCase({ rep: 1 });
  paid.close(false);
  assert.equal(paid.state.rep, 2);
  assert.equal(paid.state.marks, 0);
  const free = createFighterCase({ rep: 1 });
  free.close(true);
  assert.equal(free.state.rep, 1);
  assert.equal(free.state.marks, 1);
});

test("case: a return job pays materials, and a Tech gets more", () => {
  const e = createFighterCase({ spec: "Enforcer", materials: 0 });
  e.askClamp();
  assert.equal(e.doReturnJob(), 1);
  assert.equal(e.doReturnJob(), 0);
  const t = createFighterCase({ spec: "Tech", materials: 0 });
  t.askClamp();
  assert.equal(t.doReturnJob(), 2);
});

test("case: every disposition has a next beat", () => {
  for (const d of ["removed", "warned", "left in", "untreated"]) {
    const c = createFighterCase({});
    c.choose(d);
    assert.ok(c.beatText().length > 10);
  }
});
