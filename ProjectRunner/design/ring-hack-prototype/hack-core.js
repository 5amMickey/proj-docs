// Ring hack rules with no drawing or input code, so they can be tested without a browser.
(function (root) {
  const DIRS = ["up", "right", "down", "left"];
  const SOLVE_SECONDS = 0.75;
  const RED_SOLVE_SECONDS = 0.5;
  const SHATTER_SECONDS = 0.9;
  const CATCH_SECONDS = 0.2; // the sweep has to stay on the arrow this long, so a fast dodge gets through
  const OPPOSITE = { up: "down", down: "up", left: "right", right: "left" };

  const DEFAULTS = {
    rings: 3,
    timerSeconds: 6, // 0 turns the timer off
    arrows: 3, // the last ring gets one more
    gapDegrees: 56,
    cueRangeDegrees: 90,
    arrowSpeed: 300, // degrees per second, how fast the arrow follows the stick
    lockoutAfter: 3, // 0 turns lockout off
    wrongRestarts: false, // true makes a wrong arrow restart the sequence instead of failing the ring
    search: true, // false places the arrow in the gap, the pre-aligned version
    searchSeconds: 0, // time to find the gap from the second ring on, 0 is off
    searchTimeoutAlarm: false, // true makes running out of that time set off the alarm, even with lockdown off
    ringBreak: false, // Netrunner: one ring per lock shatters, the first one failed or else the last one
    ringBreakStopsStory: false, // the unused break stops a story alarm and is used up
    lockdown: false, // true makes a failed ring set off the alarm instead of counting as a strike
    closeSeconds: 8, // how long the red ring takes to close in, 0 stops it moving
    redArrows: 2,
    alarmAtRing: 0, // a story beat sets off the alarm when this ring starts, 0 is off
    // Difficulty layers. They apply to normal rings with the search step on, never to the red ring.
    sweep: false, // an antivirus sweep orbits the ring and catches the arrow
    sweepSpeed: 90,
    sweepWidth: 30,
    sweepFirstRing: 2, // the sweep stays away until this ring, because the player hasn't hacked in before then
    sweepFollow: false, // true makes the sweep chase the arrow the shortest way round, false makes it orbit
    sweepAttachSeconds: 1.2,
    decoy: false, // a second gap gives cues but sets off the alarm if fitted
    moveGap: false, // the gap jumps if it is not found in time
    moveGapSeconds: 4,
    moveGapWhileOn: false, // true makes the gap jump on time even with the arrow sitting on it
    corrupted: false, // one marked arrow means press the opposite direction
  };

  function wrap(a) {
    return ((a % 360) + 360) % 360;
  }

  function angleDistance(a, b) {
    const d = Math.abs(wrap(a) - wrap(b));
    return d > 180 ? 360 - d : d;
  }

  function createHack(options, rng) {
    const cfg = Object.assign({}, DEFAULTS, options);
    const random = rng || Math.random;
    const s = {
      cfg,
      phase: "search", // search, sequence, solving, open, lockout
      ring: 0,
      arrow: 270,
      gap: 0,
      failed: 0,
      sequence: [],
      seqIndex: 0,
      timeLeft: 0,
      solveLeft: 0,
      searchSeconds: 0,
      searchLeft: 0,
      breakUsed: false,
      searchTimes: [], // seconds spent searching, one entry per fitted attempt
      elapsed: 0,
      onRed: false, // the player is working the red ring, and the current ring waits
      alarmLeft: 0,
      alarms: 0,
      storyFired: false,
      sweepAngle: 0,
      sweepContact: 0,
      sweepAttach: 0, // seconds left before a following sweep is on the ring and can catch the arrow
      decoyGap: null,
      moveLeft: 0,
      corrupted: -1, // index of the marked arrow, -1 for none
    };

    function layersOn() {
      return cfg.search && !s.onRed;
    }

    function placeDecoy() {
      // Far from the real gap, and not sitting on the arrow.
      const edge = cfg.gapDegrees / 2 + 20;
      const start = random();
      let best = wrap(s.gap + 180);
      let bestRoom = -1;
      for (let i = 0; i < 8; i++) {
        const offset = 120 + 120 * ((start + i / 8) % 1);
        const candidate = wrap(s.gap + offset);
        const room = angleDistance(candidate, s.arrow);
        if (room >= edge) {
          s.decoyGap = candidate;
          return;
        }
        if (room > bestRoom) {
          bestRoom = room;
          best = candidate;
        }
      }
      s.decoyGap = best;
    }

    function placeGap() {
      s.decoyGap = null;
      s.moveLeft = cfg.moveGapSeconds;
      if (!cfg.search) {
        s.gap = s.arrow;
        return;
      }
      // Far enough from the arrow that the player always has to search.
      s.gap = wrap(s.arrow + 90 + random() * 180);
      if (cfg.decoy && !s.onRed) placeDecoy();
    }

    function sweepActive() {
      return cfg.sweep && s.ring + 1 >= cfg.sweepFirstRing;
    }

    function resetSweep() {
      s.sweepAngle = wrap(s.arrow + 180);
      s.sweepContact = 0;
      s.sweepAttach = sweepActive() ? cfg.sweepAttachSeconds : 0;
    }

    function startSearch() {
      s.phase = "search";
      s.sequence = [];
      s.seqIndex = 0;
      s.searchSeconds = 0;
      s.searchLeft = cfg.searchSeconds;
      resetSweep();
      s.corrupted = -1;
      placeGap();
    }

    function buildSequence() {
      const count = s.onRed ? cfg.redArrows : cfg.arrows + (s.ring === cfg.rings - 1 ? 1 : 0);
      s.sequence = [];
      for (let i = 0; i < count; i++) {
        s.sequence.push(DIRS[Math.min(3, Math.floor(random() * 4))]);
      }
      s.seqIndex = 0;
      s.corrupted = cfg.corrupted && !s.onRed ? Math.min(count - 1, Math.floor(random() * count)) : -1;
    }

    function strike(events) {
      s.failed += 1;
      if (cfg.lockoutAfter > 0 && s.failed >= cfg.lockoutAfter) {
        s.phase = "lockout";
        events.push({ type: "lockout" });
        return true;
      }
      return false;
    }

    function setOffAlarm(events, source) {
      s.onRed = true;
      s.alarmLeft = cfg.closeSeconds;
      s.alarms += 1;
      startSearch();
      events.push({ type: "alarm", source });
    }

    function breakRing(reason, events) {
      s.breakUsed = true;
      s.phase = "shattering";
      s.solveLeft = SHATTER_SECONDS;
      events.push({ type: "ringShattered", ring: s.ring, reason });
    }

    function nextRing(events) {
      s.ring += 1;
      if (s.ring >= cfg.rings) {
        s.phase = "open";
        events.push({ type: "open" });
      } else {
        startSearch();
        events.push({ type: "nextRing", ring: s.ring });
      }
    }

    // A story alarm is only stopped if the toggle is on, and that uses the break up.
    function storyAlarm(events) {
      if (cfg.ringBreak && cfg.ringBreakStopsStory && !s.breakUsed) {
        s.breakUsed = true;
        events.push({ type: "storyBlocked" });
      } else {
        setOffAlarm(events, "story");
      }
    }

    function failRing(reason, events, corrupted) {
      if (cfg.ringBreak && !s.breakUsed) {
        // The first failure shatters the ring instead of counting against the player.
        events.push({ type: "ringFailed", reason, corrupted: !!corrupted, absorbed: true });
        breakRing(reason, events);
        return;
      }
      events.push({ type: "ringFailed", reason, corrupted: !!corrupted });
      if (cfg.lockdown || (cfg.searchTimeoutAlarm && reason === "search timed out")) {
        setOffAlarm(events, "failed ring");
      } else if (!strike(events)) {
        startSearch();
      }
    }

    function redRingHit(events) {
      s.onRed = false;
      s.alarmLeft = 0;
      events.push({ type: "redHit" });
      if (strike(events)) return;
      const pushed = s.ring > 0;
      if (pushed) s.ring -= 1;
      startSearch();
      events.push({ type: "ringPushedBack", pushed, ring: s.ring });
    }

    const api = {
      state: s,

      // 0 far from a gap, 1 inside it.
      nearness(angle) {
        if (s.phase !== "search" || angle === null) return 0;
        const edge = cfg.gapDegrees / 2;
        const d = angleDistance(s.arrow, angle);
        if (d <= edge) return 1;
        return Math.max(0, 1 - (d - edge) / cfg.cueRangeDegrees);
      },

      // Drives the glow, tone and rumble cues. A decoy gives cues too.
      closeness() {
        return Math.max(api.nearness(s.gap), api.nearness(s.decoyGap));
      },

      // True when the strongest cue comes from the decoy. The page makes those cues stutter.
      decoyCue() {
        return api.nearness(s.decoyGap) > api.nearness(s.gap);
      },

      inGap() {
        return angleDistance(s.arrow, s.gap) <= cfg.gapDegrees / 2;
      },

      inDecoy() {
        return s.decoyGap !== null && angleDistance(s.arrow, s.decoyGap) <= cfg.gapDegrees / 2;
      },

      // The input the current arrow needs, which is the opposite on a marked arrow.
      expected() {
        const shown = s.sequence[s.seqIndex];
        return s.seqIndex === s.corrupted ? OPPOSITE[shown] : shown;
      },

      sweepActive,

      // The time limit on finding the gap runs from the second ring on, never on the red ring.
      searchTimerOn() {
        return cfg.search && cfg.searchSeconds > 0 && s.phase === "search" && s.ring >= 1 && !s.onRed;
      },

      // How far a following sweep has attached: 0 just appeared, 1 is on the ring.
      sweepAttachProgress() {
        return s.sweepAttach > 0 ? Math.max(0, 1 - s.sweepAttach / cfg.sweepAttachSeconds) : 1;
      },

      // How far the red ring has closed in: 0 just appeared, 1 has reached its target.
      redProgress() {
        if (!s.onRed || cfg.closeSeconds <= 0) return 0;
        return Math.min(1, Math.max(0, 1 - s.alarmLeft / cfg.closeSeconds));
      },

      // For a story beat or the panel button. Does nothing if the lock is finished or the alarm is on.
      triggerAlarm() {
        const events = [];
        if (!s.onRed && (s.phase === "search" || s.phase === "sequence")) storyAlarm(events);
        return events;
      },

      // input: { targetAngle, rotate, fit, dir }. All optional.
      // rotate is degrees per second, for keys. Returns the events from this step.
      update(dt, input) {
        const i = input || {};
        const events = [];
        s.elapsed += dt;

        if (cfg.alarmAtRing === s.ring + 1 && !s.storyFired && s.phase === "search" && !s.onRed) {
          s.storyFired = true;
          storyAlarm(events);
        }

        // With no failure so far the last ring breaks on its own. A story alarm due on this ring goes first.
        if (cfg.ringBreak && !s.breakUsed && cfg.rings > 1 && s.ring === cfg.rings - 1 && s.phase === "search" && !s.onRed) {
          breakRing("last ring", events);
          return events;
        }

        if (s.onRed && cfg.closeSeconds > 0 && (s.phase === "search" || s.phase === "sequence")) {
          s.alarmLeft -= dt;
          if (s.alarmLeft <= 0) {
            redRingHit(events);
            return events;
          }
        }

        if (s.phase === "search") {
          s.searchSeconds += dt;
          if (cfg.search) {
            if (typeof i.targetAngle === "number") {
              const delta = ((wrap(i.targetAngle) - s.arrow + 540) % 360) - 180;
              const step = cfg.arrowSpeed * dt;
              s.arrow = wrap(s.arrow + Math.max(-step, Math.min(step, delta)));
            }
            if (i.rotate) s.arrow = wrap(s.arrow + i.rotate * dt);
          }
          if (layersOn() && sweepActive() && s.sweepAttach > 0) {
            // It can't move or catch anything until it has attached.
            s.sweepAttach -= dt;
            if (s.sweepAttach <= 0) {
              s.sweepAttach = 0;
              events.push({ type: "sweepAttached" });
            }
          } else if (layersOn() && sweepActive()) {
            if (cfg.sweepFollow) {
              const delta = ((s.arrow - s.sweepAngle + 540) % 360) - 180;
              const step = cfg.sweepSpeed * dt;
              s.sweepAngle = wrap(s.sweepAngle + Math.max(-step, Math.min(step, delta)));
            } else {
              s.sweepAngle = wrap(s.sweepAngle + cfg.sweepSpeed * dt);
            }
            if (angleDistance(s.arrow, s.sweepAngle) <= cfg.sweepWidth / 2) {
              s.sweepContact += dt;
              if (s.sweepContact >= CATCH_SECONDS) {
                failRing("caught by the sweep", events);
                return events;
              }
            } else {
              s.sweepContact = 0;
            }
          }
          if (layersOn() && cfg.moveGap) {
            s.moveLeft -= dt;
            if (s.moveLeft <= 0 && (cfg.moveGapWhileOn || (!api.inGap() && !api.inDecoy()))) {
              placeGap();
              events.push({ type: "gapMoved" });
            }
          }
          if (i.fit) {
            if (api.inGap()) {
              if (!s.onRed) s.searchTimes.push(s.searchSeconds);
              buildSequence();
              s.timeLeft = cfg.timerSeconds;
              s.phase = "sequence";
              events.push({ type: "fit" });
            } else if (api.inDecoy()) {
              failRing("fitted the decoy", events);
            } else {
              events.push({ type: "missedFit" });
            }
          }
          if (s.phase === "search" && api.searchTimerOn()) {
            s.searchLeft -= dt;
            if (s.searchLeft <= 0) failRing("search timed out", events);
          }
        } else if (s.phase === "sequence") {
          if (i.dir) {
            if (i.dir === api.expected()) {
              s.seqIndex += 1;
              events.push({ type: "arrowHit" });
              if (s.seqIndex >= s.sequence.length) {
                s.phase = "solving";
                if (s.onRed) {
                  s.solveLeft = RED_SOLVE_SECONDS;
                  events.push({ type: "redSolved" });
                } else {
                  s.solveLeft = SOLVE_SECONDS;
                  events.push({ type: "ringSolved", ring: s.ring });
                }
              }
            } else if (s.onRed) {
              // The clock is already the punishment, so a slip on the red ring is no extra strike.
              startSearch();
              events.push({ type: "redWrong" });
            } else if (cfg.wrongRestarts) {
              s.seqIndex = 0;
              events.push({ type: "arrowWrong" });
            } else {
              failRing("wrong arrow", events, s.seqIndex === s.corrupted);
            }
          } else if (!s.onRed && cfg.timerSeconds > 0) {
            s.timeLeft -= dt;
            if (s.timeLeft <= 0) failRing("timed out", events);
          }
        } else if (s.phase === "solving") {
          s.solveLeft -= dt;
          if (s.solveLeft <= 0) {
            if (s.onRed) {
              s.onRed = false;
              s.alarmLeft = 0;
              startSearch();
              events.push({ type: "alarmCleared" });
            } else {
              nextRing(events);
            }
          }
        } else if (s.phase === "shattering") {
          s.solveLeft -= dt;
          if (s.solveLeft <= 0) nextRing(events);
        }
        return events;
      },
    };

    resetSweep();
    s.searchLeft = cfg.searchSeconds;
    placeGap();
    return api;
  }

  const exported = { createHack, angleDistance, wrap, DEFAULTS, DIRS, RED_SOLVE_SECONDS, SHATTER_SECONDS };
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
  else root.HackCore = exported;
})(this);
