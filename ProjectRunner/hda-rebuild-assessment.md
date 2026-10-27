# HDA rebuild assessment

Which ProjectDev kit pieces are worth rebuilding as Houdini HDAs for RunnerSandbox_01, and what the tutorial files in `Development\_asset-pull\ProjectTitan_New` and `Development\_asset-pull\tutorial-files` offer as starting points. Written 2026-10-22. This expands the rebuild section of [projectdev-kit-triage.md](projectdev-kit-triage.md).

Sources: the 27 ProjectDev kit reports, `ProjectDev/SourceContent/Textures/TrimSheets/T_CyberMarket_Trim_layout.md`, and hython 22.0.466 cooks of every Houdini file in the two tutorial folders. Labs node names below were checked against the installed Labs 22.0.

## Short answer

Build eight HDAs plus one shared UV helper, in this order:

1. `mike::env_trim_uv::1.0`, the shared UV helper every generator uses.
2. Cables.
3. Pipe runs.
4. Railings and fences.
5. Market stall.
6. Prop stacks.
7. Fire escapes and balconies.
8. Scaffold and frames.
9. Stairs.

That covers about 110 of the 513 pieces. Import the rest as FBX.

2026-10-23: 1 to 4 are built and in review, see [kit-generators-review.md](kit-generators-review.md). HDA 1 became two tools: `env_trim_uv` re-UVs imported kit pieces, and `mike::env_trim_map::1.0` maps generated pieces onto the same trim.

None of the tutorial HDAs should be used as-is. Three are good references:

- the Project Titan scaffold, for filling cells with `unreal_instance` points;
- `ProceduralWireSkeleton`, for stock-node cables;
- `Tut_pipe_greeble`, for a small, clean instancing pattern.

Everything in `tutorial-files` is course material with no licence text, so study it but don't copy it.

## How the picks were made

Practices for HDAs that end up in UE 5.8:

- **Bake before shipping.** HDAs cook only in the editor. Every tool ends as baked static meshes or instanced static meshes (ISMs), through Houdini Engine Bake or the `ue5-export` FBX route.
- **Instance the kit; don't regenerate it.** An assembler outputs points with `unreal_instance` pointing at the imported `/Game/...` mesh. The piece keeps its UCX collision, sockets, LOD1 and texture, and UE draws repeats as ISMs. The Titan scaffold and `Tut_pipe_greeble` both work this way.
- **Generate only what varies continuously:** length, sag, bends, height to fit. Those are the pieces the FBX kit can't cover. The SplineKit report already flags the cost of faking them, because UCX doesn't bend and UV1 slides on curves.
- **Match the kit, so generated and imported pieces sit side by side:**
  - the grid is 1 m modules, 50 cm snap and 3 m per floor;
  - segment pivots sit at the start and run along +X;
  - every mesh has two UV channels, UV0 on the trim (1024 px/m, 2 m sheet width) and UV1 a box projection at 2 m;
  - slot 0 is the trim.
- **Keep budgets low.** The kit's median is about 100 tris. The tutorial outputs run from 82k to 600k prims, 100 to 1,000 times too heavy. Cap sides and segments per tool.
- **Write collision and materials as attributes.** Per-segment collision goes in `collision_geo_ucx*` groups. Slots go in `unreal_material`. Both show up in the Week 03 destruction HDA and in Runner's own `destruct_concrete` D6 outputs.
- **Take inputs UE can supply:** curves, points and boxes, so a level designer drives the tool from a UE spline or actor. Put asset paths in string parms with empty defaults. Several tutorial HDAs fail on hard-coded `C:/Users/...` or `/Game/Titan/...` defaults.
- **Follow `tool-building`:** one HDA per shape family, variants as presets, columns with `IN_`/`OUT_`, Show Stage, and a lint pass. The pinned Labs release must match the Houdini Engine session.

## ProjectDev: what to rebuild

### Foundation

| HDA | Job | Why first |
|---|---|---|
| `mike::env_trim_uv::1.0` | Reads a `trim_strip` prim attribute and writes UV0 into that strip's V range, with U in world metres divided by 2. Also writes UV1 as a 2 m box projection. The strip table is a JSON file read by a node, copied from `ProjectDev/.../trim_strips.py` into `HoudiniSource/ProjectRunner/data/`. | Without it, generated pieces won't match the imported kit's texture. If the material decision moves Runner off the ProjectDev trim, only the JSON table changes. |

### Generators (geometry varies with placement)

| # | HDA | Kit pieces it replaces | Inputs → outputs | Start from | Value / effort |
|---|---|---|---|---|---|
| 2 | `mike::env_cable_sag::1.0` | StreetKit CableBundle, Junction_Cluster (the kit's heaviest at 1,000 tris), WallDrop, Dangling; SplineKit Cable_2m; StallKit Cable_1m; SignKit BulbString (bulbs instanced); AlleyKit Laundry_Line. TechKit's 31 cable sockets are its anchor points. | Anchor point pairs or curves → swept tubes with sag, 4 to 6 sides, `Pipe` or `RubberSeal` strip | Labs Cable Generator 2.1 (installed), or the stock chain in `ProceduralWireSkeleton` (line, resample, sweep). Its KineFX path gives an optional swaying skeletal cable. | High / low. Cables fill every alley shot. |
| 3 | `mike::env_pipe_run::1.0` | SplineKit Pipe_2m, Duct_2m, elbows and flange; AlleyKit PipeRiser and Downpipe; StructKit Spline_PipeRack_4m; ConnectorKit clamps and straps at intervals | Polyline → straight segments with elbows at corners, plus `unreal_instance` points for flanges and clamps | `tut_pipe_from_curve` inside `Tut_pipe_curve.hip`, and the instancing in `Tut_pipe_greeble.hip`. A modular-pipe HDA is in `DJ_HDA_Presentatuion.zip` (not extracted). | High / medium |
| 4 | `mike::env_railing_run::1.0` | SplineKit Railing, Guardrail, ChainLink, BarbedWire, posts, gate; StationKit Balustrade_Glass; StreetKit Guard_Fence; GroundKit stair handrails; AlleyKit balcony railings | Curve → posts at a spacing, swept rails, infill (bars, Cutout card, chain link or glass), one collision box per bay | Stock sweep plus copy-to-points. Labs PolyWire UV 1.1 for rail UVs. | High / medium. Fixes the bend problems. |
| 9 | `mike::env_stairs_fit::1.0` | GroundKit Stairs_1m/3m and handrails; StationKit Stairs_Tiled_3m; StructKit Catwalk_Stairs_3m; AlleyKit FireEscape_Stairs_3m; RoofKit StairAccess | Start and end points → a flight fitted to the rise, with a ramp collision instead of a block (the reports flag the block). Handrails come from the railing HDA. | Stock nodes | Medium / low |

### Assemblers (instance the imported FBX)

| # | HDA | Kit pieces | Inputs → outputs | Start from | Value / effort |
|---|---|---|---|---|---|
| 5 | `mike::env_market_stall::1.0` | StallKit (13), with dressing presets from FoodKit, ShopKit and MeatKit (noodle, butcher, electronics, pharmacy) | Footprint point and module count → `unreal_instance` points for counters, back wall, posts, awning, light bar, hook rail, sign and dressing | Titan scaffold cell logic (simpler) | High / medium. The night market is made of these. |
| 6 | `mike::env_stack_props::1.0` | StackKit (5), ContainerKit (6, stacking 2.59 m apart), SoftKit cardboard, WorkshopKit tyres and jerrycans, SlumKit water drums | Box or point → stacked instances with no overlaps and a rotation jitter | Stock nodes. Already planned as "crate stacker" in ProjectDev TASKS. | Medium / low |
| 7 | `mike::env_fire_escape::1.0` | AlleyKit fire escape (9) and balcony runs (15) | Facade width and floor count → Corner_L + n x Straight + Corner_R per floor, plus ladders and stairs | Stock nodes. Replaces env_v1 `bldg_fire_escape`, which was marked keep. | Medium / low |
| 8 | `mike::env_scaffold_frame::1.0` | StructKit beams, columns, joints, scaffold, catwalk and ladder; RoofKit Billboard_Scaffold_6m | Boxes → poles, couplers, planks, beams and ladders as instances. Beam lengths come from the 1-4 m pieces, or from generated beams once lengths are free. | `Project_Titan_Evo_Scaffold_Tool_Tutorial.hip`: cell fill, DataTable rows and `unreal_instance`. EzScaffold 2.0's parameter list is a feature checklist (tarps, tape, ladders, clutter). | Medium / medium |

AlleyKit facades (46 pieces) wait on the AlleyKit decision in the triage. If they go into `cyber_facade`, they become a module set for it, not a new HDA.

### Don't rebuild

| Pieces | Instead |
|---|---|
| SplineKit road, sidewalk, kerb, bridge deck and junctions | `env_city_generator` 2.0 and Labs Road Generator 1.2 already cover roads. A side-on game needs few. Import the segments for UE spline meshes. |
| Skybridges (StationKit, StructKit Spline_Skybridge), SlumKit Rope_Bridge | Few instances; import. Both bridge tutorials are far too heavy (82k and 600k prims). |
| DamageKit proxies | Feed them to Runner's archived `mike::destruct_concrete::1.0`. It already writes the Geometry Collection, UCX, rebar and rubble outputs (D1–D7). Only its UE test, D8, is open. |
| GroundKit litter and puddles | UE PCG scatter, no HDA. |
| Unique props: Food, Interior, Meat, Shop, Vehicle, Sign, Soft, Roof, and all 8 Cyberpunk kits | Import. They are one-offs with nothing to parameterize. SoftKit tarps could become a Vellum drape later; low value. |
| SlumKit shanties | Import. Revisit if env_v1 `bldg_shanty_box` (marked keep) comes back. |

## Tutorial folders

### ProjectTitan_New

All files are commercial `.hip`/`.hda` from Houdini 22.0.368. Indie hython 22.0.466 opens them. Rows marked "new" were added after the 2026-10-15 index.

| File | What it is | Cooks? | Verdict |
|---|---|---|---|
| `Project_Titan_Evo_Scaffold_Tool_Tutorial.hip` (new) | Five-step scaffold tool. Fills blockout boxes with grid cells, reads module meshes and cell sizes from a UE DataTable, and outputs `unreal_instance` points (174 points, 14 meshes). 506 nodes, 127 wrangles. | `video_2`–`video_5` yes; `video_1` fails on a missing `D:/git/H_Project_Titan/...` path | **Mine**, for HDA 8. Best match in either folder. |
| `Tutorial_Building_Generator.hda` (new) | Wrapper around Labs Building from Patterns and Building Generator Utility, driven by UE DataTables. 354 nodes, 34 wrangles, fails 19 lint rules. | Roof only; floors need the missing `/Game/Titan` tables | **Mine** if `cyber_facade` ever needs DataTable-driven floors. |
| `Tut_pipe_greeble.hip` (new) | `tut_pipe_greeble::1.0`: scatters `unreal_instance` greeble points along pipes. | Yes, 0 warnings, 80 points | **Mine**, for HDA 3 |
| `Tut_Tower.hip` (new) | Tower massing with Labs Lot Subdivision, a trim material and curve pipes | Yes, 255k polys | **Mine** technique only |
| `project_files_machine_learning_for_smoke_an_kXYJ35R.zip` (new) | ML smoke and flame upres VFX, UE 5.8 project with ZibraVDB | Listed only | **Skip** |
| `Tut_pipe_curve.hip` | `tut_pipe_from_curve::1.0` plus a COP pipe trim sheet; writes `unreal_material` | Yes | **Mine**, for HDA 3 |
| `Tut_bridge.hip` | Bridge with concrete, metal and wood groups | Yes, 82k prims | **Mine** plank layout only |
| `Tut_asset_baking.hip` | Low/high COP bake: 2,560-tri low, 611k-prim high, writes `SM_Pipe_end.fbx` | Yes | **Reuse the bake setup.** Runner's `env_bake_maps` covers the same job, so compare before adopting. |
| `Tut_Materials.hip`, `COPs_Smoke` | COP materials; smoke flipbook with a UE 5.8 Niagara project | Yes / not cooked | **Skip.** Textures come from Substance; smoke may serve alley steam (see the 2026-10-15 index). |

Origin: the folder name suggests SideFX's Project Titan tutorials, but nothing in the files confirms it. Saved paths (`C:/Users/SHPro`, `C:/Users/stogg`) don't name an author. Check the source's terms before shipping anything derived from them.

### tutorial-files (new, 13 GB)

| Item | What it is | Cooks? | Verdict |
|---|---|---|---|
| `Week 8 houdini project/ProceduralWireSkeleton.hipnc` | 34 stock nodes, no wrangles: cable and chain sweeps with KineFX skeletons, exported through `rop_fbxcharacteroutput` | Yes, 0.02 s | **Mine**, for HDA 2. The best technique find. It is an Apprentice file, so rebuild it in an Indie scene. |
| `Week 8 Unreal Engine Project` (UE 5.6) | Cable and chain skeletal meshes with physics assets, `BP_Cable`, `BP_ChaosBridge`, field systems | Not opened | **Mine** as a reference for physics cables |
| `Week 03/sop_dj_proceduraldestr.1.0.hdalc` | Fracture to packed pieces with `unreal_gc_*` attributes and `collision_geo_ucx_0` | Yes, 0.7–4 s, no errors | **Skip** for Runner. `destruct_concrete` already does this under Runner's conventions. Useful to compare GC attribute names. |
| `LegendaryEdition_HDA/EzScaffold.2.0.hdalc` | Scaffold with ladders, tarps, tape and Vellum wires. About 1,660 nodes and 155 wrangles; 88k points with the demo settings. | Fails at defaults (missing ladder FBX); cooks with ladders off | **Mine** the feature list for HDA 8 |
| `Week 01-02/HDA_Procedural_Bridge.hdalc` | Rope bridge: planks, cargo net, rope sim | Yes, 600k prims at defaults | **Skip** |
| `Week 04-05` infection and vines (2 HDAs, Painter file) | Vellum vine growth | Yes, 140k–190k points | **Skip** for now (overgrowth isn't on Runner's list) |
| `DJ_*.zip` (5 UE projects) | UE 5.3 with Houdini Engine 2.0 for H20.0.653 | Listed only | **Skip.** They won't run on UE 5.8 / Houdini 22. `DJ_HDA_Presentatuion.zip` holds a modular-pipe HDA asset that could be pulled out to a scratch folder later. |
| `thecarfx_willwallace_training` | Car chassis rig and RBD destruction | `final` fails (missing caches) | **Skip** |
| `MBA01_ProjectFiles` | Gnomon sci-fi blast VFX, 270–280 MB per chapter | Loaded for structure only | **Skip** |

**Licensing:** none of these folders has licence text. The "DJ" files point to a Double Jump course (namespace `grays::`), EzScaffold is that course's bonus pack, and the rest are Will Wallace and Gnomon courses. Treat them all as study material: rebuild the technique in Runner's own HDAs and don't copy their HDAs, meshes or materials into the project. This matches the course-material flag in [asset-pull-index.md](asset-pull-index.md).

## Open decisions (Mike)

- The build order above. If the night-market scenes come first, a cheaper start is 1, 2, 5: trim UV, cables, stalls.
- Whether generated pieces use the ProjectDev trim (1024 px/m) or a Runner density from the K6 test. Only `env_trim_uv`'s table changes.
- Swaying cables as skeletal meshes (the Week 8 technique), or static only.
