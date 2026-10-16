# 09 Originality, Creativity and Advancement Description (draft)

| | |
|---|---|
| CMF document | Originality, Creativity and Advancement Description (RD p.3). Upload name: "Originality-Creativity-and-Advancement". |
| Limit | 5 pages. Arial or Helvetica over 11 pt, black on white, no columns. Pages past 5 are not read. Scored 60 of 100, and a project under 45 is not scored on anything else (PG p.7-8). 2024 scored exactly 45; 2023 scored 42. |
| What the CMF asks it to cover | Content, form, design, programming, user experience, innovation or marquee elements, and any generative AI use with the tools named (RD p.3). Scoring: originality and quality of content, form and story; quality of design and programming; user experience and interactivity; innovation or commercial potential, which can include cultural significance (PG p.8). |
| Length of this draft | About 2,580 words of draft text with three tables (script count, markdown and "(draft)" markers removed). At 11 pt Arial with 1-inch margins that is about 4.5 to 5 pages. Filling the AI bracket adds 30 to 60 words. If Word shows more than 5 pages, cut the "How the rules connect" example first, then merge the episode table into one paragraph. Estimate only, not checked in Word. |
| Sources used | `cmf/requirements.md` (sections 3, 4, 7); `story/one-pager.md`; `BRIEF.md` (Decisions 2026-10-01 to 2026-10-15); `pitch-plan.md`; `refs/visual-reference.md`; 2024 OCA (`R24\CMF Package 2024\SUBMIT FOLDER\Originality-Creativity-and-Advancement.pdf`, 5 pages, structure only); public headers in `C:\Prod\_Library\Unreal\Plugins\PhantomInteraction`, `...\PhantomStory` and `C:\Prod\ProjectRunner\Unreal\Source\RunnerSandbox_01` (class names, tag syntax, line count); `C:\Prod\ProjectRunner\Story\G1_build\g1_vex.json`, `characters.json`, `global-variables.json`. |
| Status | First pass, 2026-10-15. Not for upload. |

`R24\` is `C:\Users\GameDevPC0403\Documents\Development\CMF\_past-applications\2022-ProjectDawn\2024-07-30-Prototyping-Rejected\`.

## How this differs from 2024

The 2024 document gave its last page to Houdini, Nanite and Lumen, motion matching and AI tools, and reviewers called them standard. This draft leads with six design rules that come out of the story, says plainly which tools are standard, and describes code only where it makes a design rule work. It ends with what the prototype has to prove and how it will be measured, so reviewers can see the prototype is a test and not a demo.

## Needs Mike

1. Story canon. Everything marked "(draft)" comes from the one-pager and is not approved: Chase wrote the Tether, the Tollmen and Sifters, Dace Morrow, Juno Reyes, Ilse Varga, the five episode plots, Vex's back room as the clinic. Approve, change or cut before this goes further. Strip the "(draft)" markers before upload.
2. Prototype scope. The draft proposes Episode 1 as a 25-30 minute playable segment in 6 scenes, ending in a first clinic shift so the ledger, hack inserts and patient markers can be tested. The one-pager's 90-second "Back door" slice is the pitch video, not the prototype. Confirm or resize. The same scope is in `10-dialogue-fields.md`.
3. Voice. Is the prototype voiced (budget line 08 Talent) or text-only? The draft says "[voiced / text-only]".
4. Playtest targets. The pass marks in "What the prototype will prove" are proposals. Keep, change or drop them. They also set the playtest budget (line 10.80).
5. Generative AI. Fill the bracket in the last section: which AI coding and writing assistants were used (for example Claude Code) and for what. Also confirm the "not used" list covers game assets (textures, voice, music), not only pitch material.
6. AI reference images. Some images in `Documents\Development\_ref\` have generated-image file names (`pixel_art_style_...`, and `visual-reference.md` counts 4 AI images in `building/`). They are internal mood references only. Decide whether to disclose that. Suggested sentence if yes: "Some images in our internal mood boards were collected online and may be AI-generated. None are used as assets, in the game or in this application."
7. Pixel treatment. The look section says textures are pixelated before import and a whole-screen grid is being tested. Update once the look test (`L_LookTest`) is decided.
8. Accessibility. The draft commits to a timer setting with an untimed mode, subtitles, input remapping and a patient marker that uses shape as well as colour. Confirm these are in scope for the prototype.
9. Hamish to check the programming section, especially the claim that a dialogue option can be hidden until a look/use flag is set. The draft says the prototype adds this, without saying whether StoryFlow does it already.

## Draft text

### Content and form

**What the game is.** Project Runner is a side-on cyberpunk narrative game in five episodes for Windows PC, made in Unreal Engine 5.8 by Phantom Break Inc. in Calgary. Each episode is a chain of short playable scenes joined by cinematics. The player walks through streets and rooms, looks at and uses objects, hacks devices, listens in, and makes timed dialogue choices that later scenes remember. There is no combat, running or jumping. The closest comparisons are Dispatch for timed choices, The Walking Dead for walk-and-talk scenes, and Life is Strange for looking at objects.

**The story.** Chase Roberts, a man trained in medicine, crosses The Wastes into NoWhere, a lawless city called The Hive, and opens an unlicensed clinic in a fixer's back room (draft). The city has no other medical care. Every salvaged implant that reaches his table carries the Tether, a shutdown routine that Aeon, the city across The Wastes, puts in every implant it makes. Chase wrote it before he left (draft). He strips it out one hack at a time and tells no one how he knows how. Over five episodes the Tollmen, the cartel that takes a cut of every implant install (draft), close in on the clinic. Aeon switches the Tether on (draft), and the patients Chase treated, lied to or turned away decide who stands with him.

| Episode | What happens | Key choice |
|---|---|---|
| 1. Intake (draft) | Vex, a fixer, gets Chase into the city for one run: pull an Aeon arm out of a Tollmen lockup. Chase finds the Tether in it. | Tell Vex the arm is rigged, say it's clean, or say nothing. |
| 2. Open hours (draft) | The clinic runs. Patients come in, and the Tollmen want a cut. | Pay the Tollmen, refuse, or hide a wounded Sifter they are hunting. |
| 3. The Wastes (draft) | Chase and Vhoori, a Sifter scout, go out for parts. A dead mech still answers to Aeon. | Tell Vhoori who he is, or let Vhoori read it in the mech's log. |
| 4. Recall (draft) | Aeon fires the Tether in one district. Patients' implants go dead, starting with Juno's arm. | Give the strip procedure to the Tollmen, or teach it to the Sifters for free. |
| 5. Kill switch (draft) | Aeon offers Chase his old life back for the override. | Broadcast the override, go back to Aeon, or sell it. |

**Themes and tone.** The game is about who gets medical care when nobody licenses it, debt and favours as the city's real currency, and being responsible for something you built after it leaves your hands (draft). The tone is quiet and dry: long side-on walks, short scenes, few words. Violence happens off-screen or in one cut. Implants replace limbs and the Tether takes mobility away, so a paid consultant with limb difference reviews the outline and the locked script, and a nurse or paramedic checks the clinic scenes (draft; details in the Community Engagement Plan).

**Form.** Five episodes of [60-90] minutes each (draft), sold together as one season. Episodes are built from scenes of 2-6 minutes, so the team can build, test and cut one scene at a time.

### Design: six rules that come from the story

Each rule below is a mechanism the prototype builds and tests. None of them is a pipeline tool.

**1. A clinic ledger instead of a morality meter (draft).** There is no good/evil bar and no relationship meter on screen. A physical ledger sits on the clinic desk. The player opens it with look/use, and it lists who Chase treated, who paid, who got credit and who he turned away. In Episode 4 the ledger decides which patients come to help when the Tether fires. A player who has read the ledger can predict who will come.

**2. Every hack reveals backstory (draft).** Hacking a salvaged implant means stripping a piece of Chase's own code. Each completed hold-to-hack plays a 5-10 second insert from his past in Aeon. A player who does more hacks has seen more of who Chase was before the Episode 5 choice. The backstory is a reward for clinic work, not one exposition scene.

**3. What you looked at becomes something you can say (draft).** Look/use interactions set story flags, and a flag adds an option to a later timed conversation. A player who examined the Tollmen price board in Episode 1 ("Three months' wages for a knee") can quote it to the Tollmen collector in Episode 2. A player who didn't never sees the option. Life is Strange-style comments on objects become options in Dispatch-style timed choices, so exploring is a dialogue skill.

**4. Silence is a counted choice, per character (draft).** Every timed choice ends with a silent option, and silence is the default when the timer runs out. Each character stores trust and a separate silence count. Vex reads silence as hiding something. Vhoori reads it as respect. Ending scenes read both numbers. In the prototype's first conversation, silence costs one point of Vex's trust, adds one to her silence count, and makes her ask again later with a 3-second timer instead of 6.

**5. Treated patients walk the streets (draft).** Every implant Chase installs carries a marker on the patient's model, a colour plus a small shape so colour-blind players can read it. Background walkers wear it too, so the player can count their patients in the crowd. In Episode 4 those are the walkers who drop when the Tether fires.

**6. Crouch zones are for listening (draft).** Chase has no crouch button. He crouches by himself under low gates, windows and vents, and many of those spots put him under a gang conversation. What he overhears sets flags that open later options, as in rule 3. ProjectSilence, the studio's later stealth game, reuses the same crouch zones for hiding.

**Timed choices on three buttons.** Choices sit on the face buttons in a fixed order, X, Y, B (keyboard 1, 2, 3). The silent "..." option is always last, on B. A countdown bar runs under the choices and the default fires when it ends. Because the order never changes, players learn where silence is and can pick it on purpose.

**How the rules connect, in one example.** In Episode 1 the player looks at the price board (rule 3), crouches under a vent and hears the Tollmen's patrol route (rule 6), hacks the lock to Vex's back door and sees a 5-second flash of an Aeon lab (rule 2), then has 6 seconds to tell Vex the truth about the arm, lie, or stay silent (rule 4). If they lie, the arm goes to Juno. Juno's ledger line reads "paid in full" (rule 1), and Juno walks past at the docks with a marker on the arm (rule 5). In Episode 4 that arm is the first to die.

### Programming

**What exists now.** A grey-box scene built in October 2026 plays start to finish in the editor: walking, an automatic crouch zone, look/use objects, a hold-to-hack lock, a 6-second three-way timed choice with Vex, and a different cutscene for each answer. It runs on two Unreal plugins Phantom Break wrote for this project, about 4,500 lines of C++ with the game module.

| System | Classes | What it does for the design |
|---|---|---|
| Interaction | `UPNInteractableComponent`, `UPNInteractorComponent`, `APRInteractableProp` | One component for look, use and hack. A hold time of 0 is a tap, above 0 is a hold with a progress bar. A look shows Chase's comment. One-shot objects save their state. |
| Hacking | `APRHackDevice` | A hold-to-hack device that sets a story flag when it completes (for example `g1_door_hacked`). Rule 2 hangs the backstory insert on this event. |
| Camera | `APNFollowCamera`, `APNCameraZone`, `UPNCameraZoneSubsystem` | A side-on follow camera by default, locked cameras inside zones. Move input keeps its direction across a camera cut until the stick is released. |
| Crouch and crowd | `APNCrouchZone`, `APNWalkerLane` | Crouch on entry, stand on exit, no button. Background walkers on splines with a material override, which rule 5 uses for patient markers. |
| Story bridge | `UPNStoryDirectorComponent` | Writers tag lines in the StoryFlow dialogue editor: `cam:` cuts to a named camera, `seq:` plays a cutscene and resumes, `timer:` times the choice, `default:` picks the option on timeout. A writer adds a timed choice with branch cutscenes without a programmer. |
| Scenes and saves | `UPNLevelFlowSubsystem`, `UPNSaveSubsystem` | Scenes stream in behind a fade to black. Checkpoint saves keep the scene, position, used objects and every story flag and relationship value. |

Dialogue runs on StoryFlow 1.2.3, a licensed Unreal plugin with global and per-character variables. Story flags are StoryFlow globals and trust is a StoryFlow character variable, so writers can read and set both from the dialogue editor.

**What the prototype adds.** A ledger that writes an entry for each patient outcome and shows it as pages on the desk. A silence count next to trust on each character. A check that shows a dialogue option only when its look, hack or overheard flag is set. Backstory inserts on hack completion. Patient markers passed from the clinic to the crowd. A choice log that records each choice, the time left on the timer and the flags set, one file per playtest session.

**Built for reuse.** PhantomInteraction has no dependencies and PhantomStory depends only on StoryFlow. Each game pins its own copy, so a change for one can't break the other. ProjectSilence will reuse the systems only, with its own city and lead, and none of its work is charged to this budget.

### User experience and interactivity

**Controls.** One stick to walk, A to use and continue, hold A to hack, X, Y and B to choose. The player always faces the way they walk. Players who don't play action games have nothing else to learn.

**Camera.** In fixed-camera games, a camera cut can make "right" on the stick point a different way, and the player walks back into the last room. Project Runner keeps the stick's direction across a cut until the player lets go. The follow camera only partly follows movement toward or away from it, so the player can move in depth inside a room without the frame swinging.

**Screen.** The HUD shows only interaction prompts, the hack bar and dialogue choices. Everything else is in the world: the ledger on the desk, markers on patients, Chase's spoken comments on objects.

**Look.** The look is HD-2D: full-colour textures pixelated at the end of the pipeline, in lit 3D scenes seen side-on. Each scene has five depth layers: out-of-focus foreground, the play plane, the room or street, the city behind, and sky or fog. Ground is wet, ambient light cool and practical lights warm, and each scene gets one dominant colour grade so rooms read apart. In play the lead is 15-20% of frame height; dialogue cameras move in to 25-45%. Fog, light shafts, bloom and depth of field stay smooth over the pixel layer, as in Replaced and The Last Night. Every image in this application is an in-engine capture.

**Accessibility.** Timed choices can exclude players who read slowly or have limited motor control. The prototype includes a timer length setting with an untimed mode, subtitles with speaker names, input remapping, and patient markers that use shape as well as colour.

### Innovation and marquee elements

**What we don't claim.** The environments come from Houdini tools and owned asset packs, textures from Substance Designer and Painter, and character movement from Epic's Game Animation Sample. These are standard tools. They let a team this size build a dense city, and they are not the reason to fund the project.

**What is new.** Project Runner treats observation as dialogue input, counts silence per character as a choice of its own, and shows consequence in the world through the ledger and the crowd instead of a meter. We know of no narrative game that combines these. Each is cheap to build, and together they change a replay: a second playthrough opens options the first never showed.

**Marquee elements.** A side-on HD-2D cyberpunk city, and a lead whose secret the player uncovers by doing his job. The Market Study gives sales figures for the episodic timed-choice format.

**Advancement for the studio.** With the two plugins, a writer adds timed choices, camera cuts and branch cutscenes with tags, and a designer places interactables, crouch zones and camera zones as actors. Once this prototype proves them, the same code carries into production and into ProjectSilence.

**Cultural significance.** The game is written and built in Calgary, and the subject is access to care: who gets treated, on credit or not at all, in a city with no licensed clinic. A disability consultant, a medical adviser and a sensitivity reader review the script before lock (draft).

### What the prototype will prove

The prototype has to answer six questions. The pass marks are our targets. The choice log and exit interviews from three playtest rounds measure them.

| Question | How we measure it | Target |
|---|---|---|
| Do players use what they looked at? | Share of players who unlocked a look or overheard option and chose it at least once | 60% or more |
| Do players notice silence is counted? | Exit interview: "Did staying quiet change anything?" | Half or more say yes and give an example |
| Do players read the ledger? | Share who open it without a prompt | 60% or more |
| Do players see their patients in the crowd? | Share who point out a marked walker without being told | Half or more |
| Are the timers fair? | Timeouts as a share of all timed choices | 10-25%: silence is chosen, not missed |
| Does the camera hold direction? | Times a player walks back through a camera cut by mistake | Under 1 per player per session |

The build must also hold 60 frames per second at 1080p on [target PC spec] with the pixel treatment on.

### What the prototype delivers

- A Windows PC build of Episode 1, "Intake" (draft), playable start to finish in 25-30 minutes.
- 6 scenes: the edge of The Wastes, the night street and Vex's back door, the Tollmen lockup, Vex's back room, the first clinic shift with two patients, and the scrap docks (draft).
- 3 branch cutscenes for the Episode 1 choice, plus backstory inserts for each hack.
- 6 characters: Chase, Vex, Vhoori, Juno, a Tollmen collector and a second patient (draft). About [250-350] lines of dialogue, [voiced / text-only].
- At least 6 timed choices, each with a silent default.
- Systems: the six design rules above, timed X/Y/B choices with defaults, follow and locked camera zones, scene streaming, checkpoint saves, the choice log and the accessibility options.
- Documents: an updated game design document, the Episode 1 script, a five-episode outline, a playtest report from three rounds with the numbers above, and a production plan and budget.

### Generative AI use and tools

Phantom Break does not use generative AI to make images, art, textures, animation, voices or music for Project Runner. No image in this application, the support material or the pitch deck is AI-generated. Every image is a capture from the Unreal Engine project or an artwork made by a named person.

[Needs Mike: list AI coding/writing assistants used, e.g. Claude Code, and what each was used for, such as C++ and Python code, tool scripts, and first drafts of documents.]

Michael Brandt and the team review, edit and own all code and text. All rights in the code, story, characters and art belong to Phantom Break Inc., and Canadians develop them. We follow the CMF's AI Guiding Principles.

## Notes

- The (draft) markers follow the one-pager. Everything else in the story section comes from the June 2026 concept document, the G1 build or `BRIEF.md`.
- The six design rules are the one-pager's "What makes it different" list, rewritten as mechanisms with numbers. The 3-second and 6-second timers, the trust and silence values and the price board line come from the one-pager's vertical slice.
- The class table uses names from the public headers as of 2026-10-15. `APRHackDevice` and `APRInteractableProp` live in the game module, not the shared plugins.
- The C++ line count (4,551 lines in `.h` and `.cpp` files under the two plugins and `RunnerSandbox_01\Source`, excluding `Intermediate`) was counted with `wc -l` on 2026-10-15.
- The G1 claims follow `pitch-plan.md` ("Tests passed 2026-10-02"). The `BRIEF.md` "Done means" boxes are still unticked, including save/reload, so the draft doesn't claim a tested mid-scene reload.
- Episode length "[60-90] minutes" is a placeholder. The one-pager doesn't give one.
