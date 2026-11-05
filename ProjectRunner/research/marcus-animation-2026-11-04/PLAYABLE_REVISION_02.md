# Marcus: camera-facing crouch and kneeling idle

2026-11-05. Mike requested faster crouch movement, mirrored poses so Marcus presents the same side toward the camera in either travel direction, and the approved intermediate-height D pose as the stopped crouch idle.

## Changes

- Crouch travel increases 20%, from 88 to 105.6 cm/s. The clip playback rate increases by the same amount, from 0.65 to 0.78. Walk and run speeds stay at 146.1 and 371 cm/s.
- The AnimBP mirrors according to actor facing relative to the current player's camera. Bone transforms, garment curves and foot-contact markers swap together through `MT_Marcus`. Mesh scale remains positive. A 0.15-second inertial blend handles mirror changes.
- After 0.35 seconds stopped while crouched, the graph blends over 0.4 seconds into `A_Marcus_StealthIdle`. This uses the approved revision12 D pose at the intermediate body height, with the near knee lowered, the far foot planted and fingertips on the floor. Starting to move blends back to crouch locomotion.
- The new idle has its own fitted jacket target. The mesh has 70 original corrective targets and 70 mirrored counterparts. Mirroring only the skeleton would leave asymmetric coat corrections on the wrong side.
- The post-blend shoe-contact correction allows up to 20 cm of root adjustment. The deep-idle transition exceeded the previous 15 cm limit by about 0.32 cm. Run flight remains controlled by its existing contact curve.

The new assets live in `/Game/ProjectRunner/Animation/MarcusPlayable_02`. `APRCharacter` loads that mesh and AnimBP together. The playable map remains `/Game/ProjectRunner/Animation/MarcusPlayable_01/L_MarcusPlayable`; its folder name is not the animation version. Revision01 and the earlier review maps remain available.

## Verification

Follow-up: the contact check below measured the lower sole only. Mike's review exposed the other foot lifting during blends. [Revision03](PLAYABLE_REVISION_03.md) replaces that check with independent measurements of both feet and corrects the transitions.

The isolated native build succeeded. The final run passed all 54 locomotion assertions and all 53 G1 Truth assertions. The contact check evaluated 300 sampled poses, including both travel directions and entering/leaving the new idle. Grounded soles were within 0.17 cm of the floor. The lowest fingertip was within 0.19 cm of the floor in the settled idle. Exact triangle checks found no coat/pants intersections in the sampled settled idle poses on either side.

Visual inspection used the sampled UE bone transforms and actual morph weights to render both crouch travel directions and both idle orientations. The lowered knee stays nearest the camera. The Windows test-map cook completed with zero errors and zero warnings. Twelve assets were copied into the main project with matching SHA-256 hashes.

The main editor was rebuilt and reopened in Play mode. Its final test passes 54 locomotion assertions and contact checks across 302 sampled poses. The live controlled player uses revision02, all five BlendSpace clip references point to revision02, and the crouch playback rate is 0.78. Evidence is in [PLAYABLE_REVISION_02_VERIFICATION.json](PLAYABLE_REVISION_02_VERIFICATION.json). Full logs and sampled poses are under `C:/Prod/ProjectRunner/Unreal/Saved/MarcusPlayableBuild`.

## Reproduce

Scripts are in `Unreal/Scripts/marcus_playable`:

1. `prepare_revision_02.py` runs in Blender with the installed ARP exporter and creates the fitted idle and exact symmetric corrective targets. `extract_revision02_shapes.py` records the exported shape deltas for checking.
2. Build the isolated native target, then run `build_revision_02.py` through UE's Python commandlet. The helper creates the mirror table and AnimBP graph.
3. Run `verify_revision02_assets.py` in a fresh UE process to check saved clip references, playback rates and sample bounds. Then run `ProjectRunner.Marcus.Playable` and `ProjectRunner.G1.Playthrough.Truth`. Read their JSON pass fields; UE can return exit code zero when automation assertions fail.
4. Run `check_revision02.py` with Blender in background mode. `--report-dir` selects a main-project runtime report instead of the isolated one.
5. Cook the playable map for Windows. `publish_revision02.py` checks the reports before copying assets and refuses to overwrite differing destination files.
6. Close the Runner editor normally, build the main native target, reopen the playable map and run `verify_live_player.py` in the actual PIE world.

Run UE automation and cooking sequentially in the same project. Running them together caused an asset-registry cache-file collision during the first cook; the sequential cook passed.

The fresh-load check also caught an Unreal Python struct-array copy issue: editing samples obtained directly from `unreal.Array` had left the old clip references intact. The builder now retains the edited structs in a Python list before assigning them back. Its sample coordinate uses the axis's exact float32 value, avoiding a double-precision coordinate just beyond the axis limit. The final saved assets reload without either error.

## Limits

The idle entry/exit uses animation blending, not newly authored transition clips. The contact correction handles flat ground, not terrain IK or horizontal foot locking. The existing actor turn remains in place; mirroring preserves the visible pose once facing either travel direction. Clearance checks cover settled idle garment poses, not every intermediate blend or every game level. This is a cooked test-map check, not a packaged executable. Final movement feel remains Mike's review.

The mirror implementation follows Epic's [animation mirroring documentation](https://dev.epicgames.com/documentation/unreal-engine/mirroring-animation-in-unreal-engine): paired bones and curves, central bones mapped to themselves, and inertialization for state changes.
