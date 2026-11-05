# Marcus collar and arm revision

Both rows in `/Game/ProjectRunner/Animation/MarcusTest_02/L_MarcusReview_02` now use revision 04. The normal and quarter-speed rows retain their positions, camera, materials, and playback rates. Use Simulate to review the corrected collar attachment, elbow direction, and run pose.

## Elbow diagnosis

The right-arm problem is introduced by retargeting. The original `anim/mixamo/Walking.fbx`, evaluated directly in Blender, agrees with Unreal's imported source animation. Elbow flexion differs by less than 0.00006 degrees between those evaluations. The source elbow points backward and slightly outward; Marcus's retargeted right elbow turns inward. The left arm tracks the source much more closely.

Comparing elbow planes in the characters' body frames isolates this from character scale, placement, and camera direction. Before correction, the right elbow's plane differs from the projected source plane by up to about 74 degrees in the walk, 40 degrees in the run, and 58 degrees in the crouch. The earlier twist-helper pass improved skin deformation but did not correct this main-joint bend-plane error.

The new pass reconstructs the right elbow direction from the source performance. Walk and crouch retain the wrist position and orientation. Main arm segment lengths remain fixed. The existing twist helpers are recalculated from the corrected arm frames. All three imported clips pass a source-plane comparison within 0.1 degrees and remain continuous across the loop.

This is a repeatable correction baked into the test clips, not a change to the fitted bone reference axes. The existing auto-aligned retargeter asset has not been changed. New clips need this correction step or an equivalent retarget-pose fix before use.

## Collar and run edits

Twenty-six coat neckline vertices now copy the collar base weights exactly. A smooth falloff reaches 47 coat vertices in total. The collar and the attachment strip follow `spine_05`, removing their former difference in spine, neck, and clavicle influences. Mesh positions are unchanged.

The attachment was checked through every frame of the Unreal-exported clips. Relative vertex-pair distance changes stay below 0.000025 cm. This measures animation-driven separation; it does not weld the separate meshes or alter their rest geometry.

The run has a small shoulder counter-motion, driven by the arm swing. Each shoulder moves at most about 1.6 cm. The right elbow bends an additional 12 degrees, bringing the forearm upward as requested in the side-view reference. The previous body bounce, head/neck treatment, foot trajectories, and timing are preserved.

## Deliverables and verification

Files are under `HoudiniSource/ProjectRunner/geo/rig/marcus_test_04/`:

- `marcus_controls_04.blend`, `marcus_fitted_04.blend`, and `SKM_Marcus_Short_04.fbx` contain the revised coat weights.
- `UE_ReviewWalk_04.fbx`, `UE_ReviewRun_04.fbx`, and `UE_ReviewCrouch_04.fbx` contain the corrected Unreal clips and preview mesh.
- `review_UE_Review{Walk,Run,Crouch}_04.blend` and `review/` contain imported motion previews and collar closeups.

Unreal assets are under `/Game/ProjectRunner/Animation/MarcusTest_04/`. Earlier versions remain available. The review map keeps its existing `L_MarcusReview_02` name.

Evidence files:

- `source_fbx_check.json` compares the original walking FBX with Unreal's source import.
- `elbow_diagnosis.json`, `arm_revision.json`, and `elbow_plane_check.json` record the diagnosis and correction.
- `collar_import_check.json` verifies imported coat/collar weights and attachment stability through motion.
- `head_neck_import_check.json` confirms the previous face and neck weights remain correct.
- `marcus_bind_check.json` and `marcus_control_evaluation.json` confirm reference transforms, mesh positions, hierarchy, and neutral controls.
- `review_clips.json` checks body and foot preservation, arm continuity, and loop seams.
- `foot_geometry_check.json` checks floor clearance. Gameplay foot planting remains outside this review.
- `review_scene_check.json` and `quarter_speed_simulation.json` verify the six saved actors and the playback ratio.
- `verification_summary.json` collects the results and deliverable hashes.

Scripts ending in `_04.py` are in `HoudiniSource/ProjectRunner/scripts/marcus_test_01/` and `ProjectRunner/Unreal/Scripts/marcus_test/`. They run with Blender 5.2.2 and Unreal 5.8.4. The interactive Blender scene, production controller, and gameplay assets are unchanged.
