# Wasteland mechs on paths, 2026-10-16

PIE captures with the gameplay camera, timed after the lead walks into each mech's trigger.

| File | What it shows |
|---|---|
| `01_flier_searchlight.png` | Flier_01 overtaking the lead along the skyline, searchlight sweeping the ground ahead. |
| `01_rover_headlight.png` | Rover_01 running past behind the trash line, headlight on the ground ahead. |

Each mech is an `APRPathMover` (C++): a spline that stays put, a body that travels it, and an optional spotlight. Placed by `Unreal/Scripts/pr_dress_tr01_mechs.py`: four fliers and two rovers on triggers, and the spider walking the horizon from the start. The mechs keep their single-frame poses; there are no walk or fly cycles yet.
