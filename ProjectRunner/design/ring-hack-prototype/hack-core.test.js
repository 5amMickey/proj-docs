// Run with: node --test hack-core.test.js
const test = require("node:test");
const assert = require("node:assert");
const { createHack, angleDistance } = require("./hack-core.js");

const seq = (values) => {
  let i = 0;
  return () => values[i++ % values.length];
};

function fitRing(h) {
  h.update(0, { targetAngle: h.state.gap });
  while (!h.inGap()) h.update(0.05, { targetAngle: h.state.gap });
  return h.update(0, { fit: true });
}

function playSequence(h) {
  let events = [];
  for (const d of [...h.state.sequence]) events = h.update(0.01, { dir: d });
  return events;
}

function solveRing(h) {
  fitRing(h);
  const events = playSequence(h);
  while (h.state.phase === "solving") events.push(...h.update(0.1));
  return events;
}

test("every new gap starts away from the arrow", () => {
  for (let i = 0; i < 200; i++) {
    const h = createHack({ gapDegrees: 56 });
    assert.ok(angleDistance(h.state.arrow, h.state.gap) >= 90 - 1e-9);
    assert.ok(!h.inGap());
  }
});

test("closeness rises towards the gap and is 1 inside it", () => {
  const h = createHack({}, seq([0.5]));
  h.state.arrow = h.state.gap + 150;
  const far = h.closeness();
  h.state.arrow = h.state.gap + 60;
  const near = h.closeness();
  h.state.arrow = h.state.gap + 10;
  assert.equal(far, 0);
  assert.ok(near > 0 && near < 1);
  assert.equal(h.closeness(), 1);
});

test("the arrow follows the stick at the set speed and takes the short way", () => {
  const h = createHack({ arrowSpeed: 100 });
  h.state.arrow = 350;
  h.update(0.1, { targetAngle: 20 });
  assert.ok(Math.abs(h.state.arrow - 0) < 1e-6);
});

test("fit outside the gap costs nothing and stays in search", () => {
  const h = createHack();
  const events = h.update(0.01, { fit: true });
  assert.deepEqual(events.map((e) => e.type), ["missedFit"]);
  assert.equal(h.state.phase, "search");
  assert.equal(h.state.failed, 0);
});

test("fit in the gap starts the timer and the sequence", () => {
  const h = createHack({ arrows: 3, timerSeconds: 6, rings: 3 });
  assert.equal(fitRing(h)[0].type, "fit");
  assert.equal(h.state.phase, "sequence");
  assert.equal(h.state.sequence.length, 3);
  assert.equal(h.state.timeLeft, 6);
});

test("a three-ring lock opens, and the last ring has one more arrow", () => {
  const h = createHack({ rings: 3, arrows: 3 });
  const lengths = [];
  const types = [];
  for (let r = 0; r < 3; r++) {
    fitRing(h);
    lengths.push(h.state.sequence.length);
    const events = playSequence(h);
    while (h.state.phase === "solving") events.push(...h.update(0.1));
    types.push(...events.map((e) => e.type));
  }
  assert.deepEqual(lengths, [3, 3, 4]);
  assert.equal(h.state.phase, "open");
  assert.equal(types.filter((t) => t === "ringSolved").length, 3);
  assert.equal(types.filter((t) => t === "open").length, 1);
  assert.equal(h.state.searchTimes.length, 3);
});

test("a wrong arrow resets that ring only", () => {
  const h = createHack({ rings: 3, lockoutAfter: 3 });
  solveRing(h);
  assert.equal(h.state.ring, 1);
  fitRing(h);
  const wrong = h.state.sequence[0] === "up" ? "down" : "up";
  h.update(0.01, { dir: wrong });
  assert.equal(h.state.phase, "search");
  assert.equal(h.state.ring, 1);
  assert.equal(h.state.failed, 1);
});

test("the timer runs out, and zero turns it off", () => {
  const h = createHack({ timerSeconds: 1 });
  fitRing(h);
  h.update(1.1);
  assert.equal(h.state.phase, "search");
  assert.equal(h.state.failed, 1);

  const off = createHack({ timerSeconds: 0 });
  fitRing(off);
  off.update(1000);
  assert.equal(off.state.phase, "sequence");
});

test("three failed rings lock out, and lockout zero never does", () => {
  const h = createHack({ timerSeconds: 1, lockoutAfter: 3 });
  for (let i = 0; i < 3; i++) {
    fitRing(h);
    h.update(1.1);
  }
  assert.equal(h.state.phase, "lockout");

  const never = createHack({ timerSeconds: 1, lockoutAfter: 0 });
  for (let i = 0; i < 10; i++) {
    fitRing(never);
    never.update(1.1);
  }
  assert.equal(never.state.phase, "search");
});

test("the pre-aligned version asks only for the fit press", () => {
  const h = createHack({ search: false });
  assert.ok(h.inGap());
  h.update(0.1, { targetAngle: h.state.arrow + 180, rotate: 300 });
  assert.ok(h.inGap());
  assert.equal(h.update(0, { fit: true })[0].type, "fit");
});

// ---------- Lockdown
const LOCK = { lockdown: true, closeSeconds: 8, redArrows: 2, timerSeconds: 6 };

function failCurrentRing(h) {
  fitRing(h);
  const wrong = h.state.sequence[0] === "up" ? "down" : "up";
  return h.update(0.01, { dir: wrong });
}

test("with lockdown off, a failed ring strikes as before", () => {
  const h = createHack({ lockdown: false });
  failCurrentRing(h);
  assert.equal(h.state.onRed, false);
  assert.equal(h.state.failed, 1);
});

test("a failed ring sets off the alarm with no strike yet", () => {
  const h = createHack(LOCK);
  const types = failCurrentRing(h).map((e) => e.type);
  assert.deepEqual(types, ["ringFailed", "alarm"]);
  assert.equal(h.state.onRed, true);
  assert.equal(h.state.failed, 0);
  assert.equal(h.state.phase, "search");
  assert.equal(h.state.alarmLeft, 8);
});

test("solving the red ring clears the alarm and costs nothing but time", () => {
  const h = createHack(LOCK);
  solveRing(h);
  failCurrentRing(h);
  fitRing(h);
  assert.equal(h.state.sequence.length, 2);
  const events = playSequence(h);
  assert.equal(events[events.length - 1].type, "redSolved");
  const later = [];
  while (h.state.onRed) later.push(...h.update(0.1));
  assert.ok(later.some((e) => e.type === "alarmCleared"));
  assert.equal(h.state.phase, "search");
  assert.equal(h.state.ring, 1);
  assert.equal(h.state.failed, 0);
});

test("the alarm clock does not run while the red solve plays", () => {
  const h = createHack(LOCK);
  failCurrentRing(h);
  fitRing(h);
  playSequence(h);
  const left = h.state.alarmLeft;
  h.update(0.2);
  assert.equal(h.state.alarmLeft, left);
});

test("a wrong arrow on the red ring goes back to its search, with the clock running and no strike", () => {
  const h = createHack(LOCK);
  failCurrentRing(h);
  h.update(1);
  fitRing(h);
  const left = h.state.alarmLeft;
  const wrong = h.state.sequence[0] === "up" ? "down" : "up";
  assert.equal(h.update(0.5, { dir: wrong }).at(-1).type, "redWrong");
  assert.equal(h.state.phase, "search");
  assert.equal(h.state.onRed, true);
  assert.equal(h.state.failed, 0);
  assert.ok(h.state.alarmLeft < left);
});

test("the ring timer does not run on the red ring", () => {
  const h = createHack({ ...LOCK, timerSeconds: 1, closeSeconds: 20 });
  failCurrentRing(h);
  fitRing(h);
  h.update(5);
  assert.equal(h.state.phase, "sequence");
  assert.equal(h.state.onRed, true);
});

test("the red ring reaching a solved ring pushes it back and strikes", () => {
  const h = createHack(LOCK);
  solveRing(h);
  assert.equal(h.state.ring, 1);
  failCurrentRing(h);
  const events = h.update(8.1);
  assert.deepEqual(events.map((e) => e.type), ["redHit", "ringPushedBack"]);
  assert.equal(events[1].pushed, true);
  assert.equal(h.state.ring, 0);
  assert.equal(h.state.failed, 1);
  assert.equal(h.state.onRed, false);
});

test("with no solved ring, a hit restarts the first ring and strikes", () => {
  const h = createHack(LOCK);
  failCurrentRing(h);
  const events = h.update(8.1);
  assert.equal(events[1].pushed, false);
  assert.equal(h.state.ring, 0);
  assert.equal(h.state.failed, 1);
});

test("repeated hits end in lockout, so lockdown cannot loop forever", () => {
  const h = createHack({ ...LOCK, lockoutAfter: 3 });
  for (let i = 0; i < 3; i++) {
    failCurrentRing(h);
    h.update(8.1);
  }
  assert.equal(h.state.phase, "lockout");
  assert.equal(h.state.onRed, false);
});

test("closing time zero holds the red ring still", () => {
  const h = createHack({ ...LOCK, closeSeconds: 0 });
  failCurrentRing(h);
  h.update(1000);
  assert.equal(h.state.onRed, true);
  assert.equal(h.redProgress(), 0);
});

test("the story alarm fires once, when its ring starts", () => {
  const h = createHack({ ...LOCK, alarmAtRing: 2, rings: 3 });
  assert.equal(h.update(0.01).length, 0);
  solveRing(h);
  const events = h.update(0.01);
  assert.equal(events[0].source, "story");
  fitRing(h);
  playSequence(h);
  while (h.state.onRed) h.update(0.1);
  assert.equal(h.update(0.01).length, 0);
  assert.equal(h.state.alarms, 1);
});

test("a triggered alarm is ignored when one is on or the lock is finished", () => {
  const h = createHack(LOCK);
  assert.equal(h.triggerAlarm().length, 1);
  assert.equal(h.triggerAlarm().length, 0);
  const done = createHack({ rings: 1 });
  solveRing(done);
  assert.equal(done.state.phase, "open");
  assert.equal(done.triggerAlarm().length, 0);
});

test("a six-ring lock opens", () => {
  const h = createHack({ rings: 6, arrows: 2 });
  for (let r = 0; r < 6; r++) solveRing(h);
  assert.equal(h.state.phase, "open");
});

// ---------- Difficulty layers
test("the sweep catches a still arrow, and the alarm goes off", () => {
  const h = createHack({ lockdown: true, sweep: true, sweepSpeed: 90 });
  let events = [];
  for (let t = 0; t < 4 && !h.state.onRed; t += 0.05) events = h.update(0.05);
  assert.deepEqual(events.map((e) => e.type), ["ringFailed", "alarm"]);
  assert.equal(events[0].reason, "caught by the sweep");
});

test("a fast dodge through the sweep gets away", () => {
  const h = createHack({ lockdown: true, sweep: true, sweepSpeed: 90, sweepWidth: 30, arrowSpeed: 720 });
  for (let t = 0; t < 12; t += 0.02) {
    // Keep the arrow on the far side of the sweep, jumping past it whenever it gets near.
    h.update(0.02, { targetAngle: h.state.sweepAngle + 180 });
  }
  assert.equal(h.state.onRed, false);
});

test("with lockdown off, the sweep strikes", () => {
  const h = createHack({ lockdown: false, sweep: true });
  for (let t = 0; t < 4 && h.state.failed === 0; t += 0.05) h.update(0.05);
  assert.equal(h.state.failed, 1);
  assert.equal(h.state.onRed, false);
});

test("the sweep does not run on the red ring or during the arrows", () => {
  const h = createHack({ lockdown: true, sweep: true, closeSeconds: 0 });
  h.triggerAlarm();
  h.update(30);
  assert.equal(h.state.alarms, 1);
  const n = createHack({ sweep: true, timerSeconds: 0 });
  n.state.sweepAngle = n.state.gap + 90;
  n.state.arrow = n.state.gap;
  n.update(0, { fit: true });
  const before = n.state.sweepAngle;
  n.update(5);
  assert.equal(n.state.sweepAngle, before);
});

test("the decoy gives cues away from the real gap and is never on the arrow", () => {
  for (let i = 0; i < 300; i++) {
    const h = createHack({ decoy: true });
    assert.ok(angleDistance(h.state.gap, h.state.decoyGap) >= 120 - 1e-6);
    assert.ok(!h.inDecoy(), "decoy started on the arrow");
    h.state.arrow = h.state.decoyGap;
    assert.equal(h.closeness(), 1);
    assert.equal(h.decoyCue(), true);
    assert.equal(h.inGap(), false);
    h.state.arrow = h.state.gap;
    assert.equal(h.closeness(), 1);
    assert.equal(h.decoyCue(), false);
  }
});

test("fitting the decoy sets off the alarm, and the red ring has no decoy", () => {
  const h = createHack({ decoy: true, lockdown: true });
  h.state.arrow = h.state.decoyGap;
  const events = h.update(0, { fit: true });
  assert.equal(events[0].reason, "fitted the decoy");
  assert.equal(h.state.onRed, true);
  assert.equal(h.state.decoyGap, null);
});

test("the gap moves when time runs out, and waits if the arrow is in it", () => {
  const h = createHack({ moveGap: true, moveGapSeconds: 4 });
  const first = h.state.gap;
  assert.equal(h.update(3.9).length, 0);
  assert.equal(h.update(0.2)[0].type, "gapMoved");
  assert.notEqual(h.state.gap, first);
  assert.ok(!h.inGap());
  const held = createHack({ moveGap: true, moveGapSeconds: 1 });
  held.state.arrow = held.state.gap;
  const gap = held.state.gap;
  assert.equal(held.update(5).length, 0);
  assert.equal(held.state.gap, gap);
});

test("a corrupted arrow needs the opposite press, and only one per ring is marked", () => {
  const h = createHack({ corrupted: true, arrows: 4, rings: 2, timerSeconds: 0, lockdown: false }, seq([0.5]));
  fitRing(h);
  assert.equal(h.state.corrupted, 2);
  h.update(0, { dir: h.state.sequence[0] });
  h.update(0, { dir: h.state.sequence[1] });
  const opposite = { up: "down", down: "up", left: "right", right: "left" };
  const shown = h.state.sequence[2];
  assert.equal(h.expected(), opposite[shown]);
  h.update(0, { dir: shown });
  assert.equal(h.state.failed, 1, "the shown direction is wrong on a marked arrow");

  const ok = createHack({ corrupted: true, arrows: 4, rings: 2, timerSeconds: 0 }, seq([0.5]));
  fitRing(ok);
  for (let i = 0; i < 4; i++) ok.update(0, { dir: ok.expected() });
  assert.equal(ok.state.phase, "solving");
});

test("the red ring has no corrupted arrow", () => {
  const h = createHack({ corrupted: true, lockdown: true, closeSeconds: 0 });
  h.triggerAlarm();
  fitRing(h);
  assert.equal(h.state.corrupted, -1);
});

test("layers stay off in the pre-aligned version", () => {
  const h = createHack({ search: false, sweep: true, decoy: true, moveGap: true, moveGapSeconds: 1 });
  assert.equal(h.state.decoyGap, null);
  const gap = h.state.gap;
  assert.equal(h.update(30).length, 0);
  assert.equal(h.state.gap, gap);
  assert.equal(h.state.failed, 0);
});
