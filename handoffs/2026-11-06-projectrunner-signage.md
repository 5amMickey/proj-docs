# ProjectRunner signage handoff

Bring the approved Round03 signs from PipelineSandbox into ProjectRunner. The work is built and checked in the sandbox. Nothing has been imported into Runner yet.

Next step: Mike's end review of `L_SGN_Museum`, then a Runner session runs the steps below with Runner's editor closed.

Project: `C:\Prod\ProjectRunner`, brief at `$PROJ_DOCS/ProjectRunner/BRIEF.md`. Source: `C:\Prod\PipelineSandbox`, local git, no remote, brief at `$PROJ_DOCS/PipelineSandbox/BRIEF.md`. Plan: `$PROJ_DOCS/ProjectRunner/plans/2026-11-06-signage-parallax-museum.md`. The final set is `$PROJ_DOCS/ProjectRunner/research/signage-final-2026-11-06.md`.

## Generated art

Every approved sign is generated: the 24 signs, the 6 lanterns and the modules. The library's source sheets are generated too. Generated art stays out of pitch and application material, and the CMF intake closes 2026-11-10.

## What comes across

33 packages under `/Game/ProjectRunner/VFX/Signage/Round03/`, listed by absolute sandbox path in `2026-11-06-projectrunner-signage.files.txt`. The byte-identical copy of Runner's signage is not in the list.

| What | Assets |
|---|---|
| Final pages | `T_SGN_R3_Final_64_C`, `_128_C`, `_256_C`, `_512_C` |
| Hologram page | `T_SGN_R3_Holo_512_C`, square |
| Masters | `M_SGN_R3_SignUnlit` for neon, `M_SGN_R3_Sign` for panels |
| Instances | `MI_SGN_R3_Final_<64, 128, 256, 512>_Neon_<Clean, Gritty>`, `MI_SGN_R3_Final_256_Panel_<Clean, Gritty>` |
| Hologram instance | `MI_SGN_R3_Holo_512_Clean`, parent is Runner's own `M_SGN_Hologram` |
| Meshes | The 12 `SM_SGN_<Piece>_01` |
| Placeholder | `M_CyberMarket_Trim`, see below |
| Pulled in by references | `T_SGN_R3_Red_256_C` and `MI_SGN_R3_Red_256_Clean`. The lit master's default texture and the meshes' default face point at them. Together they cost 1 MiB and can go once those defaults are repointed in Runner |

Sign payload is the same nine floats as Runner: 0,1 rect origin; 2,3 rect span; 4,5,6 tint; 7 emission; 8 seed. Rects and emission are in `C:/Prod/ProjectRunner/Graphics/signage/atlas_tests/round03/final/atlas_manifest.json`. Set the face with `set_material_by_name('M_SGN_Face', ...)`, because slot order differs by mesh.

Holograms are the engine plane, scaled to the card size in the manifest, with roll +90 so the front faces +Y and V runs down. The master is two-sided, so the back mirrors. Labels in the museum say so.

## What doesn't come across

- Parallax. Mike picks after the Hall G retest, so nothing under `/Game/ProjectRunner/VFX/ParallaxWindows/` is in this handoff until then.
- The first-atlas Red pages and instances, except the two references above. The sandbox keeps them for Hall E and for going back.
- The Ladder pages and their instances, which only the density test uses.
- The museum map, unless Mike wants it. Its references all resolve in the sandbox, but it needs 113 packages beyond the files list, mostly parallax. The dry run prints them.

## Fix on arrival

- `M_CyberMarket_Trim` here is a sandbox placeholder with a flat colour. Remap the meshes' trim slot to Runner's real one, `/Game/ProjectDev/Materials/M_CyberMarket_Trim`, and leave no reference to the placeholder.
- `SM_SGN_` meshes come from the frozen FBX files. Runner's imported SignKit differs from frozen on three pieces: `Billboard_Small` 152 tris against 136, `Box_Sign_1m` 94 against 86, `AFrame_Sign` 48 against 44. A sign on a copy won't match Runner's piece on those three.

## Lead rulings the Runner session should know

All are in sandbox copies. Mike can change them at the end review.

- Round03 signs use new masters, because Runner's take one square `AtlasSize` and are two-sided. Five of the first eight pages were 2:1.
- Neon is on the unlit twin at 113 pixel instructions clean and 145 gritty. Panels stay lit, at 354 and 386. Runner's unlit neon is 115.
- Library art is contain-fit in a face-sized tile. Module art fills its tile. Kind decides emission: neon 6, panel 1.5.
- The box sign end cap moves to the trim slot, because a box side isn't a sign face. Triangle count stays equal.
- `WallAd_*` stays out, because copies come from frozen FBX files only.
- Banner copies have no collision and no sockets, because the frozen banners have none.
- Hologram cards are 0.45 m wide at 512 px/m, so six tiles fit a 1 MiB page.
- Replacements and how they were chosen are in the final set's research file.

## Steps

1. Close the Runner editor. Close only by PID, after matching `RunnerSandbox_01` in its command line, as the Runner brief says.
2. If the sandbox changed since this handoff, run `Scripts/sgn_r3/f07_export_dependencies.py` in the sandbox editor through `Scripts/ps_editor.py`. Otherwise the saved graph is current.
3. Dry run, which writes nothing to Runner: `python -X utf8 C:/Prod/PipelineSandbox/Unreal/Scripts/sgn_r3/runner_import_signage.py`. It must end in `RESULT: PASS`.
4. Copy: add `--apply`. It refuses to overwrite a file that differs.
5. Open Runner. Run the check below through Runner's Python bridge.
6. Remap the trim slot as above and save those meshes by explicit path. `save_assets` with an empty list saves everything.

## The check after import

Run `C:/Prod/PipelineSandbox/Unreal/Scripts/sgn_r3/runner_check_signage.py` in Runner's editor. It reads the files list, loads each package by its `/Game` path, and checks that it loads, textures keep BC7, sRGB, nearest and no mips, instances have a parent and a page, meshes keep `M_SGN_Face`, and hard dependencies exist. Expect `PASS packages 33`, with 12 instances, 3 materials, 12 meshes and 6 textures. It saves nothing.

It passed in the sandbox editor, because the paths are the same. It hasn't run in Runner, and neither has `--apply`, which was tested on a scratch folder only: 33 copied, then 0 on a second run, and a refusal when one file was changed.

## Evidence

In `C:/Prod/PipelineSandbox/Docs/signage_r3/`: `task7_report.md`, `museum_check_final.json`, `runner_import_dryrun.json`, `signage_dependency_graph.json`, `task7_material_stats.json`, `parallax_costs.md`.

## Suggested skills

`games-map`, then `task-board` if the session is on the board. `ue5-export` if a mesh needs to go back to its FBX.
