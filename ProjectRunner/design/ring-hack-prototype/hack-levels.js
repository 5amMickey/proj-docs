// The level game: which lock each level uses, what it teaches and when. No drawing or input code, so it can be tested without a browser.
// Each level brings in one new mechanic, while the gap narrows and the timers shrink. The numbers and the episode each level belongs to are proposals for Mike's approval.
(function (root) {
  const Core = root.HackCore || (typeof require !== "undefined" ? require("./hack-core.js") : null);

  // What every level shares, on top of the rules' own defaults.
  const BASE = {
    hideGap: true, netrun: false, cueStrength: 70, cueGlow: true, cueTone: true, cueRumble: true,
    timerSeconds: 0, lockoutAfter: 0, searchSeconds: 0, rings: 1, arrows: 2, bigArrows: true, moveGapWhileOn: true, searchTimeoutAlarm: true,
  };

  // Taught the first time the red ring appears, on whichever level that is. It depends on how the player does, so it may not come at all.
  const RED_RING_TIP = {
    id: "redRing", on: "alarm", optional: true, title: "Intruder Alert",
    pad: ["The red ring is closing in. Everything else waits while you find its gap and enter its arrows.", "If it reaches you first, it pushes a solved ring back and counts as a strike."],
  };

  const LEVELS = [
    {
      name: "First lock", teaches: "Search, fit and arrows", episode: 1,
      config: { hideGap: false, gapDegrees: 56 },
      tips: [
        { on: "start", practice: "spin", title: "Move the arrow",
          pad: ["An arrow sits outside the ring. Spin the right stick in a slow, full circle to take it around.", "Keep the stick moving around the edge. Pushing only up, down, left and right won't reach every part of the ring."],
          keys: ["An arrow sits outside the ring. Hold the left or right arrow key, or move the mouse around the ring, to take it all the way round."] },
        { on: "fit", title: "Enter the arrows",
          pad: ["The piece is in. Now enter the arrows, starting with the top one. The dimmer ones below it are coming next.", "Use the d-pad or the left stick. A wrong arrow resets the ring."],
          keys: ["The piece is in. Now enter the arrows, starting with the top one. The dimmer ones below it are coming next.", "Use WASD or the arrow keys. A wrong arrow resets the ring."] },
        { on: "failed", title: "The ring reset",
          pad: ["That ring reset, so find the gap and go again. On this level a reset costs you nothing but time."] },
      ],
    },
    {
      name: "Hidden gap", teaches: "Finding the gap by its cues", episode: 1,
      config: { gapDegrees: 50 },
      tips: [
        { on: "start", title: "The gap is hidden",
          pad: ["From here on you can't see the gap until the arrow is close to it.", "Spin the right stick slowly and follow the cues. The ring glows, the tone climbs and the rumble bar fills as you get nearer."],
          keys: ["From here on you can't see the gap until the arrow is close to it.", "Move the arrow slowly and follow the cues. The ring glows, the tone climbs and the rumble bar fills as you get nearer."] },
      ],
    },
    {
      name: "More rings", teaches: "A lock with more than one ring", episode: 1,
      config: { rings: 2, gapDegrees: 44 },
      tips: [
        { on: "nextRing", title: "The next ring",
          pad: ["A solved ring turns green and moves out, and a new ring takes its place, like the tumblers in a lock.", "Each ring has its own gap. The last ring of a lock always has one extra arrow."] },
      ],
    },
    {
      name: "The clock", teaches: "A time limit on the arrows", episode: 2,
      config: { rings: 2, gapDegrees: 37, timerSeconds: 6, arrows: 3 },
      tips: [
        { on: "fit", title: "The clock",
          pad: ["The dial around the arrows is your time. It starts when the piece goes in, and the search before that is not timed.", "If it runs out, the ring resets and you find the gap again."] },
      ],
    },
    {
      name: "Strikes", teaches: "Failing rings can lock you out", episode: 2,
      config: { rings: 3, gapDegrees: 31, timerSeconds: 5, arrows: 3, lockoutAfter: 3 },
      tips: [
        { on: "start", title: "Strikes",
          pad: ["A wrong arrow or running out of time now counts as a failed ring. Three failed rings lock you out of the device.", "The count is at the top of the screen."] },
      ],
    },
    {
      name: "Gap timer", teaches: "A time limit on the search, then a red ring", episode: 2,
      config: { rings: 3, gapDegrees: 25, timerSeconds: 4.5, arrows: 3, lockoutAfter: 3, searchSeconds: 6, closeSeconds: 8, redArrows: 2 },
      tips: [
        { on: "nextRing", title: "Find it in time",
          pad: ["Once you're past the first ring, the system knows you're in. The amber dial is your time to find the gap.", "If it runs out, an Intruder Alert goes off."] },
        RED_RING_TIP,
      ],
    },
    {
      name: "Antivirus sweep", teaches: "A scanner to dodge while searching", episode: 3,
      config: { rings: 3, gapDegrees: 25, timerSeconds: 4.5, arrows: 3, lockoutAfter: 3, searchSeconds: 5, closeSeconds: 8, redArrows: 2, sweep: true },
      tips: [
        { on: "nextRing", title: "The antivirus",
          pad: ["The amber arc is an antivirus sweep. It circles the ring while you search, starting from the second ring.", "If it stays on your arrow for a moment, it catches you and the ring fails. Move around it, or across it quickly."] },
        RED_RING_TIP,
      ],
    },
    {
      name: "Hunting sweep", teaches: "The sweep chases the arrow", episode: 3,
      config: { rings: 3, gapDegrees: 25, timerSeconds: 4, arrows: 3, lockoutAfter: 3, searchSeconds: 4.5, closeSeconds: 8, redArrows: 3, sweep: true, sweepFollow: true },
      tips: [
        { on: "nextRing", title: "It's hunting you",
          pad: ["This sweep attaches, then comes after your arrow the shortest way round. It's slower than you are, so keep moving and don't wait in one place."] },
        RED_RING_TIP,
      ],
    },
    {
      name: "Corrupted arrow", teaches: "One arrow is reversed", episode: 3,
      config: { rings: 3, gapDegrees: 25, timerSeconds: 4, arrows: 3, lockoutAfter: 3, searchSeconds: 4.5, closeSeconds: 8, redArrows: 3, corrupted: true },
      tips: [
        { on: "fit", title: "Corrupted arrow",
          pad: ["One arrow in each ring is corrupted. It's pink and dashed. When it's the large one, press the opposite direction."] },
        RED_RING_TIP,
      ],
    },
    {
      name: "Decoy gap", teaches: "A second gap that fails the ring", episode: 4,
      config: { rings: 3, gapDegrees: 25, timerSeconds: 3.5, arrows: 3, lockoutAfter: 3, searchSeconds: 4, closeSeconds: 8, redArrows: 4, decoy: true },
      tips: [
        { on: "start", title: "Decoy gap",
          pad: ["There are now two gaps, and one is a trap. Near the decoy the glow, tone and rumble stutter instead of holding steady.", "Fit the decoy and the ring fails. Listen before you press."] },
        RED_RING_TIP,
      ],
    },
    {
      name: "Moving gap", teaches: "The gap jumps on a timer", episode: 4,
      config: { rings: 3, gapDegrees: 25, timerSeconds: 3.5, arrows: 3, lockoutAfter: 3, moveGap: true, moveGapSeconds: 5 },
      tips: [
        { on: "start", title: "Moving gap",
          pad: ["This gap won't wait. Every 5 seconds it jumps somewhere else, even if your arrow is sitting on it, so fit it as soon as you find it."] },
      ],
    },
    {
      name: "The alarm", teaches: "Failed rings and security set off the red ring too", episode: 4,
      config: { rings: 3, gapDegrees: 25, timerSeconds: 3, arrows: 3, lockoutAfter: 3, searchSeconds: 4, lockdown: true, closeSeconds: 8, redArrows: 4, alarmAtRing: 2 },
      tips: [
        { on: "start", title: "The alarm",
          pad: ["A failed ring no longer counts as a strike by itself. It sets off an Intruder Alert instead, and security can also set one off on its own."] },
        RED_RING_TIP,
      ],
    },
    {
      name: "Full lock", teaches: "Everything at once", episode: 5,
      config: { rings: 5, gapDegrees: 25, timerSeconds: 2.5, arrows: 3, lockoutAfter: 3, searchSeconds: 3.5, sweep: true, sweepFollow: true, corrupted: true, decoy: true, lockdown: true, closeSeconds: 8, redArrows: 5, alarmAtRing: 4 },
      tips: [
        { on: "start", title: "Full lock",
          pad: ["Five rings, with the hunting sweep, decoys, corrupted arrows and the alarm all switched on. This is the hardest lock in the game."] },
      ],
    },
  ];
  LEVELS.forEach((level, i) => { level.number = i + 1; });

  // The Netrunner's ring break is a specialty, not a level, so it can be switched on for any lock with more than one ring.
  const RING_BREAK_TIP = {
    id: "ringBreak", on: "start", title: "Ring break",
    pad: ["As a Netrunner you break one ring per lock, with no extra input. The first ring you fail shatters instead of counting against you. If you fail none, the last ring shatters on its own."],
  };

  function settingsFor(level, options) {
    const o = options || {};
    const out = Object.assign({}, Core.DEFAULTS, BASE, level.config);
    if (o.netrunner) {
      out.netrun = true;
      out.ringBreak = out.rings > 1;
    }
    return out;
  }

  // Hands out each tip the first time its moment comes. seen carries over between levels and retries, so nothing is taught twice.
  function createTutor(level, options) {
    const o = options || {};
    const seen = o.seen || new Set();
    const tips = level.tips.map((t) => Object.assign({ id: `${level.number}:${t.on}` }, t));
    if (o.netrunner && settingsFor(level, o).ringBreak) tips.push(RING_BREAK_TIP);
    return {
      // on: start, or the type of an event from the rules. ringFailed counts as failed.
      next(on) {
        const moment = on === "ringFailed" ? "failed" : on;
        const tip = tips.find((t) => t.on === moment && !seen.has(t.id));
        if (!tip) return null;
        seen.add(tip.id);
        return tip;
      },
      linesFor(tip, usingPad) {
        return (!usingPad && tip.keys) || tip.pad;
      },
    };
  }

  // Counts how far the arrow has really travelled, in either direction, for the spin practice.
  function createSpinPractice(target) {
    const goal = target || 360;
    let last = null;
    let travelled = 0;
    return {
      add(angle) {
        if (last !== null) {
          const delta = ((angle - last + 540) % 360) - 180;
          travelled += Math.abs(delta);
        }
        last = angle;
      },
      progress: () => Math.min(1, travelled / goal),
      done: () => travelled >= goal,
    };
  }

  // Short coaching under the ring, for the things testers actually did.
  // A press on the d-pad or left stick while searching does nothing, so it gets a reminder.
  // So does a long search, because pushing the stick in four directions can miss a gap between them.
  function createCoach(options) {
    const cfg = Object.assign({ wrongInputSeconds: 2.5, longSearchSeconds: 6 }, options);
    let wrongLeft = 0;
    let searching = 0;
    return {
      update(dt, { phase, inGap, dirPressed, usingPad, onRed }) {
        if (phase !== "search") {
          searching = 0;
          wrongLeft = 0;
          return null;
        }
        searching += dt;
        wrongLeft = Math.max(0, wrongLeft - dt);
        if (dirPressed && usingPad) wrongLeft = cfg.wrongInputSeconds;
        if (inGap) return null;
        if (wrongLeft > 0) return "The d-pad and left stick are for the arrows. Spin the right stick to move around the ring.";
        if (!onRed && searching >= cfg.longSearchSeconds) {
          return usingPad ? "Spin the right stick slowly, all the way round. The gap can sit between up, down, left and right." : "Keep going all the way around the ring, slowly, and follow the cues.";
        }
        return null;
      },
    };
  }

  const exported = { LEVELS, settingsFor, createTutor, createSpinPractice, createCoach };
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
  else root.HackLevels = exported;
})(this);
