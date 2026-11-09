// Run with: node --test hack-levels.test.js
const test = require("node:test");
const assert = require("node:assert");
const { createHack, wrap, angleDistance } = require("./hack-core.js");
const { LEVELS, settingsFor, createTutor, createSpinPractice, createCoach } = require("./hack-levels.js");

function seeded(seed) {
  let x = seed;
  return () => {
    x = (x * 16807) % 2147483647;
    return (x - 1) / 2147483646;
  };
}

// A careful player: heads for the real gap, fits it, then enters the right arrows at a human pace.
function playWell(cfg, seed) {
  const hack = createHack(cfg, seeded(seed));
  const dt = 1 / 60;
  let wait = 0;
  for (let i = 0; i < 60 * 300; i++) {
    const s = hack.state;
    const input = {};
    if (s.phase === "search") {
      input.targetAngle = s.gap;
      if (hack.inGap() && angleDistance(s.arrow, s.gap) < 5) input.fit = true;
    } else if (s.phase === "sequence") {
      wait -= dt;
      if (wait <= 0) {
        input.dir = hack.expected();
        wait = 0.25;
      }
    }
    for (const e of hack.update(dt, input)) {
      if (e.type === "open") return { result: "open", seconds: s.elapsed, failed: s.failed };
      if (e.type === "lockout") return { result: "lockout", seconds: s.elapsed, failed: s.failed };
    }
  }
  return { result: "unfinished" };
}

test("levels: there are levels for every mechanic in the custom prototype, in order", () => {
  const seenKeys = new Set();
  LEVELS.forEach((level, i) => {
    assert.equal(level.number, i + 1);
    Object.keys(level.config).forEach((k) => seenKeys.add(k));
    assert.ok(level.tips.length > 0, `${level.name} teaches nothing`);
  });
  for (const k of ["rings", "timerSeconds", "lockoutAfter", "searchSeconds", "sweep", "sweepFollow", "corrupted", "decoy", "moveGap", "lockdown", "alarmAtRing"]) assert.ok(seenKeys.has(k), k);
});

test("levels: episodes only go up, and the first levels can't lock anyone out", () => {
  for (let i = 1; i < LEVELS.length; i++) assert.ok(LEVELS[i].episode >= LEVELS[i - 1].episode);
  assert.equal(settingsFor(LEVELS[0]).lockoutAfter, 0);
  assert.equal(settingsFor(LEVELS[0]).timerSeconds, 0);
  assert.equal(settingsFor(LEVELS[0]).hideGap, false);
  assert.equal(settingsFor(LEVELS[1]).hideGap, true);
});

test("levels: the mechanic a level teaches is really on in that level's lock", () => {
  const on = (name) => settingsFor(LEVELS.find((l) => l.name === name));
  assert.equal(on("The clock").timerSeconds, 6);
  assert.equal(on("Strikes").lockoutAfter, 3);
  assert.equal(on("Gap timer").searchSeconds, 6);
  assert.equal(on("Antivirus sweep").sweep, true);
  assert.equal(on("Antivirus sweep").sweepFollow, false);
  assert.equal(on("Hunting sweep").sweepFollow, true);
  assert.equal(on("Corrupted arrow").corrupted, true);
  assert.equal(on("Decoy gap").decoy, true);
  assert.equal(on("Moving gap").moveGap, true);
  assert.equal(on("The alarm").lockdown, true);
});

test("levels: every level can be opened by a careful player, on many seeds, with no failed rings", () => {
  for (const level of LEVELS) {
    for (let seed = 1; seed <= 25; seed++) {
      const r = playWell(settingsFor(level), seed * 7919);
      assert.equal(r.result, "open", `level ${level.number} ${level.name}, seed ${seed}: ${JSON.stringify(r)}`);
      assert.equal(r.failed, 0, `level ${level.number} ${level.name}, seed ${seed}`);
    }
  }
});

test("levels: the Full lock takes longer to open than the First lock", () => {
  const first = playWell(settingsFor(LEVELS[0]), 11);
  const last = playWell(settingsFor(LEVELS[LEVELS.length - 1]), 11);
  assert.ok(last.seconds > first.seconds * 2, `${first.seconds} then ${last.seconds}`);
});

test("levels: a level that teaches a timed mechanic gets its tip before the mechanic hits", () => {
  // Each tip's moment must really happen in that level's lock.
  for (const level of LEVELS) {
    const types = new Set(["start"]);
    const hack = createHack(settingsFor(level), seeded(5));
    const dt = 1 / 60;
    let wait = 0;
    let failedOnce = false;
    for (let i = 0; i < 60 * 200 && hack.state.phase !== "open" && hack.state.phase !== "lockout"; i++) {
      const s = hack.state;
      const input = {};
      if (s.phase === "search") {
        input.targetAngle = s.gap;
        if (hack.inGap()) input.fit = true;
      } else if (s.phase === "sequence") {
        wait -= dt;
        if (wait <= 0) {
          // One deliberate slip, so the failed moment is reached too.
          input.dir = !failedOnce ? (hack.expected() === "up" ? "down" : "up") : hack.expected();
          failedOnce = true;
          wait = 0.25;
        }
      }
      hack.update(dt, input).forEach((e) => types.add(e.type === "ringFailed" ? "failed" : e.type));
    }
    for (const tip of level.tips.filter((t) => !t.optional)) assert.ok(types.has(tip.on), `level ${level.number}: ${tip.title} waits for ${tip.on}, which never came`);
  }
});

test("levels: the gap narrows from 56 degrees to 25 by level 6, then holds", () => {
  const gaps = LEVELS.map((l) => settingsFor(l).gapDegrees);
  assert.equal(gaps[0], 56);
  assert.equal(gaps[5], 25);
  for (let i = 1; i < 6; i++) assert.ok(gaps[i] < gaps[i - 1], `level ${i + 1}: ${gaps}`);
  for (let i = 6; i < gaps.length; i++) assert.equal(gaps[i], 25);
});

test("levels: the timers only get shorter, and end well under where they start", () => {
  const timed = (key) => LEVELS.map((l) => settingsFor(l)[key]).filter((x) => x > 0);
  for (const key of ["timerSeconds", "searchSeconds"]) {
    const values = timed(key);
    for (let i = 1; i < values.length; i++) assert.ok(values[i] <= values[i - 1], `${key}: ${values}`);
    assert.ok(values[values.length - 1] <= values[0] * 0.6, `${key}: ${values}`);
  }
});

test("levels: the red ring gains arrows after its intro", () => {
  const red = LEVELS.filter((l) => settingsFor(l).lockdown || settingsFor(l).searchSeconds > 0).map((l) => settingsFor(l).redArrows);
  assert.equal(LEVELS.findIndex((l) => settingsFor(l).searchSeconds > 0), 5, "the red ring comes in with the gap timer, on level 6");
  assert.equal(red[0], 2);
  for (let i = 1; i < red.length; i++) assert.ok(red[i] >= red[i - 1], `${red}`);
  assert.equal(red[red.length - 1], 5);
});

test("levels: running out of time to find the gap sets off the red ring, with no strike", () => {
  const level = LEVELS.find((l) => l.name === "Gap timer");
  const hack = createHack(settingsFor(level), seeded(9));
  const dt = 1 / 60;
  const events = [];
  let safety = 0;
  while (hack.state.ring === 0 && safety++ < 60 * 30) {
    const s = hack.state;
    const input = s.phase === "search" ? { targetAngle: s.gap, fit: hack.inGap() } : s.phase === "sequence" ? { dir: hack.expected() } : {};
    hack.update(dt, input);
  }
  assert.equal(hack.state.ring, 1);
  while (!hack.state.onRed && safety++ < 60 * 60) hack.update(dt, {}).forEach((e) => events.push(e.type));
  assert.ok(events.includes("alarm"));
  assert.ok(Math.abs(hack.state.elapsed) > 0);
  assert.equal(hack.state.failed, 0, "the timeout itself is no strike");
  assert.equal(hack.state.phase, "search");
  assert.equal(hack.state.ring, 1, "the ring waits behind the red ring");
});

test("levels: with the switch off, a search timeout still fails the ring as before", () => {
  const hack = createHack({ searchSeconds: 1, lockoutAfter: 3 }, seeded(9));
  hack.state.ring = 1;
  hack.state.searchLeft = 0.01;
  const types = hack.update(0.05, {}).map((e) => e.type);
  assert.ok(types.includes("ringFailed"));
  assert.ok(!types.includes("alarm"));
  assert.equal(hack.state.failed, 1);
});

test("tutor: the red ring is taught once, wherever it first appears", () => {
  const seen = new Set();
  assert.equal(createTutor(LEVELS[5], { seen }).next("alarm").title, "Intruder Alert");
  assert.equal(createTutor(LEVELS[6], { seen }).next("alarm"), null);
  assert.equal(createTutor(LEVELS[11]).next("alarm").title, "Intruder Alert");
});

test("levels: a moving gap jumps on time even with the arrow held on it", () => {
  const level = LEVELS.find((l) => l.name === "Moving gap");
  const hack = createHack(settingsFor(level), seeded(3));
  const dt = 1 / 60;
  const seen = [];
  for (let i = 0; i < 60 * 12; i++) {
    for (const e of hack.update(dt, { targetAngle: hack.state.gap })) {
      if (e.type === "gapMoved") seen.push(hack.state.elapsed);
    }
  }
  assert.ok(seen.length >= 2, `only ${seen.length} jumps`);
  assert.ok(Math.abs(seen[0] - 5) < 0.1, `first jump at ${seen[0]}`);
  assert.ok(Math.abs(seen[1] - seen[0] - 5) < 0.1, `second jump at ${seen[1]}`);
});

test("levels: the custom version's gap still waits for an arrow on it", () => {
  const hack = createHack({ moveGap: true, moveGapSeconds: 1 }, seeded(3));
  let jumps = 0;
  for (let i = 0; i < 60 * 3; i++) {
    jumps += hack.update(1 / 60, { targetAngle: hack.state.gap }).filter((e) => e.type === "gapMoved").length;
  }
  assert.equal(jumps, 0);
});

test("tutor: each tip comes once, at its moment, and stays seen across retries", () => {
  const seen = new Set();
  const level = LEVELS[0];
  const t = createTutor(level, { seen });
  assert.equal(t.next("fit").title, "Enter the arrows");
  assert.equal(t.next("fit"), null);
  assert.equal(t.next("start").title, "Move the arrow");
  assert.equal(t.next("ringFailed").title, "The ring reset");
  const retry = createTutor(level, { seen });
  assert.equal(retry.next("start"), null);
});

test("tutor: tips use the words of the device in use", () => {
  const t = createTutor(LEVELS[0]);
  const tip = t.next("start");
  assert.match(t.linesFor(tip, true).join(" "), /right stick/);
  assert.doesNotMatch(t.linesFor(tip, false).join(" "), /right stick/);
  const hidden = createTutor(LEVELS[1]);
  const next = hidden.next("start");
  assert.doesNotMatch(hidden.linesFor(next, false).join(" "), /right stick/);
});

test("tutor: the Netrunner's ring break is taught once, only on locks where it can happen", () => {
  const seen = new Set();
  const one = createTutor(LEVELS[1], { netrunner: true, seen });
  assert.equal(one.next("start").title, "The gap is hidden");
  assert.equal(one.next("start"), null, "a one-ring lock has no break");
  const three = createTutor(LEVELS[4], { netrunner: true, seen });
  assert.equal(three.next("start").title, "Strikes");
  assert.equal(three.next("start").title, "Ring break");
  assert.equal(createTutor(LEVELS[5], { netrunner: true, seen }).next("start"), null);
  assert.equal(settingsFor(LEVELS[4], { netrunner: true }).ringBreak, true);
  assert.equal(settingsFor(LEVELS[1], { netrunner: true }).ringBreak, false);
  assert.equal(settingsFor(LEVELS[4]).ringBreak, false);
});

test("spin practice: only real travel counts, in either direction, and across the 0 line", () => {
  const p = createSpinPractice(360);
  p.add(350);
  p.add(10);
  assert.ok(Math.abs(p.progress() - 20 / 360) < 1e-9, "crossing zero is 20 degrees, not 340");
  const flick = createSpinPractice(360);
  for (let i = 0; i < 20; i++) { flick.add(0); flick.add(0); }
  assert.equal(flick.progress(), 0);
  const round = createSpinPractice(360);
  for (let a = 0; a <= 360; a += 10) round.add(wrap(-a));
  assert.ok(round.done());
  assert.equal(round.progress(), 1);
});

test("coach: pressing a direction during the search gets a reminder, on a controller only", () => {
  const c = createCoach();
  const at = (o) => c.update(0.1, Object.assign({ phase: "search", inGap: false, dirPressed: false, usingPad: true }, o));
  assert.equal(at({}), null);
  assert.match(at({ dirPressed: true }), /right stick/);
  assert.match(at({}), /right stick/, "the reminder stays up a moment");
  for (let i = 0; i < 30; i++) at({});
  assert.equal(at({}), null);
  assert.equal(createCoach().update(0.1, { phase: "search", inGap: false, dirPressed: true, usingPad: false }), null);
});

test("coach: a long search gets a nudge, which stops once the gap is found or the phase changes", () => {
  const c = createCoach({ longSearchSeconds: 1 });
  const at = (o) => c.update(0.2, Object.assign({ phase: "search", inGap: false, dirPressed: false, usingPad: true }, o));
  assert.equal(at({}), null);
  for (let i = 0; i < 5; i++) at({});
  assert.match(at({}), /all the way round/);
  assert.equal(at({ inGap: true }), null);
  assert.equal(at({ phase: "sequence" }), null);
  assert.equal(at({}), null, "the wait starts over on the next search");
});
