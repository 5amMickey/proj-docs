# ProjectRunner

Domain: games   Status: building   Updated: 2026-10-28

## What and who

A cyberpunk narrative game in five episodes, following one male lead. It plays like Dispatch, The Walking Dead, and Life is Strange. Each episode is a chain of Sequencer cinematics joined by short playable stretches. In those stretches the player walks through side-on rooms, looks at and uses objects, hacks devices, and makes dialogue choices that later scenes remember. It's a solo narrative game for PC players who like story-driven games. Its systems (interaction, hacking, camera zones, narrative state) are built to carry over to ProjectSilence, a future stealth action game that has its own story and world.

## Done means

Current milestone: G1 Playable scene (blockout). Interior generator milestones (M1–M9) are tracked separately in TASKS.md.

- [ ] `RunnerSandbox_01` builds from the command line (UBT, `RunnerSandbox_01Editor Win64 Development`) with StoryFlow, PhantomInteraction, and PhantomStory enabled and 0 errors.
- [ ] One blockout level plays start to finish in PIE. It covers: walk (no run or jump), an automatic crouch zone, 2–3 look/use interactions, one hold-to-hack device, a StoryFlow conversation with a timed choice, and a Sequencer cutscene that differs by choice.
- [ ] Side-on camera zones switch as the player walks. Movement keeps its direction across a camera cut until the stick is released.
- [ ] A save made mid-scene reloads with StoryFlow flags and the relationship value intact.
- [ ] A screen recording of each choice branch is saved to `refs/wip/`.

## Stop and ask me when

- Only the global rules apply. While the project is early, build first and I'll adjust afterwards.
- Push to the GitHub remote only after I've confirmed LFS quota for the first large push.

## Avoid

- Nanite on skinned meshes.
- Gameplay HUD beyond interact prompts, the hack progress, dialogue choices, subtitles, corner notices ("Vex will remember that."), and the hold-to-skip prompt in cutscenes. Menus (title, pause, settings, log) are fine.
- AnimGen or other experimental plugins in this project. Try them in a separate sandbox project first. The old `C:\Prod\Sandbox` was archived to `C:\Prod\_archive\Sandbox` on 2026-10-26.
- Touching other sessions' editors. RunnerSandbox's MCP port is 8002. MCP ports: Fury 8001, Runner 8002, Dawn 8003, Alpha 8004, PipelineSandbox 8005, AssetPacks 8006. Only kill an editor by PID when its command line contains `RunnerSandbox_01`; never use `taskkill /IM`.

## References

- `refs/bar-*.png`, `refs/room-*.{png,jpg}`: interior look and side-on framing, shared with the interior generators.
- Games: Dispatch (cinematic choices, timed), The Walking Dead (walk and talk), Life is Strange (look/use objects, comments from the lead).

## Where it lives

| What | PC | Mac |
|---|---|---|
| Project root and git repo (`Phantom-Break-Studio/ProjectRunner`) | `C:\Prod\ProjectRunner` | n/a |
| Unreal project | `C:\Prod\ProjectRunner\Unreal\RunnerSandbox_01.uproject` | n/a |
| Houdini (junction; the `HoudiniSource` repo is the source of truth) | `C:\Prod\ProjectRunner\Houdini` → `Documents\GitHub\HoudiniSource\ProjectRunner` (renamed from `ProjectCyberRunner` 2026-10-07) | n/a |
| Shared UE plugins (PhantomInteraction, PhantomStory, PhantomScript; local git repo) | `C:\Prod\_Library\Unreal\Plugins` | n/a |
| Brief and tasks | `$PROJ_DOCS/ProjectRunner` | `$PROJ_DOCS/ProjectRunner` |
| Branded docs: theme, deck and Word templates (guide: `brand.md`; studio kit: `$PROJ_DOCS/brand`) | `C:\Prod\ProjectRunner\Docs` | n/a |
| Environment kit tests (Houdini junction to `HoudiniSource\ProjectSandbox`; Unreal folder for the test project). Archived 2026-10-26, not in use | `C:\Prod\_archive\Sandbox` | n/a |
| ProjectDev kit library: frozen Blender night-market kits (513 pieces, 27 kits) to import or rebuild in Houdini. Read-only source; its `AGENTS.md` has the rules. Local git, never pushed. | `D:\projects\ProjectDev` | n/a |

## Domain

- **Engine**: UE 5.8. The project was built from the Game Animation Sample (GASP) 5.8 and uses motion matching on the UEFN Mannequin. Version control is Git with LFS; `Houdini/` is excluded because it lives in HoudiniSource.
- **Pipeline**: Houdini makes the environments. The first environment systems (`mike::bldg_*`, `mike::room_*`, `mike::destruct_concrete`) are archived in `HoudiniSource/archive/env_v1/`. Exports go from `Houdini/geo/export` to `/Game/Houdini/`, following the `ue5-export` skill. Textures come from Substance Designer and Painter, with Pixel8r 2 for the pixel-art treatment, following the `texture-pipeline` skill.
- **Budgets**: PC at 60 fps. Characters stay under 20k triangles with 2 material slots, props under 5k, and textures at 2K max. Revisit these once the visual style is settled.
- **Naming**: follows the `ue5-export` defaults. C++ classes in the Phantom plugins use the `PN` prefix so they don't collide with ProjectAlpha's PhantomCore (`Ph`).
- **Skeleton**: every human character uses the UE5 Manny skeleton (`SK_Mannequin`), and animations are retargeted offline onto it, so nothing retargets at runtime. Auto-Rig Pro (Blender 5.2) rigs the demo cast. The Houdini rigger (`asset_charRig`/`asset_charBuilder`) swaps in per body once `CompareToManny` passes. Until the swap is approved, GASP and the UEFN Mannequin stay in G1 and the trailer. Plan: `character-animation-plan.md`. (Changed 2026-10-28.)
- **Shared assets**: HDAs and materials come from `C:\Prod\_Library`. PhantomInteraction (no dependencies) is shared with ProjectSilence. PhantomStory depends on StoryFlow. StoryFlow is copied into each project so each one can pin its own version.
- **Proof**: a UBT build log, and a PIE run of the G1 level with recordings. Houdini assets use `verify-asset`, then a UE import.

## Decisions

Settled. Don't reopen unless I ask.

- 2026-10-01: ProjectRunner becomes this narrative game. `RunnerSandbox_01` grows into it, because it's already a GASP 5.8 project with the characters and the Houdini link.
- 2026-10-01: Five episodes, each a chain of level sequences with playable stretches in between.
- 2026-10-01: The camera is side-on (2.5D). A follow camera tracks the player by default. Locked camera zones take over only inside their volumes, and the follow camera takes over again on exit. The player can move in depth inside a room. (Changed from fixed-per-area cameras the same day.)
- 2026-10-01: Scenes are levels streamed into the persistent level `L_PR_Persistent`. Exit volumes fade the screen to black, stream the next scene in behind the cover, and fade back in. (2026-10-02: the Persona 5 silhouette crowd was removed. `APNTransitionStage` can still show a camera view while loading if one is set.)
- 2026-10-01: The player always faces the direction they walk; GASP's strafe and aim modes are off.
- 2026-10-01: The player walks only; running, jumping, and traversal are off. Crouch happens automatically in crouch zones instead of on a button, and the crouch input stays in the shared plugin for ProjectSilence.
- 2026-10-01: The first hack is holding a button for a set time. The hack component is built so ProjectSilence can reuse it. (Changed 2026-10-21, see below.)
- 2026-10-01: Dialogue runs on StoryFlow 1.2.3, copied from ProjectAlpha. It supports UE 5.8, has variables, character variables, and save slots, and fires dialogue tags; Inkpot has no confirmed 5.8 build. The Defender pack is a reference only.
- 2026-10-01: Two shared plugins. PhantomInteraction covers interactables, hold-to-hack, camera zones, and crouch zones. PhantomStory adds the Sequencer bridge (`seq:`/`cam:`/`timer:`/`default:` dialogue tags) and checkpoint saves on top of StoryFlow.
- 2026-10-01: Dialogue choices are on face buttons in order X, Y, B (two choices: X, Y; keyboard 1, 2, 3). A continues lines with no choices. The HUD draws the conversation, not StoryFlow's mouse widget. (Changed 2026-10-21: two choices sit on left and right, see below.)
- 2026-10-01: Choices can be timed, with a default when the timer runs out. Flags are StoryFlow global variables, and relationship values are StoryFlow character variables.
- 2026-10-01: Background NPCs are spline walkers (`APNWalkerLane`) using GASP walk clips. GASP NPC patrols handle people who stay in a room. AnimGen is tested only in Sandbox.
- 2026-10-01: The UEFN Mannequin is used for the blockout. The visual style is undecided.
- 2026-10-02: Environment assets restart from a blank slate. The building, level, room, interior, prop review and destruction systems moved to `HoudiniSource/archive/env_v1/`, latest versions only, renamed to `_01` and 1.0. Git tag `env-v1-final` in HoudiniSource has everything before the move. The ProjectSandbox cyber facade stays active as `asset_facadeBuilder_01` and `mike::cyber_facade::1.0`.
- 2026-10-02: The demo uses the UEFN Mannequin for the player and the walkers. Vhoori and the male and female bodies are imported, but they come back only once their rigs match Manny's joint orientations, because live retargeting breaks their arms and fingers.
- 2026-10-02: Environment textures are pixelated before import, not by UE at runtime. Pixel-art textures import with nearest filtering and no mipmaps.
- 2026-10-07: The environment kit is built as high-to-low bakes. Each Houdini tool builds Blockout, Low and High from one set of parameters, and the High is baked onto the Low in Houdini with the stock Bake Geometry Textures COP. The old trim sheets, atlases and E8 props aren't reused. Brief: `HoudiniSource/docs/briefs/runner_props.md`.
- 2026-10-07: Texel density is a menu (64, 128, 256, 512 px/m), judged side by side in `L_TexelTest`. Signs and screens use a blurred fill with no text or fonts.
- 2026-10-07: HDA types are named `<domain>_<subject>_<descriptor>[_<NN>]` and deliverables `SM_<Subject>_<Descriptor>_<NN>`.
- 2026-10-08: The look is HD-2D: higher-resolution, full-colour textures pixelated at the end. Textures are made in Substance Designer and Painter from the Houdini bakes, following the `texture-pipeline` skill that every game project shares. Pixel8r 2 pixelates them with no palette and no dithering; the Endesga 64 palette is dropped because snapping limited the colours.
- 2026-10-08: Unique props run start to end from one TOP network in the builder scene: Houdini builds and bakes, a Designer graph (`substance/prop_texture.sbs`) textures each part by `mat_id`, Houdini shrinks to the texel density, and Unreal imports through the editor bridge when it answers, headless when it doesn't, then opens a preview level. Painter is optional: an export in `tex/<Asset>/painter/` replaces the Designer textures. Painter stays at 7.3.
- 2026-10-09: Environment pieces are approved on a Houdini render before any UE import. Down-res and pixelation come after approval. Facades use a trim sheet for trims plus tiling wall surfaces, in one master material whose instance sets every zone colour. Brief: `HoudiniSource/docs/briefs/runner_facade_trim.md`.
- 2026-10-10: Tool review (`HoudiniSource/docs/reviews/runner_tools.md`, scene `ProjectSandbox/asset_toolReview_01`). The environment carries on from three ProjectSandbox tools, now moved into `HoudiniSource/ProjectRunner`: `cyber_facade` (scene `asset_facadeBuilder_02`), `env_city_generator` 2.0 (`asset_cityBuilder_02`) and `env_derelict_corridor` 2.0 (`asset_corridorBuilder_01`). The facade trim sheet and modules (2026-10-09) and the room shell are archived in `HoudiniSource/archive/env_v2/`. The props kit and its bake and texture pipeline (2026-10-07/08) are held until Mike decides to keep or rework them. From env_v1, fire escapes, stairs, entrances, shanty boxes, roof tanks, antennas, exhaust fans, billboards and the shopfront stall are marked to keep; how they come back is open.
- 2026-10-15: Pitch push for the CMF Prototyping final intake (closes 2026-11-10): deck, application, landing page, vertical slice video and teaser. Plan: `pitch-plan.md`. The title on every application is "Project Runner". The team is the 2024 list minus Taia DeBona, still being confirmed. The UEFN Mannequin plays the lead for now; Vhoori is in the cast, not the lead. The environment mixes Houdini pieces with owned packs. Both textures-only and whole-screen pixel treatments get tested, with smooth depth of field after the pixel step. No AI-generated images in any pitch or application material.
- 2026-10-16: Look test result: treatment A, textures only (nearest filtering, pixelated textures), with depth of field from the camera. No whole-screen pixel grid. `L_LookTest` is the startup map while the look is tested; switch `EditorStartupMap` and `GameDefaultMap` back to `L_PR_Persistent` for G1 playthroughs.
- 2026-10-16: Purchased packs stay local and out of git, starting with Big Slum Alley (`Content/SlumAlley`, 2.8 GB). Anyone building `L_LookTest` or the food alley copies the pack in from `C:\Prod\AssetPacks`. Same for Future Slums (`Content/TheFloatingSlums`, the Wasteland set) and the CastleTown ground textures (`Content/CastleTown`).
- 2026-10-16: Signs. Pack signs that carry text stay as they are for now. Signs we make use an emissive texture with no text.
- 2026-10-16: Trailer mechs move along paths, started by triggers as the lead walks (`APRPathMover`). Fliers carry a sweeping searchlight and rovers a headlight. No walk or fly cycles yet.
- 2026-10-21: UI follows Dispatch. Dialogue plays as film subtitles and moves on by itself after each line's reading time (or its audio); choices appear only when a line has them. A line with choices plays as a subtitle first; then the subtitle slides up, the choices appear below it, and their timer starts half a second later. Choices are drawn where their button is: one choice on the bottom button, two on left and right, three on left, top and right. Keyboard picks by order (1, 2, 3).
- 2026-10-21: StoryFlow leaves the project. Scenes are written in Scrivener and imported straight from the `.scriv` folder into a new PhantomStory that runs dialogue itself. The StoryFlow-based plugin is kept, renamed PhantomStoryFlow, and not enabled. (Replaces the 2026-10-01 StoryFlow decisions; tracked in TASKS.md "Scrivener story pipeline".)
- 2026-10-21: Controller prompts show button positions, not letters, like Nintendo's guides: a diamond of four dots with the one to press filled. Keyboard prompts show the key. Prompts follow the last device used.
- 2026-10-21: The first hack is one press that plays a short cinematic: an over-the-shoulder shot of the lead and the device while a breach bar fills, "access granted", a shot of the door sliding open, then back to play. This is the starting point for the hacking minigame.
- 2026-10-22: The ProjectDev night-market kits (513 pieces) are the base for Runner's environment pieces. They live in `C:\Prod\ProjectDev`, read-only. Their UE imports stay local and out of Runner git; Mike backs them up to his server.
- 2026-10-22: Every kit piece is re-UV'd in Houdini onto the ProjectDev trim sheet (1024 px/m), to remove stretching. New and re-UV'd pieces are reviewed in a labelled Houdini asset museum before any UE import. Houdini scenes and outputs stay in HoudiniSource.
- 2026-10-22: Architecture (walls, facades) is rebuilt as connected surfaces cut into trim-strip bands, not stacked separate parts. `cyber_facade` is too dense and gets revisited using the kits.
- 2026-10-22: Repeated kit pieces (cardboard boxes, shelves and other families) become HDAs.
- 2026-10-22: Cables are placed in UE through a Houdini Engine cable tool (Labs Cable Generator look). Every cable gets a gentle wind sway from its material; no physics cables for now.
- 2026-10-23: Cinematics are blocked out with Shot Blocker, a Python editor tool in the PhantomScript plugin (Python so engine updates don't break a C++ build). A `SEQ:` flag in the script marks cinematic dialogue, and the importer splits it into one level sequence per run of lines between choices, because Sequencer can't branch. Line IDs survive rewrites, and voice files, shots and animations are anchored to them.
- 2026-10-28: Characters move off GASP onto the UE5 Manny skeleton. Plan: `character-animation-plan.md`. Board: RUN-129 to RUN-137. This replaces the UEFN parts of the 2026-10-01 and 2026-10-02 decisions and the Skeleton line. The details:
  - Auto-Rig Pro rigs the demo cast. The Houdini rigger continues in parallel.
  - The player is a traditional character: the Character Movement Component with in-place walk loops, root-motion montages for interactions, and an `UpperBody` slot for layering.
  - Animations come from a curated library at `/Game/ProjectRunner/Animation/Library`, retargeted offline from Mixamo (wish list in `research/mixamo/`), owned packs and CC0 sources.
  - All of this is built and tested in `L_AnimTest`. G1, the trailer and the project's default maps don't change until Mike approves the swap.
  - The pitch lead changes from the UEFN Mannequin to UE5 Manny.
