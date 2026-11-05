# Marcus motion test, 2026-11-04

Mike's motion review is next. The limited trial has a new short-coat rig and three imported, looping clips. These are test assets. The production character, shared skeleton, default maps, and movement controller have not been replaced.

Watch [the ten-second Unreal recording](C:/Prod/ProjectRunner/refs/wip/marcus_test_01/marcus_walk_run_crouch_test01.mp4). It shows three-quarter views, then side views. The material is temporary clay. This is a rendered review of the imported assets, not a recording of the player controller.

Open `/Game/ProjectRunner/Animation/MarcusTest_01/L_MarcusReview_01` in Unreal and simulate to see the three loops. The scene is saved with a camera and labels. The original `L_AnimTest` is unchanged.

## What the test found

- Blender's native FBX export preserved the reference skeleton numerically, but Unreal rejected its bind pose and rebuilt it. The installed ARP FBX exporter resolved that warning and passed the same independent comparison. Use the recorded ARP export settings for this trial.
- Aligning Marcus's target pose to Mixamo caused a visible shoulder collapse. Keeping Marcus's fitted target pose and aligning the Mixamo source pose resolved that collapse in the reviewed clips. This is a reproduced failure in this trial, not proof that every earlier arm problem had the same cause.
- Mixamo has a hips root. The retargeted root carried hip height and rotation. The in-place conversion now puts body motion on the pelvis, removes horizontal travel, and leaves a stationary ground root. It preserves hip sway and body height.
- The old trig-driven animation was not reused. The review uses performances from the downloaded Mixamo files.

## Deliverables

| Item | Location |
|---|---|
| Blender rig with ARP controls | `HoudiniSource/ProjectRunner/geo/rig/marcus_test_01/marcus_controls_01.blend` |
| Deformation rig and separate mesh parts | `geo/rig/marcus_test_01/marcus_fitted_01.blend` |
| Mesh FBX | `geo/rig/marcus_test_01/SKM_Marcus_Short_01.fbx` |
| Review animation FBXs, with preview mesh | `geo/rig/marcus_test_01/UE_ReviewWalk_01.fbx`, `UE_ReviewRun_01.fbx`, `UE_ReviewCrouch_01.fbx` |
| Unreal review clips | `/Game/ProjectRunner/Animation/MarcusTest_01/Review/A_Marcus_{Walk,Run,Crouch}_Test01` |
| Blender scripts | `HoudiniSource/ProjectRunner/scripts/marcus_test_01/` |
| Unreal scripts | `ProjectRunner/Unreal/Scripts/marcus_test/` |

The rig uses a fresh Manny deformation skeleton, fitted to Marcus. Earlier body reference positions supplied starting landmarks. No old coat joints, constraints, animation, or skin weights were reused. Skinning transfers from a fitted Manny reference cage, with separate treatment for the collar, head, and lower short coat. ARP controls remain separate from the export skeleton. The saved controls start in FK; their neutral evaluated pose passes the comparison.

| Review clip | Source | Playback rate | Nominal travel speed |
|---|---|---:|---:|
| Walk | `mixamo/Walking.fbx` | 0.85 | 146 cm/s |
| Run | `running.fbx` in `Locomotion Pack.zip` | 0.85 | 375 cm/s |
| Crouch | `mixamo/Crouched Walking.fbx` | 0.65 | 93 cm/s |

These speeds come from source travel. They are starting values for gameplay validation, not approved controller settings. Unreal stores the playback-rate adjustment on each animation asset. The FBXs retain the source timing; apply the listed rates when reviewing them elsewhere.

## Verification

Evidence files below are in `HoudiniSource/ProjectRunner/geo/rig/marcus_test_01/`.

- `roundtrip_check.json` passes. The unchanged reference imports with all 89 mesh bones, matching hierarchy, scale, and local transforms.
- `marcus_bind_check.json` passes. Marcus's imported mesh, exported back from Unreal, matches the source vertices within 0.000009 cm. The largest joint-position discrepancy is under 0.000074 cm. This checks the fitted mesh independently of the old shared skeleton.
- `marcus_controls_check.json` and `marcus_control_evaluation.json` pass. Controls preserve all 88 original Blender bones. Unreal adds the armature object as the ground root, producing 89 bones.
- `review_clips.json` records stationary-root assertions and loop seams. Walk and run seams are effectively identical. Crouch's largest sampled seam difference is 0.25 cm and 0.68 degrees at the right foot.
- `foot_geometry_check.json` checks the exported shoe geometry over every frame. Small constant height adjustments remove floor penetration. This does not prove planted-foot contact during gameplay travel.
- `ue_capture.json` records 300 rendered frames and changing component poses. The H.264 recording is 1600 by 700, 30 fps, ten seconds, and passes a full FFmpeg decode.
- `simulation_check.json` passes. All three saved actors played, advanced animation time, and changed pose in Unreal simulation over 228 samples.
- `saved_scene_check.json` passes after saving and reloading the map. All three animation assignments and loop/play flags persist. `verification_summary.json` collects the results and deliverable hashes. `marcus_import_excerpt.txt` records the successful bind-pose import without reconstruction.

The successful checks ran through the open Runner editor using `Unreal/Scripts/pr_remote.py`. Blender checks ran in background Blender 5.2.2. Unreal is 5.8.4. No cook or packaged-build result is claimed.

The connected Blender session still has the original `charCastMain-03_toRig.blend` open, with no armatures and no unsaved changes. The test files were built in separate background sessions.

## Next gate

Approve or adjust the casual walk, run intensity, and crouch posture. Then match standing and crouch idles, clean planted contacts at the selected speeds, and test starts, stops, reversal, walk/run blends, crouch entry/exit, and blocked uncrouching with the actual character capsule.

The downloaded crouch idle sits much lower than the selected moving crouch. It needs replacement or pose cleanup before blending. The long coat, Chaos, props, camera-facing body bias, movement locking, cast propagation, and production promotion remain outside this completed trial.
