# Kit families review

PD7: the 13 families of repeated ProjectDev kit pieces from the 2026-10-22 list, each one generator HDA with its kit pieces as presets. Built 2026-10-24 for Mike's review.
Companion reviews: [kit-generators-review.md](kit-generators-review.md) (HDAs 1-4), [kit-assemblers-review.md](kit-assemblers-review.md) (HDAs 5-9).

## Where to look

- **Houdini:** `HoudiniSource/ProjectRunner/asset_kitFamilies_01.hiplc`, one object per family (`/obj/review_<family>`). Each preset is its own node next to the re-UV'd kit piece it replaces; change its parameters there.
- **Unreal** (RunnerSandbox_01): `/Game/ProjectRunner/Museum/L_KitMuseum`, families section (was `L_KitFamiliesMuseum`), a row per family, every preset a live Houdini Asset actor (outliner folder `Families`). Kit pieces already imported stand beside their preset. Rebuild with `Unreal/Scripts/pr_build_kit_families.py`.
- **How the families work:** each HDA builds its piece from boxes, cylinders, spheres and two-sided cards placed by short wrangles, gives every face UVs in metres, and maps them onto the same trim, tiles and atlases as the re-UV'd kit with `env_trim_map`. Box hulls in `collision_geo_ucx_*`. The settings per kit piece are in `HoudiniSource/ProjectRunner/data/projectdev_family_presets.csv`.
- **Checks** (`verify_fam.py`, every preset): cooks clean; size and pivot within 15% or 3 cm of the kit piece; every face's UVs inside a strip or cell of its slot; hulls where the kit has UCX. All 13 HDAs pass lint.
- Textures are the trim template and the labelled reference atlases, as in the kit museum. Glass renders opaque in the Houdini review.

**Decision** column: keep, fix (say what), drop. Leave blank if no opinion.

Review 2026-10-25: Mike's notes are in the Decision and Feedback columns, with what was fixed the same day. Tri counts are the current ones. Z-fighting fixes came from a scan of every preset for coplanar, same-facing overlapping faces (57 presets had some; 9 left, all under 5 cm2 or food).

## 1. Boxes and crates: `mike::env_box_crate::1.0`

Brief: `HoudiniSource/docs/briefs/env_box_crate.md`.

![box_crate hall](refs/wip/families/fam_box_crate.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| SoftKit_Cardboard_Box_Closed | variant=0, width=0.5, height=0.35, depth=0.4 | 16 (14) | [shot](refs/wip/families/fam_box_crate_softkit_cardboard_box_closed.png) | | |
| SoftKit_Cardboard_Box_Open | variant=1, width=0.46, height=0.4, depth=0.4, flap_angle=35 | 36 (36) | [shot](refs/wip/families/fam_box_crate_softkit_cardboard_box_open.png) | | |
| SoftKit_Cardboard_Flat_Stack | variant=2, width=0.96, height=0.04, depth=0.64, count=3, seed=2 | 36 (36) | [shot](refs/wip/families/fam_box_crate_softkit_cardboard_flat_stack.png) | | |
| ShopKit_Stock_Boxes | variant=3, width=0.65, height=0.31, depth=0.1, count=3, rows=2 | 72 (90) | [shot](refs/wip/families/fam_box_crate_shopkit_stock_boxes.png) | | |
| StackKit_Crate_Half_50 | variant=4, width=0.5, height=0.25, depth=0.5, frame=0 | 60 (100) | [shot](refs/wip/families/fam_box_crate_stackkit_crate_half_50.png) | | |
| StackKit_Crate_Long_100 | variant=4, width=1.0, height=0.5, depth=0.5, frame=0 | 60 (100) | [shot](refs/wip/families/fam_box_crate_stackkit_crate_long_100.png) | | |
| StackKit_Crate_Small_25 | variant=4, width=0.5, height=0.25, depth=0.25, frame=0 | 60 (96) | [shot](refs/wip/families/fam_box_crate_stackkit_crate_small_25.png) | | |
| StallKit_Crate_50 | variant=4, width=0.54, height=0.54, depth=0.54, crate_panel=WoodPlank, crate_front=WoodPlank, crate_top=WoodPlank | 204 (100) | [shot](refs/wip/families/fam_box_crate_stallkit_crate_50.png) | | |

## 2. Shelving: `mike::env_shelving::1.0`

Brief: `HoudiniSource/docs/briefs/env_shelving.md`.

![shelving hall](refs/wip/families/fam_shelving.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| ShopKit_Shelf_Drinks_1m | variant=0, width=1.0, height=2.0, depth=0.35, back_at_origin=1, shelves=4, stock=M_Shop_Atlas Stock_Drinks | 120 (88) | [shot](refs/wip/families/fam_shelving_shopkit_shelf_drinks_1m.png) | | Fixed 10-25: z-fighting. |
| ShopKit_Shelf_Electronics_1m | variant=0, width=1.0, height=2.0, depth=0.35, back_at_origin=1, shelves=4, stock=M_Shop_Atlas Stock_Electronics Stock_Phones | 120 (80) | [shot](refs/wip/families/fam_shelving_shopkit_shelf_electronics_1m.png) | | Fixed 10-25: z-fighting. |
| ShopKit_Shelf_Pharmacy_1m | variant=0, width=1.0, height=2.2, depth=0.35, back_at_origin=1, shelves=5, stock=M_Shop_Atlas Stock_Pharmacy | 140 (88) | [shot](refs/wip/families/fam_shelving_shopkit_shelf_pharmacy_1m.png) | | Fixed 10-25: z-fighting. |
| ShopKit_Shelf_Snacks_1m | variant=0, width=1.0, height=2.0, depth=0.35, back_at_origin=1, shelves=4, stock=M_Shop_Atlas Stock_NoodlePacks Stock_Snacks | 120 (80) | [shot](refs/wip/families/fam_shelving_shopkit_shelf_snacks_1m.png) | | Fixed 10-25: z-fighting. |
| InteriorKit_Bookshelf | variant=0, width=0.9, height=1.8, depth=0.3, back_at_origin=0, shelves=4, frame_strip=WoodPlank, lips=0, stock=M_Interior_Atlas Book_Spines | 104 (96) | [shot](refs/wip/families/fam_shelving_interiorkit_bookshelf.png) | | Fixed 10-25: z-fighting. |
| WorkshopKit_Parts_Bins_Rack | variant=1, width=1.0, height=1.6, depth=0.35, back_at_origin=0, shelves=5, columns=4 | 360 (336) | [shot](refs/wip/families/fam_shelving_workshopkit_parts_bins_rack.png) | | |
| WorkshopKit_Pegboard_1m2 | variant=2, width=1.2, height=0.9, depth=0.08, back_at_origin=1 | 60 (50) | [shot](refs/wip/families/fam_shelving_workshopkit_pegboard_1m2.png) | | |
| FoodKit_Shelf_Dressing | variant=3, width=1.13, height=0.28, depth=0.12, back_at_origin=0, count=8, seed=3 | 544 (498) | [shot](refs/wip/families/fam_shelving_foodkit_shelf_dressing.png) | | |

## 3. Cabinets, fridges, racks: `mike::env_cabinet::1.0`

Brief: `HoudiniSource/docs/briefs/env_cabinet.md`.

![cabinet hall](refs/wip/families/fam_cabinet.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| FoodKit_Drinks_Cooler | variant=1, width=0.9, height=0.56, depth=0.5, body_strip=TarpCanvas, lid_strip=PaintedMetalPanel, lid_height=0.07, chest_handle=2 | 54 (82) | [shot](refs/wip/families/fam_cabinet_foodkit_drinks_cooler.png) | | Fixed 10-25: z-fighting. Seal band sides only. |
| FoodKit_Small_Fridge | variant=0, width=0.6, height=1.5, depth=0.56, front_cell=M_Screen_Atlas Shop_Interior, plinth=1, glass_door=1, handles=1 | 48 (40) | [shot](refs/wip/families/fam_cabinet_foodkit_small_fridge.png) | | |
| MeatKit_Display_Fridge | variant=2, width=2.0, height=1.22, depth=0.9, base_height=0.6, header_height=0, front_cell=M_CyberMarket_Trim GrateVent, shelves=0, display_cell=none, light_strip=1 | 92 (46) | [shot](refs/wip/families/fam_cabinet_meatkit_display_fridge.png) | | |
| ClinicKit_Parts_Fridge | variant=0, width=0.7, height=1.8, depth=0.6, front_cell=M_Clinic_Atlas Fridge_Parts, plinth=1, light_strip=1, handles=1 | 56 (54) | [shot](refs/wip/families/fam_cabinet_clinickit_parts_fridge.png) | | |
| ClinicKit_Med_Cabinet | variant=0, width=0.8, height=0.9, depth=0.3, front_cell=M_Clinic_Atlas Cabinet_Front, wall_mount=1 | 12 (30) | [shot](refs/wip/families/fam_cabinet_clinickit_med_cabinet.png) | | |
| ClinicKit_Display_Case_Arm | variant=2, width=0.6, height=1.62, depth=0.5, base_height=0.5, header_height=0.12, front_cell=M_Clinic_Atlas Cabinet_Front, header_cell=M_Clinic_Atlas Med_Labels, shelves=1, display_cell=M_Clinic_Atlas Cyberarm_Display | 108 (242) | [shot](refs/wip/families/fam_cabinet_clinickit_display_case_arm.png) | | |
| ClinicKit_Display_Case_Eyes | variant=2, width=0.6, height=1.62, depth=0.5, base_height=0.5, header_height=0.12, front_cell=M_Clinic_Atlas Cabinet_Front, header_cell=M_Clinic_Atlas Med_Labels, shelves=2, display_cell=M_Clinic_Atlas Cybereye_Display | 124 (258) | [shot](refs/wip/families/fam_cabinet_clinickit_display_case_eyes.png) | | |
| ClinicKit_Display_Case_Spine | variant=2, width=0.6, height=1.62, depth=0.5, base_height=0.5, header_height=0.12, front_cell=M_Clinic_Atlas Cabinet_Front, header_cell=M_Clinic_Atlas Med_Labels, shelves=0, display_cell=M_Clinic_Atlas Implant_Chart | 92 (306) | [shot](refs/wip/families/fam_cabinet_clinickit_display_case_spine.png) | | |
| InteriorKit_Wardrobe | variant=0, width=1.0, height=1.9, depth=0.6, body_strip=WoodPlank, plinth=1, handles=2 | 64 (88) | [shot](refs/wip/families/fam_cabinet_interiorkit_wardrobe.png) | | |
| WorkshopKit_Tool_Chest | variant=0, width=0.72, height=1.0, depth=0.49, body_strip=PaintedMetalPanel, front_cell=M_Workshop_Atlas Drawer_Fronts, plinth=2, side_handle=1, drawer_handles=6 | 204 (310) | [shot](refs/wip/families/fam_cabinet_workshopkit_tool_chest.png) | fix | Mike: add the handles back. Added 10-25: 6 drawer bar handles (Drawer Handles). |
| WorkshopKit_Toolbox_Closed | variant=1, width=0.52, height=0.26, depth=0.24, lid_height=0.06, front_cell=M_Workshop_Atlas Toolbox_Front, chest_handle=1 | 74 (110) | [shot](refs/wip/families/fam_cabinet_workshopkit_toolbox_closed.png) | | Fixed 10-25: z-fighting. |
| WorkshopKit_Toolbox_Open | variant=1, width=0.52, height=0.26, depth=0.24, lid_height=0.06, lid_angle=90, front_cell=M_Workshop_Atlas Toolbox_Front, inner_cell=M_Workshop_Atlas Scrap_Metal | 32 (88) | [shot](refs/wip/families/fam_cabinet_workshopkit_toolbox_open.png) | | Fixed 10-25: z-fighting. |
| TechKit_Server_Rack_Closed | variant=0, width=0.6, height=2.0, depth=1.0, front_cell=M_Tech_Atlas Server_Front_A, light_strip=1 | 24 (32) | [shot](refs/wip/families/fam_cabinet_techkit_server_rack_closed.png) | | |
| TechKit_Server_Rack_Open | variant=3, width=0.6, height=2.0, depth=1.0, side_panels=1, units=6, door_angle=105 | 192 (288) | [shot](refs/wip/families/fam_cabinet_techkit_server_rack_open.png) | | Fixed 10-25: z-fighting. |
| TechKit_Server_Rack_Damaged | variant=3, width=0.6, height=2.0, depth=1.0, side_panels=0, units=5, damaged=1, fallen=2, seed=6 | 180 (266) | [shot](refs/wip/families/fam_cabinet_techkit_server_rack_damaged.png) | | Fixed 10-25: z-fighting. |
| StreetKit_Junction_Box | variant=0, width=0.5, height=1.3, depth=0.25, base_y=-0.6, conduit=0.6, wall_mount=1 | 40 (34) | [shot](refs/wip/families/fam_cabinet_streetkit_junction_box.png) | | |
| StreetKit_Meter_Box | variant=0, width=0.3, height=0.4, depth=0.15, front_cell=M_CyberMarket_Trim ScreenGlow, wall_mount=1 | 12 (38) | [shot](refs/wip/families/fam_cabinet_streetkit_meter_box.png) | | |
| StreetKit_Vending_Machine | variant=0, width=1.0, height=1.9, depth=0.8, front_cell=M_Screen_Atlas Vending_Front, plinth=1, light_strip=1 | 36 (42) | [shot](refs/wip/families/fam_cabinet_streetkit_vending_machine.png) | | |

## 4. Seating and tables: `mike::env_seating::1.0`

Brief: `HoudiniSource/docs/briefs/env_seating.md`.

![seating hall](refs/wip/families/fam_seating.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| FoodKit_Plastic_Stool | variant=0, width=0.34, height=0.45, depth=0.32, seat_height=0.45, seat_thick=0.03, round_top=1, leg_style=2, leg_inset=0, leg_taper=0.8, top_mat=M_CyberMarket_Trim:TarpCanvas, leg_mat=M_CyberMarket_Trim:TarpCanvas | 104 (68) | [shot](refs/wip/families/fam_seating_foodkit_plastic_stool.png) | | Mike 10-25: mixed. Generated and kit pieces welded, UVs checked (10-25). |
| FoodKit_Folding_Table | variant=3, width=1.2, height=0.73, depth=0.6, top_thick=0.03, leg_style=1, leg_size=0.03, leg_inset=0.05, top_mat=M_CyberMarket_Trim:WoodPlank, leg_mat=M_CyberMarket_Trim:Pipe | 124 (128) | [shot](refs/wip/families/fam_seating_foodkit_folding_table.png) | | Mike 10-25: mixed. Generated and kit pieces welded, UVs checked (10-25). |
| InteriorKit_Chair_Dining | variant=1, width=0.42, height=0.92, depth=0.42, seat_height=0.46, seat_thick=0.04, back_gap=0.12, back_thick=0.025, back_angle=0, leg_style=0, leg_size=0.035, leg_inset=0.01, top_mat=M_CyberMarket_Trim:WoodPlank, leg_mat=M_CyberMarket_Trim:BareBevel, back_mat=M_CyberMarket_Trim:WoodPlank | 72 (104) | [shot](refs/wip/families/fam_seating_interiorkit_chair_dining.png) | | Mike 10-25: mixed. Generated and kit pieces welded, UVs checked (10-25). |
| InteriorKit_Chair_Folding | variant=1, width=0.44, height=0.96, depth=0.46, seat_height=0.46, seat_thick=0.03, back_gap=0.22, back_thick=0.02, back_angle=0, leg_style=5, leg_size=0.025, leg_inset=0.01, top_mat=M_CyberMarket_Trim:PaintedMetalPanel, leg_mat=M_CyberMarket_Trim:Pipe, back_mat=M_CyberMarket_Trim:PaintedMetalPanel | 136 (104) | [shot](refs/wip/families/fam_seating_interiorkit_chair_folding.png) | fix | Mike 10-25: legs wrong. Fixed: Folding leg style, crossed like the kit. |
| InteriorKit_Chair_Office | variant=2, width=0.62, height=1.04, depth=0.62, seat_height=0.48, seat_thick=0.08, back_thick=0.06, back_angle=8, top_mat=M_Interior_Atlas:Fabric_C, leg_mat=M_CyberMarket_Trim:BareBevel | 240 (356) | [shot](refs/wip/families/fam_seating_interiorkit_chair_office.png) | fix | Mike 10-25: back larger than the seat; add a bevel option. Fixed: narrower back, Bevel toggle (seat, back). Kit has arm rests; the preset doesn't. |
| InteriorKit_Couch_2Seat | variant=6, width=1.56, height=0.89, depth=0.85, seat_height=0.45, seats=2, arm_width=0.18, back_thick=0.2, back_mat=M_Interior_Atlas:Fabric_A, accent_mat=M_Interior_Atlas:Cushion, leg_mat=M_CyberMarket_Trim:BareBevel | 144 (316) | [shot](refs/wip/families/fam_seating_interiorkit_couch_2seat.png) | fix | Mike 10-25: add a bevel option. Added: Bevel toggle (back, arms, cushions). |
| InteriorKit_Couch_3Seat | variant=6, width=2.16, height=0.89, depth=0.85, seat_height=0.45, seats=3, arm_width=0.18, back_thick=0.2, back_mat=M_Interior_Atlas:Fabric_B, accent_mat=M_Interior_Atlas:Cushion, leg_mat=M_CyberMarket_Trim:BareBevel | 168 (404) | [shot](refs/wip/families/fam_seating_interiorkit_couch_3seat.png) | fix | Mike 10-25: add a bevel option. Added: Bevel toggle (back, arms, cushions). |
| InteriorKit_Desk | variant=4, width=1.2, height=0.74, depth=0.6, top_thick=0.03, leg_style=0, leg_size=0.04, leg_inset=0.02, pedestal=1, top_mat=M_CyberMarket_Trim:WoodPlank, leg_mat=M_CyberMarket_Trim:BareBevel, accent_mat=M_CyberMarket_Trim:PaintedMetalPanel | 90 (106) | [shot](refs/wip/families/fam_seating_interiorkit_desk.png) | fix | Mike 10-25: mixed. Mike: add the handles back. Added 10-25: 3 drawer pulls; the pedestal replaces the left legs (z-fighting). Welded, UVs checked. |
| InteriorKit_Stool_Bar | variant=0, width=0.4, height=0.78, depth=0.4, seat_height=0.78, seat_thick=0.06, round_top=1, leg_style=4, leg_size=0.05, leg_inset=0.02, top_mat=M_Interior_Atlas:Leather, leg_mat=M_CyberMarket_Trim:BareBevel | 148 (260) | [shot](refs/wip/families/fam_seating_interiorkit_stool_bar.png) | fix | Mike 10-25: foot rest option. Added: Foot Rest toggle, height and size (a low-poly ring). |
| InteriorKit_Table_Chabudai | variant=3, width=0.8, height=0.33, depth=0.8, top_thick=0.03, round_top=1, leg_style=0, leg_size=0.05, leg_inset=0.15, top_mat=M_CyberMarket_Trim:WoodPlank, leg_mat=M_CyberMarket_Trim:WoodPlank | 108 (100) | [shot](refs/wip/families/fam_seating_interiorkit_table_chabudai.png) | | Mike 10-25: mixed. Generated and kit pieces welded, UVs checked (10-25). |
| InteriorKit_Table_Coffee | variant=3, width=1.0, height=0.42, depth=0.5, top_thick=0.04, leg_style=0, leg_size=0.05, leg_inset=0.02, shelf=1, shelf_height=0.1, top_mat=M_CyberMarket_Trim:WoodPlank, leg_mat=M_CyberMarket_Trim:BareBevel, accent_mat=M_CyberMarket_Trim:WoodPlank | 72 (88) | [shot](refs/wip/families/fam_seating_interiorkit_table_coffee.png) | | Mike 10-25: mixed. Fixed 10-25: z-fighting. Welded, UVs checked. |
| InteriorKit_Table_Dining | variant=3, width=1.4, height=0.74, depth=0.8, top_thick=0.04, leg_style=0, leg_size=0.06, leg_inset=0.04, top_mat=M_CyberMarket_Trim:WoodPlank, leg_mat=M_CyberMarket_Trim:BareBevel | 60 (84) | [shot](refs/wip/families/fam_seating_interiorkit_table_dining.png) | | Mike 10-25: mixed. Generated and kit pieces welded, UVs checked (10-25). |
| StallKit_Stool | variant=0, width=0.37, height=0.45, depth=0.37, seat_height=0.45, seat_thick=0.04, round_top=1, leg_style=1, leg_size=0.025, leg_inset=0.04, leg_splay=5, top_mat=M_CyberMarket_Trim:WoodPlank, leg_mat=M_CyberMarket_Trim:Pipe | 172 (116) | [shot](refs/wip/families/fam_seating_stallkit_stool.png) | | Mike 10-25: circle and square. Round Top toggles it; both in the all-kits museum. |
| StallKit_ButcherTable_2m | variant=3, width=2.0, height=0.9, depth=0.8, top_thick=0.06, leg_style=1, leg_size=0.04, leg_inset=0.05, shelf=1, shelf_height=0.2, top_mat=M_CyberMarket_Trim:WoodPlank, leg_mat=M_CyberMarket_Trim:Pipe, accent_mat=M_CyberMarket_Trim:GrateVent | 136 (196) | [shot](refs/wip/families/fam_seating_stallkit_butchertable_2m.png) | | Mike 10-25: mixed. Generated and kit pieces welded, UVs checked (10-25). |
| StationKit_Bench | variant=5, width=1.8, height=0.84, depth=0.49, seat_height=0.45, seat_thick=0.05, back=1, back_gap=0, back_thick=0.04, back_angle=10, leg_style=3, leg_size=0.06, leg_inset=0.1, top_mat=M_CyberMarket_Trim:TarpCanvas, back_mat=M_CyberMarket_Trim:TarpCanvas, leg_mat=M_CyberMarket_Trim:PaintedMetalPanel | 48 (422) | [shot](refs/wip/families/fam_seating_stationkit_bench.png) | | Mike 10-25: mixed. Generated and kit pieces welded, UVs checked (10-25). |
| CorpKit_Lobby_Bench | variant=5, width=1.8, height=0.46, depth=0.5, seat_height=0.46, seat_thick=0.08, back=0, leg_style=3, leg_size=0.08, leg_inset=0.15, top_mat=M_Corp_Atlas:Marble, leg_mat=M_CyberMarket_Trim:PaintedMetalPanel | 36 (60) | [shot](refs/wip/families/fam_seating_corpkit_lobby_bench.png) | keep | Mike 10-25: likes both versions. |
| CorpKit_Reception_Desk | variant=7, width=3.28, height=1.04, depth=0.99, seat_height=0.75, top_thick=0.04, logo=Corp_Logo_A, back_mat=M_Corp_Atlas:Marble, top_mat=M_Corp_Atlas:Marble, accent_mat=M_Corp_Atlas:Reception_Front | 60 (44) | [shot](refs/wip/families/fam_seating_corpkit_reception_desk.png) | keep | Mike 10-25: likes both versions. |

## 5. Lanterns and lights: `mike::env_lantern_light::1.0`

Brief: `HoudiniSource/docs/briefs/env_lantern_light.md`.

![lantern_light hall](refs/wip/families/fam_lantern_light.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| SignKit_Lantern_Round | variant=0, width=0.4, height=0.48, depth=0.4, hook=0.06 | 132 (176) | [shot](refs/wip/families/fam_lantern_light_signkit_lantern_round.png) | | |
| SignKit_Lantern_Square | variant=3, width=0.32, height=0.53, depth=0.32, hook=0.06, frame=0.025 | 96 (136) | [shot](refs/wip/families/fam_lantern_light_signkit_lantern_square.png) | | |
| SignKit_Lantern_Gourd | variant=2, width=0.3, height=0.62, depth=0.29, hook=0.05 | 196 (168) | [shot](refs/wip/families/fam_lantern_light_signkit_lantern_gourd.png) | | |
| SignKit_Lantern_Tall | variant=1, width=0.24, height=0.95, depth=0.23, hook=0.06, rings=3 | 124 (92) | [shot](refs/wip/families/fam_lantern_light_signkit_lantern_tall.png) | | Mike: z-fighting. Fixed 10-25: body ends sit inside the hoops. |
| SignKit_Lantern_Cluster | variant=4, width=0.88, height=0.82, depth=0.27, frame=0.04, count=3, seed=1 | 348 (272) | [shot](refs/wip/families/fam_lantern_light_signkit_lantern_cluster.png) | | |
| StallKit_Lantern_Paper | variant=1, width=0.3, height=0.42, depth=0.29, hook=0.05, rings=2 | 96 (84) | [shot](refs/wip/families/fam_lantern_light_stallkit_lantern_paper.png) | | Fixed 10-25: z-fighting. Same hoops as Lantern Tall. |
| SignKit_Lamp_Pendant | variant=5, width=0.44, height=0.73, depth=0.44, hook=0.3, shade_height=0.3, shade=M_CyberMarket_Trim:PaintedMetalPanel | 156 (194) | [shot](refs/wip/families/fam_lantern_light_signkit_lamp_pendant.png) | keep | Mike: both versions good. Collar raised 4 mm off the shade top (z-fighting). |
| SignKit_Lamp_Cage | variant=6, width=0.16, height=0.14, depth=0.22, frame=0.02 | 140 (210) | [shot](refs/wip/families/fam_lantern_light_signkit_lamp_cage.png) | fix | Mike: too much geo. Rebuilt 10-25 from his example: bulb and two crossed ring bands, 140 tris (was 196). |
| SignKit_Street_Lamp | variant=8, width=0.3, height=5.04, depth=1.65 | 84 (98) | [shot](refs/wip/families/fam_lantern_light_signkit_street_lamp.png) | | |
| StallKit_LightBar_1m | variant=7, width=1.0, height=0.31, depth=0.1, hook=0.2 | 48 (56) | [shot](refs/wip/families/fam_lantern_light_stallkit_lightbar_1m.png) | | |
| StationKit_Light_Fluorescent | variant=7, width=1.2, height=0.36, depth=0.14, hook=0.24 | 48 (28) | [shot](refs/wip/families/fam_lantern_light_stationkit_light_fluorescent.png) | | |
| InteriorKit_Lamp_Ceiling | variant=5, width=0.5, height=0.72, depth=0.49, hook=0.3, shade_height=0.32, shade=M_Interior_Atlas:Lamp_Shade | 156 (136) | [shot](refs/wip/families/fam_lantern_light_interiorkit_lamp_ceiling.png) | | Fixed 10-25: z-fighting. Collar raised 4 mm. |
| InteriorKit_Lamp_Floor | variant=9, width=0.44, height=1.6, depth=0.44, shade_height=0.4, shade=M_Interior_Atlas:Lamp_Shade | 172 (150) | [shot](refs/wip/families/fam_lantern_light_interiorkit_lamp_floor.png) | | |

## 6. Signs: `mike::env_sign_panel::1.0`

Brief: `HoudiniSource/docs/briefs/env_sign_panel.md`.

![sign_panel hall](refs/wip/families/fam_sign_panel.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| SignKit_Neon_Blade_1m5 | variant=0, width=0.5, height=1.5, thickness=0.12, standoff=0.2, bracket=1, neon=1, cell_slot=M_Glyph_Atlas, cells=Kanji_A Kanji_B Kanji_C | 164 (164) | [shot](refs/wip/families/fam_sign_panel_signkit_neon_blade_1m5.png) | fix | Mike: no border round the lettering, like the kit. Fixed 10-25: glyphs fill the faces (Cell Border off). |
| SignKit_Neon_Blade_1m5_Bare | variant=0, width=0.5, height=1.5, thickness=0.12, standoff=0.2, bracket=0, neon=1, cell_slot=M_Glyph_Atlas, cells=Kanji_A Kanji_B Kanji_C | 100 (124) | [shot](refs/wip/families/fam_sign_panel_signkit_neon_blade_1m5_bare.png) | fix | Mike: no border round the lettering, like the kit. Fixed 10-25: glyphs fill the faces (Cell Border off). |
| SignKit_Neon_Blade_3m | variant=0, width=0.5, height=3.0, thickness=0.12, standoff=0.2, bracket=1, neon=1, cell_slot=M_Glyph_Atlas, cells=Kanji_A Kanji_B Kanji_C Kanji_D Kanji_E Kanji_F | 176 (188) | [shot](refs/wip/families/fam_sign_panel_signkit_neon_blade_3m.png) | fix | Mike: no border round the lettering, like the kit. Fixed 10-25: glyphs fill the faces (Cell Border off). |
| SignKit_Neon_Blade_3m_Bare | variant=0, width=0.5, height=3.0, thickness=0.12, standoff=0.2, bracket=0, neon=1, cell_slot=M_Glyph_Atlas, cells=Kanji_A Kanji_B Kanji_C Kanji_D Kanji_E Kanji_F | 112 (148) | [shot](refs/wip/families/fam_sign_panel_signkit_neon_blade_3m_bare.png) | fix | Mike: no border round the lettering, like the kit. Fixed 10-25: glyphs fill the faces (Cell Border off). |
| SignKit_Box_Sign_1m | variant=1, width=1.0, height=0.6, thickness=0.2, standoff=0.15, bracket=1, bracket_below=0.55, bracket_above=0.35, cell_slot=M_Sign_Atlas, cells=Box_Short_A, end_cell=Box_End_A | 96 (86) | [shot](refs/wip/families/fam_sign_panel_signkit_box_sign_1m.png) | fix | Mike: border on some signs. Fixed 10-25: cells fill the faces (Cell Border off). |
| SignKit_Box_Sign_1m_Bare | variant=1, width=1.0, height=0.6, thickness=0.2, standoff=0.15, bracket=0, cell_slot=M_Sign_Atlas, cells=Box_Short_A, end_cell=Box_End_A | 12 (12) | [shot](refs/wip/families/fam_sign_panel_signkit_box_sign_1m_bare.png) | fix | Mike: border on some signs. Fixed 10-25: cells fill the faces (Cell Border off). |
| SignKit_Box_Sign_2m | variant=1, width=2.0, height=0.6, thickness=0.2, standoff=0.15, bracket=1, bracket_below=0.55, bracket_above=0.35, cell_slot=M_Sign_Atlas, cells=Box_Long_A, end_cell=Box_End_B | 96 (86) | [shot](refs/wip/families/fam_sign_panel_signkit_box_sign_2m.png) | fix | Mike: border on some signs. Fixed 10-25: cells fill the faces (Cell Border off). |
| SignKit_Box_Sign_2m_Bare | variant=1, width=2.0, height=0.6, thickness=0.2, standoff=0.15, bracket=0, cell_slot=M_Sign_Atlas, cells=Box_Long_A, end_cell=Box_End_B | 12 (12) | [shot](refs/wip/families/fam_sign_panel_signkit_box_sign_2m_bare.png) | fix | Mike: border on some signs. Fixed 10-25: cells fill the faces (Cell Border off). |
| SignKit_Neon_Box | variant=2, width=1.8, height=0.6, thickness=0.21, neon=1, cell_slot=M_Glyph_Atlas, cells=Icon_Bowl Latin_NOODLE Icon_Bowl | 56 (62) | [shot](refs/wip/families/fam_sign_panel_signkit_neon_box.png) | fix | Mike: border on some signs. Fixed 10-25: cells fill the faces (Cell Border off). |
| SignKit_Billboard_Small | variant=3, width=1.6, height=0.9, thickness=0.1, standoff=0.2, legs=0, cell_slot=M_Screen_Atlas, cells=Ad_Wide_A | 142 (136) | [shot](refs/wip/families/fam_sign_panel_signkit_billboard_small.png) | | |
| SignKit_Billboard_Medium | variant=3, width=3.2, height=1.8, thickness=0.1, standoff=0.2, legs=0, cell_slot=M_Screen_Atlas, cells=Ad_Wide_A | 146 (150) | [shot](refs/wip/families/fam_sign_panel_signkit_billboard_medium.png) | | Fixed 10-25: z-fighting. Back rows replace the back face. |
| SignKit_Billboard_Large | variant=3, width=6.4, height=3.6, thickness=0.1, standoff=0.2, legs=1.2, cell_slot=M_Screen_Atlas, cells=Ad_Wide_A | 210 (196) | [shot](refs/wip/families/fam_sign_panel_signkit_billboard_large.png) | | Fixed 10-25: z-fighting. Back rows replace the back face. |
| SignKit_Banner_Vertical_2m | variant=4, width=0.6, height=2.0, standoff=0.05, bracket=1, cell_slot=M_Sign_Atlas, cells=Banner_A | 60 (96) | [shot](refs/wip/families/fam_sign_panel_signkit_banner_vertical_2m.png) | | |
| SignKit_Banner_Vertical_3m | variant=4, width=0.6, height=3.0, standoff=0.05, bracket=1, cell_slot=M_Sign_Atlas, cells=Banner_C | 60 (120) | [shot](refs/wip/families/fam_sign_panel_signkit_banner_vertical_3m.png) | | |
| SoftKit_Banner_Flag | variant=5, width=0.75, height=1.6, standoff=0.05, bracket=1, cell_slot=M_Decal_Atlas, cells=Banner_Flag | 40 (148) | [shot](refs/wip/families/fam_sign_panel_softkit_banner_flag.png) | | |
| SignKit_AFrame_Sign | variant=6, width=0.6, height=0.9, thickness=0.02, lean=12, cell_slot=M_Screen_Atlas, cells=Menu_Board | 44 (44) | [shot](refs/wip/families/fam_sign_panel_signkit_aframe_sign.png) | | |
| SignKit_Medallion_Sign | variant=7, neon=1, height=1.0, thickness=0.12, standoff=0.13, cell_slot=M_Glyph_Atlas, cells=Emblem_Gold | 160 (120) | [shot](refs/wip/families/fam_sign_panel_signkit_medallion_sign.png) | | Neon toggle now drives the rim (preset on). |
| ClinicKit_Clinic_Sign | variant=2, width=1.2, height=0.4, thickness=0.13, neon=1, cell_slot=M_Clinic_Atlas, cells=Clinic_Sign | 52 (58) | [shot](refs/wip/families/fam_sign_panel_clinickit_clinic_sign.png) | fix | Mike: border on some signs. Fixed 10-25: cells fill the faces (Cell Border off). |
| StationKit_Hanging_Exit_Sign | variant=8, width=1.6, height=0.45, thickness=0.074, drop=0.2, neon=0, cell_slot=M_Station_Atlas, cells=Exit_Yellow | 36 (28) | [shot](refs/wip/families/fam_sign_panel_stationkit_hanging_exit_sign.png) | fix | Mike: border on some signs. Fixed 10-25: cells fill the faces (Cell Border off). |
| StationKit_Station_Name_Sign | variant=8, width=2.4, height=0.6, thickness=0.114, drop=0.2, neon=0, cell_slot=M_Station_Atlas, cells=Station_Name | 36 (36) | [shot](refs/wip/families/fam_sign_panel_stationkit_station_name_sign.png) | fix | Mike: border on some signs. Fixed 10-25: cells fill the faces (Cell Border off). |
| StallKit_Sign_Hanging | variant=8, width=0.8, height=0.5, thickness=0.07, drop=0.2, neon=1, cell_slot=M_CyberMarket_Trim, cells=ScreenGlow | 116 (148) | [shot](refs/wip/families/fam_sign_panel_stallkit_sign_hanging.png) | fix | Mike: border on some signs. Fixed 10-25: cells fill the faces (Cell Border off). |

## 7. Vents and AC units: `mike::env_vent_ac::1.0`

Brief: `HoudiniSource/docs/briefs/env_vent_ac.md`.

![vent_ac hall](refs/wip/families/fam_vent_ac.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| StreetKit_Wall_Vent_Round | variant=0, width=0.34, height=0.34, depth=0.2, frame=0.03 | 88 (114) | [shot](refs/wip/families/fam_vent_ac_streetkit_wall_vent_round.png) | | |
| StreetKit_Wall_Vent_Square | variant=1, width=0.4, height=0.4, depth=0.04 | 12 (14) | [shot](refs/wip/families/fam_vent_ac_streetkit_wall_vent_square.png) | | |
| StreetKit_Roof_Mushroom_Vent | variant=2, width=0.6, height=0.62, depth=0.6, frame=0.03, taper=0.55 | 146 (134) | [shot](refs/wip/families/fam_vent_ac_streetkit_roof_mushroom_vent.png) | | Fixed 10-25: z-fighting. |
| StreetKit_Roof_Turbine_Vent | variant=3, width=0.5, height=0.7, depth=0.5 | 180 (188) | [shot](refs/wip/families/fam_vent_ac_streetkit_roof_turbine_vent.png) | | |
| AlleyKit_AC_Unit | variant=4, width=0.8, height=0.57, depth=0.38, frame=0.03, brackets=1, pipes=1, drop=0.6 | 144 (116) | [shot](refs/wip/families/fam_vent_ac_alleykit_ac_unit.png) | | Fixed 10-25: z-fighting. |
| AlleyKit_AC_Unit_Bare | variant=4, width=0.8, height=0.55, depth=0.35, fan=0 | 12 (16) | [shot](refs/wip/families/fam_vent_ac_alleykit_ac_unit_bare.png) | | |

## 8. Barriers: `mike::env_barrier::1.0`

Brief: `HoudiniSource/docs/briefs/env_barrier.md`.

![barrier hall](refs/wip/families/fam_barrier.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| StreetKit_Barricade_AFrame | variant=0, width=1.01, height=0.92, depth=0.6 | 84 (88) | [shot](refs/wip/families/fam_barrier_streetkit_barricade_aframe.png) | keep | Mike 10-25: great. |
| StreetKit_Barricade_Folding | variant=1, width=1.3, height=1.03, depth=0.63 | 72 (120) | [shot](refs/wip/families/fam_barrier_streetkit_barricade_folding.png) | keep | Mike 10-25: great. |
| StreetKit_Bollard | variant=2, width=0.2, height=0.88 | 100 (90) | [shot](refs/wip/families/fam_barrier_streetkit_bollard.png) | keep | Mike 10-25: great. |
| StreetKit_Jersey_Barrier_2m | variant=3, width=2.0, height=0.82, depth=0.62, top_width=0.15 | 32 (46) | [shot](refs/wip/families/fam_barrier_streetkit_jersey_barrier_2m.png) | keep | Mike 10-25: great. |
| StreetKit_Water_Barrier_1m5 | variant=4, width=1.7, height=0.83, depth=0.5, top_width=0.2 | 112 (166) | [shot](refs/wip/families/fam_barrier_streetkit_water_barrier_1m5.png) | keep | Mike 10-25: great. |
| CyberStreetKit_Police_Barrier | variant=5, width=2.0, height=1.1, depth=0.6 | 72 (50) | [shot](refs/wip/families/fam_barrier_cyberstreetkit_police_barrier.png) | keep | Mike 10-25: great. |
| CyberStreetKit_Security_Bollard | variant=6, width=0.22, height=1.03 | 132 (112) | [shot](refs/wip/families/fam_barrier_cyberstreetkit_security_bollard.png) | keep | Mike 10-25: great. |

## 9. Drums, jerrycans, tyres: `mike::env_drum_can::1.0`

Brief: `HoudiniSource/docs/briefs/env_drum_can.md`.

![drum_can hall](refs/wip/families/fam_drum_can.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| StackKit_Barrel_60 | variant=0, diameter=0.58, height=0.86, count=1, ribs=2 | 160 (140) | [shot](refs/wip/families/fam_drum_can_stackkit_barrel_60.png) | | |
| SlumKit_Water_Drums_Cluster | variant=1, diameter=0.58, height=0.92, count=4, ribs=2, body_strip=TarpCanvas, seed=3 | 640 (498) | [shot](refs/wip/families/fam_drum_can_slumkit_water_drums_cluster.png) | fix | Mike: drums clip into each other. Fixed 10-25: at least 1.07 diameters apart. |
| WorkshopKit_Jerrycan | variant=2, width=0.36, height=0.53, depth=0.17, count=1 | 68 (136) | [shot](refs/wip/families/fam_drum_can_workshopkit_jerrycan.png) | | Fixed 10-25: z-fighting. |
| WorkshopKit_Jerrycan_Cluster | variant=2, width=0.36, height=0.53, depth=0.17, count=3 | 204 (408) | [shot](refs/wip/families/fam_drum_can_workshopkit_jerrycan_cluster.png) | | Fixed 10-25: z-fighting. |
| WorkshopKit_Tyre_Stack | variant=3, diameter=0.68, height=0.8, count=4, seed=1 | 240 (576) | [shot](refs/wip/families/fam_drum_can_workshopkit_tyre_stack.png) | | |

## 10. Bowls and food: `mike::env_food_bowl::1.0`

Brief: `HoudiniSource/docs/briefs/env_food_bowl.md`.

![food_bowl hall](refs/wip/families/fam_food_bowl.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| FoodKit_Noodle_Bowl | variant=0, diameter=0.18, height=0.07, base=0.55, foot=0.01 | 132 (106) | [shot](refs/wip/families/fam_food_bowl_foodkit_noodle_bowl.png) | keep kit | Mike 10-25: the kit looks better; use the kit pieces unchanged. |
| FoodKit_Food_SmallBowl | variant=1, diameter=0.1, height=0.01, base_y=0.04, fill=Chili, toppings= | 44 (30) | [shot](refs/wip/families/fam_food_bowl_foodkit_food_smallbowl.png) | keep kit | Mike 10-25: the kit looks better; use the kit pieces unchanged. |
| FoodKit_Food_Noodles | variant=1, diameter=0.16, height=0.04, base_y=0.05, fill=Broth, toppings=Noodles Egg Greens Noodles, topping_count=4, topping_size=0.05 | 124 (106) | [shot](refs/wip/families/fam_food_bowl_foodkit_food_noodles.png) | keep kit | Mike 10-25: the kit looks better; use the kit pieces unchanged. |
| FoodKit_Food_Rice | variant=1, diameter=0.15, height=0.04, base_y=0.05, fill=Rice, fill_taper=0.5, toppings= | 44 (36) | [shot](refs/wip/families/fam_food_bowl_foodkit_food_rice.png) | keep kit | Mike 10-25: the kit looks better; use the kit pieces unchanged. |
| FoodKit_Food_Dumplings | variant=2, diameter=0.24, fill=Dumpling, count=7, topping_size=0.055 | 240 (282) | [shot](refs/wip/families/fam_food_bowl_foodkit_food_dumplings.png) | keep kit | Mike 10-25: the kit looks better; use the kit pieces unchanged. |
| FoodKit_Food_Pan | variant=1, diameter=0.22, height=0.02, base_y=0.01, fill=Sauce, toppings=Egg, topping_count=2, topping_size=0.07 | 84 (106) | [shot](refs/wip/families/fam_food_bowl_foodkit_food_pan.png) | keep kit | Mike 10-25: the kit looks better; use the kit pieces unchanged. |
| FoodKit_Food_Wok | variant=1, diameter=0.38, height=0.05, base_y=0.04, fill=Fried_Mix, fill_taper=0.8, toppings=Chili Greens Shrimp Tofu, topping_count=6, topping_size=0.05 | 164 (132) | [shot](refs/wip/families/fam_food_bowl_foodkit_food_wok.png) | keep kit | Mike 10-25: the kit looks better; use the kit pieces unchanged. |
| FoodKit_Food_Bun_Steamer | variant=3, diameter=0.27, height=0.08, tiers=1, count=5, topping_size=0.07, fill=Bun, lid=1 | 228 (310) | [shot](refs/wip/families/fam_food_bowl_foodkit_food_bun_steamer.png) | keep kit | Mike 10-25: the kit looks better; use the kit pieces unchanged. |
| FoodKit_Food_Skewers | variant=4, diameter=0.3, topping_size=0.02, count=3, tiers=4, toppings=Skewer_Meat Skewer_Veg | 204 (552) | [shot](refs/wip/families/fam_food_bowl_foodkit_food_skewers.png) | keep kit | Mike 10-25: the kit looks better; use the kit pieces unchanged. |

## 11. Wheels: `mike::env_wheel::1.0`

Brief: `HoudiniSource/docs/briefs/env_wheel.md`.

![wheel hall](refs/wip/families/fam_wheel.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| VehicleKit_Wheel_Car | diameter=0.66, width=0.27 | 132 (144) | [shot](refs/wip/families/fam_wheel_vehiclekit_wheel_car.png) | | |
| VehicleKit_Wheel_Kei | diameter=0.54, width=0.21 | 132 (144) | [shot](refs/wip/families/fam_wheel_vehiclekit_wheel_kei.png) | | |
| VehicleKit_Wheel_Scooter | diameter=0.44, width=0.15, rim=0.55 | 132 (144) | [shot](refs/wip/families/fam_wheel_vehiclekit_wheel_scooter.png) | | |
| VehicleKit_Wheel_Truck | diameter=0.9, width=0.35, rim=0.55, hub=0.25 | 132 (144) | [shot](refs/wip/families/fam_wheel_vehiclekit_wheel_truck.png) | | |
| VehicleKit_Wheel_Van | diameter=0.72, width=0.29 | 132 (144) | [shot](refs/wip/families/fam_wheel_vehiclekit_wheel_van.png) | | |
| CyberVehicleKit_Wheel_Armoured | diameter=0.96, width=0.39, rim=0.5, hub=0.3, rim_strip=PaintedMetalPanel | 132 (144) | [shot](refs/wip/families/fam_wheel_cybervehiclekit_wheel_armoured.png) | | |
| CyberVehicleKit_Wheel_Moto | diameter=0.64, width=0.23, rim=0.7, rim_strip=PaintedMetalPanel | 132 (144) | [shot](refs/wip/families/fam_wheel_cybervehiclekit_wheel_moto.png) | | |
| CyberVehicleKit_Wheel_Small | diameter=0.5, width=0.19 | 132 (144) | [shot](refs/wip/families/fam_wheel_cybervehiclekit_wheel_small.png) | | |

## 12. Tarps and curtains: `mike::env_tarp_curtain::1.0`

Brief: `HoudiniSource/docs/briefs/env_tarp_curtain.md`.

![tarp_curtain hall](refs/wip/families/fam_tarp_curtain.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| SoftKit_Tarp_Draped | variant=0, width=2.4, depth=2.4, height=1.02, drape_top=0.55, count=4, cloth=M_CyberMarket_Trim TarpCanvas | 48 (400) | [shot](refs/wip/families/fam_tarp_curtain_softkit_tarp_draped.png) | | |
| SoftKit_Tarp_Hanging | variant=1, width=2.0, height=1.6, count=8, fold_depth=0.1, rail=1, cloth=M_CyberMarket_Trim TarpCanvas | 52 (260) | [shot](refs/wip/families/fam_tarp_curtain_softkit_tarp_hanging.png) | | |
| SoftKit_Strip_Curtain_1m | variant=2, width=1.0, height=2.14, count=7, cloth=M_Glass_Tiling TILE_Glass | 40 (38) | [shot](refs/wip/families/fam_tarp_curtain_softkit_strip_curtain_1m.png) | | |
| ClinicKit_Privacy_Curtain_2m | variant=1, width=2.0, height=2.5, count=8, fold_depth=0.06, rail=2, x_start=1, cloth=M_Clinic_Atlas Curtain_Medical | 44 (372) | [shot](refs/wip/families/fam_tarp_curtain_clinickit_privacy_curtain_2m.png) | | |
| ClinicKit_Tarp_Wall_Panel_2m | variant=3, width=2.0, height=2.6, depth=0.1, count=2, x_start=1, frame_strip=WoodPlank, cloth=M_Clinic_Atlas Tarp_Stained | 56 (212) | [shot](refs/wip/families/fam_tarp_curtain_clinickit_tarp_wall_panel_2m.png) | | |
| SlumKit_Tarp_Roof_2x2 | variant=4, width=2.1, depth=2.04, sag=0.48, count=2, cloth=M_Corp_Atlas Tarp_Patchwork | 56 (128) | [shot](refs/wip/families/fam_tarp_curtain_slumkit_tarp_roof_2x2.png) | rebuild | Mike 10-25: doesn't like the tarp; proposes Vellum sims with a couple of torn versions. |
| SlumKit_Tarp_Roof_3x2 | variant=4, width=3.1, depth=2.04, sag=0.48, count=3, cloth=M_Corp_Atlas Tarp_Patchwork | 64 (128) | [shot](refs/wip/families/fam_tarp_curtain_slumkit_tarp_roof_3x2.png) | rebuild | Mike 10-25: doesn't like the tarp; proposes Vellum sims with a couple of torn versions. |

## 13. Planters: `mike::env_planter::1.0`

Brief: `HoudiniSource/docs/briefs/env_planter.md`.

![planter hall](refs/wip/families/fam_planter.png)

| Kit piece | Settings | Tris (kit) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| CorpKit_Planter_Box_1m2 | variant=0, width=1.2, depth=0.74, height=1.19, pot_height=0.5, pot=M_Corp_Atlas Marble, rim=BareBevel, leaves=M_Corp_Atlas Planter_Leaves, leaf_cards=3, leaf_layout=1, leaf_width=0.55 | 72 (54) | [shot](refs/wip/families/fam_planter_corpkit_planter_box_1m2.png) | | |
| CorpKit_Planter_Round | variant=1, width=0.7, height=1.37, pot_height=0.6, pot_taper=0.8, pot=M_CyberMarket_Trim PaintedMetalPanel, rim=BareBevel, leaves=M_Corp_Atlas Planter_Leaves, leaf_cards=2, leaf_width=0.72 | 96 (132) | [shot](refs/wip/families/fam_planter_corpkit_planter_round.png) | | |
| InteriorKit_Plant_Potted | variant=1, width=0.4, height=1.2, pot_height=0.4, pot_taper=0.75, pot=M_CyberMarket_Trim TarpCanvas, rim=RubberSeal, leaves=M_Interior_Atlas Plant_Leaves, leaf_cards=3, leaf_width=0.68 | 100 (86) | [shot](refs/wip/families/fam_planter_interiorkit_plant_potted.png) | | |

## PD8. Lean facade: `mike::env_kit_facade::1.0`

One connected 20 cm wall per run, cut into trim rows (Concrete plinth, floor bands, cornice, wall body, parapet cap), with openings cut where the AlleyKit inserts go. The kit's window, shop, shutter and door panels have their wall slab built in, so the tool instances slab-free copies (`SM_AlleyKit_Insert_<panel>`, made in `asset_kitFacadeInserts_01.hiplc`; the frozen originals are only read). AC units and sign brackets are kit instances too. One convex hull per straight segment.

Brief: `HoudiniSource/docs/briefs/env_kit_facade.md`. Houdini: `HoudiniSource/ProjectRunner/asset_kitFacade_01.hiplc`. Unreal: `/Game/ProjectRunner/Museum/L_KitDemo_FacadeStreet`, three facades dressed with family presets, cables, stalls and a stack.

![facade hall](refs/wip/families/review_facade.png)

| Preset | Wall tris | Kit instances (tris) | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| Alley wall: 12 m, 3 floors, shutters and doors, rough windows, AC 0.5 | 826 | 18 (2824) | [shot](refs/wip/families/review_facade_alley_wall.png) | | |
| Shop street: 16 m, 5 floors, 4 m shops, signs, metal bands | 1948 | 47 (6988) | [shot](refs/wip/families/review_facade_shop_street.png) | | |
| L-shaped curve, 10 m + 8 m, 4 floors | 1594 | 39 (5518) | [shot](refs/wip/families/review_facade_corner.png) | | |
| Narrow: 4.4 m, 2 bays, 3 floors, no parapet | 272 | 4 (484) | [shot](refs/wip/families/review_facade_narrow.png) | | |
| Dense: 4 m bays, 4 floors, shutter rows, AC 0.8, tiled wall body | 760 | 23 (2844) | [shot](refs/wip/families/review_facade_dense.png) | | |
| Two runs from two curves, 2 floors | 510 | 14 (1954) | - | | |

For scale: a default 16 x 15 m `cyber_facade` is 56,658 triangles; the 16 m shop street is 8,936 with its kit inserts.

## Unreal (2026-10-24)

- `L_KitFamiliesMuseum`: all 130 presets cook through Houdini Engine 3.0 and reload with their saved cooks (130 of 130 with meshes). The 60 presets whose kit piece is already imported have it standing beside them.
- `L_KitDemo_FacadeStreet`: three `env_kit_facade` runs (a 24 m shop street, a 24 m alley wall turned to face it, and a 5-floor L corner from a curve) with the 22 insert pieces imported, dressed with 32 family presets, cables, two stalls and a stack. 39 of 39 actors reload with meshes.
- With no curve connected, Houdini Engine gives the facade's curve input a default 2 m curve, so straight runs in UE need a curve (the build script draws one).
- Collision: Pawn-profile traces in `L_KitFamiliesMuseum` hit 91 of the 130 presets at their tops. The other 39 have no hulls on purpose, like their kit pieces (food, wheels, hanging lights, cloth, banners), except the 3 billboards: their 1 to 3 convex hulls are in UE but sit behind the trace line. Collision, sway and baking for HDAs 2-9: TASKS PD12.
| View | Image |
|---|---|
| Facade street, eye level | ![ue_street_eye](refs/wip/families/ue_street_eye.png) |
| Shop facade with lanterns on the cable | ![ue_street_south](refs/wip/families/ue_street_south.png) |
| Facade street from above | ![ue_street_high](refs/wip/families/ue_street_high.png) |
| Corner block | ![ue_street_corner](refs/wip/families/ue_street_corner.png) |
| Families museum, boxes and crates | ![ue_fam_row1_boxes](refs/wip/families/ue_fam_row1_boxes.png) |
| Families museum, cabinets | ![ue_fam_row3_cabinets](refs/wip/families/ue_fam_row3_cabinets.png) |
| Families museum, signs | ![ue_fam_row6_signs](refs/wip/families/ue_fam_row6_signs.png) |

## Fixes from Mike's review (2026-10-27)
- **Barrel, Water Drums:** ribs are open bands with the body's 12 sides and turn (no top or bottom faces, segments line up). Water drums get chamfered rims (Drum Bevel 0.04) and their bodies are cut into rows (Cut Rows on for the family). Water Drums Cluster is now 992 tris (kit 498); Ribs 0 brings it to about 800.
- **Tyre Stack:** real tyres. The tread cell sits on each of the 16 faces, the walls slope in to a hole (Hole 0.62), the bottom wall is the top one turned over, and there's an inner wall. 512 tris (kit 576). The Rubber Seal walls still stretch about 5 times across the 3 cm strip.
- **Display Fridge, Wardrobe:** Cut Rows on for env_cabinet, so tall faces are cut into true-scale rows.
- **Med Cabinet:** Handles 2.
- **Couch 2 and 3 Seat:** Bevel on. Seat Thickness, Back Angle, Leg Size and Leg Inset now drive the couch. Knobs a Variant ignores are hidden.
- **Reception Desk:** Bend and Wing Length, mitred wings; preset Bend 26.6, wings 0.89 m like the kit. Logo is a flat plane; the duplicate work top is gone.
- **Shared:** Bevel on no longer errors on pieces with no bevelled parts. Narrow strips on round parts wider than tall run around them, which lowers stretch on 23 other presets (wheels, lanterns, lamps, bollards, vents), with UVs changing and geometry the same.
- **Open:** Tool Chest "rows don't match the handles"; waiting on what the rows are.
