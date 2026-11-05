# Marcus wrist, jacket hem, ground contact and idles

The existing `/Game/ProjectRunner/Animation/MarcusTest_02/L_MarcusReview_02` now contains five animations in each row. The back row plays at the approved normal rates, and the front row at one quarter of those rates. The new clips are standing idle and crouched idle. The level is saved and simulation is left running for inspection.

## Changes

- Reduced the walk's local wrist rotation to 30 percent of its previous excursion. Peak deviation from the mean changed from 36.39 to 10.92 degrees on the left, and from 27.96 to 8.39 degrees on the right. The arm swing and corrected elbow planes remain.
- Blended 140 jacket-body vertices into the pelvis and thighs, with a falloff into the existing upper-coat weights. The sleeve cuffs are outside this region. Added up to 2 cm of clearance around the lower hem.
- Added small baked jacket morph corrections where the weights alone did not clear the thighs. The current clips use 65 corrections, three for run and 62 for crouch. Crouch corrections were smoothed through time and checked again for intersections. The largest rest-space correction is about 2.64 cm. Four unused targets from the first bake remain at zero weight.
- Corrected each support sole against the actual shoe geometry and solved the legs without stretching them. The body is lowered by 1.2 cm for walk, 2.3 cm for run, and 2 cm for crouch. The run retains its flight phase. Review actors and the floor remain at Z = 0.
- Added an 8.33-second standing idle from the owned Mixamo `Locomotion Pack.zip/idle.fbx`, with the existing offline retarget and elbow correction.
- Built the crouched idle from the approved crouch stance, with planted feet and subtle motion from the same Mixamo idle. The downloaded `Crouch Idle 01` uses a much lower, wide-armed pose and was not used for the delivered idle.
- Added both idles to both review rows and widened the review camera to fit all ten actors.

## Evidence

Outputs live in `HoudiniSource/ProjectRunner/geo/rig/marcus_test_06`. Unreal assets live under `/Game/ProjectRunner/Animation/MarcusTest_06`.

- `verification_summary.json` collects the checks and hashes the Blender and FBX deliverables.
- `hem_import_check.json` checks the actual Unreal-exported mesh, morph curves and triangle topology. It includes half-frame samples for locomotion and every frame of both idles. All five clips have zero detected crossings between the checked outer jacket panels and pants.
- `foot_geometry_check.json` and `ground_contact_targets.json` check the shoe soles. Support soles remain within 0.2 mm of the floor in the sampled frames. The run's maximum lowest-sole height remains about 12.93 cm during flight.
- `quarter_speed_simulation.json` measures the playback time of all ten actors. All five slow-to-normal ratios are 0.25 within floating-point tolerance. The crouch garment curves also evaluate during Unreal playback.
- `review_scene_check.json` verifies that the saved level retains all ten actors, their revision 06 assets, looping settings and rates.
- The bind pose, head/neck weights, collar bridge and neutral control-rig checks pass. The skeleton's bone hierarchy is unchanged. Morph metadata was added only to the isolated test skeleton.
- `review/` and the `review_UE_Review*_06.blend` files contain inspection renders and imported animation scenes.

The morphs require FBX morph import to be enabled. Unreal retained the previous import setting during early reimports, so the final import explicitly sets the mesh's import data and replaces its import settings. The ARP export uses `use_mesh_modifiers=False` to retain the shape keys. Named animation curves drive the matching morph targets, as described in [Epic's animation-curve documentation](https://dev.epicgames.com/documentation/unreal-engine/animation-curves-in-unreal-engine?lang=en-US).

## Recommended next animations

For the demo, prioritize these in order:

1. Stand to crouch and crouch to stand. These connect the two approved locomotion sets without a sudden height change.
2. Walk and jog starts and stops. Start with walk starts and stops if time permits only one pair. Test them with actual movement speed and stopping distance.
3. A 180-degree turn for the side-on left/right controls, followed by a crouched turn if direction changes while sneaking are visible in the demo.
4. A short reach/use animation and a neutral look-at pose for the demo's interactions. Match the hand contact to the first actual prop before making variants.
5. Alert idle, cautious walk and faster escape variants after the transitions work. Panicked walk, sprint and alert sneak remain secondary to the current system, as requested.

This order is a project recommendation based on the demo's controls and interactions. Animation transitions can use explicit rules and blend durations, covered in [Epic's transition-rule documentation](https://dev.epicgames.com/documentation/unreal-engine/transition-rules-in-unreal-engine). No controller or state-machine changes were made in this pass.

## Limits

These are isolated review assets on a flat floor. This pass does not verify a packaged build, runtime slope/step foot placement, or transitions in the player controller. The jacket corrections are clip-specific. New motions need their own garment check and bake, or the planned cloth setup. The earlier viewport teardown crash remains unresolved.

## Reproduction

The source scripts are under `HoudiniSource/ProjectRunner/scripts/marcus_test_01`, with `_06.py` suffixes. Unreal scripts are under `Unreal/Scripts/marcus_test`.

The build sequence is `revise_skin_06.py`, `revise_motion_06.py`, `bake_hem_correctives_06.py`, three passes of that bake with `-- --smooth`, then `export_hem_shapes_06.py` and `import_revision_06.py`. The corrective bake uses the saved Unreal triangle map, `ue_part_triangles.json`. Run Unreal scripts through `Unreal/Scripts/pr_remote.py`. `update_review_revision_06.py` updates the saved level and requires simulation to be stopped.

Verify with background Blender using `verify_revision_06.py` and `verify_hem_import_06.py`, then `verify_revision_06_scene.py` in Unreal and `package_revision_06.py` with Python. The simulation verification leaves the review running.
