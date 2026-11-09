// Per-attempt results for the ring hack. An attempt is one lock, from its start to opening, lockout or abandoning it.
// Results stay in this browser until the tester downloads them. Nothing is sent anywhere.
(function (root) {
  const COUNTERS = {
    fits: 0, missedFits: 0, ringsSolved: 0, ringFailures: 0, wrongArrows: 0, timeouts: 0, searchTimeouts: 0, ringsShattered: 0, storyAlarmsStopped: 0, corruptedWrong: 0,
    sweepCatches: 0, decoyFits: 0, gapMoves: 0, alarms: 0, storyAlarms: 0, redSolved: 0, redWrong: 0, redHits: 0, pushBacks: 0,
    totalSeconds: 0, searchSeconds: 0, arrowSeconds: 0, redSeconds: 0,
  };
  const SETTING_KEYS = ["rings", "timerSeconds", "arrows", "gapDegrees", "lockoutAfter", "search", "searchSeconds", "ringBreak", "ringBreakStopsStory", "hideGap", "netrun", "arrowSpeed", "cueRangeDegrees", "cueStrength", "cueGlow", "cueTone", "cueRumble", "lockdown", "closeSeconds", "redArrows", "alarmAtRing", "sweep", "sweepSpeed", "sweepFirstRing", "sweepFollow", "sweepAttachSeconds", "decoy", "moveGap", "moveGapSeconds", "corrupted"];
  const COLUMNS = ["attempt", "tester", "startedAt", "device", "controller", "result", "rating", "furthestRing", ...Object.keys(COUNTERS), "ringFailureRate", "searchTimes", ...SETTING_KEYS, "level"];
  const SECONDS = ["totalSeconds", "searchSeconds", "arrowSeconds", "redSeconds"];

  const round = (x, places) => {
    const f = 10 ** (places === undefined ? 2 : places);
    return Math.round(x * f) / f;
  };
  const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);
  const ratio = (a, b) => (b > 0 ? a / b : null);

  // A spreadsheet treats a cell starting with these as a formula, so names are made safe first.
  function csvCell(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    let text = String(value);
    if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function createLog(store, storeKey) {
    const key = storeKey || "ringHackResults";
    let attempts = [];
    let current = null;
    try { attempts = JSON.parse((store && store.getItem(key)) || "[]"); } catch (e) { attempts = []; }
    if (!Array.isArray(attempts)) attempts = [];

    function save() {
      try { if (store) store.setItem(key, JSON.stringify(attempts)); } catch (e) { /* Results then last only for this visit. */ }
    }

    const api = {
      attempts: () => attempts,
      current: () => current,
      last: () => attempts[attempts.length - 1] || null,

      start(settings, info) {
        const i = info || {};
        const nextId = attempts.reduce((m, a) => Math.max(m, a.attempt), 0) + 1;
        current = Object.assign({
          attempt: nextId, tester: i.tester || "", startedAt: i.now || new Date().toISOString(),
          device: i.device || "", controller: i.controller || "", level: i.level || "", result: null, rating: "", furthestRing: 1, searchTimes: [],
          settings: {},
        }, COUNTERS);
        SETTING_KEYS.forEach((k) => { current.settings[k] = settings[k]; });
      },

      setDevice(device, controller) {
        if (!current) return;
        current.device = device;
        if (controller) current.controller = controller;
      },

      // Call once a frame with the time that passed, after the rules have run.
      tick(dt, state) {
        if (!current) return;
        current.totalSeconds += dt;
        const live = state.phase === "search" || state.phase === "sequence";
        if (live && state.onRed) current.redSeconds += dt;
        else if (state.phase === "search") current.searchSeconds += dt;
        else if (state.phase === "sequence") current.arrowSeconds += dt;
        current.furthestRing = Math.max(current.furthestRing, Math.min(state.ring + 1, state.cfg.rings));
      },

      record(e, state) {
        const c = current;
        if (!c) return;
        switch (e.type) {
          case "fit":
            if (!state.onRed) {
              c.fits += 1;
              c.searchTimes.push(round(state.searchTimes[state.searchTimes.length - 1] || 0));
            }
            break;
          case "missedFit": c.missedFits += 1; break;
          case "ringSolved": c.ringsSolved += 1; break;
          case "ringFailed":
            c.ringFailures += 1;
            if (e.reason === "wrong arrow") c.wrongArrows += 1;
            if (e.reason === "timed out") c.timeouts += 1;
            if (e.reason === "search timed out") c.searchTimeouts += 1;
            if (e.reason === "caught by the sweep") c.sweepCatches += 1;
            if (e.reason === "fitted the decoy") c.decoyFits += 1;
            if (e.corrupted) c.corruptedWrong += 1;
            break;
          case "ringShattered": c.ringsShattered += 1; break;
          case "storyBlocked": c.storyAlarmsStopped += 1; break;
          case "gapMoved": c.gapMoves += 1; break;
          case "alarm":
            c.alarms += 1;
            if (e.source === "story") c.storyAlarms += 1;
            break;
          case "redSolved": c.redSolved += 1; break;
          case "redWrong": c.redWrong += 1; break;
          case "redHit": c.redHits += 1; break;
          case "ringPushedBack": if (e.pushed) c.pushBacks += 1; break;
          default: break;
        }
      },

      // result is opened, locked out or abandoned. A lock left with no play, such as after moving a slider, is not kept.
      finish(result) {
        const c = current;
        current = null;
        if (!c) return null;
        const untouched = c.fits === 0 && c.missedFits === 0 && c.alarms === 0;
        if (result === "abandoned" && untouched) return null;
        c.result = result;
        SECONDS.forEach((k) => { c[k] = round(c[k]); });
        const r = ratio(c.ringFailures, c.ringFailures + c.ringsSolved);
        c.ringFailureRate = r === null ? null : round(r, 3);
        attempts.push(c);
        save();
        return c;
      },

      rate(label) {
        const a = api.last();
        if (!a || a.rating) return false;
        a.rating = label;
        save();
        return true;
      },

      summary() {
        const list = attempts;
        const count = (f) => list.filter(f).length;
        const opened = list.filter((a) => a.result === "opened");
        const finished = list.filter((a) => a.result !== "abandoned");
        const sum = (k) => list.reduce((t, a) => t + a[k], 0);
        const searches = list.reduce((t, a) => t.concat(a.searchTimes), []);
        const alarms = sum("alarms");
        return {
          attempts: list.length,
          opened: opened.length,
          lockedOut: count((a) => a.result === "locked out"),
          abandoned: count((a) => a.result === "abandoned"),
          openRate: ratio(opened.length, finished.length),
          ringFailureRate: ratio(sum("ringFailures"), sum("ringFailures") + sum("ringsSolved")),
          avgSecondsToOpen: mean(opened.map((a) => a.totalSeconds)),
          avgSearchSeconds: mean(searches),
          missedFitsPerAttempt: ratio(sum("missedFits"), list.length),
          wrongArrowsPerAttempt: ratio(sum("wrongArrows"), list.length),
          timeoutsPerAttempt: ratio(sum("timeouts"), list.length),
          attemptsWithAlarm: ratio(count((a) => a.alarms > 0), list.length),
          redSolveRate: ratio(sum("redSolved"), alarms),
          tooEasy: count((a) => a.rating === "too easy"),
          aboutRight: count((a) => a.rating === "about right"),
          tooHard: count((a) => a.rating === "too hard"),
        };
      },

      toCsv() {
        const rows = attempts.map((a) => COLUMNS.map((col) => {
          if (col === "searchTimes") return csvCell(a.searchTimes.join(" "));
          if (SETTING_KEYS.includes(col)) return csvCell(a.settings[col]);
          return csvCell(a[col]);
        }).join(","));
        return [COLUMNS.join(","), ...rows].join("\r\n") + "\r\n";
      },

      clear() {
        attempts = [];
        save();
      },
    };
    return api;
  }

  const exported = { createLog, COLUMNS, csvCell };
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
  else root.HackAnalytics = exported;
})(this);
