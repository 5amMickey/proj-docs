// Rules for the gameplay demos, with no drawing or input code, so they can be tested without a browser.
(function (root) {
  // ---------- Treatment bar
  function createTreatment(options) {
    const cfg = Object.assign({ segmentSeconds: 2.5, tech: false, techFactor: 0.6, rig: false }, options);
    const s = {
      steps: cfg.steps.map((x) => Object.assign({}, x)),
      index: 0,
      progress: 0,
      parts: {},
      waived: {},
      needRelease: false,
      rigRunning: false,
      rigUsed: false,
      heldSeconds: 0,
    };

    const current = () => s.steps[s.index];
    const api = {
      state: s,
      done: () => s.index >= s.steps.length,
      current,
      // A part must be in hand before its step starts, because a critical step locks the player to the table.
      blocked() {
        const step = current();
        return !!(step && step.needs && s.progress === 0 && !s.parts[step.needs] && !s.waived[s.index]);
      },
      give(part) { s.parts[part] = true; },
      goWithout() {
        s.waived[s.index] = true;
        return current().needs;
      },
      canLeave() {
        const step = current();
        if (!step || s.rigRunning) return true;
        return !(step.critical && s.progress > 0);
      },
      secondsFor(step) {
        const faster = cfg.tech && step.kind === "cyber";
        return cfg.segmentSeconds * (faster ? cfg.techFactor : 1);
      },
      canUseRig() {
        const step = current();
        return !!(cfg.rig && !s.rigUsed && !s.rigRunning && step && step.kind === "medical" && !api.blocked());
      },
      startRig() {
        if (!api.canUseRig()) return false;
        s.rigUsed = true;
        s.rigRunning = true;
        return true;
      },
      insertStep(step) { s.steps.splice(s.index, 0, Object.assign({}, step)); },
      update(dt, holding) {
        const events = [];
        const step = current();
        if (!step) return events;
        if (!holding) s.needRelease = false;
        const filling = s.rigRunning || (holding && !s.needRelease && !api.blocked());
        if (!filling) return events;
        if (!s.rigRunning) s.heldSeconds += dt;
        s.progress += dt / api.secondsFor(step);
        if (s.progress >= 1) {
          s.progress = 0;
          s.index += 1;
          s.needRelease = true; // The hold pauses at every checkpoint.
          s.rigRunning = false;
          events.push({ type: "stepDone", name: step.name, line: step.line });
          if (api.done()) events.push({ type: "done" });
        }
        return events;
      },
    };
    return api;
  }

  // ---------- Procedure: each step is a QTE sequence, then a dialogue choice at its checkpoint
  function createProcedure(options) {
    const cfg = Object.assign({
      promptsPerStep: 3, leadSeconds: 0.7, windowSeconds: 3, holdSeconds: 0.8, assist: "none", tapIsHold: false,
      tech: false, buttons: ["x", "y", "b", "a"], random: Math.random,
    }, options);
    const s = {
      steps: cfg.steps.map((x) => Object.assign({}, x)),
      index: 0,
      progress: 0,
      phase: "ready", // ready, process, checkpoint, done
      parts: {},
      waived: {},
      qte: null,
      promptCount: 0,
      hits: 0,
      misses: 0,
      stepLog: [],
    };

    function promptsFor(step) {
      const faster = cfg.tech && step.kind === "cyber";
      const count = Math.max(2, cfg.promptsPerStep - (faster ? 1 : 0));
      const out = [];
      let last = null;
      for (let i = 0; i < count; i++) {
        const open = cfg.buttons.filter((b) => b !== last);
        last = open[Math.floor(cfg.random() * open.length)];
        // The last prompt of a step is the hold, as the finishing action.
        out.push({ lead: cfg.leadSeconds, type: i === count - 1 ? "hold" : "press", button: last });
      }
      return out;
    }

    const current = () => s.steps[s.index];
    const api = {
      state: s,
      current,
      done: () => s.phase === "done",
      prompt: () => (s.qte ? s.qte.prompt() : null),
      canLeave: () => s.phase === "ready" || s.phase === "done",
      blocked() {
        const step = current();
        return !!(s.phase === "ready" && step && step.needs && !s.parts[step.needs] && !s.waived[s.index]);
      },
      give(part) { s.parts[part] = true; },
      goWithout() { s.waived[s.index] = true; },
      begin() {
        if (s.phase !== "ready" || !current() || api.blocked()) return false;
        const prompts = promptsFor(current());
        s.qte = createQte({ prompts, windowSeconds: cfg.windowSeconds, sceneSpeed: 1, holdSeconds: cfg.holdSeconds, assist: cfg.assist, tapIsHold: cfg.tapIsHold, resultSeconds: 0.35 });
        s.promptCount = prompts.length;
        s.progress = 0;
        s.phase = "process";
        return true;
      },
      update(dt, input) {
        const events = [];
        if (s.phase !== "process") return events;
        for (const e of s.qte.update(dt, input)) {
          if (e.type === "hit") s.hits += 1;
          if (e.type === "miss") s.misses += 1;
          if (e.type === "done") {
            s.phase = "checkpoint";
            events.push({ type: "checkpoint", step: current() });
          } else events.push(e);
        }
        s.progress = s.qte.state.results.length / s.promptCount;
        return events;
      },
      // The player's answer at the checkpoint closes the step.
      choose(label) {
        if (s.phase !== "checkpoint") return false;
        const results = s.qte.state.results;
        s.stepLog.push({ name: current().name, hits: results.filter((r) => r.hit).length, total: results.length, choice: label });
        s.qte = null;
        s.progress = 0;
        s.index += 1;
        s.phase = s.index >= s.steps.length ? "done" : "ready";
        return true;
      },
    };
    return api;
  }

  // ---------- Heart monitor
  // One heartbeat as a trace height, for a phase from 0 to 1.
  function ecgSample(phase) {
    const bump = (center, width, height) => height * Math.exp(-(((phase - center) / width) ** 2));
    return bump(0.14, 0.04, 0.14) + bump(0.27, 0.012, -0.16) + bump(0.3, 0.014, 1) + bump(0.335, 0.014, -0.3) + bump(0.55, 0.06, 0.26);
  }

  function createHeart(options) {
    const cfg = Object.assign({ bpm: 112, random: Math.random }, options);
    const s = { bpm: cfg.bpm, target: cfg.bpm, erratic: false, phase: 0, interval: 60 / cfg.bpm, skipping: false, skipNext: false, bump: 0 };
    const api = {
      state: s,
      setTarget(bpm) { s.target = bpm; s.erratic = false; },
      alarm(bpm) { s.target = bpm || 190; s.erratic = true; },
      bump(amount) { s.bump += amount; },
      skipBeat() { s.skipNext = true; },
      shownBpm: () => Math.round(s.bpm + s.bump),
      value: () => (s.skipping ? 0 : ecgSample(s.phase)),
      // Returns true on the frame a beat starts.
      update(dt) {
        s.bpm += (s.target - s.bpm) * (1 - Math.exp(-dt * (s.erratic ? 3 : 0.9)));
        s.bump *= Math.exp(-dt * 0.5);
        s.phase += dt / s.interval;
        if (s.phase < 1) return false;
        s.phase -= 1;
        const steady = 60 / (s.bpm + s.bump);
        s.interval = s.erratic ? steady * (0.55 + cfg.random() * 0.9) : steady;
        s.skipping = s.skipNext;
        s.skipNext = false;
        return !s.skipping;
      },
    };
    return api;
  }

  // ---------- The arm surgery: steps, a forced hack, diagnostics, and the malware
  function createSurgery(options) {
    const cfg = Object.assign({ spec: "Netrunning", alertSeconds: 2.5, companionSeconds: 2.5, diagnosticSeconds: 4, passedSeconds: 2, comparedSeconds: 4, checkpoints: true, random: Math.random }, options);
    const proc = createProcedure(cfg);
    const heart = createHeart({ random: cfg.random });
    const NAMES = ["ACTUATOR", "NERVE BRIDGE", "POWER CELL", "GRIP SENSOR", "FIRMWARE", "BODY LINK"];
    const s = {
      // treat, checkpoint, alert, hack, companion, diagnostics, passed, doubt, found,
      // removalChoice, removalHack, companionRemoval, closed
      phase: "treat",
      clock: 0,
      run: 0,
      outcome: null, // missed, remove, tell, ignore
      hackResult: null, // worked, failed
      removedBy: null, // self, companion
      repLost: 0, // 1 for each failed hack the companion had to finish
      // Fixed once, so a second run shows the very same numbers.
      results: NAMES.map((name) => ({ name, ms: (0.2 + cfg.random() * 0.7).toFixed(3) })),
    };

    function startDiagnostics(run, events) {
      s.run = run;
      s.phase = "diagnostics";
      s.clock = cfg.diagnosticSeconds;
      events.push({ type: "diagnostics", run });
    }
    function closeStep(label, events) {
      const step = proc.current();
      proc.choose(label || "");
      if (step.bpm) heart.setTarget(step.bpm);
      events.push({ type: "stepClosed", step });
      if (proc.done()) startDiagnostics(1, events);
    }
    function startCompanionRemoval(events, failed) {
      s.phase = "companionRemoval";
      s.clock = cfg.companionSeconds;
      heart.alarm(140);
      events.push({ type: "companionStart", job: "removal", failed: !!failed });
    }
    function finishRemoval(by, events) {
      s.removedBy = by;
      heart.setTarget(72);
      s.phase = "closed";
      events.push({ type: "removed", by });
    }

    const api = {
      state: s,
      proc,
      heart,
      canHack: () => cfg.spec === "Netrunning",
      // Every finished case earns 1, doing the removal hack yourself earns 1 more, and each failed hack costs 1.
      repGained: () => (s.phase !== "closed" ? 0 : 1 + (s.removedBy === "self" ? 1 : 0) - s.repLost),
      // Leaving the malware in pays now, but the Fighter dies later and the rumor blames Marcus.
      rumorLater: () => s.outcome === "missed" || s.outcome === "ignore",
      prompt: () => proc.prompt(),
      canLeave: () => s.phase === "treat" && proc.canLeave(),
      barState() {
        const steps = proc.state.steps.concat([{ name: "Run diagnostics" }]);
        if (s.phase === "treat" || s.phase === "checkpoint" || s.phase === "alert" || s.phase === "hack") {
          return { steps, index: proc.state.index, progress: proc.state.progress };
        }
        if (s.phase === "diagnostics") return { steps, index: steps.length - 1, progress: 1 - s.clock / cfg.diagnosticSeconds };
        return { steps, index: steps.length, progress: 0 };
      },
      update(dt, input) {
        const events = [];
        if (heart.update(dt)) events.push({ type: "beat" });
        if (s.phase === "treat") {
          for (const e of proc.update(dt, input)) {
            if (e.type !== "checkpoint") {
              if (e.type === "miss") heart.bump(14);
              events.push(e);
              continue;
            }
            if (e.step.alert) {
              closeStep("", events);
              heart.alarm(190);
              s.phase = "alert";
              s.clock = cfg.alertSeconds;
              events.push({ type: "alert" });
            } else if (cfg.checkpoints && e.step.ask) {
              s.phase = "checkpoint";
              events.push(e);
            } else closeStep("", events);
          }
        } else if (s.phase === "alert") {
          s.clock -= dt;
          if (s.clock <= 0) {
            // Every specialty plays this hack. The story reason comes later.
            s.phase = "hack";
            events.push({ type: "hackStart" });
          }
        } else if (s.phase === "companion") {
          s.clock -= dt;
          if (s.clock <= 0) {
            heart.setTarget(112);
            s.phase = "treat";
            events.push({ type: "companionDone" });
          }
        } else if (s.phase === "companionRemoval") {
          s.clock -= dt;
          if (s.clock <= 0) finishRemoval("companion", events);
        } else if (s.phase === "diagnostics") {
          s.clock -= dt;
          if (s.clock <= 0) {
            s.phase = "passed";
            s.clock = s.run === 1 ? cfg.passedSeconds : cfg.comparedSeconds;
            events.push({ type: "passed", run: s.run });
          }
        } else if (s.phase === "passed") {
          s.clock -= dt;
          if (s.clock <= 0) {
            if (s.run === 1) {
              s.phase = "doubt";
              events.push({ type: "doubt" });
            } else {
              s.phase = "found";
              heart.skipBeat();
              events.push({ type: "found" });
            }
          }
        }
        return events;
      },
      // The answer at a checkpoint. Returns the events it causes.
      answer(label) {
        const events = [];
        if (s.phase !== "checkpoint") return events;
        s.phase = "treat";
        closeStep(label, events);
        return events;
      },
      // A failed hack brings the companion in, and costs reputation instead of a complication.
      hackFinished(success) {
        const events = [];
        if (s.phase !== "hack") return events;
        s.hackResult = success ? "worked" : "failed";
        if (success) {
          heart.setTarget(96);
          s.phase = "treat";
        } else {
          s.repLost += 1;
          s.phase = "companion";
          s.clock = cfg.companionSeconds;
          events.push({ type: "companionStart", job: "forced", failed: true });
        }
        return events;
      },
      doubt(again) {
        const events = [];
        if (s.phase !== "doubt") return events;
        if (again) startDiagnostics(2, events);
        else {
          s.outcome = "missed";
          s.phase = "closed";
        }
        return events;
      },
      // Removing leads to a choice for a hacker, and to the companion for anyone else.
      decide(outcome) {
        const events = [];
        if (s.phase !== "found") return events;
        s.outcome = outcome;
        if (outcome !== "remove") s.phase = "closed";
        else if (api.canHack()) {
          s.phase = "removalChoice";
          events.push({ type: "removalChoice" });
        } else startCompanionRemoval(events);
        return events;
      },
      removalChoice(self) {
        const events = [];
        if (s.phase !== "removalChoice") return events;
        if (self) {
          s.phase = "removalHack";
          heart.alarm(150);
          events.push({ type: "removalHackStart" });
        } else startCompanionRemoval(events);
        return events;
      },
      // A failed hack still ends with the malware out: the companion finishes it, and reputation drops.
      removalHackFinished(success) {
        const events = [];
        if (s.phase !== "removalHack") return events;
        if (success) finishRemoval("self", events);
        else {
          s.repLost += 1;
          startCompanionRemoval(events, true);
        }
        return events;
      },
    };
    return api;
  }

  // ---------- QTE timing
  function createQte(options) {
    const cfg = Object.assign({ windowSeconds: 3, sceneSpeed: 0.3, holdSeconds: 0.6, assist: "none", tapIsHold: false, resultSeconds: 0.5 }, options);
    const s = { index: 0, phase: "lead", clock: cfg.prompts.length ? cfg.prompts[0].lead : 0, windowLeft: 0, holdTime: 0, sceneTime: 0, results: [], reaction: 0 };

    function finish(hit, events) {
      s.results.push({ hit, reaction: s.reaction, type: cfg.prompts[s.index].type });
      events.push({ type: hit ? "hit" : "miss" });
      s.phase = "result";
      s.clock = cfg.resultSeconds;
    }

    return {
      state: s,
      cfg,
      prompt: () => (s.phase === "prompt" ? cfg.prompts[s.index] : null),
      update(dt, input) {
        const i = input || {};
        const events = [];
        const speed = s.phase === "prompt" ? cfg.sceneSpeed : 1;
        s.sceneTime += dt * speed;
        if (s.phase === "lead") {
          s.clock -= dt;
          if (s.clock <= 0) {
            s.phase = "prompt";
            s.windowLeft = cfg.windowSeconds;
            s.holdTime = 0;
            s.reaction = 0;
            events.push({ type: "prompt" });
            if (cfg.assist === "auto") finish(true, events);
          }
        } else if (s.phase === "prompt") {
          const p = cfg.prompts[s.index];
          const pressed = i.press && i.press[p.button];
          const held = i.held && i.held[p.button];
          s.reaction += dt;
          if (p.type === "press" || (cfg.tapIsHold && p.type === "hold")) {
            if (pressed) finish(true, events);
          } else if (held) {
            s.holdTime += dt;
            if (s.holdTime >= cfg.holdSeconds) finish(true, events);
          } else {
            s.holdTime = 0;
          }
          // The window stops while a hold is under way, so a late hold that started in time still counts.
          if (s.phase === "prompt" && cfg.assist !== "wait" && s.holdTime === 0) {
            s.windowLeft -= dt;
            if (s.windowLeft <= 0) finish(false, events);
          }
        } else if (s.phase === "result") {
          s.clock -= dt;
          if (s.clock <= 0) {
            s.index += 1;
            if (s.index >= cfg.prompts.length) {
              s.phase = "done";
              events.push({ type: "done" });
            } else {
              s.phase = "lead";
              s.clock = cfg.prompts[s.index].lead;
            }
          }
        }
        return events;
      },
    };
  }

  // ---------- Dialogue with a spec option
  const LAYOUTS = { 1: ["a"], 2: ["x", "b"], 3: ["x", "y", "b"], 4: ["x", "y", "b", "a"] };

  function createDialogue(options) {
    const cfg = Object.assign({ spec: null, timerScale: 1 }, options);
    const s = { node: cfg.start, timeLeft: 0, flags: {}, specUsed: false, hackLive: false, ended: false, history: [] };

    function enter(id) {
      s.node = id;
      if (!id || !cfg.nodes[id]) {
        s.ended = true;
        return;
      }
      const n = cfg.nodes[id];
      s.timeLeft = (n.seconds || 0) * (n.choices ? cfg.timerScale : 1);
    }

    const api = {
      state: s,
      node: () => cfg.nodes[s.node],
      // The three normal choices sit on X, Y and B. The spec option only exists if the player qualifies.
      options() {
        const n = api.node();
        if (!n || !n.choices) return [];
        const buttons = LAYOUTS[n.choices.length];
        const out = n.choices.map((c, i) => Object.assign({ button: buttons[i], index: i }, c));
        const spec = n.spec && n.spec[cfg.spec];
        if (spec && !s.specUsed) out.push(Object.assign({ button: "a", isSpec: true }, spec));
        return out;
      },
      timerPaused: () => s.hackLive,
      hackFinished(success) {
        s.hackLive = false;
        s.flags[success ? "hackWorked" : "hackFailed"] = true;
      },
      update(dt, press) {
        const events = [];
        if (s.ended) return events;
        const n = api.node();
        const opts = api.options();
        const picked = press ? opts.find((o) => press[o.button]) : null;
        if (picked && picked.isSpec) {
          s.specUsed = true;
          s.hackLive = true;
          events.push({ type: "specStarted", label: picked.label });
          return events;
        }
        if (picked) {
          if (picked.flag) s.flags[picked.flag] = true;
          s.history.push(picked.label);
          events.push({ type: "chose", label: picked.label, timedOut: false });
          enter(picked.next);
          if (s.ended) events.push({ type: "end" });
          return events;
        }
        if (s.hackLive && n.choices) return events; // A choice cannot time out during a quick hack.
        if (n.seconds) {
          s.timeLeft -= dt;
          if (s.timeLeft <= 0) {
            if (n.choices) {
              const fallback = n.choices[n.defaultChoice || 0];
              if (fallback.flag) s.flags[fallback.flag] = true;
              s.history.push(fallback.label + " (timed out)");
              events.push({ type: "chose", label: fallback.label, timedOut: true });
              enter(fallback.next);
            } else {
              enter(n.next);
            }
            if (s.ended) events.push({ type: "end" });
          }
        }
        return events;
      },
    };
    enter(cfg.start);
    return api;
  }

  // ---------- The Fighter case
  const HACKER_COST = 2;

  function createFighterCase(options) {
    const cfg = Object.assign({ spec: "Tech", materials: 3, rep: 1, hackerAvailable: true }, options);
    const s = {
      spec: cfg.spec,
      materials: cfg.materials,
      rep: cfg.rep,
      marks: 0,
      approach: null,
      clamp: false,
      clampSubstitute: false,
      pendingClamp: false,
      fact: null, // "full" or "partial"
      pendingFact: null,
      intelBusy: false,
      suspicion: false,
      noticed: false,
      withoutClamp: false,
      disposition: null, // removed, warned, left in, untreated
      removalMethod: null,
      returnJob: false,
      closed: false,
    };

    const api = {
      state: s,
      cfg,
      hackerCost: HACKER_COST,
      canCraft: () => s.spec === "Tech" && s.materials >= 1 && !s.clamp && !s.pendingClamp,
      craftClamp() {
        if (!api.canCraft()) return false;
        s.materials -= 1;
        s.clamp = true;
        return true;
      },
      canAskClamp: () => !s.clamp && !s.pendingClamp && !s.withoutClamp,
      // Works even with the Intel Contact out, since it is only a message through them.
      askClamp() {
        if (!api.canAskClamp()) return false;
        s.pendingClamp = true;
        s.returnJob = true;
        return true;
      },
      goWithoutClamp() { s.withoutClamp = true; },
      factNeeded: () => s.suspicion && !s.fact && !s.pendingFact,
      canSend: () => api.factNeeded() && !s.intelBusy,
      send() {
        if (!api.canSend()) return false;
        s.intelBusy = true;
        s.pendingFact = "partial";
        return true;
      },
      talk() {
        if (!api.factNeeded()) return false;
        s.fact = "partial";
        return true;
      },
      canPayHacker: () => api.factNeeded() && cfg.hackerAvailable && s.materials >= HACKER_COST,
      payHacker() {
        if (!api.canPayHacker()) return false;
        s.materials -= HACKER_COST;
        s.fact = "full";
        return true;
      },
      canSelfHack: () => api.factNeeded() && s.spec === "Netrunning",
      hackSucceeded() { s.fact = "full"; },
      hackAcceptCost() {
        s.fact = "partial";
        s.noticed = true;
      },
      canTrace: () => api.factNeeded() && s.spec === "Tech",
      trace() {
        if (!api.canTrace()) return false;
        s.fact = "full";
        return true;
      },
      // Delayed services arrive when the player next comes back to the table, inside the same case.
      returnToTable() {
        const notices = [];
        if (s.pendingClamp) {
          s.pendingClamp = false;
          s.clamp = true;
          s.clampSubstitute = s.rep < 1;
          notices.push(s.clampSubstitute ? "The Scavengers sent a poor substitute for the clamp." : "The Scavengers' clamp has arrived.");
        }
        if (s.pendingFact) {
          s.fact = s.pendingFact;
          s.pendingFact = null;
          s.intelBusy = false;
          notices.push("The Intel Contact is back with a rumour.");
        }
        return notices;
      },
      factText() {
        if (s.fact === "full") return "The Gang's mark is on the code. It has a command that can stop his heart.";
        return "The Gang has been in that arm, and it can stop his heart.";
      },
      choose(disposition) {
        s.disposition = disposition;
        if (disposition !== "removed") return;
        if (s.spec === "Tech" || s.spec === "Netrunning") s.removalMethod = "himself";
        else if (cfg.hackerAvailable) s.removalMethod = "talked through by the Hacker Contact";
        else s.removalMethod = "pulled the controller by hand";
      },
      sendAway() {
        s.disposition = "untreated";
        s.closed = true;
      },
      close(waive) {
        if (waive) s.marks += 1;
        else s.rep += 1;
        s.closed = true;
      },
      doReturnJob() {
        if (!s.returnJob) return 0;
        const gained = s.spec === "Tech" ? 2 : 1;
        s.materials += gained;
        s.returnJob = false;
        return gained;
      },
      beatText() {
        switch (s.disposition) {
          case "removed": return "At the bar, the Gang Enforcer makes it clear that Marcus and the Fighter are both targets.";
          case "warned": return "The Intel Contact reports what the Fighter did with the warning.";
          case "left in": return "A line reports the match result.";
          default: return "One shared report line says the patient left untreated.";
        }
      },
    };
    return api;
  }

  const exported = { createTreatment, createProcedure, createHeart, ecgSample, createSurgery, createQte, createDialogue, createFighterCase, LAYOUTS };
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
  else root.DemoCore = exported;
})(this);
