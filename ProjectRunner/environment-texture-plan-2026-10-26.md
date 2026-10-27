# Environment texture plan

2026-10-26. Mike approved both initial variants. New Designer sources, 24 rendered maps and two Unreal review levels are saved. The material look awaits Mike's choice.

Start with the ProjectDev trim and one wall surface. Make two looks in Substance Designer, apply them to the same kit pieces in a new Unreal review level, and choose the look before making the remaining sets.

Mike found the earlier textures too complex, with unclear shapes, random colours and inconsistent detail. The approved test uses shared greyscale shapes, a fixed palette and broad painted shading. Variant A has restrained wear. Variant B adds edge chips using the same shapes and colours. Pixel reduction follows approval of the material look.

## What exists

- The active layout is `T_CyberMarket_Trim`, 2048 square, 14 horizontal strips. The full sheet spans 2 m along U at 1024 px/m. Keep its strip boundaries and the kit UVs.
- The registry contains 34 surface slots: one trim, ten tiling textures and 23 atlases. Four optional UV1 detail styles sit outside that registry. See the [inventory](environment-texture-inventory-2026-10-26.md).
- The full source manifest lists 513 pieces in 27 kits. This session read all 199 exported geometry caches, with no errors. Every cache has vertex `uv` and `uv2`. The trim appears on 182 caches and all 14 strips are used. This checks cached geometry, not a fresh cook of every builder or an exhaustive UV distortion test. [Audit](refs/wip/env-textures-2026-10-26/kit_geometry_audit.json).
- The existing Unreal import report records 185 meshes, 16 reference textures and no import errors. Its importer uses labelled placeholders, a base-colour texture and constant roughness. It does not yet connect normal or packed surface maps. This report is historical evidence; the editor was not running during this audit.
- Six trim layouts were visually inspected: the active ProjectDev template, the Sandbox facade sheet, archived building and facade sheets, and both archived pixel prop trims. The archived sheets have different layouts. Their appearance can inform a test, but they cannot replace the active texture without changing its UV mapping. The archived facade sheet is 4096 square and exceeds Runner's present 2K budget.
- The ProjectDev texture export folder has no finished outputs. Runner has editable Designer sources for painted metal, corrugated metal, brushed metal, plastic, stucco and brick. The owned library also has fabric sources and stylized concrete and plaster archives. No purchase is needed for the first test. Ownership does not establish every source's redistribution terms; retain sources locally and record dependencies.

## First batch

Create a new `runner_environment_01.sbs` with material subgraphs for paint, corrugated steel, wood, concrete, canvas and the narrow strips. One layout graph assembles the exact existing bands. Expose colour, wear, rust, roughness and normal strength so later kits use the same controls. Keep native source detail separate from the final pixel reduction. Designer's graph instances support this reuse. [Adobe core concepts](https://helpx.adobe.com/substance-3d-designer/using/core-concepts.html).

Use the existing sources as read-only inputs or copy editable graphs into the new work folder. Compile and render with the installed Designer 11.2.2 tools. Test source compatibility before depending on a material. Do not reuse the old whole-prop bake graph for the trim layout.

The first review uses these exported meshes. Together they exercise every strip and one tiling wall slot.

| Piece | What the review checks |
|---|---|
| StallKit BackWall_1m | Paint, corrugation, wood, rivets, pipe, vent and bevel |
| StallKit Counter_1m and Crate_50 | Wear scale, corners, rubber and LED |
| StallKit Awning_2m | Canvas direction, folds and neon |
| StallKit Lantern_Paper and Sign_Hanging | Warm bulb, screen and neon emission |
| AlleyKit Wall_Shutter_2x3 | Concrete trim, large wall surface and repeating shutter ribs |

Create new opaque material instances and assign them to actors in the review level. Preserve mesh asset material slots. Preserve existing vertex-colour meanings for neon and cable wind; do not consume those channels for new tint masks.

Proposed outputs are `_BC`, DirectX `_N`, `_ORM` with AO/roughness/metallic, the existing `_M` contract with tint/grunge/AO, and `_E` for emission. This adds surface response without silently changing what `_M` means. Tint IDs are encoded as 0, 0.25, 0.5, 0.75 and 1.0, confirmed in the reference generator. Check decoding after compression; never average category IDs during reduction. Masks use linear sampling with sRGB off. [Epic texture masks](https://dev.epicgames.com/documentation/unreal-engine/using-texture-masks-in-unreal-engine).

Judge both looks under neutral lighting and under the same night lighting, with exposure locked. First approve the full-resolution materials. Then compare texture-only pixel versions at 256 and 128 px/m from the same source. A 32-row narrow strip becomes eight or four rows, so normals, rivets and emission must survive that reduction. Review a moving side-on camera as well as stills. Keep the recorded nearest-filter/no-mipmap treatment for the pixel variants; any change to it needs Mike's decision.

## After the first approval

1. Apply the chosen trim to the remaining imported kit previews. Add wall, paving, asphalt, floor tile, cardboard and glass in batches selected by actual kit use.
2. Fill cutout, shop, sign and screen cells using their existing atlas rectangles. New signs remain text-free, as Runner's brief requires. Check masked cards and translucent surfaces separately.
3. Extend to the remaining room, vehicle and cyberpunk atlases as their kit assets are reviewed. Confirm whether RUN-115 needs a separate interior trim before inventing another UV layout. Treat FX atlases as a separate review from opaque environment surfaces.
4. Save import reports and in-engine captures per batch. Check texture sizes, colour space, normal direction, seams, tint, alpha, material slots and camera-distance readability. Measure material cost in Unreal before adding optional UV1 detail or world dirt. An approved still alone does not finish the batch.

The road template is 2048 by 3072 and conflicts with the current 2K limit. Resolve its resolution and repeat together before that batch. RUN-116 links to `env_tiling_sets`, but that brief belongs to Dawn and Alpha; it is not Runner's style specification.

## New work locations

| Work | Proposed new path |
|---|---|
| Designer sources and source manifest | `HoudiniSource/ProjectRunner/substance/environment_01/` |
| Rendered maps and look variants | `HoudiniSource/ProjectRunner/tex/environment_01/` |
| Unreal materials, textures and review level | `/Game/ProjectRunner/TextureReview/Env01/` |
| Evidence | `proj-docs/ProjectRunner/refs/wip/env-textures-2026-10-26/` |

Refuse to replace an existing destination. Use a new numbered folder or file for each later revision. Save only assets created for this work. Existing working-tree changes belong to other work. No commits until Mike confirms the results.

## Approval and progress

- [x] Read Runner and TaskManager briefs and texture tasks RUN-112 through RUN-118.
- [x] Inspect active and archived trims, the source registry, import scripts and owned materials.
- [x] Read exported geometry and save the 34-slot inventory.
- [x] Mike approves the first test and describes what failed in the earlier Designer attempts.
- [x] Build and render the new Designer graphs. Current source is `runner_environment_04.sbs`; 24 maps rendered at 2048 square.
- [x] Import the maps and verify the first batch in Unreal. Seven existing meshes per variant use actor material overrides. Source mesh slots are unchanged. See `environment_01_unreal_checks.json` in the evidence folder.
- [ ] Mike approves the look and pixel density.
- [ ] Extend the approved look across the kit batches and verify each in-engine.
- [ ] Mike confirms the results before any commit.

TaskManager remains the task source of truth. The related tasks are in backlog and are references for this direct request. This plan does not mark them ready or complete. `TASKS.md` remains a generated export.
