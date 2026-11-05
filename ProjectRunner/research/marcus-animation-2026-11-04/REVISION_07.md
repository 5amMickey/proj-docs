# Marcus walk collar motion

The walk now reduces the motion between the collar and head. Both walk actors in `/Game/ProjectRunner/Animation/MarcusTest_02/L_MarcusReview_02` use `A_Marcus_Walk_Test07`. The mesh, run, crouch, standing idle and crouched idle remain revision 06.

The collar is weighted entirely to `spine_05`, with no neck or shoulder influence. The previous head correction held the head steady fore/aft while the chest continued travelling 4.59 cm. This made the collar rock around the head and required large compensating neck rotations.

The new walk reduces chest fore/aft travel and chest yaw, then adjusts the neck to keep the head steady fore/aft. It retains vertical bob, the raised shoulders and the local arm, elbow and wrist motion. The spine and neck solve preserves bone lengths. Collar weights remain attached to the chest; an offline test of neck/head influence distorted the collar in crouch and was rejected.

## Verification

Unreal accepted and saved the new clip. Checks use Unreal-evaluated poses and an FBX exported from that clip with its preview mesh.

- Mean upper-rim excursion relative to the head fell from 4.863 cm to 1.485 cm, a 69.46 percent reduction. This measures the diagonal of each sampled rim vertex's motion bounds in head space, averaged over the rim.
- Head fore/aft range is 0.000101 cm. Vertical range is 4.598 cm, previously 4.431 cm.
- Evaluated foot and pelvis positions match revision 06 exactly. Maximum bone-length difference is 0.000122 cm. The loop endpoints match exactly.
- All 11 collar/coat seam pairs remain coincident through 115 whole- and half-frame samples of the imported geometry.
- The outer jacket has no detected crossings with the pants in those samples. The lowest shoe sole stays between 0.0107 and 0.0153 cm above the flat review floor.
- The saved and reloaded level retains all ten actors. Only the two walk asset references change. Live playback verifies every quarter-speed actor at one quarter of its matching normal-speed actor; the crouch morph curves still evaluate.

Proof is in `HoudiniSource/ProjectRunner/geo/rig/marcus_test_07/verification_summary.json`, with detailed collar, garment, ground-contact, saved-scene and live-playback results beside it. `UE_ReviewWalk_07.fbx` is the revised animation export. `review_UE_ReviewWalk_07.blend` and `review/ReviewWalk/` contain the imported inspection scene and renders.

## Reproduction

Background Blender scripts are under `HoudiniSource/ProjectRunner/scripts/marcus_test_01`: build with `revise_collar_motion_07.py`; verify with `verify_revision_07.py` and `verify_collar_motion_07.py`; render with `render_revision_07.py`.

Unreal scripts are under `Unreal/Scripts/marcus_test`: run `import_revision_07.py` through `pr_remote.py` with simulation stopped, followed by `update_review_revision_07.py` and `verify_revision_07_scene.py`. The last script leaves simulation running. Run `package_revision_07.py` with Python after the playback check completes.

This pass addresses the walk shown in the feedback. Visual approval is still the user's decision. It does not verify gameplay transitions, slopes or a packaged build.
