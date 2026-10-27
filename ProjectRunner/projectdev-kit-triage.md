# ProjectDev kit triage

Which kits from `D:\projects\ProjectDev` (frozen Blender build, 513 pieces, 27 kits) come into RunnerSandbox_01 as FBX, and which get rebuilt in Houdini. Written 2026-10-22 from the per-kit reports in `ProjectDev/Media/Renders/`. The **Pick** column is a proposal; the **Decision** column is Mike's.

Rules that shape the picks:

- Rebuild only where Houdini adds something the FBX can't: lengths and sizes set per placement, sweeps along curves, collision and UVs that follow bends, or overlap with a Runner tool that already exists.
- Placement tools (crate stacker, connector placement, fracture) read the FBX as input. That isn't a rebuild, so those kits are marked "import + HDA input".
- Everything is low-poly (median about 100 tris, largest 1,378), far under Runner's 5k prop budget.
- None of the kits are textured yet. They use the ProjectDev trim sheet and atlases, which Mike paints.

## Rebuild in Houdini

Superseded 2026-10-22 by [hda-rebuild-assessment.md](hda-rebuild-assessment.md), which ranks eight HDAs plus a shared UV helper. The table below is the first pass.

| Kit | Pieces | Why rebuild | Pick | Decision |
|---|---|---|---|---|
| SplineKit | 28 | 11 segments along +X (cable, pipe, kerb, railing, road, sidewalk, bridge, guardrail, duct, chain link, barbed wire). The report flags that UCX collision doesn't bend and UV1 slides on curves. A sweep HDA fixes both. Roads overlap `env_city_generator`. | Rebuild as a sweep HDA; keep fittings (elbows, posts, flanges) as FBX placed at ends and intervals | |
| StructKit | 28 | Beams come in fixed 1-4 m lengths, plus spline catwalk, pipe rack, skybridge and ladder. Length should be a parameter. | Rebuild beams and the 4 spline pieces; import joints, plates and scaffold couplers as FBX | |
| StreetKit (cables only) | 4 of 29 | CableBundle, Junction_Cluster (1,000 tris, the heaviest), WallDrop and Dangling are curves that should follow the wall they hang on. | Rebuild in the cable/pipe sweep HDA; import the other 25 | |
| AlleyKit | 85 | 46 facades overlap `cyber_facade`. The balconies and fire escapes overlap the env_v1 pieces marked keep. | Open question, see below | |

AlleyKit has two routes:

1. Import all 85 and assemble alleys by hand on the 2 m / 3 m grid. This is quick and the pieces are done.
2. Use AlleyKit pieces as modules inside `cyber_facade` (shopfronts, shutters, balconies, fire escapes). This gives one facade tool, but the trim sheets have to agree.

## Import + HDA input

| Kit | Pieces | Houdini use | Decision |
|---|---|---|---|
| ConnectorKit | 20 | Placed from `SOCKET_` points on `_Bare` props (TASKS: connector placement) | |
| StackKit | 5 | Crate stacker HDA | |
| ContainerKit | 6 (6 LOD1) | Stacking at 2.59 m; container shop scenes | |
| DamageKit | 24 | Fracture proxies for `Docs/houdini/damage-prep.md` and `destruct_*` | |
| GroundKit | 32 | Litter singles for scatter; import puddles, stairs, kerbs and FX cards | |
| TechKit | 11 | 31 cable sockets for sweeps between racks | |

## Import as-is

| Kit | Pieces | Note | Decision |
|---|---|---|---|
| StallKit | 13 | Modular stall: counter, back wall, post, awning | |
| FoodKit | 19 | Food alley dressing | |
| ShopKit | 10 | Shelves and counters | |
| SignKit | 25 | Signs carry atlas text cells. The 2026-10-16 decision says signs we make have no text, so the Sign/Glyph cells get painted as blurred fills. | |
| SoftKit | 7 | Tarps, curtains, cardboard | |
| RoofKit | 3 | Shack, stair access, billboard scaffold | |
| InteriorKit | 25 | Furniture for the room program (M8) | |
| MeatKit | 13 | Blockouts; Mike sculpts these first | |
| VehicleKit | 13 (10 LOD1) | Wheels are separate; positions in `build_vehiclekit.py` WHEELS | |
| StationKit | 21 | 4 m skybridge and platform runs. Already modular; rebuild only if a T-junction is needed. | |
| ClinicKit | 22 | Covers most of interior generator M6 (surgical chair, arm lamp, carts, monitors) | |
| WorkshopKit | 16 | Covers most of M7 (desk, racks, tools) | |
| CorpKit | 8 | Lobby set | |
| CyberStreetKit | 18 | Kiosks, ATMs, holo projectors, capsule pods | |
| CyberVehicleKit | 8 (8 LOD1) | Drone, tuk-tuk, flying car | |
| SlumKit | 10 | Overlaps env_v1 shanty boxes; import unless the shanty tool comes back | |
| AtmosKit | 14 | Light cones, rain, fog cards. Niagara and volumetric fog may replace some in UE. | |

Totals for the proposal: 29 pieces rebuilt (11 SplineKit segments, 10 StructKit beams and 4 spline pieces, 4 StreetKit cables) and 399 imported. AlleyKit's 85 aren't counted until its route is picked.

## Open questions

- AlleyKit route (above).
- ClinicKit and WorkshopKit against M6 and M7: use the kits and drop or shrink those milestones?
- Where the imports live in RunnerSandbox_01. Option 1 is `/Game/ProjectDev/<Kit>/` committed to Runner git, which adds about 400 to 480 small meshes to the LFS push. Option 2 is local-only like the purchased packs (2026-10-16 decision).
- Material architecture: the ProjectDev trim + UV1 detail master (`ProjectDev/Docs/research/2026-10-19_materials-and-tooling.md`), or a Runner master in line with the HD-2D, pixelated-before-import look.
