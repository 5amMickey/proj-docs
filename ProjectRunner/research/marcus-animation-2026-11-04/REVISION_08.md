# Marcus shoulders and stealth pose options

The saved `L_MarcusReview_02` contains the repaired walk and crouched idle in both playback rows. Three static pose options stand beside the quarter-speed crouched idle. There are now 13 Marcus actors.

The next decision is which pose to develop, A, B or C, or what to change in them. The poses have grounded contacts, but their jackets still intersect the pants. They are pose previews, not finished replacement idle loops. Automatic garment fitting produced distorted hems and was excluded from the delivered pose assets.

## Repairs

The walk clavicles rotate back by five degrees, moving the shoulder joints back roughly 1.5 cm. The head and feet retain revision 07 motion within 0.001 cm. This keeps the accepted head-bob correction.

The previous crouched idle inherited its knee planes from the moving crouch. Its left knee crossed inward even though both feet faced forward. The revised idle solves both knees forward over the feet and aligns the thigh and calf rolls with those bend planes. It retains the existing breathing motion and planted foot locations.

Twenty jacket morph corrections clear the repaired idle's thighs. These blend through the breathing cycle. The maximum rest-space correction is 1.82 cm. The new test mesh retains the earlier mesh geometry, weights and existing morph targets.

## Pose options

| Label in UE | Asset | Direction |
|---|---|---|
| A - Low | `A_Marcus_StealthLow_Test08` | More forward torso lean |
| B - Balanced | `A_Marcus_StealthBalanced_Test08` | A middle stance |
| C - Upright | `A_Marcus_StealthUpright_Test08` | A more upright torso |

The options use the owned `Male Crouch Pose.fbx` and `Female Crouch Pose (1).fbx`, with adjusted contacts and arm positions. The right knee is down on the camera side of the current review orientation. The left foot is flat, the rear foot rests on its toe, the right fingertips touch the floor and the left hand rests against the raised leg. The head looks forward. All three are static pose clips pending selection.

They occupy X = -660, -880 and -1100, Y = -650, beside the existing crouched idle. The review camera is wider to include them. The original idle, run and crouch-walk assets remain revision 06. Only the walk and crouched-idle actors change to revision 08, alongside the three new actors.

## Evidence and limits

Outputs are under `HoudiniSource/ProjectRunner/geo/rig/marcus_test_08`. Unreal assets are under `/Game/ProjectRunner/Animation/MarcusTest_08`.

- Unreal imported and saved all five revised/new clips and the test mesh. The mesh contains the 20 new idle morphs plus the earlier morph targets.
- `motion_contact_check.json` verifies matching loop endpoints, preserved limb lengths, forward-facing idle knees, collar attachment, the retained walk head motion and grounded pose contacts. Pose soles sit about 0.015 cm above the floor; the lowest knee surface and fingertip sit about 0.03 cm above it. The palm remains above the floor.
- `hem_import_check.json` checks the actual Unreal-exported geometry at 115 walk samples and 501 crouched-idle samples. Both have zero detected outer-jacket/pants crossings. The idle's morph curves evaluate through the complete cycle.
- `foot_geometry_check.json` checks the actual Unreal-exported shoe geometry for all five clips.
- `review_scene_check.json` verifies the saved and reloaded 13-actor level. `quarter_speed_simulation.json` verifies all five normal/quarter-speed pairs and the live crouch and crouched-idle garment curves.
- `pose_garment_check.json` records the unresolved jacket intersections in A, B and C. Their garment fit has not passed. Rejected corrections are not active in those assets.
- `verification_summary.json` separates the passed repair/contact checks from the incomplete pose garment fit and hashes the deliverables.
- `pose_comparison.html` shows the three options from front, side and three-quarter views. Its images come from the actual Unreal exports, under `review/`.

This is an isolated review-level pass. It does not change the player controller or verify gameplay transitions, slopes, a cook or a packaged build.

## Reproduction

Blender scripts are under `HoudiniSource/ProjectRunner/scripts/marcus_test_01`. Unreal scripts are under `Unreal/Scripts/marcus_test`.

1. Stop simulation and run `prepare_poses_08.py` through `pr_remote.py` to import and retarget the reference FBXs.
2. Run `build_motion_08.py` in background Blender, then `import_revision_08.py` through the Unreal remote helper.
3. Run `bake_hem_08.py` and `export_hem_08.py` in background Blender. The export requires the installed ARP add-on, so omit `--factory-startup` for that script.
4. Run `import_revision_08.py` again, then `verify_revision_08.py` and `render_revision_08.py` in background Blender.
5. Run `update_review_revision_08.py` and `verify_revision_08_scene.py` through the remote helper. The latter leaves simulation running. Run `package_revision_08.py` with Python after its callback completes.

`fit_pose_jacket_08.py` is an unsuccessful experiment. It is not part of the delivery sequence. Do not apply its output to the pose assets.
