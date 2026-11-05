# Marcus walk posture, collar seam, and level recovery

The saved review level survived the crash. It is `/Game/ProjectRunner/Animation/MarcusTest_02/L_MarcusReview_02`, on disk at `C:/Prod/ProjectRunner/Unreal/Content/ProjectRunner/Animation/MarcusTest_02/L_MarcusReview_02.umap`. The reopened editor uses the Documents project junction, which resolves to the same `C:/Prod/ProjectRunner/Unreal` project. The level was loaded and selected in the Content Browser.

Both rows now use revision 05. The level is saved, with the 1x and 0.25x playback settings retained. Simulation was verified and left running for inspection.

## Walk changes

- Raised the shoulders through clavicle rotation by about 1.8 to 2.0 cm.
- Reduced the chest's forward thrust. The upper chest sits about 1.5 cm farther back, with reduced pitch variation.
- Removed the head's forward/back travel and pitch nod while preserving yaw, roll, and vertical bob. The neck rotations accommodate this without changing neck-segment lengths.
- Preserved pelvis and foot motion. Run and crouch animation are unchanged.

The imported walk's head varies by less than 0.001 cm forward/back and retains about 4.4 cm of vertical motion. Its loop closes within 0.001 cm at the head.

## Collar seam

Matching weights stopped the previous animation-driven separation, but the collar and coat still had separate open boundaries. This revision adds a narrow physical bridge between the coat neckline and the collar's outer base.

The bridge adds 11 vertices and 24 triangles to the coat. Original mesh positions are unchanged. The added boundary vertices coincide with the collar base and share its weights. The bridge closes all 14 original coat neckline edges and joins all 10 outer collar-base edges with consistent face winding. Its UVs follow the coat neckline.

Checks on the Unreal-exported clips confirm the coincident boundary vertices stay together throughout walk, run, and crouch. Closeups are saved under `geo/rig/marcus_test_05/review/`.

## Files and proof

New files are in `HoudiniSource/ProjectRunner/geo/rig/marcus_test_05/`:

- `marcus_controls_05.blend`, `marcus_fitted_05.blend`, and `SKM_Marcus_Short_05.fbx` contain the bridged coat.
- `UE_ReviewWalk_05.fbx`, `UE_ReviewRun_05.fbx`, and `UE_ReviewCrouch_05.fbx` contain the imported clips and revised preview mesh.
- `walk_import_check.json` verifies head stabilization and the loop after import.
- `bridge_topology_check.json` and `collar_import_check.json` verify the closed attachment, face winding, weights, and coincident edges through motion.
- `head_neck_import_check.json`, `marcus_bind_check.json`, and `marcus_control_evaluation.json` confirm head/neck weighting, reference transforms, mesh positions, and neutral controls.
- `review_clips.json` and `foot_geometry_check.json` check preserved foot transforms, unchanged run/crouch poses, loop seams, and floor clearance.
- `review_scene_check.json` verifies all six saved actors and playback rates after reload.
- `quarter_speed_simulation.json` verifies playback and the quarter-speed ratio in simulation.
- `verification_summary.json` records the combined checks and deliverable hashes.

Unreal assets are under `/Game/ProjectRunner/Animation/MarcusTest_05/`; the review map keeps its existing name. Earlier assets and the interactive Blender file remain available. The scripts ending in `_05.py` reproduce this revision.

The idle editor viewport did not advance animation during a preview probe, recorded in `editor_preview_check.json`. Simulation supplied the playback proof instead. The prior crash log reports an `IsInGameThread()` assertion in `SceneViewport.cpp` while ending play. This revision restores the level; it does not claim to fix that engine crash. The playback check leaves simulation running and does not perform an automatic teardown.

`Unreal/Scripts/pr_remote.py` now matches the resolved project directory as well as its name, so a second project copy with the same name cannot receive the commands by accident. Junctions to this project remain supported.
