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
  const h = createHack({ lockdown: true, sweep: true, sweepFirstRing: 1, sweepAttachSeconds: 0, sweepSpeed: 90 });
  let events = [];
  for (let t = 0; t < 4 && !h.state.onRed; t += 0.05) events = h.update(0.05);
  assert.deepEqual(events.map((e) => e.type), ["ringFailed", "alarm"]);
  assert.equal(events[0].reason, "caught by the sweep");
});

test("a fast dodge through the sweep gets away", () => {
  const h = createHack({ lockdown: true, sweep: true, sweepFirstRing: 1, sweepAttachSeconds: 0, sweepSpeed: 90, sweepWidth: 30, arrowSpeed: 720 });
  for (let t = 0; t < 12; t += 0.02) {
    // Keep the arrow on the far side of the sweep, jumping past it whenever it gets near.
    h.update(0.02, { targetAngle: h.state.sweepAngle + 180 });
  }
  assert.equal(h.state.onRed, false);
});

test("with lockdown off, the sweep strikes", () => {
  const h = createHack({ lockdown: false, sweep: true, sweepFirstRing: 1, sweepAttachSeconds: 0 });
  for (let t = 0; t < 4 && h.state.failed === 0; t += 0.05) h.update(0.05);
  assert.equal(h.state.failed, 1);
  assert.equal(h.state.onRed, false);
});

test("the sweep does not run on the red ring or during the arrows", () => {
  const h = createHack({ lockdown: true, sweep: true, sweepFirstRing: 1, sweepAttachSeconds: 0, closeSeconds: 0 });
  h.triggerAlarm();
  h.update(30);
  assert.equal(h.state.alarms, 1);
  const n = createHack({ sweep: true, sweepFirstRing: 1, sweepAttachSeconds: 0, timerSeconds: 0 });
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
  const h = createHack({ search: false, sweep: true, sweepFirstRing: 1, sweepAttachSeconds: 0, decoy: true, moveGap: true, moveGapSeconds: 1 });
  assert.equal(h.state.decoyGap, null);
  const gap = h.state.gap;
  assert.equal(h.update(30).length, 0);
  assert.equal(h.state.gap, gap);
  assert.equal(h.state.failed, 0);
});

test("wrong arrow: with wrongRestarts it restarts the sequence, and only the timer can fail the ring", () => {
  const H = require("./hack-core.js");
  const h = H.createHack({ rings: 1, search: false, arrows: 3, timerSeconds: 5, lockoutAfter: 1, wrongRestarts: true });
  h.update(0, { fit: true });
  assert.equal(h.state.phase, "sequence");
  const first = h.expected();
  h.update(0.1, { dir: first });
  assert.equal(h.state.seqIndex, 1);
  const wrong = ["up", "down", "left", "right"].find((x) => x !== h.expected());
  const events = h.update(0.1, { dir: wrong });
  assert.equal(events[0].type, "arrowWrong");
  assert.equal(h.state.seqIndex, 0);
  assert.equal(h.state.phase, "sequence");
  assert.equal(h.update(6, {}).some((e) => e.type === "lockout"), true, "running out of time still fails it");
});

function attachedSweep(options) {
  const H = require("./hack-core.js");
  const h = H.createHack(Object.assign({ sweep: true, sweepFirstRing: 1, sweepFollow: true, sweepAttachSeconds: 1, sweepSpeed: 90, lockdown: false, lockoutAfter: 0, timerSeconds: 0 }, options));
  while (h.state.sweepAttach > 0) h.update(0.05, {});
  return h;
}

test("following sweep: it attaches first, unable to move or catch, and says when it is on", () => {
  const H = require("./hack-core.js");
  const h = H.createHack({ sweep: true, sweepFirstRing: 1, sweepFollow: true, sweepAttachSeconds: 1, lockdown: false });
  assert.equal(h.sweepAttachProgress(), 0);
  const start = h.state.sweepAngle;
  // Even with the arrow sitting right on it.
  h.state.arrow = start;
  let attached = 0;
  let failed = 0;
  for (let i = 0; i < 18; i++) {
    for (const e of h.update(0.05, {})) {
      if (e.type === "sweepAttached") attached += 1;
      if (e.type === "ringFailed") failed += 1;
    }
  }
  assert.equal(h.state.sweepAngle, start);
  assert.equal(failed, 0);
  assert.equal(attached, 0);
  assert.ok(Math.abs(h.sweepAttachProgress() - 0.9) < 0.01);
  const seen = [];
  for (let i = 0; i < 3; i++) seen.push(...h.update(0.05, {}).map((e) => e.type));
  assert.ok(seen.includes("sweepAttached"));
  assert.equal(h.sweepAttachProgress(), 1);
});

test("following sweep: it takes the shortest way, in both directions and across zero", () => {
  const h = attachedSweep();
  h.state.sweepAngle = 100;
  h.state.arrow = 160;
  h.update(0.1, {});
  assert.ok(Math.abs(h.state.sweepAngle - 109) < 1e-6, "clockwise when that is shorter");
  h.state.sweepAngle = 100;
  h.state.arrow = 40;
  h.state.sweepContact = 0;
  h.update(0.1, {});
  assert.ok(Math.abs(h.state.sweepAngle - 91) < 1e-6, "counterclockwise when that is shorter");
  h.state.sweepAngle = 350;
  h.state.arrow = 40;
  h.update(0.1, {});
  assert.ok(Math.abs(h.state.sweepAngle - 359) < 1e-6, "forward through 360");
  h.state.sweepAngle = 10;
  h.state.arrow = 320;
  h.update(0.1, {});
  assert.ok(Math.abs(h.state.sweepAngle - 1) < 1e-6, "back through 0");
});

test("following sweep: it catches a still arrow and doesn't overshoot, a faster arrow stays ahead, and the next try attaches again", () => {
  const h = attachedSweep();
  h.state.sweepAngle = h.state.arrow + 60;
  let caught = false;
  for (let i = 0; i < 100 && !caught; i++) {
    const events = h.update(0.05, {});
    caught = events.some((e) => e.reason === "caught by the sweep");
  }
  assert.ok(caught);
  assert.ok(h.state.sweepAttach > 0, "a caught player gets a fresh attach");
  assert.equal(Math.round(h.state.sweepAngle), Math.round((h.state.arrow + 180) % 360));

  const run = attachedSweep({ arrowSpeed: 300 });
  run.state.sweepAngle = run.state.arrow;
  run.state.gap = (run.state.arrow + 180) % 360;
  let target = run.state.arrow;
  for (let i = 0; i < 200; i++) {
    target += 300 * 0.05;
    const events = run.update(0.05, { targetAngle: target });
    assert.ok(!events.some((e) => e.type === "ringFailed"), "at full speed the arrow gets away, and passes through it head on");
  }

  // Slower laps meet the sweep head on, and it stays on the arrow long enough to catch it.
  const slow = attachedSweep({ arrowSpeed: 300 });
  slow.state.sweepAngle = slow.state.arrow;
  slow.state.gap = (slow.state.arrow + 180) % 360;
  let slowTarget = slow.state.arrow;
  let slowCaught = false;
  for (let i = 0; i < 200 && !slowCaught; i++) {
    slowTarget += 150 * 0.05;
    slowCaught = slow.update(0.05, { targetAngle: slowTarget }).some((e) => e.type === "ringFailed");
  }
  assert.ok(slowCaught);
});

test("sweep: with follow off it attaches too, then orbits, and it waits during the red ring", () => {
  const H = require("./hack-core.js");
  const orbit = H.createHack({ sweep: true, sweepFirstRing: 1, sweepSpeed: 90, sweepAttachSeconds: 0.5 });
  assert.equal(orbit.state.sweepAttach, 0.5, "follow is a separate toggle, and the attach isn't part of it");
  const parked = orbit.state.sweepAngle;
  orbit.update(0.25, {});
  assert.equal(orbit.state.sweepAngle, parked);
  const seenAttach = orbit.update(0.3, {}).map((e) => e.type);
  assert.ok(seenAttach.includes("sweepAttached"));
  const before = orbit.state.sweepAngle;
  orbit.state.arrow = (before + 180) % 360;
  orbit.update(0.1, {});
  assert.ok(Math.abs(orbit.state.sweepAngle - ((before + 9) % 360)) < 1e-6);

  const noSweep = H.createHack({ sweepFollow: true });
  assert.equal(noSweep.state.sweepAttach, 0, "the toggle does nothing without the sweep");

  const red = H.createHack({ sweep: true, sweepFirstRing: 1, sweepFollow: true, lockdown: true, closeSeconds: 0, sweepAttachSeconds: 1 });
  red.triggerAlarm();
  const attach = red.state.sweepAttach;
  red.update(0.5, {});
  assert.equal(red.state.sweepAttach, attach, "it waits while the red ring is up");
});

test("sweep: it stays away on the first ring, arrives on the second, and leaves again if the ring is pushed back", () => {
  const H = require("./hack-core.js");
  for (const sweepFollow of [false, true]) {
    const h = H.createHack({ sweep: true, sweepFollow, sweepAttachSeconds: 1, lockdown: true, closeSeconds: 0.5, timerSeconds: 0, arrows: 1 });
    assert.equal(h.sweepActive(), false);
    assert.equal(h.state.sweepAttach, 0);
    const start = h.state.sweepAngle;
    // Sitting on it for a long time does nothing.
    h.state.arrow = start;
    h.state.gap = (start + 180) % 360;
    for (let i = 0; i < 100; i++) {
      assert.ok(!h.update(0.05, {}).some((e) => e.type === "ringFailed" || e.type === "sweepAttached"));
    }
    assert.equal(h.state.sweepAngle, start);

    // Solve the first ring.
    h.state.arrow = h.state.gap;
    h.update(0.01, { fit: true });
    h.update(0.01, { dir: h.expected() });
    h.update(0.01, { dir: h.expected() });
    for (let i = 0; i < 40 && h.state.ring === 0; i++) h.update(0.05, {});
    assert.equal(h.state.ring, 1);
    assert.equal(h.sweepActive(), true);
    assert.ok(h.state.sweepAttach > 0, "either kind attaches when it arrives");

    // The red ring pushes the solved ring back, and the sweep goes with it.
    h.triggerAlarm();
    for (let i = 0; i < 20 && h.state.onRed; i++) h.update(0.05, {});
    assert.equal(h.state.ring, 0);
    assert.equal(h.sweepActive(), false);
    assert.equal(h.state.sweepAttach, 0);
  }
});

test("sweep: the first ring it appears on can be set, and a one-ring lock has none by default", () => {
  const H = require("./hack-core.js");
  assert.equal(H.createHack({ sweep: true, sweepFirstRing: 1 }).sweepActive(), true);
  const late = H.createHack({ sweep: true, sweepFirstRing: 3 });
  late.state.ring = 1;
  assert.equal(late.sweepActive(), false);
  late.state.ring = 2;
  assert.equal(late.sweepActive(), true);
  assert.equal(H.createHack({ rings: 1, sweep: true }).sweepActive(), false);
});

// Fits the gap and enters the arrows, then waits for the lock to move on.
function solveRing(h) {
  const ring = h.state.ring;
  h.state.arrow = h.state.gap;
  h.update(0.01, { fit: true });
  for (let i = 0; i < 20 && h.state.phase === "sequence"; i++) h.update(0.01, { dir: h.expected() });
  const seen = [];
  for (let i = 0; i < 40 && h.state.ring === ring && h.state.phase !== "open"; i++) seen.push(...h.update(0.05, {}).map((e) => e.type));
  return seen;
}
function eventsUntil(h, type, seconds) {
  const seen = [];
  for (let t = 0; t < seconds; t += 0.05) {
    for (const e of h.update(0.05, {})) {
      seen.push(e);
      if (e.type === type) return seen;
    }
  }
  return seen;
}
const breakHack = (o) => require("./hack-core.js").createHack(Object.assign({ rings: 3, ringBreak: true, arrows: 1, timerSeconds: 0, lockdown: true, closeSeconds: 2 }, o));

test("ring break: with no failure, the last ring breaks on its own and the lock opens", () => {
  const h = breakHack();
  solveRing(h);
  assert.equal(h.state.breakUsed, false);
  solveRing(h);
  assert.equal(h.state.ring, 2);
  const shattered = h.update(0.05, {});
  assert.equal(shattered[0].type, "ringShattered");
  assert.equal(shattered[0].reason, "last ring");
  assert.equal(shattered[0].ring, 2);
  assert.equal(h.state.phase, "shattering");
  assert.ok(eventsUntil(h, "open", 2).some((e) => e.type === "open"));
  assert.equal(h.state.failed, 0);
  assert.equal(h.state.alarms, 0);
});

test("ring break: the first failed ring shatters instead of failing, and the last ring must then be played", () => {
  for (const fail of ["wrong arrow", "caught by the sweep", "timed out", "search timed out"]) {
    const h = breakHack({ sweep: true, sweepFollow: true, sweepFirstRing: 1, sweepAttachSeconds: 0, timerSeconds: 1, searchSeconds: 1 });
    solveRing(h);
    let events;
    if (fail === "wrong arrow") {
      h.state.arrow = h.state.gap;
      h.state.sweepAngle = h.state.arrow + 180;
      h.update(0.01, { fit: true });
      events = h.update(0.01, { dir: ["up", "down", "left", "right"].find((x) => x !== h.expected()) });
    } else if (fail === "timed out") {
      h.state.arrow = h.state.gap;
      h.state.sweepAngle = h.state.arrow + 180;
      h.update(0.01, { fit: true });
      events = eventsUntil(h, "ringShattered", 3);
    } else if (fail === "caught by the sweep") {
      h.state.sweepAngle = h.state.arrow;
      events = eventsUntil(h, "ringShattered", 3);
    } else {
      h.state.sweepAngle = h.state.arrow + 180;
      h.state.gap = (h.state.arrow + 90) % 360;
      h.state.searchLeft = 0.05;
      h.state.sweepContact = 0;
      events = eventsUntil(h, "ringShattered", 3);
    }
    const failed = events.find((e) => e.type === "ringFailed");
    assert.equal(failed.reason, fail);
    assert.equal(failed.absorbed, true);
    assert.equal(events.find((e) => e.type === "ringShattered").reason, fail);
    assert.equal(h.state.onRed, false, "no alarm");
    assert.equal(h.state.failed, 0, "no strike");
    assert.equal(h.state.alarms, 0);
    eventsUntil(h, "nextRing", 2);
    assert.equal(h.state.ring, 2);
    assert.equal(h.state.breakUsed, true);
    h.update(0.05, {});
    assert.equal(h.state.phase, "search", "the last ring has to be played");
  }
});

test("ring break: only one per lock, so a second failure counts as normal", () => {
  const h = breakHack({ rings: 4, lockdown: false, lockoutAfter: 3 });
  h.state.arrow = h.state.gap;
  h.update(0.01, { fit: true });
  h.update(0.01, { dir: ["up", "down", "left", "right"].find((x) => x !== h.expected()) });
  eventsUntil(h, "nextRing", 2);
  assert.equal(h.state.ring, 1);
  h.state.arrow = h.state.gap;
  h.update(0.01, { fit: true });
  const second = h.update(0.01, { dir: ["up", "down", "left", "right"].find((x) => x !== h.expected()) });
  assert.equal(second[0].type, "ringFailed");
  assert.equal(second[0].absorbed, undefined);
  assert.equal(h.state.failed, 1);
  assert.equal(h.state.ring, 1, "the ring resets rather than shatters");
});

test("ring break: a story alarm still goes off and the red ring isn't broken, and the last ring breaks after it clears", () => {
  const h = breakHack({ alarmAtRing: 3, closeSeconds: 0 });
  solveRing(h);
  solveRing(h);
  const events = h.update(0.05, {});
  assert.equal(events[0].type, "alarm");
  assert.equal(events[0].source, "story");
  assert.ok(h.state.onRed);
  assert.equal(h.state.breakUsed, false);
  // A slip on the red ring doesn't use it either.
  h.state.arrow = h.state.gap;
  h.update(0.01, { fit: true });
  assert.equal(h.update(0.01, { dir: ["up", "down", "left", "right"].find((x) => x !== h.expected()) })[0].type, "redWrong");
  assert.equal(h.state.breakUsed, false);
  h.state.arrow = h.state.gap;
  h.update(0.01, { fit: true });
  for (let i = 0; i < 10 && h.state.phase === "sequence"; i++) h.update(0.01, { dir: h.expected() });
  eventsUntil(h, "alarmCleared", 2);
  assert.equal(h.update(0.05, {})[0].type, "ringShattered");
});

test("ring break: a red ring reaching the lock isn't absorbed", () => {
  const h = breakHack({ closeSeconds: 0.5 });
  solveRing(h);
  h.triggerAlarm();
  const seen = eventsUntil(h, "ringPushedBack", 2);
  assert.ok(seen.some((e) => e.type === "redHit"));
  assert.equal(h.state.ring, 0);
  assert.equal(h.state.breakUsed, false);
});

test("ring break: with its toggle on, the break stops a story alarm and is used up", () => {
  const h = breakHack({ alarmAtRing: 2, ringBreakStopsStory: true });
  solveRing(h);
  const events = h.update(0.05, {});
  assert.equal(events[0].type, "storyBlocked");
  assert.equal(h.state.onRed, false);
  assert.equal(h.state.breakUsed, true);
  assert.equal(h.state.alarms, 0);
  solveRing(h);
  h.update(0.05, {});
  assert.equal(h.state.phase, "search", "nothing left for the last ring");

  const used = breakHack({ alarmAtRing: 2, ringBreakStopsStory: true });
  used.state.breakUsed = true;
  solveRing(used);
  assert.equal(used.update(0.05, {})[0].type, "alarm", "once it's used, story alarms go off again");

  const button = breakHack({ ringBreakStopsStory: true });
  assert.equal(button.triggerAlarm()[0].type, "storyBlocked");
});

test("ring break: a one-ring lock doesn't open by itself, but a failure still breaks it", () => {
  const h = breakHack({ rings: 1 });
  for (let i = 0; i < 40; i++) h.update(0.05, {});
  assert.equal(h.state.phase, "search");
  h.state.arrow = h.state.gap;
  h.update(0.01, { fit: true });
  assert.equal(h.update(0.01, { dir: ["up", "down", "left", "right"].find((x) => x !== h.expected()) })[1].type, "ringShattered");
  assert.ok(eventsUntil(h, "open", 2).some((e) => e.type === "open"));
});

test("ring break: it's off by default", () => {
  const h = breakHack({ ringBreak: false, lockdown: false, rings: 2 });
  solveRing(h);
  for (let i = 0; i < 10; i++) h.update(0.05, {});
  assert.equal(h.state.phase, "search");
  h.state.arrow = h.state.gap;
  h.update(0.01, { fit: true });
  h.update(0.01, { dir: ["up", "down", "left", "right"].find((x) => x !== h.expected()) });
  assert.equal(h.state.failed, 1);
});

test("search timer: none on the first ring, it runs from the second, and running out fails the ring", () => {
  const H = require("./hack-core.js");
  const h = H.createHack({ searchSeconds: 2, timerSeconds: 0, arrows: 1, lockdown: false, lockoutAfter: 0 });
  assert.equal(h.searchTimerOn(), false);
  for (let i = 0; i < 100; i++) assert.ok(!h.update(0.05, {}).some((e) => e.type === "ringFailed"), "first ring has no limit");
  solveRing(h);
  assert.equal(h.state.ring, 1);
  assert.ok(h.searchTimerOn());
  assert.equal(h.state.searchLeft, 2);
  h.state.gap = (h.state.arrow + 180) % 360;
  const events = eventsUntil(h, "ringFailed", 3);
  assert.equal(events.at(-1).reason, "search timed out");
  assert.equal(h.state.searchLeft, 2, "the next search gets a fresh clock");
  assert.equal(h.state.ring, 1);
});

test("search timer: finding the gap stops it, it's off at 0 and for the pre-aligned version, and the red ring has its own clock", () => {
  const H = require("./hack-core.js");
  const h = H.createHack({ searchSeconds: 1, timerSeconds: 0, arrows: 1 });
  h.state.ring = 1;
  h.state.arrow = h.state.gap;
  h.update(0.01, { fit: true });
  const left = h.state.searchLeft;
  for (let i = 0; i < 60; i++) assert.ok(!h.update(0.05, {}).some((e) => e.type === "ringFailed"));
  assert.equal(h.state.searchLeft, left);

  const off = H.createHack({ searchSeconds: 0 });
  off.state.ring = 1;
  assert.equal(off.searchTimerOn(), false);
  const aligned = H.createHack({ searchSeconds: 1, search: false });
  aligned.state.ring = 1;
  assert.equal(aligned.searchTimerOn(), false);

  const red = H.createHack({ searchSeconds: 1, lockdown: true, closeSeconds: 0 });
  red.state.ring = 1;
  red.triggerAlarm();
  assert.equal(red.searchTimerOn(), false);
  for (let i = 0; i < 60; i++) assert.ok(!red.update(0.05, {}).some((e) => e.type === "ringFailed"));
});

test("the demos' defaults stay off", () => {
  const { DEFAULTS } = require("./hack-core.js");
  assert.equal(DEFAULTS.searchSeconds, 0);
  assert.equal(DEFAULTS.ringBreak, false);
  assert.equal(DEFAULTS.sweep, false);
});
