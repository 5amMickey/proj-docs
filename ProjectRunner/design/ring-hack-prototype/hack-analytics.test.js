// Run with: node --test hack-analytics.test.js
const test = require("node:test");
const assert = require("node:assert");
const { createHack } = require("./hack-core.js");
const { createLog, COLUMNS, csvCell } = require("./hack-analytics.js");

function memoryStore() {
  const data = {};
  return { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = v; } };
}

// Runs the real rules and feeds the log the same way the page does.
function player(options, log, tester) {
  const h = createHack(options);
  log.start(Object.assign({}, h.state.cfg), { tester, device: "pad", controller: "Test pad" });
  const step = (dt, input) => {
    const events = h.update(dt, input);
    events.forEach((e) => log.record(e, h.state));
    log.tick(dt, h.state);
    return events;
  };
  return {
    h,
    step,
    fit() {
      step(1, { targetAngle: h.state.gap });
      while (!h.inGap()) step(0.05, { targetAngle: h.state.gap });
      step(0, { fit: true });
    },
    solve() {
      this.fit();
      for (let i = h.state.seqIndex; i < h.state.sequence.length; i++) step(0.2, { dir: h.expected() });
      while (h.state.phase === "solving") step(0.2);
    },
    wrong() {
      const shown = h.expected();
      step(0.1, { dir: shown === "up" ? "down" : "up" });
    },
  };
}

test("an opened lock records its rings, search times and time spent", () => {
  const log = createLog(memoryStore());
  const p = player({ rings: 2, arrows: 2 }, log, "Sam");
  p.solve();
  p.solve();
  assert.equal(p.h.state.phase, "open");
  const a = log.finish("opened");
  assert.equal(a.result, "opened");
  assert.equal(a.tester, "Sam");
  assert.equal(a.ringsSolved, 2);
  assert.equal(a.fits, 2);
  assert.equal(a.searchTimes.length, 2);
  assert.equal(a.ringFailureRate, 0);
  assert.ok(a.searchSeconds > 0 && a.arrowSeconds > 0);
  assert.equal(a.furthestRing, 2);
  assert.ok(a.totalSeconds >= a.searchSeconds + a.arrowSeconds - 0.01);
});

test("failures are counted by cause and give a ring failure rate", () => {
  const log = createLog(memoryStore());
  const p = player({ rings: 2, arrows: 2, timerSeconds: 1, lockoutAfter: 5 }, log);
  p.fit();
  p.wrong();
  p.fit();
  p.step(1.1);
  p.solve();
  p.step(0.1, { fit: true }); // Pressed outside the gap.
  const a = log.finish("abandoned");
  assert.equal(a.wrongArrows, 1);
  assert.equal(a.timeouts, 1);
  assert.equal(a.ringFailures, 2);
  assert.equal(a.ringsSolved, 1);
  assert.equal(a.missedFits, 1);
  assert.equal(a.ringFailureRate, 0.667);
});

test("lockdown is counted: alarms, red solves, hits and push-backs", () => {
  const log = createLog(memoryStore());
  const p = player({ rings: 3, arrows: 2, lockdown: true, closeSeconds: 8, redArrows: 2, lockoutAfter: 5 }, log);
  p.solve();
  p.fit();
  p.wrong(); // Alarm.
  p.solve(); // The red ring.
  while (p.h.state.onRed) p.step(0.1);
  p.fit();
  p.wrong(); // A second alarm.
  p.step(8.1); // It arrives.
  const a = log.finish("abandoned");
  assert.equal(a.alarms, 2);
  assert.equal(a.redSolved, 1);
  assert.equal(a.redHits, 1);
  assert.equal(a.pushBacks, 1);
  assert.equal(a.fits, 3, "red ring fits are not counted as normal fits");
  assert.ok(a.redSeconds > 0);
  assert.equal(a.furthestRing, 2);
});

test("layers are counted, including a wrong corrupted arrow", () => {
  const log = createLog(memoryStore());
  const p = player({ rings: 2, arrows: 3, lockdown: false, lockoutAfter: 5, corrupted: true, decoy: true, sweep: true, sweepFirstRing: 1, sweepAttachSeconds: 0, moveGap: true, moveGapSeconds: 1, sweepSpeed: 90 }, log);
  const h = p.h;
  h.state.sweepAngle = h.state.arrow + 180;
  h.state.arrow = h.state.decoyGap;
  p.step(0, { fit: true });
  assert.equal(log.current().decoyFits, 1);
  for (let t = 0; t < 1.3; t += 0.05) p.step(0.05);
  assert.ok(log.current().gapMoves >= 1);
  for (let t = 0; t < 8 && log.current().sweepCatches === 0; t += 0.05) p.step(0.05);
  assert.equal(log.current().sweepCatches, 1);

  h.state.arrow = h.state.gap;
  h.state.decoyGap = null;
  p.step(0, { fit: true });
  while (h.state.seqIndex < h.state.corrupted) p.step(0, { dir: h.expected() });
  p.step(0, { dir: h.state.sequence[h.state.seqIndex] }); // The shown direction is wrong on a marked arrow.
  assert.equal(log.current().corruptedWrong, 1);
});

test("a lock left at once is not kept, and one with play is kept as abandoned", () => {
  const log = createLog(memoryStore());
  player({}, log);
  assert.equal(log.finish("abandoned"), null);
  assert.equal(log.attempts().length, 0);
  const p = player({}, log);
  p.step(5);
  assert.equal(log.finish("abandoned"), null, "time alone with no input is not an attempt");
  const q = player({}, log);
  q.fit();
  assert.equal(log.finish("abandoned").result, "abandoned");
});

test("the rating goes on the last attempt, once", () => {
  const log = createLog(memoryStore());
  const p = player({ rings: 1 }, log);
  p.solve();
  log.finish("opened");
  assert.equal(log.rate("too hard"), true);
  assert.equal(log.rate("too easy"), false);
  assert.equal(log.last().rating, "too hard");
});

test("results survive a reload, attempt numbers continue, and clear empties them", () => {
  const store = memoryStore();
  const log = createLog(store);
  const p = player({ rings: 1 }, log);
  p.solve();
  log.finish("opened");
  const again = createLog(store);
  assert.equal(again.attempts().length, 1);
  const q = player({ rings: 1 }, again);
  q.solve();
  assert.equal(again.finish("opened").attempt, 2);
  again.clear();
  assert.equal(createLog(store).attempts().length, 0);
});

test("a damaged store starts empty instead of failing", () => {
  const store = memoryStore();
  store.setItem("ringHackResults", "{not json");
  assert.equal(createLog(store).attempts().length, 0);
  assert.equal(createLog(null).attempts().length, 0);
});

test("the summary gives rates across attempts", () => {
  const log = createLog(memoryStore());
  const a = player({ rings: 1, arrows: 2 }, log);
  a.solve();
  log.finish("opened");
  log.rate("about right");
  const b = player({ rings: 1, arrows: 2, lockoutAfter: 1 }, log);
  b.fit();
  b.wrong();
  log.finish("locked out");
  log.rate("too hard");
  const s = log.summary();
  assert.equal(s.attempts, 2);
  assert.equal(s.opened, 1);
  assert.equal(s.lockedOut, 1);
  assert.equal(s.openRate, 0.5);
  assert.equal(s.ringFailureRate, 0.5);
  assert.equal(s.wrongArrowsPerAttempt, 0.5);
  assert.equal(s.aboutRight, 1);
  assert.equal(s.tooHard, 1);
  assert.equal(s.redSolveRate, null);
});

test("the CSV has one row per attempt, in column order, with settings", () => {
  const log = createLog(memoryStore());
  const p = player({ rings: 1, arrows: 2 }, log, 'Sam, "the tester"');
  p.solve();
  log.finish("opened");
  const lines = log.toCsv().trim().split("\r\n");
  assert.equal(lines.length, 2);
  assert.equal(lines[0], COLUMNS.join(","));
  assert.ok(lines[1].includes('"Sam, ""the tester"""'));
  assert.ok(lines[1].includes(",opened,"));
  assert.ok(COLUMNS.includes("gapDegrees"));
});

test("names that a spreadsheet would run as formulas are made safe", () => {
  assert.equal(csvCell("=SUM(A1)"), "'=SUM(A1)");
  assert.equal(csvCell("@me"), "'@me");
  assert.equal(csvCell(3), "3");
  assert.equal(csvCell(null), "");
});

test("ring break and the search timer are recorded, and a broken ring still counts its failure", () => {
  const log = createLog(null);
  log.start({ rings: 3, ringBreak: true, searchSeconds: 8 }, {});
  const state = { onRed: false, searchTimes: [] };
  log.record({ type: "ringFailed", reason: "search timed out", absorbed: true }, state);
  log.record({ type: "ringShattered", reason: "search timed out", ring: 1 }, state);
  log.record({ type: "storyBlocked" }, state);
  const c = log.current();
  assert.equal(c.searchTimeouts, 1);
  assert.equal(c.timeouts, 0, "the ring timer has its own count");
  assert.equal(c.ringFailures, 1);
  assert.equal(c.ringsShattered, 1);
  assert.equal(c.storyAlarmsStopped, 1);
  assert.equal(c.settings.ringBreak, true);
  assert.equal(c.settings.searchSeconds, 8);
});
