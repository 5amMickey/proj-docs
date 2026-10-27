# Kit museum review

The 513 ProjectDev kit pieces after the Houdini re-UV, for Mike's review. Built 2026-10-22. Scene: `HoudiniSource/ProjectRunner/asset_kitMuseum_01.hiplc`, one object per kit (`/obj/env_museum_<Kit>`). Brief: `HoudiniSource/docs/briefs/projectdev_kit_reuv.md`. Tool: `mike::env_trim_uv::1.0`.

## How to read the pictures

- Each hall shows one kit. In each grid cell, the top piece has the **original UVs** from the Blender build and the piece under it has the **new UVs**. The label under the new piece gives its name and triangle count, with the original count in brackets.
- Pieces show the trim template (labelled colour strips) and the labelled atlas reference sheets, so stretching shows up as squashed or smeared labels.
- The camera looks slightly from the right and above so tops and sides show. Open the scene to orbit any piece.

## Totals

| | Before | After |
|---|---|---|
| Stretched faces (wide trim strips and atlas faces off true scale, or squashed beyond 1.3x) | 20272 | 103 of 57438 |
| Triangles, all 513 pieces and 44 LOD1s | 104577 | 114577 (+9.6%, from row cuts) |
| Cook errors | | 0 |

Faces still flagged after the re-UV are curved, non-planar quads (draped tarps, vehicle panels), off by 10 to 16%. 17 zero-area faces (lines with no surface) were removed.

**Decision** column: keep (use as is), fix (say what), rebuild (becomes an HDA), drop. Leave blank if no opinion.

## AtmosKit (14 pieces)

![AtmosKit](refs/wip/museum/museum_AtmosKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Ad_Screen_Pole | 100 (96) |  | 0 (23) | | |
| Dust_Motes | 4 (4) |  | 0 (0) | | |
| Exhaust_Steam_Roof | 58 (58) |  | 0 (3) | | |
| Fog_Card | 2 (2) |  | 0 (1) | | |
| Gutter_Pour | 84 (64) |  | 0 (37) | | |
| Lens_Flare | 2 (2) |  | 0 (0) | | |
| Light_Cone_A | 24 (24) |  | 0 (12) | | |
| Light_Cone_B | 24 (24) |  | 0 (12) | | |
| Light_Shaft | 4 (4) |  | 0 (2) | | |
| Neon_Fragment_Dangling | 122 (122) |  | 0 (23) | | |
| Puddle_Reflection_A | 12 (12) |  | 0 (12) | | |
| Puddle_Reflection_B | 12 (12) |  | 0 (0) | | |
| Rain_Streaks | 4 (4) |  | 0 (0) | | |
| Spark_Burst | 6 (6) |  | 0 (0) | | |

## ClinicKit (22 pieces)

![ClinicKit](refs/wip/museum/museum_ClinicKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Battery_Power_Rig | 280 (276) |  | 0 (47) | | |
| Biohazard_Bin | 78 (78) |  | 0 (1) | | |
| Clinic_Sign | 70 (70) |  | 0 (3) | | |
| Decal_Blood_Floor | 30 (30) |  | 0 (10) | | |
| Display_Case_Arm | 260 (254) |  | 0 (99) | | |
| Display_Case_Eyes | 276 (270) |  | 0 (69) | | |
| Display_Case_Spine | 324 (318) |  | 0 (37) | | |
| Floor_Cable_Mess | 772 (772) |  | 0 (139) | | |
| IV_Stand | 418 (418) |  | 0 (144) | | |
| Implant_Chart | 2 (2) |  | 0 (1) | | |
| Instrument_Trolley | 286 (286) |  | 0 (91) | | |
| Med_Cabinet | 46 (42) |  | 0 (2) | | |
| Parts_Fridge | 84 (66) |  | 0 (10) | | |
| Privacy_Curtain_2m | 372 (372) |  | 0 (8) | | |
| Robot_Arm_Rail | 424 (424) |  | 0 (162) | | |
| Sink_Unit | 186 (180) |  | 0 (59) | | |
| Surgery_Display_Stand | 236 (236) |  | 0 (77) | | |
| Surgical_Chair | 424 (424) |  | 0 (129) | | |
| Surgical_Lamp | 302 (302) |  | 0 (176) | | |
| Tarp_Wall_Panel_2m | 212 (212) |  | 0 (14) | | |
| Vitals_Monitor_Arm | 126 (126) |  | 0 (74) | | |
| XRay_Lightbox | 22 (22) |  | 0 (1) | | |

## CorpKit (8 pieces)

![CorpKit](refs/wip/museum/museum_CorpKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Directory_Totem | 82 (66) |  | 0 (4) | | |
| Lobby_Bench | 72 (72) |  | 0 (1) | | |
| Lobby_Screen_Wall_4m | 66 (46) |  | 0 (3) | | |
| Logo_Wall_4m | 74 (44) |  | 0 (5) | | |
| Planter_Box_1m2 | 66 (66) |  | 0 (2) | | |
| Planter_Round | 144 (144) |  | 0 (28) | | |
| Reception_Desk | 62 (56) |  | 0 (14) | | |
| Turnstile_Gate_Pair | 156 (140) |  | 0 (10) | | |

## CyberStreetKit (18 pieces)

![CyberStreetKit](refs/wip/museum/museum_CyberStreetKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| ATM_Freestanding | 60 (40) |  | 0 (7) | | |
| ATM_Wall | 56 (48) |  | 0 (3) | | |
| Ad_Drone | 570 (502) |  | 0 (177) | | |
| Capsule_Pod | 66 (44) |  | 0 (6) | | |
| Capsule_Stack_3x2 | 634 (502) |  | 0 (92) | | |
| Charging_Station | 136 (120) |  | 0 (14) | | |
| Data_Terminal | 104 (80) |  | 0 (13) | | |
| Holo_Projector_Ground | 132 (132) |  | 0 (26) | | |
| Holo_Projector_Hanging | 88 (88) |  | 0 (48) | | |
| Holo_Projector_Wall | 76 (76) |  | 0 (17) | | |
| Holo_Tape_Cordon_2m | 212 (180) |  | 0 (50) | | |
| Noodle_Robot | 224 (222) |  | 0 (58) | | |
| Payphone_Booth | 182 (178) |  | 0 (3) | | |
| Police_Barrier | 78 (62) |  | 0 (10) | | |
| Security_Bollard | 144 (124) |  | 0 (51) | | |
| Security_Turret | 230 (190) |  | 0 (34) | | |
| Street_Kiosk | 112 (104) |  | 0 (2) | | |
| Surveillance_Camera | 138 (138) |  | 0 (34) | | |

## CyberVehicleKit (8 pieces)

![CyberVehicleKit](refs/wip/museum/museum_CyberVehicleKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Armoured_Van | 534 (530) | 342 (338) | 2 (59) | | |
| Drone_Delivery | 762 (762) | 394 (394) | 0 (286) | | |
| Flying_Car | 920 (920) | 596 (596) | 0 (324) | | |
| Motorbike | 190 (190) | 126 (126) | 0 (85) | | |
| TukTuk | 198 (200) | 132 (134) | 4 (36) | | |
| Wheel_Armoured | 144 (144) | 72 (72) | 0 (72) | | |
| Wheel_Moto | 144 (144) | 72 (72) | 0 (72) | | |
| Wheel_Small | 144 (144) | 72 (72) | 0 (72) | | |

## SlumKit (10 pieces)

![SlumKit](refs/wip/museum/museum_SlumKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Container_Home | 440 (440) |  | 0 (41) | | |
| Container_Home_Upper | 520 (520) |  | 0 (73) | | |
| LeanTo_Corrugated_3m | 200 (200) |  | 0 (6) | | |
| Makeshift_Ladder_3m | 360 (184) |  | 0 (48) | | |
| Rope_Bridge_3m | 756 (676) |  | 0 (20) | | |
| Shanty_Room_1m5 | 126 (122) |  | 0 (29) | | |
| Shanty_Room_2m | 128 (122) |  | 0 (25) | | |
| Tarp_Roof_2x2 | 128 (128) |  | 0 (0) | | |
| Tarp_Roof_3x2 | 128 (128) |  | 0 (48) | | |
| Water_Drums_Cluster | 610 (510) |  | 0 (234) | | |

## TechKit (11 pieces)

![TechKit](refs/wip/museum/museum_TechKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Antenna_Farm | 654 (636) |  | 0 (170) | | |
| CRT_Stack | 262 (250) |  | 0 (45) | | |
| Cooling_Unit | 202 (186) |  | 0 (71) | | |
| Netrunner_Chair | 634 (630) |  | 0 (102) | | |
| Patch_Panel | 262 (262) |  | 0 (19) | | |
| Server_Rack_Closed | 44 (44) |  | 0 (3) | | |
| Server_Rack_Damaged | 284 (278) |  | 0 (27) | | |
| Server_Rack_Open | 332 (300) |  | 0 (69) | | |
| Spline_CableTray_2m | 484 (452) |  | 0 (10) | | |
| Terminal_Jury | 210 (210) |  | 0 (13) | | |
| Uplink_Dish | 670 (662) |  | 0 (148) | | |

## WorkshopKit (16 pieces)

![WorkshopKit](refs/wip/museum/museum_WorkshopKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Battery_Stack | 178 (178) |  | 0 (50) | | |
| Bench_Vise | 100 (100) |  | 0 (21) | | |
| Car_Body_Stripped | 474 (468) |  | 14 (94) | | |
| Decal_OilStain | 12 (12) |  | 0 (0) | | |
| Engine_Hoist | 340 (316) |  | 0 (90) | | |
| Jerrycan | 148 (148) |  | 0 (55) | | |
| Jerrycan_Cluster | 432 (432) |  | 9 (165) | | |
| Parts_Bins_Rack | 348 (348) |  | 0 (20) | | |
| Pegboard_1m2 | 66 (62) |  | 0 (5) | | |
| Scooter_Frame_Stripped | 248 (248) |  | 0 (118) | | |
| Tool_Chest | 328 (322) |  | 0 (71) | | |
| Toolbox_Closed | 122 (122) |  | 0 (7) | | |
| Toolbox_Open | 100 (100) |  | 0 (8) | | |
| Tyre_Stack | 588 (588) |  | 0 (240) | | |
| Welding_Cart | 550 (550) |  | 0 (169) | | |
| Workbench_2m | 126 (114) |  | 0 (5) | | |

## AlleyKit (85 pieces)

![AlleyKit](refs/wip/museum/museum_AlleyKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| AC_Unit | 128 (128) |  | 0 (40) | | |
| AC_Unit_Bare | 28 (28) |  | 0 (0) | | |
| Balcony_2m | 222 (222) |  | 0 (20) | | |
| Balcony_CageCard_CornerL_1m | 184 (160) |  | 0 (6) | | |
| Balcony_CageCard_CornerR_1m | 184 (160) |  | 0 (6) | | |
| Balcony_CageCard_Straight_2m | 92 (92) |  | 0 (0) | | |
| Balcony_Cage_CornerL_1m | 332 (308) |  | 0 (4) | | |
| Balcony_Cage_CornerR_1m | 332 (308) |  | 0 (4) | | |
| Balcony_Cage_Straight_2m | 242 (242) |  | 0 (0) | | |
| Balcony_Concrete_CornerL_1m | 160 (144) |  | 0 (2) | | |
| Balcony_Concrete_CornerR_1m | 160 (144) |  | 0 (2) | | |
| Balcony_Concrete_Straight_2m | 78 (78) |  | 0 (0) | | |
| Balcony_SteelCard_CornerL_1m | 68 (68) |  | 0 (8) | | |
| Balcony_SteelCard_CornerR_1m | 68 (68) |  | 0 (8) | | |
| Balcony_SteelCard_Straight_2m | 44 (44) |  | 0 (1) | | |
| Balcony_Steel_CornerL_1m | 108 (108) |  | 0 (16) | | |
| Balcony_Steel_CornerR_1m | 108 (108) |  | 0 (16) | | |
| Balcony_Steel_Straight_2m | 66 (66) |  | 0 (0) | | |
| FireEscape_Card_CornerL_1m | 120 (120) |  | 0 (16) | | |
| FireEscape_Card_CornerR_1m | 120 (120) |  | 0 (16) | | |
| FireEscape_Card_Straight_2m | 94 (94) |  | 0 (9) | | |
| FireEscape_CornerL_1m | 160 (160) |  | 0 (24) | | |
| FireEscape_CornerR_1m | 160 (160) |  | 0 (24) | | |
| FireEscape_Ladder_3m | 172 (172) |  | 0 (16) | | |
| FireEscape_Platform | 256 (256) |  | 0 (32) | | |
| FireEscape_Stairs_3m | 624 (474) |  | 0 (181) | | |
| FireEscape_Straight_2m | 116 (116) |  | 0 (8) | | |
| Laundry_Line_3m | 184 (184) |  | 0 (24) | | |
| Roof_Antenna | 90 (90) |  | 0 (15) | | |
| Roof_Parapet_2m | 40 (40) |  | 0 (0) | | |
| Roof_SatelliteDish | 130 (130) |  | 0 (63) | | |
| Roof_Slab_2x2 | 24 (24) |  | 0 (0) | | |
| Roof_WaterTank | 402 (334) |  | 0 (104) | | |
| SignBracket | 70 (70) |  | 0 (20) | | |
| Spline_Ledge_2m | 24 (24) |  | 0 (0) | | |
| Wall_CornerPillar_3m | 32 (32) |  | 0 (0) | | |
| Wall_Door_2x3 | 204 (202) | 160 (158) | 0 (18) | | |
| Wall_Downpipe_3m | 106 (106) |  | 0 (42) | | |
| Wall_Downpipe_3m_Bare | 86 (86) |  | 0 (42) | | |
| Wall_EndCap_3m | 56 (56) |  | 0 (0) | | |
| Wall_GlassFront_2x3 | 372 (340) |  | 0 (25) | | |
| Wall_GlassFront_2x4 | 400 (368) |  | 0 (25) | | |
| Wall_InsideCorner_3m | 36 (36) |  | 0 (0) | | |
| Wall_OutsideCorner_2x3 | 116 (108) |  | 0 (1) | | |
| Wall_OutsideCorner_2x4 | 132 (124) |  | 0 (1) | | |
| Wall_PipeRiser_3m | 76 (76) | 20 (20) | 0 (12) | | |
| Wall_PipeRiser_3m_Bare | 56 (56) | 20 (20) | 0 (12) | | |
| Wall_Plain_1x3 | 84 (84) |  | 0 (0) | | |
| Wall_Plain_1x4 | 100 (100) |  | 0 (0) | | |
| Wall_Plain_2x3 | 84 (84) |  | 0 (0) | | |
| Wall_Plain_2x4 | 100 (100) |  | 0 (0) | | |
| Wall_ShopElectronics_2x3 | 364 (346) |  | 0 (9) | | |
| Wall_ShopNoodleBar_2x3 | 446 (432) | 282 (268) | 0 (5) | | |
| Wall_ShopOpen_2x3 | 286 (276) |  | 0 (6) | | |
| Wall_ShopOpen_2x4 | 314 (304) |  | 0 (6) | | |
| Wall_ShopOpen_4x3 | 380 (370) | 256 (246) | 0 (5) | | |
| Wall_ShopOpen_4x4 | 408 (398) | 284 (274) | 0 (5) | | |
| Wall_ShopPharmacy_2x3 | 380 (362) |  | 0 (10) | | |
| Wall_ShutterRowHalf_4x3 | 214 (212) |  | 0 (2) | | |
| Wall_ShutterRowHalf_4x4 | 256 (254) |  | 0 (2) | | |
| Wall_ShutterRowHalf_6x3 | 214 (212) |  | 0 (2) | | |
| Wall_ShutterRow_4x3 | 170 (168) |  | 0 (1) | | |
| Wall_ShutterRow_4x4 | 214 (212) |  | 0 (11) | | |
| Wall_ShutterRow_6x3 | 170 (168) |  | 0 (1) | | |
| Wall_ShutterRow_6x4 | 214 (212) |  | 0 (11) | | |
| Wall_Shutter_2x3 | 194 (192) |  | 0 (1) | | |
| Wall_Shutter_2x4 | 228 (226) |  | 0 (10) | | |
| Wall_SteelDoorTiled_2x3 | 474 (410) | 288 (224) | 0 (22) | | |
| Wall_SteelDoor_2x3 | 458 (394) | 278 (214) | 0 (22) | | |
| Wall_SteelDoor_2x4 | 474 (410) | 294 (230) | 0 (22) | | |
| Wall_SteelDoor_4x3 | 462 (398) | 282 (218) | 0 (22) | | |
| Wall_SteelDoor_4x4 | 554 (426) | 374 (246) | 0 (38) | | |
| Wall_Tiled_2x3 | 94 (94) |  | 0 (0) | | |
| Wall_WindowAC_2x3 | 252 (228) | 196 (172) | 0 (8) | | |
| Wall_WindowBarredCard_2x3 | 244 (220) | 200 (176) | 0 (6) | | |
| Wall_WindowBarredCard_4x3 | 260 (228) |  | 0 (9) | | |
| Wall_WindowBarredCard_4x4 | 276 (244) |  | 0 (9) | | |
| Wall_WindowBarred_2x3 | 354 (330) | 198 (174) | 0 (48) | | |
| Wall_WindowBoarded_2x3 | 270 (246) |  | 0 (6) | | |
| Wall_WindowCurtain_2x3 | 224 (200) | 180 (156) | 0 (6) | | |
| Wall_WindowDeep_2x3 | 236 (212) | 192 (168) | 0 (8) | | |
| Wall_WindowSmall_2x3 | 178 (178) | 134 (134) | 0 (0) | | |
| Wall_Window_2x3 | 222 (198) | 178 (154) | 0 (6) | | |
| Wall_Window_4x3 | 238 (206) | 194 (162) | 0 (8) | | |
| Wall_Window_4x4 | 254 (222) | 210 (178) | 0 (8) | | |

## ConnectorKit (20 pieces)

![ConnectorKit](refs/wip/museum/museum_ConnectorKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Anchor_Bolt_Set | 192 (192) |  | 0 (72) | | |
| Cable_Clip_Single | 58 (58) |  | 0 (12) | | |
| Cable_Clip_Triple | 154 (154) |  | 0 (36) | | |
| Conduit_Strap | 90 (90) |  | 0 (26) | | |
| Diagonal_Strut_40 | 32 (32) |  | 0 (0) | | |
| Diagonal_Strut_60 | 32 (32) |  | 0 (0) | | |
| Downpipe_Strap | 42 (42) |  | 0 (0) | | |
| Hook | 62 (62) |  | 0 (17) | | |
| L_Bracket_30 | 34 (34) |  | 0 (6) | | |
| L_Bracket_45 | 34 (34) |  | 0 (6) | | |
| L_Bracket_60 | 34 (34) |  | 0 (6) | | |
| Pipe_Saddle_Clamp_R03 | 90 (90) |  | 0 (16) | | |
| Pipe_Saddle_Clamp_R06 | 90 (90) |  | 0 (16) | | |
| Pipe_Saddle_Clamp_R10 | 90 (90) |  | 0 (16) | | |
| Sign_Arm_02 | 38 (38) |  | 0 (13) | | |
| Sign_Arm_06 | 54 (54) |  | 0 (19) | | |
| Sign_Arm_10 | 54 (54) |  | 0 (19) | | |
| Turnbuckle | 172 (172) |  | 0 (32) | | |
| U_Bolt | 128 (128) |  | 0 (36) | | |
| Wall_Plate | 74 (74) |  | 0 (45) | | |

## ContainerKit (6 pieces)

![ContainerKit](refs/wip/museum/museum_ContainerKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Container20_Closed | 1422 (1262) | 334 (174) | 0 (93) | | |
| Container20_DoorsOpen | 1422 (1262) | 410 (250) | 0 (93) | | |
| Container20_ShopCorner | 1240 (956) | 644 (360) | 0 (107) | | |
| Container20_ShopFront | 1126 (842) | 570 (286) | 0 (79) | | |
| Container20_ShopSide | 1662 (1438) | 562 (338) | 0 (125) | | |
| Container40_Closed | 1422 (1262) | 334 (174) | 0 (93) | | |

## DamageKit (24 pieces)

![DamageKit](refs/wip/museum/museum_DamageKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Beam_Steel_2m | 56 (56) |  | 0 (12) | | |
| Cable_Frayed_End | 208 (208) |  | 0 (22) | | |
| Cable_Section_2m | 104 (104) |  | 0 (8) | | |
| Column_Concrete_3m | 24 (24) |  | 0 (0) | | |
| Debris_Chunks_Set | 84 (84) |  | 0 (45) | | |
| Decal_Bullet_Holes | 2 (2) |  | 0 (0) | | |
| Decal_Crack_A | 2 (2) |  | 0 (0) | | |
| Decal_Scorch | 2 (2) |  | 0 (0) | | |
| Decal_Soot_Streak | 2 (2) |  | 0 (1) | | |
| Decal_Water_Stain | 2 (2) |  | 0 (1) | | |
| Floor_Slab_2x2 | 24 (24) |  | 0 (4) | | |
| Floor_Slab_Broken | 210 (210) |  | 0 (45) | | |
| Glass_Pane_1x1 | 12 (12) |  | 0 (0) | | |
| Glass_Shards | 15 (15) |  | 0 (5) | | |
| Pipe_Broken_End | 64 (64) |  | 0 (20) | | |
| Pipe_Section_2m | 64 (64) |  | 0 (0) | | |
| Plank_1m | 12 (12) |  | 0 (6) | | |
| Plank_Snapped | 76 (76) |  | 0 (38) | | |
| Rebar_Bundle | 332 (332) |  | 0 (52) | | |
| Rubble_Pile_Large | 284 (284) |  | 0 (135) | | |
| Rubble_Pile_Small | 132 (132) |  | 0 (59) | | |
| Wall_Broken_Edge_2x3 | 332 (332) |  | 0 (76) | | |
| Wall_Solid_2x3 | 24 (24) |  | 0 (4) | | |
| Wall_Solid_2x4 | 24 (24) |  | 0 (4) | | |

## FoodKit (19 pieces)

![FoodKit](refs/wip/museum/museum_FoodKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Cash_Box | 52 (52) |  | 0 (0) | | |
| Drinks_Cooler | 94 (94) |  | 0 (0) | | |
| Folding_Table | 140 (140) |  | 0 (32) | | |
| Food_Bun_Steamer | 310 (310) |  | 0 (122) | | |
| Food_Cart | 430 (430) |  | 0 (121) | | |
| Food_Dumplings | 282 (282) |  | 0 (122) | | |
| Food_Noodles | 106 (106) |  | 0 (61) | | |
| Food_Pan | 106 (106) |  | 0 (60) | | |
| Food_Rice | 36 (36) |  | 0 (24) | | |
| Food_Skewers | 552 (552) |  | 0 (60) | | |
| Food_SmallBowl | 30 (30) |  | 0 (20) | | |
| Food_Wok | 132 (132) |  | 0 (73) | | |
| Noodle_Bowl | 106 (106) |  | 0 (60) | | |
| POS_Terminal | 34 (34) |  | 0 (1) | | |
| Plastic_Stool | 120 (80) |  | 0 (30) | | |
| PotsPans_Rail | 324 (324) |  | 0 (68) | | |
| Shelf_Dressing | 498 (498) |  | 0 (176) | | |
| Small_Fridge | 52 (52) |  | 0 (2) | | |
| Wok_Stove | 274 (274) |  | 0 (74) | | |

## GroundKit (32 pieces)

![GroundKit](refs/wip/museum/museum_GroundKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Decal_WetSheen_2m | 4 (4) |  | 0 (1) | | |
| Driveway_Kerb_4m | 34 (34) |  | 0 (6) | | |
| FX_DripLine_2m | 4 (4) |  | 0 (2) | | |
| FX_Splash | 6 (6) |  | 0 (2) | | |
| FX_Steam_Vent | 6 (6) |  | 0 (3) | | |
| FX_Steam_Wok | 4 (4) |  | 0 (2) | | |
| Grate_Steam | 18 (18) |  | 0 (3) | | |
| Kerb_Ramp_2m | 22 (22) |  | 0 (2) | | |
| Litter_Bottle | 76 (76) |  | 0 (14) | | |
| Litter_Can_Crushed | 76 (76) |  | 0 (28) | | |
| Litter_Can_Upright | 60 (60) |  | 0 (24) | | |
| Litter_Cardboard_Scrap | 6 (6) |  | 0 (3) | | |
| Litter_Cig_Butts | 2 (2) |  | 0 (0) | | |
| Litter_Cup | 38 (38) |  | 0 (22) | | |
| Litter_Flyer | 6 (6) |  | 0 (3) | | |
| Litter_Leaves | 14 (14) |  | 0 (0) | | |
| Litter_Newspaper | 16 (16) |  | 0 (8) | | |
| Litter_Paper_A | 6 (6) |  | 0 (3) | | |
| Litter_Paper_B | 18 (18) |  | 0 (9) | | |
| Litter_Paper_Crumpled | 36 (36) |  | 0 (18) | | |
| Litter_Plastic_Bag | 42 (42) |  | 0 (23) | | |
| Litter_Receipt | 18 (18) |  | 0 (9) | | |
| Litter_Scatter | 24 (24) |  | 0 (0) | | |
| Litter_Wrapper | 6 (6) |  | 0 (3) | | |
| Puddle_1 | 12 (12) |  | 0 (0) | | |
| Puddle_2 | 12 (12) |  | 0 (12) | | |
| Puddle_3 | 12 (12) |  | 0 (0) | | |
| Stair_Handrail_1m | 204 (204) |  | 0 (48) | | |
| Stair_Handrail_3m | 288 (288) |  | 0 (66) | | |
| Stairs_1m | 204 (124) |  | 0 (40) | | |
| Stairs_3m | 584 (344) |  | 0 (120) | | |
| Wall_Handrail_Stair_3m | 240 (240) |  | 0 (88) | | |

## InteriorKit (25 pieces)

![InteriorKit](refs/wip/museum/museum_InteriorKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Armchair | 252 (252) |  | 0 (76) | | |
| Bed_Single | 238 (186) |  | 0 (48) | | |
| Bookshelf | 210 (108) |  | 0 (26) | | |
| Chair_Dining | 184 (116) |  | 0 (18) | | |
| Chair_Folding | 116 (116) |  | 0 (32) | | |
| Chair_Office | 368 (368) |  | 0 (124) | | |
| Couch_2Seat | 340 (340) |  | 0 (110) | | |
| Couch_3Seat | 428 (428) |  | 0 (144) | | |
| Desk | 152 (118) |  | 0 (11) | | |
| Fan_Electric | 440 (440) |  | 0 (120) | | |
| Futon_Tatami | 108 (108) |  | 0 (34) | | |
| Kotatsu | 80 (68) |  | 0 (6) | | |
| Lamp_Ceiling | 136 (136) |  | 0 (52) | | |
| Lamp_Floor | 162 (162) |  | 0 (72) | | |
| Plant_Potted | 118 (98) |  | 0 (20) | | |
| Rice_Cooker | 144 (144) |  | 0 (67) | | |
| Rug_Rect | 10 (10) |  | 0 (5) | | |
| Rug_Round | 58 (58) |  | 0 (20) | | |
| Stool_Bar | 272 (272) |  | 0 (60) | | |
| TV_CRT | 58 (58) |  | 0 (6) | | |
| TV_Stand | 72 (62) |  | 0 (6) | | |
| Table_Chabudai | 144 (112) |  | 0 (44) | | |
| Table_Coffee | 140 (100) |  | 0 (20) | | |
| Table_Dining | 172 (96) |  | 0 (18) | | |
| Wardrobe | 234 (100) |  | 0 (24) | | |

## MeatKit (13 pieces)

![MeatKit](refs/wip/museum/museum_MeatKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Carcass_Hanging | 192 (192) |  | 0 (69) | | |
| Chopping_Block | 179 (100) |  | 0 (36) | | |
| Creature_Head | 192 (192) |  | 0 (91) | | |
| Cut_Ribs | 92 (92) |  | 0 (61) | | |
| Cut_Shank | 80 (80) |  | 0 (36) | | |
| Cut_Slab | 12 (12) |  | 0 (6) | | |
| Display_Fridge | 58 (58) |  | 0 (0) | | |
| Fish_Large | 58 (58) |  | 0 (33) | | |
| Fish_Small | 58 (58) |  | 0 (33) | | |
| Hanging_Scale | 138 (140) |  | 4 (53) | | |
| Ice_Trough | 272 (272) |  | 0 (132) | | |
| Meat_Tray | 66 (60) |  | 0 (21) | | |
| Tentacle_Bundle | 508 (508) |  | 0 (246) | | |

## RoofKit (3 pieces)

![RoofKit](refs/wip/museum/museum_RoofKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Billboard_Scaffold_6m | 1270 (1174) |  | 0 (345) | | |
| Shack_Corrugated_3x2 | 546 (366) |  | 0 (116) | | |
| StairAccess_2x3 | 384 (320) |  | 0 (49) | | |

## ShopKit (10 pieces)

![ShopKit](refs/wip/museum/museum_ShopKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Counter_Glass_1m2 | 66 (66) |  | 0 (1) | | |
| Counter_Noodle_2m | 462 (450) |  | 0 (58) | | |
| Menu_Board_1m2 | 28 (28) |  | 0 (1) | | |
| Shelf_Drinks_1m | 136 (100) |  | 0 (19) | | |
| Shelf_Electronics_1m | 124 (92) |  | 0 (16) | | |
| Shelf_Pharmacy_1m | 140 (100) |  | 0 (19) | | |
| Shelf_Snacks_1m | 124 (92) |  | 0 (16) | | |
| Stock_Bottles | 384 (384) |  | 0 (48) | | |
| Stock_Boxes | 90 (90) |  | 0 (14) | | |
| Stock_NoodlePacks | 190 (190) |  | 0 (89) | | |

## SignKit (25 pieces)

![SignKit](refs/wip/museum/museum_SignKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| AFrame_Sign | 60 (56) |  | 0 (12) | | |
| Banner_Vertical_2m | 96 (96) |  | 0 (44) | | |
| Banner_Vertical_3m | 120 (120) |  | 0 (56) | | |
| Billboard_Large | 304 (208) |  | 0 (49) | | |
| Billboard_Medium | 210 (162) |  | 0 (41) | | |
| Billboard_Small | 164 (148) |  | 0 (41) | | |
| Box_Sign_1m | 106 (98) |  | 0 (28) | | |
| Box_Sign_1m_Bare | 28 (24) |  | 0 (5) | | |
| Box_Sign_2m | 114 (98) |  | 0 (28) | | |
| Box_Sign_2m_Bare | 36 (24) |  | 0 (5) | | |
| Lamp_Cage | 210 (210) |  | 0 (57) | | |
| Lamp_Pendant | 194 (194) |  | 0 (90) | | |
| Lantern_Cluster | 272 (272) |  | 0 (8) | | |
| Lantern_Gourd | 168 (168) |  | 0 (80) | | |
| Lantern_Round | 176 (176) |  | 0 (84) | | |
| Lantern_Square | 168 (136) |  | 0 (16) | | |
| Lantern_Tall | 92 (92) |  | 0 (0) | | |
| Medallion_Sign | 132 (132) |  | 0 (36) | | |
| Neon_Blade_1m5 | 176 (176) |  | 0 (16) | | |
| Neon_Blade_1m5_Bare | 136 (136) |  | 0 (0) | | |
| Neon_Blade_3m | 200 (200) |  | 0 (16) | | |
| Neon_Blade_3m_Bare | 160 (160) |  | 0 (0) | | |
| Neon_Box | 74 (74) |  | 0 (0) | | |
| Spline_BulbString_2m | 408 (408) |  | 0 (128) | | |
| Street_Lamp | 110 (110) |  | 0 (21) | | |

## SoftKit (7 pieces)

![SoftKit](refs/wip/museum/museum_SoftKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Banner_Flag | 148 (148) |  | 0 (72) | | |
| Cardboard_Box_Closed | 26 (26) |  | 0 (0) | | |
| Cardboard_Box_Open | 48 (48) |  | 0 (0) | | |
| Cardboard_Flat_Stack | 48 (48) |  | 0 (0) | | |
| Strip_Curtain_1m | 38 (38) |  | 0 (0) | | |
| Tarp_Draped | 534 (412) |  | 10 (200) | | |
| Tarp_Hanging | 260 (260) |  | 0 (128) | | |

## SplineKit (28 pieces)

![SplineKit](refs/wip/museum/museum_SplineKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Bridge_Pillar | 46 (46) |  | 0 (0) | | |
| ChainLink_Broken_2m5 | 232 (232) |  | 0 (56) | | |
| ChainLink_Gate_1m2 | 126 (126) |  | 0 (17) | | |
| ChainLink_Post | 74 (74) |  | 0 (30) | | |
| Decal_Arrow_Straight | 2 (2) |  | 0 (1) | | |
| Decal_Arrow_Turn | 2 (2) |  | 0 (1) | | |
| Decal_Crosswalk_6m | 2 (2) |  | 0 (1) | | |
| Decal_StopLine_3m | 2 (2) |  | 0 (1) | | |
| Duct_Elbow90 | 98 (98) |  | 1 (50) | | |
| Guardrail_End | 114 (114) |  | 0 (24) | | |
| Guardrail_Post | 40 (40) |  | 0 (0) | | |
| Pipe_Elbow90 | 96 (96) |  | 0 (36) | | |
| Pipe_Flange | 28 (28) |  | 0 (12) | | |
| Railing_Post | 50 (50) |  | 0 (13) | | |
| Road_Junction_T_6m | 30 (30) |  | 0 (0) | | |
| Road_Junction_X_6m | 14 (14) |  | 0 (0) | | |
| Sidewalk_Corner_3m | 36 (36) |  | 0 (0) | | |
| Spline_BarbedWire_2m5 | 28 (28) |  | 0 (8) | | |
| Spline_BridgeDeck_4m | 268 (204) |  | 0 (64) | | |
| Spline_Cable_2m | 192 (192) |  | 0 (0) | | |
| Spline_ChainLink_2m5 | 180 (180) |  | 0 (4) | | |
| Spline_Duct_2m | 56 (56) |  | 0 (0) | | |
| Spline_Guardrail_4m | 204 (204) |  | 0 (48) | | |
| Spline_Kerb_2m | 36 (36) |  | 0 (0) | | |
| Spline_Pipe_2m | 128 (128) |  | 0 (0) | | |
| Spline_Railing_2m | 236 (236) |  | 0 (0) | | |
| Spline_RoadDeck_4m | 60 (60) |  | 0 (0) | | |
| Spline_Sidewalk_4m | 60 (60) |  | 0 (0) | | |

## StackKit (5 pieces)

![StackKit](refs/wip/museum/museum_StackKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Barrel_60 | 152 (152) |  | 0 (24) | | |
| Crate_Half_50 | 112 (112) |  | 0 (4) | | |
| Crate_Long_100 | 112 (112) |  | 0 (4) | | |
| Crate_Small_25 | 108 (108) |  | 0 (2) | | |
| Pallet_120 | 288 (252) |  | 0 (6) | | |

## StallKit (13 pieces)

![StallKit](refs/wip/museum/museum_StallKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Awning_2m | 336 (336) |  | 0 (136) | | |
| BackWall_1m | 216 (204) |  | 0 (6) | | |
| ButcherTable_2m | 208 (208) |  | 0 (48) | | |
| Cable_1m | 104 (104) |  | 0 (16) | | |
| Counter_1m | 106 (106) |  | 0 (10) | | |
| Crate_50 | 112 (112) |  | 0 (4) | | |
| HookRail_2m | 236 (236) |  | 0 (64) | | |
| Lantern_Paper | 84 (84) |  | 0 (0) | | |
| LightBar_1m | 68 (68) |  | 0 (19) | | |
| Post_2m2 | 50 (50) |  | 0 (13) | | |
| Sign_Hanging | 160 (160) |  | 0 (20) | | |
| Stool | 132 (128) |  | 0 (34) | | |
| Umbrella_2m | 488 (488) |  | 0 (204) | | |

## StationKit (21 pieces)

![StationKit](refs/wip/museum/museum_StationKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Balustrade_Glass_2m | 50 (50) |  | 0 (20) | | |
| Bench | 482 (434) |  | 0 (52) | | |
| Canopy_4m | 130 (74) |  | 0 (4) | | |
| Clock_Timetable | 48 (48) |  | 0 (2) | | |
| Entrance_Box | 462 (406) |  | 0 (47) | | |
| Hanging_Exit_Sign | 28 (28) |  | 0 (2) | | |
| Light_Fluorescent | 28 (28) |  | 0 (0) | | |
| Pillar_Box | 40 (40) |  | 0 (0) | | |
| Platform_Segment_4m | 60 (44) |  | 0 (8) | | |
| Platform_StairVoid_8m | 472 (432) |  | 0 (57) | | |
| ScreenWall_4m | 296 (202) |  | 0 (8) | | |
| Security_Metal_Detector | 232 (200) |  | 0 (5) | | |
| Skybridge_Column_4m | 908 (636) |  | 0 (132) | | |
| Skybridge_Corner_4m | 627 (450) |  | 1 (107) | | |
| Skybridge_EndPortal | 208 (124) |  | 0 (10) | | |
| Skybridge_Gate_4m | 940 (668) |  | 4 (163) | | |
| Skybridge_Notice_4m | 912 (628) |  | 0 (137) | | |
| Skybridge_Solid_4m | 876 (604) |  | 0 (131) | | |
| Skybridge_Straight_4m | 876 (604) |  | 0 (131) | | |
| Stairs_Tiled_3m | 354 (354) |  | 0 (20) | | |
| Station_Name_Sign | 36 (36) |  | 0 (2) | | |

## StreetKit (29 pieces)

![StreetKit](refs/wip/museum/museum_StreetKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Barricade_AFrame | 196 (100) |  | 0 (34) | | |
| Barricade_Folding | 132 (132) |  | 0 (36) | | |
| Bollard | 102 (102) |  | 0 (30) | | |
| Breaker_Panel | 48 (44) |  | 0 (4) | | |
| Cable_Dangling | 372 (372) |  | 0 (120) | | |
| Cable_Junction_Cluster | 1000 (1000) |  | 0 (88) | | |
| Cable_WallDrop_3m | 344 (344) |  | 0 (20) | | |
| Drain_Grate | 12 (12) |  | 0 (0) | | |
| Dumpster | 242 (222) |  | 0 (52) | | |
| Exhaust_Cowl | 80 (80) |  | 0 (11) | | |
| Extractor_Hood | 114 (108) |  | 0 (2) | | |
| Fire_Extinguisher | 104 (104) |  | 0 (34) | | |
| Fire_Hydrant | 224 (224) |  | 0 (90) | | |
| Guard_Fence_2m | 70 (70) |  | 0 (11) | | |
| Jersey_Barrier_2m | 58 (58) |  | 0 (0) | | |
| Junction_Box | 52 (46) |  | 0 (3) | | |
| Manhole_Cover | 94 (46) |  | 0 (14) | | |
| Meter_Box | 50 (50) |  | 0 (9) | | |
| Power_Pole | 368 (332) |  | 0 (108) | | |
| Roof_Mushroom_Vent | 146 (146) |  | 0 (72) | | |
| Roof_Turbine_Vent | 200 (200) |  | 0 (80) | | |
| Spline_CableBundle_4m | 320 (320) |  | 0 (0) | | |
| Traffic_Cone | 82 (80) |  | 0 (41) | | |
| Trash_Bags | 252 (252) |  | 0 (144) | | |
| Trash_Bin | 110 (90) |  | 0 (30) | | |
| Vending_Machine | 56 (54) |  | 0 (14) | | |
| Wall_Vent_Round | 128 (126) |  | 0 (30) | | |
| Wall_Vent_Square | 14 (14) |  | 0 (0) | | |
| Water_Barrier_1m5 | 222 (178) |  | 0 (38) | | |

## StructKit (28 pieces)

![StructKit](refs/wip/museum/museum_StructKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Beam_Box_2m | 92 (92) |  | 0 (0) | | |
| Beam_Box_4m | 156 (156) |  | 0 (0) | | |
| Beam_C_2m | 88 (88) |  | 0 (0) | | |
| Beam_C_4m | 152 (152) |  | 0 (0) | | |
| Beam_I_1m | 80 (80) |  | 0 (0) | | |
| Beam_I_2m | 128 (128) |  | 0 (0) | | |
| Beam_I_3m | 176 (176) |  | 0 (0) | | |
| Beam_I_4m | 224 (224) |  | 0 (0) | | |
| Beam_L_2m | 68 (68) |  | 0 (0) | | |
| Beam_L_4m | 116 (116) |  | 0 (0) | | |
| Bolt_Group | 96 (96) |  | 0 (36) | | |
| Catwalk_Stairs_3m | 714 (504) |  | 0 (91) | | |
| Column_H_3m | 176 (176) |  | 0 (0) | | |
| Joint_Base_Plate | 168 (168) |  | 0 (56) | | |
| Joint_Column_Cap | 76 (76) |  | 0 (24) | | |
| Joint_Corner_Gusset | 20 (20) |  | 0 (2) | | |
| Joint_End_Plate | 76 (76) |  | 0 (40) | | |
| Joint_Knee_Brace | 88 (88) |  | 0 (20) | | |
| Joint_Splice_Plate | 240 (240) |  | 0 (88) | | |
| Joint_T | 176 (176) |  | 0 (80) | | |
| Scaffold_Bay_2x1x2 | 320 (320) |  | 0 (104) | | |
| Scaffold_Coupler | 24 (24) |  | 0 (0) | | |
| Scaffold_Plank_2m | 24 (24) |  | 0 (0) | | |
| Scaffold_Pole_3m | 42 (42) |  | 0 (8) | | |
| Spline_Catwalk_2m | 388 (388) |  | 0 (0) | | |
| Spline_Ladder_3m | 236 (236) |  | 0 (0) | | |
| Spline_PipeRack_4m | 604 (604) |  | 0 (24) | | |
| Spline_Skybridge_4m | 754 (754) |  | 0 (64) | | |

## VehicleKit (13 pieces)

![VehicleKit](refs/wip/museum/museum_VehicleKit.png)

| Piece | Tris (was) | LOD1 tris (was) | Stretched faces (was) | Decision | Feedback |
|---|---|---|---|---|---|
| Bicycle | 504 (504) |  | 0 (176) | | |
| Car | 578 (578) | 258 (258) | 14 (104) | | |
| KeiTruck | 560 (560) | 260 (260) | 2 (101) | | |
| KeiVan | 582 (582) | 250 (250) | 11 (111) | | |
| Scooter | 140 (128) |  | 0 (44) | | |
| Taxi | 556 (556) | 264 (264) | 8 (83) | | |
| Truck | 476 (468) | 242 (234) | 0 (35) | | |
| Van | 570 (570) | 274 (274) | 16 (54) | | |
| Wheel_Car | 144 (144) | 72 (72) | 0 (72) | | |
| Wheel_Kei | 144 (144) | 72 (72) | 0 (72) | | |
| Wheel_Scooter | 144 (144) |  | 0 (72) | | |
| Wheel_Truck | 144 (144) | 72 (72) | 0 (72) | | |
| Wheel_Van | 144 (144) | 72 (72) | 0 (72) | | |
