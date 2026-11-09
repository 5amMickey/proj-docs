"use strict";
// The QTE fight: one guard, then a guard on each side. Used by the QTE demo and by the dialogue scene.
// Needs Demo and DemoCore on the page.
const Fight = (() => {
  const BUTTONS = ["x", "y", "b", "a"];
  // Round 1 is Marcus against one guard. Round 2 puts a guard on each side.
  const ROUND_1 = [
    { who: "g1", by: "guard" },
    { who: "g1", by: "marcus" },
    { who: "g1", by: "guard" },
    { who: "g1", by: "marcus" },
    { who: "g1", by: "marcus", hold: true },
  ];
  const ROUND_2 = [
    { who: "g1", by: "guard" },
    { who: "g2", by: "guard" },
    { who: "g1", by: "guard" },
    { who: "g1", by: "guard" },
    { who: "g2", by: "guard" },
    { who: "g1", by: "marcus", hold: true },
    { who: "g2", by: "guard" },
    { who: "g2", by: "marcus", hold: true },
  ];
  const NAMES = { g1: "Guard 1", g2: "Guard 2" };
  const FLOOR = 360;
  const FIGURE = `<rect x="-16" y="260" width="32" height="100"></rect><circle cx="0" cy="240" r="18"></circle>`;

  // svg: the empty drawing area. roundEl and lineEl: where the round name and the running commentary go.
  function create({ svg, roundEl, lineEl, settings }) {
    svg.innerHTML = `<rect x="0" y="360" width="1000" height="6" fill="#2a3240"></rect>
      <g data-f="g1">${FIGURE}</g><g data-f="g2">${FIGURE}</g><g data-f="marcus">${FIGURE}</g><g data-f="prompts"></g>`;
    const part = (name) => svg.querySelector(`[data-f="${name}"]`);
    const figures = {
      marcus: { el: part("marcus"), color: "#16e8ea", x: 400, home: 400, recoil: 0, flash: 0, flashColor: "#fff", down: false, shown: true },
      g1: { el: part("g1"), color: "#ff454c", x: 640, home: 640, recoil: 0, flash: 0, flashColor: "#fff", down: false, shown: true },
      g2: { el: part("g2"), color: "#ff454c", x: 1060, home: 1060, recoil: 0, flash: 0, flashColor: "#fff", down: false, shown: false },
    };
    const keyPrompt = Demo.createKeyPrompt(part("prompts"));
    let q = null;
    let beats = [];
    let round = 0;
    let hurt = 0;

    function makePrompts() {
      beats = ROUND_1.concat(ROUND_2);
      let last = null;
      return beats.map((beat, i) => {
        const open = BUTTONS.filter((b) => b !== last);
        last = open[Math.floor(Math.random() * open.length)];
        const firstOfRound2 = i === ROUND_1.length;
        return { lead: firstOfRound2 ? Math.max(2, settings.leadSeconds) : settings.leadSeconds, type: beat.hold ? "hold" : "press", button: last };
      });
    }

    function setRound(n) {
      round = n;
      roundEl.textContent = n === 1 ? "Round 1: one guard" : "Round 2: a guard on each side";
      const { marcus, g1, g2 } = figures;
      for (const f of [marcus, g1, g2]) { f.down = false; f.recoil = 0; f.flash = 0; }
      if (n === 1) {
        marcus.x = marcus.home = 400;
        g1.x = g1.home = 640;
        g2.shown = false;
      } else {
        g1.x = -60; g1.home = 170;
        g2.x = 1060; g2.home = 830;
        marcus.home = 500;
        g2.shown = true;
      }
    }

    function resolve(hit) {
      const beat = beats[q.state.index];
      const guard = figures[beat.who];
      const marcus = figures.marcus;
      const away = guard.x < marcus.x ? -1 : 1;
      if (beat.hold) {
        // A finisher always ends the guard, because the fight has no fail state. Missing it costs Marcus a hit.
        guard.down = true;
        guard.recoil = away * (hit ? 90 : 30);
        guard.flash = 0.3; guard.flashColor = "#fff";
        if (!hit) { hurt += 1; marcus.flash = 0.35; marcus.flashColor = "#ff454c"; marcus.recoil = -away * 34; }
        lineEl.textContent = hit ? `The finisher lands. ${NAMES[beat.who]} is down.` : `${NAMES[beat.who]} goes down the hard way, and Marcus takes a hit.`;
        Demo.beep(hit ? 300 : 120, 0.35, "sawtooth");
      } else if (hit) {
        guard.recoil = away * 42;
        guard.flash = 0.2; guard.flashColor = "#fff";
        marcus.recoil = away * 22;
        lineEl.textContent = beat.by === "guard" ? "Marcus counters." : "The hit lands.";
        Demo.beep(1040, 0.12);
      } else {
        hurt += beat.by === "guard" ? 1 : 0;
        if (beat.by === "guard") { marcus.flash = 0.35; marcus.flashColor = "#ff454c"; marcus.recoil = -away * 34; }
        lineEl.textContent = beat.by === "guard" ? "Marcus takes the hit." : "The swing goes wide.";
        Demo.beep(120, 0.3, "sawtooth");
      }
    }

    function drawFigure(f, pulse, windup, dir) {
      f.el.style.display = f.shown ? "" : "none";
      if (!f.shown) return;
      const scale = 1 + pulse * 0.11 + windup * 0.22;
      const lean = f.down ? 90 * dir : -windup * 9 * dir;
      f.el.setAttribute("transform", `translate(${f.x + f.recoil} ${FLOOR}) rotate(${lean}) scale(${scale}) translate(0 ${-FLOOR})`);
      const color = f.flash > 0 ? f.flashColor : f.color;
      f.el.querySelectorAll("rect, circle").forEach((p) => p.setAttribute("fill", color));
      f.el.style.opacity = f.down ? 0.45 : 1;
      const glow = pulse * 26 + windup * 30;
      f.el.style.filter = glow > 1 ? `drop-shadow(0 0 ${glow}px ${f.color})` : "";
    }

    const api = {
      get qte() { return q; },
      get beats() { return beats; },
      get hurt() { return hurt; },
      names: NAMES,
      done: () => !!q && q.state.phase === "done",
      hits: () => (q ? q.state.results.filter((r) => r.hit).length : 0),
      total: () => (q ? q.state.results.length : 0),
      start() {
        q = DemoCore.createQte({ prompts: makePrompts(), windowSeconds: settings.windowSeconds, sceneSpeed: settings.sceneSpeed, holdSeconds: settings.holdSeconds, assist: settings.assist, tapIsHold: settings.tapIsHold });
        hurt = 0;
        setRound(1);
        lineEl.textContent = "";
      },
      // Returns the QTE's events, after it has played their sound and moved the figures.
      update(dt, input) {
        const events = q.update(dt, input);
        for (const e of events) {
          if (e.type === "prompt") Demo.beep(620, 0.06);
          if (e.type === "hit") resolve(true);
          if (e.type === "miss") resolve(false);
        }

        const index = q.state.index;
        if (round === 1 && q.state.phase === "lead" && index >= ROUND_1.length) setRound(2);

        const p = q.prompt();
        const beat = q.state.phase === "done" ? null : beats[index];
        const { marcus, g1, g2 } = figures;

        // Marcus steps to whichever guard comes next. Nobody sways between keys.
        if (round === 2 && beat) {
          const target = figures[beat.who];
          marcus.home = target.home + (target.home < 500 ? 130 : -130);
        }
        const ease = 1 - Math.exp(-dt * 9);
        for (const f of [marcus, g1, g2]) {
          f.x += (f.home - f.x) * ease;
          f.recoil *= Math.exp(-dt * 7);
          f.flash = Math.max(0, f.flash - dt);
        }

        const beatPulse = Math.abs(Math.sin(q.state.sceneTime * 13));
        const holdFill = p && p.type === "hold" ? Math.min(1, q.state.holdTime / q.cfg.holdSeconds) : 0;
        const acting = p ? (beat.by === "marcus" ? marcus : figures[beat.who]) : null;
        const guardDir = (f) => (f.x < marcus.x ? -1 : 1);
        const targetDir = beat ? guardDir(figures[beat.who]) : 1;
        drawFigure(marcus, acting === marcus ? beatPulse : 0, acting === marcus ? holdFill : 0, targetDir);
        drawFigure(g1, acting === g1 ? beatPulse : 0, 0, guardDir(g1));
        drawFigure(g2, acting === g2 ? beatPulse : 0, 0, guardDir(g2));
        svg.classList.toggle("slow", !!p);

        if (p) {
          const target = figures[beat.who];
          const timeLeft = q.cfg.assist === "wait" ? 1 : q.state.windowLeft / q.cfg.windowSeconds;
          keyPrompt.show({ x: target.x, y: 105, button: p.button, type: p.type, timeLeft, holdFill });
        } else keyPrompt.hide();
        return events;
      },
    };
    return api;
  }

  return { create };
})();
