# Cast rigs and animation follow-up

2026-11-04. Recommendations from the Marcus revisions, the existing cast import reports and current Epic documentation. This pass changes Marcus only.

Repair and validate the existing cast rigs before deciding which need rebuilding. The exports already import into UE, but they do not yet meet the checks used for the revised Marcus animations.

The saved [cast import report](C:/Prod/ProjectRunner/Unreal/Saved/pr_import_cast.json) contains all eleven cast meshes, including their corrective bones. The [rig comparison](C:/Prod/ProjectRunner/Unreal/Saved/pr_rig_check.json) reports matching hierarchy but rest-pose differences on every mesh. Its left-hand rotation differs from Manny by about 20 degrees. It marks every mesh unsuitable for direct, unretargeted Manny playback. Those measurements do not prove that every animation is broken, and the check needs coverage of both sides.

Marcus had several separate faults. The native Blender FBX export failed a bind-pose check, while the installed ARP export passed. Later, [revision 04](REVISION_04.md) traced the right elbow problem to the retargeted bend direction. Other revisions repaired head weights, shoulder motion, the collar seam, shoe contact and jacket clearance. A single up-vector change would not have fixed all of those.

The current Marcus prototype uses a separate verified skeleton. It is not yet a replacement for the shared `SK_PR_Human` skeleton. It also uses jacket morphs, including 65 run/crouch targets, rather than proving the planned `cc_` bone drivers. The old corrective-bone design document says it was untested when written. Later import reports prove the bones reached UE, but I found no proof that their intended post-process drivers work correctly.

## Work required per body

1. **Audit the existing export.** Preserve the source rig and mesh. Check units, root transform, hierarchy, deform-bone axes, reference pose and export/import bind consistency. Agree on a shared core hierarchy and export convention. Character proportions and approved accessory bones may differ. Matching Manny's exact bone count or limb lengths is not the requirement. Epic describes skeleton sharing separately from proportion retargeting in [Skeletons](https://dev.epicgames.com/documentation/unreal-engine/skeletons-in-unreal-engine).

2. **Fit the joints and repair weights.** Put shoulders, elbows, hips and knees at their rotation centres. Check clavicle reach, elbow and knee bend directions, wrist roll and distributed arm twist on both sides. Use head-only weights for the face and skull in this prototype, with the neck blending independently. Fix weights and topology before adding a glute or shoulder corrective bone. Add a corrective only when a tested pose still loses volume.

3. **Retarget a small motion test.** Use the same proven casual walk, jog and cautious crouch performances, plus a range-of-motion test. Compare source and target elbow/knee planes and hand orientation throughout each clip. Fit a retarget pose to each body. Epic's [IK retargeter](https://dev.epicgames.com/documentation/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine) supports differing proportions and bone structures, but the result still needs inspection and contact checks. Bone names alone cannot certify it.

4. **Fit the clothing and props.** Anchor the collar base to the upper chest and keep matching weights across the coat seam. Avoid head or neck influence pulling the collar independently. Blend the short jacket hem into pelvis and relevant thigh movement, then test high knees and deep crouches for clipping. Attach rigid props with sockets on the appropriate hand, pelvis or chest bone. Give flexible straps or hanging props a separate short chain only when they need secondary motion. Do not change the core arm hierarchy for a prop.

5. **Validate in the actual game.** Import onto the intended mesh and skeleton, check loops and animation curves, calibrate movement speed from each body's stride, and test idle/walk/run/crouch blends. Measure the soles and the posed head against the floor and passage ceiling. Test reverse movement, automatic crouch, gameplay interactions and a Windows cook. Keep normal-speed and quarter-speed review rows for artistic review. The first playable Marcus check found floor penetration during blending even though each source clip was grounded.

6. **Build the gameplay asset set.** Each approved body needs its mesh, skeleton or verified shared-skeleton assignment, retarget settings, clip set, garment corrections and speed values. Reuse the AnimBP logic. Generate any mesh-specific contact samples for that body. Keep NPC lane speed and clip playback in agreement. Test the male and female NPC bases independently.

## Coats and secondary motion

For the demo, keep the short Marcus coat. For a hero's long coat, first establish a clean skinning baseline, continuous waist attachment and collision shapes that fit the pelvis and legs. Then test Chaos Cloth with pinned or kinematic attachment vertices and a gradual transition into the moving tails. Chaos can simulate cloth vertices without adding a chain of coat-tail bones. Epic's [Max Distance configuration](https://dev.epicgames.com/documentation/en-us/unreal-engine/node-reference/Dataflow/SimulationMaxDistanceConfig) controls that attachment and travel.

For background NPCs, test a small baked secondary-bone setup and LODs before committing to live cloth. Bake the actual bone motion into each delivered clip. Do not assume exporting constraints transfers their behaviour. If baked cloth uses vertex caches or morphs instead, budget their memory and draw cost separately.

Marcus's scripts for weight transfer, seam repair, collision checks and animation import are reusable. His weight values, collar bridge, crouch depth, shoe samples and morph deltas are specific to his mesh. Copying those numbers to another body can recreate the original faults. Per-frame jacket morphs are a useful prototype fix, but scaling them to the whole cast needs a memory and performance check.

## Suggested order

Finish the Marcus gameplay review, then validate the male and female NPC bases because the background walkers reuse them. Take the next on-screen speaking character after those, with Guard, Vhoori and Sin ordered by demo exposure. A failing bind/export test justifies a clean rebuild. A passing bind test with bad elbows, weights or clothing usually calls for a targeted repair.

After the five basic locomotion clips work, the most useful additions are crouch entry/exit, start/stop motion and 180-degree turns. Interaction and conversation layers come next. Panic variants and sprint can wait.

## Limits of this review

The old exports, reports and corrective design were inspected. The other characters were not reimported or animated in this pass. Their final deformation quality, long-coat simulation, corrective drivers and NPC performance remain unconfirmed. The shared skeleton remains the project direction; the separate Marcus prototype must pass this broader migration check before replacing it.