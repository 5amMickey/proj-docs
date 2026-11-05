# ProjectRunner gameplay systems proposal

Drafted 2026-11-05 for Mike's review. Plan: `plans/2026-11-05-gameplay-systems.md` (task 2, RUN-183). Research: `research/gameplay-systems-2026-11-05/comparables.md`, cited below as "finding N". Critique: `research/gameplay-systems-2026-11-05/critique.md`, folded in on 2026-11-05 (rulings are in the plan). Updated 2026-11-05 with Mike's answers to the open questions (task 5, RUN-186). Status: proposal, nothing approved, nothing built.

## Summary

The game asks the player to do five things: walk through side-on scenes and talk, treat patients at the clinic by holding a button, break locks with a ring hack, hit prompts in cinematic fights, and choose. Everything else in Mike's request (gathering information, getting parts, growing Marcus, reputation and materials) is done through those same five actions, so the player never learns a new screen or control after the first clinic shift.

The core loop in one line: an episode gives Marcus a goal and a lead, his AI Companion asks how he wants to handle it, the player sends contacts out, and patients arrive. A patient case needs a fact or a part, getting it costs materials, a contact's time or a hack, the treatment holds a button through checkpoints, a discovery forces a choice, the choice sets one flag, and the next beat reads it.

The main simplification is that every decision the player makes uses the dialogue choice layout already in the brief. Picking a route to a fact, sending a contact, spending a skill point and asking for a part are all dialogue choices. No inventory, skill or map screen is proposed.

Decisions needed from Mike, in order of weight:

1. Rule on the ring hack search step after playing the prototype in section 4, and keep, change or cut each system after playing its demo. Mike approved local demos of treatment, QTE timing, dialogue and the Fighter case on 2026-11-05, and they are at `design/gameplay-demos/index.html`. The QTE demo tests timing only. The demos use placeholder shapes and lines, and they do not cover Medis scenes, starting gifts, skill points, or balance across many cases.
2. Approve the fourth dialogue option and the guard gun hack in section 8. The hack touches the chair fight.
3. Keep three options at the Fighter's choice, or reduce them to two.
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

## Rules this proposal keeps

- Walk by default, run while held, no jumping or traversal, automatic crouch zones (BRIEF 2026-11-02).
- Dialogue plays as film subtitles with Dispatch-style choices on button positions, prompts as the positional diamond, following the last device used (BRIEF 2026-10-21).
- Fights are authored cinematic QTEs with no free combat. Failure has a story cost and never ends the game, and a hack failure may also offer a reload from checkpoint. Improved reflexes come by default (plan decisions and Mike's answers, 2026-11-05).
- Hacking stays free of Runner story data so ProjectSilence can reuse it. Section 4 says what is shared and what Runner adds.
- Cast is written as roles. The roles used here: the Scavenger Leader (Marcus's benefactor), the AI Companion, the Hacker Contact, the Intel Contact (the friend with a talent for information), the Bar Contact, the Fighter, the Gang, the Gang Enforcer. Mike names them later. Mike has named three groups and places so far: the Medis, the Scavengers and the Hidden Room.

## 1. Core loop and episode structure

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
3. Sequence. A timer starts. Two to four direction arrows appear in the ring's center, the next one dim above the current. The player presses them in order with the d-pad or left stick.
4. Solve. The ring turns green, is pushed outward by the next ring and fades into the background. The next ring takes its place.
5. Open. When the last ring is solved the lock opens, the rings play a wave, and "Access granted" animates in.

The asset README notes every gap is at the same angle and that rings rotate by Render Transform Angle. So the search step only matters if each ring starts at its own rotation, which this proposal does (research design point). It also means the one gap piece, cut for the outer ring, needs a piece per radius or a scaled copy. That is an asset note, not a design change.

Proposed starting values: two rings for a door, three for a device, four for a story hack. A ring timer of six real-time seconds. Three arrows per ring, four on the last. Reflex slow-down runs automatically: the scene behind the lock plays at 0.3 speed and blurs, as if Marcus's brain speeds up. The six seconds is what the player actually gets, already counting the slow-down, and it is the same for every specialty. Netrunning changes the look and the ring count, and not the timer or the game (finding 14, finding 15). Its cleaner interface removes the visual noise from the rings and draws the upcoming arrow brighter, so the sequence is easier to read.

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

## 7. Materials and crafting (buy, craft, or hire)

### What the player does

Some cases need a part: a clamp, a nerve bridge, a blood pack, a replacement actuator. The player gets it one of two ways, because paying and hiring both become asking the Scavengers under favours only (section 9):

| Route | How | Cost | Needs |
|---|---|---|---|
| Ask the Scavengers | A dialogue choice through the Intel Contact. The Scavengers send the part, a substitute, or the materials for it. The delivery arrives when the player next returns to the table, inside the same case. | A return job: usually gear they send to the clinic to break down at the bench, a hold like treatment. It can run after the case closes. | Reputation sets how good the offer is. |
| Craft | Hold at the bench. The bench fills a bar like treatment. | Materials plus the hold. | The Tech specialty and the right clinic machine: a cyberware bench for parts, a tissue printer for organic material. |

There are two machines, and each costs a lot of materials and reputation, so the player has to prioritize. A Tech starts with one machine of their choice, and the second should take most of what an episode brings in (proposed). Machines stay between episodes.

Breaking down gear pays materials to anyone, and a Tech gets more out of the same gear. Parts and materials are counts, not an inventory. The count shows as a corner notice when it changes and in the pause menu log. There is no inventory screen.

Each episode opens after a time jump, so counts reset. What the player starts with depends on last episode's results: Marcus saved someone, and they sent something three months ago as thanks. Each story critical outcome has one starting gift written for it (cost check).

### Inputs

Dialogue choices and the bench hold. The hold uses the same toggle and tap alternatives as treatment, with the same story outcome.

### Story purpose

Parts are how the city's economy touches the table. Craft says Marcus is a Tech. Asking the Scavengers says he depends on them, and every return job says so again. The starting gift shows the player that someone remembers, without a patient having to come back.

### Feeds from and into

- From: section 9 sets the offer through reputation and pays through materials. Section 8 opens crafting. The last episode's outcomes set the starting gift.
- Into: section 3 needs the part before a critical step. Section 6 spends materials on the Hacker Contact.

### On failure

A part the player cannot get does not stop the case. Before the step that needs it the player can go on without it, which sets the cheaper outcome flag (the Fighter fights with a weaker arm). No hunting through the world for materials.

### Simpler alternative

No crafting. Parts come from asking the Scavengers, and the Tech specialty shortens the return job or finds one part in the clinic. What it loses: the bench, the machines and the "if you have the tools" fantasy from Mike's request. What it keeps: the pressure of owing the Scavengers and the Tech advantage.

### Open questions for Mike

1. Should a Tech start with one machine free? This proposal needs it so that Tech can craft in the first case. Without it, Tech crafting starts when the player can afford a machine.
2. Can the player ever refuse a return job, and what happens to reputation if they do? This proposal says the job is always done, so nothing has to be tracked.

## 8. Marcus's growth (specialties and skill points)

### What the player does

Marcus starts weak. His first choice is the specialty, Tech, Netrunning or Enforcer, made in the opening beat before the first case. It gives rank 1 of that track. After that, each of the five episodes awards one point at its start. Two or three bonus points are offered through dialogue before a dangerous step: before Marcus sneaks into a gang's area, he is offered an upgrade to X, Y or Z to help him get through it. Points go anywhere, and they are spent in that conversation, drawn as dialogue choices, so there is no skill screen.

What each specialty does, kept to one thing the player does per rank:

| Specialty | Rank 1 (the specialty pick) | Rank 2 | Rank 3 |
|---|---|---|---|
| Tech | Crafting, with one machine to start; see hardware faults on inspection; more materials from breaking down gear. | Cyberware steps fill faster. | The surgical rig does one organic step per case. |
| Netrunning | Hack facts yourself; a cleaner hack interface. | Every lock has one ring fewer. | A completed hack adds one extra option at the case choice, where the case has one. |
| Enforcer | Strength dialogue options; better fight beats. | Physical solutions: force a door instead of hacking it. | Lean on someone instead of paying, once per case. |

Each rank is a single gate. The nine ranks are the "all skills" in Mike's decision. The specialty pick plus five episode points gives six ranks for every player. All nine need three bonus points. With only two offered, one rank always stays locked, which goes against "all skills can unlock", so this proposal uses three. Mike chose three, each offered only if an earlier choice in that episode earned it, such as who the player helped. So a player can miss one, and all nine ranks depend on choices.

The spec option. Dialogue normally offers three choices on X, Y and B. At certain points a fourth option appears on A, depending on Marcus's spec and where he is. It only shows when the player qualifies, so locked options are never shown. Mike's example is the scene with Vhoori: as Marcus talks to Vhoori and looks at the guards, a Netrunner gets the option to hack their guns and keeps answering Vhoori during a quick hack.

The quick hack is a one-ring version with no search step, so the arrows run on the d-pad under the left thumb and the right thumb stays on the dialogue buttons. Reflex slow-down does not run during it, because the talk carries on at normal speed. A dialogue choice does not time out while a quick hack is live, so the player is never asked to do two timed things at once (proposed).

A case that has closed does not reopen. A gate the player could not pass is offered again the next time a case or beat has one of that kind, so most gates need no failure content (finding 22).

### Inputs

Dialogue choices only, plus the d-pad for a quick hack. Controller: A, keyboard: 4 for the spec option. Remappable.

### Story purpose

Growth is Marcus rebuilding himself. The specialty is the first thing the player says about who he is, and the three tracks are three ways to survive The Hive: fix it, break in, or hit back. A bonus point spent just before the danger it helps with makes the upgrade feel like preparation.

### Feeds from and into

- From: the opening beat gives the specialty. Episode starts award points, and dialogue before a dangerous step can add one.
- Into: section 3 (cyberware speed, the rig), section 4 (ring count, interface), section 5 (better beats), section 6 (self-hack route), section 7 (crafting), dialogue (strength options and spec options).

### On failure

No failure. A gate the player lacks does not appear. A failed quick hack sets a flag, the scene continues and the talk is unaffected.

### Simpler alternative

Fewer skills, same points. Each track has one rank instead of three, so there are three skills in total. The specialty gives one, and two episode points open the others. What it loses: depth inside a track, and the ring and fight bonuses at higher ranks. What it keeps: the three identities, episode-based points and the "all can unlock" promise, with far fewer states to test.

### Open questions for Mike

1. Should the quick hack on the guards' guns change the chair fight? See the chair fight boundary. Without new animation it can only change a line.

## 9. Money and favours, and failure costs

### What the player does

Money is removed. Mike chose this structure on 2026-11-05:

- Reputation. Marcus treats someone, reputation rises, and the patient pays the Scavengers through the Intel Contact. Reputation is never spent, and it sets what the Scavengers will offer: better reputation means better materials and gear.
- Materials. These come from return jobs, breaking down gear and starting gifts. They pay for crafting, machines and the Hacker Contact.
- Medis risk. The more people Marcus helps without payment, the more the Medis can find. Free care is a choice at the close of a case, and it adds one mark (proposed).

Dialogue conditions read all three. None is a morality score (finding 27). They show as corner notices when they change, and reputation and materials also show in the pause menu log. There is no object in the world that lists them and no crowd or patient behaviour tied to them.

There is no debt call-in. When marks reach a threshold (proposed: two), Marcus has to act before the Medis find him, in one of two authored scenes: a QTE or ring hack to break into their servers and wipe the records, or a hunt through the city where he has to hide, walking and using the existing crouch zones. Either one clears the marks.

Failure costs, by type, with the rule that failure never ends play:

| What went wrong | Cost | Type |
|---|---|---|
| Ring lockout | Reload from checkpoint, or pay materials for the fact plus a "noticed" flag | Cheap: materials (finding 24) |
| Missed QTE | A flag, and a worse beat only where authored | Cheap by default |
| Part not obtained | Cheaper outcome flag on the case | Cheap |
| Too many marks from free care | One authored Medis scene, at most one per episode | Authored, counted in the cost check |
| Failing a Medis scene | Marks stay, and the Medis come closer in the next episode's beats | Authored, feeds the ending |
| Choice with a bad result | The case's worse outcome flag | Authored, inside the case's cap |

### Inputs

None for the counters, which are read only. A Medis scene uses the QTE or ring hack inputs, or walking.

### Story purpose

Free care is the moral pressure in the economy. Helping someone who cannot pay is the decent thing, and it brings the Medis closer. Reputation carries the rise Mike described: friends and family first, then gangs looking for the Hidden Room, then the conflict with the Medis.

### Feeds from and into

- From: every case close, every return job, every episode's starting gift.
- Into: sections 6 and 7 (what the player can afford and be offered), dialogue conditions, the Medis scenes and the ending.

### On failure

Running out of materials is not failure. For a fact, the Talk route is always available. For a part, asking the Scavengers is always available, and going on without the part is too, which sets a cheaper flag. Crafting is not a guaranteed route, because it needs Tech, a machine and materials. A Medis scene is the only resource consequence with authored content.

### Simpler alternative

One favours number, earned on each case and spent on everything, in place of reputation and materials. What it loses: the difference between how well the Scavengers think of Marcus and what he can afford now. What it keeps: one counter, one notice, and the Medis scenes.

### Open questions for Mike

1. Should the player see Medis marks as a number, or only through corner notices such as "The Medis are asking around"? This proposal uses notices only.

## The Fighter case, start to finish

This is the required worked example and the first case in the game. Every step names the system it uses.

1. Intake (section 2). The Scavenger Leader sends the Fighter, who walks in with a gunshot wound in his cybernetic arm and a match the next day. He wants it patched and he can pay a little. The case needs a part (a clamp) before the first critical step and, later, a fact.
2. Part (section 7). The player asks the Scavengers for the clamp through the Intel Contact, which brings it to the table and adds a return job, or crafts it at the bench if Tech. The player can also start without it, see the branch below.
3. Treatment (section 3). Hold. Checkpoint one, stop the bleeding, is a critical step, so it needs the clamp and the player cannot walk away. Checkpoint two, remove the bullet. Checkpoint three, close the wound. At checkpoint two the patient is stable and Marcus stops: the fix is easy but something in the arm is not right. This is suspicion only, and the player can let go and walk the clinic.
4. Diagnosis (section 4 or 6). The fact to learn is "code in this arm can stop his heart". Every route delivers that fact before the choice, at different levels of detail:
   - Tech: Marcus traces a tamper mark and a line from the arm's controller into the Fighter's chest. No hack is needed.
   - Netrunning: the player hacks the arm, three rings. The hack shows the malware, the heart command and the Gang's mark.
   - Hacker Contact: pay materials, and the contact reads it at the terminal. Same detail as the hack.
   - Send the Intel Contact to the Gang's gym, or talk to the Bar Contact: the fact arrives as "the Gang has been in that arm, and it can stop his heart". It is the same flag with less detail.
5. Choice (section 2). A timed dialogue choice, three options on X, Y and B: remove the malware, leave it and tell the Fighter, leave it and say nothing. Enforcer adds a line to the first option, not a fourth option.
6. Removal, if chosen (section 3). Removal is a critical step on the same bar, since disconnecting the arm's controller could kill him, so it is a hold the player cannot leave, and it cannot fail. A Netrunning or Tech Marcus does it himself, and Tech's fill is faster. Otherwise the Hacker Contact talks him through it, which costs nothing further. If the contact is unreachable, Marcus pulls the arm's controller by hand. That also removes the malware and leaves the arm weaker. Every version sets the same "removed" flag.
7. Close (section 9). Remove: the Fighter pays the Scavengers, reputation rises, the "removed" flag is set, and the notice says the Gang will know. Tell: the Fighter decides what to do with the knowledge and the flag is "warned". Say nothing: the flag is "left in", and the Fighter pays. The player can also waive payment for any of these, which adds a Medis mark.
8. The Gang's response (the one later scene). In the next beat, the Gang Enforcer finds Marcus at the bar if the flag is "removed" and makes clear that Marcus and the Fighter are both targets. This moved from the clinic, because a gang walking into the Hidden Room in the first case would spend the arc Mike describes, where gangs only start looking for it later. It is one authored scene with a dialogue and, if the player is Enforcer, a strength option on A. It is staged with existing walk and talk clips. If the flag is "warned", the Fighter's fate comes as a line from the Intel Contact. If "left in", a line reports the match result. All three rejoin at the clinic the next shift, carried by one flag, one reaction and one notice (finding 3).

Mike's request describes only the choice to remove the malware. The "tell" and "say nothing" options are this proposal's additions, and the shape loosely resembles a scene in the rejected story. See the Fighter question below.

How play continues when things go wrong:

- Too little material. Tech crafting is unavailable, and the Hacker Contact cannot be paid. Asking the Scavengers still works and costs a return job, though at low reputation the clamp may be a poorer substitute, which changes one line. If the player declines, they start checkpoint one without the clamp. The case continues, the Fighter's arm is weaker, and the "patched without a clamp" flag changes one line in the match report. Nothing stops.
- Hacker Contact unavailable. The contact is busy on an errand from the previous beat. The fact comes from Tech, the self-hack, the Bar Contact or sending the Intel Contact. The Talk route exists for every player and costs an errand in the fiction. The choice still plays with the lower-detail fact, and removal falls back to pulling the controller by hand.
- Failed inputs. The player locks out the ring hack and can reload from the checkpoint before it. If they accept the cost instead, the hack trips the malware's defence, the heart command shows for a moment before the arm shuts Marcus out, and the "noticed" flag is set. He now knows what it can do, with less detail, so the choice still plays. No treatment input can fail, and this case has no QTE.
- Sending the patient away. The player can do this at any stable point, and not during a critical step. The case closes as "untreated" with one shared report line.

Every route rejoins before the choice, and the choice's outcomes rejoin at the next shift. That is the shape every case follows.

Fighter question for Mike: keep three options at the choice, or reduce it to remove or leave it, which matches your request and cuts one outcome?

## Cost check per patient case

Comparables give no cost figure for a case (open uncertainties), so these counts come from the authoring plan above. All are estimates.

Per case, what gets authored:

| Work | Typical case | The Fighter | How it was counted |
|---|---|---|---|
| Dialogue nodes | About 16 | About 21 | Intake 1, checkpoint lines 3, discovery 1, route lines 4, choice 1, outcomes 3, callback 1, fallback 1. The Fighter adds 2 more callbacks and 3 removal lines, one per method |
| Words | 640 to 960 | 840 to 1,260 | Nodes at 40 to 60 words |
| Flags | 1 outcome, up to 2 minor | 1 outcome, 2 minor (noticed, patched without a clamp) | Each minor flag is read in one place only |
| Animation, new | 0 to 1 clip | 0 to 1 clip | Treatment uses a shared set: patient-on-table loop, Marcus-working loop, one close-up insert, companion idle. An unusual injury adds one table pose |
| Staged scenes | 0 | 1 | The Gang Enforcer visit, at the bar, on existing walk and talk clips |
| Cinematics, new | 0 | 0 | One short Sequencer shot per episode is allowed for a callback, not per case. The Gang Enforcer visit could use that episode's shot |
| Test runs, first pass | About 12 | About 12 | Listed below |
| Test runs, regression | About 5 | About 5 | One per disposition, plus one assist run |

Those per-case figures are for a story critical case. A cheap case is about 6 nodes, 240 to 360 words, no minor flags, and about 3 test runs.

Per episode, outside the case count (all new since Mike's answers):

| Work | Count | Notes |
|---|---|---|
| Episode plan talk | About 10 nodes | The AI Companion's offer, two or three approaches, and their reports |
| Medis scene | At most 1 | A QTE or hack scene, or a hunt scene. This is the largest new per-episode cost, because a hunt needs a city location and staging |
| Starting gift | 1 per story critical outcome | About 1 line and 1 count change each, read at the next episode's start |
| Bonus point offer | Up to 1 | One dialogue exchange before a dangerous step |
| Spec option | 1 or 2 | Each is one node per specialty it serves, plus one flag read in one place |
| Former patient as contact | 1 or 2 | One call line per contact, with one fact, material or discount |

Game-wide cost of "who lives and who dies": this is the one thing in Mike's answers that multiplies rather than adds. Mike's limits: three endings of the Medis conflict, chosen by one result from reputation, marks and story critical flags, and at most three named characters who can die. Each death needs one authored scene and every later line that mentions the character needs a second version, so later episodes carry more of this cost than early ones.

Reachable states in the Fighter, not counting routes: 4 dispositions (removed, warned, left in, untreated), times clamp or no clamp, times noticed or not, gives 16 flag combinations. A waived fee adds one mark and no extra Fighter content. Those 16 are not 16 pieces of content. Each minor flag changes one line, so the content adds up rather than multiplies: 4 dispositions, 1 line for the clamp and 1 for noticed.

The first-pass test runs are chosen by risk rather than to cover all 16. Each checks that the flags are right at the rejoin point:

1. Netrunning hack succeeds, then removes.
2. Netrunning locks out, accepts the cost, then warns (noticed set).
3. Netrunning locks out and reloads from the checkpoint, and noticed must stay clear.
4. Pay the Hacker Contact, then says nothing.
5. Tech route, crafted clamp, faster fill on removal, then removes.
6. Enforcer with Talk route, Hacker Contact away, removes by hand.
7. Send the Intel Contact and ask the Scavengers for the clamp at once, which must both work.
8. Decline the clamp: starts without it, and the line changes.
9. Patient sent away at a stable checkpoint, and refused during a critical step.
10. Waive the fee twice in an episode: the Medis scene plays.
11. Toggle hold profile, with save and reload at a checkpoint.
12. No-search plus unlimited retries profile, which must not set noticed.

Limits proposed. These are design limits to hold the estimates above, and Mike can change them:

- Three distinct authored outcomes per case, plus the shared "untreated" line. Routes to a fact rejoin before the choice, always.
- One later callback per case, as a line or a scene.
- Five surfaced decisions per episode across cases and beats. This is a Runner design choice. Telltale surfacing five per episode (finding 1) is a reference, not evidence of a production limit.
- Three cases per episode, or 15 across the game. An episode carries at most 3 outcome flags and about 2,900 words of case dialogue. Adding more cases after feedback raises this directly, at about 300 words a cheap case.

Where routes rejoin: every route to a fact ends at the same choice. Every outcome ends at the next shift. The only content that escapes a case is one callback and, for the Fighter, the Gang Enforcer scene.

Recurring work per case that is not content: a clinic test map pass, a save and reload check with the case's flags, and the accessibility profiles. Adding one encounter or rule mid-production multiplies scheduling (finding 2), so new case types after the first episode are a Mike decision.

## Chair fight boundary

The approved Cascadeur fight (`plans/2026-11-05-cascadeur-animation.md`) is one continuous take of ten beats, Marcus plus two guards with Vhoori in two poses, no fail state, and a QTE that completes by default with a slow effect. Nothing in this proposal changes its take, its beats or its default. Section 5 is written so that fight fits it as is: press and hold prompts, slow-down on, default success.

Outcomes from this proposal that would need extra animation for that fight, listed for separate approval and costing, none assumed:

- An Enforcer variant of any beat (a different disarm or kick).
- A missed-prompt beat (Marcus takes a hit before the move lands).
- A strength-dialogue beat before or after the take.
- The quick hack on the guards' guns from section 8. Marcus is in the chair with Vhoori's gun to his head, so anything the hacked guns do on screen is a new beat or a variant. Before the take, with only a line reading its flag, it needs no animation.

Neither plan overrides the other. If Mike approves none of the four, the chair fight plays identically for every specialty and the Enforcer difference in that scene is dialogue only.

## Accessibility summary

Every input in this proposal, its controller and keyboard default, and its assist. All actions remap through Enhanced Input and prompts redraw from the mapping. The rule for every assist: it returns the same result as a successful input, charges that route's normal cost, and sets no failure flag. So an assisted player gets the same story as a player who succeeded, not the same story as one who failed.

| Action | Controller | Keyboard | Assist | Story result with the assist |
|---|---|---|---|---|
| Walk, run | Left stick, hold a bumper to run | WASD, hold Shift | Run as toggle | Unchanged |
| Interact, treatment hold, bench hold | Hold bottom face button | Hold E | Hold as toggle, or tap to advance | Unchanged, because these cannot fail |
| Dialogue choice | Position by choice count (section 1) | 1, 2, 3 | Timer extended up to ten times or off | Unchanged, and the player always picks |
| Spec option | Bottom face button | 4 | Timer extended or off | Unchanged |
| Quick hack during talk | D-pad | WASD or arrows | Timer extended or off, or auto-complete | Ordinary success. Dialogue does not time out during it |
| Ring search | Right stick | Mouse or arrow keys | Snap steps, or no-search (arrow placed in gap) | Ordinary success |
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
| Treatment bar with named checkpoints | Section 3 | Use the existing hack progress bar with no names, and say the step in a subtitle. Or the simpler alternative: three plain holds. |
| Ring hack widget (full-screen lock) | Section 4 | Count it as the hack progress element, since it replaces that bar during a hack. Or keep the one-press breach cinematic. |
| QTE prompt in cinematics | Section 5 | Needs approval as an addition. It would reuse the approved positional diamond, shown inside a cinematic. Without it, cinematics play with no input. |
| Direction arrows in the ring center | Section 4 | Draw them as positional diamonds instead, one per direction. |
| Pause menu log page: facts known, parts and materials, reputation | Sections 6, 7, 9 | Corner notices only, with nothing to read back. |
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
| Medical aid: fix body and cyberware | Retained, with Tech faster on cyberware steps and a possible surgical rig | Sections 3, 8 |
| Craft items and acquire materials | Simplified: counts, no inventory | Section 7 |
| The gunshot wound and arm malware scenario | Retained as the first case, as a targeted Gang hack on one arm | Fighter walkthrough |
| Hold the button to fill a bar with checkpoints | Retained, with a simpler alternative | Section 3 |
| Movement between treatment checkpoints | Retained at non-critical checkpoints: let go and walk the clinic | Section 3 |
| Pay, craft or hire for materials | Simplified: paying and hiring become asking the Scavengers for a return job, and crafting stays | Sections 7, 9 |
| Craft cyberware or organic material with the necessary machines | Retained: two expensive machines, so the player prioritizes | Section 7 |
| Right stick moves an arrow around a circle | Retained | Section 4, step 1 |
| Find the gap; rumble and sound grow closer | Retained, with a glow added and a rumble toggle | Section 4, step 1 |
| Press R1 to fill the gap, circle goes active, timer starts | Retained, remappable | Section 4, step 2 |
| Direction inputs in the center, upcoming ones faint above | Retained | Section 4, step 3 |
| Input the arrows correctly to solve, move to the next ring inside | Retained | Section 4, step 3 and 4 |
| Repeat until all rings are solved, like tumblers | Retained, one to four rings | Section 4 |
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
- Treatment by a held input through named checkpoints.
- A ring-lock hacking minigame with a stick search, proximity cues, and an input sequence per ring, shared with a second game.
- Authored cinematic fights with slowed-time prompts and no fail state.
- Four routes to any fact (talk, send a companion, pay a hacker, hack it yourself), all rejoining before the choice.
- Three specialties that change what the player can attempt and how easy it is, with episode-based points.
- Failure that costs materials, a reaction or Medis attention, and never ends the game.
- Accessibility alternatives for every hold, stick and timed input. An assisted input counts as a success and bypasses the failure consequence.

Full-game systems versus prototype promises:

| System | Full game | Proposed for the funded prototype |
|---|---|---|
| Core loop and hub | Five episodes, 15 cases | One episode opening with the AI Companion's plan, and one clinic shift |
| Treatment | All cases | Two cases, the Fighter and one cheap case |
| Ring hack | Doors, devices, story hacks | The Fighter arm hack and one door |
| QTEs | Every fight | The chair fight only |
| Intelligence | Four routes | Four routes on the Fighter fact |
| Materials | Ask the Scavengers, craft, two machines | Ask the Scavengers, and craft on one bench, because Tech is a playable pick |
| Growth | Three tracks, nine ranks, up to eight points, spec options | The specialty pick at rank 1, all three playable, and one spec option |
| Reputation and materials | Both, plus Medis marks and scenes | Both, with the Medis scene cut |

Reassessed scope, replacing the old 25 to 30 minutes, six scenes, six characters and three playtest rounds. This is a proposal for Mike, not a renaming:

- Length: 20 to 30 minutes, measured by a timed playthrough of the build, not promised up front.
- Locations: one opening beat location, the clinic, the bar for the Talk route, and the chair fight location. Four, not six.
- Speaking roles outside the fight: Marcus, the Fighter, the second patient, the AI Companion, the Hacker Contact, the Scavenger Leader, the Intel Contact (who also works the bar, merging the Bar Contact for the prototype) and the Gang Enforcer. That is eight, and the AI Companion is voice only.
- Chair fight cast, from its own plan: two guards and Vhoori on screen, plus one voice-only support role. Marcus is already counted. The total is 11 or 12 characters, not comparable to the old six, and the CMF pass should present it as a real increase or cut roles.
- Fighter consequence shown: the "removed" outcome plays as the Gang Enforcer visit at the bar. "Warned" and "left in" play as lines.
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
