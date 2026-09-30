# ProjectRunner tasks

## Interior generators (room, bar, clinic, workshop)

Refs: [refs/](refs/). Side-on, fixed-camera scenes. UE pixelates the render, so detail stays low to mid. Props are modeled in Houdini. Rooms stand alone. Output is emissive materials plus light points. Cameras are placed in UE.

Defaults picked 2026-09-29 (change any of them): Houdini metres, Y up. Floor centred on the origin. Back wall at -Z, front open at +Z. Room 8 x 5 x 3.6 m. Counter 1.1 m high, stool seat 0.75 m, character 1.8 m.

Scene: `C:\Prod\ProjectRunner\Houdini\asset_interiorBuilder_NN.hiplc`. HDAs go in `Houdini/hda/`.

- [x] **M1 Shell.** `mike::room_shell::1.0` builds the floor, the back wall, optional side walls, and a ceiling (none, flat, or sloped glazed). The back wall can have a glazed window, and a side wall can have a door. A shelf niche isn't built yet. Done when it cooks clean at default settings and with every toggle on.
- [x] **M2 Materials and props.** `mike::room_mat::1.0` tags the material slot and Cd. `mike::room_props::1.0` holds the shared props: stool, bottle, pendant lamp, wall screen, neon sign, poster, and crate. Done when every prop and variant cooks clean and sits on its mount (floor at y=0, wall props at z=0 facing +Z).
- [x] **M3 Bar program.** `mike::room_bar::1.0` places a counter, back-bar shelves with backlight, bottles, stools, pendants, screens, and neon. Output 1 is geometry, output 2 is light points. Done when it cooks clean over three seeds and two room sizes, and a side-on render is saved to `refs/wip/`.
- [ ] **M4 Wall dressing.** `mike::room_dressing::1.0` adds cables, pipes, vents, and posters, driven by a density setting.
- [ ] **M5 UE test.** Export the bar room, import it into RunnerSandbox, place a camera, and apply pixelation.
- [ ] **M6 Clinic program:** surgical chair, arm lamp, carts, monitors.
- [ ] **M7 Workshop program:** desk, monitor wall, racks.
- [ ] **M8 Room program:** bed, TV, and window seat, using the sloped glazed roof option.
- [ ] **M9 Interior trim sheet and UVs.**

## Destruction tools (`mike::destruct_*`)

Brief: `HoudiniSource/docs/briefs/destruct_concrete.md`. Scene: `Houdini/asset_destructBuilder_01.hiplc`. Reference: `HoudiniSource/sandbox/grot_ruins_project_files`.

- [x] **D0 Research.** Get the Houdini Engine 3.0 output attributes (Geometry Collection, collision, instancing, naming, inputs) from the plugin source. Saved to `refs/research-houdini-engine-ue5-outputs.md`.
- [x] **D1 Presets.** Build the wall panel, jersey barrier, pillar and slab, with UVs and the `surface` slot. Input 1 overrides the preset.
- [x] **D2 Damage mask.** Combine impact pieces and points (input 2), the Impacts multiparm, and painted `Cd` (point or vertex) into damage points with `pscale`, scaled by `damage_amount` and the state.
- [x] **D3 Fracture.** Stretched Voronoi with clusters, interior noise and the `interior` slot, then the intact, damaged and destroyed states.
- [x] **D4 Rebar and cracks.**
- [x] **D5 Rubble.** Instanced chunks on the ground.
- [x] **D6 UE outputs.** Output 1 static mesh with cracks and `collision_geo_ucx_multi`, output 2 Geometry Collection, output 3 rebar, output 4 rubble instances.
- [x] **D7 HDA and proof.** Save `mike.destruct_concrete.1.0.hdalc`, then run the cook matrix and the brief's acceptance checks.
- [ ] **D8 UE test.** Instance it in RunnerSandbox with a static mesh and a Geometry Collection, and check that the GC breaks in PIE. Save a recording to `refs/wip/`.

## G1 Playable scene (narrative game)

Brief: [BRIEF.md](BRIEF.md). A peer Claude session works in another UE project, so never touch its editor or MCP. Headless runs target `RunnerSandbox_01` only, and scripts are prefixed `pr_`.

- [x] **G1.1 Repo.** Move the empty `Documents\GitHub\ProjectRunner` repo to `C:\Prod\ProjectRunner`, add LFS `.gitattributes` and `.gitignore` (ignore `Houdini/`, DDC, Intermediate, Saved, Binaries), and make the first local commit. Pushing waits for the user.
- [x] **G1.2 StoryFlow.** Copy StoryFlow 1.2.3 from ProjectAlpha into `Unreal/Plugins` (source only).
- [x] **G1.3 C++ project.** Add `Unreal/Source` (the `RunnerSandbox_01` module and targets), and point `AdditionalPluginDirectories` at `_Library/Unreal/Plugins`.
- [x] **G1.4 Phantom plugins.** PhantomInteraction covers the interactable and interactor, hold-to-hack, camera zone (with the move-direction hold), and crouch zone. PhantomStory covers the StoryFlow–Sequencer bridge, timed choices, and checkpoint save. Done when UBT builds with 0 errors.
- [x] **G1.5 Blockout level.** Two rooms with camera zones, a crouch passage, interactables, a hack device, an NPC with a StoryFlow conversation, and two cutscene variants.
- [x] **G1.6 Hook up GASP.** The character walks only, uses the interact and hold input, and the move basis comes from the camera zone.
- [x] **G1.7 StoryFlow script.** The G1 conversation with a timed choice, a flag, and a relationship value.
- [x] **G1.9 Follow camera and transitions.** A follow camera handles framing everywhere except locked zones. L_G1_Street has passers-by. L_PR_Persistent holds the silhouette-crowd transition stage and streams the scenes. The player faces the direction of movement.
- [ ] **G1.8 Proof.** Both branches play in PIE, a mid-scene save reloads correctly, and recordings are saved to `refs/wip/`.
  - [x] Automated: `Unreal/Scripts/pr_run_g1_tests.sh` runs `ProjectRunner.G1.Playthrough.{Silent,Truth}` headless. 27/27 checks pass on both branches (2026-10-01). `ProjectRunner.G1.Transition` covers the exit, the return, and a save loaded in another scene, and passes.
  - [x] Stills in `refs/wip/`: `g1_*_cam.png`, `g1_transition_stage.png`, `g1_street_walkers.png`, `g1_follow_start.png`.
  - [ ] Screen recordings of each branch played by hand (needs Mike; OS input is off-limits for agents).

## Log

- 2026-10-01: D0–D7 done. `mike::destruct_concrete::1.0` and `asset_destructBuilder_01.hiplc` were built by `Houdini/scripts/destruct_build/main.py`. `verify.py` ran 44 cooks (4 presets × 3 states × 3 seeds, plus input, paint and impact cases): all checks passed, 0 warnings, max cook 0.63 s. The log and previews are `refs/wip/destruct_concrete_*`. D8 is waiting: the unreal-editor MCP didn't connect this session.
- 2026-10-01: G1 built. Repos: ProjectRunner (`C:\Prod\ProjectRunner`, remote `Phantom-Break-Studio/ProjectRunner`, not pushed yet) and the plugins (`C:\Prod\_Library\Unreal\Plugins`, local only).
  - Rebuild the level with `Unreal/Scripts/pr_build_g1.py`, run headless (see its docstring).
  - Headless UBT builds need `-NoHotReloadFromIDE`, because the Live Coding mutex is shared across every editor on the engine.
  - Launch the editor with `-LiveCoding=false`; the ini setting didn't take.
  - Agent MCP helpers are in `%TEMP%\pr_mcp` (port 8002).

- 2026-09-29: M1–M3 built in `asset_interiorBuilder_01.hiplc` (`/obj/bar_room`). Cook matrix: 6 configs (seeds 0–5; 8x5, 6x4.5 sloped glass + window, 12x6, and no ceiling or side walls) gave 0 errors and 0 warnings. Renders are in `refs/wip/`. `mike::room_bar` also builds a city backdrop behind the window style, matching bar-04. The build scripts are in `Houdini/scripts/interior_build/`, but the scene and HDAs are canonical. `/mat/MI_Room_*`, `/obj/preview_lights`, and `/out/preview_render` are for the Houdini preview only.
