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

## Progress

- [x] 1 Research comparables
- [x] 2 Write the proposal
- [x] 3 Critique
- [x] 4 Fold in and publish
- [ ] 5 Iterate with Mike
- [ ] 6 Finalize for the build
