# Signage final set, 2026-11-06

Task 7 of `plans/2026-11-06-signage-parallax-museum.md`. Data: `signage-final-2026-11-06.json`, 30 entries: 24 signs and 6 hologram lanterns. Atlas: `Graphics/signage/atlas_tests/round03/final/`.

Every entry has the shortlist contract's fields plus `use`, which is `sign` or `hologram`. Hologram entries name `Plane` as their mesh, because they go on flat cards. The 19 kept signs copy their shortlist entries with no other change.

All of this art is generated. The library's source sheets are generated, and so are the modules. It stays out of pitch and application material, and the CMF intake closes 2026-11-10.

## The five replacements

Mike removed `ContainerMarket_Sign_Bar_01`, `Market_Sign_Noodle_Bowl_01`, `Room_Sign_Heart_Woman_01`, `SGN_0146` and `SGN_1024`, because thin lines don't look good and the vectorization didn't go well. Candidates were favorites with location `Red-light district`, 43 after taking out lanterns and signs already in the set. All use the raster `game_2k` PNG.

| Sign | Art | Mesh, face | px/m | Tile | Art fills | Median stroke, tile px | 10th percentile | 1st percentile | Lettering | Why |
|---|---|---|---|---|---|---|---|---|---|---|
| SGN_1232 | Three hearts | AFrame_Sign, 0.6 x 0.9 m | 256 | 152 x 232 | 88% | 21.4 | 11.8 | 11.6 | none | The A-frame lost all three signs. Portrait art with the heaviest strokes of the five |
| SGN_1002 | XXX and heart | Neon_Blade_1m5, 0.5 x 1.5 m | 256 | 128 x 384 | 79% | 8.7 | 8.4 | 7.6 | en | Fills the blade slot left by the heart panel. Bold letter shapes, a new type |
| SGN_1311 | Heart padlock | Medallion_Sign, 1 x 1 m | 256 | 256 x 256 | 99% | 11.5 | 11.2 | 11.0 | none | Round art for the disc, in the medallion slot. Cleanest of the padlocks |
| SGN_0126 | Hotel | Neon_Box, 1.8 x 0.6 m | 256 | 460 x 152 | 95% | 12.6 | 6.8 | 5.5 | ja,en | Art aspect 2.88 on a face of 3.0. A real shop sign, and the most lettered pick |
| SGN_1320 | Masquerade mask | Box_Sign_1m, 1 x 0.6 m | 256 | 256 x 152 | 65% | 11.5 | 10.0 | 9.8 | none | Bold wide shape, and the small box had one sign |

All five are `neon`, because they are flat single-colour library art like the kept neon signs, and go on the unlit master. Alpha covers 34% to 47% of the art, inside the 25% to 86% of the kept neon signs. Filled areas at emission 6 will be brighter than an outline, so check SGN_1232 and SGN_1320 in UE.

Alternates, with reasons, are in the table below.

### How line weight was measured

Distance transform of alpha above 127 on the full-size art, ridge points only, stroke = 2 x distance - 1, scaled to the tile. The top candidates were measured again on the reduced tile, and viewed at target size. The bar is about 2 tile pixels. All five clear it at the 1st percentile, by at least 5.5 px.

For scale: SGN_1024, which Mike cut, has a 10th percentile of 2.2 tile px at its A-frame size. Modules are opaque, so alpha says nothing about their strokes and they weren't measured.

Art was viewed for names. None of the five holds a name from another game or a real company. SGN_1194 and SGN_1197, the neighbours of SGN_1196 Dollhouse, were viewed too: a collar, and the word Lust. Neither could be tied to another game.

### All 43 candidates

Measured as if on the mesh nearest its aspect, at 256 px/m, from the full-size art.

| Sign | Aspect | Nearest mesh | Median stroke, tile px | 10th percentile | Decision |
|---|---|---|---|---|---|
| SGN_0137 | 1.02 | Medallion_Sign | 7.5 | 7.1 | Double ring at 7 px. SGN_1127 is the cleaner 24h |
| SGN_1127 | 0.99 | Medallion_Sign | 9.9 | 8.4 | Alternate, medallion. Lettered |
| SGN_0799 | 0.86 | Medallion_Sign | 5.8 | 1.7 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_0973 | 0.59 | AFrame_Sign | 7.3 | 4.0 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_1300 | 0.99 | Medallion_Sign | 11.3 | 11.0 | Skipped. A rabbit head in a ring is close to a real brand mark |
| SGN_0800 | 0.57 | AFrame_Sign | 10.1 | 7.8 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_0801 | 0.96 | Medallion_Sign | 6.6 | 2.6 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_1455 | 0.70 | AFrame_Sign | 3.0 | 2.1 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_0743 | 0.98 | Medallion_Sign | 12.2 | 11.6 | Alternate, medallion. Same subject, sparkle tips thin to 1.9 px |
| SGN_1456 | 0.38 | Neon_Blade_1m5 | 4.1 | 2.9 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_1305 | 1.01 | Medallion_Sign | 18.2 | 15.9 | Passes line weight. Body crop, and the set needs icon and lettered types more. Not picked |
| SGN_1459 | 1.20 | Medallion_Sign | 3.2 | 2.7 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_1306 | 1.03 | Medallion_Sign | 13.5 | 5.5 | Passes line weight. Body crop, and the set needs icon and lettered types more. Not picked |
| SGN_1308 | 1.00 | Medallion_Sign | 11.4 | 11.1 | Passes line weight. Body crop, and the set needs icon and lettered types more. Not picked |
| SGN_0982 | 0.41 | Neon_Blade_1m5 | 5.6 | 3.0 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_1249 | 0.88 | Medallion_Sign | 17.9 | 16.4 | Alternate, A-frame. Fills 75% of the face against 88% |
| SGN_1311 | 0.99 | Medallion_Sign | 11.5 | 11.2 | Picked: medallion |
| SGN_1313 | 1.03 | Medallion_Sign | 11.5 | 5.9 | Alternate, medallion. Chain links at 5.5 px |
| SGN_1467 | 0.49 | AFrame_Sign | 3.8 | 2.9 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_0988 | 0.36 | Neon_Blade_1m5 | 10.2 | 9.5 | Alternate, blade. Outline hearts, no letters |
| SGN_1469 | 0.75 | AFrame_Sign | 3.7 | 2.2 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_0816 | 0.96 | Medallion_Sign | 9.7 | 4.3 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_1317 | 1.05 | Medallion_Sign | 12.0 | 10.7 | Passes line weight. Body crop, and the set needs icon and lettered types more. Not picked |
| SGN_0817 | 0.74 | AFrame_Sign | 7.9 | 4.1 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_0789 | 1.03 | Medallion_Sign | 11.5 | 7.7 | Close to SGN_1313. Alternate |
| SGN_0818 | 0.83 | Medallion_Sign | 12.6 | 1.6 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_0993 | 0.53 | AFrame_Sign | 3.8 | 1.5 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_0819 | 1.14 | Medallion_Sign | 3.0 | 1.2 | Figure art. Fine hair and limb detail, which is what Mike cut. Not picked |
| SGN_1320 | 1.09 | Medallion_Sign | 17.7 | 15.4 | Picked: small box |
| SGN_1321 | 1.04 | Medallion_Sign | 11.0 | 10.8 | Passes line weight. Body crop, and the set needs icon and lettered types more. Not picked |
| SGN_1262 | 1.01 | Medallion_Sign | 11.8 | 11.5 | Skipped. A rabbit head in a ring is close to a real brand mark |
| SGN_1230 | 1.46 | Box_Sign_1m | 9.6 | 4.4 | Thin at spikes and studs, under 1 px at the 1st percentile |
| SGN_1264 | 1.23 | Medallion_Sign | 15.9 | 13.8 | Alternate, small box. Spikes thin to 4.6 px |
| SGN_1231 | 1.14 | Medallion_Sign | 6.5 | 5.0 | Whip handle is a thin line |
| SGN_1232 | 0.58 | AFrame_Sign | 21.3 | 11.7 | Picked: A-frame |
| SGN_0826 | 1.41 | Box_Sign_1m | 5.3 | 3.6 | Thin kana line, and PARADISE is already in the set |
| SGN_1233 | 1.01 | Medallion_Sign | 30.6 | 14.9 | Passes line weight. Body crop, and the set needs icon and lettered types more. Not picked |
| SGN_1234 | 0.44 | Neon_Blade_1m5 | 11.7 | 9.9 | Alternate, blade. Close to the A-frame pick |
| SGN_1002 | 0.42 | Neon_Blade_1m5 | 8.7 | 8.4 | Picked: blade |
| SGN_1194 | 0.83 | Medallion_Sign | 14.6 | 8.9 | Passes. A collar, and SGN_1264 fits better. Neighbour of SGN_1196, viewed, no name in the art |
| SGN_1197 | 1.22 | Medallion_Sign | 7.7 | 7.1 | Alternate at 512 px/m. Script is 5 px at 256 |
| SGN_1147 | 0.85 | Medallion_Sign | 7.6 | 6.6 | Alternate, medallion. Clean, but an outline at 7 px |
| SGN_0126 | 2.88 | Neon_Box | 12.7 | 6.9 | Picked: neon box |

## The 24 signs

20 neon on `M_SGN_R3_SignUnlit`, 4 panels on `M_SGN_R3_Sign`. Densities: 64 x1, 128 x6, 256 x15, 512 x2.

| # | id | mesh `SM_SGN_<..>_01` | px/m | tile px | kind | lettering | page |
|---|---|---|---|---|---|---|---|
| 1 | SGN_0102 | Banner_Vertical_2m | 256 | 128 x 496 | neon | ja | T_SGN_R3_Final_256_C |
| 2 | City_Sign_Club_Vertical_01 | Banner_Vertical_2m | 256 | 128 x 496 | panel | ja | T_SGN_R3_Final_256_C |
| 3 | SGN_0101 | Neon_Blade_1m5 | 512 | 256 x 768 | neon | ja | T_SGN_R3_Final_512_C |
| 4 | SGN_0136 | Neon_Blade_1m5 | 256 | 128 x 384 | neon | en | T_SGN_R3_Final_256_C |
| 5 | City_Sign_Open_01 | Neon_Blade_1m5 | 256 | 128 x 384 | panel | ja | T_SGN_R3_Final_256_C |
| 6 | SGN_0099 | Banner_Vertical_2m | 128 | 64 x 248 | neon | ja,en | T_SGN_R3_Final_128_C |
| 7 | SGN_1203 | Neon_Blade_3m | 256 | 128 x 768 | neon | none | T_SGN_R3_Final_256_C |
| 8 | SGN_0117 | Banner_Vertical_3m | 128 | 64 x 376 | neon | ja | T_SGN_R3_Final_128_C |
| 9 | SGN_0125 | Box_Sign_1m | 256 | 256 x 152 | neon | ja,en | T_SGN_R3_Final_256_C |
| 10 | SGN_1037 | Box_Sign_2m | 256 | 512 x 152 | neon | ja | T_SGN_R3_Final_256_C |
| 11 | SGN_0140 | Box_Sign_2m | 128 | 256 x 76 | neon | ja,en | T_SGN_R3_Final_128_C |
| 12 | City_Sign_Paradise_01 | Box_Sign_2m | 256 | 512 x 152 | panel | en | T_SGN_R3_Final_256_C |
| 13 | SGN_0139 | Neon_Box | 128 | 232 x 76 | neon | ja,en | T_SGN_R3_Final_128_C |
| 14 | Market_Sign_Human_Machine_01 | Neon_Box | 256 | 460 x 152 | panel | ja | T_SGN_R3_Final_256_C |
| 15 | SGN_0124 | Medallion_Sign | 512 | 512 x 512 | neon | ja | T_SGN_R3_Final_512_C |
| 16 | SGN_0431 | Medallion_Sign | 128 | 128 x 128 | neon | ja | T_SGN_R3_Final_128_C |
| 17 | SGN_1043 | Billboard_Small | 256 | 368 x 188 | neon | en | T_SGN_R3_Final_256_C |
| 18 | SGN_1046 | Billboard_Medium | 128 | 388 x 208 | neon | ja,en | T_SGN_R3_Final_128_C |
| 19 | SGN_0128 | Billboard_Large | 64 | 400 x 220 | neon | ja,en | T_SGN_R3_Final_64_C |
| 20 | SGN_1232 | AFrame_Sign | 256 | 152 x 232 | neon | none | T_SGN_R3_Final_256_C |
| 21 | SGN_1002 | Neon_Blade_1m5 | 256 | 128 x 384 | neon | en | T_SGN_R3_Final_256_C |
| 22 | SGN_1311 | Medallion_Sign | 256 | 256 x 256 | neon | none | T_SGN_R3_Final_256_C |
| 23 | SGN_0126 | Neon_Box | 256 | 460 x 152 | neon | ja,en | T_SGN_R3_Final_256_C |
| 24 | SGN_1320 | Box_Sign_1m | 256 | 256 x 152 | neon | none | T_SGN_R3_Final_256_C |

## The 6 hologram lanterns

Lantern images are fine for a hologram, not for a fold sign. They sit on flat cards with `MI_SGN_R3_Holo_512_Clean`, on Runner's `M_SGN_Hologram`, unchanged. That master takes one `AtlasSize`, so the page is square.

Density is 512 px/m on cards 0.45 m wide. At 256 px/m the fine lines reach 1.2 to 2 tile px. A 0.5 m card at 512 px/m doesn't fit a 1024 page, and a 2048 page would cost 4 MiB for six tiles, so the cards are slightly narrower than asked.

| id | Name | Card m | Tile px | Lettering |
|---|---|---|---|---|
| SGN_0142 | Sake lantern | 0.45 x 0.91 | 232 x 464 | ja |
| SGN_0143 | Woman lantern | 0.45 x 0.94 | 232 x 480 | ja |
| SGN_0144 | Night lantern | 0.45 x 0.92 | 232 x 472 | ja |
| SGN_0145 | Love hotel lantern | 0.45 x 1.09 | 232 x 560 | ja |
| SGN_0146 | Heart lantern | 0.45 x 0.95 | 232 x 488 | none |
| SGN_0147 | Bar lantern | 0.45 x 1.05 | 232 x 536 | en |

## Pages and memory

| Page | Size | Tiles | Fill | BC7 |
|---|---|---|---|---|
| `T_SGN_R3_Final_64_C` | 512 x 256 | 1 | 67% | 128 KiB |
| `T_SGN_R3_Final_128_C` | 512 x 512 | 6 | 66% | 256 KiB |
| `T_SGN_R3_Final_256_C` | 2048 x 1024 | 15 | 44% | 2048 KiB |
| `T_SGN_R3_Final_512_C` | 1024 x 1024 | 2 | 44% | 1024 KiB |
| `T_SGN_R3_Holo_512_C` | 1024 x 1024 | 6 | 66% | 1024 KiB |
| Total | | 30 | | 4480 KiB |

The first atlas's four Red pages were 3456 KiB for 24 signs. `T_SGN_R3_Final_256_C` is 2048 x 1024 because its 15 tiles wouldn't pack on 1024 square. Texture settings are BC7, sRGB, nearest, no mips and clamp, read back from UE in `Docs/signage_r3/task7_assets.json`.

## Not verified

- How these read to Mike. Line weight is a measure, and viewing at tile size isn't his eye in UE.
- That the Japanese on SGN_0126 is correct beyond reading it myself: ホテル, HOTEL.
- Whether the lantern lettering reads at game distance on a 0.45 m card.
