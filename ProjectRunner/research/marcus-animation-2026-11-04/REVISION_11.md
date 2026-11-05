# Marcus D leg swap

Swapped D's legs so the right knee is down on the camera side and the left knee is raised on the far side. Preserved the approved arms, head, torso and pelvis. Moved the raised foot inward and narrowed the grounded knee placement to clear the hands.

The new clip is `/Game/ProjectRunner/Animation/MarcusTest_11/Review/A_Marcus_ReferenceHandsDown_Test11`. D is labelled **D - Camera-side knee down** in `/Game/ProjectRunner/Animation/MarcusTest_02/L_MarcusReview_02`.

The imported pose passes the ground-contact checks. Both shoes are within 0.016 cm of the floor, and the grounded knee and left fingertips are within 0.031 cm. Neither hand crosses the boots or pants. Upper-body matrices match revision 10 within floating-point error. Bone lengths and the static loop also pass. Rendered the actual Unreal FBX export from three angles to inspect the swapped stance.

The saved review level retains its 15 actors. Only D's animation and label changed. Existing jacket fitting remains unfinished.

Evidence is in `HoudiniSource/ProjectRunner/geo/rig/marcus_test_11/`: `motion_contact_check.json`, `review_scene_check.json`, `simulation_check.json`, `UE_ReviewReferenceHandsDown_11.fbx`, and `review/` renders.
