# Marcus stop and transition corrections

2026-11-05. Mike reported rough transitions and a foot losing floor contact around the stopped crouch idle.

## Cause

The previous proxy corrected root height using the lower of the two soles. Its geometry check used that same minimum, so it passed while the other foot floated. The old runtime capture shows the higher sole about 11 cm above the floor in the crouch-idle blend, and nearly 12 cm during standing up. The 0.35-second stopped delay also held a crouch-walk pose before the kneel began.

## Change

The proxy now checks each shoe independently while stopped. It uses two-bone leg IK after the normal AnimBP to bring the higher sole down. The knee follows its animated bend direction, limb lengths remain unchanged, and the foot correction fades out when movement resumes. The supporting sole levels to the floor. The foot under the lowered knee can roll onto its toes. The existing root correction still preserves the run's flight phase.

The crouch idle delay is 0.05 seconds. Entry into the kneel blends over 0.65 seconds, return to movement over 0.35 seconds, and standing up over 0.55 seconds. BlendSpace sample weights now ease toward their targets, reducing abrupt changes between idle, walk and run. The approved clips, faster crouch speed, mirroring and garment corrections remain the source assets.

`MarcusPlayable_03` contains the new AnimBP and two BlendSpaces. It references the existing revision02 mesh, skeleton and clips. `APRCharacter` selects the revision03 AnimBP. The playable map remains `/Game/ProjectRunner/Animation/MarcusPlayable_01/L_MarcusPlayable`.

## Verification

The isolated build passes 54 locomotion assertions and 53 G1 Truth assertions. The final contact check evaluates 1,078 poses, capturing every evaluated frame around stops, reversals, kneeling and standing. Once the stationary correction has blended in, both soles stay within 0.17 cm of the floor. The supporting sole's sampled height spread is below 0.30 cm. Fingertip contact remains within 0.19 cm, and measured leg lengths remain unchanged.

The Windows cook passes with zero errors and zero warnings. Visual inspection uses rendered UE bone transforms and morph weights through the kneel and stand transitions. The main project also passes 54 locomotion assertions and contact checks across 1,073 poses. Its reopened live player uses revision03 with stationary foot planting enabled, 0.05-second idle delay and the same faster crouch speed. Evidence is in [PLAYABLE_REVISION_03_VERIFICATION.json](PLAYABLE_REVISION_03_VERIFICATION.json). The editor is left in Play mode for Mike's visual review.

The earlier jacket intersection test covered the settled idle only. This pass also samples its intermediate blends. Small existing coat/pants crossings remain during the middle of the kneel blend, with fewer intersecting triangle pairs in the new capture. They are recorded separately from the foot-contact pass and are not claimed fixed. This correction addresses vertical contact on flat ground. It is not terrain IK or horizontal foot locking, and the transitions still use pose blending rather than authored entry/exit clips.

## Evidence and reproduction

Scripts are under `Unreal/Scripts/marcus_playable`. `build_revision_03.py` creates the assets. `check_revision03.py` measures each sole, sole angle, fingertips and limb lengths from the runtime capture. `render_revision03.py` renders the transition poses. `publish_revision03.py` checks the gameplay, contact and cook reports before publishing the three assets. `verify_live_revision03.py` checks the controlled player after reopening the main editor.

The earlier capture is retained at `Unreal/Saved/MarcusPlayableBuild/revision02_baseline_runtime.json`. The new logs, renders and full contact report are under `Unreal/Saved/MarcusPlayableBuild`. UE automation and cooking run sequentially to avoid the asset-registry cache collision found in the previous pass.

The IK call was checked against UE 5.8's `AnimationCore/Public/TwoBoneIK.h` and its implementation. BlendSpace sample-weight smoothing follows Epic's [Blend Spaces documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine/blend-spaces-in-unreal-engine).
