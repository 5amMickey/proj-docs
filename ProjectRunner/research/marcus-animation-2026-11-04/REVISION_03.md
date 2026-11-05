# Marcus neck and run revision

The existing Unreal map `/Game/ProjectRunner/Animation/MarcusTest_02/L_MarcusReview_02` now uses revision 03 in both the normal and quarter-speed rows. Use Simulate to inspect the changes. Actor positions, the camera, materials, and playback multipliers are retained.

## Neck

The face, jaw, ears, and skull stay rigid to `head`. Only the throat and nape patch blends through the neck joints. A topology mask separates this patch from the jaw, which sits lower than some neck vertices and cannot be isolated by height alone.

There are 414 rigid head vertices and 56 neck vertices. Sixteen vertices at the lower neck seam use the same weights as their matching chest vertices. This keeps the neck attached to the chest during head movement. The transition inside the neck is smoothed while keeping the head and chest boundaries fixed.

The Unreal-exported mesh passes the weight comparison at all 470 source vertices. No face or jaw vertices acquire neck influence. Bone reference transforms and mesh topology are unchanged.

## Run

The run retains its average lean and timing. Pelvis pitch variation is reduced to 65% of its prior amount. Spine, neck, and head pitch variation is reduced to 45%. The existing pelvis bounce is increased by 25%, preserving its phase. The legs are solved back to their original ankle transforms without stretching, and toe motion is retained.

The resulting head travel forward and back is about 5.0 cm, down from 9.9 cm. Pelvis vertical travel is 11.2 cm, up from 8.9 cm. Head vertical travel increases more modestly, to 11.5 cm from 10.5 cm, because reducing torso rocking also changes its vertical arc. These are component-space ranges measured over the same loop.

Walk and crouch motion are unchanged. All clips use the corrected neck weights, and the earlier sleeve, seat, and crouch-height corrections remain.

## Deliverables and proof

Rig files are in `HoudiniSource/ProjectRunner/geo/rig/marcus_test_03/`:

- `marcus_controls_03.blend` and `marcus_fitted_03.blend` contain the corrected mesh weights.
- `SKM_Marcus_Short_03.fbx` is the revised mesh export.
- `UE_ReviewWalk_03.fbx`, `UE_ReviewRun_03.fbx`, and `UE_ReviewCrouch_03.fbx` contain the Unreal-exported clips and preview mesh.
- `review_UE_Review{Walk,Run,Crouch}_03.blend` contains imported motion previews. Closeups are in `review/`.

Unreal assets are under `/Game/ProjectRunner/Animation/MarcusTest_03/`. Earlier assets remain available. The review map keeps its existing `L_MarcusReview_02` name.

Verification passed in Blender 5.2.2 and Unreal 5.8.4:

- `head_neck_import_check.json` confirms the anatomical mask and imported weights. Maximum weight error is below 0.000022.
- `marcus_bind_check.json` confirms unchanged reference transforms, hierarchy, and mesh positions after import.
- `review_clips.json` confirms the run's foot transforms are preserved to within 0.001 cm, with walk and crouch poses unchanged. Loop seams remain within the previous limits.
- `run_motion_revision.json` records motion ranges and the analytic leg solve. The legs retain their segment lengths.
- `foot_geometry_check.json` confirms exported shoe geometry stays above the review floor. It does not prove planted contact during player travel.
- `marcus_control_evaluation.json` confirms the saved ARP rig remains neutral.
- `review_scene_check.json` confirms all six saved actors use revision 03 and retain their positions and speeds after reload.
- `quarter_speed_simulation.json` confirms all six actors play and the slow row advances at one quarter of the normal row's speed.

The motion corrections are baked into these clips. The scripts in `HoudiniSource/ProjectRunner/scripts/marcus_test_01/` and `ProjectRunner/Unreal/Scripts/marcus_test/` ending in `_03.py` reproduce the revision. The interactive Blender file was not replaced or saved. No gameplay-controller, transition, or packaged-build result is claimed.
