// Run with: node --test demo-core.test.js
const test = require("node:test");
const assert = require("node:assert");
const { createTreatment, createProcedure, createHeart, createSurgery, readingSeconds, diagnosticLog, LOG_LINES_PER_CHECK, createQte, createDialogue, createFighterCase } = require("./demo-core.js");

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
    const key = su.prompt();
    const input = key ? { press: { [key.button]: true }, held: { [key.button]: true } } : {};
    for (const e of su.update(0.05, input)) {
      seen.push(e.type);
      if (e.type === until) return seen;
    }
    // The line before diagnostics has one answer, so tests that are going further give it.
    if (su.state.phase === "diagnosticsPrompt") seen.push(...su.runDiagnostics().map((e) => e.type));
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

// Plays up to the choice after the alert.
function toHackChoice(su) {
  advance(su, "checkpoint");
  su.answer("a");
  return advance(su, "hackChoice");
}

test("surgery: the deactivate step sets off the alert, then asks whether to hack it or hand it to the AI", () => {
  const su = surgery();
  advance(su, "checkpoint");
  assert.equal(su.state.phase, "checkpoint");
  assert.ok(!su.canLeave());
  su.answer("a");
  assert.equal(su.state.phase, "treat");
  assert.equal(su.heart.state.target, 88);
  const seen = advance(su, "hackChoice");
  assert.ok(seen.includes("alert"));
  assert.ok(su.heart.state.erratic);
  assert.equal(su.state.phase, "hackChoice");
  assert.ok(!su.canLeave());
  for (let i = 0; i < 200; i++) su.update(0.05, {});
  assert.equal(su.state.phase, "hackChoice", "it waits for the player");
  assert.equal(su.hackChoice(true)[0].type, "hackStart");
  assert.equal(su.state.phase, "hack");
});

test("surgery: every specialty can choose the hack or the AI", () => {
  for (const spec of ["Netrunning", "Tech", "Enforcer"]) {
    const hack = surgery({ spec });
    toHackChoice(hack);
    hack.hackChoice(true);
    assert.equal(hack.state.phase, "hack");
    const ai = surgery({ spec });
    toHackChoice(ai);
    assert.equal(ai.hackChoice(false)[0].type, "aiLoadingStart");
    assert.equal(ai.state.phase, "aiLoading");
  }
});

test("surgery: handing the alert to the AI charges materials, runs the loading screen and costs no XP", () => {
  const su = surgery({ materials: 3, aiCost: 2, aiLoadSeconds: 1 });
  toHackChoice(su);
  assert.deepEqual(su.hackChoice(false)[0], { type: "aiLoadingStart", job: "forced", cost: 2, left: 1 });
  assert.ok(su.barState().index < su.barState().steps.length, "the bar keeps its place");
  const seen = advance(su, "whatHappened");
  assert.ok(seen.includes("aiForcedDone"));
  assert.equal(su.state.hackResult, "ai");
  assert.equal(su.state.failedHacks, 0);
  assert.equal(su.heart.state.erratic, false);
});

test("surgery: failures during a hack raise the heart rate and it stays up, on both hacks", () => {
  const su = surgery();
  toHackChoice(su);
  su.hackChoice(true);
  for (let i = 0; i < 100; i++) su.update(0.05, {});
  const calm = su.heart.shownBpm();
  assert.ok(su.hackStrike());
  for (let i = 0; i < 100; i++) su.update(0.05, {});
  const one = su.heart.shownBpm();
  assert.ok(one >= calm + 15, `${calm} then ${one}`);
  su.hackStrike();
  assert.ok(su.heart.shownBpm() > one, "the jump is immediate");
  for (let i = 0; i < 100; i++) su.update(0.05, {});
  assert.ok(su.heart.shownBpm() >= one + 15);
  assert.equal(su.state.hackFailures, 2);
  assert.ok(su.heart.state.erratic);
  for (let i = 0; i < 10; i++) su.hackStrike();
  assert.ok(su.heart.state.target <= 220, "the rate has a ceiling");

  const removal = toFound();
  removal.decide("remove");
  removal.removalChoice(true);
  assert.ok(removal.hackStrike());

  const notHacking = surgery();
  assert.equal(notHacking.hackStrike(), false);
  assert.equal(notHacking.state.hackFailures, 0);
});

test("surgery: a forced hack that works waits until he is stable, then asks what happened", () => {
  const good = surgery();
  toHackChoice(good);
  good.hackChoice(true);
  su_hot(good);
  assert.deepEqual(good.hackFinished(true), []);
  assert.equal(good.state.phase, "settling");
  assert.equal(good.heart.state.erratic, false);
  good.update(0.05, {});
  assert.equal(good.state.phase, "settling", "not yet stable");
  advance(good, "whatHappened");
  assert.ok(good.heart.shownBpm() <= 99, "the monitor has left its warning colour");
  for (let i = 0; i < 100; i++) good.update(0.05, {});
  assert.equal(good.state.phase, "whatHappened", "it waits for the player");
  assert.ok(good.answerWhatHappened("x"));
  assert.equal(good.state.phase, "treat");
  assert.equal(good.state.whatHappened, "x");
  assert.equal(good.state.failedHacks, 0);
});

test("surgery: a failed forced hack brings the companion in, costs XP, and then he asks too", () => {
  const bad = surgery();
  toHackChoice(bad);
  bad.hackChoice(true);
  assert.equal(bad.hackFinished(false)[0].type, "companionStart");
  assert.equal(bad.state.phase, "companion");
  assert.ok(bad.heart.state.erratic, "the alarm runs until the companion is done");
  advance(bad, "companionDone");
  assert.equal(bad.state.phase, "settling");
  assert.equal(bad.heart.state.erratic, false);
  advance(bad, "whatHappened");
  bad.answerWhatHappened("x");
  assert.equal(bad.state.failedHacks, 1);
  assert.equal(bad.proc.state.misses, 0, "the penalty is XP, not a complication");
  assert.equal(bad.proc.current().name, "Reconnect the cyberware");
});

test("surgery: with checkpoints off, he doesn't ask and the treatment carries on once he is stable", () => {
  const su = surgery({ checkpoints: false });
  advance(su, "hackChoice");
  su.hackChoice(true);
  su.hackFinished(true);
  const seen = advance(su, "doubt");
  assert.ok(!seen.includes("whatHappened"));
});

function su_hot(su) {
  for (let i = 0; i < 40; i++) su.update(0.05, {});
}

function toDoubt(options) {
  const su = surgery(options);
  toHackChoice(su);
  su.hackChoice(true);
  su.hackFinished(true);
  advance(su, "whatHappened");
  su.answerWhatHappened("a");
  const seen = advance(su, "doubt");
  assert.ok(seen.includes("diagnostics"));
  assert.ok(seen.includes("passed"));
  return su;
}

test("surgery: diagnostics wait for the player's line, and start when it's given", () => {
  const su = surgery();
  toHackChoice(su);
  su.hackChoice(true);
  su.hackFinished(true);
  advance(su, "whatHappened");
  su.answerWhatHappened("a");
  advance(su, "diagnosticsPrompt");
  assert.equal(su.state.phase, "diagnosticsPrompt");
  assert.equal(su.state.run, 0);
  const bar = su.barState();
  assert.equal(bar.index, bar.steps.length - 1);
  assert.equal(bar.progress, 0);
  for (let i = 0; i < 200; i++) assert.equal(su.update(0.05, {}).filter((e) => e.type !== "beat").length, 0);
  assert.equal(su.state.phase, "diagnosticsPrompt", "it waits with no timer");
  assert.equal(su.runDiagnostics()[0].type, "diagnostics");
  assert.equal(su.state.phase, "diagnostics");
  assert.equal(su.state.run, 1);
  assert.deepEqual(su.runDiagnostics(), [], "only once");
});

test("surgery: with checkpoints off, diagnostics start with no line", () => {
  const su = surgery({ checkpoints: false });
  advance(su, "hackChoice");
  su.hackChoice(true);
  su.hackFinished(true);
  const seen = [];
  for (let i = 0; i < 5000 && su.state.phase !== "diagnostics"; i++) {
    const key = su.prompt();
    su.update(0.05, key ? { press: { [key.button]: true }, held: { [key.button]: true } } : {}).forEach((e) => seen.push(e.type));
  }
  assert.ok(!seen.includes("diagnosticsPrompt"));
  assert.equal(su.state.phase, "diagnostics");
});

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

test("surgery: doing the removal hack yourself earns more XP than the companion", () => {
  const self = toFound();
  self.decide("remove");
  assert.equal(self.removalChoice(true)[0].type, "removalHackStart");
  assert.equal(self.state.phase, "removalHack");
  self.removalHackFinished(true);
  assert.equal(self.state.removedBy, "self");
  assert.equal(self.xpGained(), 8);

  const helped = toFound();
  helped.decide("remove");
  assert.equal(helped.removalChoice(false)[0].type, "aiLoadingStart");
  assert.equal(helped.state.materials, 1, "the AI is paid on this route too");
  advance(helped, "removed");
  assert.equal(helped.state.removedBy, "companion");
  assert.equal(helped.xpGained(), 6);
});

test("surgery: a failed removal hack brings the companion in, still removes the malware, and costs XP", () => {
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
  assert.equal(su.xpGained(), 4);
  assert.equal(su.heart.state.erratic, false);
});

test("surgery: leaving the malware in still pays +1 now, and sets up the rumor", () => {
  const missed = toDoubt();
  missed.doubt(false);
  assert.equal(missed.xpGained(), 6);
  assert.ok(missed.rumorLater());

  const ignored = toFound();
  ignored.decide("ignore");
  assert.equal(ignored.xpGained(), 6);
  assert.ok(ignored.rumorLater());

  const told = toFound();
  told.decide("tell");
  assert.ok(!told.rumorLater(), "nothing is settled until the player answers the Fighter");

  const removed = toFound();
  removed.decide("remove");
  removed.removalChoice(false);
  advance(removed, "removed");
  assert.ok(!removed.rumorLater());
});

test("surgery: failing both hacks can take reputation below zero", () => {
  const su = surgery();
  toHackChoice(su);
  su.hackChoice(true);
  su.hackFinished(false);
  advance(su, "whatHappened");
  su.answerWhatHappened("a");
  advance(su, "doubt");
  su.doubt(true);
  advance(su, "found");
  su.decide("remove");
  su.removalChoice(true);
  su.removalHackFinished(false);
  advance(su, "removed");
  assert.equal(su.xpGained(), 2);
});

test("surgery: a Tech or Enforcer chooses too, and the paid AI charges them", () => {
  for (const spec of ["Tech", "Enforcer"]) {
    const su = toFound({ spec });
    assert.equal(su.decide("remove")[0].type, "removalChoice");
    assert.equal(su.removalChoice(false)[0].type, "aiLoadingStart");
    assert.equal(su.state.materials, 1);
    advance(su, "removed");
    assert.equal(su.state.removedBy, "companion");
    assert.equal(su.xpGained(), 6);
  }
});

test("surgery: a Tech or Enforcer does it hands on, with no materials and no hack", () => {
  for (const spec of ["Tech", "Enforcer"]) {
    const su = toFound({ spec, materials: 0 });
    su.decide("remove");
    const start = su.removalChoice(true);
    assert.equal(start[0].type, "manualRemovalStart");
    assert.equal(su.state.phase, "manualRemoval");
    assert.ok(su.prompt() === null || su.prompt().button);
    advance(su, "removed");
    assert.equal(su.state.phase, "closed");
    assert.equal(su.state.outcome, "remove");
    assert.equal(su.state.removedBy, "manual");
    assert.equal(su.state.materials, 0);
    assert.equal(su.xpGained(), 6, "the extra XP is for the hack");
    assert.ok(!su.rumorLater());
    assert.equal(su.heart.state.erratic, false);
  }
});

test("surgery: an Enforcer's method depends on the Hacker Contact, and only by hand weakens the arm", () => {
  const talked = toFound({ spec: "Enforcer" });
  talked.decide("remove");
  assert.equal(talked.removalChoice(true)[0].method, "talked through by the Hacker Contact");
  advance(talked, "removed");
  assert.equal(talked.weakerArm(), false);

  const hand = toFound({ spec: "Enforcer", hackerAvailable: false });
  hand.decide("remove");
  assert.equal(hand.removalChoice(true)[0].method, "pulled the controller by hand");
  advance(hand, "removed");
  assert.equal(hand.weakerArm(), true);
});

test("surgery: a slip in the hands-on removal adds a complication and can't fail it", () => {
  const su = toFound({ spec: "Tech", windowSeconds: 0.1 });
  su.decide("remove");
  su.removalChoice(true);
  const before = su.proc.state.misses;
  for (let i = 0; i < 400 && su.state.phase === "manualRemoval"; i++) su.update(0.05, {});
  assert.equal(su.state.phase, "closed");
  assert.equal(su.state.removedBy, "manual");
  assert.ok(su.proc.state.misses > before);
});

test("surgery: the AI stays available with no materials, and the price becomes a debt", () => {
  const su = toFound({ materials: 1, aiCost: 2 });
  su.decide("remove");
  assert.equal(su.removalChoice(false)[0].type, "aiLoadingStart");
  assert.equal(su.state.materials, -1);
});

test("surgery: the tally reports the run, including every price paid", () => {
  const su = surgery({ materials: 3, aiCost: 2, aiLoadSeconds: 0.5 });
  toHackChoice(su);
  su.hackChoice(false);
  advance(su, "whatHappened");
  su.answerWhatHappened("a");
  advance(su, "doubt");
  su.doubt(true);
  advance(su, "found");
  su.decide("remove");
  su.removalChoice(false);
  advance(su, "removed");
  const r = su.tally();
  assert.equal(r.outcome, "remove");
  assert.equal(r.removedBy, "companion");
  assert.equal(r.forcedHack, "ai");
  assert.equal(r.hackFailures, 0);
  assert.equal(r.diagnosticsRuns, 2);
  assert.equal(r.materialsStart, 3);
  assert.equal(r.materialsEnd, -1);
  assert.deepEqual(r.charges, [{ job: "forced", cost: 2 }, { job: "removal", cost: 2 }]);
  assert.equal(r.xpGained, 6);
  assert.equal(r.rumor, false);
  assert.equal(r.keysTotal, r.keysHit + r.complications);
  assert.ok(r.keysTotal > 0);
  assert.ok(r.peakBpm >= 130, `peak ${r.peakBpm}`);
  assert.ok(r.seconds > 0);
  const before = r.seconds;
  su.update(5, {});
  assert.equal(su.tally().seconds, before, "the clock stops when the case closes");
});

test("surgery: a second run repeats the same numbers, finds the malware and skips a beat", () => {
  for (const decision of ["remove", "ignore"]) {
    const su = toDoubt();
    const first = JSON.stringify(su.state.results);
    assert.equal(su.doubt(true)[0].run, 2);
    advance(su, "found");
    assert.equal(JSON.stringify(su.state.results), first);
    assert.ok(su.heart.state.skipNext || su.heart.state.skipping);
    su.decide(decision);
    assert.equal(su.state.outcome, decision);
  }
  const ignored = toFound();
  ignored.decide("ignore");
  assert.equal(ignored.state.phase, "closed");
});

test("surgery: a second run prints the very same log, with a fixed count of lines per check", () => {
  const su = toDoubt();
  const first = diagnosticLog(su.state.results);
  su.doubt(true);
  assert.deepEqual(diagnosticLog(su.state.results), first);
  assert.equal(first.length, su.state.results.length * LOG_LINES_PER_CHECK);
  su.state.results.forEach((r, i) => assert.ok(first[(i + 1) * LOG_LINES_PER_CHECK - 1].includes(`${r.name} ${r.ms} ms PASS`), "each check ends on its result"));
});

test("surgery: telling the Fighter leads to a request, and nothing moves until the player answers", () => {
  const su = toFound();
  assert.equal(su.decide("tell")[0].type, "fighterAsks");
  assert.equal(su.state.phase, "fighterAsks");
  assert.equal(su.state.told, true);
  for (let i = 0; i < 100; i++) su.update(0.05, {});
  assert.equal(su.state.phase, "fighterAsks");
  assert.equal(su.state.materials, 3);
});

test("surgery: the Fighter's request, paid to the AI, charges materials and then runs the loading screen", () => {
  const su = toFound({ materials: 3, aiCost: 2, aiLoadSeconds: 1 });
  su.decide("tell");
  const start = su.fighterAnswer("ai");
  assert.deepEqual(start[0], { type: "aiLoadingStart", job: "removal", cost: 2, left: 1 });
  assert.equal(su.state.phase, "aiLoading");
  assert.equal(su.state.materials, 1);
  su.update(0.5, {});
  assert.ok(Math.abs(su.aiProgress() - 0.5) < 0.01);
  assert.equal(su.state.phase, "aiLoading");
  advance(su, "removed");
  assert.equal(su.state.phase, "closed");
  assert.equal(su.state.outcome, "remove");
  assert.equal(su.state.removedBy, "companion");
  assert.equal(su.xpGained(), 6);
  assert.ok(!su.rumorLater());
  assert.equal(su.heart.state.erratic, false);
});

test("surgery: every specialty can do the Fighter's removal, which costs no materials", () => {
  const tech = toFound({ spec: "Tech" });
  tech.decide("tell");
  assert.equal(tech.fighterAnswer("self")[0].type, "manualRemovalStart");
  assert.equal(tech.state.outcome, "remove");
  assert.equal(tech.state.materials, 3);

  const su = toFound();
  su.decide("tell");
  assert.equal(su.fighterAnswer("self")[0].type, "removalHackStart");
  assert.equal(su.state.materials, 3);
  su.removalHackFinished(true);
  assert.equal(su.state.removedBy, "self");
  assert.equal(su.xpGained(), 8);
});

test("surgery: refusing the Fighter closes the case with the malware in, and sets up the rumor", () => {
  const su = toFound();
  su.decide("tell");
  su.fighterAnswer("refuse");
  assert.equal(su.state.phase, "closed");
  assert.equal(su.state.outcome, "refused");
  assert.equal(su.state.removedBy, null);
  assert.equal(su.state.materials, 3);
  assert.equal(su.xpGained(), 6);
  assert.ok(su.rumorLater());
});

test("surgery: with checkpoints off, steps close with no choice", () => {
  const su = surgery({ checkpoints: false });
  const seen = advance(su, "hackChoice");
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

test("dialogue: the choice timer slows during a quick hack without stopping, and recovers after", () => {
  const d = createDialogue({ nodes: NODES, start: "one", spec: "Netrunning", hackSlowdown: 0.1 });
  const start = d.state.timeLeft;
  assert.equal(d.update(0.1, { a: true })[0].type, "specStarted");
  assert.ok(d.state.hackLive);
  assert.equal(d.state.timeLeft, start, "the press that starts the hack takes no time");
  d.update(1);
  assert.ok(Math.abs(d.state.timeLeft - (start - 0.1)) < 1e-9, "one second costs a tenth of a second");
  d.hackFinished(true);
  const after = d.state.timeLeft;
  d.update(1);
  assert.ok(Math.abs(d.state.timeLeft - (after - 1)) < 1e-9, "full speed once the hack ends");
});

test("dialogue: the slowed timer can still run out during a quick hack, and the hack carries on", () => {
  const d = createDialogue({ nodes: NODES, start: "one", spec: "Netrunning", hackSlowdown: 0.1 });
  d.update(0.1, { a: true });
  const seconds = d.state.timeLeft;
  const events = d.update((seconds + 0.01) / 0.1);
  assert.equal(events[0].type, "chose");
  assert.equal(events[0].timedOut, true);
  assert.ok(d.state.hackLive, "the hack keeps going into the next line");
});

test("dialogue: the player can answer and use up the option during a quick hack", () => {
  const d = createDialogue({ nodes: NODES, start: "one", spec: "Netrunning" });
  d.update(0.1, { a: true });
  assert.equal(d.options().some((o) => o.isSpec), false, "the option is used up");
  d.update(0.1, { x: true });
  assert.ok(d.state.flags.left, "the player can still answer during the hack");
  d.hackFinished(true);
  assert.ok(d.state.flags.hackWorked);
});

test("dialogue: a held-back spec option arrives after its delay, and can't be pressed before then", () => {
  const nodes = {
    one: { speaker: "", text: "", seconds: 8, defaultChoice: 0, choices: [{ label: "a", next: "two" }, { label: "b", next: "two" }, { label: "c", next: "two" }] },
    two: { speaker: "", text: "", seconds: 8, defaultChoice: 0, specDelay: 3, spec: { Netrunning: { label: "Hack", icon: "chip" } }, choices: [{ label: "a", next: null }, { label: "b", next: null }, { label: "c", next: null }] },
  };
  const d = createDialogue({ nodes, start: "one", spec: "Netrunning" });
  d.update(5);
  assert.equal(d.options().some((o) => o.isSpec), false, "a node with no spec has no option");
  d.update(0.1, { x: true });
  assert.equal(d.state.node, "two");
  assert.equal(d.options().length, 3, "the time spent on the last node doesn't count");
  assert.deepEqual(d.update(1, { a: true }), [], "too early");
  assert.equal(d.state.specUsed, false);
  d.update(2.1);
  const spec = d.options().find((o) => o.isSpec);
  assert.equal(spec.button, "a");
  assert.equal(spec.icon, "chip");
  assert.equal(d.update(0.1, { a: true })[0].type, "specStarted");
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

test("case: telling the Fighter settles nothing until the player answers", () => {
  const c = createFighterCase({});
  c.tell();
  assert.ok(c.state.told);
  assert.equal(c.state.disposition, null);
  c.choose("refused");
  assert.equal(c.state.disposition, "refused");
  assert.equal(c.state.removalMethod, null);
});

test("case: the AI removal is paid in materials, and can't be chosen without them", () => {
  const c = createFighterCase({ materials: 3, aiCost: 2 });
  assert.ok(c.removeWithAi());
  assert.equal(c.state.materials, 1);
  assert.equal(c.state.disposition, "removed");
  assert.equal(c.state.removalMethod, "paid the AI Companion");
  const poor = createFighterCase({ materials: 1, aiCost: 2 });
  assert.equal(poor.canPayAi(), false);
  assert.equal(poor.removeWithAi(), false);
  assert.equal(poor.state.materials, 1);
  assert.equal(poor.state.disposition, null);
});

test("case: every specialty has a way to do the removal itself, so no one is stuck without materials", () => {
  assert.equal(createFighterCase({ spec: "Tech" }).selfMethod(), "himself");
  assert.equal(createFighterCase({ spec: "Netrunning" }).selfMethod(), "himself");
  assert.equal(createFighterCase({ spec: "Enforcer" }).selfMethod(), "talked through by the Hacker Contact");
  assert.equal(createFighterCase({ spec: "Enforcer", hackerAvailable: false }).selfMethod(), "pulled the controller by hand");
});

test("case: a failed removal hack still takes it out, and costs XP instead of materials", () => {
  const c = createFighterCase({ spec: "Netrunning", rep: 1, materials: 3 });
  assert.ok(c.canRemovalHack());
  assert.ok(!createFighterCase({ spec: "Tech" }).canRemovalHack());
  c.removalHackFailed();
  assert.equal(c.state.disposition, "removed");
  assert.equal(c.state.rep, 0);
  assert.equal(c.state.materials, 3);
});

test("case: every disposition has a next beat", () => {
  for (const d of ["removed", "refused", "left in", "untreated"]) {
    const c = createFighterCase({});
    c.choose(d);
    assert.ok(c.beatText().length > 10);
  }
});

const TALK_STEPS = [
  { name: "One", kind: "medical", speaker: "Fighter", ask: "Q1", answers: ["yes", "no"], replies: { yes: "Good." }, after: [{ speaker: "AI", text: "After one." }] },
  { name: "Two", kind: "medical", before: [{ speaker: "Marcus", text: "Before two." }] },
];
function talkSurgery(options) {
  return createSurgery(Object.assign({ steps: TALK_STEPS, promptsPerStep: 2, windowSeconds: 1 }, options));
}
function runUntil(su, phase) {
  const seen = [];
  for (let i = 0; i < 5000; i++) {
    if (su.state.phase === phase) return seen;
    const key = su.prompt();
    const lineNow = su.subtitle();
    if (lineNow && seen[seen.length - 1] !== lineNow.text) seen.push(lineNow.text);
    su.update(0.05, key ? { press: { [key.button]: true }, held: { [key.button]: true } } : {});
  }
  throw new Error(`never reached ${phase}: ${seen.join()}`);
}

test("reading time: longer lines stay up longer, with a floor, and the scale applies", () => {
  assert.equal(readingSeconds("Yes."), 1.8);
  assert.ok(readingSeconds("one two three four five six seven eight nine ten") > 3.5);
  assert.equal(readingSeconds("Yes.", 2), 3.6);
});

test("surgery: nothing has to start a step, so the first key comes by itself", () => {
  const su = talkSurgery();
  assert.equal(su.state.phase, "treat");
  const events = su.update(0.05, {});
  assert.ok(events.some((e) => e.type === "stepStart"));
  assert.equal(su.proc.state.phase, "process");
});

test("surgery: the briefing waits for the player, then the opening lines play, then the first step starts by itself", () => {
  const su = talkSurgery({ briefing: true, openLines: [{ speaker: "AI", text: "Opening." }] });
  for (let i = 0; i < 200; i++) su.update(0.05, {});
  assert.equal(su.state.phase, "briefing");
  assert.equal(su.state.seconds, 0, "the clock waits too");
  assert.equal(su.subtitle(), null);
  assert.ok(su.beginScene());
  assert.equal(su.state.phase, "talk");
  assert.equal(su.subtitle().text, "Opening.");
  assert.equal(su.beginScene(), false, "only once");
  for (let i = 0; i < 60; i++) su.update(0.05, {});
  assert.equal(su.state.phase, "treat");
  assert.equal(su.proc.state.phase, "process");
});

test("surgery: timed lines bridge one choice to the next step, with the answer's own reply first", () => {
  const su = talkSurgery();
  runUntil(su, "checkpoint");
  assert.deepEqual(su.answer("yes").map((e) => e.type), ["stepClosed"]);
  assert.equal(su.state.phase, "talk");
  const lines = runUntil(su, "treat");
  assert.deepEqual(lines, ["Good.", "After one.", "Before two."]);
  su.update(0.05, {});
  assert.equal(su.proc.current().name, "Two");
  assert.equal(su.proc.state.phase, "process");
});

test("surgery: an answer with no reply of its own still gets the bridge lines", () => {
  const su = talkSurgery();
  runUntil(su, "checkpoint");
  su.answer("no");
  assert.deepEqual(runUntil(su, "treat"), ["After one.", "Before two."]);
});

test("surgery: the lines after the last step lead to the line before diagnostics", () => {
  const steps = [{ name: "Only", kind: "medical", after: [{ speaker: "AI", text: "Done." }] }];
  const su = createSurgery({ steps, promptsPerStep: 2, windowSeconds: 1 });
  assert.deepEqual(runUntil(su, "diagnosticsPrompt"), ["Done."]);
});

test("surgery: the answer about what happened plays its reply and the next step's lines", () => {
  const steps = [
    { name: "Off", kind: "cyber", alert: true },
    { name: "Next", kind: "medical", before: [{ speaker: "AI", text: "On to the next." }] },
  ];
  const su = createSurgery({ steps, promptsPerStep: 2, windowSeconds: 1 });
  runUntil(su, "hackChoice");
  assert.equal(su.state.talk, null, "the alert isn't talked over");
  su.hackChoice(true);
  su.hackFinished(true);
  runUntil(su, "whatHappened");
  su.answerWhatHappened("x", { speaker: "Fighter", text: "Right." });
  assert.deepEqual(runUntil(su, "treat"), ["Right.", "On to the next."]);
});

test("surgery: with checkpoints off there are no lines at all", () => {
  const su = talkSurgery({ checkpoints: false, briefing: true, openLines: [{ speaker: "AI", text: "Opening." }] });
  su.beginScene();
  assert.equal(su.state.phase, "treat");
  assert.deepEqual(runUntil(su, "diagnostics"), []);
});

test("dialogue: a node with no timer and no choices holds until the page moves it on", () => {
  const d = createDialogue({ start: "fight", nodes: { fight: { speaker: "" }, final: { speaker: "V", text: "Now?", seconds: 2, choices: [{ label: "Go", next: null }] } } });
  assert.ok(d.holding());
  for (let i = 0; i < 100; i++) assert.deepEqual(d.update(0.05, {}), []);
  assert.equal(d.state.node, "fight");
  assert.ok(d.goTo("final"));
  assert.equal(d.holding(), false);
  assert.equal(d.options().length, 1);
});
