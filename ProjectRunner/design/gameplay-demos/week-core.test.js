const test = require("node:test");
const assert = require("node:assert/strict");
const { createWeek, UPGRADES } = require("./week-core.js");

function treat(w, id, hits = 3, withParts = true) {
  assert.ok(w.startTreat(id, withParts), `could not start ${id}`);
  return w.finishTreat(hits, 3);
}

test("week: a day starts with its actions and only the patients who have arrived", () => {
  const w = createWeek();
  assert.equal(w.state.actionsLeft, 3);
  assert.deepEqual(w.waiting().map((p) => p.id), ["brother", "fighter"]);
});

test("week: treating costs one action and the parts", () => {
  const w = createWeek();
  treat(w, "brother");
  assert.equal(w.state.actionsLeft, 2);
  assert.equal(w.state.materials, 1);
  assert.equal(w.waiting().length, 1);
});

test("week: a treatment is clean with parts and at most one missed key", () => {
  const clean = createWeek();
  assert.equal(treat(clean, "brother", 2).result, "clean");
  assert.equal(clean.state.xp, 3);
  const missed = createWeek();
  const r = treat(missed, "brother", 1);
  assert.equal(r.result, "rough");
  assert.equal(missed.state.xp, 1);
});

test("week: a patient can always be treated without parts, for a rough result", () => {
  const w = createWeek({ startMaterials: 0 });
  assert.equal(w.startTreat("fighter", true), false);
  assert.equal(w.state.actionsLeft, 3);
  const r = treat(w, "fighter", 3, false);
  assert.equal(r.result, "rough");
  assert.equal(w.state.materials, 0);
  assert.equal(w.state.xp, 3);
});

test("week: XP fills to a level, carries over and gives one upgrade", () => {
  const w = createWeek({ xpPerLevel: 5, startMaterials: 9 });
  const r = treat(w, "fighter");
  assert.equal(r.levels, 1);
  assert.equal(w.state.level, 2);
  assert.equal(w.state.xp, 1);
  assert.equal(w.state.points, 1);
});

test("week: a loss empties the bar but never drops a level", () => {
  const w = createWeek({ xpPerLevel: 5, startMaterials: 9 });
  treat(w, "fighter");
  treat(w, "brother");
  w.endDay();
  w.state.xp = 1;
  const report = w.endDay();
  assert.deepEqual(report.left, ["Courier"]);
  assert.equal(w.state.level, 2);
  assert.equal(w.state.xp, 0);
  assert.equal(report.xpLost, 1);
});

test("week: a patient leaves when their time runs out, and costs XP", () => {
  const w = createWeek({ startMaterials: 9 });
  treat(w, "brother");
  treat(w, "fighter");
  assert.deepEqual(w.endDay().left, []);
  const day2 = w.endDay();
  assert.deepEqual(day2.left, ["Courier"]);
  assert.equal(day2.xpLost, 3);
});

test("week: a story patient takes two actions", () => {
  const w = createWeek({ startMaterials: 9 });
  treat(w, "brother");
  treat(w, "fighter");
  assert.equal(w.state.actionsLeft, 0);
  const short = createWeek({ startMaterials: 9 });
  short.breakDown();
  short.breakDown();
  assert.equal(short.startTreat("fighter", true), false);
});

test("week: a story patient is never lost, and the actions they need are held back", () => {
  const w = createWeek({ startMaterials: 9 });
  w.endDay();
  assert.equal(w.canEndDay(), false, "day 3 can't fit both story patients");
  assert.equal(w.endDay(), null);
  w.breakDown();
  assert.ok(w.blocked());
  assert.equal(w.breakDown(), 0);
  assert.equal(w.startTreat("courier", true), false);
  treat(w, "fighter");
  assert.ok(w.canEndDay());
  w.endDay();
  w.breakDown();
  assert.ok(w.blocked());
  assert.equal(w.startTreat("mother", true), false);
  assert.equal(w.canEndDay(), false);
  treat(w, "lieutenant");
  assert.ok(w.canEndDay());
  assert.equal(w.criticalLeft(), 0);
});

test("week: skipping days can't strand a story patient", () => {
  const w = createWeek({ days: 2, actionsPerDay: 2 });
  assert.equal(w.canEndDay(), false);
  assert.equal(w.canAct(), false);
  treat(w, "fighter", 3, false);
  assert.ok(w.endDay());
  assert.equal(w.state.day, 2);
  assert.equal(w.canEndDay(), false);
});

test("week: talking gets less detail now and sending gets it all tomorrow", () => {
  const w = createWeek({ startMaterials: 9 });
  assert.ok(w.getFact("fighter", "send"));
  assert.equal(w.state.facts.fighter, undefined);
  assert.equal(w.state.actionsLeft, 2);
  assert.equal(w.endDay().fact, "The Fighter");
  assert.equal(w.state.facts.fighter, "full");
  assert.equal(w.state.contactOn, null);

  const t = createWeek({ startMaterials: 9 });
  assert.ok(t.getFact("fighter", "talk"));
  assert.equal(t.state.facts.fighter, "less");
  assert.equal(treat(t, "fighter").xp, 7);
});

test("week: paying the Hacker Contact saves the action but costs materials", () => {
  const w = createWeek({ startMaterials: 2 });
  assert.ok(w.getFact("fighter", "hacker"));
  assert.equal(w.state.actionsLeft, 3);
  assert.equal(w.state.materials, 0);
  assert.equal(w.state.facts.fighter, "full");
  const poor = createWeek({ startMaterials: 1 });
  assert.equal(poor.getFact("fighter", "hacker"), false);
});

test("week: the specialty changes the routes", () => {
  assert.ok(createWeek({ spec: "Netrunning" }).getFact("fighter", "self"));
  assert.equal(createWeek({ spec: "Tech" }).getFact("fighter", "self"), false);
  const e = createWeek({ spec: "Enforcer" });
  e.getFact("fighter", "talk");
  assert.equal(e.state.facts.fighter, "full");
  const t = createWeek({ spec: "Tech" });
  assert.equal(t.breakDown(), 3);
});

test("week: the contact can't be sent on the last day, or twice", () => {
  const w = createWeek({ days: 2, startMaterials: 9 });
  assert.ok(w.getFact("fighter", "send"));
  assert.equal(w.canFact(w.state.patients[1], "send"), false);
  treat(w, "fighter");
  w.endDay();
  const l = w.state.patients.find((p) => p.id === "lieutenant");
  assert.equal(w.canFact(l, "send"), false);
  assert.ok(w.canFact(l, "talk"));
});

test("week: the morning delivery grows with level", () => {
  const w = createWeek({ startMaterials: 0, xpPerLevel: 2, deliveryPerLevel: 1 });
  assert.equal(w.endDay().delivered, 1);
  w.state.xp = 2;
  const l = createWeek({ startMaterials: 9, xpPerLevel: 3 });
  treat(l, "fighter");
  assert.equal(l.state.level, 3);
  assert.equal(l.endDay().delivered, 3);
});

test("week: each upgrade does what it says", () => {
  const up = (id) => {
    const w = createWeek({ startMaterials: 9, xpPerLevel: 1 });
    w.state.points = 1;
    assert.ok(w.buyUpgrade(id));
    return w;
  };
  assert.equal(up("bench").breakDown(), 3);
  assert.equal(up("printer").partsNeeded({ parts: 1, kind: "organic" }), 0);
  assert.equal(up("printer").partsNeeded({ parts: 2, kind: "cyber" }), 2);
  const s = up("stamina");
  assert.equal(s.state.actionsLeft, 4);
  s.endDay();
  assert.equal(s.state.actionsLeft, 4);
  assert.equal(treat(up("hands"), "brother", 1).result, "clean");
});

test("week: an upgrade needs a point and can only be bought once", () => {
  const w = createWeek();
  assert.equal(w.buyUpgrade("bench"), false);
  w.state.points = 2;
  assert.ok(w.buyUpgrade("bench"));
  assert.equal(w.buyUpgrade("bench"), false);
  assert.equal(w.state.points, 1);
  assert.equal(w.upgradesOffered().length, UPGRADES.length - 1);
});

test("week: the episode ends after the last day with a tally", () => {
  const w = createWeek({ startMaterials: 9 });
  treat(w, "fighter");
  w.endDay();
  w.endDay();
  treat(w, "lieutenant");
  const report = w.endDay();
  assert.equal(report.ended, true);
  assert.equal(w.state.phase, "ended");
  const t = w.tally();
  assert.equal(t.clean, 2);
  assert.equal(t.abandoned, 4);
  assert.equal(t.fiveEpisodePace, 0);
  w.state.level = 2;
  assert.equal(w.tally().fiveEpisodePace, 5);
  assert.equal(w.endDay(), null);
});

const find = (w, id) => w.state.patients.find((p) => p.id === id);

test("week: the plan shows where the held actions go, day by day", () => {
  const w = createWeek({ startMaterials: 9 });
  const plan = w.storyPlan();
  assert.deepEqual(plan[1].map((p) => p.id), []);
  assert.deepEqual(plan[2].map((p) => p.id), ["fighter"]);
  assert.deepEqual(plan[3].map((p) => p.id), ["lieutenant"]);
  assert.equal(w.heldToday(), 0);
  w.endDay();
  assert.equal(w.heldToday(), 2, "day 2 now has to carry the Fighter");
  assert.equal(w.freeToday(), 1);
  assert.deepEqual(w.storyPlan()[2].map((p) => p.id), ["fighter"]);
});

test("week: every blocked action can say why", () => {
  const w = createWeek({ startMaterials: 9 });
  assert.equal(w.whyNotAct(), null);
  assert.equal(w.whyNotEndDay(), null);
  w.endDay();
  assert.match(w.whyNotEndDay(), /The Fighter must be treated today/);
  w.breakDown();
  assert.match(w.whyNotAct(), /held for The Fighter/);
  assert.match(w.whyNotTreat(find(w, "courier")), /last 2 actions are held for The Fighter/);
  assert.equal(w.whyNotTreat(find(w, "fighter")), null);
  treat(w, "fighter");
  assert.equal(w.whyNotAct(), "No actions left today.");
  assert.match(w.whyNotTreat(find(w, "courier")), /takes 1 actions?, and you have 0 left/);
});

test("week: the XP on offer is shown before treating, and a fact raises it", () => {
  const w = createWeek({ startMaterials: 9 });
  assert.deepEqual(w.xpFor(find(w, "brother")), { clean: 3, rough: 1 });
  assert.deepEqual(w.xpFor(find(w, "fighter")), { clean: 6, rough: 3 });
  w.getFact("fighter", "hacker");
  assert.deepEqual(w.xpFor(find(w, "fighter")), { clean: 8, rough: 5 });
  assert.equal(treat(w, "fighter").xp, 8);
});

const booked = (o) => createWeek(Object.assign({ storyMode: "booked" }, o));

test("week, booked: story patients are known from day 1 but treated only on their day", () => {
  const w = booked({ startMaterials: 9 });
  assert.deepEqual(w.waiting().map((p) => p.id), ["brother", "fighter", "lieutenant"]);
  assert.equal(w.canTreat(find(w, "fighter")), false);
  assert.match(w.whyNotTreat(find(w, "fighter")), /booked for day 2/);
  assert.equal(w.startTreat("fighter", true), false);
  w.endDay();
  assert.ok(w.canTreat(find(w, "fighter")));
  assert.equal(w.canTreat(find(w, "lieutenant")), false);
});

test("week, booked: there's nothing to work out, because each day's held actions are fixed", () => {
  const w = booked({ startMaterials: 9 });
  assert.equal(w.heldToday(), 0);
  assert.equal(w.freeToday(), 3);
  assert.ok(w.canEndDay(), "day 1 has no appointment");
  w.endDay();
  assert.equal(w.heldToday(), 2);
  assert.equal(w.freeToday(), 1);
  assert.equal(w.canEndDay(), false);
  assert.match(w.whyNotEndDay(), /The Fighter must be treated today/);
  treat(w, "fighter");
  assert.ok(w.canEndDay());
  w.endDay();
  assert.equal(w.heldToday(), 2);
  treat(w, "lieutenant");
  assert.equal(w.endDay().ended, true);
  assert.equal(w.criticalLeft(), 0);
});

test("week, booked: the day's free actions can't eat the appointment", () => {
  const w = booked({ startMaterials: 9 });
  w.endDay();
  assert.ok(w.breakDown() > 0);
  assert.equal(w.breakDown(), 0);
  assert.equal(w.startTreat("courier", true), false);
  assert.ok(w.startTreat("fighter", true));
});

test("week, booked: facts can be gathered ahead of time, and the contact has to be back before the appointment", () => {
  const w = booked({ startMaterials: 9 });
  assert.ok(w.canFact(find(w, "lieutenant"), "talk"));
  assert.ok(w.getFact("fighter", "send"));
  assert.equal(w.endDay().fact, "The Fighter");
  treat(w, "fighter");
  w.endDay();
  assert.equal(w.canFact(find(w, "lieutenant"), "send"), false, "tomorrow is too late on the appointment day");
});

test("week, booked: a short episode moves the appointments to days that exist", () => {
  const w = booked({ days: 2, actionsPerDay: 4, startMaterials: 9 });
  assert.equal(find(w, "lieutenant").bookedDay, 2);
  assert.equal(find(w, "fighter").bookedDay, 2);
  w.endDay();
  treat(w, "fighter");
  treat(w, "lieutenant");
  assert.equal(w.endDay().ended, true);
});

