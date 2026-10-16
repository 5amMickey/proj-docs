# Trailer blockout, 2026-10-16

Grey-box pass of the five trailer areas (`pitch-plan.md`, B2), built by `Unreal/Scripts/pr_build_trailer.py` into `/Game/ProjectRunner/Maps/Trailer/`. Mechs are Mike's three blockout models, posed. No pack art yet. Lighting is placeholder.

| File | What it shows | How it was made |
|---|---|---|
| `00_route_overview.png` | The whole route from above, all five areas loaded (`L_TR_Persistent`) | PIE, overview camera |
| `01_wasteland_overview.png` | Wasteland: trash and tech on the lane, broken blocks, far ruins, the wall and gate at left | PIE, overview camera |
| `01_wasteland_start.png` | Opening frame of the walk | `-game`, follow camera |
| `02_waystation_market_overview.png` | Waystation warehouse (right) and the container market (left) | PIE, overview camera |
| `02_waystation_market_start.png` | Opening frame inside the waystation | `-game`, follow camera |
| `03_food_alley_overview.png` | The alley from above and behind, stalls and awnings both sides | PIE, overview camera |
| `03_food_alley_start.png` | The corner before the alley | `-game`, follow camera |
| `03_food_alley_behind.png` | Inside the alley: the behind camera following the lead | PIE, gameplay camera |
| `04_redlight_overview.png` | Red-light district facades | PIE, overview camera |
| `04_redlight_start.png` | Opening frame of the walk | `-game`, follow camera |
| `05_station_market_overview.png` | Station hall with the platform market and the train behind | PIE, overview camera |
| `05_station_market_start.png` | Opening frame of the walk | `-game`, follow camera |

Start and behind frames use the gameplay camera (90 degree FOV, 6.6 m, depth of field on the lane). Overviews use a wide camera with depth of field off. Pixel treatment A doesn't apply yet; the blockout materials are flat colours.
