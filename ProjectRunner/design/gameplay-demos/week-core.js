// Rules for the week demo: days, actions, XP and upgrades. No drawing or input code, so it can be tested without a browser.
// All patients, numbers and upgrades are placeholders for a play-test.
(function (root) {
  const PATIENTS = [
    { id: "brother", name: "Scavenger's brother", injury: "Cut arm", parts: 1, kind: "organic", day: 1, waits: 2 },
    { id: "fighter", name: "The Fighter", injury: "Gunshot in his cyber arm", parts: 2, kind: "cyber", day: 1, critical: true, actions: 2, booked: 2 },
    { id: "courier", name: "Courier", injury: "Burned hand", parts: 1, kind: "organic", day: 2, waits: 1 },
    { id: "runner", name: "Gang runner", injury: "Knife wound", parts: 2, kind: "organic", day: 2, waits: 2 },
    { id: "mother", name: "Someone's mother", injury: "Failing eye implant", parts: 2, kind: "cyber", day: 3, waits: 1 },
    { id: "lieutenant", name: "Gang lieutenant", injury: "Leaking spine port", parts: 2, kind: "cyber", day: 3, critical: true, actions: 2, booked: 3 },
  ];

  const UPGRADES = [
    { id: "bench", group: "Shop", name: "Better bench", effect: "Breaking down gear gives 1 more material" },
    { id: "printer", group: "Shop", name: "Tissue printer", effect: "Organic cases need 1 fewer part" },
    { id: "stamina", group: "Body", name: "Rebuilt lungs", effect: "1 more action each day" },
    { id: "hands", group: "Body", name: "Steady hands", effect: "A clean treatment allows 1 more missed key" },
  ];

  function createWeek(options, restored) {
    const cfg = Object.assign({
      days: 3, actionsPerDay: 3, xpPerLevel: 10, deliveryPerLevel: 1, startMaterials: 2, spec: "Netrunning",
      storyMode: "flexible", // flexible: treat a story patient on any day, with time held back. booked: each has a set day.
      breakdownGain: 2, hackerCost: 2, allowedMisses: 1,
      xp: { cheapClean: 3, cheapRough: 1, criticalClean: 6, criticalRough: 3, fullFact: 2, lessFact: 1, abandon: 3 },
      patients: PATIENTS,
    }, options);
    const s = restored || {
      phase: "day", // day, treating, ended
      day: 1,
      actionsLeft: cfg.actionsPerDay,
      materials: cfg.startMaterials,
      level: 1,
      xp: 0,
      points: 0,
      upgrades: {},
      facts: {},
      contactOn: null,
      treating: null,
      // A booked story patient is known from day 1, so the player can prepare, and is treated on the set day.
      patients: cfg.patients.map((p) => {
        const booked = cfg.storyMode === "booked" && p.critical;
        return Object.assign({}, p, { arrives: booked ? 1 : Math.min(p.day, cfg.days), bookedDay: booked ? Math.min(p.booked || cfg.days, cfg.days) : null, status: "waiting", result: null });
      }),
      earned: 0,
      lost: 0,
      unusedActions: 0,
      log: [],
    };

    const has = (id) => !!s.upgrades[id];
    const find = (id) => s.patients.find((p) => p.id === id);
    const perDay = () => cfg.actionsPerDay + (has("stamina") ? 1 : 0);
    const note = (text, xp) => s.log.push({ day: s.day, text, xp: xp || 0 });
    const actionsFor = (p) => p.actions || 1;

    // Which day each story patient goes on, given this many actions today, or null if they can't all fit.
    // Each needs their actions in one day. They go as late as they can, which leaves the most choice now.
    function placeStory(today, skipId) {
      const room = {};
      const plan = {};
      for (let d = s.day; d <= cfg.days; d++) {
        room[d] = d === s.day ? today : perDay();
        plan[d] = [];
      }
      const story = s.patients.filter((p) => p.critical && p.status === "waiting" && p.id !== skipId).sort((a, b) => (b.bookedDay || b.arrives) - (a.bookedDay || a.arrives));
      for (const p of story) {
        let d = p.bookedDay || cfg.days;
        const first = p.bookedDay || Math.max(p.arrives, s.day);
        while (d >= first && room[d] < actionsFor(p)) d -= 1;
        if (d < first || d < s.day) return null;
        room[d] -= actionsFor(p);
        plan[d].push(p);
      }
      return plan;
    }
    const storyFits = (today, skipId) => placeStory(today, skipId) !== null;

    // Levels never drop: a loss only empties the current bar.
    function changeXp(amount) {
      const before = s.level;
      if (amount >= 0) {
        s.earned += amount;
        s.xp += amount;
        while (s.xp >= cfg.xpPerLevel) {
          s.xp -= cfg.xpPerLevel;
          s.level += 1;
          s.points += 1;
        }
      } else {
        const taken = Math.min(s.xp, -amount);
        s.xp -= taken;
        s.lost += taken;
      }
      return s.level - before;
    }

    const api = {
      state: s,
      cfg,
      perDay,
      has,
      waiting: () => s.patients.filter((p) => p.status === "waiting" && p.arrives <= s.day),
      leavesOn: (p) => (p.critical ? Infinity : Math.min(cfg.days, p.arrives + p.waits - 1)),
      partsNeeded: (p) => Math.max(0, p.parts - (has("printer") && p.kind === "organic" ? 1 : 0)),
      canUseParts: (p) => s.materials >= api.partsNeeded(p),
      actionsFor,
      criticalLeft: () => s.patients.filter((p) => p.critical && p.status === "waiting").length,
      // Story patients never expire, so the actions they need are held back.
      blocked: () => s.actionsLeft > 0 && !storyFits(s.actionsLeft - 1),
      canAct: () => s.phase === "day" && s.actionsLeft > 0 && !api.blocked(),
      canEndDay: () => s.phase === "day" && storyFits(0),
      canTreat(p) {
        if (s.phase !== "day" || p.status !== "waiting" || p.arrives > s.day || s.actionsLeft < actionsFor(p)) return false;
        if (p.bookedDay && p.bookedDay !== s.day) return false;
        return storyFits(s.actionsLeft - actionsFor(p), p.id);
      },
      // How many of today's actions are set aside for story patients.
      heldToday() {
        for (let held = 0; held <= s.actionsLeft; held++) if (storyFits(held)) return held;
        return s.actionsLeft;
      },
      freeToday: () => s.actionsLeft - api.heldToday(),
      // Which story patients each day's held actions are for, today and ahead.
      storyPlan: () => placeStory(s.actionsLeft) || {},
      // Why the player can't do something right now, in plain words. Null means they can.
      whyNotTreat(p) {
        if (api.canTreat(p)) return null;
        if (s.phase !== "day" || p.status !== "waiting") return "";
        if (p.bookedDay && p.bookedDay !== s.day) return `${p.name} is booked for day ${p.bookedDay}.`;
        if (s.actionsLeft < actionsFor(p)) return `${p.name} takes ${actionsFor(p)} actions, and you have ${s.actionsLeft} left today.`;
        const held = api.heldToday();
        const plan = api.storyPlan()[s.day] || [];
        return `${held === 1 ? "Your last action is" : `Your last ${held} actions are`} held for ${plan.map((x) => x.name).join(" and ") || "a story patient"}.`;
      },
      whyNotAct() {
        if (api.canAct()) return null;
        if (s.actionsLeft <= 0) return "No actions left today.";
        const plan = api.storyPlan()[s.day] || [];
        return `Your actions are held for ${plan.map((x) => x.name).join(" and ") || "a story patient"}.`;
      },
      whyNotEndDay() {
        if (api.canEndDay()) return null;
        const plan = api.storyPlan()[s.day] || [];
        return `${plan.map((x) => x.name).join(" and ") || "A story patient"} must be treated today.`;
      },
      xpFor(p) {
        const x = cfg.xp;
        const fact = p.critical ? (s.facts[p.id] === "full" ? x.fullFact : s.facts[p.id] === "less" ? x.lessFact : 0) : 0;
        return { clean: (p.critical ? x.criticalClean : x.cheapClean) + fact, rough: (p.critical ? x.criticalRough : x.cheapRough) + fact };
      },
      breakdownGain: () => cfg.breakdownGain + (cfg.spec === "Tech" ? 1 : 0) + (has("bench") ? 1 : 0),
      needsFact: (p) => !!p.critical && p.status === "waiting" && !s.facts[p.id] && s.contactOn !== p.id,
      canFact(p, route) {
        if (s.phase !== "day" || !api.needsFact(p) || p.arrives > s.day) return false;
        if (route === "hacker") return s.materials >= cfg.hackerCost;
        if (!api.canAct()) return false;
        if (route === "talk") return true;
        // The contact is back tomorrow, which has to be before the appointment.
        if (route === "send") return s.contactOn === null && s.day < (p.bookedDay || cfg.days);
        if (route === "self") return cfg.spec === "Netrunning";
        return false;
      },
      getFact(id, route) {
        const p = find(id);
        if (!p || !api.canFact(p, route)) return false;
        if (route === "hacker") {
          s.materials -= cfg.hackerCost;
          s.facts[id] = "full";
          note(`Paid the Hacker Contact for the fact on ${p.name} (${cfg.hackerCost} materials)`);
          return true;
        }
        s.actionsLeft -= 1;
        if (route === "send") {
          s.contactOn = id;
          note(`Sent the Intel Contact about ${p.name}`);
        } else if (route === "self") {
          s.facts[id] = "full";
          note(`Hacked the fact on ${p.name} yourself`);
        } else {
          s.facts[id] = cfg.spec === "Enforcer" ? "full" : "less";
          note(`Asked around about ${p.name}${cfg.spec === "Enforcer" ? " and leaned on the source" : ""}`);
        }
        return true;
      },
      startTreat(id, withParts) {
        const p = find(id);
        if (!p || !api.canTreat(p)) return false;
        if (withParts && !api.canUseParts(p)) return false;
        if (withParts) s.materials -= api.partsNeeded(p);
        s.actionsLeft -= actionsFor(p);
        s.treating = { id, withParts: !!withParts };
        s.phase = "treating";
        return true;
      },
      // A clean treatment needs its parts and at most the allowed missed keys. There are no hidden odds.
      finishTreat(hits, total) {
        if (s.phase !== "treating") return null;
        const p = find(s.treating.id);
        const allowed = cfg.allowedMisses + (has("hands") ? 1 : 0);
        const clean = s.treating.withParts && total - hits <= allowed;
        const x = cfg.xp;
        let amount = p.critical ? (clean ? x.criticalClean : x.criticalRough) : clean ? x.cheapClean : x.cheapRough;
        if (p.critical && s.facts[p.id] === "full") amount += x.fullFact;
        if (p.critical && s.facts[p.id] === "less") amount += x.lessFact;
        p.status = "treated";
        p.doneDay = s.day;
        p.result = clean ? "clean" : "rough";
        s.treating = null;
        s.phase = "day";
        const levels = changeXp(amount);
        note(`Treated ${p.name}: ${p.result}`, amount);
        return { patient: p, result: p.result, xp: amount, levels };
      },
      breakDown() {
        if (!api.canAct()) return 0;
        s.actionsLeft -= 1;
        const gain = api.breakdownGain();
        s.materials += gain;
        note(`Broke down gear for ${gain} materials`);
        return gain;
      },
      upgradesOffered: () => UPGRADES.filter((u) => !has(u.id)),
      buyUpgrade(id) {
        const u = UPGRADES.find((x) => x.id === id);
        if (!u || has(id) || s.points < 1) return false;
        s.points -= 1;
        s.upgrades[id] = true;
        if (id === "stamina") s.actionsLeft += 1;
        note(`Upgraded: ${u.name}`);
        return true;
      },
      // The day ends: patients out of time leave, then the next morning brings the contact's fact and the delivery.
      endDay() {
        if (!api.canEndDay()) return null;
        const report = { day: s.day, left: [], xpLost: 0, fact: null, delivered: 0, ended: false, unused: s.actionsLeft };
        s.unusedActions += s.actionsLeft;
        for (const p of api.waiting()) {
          if (!p.critical && s.day >= api.leavesOn(p)) {
            p.status = "abandoned";
            report.left.push(p.name);
            const before = s.lost;
            changeXp(-cfg.xp.abandon);
            const taken = s.lost - before;
            report.xpLost += taken;
            note(`${p.name} left untreated`, -taken);
          }
        }
        if (s.day >= cfg.days) {
          s.phase = "ended";
          s.actionsLeft = 0;
          report.ended = true;
          return report;
        }
        s.day += 1;
        s.actionsLeft = perDay();
        if (s.contactOn) {
          const p = find(s.contactOn);
          if (p.status === "waiting") {
            s.facts[p.id] = "full";
            report.fact = p.name;
          }
          s.contactOn = null;
        }
        report.delivered = s.level * cfg.deliveryPerLevel;
        s.materials += report.delivered;
        note(`Morning delivery: ${report.delivered} materials`);
        return report;
      },
      tally: () => ({
        clean: s.patients.filter((p) => p.result === "clean").length,
        rough: s.patients.filter((p) => p.result === "rough").length,
        abandoned: s.patients.filter((p) => p.status === "abandoned").length,
        earned: s.earned,
        lost: s.lost,
        level: s.level,
        xp: s.xp,
        levelsGained: s.level - 1,
        unusedPoints: s.points,
        upgrades: UPGRADES.filter((u) => has(u.id)).map((u) => u.name),
        materials: s.materials,
        unusedActions: s.unusedActions,
        // Of the 10 upgrades in the game, how many five episodes like this one would earn.
        fiveEpisodePace: Math.min(10, (s.level - 1) * 5),
      }),
    };
    return api;
  }

  const exported = { createWeek, PATIENTS, UPGRADES };
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
  else root.WeekCore = exported;
})(this);
