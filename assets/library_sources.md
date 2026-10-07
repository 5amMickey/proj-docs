# Source asset library catalog

Surveyed 2026-10-08. Library root: `C:\Users\GameDevPC0403\Documents\Development\_assets`. All paths below are relative to that root.

The survey was read-only. It used file and folder names, counts and the small readmes. No binary was opened and no archive was extracted.

## How to read this

- Counts skip macOS junk: `._*` resource-fork files and `.DS_Store`. The raw tree has 60,346 files. After that filter it has 43,193.
- Archives (`.zip`, `.rar`, `.7z`) were not opened. Their contents are not counted. Many sit next to a folder with the same name, so they are probably duplicates of it.
- The library has 2,135 `.sbsar` and 1,908 `.sbs` files. Of those, 839 are not materials: stock dependency graphs, autosave copies, and helper copies inside `.resources` folders. The CSV keeps them and tags them in the `collection` column.
- Bucketing uses filename keywords only. If a Substance Database file matches no keyword, its parent category folder (Wood, Metal, Tiles and so on) decides the bucket. Names are a guide, not a check of what the material looks like.
- "Has source" means a `.sbs` with the same file name exists somewhere in the library. A same-name match can be a different material. Two GameTextures files (`metal_silver`, `metal_titanium`) are likely cases.
- Licences seen in the readmes: Substance Material Collection V1 allows commercial use but not redistribution. Substance-Texture-Pack is personal use unless a commercial licence was bought. Everything else has no licence file. Treat paid course and marketplace content (Gumroad, cmiVFX, Rebelway, VFX Apprentice, Elderwood, EPC) as not redistributable.
- `_houdini/Houdini-resources/Mac-Pro.hlic` is a Houdini licence file. Keep it out of any repo.

Companion file: `library_substance.csv` in this folder. One row per `.sbsar` and `.sbs`: name, extension, bucket, stylized, has_sbs_source, collection, path.

## 1. Collections

### Substance materials

| Collection | Type | What's in it | Counts by file type | Path |
|---|---|---|---|---|
| Substance Source | Substance materials | Adobe Substance Source set. Scanned and photo-style materials (food, skin, fabric, rock, paint, pottery) and 149 `stylized_*` materials. Flat folder. No `.sbs` sources. | 555 .sbsar | `Substance Source` |
| Substance_Database_2.1 (whole) | Substance materials | The Substance Database in four layouts: game textures, bitmap-based, procedural. Most procedural materials come as both `.sbs` and `.sbsar`. | 1,530 .sbsar, 1,240 .sbs, 588 .sbsprs, 199 .png, 30 .bmp, 30 .jpg, 1 .tif | `Substance_Database_2.1` |
| Database 2.0 GameTextures, Part 1 and Part 2 | Substance materials | 300 game-ready materials, flat folders. Common prefixes: metal_ (55), ground_ (42), concrete_ (32), brick_ (31), wood_ (23), tile_ (22), roof_ (12), rock_ (9). `.sbsar` only. | 300 .sbsar (150 + 150) | `Substance_Database_2.1\Substance_Database_2.0_GameTextures_Sbsar_Part1`, `..._Part2` |
| Database 2.1 BitmapBased, Sbsar | Substance materials | Photo-based materials with a `_bitmap` suffix. Folders: Bricks, Concrete, Fabric, Ground, Grunge, Manmade, Marble, Metal, Nature, Pavement, Plaster, Stone, Synthetic, Tiles, Wood. | 141 .sbsar | `Substance_Database_2.1\Substance_Database_2.1_BitmapBased_Sbsar` |
| Database 2.1 BitmapBased, Sbs | Substance materials | Sources for the set above, with preview PNGs. Each `.resources` folder holds a copy of the `Bitmap2Material_3` helper. | 178 .sbs, 139 .sbsar (helper copies), 177 .png, 1 .tif | `Substance_Database_2.1\Substance_Database_2.1_BitmapBased_Sbs` |
| Database 2.1 Procedural, Sbsar | Substance materials | `Classic_Materials` and `PBR_Materials`, each split by category: Abstract, Bricks, Buildings, Concrete, Fabric, Food, Ground, Manmade, Metal, Nature, Organic, Paper, Pavement, Plaster, Roads, Roofing, Runtime, Sci-Fi, Scrap, Skies, Sports, Stone, Synthetic, Tiles, Wallpapers, Water, Wood. | 950 .sbsar, 588 .sbsprs (presets) | `Substance_Database_2.1\Substance_Database_2.1_Procedural_Sbsar` |
| Database 2.1 Procedural, Sbs | Substance materials | Sources for every procedural `.sbsar` above, plus `GrungeMaps` (15 grunge graphs) and `Input_Textures` (17). | 1,062 .sbs, 30 .bmp, 30 .jpg, 22 .png | `Substance_Database_2.1\Substance_Database_2.1_Procedural_Sbs` |
| Substance-Texture-Pack | Substance materials | Seven quick-made materials: Cloudy_Marble, Earthshatter, Fleshy_Tissue, Gold_Veined_Marble, Painted_Mandala, Stylised_Rocks, Vintage_Tiles. The readme says they are experiments, best at 2048 px, and personal use unless licensed. | 7 .sbsar, 1 .rar, 1 .txt | `Substance-Texture-Pack` |
| Substance_Material_Collection_V1 | Substance materials | Chris Hodgson's 14 materials as `.sbs` with their dependencies: Alien_Red_Weed, Black_Sand, Brick_Wall, Cooled_Lava, Desert_Rock, Forest_Floor, Jungle_Rock_face, Medieval_Stone_Wall, Peeling_Painted_Plaster, Porous_Rock, Rock, Rocky_Black_Sand, Sea_Foam, Terracotta_Tiles. | 28 .sbs, 3 .tif, 1 .txt | `Substance_Material_Collection_V1` |

### Substance graphs and tools

| Collection | Type | What's in it | Counts by file type | Path |
|---|---|---|---|---|
| _substance (whole) | Substance graphs/tools | Mixed bin of Designer graphs, tutorial files, filters and archives. Of 542 `.sbs`/`.sbsar`, 74 are stand-alone graphs. The rest are stock dependency graphs or autosave copies. | 516 .sbs, 26 .sbsar, 20 .zip, 5 .rar, 132 .tga, 64 .png, 29 .jpg, 10 .tif (822 files) | `_substance` |
| _substance / Pixel8r | Substance graphs/tools | Pixel8r pixelation filter in versions 2.01, 2.5 and 2.72. Also a Boombox example: two Painter projects, bakes, final PBR and flat-diffuse TGAs, a LUT PNG, two FBX. | 3 .sbsar, 2 .spp, 2 .fbx, 8 .png, 7 .tga, 1 .zip | `_substance\Pixel8r` |
| _substance / Bruno_Pixel_Stroke, Bruno_Cracks_Generator, Bruno_Caustics_Generator | Substance graphs/tools | Three single-purpose generators by one author, each with `.sbs` source, `.sbsar` and a readme. Cracks and Caustics also have an SD5 version. | 2 to 4 .sbs and .sbsar each, 1 .txt each | `_substance\Bruno_*` |
| _substance / Adam Capone Stylized | Substance graphs/tools | Stylized Concrete, Grass, Metal and Wood graphs, plus a HeightPreview tool. | 6 .sbs (3 are autosave), 1 .sbsar, 1 .rar | `_substance\Adam Capone Stylized` |
| _substance / JRO_StylizedRocks_Files, JRO_Scifi_Hull_Files | Substance graphs/tools | Two single materials with `.sbs` and `.sbsar`, preview renders and Toolbag scenes. | 1 .sbs + 1 .sbsar each, 21 image files, 5 .tbscene | `_substance\JRO_*` |
| _substance / SDNodes_Vol1_Files | Substance graphs/tools | Utility nodes: curvature advanced, direction mask, height level mask, multi blend, wetness mask, with example graphs and a readme PDF. | 9 .sbs, 1 .pdf | `_substance\SDNodes_Vol1_Files` |
| _substance / Substance2017LibraryLite | Substance graphs/tools | Small library of Designer helper graphs: AddToGround, EdgeVariation, edge_detect_v002, FloodFills, PushEdges, Rocks, ShiftRocks, SimpleOutputs, a preview library. | 9 .sbs, 6 .jpg, 1 .txt | `_substance\Substance2017LibraryLite` |
| _substance / 1MAFX Noise Pack and Noise | Textures | Two folders of 30 noise textures each. Same counts, so one is likely a copy. | 30 .tga + 1 .jpg each | `_substance\1MAFX Noise Pack`, `_substance\Noise` |
| _substance / JM-Breakdown-Handpaint-Designer-SBS-01A | Tutorial/course | Hand-painted wall breakdown: `Brk_HandPaint_Wall_01A.sbs`, a PDF, an HCL helper. 260 of the `.sbs` are stock dependency nodes. | 260 .sbs, 2 .sbsar, 7 .tga, 1 .pdf, 1 .png | `_substance\JM-Breakdown-Handpaint-Designer-SBS-01A` |
| _substance / Overwatch Material Studies | Tutorial/course | One main graph with its dependencies and raw maps (Bricks, Busan Wood 1 and 2, Metal, ParisRoof). A second copy sits in `substance-designer`. | 169 .sbs, 30 .tga, 1 .sbsar | `_substance\Overwatch Material Studies` |
| _substance / single-graph folders | Substance graphs/tools | Metal_roof, metal_planes_lucas_zilke, Red_Rock_zipped, rockheight, stone_carver_01, textures-sbsar (stone_carver_01 and an anime rock zip), vfx_patterns_01, arcane-wall-tutorial, Substance Project Files (Dete filters), dependencies (Filter_DilationOrErosion, nondirectional_warp), optimizeGraph (Python plugin), Textures (22 PNG), _brushes (brush set PDF, .abr), .autosave. | Images: 22 .png in Textures, 23 .png in vfx_patterns_01, 21 .jpg in arcane-wall-tutorial, 6 .tga each in Metal_roof, metal_planes_lucas_zilke and Red_Rock_zipped | `_substance\<folder>` |
| _substance / loose files | Substance graphs/tools | 3dex_stylized_medieval_wall, carbon_fiber, Designer_Template, DeteBaseSetup, DeteDirectionalWarp, FloodFillExample, GameEngine_Template, grid_perforated, MultiDirectionalWarpGrayscale, Shields, steel_galvanized, sci-fi_rock, stone_carver_01, SubstanceDesignerWorkshop-TylerOliver, T_baseSetup, Texel_checker, WaterColorEffect. Archives: AnimeRocks.rar, Easy_cliffs (non-uniform directional warp) zip, SoMuchMaterials_Update_604.zip, zips of most folders. One tutorial video. | 14 .sbs, 3 .sbsar, 17 .zip, 3 .rar, 1 .mp4 | `_substance` |
| substance-designer | Substance graphs/tools | Smaller second bin. Copies of Overwatch Material Studies, arcane-wall-tutorial and the Designer templates, plus Cobblestone_cjw_02, grass_pattern_01, the Color Wheel node and the optimizeGraph Designer plugin (install steps in its readme). | 120 .sbs, 1 .sbsar, 27 .tga, 21 .jpg, 2 .zip, 1 .7z, 1 .rar, 1 .py | `substance-designer` |
| _Substance_Documents_ | Substance graphs/tools | A Substance Painter user folder. `plugins\SoMuchPainter` is a QML plugin (bake mesh maps, rebuild texture sets, set sky). `shelf` holds the SoMuchMaterials set: 8 `.sbsar` (plus 8 hidden copies), 10 export presets, 6 project templates, 3 shaders, 1 smart material, 15 environment PNGs. | 16 .sbsar, 11 .qml, 10 .spexp, 6 .spt, 6 .glsl, 1 .spsm, 20 .png, 3 .tga | `_Substance_Documents_` |

### Houdini

| Collection | Type | What's in it | Counts by file type | Path |
|---|---|---|---|---|
| _houdini (whole) | Houdini tools/HDAs | 49 folders and 101 loose files: HDAs, `.hip` scenes, course project files, Unreal and Unity project folders, tool zips. Section 3 lists them. | 26,629 files: 584 .hda/.hdalc (+2 .otl), 364 .hip/.hiplc/.hipnc, 147 .zip/.rar, 3,212 .uasset, 233 .fbx, 295 .exr, 70 .usd. 627 of the HDA and hip files are `_bakNN` autosaves. | `_houdini` |
| _houdini / Tech Track | Houdini tools/HDAs | Looks like a Unity project (DLLs, `.meta`) with SideFX workshop HDAs and hips: terrain, spaceship parts, block placer, VAT, Labs examples, PDG workshop. | 19,136 files, 21 .hda, 18 .hip, 8 archives | `_houdini\Tech Track` |
| _houdini / houdini-indie-pixels-tutorials | Houdini tools/HDAs | Indie Pixel race-track toolkit: `ip_*` HDAs for terrain, rocks, trees, fences, scatter, stamps, track and guard rails. | 625 files, 428 .hda, 148 .hip, 17 .zip (mostly `_bak` copies) | `_houdini\houdini-indie-pixels-tutorials` |
| _houdini / Unreal project folders | Houdini tools/HDAs | Full UE projects with Houdini sources: Elderwood Overlook (1,164 files), loopableLiquid (933), GROT_UE (654), EPC_colosseum (638), Polar_Camera (389). | .uasset, .umap, .uproject, .bgeo, .fbx | `_houdini\Elderwood - Unreal Project Files`, `loopableLiquid`, `GROT_UE`, `EPC_colosseum`, `Polar_Camera_files_nocache` |
| _houdini / UI_GameInputs_TextureOnly_Universal_Version | Textures | UI input glyph pack: Keyboard_Mouse and four gamepad sets (P4, P5, S, X). A `key.txt` is present. Keep it out of repos. | 1,106 files, mostly .png, some .svg | `_houdini\UI_GameInputs_TextureOnly_Universal_Version` |
| _houdini / animation-mocap | Animation | See section 4. | 18 .zip, 11 .fbx | `_houdini\animation-mocap` |
| _houdini / COPs and Texture_Synthesis | Houdini tools/HDAs | Copernicus (COP) files: five COPs zips and a "COPs Mega File" with a video, plus a Texture_Synthesis COP network dump. | 6 .zip, 1 .mp4, 225 network files | `_houdini\COPs`, `_houdini\Texture_Synthesis` |

### Animation, VFX, courses

| Collection | Type | What's in it | Counts by file type | Path |
|---|---|---|---|---|
| Universal Animation Library 2 [Standard] | Animation | One zip (10 MB, not opened) and two preview images. | 1 .zip, 2 .png | `Universal Animation Library 2[Standard]` |
| VFX-Apprentice / Project Files | VFX course/files | VFX Apprentice course files: 2D hand-drawn FX levels 1 and 2 (Toon Boom `.tvg` drawings), 3D hand-crafted VFX levels 1 and 2 (Unity, Unreal Niagara, Krita, Substance Designer), Apprenticeship Level 3 (Tradigital_FX), and a Free Download Files folder. | 5,854 files: 1,953 .uasset, 961 .tvg, 878 .txt, 660 .tvg~, 279 .png, 243 .ini, 189 .tga | `VFX-Apprentice\Project Files` |
| VFX_RTFX | VFX course/files | Real-time FX element library. `Sources` has 55 frame-sequence folders (Energy, Snow, Sparks, Smoke, Electricity, Blizzard, grunge and concrete backgrounds). `previews` has rendered samples. | 5,298 files: 1,851 .mp4, 1,809 .jpg, 1,564 .png, 49 .swf, 24 .mov | `VFX_RTFX` |
| Gumroad - Environment Art Mastery by Thiago Kafke (Standard Edition) | Tutorial/course | Extras only, no videos. Maya tools (`.mel`, random placement script), Unreal tools (54 `.uasset`), Photoshop normal-to-AO and normal tools, Substance PBR templates, demo textures, a scale reference FBX, and a link list for module 21 (performance optimization). | 115 files: 54 .uasset, 27 .png, 7 .mel, 6 .tga, 4 .txt, 4 .sbs, 2 .atn | `Gumroad - Environment Art Mastery by Thiago Kafke (Standard Edition)` |

## 2. Substance materials by category

Rules for the buckets:

- A file goes in the first bucket that matches, in this order: Stylized, Generators/Utility, Sci-fi/Tech, Ice/Snow/Water, Fabric/Leather, Wood, Organic/Nature, Concrete/Plaster, Brick/Masonry/Wall, Pavement/Tiles/Floor, Rock/Stone/Cliff, Metal, Ground/Soil/Sand/Gravel, Other.
- Stylized means the name has stylized, stylised, toon, cartoon, cartoony or hand paint. So a stylized rock sits in Stylized, not in Rock. The material split of Stylized is below.
- Food, paper, paint, glass and plastic land in Other. Skin, hair, bone and fur land in Organic/Nature. Terracotta and roof tiles land in Pavement/Tiles/Floor.
- Every file in a `dependencies` folder is Generators/Utility. These are stock Designer nodes (blur, levels, edge detect, gradients).
- The lists below leave out autosave copies, `.resources` helper copies, `.alg_meta` copies and dependency nodes. The counts include them. Names are deduplicated within a collection, so a material that exists as both `.sbs` and `.sbsar` appears once.
- A dagger (†) after a name means a `.sbsar` with no `.sbs` of that name anywhere in the library. It can be wrapped but not edited. Collections where every file is `.sbsar` only (Substance Source, Database 2.0 GameTextures) carry no daggers.

### Summary

| Bucket | Files | .sbsar | .sbs | Copies and dependencies (not listed) | Distinct names listed |
|---|---|---|---|---|---|
| Rock/Stone/Cliff | 278 | 163 | 115 | 12 | 162 |
| Ground/Soil/Sand/Gravel | 201 | 107 | 94 | 22 | 91 |
| Brick/Masonry/Wall | 276 | 165 | 111 | 4 | 152 |
| Pavement/Tiles/Floor | 336 | 189 | 147 | 10 | 174 |
| Wood | 296 | 178 | 118 | 4 | 173 |
| Metal | 243 | 156 | 87 | 4 | 153 |
| Concrete/Plaster | 414 | 225 | 189 | 19 | 197 |
| Fabric/Leather | 338 | 190 | 148 | 1 | 170 |
| Organic/Nature | 341 | 243 | 98 | 6 | 235 |
| Ice/Snow/Water | 47 | 23 | 24 | 6 | 30 |
| Sci-fi/Tech | 61 | 31 | 30 | 6 | 28 |
| Stylized | 173 | 161 | 12 | 3 | 164 |
| Generators/Utility | 823 | 184 | 639 | 713 | 88 |
| Other | 216 | 120 | 96 | 29 | 119 |
| **Total** | **4043** | **2135** | **1908** | **839** | **1936** |


### Names by bucket

Each line is one collection. The number in brackets is the count of distinct names.

### Rock/Stone/Cliff (278 files)

- **Substance Source** (46): big_rubble_on_earth_ground, bleached_chiseled_rock, canyon_sandstone, cipollino_marble, cracked_canyon_rock, cracked_layered_cliff, cracks_on_layered_stone, crumbled_rock, crumbled_rock_chips, crumbly_cave_rock, desert_cliff_eroded, desert_sandstone_dark, desert_sandy_bedrock, dirt_on_canyon_mud, dirty_corroded_rock, earthy_cave_rock_formation, encroached_gravely_rock, eroded_canyon_stone, exposed_stone_on_desert_ground, granite_grey_blue, grassy_gravel_canyon_soil, greco_scritto_marble, lava_flow, limestone_grit_06, limestone_rock_canyon, marble_paint, marbled_rocky_terrain, medium_rock_pebbles_10, ominous_obsidian, pavonazzetto_marble, quartz_acrylic_polymer, raw_canyon_sandstone, rocky_dusty_ground, rose_pearl_limestone_grit, rough_rock_surface, skyros_marble, slick_canyon_rock, small_granite_peebles, soft_round_pebble_ground_01, stained_rocky_ground, stepped_rock, stone_mixed_soil, stones_on_canyon_mud, twisted_canyon_sandstone, volga_blue_granite, washed_canyon_sandstone_bedrock
- **Database 2.0 GameTextures** (23): brown_sandstone_rock, ground_desert_sand_pebbles, ground_large_rock_surface, ground_smooth_martian_rock, ground_smooth_rocks, light_grey_rock, marble_limestone, marble_nero_marguina, marble_white_italian_marble, misc_piled_stone, red_rock_001, red_rock_002, red_rock_003, red_rock_004, red_rock_005, rock_barnacle_covered_rock, rock_coal, rock_face_advanced_001, rock_face_advanced_002, rock_generic_granite, rock_generic_obsidian, rocky_arid_ground, stone_smooth_rock_ground
- **Database 2.1 BitmapBased** (28): dirt_and_pebbles_001_bitmap, layered_stones_001_bitmap, marble_001_bitmap, marble_002_bitmap, marble_003_bitmap, marble_004_bitmap, marble_005_bitmap, marble_006_bitmap, marble_007_bitmap, marble_008_bitmap, marble_009_bitmap, rock_001_bitmap, rock_002_bitmap, rock_003_bitmap, rock_004_bitmap, rock_005_bitmap, rock_006_bitmap, rock_007_bitmap, rock_008_bitmap, rock_009_bitmap, rock_010_bitmap, rock_011_bitmap, rock_012_bitmap, rock_013_bitmap, rock_014_bitmap, sculpted_stone_001_bitmap, stones_ground_001_bitmap, stones_ground_002_bitmap
- **Database 2.1 Procedural** (51): Amethyst, Coal, Crystal_Pattern, Damaged_Marble, Glowing_Rock, granite_001, Granite_01, Granite_02, Granitoid, Lava_Rocks, Limestone_Blocks, marble_001, marble_002, marble_003, marble_004, Marble_01, Marble_02, Marble_03, Meteor, pebbles_001, pebbles_002, pebbles_003, pebbles_004, pebbles_005, pebbles_007, Prehistoric_Cave, rock_001, rock_002, rock_003, rock_004, rock_006, rock_007, Rock_02, Small_Stones, stones_001, stones_002, stones_003, stones_004, stones_005, stones_006, stones_007, stones_008, stones_009, Stones_01, stones_010, stones_011, stones_012, stones_013, stones_014, stones_015, Volcano_Rock
- **Material Collection V1** (6): Cooled_Lava, Desert_Rock, Jungle_Rock_face, Porous_Rock, Rock, Rocky_Black_Sand
- **Substance-Texture-Pack** (3): Cloudy_Marble†, Earthshatter†, Gold_Veined_Marble†
- **_substance** (5): Red_Rock, rockheight, Rocks, ShiftRocks, stone_carver_01

### Ground/Soil/Sand/Gravel (201 files)

- **Substance Source** (24): ancient_earth_enamel, ancient_smooth_clay, debris_covered_ground, desert_sand_dune, engraved_ancient_smooth_clay, eroded_earth_soil, fresco_floral_ancient_earth_enamel, fresco_wavy_ancient_earth_enamel, layered_sand, low_tide_sand_stripes, pebbly_shore, porous_riverbed_sand, raked_natural_clay, red_desert_soil, red_gravel, rolling_sandy_beach, sahara_desert_sand, sand_smooth, smooth_natural_clay, smooth_sandy_riverbed, smoothed_sandy_beach, straight_floral_ancient_earth_enamel, straight_square_ancient_earth_enamel, windswept_wet_sand
- **Database 2.0 GameTextures** (14): dirt_with_gravel, ground_desert_sand, ground_desert_sand_small_dunes, ground_dirt_clod_ground, ground_fresh_tilled_dirt, ground_generic_sand, ground_gravel_muddy_mine, ground_gravel_smooth, ground_moon_dirt, ground_mud_cracked, ground_red_desert_dirt, ground_sand_kauai, ground_seaside_gravel, ground_seattle_beach_gravel
- **Database 2.1 BitmapBased** (7): dry_dirt_001_bitmap, hatch_001_bitmap, sewer_plate_001_bitmap, sewer_plate_002_bitmap, sewer_plate_003_bitmap, sewer_plate_004_bitmap, speed_reducer_001_bitmap
- **Database 2.1 Procedural** (44): Desert_Sand_01, dry_ground_002, Dry_Ground_01, Dry_Ground_02, Football_Field, Gravel, Grey_Sand, ground_001, ground_002, ground_003, ground_004, ground_005, ground_006, ground_007, ground_008, ground_009, ground_010, ground_011, ground_012, ground_013, ground_014, ground_015, ground_016, ground_017, ground_018, ground_019, ground_020, ground_021, ground_022, ground_023, ground_024, ground_025, ground_026, ground_027, ground_028, ground_029, magma_ground_001, mud_001, Muddy_Trail, Rough_Ground, sand_001, Sand_01, Sand_02, Sanded_Glass
- **Material Collection V1** (1): Black_Sand
- **_substance** (1): AddToGround

### Brick/Masonry/Wall (276 files)

- **Substance Source** (15): cracked_canyon_wall, dirty_terracotta_brick_wall, english_brick_curved_facade_03, english_style_painted_arch_window_facade_02, eroded_brick_fragments, eroded_canyon_wall, exposed_mortar_tiles, fresco_straight_ancient_cracked_mudbrick_wall, medium_cinderblock_fragments, mixed_bricks_rubble_floor, modern_brick_facade_02, random_rubble_masonry_rounded_stone_wall, straight_square_ancient_cracked_mudbrick_wall, wavy_ancient_cracked_mudbrick_wall, worn_canyon_wall
- **Database 2.0 GameTextures** (48): boulder_stone_wall, brick_bath_stone, brick_bonus_castle_wall, brick_brown_grooved, brick_capital_brick, brick_castle_bumpy, brick_chicago, brick_cinderblock, brick_clean_white, brick_cobblestone_wavy, brick_eroded_sandstone, brick_generic_red_city_brick, brick_grungy_cinderblock, brick_large_castle_wall, brick_large_sandy_colored, brick_marble_brick, brick_medieval_chipped, brick_medieval_dark_brown_grout, brick_medieval_oval, brick_modern_glossed, brick_mossy_castle, brick_octagon_paver_pattern, brick_painted_city_brick, brick_pattern_x, brick_paving_stones_decorative_001, brick_paving_stones_decorative_002, brick_sewer_brick, brick_smooth_geometric_rock, brick_spanish_fort, brick_standard_dirty, clean_basement_cinderblocks, diagonal_grooved_brick, granite_rock_wall, ground_brick_paving_stone, medieval_brown_brick_001, medieval_brown_brick_002, medieval_brown_brick_003, medieval_brown_brick_004, medieval_rounded_stone_bricks, misc_padded_wall, misc_padded_wall_clean, painted_interior_wall_with_cracked_paint, painted_wall_with_wainscoting, rock_dank_cave_wall, rock_wall_smooth, rock_wall_wind_eroded, stacked_boulder_wall, stone_rock_wall
- **Database 2.1 BitmapBased** (12): bricks_001_bitmap, bricks_002_bitmap, bricks_003_bitmap, bricks_004_bitmap, bricks_005_bitmap, quincunx_bricks_ground_001_bitmap, stones_wall_001_bitmap, stones_wall_002_bitmap, stones_wall_003_bitmap, stones_wall_004_bitmap, stones_wall_005_bitmap, stones_wall_006_bitmap
- **Database 2.1 Procedural** (73): brick_wall_001, bricks_001, bricks_002, bricks_003, bricks_004, bricks_005, bricks_006, bricks_007, bricks_008, bricks_009, bricks_010, bricks_011, bricks_012, bricks_013, bricks_014, bricks_015, bricks_016, bricks_017, bricks_018, bricks_019, bricks_020, bricks_021, bricks_022, bricks_023, bricks_024, bricks_025, bricks_026, bricks_027, bricks_028, bricks_029, bricks_030, bricks_031, bricks_032, bricks_033, bricks_034, bricks_035, Bricks_Dirty, BrickWall_01, BrickWall_02, BrickWall_03, BrickWall_04, BrickWall_05, BrickWall_06, BrickWall_07, door_001, Glass_Building_01, house_wall_001, House_Wall_01, Machu_Pichu_Wall, Marble_Wall_01, Painted_Wall, rock_wall_004, rock_wall_005, RockWall_001, RockWall_002, RockWall_003, RockWall_01, RockWall_02, RockWall_03, RockWall_04, Rotten_Wall_01, Rotten_Wall_02, stonework_001, stonework_002, stonework_003, stonework_004, stonework_005, stonework_006, Wall_Base, Wall_Steel_Sheet, window_001, window_002, Window_01
- **Material Collection V1** (2): Brick_Wall, Medieval_Stone_Wall
- **_substance** (1): arcane_wall_tutorial
- **substance-designer** (1): arcane_wall_tutorial

### Pavement/Tiles/Floor (336 files)

- **Substance Source** (20): abandoned_factory_tiled_floor_02, broken_terracotta_tile_fragments, clean_asphalt_patch, damaged_pedestrian_road_marking, eroded_cobblestone_pathway, japanese_porcelain, mossy_roof_tiles, mud_wet_step_marks, old_cobblestone_pavement_01, old_japanese_stone_pavers, oxidized_terracotta_tiles, patterned_terracotta_tiles, pieces_of_broken_roof_tiles_02, randomized_stone_pathway, rocky_road_surface, shingle_beach, siena_marble_herringbone_tiles, slabs_on_desert_ground, square_brown_terracotta_credence, wet_off_road_tire_s_tread
- **Database 2.0 GameTextures** (34): brown_and_grey_cobblestone_ground, floor_medieval_pavement, metal_floor_holes_advanced, metal_grid_floor, metal_steel_floor_grating, roof_bent_ceramic_tiles, roof_ceramic_old, roof_ceramic_old_001, roof_ceramic_old_002, roof_ceramic_roof_tile, roof_round_tiles_advanced, roof_slate_tile_clean, roof_slate_tiled, rubber_and_plastic_laboratory_floor, tile_black_marble, tile_clean_blue_beige, tile_diamond_patterned, tile_dirty_square_subway, tile_disgusting_subway_tiles, tile_disgusting_tile, tile_dwarf_tile_clean, tile_grocery_store_linoleum, tile_marble_diamond_divided, tile_ornate_bordered, tile_pattern_tile_advanced_001, tile_pattern_tile_advanced_002, tile_pattern_tile_advanced_003, tile_pattern_tile_advanced_004, tile_small_tiles_dirty, tile_square_swirl, tile_square_with_diamond_pattern, tile_star_cross_pattern, tile_wavey_wedge, tiles_helix_pattern
- **Database 2.1 BitmapBased** (12): asphalt_001_bitmap, asphalt_002_bitmap, asphalt_003_bitmap, asphalt_004_bitmap, ceramic_tiles_001_bitmap, garden_tiles_001_bitmap, marble_tiles_001_bitmap, mosaic_tiles_001_bitmap, pebbles_pavement_001_bitmap, stone_tiles_001_bitmap, stones_pavement_001_bitmap, stones_pavement_002_bitmap
- **Database 2.1 Procedural** (105): asphalt_001, Asphalt_02, bronze_copper_tiles, ceramic_001, ceramic_002, ceramic_003, ceramic_004, Ceramic_01, Ceramic_02, Ceramic_03, Ceramic_04, Ceramic_Tile_05, circle_pavement, ground_gravel_asphalt, Metal_Floor, metal_floor_001, metal_floor_002, metal_floor_003, metal_floor_004, metal_floor_005, metal_floor_006, metal_floor_007, metal_floor_008, mosaic_001, pavement_001, pavement_002, pavement_003, pavement_004, pavement_005, Pavement_01, Pavement_02, Pavement_03, Pavement_04, Pavement_05, Pavement_06, Pavement_07, Pavement_Path, road_001, Road_01, Road_02, Road_03, road_tarmac_001, Road_Tarmac_01, rock_pavement_001, Rock_Pavement_01, Roof_Base, Roof_Ceramic, Roof_Quarry_Tile, Roof_Tiles, roofing_001, roofing_002, roofing_003, roofing_004, roofing_005, roofing_006, roofing_007, roofing_008, roofing_009, roofing_010, roofing_011, roofing_012, roofing_013, roofing_014, Rusty_Metal_Floor, Slate_Tiles, stone_tiles_001, Stone_Tiles_02, Stone_Tiles_03, Tile_01, tiles_001, tiles_002, tiles_003, tiles_004, tiles_005, tiles_006, tiles_007, tiles_008, tiles_009, tiles_010, tiles_011, tiles_012, tiles_013, tiles_014, tiles_015, tiles_016, tiles_017, tiles_018, tiles_019, tiles_020, tiles_021, tiles_022, tiles_023, tiles_024, tiles_025, tiles_026, tiles_027, tiles_028, tiles_029, tiles_031, tiles_032, tiles_033, tiles_034, tiles_035, tiles_036, vintage_ceramic_tiles
- **Material Collection V1** (1): Terracotta_Tiles
- **Substance-Texture-Pack** (1): Vintage_Tiles†
- **substance-designer** (1): Cobblestone_cjw_02

### Wood (296 files)

- **Substance Source** (31): american_walnut_crown_cut, bamboo_wood_varnished, boxwood_boughs, burnt_wood, carved_wood, cerused_pine_wood, dirty_wood_sticks, fir_tree_boughs, lichen_covered_wood_sticks, maple_leafy_boughs, moldy_wood_chunks_02, mossy_oak_bark, mossy_wood_sticks_03, mossy_wood_sticks_07, natural_cross_laminated_wood_timber, natural_european_ash_wood, oak_leaves_front_side, old_walnut_bark, pine_needles, pine_oak_autumn_leaves_03, pine_wood_outdoor_panelling_01, small_dirty_wood_chunks_01, spruce_boughs, thick_wood_sticks_03, thin_deciduous_wood_sticks, thin_dry_bamboo_leaves, wagon_fine_wood_panelling, walnut_bark, white_pine_boughs, wood_and_bark_chips, wood_cedar_white
- **Database 2.0 GameTextures** (35): ceiling_extravagent_wood, cube_pattern_wood_floor, floor_wood_alternating, ground_fine_wood_bits, interlocked_wood_panel_floor, misc_oak_barrel_clean, painted_wooden_siding, roof_wood_old, roof_wood_shingles, tile_wood_grid, wood_board_walk_planks, wood_cherry_wood_floor, wood_common_storage_crate, wood_faded_white_wash_siding, wood_fancy_ballroom_floor, wood_floor_clean, wood_medieval_metal_grid, wood_old_dirty_parquet_floor, wood_old_floor_clean, wood_ornate_wood_ceiling, wood_parallel_planks, wood_parquet_old, wood_pine_panels, wood_planks_reinforced, wood_plywood_advanced, wood_plywood_supports, wood_railway_sleeper, wood_rounded_log_cabin, wood_siding_clean, wood_tiling_small_detail_generic, wood_tiling_widdled_planks, wood_worn_siding_advanced, wood_zig_zag_floor, wooden_crate_advanced, wooden_wall_advanced
- **Database 2.1 BitmapBased** (12): framed_planks_001_bitmap, old_varnished_wood_001_bitmap, painted_wood_hedge_001_bitmap, planks_001_bitmap, planks_002_bitmap, planks_003_bitmap, planks_004_bitmap, planks_005_bitmap, planks_006_bitmap, planks_007_bitmap, planks_008_bitmap, wood_door_001_bitmap
- **Database 2.1 Procedural** (94): Bamboo_Fence, Cane, CorkBoard, Light_Wood, Old_Painted_Planks, Painted_Fence, Painted_Wood_01, Parquet, ParquetMixer, particle_board, Varnished_Wood, wood000_Acajou, wood001_Afrormosia, wood002_Agba, wood003_Ako, wood004_Beam-tree, wood005_Aniegre, wood006_Avodire, wood008_Bosse, wood009_acajou, wood010_Bubinga, wood011_Cedar, wood012_Chestnut, wood013_Maple, wood014_Eyong, wood015_Ash, wood016_Oli_Ash, wood017_Hemlock, wood018_Kotibe, wood019_Makore, wood020_Larch, wood021_Cherry, wood022_Cherry, wood023_Moabi, wood024_Walnut, wood025_Moabi, wood027_Okoume, wood028_Olive_Tree, wood029_Elm, wood030_Japanese_Elm, wood031_American_Elm, wood032_Brazilian_Palisander, wood033_Paldao, wood034_Indian_Palisander, wood035_Palisander, wood036_Rio_Palisander, wood037_Pauamar, wood039_Oregon_Pine, wood040_Monterey_Pine, wood041_Pink_Pine, wood042_Pine, wood043_Plane_Tree, wood044_Red_Cedar, wood045_Teak, wood046_Exotic, wood047_Douka, wood26_Walnut, wood_000_acajou, wood_008_bosse, wood_009_acajou, wood_010_Bubinga, wood_011_Cedar, wood_015_ash, wood_017_hemlock, wood_019_makore, wood_024_Walnut, wood_027_okoume, wood_029_elm, wood_030_japanese_elm, wood_031_american_elm, wood_032_brazilian_palisander, wood_033_Paldao, wood_035_palisander, wood_040_monterey_pine, wood_044_red_cedar, wood_045_teak, wood_048_old, Wood_American_Cherry, wood_beech_chocolate_brown, Wood_Beech_ChocolateBrown, Wood_Beech_Honey, wood_beech_mid_brown, Wood_Beech_MidBrown, Wood_Beech_MysticBrown, Wood_Beech_Natural, wood_beech_toast_brown, Wood_Beech_ToastBrown, Wood_Chipboard, Wood_Pine, wood_planks_001, Wood_Planks_01, Wood_Planks_02, Wood_Rhododendron, Wood_White_Cedar
- **_substance** (1): Wood

### Metal (243 files)

- **Substance Source** (17): battered_nickel, brushed_car_paint_metallic, car_paint_metallic_matte, car_paint_metallic_matte_dusty, cross_brushed_copper, insulation_foil_gasket, large_bullet_rusty_impacts, large_rust_leaks, metal_grinded, metal_scratched_and_dented, metallic_paint, old_corrugated_freight_elevator_door, random_brushed_titanium, rust_brown, rusty_hardware_debris, rusty_metal_burrs, steel_polished
- **Database 2.0 GameTextures** (59): dirty_industrial_steel, dusty_chrome_advanced, framed_metal_001, framed_metal_002, horizontal_metal_plates, metal_air_duct, metal_aircraft_interior, metal_aluminium_directional, metal_beefy_metal_chainlink, metal_bolted_plates, metal_brass_generic, metal_brushed_copper, metal_brushed_steel_001, metal_brushed_steel_002, metal_brushed_steel_003, metal_chainmail, metal_copper_dented, metal_corrugated, metal_corrugated_steel_worn_paint, metal_diamond_plates_advanced, metal_diamond_plates_quad, metal_diamond_traction_plates, metal_distressed_iron, metal_expanded_steel_traction_plates, metal_galvanized_steel, metal_gold_advanced, metal_hammered_iron, metal_hammered_steel, metal_iron_rusty, metal_knurled_clean, metal_meteoric_iron, metal_old_copper_still, metal_oxidized_aluminium, metal_oxidized_bronze, metal_painted_rust, metal_riveted_plates, metal_rugged_iron, metal_rust_001, metal_rust_002, metal_rust_003, metal_rust_base, metal_rusted_steel, metal_silver, metal_smooth_brass, metal_smooth_oxidized_iron, metal_smooth_pitted_meteorite, metal_smooth_steel, metal_square_traction_plate, metal_steel_oxidized, metal_steel_plates, metal_titanium, metal_traction_plate, metal_trashed_steel, metal_trim_kit, metal_worn_anvil_iron, misc_metal_cable, painted_corrugated_metal_advanced, painted_metal, rough_lead_advanced
- **Database 2.1 BitmapBased** (12): escalator_001_bitmap, metal_shutter_001_bitmap, metal_shutter_002_bitmap, old_iron_001_bitmap, old_metal_door_001_bitmap, old_painted_metal_001_bitmap, old_painted_metal_002_bitmap, pewter_001_bitmap, pewter_002_bitmap, steel_001_bitmap, steel_002_bitmap, steel_003_bitmap
- **Database 2.1 Procedural** (60): Aircraft_Metal, Barbwire, Bronze_Copper, Brushed_Aluminum, Brushed_Metal, chainmail_antique, Corrugated_Metal, Corrugated_Tin_Plates, Diamond_Plate, Fencing, Galvanized, galvanized_001, Galvanized_Metal, Gold_Paper, metal_001, metal_002, metal_003, metal_004, metal_005, metal_006, metal_aluminium, metal_aluminium_brushed, metal_brass, metal_car_paint, metal_copper, metal_corrugated_002, metal_gold, metal_nickel, metal_painted_steel, metal_panels_001, metal_panels_002, Metal_plate, metal_plate_001, metal_plate_002, metal_plate_003, metal_plate_004, metal_plate_005, metal_plate_006, metal_plate_007, metal_plate_008, metal_plate_009, metal_plate_010, metal_plate_011, metal_plate_armor, metal_platinum, metal_roll_up, metal_silver, metal_steel, metal_steel_brushed, metal_steel_bumped, metal_steel_parkerized, metal_titanium, metal_used, metal_weapon, Painted_Metal_01, Painted_Metal_02, Rusty_Metal, Rusty_Paint, Screws, Steel_Sheet
- **_substance** (5): grid_perforated, Metal, Metal_planes, Metal_roof, steel_galvanized

### Concrete/Plaster (414 files)

- **Substance Source** (10): blistered_paint_concrete_wall, cast_concrete_wall_blocks, chamfered_concrete_building, concrete_raw_grey, crackling_paint_on_plaster_wall, dirty_concrete_block_facade, grassy_parking_lot_concrete_paving_blocks, heavy_cracked_concrete_sidewalk_01, spanish_trowel_stucco, worn_concrete_bridge_support_wall_painted_03
- **Database 2.0 GameTextures** (47): brick_concrete_retaining_wall, concerete_modern_tiling_squares, concrete_bare_001, concrete_bare_002, concrete_bare_003, concrete_bare_004, concrete_blocks, concrete_bolted_panels, concrete_bolted_wall, concrete_brick_kit, concrete_bunker_vertical, concrete_chernobyl_distressed, concrete_diamond_pattern, concrete_drill_holes, concrete_large_square_tiles, concrete_long_concrete_brick, concrete_metal_grid, concrete_parallel_extrusions, concrete_pattern_001, concrete_rebar_concrete, concrete_removed_tiles, concrete_rough_exposed_pebbles, concrete_sandstone_wall_base, concrete_sidewalk, concrete_skate_ramp, concrete_smooth_tiles, concrete_square, concrete_square_tile_patterned, concrete_structural_divots, concrete_tiny_cracks, concrete_traffic_barrier, concrete_vertical_bunker, concrete_wall_004, concrete_wall_ridges, dark_colored_concrete, distressed_aged_concrete, large_square_cracked_concrete, plain_bumpy_plaster, plaster_bare_001, plaster_bare_002, plaster_damaged_brown, plaster_flat_plaster, plaster_old_cracked, plaster_sand_colored, plaster_sharp_crusty, road_concrete_brick, sand_colored_plaster_wall
- **Database 2.1 BitmapBased** (26): concrete_and_pebbles_pavement_001_bitmap, concrete_pavement_001_bitmap, concrete_pavement_002_bitmap, concrete_pavement_003_bitmap, concrete_tiles_001_bitmap, concrete_tiles_002_bitmap, concrete_wall_001_bitmap, concrete_wall_002_bitmap, crystal_concrete_001_bitmap, damaged_plaster_001_bitmap, dirt_and_concrete_pavement_001_bitmap, dirty_concrete_wall_001_bitmap, handmade_plaster_001_bitmap, layered_concrete_wall_001_bitmap, old_mossy_concrete_001_bitmap, old_mossy_concrete_002_bitmap, old_mossy_concrete_003_bitmap, painted_concrete_001_bitmap, painted_plaster_001_bitmap, painted_plaster_002_bitmap, painted_plaster_003_bitmap, plastered_wall_001_bitmap, plastered_wall_002_bitmap, plastered_wall_003_bitmap, sculpted_concrete_001_bitmap, sidewalk_bumped_concrete_001_bitmap
- **Database 2.1 Procedural** (112): classic_brown_concrete, Column, concrete_001, concrete_002, concrete_003, concrete_004, concrete_005, concrete_006, concrete_007, concrete_008, concrete_009, Concrete_01, concrete_010, concrete_011, concrete_012, concrete_013, concrete_014, concrete_015, concrete_016, concrete_017, concrete_018, concrete_019, Concrete_02, concrete_020, concrete_021, concrete_022, concrete_023, concrete_024, concrete_025, concrete_026, concrete_027, concrete_028, concrete_029, Concrete_03, concrete_030, concrete_031, concrete_032, concrete_033, concrete_034, concrete_035, concrete_036, concrete_037, concrete_038, concrete_039, Concrete_04, concrete_040, concrete_041, concrete_042, concrete_043, concrete_044, concrete_045, concrete_046, concrete_047, concrete_048, concrete_049, Concrete_05, concrete_050, concrete_051, concrete_052, concrete_053, concrete_054, concrete_055, concrete_056, concrete_057, concrete_058, concrete_059, Concrete_06, concrete_060, concrete_061, concrete_062, concrete_063, concrete_064, concrete_065, concrete_066, concrete_067, concrete_068, concrete_069, Concrete_07, concrete_070, concrete_071, concrete_072, concrete_073, concrete_074, concrete_075, concrete_076, concrete_077, concrete_078, concrete_079, Concrete_08, concrete_080, concrete_081, concrete_082, concrete_083, concrete_084, concrete_085, Concrete_09, Concrete_Pavement, Concrete_Tiles, Cracked_Plaster, modern_concrete_001, Modern_Concrete_01, Modern_Concrete_02, Old_Plaster, painted_concrete, pebbledash_001, Poured_Concrete, rough_concrete_with_lines, Scratched_Concrete, stripes_001, Stripes_01, stucco_001, Stucco_01
- **Material Collection V1** (1): Peeling_Painted_Plaster
- **_substance** (1): Concrete

### Fabric/Leather (338 files)

- **Substance Source** (40): beaded_dupatta_fabric, bull_large_grain_stitched_seam, calfskin_leather, calfskin_leather_mariposa_emboss, carpet_shaved, cotton_rich_tricotine_weave_back_side, cotton_rich_tricotine_weave_front_side, cotton_rich_tricotine_weave_front_side_scan, cotton_tricotine_weave_back_side, cotton_tricotine_weave_back_side_scan, cotton_tricotine_weave_front_side, cotton_tricotine_weave_front_side_scan, cotton_tricotine_weave_novelty_yarn_back_side, cotton_tricotine_weave_novelty_yarn_back_side_scan, cotton_tricotine_weave_novelty_yarn_front_side, cotton_tricotine_weave_novelty_yarn_front_side_scan, cotton_tricotine_weave_printed, cotton_tricotine_weave_printed_scan, fabric_jeans, flat_embroidery, flecked_herringbone_serge, floral_lace_fabric, floral_style_embroidery_jacquard, irregular_triangle_curtain_wall_tiles, japanese_embroidered_peonies_fabric, japanese_shiny_embroidered_peacock_fabric, japanese_shiny_embroidered_trees_fabric, jersey_stitch, lacing_stitch, leather_bull, lehenga_fabric, micro_diamond_embroidery, oil_paint_on_canvas, polyester_stretch_interlock_front, satin_fabric, sequins_reversible_graphic, vegetable_tanned_leather_diamond_woven, wax_flower_print_fabric, weave_in_striped_knit, x_structure_curtain_wall_panel
- **Database 2.0 GameTextures** (3): carpet_office_parallel, misc_brown_leather, misc_woven_metal
- **Database 2.1 BitmapBased** (13): fabric_001_bitmap, fabric_002_bitmap, fabric_003_bitmap, leather_001_bitmap, leather_002_bitmap, leather_003_bitmap, plastic_doormat_001_bitmap, towel_001_bitmap, wool_001_bitmap, wool_002_bitmap, wool_003_bitmap, wool_004_bitmap, wool_005_bitmap
- **Database 2.1 Procedural** (114): camouflage_001, Camouflage_01, Camouflage_02, Canvas_01, Canvas_02, carpet_001, carpet_002, carpet_003, denim_001, denim_002, denim_003, Doormat, fabric_001, fabric_002, fabric_003, fabric_004, fabric_005, fabric_006, fabric_007, fabric_008, fabric_009, Fabric_01, fabric_010, fabric_011, fabric_012, fabric_013, fabric_014, fabric_015, fabric_016, fabric_017, fabric_018, fabric_019, Fabric_02, fabric_020, fabric_021, fabric_022, fabric_023, fabric_024, fabric_025, fabric_026, fabric_027, fabric_028, fabric_029, fabric_030, fabric_031, fabric_032, fabric_033, fabric_034, fabric_035, fabric_036, fabric_037, fabric_038, fabric_039, Fabric_Canvas, fabric_cotton, Fabric_Denim, fabric_gingham, Fabric_Knitted, Fabric_Knitted_Wool, Fabric_Military, Fabric_Pants01, Fabric_Polo01, Fabric_Polo02, fabric_polo_002, Fabric_Rugged, Fabric_Shirt01, Fabric_Shirt02, Fabric_Shirt03, Fabric_Shirt04, Fabric_Shirt05, Fabric_Shirt_with_Square, fabric_silk, fabric_square_pattern, Fabric_Sweater, Fabric_Tshirt01, Fabric_Tshirt02, Fabric_Velvet01, Fabric_Velvet02, Fabric_Wool_Fabric01, Fabric_Wool_Fabric02, fabric_wool_fluffy, imitation_leather_001, Jeans_01, Knits, leather_001, Leather_002, Leather_003, Leather_004, Leather_005, Leather_006, Leather_Classic, Leather_Dry, leather_plate_armor, Leather_Woven_001, Linen, metal_woven, Old_Fabric, rug_001, Rug_01, Satin, Satin_001, Shoes_Leather, Shoes_Turned_Leather, Sisal_Rug, Stage_Curtains, Towel_01, Turned_Leather, Wallpaper, wicker_001, Wool, wool_001, Woven_Leather, Woven_Metal, zebra_001

### Organic/Nature (341 files)

- **Substance Source** (132): abalone_and_knive_outside_shells, apricot_skin, arch_fingerprint_skin, bone, carrot_skin, chico_palm_dry_v02, damp_leafy_creek_bed, dry_laurel_leaves, elands_sourfig_leaves_02, female_40yo_cheek_skin_1, female_40yo_cheek_skin_2, female_40yo_cheek_skin_3, female_40yo_chin_skin_1, female_40yo_chin_skin_2, female_60yo_cheek_skin_1, female_60yo_cheek_skin_2, female_60yo_cheek_skin_3, female_60yo_cheek_skin_4, female_60yo_forehead_skin_1, female_60yo_forehead_skin_2, female_60yo_forehead_skin_3, female_back_skin_1, female_elbow_skin_1, female_elbow_skin_2, female_elbow_skin_3, female_elbow_skin_4, female_fullarm_skin_1, female_fullarm_skin_2, female_fullarm_skin_3, female_fullarm_skin_4, female_fullarm_skin_5, female_fullarm_skin_6, female_leg_skin_1, female_leg_skin_2, female_leg_skin_3, female_leg_skin_4, female_leg_skin_5, female_shoulder_skin_1, fish_bait_ball, fish_scales, frog_skin, hay_tarp, holly_leaves_front, horse_chestnut_leaves_front_side, joshua_tree_leaves, large_fern_frontside, large_hosta_leaf_front, linden_autumn_leaves, loop_fingerprint_skin, male_30yo_cheek_skin_1, male_30yo_cheek_skin_2, male_30yo_forehead_skin_1, male_30yo_forehead_skin_2, male_30yo_forehead_skin_3, male_30yo_forehead_skin_4, male_40yo_cheek_skin_1, male_40yo_cheek_skin_2, male_40yo_cheek_skin_3, male_40yo_cheek_skin_4, male_40yo_cheek_skin_5, male_40yo_cheek_skin_6, male_40yo_cheek_skin_7, male_40yo_cheek_skin_8, male_40yo_chin_skin_1, male_40yo_chin_skin_2, male_40yo_forehead_skin_1, male_40yo_nose_skin_1, male_belly_skin_1, male_belly_skin_2, male_belly_skin_3, male_foot_sole_skin_1, male_foot_sole_skin_2, male_foot_sole_skin_3, male_fullarm_skin_1, male_fullarm_skin_2, male_fullarm_skin_3, male_fullarm_skin_4, male_fullarm_skin_5, male_fullarm_skin_6, male_fullarm_skin_7, male_lowerleg_skin_1, male_lowerleg_skin_2, male_lowerleg_skin_3, male_lowerleg_skin_4, male_lowerleg_skin_5, male_neck_skin_1, male_palmhand_skin_1, male_shoulder_skin_1, male_shoulder_skin_2, male_shoulder_skin_3, male_shoulder_skin_4, male_shoulder_skin_5, male_shoulder_skin_6, male_shoulder_skin_7, male_shoulder_skin_8, male_upperchest_skin_1, male_upperchest_skin_2, male_upperchest_skin_3, male_upperchest_skin_4, male_upperchest_skin_5, moon_orchid_petals, moss_ball_vegetal_wall, oleander_bouquet, orange_skin, palm_tree_bark_peeings, palm_tree_fan_leaves, paper_with_straw_inserts, park_forest_floor, peppervine_autumn_leaves_02, pink_flower_petals_04, poplar_leafy_branches, pumpkin_skin, putty_root_leaves, raw_salmon_flesh, reptilian_alien_skin, salmon_flesh_grilled, scrubland_palm_leaves, shaved_hair, short_american_fern_02, short_weed_clumps_03, skin_birth_mark, skin_cracks, skin_crust, skin_freckles, skin_scratches, swirl_fingerprint_skin, tarovine_leaves_front_side, texas_sotol_leaves_, thorny_olive_boughs, toad_skin, zombie_bloody_meat, zombie_skin_burnt_scars
- **Database 2.0 GameTextures** (22): ground_dead_leaves_001, ground_dead_leaves_002, ground_forest_cover, ground_gnarly_grass, ground_grass_001, ground_grass_002, ground_grass_003, ground_grass_004, ground_grass_dead, ground_gravel_dead_leaves, ground_green_foliage_001, ground_green_foliage_002, ground_ivy_ground_cover, ground_large_scale_grass, ground_large_scale_rocky_dirt, ground_leafy_ground, ground_long_dead_grass, ground_puffy_seaweed, ground_rocky_ground_grass, ground_straw_covered_ground, roof_ceramic_round_tiles_moss, roof_slate_with_moss
- **Database 2.1 BitmapBased** (14): bark_001_bitmap, bark_002_bitmap, bark_003_bitmap, bark_004_bitmap, bark_005_bitmap, bark_006_bitmap, dead_grass_001_bitmap, dead_grass_002_bitmap, dead_grass_003_bitmap, dead_grass_004_bitmap, grass_001_bitmap, grass_002_bitmap, grass_003_bitmap, hedge_leaves_001_bitmap
- **Database 2.1 Procedural** (62): Autumn_Leaves, Banana_Skin, Bark, bark_001, bark_002, bark_003, bark_004, bark_005, bark_006, bark_007, bark_008, bark_009, bark_010, bark_011, bark_012, Cow_Skin, Crocodile_Skin, Elephant_Skin, Eye, eye_001, Flesh, Flower_Grass, foliage_001, forest_ground_001, Giraffe_Skin, Grass_01, Hair, hair_001, Hair_002, Hair_003, human_skin_001, Ivy, Lawn, lawn_001, Leopard_Fur, lips, metal_scale_armor, Moss_Rock, nature_001, nature_002, Pebble_Grass, Pinapple_Skin, Plane_Tree_Bark, Plastic_Bumps, Skin_001, Skin_002, Skin_003, Skin_004, Skin_005, Skin_006, Snake_Skin, Snake_Skin_001, Sponge, Stadium_Lawn, Straw, Tiger_Fur, Tree_Bark, Tree_Bark_003, Tree_Bark_02, Tree_Slice, Zebra_Skin, Zombie_Skin_001
- **Material Collection V1** (2): Alien_Red_Weed, Forest_Floor
- **Substance-Texture-Pack** (1): Fleshy_Tissue†
- **_substance** (1): Grass
- **substance-designer** (1): grass_pattern_01

### Ice/Snow/Water (47 files)

- **Substance Source** (9): aluminium_close_cell_foam, large_river_rocks, milk_liquid, pebbly_river_bank, polystyrene_foam_chips, ripples_on_sandstone, river_pebbles_in_dry_mud_02, sand_small_ripples, swamp_stream_ground
- **Database 2.0 GameTextures** (3): ground_fresh_snow, ground_icy_snow_pack, ground_snow_dunes
- **Database 2.1 BitmapBased** (1): ice_001_bitmap
- **Database 2.1 Procedural** (16): Calm_Water, Cracked_Ice, Electric_Liquid, Energy_Liquid, Energy_Waves, Frost, Ice_01, Ice_02, Liquid_Splash, Ocean_01, snow_001, snow_002, Transparent_Ice, Water_Drips, Water_Drops, Waves
- **Material Collection V1** (1): Sea_Foam

### Sci-fi/Tech (61 files)

- **Substance Source** (7): carbon_fiber_plain_weave, scifi_brushed_metal, scifi_expandable_plate_panel, scifi_interlocking_slider_panels, scifi_metal_foil_retaining_mesh, scifi_straight_floor_panel, space_station_cargo_rack
- **Database 2.0 GameTextures** (3): metal_aluminum_space_station, metal_futuristic_grid, tile_scifi_metal_pattern
- **Database 2.1 Procedural** (14): Impact_01, Printed_Circuit, sci_fi_001, sci_fi_002, sci_fi_003, sci_fi_004, sci_fi_005, sci_fi_006, sci_fi_007, Sci_Fi_Tile_01, Space_01, Space_02, Space_03, Space_Ship
- **_substance** (4): carbon_fiber, JRO_SciFi_Hull, sci-fi_rock, Shields

### Stylized (173 files)

- **Substance Source** (149): stone_pavement_mossy_stylized, stylized_aged_gold, stylized_autumnal_fallen_leaves, stylized_balloon_paper, stylized_barnacle_covered_rock, stylized_battered_copper, stylized_battered_iron, stylized_bent_double_concrete_wall, stylized_black_ink_marble, stylized_black_ink_marble_fluted_column, stylized_black_marble, stylized_blocky_stone_cliff, stylized_blue_marble_fluted_column, stylized_book_paper, stylized_brushed_ceramic, stylized_carved_crystal, stylized_cast_copper, stylized_cast_gold, stylized_cast_iron, stylized_chinese_plaster, stylized_clay_mold, stylized_clean_copper_wall_panel, stylized_coast_cliff_rock_overgrown, stylized_cobblestone_pavement, stylized_concrete, stylized_copper, stylized_cracked_willow, stylized_cracked_wood_planks, stylized_damaged_concrete, stylized_damaged_concrete_herringbone_pavement, stylized_damaged_copper, stylized_damaged_hammered_copper, stylized_damaged_terracotta, stylized_damaged_terracotta_stretcher_bond, stylized_damaged_wood_phoenix_parquet, stylized_desert_sand_ridge, stylized_diamond_stone_pavement, stylized_dirty_brick_chimney, stylized_dirty_rock, stylized_dirty_rock_with_sand, stylized_dirty_square_stone_wall, stylized_driftwood, stylized_electric_wire, stylized_endshake_terracotta_roof_tiles, stylized_eroded_concrete, stylized_eroded_stone, stylized_fallen_pine_needles, stylized_fine_sand_beach, stylized_fish_scale_terracotta_roof_tiles, stylized_flat_terracotta_roof_tiles, stylized_galvanized_steel, stylized_gaziana_flower, stylized_gold, stylized_gold_coins, stylized_gravel_sand_beach, stylized_grinded_copper, stylized_grinded_iron, stylized_hammered_cast_iron, stylized_hammered_gold, stylized_harvest_bells_flower, stylized_hay_ground, stylized_heavy_duty_steel_wire_cable, stylized_ice_impact, stylized_inca_temple_wall, stylized_iron, stylized_iron_steam_pipe, stylized_island_cliff, stylized_large_terrazzo, stylized_lava_cracked, stylized_lawn_grass, stylized_layered_cliff_rock, stylized_light_blue_marble, stylized_light_blue_marble_grid_tiles, stylized_light_brown_marble, stylized_long_field_grass, stylized_long_leaves, stylized_long_tuft_of_grass, stylized_medieval_chain_armor, stylized_medium_pebbles_ground, stylized_melted_metal, stylized_modelling_clay, stylized_moroccan_terracotta_tiles, stylized_mossy_island_cliff, stylized_muddy_soil, stylized_multi_filament_metal_wire_cable, stylized_norfolk_terracotta_roof_tiles, stylized_ocean_spray_swept_wood, stylized_ocean_spray_swept_wood_planks, stylized_old_brick_wall, stylized_old_rusty_iron, stylized_old_terracotta, stylized_old_wood_planks_with_reinforced_crossed_chassis, stylized_oxidized_copper, stylized_palm_tree_bark, stylized_perforated_copper_wall_panel, stylized_pier_wood_pillar, stylized_pier_wood_planks, stylized_pirate_island_beach_sand, stylized_pirate_island_cliff, stylized_pirate_port_building_facade, stylized_pirate_ship_deck_planks, stylized_pirate_ship_sails, stylized_pirate_ship_wood_trim_sheet, stylized_pirate_treasure, stylized_plaster_reinforced_wall, stylized_plaster_wall_wooden_beam, stylized_random_ashlar_floor, stylized_rockery_floor, stylized_rockery_ground, stylized_rocky_desert_ground, stylized_rope_manila, stylized_rope_spool, stylized_rough_clay, stylized_round_stones_in_concrete, stylized_rusted_metal_wire_cable, stylized_rusty_iron, stylized_sahara_dunes, stylized_sandy_rock_shore, stylized_scratched_wood_planks, stylized_sea_house_stone_wall, stylized_sea_house_terracotta_roof, stylized_seaside_cobblestone_path, stylized_slate_metal_wall_panel, stylized_small_field_grass, stylized_small_leaves_shrub_plant, stylized_soft_gray_zebra_marble, stylized_spanish_plaster, stylized_spanish_terracotta_roof_tiles, stylized_square_concrete_tiles, stylized_square_crystal_stone_pavement, stylized_stalactite, stylized_standard_paper, stylized_stone_cliff_with_sand, stylized_terracotta, stylized_terracotta_regular_stairs, stylized_tortoise_shell, stylized_tree_trunk_cross_section, stylized_tropical_island_leaves, stylized_twelve_angled_stones, stylized_wavy_tuft_of_grass, stylized_white_marble, stylized_wild_grass, stylized_wood_barrier, stylized_wood_beam, stylized_wood_flooring, stylized_wood_planks, stylized_wood_siding_panel, stylized_wool, stylized_woven_carpet
- **Database 2.0 GameTextures** (5): brick_stylized_cobblestones, ceiling_wood_cartoony_clean, stone_cartoony_flat_brick_cobblestone, stone_cartoony_stone_bricks, tile_stylized_wood_tile
- **Database 2.1 Procedural** (5): Cartoon_Stones, Cartoon_Tile_01, Cartoon_tile_02, Cartoon_tile_03, Cartoon_tile_04
- **Substance-Texture-Pack** (1): Stylised_Rocks†
- **_substance** (3): 3dex_stylized_medieval_wall, Brk_HandPaint_Wall_01A, JRO_StylizedRocks
- **substance-designer** (1): 3dex_stylized_medieval_wall

### Generators/Utility (823 files)

- **Substance Source** (1): wallpaper_hexagon_relief_pattern
- **Database 2.0 GameTextures** (1): metallic_paint_effect
- **Database 2.1 BitmapBased** (1): damaged_paint_001_bitmap
- **Database 2.1 Procedural** (30): Broken_Glass, Burnt_Film, Checker, Frosted_Glass, Grimoire, grunge_001, GrungeMap_001, GrungeMap_002, GrungeMap_003, GrungeMap_004, GrungeMap_005, GrungeMap_006, GrungeMap_007, GrungeMap_008, GrungeMap_009, GrungeMap_010, GrungeMap_011, GrungeMap_012, GrungeMap_013, GrungeMap_014, GrungeMap_015, Old_Parchment, Paint_Cracks, Stained_Glass, Straw_Checker, Tunnel, Wallpaper_Input, Wheel, Windscreen_Glass_01, Windscreen_Glass_02
- **Material Collection V1** (7): crystal_1b, MultiDirectionalWarpGrayscale, MultiDirectionalWarpGrayscaleNN, Super_AO, Tropical_Flower_A, Tropical_Leaf_A, Tropical_Leaf_B
- **_substance** (33): _PreviewLibrary_lite, Bruno_Caustics_Generator, Bruno_Cracks_Generator, Bruno_Pixel_Stroke, Curvature_Adv_Example, Designer_Template, DeteBaseSetup, DeteDirectionalWarp†, DeteLowPassing†, Direction_Mask_Example, edge_detect_v002, EdgeVariation, FloodFillExample, FloodFills, GameEngine_Template, Height_Level_Mask_Example, HeightPreview†, JRO_Curvature Adv, JRO_Direction_Mask, JRO_Height_Level_Mask, JRO_Multi_blend, JRO_Wetness_mask, MultiDirectionalWarpGrayscale, Pixel8r_2.01†, Pixel8r_2.5†, Pixel8r_2.72†, PushEdges, SimpleOutputs, T_baseSetup, Texel_checker†, vfx_patterns_01, WaterColorEffect†, Wetness_mask_Example
- **substance-designer** (5): ColorWheel, Designer_Template, DeteBaseSetup, FloodFillExample, GameEngine_Template
- **_Substance_Documents_** (8): SMM_Emissive_Helper†, SMM_SoMuchDota†, SMM_SoMuchMaterials†, SMM_SoMuchOverlays†, SMM_SoMuchRoughness†, SMM_SoMuchSpecular†, SMM_SoMuchWarframe†, SMM_WF_Helper†
- **Gumroad (Kafke)** (2): TK_PBR_Templates, TK_PBR_Templates_Code

### Other (216 files)

- **Substance Source** (54): ancient_fantasy_world_map, ancient_painted_rough_pottery, ancient_rough_pottery, banana_peels_02, blue_cheese, bread_slice, brushed_oil_paint, burned_ripped_cardboard_pieces, car_iridescent_paint, car_paint_custom_flakes, car_paint_matte_rough, car_solid_paint, cartagena_paint, charcoal_on_paper, cigarette_butts, cocoa_powder, cooking_apples, crushed_painted_soda_cans_02, diluted_ink, dirty_chipboard_fragments, diving_helmet, dry_brushed_ink, dry_marker_strokes, french_croissant, handmade_rice_paper, heavy_golden_dawn_clean, indian_paper_macro, ink_dripping_dilution, ink_flame_dilution, ivory_beige, linear_marker_strokes, low_velocity_fresh_paint_stains, mix_thick_paint, morio_worms, nacho_chip, oil_paint, prefab_vertical_window_panels, puff_glitter_print, random_paint_brush, salami, scarce_blood_leaks, spray_paint_tag, tea_beverage, thermal_insulation_panel, thick_handmade_watercolor_paper, thin_hemp_paper_macro, tooth_tartar, torn_cardboard_pieces_02, triple_panel_building, watercolor_paint, watercolor_paper_02, waved_painted_plates, wax_chalk_background, wax_chalk_strokes
- **Database 2.0 GameTextures** (3): ceiling_coffered_ballroom_lights, misc_black_rubber, smooth_plastic_advanced
- **Database 2.1 BitmapBased** (3): mailbox_door_001_bitmap, plastic_shutter_001_bitmap, polystyrene_001_bitmap
- **Database 2.1 Procedural** (53): Basketball_Court, Beer, Blotting_Paper, book_paper001, book_paper002, book_paper003, book_paper004, book_paper005, Bubblewrapped, cane, Cardboard, cardboard_001, Cereals, Chocolate, Chocolate_Biscuit, Cookie, Crumpled_Paper, Cubes, Defocused_Light, drawing_paper_001, Drawing_Paper_01, Drawing_Paper_02, Egg_Sunny_Side_Up, enveloppe_001, Eye, Fiber_Glass, Fire, glass, Lips, old_book_001, paper_001, paper_002, paper_002-1, paper_003, paper_004, paper_005, paper_006, Paper_01, Paper_02, plastic_base, Rice, roofing_015, school_paper, shutter_001, Shutter_01, Strawberry, Sunshine, Swiss_Cheese, Tennis_Court, tire_001, Tire_01, Toasted_Bread, Triangles
- **Substance-Texture-Pack** (1): Painted_Mandala†
- **_substance** (2): Overwatch Material Studies, SubstanceDesignerWorkshop-TylerOliver
- **substance-designer** (1): Overwatch Material Studies
- **Gumroad (Kafke)** (2): Examples, Trim_Example_01
### Which `.sbsar` have a matching `.sbs`

1,104 of the 2,135 `.sbsar` have a same-name `.sbs`. Those can be opened and edited in Designer. The other 1,031 can only be wrapped (used as is, with their exposed parameters) or restyled with the `texture-pipeline` skill.

| Collection | .sbsar | Same-name .sbs exists | No source |
|---|---|---|---|
| Substance Source | 555 | 0 | 555 |
| Database 2.0 GameTextures | 300 | 2 | 298 |
| Database 2.1 Procedural | 950 | 950 | 0 |
| Database 2.1 BitmapBased | 280 (141 materials + 139 helper copies) | 141 | 139 (all helper copies) |
| Substance-Texture-Pack | 7 | 0 | 7 |
| _substance | 26 | 11 | 15 |
| substance-designer | 1 | 0 | 1 |
| _Substance_Documents_ | 16 (8 distinct + 8 hidden copies) | 0 | 16 |
| Material Collection V1, Gumroad | 0 (sources only) | n/a | n/a |

Where the source exists:

- Every Database 2.1 procedural and bitmap-based material has its `.sbs`.
- In `_substance`: Bruno_Caustics_Generator, Bruno_Cracks_Generator, Bruno_Pixel_Stroke, JRO_SciFi_Hull, JRO_StylizedRocks, Metal_planes, Metal_roof, Red_Rock, rockheight.
- Only the two GameTextures files `metal_silver` and `metal_titanium` match a `.sbs` name, and they match Database procedural files, not their own source.

Sbsar only (wrap only), outside Substance Source and GameTextures: Cloudy_Marble, Earthshatter, Fleshy_Tissue, Gold_Veined_Marble, Painted_Mandala, Stylised_Rocks, Vintage_Tiles, Pixel8r 2.01 / 2.5 / 2.72, DeteDirectionalWarp, DeteLowPassing, Filter_DilationOrErosion, HCL, HeightPreview, Texel_checker, WaterColorEffect, and the SMM_* shelf materials.

Source only (a `.sbs` with no `.sbsar`, so it needs publishing before use as a material): all 14 Substance_Material_Collection_V1 materials, the Adam Capone Concrete / Grass / Metal / Wood graphs, 3dex_stylized_medieval_wall, Brk_HandPaint_Wall_01A, Cobblestone_cjw_02, grass_pattern_01, carbon_fiber, grid_perforated, steel_galvanized, sci-fi_rock, Shields, stone_carver_01, arcane_wall_tutorial, the Overwatch Material Studies graph, and the TK_PBR_Templates graphs.

### Stylized, split by material

The 173 Stylized files hold 163 distinct names. They break down by what the name describes: Rock/Stone/Cliff 29, Metal 27, Pavement/Tiles/Floor 23, Wood 18, Organic/Nature 17, Brick/Masonry/Wall 14, Concrete/Plaster 10, Ground/Soil/Sand/Gravel 10, Other 6, Ice/Snow/Water 5, Fabric/Leather 4. Section 5 names the ones that matter.

## 3. Houdini tools (`_houdini`)

All descriptions come from file and folder names. Nothing was opened. "Looks like" means a guess from the name. The totals: 154 HDA files (129 distinct names) and 169 hip files (164 distinct names), after dropping `_bakNN` autosaves. Most HDAs here are `.hda`. HoudiniSource uses `.hdalc`, so expect to re-save anything you pull in.

### 3.1 Loose HDAs (16)

| File | What it looks like |
|---|---|
| Building_Generator.hda | Procedural building generator. |
| Tutorial_Building_Generator.hda (+ .zip) | Building generator from the Project Titan tutorial set. |
| HE_Terrain_Tool.hda | Terrain tool from the Houdini Engine starter kit. |
| Oscar_highway_generator.hdalc | Highway or road generator. |
| Oscar_spiral.hda | Spiral shape or stair generator. |
| cgcBridge.hdalc | Bridge generator. |
| Pyro_Smoke_Tutorial.hda | Pyro smoke setup from a tutorial. |
| damienp_color_box.hda, damienp_pdg_boxes.hda | Box coloring and a PDG box demo. |
| pixelrender_test001.hdalc | Test for a pixel-style render. Worth a look for ProjectRunner. |
| tileableLiquid_public.hdalc | Tileable liquid texture or sim setup. |
| Titan_StackingTool.hda | Object stacking tool (Project Titan). |
| Tutorial_fence.hda, Tutorial_Ivy.hda, Tutorial_platform.hda | Fence, ivy and platform generators from the Project Titan tutorials. |
| TUT_ad_boards.hda | Advertising boards or signs generator. |

### 3.2 HDA folders

| Folder | HDAs and scenes | What it looks like |
|---|---|---|
| Building tools for Unreal Engine 4 (Houdini) | Balk, Building_Tool, Fence, Floor_maker, Hanging_Cables, Ivy_generator, Pipe_tool, Stairs (.hdalc) | Modular building kit for UE: beams, building, fence, floors, cables, ivy, pipes, stairs. |
| Houdini - Building Tools for Unreal Engine 4 | The same HDAs, cgcBridge, terrain_intro.hdalc, `Intro_Terrains_lesson01..32_end.hiplc` (26 scenes) | Course version with a terrain lesson series and a UE project (295 files). |
| Caelus | 16 `sop_elyssa.*` HDAs: building_generator, Wall_Generator, Combine_Wall_Modules, Building_Roof_Generator, Tower_Roof_Generator, tower_generator, Dormer_Generator, chimney_generator, place_dormers_and_chimneys, aqueduct_generator, terrain_model_generator, terrain_shader, plus `sop_elyssac` SpireGenerator, WindowGenerator, generate_tile_texture, texture_building_walls. Scene `Caelus.hip`. | Medieval and ancient town builder: walls, roofs, dormers, chimneys, towers, spires, windows, aqueducts, terrain and wall textures. |
| Gamejam_starterkit, GameJamStarterKit-UnrealEngine5, HE_Starter_Kit_Unity | Edge_Damage, Foliage_maker, Level_gen_WFC, Placement_tool, Platform_maker, Psd_Level, Rock, Terrain_Tool, Tree, TrimT_Tool, pipe, walls_tool, Road_tool_2D. Same set three times (GameJam_, HE_ prefixes). | Houdini Engine starter kit for game jams: edge wear, foliage, wave-function-collapse levels, placement, platforms, level from PSD, rocks, trees, trim tool, walls, pipes, 2D roads. Unity and UE5 versions. |
| houdini-indie-pixels-tutorials | `ip_*` HDAs: terrain_creator, moutain_stamps, stamp_exporter, rock_generator, evergreen_tree_creator, unreal_scatter_trees, generic_placement_tool, perimeter_fence, gaurd_rail(s)_creator, basic_track_creator, track_bumpers_creator, road_bumper_creator, road_cone_generator, tire_stack_generator, sweep_curve_helper, my_box, plus test HDAs. Scene `Race_Track_Tools_001.hip`. | Indie Pixel race-track toolkit for UE. The terrain, rock, tree and scatter tools are general. |
| Tech Track | boxscatter, deform, Desert_Terrain, EverGreen.otl, geo_boolean, geo_merge, he_polyreduce, HEU* (Houdini Engine for Unity), mountainMaker, randomized_sphere, SideFX__spaceship, silhouette_Maker, spaceshipPartMaker, TerrainGenerator, UnityTreeGen, Sop_course.block, Sop_course.block_placer. Hips: VAT, invoke, Labs PolyScalpel and MergeSplines, groom, pivot painter, PDG workshop. | SideFX workshop material for Unity and Houdini Engine. |
| houdiniTraining | aw_bridge_generator.hdalc, aw_bridge_tool, aw_training_001..003, path_bridge_test01 | Bridge generator and training scenes (mostly `_bak` copies). |
| Radu Cius cyberpunk escalator | Procedural_Escalator_V1.hdalc, ProceduralEscalator.hiplc, ciusr.beta.rbd_to_fbx_old.1.0.hdalc, group_select_test.hdalc, 4 zips | Procedural cyberpunk escalator and an RBD-to-FBX exporter. |
| levelbuilder_source_files, unity, Source_Files | Level_Builder_Tutorial_File.hda, Level_Builder_Tool_Tutorial*.hip(lc), Stair_tool.hda, stairs_Tutorial.hip, VAT3_Tutorial_Unity.hip | Level builder tool tutorial and a stair tool, with Unity files. |
| Project Titan | Titan_StackingTool.hda, Tutorial_cloth_tool.hda, Vat_Chararcter_Tutorial.hip, 15 zips (ad boards, pyro smoke, tree pivot painter, building generator, rail, cloth tool) | Titan tutorial set. |
| EPC_colosseum | place_radial_geometry.1.0.hda, sop_Labs.material_slots_from_groups.1.0.hda, Marcello.hip(lc), Textures.hip | Colosseum project: radial placement and material slots from groups. |
| Cable Tool | tutorial_cable.1.0.hda, Cable_Tutorial_setup.hip, trim PNG | Cable generator. |
| Houdini Texel Density Tool | fp_texel_density_tool.hda, demo video | Texel density checker. |
| Sofia_Rig, Harry_content, electra_rig_example, lucha_and_chicken | sofia.hda, Harry_Rig.hip, sop_testgeometry.harry.1.0.hda, electra_rig_example.hip, rig/anim scene examples | Character rig examples. |

### 3.3 Scene files (`.hip`, `.hiplc`, `.hipnc`) outside the folders above

| Scene | What it looks like |
|---|---|
| city_builder_DEMO.hip(lc), City_Builder_Box.hiplc | City builder demo. |
| PUBLIC_SideFX_BuildingGenerator_01.hip | SideFX building generator. |
| bridge_procedural_03.hip, bridge_procedural_demo_01.hiplc, bridge/bridge.hip, skylark_wooden_bridge_tutorial.hip | Procedural bridges. |
| Procedural_Cliffs_QTutorial.hip | Cliff tutorial. |
| Elderwood_Cliffs - Project Files / Elderwood_Cliffs.hip | Cliff scene from the Elderwood work. |
| Houdini Hive GDC 2023: Example01_RocksToUnreal, Example02_ZBrushToPainter, Example03_Cliff | Rocks and cliffs to Unreal, ZBrush to Painter. |
| Freek Hoekstra: manmade_dungeon_generator, organic_dungeon_demo, simple_fence_example_with pickets | Dungeon and fence generators (`.hipnc`). |
| dungeon_props: Modeling_Pillars, Modeling_Wooden parts | Dungeon pillars and wooden parts. |
| Houdini Procedural Lake Houses Vol 1 and cmiVFX Lake House Vol 1 to 3 | Lake village and house building course scenes (`LakeVillage_Ch*`). |
| Kinefx_biharmonic_skin, Kinefx_fbik_hips, Kinefx_straight_skeleton | KineFX skinning, FBIK and skeleton demos. |
| Flowfield_01, flowmap_viz_bug, lattice+uv+displacement+wsnormal, heightfield_cutout, hair_v2, pyroBonfire_DEMO, Applied.Houdini.Boat, Rebelway_CHOPs_demo_v01, ap_foreach_primitive_group_alternative | Single-topic experiments: flow fields, flow maps, lattice, heightfield cutout, hair, pyro bonfire, boat, CHOPs, foreach. |
| Procedural Lamp: Lamp.hiplc + 3 Painter smart materials (Lamp Metal, Paint, Plastic) | Procedural lamp with matching Painter materials. |
| DryadBiomeInitializeDemo, RoadNetworks, Polar_Camera (polarCamera, skyboxLoop), solaris_demo_files (62 hips: asset setups for barrel, baskets, book, bookshelf, broom, bucket, clay jar, cooking pot), MBA01 sci-fi magic blast (8 chapters), vertex_animation_textures.3.0.pdg | Biome init, road networks, polar camera and skybox loop, Solaris asset setups, VFX course chapters, VAT 3.0. |
| IndiePixel_HoudiniTerrain_001 (loose zip, with `backup` of 12 autosaves) | Terrain scene. |

### 3.4 Tool zips (not opened)

Names only. The folder or hip listed above may already hold the unpacked version.

| Zip | What it looks like |
|---|---|
| AL tools - CliffBundle - v6.1.zip | Cliff tool bundle. |
| HoudiniTools-main.zip, mardini_labs_nodes.zip, mardini_vfx_nodes.zip | Tool collections and custom Labs and VFX nodes. |
| Stroke_It_v200.zip | Stroke or outline tool, name only. |
| ast_wfc.zip, wfc_project_files.zip, wfc_dungeon_project_files.zip | Wave function collapse tools and a dungeon. |
| scifi_door_source_files.zip, scifi_panels_sourcefiles.zip, scifi_stairs_sourcefiles.zip, scifi_terminal_source_files.zip | Sci-fi door, wall panels, stairs and terminal sources. |
| custom_terrace_toshare.zip, TERRACE_2.0.zip, moon_crater_toshare.zip, heightfieldtexturing.zip, MPM_landslide.zip, desert_project_files.zip, procedural_desert_ue5.zip | Terrain: terraces, craters, heightfield texturing, landslide sim, desert. |
| Lucen Grass Breakdown.zip, biome_demo8.zip, coral_synapse.zip | Grass breakdown, biome demo, coral. |
| rbd4rt_source_files.zip, RBD_CuttingPlane.zip, RBD_GuidedSims.zip, Houdini - Real-time_Destruction_in_Houdini_and_Unreal | Destruction and RBD. |
| conditional_vertex_animation_textures.zip, HoudiniNiagara.zip, PDG_DEMO.zip, COPS_MegaFile.zip, cop_py_snippets.zip | VAT, Niagara export, PDG demo, Copernicus (COP) file and Python snippets. |
| IP_HDA_Tips_Tricks.zip, ip_hou_fbx_exporting_assets.zip, ip_python_001_assets.zip, IP_Python_002_Assets.zip, IndiePixel_HoudiniTerrain_001.zip | Indie Pixel tips: HDA, FBX export, Python, terrain. |
| RigBuilder_tutorialFiles.zip, Sofia_Rig.zip, sofia_rig2.zip, Harry_content.zip, Erik_v1.zip, Andrey_Polywink.zip | Rigs and characters. Polywink looks like face blendshape work. |
| levelbuilder_source_files.zip, Gamejam_starterkit2.zip, HE_starterkit_unreal.zip, HE_Starter_Kit_Unity.zip, GameJamStarterKit-UnrealEngine5.zip | Level builder and starter kit packages. |
| dungeon_props.zip, bar_scene_proxy.zip, pirate_content.zip, SKYLARK_UE.zip, GROT_UE.zip, EPC_01.zip, Elderwood_Unreal_Project_Files.zip, gamesworkshop_artist_track2.zip | Scene and project packages. |
| Pyro_Smoke_Tutorial.zip, RoadNetworks.zip, Texture_Synthesis.zip, titan_stacking_tool_project_files.zip, solaris_demo_files2.zip, public_sidefx_buildinggenerator_01.hip.zip, Tutorial_Building_Generator.zip, H21SplashScreen.zip, Intro To Procedural Modeling Houdini Fundamentals Course Week1.zip, projectfiles.rar | Archives of folders above, a Houdini 21 splash screen, a fundamentals course week. |

### 3.5 Packages, COPs and large project folders

| Item | What it looks like |
|---|---|
| Houdini-resources/packages: AGJSandbox.json, BVCDemos.json, BVCSandbox.json, ProjectDawnPrototype.json, ProjectDawnSandbox.json; HoudiniPackagesBase.json | Houdini package files for other projects, including two ProjectDawn ones. Not read. |
| COPs: COPS_Colorful_Plate, COPS_Hanging_Towel, COPS_Metal_Vase, COPS_Woven_Basket zips, COPs Mega File (zip + video) | Copernicus material and texture setups for four props. |
| Texture_Synthesis (225 files) | Saved COP network named `COPs_Intro`. |
| Elderwood - Unreal Project Files (ElderwoodOverlook.uproject), GROT_UE, loopableLiquid, EPC_colosseum, Polar_Camera_files_nocache | Full UE projects: an overlook environment, a GROT project, liquid loops, a colosseum, a polar camera setup. |
| UI_GameInputs_TextureOnly_Universal_Version | UI input glyph PNG and SVG pack. |
| Erik (FBX + base color + normal) | One character mesh. |

## 4. Animation, VFX and courses

- **Universal Animation Library 2 [Standard]**: one zip, two preview images. Not opened. Path `Universal Animation Library 2[Standard]`.
- **animation-mocap** (`_houdini\animation-mocap`): 18 mocap pack zips (Action Adventure, Creature, Female Locomotion, Free Test, Gestures Basic, Great Sword, Lite Sword and Shield, Locomotion, Longbow Aiming, Longbow Locomotion, Male Locomotion, Not So Scary Zombie, Pro Longbow, Pro Magic, Pro Melee Axe, Pro Rifle, Pro Sword and Shield, Sword and Shield) and 11 loose run, turn and pick-up FBX clips.
- **Character and rig samples** (`_houdini`): Erik (FBX with textures), Sofia_Rig, Harry_content, electra_rig_example, lucha_and_chicken, RigBuilder_tutorialFiles.zip, three KineFX hips.
- **VFX-Apprentice**: VFX Apprentice course files. Levels: 01 Hand-Drawn 2D FX Level 1 (zips, PDFs), 02 Hand-Drawn 2D FX Level 2 (Toon Boom drawings), 03 Hand-Crafted 3D VFX Level 1 (Unity and Niagara block-in, Krita, Substance Designer intro), 04 Level 2 (Unreal sandbox, exported textures and meshes), 05 Apprenticeship Level 3 (Tradigital_FX), plus Free Download Files (Unity and Niagara foundations, 2D FX playbook, pixel-art mascot, wallpapers, colouring book).
- **VFX_RTFX**: real-time FX element library. 55 frame-sequence folders (Energy 41 to 78, Snow, Sparks, Smoke, Electricity, Blizzard, Flash, BG Grunge, BG Concrete, BG Dirt, BG Paper) and a `previews` folder with about 1,800 clips and stills. The preview names include Energy, Fire, Sparks, Liquid, Smoke, Lines, Matte, Transition, SFX Interface, SFX Glitch, SFX Explosion, SFX Hit, Logo and Title.
- **Gumroad - Environment Art Mastery by Thiago Kafke**: environment art course, extras only. Maya and Unreal tool sets, Photoshop normal tools, Substance PBR templates, module 21 link list on optimization.
- **MBA01_ProjectFiles** (`_houdini`): sci-fi magic blast VFX course, 8 chapter scenes plus renders.
- **cmiVFX Procedural Lake House Building Creation**: three-volume Houdini building course with OBJ models and scenes.
- **Houdini Procedural Lake Houses Volume 1**: first volume of the same course as separate project files.
- **Houdini Hive GDC 2023**: three workflow example scenes (rocks to Unreal, ZBrush to Painter, cliff).
- **Tech Track** (`_houdini`): SideFX workshop files for Unity and Houdini Engine.
- **houdini-indie-pixels-tutorials**: Indie Pixel race-track tool series.
- **Rebelway CHOPs demo, gamesworkshop_artist_track2.zip, Intro To Procedural Modeling Houdini Fundamentals Week1**: single lessons or course weeks.
- **Substance tutorials** (`_substance`, `substance-designer`): JM-Breakdown-Handpaint (PDF plus graph), Overwatch Material Studies, arcane-wall-tutorial, SDNodes Vol 1 (readme PDF), SubstanceDesignerWorkshop-TylerOliver, Easy cliffs with non-uniform directional warp (zip and a video), Lynn Chen brush set (PDF, .abr).

## 5. Good fits

These picks use names only. Nothing was previewed. A dagger (†) marks a `.sbsar` with no `.sbs`, so it can only be wrapped. Names from Substance Source and Database 2.0 GameTextures carry no dagger because every file there is `.sbsar` only. Other unmarked names have a `.sbs`.

### ProjectDawn: top-down stylized fantasy, hand-painted Provencal look

Rocks and cliffs

- Substance Source: stylized_blocky_stone_cliff, stylized_coast_cliff_rock_overgrown, stylized_island_cliff, stylized_layered_cliff_rock, stylized_mossy_island_cliff, stylized_pirate_island_cliff, stylized_stone_cliff_with_sand, stylized_dirty_rock, stylized_dirty_rock_with_sand, stylized_eroded_stone, stylized_barnacle_covered_rock, stylized_sandy_rock_shore, stylized_rocky_desert_ground, stylized_rockery_ground, stylized_medium_pebbles_ground, stylized_twelve_angled_stones. Also cracked_layered_cliff, desert_cliff_eroded, stepped_rock.
- Database 2.1 Procedural: Cartoon_Stones.
- `_substance`: JRO_StylizedRocks, Red_Rock, rockheight, stone_carver_01, Rocks and ShiftRocks (Substance2017LibraryLite). Archive: AnimeRocks.rar, Procedural_Anime_Rock_Material.zip, Easy cliffs zip.
- Substance-Texture-Pack: Stylised_Rocks†, Earthshatter†.
- Material Collection V1: Rock, Desert_Rock, Porous_Rock, Jungle_Rock_face.

Cobblestone and paving

- Substance Source: stylized_cobblestone_pavement, stylized_seaside_cobblestone_path, brick_stylized_cobblestones, stone_pavement_mossy_stylized, stylized_diamond_stone_pavement, stylized_square_crystal_stone_pavement, stylized_random_ashlar_floor, stylized_rockery_floor.
- GameTextures: stone_cartoony_flat_brick_cobblestone.
- Others: brick_cobblestone_wavy, eroded_cobblestone_pathway, old_cobblestone_pavement_01, brown_and_grey_cobblestone_ground, floor_medieval_pavement.
- Database 2.1 Procedural: Cartoon_Tile_01 to 04.
- substance-designer: Cobblestone_cjw_02.

Stone walls and masonry

- Substance Source: stylized_dirty_square_stone_wall, stylized_old_brick_wall, stylized_sea_house_stone_wall, stylized_inca_temple_wall, stylized_dirty_brick_chimney.
- GameTextures: stone_cartoony_stone_bricks.
- Hand-painted sources: 3dex_stylized_medieval_wall, Brk_HandPaint_Wall_01A, Medieval_Stone_Wall (Material Collection V1), arcane_wall_tutorial, Overwatch Material Studies.
- Medieval brick names: brick_medieval_chipped, brick_medieval_dark_brown_grout, brick_medieval_oval, brick_large_castle_wall, brick_castle_bumpy, brick_mossy_castle, brick_bonus_castle_wall, medieval_rounded_stone_bricks.

Provencal accents: roofs, plaster, wood, planting

- Roofs and terracotta: stylized_spanish_terracotta_roof_tiles, stylized_flat_terracotta_roof_tiles, stylized_fish_scale_terracotta_roof_tiles, stylized_norfolk_terracotta_roof_tiles, stylized_sea_house_terracotta_roof, stylized_terracotta, stylized_old_terracotta, stylized_moroccan_terracotta_tiles. Terracotta_Tiles (Material Collection V1).
- Plaster: stylized_spanish_plaster, stylized_plaster_wall_wooden_beam, stylized_plaster_reinforced_wall.
- Wood: stylized_wood_planks, stylized_wood_beam, stylized_wood_barrier, stylized_wood_siding_panel, stylized_pier_wood_planks.
- Ground and planting: stylized_lawn_grass, stylized_wild_grass, stylized_long_field_grass, stylized_small_field_grass, stylized_long_tuft_of_grass, stylized_hay_ground, stylized_muddy_soil, stylized_gaziana_flower, stylized_harvest_bells_flower, stylized_small_leaves_shrub_plant. Forest_Floor (Material Collection V1). Grass (Adam Capone Stylized).

Substance tools for Dawn: Adam Capone Stylized (Concrete, Grass, Metal, Wood graphs), JM-Breakdown hand-paint breakdown, DeteDirectionalWarp†, MultiDirectionalWarpGrayscale, nondirectional_warp, SDNodes height level mask and curvature, EdgeVariation and PushEdges, 1MAFX Noise Pack. Restyle path: `texture-pipeline` skill.

Houdini tools for Dawn

- Cliffs and rocks: AL tools - CliffBundle - v6.1.zip, Elderwood_Cliffs.hip, Houdini Hive Example01_RocksToUnreal and Example03_Cliff, Procedural_Cliffs_QTutorial.hip, ip_rock_generator, HE/GameJam Rock.hda, ip_moutain_stamps, ip_stamp_exporter.
- Terrain and biome: HE_Terrain_Tool, ip_terrain_creator, IndiePixel_HoudiniTerrain_001, Desert_Terrain, TERRACE_2.0.zip, heightfieldtexturing.zip, DryadBiomeInitializeDemo, biome_demo8.zip.
- Vegetation: HE/GameJam Tree and Foliage_maker, ip_evergreen_tree_creator, ip_unreal_scatter_trees, Lucen Grass Breakdown.zip, Tutorial_Ivy and Ivy_generator.
- Buildings and walls: the Caelus set (walls, roofs, dormers, chimneys, towers, windows, wall textures), HE/GameJam walls_tool and TrimT_Tool, Floor_maker, Balk, Stairs, Fence, Lake House scenes, Level_Builder_Tutorial_File.
- Props and placement: Tutorial_fence, ip_perimeter_fence, ip_generic_placement_tool, HE/GameJam Placement_tool and Edge_Damage, aw_bridge_generator, cgcBridge, skylark_wooden_bridge_tutorial, dungeon_props, Freek Hoekstra dungeon scenes.
- Packages: `Houdini-resources\packages\ProjectDawnPrototype.json` and `ProjectDawnSandbox.json` already exist. Read them before building anything new.
- Reference: Elderwood Overlook UE project.

### ProjectRunner: side-on cyberpunk, HD-2D (high-res textures, pixelated at the end)

Pixelation

- `_substance\Pixel8r`: Pixel8r_2.01†, Pixel8r_2.5†, Pixel8r_2.72†, and the Boombox example (Painter projects, LUT PNG, final TGAs). The `texture-pipeline` skill applies Pixel8r, so these are the versions to keep.
- Bruno_Pixel_Stroke. `pixelrender_test001.hdalc` in `_houdini`. Free Download Files in VFX-Apprentice has `Mascot_Pixelart`.

Sci-fi and tech

- Sci-fi/Tech bucket: sci_fi_001 to sci_fi_007, Sci_Fi_Tile_01, scifi_brushed_metal, scifi_expandable_plate_panel, scifi_interlocking_slider_panels, scifi_metal_foil_retaining_mesh, scifi_straight_floor_panel, tile_scifi_metal_pattern, metal_futuristic_grid, metal_aluminum_space_station, space_station_cargo_rack, Printed_Circuit, carbon_fiber, carbon_fiber_plain_weave, Shields, Space_Ship, JRO_SciFi_Hull, sci-fi_rock, Impact_01.

Industrial metal and grime

- Metal: dirty_industrial_steel, metal_corrugated, metal_corrugated_002, metal_corrugated_steel_worn_paint, old_corrugated_freight_elevator_door, painted_corrugated_metal_advanced, Corrugated_Metal, Corrugated_Tin_Plates, Diamond_Plate, metal_diamond_plates_advanced, metal_diamond_traction_plates, metal_expanded_steel_traction_plates, metal_steel_floor_grating, metal_riveted_plates, metal_bolted_plates, metal_air_duct, Galvanized_Metal, steel_galvanized, metal_rust_001 to 003, metal_painted_rust, Rusty_Metal, rusty_metal_burrs, metal_trashed_steel, sewer_plate_001 to 004_bitmap, grid_perforated, Metal_planes, Metal_roof, Barbwire, Fencing.
- Cables and pipes: misc_metal_cable, metal_chainmail. The stylized versions are stylized_electric_wire and stylized_iron_steam_pipe.

Streets and walls

- Asphalt and road: asphalt_001 to 004_bitmap, Asphalt_02, clean_asphalt_patch, road_001, Road_01 to 03, road_tarmac_001, Road_Tarmac_01, damaged_pedestrian_road_marking, ground_gravel_asphalt.
- Concrete: concrete_traffic_barrier, concrete_sidewalk, heavy_cracked_concrete_sidewalk_01, concrete_bolted_panels, concrete_vertical_bunker, dirty_concrete_block_facade, dirty_concrete_wall_001_bitmap, concrete_wall_001_bitmap, plus the 400+ concrete and plaster files in Database 2.1.
- Tiles: tile_dirty_square_subway, tile_disgusting_subway_tiles, tile_small_tiles_dirty, rubber_and_plastic_laboratory_floor, tile_grocery_store_linoleum.
- Surface marks: spray_paint_tag, Glass_Building_01, Broken_Glass, Windscreen_Glass_01 and 02, Frosted_Glass, wet_off_road_tire_s_tread.
- Masks and wetness: JRO_Wetness_mask, JRO_Height_Level_Mask, JRO_Curvature Adv, JRO_Direction_Mask, JRO_Multi_blend, HeightPreview†, Bruno_Cracks_Generator, Bruno_Caustics_Generator, vfx_patterns_01, GrungeMap_001 to 015, grunge_001.

Substance helpers: SMM_* SoMuchMaterials shelf, TK_PBR_Templates (Gumroad), Texel_checker†, 1MAFX Noise Pack.

Houdini tools for Runner

- Cyberpunk: Radu Cius Procedural_Escalator_V1.hdalc and its RBD-to-FBX exporter, scifi_door, scifi_panels, scifi_stairs and scifi_terminal source zips, TUT_ad_boards.hda, spaceshipPartMaker and SideFX__spaceship (Tech Track).
- City and buildings: city_builder_DEMO and City_Builder_Box, Building_Generator, PUBLIC_SideFX_BuildingGenerator_01, Tutorial_Building_Generator, Building_Tool, RoadNetworks, Oscar_highway_generator.
- Detail: Cable Tool and Hanging_Cables, Pipe_tool, Floor_maker, Stairs, Procedural Lamp (Lamp.hiplc with Painter materials), HE/GameJam Psd_Level (level from a PSD, suits a side-on layout).
- Texture work: Houdini Texel Density Tool, COPs set (Copernicus), Texture_Synthesis, vertex animation texture scenes.
- UI: UI_GameInputs glyph pack (keyboard, mouse, four gamepad sets).

Animation and VFX for Runner: Universal Animation Library 2, the locomotion, gesture and rifle packs in `animation-mocap`, VFX_RTFX Energy, Electricity, Sparks, Smoke and the SFX Interface, Glitch, Hit and Explosion previews, VFX-Apprentice hand-drawn 2D FX and Unreal Niagara sandbox.
