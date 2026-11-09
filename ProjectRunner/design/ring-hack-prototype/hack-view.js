"use strict";
// The ring lock on screen: drawing, sound and controller reading. The rules are in hack-core.js.
// The custom prototype (index.html) and the level game (levels.html) both use it, so they look and play the same.
const HackView = (() => {
const $ = (id) => document.getElementById(id);
const RING_COLORS = ["#ff454c", "#f528c9", "#9846f5", "#16c9f3", "#ffb020", "#4f7dff"];
const RED = "#ff1f2e";
const RED_START = 680;
const GOOD = "#39e27d";
let hack = null;
let settings = {};
let coach = null; // a line from the page that replaces the usual prompt

// ---------- Geometry
function arcPath(radius, center, width) {
  const a = (center - width / 2) * Math.PI / 180;
  const b = (center + width / 2) * Math.PI / 180;
  const large = width > 180 ? 1 : 0;
  return `M ${radius * Math.cos(a)} ${radius * Math.sin(a)} A ${radius} ${radius} 0 ${large} 1 ${radius * Math.cos(b)} ${radius * Math.sin(b)}`;
}

// ---------- Sound
let audio = null, osc = null, gain = null;
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
  const o = audio.createOscillator(), g = audio.createGain();
  o.type = type || "square";
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.08, audio.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + seconds);
  o.connect(g).connect(audio.destination);
  o.start();
  o.stop(audio.currentTime + seconds);
}

// ---------- The ring stack
function prepareRing(fromScale) {
  const body = $("ringBody");
  body.style.transition = "none";
  body.style.stroke = RING_COLORS[hack.state.ring % RING_COLORS.length];
  body.style.opacity = 1;
  body.style.transform = `scale(${fromScale})`;
  const noise = $("noise");
  noise.style.transition = "none";
  noise.style.transform = `scale(${fromScale})`;
  body.getBoundingClientRect();
  body.style.transition = "";
  noise.style.transition = "";
  body.style.transform = "scale(1)";
  noise.style.transform = "scale(1)";
  $("live").style.display = "";
}

// The newest solved ring sits just outside the live ring. Older ones sit further out and fade.
function layoutSolved() {
  const rings = [...$("solved").children];
  rings.forEach((c, i) => {
    const step = rings.length - i;
    c.style.transform = `scale(${1 + 0.23 * step})`;
    c.style.opacity = Math.max(0.05, 0.36 - step * 0.08);
  });
}

// A shattered ring stays in the stack in pieces, so the red ring can still push it back.
function pushSolvedRing(broken) {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("class", "ring");
  c.setAttribute("r", "390");
  c.style.stroke = GOOD;
  if (broken) c.style.strokeDasharray = "90 60 40 70";
  c.style.transform = "scale(1)";
  $("solved").appendChild(c);
  c.getBoundingClientRect();
  layoutSolved();
}

function shatterRing() {
  const box = $("shards");
  box.innerHTML = "";
  const color = RING_COLORS[hack.state.ring % RING_COLORS.length];
  const count = 14;
  for (let i = 0; i < count; i++) {
    const angle = (i + 0.5) * 360 / count + (Math.random() - 0.5) * 8;
    const rad = angle * Math.PI / 180;
    const reach = 170 + Math.random() * 190;
    const s = document.createElementNS("http://www.w3.org/2000/svg", "path");
    s.setAttribute("class", "shard");
    s.setAttribute("d", arcPath(390, angle, 360 / count - 2));
    s.setAttribute("stroke", color);
    s.style.setProperty("--dx", `${Math.cos(rad) * reach}px`);
    s.style.setProperty("--dy", `${Math.sin(rad) * reach}px`);
    s.style.setProperty("--turn", `${(Math.random() - 0.5) * 240}deg`);
    box.appendChild(s);
  }
  $("live").style.display = "none";
  pushSolvedRing(true);
  [0, 70, 150].forEach((ms, i) => setTimeout(() => beep(1500 - i * 500, 0.12, "sawtooth"), ms));
}

// The red ring stops at the newest solved ring, or at the live ring if none is solved.
function redTarget() {
  return $("solved").children.length ? 554 : 456;
}

function redRadius() {
  return RED_START + (redTarget() - RED_START) * hack.redProgress();
}

const FAIL_TEXT = {
  "timed out": "Timed out. The ring reset.",
  "wrong arrow": "Wrong arrow. The ring reset.",
  "caught by the sweep": "The antivirus caught you. The ring reset.",
  "fitted the decoy": "That was the decoy. The ring reset.",
  "search timed out": "You ran out of time to find the gap. The ring reset.",
};
const SHATTER_TEXT = {
  "last ring": "Ring break: the last ring shatters.",
  "timed out": "Out of time, but your break shattered the ring.",
  "wrong arrow": "Wrong arrow, but your break shattered the ring.",
  "caught by the sweep": "The antivirus caught you, but your break shattered the ring.",
  "fitted the decoy": "That was the decoy, but your break shattered the ring.",
  "search timed out": "Out of time, but your break shattered the ring.",
};
let flashText = "", flashLeft = 0;
const SWEEP_FLASH_SECONDS = 0.35;
let sweepFlash = 0;
function flash(t) { flashText = t; flashLeft = 1.6; }

function openLock() {
  beep(660, 0.15); setTimeout(() => beep(990, 0.3), 140);
  $("stage").classList.add("opened");
  $("live").style.display = "none";
  [...$("solved").children].forEach((c, i) => {
    c.style.animationDelay = `${i * 0.12}s`;
    c.classList.add("wave");
  });
  const box = $("granted");
  box.innerHTML = [..."Access granted"].map((ch, i) =>
    `<span style="animation-delay:${0.35 + i * 0.035}s">${ch === " " ? "&nbsp;" : ch}</span>`).join("");
  box.classList.add("on");
}

// Sound and on-screen reaction to one event from the rules.
function handle(e) {
  if (e.type === "fit") beep(880, 0.12);
  if (e.type === "missedFit") beep(150, 0.12);
  if (e.type === "arrowHit") beep(1040, 0.06);
  if (e.type === "ringFailed" && !e.absorbed) { beep(110, 0.35, "sawtooth"); flash(FAIL_TEXT[e.reason] || "The ring reset."); }
  if (e.type === "ringShattered") { shatterRing(); flash(SHATTER_TEXT[e.reason] || "Your break shattered the ring."); }
  if (e.type === "storyBlocked") { beep(990, 0.12); flash("Your ring break stopped the alarm."); }
  if (e.type === "sweepAttached") {
    sweepFlash = SWEEP_FLASH_SECONDS;
    beep(520, 0.07, "square");
    setTimeout(() => beep(780, 0.09, "square"), 70);
    flash("The antivirus has attached. Keep moving.");
  }
  if (e.type === "gapMoved") { beep(330, 0.1); flash("The gap moved."); }
  if (e.type === "ringSolved") { beep(1320, 0.2); pushSolvedRing(); $("live").style.display = "none"; }
  if (e.type === "nextRing") prepareRing(0.35);
  if (e.type === "alarm") {
    [0, 180, 360, 540].forEach((t, i) => setTimeout(() => beep(i % 2 ? 620 : 880, 0.16, "sawtooth"), t));
    flash(e.source === "story" ? "Alarm. Security is awake." : "Alarm. Solve the red ring before it closes in.");
  }
  if (e.type === "redWrong") { beep(110, 0.25, "sawtooth"); flash("Wrong arrow. Find the red gap again."); }
  if (e.type === "redSolved") beep(1320, 0.2);
  if (e.type === "alarmCleared") { beep(990, 0.15); flash("Alarm cleared."); }
  if (e.type === "redHit") beep(90, 0.5, "sawtooth");
  if (e.type === "ringPushedBack") {
    if (e.pushed) {
      const last = $("solved").lastElementChild;
      if (last) last.remove();
      layoutSolved();
      prepareRing(1.23);
      flash("The red ring pushed a solved ring back. Solve it again.");
    } else {
      flash("The red ring reached the lock. This ring starts over.");
    }
  }
  if (e.type === "lockout") beep(70, 0.7, "sawtooth");
  if (e.type === "open") openLock();
}

// ---------- Input
const held = {};
const keyQueue = { fit: false, dir: null, restart: false, rate: null };
let mouseAngle = null;
let lastDevice = "pad";
const padPrev = {};
let stickDirArmed = true;

const KEY_DIRS = { KeyW: "up", KeyS: "down", KeyA: "left", KeyD: "right", ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" };

window.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  if (e.target && e.target.tagName === "INPUT" && e.target.type === "text") return;
  const inField = e.target && e.target.tagName === "INPUT";
  if (e.code === "Digit1") keyQueue.rate = "x";
  if (e.code === "Digit2") keyQueue.rate = "y";
  if (e.code === "Digit3") keyQueue.rate = "b";
  if (e.code === "KeyE") keyQueue.fit = true;
  if (e.code === "Enter" && !inField) keyQueue.restart = true;
  if (KEY_DIRS[e.code] && !inField) {
    lastDevice = "keys";
    if (hack && hack.state.phase === "sequence") keyQueue.dir = KEY_DIRS[e.code];
    e.preventDefault();
  }
  held[e.code] = true;
});
window.addEventListener("keyup", (e) => { held[e.code] = false; });

$("lock").addEventListener("mousemove", (e) => {
  const r = $("lock").getBoundingClientRect();
  mouseAngle = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
  lastDevice = "mouse";
});

function firstPad() {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  for (const p of pads) if (p && p.connected !== false) return p;
  return null;
}

function pressed(pad, i) {
  const b = pad.buttons[i];
  return !!(b && (b.pressed || b.value > 0.5));
}

function edge(pad, i) {
  const now = pressed(pad, i);
  const was = !!padPrev[i];
  padPrev[i] = now;
  return now && !was;
}

function readInput() {
  const input = {};
  const pad = firstPad();
  const status = $("pad-status");
  if (pad) {
    const text = pad.mapping === "standard" ? `Controller: ${pad.id}` : `Controller found with a non-standard mapping, so buttons may be wrong: ${pad.id}`;
    if (status.textContent !== text) status.textContent = text;

    const rx = pad.axes[2] || 0, ry = pad.axes[3] || 0;
    if (Math.hypot(rx, ry) > 0.5) {
      input.targetAngle = Math.atan2(ry, rx) * 180 / Math.PI;
      lastDevice = "pad";
    }
    if (edge(pad, 5)) input.fit = true;
    const restartPress = edge(pad, 0);
    if (restartPress) keyQueue.restart = true;
    const ratePress = { x: edge(pad, 2), y: edge(pad, 3), b: edge(pad, 1) };
    for (const k of Object.keys(ratePress)) if (ratePress[k]) keyQueue.rate = k;

    const dpad = { 12: "up", 13: "down", 14: "left", 15: "right" };
    for (const b of Object.keys(dpad)) if (edge(pad, +b)) input.dir = dpad[b];

    const lx = pad.axes[0] || 0, ly = pad.axes[1] || 0, m = Math.hypot(lx, ly);
    if (m < 0.35) stickDirArmed = true;
    if (m > 0.75 && stickDirArmed && !input.dir) {
      stickDirArmed = false;
      input.dir = Math.abs(lx) > Math.abs(ly) ? (lx > 0 ? "right" : "left") : (ly > 0 ? "down" : "up");
    }
  }
  if (lastDevice === "mouse" && mouseAngle !== null) input.targetAngle = mouseAngle;
  if (held.ArrowLeft) input.rotate = -(hack ? settings.arrowSpeed : 0);
  if (held.ArrowRight) input.rotate = hack ? settings.arrowSpeed : 0;
  if (keyQueue.fit) input.fit = true;
  if (keyQueue.dir) input.dir = keyQueue.dir;
  keyQueue.fit = false;
  keyQueue.dir = null;
  return input;
}

// ---------- Drawing
let lastTick = -1;
const CHEVRON_TURN = { up: 0, right: 90, down: 180, left: 270 };
const CYAN = "#16e8ea";
const CORRUPT = "#f528c9";
let seqKey = "";

function chevron(dir, y, size, opacity, corrupt, centered) {
  const dash = corrupt ? ' stroke-dasharray="0.454 0.14"' : "";
  return `<polyline points="-1,0.5 0,-0.5 1,0.5" fill="none" stroke="${corrupt ? CORRUPT : CYAN}" stroke-width="0.36" stroke-miterlimit="4"${dash} opacity="${opacity}" transform="translate(0 ${y}) rotate(${CHEVRON_TURN[dir]}) scale(${size})${centered ? " translate(0 0.064)" : ""}"></polyline>`;
}

function drawSequence(s) {
  const key = s.phase === "sequence" ? `${s.ring}:${s.seqIndex}:${s.sequence.join()}:${s.corrupted}:${settings.netrun}` : "";
  if (key === seqKey) return;
  seqKey = key;
  const g = $("seq");
  if (!key) { g.innerHTML = ""; return; }
  const upcoming = settings.bigArrows ? (settings.netrun ? [0.75, 0.5] : [0.5, 0.25]) : settings.netrun ? [0.85, 0.6] : [0.6, 0.35];
  const out = [];
  for (let i = s.sequence.length - 1; i >= s.seqIndex; i--) {
    const n = i - s.seqIndex;
    if (n > 2) continue;
    const opacity = n === 0 ? 1 : upcoming[n - 1];
    // The level game draws the current arrow large, in the exact middle of the ring, with the next ones small below it.
    const size = settings.bigArrows ? [115, 44, 24][n] : n === 0 ? 52 : 46;
    // The current arrow is on top, and the next ones wait below it.
    const y = settings.bigArrows ? [0, 222, 303][n] : -140 + n * 140;
    // The stroke's point makes a chevron sit off its own middle, so the large one is nudged back.
    out.push(chevron(s.sequence[i], y, size, opacity, i === s.corrupted, settings.bigArrows && n === 0));
  }
  g.innerHTML = out.join("");
}

function draw(dt) {
  const s = hack.state;
  const close = hack.closeness();
  const decoyCue = hack.decoyCue();
  const stutter = Math.sin(s.elapsed * Math.PI * 6) > 0 ? 1 : 0.25;
  const eased = close * close * (decoyCue ? stutter : 1);
  const strength = settings.cueStrength / 100;
  const color = RING_COLORS[s.ring % RING_COLORS.length];
  const searching = s.phase === "search";
  const sequencing = s.phase === "sequence";

  // Ring and gap. While the alarm is on, the player works the red ring and the current ring waits.
  const onRed = s.onRed;
  const activeRadius = onRed ? redRadius() : 390;
  const redSolving = onRed && s.phase === "solving";
  const redEl = $("redRing");
  $("stage").classList.toggle("alarm", onRed && !redSolving);
  const intruder = $("intruder");
  if (intruder) intruder.hidden = !onRed || redSolving;
  $("noise").style.display = settings.netrun || onRed ? "none" : "";
  redEl.style.display = onRed ? "" : "none";
  if (onRed) {
    redEl.setAttribute("r", activeRadius);
    redEl.setAttribute("stroke", redSolving ? GOOD : RED);
    redEl.style.opacity = redSolving ? Math.max(0, s.solveLeft / HackCore.RED_SOLVE_SECONDS) : 1;
  }
  const mask = $("gapMask");
  const piece = $("piece");
  if (searching) {
    const hidden = settings.hideGap && settings.search;
    const nearGap = hack.nearness(s.gap);
    const reveal = hidden ? Math.max(0, (nearGap * nearGap - 0.45) / 0.55) : 1;
    mask.setAttribute("d", arcPath(activeRadius, s.gap, settings.gapDegrees));
    mask.setAttribute("stroke", "#07090e");
    mask.setAttribute("opacity", reveal);
    piece.setAttribute("d", "");
  } else if (sequencing) {
    mask.setAttribute("d", "");
    piece.setAttribute("d", arcPath(activeRadius, s.gap, settings.gapDegrees));
    piece.setAttribute("stroke", "#fff");
  } else {
    mask.setAttribute("d", "");
    piece.setAttribute("d", "");
  }

  // Glow cue, and the lit ring once fitted
  const decoyEl = $("decoyMask");
  if (searching && s.decoyGap !== null) {
    const nearDecoy = hack.nearness(s.decoyGap);
    const hidden = settings.hideGap && settings.search;
    const reveal = hidden ? Math.max(0, (nearDecoy * nearDecoy - 0.45) / 0.55) : 1;
    decoyEl.setAttribute("d", arcPath(activeRadius, s.decoyGap, settings.gapDegrees));
    decoyEl.setAttribute("stroke", "#07090e");
    decoyEl.setAttribute("opacity", reveal * stutter);
  } else {
    decoyEl.setAttribute("d", "");
  }
  const sweepEl = $("sweepArc");
  sweepFlash = Math.max(0, sweepFlash - dt);
  if (searching && !onRed && hack.sweepActive() && settings.search) {
    // Attaching: it spirals in from outside, grows to full width, overshoots the ring slightly, then snaps on with a flash.
    const p = hack.sweepAttachProgress();
    const back = 1 + 2.7 * Math.pow(p - 1, 3) + 1.7 * Math.pow(p - 1, 2);
    const radius = 660 + (446 - 660) * back;
    const spin = Math.pow(1 - p, 2) * 540;
    const width = hack.state.cfg.sweepWidth * Math.min(1, 0.2 + 0.8 * p);
    sweepEl.setAttribute("d", arcPath(radius, s.sweepAngle + spin, width));
    const lit = s.sweepContact > 0 || sweepFlash > 0;
    sweepEl.setAttribute("stroke", lit ? "#ffffff" : "#ffb020");
    sweepEl.setAttribute("stroke-width", 20 + 16 * (sweepFlash / SWEEP_FLASH_SECONDS));
    sweepEl.style.opacity = p < 1 ? 0.25 + 0.75 * p : 1;
    sweepEl.style.filter = sweepFlash > 0 ? `drop-shadow(0 0 ${40 * sweepFlash / SWEEP_FLASH_SECONDS}px #ffb020)` : "";
  } else {
    sweepEl.setAttribute("d", "");
    sweepEl.style.filter = "";
  }

  const body = $("ringBody");
  const glowTarget = onRed ? redEl : body;
  const glowColor = onRed ? RED : color;
  let glow = settings.cueGlow && searching ? eased * strength * 50 : 0;
  if (sequencing) glow = 16;
  body.style.filter = "";
  redEl.style.filter = "";
  glowTarget.style.filter = glow > 0.5 ? `drop-shadow(0 0 ${glow}px ${glowColor}) brightness(${1 + glow / 60})` : "";
  if (onRed) body.style.opacity = 0.2;
  else body.style.opacity = searching ? 0.55 + (settings.cueGlow ? eased * 0.45 * strength : 0) : 1;

  // Arrow, pointing in at the ring
  const arrow = $("arrow");
  arrow.style.display = searching ? "" : "none";
  arrow.setAttribute("transform", `rotate(${s.arrow}) translate(${activeRadius + 46} 0) rotate(90)`);

  // Timer
  const circumference = 2 * Math.PI * Number($("timerArc").getAttribute("r"));
  // The same dial shows the time for the arrows, or in amber the time to find the gap.
  const searchTimer = hack.searchTimerOn();
  const arrowTimer = sequencing && !onRed && settings.timerSeconds > 0;
  const timerOn = arrowTimer || searchTimer;
  const fraction = arrowTimer ? Math.max(0, s.timeLeft / settings.timerSeconds) : searchTimer ? Math.max(0, s.searchLeft / settings.searchSeconds) : 0;
  $("timerArc").style.display = timerOn ? "" : "none";
  $("timerBack").style.display = timerOn ? "" : "none";
  $("timerArc").setAttribute("stroke-dasharray", `${circumference * fraction} ${circumference}`);
  $("timerArc").setAttribute("stroke", fraction < 0.3 ? "#ff454c" : searchTimer ? "#ffb020" : "#16e8ea");
  $("lockIcon").style.display = sequencing ? "none" : "";
  drawSequence(s);

  // Tone cue
  if (audio && gain) {
    const on = settings.cueTone && searching;
    gain.gain.setTargetAtTime(on ? (0.015 + 0.11 * eased) * strength : 0, audio.currentTime, 0.02);
    osc.frequency.setTargetAtTime(170 + 780 * eased, audio.currentTime, 0.02);
  }

  // Rumble stand-in. This page never calls the controller's vibration.
  const rumble = settings.cueRumble && searching ? eased * strength : 0;
  $("rumbleBox").style.visibility = settings.cueRumble ? "visible" : "hidden";
  $("rumbleFill").style.width = `${rumble * 100}%`;
  const shake = rumble * 5;
  $("pad").style.transform = shake > 0.1 ? `translate(${(Math.random() - 0.5) * shake * 2}px, ${(Math.random() - 0.5) * shake * 2}px)` : "";

  // Readouts
  $("hudRing").textContent = `${Math.min(s.ring + 1, settings.rings)} / ${settings.rings}`;
  $("hudFailed").textContent = settings.lockoutAfter > 0 ? `${s.failed} / ${settings.lockoutAfter}` : `${s.failed}`;
  $("hudSearch").textContent = searchTimer ? `${Math.max(0, s.searchLeft).toFixed(1)} s left` : searching ? `${s.searchSeconds.toFixed(1)} s` : "-";
  $("hudBreakBox").style.display = settings.ringBreak ? "" : "none";
  $("hudBreak").textContent = s.breakUsed ? "used" : "ready";
  $("hudAlarm").textContent = !onRed ? "-" : settings.closeSeconds > 0 ? `${Math.max(0, s.alarmLeft).toFixed(1)} s` : "held";
  if (onRed && !redSolving && settings.closeSeconds > 0 && s.alarmLeft < 3) {
    const tick = Math.ceil(s.alarmLeft);
    if (tick !== lastTick) { lastTick = tick; beep(740, 0.08); }
  } else {
    lastTick = -1;
  }

  flashLeft -= dt;
  let text = "";
  if (flashLeft > 0) text = flashText;
  else if (coach) text = coach;
  else if (searching && onRed) text = hack.inGap() ? "In the red gap. Press R1." : "Find the gap in the red ring.";
  else if (searching) text = hack.inGap() || hack.inDecoy() ? "In a gap. Press R1." : "Find the gap with the right stick.";
  else if (sequencing && onRed) text = "Enter the arrows before the red ring closes in.";
  else if (sequencing && s.seqIndex === s.corrupted) text = "Corrupted arrow. Press the opposite direction.";
  else if (sequencing) text = "Enter the arrows.";
  const prompt = $("prompt");
  if (prompt.textContent !== text) prompt.textContent = text;
}


// Starts drawing a new lock from a clean state.
function begin(newHack, newSettings) {
  hack = newHack;
  settings = newSettings;
  coach = null;
  $("solved").innerHTML = "";
  $("shards").innerHTML = "";
  flashLeft = 0;
  $("stage").classList.remove("opened");
  $("granted").classList.remove("on");
  $("granted").innerHTML = "";
  prepareRing(1);
}

// Stops the search tone while the game waits on a how-to card.
function silence() {
  if (audio && gain) gain.gain.setTargetAtTime(0, audio.currentTime, 0.02);
}

return {
  begin, draw, handle, readInput, firstPad, flash, silence, startAudio, beep,
  keys: keyQueue,
  device: () => lastDevice,
  setCoach(text) { coach = text; },
};
})();
