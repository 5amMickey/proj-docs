# Marcus animation recovery plan

2026-11-04. Mike approved the limited trial with "Proceed with this test". The trial is ready for motion review. See [the test report](TEST_REPORT.md) for the rig, three clips, Unreal recording, and verification. Gameplay integration remains pending. Deadline is 2026-11-05, Asia/Tokyo. The exact delivery hour is unspecified.

Mike wants a casual walk, a cautious crouch/sneak, and a normal run bordering on a jog. Panicked movement and sprinting come later. This proposal reopens the earlier formula-authored locomotion decision, as requested. It does not change the project brief or approve a GASP restoration.

## Recommendation

Prove one Marcus body with the short coat, one stable export skeleton, and an existing natural walk. Then deliver walk, jog, crouch-walk, standing idle, and crouch idle. Review the actual side-on gameplay, including starts, stops, direction changes, and crouch transitions. Treat long-coat simulation as a separate test after the body passes.

Keep Marcus's meshes. Rebuild the deformation skeleton and weights only where the controlled test shows they are needed. Start the clean-rig trial from a genuine Manny skeleton, preserve its joint frames, and use ARP for controls. Do not regenerate a skeleton and assume that Manny bone names make it compatible.

Use downloaded motion first. GASP clips are another source option without restoring its whole controller. Epic explicitly documents migrating or exporting the sample's Animation Sequences. A full GASP restoration remains a separate fallback decision. [Epic, Game Animation Sample](https://dev.epicgames.com/documentation/en-us/unreal-engine/game-animation-sample-project-in-unreal-engine)

## What the files establish

The observations below are fresh unless identified as historical. They establish defects and risks, but do not isolate every cause of the reported broken arms.

- The connected Blender is 5.2.2 LTS. `geo/source/charCastMain-03_toRig.blend` has no armatures, actions, or Marcus vertex groups. It is a clean mesh source. `cast_marcus_coat_02_body` is the visible short coat. The long coat is `cast_marcus_coat_01_body`; the collar is separate. Source object scales are identity. See [open-scene-audit.json](open-scene-audit.json).
- Background inspection of `geo/rig/charCast_Marcus_arp_08_coat.blend` found a rig with control, helper, and deformation bones. Its six coat-tail bones are single long bones whose pivots coincide with the left or right hip joint. They aim toward thigh-carried helpers. This makes their motion depend on the legs. Collar halves copy clavicle rotation and the flap bones have no constraints. See [previous-rig-audit.json](previous-rig-audit.json).
- The inspected skinned meshes have Preserve Volume disabled. A dual-quaternion versus linear-skinning mismatch is therefore not supported as the explanation for this saved rig.
- Binary inspection confirms the old skeletal and walk FBXs contain the `cc_` coat, collar, and body-corrective bones. They were not simply omitted from export. This inspection does not establish whether every corrective track is animated correctly. See [fbx-audit.json](fbx-audit.json).
- Historical `Unreal/Saved/pr_rig_check.json`, dated November 2, reports `can_share_manny_animations: false` for Marcus. The current test in `Unreal/Source/RunnerSandbox_01/Private/Tests/PRRigCheckTest.cpp` asserts skeleton assignment, but does not fail on the reported orientation or hierarchy differences. It checks selected left-side limbs, omits the right-side equivalents and finger chains, and compares against the shared `SK_PR_Human` reference, not a newly verified independent Manny source. A passing run cannot prove direct playback compatibility.
- `HoudiniSource/ProjectRunner/scripts/blender_arp/arp_loco.py` builds poses from periodic formulas and keys each frame. Its checks measure joint height and IK reach. They do not assess weight transfer, silhouette, rhythm, or performance. `Tests/cascadeur_walk_test.py` likewise generates per-frame controller targets.
- `Unreal/Source/RunnerSandbox_01/Private/PRCharacter.cpp` plays speed-based Blend Spaces through `AnimationSingleNode`, without a main AnimBP. Crouching directly swaps the animation asset. This source does not supply a blended crouch-entry or crouch-exit state. Named `CR_PR_Correctives` and `ABP_PR_PostProcess` assets were not found in the ProjectRunner content scan. Equivalent behavior elsewhere remains unverified.
- The local Mixamo folder contains `Walking.fbx`, `Walking (1).fbx`, `Crouched Walking.fbx`, `Sneak Walk.fbx`, and `Sneaking Forward.fbx`. All five inspected files have animation curves and a `mixamorig:Hips` skeleton root. There is no separate ground root in that hierarchy. Their performances, looping segments, and displacement have not yet been evaluated. A jog candidate still needs selection, including inspection of the downloaded locomotion packs.
- No Unreal editor was running during inspection. Houdini was running but its bridge did not answer. Cascadeur was not running. No fresh Unreal import, gameplay test, Houdini cook, or Kimodo pose evaluation was performed.

## Separate the failures before rebuilding

Run the same small test through successive stages: the source skeleton, the exported skeleton in Unreal, the Marcus mesh without secondary motion, then clothing and correctives.

If the exported skeleton's arm rotation is wrong, investigate bind frames, axes, scale, export settings, and retarget mapping. If the skeleton is right but the mesh collapses, investigate weights, topology, and correctives. If both deform correctly but motion is stiff, replace or edit the performance. Adding cloth physics cannot solve a body-animation problem.

IK retargeting supports different bone counts and orientations. It still needs appropriate chains and retarget poses. Directly playing an animation because two meshes share a Skeleton asset is a different operation. The old ten-degree check is a local heuristic, not an Epic compatibility guarantee. [Epic, IK Rig Retargeting](https://dev.epicgames.com/documentation/en-us/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine)

## Skeleton and export trial

ARP documents a round trip that imports Manny, uses the `UE5 Manny (2 Twists, for UE Export)` preset, and generates controls in Preserve mode. The original skeleton remains the export target. Its documented animation export also handles the fact that the constrained original skeleton may have no active action. Test this route before fitting Marcus. [ARP, Quick Rig](https://lucky3d.fr/auto-rig-pro/doc/quick_rig_doc.html)

After that round trip passes, fit joint centers to Marcus's shoulder, elbow, wrist, hip, knee, ankle, and toe bends. Review front, side, and three-quarter views and a short range-of-motion clip. Preserve intended local axes and hierarchy while fitting. Changing proportions or rest frames still requires validation against the actual Marcus mesh. If it needs a dedicated offline retarget, make that explicit rather than declaring the skeleton compatible.

Export the mesh in bind pose and animations separately with one recorded preset. Check root, scale, facing, twist bones, and custom-bone tracks after import. ARP documents custom-bone tagging, Mannequin Axes, and the UE5 spine/neck setup. These options support export; they do not replace a deformation test. [ARP, Game Engine Export](https://lucky3d.fr/auto-rig-pro/doc/ge_export_doc.html)

## Coats, collars, and props

The following placement is a proposed design for Marcus, not a prescribed Unreal joint layout. The Epic sources describe simulation and attachment systems, not an anatomical coat-joint template.

| Part | Proposed placement and ownership |
|---|---|
| Coat shoulders and sleeves | Skin to the torso, clavicle, arm, and forearm deformation bones. Check shoulder lift and elbow bending before adding physics. |
| Long coat with Chaos Cloth | Use body skinning as the underlying pose. Anchor the attached upper region and introduce movement below the waist attachment. Paint a gradual transition toward the free hem. Keep the collar and sleeves out of the initial simulation test. |
| Optional bone-driven coat | Root each panel chain at its actual waist attachment or fold. Follow the panel toward the hem, with intermediate pivots where it must bend. Begin with two or three segments only if the silhouette needs them. Parent the chain to the pelvis or lower torso attachment, not the thigh. Avoid the current fan of single bones pivoting inside the hips. |
| Collar | Keep its sewn base attached to the upper chest. Place any flap pivot along its fold or attachment edge, with its tip toward the loose corner. Use limited correction for head and shoulder clearance. Do not make the entire collar follow the head or inherit a blanket share of clavicle rotation without a deformation test. |
| Rigid props | Put a socket on the relevant hand, pelvis, spine, or head bone. Position it at the grip, holster, strap, or mounting point. Use mesh-specific sockets for character-specific offsets. |
| Flexible props | Add a short chain from the physical attachment. A bag pivots from its strap attachment; a loose cable starts at its connector. Choose collision and constraints for the object. |

Chaos Cloth simulates cloth particles. It does not need a tail bone for every bend. Its weight maps and collision setup control movement. The Clothing Tool exposes Max Distance and backstop controls and uses a Physics Asset for collision. For Marcus, test pelvis and thigh collision while walking and crouching. That placement is a project proposal. [Epic, Clothing Tool](https://dev.epicgames.com/documentation/en-us/unreal-engine/clothing-tool-in-unreal-engine)

The Panel Cloth workflow supports separate simulation and render meshes. This is useful if Marcus's low-poly render coat cannot bend cleanly, but adds authoring and component setup. For the deadline, first test the existing skeletal-mesh cloth workflow. Check actual enabled plugins before choosing the Panel Cloth route under the brief's experimental-plugin restriction. [Epic, Panel Cloth Editor](https://dev.epicgames.com/documentation/en-us/unreal-engine/panel-cloth-editor-overview)

RigidBody animates secondary bones using a Physics Asset and supports collision interaction. AnimDynamics uses a simpler solver and does not calculate collision. Neither is interchangeable with cloth-particle simulation. The current single-node character would need an AnimBP or a separately verified post-process setup for these skeletal controls. [Epic, RigidBody](https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-blueprint-rigid-body-in-unreal-engine), [Epic, AnimDynamics](https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-blueprint-animdynamics-in-unreal-engine)

Keep coat, collar, and corrective bones out of the humanoid limb-chain mapping. For each extra bone, record whether baked tracks or a runtime system supplies its motion. Prevent the same correction from running twice. The old native Marcus walk may contain baked corrective motion; a donor retarget with no matching extra bones needs its own verified treatment.

Sockets are attachment transforms relative to bones, with mesh-specific variants when characters share a skeleton. They suit rigid equipment without expanding the humanoid retarget chains. [Epic, sockets](https://dev.epicgames.com/documentation/unreal-engine/skeletal-mesh-sockets-in-unreal-engine)

### Baking for other actors

For background loops, prefer the short coat or authored secondary-bone tracks baked into each clip. A cloth vertex simulation does not automatically become skeletal bone animation. Preserving that deformation needs a cloth or geometry cache, or a separate approximation onto bones. A fixed cinematic cache also needs synchronization with the body animation and a packaged-playback test.

Epic documents geometry-cache output in its ML Cloth workflow, but that page does not establish a general cloth-to-bones bake. Its documented quasi-static ML approach is not a suitable shortcut for swinging coat tails. The separate cloth-cache tutorial returned no readable instructions in this research, so the current caching workflow remains unverified. Do not put it on tomorrow's critical path. [Epic, ML Cloth overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/machine-learning-cloth-simulation-overview)

## Motion that fits Marcus

Preview the source performances before retargeting. Begin with both Walking files for the casual walk and Crouched Walking, Sneak Walk, and Sneaking Forward for the cautious movement. File names are candidates, not quality judgments. Adobe permits Mixamo characters and animations in commercial games. [Adobe, Mixamo FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html)

Keep the source's weight shift, foot roll, and timing. Adjust arm swing, stride, and posture only after a clean retarget. Choose a cautious performance with controlled steps and readable intent. Do not make it by slowing the casual walk or applying a fixed forward lean. The jog needs its own source performance.

If editing a walk, work through contact, down, passing, and up poses, then refine timing, arcs, support, and overlap. Review motion from the gameplay camera and from a diagnostic side view. A mathematically closed loop can still look mechanical. [Animation Mentor, human walk tutorial](https://www.animationmentor.com/blog/tutorial-animating-human-walk-cycle/)

Cascadeur remains useful for cleanup and later QTEs. Its documented workflow uses key poses, interpolation intervals, physics tools, and trajectory polishing. Dense keys are appropriate at final export, not as a substitute for that posing process. It supports selected-interval exports, so trimming a take does not require rebuilding it. Apply physics tools to motion with meaningful travel, then produce the in-place runtime version and verify it. [Cascadeur, workflow](https://cascadeur.com/help/getting_started/workflow_basics), [export](https://cascadeur.com/help/getting_started/export_fbxdae), [cycles](https://cascadeur.com/help/tools/timeline_tools/animation_cycles)

Kimodo remains a candidate source. Its clips still need performance selection, contact cleanup, and retargeting onto Marcus. The existing KineFX demonstration does not establish that result. Inspect it later if the downloaded motions fail the style review.

## The 2.5D camera treatment

Treat movement constraints and presentation as separate decisions. Preserve the current room-depth movement during the first animation test. A flat movement plane suits straight lanes; a spline suits authored curved routes but needs path progress, junction, and collision behavior. Neither is needed to test a camera-facing pose.

Proposed first treatment: keep the pelvis and feet aligned with travel and add a mild chest/head bias toward the active camera. Judge the angle at the actual pixel size. Test both directions, stopping, turning, and camera-zone cuts. Fade the bias for interactions and cinematic shots. Rotating the whole mesh toward the camera can misalign foot travel; do not use negative scale to flip an asymmetric character.

The supplied Mario image is a useful pose reference. Nintendo confirms that Wonder revisited pixel-era poses, but the interview checked here does not document the exact camera-facing rig technique. The treatment above is our proposed experiment. [Nintendo, Wonder developer interview](https://www.nintendo.com/sg/interview/aqmx/02.html)

## Implementation gates for tomorrow

1. **Prove the skeleton and one walk.** Use new test assets in `L_AnimTest`. First verify an unchanged Manny round trip. Fit and skin Marcus with the short coat, approve the joint layout, and play one curated walk. Inspect both arms, wrist twist, hands, shoulders, and feet. Cap this initial attempt at two focused repair passes or roughly two working hours, whichever comes first. This is a proposed time limit, not a completion estimate.
2. **Complete the basic set.** Retarget the casual walk, jog, and cautious crouch-walk offline. Add standing and crouch idles. Trim clean cycles, retain source provenance and frame rate, and derive gameplay speeds from foot travel rather than arbitrary values. Keep the exported ground root stationary for in-place loops while preserving pelvis motion.
3. **Prove gameplay transitions.** Test acceleration, stopping, walk-to-jog, left/right reversal, crouch entry/exit, and blocked uncrouching. A small AnimBP with state transitions is the proposed replacement for the current asset swap if that test pops. This explicitly changes the previous no-AnimBP decision and requires approval. Add transition clips only where the accepted motion cannot blend convincingly.
4. **Test the camera treatment.** Review the baseline gait first. Add a mild upper-body bias only if it improves the silhouette without twisting the waist or disrupting contacts. Plane locking or spline movement remains a later explicit decision.
5. **Add the long coat only if time remains.** Test a single Marcus cloth setup through walking, jogging, crouching, sudden stops, and reversal. Check reset after a teleport or camera cut, initialization, collision penetration, LOD changes, and frame-time cost. If it fails, ship the approved short coat and retain the long-coat test separately.
6. **Hand over proof.** Save source, FBXs, imported assets, logs, and a short gameplay recording. Mike approves the motion at game-camera scale. Then promote the tested assets. Do not propagate the setup to the entire cast before this approval.

If gate 1 fails its time limit, stop rebuilding and report the exact failure. First consider offline GASP clips on the tested skeleton. A full GASP controller fallback requires a known working source project or snapshot and an integration test; the current project has removed its old GASP folders. Never roll back unrelated work to restore it. Mike chooses that fallback.

## Acceptance and verification

The rig must import with no unexplained hierarchy, bind-pose, or scale warnings. The same small pose test must behave consistently before and after export. Validate both arms and finger chains, and compare the mesh reference pose to the chosen independent reference. Fix the existing test so its intended failures actually fail; do not merely set a compatibility flag.

For animation, require stable planted feet at the chosen movement speed, no knee snaps or arm collapse, a clean loop seam, and convincing weight transfer. Crouch must clear the intended obstacle with the capsule and mesh agreeing. Mike's style approval remains necessary. A viewport still or successful FBX write is insufficient.

The existing rig test can be run after strengthening it. This command is proposed, not run in this session:

```powershell
& 'C:\Program Files\Epic Games\UE_5.8\Engine\Binaries\Win64\UnrealEditor-Cmd.exe' `
  'C:\Prod\ProjectRunner\Unreal\RunnerSandbox_01.uproject' `
  '-ExecCmds=Automation RunTests ProjectRunner.Rigs.CompareToSkeleton' `
  '-TestExit=Automation Test Queue Empty' -unattended -nullrhi -nosplash
```

Read its test summary and JSON results. Headless `-nullrhi` output does not validate visual quality or cloth appearance. Follow it with `L_AnimTest` PIE playback and a recording.

Completed research checks: `inspect_blender.py` ran in background Blender and exited successfully; `inspect_fbx.py` ran with `python -B` and exited successfully. Both write JSON evidence here and do not save source assets. No animation or rig was created in this phase.

## Approved scope

Mike approved the limited Marcus trial, short coat first, curated source motion, and a small AnimBP if needed for transitions. Approval permits a new test deformation rig based on preserved Manny frames. The shared production skeleton stays in place until the trial passes and Mike approves the motion.

The final delivery hour, preferred crouch depth, and any mandatory carried prop remain open. None prevents the first source-motion and skeleton trial. Left/right locking versus depth movement, full GASP restoration, and cast-wide propagation remain Mike's decisions.

Sonnet 5.5 was unavailable. Mike approved Sonnet 5, but both delegate launches failed before execution with `The provider could not start this turn`. No independent Sonnet result exists. This document uses the parent's completed inspection and primary-source research. The task-board MCP was unavailable, so no board claim or status change was made.
