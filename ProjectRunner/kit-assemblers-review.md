# Kit assemblers review

HDAs 5 to 9 from [hda-rebuild-assessment.md](hda-rebuild-assessment.md), built 2026-10-23 for Mike's review, alongside HDAs 1 to 4 in [kit-generators-review.md](kit-generators-review.md).

## Where to look

- **Houdini:** `HoudiniSource/ProjectRunner/asset_kitAssemblers_01.hiplc`, one object per tool (`/obj/review_stalls`, `review_stacks`, `review_fire_escapes`, `review_scaffold`, `review_stairs`). Each preset is its own node; change its parameters there. The assemblers show the kit meshes with Debug > Preview Kit Meshes on (`mike::env_kit_preview`).
- **Unreal** (RunnerSandbox_01, `/Game/ProjectRunner/Museum/`):
  - `L_KitMuseum` (one map since 2026-10-27), tools section: a row per HDA, 1 to 9, the same presets as Houdini, labels on the floor. Walk along +X; the kit fronts face +Y.
  - The night market, back alley and rooftop sections of `L_KitMuseum`: the tools combined with imported kit walls and props.
  - Every tool is a live Houdini Asset actor (outliner folder `Tools`): select it to edit its curve or parameters. Bake when a layout is final.
  - Rebuild with `Unreal/Scripts/pr_build_kit_museum.py` (docstring has the two-step build). Kit imports and cooks are in `/Game/ProjectDev` (git-ignored).
- Textures are the trim template and the labelled reference atlases, as in the kit museum.

**Decision** column: keep, fix (say what), drop. Leave blank if no opinion.

## HDA 5, market stalls: `mike::env_market_stall::1.0`

StallKit counters, back wall, posts, awnings, light bars, sign and lanterns, dressed by Style from FoodKit, ShopKit and MeatKit. UE instances the imported kit meshes; nothing is rebuilt. Connect points to place several stalls from one actor, or leave it empty and move the actor. Brief: `HoudiniSource/docs/briefs/env_market_stall.md`.

![stalls hall](refs/wip/assemblers/review_stalls.png)

| Preset | Settings | Tris | Kit instances | Close-up | Decision | Feedback |
|---|---|---|---|---|---|---|
| Noodle, 2 modules, lanterns, 3 stools | Lanterns on, Stools 3 | 3444 | 21 | [shot](refs/wip/assemblers/review_stalls_noodle.png) | | |
| Butcher, 3 modules, hook rails | Style butcher, Modules 3, Stools 0 | 4794 | 29 | [shot](refs/wip/assemblers/review_stalls_butcher.png) | | |
| Electronics, 2 modules | Style electronics, Stools 0 | 1680 | 18 | [shot](refs/wip/assemblers/review_stalls_electronics.png) | | |
| Pharmacy, 1 module | Style pharmacy, Modules 1, Stools 0 | 1224 | 12 | [shot](refs/wip/assemblers/review_stalls_pharmacy.png) | | |
| Plain, 4 modules, lanterns, no sign | Style plain, Modules 4, Sign off, Lanterns on, Stools 0 | 3238 | 33 | [shot](refs/wip/assemblers/review_stalls_plain.png) | | |
| Aisle: 6 input points facing each other, seed per stall | Dressing Density 0.9 | 18282 | 124 | [shot](refs/wip/assemblers/review_stalls_aisle.png) | | |

## HDA 6, prop stacks: `mike::env_stack_props::1.0`

Columns x Rows stacks of one kit prop, Min Layers to Layers high, turned, shifted and flipped a little. 13 props, each with its measured size and a layer limit. Items never overlap: the spacing allows for the largest turn and shift. Brief: `HoudiniSource/docs/briefs/env_stack_props.md`.

![stacks hall](refs/wip/assemblers/review_stacks.png)

| Preset | Settings | Tris | Kit instances | Close-up | Decision | Feedback |
|---|---|---|---|---|---|---|
| Half crates 50 x 50 x 25, 3 x 2, 2-4 high | Columns 3, Rows 2, Layers 4, Min Layers 2 | 1700 | 17 | [shot](refs/wip/assemblers/review_stacks_crates.png) | | |
| Long crates on pallets | Prop 1, Rows 2, Base Pallet on | 1904 | 12 | [shot](refs/wip/assemblers/review_stacks_long_on_pallets.png) | | |
| Barrels on pallets, 3 x 2 | Prop 4, Columns 3, Rows 2, Layers 2, Base Pallet on | 2504 | 14 | [shot](refs/wip/assemblers/review_stacks_barrels.png) | | |
| Pallets, 3-8 high | Prop 5, Layers 8, Min Layers 3 | 3312 | 12 | [shot](refs/wip/assemblers/review_stacks_pallets.png) | | |
| Cardboard, Fill 0.8, turn 12 | Prop 6, Columns 3, Rows 2, Layers 5, Fill 0.8, Turn Jitter 12 | 224 | 16 | [shot](refs/wip/assemblers/review_stacks_cardboard.png) | | |
| Tyre stacks | Prop 9, Columns 3, Layers 2 | 3456 | 6 | [shot](refs/wip/assemblers/review_stacks_tyres.png) | | |
| Jerrycans, 4 x 2 | Prop 10, Columns 4, Rows 2, Layers 1 | 1088 | 8 | [shot](refs/wip/assemblers/review_stacks_jerrycans.png) | | |
| Water drums | Prop 12 | 1196 | 2 | [shot](refs/wip/assemblers/review_stacks_drums.png) | | |
| Containers 20 ft, 2 x 2, 1-3 high | Prop 7, Rows 2, Turn Jitter 0, Shift Jitter 0, Gap 0.3 | 11280 | 8 | [shot](refs/wip/assemblers/review_stacks_containers.png) | | |

## HDA 7, fire escapes and balconies: `mike::env_fire_escape::1.0`

AlleyKit runs per floor (corner, Straights x 2 m, corner) up a wall, with stairs and a drop ladder for fire escapes. The grey slabs are stand-in walls. Known kit limit: the platforms have no stair opening, so each flight comes up through the platform above. Brief: `HoudiniSource/docs/briefs/env_fire_escape.md`.

![fire_escapes hall](refs/wip/assemblers/review_fire_escapes.png)

| Preset | Settings | Tris | Kit instances | Close-up | Decision | Feedback |
|---|---|---|---|---|---|---|
| Fire escape, 3 floors, stairs and drop ladder | defaults | 2752 | 15 | [shot](refs/wip/assemblers/review_fire_escapes_fire_escape.png) | | |
| Fire escape, card rails, 4 floors, 3 straights | Style 1, Straights 3, Floors 4 | 3604 | 24 | [shot](refs/wip/assemblers/review_fire_escapes_card_rails.png) | | |
| Balconies, steel, 1 straight | Style 2, Straights 1 | 630 | 9 | [shot](refs/wip/assemblers/review_fire_escapes_balcony_steel.png) | | |
| Balconies, concrete | Style 4 | 1068 | 12 | [shot](refs/wip/assemblers/review_fire_escapes_balcony_concrete.png) | | |
| Balconies, cage, corners only | Style 5, Straights 0 | 1848 | 6 | [shot](refs/wip/assemblers/review_fire_escapes_balcony_cage.png) | | |
| Balconies, cage card | Style 6, Straights 1 | 1164 | 9 | [shot](refs/wip/assemblers/review_fire_escapes_balcony_cage_card.png) | | |

## HDA 8, scaffold: `mike::env_scaffold_frame::1.0`

Tubes are generated on the trim (any length); couplers, planks (scaled to the bay) and ladders are StructKit instances on a second output. One collision box per bay and lift under the planks. The ladder bay leaves an opening in its planks. Brief: `HoudiniSource/docs/briefs/env_scaffold_frame.md`.

![scaffold hall](refs/wip/assemblers/review_scaffold.png)

| Preset | Settings | Tris | Kit instances | Close-up | Decision | Feedback |
|---|---|---|---|---|---|---|
| Straight 6 m, 3 lifts, zigzag braces | defaults | 2716 | 57 | [shot](refs/wip/assemblers/review_scaffold_straight.png) | | |
| L-shaped curve, 4 lifts | Lifts 4 | 5120 | 124 | [shot](refs/wip/assemblers/review_scaffold_corner.png) | | |
| Nets, every other bay braced | Braces every_other, Nets on | 2674 | 57 | [shot](refs/wip/assemblers/review_scaffold_nets.png) | | |
| Narrow: 0.75 m deep, 1.5 m bays, 5 lifts | Length 4.5, Bay Length 1.5, Depth 0.75, Lifts 5 | 4180 | 75 | [shot](refs/wip/assemblers/review_scaffold_tall_narrow.png) | | |

## HDA 9, stairs: `mike::env_stairs_fit::1.0`

A flight fitted between a curve's first and last points, equal steps near Riser, Solid (concrete) or Steel (stringers and plates), handrails from env_railing_run, and one ramp collision hull whose top is the nosing line. Brief: `HoudiniSource/docs/briefs/env_stairs_fit.md`.

![stairs hall](refs/wip/assemblers/review_stairs.png)

| Preset | Settings | Tris | Kit instances | Close-up | Decision | Feedback |
|---|---|---|---|---|---|---|
| Solid, 3 m up over 4.8 m, both handrails | defaults | 620 | - | [shot](refs/wip/assemblers/review_stairs_solid.png) | | |
| Steel, 3 m up over 3.2 m, 1 m wide, bar rails | Style steel, Run 3.2, Width 1, Rail Infill 1 | 1580 | - | [shot](refs/wip/assemblers/review_stairs_steel.png) | | |
| Fitted to a curve: 1.5 m up, turned, left rail | Width 1.5, Handrails 1 | 264 | - | [shot](refs/wip/assemblers/review_stairs_fitted.png) | | |
| Short: 0.6 m up, 3 m wide, no rails | Rise 0.6, Run 1.2, Width 3, Handrails 0 | 28 | - | [shot](refs/wip/assemblers/review_stairs_short.png) | | |
| Steel, Grate Vent treads, 4 m up | Style steel, Rise 4, Run 5, Tread Strip GrateVent | 880 | - | [shot](refs/wip/assemblers/review_stairs_steel_grate.png) | | |

## Fixes from Mike's review (2026-10-27)

The close-ups below were re-rendered from `asset_kitAssemblers_01.hiplc` after these fixes. UE still has the old meshes: re-import with `pr_import_projectdev.py` (the two hatch pieces are new rows in `data/projectdev_ue_import.csv`) and recook the tool actors.

| Feedback | Cause | Fix |
|---|---|---|
| Stretching on the jerrycans | `env_trim_uv` kept U across narrow strips (bevels, rivets) when the kit's UVs ran the strip down a long edge, so the strip stretched along it. 1,858 faces on 116 exported pieces. | A narrow strip on a face more than 3 strip heights long now runs along the face (`turn_narrow_strips`, `fix_trimuv_narrow.py`). 84 faces are left, all square faces that sit on a narrow strip in the kit's own UVs (container corners, crate edges). Every kit piece, facade insert and hatch re-exported. |
| Remove the hose on the water drums | The hose is part of `SM_SlumKit_Water_Drums_Cluster`. | Dropped after the re-UV by `lib/kit_fixes.py`, used by the export and the review scenes. The UCX hull never covered it. |
| The bamboo lid is reversed and clipping | In `SM_FoodKit_Food_Bun_Steamer` the lid's closed top faced the basket, and it sat 3.5 cm inside the basket and 1.2 cm below the ground. | `lib/kit_fixes.py` mirrors the lid through its middle, slides it clear of the basket and onto the ground. The generated `env_food_bowl` steamer lid was 9 mm below the ground; it now rests on it. |
| Z-fighting on the fire escape, plus the stair opening | Each flight's top tread and stringers lay on the deck above (about 2,100 cm2 of coplanar faces per run), and the flight came up through the solid deck. | New pieces `SM_AlleyKit_FireEscape_Hatch_2m` and `_Card_Hatch_2m` (`asset_kitFireEscapeHatch_01.hiplc`): the straight with an opening x 0.4-2.0 m, z 0.12-0.95 m, a 4 cm steel frame, its own hulls. Each flight lands in a hatch. The opening spans almost the whole deck, so the next flight starts two straights to the right; Stair Offset became Stair Bay, and Straights now defaults to 3. No z-fighting left between pieces. |
| Market stalls random, with a lot of duplication | Counter items filled 0.33 m slots at random from short lists (Plain was only cash boxes and stock boxes). | Each style has four or five hand-placed counter sets of different items; neighbouring modules take different sets, Seed picks the first. Floor items and hanging meat take turns from their lists. `verify_asm.py` checks every style on 4 modules with seeds 0-3: neighbours differ, no counter items overlap. |

Checks: `verify_asm.py` 205 of 205 pass; `hou_inspect.py lint` passes on `env_trim_uv`, `env_fire_escape` and `env_market_stall`; `fam.sh food_bowl` passes.

Open questions:
- The kit's fire escape and balcony platforms (`CornerL`, `CornerR`, `Straight`, `Platform`) carry a second hull that fills the deck up to 1 m (`UCX_..._01`, 0-1 m high over the whole deck). In UE that should stop a player on the platform. The hatch pieces use an outer-rail hull instead. Fix the others the same way?
- Family drums, barrels, lanterns and planters wrap narrow strips around round parts (right for pipes), so 3 cm ribs show a smeared strip: 280 faces over 14 family presets. Change ribs to run around?
- In your saved `asset_kitAssemblers_01.hiplc` the review cameras were gone; renders used the cameras from the last commit. I set the `fire_escape` preset to Straights 3 and `card_rails` to 5 there and saved.

## Unreal checks (2026-10-23)

- All 8 placeable HDAs cook through Houdini Engine 3.0 in RunnerSandbox_01 from UE curves or points: kit meshes instanced with their materials and UCX collision, generated meshes with their slot materials, `collision_geo_ucx` hulls as convex collision (pipe 3, railing 3, scaffold 9, stairs 1 in the smoke test), the cable on `M_CableSway`.
- Houdini Engine and the FBX imports agree on axes (Houdini +Z is UE +Y), so instanced pieces sit and face as in Houdini.
- All four maps reload with every tool's saved output (81 Houdini Asset actors in all, none empty).
- Not checked yet: walking into the collision in PIE, the cable sway in PIE, and baking.

Editor captures (scene capture, review lighting):

| Map | Image |
|---|---|
| Tools museum, row 5 (stalls) and 6 behind | ![row 5](refs/wip/assemblers/ue_tools_row5.png) |
| Tools museum, row 7 (fire escapes) | ![row 7](refs/wip/assemblers/ue_tools_row7.png) |
| Tools museum, row 8 (scaffold) | ![row 8](refs/wip/assemblers/ue_tools_row8.png) |
| Night market | ![night market](refs/wip/assemblers/ue_nm_street.png) |
| Back alley | ![back alley](refs/wip/assemblers/ue_ba_alley.png) |
| Back alley, loading dock stairs | ![dock](refs/wip/assemblers/ue_ba_dock.png) |
| Rooftop | ![rooftop](refs/wip/assemblers/ue_rt_high.png) |
| Rooftop, deck | ![deck](refs/wip/assemblers/ue_rt_deck.png) |

## Clusters as instances (2026-10-27)
Cluster and stack kit pieces are now instance layouts in `env_stack_props`, so UE instances single meshes. The new Layout menu has Stack, Cluster (packed, some lying) and Hang (lantern bar, scaled cords, bulbs). Seven single pieces come from the family HDAs. The six baked cluster pieces are off the UE import list. Review hall `review_stacks` has a preset for each. Renders: `HoudiniSource/ProjectRunner/render/assemblers/stacks_*.png`.
- Still needed: a UE re-import (`pr_import_projectdev.py`). The old cluster assets already in `/Game/ProjectDev` aren't deleted by it. Any level actors using them need swapping for Houdini Asset actors.
- 2026-10-27: UE import run (`pr_import_projectdev.py` over remote execution). 188 meshes, 0 errors after two export fixes: the singles' hulls took no material (extra `_mat_` slot), and the card hatch's cutout slot had no `/mat` node. The seven singles and both hatches are in `/Game/ProjectDev`. The six old cluster assets are still there and still used by L_KitFamiliesMuseum, L_KitToolsMuseum, L_BakeTest and L_KitDemo_NightMarket (Stock_Boxes).

## One kit museum (2026-10-27)
`/Game/ProjectRunner/Museum/L_KitMuseum` holds all six sections, left to right along +X: tools, families, night market, back alley, rooftop and facade street. It replaces `L_KitToolsMuseum`, `L_KitFamiliesMuseum` and the four `L_KitDemo_*` maps. It is built by `Unreal/Scripts/pr_build_kit_museum_all.py`, run one section at a time; the old builders are its section libraries.
- Recooked with today's HDAs: 250 Houdini Asset actors, none empty, no errors. Cooks are in `/Game/ProjectDev/HoudiniTemp/KitMuseum/<section>`. The clusters in the tools hall and the facade street are env_stack_props instances of the single pieces.
- Moved to the Recycle Bin, with 848 packages checked first for references from outside the set (none):
  - the six old museum maps and their cook folders;
  - the five stale levels from `cleanup-2026-10-26.md`: `L_VFXMuseum`, `L_TexelTest`, `L_Preview_VendingMachine_Drinks_01`, `L_LCD_Lab`, and `ProjectDev/BakeTest`;
  - the six cluster meshes.
- Kept: `L_PackMuseum`, `L_VFXSmokeColumn` and `L_VFXSteamVariants` (held in the cleanup plan), `L_LookTest`, the texture reviews, and the GASP sample levels.
