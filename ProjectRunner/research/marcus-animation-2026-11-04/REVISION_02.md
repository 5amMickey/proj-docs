# Marcus motion test 02

Review the sleeve deformation, seat shape, and lower crouch in [the updated Unreal recording](C:/Prod/ProjectRunner/refs/wip/marcus_test_02/marcus_walk_run_crouch_test02.mp4). It shows three-quarter views followed by side views. These are imported review assets; player movement and transitions still need their own test.

## Changes

- The complete head mesh is weighted 100% to `head`. The former height-based neck blend reached into the jaw. There are no facial influences on this mesh.
- Existing upper-arm twist helpers now distribute axial rotation. Forearm helpers distribute wrist roll. Elbow sleeve weights have a continuous transition, and cuffs no longer receive finger weights. The main arm and hand trajectories are preserved.
- The rear seat of the pants has stronger pelvis weighting, with a smooth transition into the upper thighs. This retains more of the seat during the crouch. No corrective bone was added. Review this result before adding a pose-specific correction for deeper bends.
- The moving crouch is 6 cm lower at the pelvis. A two-bone leg solve preserves the original ankle and toe transforms without stretching the legs. Walk/run body heights and all playback rates are unchanged.

The sampled arm poses did not show a bone-axis flip. The test did reveal undriven twist helpers, uneven sleeve weights, and finger influence on the cuffs. Changing the fitted bone axes was unnecessary for this revision.

## Files

All new rig outputs are under `HoudiniSource/ProjectRunner/geo/rig/marcus_test_02/`:

- `marcus_controls_02.blend`: established ARP controls with revised mesh weights.
- `marcus_fitted_02.blend`: revised deformation mesh and unchanged fitted skeleton.
- `SKM_Marcus_Short_02.fbx`: mesh export through the installed ARP exporter.
- `UE_ReviewWalk_02.fbx`, `UE_ReviewRun_02.fbx`, `UE_ReviewCrouch_02.fbx`: revised animation exports from Unreal, including the preview mesh.
- `review_UE_Review{Walk,Run,Crouch}_02.blend`: imported animation previews.

Unreal map: `/Game/ProjectRunner/Animation/MarcusTest_02/L_MarcusReview_02`.

The saved map now includes a second row labelled `0.25x` for slow inspection. The original row plays at `1x`. Both rows use the same animation assets; the slow row uses a component playback multiplier of 0.25. The review camera frames both rows at equal size. Open the map and use Simulate to inspect the loops. Move the editor camera closer as needed.

`quarter_speed_row.json` confirms all six saved actors retain their animation, loop flag, and playback multiplier after reloading. `quarter_speed_simulation.json` records 280 simulation samples and measured slow-to-normal animation-time ratios of 0.25000004 for walk, 0.25000013 for run, and 0.25000002 for crouch. The earlier ten-second recording shows the original three-actor layout. Use `add_quarter_speed_row.py` and `verify_quarter_speed_row.py` for this six-actor setup; the earlier capture scripts target the three-actor layout.

Unreal mesh: `/Game/ProjectRunner/Animation/MarcusTest_02/Mesh/SKM_Marcus_Short_02`.

Unreal clips: `/Game/ProjectRunner/Animation/MarcusTest_02/Review/A_Marcus_{Walk,Run,Crouch}_Test02`.

The mesh uses the isolated test-01 skeleton because its hierarchy and reference transforms are unchanged. The corrections are baked into the new clips. New retargeted clips must pass through the same correction step; this is not a runtime twist solver or a change to the ARP controls' behavior.

## Verification

Evidence is saved beside the rig outputs.

- `head_weight_check.json`: all 470 source head vertices and 922 triangles identified in the Unreal export. All 2,094 split head vertices have only head-joint influence. The check distinguishes torso vertices at the shared neck seam by face membership.
- `marcus_bind_check.json`: imported mesh positions differ by at most 0.000009 cm; joint positions by less than 0.000074 cm. Hierarchy and reference rotations pass.
- `review_clips.json`: crouch pelvis lowered exactly 6 cm at every sampled frame. Maximum foot-position difference from test 01 is below 0.00011 cm. The existing small crouch loop seam remains below 0.25 cm and 0.7 degrees at the feet.
- `arm_motion_check.json`: main arm positions and rotations preserved, apart from the requested crouch height change. Twist helpers remain continuous across frames and loop boundaries.
- `foot_geometry_check.json`: exported shoe geometry remains above the review floor through all sampled frames. This does not establish planted contacts during player travel.
- `marcus_control_evaluation.json`: the saved control rig still evaluates to the fitted neutral pose.
- `saved_scene_check.json` and `simulation_check.json`: the new map saves, reloads, and plays all three animations in Unreal simulation.
- `ue_capture.json`: 300 rendered frames. The ten-second, 1600 × 700, 30 fps H.264 recording passes a full FFmpeg decode.
- `verification_summary.json`: combined results and deliverable hashes.

Checks ran with background Blender 5.2.2 and the open Unreal 5.8.4 Runner editor. The scripts are in `HoudiniSource/ProjectRunner/scripts/marcus_test_01/` and `ProjectRunner/Unreal/Scripts/marcus_test/`, with revision scripts ending in `_02.py`.

The interactive Blender session has `marcus_controls_01.blend` open with unsaved changes. This revision was built in background sessions and did not load over or save that interactive file. Test-01 deliverables remain available for comparison. Production assets, gameplay movement, cloth, and packaging are outside this revision.
