# Marcus playable integration

The [revision03 transition correction](PLAYABLE_REVISION_03.md) fixes the higher foot lifting during idle blends and softens the stop, kneel and stand transitions. The same playable level now selects the revision03 AnimBP.

The [November 5 revision02 update](PLAYABLE_REVISION_02.md) adds camera-relative mirroring, 20% faster crouch movement and the approved D kneeling idle. It supersedes the first-delivery speeds, idle choice and asset count below. The test map path stays the same.

Updated 2026-11-05. The main UE editor is now rebuilt and running Marcus through the new AnimBP. Mike approved closing and reopening it after the old module caused this test level to show the previous animations. The main project passes 39 locomotion checks and all shoe-contact checks. The live controlled player uses SKM_Marcus and ABP_Marcus. See [main-editor activation evidence](MAIN_EDITOR_ACTIVATION.json). The separate test build remains available.

Run [Launch_Marcus_Playable.cmd](C:/Prod/ProjectRunner/Unreal/Scripts/marcus_playable/Launch_Marcus_Playable.cmd) to play the tested copy in a separate game window. It does not command or restart the open editor. Use WASD or the left stick to move, and hold Shift or click and hold the left stick to run. Enter the marked passage to crouch automatically. Stop inside it to inspect the crouch idle. There is no new manual crouch binding. Close the game window with Alt+F4.

The test level is `/Game/ProjectRunner/Animation/MarcusPlayable_01/L_MarcusPlayable`. The original review level, including its quarter-speed rows and D/E pose tests, is unchanged.

## What changed

- `APRCharacter` loads the reviewed mesh and AnimBP together at BeginPlay. Crouch events keep the AnimBP active instead of replacing it with a single-node animation.
- `ABP_Marcus` reads horizontal speed and the actual character crouch state. It blends between standing and crouching locomotion over 0.25 seconds.
- The standing BlendSpace contains idle, walk and run. The crouching BlendSpace contains the held crouch-walk idle and crouch walk. The source playback rates and all 69 mesh morph targets remain intact. Run and crouch garment curves survive the copy and blending.
- Walk, run and crouch speeds are 146.1, 371 and 88 cm/s, measured from the clips' planted-foot motion. This is a baseline stride match, not a horizontal foot lock.
- A native animation proxy evaluates the normal graph, then corrects the blended root height from 458 shoe samples and a source sole-height curve. This removes blend penetration on flat ground while preserving the run's flight phase. It does not provide stair or slope IK.
- The playable assets have no references to `MarcusTest_*` packages. They use their own mesh and skeleton. Existing review assets and other characters retain their earlier skeletons.

## Verification

The [saved verification report](PLAYABLE_VERIFICATION.json) contains the checks and published asset hashes.

| Check | Result |
| --- | --- |
| Isolated `RunnerSandbox_01Editor Win64 Development` build | Succeeded |
| Marcus possession, states, speed, facing, crouch transitions and curves | 39 checks passed |
| Shoe geometry evaluated from 268 sampled runtime poses | No floor penetration; grounded phases within 0.17 cm of the floor |
| Run flight | Preserved, about 11 cm in the sampled frames |
| G1 Truth playthrough with the new character | 53 checks passed, including interactions, cameras and save/load |
| G1 passage clearance | Posed mesh top 139.81 cm under a 140 cm ceiling |
| Windows cook for the Marcus test map and dependencies | Passed, 0 errors and 0 warnings |
| Standalone `-game` launch with NullRHI | Loaded `PRCharacter_0.CharacterMesh0.ABP_Marcus_C_0` |
| Published assets | Eleven files copied and hash-checked |

The G1 test originally assumed an upright skull offset from the head joint. It now skins the imported mesh in the actual pose to check ceiling clearance. Its expected player skeleton was also updated for Marcus's separate prototype skeleton. Neither change relaxed the physical ceiling limit.

The first cook used `-SkipEditorContent` and failed on existing Landmass editor-resource references. The successful cook used the normal settings without that flag. No production plugin settings were changed to hide the failure. The asset commandlet has one existing Python naming warning for `PRPathMover.Spotlight`; compilation also reports existing engine/toolchain warnings.

These are headless gameplay and geometry checks. Visual approval in the game window remains open. The cook covers this test map, not every game level, and this delivery is not a packaged executable.

## Main editor activation

Completed on 2026-11-05 with Mike's approval. The instructions below remain available for future native changes. Close the Runner editor and the separate game window, then run [Build_Main_After_Editor_Closes.ps1](C:/Prod/ProjectRunner/Unreal/Scripts/marcus_playable/Build_Main_After_Editor_Closes.ps1), then reopen the main project and load the test map. The script refuses to run while a Runner editor or test process is open. The November 4 isolated-build pass left the main DLL unchanged. The November 5 follow-up rebuilt it with the editor closed, then reopened the same level and verified its controlled player.

The source change applies to `APRCharacter`, so existing levels that spawn it will use the new mesh and AnimBP after the rebuild. Explicit per-instance overrides can still select other assets or speeds. Project startup maps and shared plugin configuration were not changed.

The separate test project lives at `Unreal/Saved/MarcusPlayableBuild/Project`. It uses physical copies of build inputs and junctions to existing content. Generated assets are in a separate physical folder. Do not edit or resave the shared content from this test project. `prepare_isolated_project.py` prepares the copy, preserves compiled binaries on subsequent runs and disables its MCP/Python remote control.

## Reproducing the checks

Use the UE 5.8 `Build.bat` to build the isolated project's `RunnerSandbox_01Editor Win64 Development` target. The source scripts live in [marcus_playable](C:/Prod/ProjectRunner/Unreal/Scripts/marcus_playable).

Run these UE automation tests against the isolated project with `UnrealEditor-Cmd.exe`, `-unattended -nullrhi -nosound -NoLiveCoding` and `-TestExit="Automation Test Queue Empty"`:

```text
-ExecCmds="Automation RunTests ProjectRunner.Marcus.Playable"
-ExecCmds="Automation RunTests ProjectRunner.G1.Playthrough.Truth"
```

Inspect `Project/Saved/MarcusPlayable/runtime_check.json` and `Project/Saved/pr_g1_truth.json`. Check their `passed` and `pass` fields, since the editor process can return zero even when an automation assertion fails. Run `check_runtime_contacts.py` with Blender 5.2 in background mode to evaluate the sampled shoe geometry. Its assertions must pass.

Cook with these additional arguments:

```text
-run=cook -TargetPlatform=Windows -Map=/Game/ProjectRunner/Animation/MarcusPlayable_01/L_MarcusPlayable -CookCultures=en
```

`publish_assets.py` checks these results before copying new assets and refuses to overwrite differing destination files. Logs and the full runtime pose samples are under `Unreal/Saved/MarcusPlayableBuild`.

## Remaining animation work

The first playable crouch idle is the stationary crouch-walk pose. D at the approved intermediate body height remains a separate kneeling stealth pose study. It needs jacket fitting and entry/exit motion before it becomes a gameplay state. Start/stop animation, dedicated crouch transitions, turn-in-place, terrain IK and long-coat Chaos Cloth remain later work.

The [cast follow-up plan](CAST_OVERHAUL.md) covers rig repairs, joint placement, retargeting, collars, coats, props and NPC validation. Other characters were not changed in this pass.
