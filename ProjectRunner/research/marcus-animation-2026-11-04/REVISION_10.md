# Marcus D arm placement

Moved D's right arm back, using the held crouch walk's arm shape as the starting point. The left fingertips and kneeling stance remain in place. D is still a static pose study; its existing jacket intersections need fitting.

The Unreal clip is `/Game/ProjectRunner/Animation/MarcusTest_10/Review/A_Marcus_ReferenceHandsDown_Test10`. The existing review map is `/Game/ProjectRunner/Animation/MarcusTest_02/L_MarcusReview_02`, with D labelled **D - Right arm back**.

Verified the imported pose and rendered the FBX exported from Unreal from three angles. The right wrist moved backward 15.58 cm and the fingertips clear the floor by 3.46 cm. Left fingertip clearance remains 0.03 cm. Changes to the stance mesh are under 0.00004 cm, within floating-point error; bone lengths and the static loop also pass.

Saved and reloaded the 15-actor review level. Only D's assigned animation and its label changed. Simulation verifies D plays the new clip. Other poses and the normal/quarter-speed rows retain their saved assets and rates.

Evidence is in `HoudiniSource/ProjectRunner/geo/rig/marcus_test_10/`: `motion_contact_check.json`, `review_scene_check.json`, `simulation_check.json`, `UE_ReviewReferenceHandsDown_10.fbx`, and the `review/` renders.
