# Environment texture inventory

2026-10-26. Sources are the frozen ProjectDev registry, Runner UV targets, exported geometry and the saved Unreal import report.

All 34 slots below have templates or reference sheets. No finished maps were found in ProjectDev/SourceContent/Textures/export. The proposed author for new maps is Codex, with Mike approving the look. Counts are mesh assets using a slot, not screen coverage. Zero means absent from this exported subset, not unused in the full 513-piece library.

| Slot | Source size | Layout | Cached meshes | Recorded UE meshes | Board |
|---|---|---|---:|---:|---|
| M_CyberMarket_Trim | 2048x2048 | 14 strips | 182 | 168 | RUN-114 |
| M_Wall_Tiling | 2048x2048 | tile | 48 | 43 | RUN-116 |
| M_Road_Tiling | 2048x3072 | tile | 0 | 0 | RUN-116 |
| M_Paving_Tiling | 2048x2048 | tile | 28 | 23 | RUN-116 |
| M_Glass_Tiling | 1024x1024 | tile | 16 | 15 | RUN-116 |
| M_Cardboard_Tiling | 512x512 | tile | 4 | 4 | RUN-116 |
| M_Asphalt_Tiling | 2048x2048 | tile | 0 | 0 | RUN-116 |
| M_WallTile_Tiling | 1024x1024 | tile | 1 | 0 | RUN-116 |
| M_Decal_Atlas | 2048x2048 | 4x4 cells | 9 | 9 | RUN-113 |
| M_Glyph_Atlas | 2048x2048 | 4x4 cells | 2 | 2 | RUN-117 |
| M_Screen_Atlas | 2048x2048 | 3x3 cells | 13 | 9 | RUN-117 |
| M_Meat_Atlas | 1024x1024 | 2x2 cells | 10 | 10 | RUN-113 |
| M_Street_Atlas | 2048x2048 | 4x4 cells | 8 | 4 | RUN-113 |
| M_Food_Atlas | 1024x1024 | 4x4 cells | 8 | 8 | RUN-113 |
| M_Vehicle_Atlas | 2048x2048 | 2x4 cells | 0 | 0 | RUN-113 |
| M_Shop_Atlas | 2048x2048 | 4x4 cells | 19 | 18 | RUN-113 |
| M_Sign_Atlas | 2048x2048 | 4x4 cells | 11 | 8 | RUN-117 |
| M_FX_Atlas | 1024x1024 | 4x4 cells | 1 | 1 | RUN-113 |
| M_FloorTile_Tiling | 2048x2048 | tile | 0 | 0 | RUN-116 |
| M_Tactile_Tiling | 512x512 | tile | 0 | 0 | RUN-116 |
| M_Ceiling_Tiling | 1024x1024 | tile | 0 | 0 | RUN-116 |
| M_Cutout_Atlas | 2048x2048 | 4x4 cells | 12 | 11 | RUN-113 |
| M_Litter_Atlas | 1024x1024 | 4x4 cells | 0 | 0 | RUN-113 |
| M_Station_Atlas | 2048x2048 | 4x4 cells | 0 | 0 | RUN-117 |
| M_Interior_Atlas | 2048x2048 | 4x4 cells | 0 | 0 | RUN-113 |
| M_Damage_Atlas | 2048x2048 | 4x4 cells | 0 | 0 | RUN-113 |
| M_Kei_Atlas | 2048x2048 | 2x2 cells | 0 | 0 | RUN-113 |
| M_Clinic_Atlas | 2048x2048 | 4x4 cells | 0 | 0 | RUN-113 |
| M_Workshop_Atlas | 1024x1024 | 4x4 cells | 4 | 4 | RUN-113 |
| M_Tech_Atlas | 2048x2048 | 4x4 cells | 0 | 0 | RUN-113 |
| M_Holo_Atlas | 2048x2048 | 4x4 cells | 0 | 0 | RUN-117 |
| M_Corp_Atlas | 2048x2048 | 4x4 cells | 0 | 0 | RUN-113 |
| M_CyberVehicle_Atlas | 2048x2048 | 2x4 cells | 0 | 0 | RUN-113 |
| M_Atmos_Atlas | 1024x1024 | 4x4 cells | 0 | 0 | RUN-113 |

Optional UV1 detail sets are Brush, Grunge, Pixel and Hybrid, each with N and P reference maps. Keep them out of the first test until the base materials read well.

The existing trim mask is R tint ID, G grunge, B AO. Its tint values are 0, 0.25, 0.5, 0.75 and 1.0. It does not carry roughness or metallic.

Runner overrides the old ProjectDev notes that request readable sign text. New signs and screens use text-free fills. The 2048x3072 road reference exceeds Runner's current 2K limit.

Interior trim RUN-115 has no active layout in this registry. Do not assume the archived facade trim fits it.

[Build and review plan](environment-texture-plan-2026-10-26.md). [Full CSV](refs/wip/env-textures-2026-10-26/texture_slot_inventory.csv). [Geometry audit](refs/wip/env-textures-2026-10-26/kit_geometry_audit.json).
