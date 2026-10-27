# Asset pull index

Catalog of `C:\Users\GameDevPC0403\Documents\Development\_asset-pull` (21.3 GiB on disk) and `C:\Users\GameDevPC0403\Documents\Development\building-examples`, written 2026-10-15 for ProjectRunner (side-on 2.5D cyberpunk, UE 5.8, HD-2D look, targets The Last Night and Replaced).

How this was made. Read-only. Nothing was extracted or moved. Archives were listed with `unzip -l` and `7z l` (7-Zip is at `C:\Program Files\7-Zip\7z.exe`; Git Bash has no `7z` or `unrar` on PATH). `.blend` files were read for datablock names only (Blender 5.2 headless, `libraries.load`, no scene opened). FBX headers were parsed with a small script (version, creator, mesh counts, vertex counts). GLB metadata was read from the JSON chunk. macOS `._*` and `.DS_Store` files are ignored throughout.

What I could not confirm. No licence file exists for most packs. Sketchfab page licences were not looked up (no network use). Hashes were checked only for the four duplicate pairs marked "md5 match" in section 4; other duplicates are matched by name and byte size.

Sizes are binary (MiB/GiB), as `du` reports. Paths below are relative to `_asset-pull` unless they start with `C:`.

## 1. Summary table

### Top level

| Path | Size | What it is | Formats | Extracted? | Licence stated |
|---|---|---|---|---|---|
| `GameAssets/` | 8.8 GiB | Purchased UE environment packs, free Sketchfab environment downloads, two Blender files | `.zip`/`.rar` UE projects, FBX, GLB, `.blend` | Mixed. Sketchfab downloads are both zipped and extracted. UE packs are zip only. | `licenses.txt` (order codes only), two GLBs with embedded CC-BY 4.0 |
| `cyberpunk-asset-pull/` | 8.1 GiB | Coloso course files (Fujitarian, Nikolai Fletcher, Kazusa, nagafujiriku), Blender generator tools, shader demos | `.blend`, `.png`, `.mp4`, `.py`, `.pdf`, `.zip` | Mostly extracted; a few course zips also sit next to their contents | `LICENSE_*` in one folder; otherwise none |
| `flex-2-full.zip` | 3.2 GiB | SCIFI FLEX 2 Blender addon plus KIT OPS inserts (purchased) | `.zip` containing addon zips, 139 `.blend`, 158 `.png`, 6 `.exr` | No | README says "purchasing"; no licence text |
| `sketchfab-models/` | 1005 MiB | Character models and character references from Sketchfab, Meshy and Tripo | FBX, GLB, OBJ, `.blend`, `.zip`/`.rar` | Mostly both | None |
| `ProjectTitan_New/` | 29 MiB | Houdini 22.0.368 tutorial scenes and a COPs smoke test with a UE project | `.hip`, `.zip` | No | None |
| `C:\...\Development\building-examples\` | 27 MiB | Six FBX exports from Blender 5.2.2 (alleys, buildings, cityscape) | FBX | n/a | None |

### GameAssets

| Path | Size | What it is | Formats | Extracted? | Licence |
|---|---|---|---|---|---|
| `70NYCAlley.rar` | 2.0 GiB (4.1 GiB unpacked) | "1970s NYC Alley Environment [Unreal Engine]", Leartes Studios. Project `BrooklynAlley`: 134 static meshes, 276 textures, 2 maps. Includes `Intermediate/` and `Developers/` junk. | RAR holding a UE project | No | Order code in `licenses.txt` |
| `Cyberpunk_Rooftop_Market.zip` | 2.5 GiB | "Cyberpunk Rooftop Market Environment", Leartes Studios. UE 5.1 project, 238 `SM_` meshes in 25 groups (shops, signs, holograms, foods, clothes, scaffolding, cars, trash), 2 maps, Sequencer. | zip holding a UE project | No | Order code in `licenses.txt` |
| `FloatingSlums.zip` | 828 MiB | "Future Slums Abandoned/Post-Apocalyptic District [Unity+Unreal Engine]", Leartes Studios. UE 5.0 project, 109 static meshes, and the same 100 meshes as loose FBX. | zip holding a UE project | No | Order code in `licenses.txt` |
| `LP_CyberPunk_City.zip` | 68 MiB | Low-poly cyberpunk city, UE 4.27 project: 222 props, 38 buildings, 18 floors, 25 skeletal-mesh assets, 7 textures. Author not stated. | zip holding a UE project | No | None |
| `SciFiRobotFactory_5.5.zip` | 531 MiB | Sci-fi robot factory, UE 5.5 project: 275 static meshes, 160 textures, 12 maps with lighting sublevels. Author not stated. | zip holding a UE project | No | None |
| `TEESVESSEL.zip` | 840 MiB | Sci-fi spaceship interior (`Sci_Fi_SpaceShio`), UE 5.5 project: 105 static meshes, 10 skeletal meshes, anims, FX, UI. Author not stated. | zip holding a UE project | No | None |
| `Water_VFX.zip` | 267 MiB | Water particle effects, UE 5.0 project, 75 assets. Author not stated. | zip holding a UE project | No | None |
| `Sci fi buildings.blend` | 99 MiB | 37 objects: low-poly sci-fi buildings, megastructures, platforms, windows, doors. Mesh names `map_12.osm_buildings.*` suggest a Blosm/OpenStreetMap import. 128 images. | `.blend` | n/a | None |
| `Scifi_buildings_textures/` and `.zip` | 79 MiB / 71 MiB | PBR texture sets (facade, buildings 1-4, platforms, lamp, door). Matches the images in `Sci fi buildings.blend`. | JPG/PNG | Yes, zip kept | None |
| `autoRig_2.0.blend` | 17 MiB | Character body and face rig with 53 actions, a rig-setup script, and a game-export script with an "Unreal" option (UE bone orientation, 100x scale, ARKit shape keys). Author not stated. | `.blend` | n/a | None |
| `buildings.glb` | 2.6 MiB | Sketchfab "buildings" by Elbolillo, 17 meshes | GLB | n/a | CC-BY 4.0 (embedded) |
| `cyberpunk_city.glb` | 19 MiB | Sketchfab "Cyberpunk city" by Pasha, 14 meshes | GLB | n/a | CC-BY 4.0 (embedded) |
| `a-street-in-japan/` | 39 MiB | Japanese street, 35 meshes, 38k verts, Blender-exported FBX | FBX + JPEG | Yes, zip kept; inner `.zip` also kept | None |
| `asia-building/` | 26 MiB | Asian apartment building, 47 meshes, 11k verts, C4D origin | FBX + JPEG | Yes, zip and inner `.rar` kept | None |
| `city-street-free-for-game/` | 96 MiB | City street, 41 meshes, 75k verts | FBX + PNG | Yes, zip kept | None |
| `hong-kong-monster-building-modular-low-poly-lod/` | 51 MiB | Modular Hong Kong tower, 63 meshes, 85 materials. Some textures are named "ChatGPT Image", so AI-made. | GLB + PNG | Yes, zip kept | None |
| `interior-8-bedroom/` | 82 MiB | Loft bedroom interior, 24 meshes, 7.6k verts | FBX + textures | Yes, zip kept | None |
| `loft2-free-interior/` | 48 MiB | Loft interior, 37 meshes, 17k verts | FBX + textures | Yes, zip kept | None |
| `low-poly-asian-tower-block/` | 38 MiB | Tower block with AC units and signs, 3 meshes, 2.6k verts | FBX + PBR PNG | Yes, zip kept | None |
| `low-poly-city-buildings/` | 70 MiB | Low-poly city, 19 meshes | `.blend` + textures | Yes, zip kept | None |
| `low-poly-city-night/` | 57 MiB | Low-poly night city with area lights, 23 meshes | `.blend` + textures | Yes, zip kept | None |
| `low-poly-night-city-building-skyline/` | 82 MiB | Background skyline, 1 mesh, 2.9k verts | FBX + OBJ + PNG | Yes, zip and inner `.rar` kept | None |
| `old-metro-tunnel-free/` | 32 MiB | Metro tunnel, 30 meshes, 83k verts | FBX + textures | Yes, zip kept | None |
| `psx-cargo-containers/` | 2.7 MiB | PSX-style cargo containers, 4 textures. Made in Blockbench (ASCII FBX). | FBX + PNG | Yes, zip and inner `.zip` kept | None |
| `psx-japanese-apartment/` | 6.5 MiB | PSX-style apartment parts (AC units), 8 meshes, 322 verts | FBX + textures | Yes, zip and inner `.zip` kept | None |
| `ruined-city-free/` | 158 MiB | Ruined city, 29 meshes, 200k verts, 86 PNG (some named `texture_pbr_2025...`, AI-generated textures) | FBX + PNG | Yes, zip kept | None |
| `super-market-for-free/` | 33 MiB | Supermarket interior, 3,483 meshes, 30 materials | GLB + textures | Yes, zip kept | None |
| `warehouse-free-low-poly-for-games/` | 49 MiB | Low-poly warehouse, 92 meshes, 5k verts | FBX + textures | Yes, zip kept | None |
| `licenses.txt` | 300 B | Lists "Leartes Studios" and three order codes for Rooftop Market, NYC Alley, Future Slums | text | n/a | n/a |

### cyberpunk-asset-pull

| Path | Size | What it is | Formats | Extracted? | Licence |
|---|---|---|---|---|---|
| `Kazusa Files/` | 4.3 GiB | Coloso class by Kazusa, Japanese titles. Cyberpunk street scene built up lesson by lesson. | `.blend`, 748 PNG, 4 MP4, FBX, EXR, PDF | Yes | None. Course material. |
| `Kazusa Files/Blendファイル/` | 679 MiB | Seven stage files `c07_Modeling` to `c22_Cut03` (street, signs, cars, lighting, car animation, final cut). | `.blend` | Yes | None |
| `Kazusa Files/Texture Data/` | 3.3 GiB | 50 folders: building facades (Hbuildings01-15, Sbuildings01-04), signs, asphalt, fence, floor, curtains, AC units, Porche_G car, posters, and 1.7 GiB of Movietextures (4 MP4 plus 300 PNG frames). PBR sets with BaseColor, Normal, Roughness, Metallic, Emissive. Includes a 4K sky EXR. | PNG/MP4/EXR | Yes | None |
| `Kazusa Files/オブジェクトデータ/` | 20 MiB | `Car.fbx`, 12 meshes, 344k verts, Blender 3.3 export | FBX | Yes | None |
| `Kazusa Files/完成Blenderファイル/` | 389 MiB | Finished files `c19` and `c22` | `.blend` | Yes | None |
| `Kazusa Files/講義資料/` | 204 KiB | One PDF, "What is cyberpunk" (サイバーパンクとは), in Japanese | PDF | Yes | None |
| `Fletcher Files/` | 956 MiB | Coloso "3D Artist" class by Nikolai Fletcher (2022). Shibuya-style layered city (foreground, midground, towers). | `.blend`, OBJ, zips (mp4, photos, textures, PSD clouds) | Zips not extracted | None. Course material. |
| `Fletcher Files/[c05...]/` | 95 MiB | `niko-coloso-city.blend` (86 objects in layer collections), `city-assets.blend`, `shibuyatowers.blend` (fSpy camera match), chainlink-fence OBJ (26 MB) | `.blend`, OBJ | Yes | None |
| `Fletcher Files/[c06...]/textures.zip` | 263 MiB | 25 concrete, tiled-wall, tiled-floor, signage texture maps (BMP/PNG, ~17 MB each) | zip | No | None |
| `Fletcher Files/[c08...]/cloud-bg.zip` | 546 MiB | Cloud backdrops (JPG and two layered PSD, 154 and 404 MB) | zip | No | None |
| `Fletcher Files/[c00],[c02],[c04]` | 27, 0.5, 24 MiB | Final render MP4s, an addon recommendation PDF, reference photos and two textures | zips | No | None |
| `Class Files/` | 87 MiB | Coloso "Concept Artist" class by Fujitarian, lessons c04-c15: Blender node-group screenshots, videos, tin-roof texture, signboard template, PolyHaven tree, HDR. | PNG, MP4, PDF, `.blend`, HDR | Yes (tree zip duplicates its `.blend`) | None. Course material. |
| `SECTION Class Materials/` | 949 MiB | Coloso class by nagafujiriku (sci-fi buildings). s00 = building asset blend; s02 = three Japanese PDFs (screen composition, colour, lighting); s04 = LCD screen texture; s05 = `Roads.blend` and two traffic-plate videos (195 and 55 MB); s06 = logo PNG. | zip + extracted | s02, s04, s05 extracted; s00 and s06 are zips only | None. Course material. |
| `Coloso_SciFiBuildings_Assets.blend` | 399 MiB | 19 objects: landmark towers, middle buildings, UDIM textures. Same file as `nagafujiriku-s00.zip` (md5 match). | `.blend` | n/a | None |
| `nagafujiriku_lcd_screen_texture.png` | 1.9 MiB | LCD screen texture, same as inside `nagafujiriku-s04.zip` | PNG | n/a | None |
| `GN Street Generator project (WIP)/` | 660 MiB | Seven Blender files: GGene procedural-building GN files (3), and street generator versions v1, v2, v3 (traffic sim), v5 (lane changing, 152 objects, 74 node groups, 482 MiB). Author not stated. | `.blend` | n/a | None |
| `Industrial structure generator/` | 164 MiB | Geometry Nodes pipes, handrails, I-beams, lampposts. v0.1 (zip) and v0.2 (`.blend`). | `.blend`, zip | v0.1 zipped | `LICENSE_GeoNodes.txt` GPL v3; `LICENSE_Assets.txt` CC BY-SA 4.0 |
| `buildify_1.0.blend` and `Buildify_1.0.pdf` | 25 MiB / 6.3 MiB | Buildify 1.0, a modular building GN library (walls, flat roof, wall props, rooftop details, proxy materials). The PDF is its guide; it also describes a Blender-OSM mode. Author not stated in either file. | `.blend`, PDF | n/a | None |
| `Building_Blocks_v1_9_3.py` | 30 KiB | Blender addon "Building Blocks" 1.9.3 by Davi Silveira. Stacks building module collections. | `.py` | n/a | GPL v2+ (header) |
| `BSA_Layout.py` and `.zip` | 17 KiB / 4 KiB | Blender addon "Bin Stacking Algorithm" by Davi Silveira (layout packing). The zip holds the same `.py`. | `.py` | Yes | No header |
| `BrushFlow Studio/` | 28 MiB | Blender 4.2 GN tool that paints tangent normal maps from curve strokes, with a Read Me. | `.blend`, `.docx`, PNG | n/a | None |
| `Blender_files/` | 347 MiB | `demo1.blend` and `demo1_Atmoshere.blend`: ~1,160 cube objects and a "StarlightAtmosphere" GN sky. Looks like a night-city or atmosphere demo. | `.blend` | n/a | None |
| `shader-files/` | 216 MiB | 11 stylised shader demos: food (burger, ramen, waffles, pancakes, cookies, eggs, coffee), duck bath, anime grass, water, waterfall. | `.blend` | n/a | None (some names point to Gumroad purchases) |
| `ZenUVChecker_1_4_2/` | 3.4 MiB | Zen UV checker textures (colour, mono, orient) from 512 to 4096 | PNG | n/a | None |
| `Ggenebrush_HDRI2.jpg` | 3.1 MiB | HDRI image tied to the GGene brush files | JPG | n/a | None |

### sketchfab-models

| Path | Size | What it is | Formats | Extracted? | Licence |
|---|---|---|---|---|---|
| `cyborg/` + `cyborg.zip` | 42 MiB + 20 MiB | Cyborg female, rigged: 174 bones, 90 meshes, 417k verts. Bone names (`lThighBend`, `cyborg8f`) point to DAZ Genesis 8 Female. | FBX, JPG, nested `.rar` | Yes | None |
| `cyborg-001/` + `.zip` | 83 MiB + 85 MiB | One GLB, 52 MB, written by `pygltflib` (looks AI-generated, "sample_2026-03-03") | GLB + PNG | Yes | None |
| `cyberpunk-robot.zip` | 4.0 MiB | Cyberpunk robot with PBR textures | FBX + PNG | No | None |
| `faerie-mina-brawl-stars-3d-model/` + `.zip` | 6.0 MiB + 3.1 MiB | Brawl Stars character "Mina", rigged, 77 bones, 7k verts | FBX, USDC, PNG | Yes | None |
| `leon/` + `.zip` | 0.3 MiB + 0.3 MiB | Tattooed man, 1.9k verts. Mesh name `tripo_node_...` so Tripo-generated. The file inside is called `ninja.fbx` (mislabelled). | FBX + JPG | Yes | None |
| `ninja/` + `.zip` | 0.6 MiB + 0.6 MiB | Ninja, 3.5k verts, Tripo-generated | FBX + JPG | Yes | None |
| `norn-cultural-armor-test/` + `.zip` | 3.0 MiB + 3.1 MiB | Norn armour test (Guild Wars-style), OBJ with 5 texture maps | OBJ + PNG | Yes | None |
| `sasha/` + `.zip` | 19 MiB + 11 MiB | "Sasha By Mitzu", rigged and animated, 265 bones, 30k verts, 4 textures | FBX, PNG, nested `.rar` | Yes | None |
| `sexy-ref/` | 720 MiB | 11 character models for reference: five Meshy AI FBX (100k-400k verts), five GLB, and one 76 MB GLB (`sitting-girl`, textures named `texture_pbr_2025...`), plus two screenshots. Ten have a zip next to the folder; `sitting-girl` is zipped under a hash name. | FBX, GLB, PNG/JPEG | Yes | None |
| `low-poly-mccree.zip`, `source/` | 1.0 MiB, 2.2 MiB | Low-poly McCree (Overwatch) Blender file and a `.blend1` backup | `.blend` | Yes (`source/`) | None |
| `the-force-awakens-lowpoly.zip`, `source 2/` | 1.4 MiB, 1.4 MiB | Low-poly Star Wars Force Awakens scene | `.blend` | Yes (`source 2/`) | None |

### ProjectTitan_New

2026-10-22: five files added since this index (Evo scaffold tutorial, Tut_Tower, Tut_pipe_greeble, Tutorial_Building_Generator.hda, ML smoke zip), and a new `tutorial-files/` folder (13 GB of course HDAs and UE 5.3 projects). Both are assessed in [hda-rebuild-assessment.md](hda-rebuild-assessment.md).

| Path | Size | What it is | Licence |
|---|---|---|---|
| `Tut_Materials.hip`, `Tut_bridge.hip`, `Tut_pipe_curve.hip` | 1.5, 1.7, 1.3 MiB | Houdini 22.0.368 tutorial scenes (materials, bridge, pipe along a curve) | None |
| `Tut_asset_baking.zip` | 0.3 MiB | `Tut_asset_baking.hip` and `SM_Pipe_end.fbx` | None |
| `COPs_Smoke_Houdini.zip` | 18 MiB | `COPs_Smoke.hip`, a backup, and 241 EXR frames | None |
| `COPs_Smoke_Unreal.zip` | 5.5 MiB | UE project `COPs_Smoke`: `M_Flipbook`, `NS_Smoke`, `NS_Simple_Smoke`, `T_Smoke_Flipbook` | None |

This folder is work in progress for Houdini and Niagara, not an asset pack. The `NS_Smoke` and flipbook material may be useful for steam and smoke in alleys.

### flex-2-full.zip (3.2 GiB, 313 files)

SCIFI FLEX 2 for Blender. Contents:

- `scifi_flex_2-2.4.9.zip` (192 MiB), the current addon.
- `archive/` with three older addon zips (v2.4.6, v2.4.7 twice).
- `SIMPLE SCIFI MASTERFOLDER/` with 139 `.blend` INSERTS (greebles with PNG previews, for KIT OPS Free or Pro).
- 6 EXR 32-bit displacement maps, 14 4K colour maps, docs (`SCIFI-FLEX-docs.html/.txt`).

The README says "Thanks for purchasing SCIFI FLEX". It points to cw1.me (the vendor's links). No licence text is included; `SCIFI-FLEX-docs.txt` has no licence, commercial-use or credit wording.

### building-examples (C:\Users\GameDevPC0403\Documents\Development\building-examples)

All six files are binary FBX 7.4, exported by "Blender (stable FBX IO) 5.2.2 LTS" (file dates 26 Sep). None has a skeleton or animation. Only the FBX files are in the folder; the textures they reference (`.jpg`/`.png`) are not here.

| File | Size | Contents | Verts | Tri indices |
|---|---|---|---|---|
| `building-example-01.fbx` | 22 KiB | One mesh "Back Alley", 2 materials | 42 | 106 |
| `building-example-02-back-alley.fbx` | 256 KiB | One mesh "Back Alley", 3 materials | 5.9k | 23k |
| `building-example-02.fbx` | 356 KiB | One mesh "Both Alleys", 3 materials | 9.6k | 37k |
| `building-example-03.fbx` | 94 KiB | One mesh "Curve Alleys", 5 materials | 2.0k | 7.4k |
| `cityscape_example-01.fbx` | 1.4 MiB | 7 meshes plus a null named "CyberScape Pro 2.2", Traffic_Plate_2/4, Blender logo planes, 10 materials | 52.9k | 194k |
| `building-example-01-basic.fbx` | 25 MiB | 407 meshes, 51 lights, 5 nulls (Door, Duct, Pipes, Stairs, Wires), 207 materials, 303 texture refs | 669k | 2.4M |

Texture names referenced include `window_alley_color`, `floor_pipes_metallic`, `decal_master_color/alpha`, `advertising_stand_color`, `wall_division_color`, `pavement_big_color_curve`, `ceiling_*`, `TexturesCom_Roads0111_22_M`. The "CyberScape Pro 2.2" null and the `Traffic_Plate` objects match the nagafujiriku course files (`Roads.blend`), so these look like example exports from a Blender alley/cityscape generator addon, probably a paid one. Source not confirmed.

(Tri indices is the `PolygonVertexIndex` count; triangles are about a third to half of it depending on quads.)

## 2. Fit for ProjectRunner

Scale: High, Medium, Low. Columns are (a) side-on street, alley and interior blockout and set dressing, (b) prop kits, (c) characters and rigs, (d) tools and generators, (e) concept or reference only. A dash means not applicable.

Format note. UE project packs (`.zip`/`.rar` holding a `.uproject`) do not need Blender. They need extraction and migration of just the wanted assets into the 5.8 project (versions: Rooftop Market 5.1, Slums 5.0, Water 5.0, Robot Factory 5.5, TEESVESSEL 5.5, LP City 4.27, NYC Alley not read). FBX imports directly. GLB imports through Interchange. `.blend`, OBJ and the Sketchfab character packs need a Blender step (export FBX, or glTF) before UE. Several `.blend` generators produce Blender-only geometry; their output must be applied and exported.

### GameAssets

| Item | a | b | c | d | e | Notes |
|---|---|---|---|---|---|---|
| `70NYCAlley.rar` | High | High | Low | Low | Medium | Best alley dressing: 134 meshes (stores, signs, wires, trash). Realistic, so needs a pixel pass. |
| `Cyberpunk_Rooftop_Market.zip` | Medium | High | Low | Low | High | 238 props, hologram and sign meshes, shops. Rooftop framing fits side-on. Includes Sequencer demo. |
| `FloatingSlums.zip` | High | High | Low | Low | Medium | 100 loose FBX avoid migration. Shacks, planks, wires, antennas. |
| `LP_CyberPunk_City.zip` | High | High | Medium | Low | Medium | Low poly suits the pixelated finish. 12 skeletal assets could be NPC crowd. UE 4.27, so migrate. |
| `SciFiRobotFactory_5.5.zip` | Medium | Medium | Low | Low | Medium | Industrial modular walls and panels. Fits a factory or back-of-house location. |
| `TEESVESSEL.zip` | Low | Low | Low | Low | Low | Spaceship interior. Corridor walls could be reused as a sealed-corridor kit. |
| `Water_VFX.zip` | Low | Low | - | Low | Low | Water FX only. |
| `Sci fi buildings.blend` + textures | Medium | Low | - | Low | Medium | Backdrop towers. Needs FBX export. |
| `autoRig_2.0.blend` | Low | - | High | Medium | Low | Face and body rig with UE export script (bone orientation, 100x scale, 52 ARKit shapes, 1024 bake). Matches the "custom low-poly character on the UE5 skeleton" plan. Check the script before trusting the bone names. |
| `buildings.glb`, `cyberpunk_city.glb` | Medium | Low | - | - | Medium | Backdrop city blocks. CC-BY, attribution needed. |
| `a-street-in-japan/` | High | Medium | - | - | High | Reads well as a side-on street. FBX ready. |
| `asia-building/` | Medium | Low | - | - | Medium | One building, 53 materials. FBX ready. |
| `city-street-free-for-game/` | High | Medium | - | - | Medium | Street kit, 41 meshes. FBX ready. |
| `hong-kong-monster-building-modular-low-poly-lod/` | High | Low | - | - | High | Modular dense tower. GLB. Some textures are AI images. |
| `interior-8-bedroom/`, `loft2-free-interior/` | High | Medium | - | - | Medium | Interiors for the room-scale game. FBX ready. |
| `low-poly-asian-tower-block/` | Medium | Low | - | - | Medium | Tiny (2.6k verts). Backdrop. |
| `low-poly-city-buildings/`, `low-poly-city-night/` | Medium | Low | - | - | Medium | Backdrop. Needs FBX export from `.blend`. |
| `low-poly-night-city-building-skyline/` | Medium | Low | - | - | Low | Skyline card. FBX ready. |
| `old-metro-tunnel-free/` | Medium | Low | - | - | Medium | Corridor-like, good for a side-on tunnel. FBX ready. |
| `psx-cargo-containers/` | Medium | Medium | - | - | Medium | PSX look is close to the pixelated finish. |
| `psx-japanese-apartment/` | Medium | Medium | - | - | Medium | AC units and small apartment parts, PSX style. |
| `ruined-city-free/` | Low | Low | - | - | Medium | Heavy (200k verts). Wrong tone for most of the game. |
| `super-market-for-free/` | High | Medium | - | - | Medium | Shop interior, 3.5k meshes; shelves and fridges can be split out. GLB. |
| `warehouse-free-low-poly-for-games/` | Medium | Medium | - | - | Low | Low poly, 92 meshes. FBX ready. |

### cyberpunk-asset-pull

| Item | a | b | c | d | e | Notes |
|---|---|---|---|---|---|---|
| `Kazusa Files/` | High | High | Low | Low | High | Best stylistic fit for a night-city street: shopfronts, signs, AC units, curtains, fences, stairs, streetlights, asphalt. Textures are already PBR with emissive. Needs Blender to UE conversion. Course material, see section 3. |
| `Fletcher Files/` | Medium | Low | - | Low | High | Layered city (foreground, midground, towers) matches parallax backdrops in side-on. |
| `Class Files/` (Fujitarian) | Low | Low | - | Low | High | Node-group screenshots and videos teach the GN methods. |
| `SECTION Class Materials/` (nagafujiriku) | Low | Low | - | - | High | Japanese PDFs on composition, colour and lighting. |
| `Coloso_SciFiBuildings_Assets.blend` | Medium | Low | - | - | Medium | Landmark towers and UDIM textures. |
| `GN Street Generator project (WIP)/` | Medium | Low | - | High | Low | Street from curves, traffic sim. v5 is 482 MiB. Top-down or 3/4 oriented; useful for backdrops. |
| `Industrial structure generator/` | Medium | Medium | - | High | Low | Pipes, handrails, beams for alley or plant dressing. Share-alike licence, see section 3. |
| `buildify_1.0.blend` + PDF | High | Low | - | High | Low | Modular building facades from one mesh. Best fit for the building generator. |
| `Building_Blocks_v1_9_3.py`, `BSA_Layout.py` | Low | - | - | High | - | Stack modules, pack layouts. Addons for Blender. |
| `BrushFlow Studio/` | - | - | - | Medium | - | Paint normal maps by hand. Could help the hand-painted look. Blender 4.2 only. |
| `Blender_files/demo1*.blend` | Low | - | - | Low | Medium | Night atmosphere GN demo. |
| `shader-files/` | Low | Low | - | Low | Low | Food and water shaders. Not relevant except water and waterfall. |
| `ZenUVChecker_1_4_2/` | - | - | - | Medium | - | Checker maps for UV tests. |
| `Ggenebrush_HDRI2.jpg`, `nagafujiriku_lcd_screen_texture.png` | - | Low | - | - | Low | Single images. LCD texture could drive a monitor material. |

### Other

| Item | a | b | c | d | e | Notes |
|---|---|---|---|---|---|---|
| `flex-2-full.zip` | Medium | Medium | - | High | Low | SCIFI FLEX plus 139 inserts: greebles, plates, surface detail. Blender and KIT OPS only. Best for bashing sci-fi wall panels and machinery before export. |
| `sketchfab-models/cyborg` | - | - | Medium | - | Medium | Detailed rig (174 bones, 417k verts), far over the 20k-triangle character budget. |
| `sketchfab-models/sasha` | - | - | Medium | - | Medium | Rigged, animated, 30k verts. Over budget. Good for testing retarget. |
| `sketchfab-models/cyberpunk-robot.zip` | Low | Low | Low | - | Medium | Small robot, PBR set. |
| `sketchfab-models/leon`, `ninja`, `cyborg-001`, `sexy-ref/` | - | - | Low | - | Medium | AI-generated meshes (Tripo, Meshy), no rig, dense. Reference only. |
| `sketchfab-models/faerie-mina...`, `low-poly-mccree`, `the-force-awakens-lowpoly`, `norn-cultural-armor-test` | - | - | Low | - | Low | Third-party game and film characters. Reference only. |
| `ProjectTitan_New/` | - | Low | - | Medium | - | Pipe, bridge and baking tutorials, COPs smoke to Niagara flipbook. Smoke flipbook may serve alley steam. |
| `building-examples/` FBX | High | Medium | - | - | - | Back Alley, Both Alleys, Curve Alleys: ready to import as side-on alley blockouts. `01-basic` is 407 meshes and 2.4M indices; too heavy as one asset, split it. Textures are not in the folder. |

## 3. Licensing flags

Do not ship or show any of the following without checking terms.

1. **Coloso course material.** `Kazusa Files/`, `Fletcher Files/`, `Class Files/` (Fujitarian), `SECTION Class Materials/` (nagafujiriku), and `Coloso_SciFiBuildings_Assets.blend`. No terms are in the folder. Course files are normally personal-study only. Treat all textures, models, videos and PDFs there as not shippable and not for a funded pitch until the course terms say otherwise. Re-make anything used in-game.
2. **Real-world and brand content inside the Kazusa textures.** `Texture Data/Porche_G` and `Car.fbx` (a Porsche-style car), `Signs/Posters/Magazines.jpg`, `Sign_miraiza`, `Cyberpunk_advertisement`, and the 1.7 GiB `Movietextures`. These may include third-party artwork or footage.
3. **CC-BY 4.0 (attribution required).** `GameAssets/buildings.glb` (Elbolillo) and `GameAssets/cyberpunk_city.glb` (Pasha). Both state it in the file. Credit them in game credits and in any pitch deck that shows them.
4. **CC BY-SA 4.0 and GPL v3.** `Industrial structure generator/`: assets (3D objects and textures) are CC BY-SA 4.0, so any adaptation must be shared under the same licence. The GN setup is GPL v3. Do not put its meshes or textures into a closed game. Rebuild geometry if you need it.
5. **Purchased packs.** Leartes Studios packs (Rooftop Market, NYC Alley, Future Slums) have order codes in `licenses.txt`, so they look like Fab or Marketplace purchases. Use in a shipped game is normally allowed; redistributing the raw packs or committing them to a public repo is not. `flex-2-full.zip` is a purchased addon and kit: same rule; do not redistribute the addon or inserts.
6. **No licence on file, source unknown.** `LP_CyberPunk_City`, `SciFiRobotFactory_5.5`, `TEESVESSEL`, `Water_VFX`, `Sci fi buildings.blend`, `autoRig_2.0.blend`, `Buildify`, `GN Street Generator`, `BrushFlow Studio`, `BSA_Layout`, `shader-files` (names suggest Gumroad), and all `building-examples` FBX. Find the receipts or product pages before shipping any of them.
7. **Sketchfab downloads.** The `GameAssets` folders and `sketchfab-models/` carry no licence file. Sketchfab free downloads can be CC-BY, CC-BY-NC, or others, per model. Assume non-commercial until checked. This covers: a-street-in-japan, asia-building, city-street-free-for-game, hong-kong-monster..., interior-8-bedroom, loft2-free-interior, low-poly-asian-tower-block, low-poly-city-buildings, low-poly-city-night, low-poly-night-city-building-skyline, old-metro-tunnel-free, psx-cargo-containers, psx-japanese-apartment, ruined-city-free, super-market-for-free, warehouse-free-low-poly-for-games, cyborg, sasha, cyberpunk-robot.
8. **Third-party IP.** `faerie-mina-brawl-stars-3d-model` (Supercell), `low-poly-mccree` (Blizzard), `the-force-awakens-lowpoly` (Lucasfilm), `leon` (name suggests a Brawl Stars character; the mesh itself is Tripo-generated), `norn-cultural-armor-test` (the Norn are a Guild Wars 2 race; unconfirmed). Cannot ship; do not show in a pitch as project art. `cyborg` looks like a DAZ Genesis 8 base; DAZ licences restrict redistribution of the base mesh.
9. **AI-generated content.** Meshy AI FBX in `sexy-ref/`, Tripo meshes (`leon`, `ninja`), `cyborg-001` GLB, `hong-kong-monster...` textures named "ChatGPT Image", `ruined-city-free` textures named `texture_pbr_2025...`. Output terms depend on the tool plan. Reference only.
10. **Third-party addons.** `building-examples` appears to come from a paid Blender generator ("CyberScape Pro 2.2"). Do not redistribute the files or the generator without checking its licence. `Building_Blocks_v1_9_3.py` is GPL v2+; fine to use as a tool, and the output geometry is yours.
11. **`ProjectTitan_New`** is not a pack. Houdini scenes are your own work files (author unknown); nothing to flag beyond checking whether tutorial scenes came from a paid course.

## 4. Duplicates

Hash-identical (md5 match):

- `cyberpunk-asset-pull/Coloso_SciFiBuildings_Assets.blend` = inside `SECTION Class Materials/nagafujiriku-s00.zip` (399 MiB wasted).
- `Kazusa Files/Blendファイル/c19_Caranimation02.blend` = `Kazusa Files/完成Blenderファイル/c19_Caranimation02.blend` (144 MiB).
- `Kazusa Files/Blendファイル/c22_Cut03.blend` = `Kazusa Files/完成Blenderファイル/c22_Cut03.blend` (245 MiB).
- `sketchfab-models/sexy-ref/f5dcd85d70621aa7bac52ac4c05a6de1.zip` GLB = `sexy-ref/sitting-girl/source/sitting-girl.glb` (97 MB zip, 72 MB GLB).

Zip next to its extracted folder (same name; matched by name and content layout):

- `GameAssets/`: Scifi_buildings_textures, a-street-in-japan, asia-building, city-street-free-for-game, hong-kong-monster..., interior-8-bedroom, loft2-free-interior, low-poly-asian-tower-block, low-poly-city-buildings, low-poly-city-night, low-poly-night-city-building-skyline, old-metro-tunnel-free, psx-cargo-containers, psx-japanese-apartment, ruined-city-free, super-market-for-free, warehouse-free-low-poly-for-games. That is 17 pairs; the zips total about 740 MiB.
- Nested archives inside those folders: `a-street-in-japan/source/улица.zip`, `asia-building/source/build_001.rar`, `psx-cargo-containers/source/Cargo Containers.zip`, `psx-japanese-apartment/source/PSX Japanese Apartment.zip`, `low-poly-night-city-building-skyline/source/*.rar`. Each has an extracted copy beside it.
- `sketchfab-models/`: cyborg, cyborg-001, faerie-mina..., leon, ninja, norn-cultural-armor-test, sasha (zip + folder). `cyborg/source/Cyborg.rar`, `faerie.../mina_fairy_geo.rar` and `sasha/source/Sasha.rar` are nested and extracted beside. In `sexy-ref/`: black-mask-girl, ebony-bikini-girl, fashion-girl-asian-girl, iron-femme, kor-rpg-game-girl-2, lady-in-red, nice-hip-girl, sexy-necromancer, stella-girl, swimsuit-girl-fashion each have a zip beside their folder.
- `low-poly-mccree.zip` = `sketchfab-models/source/mccreescetchfab.blend` (plus a stale `.blend1` backup). `the-force-awakens-lowpoly.zip` = `source 2/forceawakenslopo.blend.blend`.
- `cyberpunk-asset-pull/SECTION Class Materials/`: nagafujiriku-s02, s04 (Coloso.png only), s05 each beside its zip. `nagafujiriku_lcd_screen_texture.png` at the top level is the file from `s04.zip`. `Coloso2.png` is `s06.zip` extracted.
- `Class Files/c07_.../tree_by_polyhaven.blend` = `c7_tree_by_polyhaven.zip`.
- `BSA_Layout.py` = `BSA_Layout.zip`.
- `Industrial structure generator/`: v0.1 zip and v0.2 `.blend` are two versions of one tool.
- `flex-2-full.zip` holds four addon zips: 2.4.9 plus three older (2.4.6, 2.4.7 twice, about 670 MiB in total).

Same pack or same content in two places (not byte-identical):

- `Sci fi buildings.blend` and `Scifi_buildings_textures/` (blend uses the textures, so keep as a pair).
- Kazusa `c07` to `c22` blends are successive stages of one scene; each repeats the same street assets. `c18` and `c19` also embed the car in `Car.fbx`. Keep `c22` and drop earlier stages if space matters.
- Fletcher `c05` `niko-coloso-city.blend` and `niko-coloso-city-assets.blend` overlap.
- `GN lowpoly building.blend` shares node groups (TransparentPaint, SunPower, TexturePaint) with `buildify_1.0.blend`, so it was built from Buildify.
- `Blender_files/demo1.blend` and `demo1_Atmoshere.blend` are two variants of one scene (same StarlightAtmosphere GN).
- `GGene_GN_Building.blend` and `GGene_GN_Building_v0(4.1up).blend` are two versions of one tool.
- `leon/source/ninja.fbx` is a different file from `ninja/source/Ninja.fbx` despite the name.

## 5. Suggested next steps

1. Extract only what is needed, one pack at a time, into a new empty folder under `C:\Prod\AssetPacks` (the existing AssetPacks UE project on port 8006), not into `_asset-pull`.
2. First candidates: `building-examples` FBX (import now), `FloatingSlums` loose FBX, `a-street-in-japan`, `city-street-free-for-game`, `loft2-free-interior`, `super-market-for-free`.
3. Find receipts or product pages for the purchased and no-licence items in section 3 and record them next to each pack.
4. Delete confirmed duplicates only after the user agrees, and send them to the Recycle Bin.
