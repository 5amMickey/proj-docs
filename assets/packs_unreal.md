# Unreal asset packs and project content

Generated 2026-10-08 from file and folder names only. Nothing in the source folders was changed. Counts for packs that are not downloaded come from the Fab manifest file lists.

## Summary

- 61 packs are cached in `C:\ProgramData\Epic\EpicGamesLauncher\VaultCache`: 60 Fab packs and Epic's Game Animation Sample.
- 25 more Fab library entries have no Unreal data in the cache. They are in the second table.
- Categories in the cache: Animation 10, Environment kit 37, Megascans sample 3, Props 3, Template/sample project 2, Tools/plugin 2, VFX 4.
- Only 3 packs were imported into a project: Game Animation Sample (ProjectRunner and Sandbox), Stylized Fantasy Provencal (ProjectDawn), Combat Fury (ProjectFury). ProjectAlpha has none.
- Every pack matched a Fab title. Style is "unknown" or "not stated" where the title and Fab text do not say.
- Scifi Kitbash Level Builder is not extracted. Its data folder is empty and only a 629 MB stage folder exists.

## How to read the tables

- Counts: SM static meshes, SK skeletal meshes (SK_ and SKM_), T textures (T_ and TX_), M materials (M_ and MM_), MI material instances, NS/P Niagara and Cascade systems, anim animation assets (A_, AS_, AM_, MM_, BS_, AO_ and anything in an Animation folder), BP blueprints (BP_, ABP_, WBP_), audio sound assets, maps (.umap). Assets are classified by name, so counts are close but not exact. Material functions (MF_) and unprefixed assets are not shown.
- World Partition actor files (`__ExternalActors__`) are one small file per placed actor. They are not assets. They are listed only when there are more than 20.
- UE is the engine version in the Fab manifest, which is the newest version the pack was built for. Older packs may open in earlier versions. Where a pack ships a `.uproject`, its EngineAssociation can be lower (Combat Fury 5.7, Dark Ruins 5.5).
- Size is the extracted `data` folder.
- Folder is the VaultCache folder. Pack content lives in `data\Content\<PackFolder>`.

## Packs in VaultCache (sorted by category, then name)

| Pack (Fab title) | Category | Style | What's in it | Counts | Size | UE | Imported into | Folder |
|---|---|---|---|---|---|---|---|---|
| Bossy Enemy Animation Pack | Animation | fantasy, souls-like | Boss enemy animations (attacks, stagger and more). UE4 mannequin assets included. | 5 SK, 9 T, 6 M, 37 anim, 1 map | 34 MB | 4.21 | none | `BossyEne17b53f7123f6V2` |
| Combat Magic Animations | Animation | fantasy | Spell casting, levitating and chanting animations with a demo map. | 3 SK, 14 T, 4 MI, 88 anim, 1 BP, 1 map | 0.2 GB | 5.8 | none | `CombatMa30df35934c5fV1` |
| Guitarist \| Animations | Animation | n/a (music) | Guitar performance animations plus guitar, stand and mic props. | 20 SM, 8 SK, 153 T, 5 M, 79 MI, 118 anim, 1 map | 1.8 GB | 5.7 | none | `TheGuita4ecff7369d19V1` |
| MoCap Online Free Animation Pack | Animation | realistic mocap | Free mocap set (walk, conversation and more) with FBX, Maya and MotionBuilder sources and A/T pose mannequins. | 3 SK, 9 T, 2 M, 38 anim, 1 map, 41 FBX, 4 image files | 0.1 GB | 4.23 | none | `MCOMocapfb837d928a3eV1` |
| Morbid Motions \| Animations and Poses | Animation | dark (from title) | Two volumes of animations and poses on the mannequin; Manny and Quinn skeletal meshes. | 8 SK, 37 T, 3 M, 4 MI, 221 anim, 2 BP, 3 maps | 0.7 GB | 5.6 | none | `Morbidmo348ec2641abaV1` |
| Rolls and Dodges Animation Set | Animation | n/a (UE4 mannequin) | 18 hand-keyed roll and dodge animations, in place and root motion; FBX sources. | 2 SK, 8 T, 2 M, 36 anim, 1 map, 36 FBX | 47 MB | 4.18 | none | `Rollsand7cdbc5c39a9fV3` |
| Strike A Pose - Animation Pack | Animation | n/a (UE4 mannequin) | 14 idle poses with 600+ animations: transitions, walk, gestures, plus animation blueprints. | 2 SK, 4 T, 962 anim, 17 BP, 2 maps | 0.2 GB | 4.21 | none | `StrikeAPd51198e79d74V2` |
| Swim \| Animations | Animation | n/a | Hand-keyed swimming set: in place and root motion, transitions, additives, props. | 7 SM, 10 SK, 39 T, 5 MI, 845 anim, 4 BP, 1 map | 0.8 GB | 5.9 | none | `Swimming504f5e11d2bfV4` |
| Trumpet & Sax \| Animations | Animation | n/a (music) | Sax (9) and trumpet (7 each) animations for UE5 and UE4 skeletons. | 5 SM, 8 SK, 94 T, 5 M, 41 MI, 46 anim, 1 map | 0.9 GB | 5.7 | none | `TheSaxTr5a8d23b47dd4V1` |
| Zombie Movement and Modular Interaction Animations | Animation | horror | 34 zombie animations: movement, taunts, crawl, hops, interactions. | 1 SM, 1 SK, 9 T, 2 MI, 48 anim, 3 BP, 1 map | 37 MB | 4.23 | none | `ZombieAnc4dbb87c3f71V1` |
| Abandoned Sea Platform - Post-Apocalyptic Offshore Environment Pack | Environment kit | post-apocalyptic | Offshore sea platform with 145 meshes, a preassembled map, water and a simple player. | 145 SM, 3 SK, 314 T, 23 M, 108 MI, 11 anim, 2 BP, 12 audio, 6 maps | 2.1 GB | 5.8 | none | `Abandone48723a43879eV3` |
| Big Slum Alley | Environment kit | cyberpunk, realistic | Neon-lit slum alley with a showcase map. | 228 SM, 104 T, 16 M, 47 MI, 4 NS/P, 6 BP, 2 maps | 3.1 GB | 5.9 | none | `Realisti74d00098ac74V1` |
| Buildings VOL.11 - Modular Offices (Low Poly) | Environment kit | low poly, modern | Modular office pieces: drop ceilings, office modules, catwalks. Also holds a VOL7 subfolder. | 112 SM, 52 T, 7 M, 15 MI, 4 maps | 0.5 GB | 5.4 | none | `Building8626b816566aV1` |
| CCA Subway Train Terminal | Environment kit | realistic | Subway train terminal with 2K textures and a master material (per Fab text), demo map. | 98 SM, 161 T, 8 M, 86 MI, 9 BP, 2 maps | 1.1 GB | 5.2 | none | `CCASubwa44868f8f5190V1` |
| Cyber-Town Pack | Environment kit | cyberpunk | Cyberpunk town environment with blueprints, master material and 4 maps. | 152 SM, 258 T, 27 M, 85 MI, 3 NS/P, 29 BP, 4 maps | 1.6 GB | 5.6 | none | `CyberTowf9bb40409813V4` |
| Cyberpunk City (Cyberpunk, Cyberpunk City, Sci-Fi City) | Environment kit | cyberpunk, sci-fi | City street kit: shops, billboards, boats, paper clutter, foliage, cinematics, 2 maps. | 276 SM, 234 T, 66 M, 100 MI, 13 NS/P, 17 BP, 2 maps, 1879 World Partition actor files | 1.6 GB | 5.4 | none | `Cyberpuna23b60dc3dcaV1` |
| Downtown Alley | Environment kit | modern urban (style not stated) | Alley kit: 30+ modular building pieces, 100+ props, showcase map with 3 lighting setups. | 187 SM, 87 T, 13 M, 65 MI, 2 NS/P, 5 BP, 4 maps | 1.6 GB | 5.6 | none | `Downtown70bcb86da481V2` |
| Dreamscape: Stylized Environment Tower - Stylized Nature Open World Fantasy | Environment kit | stylized fantasy | Stylized fantasy tower and nature kit with shared resources and particles. | 201 SM, 319 T, 70 M, 95 MI, 20 NS/P, 8 BP, 3 maps | 1.7 GB | 5.8 | none | `Dreamsca5d47ad51b755V3` |
| Echo Prime Living Quarters (Low Poly) | Environment kit | sci-fi, low poly | Sci-fi living quarters with 2K textures and a master material (per Fab text), 2 maps. | 99 SM, 122 T, 16 M, 84 MI, 2 NS/P, 2 maps | 1.2 GB | 5.7 | none | `EchoPrim9ded151d3e2cV1` |
| European Village - French Village - Modern Village | Environment kit | unknown (European village) | Village buildings, windows, balustrades, foliage and props; main and props maps. | 38 SM, 88 T, 6 M, 33 MI, 2 maps | 2.3 GB | 5.3 | none | `European7848079e356aV1` |
| House On A Hill (House, Houses, Fantasy House, Stylized House) | Environment kit | stylized fantasy | House on a hill (code name Feather): geometry, materials, cinematics, 5 maps. | 67 SM, 4 SK, 206 T, 86 M, 48 MI, 6 NS/P, 9 anim, 1 BP, 24 audio, 5 maps | 1.7 GB | 5.9 | none | `HouseOnA1eccd9aedfedV3` |
| Industrial Factory (Factory, Warehouse, Industrial Factory, Modular Factory) | Environment kit | industrial (style not stated) | Modular factory with a PCG setup and 59 maps. | 350 SM, 202 T, 34 M, 144 MI, 2 NS/P, 46 BP, 59 maps, 3245 World Partition actor files | 3.7 GB | 5.8 | none | `ModularF1060bd866ab4V1` |
| Industrial Infrastructure | Environment kit | realistic, industrial | Industrial parts only (no environment): wall panels, columns, catwalks, beams. | 152 SM, 93 T, 8 M, 38 MI, 1 BP, 1 map | 4.1 GB | 5.9 | none | `Industrid6d94fb71540V1` |
| Industrial VOL.1 - Worksite (Nanite and Low Poly) | Environment kit | low poly, industrial | Worksite props: oil drums, road stands, cages, concrete bricks, metal scraps. | 191 SM, 153 T, 3 M, 50 MI, 2 maps | 3.4 GB | 5.4 | none | `Industri355a6784a733V1` |
| Medieval Kingdom (Medieval Castle, Medieval Town, Modular Castle, Castle) | Environment kit | medieval | Modular castle and town with scanned foliage, cinematics and 43 maps. | 582 SM, 11 SK, 493 T, 140 M, 196 MI, 15 NS/P, 11 anim, 59 BP, 43 maps, 8875 World Partition actor files | 8.3 GB | 5.8 | none | `ModularM43deebcc3fd4V1` |
| Military Base Megapack (Modular Military Base, Military Facility, Outpost, Army) | Environment kit | military (style not stated) | Modular military base kit with blueprints and 24 maps. | 301 SM, 8 SK, 430 T, 37 M, 145 MI, 11 anim, 21 BP, 24 maps, 16664 World Partition actor files | 8.7 GB | 5.8 | none | `Military047fcd641de6V1` |
| Modular Container Houses - Survival Base Pack | Environment kit | survival (style not stated) | Container house modules: wood and metal walls, doors, roofs, windows. | 79 SM, 57 T, 1 M, 27 MI, 2 maps, 757 World Partition actor files | 1.0 GB | 5.6 | none | `ModularCb2dd3983775cV1` |
| Modular Hospital (Abandoned Hospital, Horror Hospital, Modular Hospital, Asylum) | Environment kit | horror | Modular abandoned hospital: props, decals, particles, 3 maps. | 75 SM, 114 T, 58 M, 1 NS/P, 1 BP, 3 maps, 2 FBX | 1.7 GB | 5.8 | none | `ModularHfe325a221461V1` |
| Modular Sci-Fi Factory | Environment kit | sci-fi, industrial | Modular factory: corridors, labs, pipes, doors and 17 maps. | 118 SM, 14 SK, 55 T, 11 M, 62 MI, 2 NS/P, 15 BP, 17 maps | 0.7 GB | 5.7 | none | `TheBigScb7622a15bc02V1` |
| Modular Sci-Fi Treatment Station Environment | Environment kit | sci-fi | Modular treatment station with blueprints and a demo map. | 90 SM, 175 T, 29 M, 37 MI, 4 BP, 2 maps | 1.5 GB | 5.4 | none | `Treatmena36f25b3aa5aV1` |
| Modular Sewers & Tunnels (Modular Sewers, Modular Tunnels, Modular Corridor) | Environment kit | unknown (sewers) | Modular sewer and tunnel pieces, decals, particles, scanned foliage, 5 maps. | 120 SM, 5 SK, 191 T, 24 M, 59 MI, 1 NS/P, 9 anim, 13 BP, 5 maps, 46 World Partition actor files | 3.4 GB | 5.6 | none | `ModularSb35746afa6c6V1` |
| Modular Stylized Medieval Town | Environment kit | stylized medieval | Modular medieval town: landscape layers, sequencer, 3 maps. | 81 SM, 118 T, 28 M, 53 MI, 2 NS/P, 6 BP, 3 maps | 0.3 GB | 5.2 | none | `ModularScdd835f86695V1` |
| Modular Urban City Asset Megapack | Environment kit | modern urban (style not stated) | City megapack: train station, skyscrapers, signs, walls, trees, audio. 399+ meshes. | 399 SM, 363 T, 11 M, 157 MI, 1 NS/P, 11 BP, 10 audio, 5 maps | 4.9 GB | 4.21 | none | `ModularUe6c707abad9fV1` |
| Neon Point - Chinese Streets Environment | Environment kit | neon, realistic | Chinese street kit with a full scene, 4K textures and a master material (per Fab text). | 616 SM, 755 T, 38 M, 251 MI, 1 BP, 2 maps | 12.7 GB | 5.8 | none | `NeonPoin6ed8d57290e2V1` |
| Polar Facility \| Modular Sci-Fi Environment Kit | Environment kit | sci-fi | Modular polar sci-fi facility with particles, sequences, 6 maps. | 56 SM, 66 T, 122 M, 26 NS/P, 6 maps | 0.9 GB | 5.7 | none | `PolarSci1da045dbf3a7V2` |
| Ready Map Vol 2 - Bridge Environment / Nature | Environment kit | unknown (folder is named StylizedBridge; Fab category is post-apocalyptic) | Bridges with road props, vegetation, landscape material and a full map. | 470 SM, 184 T, 21 M, 83 MI, 125 BP, 3 maps | 1.2 GB | 5.9 | none | `BridgeEn0e6101f6c918V1` |
| Roman Volcanic Temple (Ancient Medieval Village Greek Buildings City Street) | Environment kit | ancient / historical | Roman volcanic temple village: 178 meshes, cinematic, particles, 2 maps. | 182 SM, 175 T, 17 M, 60 MI, 5 NS/P, 12 BP, 2 maps | 1.6 GB | 5.4 | none | `RomanVolfcae816ae732V1` |
| Scifi Kitbash Level Builder | Environment kit | sci-fi | Sci-fi kitbash pieces (UE 4.16). Not extracted: the data folder is empty and only a 629 MB stage folder exists. Counts come from the manifest. | 116 SM, 200 T, 16 M, 55 MI, 2 maps (from manifest) | not extracted (stage 629 MB) | 4.16 | none | `ScifiKitbash415` |
| Soul: City | Environment kit | cyberpunk (Fab category); optimized for mobile | Epic 2014 Soul demo props, materials, textures and effects, with landscape and footstep sounds. | 419 SM, 201 T, 119 M, 115 MI, 26 NS/P, 4 BP, 56 audio, 4 maps | 1.7 GB | 4.18 | none | `SoulCity419` |
| Stylescape: Ruins | Environment kit | stylized | Modular stylized ruins kit on a 10 cm grid. | 209 SM, 30 T, 7 M, 28 MI, 8 BP, 2 maps | 0.4 GB | 5.2 | none | `Stylescae9d19961b223V8` |
| Stylized Cavern Mahal | Environment kit | stylized fantasy | Cavern temple with VFX, sequencer and 9 maps. | 117 SM, 146 T, 13 M, 77 MI, 9 BP, 9 maps, 323 World Partition actor files | 3.1 GB | 5.4 | none | `Stylizede8ef1dee2297V1` |
| Stylized Fantasy Provencal | Environment kit | stylized fantasy | Provencal village kit with blueprints, landscape material and particles. | 131 SM, 109 T, 18 M, 60 MI, 2 NS/P, 9 BP, 2 maps | 0.3 GB | 4.23 | ProjectDawn (whole pack, as Content/StylizedProvencal) | `Stylizedf0f978cdc783V1` |
| Stylized Floating Slums | Environment kit | stylized fantasy | Floating slum city with 2 maps. FBX and PNG sources are included. | 109 SM, 102 T, 10 M, 42 MI, 19 BP, 2 maps, 100 FBX, 82 image files, 121 World Partition actor files | 1.6 GB | 5.4 | none | `Stylizedd6c883a675d8V1` |
| Stylized Lost Ruins | Environment kit | stylized fantasy, low poly | Lost ruins environment with FX and 2 maps. | 102 SM, 160 T, 16 M, 90 MI, 2 NS/P, 5 BP, 2 maps | 0.7 GB | 5.4 | none | `Stylizedd6bd67e26a5eV1` |
| Tokyo Stylized Environment | Environment kit | stylized city | Modular stylized Tokyo street, maglev pieces, Lumen scene, 3 maps. | 150 SM, 8 SK, 100 T, 26 M, 129 MI, 11 anim, 6 BP, 3 audio, 3 maps, 47 World Partition actor files | 0.6 GB | 5.4 | none | `TokyoStyc229650e47ffV1` |
| Warehouse | Environment kit | realistic detail (per Fab text) | Warehouse kit: shelves, pallets, crates, cabinets, 13 maps. | 89 SM, 247 T, 16 M, 112 MI, 14 BP, 13 maps, 100 World Partition actor files | 7.2 GB | 5.6 | none | `Warehous7e371bf75594V1` |
| Warehouse Environment | Environment kit | realistic, UE5 (Nanite/Lumen) | Modular warehouse with lighting scenes and 10 maps. | 174 SM, 201 T, 9 M, 99 MI, 21 BP, 10 maps | 3.0 GB | 5.4 | none | `Warehousbd3699b9bc5bV1` |
| Dark Ruins Megascans Sample | Megascans sample | realistic (scanned), dungeon | Quixel sample project: dungeon ruins with bells, brass plates, candles, corridors, MS presets. 79 maps. | 317 SM, 5 SK, 687 T, 40 M, 377 MI, 1 NS/P, 9 anim, 56 BP, 79 maps, 12018 World Partition actor files | 27.3 GB | 5.7 | none | `DarkRuinac4b642bf8b9V1` |
| Derelict Corridor Megascans Sample | Megascans sample | realistic (scanned), abandoned | Quixel sample project: abandoned corridor, data layers, sequences. 38 maps. | 241 SM, 313 T, 11 M, 240 MI, 38 maps, 4948 World Partition actor files | 5.0 GB | 5.7 | none | `Derelict31b645c4b988V1` |
| Military Trench Megascans Sample | Megascans sample | realistic (scanned), military | Quixel sample project: trench line with logs, sandbags, planks, barbed wire. 20 maps. | 179 SM, 498 T, 22 M, 186 MI, 3 NS/P, 15 BP, 20 maps, 3 FBX, 1035 World Partition actor files | 11.3 GB | 5.8 | none | `Military10a1d3c8554fV1` |
| Buildings VOL.2 - Electric & Air (Nanite and Low Poly) | Props | low poly, modern | Air conditioners, vents and machine houses. Nanite meshes. | 105 SM, 176 T, 3 M, 53 MI, 2 maps | 3.6 GB | 5.4 | none | `Building9cf4ac2b518fV1` |
| Free sample Warehouse & Storage - Vol 01 | Props | unknown | Free sample from a larger pack: 3 meshes (bench and two composed prop sets). | 3 SM, 21 T, 7 M, 7 MI, 1 map | 0.6 GB | 5.9 | none | `Untitled6b5a634a08e2V1` |
| Hospital Props VOL.4 - Medical Machines | Props | realistic | Medical machine props with materials and 2 maps. | 60 SM, 87 T, 4 M, 25 MI, 1 BP, 2 maps | 0.3 GB | 4.18 | none | `ModernHo5cbc293115b3V1` |
| COMBAT FURY | Template/sample project | n/a (gameplay system) | Full combat system: parry, dodge, enemy AI, UEFN mannequin animation set, foley audio, demo room. A whole UE project. | 67 SM, 10 SK, 433 T, 235 M, 12 MI, 33 NS/P, 1185 anim, 95 BP, 319 audio, 1 map | 2.8 GB | 5.9 | ProjectFury (whole pack, as Content/CombatFury) | `COMBATFU96f3e61f4081V7` |
| Game Animation Sample (Epic, UE 5.8) | Template/sample project | n/a (Epic sample) | Epic motion matching sample: locomotion, mannequins, Paragon Echo, MetaHuman Kellan, audio, widgets, 5 maps. | 10 SM, 19 SK, 320 T, 157 M, 62 MI, 2367 anim, 65 BP, 312 audio, 5 maps | 7.5 GB | 5.8 | ProjectRunner, Sandbox (whole pack, same paths) | `GameAnimationSample_5.8` |
| Easy Combo Buffering | Tools/plugin | n/a (gameplay system) | Input buffering component for combos, weapon blueprints, demo room and montages. | 19 SM, 4 SK, 32 T, 35 M, 1 MI, 48 anim, 11 BP, 1 map | 76 MB | 5.6 | none | `EasyComb307869ca0969V2` |
| Footsteps Sounds with Blueprint Setup | Tools/plugin | n/a (audio) | Male and female footstep and jump grunt sounds per surface, with a character blueprint setup. | 2 SK, 4 T, 3 M, 8 anim, 192 audio, 1 map | 36 MB | 5.1 | none | `Footstep12a4ba92e5f5V3` |
| Advanced Magic FX 12 | VFX | fantasy | Magic spell effects with blueprints, a few meshes and a demo map. | 6 SM, 3 SK, 18 T, 18 M, 39 MI, 74 NS/P, 9 anim, 31 BP, 1 map | 0.1 GB | 5.5 | none | `Advanced78ce22a41175V2` |
| Realistic Gun VFX (Muzzle Flash, Bullet Impact, Ejections, Gun VFX, VFX) | VFX | realistic | Niagara muzzle flash, bullet impact and ejection effects, emitters, materials, demo. | 31 SM, 210 T, 25 M, 160 MI, 125 NS/P, 17 BP, 1 map | 0.9 GB | 5.6 | none | `Realisti6ed25c895692V1` |
| Smoke & Fog VFX (Smoke, Smoke VFX, Smoke Niagara, Dust, Fog) | VFX | n/a | Niagara smoke, dust and fog systems with textures and a demo map. | 129 T, 4 M, 51 MI, 43 NS/P, 1 anim, 1 BP, 1 map | 0.5 GB | 5.5 | none | `SmokeAndbb8d1fdd6904V1` |
| VFX Attack Trails | VFX | n/a | Weapon and attack trail effects: elemental, magic, speed trails. | 1 SM, 38 T, 47 M, 67 NS/P, 13 BP, 1 map | 0.1 GB | 5.1 | none | `VFXAttacd50aeadd792cV4` |

## Fab library entries with no Unreal data in VaultCache

These are owned in the Fab library but not downloaded as Unreal packs. The Unreal-format ones have a manifest only. The FBX ones (Megascans scans, animation packs, UEFN Mannequin) are cached as FBX plus textures.

| Pack (Fab title) | Category | Style | What's in it | Counts | Size | UE | Imported into | Folder |
|---|---|---|---|---|---|---|---|---|
| Death Animations - MoCap Pack | Animation | realistic mocap | 16 death animations as FBX with an animation list PDF. | 17 FBX | 32 MB (FBX cache) | n/a | none (FabLibrary only) | `FabLibrary\Death_Animations_-_MoCap_Pack-2b00697b` |
| Generic NPC Anim Pack | Animation | n/a | 69 generic NPC mocap animations as FBX. | 68 FBX | 63 MB (FBX cache) | n/a | none (FabLibrary only) | `FabLibrary\Generic_NPC_Anim_Pack-594b5d4e` |
| UEFN Mannequin (Epic) | Characters | n/a | Fortnite UEFN mannequin as one FBX. | 1 FBX | 3 MB (FBX cache) | n/a | none from this FBX; the UEFN mannequin in Runner and Sandbox comes from Game Animation Sample | `FabLibrary\UEFN_Mannequin-18699cc7` |
| Buildings VOL.8 - Commercial Doors (Nanite and Low Poly) | Environment kit | low poly, modern | Commercial door set, 125 meshes. | 125 SM, 149 T, 4 M, 38 MI, 2 maps (from manifest) | not downloaded | 5.4 | none (FabLibrary only) | `FabLibrary\Buildings_VOL_8_-_Commercial_Doors__Nanite___Low_Poly_-b44a1cdd` |
| Buildings VOL.9 - Modular Pipes & Gutters (Nanite and Low Poly) | Environment kit | low poly, modern | Modular pipes and gutters, 221 meshes. | 221 SM, 44 T, 3 M, 11 MI, 4 maps (from manifest) | not downloaded | 5.4 | none (FabLibrary only) | `FabLibrary\Buildings_VOL_9_-_Modular_Pipes___Gutters__Nanite___Low_Poly_-6e1b394a` |
| Bunker | Environment kit | unknown | Bunker kit with 99 meshes, UE 4.21. | 99 SM, 123 T, 45 M, 2 maps (from manifest) | not downloaded | 4.21 | none (FabLibrary only) | `FabLibrary\Bunker-8322737f` |
| City Subway Tunnel | Environment kit | unknown | Subway tunnel kit with a project file. | 125 SM, 198 T, 20 M, 69 MI, 2 NS/P, 7 BP, 2 maps (from manifest) | not downloaded | 5.5 | none (FabLibrary only) | `FabLibrary\City_Subway_Tunnel-248c759c` |
| Construction Site: Loader | Environment kit | unknown | Construction site with a loader (per title), 5 skeletal meshes, VFX and audio. App name is SCANSConstruction. | 71 SM, 5 SK, 188 T, 39 M, 73 MI, 22 NS/P, 9 anim, 16 BP, 11 audio, 6 maps (from manifest) | not downloaded | 5.4 | none (FabLibrary only) | `FabLibrary\Construction_Site__Loader-0446ac42` |
| Industrial Area Hangar | Environment kit | unknown | Hangar kit, UE 4.23. | 142 SM, 222 T, 65 M, 1 MI, 3 maps (from manifest) | not downloaded | 4.23 | none (FabLibrary only) | `FabLibrary\Industrial_Area_Hangar-843b02a2` |
| Modular Sci-Fi Indoor/Outdoor environment pack - Rocky Swampy Planet | Environment kit | sci-fi | Sci-fi indoor and outdoor modules, 320 meshes. | 320 SM, 182 T, 27 M, 77 MI, 2 BP, 3 maps, 83 FBX, 164 World Partition actor files (from manifest) | not downloaded | 5.4 | none (FabLibrary only) | `FabLibrary\Modular_Sci-Fi_Indoor_Outdoor_environment_pack_-_Rocky_Swampy_Planet-9190e4a3` |
| Safe House | Environment kit | unknown | Safe house kit, 484 meshes, UE 4.23. | 484 SM, 253 T, 17 M, 116 MI, 18 BP, 2 maps (from manifest) | not downloaded | 4.23 | none (FabLibrary only) | `FabLibrary\Safe_House-0c106ab4` |
| Science Laboratory | Environment kit | sci-fi / science (style not stated) | Science lab kit, 448 meshes. | 448 SM, 217 T, 10 M, 156 MI, 5 NS/P, 27 BP, 2 maps (from manifest) | not downloaded | 5.6 | none (FabLibrary only) | `FabLibrary\Science_Laboratory-b07022ea` |
| Spaceship Interior Environment Set | Environment kit | sci-fi | Spaceship interior, 104 meshes, UE 4.18. | 104 SM, 232 T, 13 M, 20 MI, 2 maps (from manifest) | not downloaded | 4.18 | none (FabLibrary only) | `FabLibrary\Spaceship_Interior_Environment_Set-e55bb035` |
| Storage House Set | Environment kit | unknown | Storage house kit, 408 meshes. | 408 SM, 191 T, 14 M, 184 MI, 2 maps (from manifest) | not downloaded | 5.7 | none (FabLibrary only) | `FabLibrary\Storage_House_Set-c20d8785` |
| Underground Subway | Environment kit | unknown | Subway kit, 157 meshes, UE 4.23. | 157 SM, 176 T, 28 M, 200 MI, 4 NS/P, 1 BP, 3 maps (from manifest) | not downloaded | 4.23 | none (FabLibrary only) | `FabLibrary\Underground_Subway-1d9b70ca` |
| Bazaar (Quixel Megascans) | Megascans sample | realistic (scanned), historical | FBX scan set: market stalls and props, 4K textures. | 86 FBX, 857 image files | 1.7 GB (FBX cache) | n/a | none (FabLibrary only) | `FabLibrary\Bazaar-ccde8d34` |
| Junkyard (Quixel Megascans) | Megascans sample | realistic (scanned), post-apocalyptic | FBX scan set: junk, tires, dumpsters, litter. | 82 FBX, 886 image files | 1.2 GB (FBX cache) | n/a | none (FabLibrary only) | `FabLibrary\Junkyard-a984aac1` |
| Old Mine (Quixel Megascans) | Megascans sample | realistic (scanned) | FBX scan set: rails, rocks, modular mine pieces. | 90 FBX, 559 image files | 0.9 GB (FBX cache) | n/a | none (FabLibrary only) | `FabLibrary\Old_Mine-dc4dc139` |
| Unfinished Building (Quixel Megascans) | Megascans sample | realistic (scanned), post-apocalyptic | FBX scan set: construction frames, concrete, rubble. | 38 FBX, 646 image files | 0.9 GB (FBX cache) | n/a | none (FabLibrary only) | `FabLibrary\Unfinished_Building-25f2e7e5` |
| Construction Site VOL. 1 - Supply and Material Props | Props | unknown | Construction supply and material props. | 73 SM, 103 T, 5 M, 32 MI, 20 BP, 2 maps (from manifest) | not downloaded | 5.3 | none (FabLibrary only) | `FabLibrary\Construction_Site_VOL__1_-_Supply_and_Material_Props-ba44a508` |
| Workshop Tools And Props Barrels Boxes Bundle vol.1 | Props | unknown | Workshop tools, barrels, boxes. App name is DefectProps. | 58 SM, 160 T, 2 M, 119 MI, 18 BP, 12 maps (from manifest) | not downloaded | 4.21 | none (FabLibrary only) | `FabLibrary\Workshop_Tools_And_Props_Barrels_Boxes_Bundle_vol_1-c15f79ec` |
| AnimGen Example | Template/sample project | n/a | Sample for the experimental AnimGen machine-learning animation plugin. Two controllers, 200 animations. | 24 SM, 2 SK, 14 T, 1 MI, 1 NS/P, 200 anim, 11 BP, 1 map (from manifest) | not downloaded | 5.8 | none (FabLibrary only) | `FabLibrary\AnimGen_Example-df37eb46` |
| City Sample | Template/sample project | realistic | City sample project: buildings, crowd, environment, props. Very large (149,286 manifest files). | 14199 SM, 95 SK, 4491 T, 1619 M, 6674 MI, 11 NS/P, 394 anim, 580 BP, 1488 audio, 439 maps, 22 image files, 114363 World Partition actor files (from manifest) | not downloaded | 5.8 | none (FabLibrary only) | `FabLibrary\City_Sample-4898e707` |
| Defender: Animated Dialogue System | Tools/plugin | n/a | Dialogue system: branching choices, typewriter text, events. Own project. | 18 SM, 8 SK, 143 T, 49 M, 18 MI, 3 NS/P, 9 anim, 38 BP, 116 audio, 2 maps (from manifest) | not downloaded | 5.8 | none (FabLibrary only) | `FabLibrary\Defender__Animated_Dialogue_System-a1d1d4a5` |
| Performance Capture Toolkit Plugin | Tools/plugin | n/a | Plugin content for performance capture, built for UE 5.8. 23 files. Seller not in the listing DB. | 1 T, 2 BP (from manifest) | not downloaded | 5.8 | none (FabLibrary only) | `FabLibrary\Performance_Capture_Toolkit_Plugin-c69db349` |

## Projects

Each project's Content paths were compared with every cached pack. A pack counts as imported when its files appear at the same paths. Shared Epic mannequin assets and Level Prototyping templates also appear in several packs and projects. They are not treated as imports.

### ProjectRunner (`C:\Prod\ProjectRunner\Unreal\Content`)

| Content folder | Files (.uasset/.umap) | Source |
|---|---|---|
| Audio, Blueprints, Characters, Input, IsolatedExamples, Levels, MetaHumans, Misc, Widgets | 3,895 | Game Animation Sample (every file matches at the same path). Characters holds Echo, Paragon, UE4_Mannequin, UE5_Mannequins, UEFN_Mannequin. MetaHumans holds Kellan. |
| Movies | 3 videos | Game Animation Sample (LookAtPOI) |
| ProjectRunner | 10 | Own: Characters (Female, Male, Vhoori), Cinematics, Maps (L_G1_Blockout, L_G1_Street, L_PR_Persistent, L_TexelTest), Transition |
| Houdini | 165 | Own: Houdini props (ACUnit_Wall_01, Sign_Neon_01, Terminal_Hack_01, VendingMachine_Drinks_01) and M_EnvProp |
| StoryFlow | 4 | Own (StoryFlow plugin data) |
| Collections, Developers | 0 | Editor folders |

### ProjectDawn (`C:\Prod\ProjectDawn\Unreal\Content`)

| Content folder | Files | Source |
|---|---|---|
| StylizedProvencal | 357 | Stylized Fantasy Provencal (all 357 match) |
| Character | 23 | Own: ShalaBot, chrShala |
| Enemy | 3 | Own: mobGoblin |
| VFX | 51 | Own: Attack, Dust, SafeZone, Status, Telegraph |
| Gameplay | 16 | Own: Characters, GameModes, Input, Npc |
| Data | 5 | Own: data tables and CSVs (attack, camera, goblin and Shala stats) |
| Maps | 1 | Own: Dungeons, Levels, TestMaps |
| World | 2 | Own: SafeZone |
| Cinematics | 1 | Own: LS_GymTest |
| WwiseAudio | 2 | Wwise default tables |
| HDA, UI, Collections | 0 | README only |

### Sandbox (`C:\Prod\Sandbox\Unreal\Content`)

| Content folder | Files | Source |
|---|---|---|
| Audio, Blueprints, Characters, Input, IsolatedExamples, Levels, MetaHumans, Misc, Widgets, Movies | same set as ProjectRunner | Game Animation Sample |
| Sandbox | 126 | Own: HDA, Library, Maps, Materials, Textures |
| HoudiniEngine | 343 | Houdini Engine temp output |

### ProjectAlpha (`C:\Prod\ProjectAlpha\Unreal\Content`)

| Content folder | Files | Source |
|---|---|---|
| Alpha | 59 | Own: Battle, Characters, Core, Data, Maps, UI |
| Characters | 128 | Mannequins (Anims, Materials, Meshes, Rigs, Textures). Third Person template content, not from a cached pack |
| Input, Inputs | 9, 10 | Template and own input assets |
| LevelPrototyping, ThirdPerson | 29, 5 | UE templates |
| HoudiniEngine | 1 | Tools |
| `__ExternalActors__`, `__ExternalObjects__` | 181, 6 | World Partition files for Alpha and ThirdPerson |

No cached pack is imported into ProjectAlpha.

### ProjectFury (`C:\Users\GameDevPC0403\Documents\GitHub\ProjectFury\Content`)

| Content folder | Files | Source |
|---|---|---|
| CombatFury | 2,794 | Combat Fury (all 2,794 match) |
| Fury | 3 | Own: Gym, Input |
| Data | 0 assets | Own CSVs: CameraSettings, FuryMovement |


## Good fits

These are based only on what was found in the packs, the Fab text and the project folders. Skeleton compatibility and visual match were not checked.

### ProjectRunner (side-on 2.5D cyberpunk narrative, HD-2D look)

- Cyberpunk and neon environments: Cyber-Town Pack (cyberpunk), Cyberpunk City (276 SM), Big Slum Alley (Fab text: neon-lit cyberpunk alley, and the narrow layout suits a side-on view), Neon Point (616 SM, 4K textures per Fab text), Soul: City (Fab category cyberpunk, built for mobile so it is light).
- High-res source textures suit the pixelate-at-the-end look. Dekogon lists 2K textures for Echo Prime and CCA Subway Terminal, and 4K for Neon Point.
- Interiors and transit: Echo Prime Living Quarters, Polar Facility, Modular Sci-Fi Factory, Modular Sci-Fi Treatment Station, CCA Subway Train Terminal, Downtown Alley (3 lighting setups).
- Props: Buildings VOL.2 is air conditioners and vents, a match for Runner's own ACUnit_Wall_01. Industrial VOL.1 and Hospital Props VOL.4 add set dressing.
- Tokyo Stylized Environment has a maglev kit and a stylized city street. It is the only modern city street pack here marked stylized, so it may fit a pixelated final look.
- Animation: Runner already has Game Animation Sample. Strike A Pose (600+ poses and gestures) and MoCap Online Free Animation Pack could cover dialogue-scene idles. Both are built on the UE4 mannequin family, so they need a retarget check.
- Not a fit: the Megascans samples (Dark Ruins, Derelict Corridor, Military Trench) are 5 to 27 GB each and read as realistic ruins or military sites.

### ProjectDawn (top-down stylized fantasy action, look from Stylized Fantasy Provencal)

- Same style as Provencal: Stylized Lost Ruins, Stylized Cavern Mahal, Stylized Floating Slums and Modular Stylized Medieval Town (all by StylArts per Fab). Stylescape: Ruins, Dreamscape Tower and House On A Hill are also stylized fantasy.
- Dungeon-like spaces: Stylized Cavern Mahal (cavern temple, VFX, 9 maps) and Stylized Lost Ruins.
- Combat content: Bossy Enemy Animation Pack (Fab text: souls-like, 7 attacks, root motion and in place), Combat Magic Animations, Rolls and Dodges Animation Set, Advanced Magic FX 12, VFX Attack Trails. Dawn already has its own Attack and Status VFX folders.
- Provencal is built for UE 4.23. The newer stylized packs are built for 5.4 and up, so check their Nanite and Lumen settings before importing.
- Not a fit: Medieval Kingdom and Roman Volcanic Temple are medieval or historical and not marked stylized, so they may not match the Provencal look. Not checked visually.

### ProjectFury (throwaway combat-controls test on Combat Fury)

- Combat Fury is already fully imported, with a demo room and the UEFN mannequin animation set. No environment pack is needed for the test.
- Easy Combo Buffering is from the same seller (BP Systems) and adds input buffering for combos. It was not imported.
- Extra attack, dodge and hit animations if the test needs them: Rolls and Dodges Animation Set, Bossy Enemy Animation Pack, Combat Magic Animations. Death Animations - MoCap Pack is FBX only in the Fab library.
- Game Animation Sample could serve as a movement reference. The Combat Fury Fab text notes a GASP player character was added.

### Sandbox and ProjectAlpha

- Sandbox already holds Game Animation Sample. ProjectAlpha holds no pack content, so any pack there would be a first import.

## Unidentified or incomplete

- Nothing was left unidentified. Every cached folder matched a Fab library entry, and Game Animation Sample matched Epic's sample listing.
- Seller is blank where the Fab database has no seller for the listing (about 20 packs). It is unknown, not guessed.
- Style is unknown or not stated for European Village, Military Base Megapack, Modular Container Houses, Modular Sewers & Tunnels, Industrial Factory, Ready Map Vol 2, Free sample Warehouse & Storage, and the library-only kits without descriptions.
- Scifi Kitbash Level Builder is not extracted (see Summary).
- Nothing was read inside .uasset files, so skeleton targets and Nanite use are inferred from names and Fab text only.
