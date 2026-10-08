# VaultCache duplicates

Generated 2026-10-08 11:24. Pack descriptions and asset counts are in [packs_unreal.md](packs_unreal.md). The tables below show the state before the clean-up. The next section records what changed.

## Clean-up done 2026-10-08

C: went from 25.8 GB free to 212 GB.

- Every pack except Dark Ruins now lives in `C:\Prod\AssetPacks\Content` (UE 5.8). The 26 group 2 folders were moved there from their old projects, with their `__ExternalActors__` and `__ExternalObjects__` subfolders. Cavern Mahal moved up out of the nested folder. Guitarist (`MusicalRockMotions`) and Container Houses (`ContainersHouseCH`) were copied in from the vault.
- AssetPacks now has PCG, PCGGeometryScriptInterop (Military Trench) and Water (Abandoned Sea Platform) enabled.
- Each removed project's `Config` and `.uproject` are kept in `C:\Prod\AssetPacks\PackConfigs\<Project>` for input, collision and render settings. The MoCap Online FBX, Maya and MotionBuilder sources are in `C:\Prod\AssetPacks\SourceFiles\MCO_Mocap_Basics`.
- Deleted, not recycled: the projects AbandonedSeaPlatform, CCASubwayTrainTerminal, CitySubwayTunnel, DerelictCorridorMegascans, EasyComboBuffering, MilitaryTrenchMegascansSa, ModularSciFiFactory, RomanVolcanicTemple and ProjectDawnPrototype (on GitHub, nothing unpushed).
- Deleted, not recycled: 73 VaultCache pack folders. Before deleting, every file (92,676 in total) was checked for the same path and size in its project copy. Four files differ because they were edited in the projects: Combat Fury `IMC_Sandbox` and `DemoRoom_BuiltData`, and Provencal `Main` and `Main_BuiltData`. Their Fab originals are gone locally.
- Deleted: Intermediate and DerivedDataCache in ProjectAlpha, ProjectRunner, ProjectDawn, Sandbox and AssetPacks.
- City Sample moved from the vault to `Documents\Unreal Projects\CitySample` (all 149,286 files). It ships a 22.5 GB DerivedDataCache pak, which was kept.
- Recycled after a file-by-file check against AssetPacks: the vault copies of Guitarist and Container Houses.
- Kept: Dark Ruins Megascans as its own project (UE 5.6), Game Animation Sample in ProjectRunner and Sandbox, and the FabLibrary FBX caches. VaultCache now holds only FabLibrary.

## Summary (before clean-up)

- C: has 30 GB free of 1 TB. VaultCache holds 284 GB: 76 pack folders plus FabLibrary.
- Project copies are full file copies, not hard links (checked with `fsutil hardlink list`). Deleting a vault copy frees its full size.
- Group 1, already in AssetPacks: 43 packs, 92.8 GB in the vault. Every folder matches its vault source on file count and size.
- Group 2, only in an older-version project: 27 packs, 70 GB in the vault. These are the ones to move into AssetPacks.
- Group 3, in a game project: 3 packs, 9.9 GB in the vault.
- Group 4, vault only: 3 packs, 106.9 GB. City Sample is 104.2 GB of that.
- FabLibrary FBX caches (Bazaar, Junkyard, Old Mine, Unfinished Building, animation FBX): 4.6 GB. No Unreal copy exists, so these are the only local copy.

Clearing the vault copies in groups 1 to 3 frees about 173 GB, and every pack stays on disk in a project. Fab can re-download any of them.

## Other duplication

- Cavern Mahal is at `C:\Prod\AssetPacks\AssetPacks\Content\CavernMahal` (2.9 GB). That is one folder too deep, so the editor does not see it. Its `__ExternalActors__` folder is nested the same way.
- Game Animation Sample is in ProjectRunner and Sandbox (5.5 GB each), plus 6.9 GB in the vault.
- ProjectDawnPrototype (UE 5.3) has the same own-content folders as ProjectDawn (Character, Enemy, Data, Gameplay, Maps, HDA, UI, WwiseAudio) and now holds six older packs too. It looks like an older copy of Dawn being used to hold packs. Not compared file by file.
- `Documents\Unreal Projects\CitySample` is an empty folder, created at 10:19. The City Sample vault download is complete (149,286 files, matching the manifest). Creating the project would take about another 104 GB, which does not fit in 30 GB.
- Build folders the engine regenerates: ProjectAlpha Intermediate 4.6 GB, ProjectRunner Intermediate 2.6 GB and DerivedDataCache 1.5 GB, ProjectDawn Intermediate 2.6 GB, Sandbox DerivedDataCache 1.5 GB. Deleting them makes the next open slower.

## Packs that ship as whole projects

These have their own `Config` and `.uproject`. Copying only the Content folder into AssetPacks brings the assets but leaves the project settings (input, collision, plugins) behind.

| Pack | Plugins it enables |
|---|---|
| Abandoned Sea Platform | Water |
| Dark Ruins Megascans Sample | Water, WaterExtras. Content is 18 top-level folders (Maps, Materials, Textures, StarterContent, ThirdPerson and more), which would mix with other content at the AssetPacks root |
| Military Trench Megascans Sample | PCG, PCGGeometryScriptInterop, GameplayStateTree, HDRIBackdrop, MovieRenderPipeline |
| Derelict Corridor Megascans Sample | MovieRenderPipeline, ProRes |
| CCA Subway Train Terminal, City Subway Tunnel, Easy Combo Buffering, Modular Sci-Fi Factory, Roman Volcanic Temple | defaults only (CCA adds Ansel) |
| Combat Fury, Game Animation Sample | motion matching and Mover plugins; already set up in ProjectFury, ProjectRunner and Sandbox |
| City Sample | about 60 plugins plus C++ source. Not usable as a plain content copy |

## Group 1: already in AssetPacks (vault copy is a duplicate)

| Pack | Built for UE | Vault GB | Project copy | Vault folder |
|---|---|---|---|---|
| Advanced Magic FX 12 | 5.5 | 0.10 | AssetPacks (AdvancedMagicFX12) | `Advanced78ce22a41175V2` |
| Buildings VOL.11 - Modular Offices (Low Poly) | 5.4 | 0.50 | AssetPacks (BUILDINGS) | `Building8626b816566aV1` |
| Buildings VOL.2 - Electric & Air (Nanite and Low Poly) | 5.4 | 3.35 | AssetPacks (BUILDINGS) | `Building9cf4ac2b518fV1` |
| Buildings VOL.8 - Commercial Doors (new today) | 5.4 | 2.33 | AssetPacks (BUILDINGS) | `Buildingb85d454424c8V1` |
| Buildings VOL.9 - Modular Pipes & Gutters (new today) | 5.4 | 0.95 | AssetPacks (BUILDINGS) | `Buildingdfe22b81c8afV1` |
| Medieval Kingdom (Medieval Castle, Medieval Town, Modular Castle, Castle) | 5.8 | 8.11 | AssetPacks (CastleTown) | `ModularM43deebcc3fd4V1` |
| Combat Magic Animations | 5.8 | 0.16 | AssetPacks (CombatMagicAnims) | `CombatMa30df35934c5fV1` |
| Construction Site VOL. 1 - Supply and Material Props (new today) | 5.3 | 0.58 | AssetPacks (Construction_VOL1) | `Construcd2144e19eb5eV2` |
| Construction Site: Loader (new today) | 5.4 | 2.50 | AssetPacks (ConstructionSite) | `SCANSCone177c44c629eV5` |
| Cyberpunk City (Cyberpunk, Cyberpunk City, Sci-Fi City) | 5.4 | 1.58 | AssetPacks (Cyberpunk) | `Cyberpuna23b60dc3dcaV1` |
| Cyber-Town Pack | 5.6 | 1.47 | AssetPacks (CyberTown) | `CyberTowf9bb40409813V4` |
| Workshop Tools And Props Barrels Boxes Bundle vol.1 (new today) | 4.21 | 3.43 | AssetPacks (DefectPropsVol1) | `DefectUld35ffc36b98fV1` |
| Dreamscape: Stylized Environment Tower - Stylized Nature Open World Fantasy | 5.8 | 1.59 | AssetPacks (DreamscapeSeries) | `Dreamsca5d47ad51b755V3` |
| House On A Hill (House, Houses, Fantasy House, Stylized House) | 5.9 | 1.56 | AssetPacks (Feather) | `HouseOnA1eccd9aedfedV3` |
| European Village - French Village - Modern Village | 5.3 | 2.10 | AssetPacks (FrenchVillage) | `European7848079e356aV1` |
| Realistic Gun VFX (Muzzle Flash, Bullet Impact, Ejections, Gun VFX, VFX) | 5.6 | 0.81 | AssetPacks (GunFX) | `Realisti6ed25c895692V1` |
| Industrial Factory (Factory, Warehouse, Industrial Factory, Modular Factory) | 5.8 | 3.43 | AssetPacks (Hivemind) | `ModularF1060bd866ab4V1` |
| Modular Hospital (Abandoned Hospital, Horror Hospital, Modular Hospital, Asylum) | 5.8 | 1.63 | AssetPacks (Horror_Hospital) | `ModularHfe325a221461V1` |
| Hospital Props VOL.4 - Medical Machines | 4.18 | 0.26 | AssetPacks (Hospital_VOL4) | `ModernHo5cbc293115b3V1` |
| Industrial VOL.1 - Worksite (Nanite and Low Poly) | 5.4 | 3.18 | AssetPacks (Industrial) | `Industri355a6784a733V1` |
| Military Base Megapack (Modular Military Base, Military Facility, Outpost, Army) | 5.8 | 8.98 | AssetPacks (MC_Environment) | `Military047fcd641de6V1` |
| Modular Sci-Fi Indoor/Outdoor - Rocky Swampy Planet (new today) | 5.4 | 2.63 | AssetPacks (ModularSciFi) | `ModularSdac6bce1e54dV1` |
| Morbid Motions \| Animations and Poses | 5.6 | 0.64 | AssetPacks (MorbidMotions_Pack) | `Morbidmo348ec2641abaV1` |
| Neon Point - Chinese Streets Environment | 5.8 | 11.85 | AssetPacks (Neon_Point) | `NeonPoin6ed8d57290e2V1` |
| Polar Facility \| Modular Sci-Fi Environment Kit | 5.7 | 0.84 | AssetPacks (Polar) | `PolarSci1da045dbf3a7V2` |
| Strike A Pose - Animation Pack | 4.21 | 0.16 | AssetPacks (PoseAnimations) | `StrikeAPd51198e79d74V2` |
| Rolls and Dodges Animation Set | 4.18 | 0.04 | AssetPacks (RollsAndDodges) | `Rollsand7cdbc5c39a9fV3` |
| Industrial Infrastructure | 5.9 | 3.82 | AssetPacks (SD_Art) | `Industrid6d94fb71540V1` |
| Modular Sewers & Tunnels (Modular Sewers, Modular Tunnels, Modular Corridor) | 5.6 | 3.13 | AssetPacks (Sewer) | `ModularSb35746afa6c6V1` |
| Big Slum Alley | 5.9 | 2.91 | AssetPacks (SlumAlley) | `Realisti74d00098ac74V1` |
| Smoke & Fog VFX (Smoke, Smoke VFX, Smoke Niagara, Dust, Fog) | 5.5 | 0.49 | AssetPacks (SmokePack) | `SmokeAndbb8d1fdd6904V1` |
| Soul: City | 4.18 | 1.55 | AssetPacks (SoulCity) | `SoulCity419` |
| Stylescape: Ruins | 5.2 | 0.35 | AssetPacks (Stylescape) | `Stylescae9d19961b223V8` |
| Ready Map Vol 2 - Bridge Environment / Nature | 5.9 | 1.13 | AssetPacks (StylizedBridge) | `BridgeEn0e6101f6c918V1` |
| Modular Stylized Medieval Town | 5.2 | 0.29 | AssetPacks (StylizedVillage) | `ModularScdd835f86695V1` |
| Swim \| Animations | 5.9 | 0.70 | AssetPacks (SwimmingAnimationPack) | `Swimming504f5e11d2bfV4` |
| Stylized Lost Ruins | 5.4 | 0.62 | AssetPacks (The_Lost_Ruins) | `Stylizedd6bd67e26a5eV1` |
| Stylized Floating Slums | 5.4 | 1.46 | AssetPacks (TheFloatingSlums) | `Stylizedd6c883a675d8V1` |
| Modular Urban City Asset Megapack | 4.21 | 4.52 | AssetPacks (TrainStation) | `ModularUe6c707abad9fV1` |
| Trumpet & Sax \| Animations | 5.7 | 0.84 | AssetPacks (TrumpetSaxPack) | `TheSaxTr5a8d23b47dd4V1` |
| Warehouse Environment | 5.4 | 2.80 | AssetPacks (Warehouse) | `Warehousbd3699b9bc5bV1` |
| Free sample Warehouse & Storage - Vol 01 | 5.9 | 0.58 | AssetPacks (Warehouse_Storage) | `Untitled6b5a634a08e2V1` |
| Stylized Cavern Mahal | 5.4 | 2.87 | AssetPacks, nested one level too deep (AssetPacks\AssetPacks\Content\CavernMahal) | `Stylizede8ef1dee2297V1` |

## Group 2: only in an older-version project (move to AssetPacks, then clear the vault copy)

| Pack | Built for UE | Vault GB | Project copy | Vault folder |
|---|---|---|---|---|
| Abandoned Sea Platform - Post-Apocalyptic Offshore Environment Pack | 5.8 | 1.92 | AbandonedSeaPlatform (HorrorOceanRig) | `Abandone48723a43879eV3` |
| CCA Subway Train Terminal | 5.2 | 1.00 | CCASubwayTrainTerminal (Subway) | `CCASubwa44868f8f5190V1` |
| City Subway Tunnel (new today) | 5.5 | 1.03 | CitySubwayTunnel (Subway_Tunnel) | `CitySubwf94dbf93df76V3` |
| Dark Ruins Megascans Sample | 5.7 | 25.46 | DarkRuinsMegascans (AssetZoo, Blueprints, CustomAssets, ...) | `DarkRuinac4b642bf8b9V1` |
| Derelict Corridor Megascans Sample | 5.7 | 4.69 | DerelictCorridorMegascans (DerelictCorridor) | `Derelict31b645c4b988V1` |
| Downtown Alley | 5.6 | 1.46 | DerelictCorridorMegascans (Downtown_Alley) | `Downtown70bcb86da481V2` |
| Echo Prime Living Quarters (Low Poly) | 5.7 | 1.11 | DerelictCorridorMegascans (ECHOPRIME) | `EchoPrim9ded151d3e2cV1` |
| Footsteps Sounds with Blueprint Setup | 5.1 | 0.03 | DerelictCorridorMegascans (FootstepSound) | `Footstep12a4ba92e5f5V3` |
| Industrial Area Hangar (new today) | 4.23 | 0.63 | DerelictCorridorMegascans (Hangar) | `Industri07de491b5b28V1` |
| Safe House (new today) | 4.23 | 3.50 | DerelictCorridorMegascans (Safe_House) | `SafeHous79991e401278V1` |
| Warehouse | 5.6 | 6.75 | DerelictCorridorMegascans (Scene_Warehouse) | `Warehous7e371bf75594V1` |
| Science Laboratory (new today) | 5.6 | 1.28 | DerelictCorridorMegascans (ScienceLab) | `ScienceL4e4e6995f839V1` |
| Spaceship Interior Environment Set (new today) | 4.18 | 0.63 | DerelictCorridorMegascans (SpaceshipInterior) | `Spaceshi4ce763912c34V1` |
| Storage House Set (new today) | 5.7 | 1.67 | DerelictCorridorMegascans (StorageHouse) | `StorageH4981de1603f5V20` |
| Tokyo Stylized Environment | 5.4 | 0.59 | DerelictCorridorMegascans (TokyoStylizedEnvironment) | `TokyoStyc229650e47ffV1` |
| VFX Attack Trails | 5.1 | 0.10 | DerelictCorridorMegascans (TrailPack) | `VFXAttacd50aeadd792cV4` |
| Underground Subway (new today) | 4.23 | 1.65 | DerelictCorridorMegascans (Underground) | `Undergro83c1249ac46fV1` |
| Easy Combo Buffering | 5.6 | 0.07 | EasyComboBuffering (EasyComboBuffering) | `EasyComb307869ca0969V2` |
| Military Trench Megascans Sample | 5.8 | 10.54 | MilitaryTrenchMegascansSa (MilitaryTrench) | `Military10a1d3c8554fV1` |
| Modular Sci-Fi Factory | 5.7 | 0.68 | ModularSciFiFactory (SciFi_Factory) | `TheBigScb7622a15bc02V1` |
| Bossy Enemy Animation Pack | 4.21 | 0.03 | ProjectDawnPrototype (BossyEnemy) | `BossyEne17b53f7123f6V2` |
| Zombie Movement and Modular Interaction Animations | 4.23 | 0.03 | ProjectDawnPrototype (BSP_ZombieAnims) | `ZombieAnc4dbb87c3f71V1` |
| Bunker (new today) | 4.21 | 1.07 | ProjectDawnPrototype (Bunker) | `Bunker48c3fc3cdaf7V1` |
| MoCap Online Free Animation Pack | 4.23 | 0.11 | ProjectDawnPrototype (MCO_Mocap_Basics) | `MCOMocapfb837d928a3eV1` |
| Scifi Kitbash Level Builder | 4.16 | 1.05 | ProjectDawnPrototype (scifi_kitbash) | `ScifiKitbash415` |
| Modular Sci-Fi Treatment Station Environment | 5.4 | 1.42 | ProjectDawnPrototype (TreatmentStation) | `Treatmena36f25b3aa5aV1` |
| Roman Volcanic Temple (Ancient Medieval Village Greek Buildings City Street) | 5.4 | 1.49 | RomanVolcanicTemple (Volcanic_temple) | `RomanVolfcae816ae732V1` |

## Group 3: in a game project (vault copy is a duplicate)

| Pack | Built for UE | Vault GB | Project copy | Vault folder |
|---|---|---|---|---|
| Stylized Fantasy Provencal | 4.23 | 0.29 | ProjectDawn (StylizedProvencal) | `Stylizedf0f978cdc783V1` |
| COMBAT FURY | 5.9 | 2.65 | ProjectFury (CombatFury) | `COMBATFU96f3e61f4081V7` |
| Game Animation Sample (Epic, UE 5.8) | 5.8 | 6.95 | ProjectRunner + Sandbox | `GameAnimationSample_5.8` |

## Group 4: vault only (no project copy)

| Pack | Built for UE | Vault GB | Project copy | Vault folder |
|---|---|---|---|---|
| City Sample (Epic) (new today) | 5.8 | 104.22 | none | `CitySample_5.8` |
| Guitarist \| Animations | 5.7 | 1.71 | none | `TheGuita4ecff7369d19V1` |
| Modular Container Houses - Survival Base Pack | 5.6 | 0.95 | none | `ModularCb2dd3983775cV1` |

