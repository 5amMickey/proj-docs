# Gameplay systems proposal: core loop and how it serves the story

Project: ProjectRunner, brief at $PROJ_DOCS/ProjectRunner/BRIEF.md
Lead: claude
Run thread: <t3-thread://v2/f570ea0b-5aec-4f9d-82cb-141046ccfbf3/mcp:launch:82efb6bd3ac43b53d278a253833cb28145e46aaa78f0856aab16d2f370c53458> (launched 2026-11-05)
Board parent: RUN-181, under RUN-119 Gameplay; it covers the design question in RUN-12

## Outcome

A proposal covers every gameplay system, how the systems connect into one core loop, and a simpler alternative for each, so Mike can approve it and pass it to the build.

Done when: Mike has approved the final `gameplay-systems.md`, and its build hand-off lists a goal and task list for each approved system. Nothing is built until Mike approves that goal and task list.

## Decisions (Mike's, settled 2026-11-05)

- Planning only. No gameplay work in UE. A simple prototype (web or other) is allowed only if it proves necessary and Mike approves it with a specific goal and task list.
- Simplify every system. Each proposal that may be too complex carries a simpler alternative to discuss.
- Mike approves concepts at each iteration and decides on any prototype.
- The old story is out: Chase Roberts, the Tether, the Tollmen, the Sifters, and the rest of `story/one-pager.md`.
- Story so far: Marcus is an unknown who shows up in the slum city nicknamed The Hive, or Hell Hive. The rich live in the distant, safe City of Lights. Hive people can't reach it except by one heavily guarded train line. The rest gets fleshed out in the proposal and pitch.
- Structure: authored episodes with a clinic hub. Between story beats Marcus returns to the clinic for a few hand-written patient cases.
- Growth: chapter-based skill points rebuild Marcus's strength. The first choice is a specialty: Tech, Netrunning or Enforcer. All skills can unlock by the end, depending on choices made in the game.
- Improved reflexes come by default. They slow time for QTEs and trigger automatically in the hacking minigame, as if Marcus's brain speeds up to break in.
- Failure has a story cost and never ends the game.
- Fights are authored cinematic QTEs. There is no free combat. Enforcer adds strength-based dialogue, better fight outcomes and physical solutions.
- Cast is written as roles (Hacker Companion, Fixer, and so on). Mike assigns names in a later story pass.
- CMF drafts are not touched here. A separate pass rewrites them after the proposal is approved, before the 2026-11-10 close.
- Team: Sonnet researches, Claude writes, Codex critiques before Mike sees it.

## Mike's source request (verbatim)

Goal: Working on the writeup for gameplay for ProjectRunner that will be the core loop for the player and integrate into the narrative of the game. Building a simple gameplay prototype is an option if only necessary, and can be a simple prototype that's web-based or other.

- QTEs where a sequence plays and the player uses inputs or commands (hacking minigame based on class spec
- Intelligence gathering through NPCs you meet, befriend, or talk to in the game. You can send your companion NPCs to find out things about a person, place, etc. You can visit a bar or location to talk to someone to get info. Or you can get your hacking companion to hack in to gain info about your target (but it'll cost you) unless you're a netrunner and want to do it yourself.
- Medical Aid where Marcus (you the player) help people by fixing their body and/or cyberware
- Craft Items and acquiring materials.
  - A planned scenario (originally) was an NPC comes to you with a gunshot wound and needs to fix his arm for an upcoming boxing match. You remove the bullet and patch him up. When you inspect the arm you find the fix is easy but something isn't right. Looking at the software (through hacking it yourself or your companion NPC hacker) you find malware installed on the arm that can stop the persons heart. Removing the malware will save his life in the ring, but doing so makes you and the fighter a target for the gang who installed it.
  - The idea for this was just a hold the button to fill a bar. The bar has certain checkpoints that once past will allow you to move around the clinic. For example, the fighter from before has a gunshot wound. You hold the button and after a few seconds checkpoint 1 (stop the bleeding) is complete, and then checkpoint two (remove the bullet), close the wound, etc.
  - Acquiring materials involves paying for them, crafting them yourself, or hiring someone to do it for you. You can craft cyberware or organic material (if you have the necessary tools/machines to do so)
- Hacking Minigame
  - Original concept:
    - Using the right analog stick you a move around a circle with a small arrow pointing in
    - When you find a gap in the circle (the gamepad will vibrate the closer you are, and a sound will also get louder) and press R1. A piece will fill the gap, the circle will become active, a timer will start, and direction inputs will show in the center of the circle.
    - Once you've inputted the arrows properly the circle will be solved and you'll move to the next ring inside.
    - Repeat until all rings are solved (like tumblers on a lock)
    - Images of early ideas: `C:\Users\GameDevPC0403\.t3\userdata\attachments\305e072f-b241-44f4-b8f4-e23b4ea73f85-5a36ed47-8452-4030-929a-52755142a627.png`, `...-b3faacff-90ce-429a-87b6-97603183a143.png`, `...-da348265-9de4-41c8-9dbe-78086be99f7d.png` (same folder and prefix). Related sheets: `C:\Prod\ProjectRunner\Graphics\UI` and `Graphics\_library\loose\minigame\hacking_ring_assets`.
    - Only one circle is visible at a time, each solve ring will go green, get pushed out from the center by the next ring and fade into the background, and a new ring will take it's place
    - The directional inputs will show in the center of the ring with each upcoming input slightly visible above (if that makes sense)
    - The lock will open at the end, the rings will animate (perhaps a wave effect after the unlock animation) and 'Access Granted' animated in
  - The QTE hacking minigames (for players that choose a netrunner path) might be easier since it might already be panicked with the QTEs

Constraints: Don't begin work on any gameplay elements in UE since this is a planning session to work out the systems for the game and how these systems can work together. Simplify each system, remove complexity to streamline the experience. I don't want to overwhelm the player. Propose an idea and if you feel a element is too complex, append an simplified alternative to discuss.

Done when: The documentation and concept are complete and ready to pass for the build.

## Contracts

### C1. Systems to cover, each with its own section

1. Core loop and episode structure
2. Clinic hub and patient cases
3. Medical aid (hold-to-fill bar with checkpoints)
4. Hacking minigame (rings)
5. QTEs and reflex slow-down
6. Intelligence gathering (talk, send a companion, pay a hacker, or hack it yourself)
7. Materials and crafting (buy, craft, or hire)
8. Marcus's growth (specialties and skill points)
9. Money and favours, and failure costs

### C2. Every system section uses these headings

`What the player does`, `Inputs`, `Story purpose`, `Feeds from and into`, `On failure`, `Simpler alternative`, `Open questions for Mike`.

### C3. Required worked example

The Fighter case runs from start to finish through the proposed systems: gunshot wound, hold-to-fill treatment, inspecting the arm, finding malware that can stop his heart, the Tech, Netrunning and companion routes to it, the choice to remove it, and the gang's response.

### C4. Rules from BRIEF.md the proposal must respect or openly ask to change

- HUD limit: interact prompts, hack progress, dialogue choices, subtitles, corner notices and the skip prompt. QTE prompts, treatment bars and any skill or inventory screen go beyond it, so the proposal lists each addition for Mike's approval.
- Dispatch-style choice layout and positional diamond prompts, following the last device used.
- Walk by default, run while held, no jumping or traversal, automatic crouch zones.
- PC with controller and keyboard. Any rumble cue also needs an audio and visual cue. Timed input needs an accessibility alternative.
- ProjectSilence reuses interaction and hacking, so hacking stays free of Runner story data.

### C5. Banned material

No old-story names or plot as canon. Kiroshi, Arasaka and the `Graphics/UI` sheets that show them are mood reference only. No AI-generated image goes in pitch or application material.

Rejected plot ideas rewritten under new names count as banned too. The writer and critic both check for this, because a name search can't catch it.

### C6. Source coverage

The proposal ends with a table of every mechanic in Mike's request, marked retained, simplified or proposed for change. It includes movement between treatment checkpoints, machine requirements for crafting, the hacking cues and input sequence, and solved rings going green and fading.

### C7. Combined cost check

Before Mike's first review, the proposal counts what the systems add per patient case: distinct authored outcomes, where routes rejoin, and recurring writing, animation and testing work. The Fighter walkthrough also covers too little money or material, an unavailable companion, and failed inputs, showing how play continues each time.

### C8. Chair fight boundary

The approved Cascadeur fight stays one continuous take with no fail state and a QTE that completes by default with a slow effect. Any outcome that needs extra animation is listed for separate approval and costing. Neither plan overrides the other.

### C9. Inputs and accessibility

Every input description covers controller, keyboard and remapping. Holds and precise stick movement each get an alternative, and the section says whether the assist keeps the same story outcome.

### C10. CMF hand-off

The proposal ends with a compact hand-off for the separate CMF pass: approved gameplay claims, proposed funded-prototype scope, claims that are displaced, and affected documents. It separates full-game systems from those promised for the prototype. The old scope (25-30 minutes, six scenes, six characters, three playtest rounds) gets reassessed rather than renamed.

### C11. Paths

- Research: `$PROJ_DOCS/ProjectRunner/research/gameplay-systems-2026-11-05/comparables.md`
- Proposal: `$PROJ_DOCS/ProjectRunner/design/gameplay-systems.md`
- Critique: `$PROJ_DOCS/ProjectRunner/research/gameplay-systems-2026-11-05/critique.md`

## Tasks

| # | Task | Done when | Writes | After | Model | Effort | Board id |
|---|---|---|---|---|---|---|---|
| 1 | Research at most 8 questions that could change scope or player actions, across at most 8 comparable games, starting from the existing QTE research and ring assets. Time cap: 1 hour | `comparables.md` exists, and each finding has a source URL and a stated consequence for the proposal. Anything unconfirmed stays an open uncertainty | `research/gameplay-systems-2026-11-05/comparables.md` | - | `claude-sonnet-5-5` | high | RUN-182 |
| 2 | Write the proposal from Mike's source request, kept verbatim in the brief | `gameplay-systems.md` has all 9 C1 sections with all C2 headings, the C3 example, and the C6, C7, C8, C9 and C10 items; a search finds no C5 names | `design/gameplay-systems.md` | 1 | `claude-fable-5-1` | high | RUN-183 |
| 3 | Critique for complexity, weak links between systems, story fit, and rejected plot under new names | `critique.md` lists findings, each tied to a section | `research/gameplay-systems-2026-11-05/critique.md` | 2 | `gpt-6.1-sol` | high | RUN-184 |
| 4 | Fold in accepted critique and publish a page for Mike's comments. Target: 2026-11-06 | The artifact link is in this plan, and rejected points are listed with a reason | `design/gameplay-systems.md`, this plan | 3 | Lead (`claude-opus-5-5`) | - | RUN-185 |
| 5 | Iterate with Mike until the concepts are approved. Target: 2026-11-07 | Mike approves each system or cuts it. If this slips, Mike gets a scope or schedule decision; his approval is never assumed | `design/gameplay-systems.md` | 4 | Lead | - | RUN-186 |
| 6 | Finalize for the build: a goal, task list and completion evidence per approved system, plus approved `BRIEF.md` changes | Every approved system has all three; Mike has approved that exact version; the `BRIEF.md` diff shows only approved changes. Concept approval and build authorization are recorded separately | `design/gameplay-systems.md`, `BRIEF.md` | 5 | Lead | - | RUN-187 |

## Checkpoints

| After | Kind | Why |
|---|---|---|
| plan | required | Mike's go |
| task 4 | required | Mike asked to give feedback on the full proposal before iterating |
| any prototype idea | required | Mike decides, with a specific goal and task list |
| task 6 | required | End review, then the CMF rewrite pass can start |

## Budget

2 child agents plus 1 Codex critique. No end-review agent, since Mike reviews the document directly.

## Risks

- Scope creep against a solo-scale narrative game. Task 3 checks complexity, and every section carries a simpler alternative.
- CMF timing. The `pitch-plan.md` target of submitting by 2026-11-06 is no longer realistic. Schedule: proposal to Mike 11-06, concept approval 11-07, CMF rewrite 11-08 to 11-09 (a separate pass the lead sets up, for Mike to edit and sign), submission by the 11-10 close. Task 6's build hand-off doesn't have to finish before the CMF rewrite starts; the C10 hand-off does.
- Skills, money, crafting and failure could multiply branches. The C7 check counts this before Mike's first review.

## Second opinion (Codex gpt-6.1-sol, 2026-11-05)

All eight points accepted and folded in: dated cutoffs, CMF hand-off (C10), explicit build approval in task 6, combined cost check (C7), source coverage (C6), chair fight boundary (C8), wider input accessibility (C9), and bounded research (task 1).

## Review page

Local copy: `design/gameplay-systems.html`, built from `design/gameplay-systems.md`, which is the source. Mike asked on 2026-11-05 to keep the proposal local and not online, which replaces the artifact link in task 4's "Done when". Feedback comes in the thread, not as page comments.

The private artifact published first (https://claude.ai/artifact/8LKWi79W9RdC97sbPyYbsN) had no comments. The session could not delete it, because deleting needs a confirmation it cannot get, so it stays up until Mike deletes it.

## Critique rulings (task 4, 2026-11-05)

Codex filed 12 findings in `research/gameplay-systems-2026-11-05/critique.md`: 10 major, 2 minor. The lead checked the CMF claims against the drafts. All 12 are accepted, except for the two parts rejected below.

Accepted and folded in:

1. Cost check: one case per shift, 2 or 3 per episode, recounted nodes, 16 flag combinations explained, risk-based test list, "hard caps" renamed limits.
2. Fighter: suspicion, diagnosis and removal are now separate, and every route reaches the heart fact and a removal.
3. Growth: specialty in the opening beat, up to eight points so all nine ranks can unlock, last point before episode 5.
4. CMF documents: drafts 03, 04, 05 and 15 added, drafts 07 and 08 and `pitch-plan.md` widened.
5. Prototype scope: real character and location counts, craft committed, new proof questions.
6. Economy: one cost per route, debt rule defined, raw material defined, crafting no longer called guaranteed.
7. Delayed services: delivered inside the case, never at the next beat. Clinic exit rule added.
8. Assists: return an ordinary success and bypass the failure consequence. Netrunning and Enforcer ranks changed so they still matter under assists.
9. Simpler alternatives: clinic and growth cuts now stay inside Mike's decisions. Hold component reuse marked as an assumption.
10. Inputs: choice layout follows the brief, four routes fit through a second step, QTE prompt stays an approval item.
11. Citations: the five-decision limit and the skip result are labelled Runner design choices.
12. Timings: real-time windows and scene speed stated separately.

Rejected, with reasons:

- Finding 5, "cost those tests". No cost basis exists yet. Test costing belongs in the budget work of the CMF pass (D5), and the hand-off only needs to name the questions.
- Finding 4, "exact passages" for every affected document. C10 asks for a compact hand-off. The table names documents and sections, and the CMF pass rewrites them line by line.

Lead additions beyond the critique:

- The fit button goes back to R1 as Mike specified. The draft had moved it to A with no reason.
- Codex cleared the remove, tell or say nothing choice as allowed. The lead left the Fighter's malware as it is but flags the choice for Mike, because the two extra options are not in his request and loosely resemble the rejected arm scene.

## Mike's answers (task 5, 2026-11-05)

Mike answered the open questions in the thread. The proposal has a table of them under "Mike's answers (2026-11-05)", and they are folded into each section. They are direction, not approval: no system is approved yet. This fold-in had no second critique. Prior version: the scratchpad copy `gameplay-systems.before-answers.md`, not kept in the repo.

Lead calls in this fold-in, each flagged for Mike in the proposal:

- Favours only: reputation is never spent and sets the offer, materials pay for everything, and money is gone. Mike's machine and hacker answers still mention a price.
- Three bonus points, because two leave one of the nine ranks locked.
- The Gang Enforcer visit moved from the clinic to the bar, so a gang does not reach the Hidden Room in the first case.
- A Tech starts with one machine free, so Tech can craft in the first case.
- Three endings and at most three characters who can die, as proposed limits on "who lives and who dies".
- The prototype goal and task list are in section 4.

Mike's rulings on those calls (2026-11-05): favours as reputation plus materials, three bonus points each tied to an earlier choice, and three endings with at most three deaths. The Enforcer move and the free Tech machine are still open.

Prototype: Mike approved it on 2026-11-05 with an on-screen rumble indicator in place of real rumble. Built at `design/ring-hack-prototype/index.html`. It is done when Mike has played a three-ring lock on his controller and ruled to keep, change or cut the search step.

Ring hack testers: Mike asked on 2026-11-05 to have other people test the prototype, so it now records per-attempt results with a CSV download. `design/ring-hack-test-kit.zip` holds the files to send. Mike sends it himself.

Gameplay demos: Mike approved four more on 2026-11-05, each done when he has played it and ruled to keep, change or cut that system. They are at `design/gameplay-demos/index.html`.

- Treatment bar. Goal: does holding through checkpoints feel like surgery or like waiting?
- QTE timing. Goal: settle the window and slow-down. Timing only, with no real animation.
- Dialogue and spec option. Goal: can players answer on X, Y and B during a quick hack?
- Fighter case. Goal: does the whole loop make sense without explanation?

Demo feedback (Mike, 2026-11-06), not a final ruling on any system:

- Treatment bar: the hold was boring. Test a QTE run for the process and a dialogue choice at each checkpoint. `treatment.html` now does this, and the bar stays as the progress display.
- QTE: show only the key to press, with a hold as the finisher, like a throw or wind-up punch. Figures stop swaying. The acting figure pulses while its key shows. Round 1 is one guard, and round 2 has a guard on each side: hit 1, 2, 1, 1, 2, hold on 1, tap on 2, hold on 2. `qte.html` now does this.
- Dialogue demo: boring, but Mike wants to try the changes above before tweaking it. Dialogue text is larger in all demos.
- Fighter case: good, and Mike will play-test it. Its logic is unchanged. It still uses the old hold bar, so it needs a follow-up if the treatment change is kept.

Treatment sequence (Mike, 2026-11-06, "better", then this order to try): a heart pulse on screen; stop the bleeding; deactivate the cyberware, which trips an alert, sends the pulse wild and forces a hacking event; remove the bullet; close the wound; reconnect the cyberware; run diagnostics with dummy code flying; all passed. A dialogue follows with "Something's not right" and two choices: run it again, or "I'm sure it's fine". Running it again gives the same results, and that is where the malware is found, with the choice to remove it, tell the Fighter or ignore it. Built in `treatment.html`. Mike's own version of the remove, tell or ignore choice settles the lead's earlier flag on it.

Hack roles (Mike, 2026-11-06): choosing to remove the malware leads to a harder hack, behind a prompt so the player isn't thrown straight in. The Hacker Companion assists by monitoring the patient. For the end hack, a Hacker can choose to do it themselves; otherwise it just gets done. Doing it yourself as a Hacker earns more reputation at the end. Lead call, flagged for Mike: +1 reputation per finished case and +1 more for a self-done removal.

Forced hack (Mike, 2026-11-06): every specialty plays the mid-surgery hack, with a story reason to come later, such as a two-pronged hack. On failure the assistant jumps in and the penalty is reputation loss. The lead applied the same penalty to a failed removal hack, at -1 per failed hack, flagged for Mike. This replaces the complication on a failed hack.

Companion and rumor (Mike, 2026-11-06): the AI companion and the paid human hacker are separate characters. The assistant who monitors the patient and jumps in on a failed hack is the AI companion. "Ignore it" and "I'm sure it's fine" keep +1 reputation, because the Fighter inevitably dies and that could start a rumor that Marcus killed him rather than the gang's malware. The demo reports the rumor as a later consequence. Its reputation cost is not set yet.

Diagnostics style and the Fighter's request (Mike, 2026-11-06): the test text scrolls in a column, after a reference recording at `C:\Prod\ProjectRunner\refs\Recording 2026-11-06 064711.mp4`, without matching it one for one. The demo prints a log down the left column, fills a results panel row by row, and on the second run shows both panels and lights the matching rows. Telling the Fighter now brings a reaction: the Fighter asks to have it removed, and the player can do it, get the AI to do it (a loading screen and a price), or refuse. Lead calls, flagged for Mike: the price is 2 materials from a starting 3, because money is gone; "do it yourself" stays Netrunning only, under the earlier hack roles rule; a refusal keeps +1 reputation and has its own rumor; a failed self hack brings the AI in at no material cost. Built in `treatment.html`.

AI price on both routes (Mike, 2026-11-06): the AI removal charges on the direct "Remove" route too, and the Fighter case demo gets the same request. In `fighter.html`, "warned" is replaced by "refused". Lead call, flagged for Mike: in that demo "do it yourself" stays open to every specialty under its existing removal methods (a held step, talked through by the Hacker Contact, or by hand), so nobody is stuck without materials. In `treatment.html` a Tech or Enforcer without the materials cannot remove it and must tell, then refuse, or ignore.

Dialogue layout (Mike, 2026-11-06): the final layout, from Mike's reference image. Text pills sit around a diamond of button icons, with Y on top, X left and B right. A is added at the bottom for specialty options. The timer runs under the choices and closes from both ends. The block sits at the bottom of the screen. Built in the shared demo code, so the Dialogue, Treatment and Fighter demos all use it.

Quick hack in dialogue (Mike, 2026-11-06): the choices and hack are larger. The quick hack is a QTE with no right stick, so it has more arrows, 8 by default. The talk timer no longer stops during a hack. It runs at 0.1 speed by default, with a slider, so a choice can still time out while the hack carries on. Lead call, flagged for Mike: the quick hack's own timer went from 8 to 10 seconds to suit the extra arrows.

Removal and quick hack rules (Mike, 2026-11-06): a wrong arrow in the dialogue quick hack restarts the sequence, so only the timer fails it. Every specialty can remove the malware itself. Netrunning plays the harder hack in both demos. A Tech does it directly, and an Enforcer is talked through by the Hacker Contact, or pulls the controller by hand with a weaker arm if the contact is unavailable. Lead calls, flagged for Mike: in `treatment.html` the Tech and Enforcer removal is timed keys at the table where slips add complications and can't fail it; in `fighter.html` it stays a held step; the +1 reputation for doing it yourself stays with the hack, because Mike tied it to the hacker. This replaces the earlier lead calls on Netrunning only and on Tech and Enforcer going straight to the AI.

The Fighter's fate (Mike, 2026-11-06): if the malware stays in, the Fighter dies, even if Marcus told him. Removing it does not lead to his death. It leads to a decision to bet on him, and a win buys his and Marcus's freedom from the gang leader. Both demos report this as a later consequence. The stake and a lost bet are not set.

XP and time direction (Mike, 2026-11-06): an XP bar replaces reputation and the episode skill points. Completed cases, treatments and successes fill it, and failures, including abandoning people, cut it. A level never drops, and a loss only empties the current bar. Each level gives one upgrade for the shop or Marcus's body. Level sets the daily materials delivery. A daily limit counts actions, not a running clock, starting at 3 days per episode and 3 actions per day. Story-critical cases never expire. This means about 30 cases instead of 15. The bet's stake is a favor owed to the Scavenger Leader, and a lost bet leaves Marcus and the Fighter still targeted. Next: a local week demo tests the feel at `gameplay-demos/week.html` before sections 7 to 9 of `gameplay-systems.md` are rewritten. Lead calls in the demo, flagged for Mike: all patients, XP values, upgrades and prices are placeholders; paying the Hacker Contact costs materials and no action; an Enforcer's asking around gets full detail; a Tech's gear gives 1 more material; surgery is three quick keys; Medis marks are left out; a story patient takes 2 actions in one day, because a search of every order of play showed 1 action left no time pressure. With the defaults, every ordering search still finds a run that treats everyone cleanly, but only a Tech also gets every fact at full detail (28 of 28 XP, against 26 for the others). A simple treat-everyone run earned 17 XP in the headless test.

Specialty option arrival (Mike, 2026-11-06): the quick hack stays the simple version, since it plays during dialogue. Its option no longer shows from the start. It arrives a few seconds after the second question's choices, with a glitch effect, and the hack option has Mike's chip icon beside its text (`gameplay-demos/chip-icon.png`, tinted amber from his image). Lead calls, flagged for Mike: the delay is 3 seconds with a slider, the option is on that one question only, and the Tech and Enforcer options arrive the same way without the chip.

Treatment flow and tally (Mike, 2026-11-06, for `treatment.html` only; the Fighter demo stays as it is): after the cyberware is disconnected and the alert trips, a dialogue offers the hack or the AI, which replaces the forced hack for every specialty. Once the Fighter is stable he asks "What the hell happened?". Failures during a hack raise the heart rate. Dialogue no longer shows prices. The end screen shows a tally of how the player did, their stats and a button to try again. Lead calls, flagged for Mike: handing the alert to the AI costs the same price as the removal; because prices are hidden the AI can't be greyed out, so materials can go below zero as a debt; the loading screen still shows the price, from his earlier request.

Following sweep (Mike, 2026-11-06): the ring hack prototype has a toggle that makes the antivirus sweep attach with an animation, then follow the arrow by the shortest distance. Lead calls, flagged for Mike: the toggle starts off; attaching takes 1.2 seconds with a slider, and repeats each time a new search starts; the sweep can't move or catch during it; it keeps the existing speed slider at 90 degrees per second, slower than the arrow's 300, and the same 0.2 second catch. An orbiting sweep still appears with no animation.

Sweep timing (Mike, 2026-11-06): the sweep doesn't appear on the first ring, because the player hasn't hacked in yet. Lead calls, flagged for Mike: this covers the orbiting and following sweep alike; it starts on ring 2 with a slider; it leaves again if the red ring pushes the player back to the first ring; a one-ring lock has no sweep by default.

Ring hack end screen, ring break and gap timer (Mike, 2026-11-06): test results moved to the end of the side panel, and the final stats, rating and download moved to a modal at the end of a lock, with a reset button. A Netrunner breaks one ring per lock with no extra input: if they fail none, the last ring breaks on its own; if they get caught by the sweep or fail the inputs, that ring shatters instead. It doesn't apply to story triggers. Mike wondered whether it should prevent them, so that is a toggle, off by default, and an unused break spent this way is gone. The sweep's follow is a separate toggle, so the sweep attaches either way and then follows or orbits. From ring 2 there's a time limit to find the gap. Lead calls, flagged for Mike: "ranking" is read as the difficulty rating; the ring break starts off; the gap timer is 8 seconds with a slider and on by default; a gap timeout or decoy also uses the break; a red ring isn't absorbed; a one-ring lock doesn't open by itself. A shattered ring stays in the stack in pieces, so the red ring can still push it back.

Line before diagnostics (Mike, 2026-11-06, `treatment.html`): after the cyberware is reconnected, a dialogue gives the one option "All done. Let me just run a diagnostics", and diagnostics start when it's chosen. Lead calls, flagged for Mike: the Fighter's prompting line "So we're good?" is a placeholder, it has no timer, and the "Choices at checkpoints" setting turns it off with the others.

Play-test notes (Mike, 2026-11-07), after his session with other people. All built:

- General. Testers pushed the stick up, down, left and right instead of spinning it. Mike had to talk people through hacking and treatment by hand. Both demos now teach as they go.
- Treatment. The start text was too small. The terminal, bench and start triggers go. A scene setup explains the situation, the treatment starts by itself after the dialogue, and timed lines bridge the choice sections. Lead calls, flagged for Mike: the setup is a card that waits for A, so it can be read, and shows once per page load; "the 'start' text" was read as the start overlay, enlarged across all the demos, and the walk-to-the-table prompts it may also mean are gone; the one-option line before diagnostics stays, from his 2026-11-06 request, though it is the last press that starts anything; all bridge lines and replies are placeholders; a line stays up for 0.8 s plus 0.33 s a word, at least 1.8 s, with a slider; the first hack opens with a how-to card; the first key and first hold each get a reminder.
- QTE fight. "Good, nothing to tweak". The code moved to `fight.js` so the Dialogue demo can share it, and it plays the same.
- Dialogue. The QTE fight is added, then a final timed choice with Vhoori: Threaten, Negotiate or Walk away. Lead calls, flagged for Mike: the fight comes after the third question; the timeout default is Walk away; one placeholder reply each; a quick hack still running when the fight starts counts as failed; the quick hack doesn't change the fight; the guards fade out after it.
- Fighter case. Not relevant with the Treatment demo, kept for indexing. Its logic is untouched, so it keeps the hold bar and reputation, and the handoff's XP step skips it on purpose. It still loads and runs on the shared code.
- Week. The time mechanic was hard to understand and hard to prioritize, and needs explaining and possibly a rework. Built: a how-to card, a planner of patients against days, cyan and amber action dots, a reason for every blocked action, costs and XP on each choice, and "materials" as the only word. Lead calls, flagged for Mike: the rework is a setting, with story patients booked on a set day (Fighter day 2, Lieutenant day 3) as the default and the old hold-back still available; the planner shows patients who haven't arrived yet so the player can plan, and it goes beyond the HUD limit.
- Ring hack. Arrows now read top to bottom, current on top, which reverses "upcoming ones above" in the source request. The custom version stays as it is, apart from that arrow order, and a new level game at `ring-hack-prototype/levels.html` brings in each mechanic with a tutorial as it's used. Lead calls, flagged for Mike: the arrow order also applies to the custom version and to the hack inside the Treatment and Dialogue demos, so they all match; 13 levels with the episode split in section 4 of the proposal; the full lock leaves out the moving gap; level 1 won't let the player fit until they've taken the arrow a full circle; a d-pad press during a search, or 6 seconds searching, brings a spin reminder; the ring break is a panel switch, not a level. The custom page's drawing code moved to `hack-view.js`, so `ring-hack-test-kit.zip` needs that file if rebuilt. The zip still holds the old arrow order.

Ring hack levels, after Mike played them (2026-11-07). The arrows are resized, from his marked-up image. The gap narrows from 56 degrees to 25 by level 6. The red ring gains arrows after its intro. A moving gap now jumps on time even with the arrow held on it, which was a rule in the core, not a slip: it waited for the arrow to leave. The time to find and the time to solve are much shorter. Lead calls, flagged for Mike: the image is read as growing the current arrow to fill the marked box, with the next two small below it; all of this is in the level game only, so the custom version and the hacks in the Treatment and Dialogue demos keep their arrows, gap and timers; the steps are 56, 50, 44, 37, 31, 25 degrees, then 25 throughout; time to solve goes 6, 5, 4.5, 4.5, 4, 4, 3.5, 3.5, 3, 2.5 s from level 4 (was 10 down to 6), and time to find goes 6, 5, 4.5, 4.5, 4, 4, 3.5 s from level 6 (was 10 down to 8), with levels 9, 10 and 12 gaining a time to find; only levels 12 and 13 have the red ring, so its arrows go 2 then 4; its 8 s closing time and the moving gap's 5 s are unchanged.

Red ring on a search timeout and arrow layout (Mike, 2026-11-07, second round on the levels). If the search timer runs out, the red ring triggers, with an "Intruder Alert" label. The large arrow moves to the exact center of the ring, the gap between arrows grows, and each upcoming arrow is 10% more see-through to start (0.5 and 0.25, from 0.6 and 0.35). Lead calls, flagged for Mike: level game only, as before; the red ring now first appears on level 6, where the search timer starts, instead of level 12, which gives its arrows room to climb: 2, 2, 3, 3, 4, then 4 and 5 on levels 12 and 13, with level 11 having none; the timeout itself is no strike, and only the red ring reaching the player counts as one; the label shows for every red ring, whatever set it off, and blinks; a Netrunner's unused ring break still takes the first timeout, under the earlier ruling; to fit the wider spacing, the timer dial grows from radius 290 to 342, and the two upcoming arrows shrink from 46 and 34 to 44 and 24.

Search step: the ring hack search stays in the level game, which reads as keep with teaching. It's logged here as direction. The final ruling comes with Mike's approval of levels 1 and 2.

XP in the Treatment demo. `demo-core.js` and `treatment.html` no longer use reputation for the surgery. Lead calls, flagged for Mike: +6 XP for a finished case, +2 more for doing the removal hack yourself, and -2 per failed hack, which keeps the old 1 and 1 proportions at the scale of the Week demo's values. Leaving the malware in still pays the +6, per his earlier "keep +1", until the rumor's cost is set.

Proposal. Sections 7, 8 and 9, the Fighter case and the cost check in `gameplay-systems.md` are rewritten, and the older sections carry status lines. Section 3 still has the original hold bar text under its status line, to be rewritten once Mike approves treatment. Lead calls in the rewrite, each raised as a question there: crafting folded into shop upgrades; the nine ranks and three bonus points gone under XP; Medis marks kept only as a question; six cases per episode. `gameplay-systems.html` was not rebuilt, so it still shows the 2026-11-05 text.

## Progress

- [x] 1 Research comparables
- [x] 2 Write the proposal
- [x] 3 Critique
- [x] 4 Fold in and publish
- [ ] 5 Iterate with Mike
- [ ] 6 Finalize for the build
