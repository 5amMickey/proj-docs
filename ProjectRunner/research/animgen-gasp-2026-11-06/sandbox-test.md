# AnimGen sandbox gate (C5)

Date: 2026-11-06. Engine: UE 5.8.4. Project: `C:\Prod\PipelineSandbox\Unreal\PipelineSandbox.uproject`. Level: `/AnimGenExample/Levels/AnimGenExampleLevel`, unedited. PC: RTX 5070 Laptop GPU, Ryzen AI 7 350, 16 logical processors.

The gate passes. All 10 NPCs ran on the shipped `AGC_AnimGenNPC` in PIE, reached 53 targets in 92 seconds, and their bone poses changed between samples. The log has 0 "controller not valid" lines. The frame held 60 FPS with a game thread of about 9.7 ms.

The NPC blueprint already feeds `LODLevel` 2 to the anim node at runtime, so "default settings" here means LOD 2 with period 0. The sandbox copy therefore tests the period, not a change in LOD. Period 4 lowered animation task time by about 8%.

## What changed

| Path | Change |
|---|---|
| `Unreal/PipelineSandbox.uproject` | Added `AnimGenExample` |
| `Unreal/Content/AnimGenTest/ABP_AnimGenNPC_LOD2.uasset` | New sandbox copy of `ABP_AnimGenNPC` |
| `Unreal/Intermediate/PipInstall` | Pip install, 4.9 GB, ignored by git |
| `Unreal/Saved/` | Logs, CSV profiles and the screenshot, ignored by git |

No git commit was made in PipelineSandbox. No file under `Program Files` changed: a search of the AnimGen and AnimGenExample plugin folders found 0 files modified today. No training and no torch change. I placed no capture actor or test level. The editor was closed by PID 16896 after its command line was checked.

## 1. Plugin diff and git ignore

The first hunk was already uncommitted before this task. The `AnimGenExample` block is the only edit from this task.

```diff
diff --git a/Unreal/PipelineSandbox.uproject b/Unreal/PipelineSandbox.uproject
index 3a100fd..d9d823e 100644
--- a/Unreal/PipelineSandbox.uproject
+++ b/Unreal/PipelineSandbox.uproject
@@ -4,6 +4,14 @@
 	"Category": "",
 	"Description": "",
 	"Plugins": [
+		{
+			"Name": "PythonScriptPlugin",
+			"Enabled": true
+		},
+		{
+			"Name": "EditorScriptingUtilities",
+			"Enabled": true
+		},
 		{
 			"Name": "ModelingToolsEditorMode",
 			"Enabled": true,
@@ -18,6 +26,10 @@
 		{
 			"Name": "AllToolsets",
 			"Enabled": true
+		},
+		{
+			"Name": "AnimGenExample",
+			"Enabled": true
 		}
 	]
 }
```

```
$ git -C C:\Prod\PipelineSandbox check-ignore Unreal/Intermediate/PipInstall
Unreal/Intermediate/PipInstall
$ git check-ignore -v Unreal/Intermediate/PipInstall
.gitignore:19:Unreal/Intermediate/	Unreal/Intermediate/PipInstall
```

The pip install ran once at first launch with no prompt. The install step took 4 minutes (22:25:07 to 22:29:07 UTC log time), including the 2.5 GB torch wheel. Editor start took 276 s in total.

```
LogPython: Running python command: python -m pip install --disable-pip-version-check --only-binary=:all: --require-hashes --extra-index-url https://download.pytorch.org/whl/cu124/ -r ".../Intermediate/PipInstall/merged_requirements.txt"
LogPython:   Downloading https://download-r2.pytorch.org/whl/cu124/torch-2.5.1%2Bcu124-cp311-cp311-win_amd64.whl (2510.8 MB)
LogPython: Successfully installed Jinja2-3.1.2 Markdown-3.7 ...
LogLoad: (Engine Initialization) Total time: 276.32 seconds
```

## 2. Samples from the running game

The samples came from a Slate post-tick callback that read the PIE world once per second, from game time 31.9 s to 123.7 s (92 samples, 0 errors). The world was `/AnimGenExample/Levels/UEDPIE_0_AnimGenExampleLevel`. Every NPC used `ABP_AnimGenNPC_C` under a `DetourCrowdAIController`.

"Reached" counts a change of the NPC's `NavTarget` variable when the last sample before the change was within 150 cm of the old target.

| NPC | Reached | Target changes | Path (cm) | Mean speed (cm/s) | Closest to a target (cm) |
|---|---|---|---|---|---|
| AnimGenNPC_C_0 | 4 | 4 | 6497 | 70.8 | 41.2 |
| AnimGenNPC_C_1 | 6 | 6 | 6495 | 70.7 | 19.9 |
| AnimGenNPC_C_2 | 7 | 8 | 8932 | 97.3 | 0.1 |
| AnimGenNPC_C_3 | 5 | 7 | 3711 | 40.4 | 46.8 |
| AnimGenNPC_C_4 | 5 | 5 | 5569 | 60.7 | 42.5 |
| AnimGenNPC_C_5 | 5 | 5 | 5281 | 57.5 | 48.7 |
| AnimGenNPC_C_6 | 4 | 4 | 5911 | 64.4 | 41.7 |
| AnimGenNPC_C_7 | 7 | 8 | 9380 | 102.2 | 2.0 |
| AnimGenNPC_C_8 | 6 | 6 | 5193 | 56.6 | 35.7 |
| AnimGenNPC_C_9 | 4 | 5 | 5568 | 60.6 | 39.3 |
| Total | 53 | 58 | | | |

The other 5 target changes happened with the last sample more than 150 cm from the old target. I did not find out why. Trace for one NPC, position in XY, distance to target in cm:

```
AnimGenNPC_C_2
 t=31.9 pos=[-618.1, 484.4] target=T20 dist=454.4 move=MOVING
 t=33.9 pos=[-443.2, 336.9] target=T20 dist=226.6 move=MOVING
 t=35.0 pos=[-350.6, 236.0] target=T20 dist=89.6  move=MOVING
 t=36.0 pos=[-290.0, 169.9] target=T20 dist=0.1   move=IDLE
 t=37.0 pos=[-288.7, 168.5] target=T20 dist=2.0   move=IDLE
 t=38.0 pos=[-282.6, 159.3] target=T44 dist=730.3 move=MOVING
 t=41.0 pos=[-65.7, -168.9] target=T44 dist=336.9 move=MOVING
 t=43.0 pos=[82.3, -393.0]  target=T44 dist=68.3  move=MOVING
 t=44.0 pos=[120.7, -451.0] target=T44 dist=1.2   move=IDLE
```

Bone transforms in component space, translation then pitch, yaw, roll:

```
AnimGenNPC_C_0
 t=31.93 foot_l=[-0.1,-48.3,17.3, 55.6,75.5,92.1]    hand_r=[-32.8,-9.7,77.4, 70.8,-35.0,97.0]  head=[-5.5,1.5,143.2, 86.0,151.9,149.4]
 t=32.93 foot_l=[3.1,-29.0,11.3, 78.6,85.7,98.2]     hand_r=[-26.2,-23.7,84.4, 66.0,62.1,179.0] head=[-5.1,8.8,145.5, 85.9,145.6,143.1]
 t=33.93 foot_l=[10.0,-19.1,8.5, 89.1,114.8,123.4]   hand_r=[-24.7,-17.4,84.4, 73.2,36.5,159.4] head=[-1.1,9.2,147.2, 88.1,164.9,163.5]
 t=78.33 foot_l=[16.4,0.7,8.3, 89.6,-102.7,-96.3]    hand_r=[-23.7,-0.1,82.5, 69.7,-66.8,71.2]  head=[-1.3,5.0,149.9, 84.7,-94.8,-95.0]
 t=123.75 foot_l=[11.3,4.2,8.4, 89.8,-137.2,-129.2]  hand_r=[-27.0,-2.8,81.1, 67.8,-67.6,72.5]  head=[-3.3,-0.5,148.5, 84.5,-91.7,-90.6]
```

Mean change of the four hand and foot positions between one-second samples, in cm:

| NPC | Mean | Min | Max |
|---|---|---|---|
| C_0 | 11.2 | 0.5 | 28.8 |
| C_1 | 6.6 | 0.4 | 25.3 |
| C_2 | 7.1 | 1.0 | 21.0 |
| C_3 | 10.5 | 0.4 | 24.0 |
| C_4 | 7.7 | 0.3 | 29.7 |
| C_5 | 9.9 | 0.4 | 25.3 |
| C_6 | 6.8 | 0.5 | 24.1 |
| C_7 | 9.9 | 0.6 | 32.0 |
| C_8 | 6.3 | 0.4 | 25.2 |
| C_9 | 11.4 | 0.5 | 29.7 |

## 3. Log

`Unreal/Saved/Logs/PipelineSandbox.log`, whole session, four PIE runs:

```
controller not valid: 0
```

AnimGen log lines at Warning or Error level, none of which stopped a run:

| Line | Count | Effect seen |
|---|---|---|
| `LoadErrors: While trying to load package .../AGAE_AnimGenNPC, a dependent package .../BP_DebugDraw_AnimGenNPC ... was not available` | 1 | None seen. The asset is missing from the shipped plugin and is referenced from the autoencoder's `TrainingSettings`. |
| `LogLinker: Warning: Unable to load BP_DebugDraw_AnimGenNPC_C_0 with outer AnimGenAutoEncoderTrainingSettings ...` | 1 | Same cause. |
| `LogMover: Warning: Cannot predict trajectory on a MoverComponent that is not initialized ... Actor: AnimGenNPC_C_n` | 40 | 10 at each PIE start, in the same frame as world start. All NPCs moved afterwards. |
| `LogCrowdFollowing: Warning: Unable to find RecastNavMesh instance while trying to create UCrowdManager instance` | 4 | Not AnimGen. All 4 came during PIE shutdown, just before `Shutting down PIE online subsystems`. The NPCs navigated in every run. |

The `/Game/Levels/AnimSandbox` string noted in `findings.md` produced no log line. The log also has errors from my own tooling, not AnimGen: Python tracebacks from probe scripts I then fixed, one `Missing required Mcp-Session-Id` from a probe of port 8005, and one `csvcategory` usage line from a wrong argument.

## 4. Frame timing at default settings

Run A1 is the clean figure. CSV profiler, 900 frames, in the PIE viewport (2041 x 1222, render resolution 68.4%). `bThrottleCPUWhenNotForeground` was set to False in memory so a background window would not cap the frame rate. Times are in ms.

| Stat | Mean | p50 | p95 | p99 | Max |
|---|---|---|---|---|---|
| FrameTime | 17.15 | 16.67 | 16.67 | 48.53 | 85.92 |
| GameThreadTime | 9.76 | 9.02 | 11.05 | 45.28 | 76.53 |
| GPUTime | 4.57 | 4.57 | 4.87 | 5.03 | 5.82 |
| RHIThreadTime | 0.08 | 0.07 | 0.14 | 0.20 | 2.00 |
| RenderThreadTime | 0.10 | 0.00 | 0.00 | 3.58 | 5.21 |
| Exclusive/GameThread/Animation | 1.17 | 1.13 | 1.41 | 1.97 | 2.31 |
| AnimationParallelEvaluation/TotalTaskTime | 9.11 | 9.00 | 10.66 | 12.03 | 14.93 |
| AnimationParallelEvaluation/AverageTaskTime | 0.83 | 0.82 | 0.97 | 1.09 | 1.36 |

- The frame sits at a 60 FPS cap, so FrameTime does not show headroom. Read GameThreadTime instead. I did not find which setting sets the cap.
- There are 11 animation tasks a frame: 10 NPCs and the player. The player runs `AGC_AnimGenCharacter`, a different controller.
- Processes at 07:36:40 and 07:37:08: only `UnrealEditor.exe` PID 16896 (PipelineSandbox). No Runner editor, UBT or cook in either check. CPU 9% and 25%.
- I did not measure a baseline without NPCs, so the share of the game thread due to AnimGen is not known. The p99 spikes are not explained.

Viewport screenshot: `C:\Prod\PipelineSandbox\Unreal\Saved\Screenshots\WindowsEditor\ScreenShot00000.png` (2560 x 1392, editor window with the PIE viewport). It shows NPCs in the level with a `stat unit` overlay: 60.00 FPS, Frame 16.67 ms, Game 10.74 ms, Draw 0.00 ms, RHIT 0.10 ms, GPU 4.43 ms, Draws 390, Prims 508.7K. It also shows the "LIGHTING NEEDS TO BE REBUILT (4 unbuilt objects)" message.

## 5. Sandbox copy: LODLevel 2, EvaluationPeriodInFrames 4

Asset: `/Game/AnimGenTest/ABP_AnimGenNPC_LOD2`. On the plugin's ABP, the `LODLevel` pin is linked to `Properties.LODLevel`, which comes from the NPC blueprint, so a pin default would do nothing. In the copy I broke that link, set the pin to 2 and set the period to 4. Then I compiled and saved that one path. Read back from the asset:

```
READBACK struct LODLevel 2 EvaluationPeriodInFrames 4.0
READBACK pin LODLevel value 2 links 0
PLUGIN ABP unchanged: struct 0 0.0 pin links 1
```

Runtime LOD on the plugin's ABP, read in PIE at t=13 s (the same value appeared at t=40 and t=72 on the actor):

```
AnimGenNPC_C_0 ABP_AnimGenNPC_C actor LODLevel 2 anim Properties LODLevel 2 dist_to_camera 1504
AnimGenNPC_C_1 ABP_AnimGenNPC_C actor LODLevel 2 anim Properties LODLevel 2 dist_to_camera 856
... all 10 the same, camera distances 856 to 2122
```

The placed instance reads `LODLevel` 0 in the editor, so the NPC blueprint sets 2 at runtime. I did not read which logic sets it or whether it ever differs.

Runs A2 and B came from one PIE session, 1200 frames each. For B, Python called `set_anim_instance_class` on each NPC in the PIE world and every NPC then reported `ABP_AnimGenNPC_LOD2_C`. The level and the player's ABP were not changed.

| Stat, mean (p99), ms | A2: plugin ABP (LOD 2, period 0) | B: copy (LOD 2, period 4) |
|---|---|---|
| FrameTime | 17.00 (30.84) | 16.67 (16.68) |
| GameThreadTime | 9.66 (29.34) | 9.22 (12.18) |
| GPUTime | 4.45 (4.87) | 4.50 (4.93) |
| Exclusive/GameThread/Animation | 1.18 (1.47) | 1.18 (1.72) |
| AnimationParallelEvaluation/TotalTaskTime | 9.33 (10.95) | 8.54 (10.97) |
| AnimationParallelEvaluation/AverageTaskTime | 0.85 (1.00) | 0.78 (1.00) |

- A2 and B were measured under load. Task 1's `UnrealEditor-Cmd.exe` ran `-nullrhi` Runner automation tests throughout, as PIDs 2764 and then 3228, with CPU at 31 to 40%. No UBT or cook was running.
- TotalTaskTime fell 0.79 ms, about 8.5%, across 11 tasks. The player's task did not change, so the NPC-only saving is a bit larger. The one-off spikes in A2 are not a fair part of the comparison, so don't read the p99 gap as a gain from the period.
- With the copy, NPCs kept working: 41 targets reached in 62 seconds, 0 sample errors, poses changing with a mean of 5.4 to 11.9 cm between one-second samples.
- I could not read `EvaluationPeriodInFrames` from the running node from Python. The evidence that it applied is the compiled asset's value, the class swap and the time drop. The code path is `AnimNode_AnimGenController.cpp:401`.
- I did not run LOD 0, so this report has no figure for what LOD saves.

## 6. Git status

Status was captured before the plugin edit and again after the editor closed. `Unreal/PipelineSandbox.uproject` was already modified, so its edit adds no line. The only new line is the test folder.

```
$ diff git_status_before.txt git_status_after.txt
101a102
> ?? Unreal/Content/AnimGenTest/

$ git -C C:\Prod\PipelineSandbox status --short    (without the Environment_Kit and Docs lines: 111 lines in total)
 M Unreal/Config/DefaultEditor.ini
 M Unreal/Config/DefaultEngine.ini
 M Unreal/PipelineSandbox.uproject
?? Houdini/asset_containerBuilder_01.hiplc
?? Houdini/asset_containerBuilder_02.hiplc
?? Houdini/geo/export/SM_ShippingContainer_Blue_01.fbx
?? Houdini/scripts/verify_container.py
?? Houdini/tex/ShippingContainer_Blue_01/
?? Unreal/Content/AnimGenTest/
?? Unreal/Content/Houdini/Preview/
?? Unreal/Content/Houdini/Props/
?? Unreal/Content/ProjectRunner/
?? Unreal/Scripts/glitch_r2/
?? Unreal/Scripts/pr_build_glitch.py
?? Unreal/Scripts/pr_build_glitch_lab.py
?? Unreal/Scripts/ps_editor.py
?? Unreal/Scripts/ps_import_container.py
?? _ref/
```

## What I could not verify

- Motion quality. Numbers and one still show NPCs walking with changing poses. Nobody has watched the motion, so foot slide, stretching and style changes are unjudged.
- Cost with no NPCs, cost at LOD 0, and which part of the 0.85 ms per task is the network.
- The clean frame figures cover A1 only. A2 and B ran beside task 1's tests.
- The NPCs were not tested with any game mode other than `GM_AnimGenExample`.

## What task 5 must know

Level setup, read from the unedited level:

- 10 `AnimGenNPC_C` placed at Z 88, plus 44 `NavigationTarget_C` at Z 1 spread over X -1530 to 860 and Y -890 to 810. Targets hold only a scene and billboard component.
- NPCs have `AutoPossessAI = PLACED_IN_WORLD` and `AIControllerClass = DetourCrowdAIController`, so place them in the level, not spawned, or check possession.
- The NPC's name table shows it looks targets up through `GetAllActorsOfClass` and `FindNavigationTarget`, and targets have an `Occupied` variable. The current target is the `NavTarget` variable. I read this from the name table, not from the graph. I don't know the minimum target count per NPC. The example has 4.4 per NPC, so give 3 to 5 NPCs well more than one each.
- Nav: `NavMeshBoundsVolume` at the origin with extent 1850 x 1850 x 350, and `RecastNavMesh-Default` with agent radius 35, height 144, max slope 44, tile size 1000. Runtime generation is `Static`, so build the nav data in `L_TRK_02B_Market` and save it with the map. Check Runner's own navigation settings match, because I read these only from this level.
- NPCs show a floating text label for their style ("Slow", "NeutralMale" in the screenshot) and get a tinted material per NPC. `EnableDebugDraw` is False on the placed NPC and the labels still show. Expect them in Runner unless hidden.
- The NPC blueprint uses the player camera manager for its look-at. It worked with `AnimGenCharacter`. It has not been run with the GASP pawn.

Cost and setup:

- Plan on about 0.85 ms of worker-thread time per AnimGen character a frame on this PC. The node already runs LOD 2 at runtime, so period 4 is the remaining knob and gave about 8%.
- Runner's first launch after enabling takes about 5 minutes and adds about 4.9 GB under `Intermediate/PipInstall`. Check Runner's `.gitignore` covers it. `PipelineSandbox`'s rule is `Unreal/Intermediate/`.
- Expect one `LogMover` warning per NPC at each PIE start and the `BP_DebugDraw_AnimGenNPC` load error. Both appear in this passing run, so they are not failures on their own.

Tooling that worked:

- Python remote execution with `ue_remote.py`. The console command `csvprofile frames=N` writes per-frame numbers to `Saved/Profiling/CSV`. Skip `csvcategory`.
- Setting `bThrottleCPUWhenNotForeground` to False on `/Script/UnrealEd.Default__EditorPerformanceSettings` in memory before PIE. I did not test a run with throttling on.
- `shot showui` gives a viewport screenshot, overlay included.
- From a Python sampler, `get_immediate_move_destination()` and `get_move_status()` on the controller and `get_socket_transform(bone, RTS_COMPONENT)` on the mesh work on PIE actors.

PASS
