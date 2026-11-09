# GASP environment walkthroughs

Project: ProjectRunner, brief at $PROJ_DOCS/ProjectRunner/BRIEF.md
Lead: claude
Run thread: <t3-thread://v2/f570ea0b-5aec-4f9d-82cb-141046ccfbf3/mcp:launch:a7414e13de0f059fbd4752d4a43c1614a5403de9c3a96172b1a306a5dc4cd9fb> (launched 2026-11-06)
Board parent: RUN-188, under RUN-80 Environment
Research: `research/animgen-gasp-2026-11-06/findings.md`, restore list `research/animgen-gasp-2026-11-06/gasp-restore-list.txt`

## Outcome

Mike walks the chosen levels as the GASP UEFN mannequin, with automatic crouch zones, NPCs walking and idling, and AnimGen NPCs in one level if the sandbox test passes.

Done when: Mike can press Play on each walkthrough map and walk it as the GASP character, crouch in a zone, see walking and idling NPCs, and see AnimGen NPCs in `L_TRK_02B_Market`, or read why the AnimGen gate failed.

## Mike's source request (verbatim)

Goal: Adding GASP back into ProjectRunner for the environment walkthroughs. After a few attempts I'd like to add the system back in.
Pieces:
- Adding back in the GASP system and using the default UEFN character
- Making sure the old crouch 'box triggers' is back in place
- Adding in NPCs in the foreground and background to walk back and forth in the scene
- Adding NPC idling throughout the scene
- Even though it's experimental, running a test using the AnimGen plugin for filling in NPC animations.

Constraints: Don't install anything that's not needed, or remove any other tests, or AnimBPs unless they directly effect GASP
Done when: I can walk through the levels, see the NPCs in action, and (if possible) see AnimGen in action
Decisions that are mine: Final approval
Check with me after: The plan is made, and then when I'm able to walk through the levels

## Decisions (Mike's, settled 2026-11-06)

- GASP comes back for walkthrough maps only. Marcus, `APRCharacter` and `ABP_Marcus` stay as they are for every other map.
- Walkthrough maps: `L_TRK_Persistent`, `L_TRK_06_Apartment`, `L_TR_Persistent`, and G1 (`L_G1_Blockout` and `L_G1_Street`).
- The player moves by Runner rules: walk by default, hold to run, no jump or traversal, side-on follow camera and camera zones.
- NPCs use the UEFN mannequin and GASP clips. These clips are authored on that mannequin, so nothing retargets. This changes Mike's "retargeted offline" answer only because no retarget is needed.
- "Back and forth" means opposing looping lanes built with `APNWalkerLane`, unchanged, with lane ends out of sight.
- G1 keeps its crouch zones. New `APNCrouchZone` boxes go in the other walkthrough maps at low spots.
- AnimGen runs in `PipelineSandbox` first. If it passes, it goes into one Runner level with no further check-in.
- The first-launch PyTorch pip download is allowed in both PipelineSandbox and ProjectRunner. Runner only downloads it after a sandbox PASS.
- Build tasks run on Opus instead of Fable, to save Mike's usage limits.
- Work happens on the local branch `gasp-walkthrough`, one commit per task, no push.
- This reopens the 2026-11-02 "GASP removed completely" decision and the brief's AnimGen line, for walkthroughs only. On Mike's go, the lead adds a decision to `BRIEF.md` saying so.

## Contracts

### C1. GASP restore

- Source: git commit `0cc2188~1`. All LFS objects are local and hash-checked.
- Paths: the 1261 files in `gasp-restore-list.txt` (column 2). `GM_Sandbox` must stay: `SandboxCharacter_CMC` holds `AC_VisualOverrideManager`, which casts to it. Its seven character children stay out (`BP_Echo`, `BP_Manny`, `BP_Quinn`, `BP_Twinblast`, `BP_UE4_Mannequin`, `BP_Kellan`, `SandboxCharacter_Mover`). `PC_Sandbox` is referenced only by `GM_Sandbox` and is not spawned here. Echo, Paragon, MetaHumans, UE4/UE5 mannequins, IsolatedExamples, Movies, Widgets, the sample levels and `ABP_GenericRetarget` stay out.
- Lead's correction (2026-11-06, task 1): the list was 158 files short, 31.1 MB, now 1419. These are `_10`, `_20` and `_180` packages imported by the restored motion-matching databases, `CHT_CMCCharacterAnimations` and the Foley presets. Unreal stores that suffix as a number on the name, so the name-table scan missed them. The lead checked that all 158 exist at `0cc2188~1`, none is on disk, and none matches an exclusion above. Current list: `Unreal/Scripts/walkthrough/gasp_restore_list.txt`.
- Load criterion: every restored Blueprint compiles, and the pawn initializes in PIE. Missing-package warnings are allowed only for those seven children and their dependents, and only from `GM_Sandbox` or `PC_Sandbox`. If `GM_Sandbox` or anything that depends on it fails this, stop and ask Mike. The other route is restoring the children (2697 files, 4.4 GB).
- Plugins added to `RunnerSandbox_01.uproject`: PoseSearch, AnimationWarping, MotionWarping, Chooser, Mover, NetworkPrediction, DrawDebugLibrary, CurveExpression, MovieSceneAnimMixer, SmartObjects, GameplayInteractions. Not added: RigLogic, HairStrands, AnimationLocomotionLibrary, AnimationLayering, ChaosMover, MoverExamples, Locomotor.

### C2. Classes

- `APRWalkthroughGameMode`, a C++ subclass of `APRGameMode`, spawns `/Game/Blueprints/SandboxCharacter_CMC.SandboxCharacter_CMC_C`. `APRGameMode` still defaults to `APRCharacter`.
- `UPRPlayerComponent` gets back its GASP branch from `0cc2188~1` (`RemoveSandboxMapping`, `ApplyGait` by reflection on `CharacterInputState`). It runs only when the owner is not an `APRCharacter`. Walk is set unless the current run button is held. Sprint, Strafe and Aim stay false.
- No change to `APRCharacter`, `PRLocomotionAnimInstance`, any `ABP_Marcus`, or `PhantomInteraction`.
- The old GASP branch read the `pr.TestRun` CVar. Replace that with today's hold-to-run button.
- `PRWalkthroughTest` reads the map list from `Unreal/Scripts/walkthrough/wt_maps.json` and drives input through the controller's key path (`APlayerController::InputKey`), not `AddMovementInput` or `SetWantsRun`. It needs no OS input. For each map it checks:
  - Possession and pawn class, and that `IMC_Sandbox` stays removed.
  - Movement from injected keys, and walk and run gait with the run key held and released.
  - The view target and camera position through entering and leaving a camera zone, follow-camera recovery, and that the view target holds for 10 seconds. The pawn's `GameplayCameraComponent` can also set the view target, so this has to be proven.
  - Crouch: stays crouched while moving under an obstruction, stays crouched across overlapping zones, and stands only after the last zone.
  - The count of `WT_*` actors.
- Test map for task 1: `/Game/ProjectRunner/Walkthrough/Test/L_WT_Test`, owned by task 1 and built with `new_level`. It holds a floor, a camera zone and a crouch zone. If GASP's `CharacterInputState.WantsToCrouch` fights `Crouch()` from a zone, `ApplyGait` sets it to match the pawn's crouch state.

### C3. Maps

- `APRWalkthroughGameMode` goes on these maps: `L_TRK_Persistent`, every `L_TRK_0*` area, `L_TR_Persistent`, and every `L_TR_0*` area. That way, pressing Play on an area map also gives GASP.
- G1 gets a new persistent map, `/Game/ProjectRunner/Maps/Walkthrough/L_WT_G1`, built with `new_level`. It copies what `pr_build_g1.py` (around line 428) gives `L_PR_Persistent`: the waiting platform, PlayerStart, and `PNTransitionStage` with initial level Blockout and entry `West`. `PNLevelFlow` loads and unloads the scenes, so don't statically stream both. The test walks Blockout to Street to Blockout and checks the GASP pawn survives. `L_PR_Persistent` and the G1 maps' world settings don't change, so `PRG1PlaythroughTest` still plays Marcus.
- Not touched: `L_AnimTest`, `L_AnimMuseum`, `L_MarcusPlayable`, `L_CascReview`, `L_KitMuseum`, `L_CyberFacade`, `L_BuildingLab`, and the signage labs.

### C4. Added actors and clips

- Everything added to a map goes in the outliner folder `Walkthrough/` with labels `WT_Crouch_*`, `WT_Lane_Front_*`, `WT_Lane_Back_*` and `WT_Idle_*`. AnimGen actors go in `Walkthrough/AnimGen/`.
- Lead's addition (2026-11-06, task 2): each trailer area map also gets one `PNCameraZone`, `WT_CamArea_<area>`, pointing at that map's own `CAM_Follow`, at a priority below every existing zone. Each persistent streams 7 `PNFollowCamera` actors and the subsystem keeps only the last registered, so without these the view sat up to 13546 cm from the pawn. It adds actors only, with no change to `PhantomInteraction`.
- Clips go in `/Game/ProjectRunner/Walkthrough/Clips/`. `A_WT_Walk_01` is a duplicate of `M_Neutral_Walk_Loop_F` with its root track stripped. `A_WT_Idle_*` are duplicates of `M_Neutral_Stand_Idle_Loop` and the `M_Neutral_Stand_Idle_Break_v*` clips. GASP's originals stay unedited, because motion matching needs them.
- Crowd per area, as totals: 3 to 5 people across 1 or 2 foreground lanes, 5 to 8 people across 2 background lanes, 6 to 10 idlers. All use `SKM_UEFN_Mannequin`. Idlers are skeletal mesh actors in single-node mode with no AI. Foreground means between the camera and the player's route.
- Walker materials (Mike, 2026-11-06): foreground lanes are dark grey, background lanes are mid-grey. Set them with `OverrideMaterial` on each `APNWalkerLane`, with no change to the class. Use one master material and two instances: `/Game/ProjectRunner/Walkthrough/Materials/MI_WT_NPC_DarkGrey` (linear base colour 0.03) and `MI_WT_NPC_MidGrey` (linear 0.18). Mike can adjust either instance by hand. Idlers keep the mannequin's own material, and so do the AnimGen NPCs and the G1 `Walkers_*` lanes.
- `AnimationSpeed` on each lane, in cm/s, is the original clip's root travel divided by its duration, measured before stripping. Keep root orientation and floor height. Set `ScaleRange=(1,1)`, because the lane doesn't compensate play rate for scale.
- Foot slide is measured in world space over planted-foot contact intervals, not read from a capture.
- The G1 `Walkers_*` lanes keep their NPC bodies, because `PRG1PlaythroughTest` counts them. Each G1 scene's `WT_*` crowd is shown and active only while that scene is the current one. Actors in `L_WT_G1`'s persistent level outlive scene changes, so the crowd can't simply sit there switched on.
- The trailer persistents load every area at once (`LevelStreamingAlwaysLoaded`, in `pr_build_trailer.py:614` and `pr_build_trailer_kit.py:140`). That means up to about 140 meshes at a time. Frame time is measured on the persistent maps with everything loaded, and that is the figure the 60 fps cut applies to.

### C5. AnimGen

- No training, no torch upgrade, no file changes under `Program Files`. The shipped `AGAE_AnimGenNPC` and `AGC_AnimGenNPC` assets are used as they are.
- The editor's first-launch pip install happens once per project (several GB, under `Intermediate/PipInstall`). Check it stays out of git.
- Sandbox pass: with `AnimGenExample` enabled in `PipelineSandbox` only, `/AnimGenExample/Levels/AnimGenExampleLevel` in PIE shows NPCs reaching targets and their bone poses changing over time, sampled from the running game. The log has no "controller not valid" lines. Record numeric frame timing and a viewport screenshot at the default settings. `LODLevel` 2 with `EvaluationPeriodInFrames` 4 sit on the anim node, so test them in a sandbox-owned copy of the ABP under `PipelineSandbox/Unreal/Content/AnimGenTest/` and read the values back. The level itself is plugin content and stays unedited: any capture actor or test level goes in that same folder.
- The report separates an AnimGen failure (FAIL) from a blocked test (BLOCKED, with the reason). BLOCKED stops task 5 the same way FAIL does.
- Runner step, only after a sandbox pass and in its own commit: enable `AnimGenExample`, then add 3 to 5 `AnimGenNPC`, their `NavigationTarget` actors, a `NavMeshBoundsVolume` and a nav mesh to `L_TRK_02B_Market`. The NPCs use the plugin's own mannequin. Driving `SK_PR_Human` is out of scope.
- If the gate fails, the plan continues without AnimGen and the report says why.

### C6. Working rules for every child

- Branch `gasp-walkthrough`. Commit each task with explicit paths, never `git add -A`. The four modified HoudiniEngine binaries are not ours and stay unstaged. No push.
- Runner's editor uses port 8002 and Python remote execution through `%TEMP%\pdfix\ue_remote.py`. The `unreal-editor` MCP doesn't reach it from `C:\Prod`. PipelineSandbox uses port 8005. Close an editor only by PID, and only if its command line names that task's own project (`RunnerSandbox_01` or `PipelineSandbox`). Launch with `-LiveCoding=false`, build with `-NoHotReloadFromIDE`.
- A SceneCapture proves what its own camera sees. For the player's view, read the view target and camera position. For frame figures, use numeric timing or a viewport screenshot.
- Save explicit asset paths only. An empty `save_assets` list saves everything.
- Check `get_game_world()` first: while PIE runs, `EditorAssetLibrary` returns nothing.
- `load_asset` on a map in the GUI editor crashes on the next map change. `duplicate_asset` on a map crashes too. Use `new_level` and `load_level`.
- Python can't spawn into PIE. Place a SceneCapture2D in the level before PIE, then find it in the game world and `capture_scene`. Never use OS input.
- Don't delete assets or remove tests or AnimBPs. Stop and ask if one seems to be in the way.

## Tasks

| # | Task | Done when | Writes | After | Model | Effort | Board id |
|---|---|---|---|---|---|---|---|
| 1 | GASP restored and playable by C++: baseline tests run first, then restore (C1) and code (C2) | Same results for `PRG1PlaythroughTest` and `PRMarcusPlayableTest` before and after. UBT 0 errors. The C1 load criterion passes. `PRWalkthroughTest` passes on `L_WT_Test` | C1 paths, `RunnerSandbox_01.uproject`, `Source/RunnerSandbox_01/*`, `Walkthrough/Test/L_WT_Test`, `Scripts/walkthrough/` | - | `claude-opus-5-5` | high | RUN-189 |
| 2 | Maps wired and crouch zones in place (C3): game mode, `L_WT_G1`, `WT_Crouch_*` at low spots found by a capsule check along each route | `PRWalkthroughTest` passes on every map in `wt_maps.json`, including crouch where a zone exists and streamed scene changes. Per-map list of zones placed, and of maps with no low spot | Maps in C3, `Maps/Walkthrough/`, `Scripts/walkthrough/` | 1 | `claude-opus-5-5` | medium | RUN-190 |
| 3 | Crowd: clips, lanes and idlers (C4) in all walkthrough areas | Asset check shows `A_WT_*` have no root translation. A PIE capture per area shows walkers and idlers. Foot slide under 5 cm per C4. Numeric frame times per persistent map, all areas loaded, crowd on and off. Actor counts within C4 | `/Game/ProjectRunner/Walkthrough/`, maps in C3, `Scripts/walkthrough/` | 2 | `claude-opus-5-5` | medium | RUN-191 |
| 4 | AnimGen sandbox gate (C5) | The C5 sandbox pass, with log excerpt, pose and target samples, and frame figures, written to `research/animgen-gasp-2026-11-06/sandbox-test.md`, ending in PASS, FAIL or BLOCKED | `PipelineSandbox/Unreal/*.uproject`, `PipelineSandbox/Unreal/Content/AnimGenTest/`, that report | - | `claude-opus-5-5` | medium | RUN-192 |
| 5 | AnimGen in `L_TRK_02B_Market` (C5), only on a task 4 PASS | PIE samples show AnimGen NPCs reaching targets beside the crowd. Log clean. Frame figures on `L_TRK_Persistent` with them on and off. `PRG1PlaythroughTest`, `PRMarcusPlayableTest` and `PRWalkthroughTest` still pass. Marked skipped with the reason otherwise | `RunnerSandbox_01.uproject`, `L_TRK_02B_Market`, `Scripts/walkthrough/` | 3, 4 | `claude-opus-5-5` | medium | RUN-193 |
| 6 | Independent check of tasks 1 to 5 against their proofs, and a walkthrough note for Mike | All automation re-run with output pasted. `refs/wip/walkthrough-2026-11-06/` holds one capture per map. `plans/2026-11-06-gasp-walkthrough-howto.md` lists the maps to open, the controls, and the known rough spots. It marks Mike's walkthrough and approval as pending | Those two paths, `Saved/` | 3, and 5 done or skipped | `claude-sonnet-5-5` | medium | RUN-194 |

## Checkpoints

| After | Kind | Why |
|---|---|---|
| plan | required | Mike's go |
| anything destructive | required | Nothing destructive is planned. Any delete or overwrite outside C1 to C4 stops here |
| task 6 and end review | required | Mike walks the levels and gives final approval |

## Budget

6 child agents, 2 reviews (plan critique and end review). Research has already run.

## Risks

- Camera ownership. `PC_Sandbox` sets `CameraManagerClass`, the pawn's `GameplayCameraComponent` can call `SetViewTarget`, and `PNCameraZone` sets it too. If task 1's camera check fails on a plain controller, try spawning `PC_Sandbox`. That alone isn't a proven fix, so stop and report if it still fails.
- GASP adds 30 plugins once dependencies count, and AnimGen adds 11 more. That changes what every map loads, so tasks 1 and 5 re-run the existing tests before and after.
- Crowd cost. Up to about 140 skeletal meshes on the trailer persistents on an RTX 5070 laptop, in already heavy maps. If a persistent map falls under 60 fps, the lead cuts the background crowd first and notes it, without asking.
- Idle variety. One body and about six GASP idle clips look repetitive up close. Mike judges this at the end; the mocap library is the follow-up, not in this plan.
- `L_WT_G1` may not match `L_PR_Persistent`'s level flow. Task 2 reads how it works first, then stops and reports if a wrapper can't reproduce it.
- `L_TR_*` and `L_TRK_*` have not been played on GASP since their last changes. Scene triggers and mech path movers may rely on `APRCharacter`. Task 2 greps for that.
- PipelineSandbox's git tree has uncommitted config changes from earlier work. Task 4 edits only the `.uproject` and stops if the editor is open in another session.
- The open Cascadeur plan (RUN-167 onward) shares this editor. No run is active now. The run thread checks before taking the editor and works around it if one has started.

## Mike's walkthrough feedback (2026-11-06, verbatim)

- Remove all characters from the wastelands level, and don't allow the player to go from level 2 > 1. The camera angle is tough to go back
- Market: Increase the number of NPCs in the scene by a lot (at least double in fgd and bgd). Is there issues with a higher count? I did a test with this with Manny NPCs before, and was wondering if that isn't relevant using GASP
- Food Alley: I deleted the NPCs off screen and the player start too. Let's start the character there. Also, all NPCs here are the light grey
- Redlight: same as Market
- Station: Leave for now

How the lead reads this. Mike walked the `L_TR_*` maps; each change is mirrored to its `L_TRK_*` twin so the two sets stay alike.

- Wasteland (`L_*_01_Wasteland`): no `WT_Lane_*` or `WT_Idle_*`. The crowd check expects 0. Any other human NPC already in the map is reported, not removed. Machines stay.
- Level 2 to 1: `Exit_Back_To_L_*_01_Wasteland` in `L_*_02_Waystation` no longer travels. Replace it with a blocking volume, `WT_Block_NoBack`, so the player can't walk off the end. `Gate` from 1 to 2 and the 5 to 1 exit stay.
- Market and Red Light (`L_*_02B_Market`, `L_*_04_RedLight`): front 10 and back 16 walkers, up from 4 and 6. Idlers 16, up from 8, when clear spots exist. These override C4's crowd totals, and the Risks rule that cuts the background crowd no longer applies below front 8 and back 12: report the frame figures to Mike instead.
- Food Alley (`L_*_03_FoodAlley`): Mike's edit to `L_TR_03_FoodAlley` is saved (11:10, removes `WT_Idle_07` and `08`; `PlayerStart` and `Entry_Start` at -11049.87, -509.83, 100, yaw -90). The plan drops those two idlers, and placing must keep the start. The `L_TRK_` twin gets the same start and idler change. All lanes and idlers here use `MI_WT_NPC_MidGrey`, the lighter of the two existing greys. This overrides C4's rule for this map only.
- Station, `L_*_05_StationMarket`: no change.
- Persistent totals: `L_TR_Persistent` and `L_TRK_Persistent` go from 113 to 137 people, under C4's 140.

## Second opinion (Codex gpt-6.1-sol, 2026-11-06)

All nine points accepted and folded in. None of them has run in an editor yet.

1. `GM_Sandbox` can't be dropped: `AC_VisualOverrideManager` casts to it. The lead confirmed this with a name-table read and rewrote C1 with one load criterion.
2. Camera and input weren't proven. `PRWalkthroughTest` now covers them through the key path.
3. `L_WT_G1` now follows `pr_build_g1.py`'s stage setup, and each scene's crowd is active only with that scene.
4. Frame time is measured on the persistent maps, because areas are always loaded.
5. Tests inject keys and read the real view target. Mike's walk and approval stay pending until his checkpoint.
6. Lane speed is root travel over duration, in cm/s, with scale fixed at 1.
7. Crouch tests cover sustained crouch and overlapping zones, and how GASP's own crouch state interacts with the zones.
8. AnimGen settings are tested in a sandbox-owned ABP copy, and blocked tests are reported separately from failures.
9. Fixed the handoffs: task 1's test map has an owner, task 6 runs after task 5 is done or skipped, and task 4 has its own editor rules.

## Progress

- [x] 1 GASP restored and playable (commit `38e41a8`; all proof runs headless)
- [x] 2 Maps wired and crouch zones in place (commit `a6de1a8`; all proof runs headless; 1 of 12 exit routes walked)
- [ ] 3 Crowd (stopped by Mike 2026-11-06 for his walk, no more captures; placed and saved, uncommitted, proof incomplete)
- [x] 4 AnimGen sandbox gate (PASS, `research/animgen-gasp-2026-11-06/sandbox-test.md`)
- [ ] 5 AnimGen in L_TRK_02B_Market
- [ ] 6 Independent check and how-to
