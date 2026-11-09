# Signage shortlist, 2026-11-06

Task 1 of `plans/2026-11-06-signage-parallax-museum.md`. Data: `signage-shortlist-2026-11-06.json` (24 entries). Nothing in the frozen mesh folder, the library art, the Environment_Kit or the parallax pack was written.

## What Mike needs to decide

1. Library signs may be generated too. The plan says only the modules and the parallax pack are generated. The five source sheets behind the 17 library picks (`Cyberpunk Neon Signage Asset Sheet`, `Neon Nightlife Sticker Sheet`, `Neon Sign Sticker Sheet`, `Neon Nightlife Signage Collection`, `Neon Animal Icon Signage Collection`) are not marked either way in anything I read. If they are AI-made, the handoff line covers all 24 signs, not 7.
2. Add the six `WallAd_*` meshes? Their source is not the frozen folder (see "Runner meshes without an FBX"). They have clean one-quad faces. I left them out so Task 3 stays on frozen FBX files.
3. Box signs carry a 0.2 x 0.6 m end cap in the face slot. Task 3 needs a rule for it (see "SignKit face check").

## The 24 signs

16 neon, 8 panel. 17 library, 7 module. 12 meshes. Densities: 64 x1, 128 x6, 256 x13, 512 x4. Rows 1 to 8 are four twin pairs (module and library art of the same subject, on the same mesh and density) for the "modules against library art" hall. Every sign is at its own physical face size, so tile pixels = face metres x density.

| # | id | name | src | mesh `SM_SGN_<..>_01` | face m | px/m | tile px | kind | lett. |
|---|---|---|---|---|---|---|---|---|---|
| 1 | SGN_0102 | Club | lib | Banner_Vertical_2m | 0.5 x 1.94 | 256 | 128 x 496 | neon | ja |
| 2 | City_Sign_Club_Vertical_01 | クラブ | mod | Banner_Vertical_2m | 0.5 x 1.94 | 256 | 128 x 496 | panel | ja |
| 3 | SGN_0101 | Beautiful women | lib | Neon_Blade_1m5 | 0.5 x 1.5 | 512 | 256 x 768 | neon | ja |
| 4 | Room_Sign_Heart_Woman_01 | ♡美女♡ | mod | Neon_Blade_1m5 | 0.5 x 1.5 | 512 | 256 x 768 | panel | ja |
| 5 | SGN_1024 | Bar | lib | AFrame_Sign | 0.6 x 0.9 | 256 | 152 x 232 | neon | ja,en |
| 6 | ContainerMarket_Sign_Bar_01 | BAR | mod | AFrame_Sign | 0.6 x 0.9 | 256 | 152 x 232 | panel | en |
| 7 | SGN_0136 | Open (vertical) | lib | Neon_Blade_1m5 | 0.5 x 1.5 | 256 | 128 x 384 | neon | en |
| 8 | City_Sign_Open_01 | 営業中 | mod | Neon_Blade_1m5 | 0.5 x 1.5 | 256 | 128 x 384 | panel | ja |
| 9 | SGN_0099 | Red light district | lib | Banner_Vertical_2m | 0.5 x 1.94 | 128 | 64 x 248 | neon | ja,en |
| 10 | SGN_1203 | Vertical tube A | lib | Neon_Blade_3m | 0.5 x 3.0 | 256 | 128 x 768 | neon | none |
| 11 | SGN_0117 | Alley marker | lib | Banner_Vertical_3m | 0.5 x 2.94 | 128 | 64 x 376 | neon | ja |
| 12 | SGN_0125 | Dating | lib | Box_Sign_1m | 1.0 x 0.6 | 256 | 256 x 152 | neon | ja,en |
| 13 | SGN_1037 | This way | lib | Box_Sign_2m | 2.0 x 0.6 | 256 | 512 x 152 | neon | ja |
| 14 | SGN_0140 | Cocktails | lib | Box_Sign_2m | 2.0 x 0.6 | 128 | 256 x 76 | neon | ja,en |
| 15 | City_Sign_Paradise_01 | PARADISE | mod | Box_Sign_2m | 2.0 x 0.6 | 256 | 512 x 152 | panel | en |
| 16 | SGN_0139 | All you can drink | lib | Neon_Box | 1.8 x 0.6 | 128 | 232 x 76 | neon | ja,en |
| 17 | Market_Sign_Human_Machine_01 | 人間×機械 | mod | Neon_Box | 1.8 x 0.6 | 256 | 460 x 152 | panel | ja |
| 18 | SGN_0124 | Love round | lib | Medallion_Sign | 1.0 disc | 512 | 512 x 512 | neon | ja |
| 19 | SGN_0431 | Koi circle | lib | Medallion_Sign | 1.0 disc | 128 | 128 x 128 | neon | ja |
| 20 | Market_Sign_Noodle_Bowl_01 | noodle bowl | mod | Medallion_Sign | 1.0 disc | 256 | 256 x 256 | panel | none |
| 21 | SGN_0146 | Heart lantern | lib | AFrame_Sign | 0.6 x 0.9 | 512 | 308 x 460 | panel | none |
| 22 | SGN_1043 | Girls Girls Girls | lib | Billboard_Small | 1.44 x 0.74 | 256 | 368 x 188 | neon | en |
| 23 | SGN_1046 | Welcome | lib | Billboard_Medium | 3.04 x 1.64 | 128 | 388 x 208 | neon | ja,en |
| 24 | SGN_0128 | Live show | lib | Billboard_Large | 6.24 x 3.44 | 64 | 400 x 220 | neon | ja,en |

Range covered: tall blades and banners, wide box signs, a disc, an A-frame, three billboard sizes, a tube, an arrow board, a lantern silhouette, an animal emblem, a script plaque, lettered and unlettered art in all four lettering classes.

How `kind` was chosen: library art that is a neon outline is `neon`. The lantern and every module are `panel`. A module face is an opaque rectangle, so neon emission (about 6) would light its dark background and bezel. Panel (about 1.5) is the safer whole-artwork value for them.

Fit policy for Task 2 (my proposal, not in the contract):
- Library art keeps its aspect: contain-fit inside the face-sized tile, centred, transparent padding. Four picks leave visible padding: SGN_1203 fills about 60% of its tile width, SGN_0117 about 65%, SGN_0146 about 75%, SGN_1037 about 80% of its tile height.
- Module art fills the whole tile. Stretch against the face aspect is 1.02 to 1.14 on all seven, so no crop is needed.

## Three shapes for the density ladder

Ladder sizes are face metres x density, rounded to a multiple of 4.

| Shape | Sign | Mesh | 64 | 128 | 256 | 512 |
|---|---|---|---|---|---|---|
| tall blade, 1:3 | SGN_0101 | Neon_Blade_1m5 (0.5 x 1.5 m) | 32 x 96 | 64 x 192 | 128 x 384 | 256 x 768 |
| wide box, 3.3:1 | SGN_0140 | Box_Sign_2m (2.0 x 0.6 m) | 128 x 40 | 256 x 76 | 512 x 152 | 1024 x 308 |
| round, 1:1 | SGN_0124 | Medallion_Sign (1.0 m) | 64 x 64 | 128 x 128 | 256 x 256 | 512 x 512 |

All three are library art with fine detail (hearts and kanji, small English subtitle, double ring), so legibility loss shows early.

## Meshes for Task 3

12 distinct `SM_SGN_<Piece>_01` copies, one per frozen FBX in `C:/Prod/ProjectDev/SourceContent/Meshes/export/Environment/SignKit/`:

`Neon_Blade_1m5`, `Neon_Blade_3m`, `Banner_Vertical_2m`, `Banner_Vertical_3m`, `Box_Sign_1m`, `Box_Sign_2m`, `Neon_Box`, `Medallion_Sign`, `AFrame_Sign`, `Billboard_Small`, `Billboard_Medium`, `Billboard_Large`.

## SignKit face check

Method: `hou.hipFile.importFBX` in `PipelineSandbox/Houdini/hython.cmd`, then the file SOP's polygons grouped by material, plane and adjacency. Blender was not needed. Tri counts are sum(n-2) per polygon.

All 12 can take a 0-1 face. Four need a rule or extra care.

| Piece | Old face slot | Tris | Faces on the slot | Face size m | Note |
|---|---|---|---|---|---|
| Neon_Blade_1m5 | M_Glyph_Atlas | 164 | 2 faces, 3 coplanar quads each, tile an exact rect | 0.5 x 1.5 | Each quad is one glyph cell. Re-UV all three as one planar 0-1 face. |
| Neon_Blade_3m | M_Glyph_Atlas | 188 | 2 faces, 6 coplanar quads each, exact rect | 0.5 x 3.0 | Same, six cells. |
| Banner_Vertical_2m | M_Sign_Atlas | 96 | 2 faces, 14 quads each (2 x 7 grid) | 0.5 x about 1.94 | Cloth ripple tilts normals up to about 5 degrees, so the face is not planar. UV by grid position, not planar projection. |
| Banner_Vertical_3m | M_Sign_Atlas | 120 | 2 faces, 20 quads each (2 x 10 grid) | 0.5 x about 2.94 | Same. |
| Box_Sign_1m | M_Sign_Atlas | 86 | 2 faces, 1 quad each, plus a 0.2 x 0.6 end cap in the same slot | 1.0 x 0.6 | End cap needs a rule. |
| Box_Sign_2m | M_Sign_Atlas | 86 | same | 2.0 x 0.6 | Same. |
| Neon_Box | M_Glyph_Atlas | 62 | 1 face, 3 coplanar quads, single-sided | 1.8 x 0.6 | Back is trim. |
| Medallion_Sign | M_Glyph_Atlas | 120 | 2 faces, 14-triangle fans | 1.0 disc | All current glyph UVs have u = 0.625, so the face UV is collapsed. Rebuild as planar 0-1 over the bounding box. The 14-gon covers about 77% of the square, so square art loses its corners. |
| AFrame_Sign | M_Screen_Atlas | 44 | 2 faces, 1 quad each, tilted about 12 degrees | 0.6 x 0.9 | Clean. |
| Billboard_Small | M_Screen_Atlas | 136 | 1 quad, front only | 1.44 x 0.74 | Clean. |
| Billboard_Medium | M_Screen_Atlas | 150 | 1 quad, front only | 3.04 x 1.64 | Clean. |
| Billboard_Large | M_Screen_Atlas | 196 | 1 quad, front only | 6.24 x 3.44 | Clean. |

Findings Task 3 should act on:
- The sign slot has three different names across the pieces (`M_Glyph_Atlas`, `M_Sign_Atlas`, `M_Screen_Atlas`). All become `M_SGN_Face`. The other slot on each piece is `M_CyberMarket_Trim` and stays.
- Box end cap: if it stays in `M_SGN_Face` with its old UV, it samples a random corner of the new face texture. If it maps 0-1 it shows squashed art. The clean fix is to move it to the trim slot, which breaks "all other slots stay". Needs a rule from the lead.
- Mirroring: on every face except the banners' -X side, the stored UV runs against the polygon winding (u runs to the viewer's left when the viewer faces the polygon's front). The two banner sides are mirrored against each other. Lettering would mirror on at least one side of each double-sided piece if the UVs were kept. Whether it looks mirrored in UE also depends on the importer's V flip, which I did not test. Task 3 should build the UVs from geometry and check both sides on a render.
- The frozen FBX carry a `UCX_` hull and `SOCKET_` null nodes (sockets listed in `SignKit_sockets.json`). A plain Houdini rebuild may not carry these through the re-export, so Task 3 must check that the copies keep collision and sockets.
- Pieces that cannot take a face at all: `Lantern_Cluster`, `Lantern_Gourd`, `Lantern_Round`, `Lantern_Square`, `Lantern_Tall`, `Lamp_Cage`, `Lamp_Pendant`, `Street_Lamp`, `Spline_BulbString_2m`. Each has only `M_CyberMarket_Trim`, so there is no face slot. That is why the lantern silhouette SGN_0146 sits on an A-frame. The `_Bare` blades and boxes have the same faces as their dressed twins and are not used.

### Runner meshes without an FBX in the SignKit folder

`SM_SignKit_WallAd_Poster_A/B/C`, `WallAd_Tall`, `WallAd_Wide_A/B` and `Lantern_Bar/Bulb/Cord` are in Runner (`Content/ProjectDev/SignKit`) but not in the frozen export folder. They are Houdini-built. Source: `C:/Users/GameDevPC0403/Documents/GitHub/HoudiniSource/ProjectRunner/geo/export/projectdev/SignKit/*.fbx`, made by `scripts/projectdev_kit/make_wall_ads.py` (WallAd) and listed in `data/projectdev_ue_import.csv`.

The WallAd faces are one quad each, wall at z = 0 with +Z out, Y up:

| Piece | Face slot | Face size m | Tris |
|---|---|---|---|
| WallAd_Wide_A, Wide_B | M_Screen_Atlas | 1.8 x 1.0 | 12 |
| WallAd_Tall | M_Screen_Atlas | 0.9 x 1.6 | 12 |
| WallAd_Poster_A, B, C | M_Decal_Atlas (paper, 5 mm off the wall) | 0.7 x 0.9 | 2 |

I did not probe `Lantern_Bar`, `Lantern_Bulb` and `Lantern_Cord`.

Runner's imported meshes come from these Houdini FBX files, and some differ from the frozen ones: `Billboard_Small` 152 tris vs 136 frozen, `Box_Sign_1m` 94 vs 86, `AFrame_Sign` 48 vs 44. `Banner_Vertical_2m` (96), `Neon_Blade_1m5` (164) and `Lantern_Round` (176) match. So `SM_SGN_` copies from the frozen files will not match Runner's in-game triangle counts on those three.

## Change verdicts

| Asset | Changes before use? | What |
|---|---|---|
| SignKit | Yes | Re-UV the face slot on 12 pieces and rename it `M_SGN_Face`. Rules needed for the box end cap, the medallion's collapsed UV and the banner grid. Rebuild `UCX_` and sockets. Nine pieces have no face slot. WallAd and three lanterns have a different source. |
| Sign library | No art changes | Use the 2K game PNGs as they are. Crop to the alpha bounding box (every pick has a 32 px transparent margin) and contain-fit into the tile. Someone is editing the library right now (hidden count went 71 to 205 and 226 red-light locations became assigned while I worked), so re-read `sgn-` tags and hidden flags before Task 2 starts. |
| Environment_Kit modules | Processing only, no map changes | Crop BaseColor to a face rect. Only 47 of 698 `asset.json` files carry one (`roughness_regions`). Three picks use it (Club_Vertical, Open, Paradise). The other four use the padding bounding box, which includes the bezel. Maps are opaque, 2048 square, art roughly 0.5 to 1.9k px. Lettering is clean on all seven picks (checked at crop size) but malformed on others (below). All generated. |
| Parallax pack | No changes to the files | All 96 window textures are 512 x 1024 (verified). Task 4 makes the pixelated copies and its own material. The atlas has no gutters, so it is no use for POM. Heights are estimated pseudo-depth, not a scan. The installer was not run and the pack says it was never executed in UE. Generated. |

## Atlas plan

BC7 is 1 byte per pixel and there are no mips, so memory = pixels. Tiles have a 4 px gutter on every side, origins and sizes are multiples of 4. Pages are grouped by density because the name contract has a density token (`T_SGN_R3_<Page>_<Density>_C`). Packing is a simple shelf packer, so these are upper bounds; a better packer could take the 256 and 512 pages to 1024 x 1024.

| Page texture | Density | Page size | Tiles | Fill | BC7 | Signs |
|---|---|---|---|---|---|---|
| `T_SGN_R3_Red_64_C` | 64 | 512 x 256 | 1 | 71% | 128 KiB | SGN_0128 |
| `T_SGN_R3_Red_128_C` | 128 | 512 x 1024 | 6 | 37% | 512 KiB | SGN_0099, SGN_0117, SGN_0140, SGN_0139, SGN_0431, SGN_1046 |
| `T_SGN_R3_Red_256_C` | 256 | 1024 x 2048 | 13 | 41% | 2048 KiB | SGN_0102, City_Sign_Club_Vertical_01, SGN_0136, City_Sign_Open_01, SGN_1024, ContainerMarket_Sign_Bar_01, SGN_1203, SGN_0125, SGN_1037, City_Sign_Paradise_01, Market_Sign_Human_Machine_01, Market_Sign_Noodle_Bowl_01, SGN_1043 |
| `T_SGN_R3_Red_512_C` | 512 | 1024 x 2048 | 4 | 39% | 2048 KiB | SGN_0101, Room_Sign_Heart_Woman_01, SGN_0124, SGN_0146 |

Shortlist: 4 pages, 4736 KiB (4.6 MiB).

Ladder (3 shapes x 4 densities), one page per density: `T_SGN_R3_Ladder_64_C` 256 x 128, `_128_C` 512 x 256, `_256_C` 1024 x 512, `_512_C` 2048 x 1024. 4 pages, 2720 KiB (2.7 MiB).

Total 8 pages, 7456 KiB (7.3 MiB). One mixed 2048 x 2048 page would hold all 24 at 4096 KiB and 47% fill, but its name could not carry a density.

Final atlas after Mike's picks is smaller, since only approved signs go in.

## Parallax import estimate (Task 4)

Source: `Textures/W01..W08`, 12 maps each, all 512 x 1024. Plan scope: Bump Offset, POM and six layers on two contrasting windows, native and pixelated, plus all 8 windows on Bump Offset.

| Group | Maps | Count | Res | Memory |
|---|---|---|---|---|
| All 8 windows, Bump Offset | Color_RGBA (BC7 sRGB), Height (G8, linear), Emissive (BC7 sRGB) | 24 | 512 x 1024 | 12 MiB |
| Two windows, six layers | `L_..._00` to `_05` RGBA (BC7 sRGB) | 12 | 512 x 1024 | 6 MiB |
| Pixelated arm, two windows | Color, Height, Emissive and six layers | 18 | 128 x 256 (4 px blocks) | 0.56 MiB |
| Same at 256 x 512 | | 18 | 256 x 512 | 2.25 MiB |

About 54 textures, 18.6 MiB with 128 x 256 pixelated copies (20.3 MiB with 256 x 512). All with nearest filter, no mips, clamp. `_Packed_HOER` (R height, G opacity, B emissive, A roughness; BC7 linear) could replace Height plus Emissive, which saves 8 textures and 4 MiB and one sampler per pixel. Not needed: Normal_DX, LayeredPreview, the four atlas maps, the previews. The pixelated sizes are my assumption; the pack does not say. The two contrasting windows are Mike's pick. From the pack README alone (I did not view the windows), W05 VelvetCurtains (drapes) against W03 ParticleRain (particles) should contrast most.

## Generated art

- Generated, flagged in the plan: the seven modules (rows 2, 4, 6, 8, 15, 17, 20) and the whole parallax pack.
- Open: the 17 library signs (see "What Mike needs to decide", item 1).

## Lettering and name flags

Checked at crop size and fine: all seven picked modules.

Malformed or doubtful module lettering, judged at 150 px thumbnails, not zoom-checked, so confirm before using any as a swap: `City_Sign_Desire_Down_01` and `Room_Sign_Desire_01` (飲望, and the first one's own `asset.json` says "source characters 飲望"), `Market_Sign_Open_Purple_01` (營 reads 営中, missing 業), `Room_Sign_Tadaima_01` (reads たたいま, not ただいま), `City_Sign_Red_Narrow_01`, `City_Sign_Blue_Large_01`, `City_Sign_Blue_Small_01`, `City_Interior_Bar_Sign_Vertical_01`, `City_Interior_Bar_Sign_Wide_01`, `City_Lantern_Red_Small_01`, `Room_Sign_Magenta_Vertical_01` (pseudo-glyphs), `Market_Sign_Floors_01` (a garbled "KAFE" line). `City_Sign_Open_01` is picked and reads correctly, but the top of 営 has a slightly odd form.

Other-game names. Left out, besides the four in the plan: `City_Sign_Dollhouse_01` and library `SGN_1196` (DOLLHOUSE; a Cyberpunk 2077 venue name), `37_dollhouse_sign` rows. Avoided as unconfirmed company-style names: every `Kaze` sign, `Tanaka` and `Hikari`. None is in the 24. The library also holds `City_Sign_Arasaka_01` as a texture-set row; it is not tagged.

Library rows with adult figure silhouettes (most `Design NNN` signs, `Night butterfly`, `Night play`, `Pleasure`, `Romance`, `Live show` variants with a dancer) are not picked. Say if Mike wants some for range.

## Swap candidates

Not in the 24, same checks passed on the art: `SGN_0112` Lips (blade or poster), `SGN_0149` Chevrons, `SGN_0630` Club curtain (flag shape), `SGN_1056` Elevator icon, `SGN_0103` Cabaret club, `SGN_0107` Adults only, `SGN_0138` Night round, `SGN_0119` Karaoke, `RetroMarket_Sign_Camera_01` (カメラ, fits Neon_Blade_1m5 at aspect 0.335; not in the library database), `Market_Sign_Cyber_Market_01`, `City_Sign_Moon_Blue_01`, `RetroMarket_Sign_Ramen_Horizontal_01`, and the six WallAd meshes.

## Tags

`graphics_db.py edit --tags` replaces the tag list, it does not merge. Proof on `SGN_0099` before the rest: tags `signage, sign, cyberpunk, red, light, district` (revision 1) became the same six plus `sgn-proposed` (revision 2) when I passed all seven; locations stayed `Red-light district`, source `assigned`. All 23 edits passed the existing tags plus the new one and a `--revision` check, and read back with locations unchanged.

23 rows carry `sgn-proposed`: the 17 library signs and 6 modules (`City_Sign_Club_Vertical_01` GFX_346c765ca0, `ContainerMarket_Sign_Bar_01` GFX_b90bbc890e, `City_Sign_Open_01` GFX_ff0c63d17a, `City_Sign_Paradise_01` GFX_5f1f8db4f0, `Market_Sign_Human_Machine_01` GFX_529f20c3f4, `Market_Sign_Noodle_Bowl_01` GFX_4cc0428913). `Room_Sign_Heart_Woman_01` is not in the library database, so it has no tag. Other writers were saving to `curation.json` while I worked. Against a copy taken before the run, the 8 entries that already existed differ only in tags, revision and timestamp. The other 15 had no stored record before; for 5 of them (SGN_1024, 1037, 1043, 1046, 1203) another writer had already assigned the location, which my before and after reads show unchanged.

## Not verified

- How the UV orientation reads in UE (needs the V flip of the importer).
- That Houdini's tri counts equal the FBX's own counts; I did not open the FBX in Blender.
- Whether `UCX_` hulls and sockets survive a Houdini re-export.
- Face rects for the four modules without an `asset.json` rect are detected, not hand-measured. I viewed all seven crops.
- Lettering on other modules, at thumbnail size only.
- Side effect: `hython` refreshed `C:/Prod/PipelineSandbox/Houdini/prefs/houdini22.0/pdgservices.json` on startup. I did not touch it otherwise.

## Verification

Script: `C:/Users/GAMEDE~1/AppData/Local/Temp/claude/f1f112a46a57a7c3/6bbd604d-a083-41dd-9fc6-7122db505af1/scratchpad/verify_shortlist.py`. It loads the JSON, checks each field and its allowed values, that every path exists and every `face_rect_px` sits inside its image, that `aspect` matches the rect, that notes state a face size, greps the JSON, the source file names and each module's `asset.json` for excluded names, then reads the tag back through `graphics_db.py search`.

```
entries 24 errors []
library 17 module 7
distinct meshes 12 [AFrame_Sign, Banner_Vertical_2m, Banner_Vertical_3m, Billboard_Large, Billboard_Medium, Billboard_Small, Box_Sign_1m, Box_Sign_2m, Medallion_Sign, Neon_Blade_1m5, Neon_Blade_3m, Neon_Box]
kinds {'neon': 16, 'panel': 8} densities {64: 1, 128: 6, 256: 13, 512: 4}
excluded names checked: ['Arasaka', 'Shinra', 'Sector7', 'Sector 7', 'Dollhouse', 'Militech', 'Kiroshi', 'Afterlife'] hits in JSON: []
soft names checked: ['Kaze', 'Tanaka', 'Hikari'] hits in JSON: []
source-name and asset.json hits (hard and soft lists): [('ContainerMarket_Sign_Bar_01', 'asset.json:Hikari')]
PASS
graphics_db search sgn-proposed -> 23 rows with the tag
library entries missing the tag: []
```

The one soft hit is a stray review line in that module's `asset.json` about another sign ("HIKARI lower text corrected to TRADING CO."). The art is a cocktail glass and BAR. Hikari is not a name I could tie to another game, so it does not fail the check.

Read-back, `python graphics_db.py search sgn-proposed --visibility all --json`, id, kind, tags (last one is the new tag), locations:

```
SGN_0099  sign  signage,sign,cyberpunk,red,light,district,sgn-proposed       Red-light district assigned
SGN_0101  sign  signage,sign,cyberpunk,beautiful,women,sgn-proposed          Red-light district assigned
SGN_0102  sign  signage,sign,cyberpunk,club,sgn-proposed                     Red-light district assigned
SGN_0117  sign  signage,sign,cyberpunk,alley,marker,sgn-proposed             Red-light district assigned
SGN_0124  sign  signage,sign,cyberpunk,love,round,sgn-proposed               Red-light district assigned
SGN_0125  sign  signage,sign,cyberpunk,dating,sgn-proposed                   Red-light district assigned
SGN_0128  sign  signage,sign,cyberpunk,live,show,sgn-proposed                Red-light district assigned
SGN_0136  sign  signage,sign,cyberpunk,open,sgn-proposed                     Red-light district suggested
SGN_0139  sign  signage,sign,cyberpunk,all,you,can,drink,sgn-proposed        Red-light district suggested
SGN_0140  sign  signage,sign,cyberpunk,cocktails,sgn-proposed                Red-light district suggested
SGN_0146  sign  signage,sign,cyberpunk,heart,lantern,sgn-proposed            Red-light district suggested
SGN_0431  sign  signage,sign,animals,koi,circle,sgn-proposed                 Red-light district assigned
SGN_1024  sign  signage,sign,nightlife,horizontal,bar,バー,sgn-proposed       Red-light district assigned
SGN_1037  sign  signage,sign,nightlife,this,way,sgn-proposed                 Red-light district assigned
SGN_1043  sign  signage,sign,nightlife,girls,sgn-proposed                    Red-light district assigned
SGN_1046  sign  signage,sign,nightlife,horizontal,welcome,歓迎,sgn-proposed   Red-light district assigned
SGN_1203  sign  signage,sign,nightlife,vertical,tube,sgn-proposed            Red-light district assigned
GFX_346c765ca0  City_Sign_Club_Vertical_01      ...,city,sign,club,vertical,front,texture_set,sgn-proposed
GFX_b90bbc890e  ContainerMarket_Sign_Bar_01     ...,containermarket,sign,bar,front,texture_set,sgn-proposed
GFX_ff0c63d17a  City_Sign_Open_01               ...,city,sign,open,front,texture_set,sgn-proposed
GFX_5f1f8db4f0  City_Sign_Paradise_01           ...,city,sign,paradise,front,texture_set,sgn-proposed
GFX_529f20c3f4  Market_Sign_Human_Machine_01    ...,market,sign,human,machine,front,texture_set,sgn-proposed
GFX_4cc0428913  Market_Sign_Noodle_Bowl_01      ...,market,sign,noodle,bowl,front,texture_set,sgn-proposed
```

Existing-tag survival, `SGN_0099` (before, after the single-entry proof):

```
BEFORE {"id": "SGN_0099", "tag_list": ["signage","sign","cyberpunk","red","light","district"], "locations": ["Red-light district"], "location_source": "assigned", "revision": 1}
AFTER  {"id": "SGN_0099", "tag_list": ["signage","sign","cyberpunk","red","light","district","sgn-proposed"], "locations": ["Red-light district"], "location_source": "assigned", "revision": 2}
```
