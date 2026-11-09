"use strict";
// Controller and keyboard input, sound, prompts, the clinic room, the treatment bar and a ring hack widget.
const Demo = (() => {
  const $ = (id) => document.getElementById(id);

  // ---------- Input
  const keys = {};
  const fresh = new Set();
  let device = "pad";
  const KEY_PRESS = {
    KeyE: ["a", "r1"], Space: ["a"], Digit1: ["x"], Digit2: ["y"], Digit3: ["b"], Digit4: ["a"],
    KeyW: ["up"], ArrowUp: ["up"], KeyS: ["down"], ArrowDown: ["down"],
    KeyA: ["left"], ArrowLeft: ["left"], KeyD: ["right"], ArrowRight: ["right"],
  };
  const KEY_HELD = { a: ["KeyE", "Space", "Digit4"], x: ["Digit1"], y: ["Digit2"], b: ["Digit3"] };
  const PAD_BUTTONS = { a: 0, b: 1, x: 2, y: 3, r1: 5, up: 12, down: 13, left: 14, right: 15 };
  const padPrev = {};
  let stickArmed = true;

  window.addEventListener("keydown", (e) => {
    const inField = e.target && (e.target.tagName === "INPUT" || e.target.tagName === "SELECT");
    if (inField) return;
    if (!e.repeat) fresh.add(e.code);
    keys[e.code] = true;
    device = "keys";
    if (e.code === "Space" || e.code.startsWith("Arrow")) e.preventDefault();
  });
  window.addEventListener("keyup", (e) => { keys[e.code] = false; });

  function firstPad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (const p of pads) if (p && p.connected !== false) return p;
    return null;
  }

  function poll() {
    const press = {};
    const held = {};
    let moveX = 0;
    let rotate = 0;
    let targetAngle = null;

    for (const code of fresh) (KEY_PRESS[code] || []).forEach((b) => { press[b] = true; });
    fresh.clear();
    for (const b of Object.keys(KEY_HELD)) if (KEY_HELD[b].some((c) => keys[c])) held[b] = true;
    if (keys.KeyA || keys.ArrowLeft) moveX -= 1;
    if (keys.KeyD || keys.ArrowRight) moveX += 1;
    if (keys.ArrowLeft) rotate -= 1;
    if (keys.ArrowRight) rotate += 1;

    const pad = firstPad();
    if (pad) {
      for (const name of Object.keys(PAD_BUTTONS)) {
        const b = pad.buttons[PAD_BUTTONS[name]];
        const down = !!(b && (b.pressed || b.value > 0.5));
        if (down) { held[name] = true; device = "pad"; }
        if (down && !padPrev[name]) press[name] = true;
        padPrev[name] = down;
      }
      const lx = pad.axes[0] || 0;
      const ly = pad.axes[1] || 0;
      if (Math.abs(lx) > 0.25) { moveX = lx; device = "pad"; }
      const m = Math.hypot(lx, ly);
      if (m < 0.35) stickArmed = true;
      if (m > 0.75 && stickArmed) {
        stickArmed = false;
        press[Math.abs(lx) > Math.abs(ly) ? (lx > 0 ? "right" : "left") : (ly > 0 ? "down" : "up")] = true;
      }
      const rx = pad.axes[2] || 0;
      const ry = pad.axes[3] || 0;
      if (Math.hypot(rx, ry) > 0.5) {
        targetAngle = Math.atan2(ry, rx) * 180 / Math.PI;
        device = "pad";
      }
    }
    return { press, held, moveX, rotate, targetAngle, pad };
  }

  function padStatus(pad) {
    const el = $("padStatus");
    if (!el) return;
    let text = "No controller found yet. Press a button on it.";
    if (pad) text = pad.mapping === "standard" ? `Controller: ${pad.id}` : `Controller found with a non-standard mapping, so buttons may be wrong: ${pad.id}`;
    if (el.textContent !== text) el.textContent = text;
  }

  // ---------- Sound
  let audio = null;
  let osc = null;
  let gain = null;
  function startAudio() {
    if (audio) { audio.resume(); return; }
    try {
      audio = new (window.AudioContext || window.webkitAudioContext)();
      osc = audio.createOscillator();
      gain = audio.createGain();
      osc.type = "triangle";
      gain.gain.value = 0;
      osc.connect(gain).connect(audio.destination);
      osc.start();
    } catch (e) { audio = null; }
  }
  function beep(freq, seconds, type) {
    if (!audio) return;
    const o = audio.createOscillator();
    const g = audio.createGain();
    o.type = type || "square";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.07, audio.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + seconds);
    o.connect(g).connect(audio.destination);
    o.start();
    o.stop(audio.currentTime + seconds);
  }
  function tone(level) {
    if (!audio || !gain) return;
    gain.gain.setTargetAtTime(level > 0 ? 0.012 + 0.09 * level : 0, audio.currentTime, 0.02);
    osc.frequency.setTargetAtTime(170 + 780 * level, audio.currentTime, 0.02);
  }

  // ---------- Prompts
  const LABELS = { a: { pad: "A", keys: "E" }, x: { pad: "X", keys: "1" }, y: { pad: "Y", keys: "2" }, b: { pad: "B", keys: "3" } };
  const label = (button) => LABELS[button][device];
  const usingPad = () => device === "pad";

  // The positional diamond: the lit dot is the button's position on the controller.
  function diamond(button) {
    const pos = { y: [20, 8], x: [8, 20], b: [32, 20], a: [20, 32] };
    const dots = Object.keys(pos).map((k) => {
      const [cx, cy] = pos[k];
      return k === button
        ? `<circle cx="${cx}" cy="${cy}" r="8" fill="#16e8ea"></circle><text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#04121a" font-family="Verdana">${label(k)}</text>`
        : `<circle cx="${cx}" cy="${cy}" r="4" fill="none" stroke="#5a6678" stroke-width="1.5"></circle>`;
    }).join("");
    return `<svg class="diamond" viewBox="0 0 40 40" aria-hidden="true">${dots}</svg>`;
  }

  function choicesHtml(options) {
    return options.map((o) => `<div class="choice ${o.button}${o.isSpec ? " spec" : ""}${o.disabled ? " off" : ""}"><span class="pill">${o.icon ? `<img class="pill-icon" src="${o.icon}-icon.png" alt="">` : ""}${o.label}</span><span class="btn">${label(o.button)}</span></div>`).join("");
  }

  // One large key to press, drawn in an SVG. The ring is the time left, and a hold fills the key green.
  function createKeyPrompt(parent) {
    const ns = "http://www.w3.org/2000/svg";
    const g = document.createElementNS(ns, "g");
    const c = 2 * Math.PI * 58;
    g.innerHTML = `<circle r="58" fill="#04121a" stroke="#2a3240" stroke-width="8"></circle>
      <circle class="charge" r="0" fill="#39e27d" opacity=".55"></circle>
      <circle class="time" r="58" fill="none" stroke="#16e8ea" stroke-width="8" transform="rotate(-90)" stroke-dasharray="${c} ${c}"></circle>
      <text class="key" y="24" text-anchor="middle" font-size="68" font-weight="700" fill="#e8ecf3" font-family="Verdana"></text>
      <text class="hint" y="92" text-anchor="middle" font-size="24" font-weight="700" fill="#39e27d" font-family="Verdana"></text>`;
    g.style.display = "none";
    parent.appendChild(g);
    const q = (name) => g.querySelector("." + name);
    return {
      show({ x, y, button, type, timeLeft, holdFill }) {
        g.setAttribute("transform", `translate(${x} ${y})`);
        q("key").textContent = label(button);
        q("hint").textContent = type === "hold" ? "HOLD" : "";
        q("time").setAttribute("stroke-dasharray", `${c * Math.max(0, timeLeft)} ${c}`);
        q("charge").setAttribute("r", 54 * Math.min(1, holdFill || 0));
        g.style.display = "";
      },
      hide() { g.style.display = "none"; },
    };
  }

  function notice(text) {
    const box = $("notices");
    if (!box) return;
    const n = document.createElement("div");
    n.className = "notice";
    n.textContent = text;
    box.appendChild(n);
    setTimeout(() => n.remove(), 4000);
  }

  // ---------- Menu: a line of text and choices laid out by count
  function createMenu(root) {
    root.classList.add("dialog");
    root.hidden = true;
    root.innerHTML = `<div class="speaker"></div><div class="text"></div><div class="choices"></div><div class="timebar" hidden><div></div></div>`;
    let current = null;
    let drawnDevice = null;
    const api = {
      get open() { return !!current; },
      show(m) {
        const layout = DemoCore.LAYOUTS[m.options.length];
        current = Object.assign({}, m, { options: m.options.map((o, i) => Object.assign({ button: layout[i] }, o)), left: m.seconds || 0 });
        root.querySelector(".speaker").textContent = m.speaker || "";
        root.querySelector(".text").textContent = m.text || "";
        root.querySelector(".timebar").hidden = !m.seconds;
        root.querySelector(".choices").innerHTML = choicesHtml(current.options);
        drawnDevice = device;
        root.hidden = false;
      },
      close() {
        current = null;
        root.hidden = true;
      },
      update(dt, press) {
        if (!current) return false;
        if (drawnDevice !== device) {
          root.querySelector(".choices").innerHTML = choicesHtml(current.options);
          drawnDevice = device;
        }
        const pick = current.options.find((o) => press[o.button] && !o.disabled);
        if (pick) {
          const m = current;
          api.close();
          beep(740, 0.06);
          (pick.run || m.onPick || (() => {}))(pick);
          return true;
        }
        if (current.seconds) {
          current.left -= dt;
          root.querySelector(".timebar div").style.width = `${Math.max(0, current.left / current.seconds) * 100}%`;
          if (current.left <= 0) {
            const m = current;
            const fallback = m.options[m.defaultIndex || 0];
            api.close();
            (fallback.run || m.onPick || (() => {}))(fallback);
          }
        }
        return true;
      },
    };
    return api;
  }

  // ---------- A how-to card: the game waits while it's up, and A moves on
  function createCard(root) {
    root.classList.add("howto");
    root.hidden = true;
    root.innerHTML = `<div class="howto-card"><h2 class="howto-title"></h2><div class="howto-body"></div><div class="howto-go"><span class="btn"></span><span class="howto-go-text"></span></div></div>`;
    let current = null;
    let wait = 0;
    const api = {
      get open() { return !!current; },
      // A card with no lines of its own is still a card: it shows its title and waits.
      show(card) {
        current = card;
        wait = 0;
        root.querySelector(".howto-title").textContent = card.title || "";
        root.querySelector(".howto-body").innerHTML = (card.lines || []).map((l) => `<p>${l}</p>`).join("");
        root.querySelector(".howto-go-text").textContent = card.go || "Continue";
        root.querySelector(".btn").textContent = label("a");
        root.hidden = false;
      },
      // The short wait stops the press that opened the card from also closing it.
      update(dt, press) {
        if (!current) return;
        wait += dt;
        root.querySelector(".btn").textContent = label("a");
        if (press.a && wait > 0.25) {
          const done = current.onClose;
          current = null;
          root.hidden = true;
          beep(740, 0.06);
          if (done) done();
        }
      },
      close() {
        current = null;
        root.hidden = true;
      },
    };
    return api;
  }

  // ---------- Treatment bar
  function createBar(root) {
    let key = "";
    return {
      draw(treatment) {
        const s = treatment.state;
        const k = s.steps.map((x) => x.name).join("|");
        if (k !== key) {
          key = k;
          root.className = "bar";
          root.innerHTML = `<div class="bar-track">${s.steps.map((x) => `<div class="bar-seg${x.critical ? " critical" : ""}"><div class="bar-fill"></div></div>`).join("")}</div>
            <div class="bar-names">${s.steps.map((x) => `<span>${x.name}${x.critical ? " (critical)" : ""}</span>`).join("")}</div>`;
        }
        root.querySelectorAll(".bar-fill").forEach((f, i) => {
          f.style.width = `${i < s.index ? 100 : i === s.index ? s.progress * 100 : 0}%`;
        });
        root.querySelectorAll(".bar-names span").forEach((n, i) => n.classList.toggle("on", i === s.index));
      },
    };
  }

  // ---------- Clinic room
  function createRoom(root, stations) {
    const ns = "http://www.w3.org/2000/svg";
    root.setAttribute("viewBox", "0 0 1000 340");
    root.setAttribute("preserveAspectRatio", "xMidYMid meet");
    root.innerHTML = `<rect x="0" y="290" width="1000" height="6" fill="#2a3240"></rect>` + stations.map((st) =>
      `<rect x="${st.x - 45}" y="${290 - st.h}" width="90" height="${st.h}" fill="#1b212c" stroke="#3a4557"></rect>
       <text x="${st.x}" y="316" text-anchor="middle" font-size="14" fill="#93a0b4" font-family="Verdana">${st.label}</text>`).join("") +
      `<g id="patient"><rect x="${stations.find((x) => x.id === "table").x - 40}" y="205" width="80" height="20" rx="8" fill="#ffb020"></rect></g>
       <g id="marcus"><rect x="-14" y="222" width="28" height="68" fill="#16e8ea"></rect><circle cx="0" cy="206" r="14" fill="#16e8ea"></circle></g>`;
    const marcus = root.querySelector("#marcus");
    const patient = root.querySelector("#patient");
    const api = {
      x: stations.find((s) => s.id === "table").x - 120,
      near: null,
      showPatient(on) { patient.style.display = on ? "" : "none"; },
      update(dt, moveX, locked) {
        if (!locked) api.x = Math.max(30, Math.min(970, api.x + moveX * 280 * dt));
        marcus.setAttribute("transform", `translate(${api.x} 0)`);
        const close = stations.filter((s) => Math.abs(s.x - api.x) < 70).sort((a, b) => Math.abs(a.x - api.x) - Math.abs(b.x - api.x))[0];
        api.near = close ? close.id : null;
        return api.near;
      },
    };
    return api;
  }

  // ---------- Ring hack widget, on the same rules as the ring hack prototype
  const RING_COLORS = ["#ff454c", "#f528c9", "#9846f5", "#16c9f3", "#ffb020", "#4f7dff"];
  const TURN = { up: 0, right: 90, down: 180, left: 270 };
  function chevron(dir, y, size, opacity) {
    return `<polyline points="-1,0.5 0,-0.5 1,0.5" fill="none" stroke="#16e8ea" stroke-width="0.36" stroke-miterlimit="4" opacity="${opacity}" transform="translate(0 ${y}) rotate(${TURN[dir]}) scale(${size})"></polyline>`;
  }
  function arc(radius, center, width) {
    const a = (center - width / 2) * Math.PI / 180;
    const b = (center + width / 2) * Math.PI / 180;
    return `M ${radius * Math.cos(a)} ${radius * Math.sin(a)} A ${radius} ${radius} 0 0 1 ${radius * Math.cos(b)} ${radius * Math.sin(b)}`;
  }

  function createRingWidget(root) {
    root.classList.add("ringbox");
    root.innerHTML = `<svg viewBox="-640 -640 1280 1280" aria-label="Ring lock">
      <g class="solved"></g><circle class="w-ring body" r="390"></circle>
      <path class="mask" fill="none" stroke="#07090e" stroke-width="72"></path>
      <path class="piece" fill="none" stroke="#fff" stroke-width="66"></path>
      <circle class="tback" r="290" fill="none" stroke="#1b212c" stroke-width="10"></circle>
      <circle class="tarc" r="290" fill="none" stroke="#16e8ea" stroke-width="10" transform="rotate(-90)"></circle>
      <g class="seq"></g>
      <polyline class="arrow" points="-30,-30 0,0 30,-30" fill="none" stroke="#16e8ea" stroke-width="13"></polyline>
    </svg>`;
    const q = (c) => root.querySelector("." + c);
    let hack = null;
    let cfg = null;
    let seqKey = null;
    const api = {
      get hack() { return hack; },
      start(options) {
        cfg = options;
        hack = HackCore.createHack(options);
        // With no search there is no arrow outside the ring, so the ring can fill the space.
        const reach = options.search === false ? 430 : 640;
        root.querySelector("svg").setAttribute("viewBox", `${-reach} ${-reach} ${reach * 2} ${reach * 2}`);
        q("solved").innerHTML = "";
        if (options.autoFit) hack.update(0, { fit: true });
        q("body").style.display = "";
        seqKey = null;
      },
      update(dt, input) {
        if (!hack) return [];
        const dir = ["up", "down", "left", "right"].find((d) => input.press[d]);
        const events = hack.update(dt, {
          targetAngle: input.targetAngle === null ? undefined : input.targetAngle,
          rotate: input.rotate * hack.state.cfg.arrowSpeed,
          fit: !!input.press.r1,
          dir,
        });
        for (const e of events) {
          if (e.type === "fit") beep(880, 0.1);
          if (e.type === "missedFit") beep(150, 0.1);
          if (e.type === "arrowHit") beep(1040, 0.05);
          if (e.type === "arrowWrong") beep(150, 0.15, "sawtooth");
          if (e.type === "ringFailed") beep(110, 0.3, "sawtooth");
          if (e.type === "ringSolved") {
            beep(1320, 0.18);
            const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            c.setAttribute("class", "w-ring");
            c.setAttribute("r", "390");
            c.style.stroke = "#39e27d";
            q("solved").appendChild(c);
            c.getBoundingClientRect();
            const rings = [...q("solved").children];
            rings.forEach((ring, i) => {
              const step = rings.length - i;
              ring.style.transform = `scale(${1 + 0.2 * step})`;
              ring.style.opacity = Math.max(0.06, 0.36 - step * 0.08);
            });
          }
          if (e.type === "autoFit") beep(880, 0.1);
        }
        api.draw();
        return events;
      },
      draw() {
        const s = hack.state;
        const searching = s.phase === "search";
        const sequencing = s.phase === "sequence";
        const close = hack.closeness();
        const eased = close * close;
        const body = q("body");
        body.style.stroke = RING_COLORS[s.ring % RING_COLORS.length];
        body.style.opacity = searching ? 0.55 + eased * 0.4 : s.phase === "solving" || s.phase === "open" ? 0 : 1;
        body.style.filter = searching && eased > 0.02 ? `drop-shadow(0 0 ${eased * 36}px ${RING_COLORS[s.ring % RING_COLORS.length]})` : "";
        const mask = q("mask");
        mask.setAttribute("d", searching ? arc(390, s.gap, s.cfg.gapDegrees) : "");
        mask.setAttribute("opacity", Math.max(0, (eased - 0.45) / 0.55));
        q("piece").setAttribute("d", sequencing ? arc(390, s.gap, s.cfg.gapDegrees) : "");
        const arrow = q("arrow");
        arrow.style.display = searching && s.cfg.search ? "" : "none";
        arrow.setAttribute("transform", `rotate(${s.arrow}) translate(436 0) rotate(90)`);
        const timerOn = sequencing && s.cfg.timerSeconds > 0;
        const c = 2 * Math.PI * 290;
        q("tarc").style.display = timerOn ? "" : "none";
        q("tback").style.display = timerOn ? "" : "none";
        q("tarc").setAttribute("stroke-dasharray", `${c * Math.max(0, s.timeLeft / (s.cfg.timerSeconds || 1))} ${c}`);
        const key = sequencing ? `${s.ring}:${s.seqIndex}:${s.sequence.join()}` : "";
        if (key !== seqKey) {
          seqKey = key;
          const out = [];
          if (sequencing) {
            for (let i = s.sequence.length - 1; i >= s.seqIndex; i--) {
              const n = i - s.seqIndex;
              if (n > 2) continue;
              // The current arrow is on top, and the next ones wait below it.
              out.push(chevron(s.sequence[i], -140 + n * 140, n === 0 ? 52 : 46, [1, 0.6, 0.35][n]));
            }
          }
          q("seq").innerHTML = out.join("");
        }
        tone(searching && s.cfg.search ? eased : 0);
        const fill = $("rumbleFill");
        if (fill) fill.style.width = `${searching && s.cfg.search ? eased * 100 : 0}%`;
      },
      stop() {
        hack = null;
        tone(0);
        const fill = $("rumbleFill");
        if (fill) fill.style.width = "0";
      },
    };
    return api;
  }

  // ---------- The AI Companion's loading screen, with its price
  const LOAD_STEPS = ["Mapping the implant", "Tracing the line to his heart", "Cutting the link", "Cleaning up"];
  function createLoading(root) {
    let steps = LOAD_STEPS;
    root.classList.add("loading");
    root.hidden = true;
    root.innerHTML = `<div class="load-title">AI COMPANION: REMOVING THE MALWARE</div>
      <div class="load-track"><div class="load-fill"></div></div>
      <div class="load-status"></div>
      <div class="load-cost"></div>`;
    const api = {
      show(cost, left, job) {
        steps = (job && job.steps) || LOAD_STEPS;
        root.querySelector(".load-title").textContent = (job && job.title) || "AI COMPANION: REMOVING THE MALWARE";
        root.querySelector(".load-cost").textContent = (job && job.costText) || `Cost: ${cost} ${cost === 1 ? "material" : "materials"}. ${left} left.`;
        api.draw(0);
        root.hidden = false;
      },
      draw(progress) {
        const shown = Math.max(0, Math.min(1, progress));
        root.querySelector(".load-fill").style.width = `${shown * 100}%`;
        root.querySelector(".load-status").textContent = `${steps[Math.min(steps.length - 1, Math.floor(shown * steps.length))]}: ${Math.floor(shown * 100)}%`;
      },
      hide() { root.hidden = true; },
    };
    return api;
  }

  // ---------- Page helpers
  function startOverlay(onStart) {
    $("start").addEventListener("click", () => {
      startAudio();
      $("overlay").hidden = true;
      onStart();
    });
  }

  function loop(fn) {
    let last = 0;
    function step(now) {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const input = poll();
      padStatus(input.pad);
      fn(dt, input);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Sliders: [key, label, min, max, step, unit]. Values live in settings, and onChange is called on any change.
  function bindPanel(settings, sliders, checks, onChange, storeKey) {
    const defaults = Object.assign({}, settings);
    try { Object.assign(settings, JSON.parse(localStorage.getItem(storeKey) || "{}")); } catch (e) {}
    const save = () => { try { localStorage.setItem(storeKey, JSON.stringify(settings)); } catch (e) {} };
    const sync = () => {
      for (const [key, , , , , unit] of sliders) {
        $("in-" + key).value = settings[key];
        $("out-" + key).textContent = settings[key] + (unit || "");
      }
      for (const key of checks) $(key).checked = !!settings[key];
      document.querySelectorAll("select[data-setting]").forEach((el) => { el.value = settings[el.dataset.setting]; });
    };
    const box = $("sliders");
    for (const [key, name, min, max, step] of sliders) {
      const label2 = document.createElement("label");
      label2.className = "slider";
      label2.innerHTML = `<span>${name}</span><output id="out-${key}"></output><input type="range" id="in-${key}" min="${min}" max="${max}" step="${step}">`;
      box.appendChild(label2);
      const input = label2.querySelector("input");
      input.addEventListener("input", () => { settings[key] = Number(input.value); save(); sync(); onChange(key); });
      input.addEventListener("change", () => input.blur());
    }
    for (const key of checks) {
      $(key).addEventListener("change", () => { settings[key] = $(key).checked; save(); $(key).blur(); onChange(key); });
    }
    document.querySelectorAll("select[data-setting]").forEach((el) => {
      el.addEventListener("change", () => { settings[el.dataset.setting] = el.value; save(); el.blur(); onChange(el.dataset.setting); });
    });
    const reset = $("defaults");
    if (reset) reset.addEventListener("click", () => {
      Object.keys(settings).forEach((k) => { settings[k] = defaults[k]; });
      save(); sync(); onChange("all"); reset.blur();
    });
    sync();
  }

  return { $, poll, beep, tone, label, usingPad, diamond, choicesHtml, createKeyPrompt, notice, createMenu, createCard, createBar, createRoom, createRingWidget, createLoading, startOverlay, loop, bindPanel, chevron };
})();
