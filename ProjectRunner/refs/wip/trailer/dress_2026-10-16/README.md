# Trailer dressing, first pass, 2026-10-16

From Mike's notes on the blockout. PIE captures with the gameplay cameras.

| File | Area | What changed |
|---|---|---|
| `02_warehouse_start.png`, `02_warehouse_mid.png`, `02_warehouse_end.png` | Waystation | Steel roof trusses, skylights, clerestory windows, hanging sign boards, floodlights on the columns aimed at the tech piles, two welding spots (`P_WeldSparks` from the Cyberpunk City pack). Lit by Mike's sky light (intensity 40, blue-purple). |
| `02_market_a.png`, `02_market_b.png` | Container market | Wet floor, containers in seven colours, storefront light raised and spilling onto the floor, bulb strings above the lane, two gantry cranes behind. |
| `03_food_alley_corner.png`, `03_food_alley_behind_a.png`, `03_food_alley_behind_b.png` | Food alley | Both sides of the Big Slum Alley showcase, turned to run away from the camera and scaled 0.88 as in `L_LookTest`, plus warm lantern strings and corner light. |
| `03_food_alley_wide_corner.png`, `03_food_alley_wide_a.png`, `03_food_alley_wide_b.png`, `03_food_alley_wide_c.png` | Food alley, widened | Each side moved out 176 cm (one floor tile), so the walkable alley is about twice as wide (4.5 to 7 m for the capsule, was 2.5 to 3.5 m). The showcase's end building that blocked the alley mouth moved west of it. Invisible walls, the behind-camera zone and the exit refitted. |

Scripts: `Unreal/Scripts/pr_dress_tr02_waystation.py`, `Unreal/Scripts/pr_dress_tr03_alley.py`. Both only replace their own actors, so they can be rerun.

Known issues: some Big Slum Alley signs carry readable text ("PUB"), against the no-text rule. The welding sparks weren't visible in these stills. The corner before the food alley is empty when the map is played on its own.
