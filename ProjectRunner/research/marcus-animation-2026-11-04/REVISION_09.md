# Held crouch and drawing-based pose studies

The current crouched idle now holds a frame from the existing crouch walk. It has no added breathing or repositioned feet. Two new static studies, D and E, are saved in front of the previous A-C row in `L_MarcusReview_02`. The earlier assets remain available. There are 15 review actors.

The reference note called the drawing with the X the right image, while the attachment places it on the left. A clarification was requested. With no reply during this pass, the delivered interpretation is D from the left drawing with both hands down, and E from the right drawing as drawn. This interpretation and the pose anatomy still need user review.

## Held crouch

`A_Marcus_CrouchIdle_Test09` holds zero-based key 9 from `A_Marcus_Crouch_Test06`. The original foot positions are staggered by about 56.7 cm fore/aft. Its bone keys come directly from the saved local keys used to build the crouch walk, and its matching jacket morph, `Hem_Crouch_009`, remains at one throughout the clip. All other float curves were removed from this new isolated asset.

The initial curve edits through AnimationLibrary did not replace the inherited curves correctly. The final import uses `AnimationDataController.remove_all_curves_of_type`, `add_curve` and `set_curve_keys`. The actual Unreal export then passed the jacket intersection check. Live playback separately confirms `Hem_Crouch_009` stays at one and `Hem_Crouch_000` stays at zero.

Both existing crouched-idle actors use the held pose, at their existing normal and quarter rates. The standing idle, walk, run and crouch walk remain unchanged.

## Reference studies

- D, `A_Marcus_ReferenceHandsDown_Test09`, follows the left drawing. The left knee is lowered, the right foot is planted and both hands rest on their fingertips. The hands are separated from the knee and planted boot.
- E, `A_Marcus_ReferenceKneel_Test09`, follows the right drawing. The right knee is lowered, the left foot is planted, the left forearm rests over the raised leg and the right hand lies over the lowered thigh.

The studies use the fitted skeleton's reference bend planes for the arms and legs. They do not blend the earlier male/female retargeted limb rotations. The tucked boots point behind the body. The torso and shoulder alignment is rebuilt from the reference skeleton.

D and E are at X = -660 and -880, Y = -1050, in the review level. Their labels explicitly identify them as studies. They are not finished replacement idle animations. The existing coat still intersects the pants in these deep poses, with 43 and 47 outer jacket triangles detected respectively. No distorted automatic garment corrections are applied.

## Verification

Evidence lives in `HoudiniSource/ProjectRunner/geo/rig/marcus_test_09`.

- Unreal imported and saved the three clips on the existing revision 06 mesh.
- `motion_contact_check.json` verifies that the held idle matches the source local key, the studies preserve limb lengths and loop endpoints match. The grounded knee surfaces and D's fingertips sit about 0.03 cm above the floor.
- `foot_geometry_check.json` verifies the actual Unreal-exported shoes, with lowest-sole heights about 0.015 cm above the floor.
- `hem_import_check.json` verifies the held crouch's actual Unreal-exported geometry with the frozen morph. It has no detected outer-jacket/pants crossings over all 63 samples.
- `review_scene_check.json` verifies the saved, reloaded 15-actor review level. `quarter_speed_simulation.json` verifies all five playback pairs and the held idle's live morph value.
- `verification_summary.json` records passed import/contact checks separately from the unapproved pose anatomy and incomplete study jacket fit.
- `reference_comparison.html` shows front, side and three-quarter views rendered from the actual Unreal exports. The imported Blender review scenes and FBXs sit beside it.

Contact and length checks alone do not establish that a pose looks anatomically right. This distinction matters because the earlier C pose passed those checks but was rejected visually. D and E have been inspected from front, side and three-quarter views, and remain subject to user review.

## Reproduction

Run `build_motion_09.py` in background Blender. Stop Unreal simulation and run `import_revision_09.py` through `Unreal/Scripts/pr_remote.py`. The importer reads the source crouch's saved raw local keys for the held pose and replaces its curves through the animation controller.

Run `verify_revision_09.py` and `render_revision_09.py` in background Blender. Run `update_review_revision_09.py` and `verify_revision_09_scene.py` in Unreal, then `package_revision_09.py` with Python after the live callback completes. The review remains in simulation.
