# ProjectRunner gameplay systems proposal

Drafted 2026-11-05 for Mike's review. Plan: `plans/2026-11-05-gameplay-systems.md` (task 2, RUN-183). Research: `research/gameplay-systems-2026-11-05/comparables.md`, cited below as "finding N". Critique: `research/gameplay-systems-2026-11-05/critique.md`, folded in on 2026-11-05 (rulings are in the plan). Updated 2026-11-05 with Mike's answers to the open questions (task 5, RUN-186). Updated 2026-11-07 with Mike's demo rulings and play-test notes: sections 7, 8 and 9, the Fighter case and the cost check are rewritten from them. Where an older section disagrees with the rulings table below, the table wins. Status: proposal, nothing approved, nothing built.

## Summary

The game asks the player to do five things: walk through side-on scenes and talk, treat patients by hitting timed keys while people talk to them, break locks with a ring hack, hit prompts in cinematic fights, and choose. Everything else in Mike's request (gathering information, getting materials, growing Marcus) is done through those same five actions.

The core loop in one line: an episode gives Marcus a goal, a lead, and a few days with a fixed number of actions each. Patients arrive and he can't treat them all. A treatment runs timed keys and timed talk, a discovery forces a choice, the choice sets one flag, and the next beat reads it. XP fills a bar, and each level gives one upgrade.

The main simplification is that every decision the player makes uses the dialogue choice layout already in the brief. No inventory, skill or map screen is proposed. The one new screen under test is the week planner in section 2.

Decisions needed from Mike, in order of weight:

1. Play the updated Treatment, Dialogue, Week and Ring hack levels demos at `design/gameplay-demos/index.html`, then keep, change or cut each system.
2. Week: choose how story patients take their time, booked on a set day or any day with time held back. Both are in the demo, on a setting. Section 2 has the case for each.
3. Ring hack levels: approve each level's mechanic, difficulty and proposed episode. Section 4 has the list.
4. Approve the HUD additions listed near the end, each with its fallback.
5. Approve or cut each system. Your answers are recorded as direction, and none is treated as approval.

Every timing, count and point value in this document is a proposed starting value unless it cites a finding or a brief decision.

## Mike's answers (2026-11-05)

| Section | Answer | What changed here |
|---|---|---|
| 1 | Three cases per episode, one or two story critical, possibly more after feedback. A beat follows a story critical case. The train seat framing is out: Marcus is hiding from the City of Lights after fleeing it, story to follow. | Section 1, cost check |
| 2 | The clinic sits in secret near Marcus's home in an abandoned part of The Hive, hidden from the Medis. The leader of the Scavengers sends the patients, friends and family first, then rival gangs as word spreads, then the conflict with the Medis. How well the player does sets the ending and who lives. Patients are one-offs, and some become contacts. | Sections 1 and 2, cost check |
| 3 | Walk away at non-critical checkpoints only. Tech fills cyberware steps faster and skips nothing. Tech machines may do organic steps. Bar timing is tuned after the build. | Sections 3 and 8 |
| 4 | Keep the search step if it can be tested on a controller on the web. Failure has a story cost, a reload from checkpoint, or both. Netrunning changes the look and not the timer. | Sections 4 and 8 |
| 5 | The window gets tested. No authored miss beat in episode 1 outside the chair fight. | Section 5 |
| 6 | Rumours yes, wrong facts no. Misinformation is a narrative topic outside this proposal. Marcus has an AI Companion, a Hacker Contact who charges, and a friend with a talent for information. The episode opens with a goal and a lead, and the AI Companion offers the ways to do it. | Section 6 |
| 7 | Two machines, each expensive, so the player prioritizes. Counts reset at each episode's time jump, and last episode's results decide what the player starts with. | Section 7 |
| 8 | Chapter means episode. One point at the start of each of the five episodes, plus two or three offered through dialogue before a dangerous step. Choices are X, Y and B, with a spec option on A at certain points. | Section 8 |
| 9 | Leaning to favours only, paid through the Scavengers and the Intel Contact, with gear sent to break down as the return. No debt call-in. Free care raises the risk from the Medis instead. | Sections 7 and 9 |

The reply on web testing: yes for the stick and buttons, and rumble depends on the browser.

Mike's rulings on the follow-up questions (2026-11-05): build the ring hack prototype with an on-screen rumble indicator; reputation plus materials, with money gone; three endings and at most three characters who can die; three bonus points, each tied to an earlier choice in its episode.

## Mike's demo rulings (2026-11-06 and 2026-11-07)

These come after the answers above and overrule them where they differ. The dated notes in the plan have the detail and the lead calls.

| System | Ruling | Where it's built |
|---|---|---|
| Treatment | The hold was boring. Each step is now timed keys ending on a hold, with a dialogue choice at its checkpoint, and the bar only shows progress. The heart monitor carries the tension. | `treatment.html` |
| Treatment flow | No walking, bench, terminal, clamp or start triggers. A scene setup explains the situation and the keys, then the scene runs by itself, with timed lines bridging the choices (Mike, 2026-11-07). | `treatment.html` |
| Treatment story | Stop the bleeding; deactivate the cyberware, which trips an alert and offers the hack or the AI; "What the hell happened?"; remove the bullet; close the wound; reconnect; diagnostics that all pass; "Something's not right"; a second run with the same results reveals the malware; remove, tell or ignore. | `treatment.html` |
| QTE fight | One key on screen, with a hold as the finisher. Round 1 is one guard, round 2 has a guard on each side. "Good, nothing to tweak" (Mike, 2026-11-07). | `qte.html`, `fight.js` |
| Dialogue | Pills around a diamond of buttons, a timer that closes from both ends, and the spec option arriving late with a glitch. The quick hack is arrows only, and the talk timer runs at 0.1 speed during it. The fight now plays inside this scene, followed by a final choice with Vhoori: Threaten, Negotiate or Walk away (Mike, 2026-11-07). | `dialogue.html` |
| Fighter demo | Kept for indexing only. The Treatment demo has moved past it, so it still has the hold bar and reputation (Mike, 2026-11-07). | `fighter.html` |
| Ring hack | Arrows read top to bottom, current on top, which reverses the original request. The custom version stays as it is, and a new level game brings in each mechanic with a how-to card as it's used (Mike, 2026-11-07). | `ring-hack-prototype/index.html`, `levels.html` |
| Growth and economy | An XP bar replaces reputation and the episode skill points. Failures, including abandoning people, cut it, and levels never drop. Each level gives one shop or body upgrade and sets the daily materials. | `week.html` |
| Time | Actions per day, not a clock, starting at 3 days with 3 actions each. Story-critical cases never expire. This means about 30 cases, not 15. Mike found it hard to understand and asked for an explanation and possibly a rework (2026-11-07). | `week.html` |
| The Fighter's fate | If the malware stays in he dies, even if told, and a rumor can blame Marcus. If it's removed, Marcus can bet on him, staking a favor owed to the Scavenger Leader. A win buys both their freedom from the gang leader, and a loss leaves both still targeted. | Tally screen only |
| Cast | The AI Companion and the paid Hacker Contact are separate characters. The AI Companion monitors the patient and steps in on a failed hack. | `treatment.html` |

Two things testers needed, from Mike's session on 2026-11-07: testers pushed the stick up, down, left and right instead of spinning it, and Mike had to talk people through hacking and treatment by hand. Both demos now teach as they go, and these rulings assume a shipped game will too.

## Rules this proposal keeps

- Walk by default, run while held, no jumping or traversal, automatic crouch zones (BRIEF 2026-11-02).
- Dialogue plays as film subtitles with Dispatch-style choices on button positions, prompts as the positional diamond, following the last device used (BRIEF 2026-10-21).
- Fights are authored cinematic QTEs with no free combat. Failure has a story cost and never ends the game, and a hack failure may also offer a reload from checkpoint. Improved reflexes come by default (plan decisions and Mike's answers, 2026-11-05).
- Hacking stays free of Runner story data so ProjectSilence can reuse it. Section 4 says what is shared and what Runner adds.
- Cast is written as roles. The roles used here: the Scavenger Leader (Marcus's benefactor), the AI Companion, the Hacker Contact, the Intel Contact (the friend with a talent for information), the Bar Contact, the Fighter, the Gang, the Gang Enforcer. Mike names them later. Mike has named three groups and places so far: the Medis, the Scavengers and the Hidden Room.

## 1. Core loop and episode structure

Status 2026-11-07: three cases per episode and 15 across the game are replaced by days and actions (section 2) and about 30 cases. XP replaces reputation and episode skill points (section 8). The rest of this section still describes the proposed loop.

### What the player does

An episode opens after a time jump with a goal and a lead. The AI Companion lays out the ways to do it and asks how Marcus wants to handle it. The player sends contacts out (section 6), then works clinic shifts between authored story beats. A shift is one hand-written patient case, and an episode carries three cases, one or two of them story critical. A story beat follows each story critical case. Each case follows the same shape: intake talk, treatment, a discovery, a choice, an outcome. The outcome is a flag and a notice, and the next beat reads it.

The loop, in play order:

1. The episode opens with the goal, the lead, and what last episode's results earned (section 7). The skill point for this episode arrives here (section 8).
2. The AI Companion offers the approaches. The player picks one and sends contacts.
3. A patient arrives. The intake talk says what is wrong and what the case needs: a fact, a part, or both.
4. The player gets the fact (section 6) or the part (section 7). Each costs materials, a return job, a hack or a contact's time.
5. The player treats the patient with the hold-to-fill bar (section 3).
6. Treatment uncovers something. The player chooses what to do about it. The choice is a timed dialogue choice.
7. The case closes with a corner notice. One flag is set, and reputation, materials or Medis risk move.
8. If the case was story critical, a story beat starts and a line, a reaction or a scene reads the flag. Otherwise the next patient arrives.

Five episodes. Each has three or four story beats and three cases, which makes 15 cases across the game. A story critical case uses the full shape. The others are cheap cases: intake, treatment, close. More cases per episode can come later if feedback asks for them.

The arc, as Mike set it: the Scavenger Leader sends Marcus friends and family first. As more people hear about him his street cred rises, and rival gangs start looking for the Hidden Room, so he runs into them and cuts deals for medical services. That ends head-long against the Medis, and how well the player has done decides how that conflict ends and who lives and who dies.

### Inputs

The loop itself adds no input. It uses walk and run (left stick, WASD), interact (bottom face button, E), and dialogue choices. Choices follow the brief's layout: one choice on the bottom button, two on left and right, three on left, top and right, with keyboard 1, 2, 3 by order. A spec option uses the free bottom button or keyboard 4 (section 8). All actions are remappable through Enhanced Input, and prompts redraw from the mapping. The per-action alternatives are in each system's section.

### Story purpose

Marcus fled the City of Lights and is hiding from it in The Hive. The story to follow is Mike's. The clinic is where the player meets The Hive one person at a time. Cases let the writing show who runs what, who is afraid of whom and what cyberware costs, without an exposition scene. The story beats carry the plot. The cases carry the city. Flags from cases change reactions and one later scene, and their combined result decides the ending (cost check).

### Feeds from and into

- From: story beats set which patients can arrive and which contacts are free. The episode's goal sets which facts matter.
- Into: every other system. Cases are where treatment, hacking, information, parts, reputation and growth get used.
- Skill points are awarded at the start of each episode (section 8), so the loop also paces growth.

### On failure

The loop never stops on a failure. A case that goes badly closes with a worse outcome flag. A case the player walks away from closes as "untreated" and the patient's thread continues in the story with that flag. Episode beats always play, though results can change who survives them.

### Simpler alternative

Clinic cases as scripted scenes with no routes: each case is one intake talk, one treatment, one choice, with the fact and the part given by the script. This drops sections 6 and 7 from the cases entirely. What it loses: the feeling that Marcus runs a clinic in a city that charges for everything, and the reason for reputation and materials to exist. What it keeps: treatment, discovery, choice and consequence, which are the parts that carry the story.

### Open questions for Mike

1. Can the player leave a non-critical case untreated with no story reason, or do all three cases always run? This proposal lets them close as "untreated".

## 2. Clinic hub and patient cases

### What the player does

The clinic, the Hidden Room, is one side-on interior near Marcus's home in an abandoned part of The Hive, set up in secret to hide from the Medis, a medical cartel posing as this world's hospital services. It has a treatment table, a parts bench, a terminal and a door. The AI Companion is always available there. The Intel Contact and Hacker Contact visit or call when a case needs them (proposed). The player walks the room, talks, uses the bench and the terminal, and treats patients on the table. Patients arrive one at a time through the door at the start of a shift, sent by the Scavenger Leader at first and by word of mouth later, and leave at the end of their case. Patients are one-offs and do not come back as patients. Some become contacts the player can meet or call for information on gang leaders, resources or discounts (section 6).

A case is hand-written and runs through these fixed stations:

| Station | What happens | Who it uses |
|---|---|---|
| Intake | A short talk at the door or table. The patient says what hurts. Marcus says what it needs. | Dialogue |
| Need | If the case needs a fact or a part, the player gets it before or during treatment. | Sections 6 and 7 |
| Treatment | The hold-to-fill bar on the table. | Section 3 |
| Discovery | At a checkpoint, or on inspecting the implant after, Marcus finds the thing the case is about. | Section 3 or 4 |
| Choice | One timed dialogue choice, two or three options. | Dialogue |
| Close | Notice, flag, payment. The patient leaves. | Section 9 |

Not every case has every station. A cheap case is intake, treatment, close.

#### Days and actions (Mike, 2026-11-06; rework in test, 2026-11-07)

An episode has days, and a day has actions, starting at 3 days with 3 actions each. Treating someone, breaking down gear, asking around and sending a contact each use one action. A story patient takes 2 in one day (lead call). Paying the Hacker Contact uses materials and no action. An ordinary patient waits a set number of days, and if the wait ends with them untreated, they leave and XP drops. Story patients never leave.

Mike's play-test found the time hard to understand and hard to prioritize. The causes in the first version: the game quietly held back actions for story patients and greyed out buttons with no reason, later patients were a surprise, and the screen said "parts" in one place and "materials" in another. The demo now has:

- A how-to card before day 1, which can be reopened from the panel.
- A planner with the days across the top and each patient's wait as a bar, including patients who haven't arrived yet.
- Action dots: cyan to spend, amber already set aside, with the story patient's name under them.
- A plain reason whenever something is blocked, and the cost and XP on the choice itself.
- One word, materials, everywhere.

Two rules for story patients, on a setting in the demo:

| | Booked on a set day (lead's recommendation, the demo's default) | Any day, with time held back (the first version) |
|---|---|---|
| The rule | The Fighter is booked on day 2 and the Lieutenant on day 3. The player can prepare before then. | Fit them in on any day. The game holds back the actions to make sure they fit. |
| What the player works out | Only how to spend the cyan dots | When to do them, and why actions keep going amber |
| Time pressure | The same 5 free actions | The same 5 free actions, with more say over when |
| For the story | Beats can assume which day a story patient is treated | Beats have to wait on the player's order |

The planner goes beyond the HUD limit, so it's on the approval list below. A shipped version could show the same information as a pause menu page or the AI Companion's morning line.

### Inputs

Walk, interact, dialogue choices. The table, bench, terminal and door are interactables in the existing plugin. The terminal opens the Hacker Contact talk and the ring hack for cases that use them. No new input.

### Story purpose

The hub gives the game a home and a rhythm. It is where consequences land: a former patient calls with something useful, a contact mentions what they saw, the Scavenger Leader sends word. Hiding it also gives the story a clock, because every new patient is one more person who knows where it is. It is also the only place the player can breathe between beats.

### Feeds from and into

- From: story beats decide who is in the clinic and which cases run. Growth decides which bench machines exist.
- Into: every case sets at most one outcome flag and moves reputation, materials or Medis risk. Beats read those.

### On failure

A case cannot be failed as a whole. Its parts can go wrong (a lost hack, a missed part), and each of those sets a cheaper outcome rather than a dead end. If the player leaves at a non-critical checkpoint, the patient stays on the table with progress saved, and the shift does not end until the player resumes or sends the patient away through a dialogue choice. During a critical step the player cannot leave (section 3). During a case the clinic door leads only to the Talk location, and returning restores the paused treatment. A patient sent away closes as "untreated" with one shared report line.

### Simpler alternative

A minimal clinic. The hub stays, as decided, but it is one room with the table and the door, with no bench or terminal to walk to. Contacts are met in beats and speak to Marcus at the table. What it loses: the walk-between-stations feel and the bench. What it saves: interactables to test in every case and part of the dressing work across five episodes.

### Open questions for Mike

1. Do the Intel Contact and Hacker Contact visit the clinic in person, or only call? Your answer on who knows the location decides this. Calls are cheaper, since they need no character in the room.

## 3. Medical aid (hold-to-fill bar with checkpoints)

Status 2026-11-07: overruled by Mike's demo rulings. Treatment is now timed keys and timed talk with no walking, as in `treatment.html` and the Fighter case below. The text in this section is the original proposal and gets rewritten when Mike approves the system.

### What the player does

Marcus stands at the table. The player holds interact. A bar fills. The bar has two to four checkpoints, each named for a step: stop the bleeding, remove the bullet, close the wound. When the fill reaches a checkpoint the hold pauses and a short line or a close-up plays. Each step is one of two kinds. A critical step cannot be left: stopping the bleeding, or disconnecting cyberware before a short kills the patient. A non-critical checkpoint lets the player let go and walk the clinic (fetch a part from the bench, ask the Hacker Contact something, make materials for new cyberware) before coming back to hold again. Because a critical step locks the player to the table, any part it needs has to be in hand before it starts. The fill never drains. A case's discovery usually lands on a checkpoint: Marcus stops, looks at the arm, and says something is wrong.

Tech does not skip checkpoints. Medical steps take every specialty the same time, and cyberware steps (disconnecting, fixing, reconnecting) fill faster for Tech. Tech rank 3 adds a surgical rig: Marcus starts it with one press and it does one organic step, such as removing a bullet, stabilizing the patient or closing the wound (section 8). Mike described the rig as an idea he is playing with, so it is proposed here for his call.

Proposed starting values, to be adjusted once it is built: 6 to 10 seconds of total hold per case, three checkpoints, 2 to 3 seconds per segment. The bar may be able to reuse the hold-to-hack component with named stops. That is an assumption to verify at the build hand-off, because named stops and saved progress are unproven in that component.

No comparable game was found for a checkpointed hold bar (comparables, open uncertainties). This section stands on Mike's idea and on the brief's existing hold component, not on evidence.

### Inputs

- Controller: hold the bottom face button. Keyboard: hold E. Both remappable.
- Hold alternative: a toggle setting (press once to start, press again to pause), which is the shipped pattern (finding 6). A second option advances one segment per tap.
- The assists keep the same story outcome. The bar cannot fail, so the only thing an assist changes is effort. The critical step lock still applies under the toggle.

### Story purpose

Treatment is the action that makes Marcus a medic rather than a talker. Checkpoints give the writing beats to speak over: the patient talks while the bar fills, and the discovery lands on a stop. Letting go to walk the room lets a case interrupt itself (a material is short, a contact has news) without a cutscene, and the critical steps that forbid it say which moments a patient could die in.

### Feeds from and into

- From: a part from section 7 may be required before a critical step. A fact from section 6 may change what Marcus says at a stop. Tech ranks in section 8 change the fill speed on cyberware steps and add the rig.
- Into: the discovery feeds the choice. The close feeds section 9. Reflex slow-down is not used here.

### On failure

The bar cannot fail. Leaving at a non-critical checkpoint pauses the case. If a required part is missing before a critical step, the step will not start until the player gets one or chooses to go on without it, which sets the cheaper outcome flag.

### Simpler alternative

Drop the bar and use three separate hold-to-interact prompts on the patient, one per step, with a line between. Movement locks to the table for the whole procedure, unless a step needs a part. This needs no new widget, but the case must still save which steps are done. What it loses: the single bar reading as one procedure, and Mike's free movement between checkpoints. What it keeps: the hold, the named steps and the discovery.

### Open questions for Mike

1. Keep the surgical rig as Tech rank 3? It adds one machine prop and one more state to test in each case that uses it.

## 4. Hacking minigame (rings)

### What the player does

A lock of one to four rings appears, built from the assets in `Graphics/_library/loose/minigame/hacking_ring_assets` (four rings at radii 480, 390, 300 and 210, each with a 56 degree gap, and a center lock icon). Only the current ring is live. The sequence per ring:

1. Search. A small arrow sits on the ring. The right stick rotates the arrow around the ring. The ring's gap is at a different angle for each ring, set per lock or randomized. Three cues say how close the arrow is to the gap: a glow on the ring that brightens near the gap, a tone that rises in pitch, and a rumble that strengthens. The rumble has its own toggle and the other two cues always play (finding 17, finding 18).
2. Fit. When the arrow is inside the gap the player presses the fit button. A piece fills the gap and the ring lights up.
3. Sequence. A timer starts. Two to four direction arrows appear in the ring's center, with the current one on top and the next ones dim below it (changed by Mike, 2026-11-07). The player presses them in order with the d-pad or left stick.
4. Solve. The ring turns green, is pushed outward by the next ring and fades into the background. The next ring takes its place.
5. Open. When the last ring is solved the lock opens, the rings play a wave, and "Access granted" animates in.

The asset README notes every gap is at the same angle and that rings rotate by Render Transform Angle. So the search step only matters if each ring starts at its own rotation, which this proposal does (research design point). It also means the one gap piece, cut for the outer ring, needs a piece per radius or a scaled copy. That is an asset note, not a design change.

Proposed starting values: two rings for a door, three for a device, four for a story hack. A ring timer of six real-time seconds. Three arrows per ring, four on the last. Reflex slow-down runs automatically: the scene behind the lock plays at 0.3 speed and blurs, as if Marcus's brain speeds up. The six seconds is what the player actually gets, already counting the slow-down, and it is the same for every specialty. Netrunning changes the look and the ring count, and not the timer or the game (finding 14, finding 15). Its cleaner interface removes the visual noise from the rings and draws the upcoming arrow brighter, so the sequence is easier to read.

#### Level game (Mike, 2026-11-07)

`ring-hack-prototype/levels.html` teaches the hack one mechanic at a time, the way the game would across its episodes. The custom version at `index.html` keeps every setting for tuning. A how-to card pauses the lock the first time a mechanic comes up. Level 1 starts with a practice: the player has to take the arrow a full circle before the fit works, because testers pushed the stick in four directions instead of spinning it. If a player presses the d-pad while searching, or searches for 6 seconds without finding the gap, a line under the ring says to spin the stick.

The episode for each level and the exact numbers are lead proposals for Mike's approval. Mike set the direction after playing it on 2026-11-07: the gap narrows to 25 degrees by level 6, the timers shrink by quite a bit, and the red ring gains arrows. The current arrow is also drawn large in the exact middle of the ring, with the next ones small below it and more see-through.

From level 6, running out of time to find the gap sets off the red ring and an "Intruder Alert" label, and the ring waits behind it. The timeout itself is no strike. If the red ring reaches the player, it pushes a solved ring back and counts as a strike.

| Level | Name | New mechanic | Rings | Gap | Time to enter arrows | Time to find | Red ring arrows | Proposed episode |
|---|---|---|---|---|---|---|---|---|
| 1 | First lock | Search, fit, arrows. The gap is visible | 1 | 56° | None | None | - | 1 |
| 2 | Hidden gap | The gap hides until close, and the cues find it | 1 | 50° | None | None | - | 1 |
| 3 | More rings | Solved rings push out, and the last ring has an extra arrow | 2 | 44° | None | None | - | 1 |
| 4 | The clock | A time limit on the arrows | 2 | 37° | 6 s | None | - | 2 |
| 5 | Strikes | Three failed rings lock you out | 3 | 31° | 5 s | None | - | 2 |
| 6 | Gap timer | A time limit on finding the gap, from ring 2. Running out sets off the red ring | 3 | 25° | 4.5 s | 6 s | 2 | 2 |
| 7 | Antivirus sweep | An arc orbits the ring and catches the arrow, from ring 2 | 3 | 25° | 4.5 s | 5 s | 2 | 3 |
| 8 | Hunting sweep | The sweep chases the arrow | 3 | 25° | 4 s | 4.5 s | 3 | 3 |
| 9 | Corrupted arrow | One arrow per ring means the opposite direction | 3 | 25° | 4 s | 4.5 s | 3 | 3 |
| 10 | Decoy gap | A second gap with stuttering cues fails the ring | 3 | 25° | 3.5 s | 4 s | 4 | 4 |
| 11 | Moving gap | The gap jumps every 5 s, even with the arrow on it | 3 | 25° | 3.5 s | The jump is the limit | - | 4 |
| 12 | The alarm | Failed rings and a story beat set off the red ring too | 3 | 25° | 3 s | 4 s | 4 | 4 |
| 13 | Full lock | Everything except the moving gap | 5 | 25° | 2.5 s | 3.5 s | 5 | 5 |

The Netrunner's ring break is a specialty rather than a level, so it's a switch on the panel and gets its own card the first time it can happen. The search step stays in the level game. Mike's final ruling on it comes with his approval of levels 1 and 2.

What is shared and what Runner adds:

| Shared (PhantomInteraction, usable by ProjectSilence) | Runner adds on top |
|---|---|
| The ring widget: ring count, gap angles, timer, sequence length, cue settings, assist settings. It returns one of success, ring failed, lockout. | Who may attempt it (specialty or Hacker Contact), what it costs, which flags its result sets. |
| The hold-to-hack component already in the brief, kept for trivial locks. | The slow-down rate and the blur look. |
| Retry and lockout rules as numbers. | The "Access granted" text and any story line after it. |

No story name, flag or line lives in the shared part.

### Inputs

- Controller: right stick to search, right bumper (R1) to fit, d-pad or left stick for the sequence. Keyboard: mouse or arrow keys to search, E to fit, WASD or arrows for the sequence. All remappable.
- Stick precision alternative: a snap setting that steps the arrow between fixed positions, and a no-search setting that places the arrow in the gap and asks only for the fit press (finding 18).
- Timer alternative: the ring timer can be lengthened up to ten times or switched off (XAG 116 in the UI research). Unlimited ring retries are an assist setting, off by default, so that lockout has a story cost for players who want one (finding 11, finding 12).
- Skip: "Skip hack" from the pause menu completes the hack as a success. Skipping a puzzle has shipped elsewhere (finding 7). Its result here and its cost are Runner design choices: it returns an ordinary success and charges whatever that route normally costs, which is nothing on a self-hack.
- Every assist returns the same result as a successful input. That means it bypasses the failure consequence: unlimited retries and the skip never set the "noticed" flag.

### Story purpose

Hacking is how Marcus reads cyberware and gets through doors. It is the Netrunning specialty's signature action. In a case it is one of the ways to find a fact (section 6), so a Netrunner pays nothing where others pay materials.

### Feeds from and into

- From: section 8 sets who can attempt, the ring count and the interface. Section 9 charges the cost on a paid route.
- Into: section 6 (the fact), case discoveries (inspecting an implant's software), door and device interactions in beats.

### On failure

A wrong arrow or a timed-out ring resets that ring, not the lock. After three failed rings (proposed) the lock is locked out. The game autosaves before each hack, and on lockout the player picks one of two things. Reload from that checkpoint and try again, with no flag set. Or accept the story cost, which is the cheap failure type (finding 24): the player gets the fact or the door another way (the Hacker Contact finishes it for materials, or a noisier physical route for Enforcer), and a flag records that the hack was noticed. The lock never ends the case. Some story hacks can drop the reload and keep only the story cost, marked per lock.

### Simpler alternative

Pre-aligned rings, no search. Every ring opens with the fit press and the arrow sequence, which is what the assets support as shipped. What it loses: the right stick, the three proximity cues and the rumble toggle, which also removes one accessibility surface. What it keeps: the ring look, the sequence, the green-and-fade solve and the open animation. A further cut keeps the brief's one-press breach cinematic (BRIEF 2026-10-21) for every door and uses rings only for story hacks.

### Open questions for Mike

1. Keep, change or cut the search step? The prototype below answers this.

Prototype, approved by Mike on 2026-11-05 with its first task changed, and built at `design/ring-hack-prototype/index.html`. It waits for Mike's session on his controller. It leaves out the reflex slow-down, because there is no scene behind the lock to slow:

- Goal: find out whether finding a gap by stick with the three cues is fun for 10 seconds at a time, before any UE work.
- Task 1: a local page reads your controller. An on-screen rumble indicator stands in for real rumble. This applies only to the prototype, and real rumble stays in the UE design.
- Task 2: four rings from `hacking_ring_assets`, with search, R1 fit, arrow sequence, green-and-fade solve and "Access granted". The glow and tone cues are in, with the rumble indicator as the third cue.
- Task 3: on-page sliders for gap size, timer and cue strength, plus a toggle for the Netrunning look.
- Done when: you have played a three-ring lock on your controller and ruled to keep the search step, change it, or cut it to the pre-aligned version.
- Limits: local files only, nothing in UE, no story content.

Lockdown mode, Mike's idea from 2026-11-05, added to the prototype and not yet approved. A failed ring sets off an alarm, and a story beat can set it off too. A red ring appears outside the lock and closes in. The player works the red ring through the same search, fit and arrows, with the closing time as its only timer, and the current ring waits. Solving it clears the alarm and costs only the time. If the red ring arrives, it pushes the newest solved ring back to be solved again, or restarts the current ring if none is solved. Only an arrival counts as a failed ring, so the existing lockout ends any repeat. A slip on the red ring sends the player back to its search with the clock still running. Starting values: 8 seconds to close and 2 arrows. The accessibility setting holds the red ring still.

Tester results, added on 2026-11-05 at Mike's request. The prototype records each lock: how it ended, time spent, search times, missed fits, wrong arrows, timeouts, alarms, red ring results, layer failures, the tester's rating and the settings used. Results stay in the tester's browser until they download a CSV. `design/ring-hack-test-kit.zip` holds the files to send to testers, and nothing is hosted online. Lockdown is on by default in the kit and the layers are off, so that is what testers will measure unless Mike changes it.

Difficulty layers, added to the prototype on 2026-11-05 as toggles that start off, none approved. An antivirus sweep orbits the ring during search and sets off the alarm if it stays on the arrow for 0.2 seconds. A decoy gap gives the same cues as the real gap but they stutter, and fitting it sets off the alarm. A moving gap jumps after 4 seconds unless the arrow is in it. One corrupted arrow per ring is drawn dashed and pink and needs the opposite direction. With lockdown off, a catch or a decoy counts as a failed ring. None of them apply to the red ring or the pre-aligned version. A trace meter that sets off the alarm after several mistakes is still only an idea, not built. The proposed rule is one layer per lock and two for a story hack. Each uses existing inputs, and an assist returns an ordinary success. Preparation can remove a layer: paying the Hacker Contact or sending the Intel Contact first (section 6) removes it or delays the alarm. Each faction could have one signature layer, which teaches the player what to expect from that faction's security.

## 5. QTEs and reflex slow-down

### What the player does

In authored cinematics a prompt appears, time slows, and the player presses the shown input before the window closes. Two input types for the whole game, no more (finding 9): a single press on the positional diamond, and a hold. No mashing. The slow-down is Marcus's improved reflexes and is on by default. Proposed starting values: the player gets three real-time seconds to respond while the scene plays at 0.3 speed.

A fight is a sequence of these inside one continuous take, as the approved chair fight already does (section "Chair fight boundary").

### Inputs

- Controller: the face button the diamond shows, or a hold on it. Keyboard: the key the prompt shows. Remappable, and the diamond redraws from the mapping.
- Hold alternative: tap to count as hold. Window alternative: the prompt waits for the press with no window, or auto-completes (XAG 107 options in the UI research).
- QTEs can be switched off, which auto-completes every prompt.
- Every assist returns an ordinary success, so a player using one never gets the miss flag (see On failure).

### Story purpose

QTEs put the player's hands in a fight or an escape without free combat. They are where the Enforcer specialty shows: an Enforcer gets a better beat on success, where one is authored and approved.

### Feeds from and into

- From: section 8 (Enforcer) picks which beat variant plays.
- Into: a miss sets a flag that a later line can read (a bruise, a lost item). No other system depends on QTE results.

### On failure

The default is that a missed prompt still completes the move, with a worse-looking beat only where one is authored. Most prompts have no authored miss, and the scene continues identically with one flag set. A fight where a miss changes the outcome is written as a separate approval, because every alternate beat is animation (see the cost check).

### Simpler alternative

Prompts that cannot be missed: the prompt waits, and the press plays the move. This is the chair fight rule applied everywhere. What it loses: tension and the Enforcer's "better outcome" promise, which would then be dialogue only. What it keeps: the player's hands in the scene, the slow-down look and the accessibility story.

### Open questions for Mike

None left. Mike agreed to test the window of three real-time seconds at 0.3 scene speed, in a Sequencer test later. No fight outside the chair fight has an authored miss beat in episode 1.

## 6. Intelligence gathering (talk, send a companion, pay a hacker, or hack it yourself)

### What the player does

Intelligence works at two sizes, using the same routes.

At the start of an episode Marcus is told the goal and a lead, and the AI Companion offers the ways to go about it. Mike's example: two gangs are about to go to war and the district has to be evacuated, or the war has been fought and a leader has to be saved, because that leader's right hand would be worse. How do you want to handle that? The player might send the Intel Contact to look into one thing and pay the Hacker Contact to break into a security system, then walk right in.

Inside a case or beat there is one fact to learn: who did this, where the Gang meets, what is in this arm. Every route sets the same flag. The cost, one line of flavour and the level of detail differ. There are no hidden odds, following threshold-style gates rather than rolls (finding 16, finding 21).

| Route | How | Cost | When it is available |
|---|---|---|---|
| Talk | Walk to the bar or a location and talk to the Bar Contact, or call a former patient who became a contact. | No materials. An errand in the fiction, and less detail in the fact. | Always. |
| Send a companion | A dialogue choice sending the Intel Contact. The fact arrives when the player next returns to the table, inside the same case. | The contact cannot do anything else until the case closes (a cooldown, finding 19). Less detail in the fact. | When the Intel Contact is free. |
| Pay the Hacker Contact | A dialogue choice at the terminal. Immediate. | Materials. | When the Hacker Contact is reachable. |
| Hack it yourself | The ring hack at the terminal or on the device. | Free. | Netrunning specialty. |

No service ever delivers at the next beat, because a beat cannot start until the case closes. The route is chosen as a dialogue choice, so there is no new screen. The layout holds three choices, so the first step offers ask in person, send a companion and get it hacked. A Netrunner then gets a second step for doing it themselves or paying. The fact appears as a corner notice and is readable in the pause menu log.

Lower-detail routes can come back as a rumour: a true fact with parts missing. No route returns a wrong fact. Misinformation may come into the narrative later, and that is a story discussion outside this proposal.

### Inputs

Dialogue choices and walking for every route, using the layout in section 1. The hack route uses section 4's inputs and alternatives. Nothing else is added.

### Story purpose

This is Mike's "intelligence gathering" and the reason contacts exist. The route says who Marcus is: a man who pays, who asks, who sends friends into danger, or who does it himself. The AI Companion gives him someone to plan with, and the Hacker Contact's charge is the game's clearest statement that nothing in The Hive is free.

### Feeds from and into

- From: section 8 opens the self-hack route. Section 9 pays the Hacker Contact. Beats decide who is free. Patients from section 2 become contacts.
- Into: the fact unlocks a dialogue option or a route in the case's choice. The episode plan decides how a beat opens. A contact's absence is read by the hub.

### On failure

Routes do not fail, except the self-hack, which can lock out (section 4). On lockout the player reloads or falls back to another route. If the Intel Contact is busy and the player has no materials, the Talk route always remains, and its errand costs time in the fiction only.

### Simpler alternative

Two routes: ask (talk and send a contact merged into one route with no cost beyond less detail) and hack (the Hacker Contact for materials, or yourself if Netrunner). What it loses: the contact-away state and the bar visit as a place. What it keeps: the free-or-paid choice and the Netrunner shortcut.

### Open questions for Mike

1. Does the bar exist as a scene the player walks to, or is Talk a conversation at the clinic door? Your AI Companion answer did not settle this, so the bar stays in for now.
2. How many approaches does the episode plan offer, and how far can the approach change a beat? This proposal assumes two or three approaches, all reaching the same beat with a different opening. If an approach needs its own level, it is a new cost.

## 7. Materials and crafting

### What the player does

Everything is one count: materials. There are no clamps or named parts to fetch, because Mike cut the bench and the clamp from treatment. Materials arrive three ways:

| Source | How | Demo value (placeholder) |
|---|---|---|
| Morning delivery | The Scavengers send it each morning, and level sets the size. | 1 per level, per morning |
| Breaking down gear | Uses one action. | +2, and +3 for a Tech |
| Starting gift | Each episode opens after a time jump, so counts reset. Last episode's results decide what someone sends as thanks (Mike, 2026-11-05). | Not in a demo |

Materials pay for treatments, the Hacker Contact and the AI Companion's jobs. A treatment shows its cost before it starts. A patient can always be treated without materials, for a rough result and less XP.

Prices are hidden during surgery, because Mike took them out of the dialogue, so the AI Companion can always be chosen. Materials can then go below zero as a debt, and the tally lists every charge. The AI's loading screen still states its price.

Crafting and machines: under XP the two expensive machines became shop upgrades bought with a level, the Better bench and the Tissue printer. No demo has crafting as its own action. This is the lead's reading of the XP ruling, and it's question 1 below.

### Inputs

Dialogue choices. Breaking down gear is one press on the day's choices. There is no bench to walk to.

### Story purpose

Materials are how the city's economy touches the table. The delivery growing with level says the Scavengers think more of Marcus as he proves himself. The starting gift shows the player that someone remembers, without a patient having to come back.

### Feeds from and into

- From: level sets the delivery (section 8). Actions pay for breaking down gear (section 2). Last episode's outcomes set the starting gift.
- Into: treatment quality and XP (sections 3 and 9), the Hacker Contact (section 6) and the AI Companion's jobs (the Fighter case).

### On failure

Running out never stops a case. The treatment goes ahead rough, the fact has a route that costs an action instead, and an AI job runs up a debt.

### Simpler alternative

Materials only for story patients. Ordinary patients cost actions alone, so the player weighs one number on most days. What it loses: the pull between breaking down gear and treating someone. What it keeps: the materials decision where it carries story weight.

### Open questions for Mike

1. Is a shop upgrade enough, or should crafting stay as its own action? Your request had buying, crafting and hiring. The current demos keep only delivery and breaking down gear.
2. Does a materials debt carry anything beyond the tally, such as a smaller next delivery?
3. Mike's 2026-11-05 answer made gear from the Scavengers the return for their favours. Is the morning delivery enough to carry that, or should a return job stay?

## 8. Marcus's growth (specialty, XP and upgrades)

### What the player does

Marcus starts weak. His first choice is the specialty, Tech, Netrunning or Enforcer, made in the opening beat. After that an XP bar replaces the episode skill points and reputation (Mike, 2026-11-06). Completed cases, treatments and successes fill it, and failures cut it. A level never drops, and a loss only empties the current bar. Each level gives one upgrade for the shop or for Marcus's body, spent straight away in a dialogue choice, so there is still no skill screen.

Upgrades in the Week demo, all placeholders:

| Group | Upgrade | Effect |
|---|---|---|
| Shop | Better bench | Breaking down gear gives 1 more material |
| Shop | Tissue printer | Organic cases need 1 fewer material |
| Body | Rebuilt lungs | 1 more action each day |
| Body | Steady hands | A clean treatment allows 1 more missed key |

The pace target is about two levels an episode, so about 10 upgrades across the game. A simple run that treated everyone earned 17 XP at 10 XP a level, and a stronger one earned 21. The nine specialty ranks and the three bonus points from 2026-11-05 no longer have a place under this ruling. That's the lead's reading, and question 2 below.

What each specialty does in the demos:

| Specialty | Getting a fact | Treatment | Removing the malware |
|---|---|---|---|
| Netrunning | Hack it yourself, for one action and full detail | No change | Plays the harder hack, for more XP. Breaks one ring per lock, and has a cleaner interface |
| Tech | Asks around, for less detail | One key fewer on cyberware steps, and 1 more material from gear | Does it directly with timed keys |
| Enforcer | Leans on someone, for full detail | No change | Talked through by the Hacker Contact, or pulls the controller by hand with a weaker arm if the contact is away |

The spec option. Dialogue normally offers three choices on X, Y and B. At certain points a fourth option arrives on A, depending on Marcus's spec and where he is. It only shows when the player qualifies. It arrives a few seconds after the other choices with a glitch effect, and the hack option has Mike's chip icon beside it. Mike's example is the scene with Vhoori: a Netrunner can hack the guards' guns and keep answering during the hack.

The quick hack has no search step and no right stick, so the left thumb runs the arrows on the d-pad and the right thumb stays on the dialogue buttons. It has 8 arrows and its own 10 second timer, and a wrong arrow restarts the sequence. The talk timer doesn't stop. It runs at 0.1 speed, so a choice can still time out while the hack carries on.

### Inputs

Dialogue choices, plus the d-pad for a quick hack. Controller: A, keyboard: E or 4 for the spec option. Remappable.

### Story purpose

Growth is Marcus rebuilding himself. The specialty is the first thing the player says about who he is, and the three tracks are three ways to survive The Hive: fix it, break in, or hit back. Upgrades split between the shop and his body, so each level asks whether to invest in the clinic or in himself.

### Feeds from and into

- From: the opening beat gives the specialty. Cases and hacks fill the bar (section 9).
- Into: daily materials (section 7), actions per day (section 2), treatment results (section 3), the hack's look and ring break (section 4), the routes to a fact (section 6), and dialogue spec options.

### On failure

A level never drops. A spec option the player doesn't qualify for doesn't appear. A failed quick hack sets a flag, the scene continues and the talk is unaffected.

### Simpler alternative

Upgrades only, with no specialty effect on treatment. The specialty changes the routes to a fact and the removal, and nothing else. What it loses: Tech's edge at the table. What it keeps: the three identities, and fewer states to test.

### Open questions for Mike

1. Should the quick hack on the guards' guns change the chair fight? See the chair fight boundary. Without new animation it can only change a line.
2. The XP ruling replaces the skill points. Do the old specialty ranks and bonus points go completely, as written here, or should some come back as upgrades only that specialty can buy?
3. What are the real upgrades? The four above are placeholders.

## 9. XP, materials and failure costs

### What the player does

Money and reputation are gone. There are two counts the player watches, the XP bar and materials, plus the days and actions in section 2. XP values so far, all placeholders:

| Event | XP |
|---|---|
| Ordinary patient, clean | +3 |
| Ordinary patient, rough | +1 |
| Story patient, clean | +6 |
| Story patient, rough | +3 |
| Story patient, with a full fact or a lesser one | +2 or +1 more |
| The Fighter's case finished, in the Treatment demo | +6 |
| Doing the removal hack yourself | +2 more |
| A failed hack the AI Companion had to finish | -2 |
| Patient left untreated | -3 |

A treatment is clean if it has its materials and at most one missed key. There are no hidden odds.

Medis marks are not in any demo. The earlier proposal had free care add a mark, with an authored Medis scene at two marks. It still fits under XP, but nothing has tested it, and it's question 1 below.

Failure costs, with the rule that failure never ends play:

| What went wrong | Cost |
|---|---|
| Missed treatment key | Heart rate jumps, a complication is counted, and a rough result if there are too many |
| Failed ring during surgery | Heart rate climbs and stays up |
| Locked out of a hack | The AI Companion finishes it, for XP |
| Missed QTE | Marcus takes a hit, counted for the story cost, and the fight carries on |
| Failed quick hack | A flag, and the talk carries on |
| Too few materials | A rough result, or a debt for an AI job |
| Patient left untreated | XP, and a report line |
| Malware left in | The Fighter dies later, and a rumor can blame Marcus. The rumor's XP cost isn't set yet |

### Inputs

None for the counters, which are read only.

### Story purpose

XP carries the rise Mike described: friends and family first, then gangs looking for the Hidden Room, then the conflict with the Medis. Losing XP for abandoning someone makes the week's choices cost something, without a morality score (finding 27).

### Feeds from and into

- From: every case close, every hack, every patient who leaves.
- Into: upgrades and delivery (sections 7 and 8), dialogue conditions and the ending.

### On failure

Nothing here can stop play. XP can't go below the start of the current level.

### Simpler alternative

No XP loss. Failures only earn less. What it loses: the bite of abandoning someone, which Mike asked for. What it keeps: one rising bar, which is simpler to explain.

### Open questions for Mike

1. Do Medis marks and scenes stay, now that reputation and money are gone?
2. What does the rumor cost, and when does it hit?
3. Earlier answers kept a reload from checkpoint after a hack failure. The Treatment demo has the AI Companion finish it instead, with no reload. Should a reload stay as an option anywhere?

## The Fighter case, start to finish

This is the required worked example and the first case in the game, as it plays in `treatment.html`. Every step names the system it uses. Mike's version replaces the earlier part, route and terminal structure.

1. Setup (section 2). A card explains the scene and the keys. The player presses A and the rest runs by itself. The Fighter has a bullet in his cyber arm and a match in two days. A few timed lines start it, and the heart monitor is already high.
2. Stop the bleeding (section 3). Timed keys ending on a hold. Then a timed choice as he asks how bad it is, a reply, and timed lines that lead into the next step.
3. Deactivate the cyberware. Timed keys, then an alert: the arm's security hits his heart, and the monitor goes wild.
4. Hack or hand it off (section 4). The AI Companion asks, and any specialty can pick. "Hack it" plays a two-ring lock, with a how-to card the first time. Failed rings raise the heart rate, and a lockout brings the AI in for XP. "Get your AI to do it" plays a loading screen with a price in materials.
5. "What the hell happened?" Once he is stable he asks, with a timed choice and a reply.
6. Remove the bullet, then close the wound. Keys, a timed choice ("Who shot me?", "What do I owe you?"), and bridge lines.
7. Reconnect the cyberware. Keys, then a one-option line: "All done. Let me just run a diagnostics."
8. Diagnostics. A log scrolls down one column, and a results panel fills in. All pass.
9. "Something's not right." Two choices: run it again, or "I'm sure it's fine". Saying it's fine closes the case with the malware missed.
10. The second run. Both panels show and the matching rows light up, because the results are identical. Real hardware never repeats like that, and his heart skips. Marcus finds malware wired to the heart.
11. The choice (Mike's version). Remove it, tell the Fighter, or ignore it.
    - Tell: the Fighter asks to have it taken out, and the player does it, gets the AI to do it, or refuses.
    - Remove: the player does it, or gets the AI to do it.
12. Removal.
    - Netrunning plays a harder hack, three rings with more arrows and less time. Doing it earns more XP. A lockout brings the AI in for XP, and the malware still comes out.
    - Tech does it directly with timed keys at the table. Slips add complications and can't fail it.
    - Enforcer is talked through by the Hacker Contact, with the same keys. If the contact is away, he pulls the controller by hand and the arm ends up weaker.
    - The AI Companion costs materials, on either route.
13. Tally. A screen shows how the player did, their stats, every price paid and a button to try again.
14. What it leads to:
    - Malware left in (missed, ignored or refused): the Fighter dies, even if told. A rumor can blame Marcus. When he refused, the rumor says he found it and wouldn't touch it.
    - Malware removed: the gang will notice, and Marcus can bet on the Fighter, staking a favor owed to the Scavenger Leader. A win buys both their freedom from the gang leader. A loss leaves both still targeted.

How play continues when things go wrong:

- Too little material. The AI can still be chosen, and materials go below zero as a debt. Every specialty can remove the malware without paying.
- Hacker Contact unavailable. An Enforcer pulls the controller by hand, with a weaker arm.
- Failed inputs. A missed key adds a complication and raises the heart rate. A lockout brings in the AI Companion for XP. Nothing stops the case.
- Timed choices. If the timer runs out, a default answer plays and the scene carries on.

The facts and routes in section 6 no longer lead to this discovery, since the diagnostics do. In the Week demo, a fact on a story patient earns more XP when they're treated. The lead flags that as a place section 6 and the case have drifted apart, and Mike's next call on the intelligence system should settle it.

## Cost check per patient case

Comparables give no cost figure for a case (open uncertainties), so these counts come from the demo scripts and the authoring plan above. All are estimates.

| Work | Cheap case | Typical story case | The Fighter | How it was counted |
|---|---|---|---|---|
| Dialogue nodes | About 6 | About 20 | About 65 | The Fighter, counting each answer and reply as a node: 5 opening and setup, 3 checkpoints at 7 each, 2 alert and hack, 7 for what happened, 2 before diagnostics, 3 for the doubt, 4 for the discovery, 4 for the Fighter's request, about 13 AI Companion calls, and 6 outcome and later lines |
| Words | 240 to 360 | 640 to 960 | 700 to 1,100 | The demo's own placeholder text is about 500 words. Nodes are shorter now, because timed lines have to read quickly |
| Flags | 1 | 1 outcome, up to 2 minor | 1 outcome (4 values), removal method, security result | Each minor flag is read in one place only |
| Animation, new | 0 | 0 to 1 clip | 0 to 1 clip | Timed keys use the shared Marcus-working and patient-on-table loops. There is no longer any walking between stations to stage |
| Staged scenes | 0 | 0 | 1 or 2 | The gang's response and the bet |
| Test runs, first pass | About 3 | About 12 | About 12 | Listed below |
| Test runs, regression | 1 | About 5 | About 5 | One per outcome, plus one assist run |

Per episode, with 2 story patients and 4 ordinary ones on the demo's numbers: about 2,240 to 3,360 words of case dialogue, 2 outcome flags, and about 36 first-pass test runs.

Across the game: about 30 cases and about 11,200 to 16,800 words. Moving from 15 cases to 30 adds 15 cheap cases, which is about 3,600 to 5,400 more words and 45 more first-pass test runs. Mike set the larger count on 2026-11-06. The other per-episode work is unchanged:

| Work | Count | Notes |
|---|---|---|
| Episode plan talk | About 10 nodes | The AI Companion's offer and reports |
| Medis scene | At most 1, if kept | Largest possible per-episode cost, and section 9 asks whether it stays |
| Starting gift | 1 per story critical outcome | About 1 line and 1 count change |
| Spec option | 1 or 2 | One node per specialty it serves, plus one flag |
| Former patient as contact | 1 or 2 | One call line per contact |
| Morning and end-of-day lines | About 6 | New with days and actions. They can be reused across episodes |

Game-wide cost of "who lives and who dies": this is the one thing that multiplies rather than adds. Mike's limits: three endings of the Medis conflict and at most three named characters who can die. Each death needs one authored scene, and every later line that mentions the character needs a second version. The Fighter is now one of these, since his death is settled for every run that leaves the malware in, and that uses one of the three.

Reachable states in the Fighter, not counting specialty: 4 outcomes (removed, refused, ignored, missed), times 3 security results (worked, failed, AI), and 5 removal methods on the removed outcome only (hack, Tech, talked through, by hand, AI). Later, the removed outcome adds a bet with three results (no bet, won, lost). These add up rather than multiply, because each changes a line or a tally row. The authored content is 4 outcomes, 2 rumor lines, 1 gang response and 1 bet scene.

First-pass test runs for the Fighter, chosen by risk. Each checks the flags and the XP at the end:

1. Netrunning hacks both locks and removes it.
2. Netrunning locks out of the forced hack, then removes it by hack: two XP losses at most, and the malware is out.
3. Netrunning locks out of the removal hack: the AI finishes it and charges no materials.
4. Hand the alert to the AI, then the removal too: materials go below zero and the tally lists both.
5. Tech removes it directly, with slips that add complications and don't fail it.
6. Enforcer is talked through by the Hacker Contact.
7. Enforcer with the contact away: by hand, with a weaker arm.
8. "I'm sure it's fine": missed, with the rumor line.
9. Tell, then refuse: refused, with its own rumor line.
10. Ignore it: ignored, with the rumor line.
11. Every choice timed out: default answers, and the scene finishes.
12. Assist profiles: waiting keys, auto-complete and tap as hold, each with a save and reload.

Limits proposed. These are design limits to hold the estimates above, and Mike can change them:

- Three distinct authored outcomes per case plus one shared line. The Fighter has four, because Mike's version added refusal.
- One later callback per case, as a line or a scene.
- Five surfaced decisions per episode across cases and beats. This is a Runner design choice. Telltale surfacing five per episode (finding 1) is a reference, not evidence of a production limit.
- Six cases per episode, two of them story patients. An episode carries about 3,400 words of case dialogue at most.

Recurring work per case that is not content: a clinic test map pass, a save and reload check with the case's flags, and the accessibility profiles. Adding one encounter or rule mid-production multiplies scheduling (finding 2), so new case types after the first episode are a Mike decision.

## Chair fight boundary

The approved Cascadeur fight (`plans/2026-11-05-cascadeur-animation.md`) is one continuous take of ten beats, Marcus plus two guards with Vhoori in two poses, no fail state, and a QTE that completes by default with a slow effect. Nothing in this proposal changes its take, its beats or its default. Section 5 is written so that fight fits it as is: press and hold prompts, slow-down on, default success.

Outcomes from this proposal that would need extra animation for that fight, listed for separate approval and costing, none assumed:

- An Enforcer variant of any beat (a different disarm or kick).
- A missed-prompt beat (Marcus takes a hit before the move lands).
- A strength-dialogue beat before or after the take.
- The quick hack on the guards' guns from section 8. Marcus is in the chair with Vhoori's gun to his head, so anything the hacked guns do on screen is a new beat or a variant. Before the take, with only a line reading its flag, it needs no animation.

Neither plan overrides the other. If Mike approves none of the four, the chair fight plays identically for every specialty and the Enforcer difference in that scene is dialogue only.

Mike's 2026-11-07 note adds a final choice with Vhoori after the fight: Threaten, Negotiate or Walk away. The Dialogue demo plays it as a timed choice with one reply each. In the real scene it needs three lines and three flags, and it sits after the take, so it doesn't change the fight. Walking away on screen would be new staging, listed here for costing. The demo's default if the timer runs out is Walk away, which is a lead call.

## Accessibility summary

Every input in this proposal, its controller and keyboard default, and its assist. All actions remap through Enhanced Input and prompts redraw from the mapping. The rule for every assist: it returns the same result as a successful input, charges that route's normal cost, and sets no failure flag. So an assisted player gets the same story as a player who succeeded, not the same story as one who failed.

| Action | Controller | Keyboard | Assist | Story result with the assist |
|---|---|---|---|---|
| Walk, run | Left stick, hold a bumper to run | WASD, hold Shift | Run as toggle | Unchanged |
| Treatment keys | Face button on the diamond, held when it says HOLD | Shown key | Waits with no window, auto-complete, or tap counts as hold | A clean result, with no complication |
| Dialogue choice | Position by choice count (section 1) | 1, 2, 3 | Timer extended up to ten times or off | Unchanged, and the player always picks |
| Spec option | Bottom face button | 4 | Timer extended or off | Unchanged |
| Quick hack during talk | D-pad | WASD or arrows | Timer extended or off, or auto-complete | Ordinary success. Dialogue does not time out during it |
| Ring search | Spin the right stick | Mouse or arrow keys | Snap steps, or no-search (arrow placed in gap). A line under the ring coaches players who push the stick in four directions | Ordinary success |
| Ring fit | Right bumper (R1) | E | None needed | Unchanged |
| Ring sequence | D-pad or left stick | WASD or arrows | Timer extended or off, unlimited retries | Ordinary success, with lockout and "noticed" bypassed |
| Hack skip | Pause menu | Pause menu | Completes as success, charges the route's normal cost | Ordinary success, with "noticed" bypassed |
| Hunt scene from the Medis | Left stick | WASD | Authored as walking with no timed input | Unchanged |
| QTE press | Face button on the diamond | Shown key | Waits with no window, or auto-complete | Ordinary success, with no miss flag |
| QTE hold | Hold the shown button | Hold the shown key | Tap counts as hold | Ordinary success, with no miss flag |
| Rumble cue | Toggle | n/a | Audio and visual cues always on | Unchanged |

Netrunning ranks stay useful under assists. Rank 1 gives the free route, rank 2 removes a ring and rank 3 adds a dialogue option, and none of those depends on the timer or on lockout.

Whether the timed dialogue choice is a core mechanic under XAG 116 is still Mike's call (UI research, unresolved choice 7). This proposal offers the extend-or-off setting either way.

## HUD and screen additions for approval

The brief limits the gameplay HUD to interact prompts, hack progress, dialogue choices, subtitles, corner notices and the skip prompt. Menus are allowed. These are the additions this proposal needs, each with a way to do without it.

| Addition | Why | Without it |
|---|---|---|
| Treatment bar with named steps | Section 3. It only shows progress now | Use the existing hack progress bar with no names, and say the step in a subtitle. |
| Treatment key prompt | Section 3 | Same approval as the QTE prompt, since it's the same element |
| Heart monitor | The Fighter case. It carries the tension in the treatment | Heart sound and the AI Companion's lines only |
| How-to cards | Mike's note that testers needed talking through. They appear the first time a mechanic is used | Spoken by the AI Companion as subtitles, with the game waiting |
| Week planner, action dots | Section 2 | A pause menu page, or the AI Companion's morning line |
| XP bar | Section 8 | A corner notice on each change, and a pause menu page |
| Ring hack widget (full-screen lock) | Section 4 | Count it as the hack progress element, since it replaces that bar during a hack. Or keep the one-press breach cinematic. |
| QTE prompt in cinematics | Section 5 | Needs approval as an addition. It would reuse the approved positional diamond, shown inside a cinematic. Without it, cinematics play with no input. |
| Direction arrows in the ring center | Section 4 | Draw them as positional diamonds instead, one per direction. |
| Pause menu log page: facts known, materials, XP | Sections 6, 7, 9 | Corner notices only, with nothing to read back. |
| Fourth dialogue option on the bottom button, shown only when the player qualifies | Section 8 | Replace one of the three options instead. |
| Quick hack arrows during dialogue | Section 8 | Play the hack before or after the talk. |

No skill screen, inventory screen, map or companion board is proposed. A corner notice example in this proposal's voice: "The Scavengers will remember that."

## Source coverage

Every mechanic in Mike's request, and what this proposal does with it.

| Mechanic from the request | Status | Where |
|---|---|---|
| QTEs where a sequence plays and the player inputs | Retained, capped at two input types | Section 5 |
| Hacking minigame based on class spec | Simplified: one minigame for all, specialty changes the look and the ring count, plus a quick hack as a spec option | Sections 4, 8 |
| Talk to NPCs at a bar or location for info | Retained | Section 6, Talk |
| Send companion NPCs to find out things | Retained: the Intel Contact, with a cooldown instead of odds, and rumours but no wrong facts | Section 6 |
| Hacking companion hacks in for a cost | Retained | Section 6 |
| Netrunner does it yourself | Retained | Sections 4, 6 |
| Medical aid: fix body and cyberware | Retained as timed keys, with Tech a key shorter on cyberware steps | Section 3, Fighter case |
| Craft items and acquire materials | Simplified: one count, no inventory, and crafting folded into shop upgrades, flagged for Mike | Section 7 |
| The gunshot wound and arm malware scenario | Retained as the first case, as a targeted Gang hack on one arm | Fighter walkthrough |
| Hold the button to fill a bar with checkpoints | Changed by Mike after playing it: timed keys ending on a hold, and the bar shows progress only | Fighter case |
| Movement between treatment checkpoints | Cut by Mike, 2026-11-07: the scene runs by itself | Fighter case |
| Pay, craft or hire for materials | Simplified: a morning delivery and breaking down gear, with AI and Hacker Contact jobs paid in materials | Sections 7, 9 |
| Craft cyberware or organic material with the necessary machines | Changed: the machines are shop upgrades bought with a level, flagged for Mike | Sections 7, 8 |
| Right stick moves an arrow around a circle | Retained | Section 4, step 1 |
| Find the gap; rumble and sound grow closer | Retained, with a glow added and a rumble toggle | Section 4, step 1 |
| Press R1 to fill the gap, circle goes active, timer starts | Retained, remappable | Section 4, step 2 |
| Direction inputs in the center, upcoming ones faint above | Changed by Mike, 2026-11-07: current on top, upcoming below | Section 4, step 3 |
| Input the arrows correctly to solve, move to the next ring inside | Retained | Section 4, step 3 and 4 |
| Repeat until all rings are solved, like tumblers | Retained, one to five rings across the level game | Section 4 |
| Only one circle visible at a time | Retained | Section 4 |
| Solved ring goes green, is pushed out, fades to background | Retained | Section 4, step 4 |
| Lock opens, rings animate a wave, "Access granted" | Retained | Section 4, step 5 |
| Netrunner QTE hacking might be easier | Proposed for change: easier through a cleaner interface and fewer rings, with the same timer and the same game | Sections 4, 8 |
| Images of early ideas and the ring asset sheet | Used as the look reference for section 4 | Section 4 |
| Simple web prototype if necessary | Proposed for the search step, with a goal and task list, waiting for approval | Section 4, open questions |

## CMF hand-off

For the separate CMF pass after Mike approves this proposal. The drafts in `cmf/drafts/` repeat the rejected story, so nothing in them is canon.

Approved gameplay claims (to use once Mike approves the sections they come from; none is approved today):

- A side-on narrative game in five episodes with a hidden clinic hub and hand-written patient cases between story beats, ending according to how well the player has done.
- Treatment by timed keys and timed talk through named steps, with a heart monitor carrying the tension.
- A ring-lock hacking minigame with a stick search, proximity cues, and an input sequence per ring, shared with a second game.
- Authored cinematic fights with slowed-time prompts and no fail state.
- Four routes to any fact (talk, send a companion, pay a hacker, hack it yourself), all rejoining before the choice.
- Three specialties that change what the player can attempt and how easy it is, with an XP bar and one upgrade per level.
- Days with a fixed number of actions, so the player chooses who gets their time.
- Failure that costs XP, materials or a reaction, and never ends the game.
- Accessibility alternatives for every hold, stick and timed input. An assisted input counts as a success and bypasses the failure consequence.

Full-game systems versus prototype promises:

| System | Full game | Proposed for the funded prototype |
|---|---|---|
| Core loop and hub | Five episodes, about 30 cases | One episode opening with the AI Companion's plan, and one set of clinic days |
| Treatment | All cases | Two cases, the Fighter and one cheap case |
| Ring hack | Doors, devices and story hacks, across the 13 levels | The Fighter's two locks and one door, on the first levels |
| QTEs | Every fight | The chair fight only |
| Intelligence | Four routes | Four routes on the Fighter fact |
| Materials | Delivery, breaking down gear, starting gifts | Delivery and breaking down gear |
| Growth | Three specialties, about 10 upgrades, spec options | The specialty pick, all three playable, a few upgrades and one spec option |
| XP and materials | Both, plus Medis marks and scenes if kept | Both, with the Medis scene cut |

Reassessed scope, replacing the old 25 to 30 minutes, six scenes, six characters and three playtest rounds. This is a proposal for Mike, not a renaming:

- Length: 20 to 30 minutes, measured by a timed playthrough of the build, not promised up front.
- Locations: one opening beat location, the clinic, the bar for the Talk route, and the chair fight location. Four, not six.
- Speaking roles outside the fight: Marcus, the Fighter, the second patient, the AI Companion, the Hacker Contact, the Scavenger Leader, the Intel Contact (who also works the bar, merging the Bar Contact for the prototype) and the Gang Enforcer. That is eight, and the AI Companion is voice only.
- Chair fight cast, from its own plan: two guards and Vhoori on screen, plus one voice-only support role. Marcus is already counted. The total is 11 or 12 characters, not comparable to the old six, and the CMF pass should present it as a real increase or cut roles.
- Fighter consequence shown: the "removed" outcome plays as the Gang Enforcer visit at the bar. The other outcomes play as lines. The bet isn't in the prototype.
- Playtests: two rounds, one internal at systems-in-grey-box and one external at content complete, with a choice log. A third round only if the schedule holds it.
- Systems delivered: the prototype column above, plus the accessibility assists in the summary table.

Questions the funded prototype would answer, with proposed pass marks. These replace the old proof questions:

| Question | Measure | Proposed pass mark |
|---|---|---|
| Do players understand the case loop without help? | Share of testers who finish the Fighter case with no explanation | 80% or more |
| Does the ring hack hold up? | Lockouts and assist use per tester, and exit interview on the search step | Most testers finish a three-ring lock in three attempts or fewer |
| Do players see that the choice mattered? | Exit interview: "What changed because of what you chose?" | Half or more give a correct example |
| Does the route choice feel like a choice? | Route spread across testers in the choice log | No single route above 70% |
| How long does it take? | Timed playthroughs | Reported, against the 20 to 30 minute estimate |

Claims that are displaced and must leave the CMF documents:

- The lead's name, past and secret. Mike has set only that Marcus fled the City of Lights and is hiding from it, with the story to follow.
- The city and faction names from the one-pager and the rich city's name.
- A shutdown code in every implant, the rich city switching implants off, and a district-wide recall.
- Hack completion playing inserts of the lead's past.
- The physical clinic ledger as a morality replacement and patients turning up by it.
- Silence as a counted per-character choice and the silent default. This proposal keeps timed choices with a default but does not count silence.
- Implant marker colours on crowd walkers.
- Crouch zones used for overhearing.
- The "what you looked at becomes something you can say" rule. It is a mechanic, not plot, so Mike may re-approve it on its own, but it is not in this proposal.
- A former patient whose arm fails first in a later episode.
- The six-rules framing of the Originality document, and the six-scene, six-character, 25 to 30 minute, three-round prototype.

Affected documents, by what each needs:

| Document | What changes |
|---|---|
| `cmf/drafts/02-narrative-positioning-statement.md` | Lead description and the migration theme, which came from the old plot |
| `cmf/drafts/03-community-engagement-plan.md` | "Draft answer": the story about entering a city without papers and the migration review of Episode 1 |
| `cmf/drafts/04-sustainability-plan.md` | "Draft answer": the city running on parts salvaged from the wasteland |
| `cmf/drafts/05-team-description.md` | The PhantomStory line and the StoryFlow lines, which are out of date against the brief, and any hold-to-hack line that the ring hack changes |
| `cmf/drafts/07-detailed-project-summary.md` | Summary paragraph, the six-rules sentences, the prototype scope line, and the "Market" and "Target audience" sections where they sell the displaced mechanics |
| `cmf/drafts/08-history.md` | The origin paragraph's concept name and plot summary, and the StoryFlow, Game Animation Sample and UEFN Mannequin licence rows |
| `cmf/drafts/09-originality-creativity-advancement.md` | The story section, all six rules, the StoryFlow lines, "what the prototype adds", "what the prototype will prove" and "what the prototype delivers" |
| `cmf/drafts/15-market-study.md` | "Go-to-market": timed choices with a silence option, and the choice-stats page this proposal does not define |
| `cmf/drafts/10-dialogue-fields.md` | The 2,000 character description, materials to deliver, the milestone table |
| `pitch-plan.md` | Workstream A items 1 and 2 (the one-pager as canon), workstream B's old conversation and choice branches, workstream D items D1, D2, D6, D10, and the submission date, which the plan already flags as unrealistic |
| `story/one-pager.md` | Withdrawn. Keep for the record, not as a source |
| `BRIEF.md` | The corner notice example in Avoid carries an old cast name; replace at the task 6 brief update |

A name search and the critique found no old plot in drafts 01, 06, 12, 13, 14 and 16-17. These still need their title and scope lines checked.
