# Project Runner: story one-pager

Drafted 2026-10-15. Status: draft for Mike's review.

Anything marked "(draft)" is new in this document. Everything unmarked comes from the June 2026 concept doc (`Project Echo - Concept Document - 2026.pdf`), the G1 build (`C:\Prod\ProjectRunner\Story\G1_build`), or `BRIEF.md`.

## Logline and pitch

**Logline.** An unlicensed cyberware medic sneaks into the lawless city of NoWhere and opens a back-room clinic, while hiding that he wrote the kill code buried in every implant he repairs (draft).

**Pitch.** Chase Roberts gets into NoWhere, The Hive, by doing one job for a fixer, then stays to run an underground clinic in a city with no other medical care. Every salvaged implant that comes across his table carries Aeon code that can switch it off, and Chase strips it out one hack at a time without telling anyone why he knows how (draft). Over five episodes the gangs that profit from cyberware close in, Aeon turns the code on (draft), and the patients Chase treated, lied to or turned away decide who stands with him.

## The lead: Chase Roberts

- **Who he is.** A man trained in medicine who arrives in NoWhere as an outsider and takes up work as a Cyber Runner: cyberware maintenance and augmentation. Before NoWhere he was an implant engineer in Aeon (draft).
- **His job.** He runs an underground clinic in a back room (draft: Vex's back room) and takes runs for Vex to pay for it. A run is a short job in the city or The Wastes: open a door, pull a part, listen in on a gang meeting. In the clinic he repairs implants and hacks salvaged cyberware to clean out malware before he installs it.
- **What he wants.** To stay under the radar of the gangs that profit from his trade and keep the clinic open. Later, to undo what he built (draft).
- **What he hides.** He wrote the Tether, a shutdown routine Aeon puts in every implant it makes (draft). Aeon's cast-off implants end up in The Wastes, NoWhere salvages them, so most of the cyberware in the city can be switched off from Aeon (draft). The "malware" Chase strips out is his own code (draft). The concept doc says the player pieces together Chase's backstory through choices. This is the backstory.

## The city and its factions

- **NoWhere (The Hive).** A dense, lawless city. Survival is daily work, medical care is scarce, and the gangs fight each other constantly. Street vendors barter and sell information.
- **The Wastes.** The land between NoWhere and Aeon. Packs of AI mechs roam it. People from NoWhere go out to harvest parts to sell and to keep the city running.
- **Aeon (The Timeless Isle).** The city across The Wastes. It upgrades its own people and dumps the old implants (draft). It can reach those implants through the Tether (draft).
- **The Tollmen (draft).** The cartel that charges a cut on every implant install and repair in its blocks. Chase's clinic undercuts them.
- **The Sifters (draft).** Salvage crews who control the routes into The Wastes and sell parts. Chase buys from them, which puts him between the two gangs.

## Cast

| Character | One line | Tie to Chase |
|---|---|---|
| Vex | A fixer who sells runs and favours out of a noodle bar (draft: the bar). Tracks a trust value with Chase (G1). | Got Chase into the city in exchange for one run (draft). Her back room becomes his clinic (draft). |
| Vhoori | A masked Sifter scout who knows The Wastes. The mask is in the rig (`SM_Cast_Vhoori_Mask_01`); the role is new (draft). Not the lead. | Guided Chase across The Wastes into NoWhere and is the only one who has seen where he came from (draft). Supplies the clinic with parts (draft). |
| Dace Morrow (draft) | Head of the Tollmen. Polite, patient, and paid on every install in the Hive (draft). | Wants a cut of the clinic, then wants Chase's method for stripping the Tether (draft). |
| Juno Reyes (draft) | A crane operator at the scrap docks with a failing salvaged arm (draft). | Chase's first patient. Comes back in every episode, and the Tether hits Juno's arm first in Episode 4 (draft). |
| Dr. Ilse Varga (draft) | Chase's former colleague in Aeon, now sent to bring the Tether back under control (draft). | Knows who Chase was. Offers him his old life back (draft). |

## Five episodes

1. **Intake (draft).** Vhoori brings Chase across The Wastes and Vex gets him into the city for one run: pull an Aeon arm out of a Tollmen lockup (draft). Chase finds the Tether in the arm (draft). Key choice: tell Vex the arm is rigged, say it's clean, or say nothing. Truth opens the clinic on Vex's word and tells her Chase knows Aeon code. The lie ships the arm to Juno, and in Episode 4 Vex learns Chase knew. Silence makes Vex hold the arm and ask again in Episode 2 with a shorter timer (draft).
2. **Open hours (draft).** The clinic runs. Each patient is a look/use and talk scene, and each salvaged part is a hack that strips Tether code and shows Chase a fragment of his past (draft). Morrow's collector demands a cut. Key choice: pay the Tollmen, refuse, or hide a wounded Sifter the Tollmen are hunting. This sets which gang protects the clinic in Episode 4 and how many patients Chase can afford to treat on credit (draft).
3. **The Wastes (draft).** Chase and Vhoori go out for parts. A dead mech Chase hacks still answers to Aeon, so the Tether is waking up (draft). Key choice: tell Vhoori who he is, or let Vhoori read it in the mech's log. This decides whether Vhoori leads Varga's people to the clinic in Episode 5 or blocks them (draft).
4. **Recall (draft).** Aeon triggers the Tether in one district as a test, and implants go dead across Chase's patients, starting with Juno's arm (draft). Chase has time to patch only some of them, and the clinic ledger decides who comes to him for help. Key choice: give Morrow the strip procedure (the Tollmen sell it and leave Chase alone) or teach it to the Sifters for free (the Tollmen come for him). This sets who controls the cure in Episode 5 (draft).
5. **Kill switch (draft).** Varga offers Chase his place in Aeon back if he returns the Tether override (draft). Key choice: broadcast the override across the Hive and expose himself, go back to Aeon and shut the Tether down from inside, or sell the override to whoever controls the cure. Each ending scene reads Vex's trust, Vhoori's choice, the ledger, and how often Chase stayed silent (draft).

## What makes it different

These are design facts the game is built on. They feed the CMF Originality document. Pipeline and engine claims are left out on purpose, because 2024 reviewers scored them as standard.

1. **The malware is his own code (draft).** Every hold-to-hack on salvaged cyberware strips a piece of the Tether, and each completed hack plays a short insert from Chase's past. The number of hacks the player completes decides how much of the backstory they have seen before the Episode 5 choice.
2. **What you looked at becomes something you can say (draft).** Look/use interactions set StoryFlow flags. A flagged fact adds a choice to a later timed conversation. If the player never examined the Tollmen price board, they can't quote it back to Morrow. Life is Strange look comments become ammunition for Dispatch-style timed choices.
3. **Silence is a counted choice (draft).** When the timer runs out, Chase says nothing. Each character stores trust and a separate silence count as StoryFlow character variables. Vex reads silence as hiding something; Vhoori reads it as respect. The endings read both numbers.
4. **The clinic ledger replaces a morality meter (draft).** A physical ledger on the clinic desk, opened with look/use, lists who Chase treated, who paid, who got credit and who he turned away. There is no on-screen meter, which also keeps to the brief's HUD rule. In Episode 4 the ledger decides which patients turn up to help when the Tether hits.
5. **Your work walks the streets (draft).** Every implant Chase installs carries one marker colour on the patient's model. Background spline walkers wearing it show the player who in the crowd they have treated. In Episode 4 those are the walkers who drop when the Tether fires.
6. **Crouch zones are for listening (draft).** Automatic crouch zones put Chase under windows and vents where he overhears gang talk, which the concept doc lists as a hacking outcome. What he overhears sets flags for later choices, using the same crouch zones ProjectSilence will reuse for stealth.

Shared with ProjectSilence: systems only (interaction, hold-to-hack, crouch and camera zones, StoryFlow state). ProjectSilence keeps its own city, Blackwater, and its own lead, Dante, as the brief says.

## Themes and tone

- **Themes (draft).** Who gets medical care when nobody licenses it. Debt and favours as the city's real currency. Being responsible for something you built after it leaves your hands. Belonging in a place you entered without permission.
- **Tone (draft).** Quiet and dry. Long side-on walks, short scenes, few words. Violence happens mostly off-screen or in one cut. Vex supplies the humour.

**Sensitive themes and consultation plan (draft).** The Narrative Positioning Statement needs a plan for these. The 2024 Shred review flagged the missing plan.

- **Disability and prosthetics.** Implants replace limbs, and the Tether takes mobility away. Risk: treating disability as something to fix, or as a plot device. Plan: a paid consultant with limb difference reviews the outline and the locked script (draft).
- **Unlicensed medicine and poverty.** Plan: a nurse or paramedic adviser checks clinic scenes so procedures read as care, not gore (draft).
- **Crossing into a city without papers.** Chase enters NoWhere illegally. Plan: a sensitivity reader with lived migration experience reviews Episode 1 and Vhoori's scenes (draft).
- **Gang violence and coercion.** Plan: keep violence off-screen and rate the script against the target age rating before lock (draft).

## Vertical slice: "Back door" (Episode 1, draft)

Night street into Vex's back room, about 90 seconds of play. It uses only G1 systems: walk, an automatic crouch zone, look/use, a hold-to-hack terminal, one StoryFlow conversation with a timed choice, and a Sequencer cutscene per choice.

| Time | Beat | System |
|---|---|---|
| 0:00 | Chase walks right along a wet street at night, carrying a steel case. Hive towers stack up behind. | Walk, follow camera |
| 0:10 | Look at a Tollmen price board on a shopfront. Chase: "Three months' wages for a knee." | Look/use |
| 0:20 | A half-shut gate over the alley. Chase crouches under it on his own and the locked alley camera takes over. | Crouch zone, camera zone |
| 0:30 | Look at a Sifter salvage pile with a mech hand on top. Chase: "Aeon hand. Off The Wastes, like everything else." | Look/use |
| 0:40 | Vex's back door. Hold to hack the lock (about 4 seconds). | Hold-to-hack |
| 0:50 | Inside, Vex at a table. Use the table to set the case down. The conversation starts. | Look/use, camera zone `CAM_Vex` |
| 1:20 | The branch cutscene plays, then fade to black and the title card. | Sequencer by choice |

### Conversation

Same structure as `g1_vex.json`: lines with `cam:` tags, then a timed three-way choice with silence as the default.

1. **Vex** `cam:vex`: "You came in my back door. That lock took my last guy an hour."
2. **Chase** `cam:ots_player`: "It was a long hour for him."
3. **Vex**: "Tollmen had a patrol on Ninth. You get it?"
4. **Chase**: "Case is on the table."
5. **Vex** (opens it): "Aeon steel. Barely used. My buyer works the cranes. One-handed for a month."
6. **Chase**: "Then he'll want it fitted soon."
7. **Vex** `cam:ots_vex`, `timer:6`, `default:2`: "Anything wrong with this arm I should know?"
   - X `opt_truth`: "It's rigged. Aeon code. It can shut off."
   - Y `opt_lie`: "It's clean. Ship it."
   - B `opt_silent`: "..."

**Truth** (`slice_told_vex = true`, Vex trust +1)

8. **Vex**: "And you know that how?"
9. **Chase**: "I've seen it before."
10. **Vex** `seq:truth`: "Then you can strip it. Back room's yours."

Cutscene: Vex slides a key across the table. Cut to the empty back room as Chase switches on a surgical lamp. The clinic starts here. Later: Vex knows Chase has an Aeon past, and Morrow hears about it in Episode 2 if Vex's trust drops.

**Lie** (`slice_arm_shipped = true`, trust unchanged for now)

8. **Vex**: "Good. He's been waiting."
9. **Vex** `seq:lie`: "Pleasure working with you, Runner."

Cutscene: next morning at the scrap docks, Juno flexes the new arm at the crane controls. Close-up on a small status light in the wrist (draft). Chase watches from the street and walks away. Later: in Episode 4 the arm dies first, Vex learns Chase knew, and her trust drops by 2.

**Silence** (Vex trust -1, Vex silence count +1)

8. **Vex**: "That's not a no."
9. **Vex** `seq:silent`: "I'll hold it until you find your words."

Cutscene: Vex locks the case in a floor safe and doesn't look at Chase as he leaves. Later: she asks the same question in Episode 2 with a 3-second timer.

New StoryFlow state for the slice (draft): globals `slice_told_vex` and `slice_arm_shipped`, and a `silences` integer on Vex next to the existing `trust`.

## Open questions for Mike

1. Chase's secret: is "he wrote the Tether" the backstory you want? It turns the Echo doc's "mysterious figure" into a specific answer.
2. Vex: she, or keep G1's neutral writing? Vhoori: pronouns, whether the face is ever shown, and is "Sifter scout who guided Chase in" right?
3. Faction and character names: keep Tollmen, Sifters, Dace Morrow, Juno Reyes, Ilse Varga, or replace them?
4. Aeon: is "Timeless" literal (longevity implants), or only a name?
5. The Echo doc's gather-and-craft loop in The Wastes and street bartering: cut from Project Runner, or keep as story trips only? The brief's systems don't include crafting.
6. The slice interior: Vex's back room (written here), or the clinic itself?
7. Target age rating, which sets how much violence and language the script carries.
8. Is `assets/imgs-char-concept.png` from the June folder hand-made? The brief rules out AI images in pitch material, so this draft doesn't treat it as canon art.
