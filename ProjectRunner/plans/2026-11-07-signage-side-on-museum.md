# Signage side-on museum

Project: ProjectRunner, brief at $PROJ_DOCS/ProjectRunner/BRIEF.md. The work happens in PipelineSandbox, brief at $PROJ_DOCS/PipelineSandbox/BRIEF.md.
Lead: claude (Opus 5.5)
Run thread: <t3-thread://v2/f570ea0b-5aec-4f9d-82cb-141046ccfbf3/mcp:launch:4b35989fadf3e4b58e371e4a4473fff9900f84fa939c3363a670cfbfaf71fd1d>
Board parent: not on board. The board tools load only in sessions rooted in `C:\Prod\ProjectRunner` or proj-docs, and this run is in the `C:\Prod` project. Progress is tracked below.

## Outcome

One new PipelineSandbox map holds all current signage as separate stations, reached by walk-in boxes from an opening area, with a UEFN mannequin player on Runner's side-on camera framing so signs read at scale.

Done when: Mike opens `/Game/ProjectRunner/VFX/Signage/Museum/L_SGN_Museum_All` in PipelineSandbox, presses Play, and can walk to every station and back. Before that, the saved map passes its reopen check and a PIE run logs every trip.

## Decisions (Mike's, settled)

- 2026-11-07: Applying a transition to ProjectRunner is off for now. Nothing in ProjectRunner or `_Library` changes in this plan.
- 2026-11-07: The museum holds all three sign maps: `L_SGN_Lab`, `L_SGN_Lab_R2` and `L_SGN_Museum`.
- 2026-11-07: The player is the UEFN mannequin, copied from Runner. GASP stays out, so it uses a simple walk.
- 2026-11-07: Each station has a labelled walk-in box. The opening area has one box per station, and each station has one box back. Travel uses a black fade, matching Runner's scene change.
- 2026-11-07: A new map with one row per station. The three original maps stay untouched.
- No screenshots or videos, either delivered or taken. Mike judges looks by walking the map in UE.
- Hall G's parallax pick and the Runner signage import stay open. This plan does not settle or change them.
- 2026-11-07, after task 1: Every UEFN walk and run clip hard-references Foley notify Blueprints under `/Game/Blueprints`, and the three named clips also reference PoseSearch databases. Mike chose to copy the three clips as they are, without those packages. Footsteps stay silent, the files stay byte-equal to Runner and are never re-saved, and the dangling references listed in `mannequin_files.json` are accepted. This changes task 1's "no missing file" check for the clips.
- 2026-11-07, after task 1: `L_SGN_Lab_R2` contains all of `L_SGN_Lab` unchanged. Mike chose to drop those 125 repeats, so the map holds 279 exhibits (Museum 114, Lab 125, R2's own 40).

- 2026-11-07, after Mike's walk: Motion blur and depth of field go off in the museum, because signs must read. This differs from the camera contract's depth of field. Runner stays as it is.
- 2026-11-07, after Mike's walk: Labels must read, with image size and atlas or single image added. Hub boxes get smaller. Run gets faster and walk stays at 200 cm/s. Each station gets a second return box at the end of its row.
- 2026-11-07, after Mike's walk: The editor viewport matches Play at exposure bias -2.25, through a map-wide volume like `L_SGN_Museum`'s. After a trip, a box won't fire until the movement key has been released once.
- 2026-11-07, after Mike's walk: The 4 R2 portraits and the tube matrix keep source scale and may run above the frame. This replaces "every sign in view" for those 5.

Run lead's call under the Stations contract: the Lab row, about 300 m, splits into three texture stations of four signs each, so a sign's 8 variants stay side by side, and one station for looks and the instanced group. That makes 14 stations.

## Contracts

Copied into each brief that uses them.

**Paths in PipelineSandbox**

| What | Where |
|---|---|
| New map | `/Game/ProjectRunner/VFX/Signage/Museum/L_SGN_Museum_All` |
| New Blueprints and materials | `/Game/ProjectRunner/VFX/Signage/Museum/` with `Blueprints`, `Input`, `Materials` |
| Mannequin copy | `/Game/Characters/UEFN_Mannequin/`, same relative paths as Runner, listed subset only, plus `/Game/Misc/SandboxAnimCurveCompressionSettings`, which the clips reference. The list is `copy_list` in `mannequin_files.json` |
| Editor scripts | `C:/Prod/PipelineSandbox/Unreal/Scripts/sgn_museum/`, run through `Unreal/Scripts/ps_editor.py` |
| Evidence | `C:/Prod/PipelineSandbox/Docs/signage_museum/` |
| Exhibit inventory | `Docs/signage_museum/exhibits.json` |
| Character copy list | `Docs/signage_museum/mannequin_files.json` |

**Must stay unchanged, checked by SHA-256 before and after**

- `Signage/Maps/L_SGN_Lab`, `Signage/Round02/Maps/L_SGN_Lab_R2`, `Signage/Round03/Maps/L_SGN_Museum`.
- Everything in `Signage/Round03/`, so the signage handoff's 33 packages and its files list stay valid.
- All of `C:/Prod/ProjectRunner`. It is a read-only source, copied from disk. Do not connect to the Runner editor.

**Exhibits**

`exhibits.json` is a list with one entry per exhibit: `{ "key", "source_map", "station", "kind", "mesh", "materials", "custom_data", "scale", "label_text", "width_cm" }`. Original materials and payloads are reused as they are. Nothing is re-imported or re-atlased. Instanced groups in the two labs are listed per visible sign where the group allows it, otherwise as one group exhibit, with the choice recorded.

**Stations**

- One station per hall of `L_SGN_Museum` (A to G), and one per lab. The inventory task may split a lab that holds clearly separate tests, such as Round02's neon tubes, and records why.
- Each station is a separate floor, spaced so no other station is in view: floor at `(0, N * 6000, 0)`, player line at local Y 0, exhibit row at local Y -350, running along +X.
- Signs in the row face the camera. Hall E's wall section stays mounted as on a street, because that shows what Runner's camera sees of a sign that sticks out of a wall. Its label says so.
- Each exhibit keeps its label text, placed where the side-on camera can read it.

**Camera, matching `pr_build_trailer.follow_camera`**

- Blueprint camera actor, because PipelineSandbox is Blueprint only and has no Phantom plugins. It reuses the logic in `PNFollowCamera.cpp` read from `_Library`: yaw -90 and pitch 0, looks along -Y.
- FOV 90, no aspect constraint. Distance 662.5. Focus offset Z 106.2 (`CAM_UP` 196.2 minus `CAPSULE_Z` 90). DepthFollow 0.25, HeightFollow 0.3, LagSpeed 5.
- Depth of field: focal distance 662.5, min f-stop 0.7, `FSTOP` and `SENSOR_W` read from `pr_build_trailer.py`.
- Snaps to the player while the screen is black after a trip.
- Exposure and lighting come from `L_SGN_Museum` (`museum_layout_final.json`, `environment`): manual exposure, bias -2.25, key 6 lux, fill 3 lux.

**Player**

- UEFN mannequin: `SKM_UEFN_Mannequin`, its skeleton, materials, textures, physics asset and post-process Blueprint, plus `M_Neutral_Stand_Idle_Loop`, `M_Neutral_Walk_Loop_F` and `M_Neutral_Run_Loop_F`. The clips' root tracks give walk 200 cm/s and run 500 cm/s, with the root locked.
- WASD walks relative to the camera, and Left Shift runs while held, as on Runner's walkthrough maps. No jump and no strafing: the mannequin faces its movement. Capsule half-height 90.
- Nothing from `/Game/Blueprints`, motion matching, Chooser or traversal comes across. The clips' references to those packages stay dangling, as Mike chose on 2026-11-07. Don't edit or re-save a clip to remove them.

**Boxes**

- `BP_SGN_TravelBox`: visible translucent box with a text label and a target entry. Overlap by the player starts one trip. Trips can't overlap, and arriving inside a box doesn't retrigger it.
- Timing from Runner's `PNLevelFlow`: cover 0.4 s to black, move and snap camera while black, hold 0.2 s, reveal 0.4 s. Input is off during the trip.
- Black comes from the camera fade only. No glitch material.

**Editor**

- PipelineSandbox editor only, launched with `-LiveCoding=false`, closed by PID after matching `PipelineSandbox` in its command line.
- `save_assets` gets explicit paths only. An empty list saves everything.
- Build the map with `LevelEditorSubsystem.new_level_from_template`. `duplicate_asset` on a map crashes the editor.
- No OS input in tests, and no viewport captures. Placement is checked by numbers.

## Tasks

| # | Task | Done when | Writes | After | Model | Effort | Board id |
|---|---|---|---|---|---|---|---|
| 1 | Inventory, read only in the maps: list every exhibit in the three maps and assign stations; list the mannequin files and their hard references in Runner; record baseline hashes | `exhibits.json` counts match each map (114 for `L_SGN_Museum`), every mesh and material path exists on disk, `mannequin_files.json` closure has no missing file and nothing under `/Game/Blueprints`, baseline hashes saved | `Docs/signage_museum/`, `Scripts/sgn_museum/` | - | claude-sonnet-5-5 | high | |
| 2 | Player: copy the mannequin subset, build the character, animation, input, camera, game mode and travel box in a throwaway test map | Copy has hashes equal to Runner and refuses overwrites. All Blueprints compile with 0 errors. A PIE log shows walk, run and stop speeds, idle and walk animation running, camera at the contract offset, and a box trip with input restored | `/Game/Characters/UEFN_Mannequin/`, `Signage/Museum/Blueprints`, `Input`, `Materials`, `Scripts/sgn_museum/`, `Docs/signage_museum/` | 1 | claude-opus-5-5 | high | |
| 3 | Build `L_SGN_Museum_All`: opening area, stations, exhibits, labels, boxes, lighting | Map saved and reopened in a restarted editor. Script confirms exhibit count per station equals `exhibits.json`, no null mesh or slot, payloads equal the inventory, every station has a box each way, no exhibit overlaps another on X | `Signage/Museum/L_SGN_Museum_All`, `Scripts/sgn_museum/`, `Docs/signage_museum/`, a decision line in `$PROJ_DOCS/PipelineSandbox/BRIEF.md` | 2 | claude-opus-5-5 | high | |
| 4 | Verify, read only: run every trip in PIE, compare against the source maps, check protected hashes, list anything unproven | Log shows every station reached and returned from with the pawn at the expected position, no Blueprint or material errors, every protected hash unchanged, every sign in view of the side-on camera by computed framing at its row position. Report saved with one verdict per check | `Docs/signage_museum/verification.md` | 3 | claude-sonnet-5-5 | medium | |

Tasks hold the one PipelineSandbox editor and run in order.

## Checkpoints

| After | Kind | Why |
|---|---|---|
| plan | required | Mike's go |
| task 2 | recommended | First binary assets, and everything after depends on this player |
| end review | required | Mike opens the map and walks it, as his brief asked |

Nothing in this plan deletes or overwrites existing files. If a task finds it needs to, it stops and asks.

## Budget

4 child agents and 1 end review by Codex. The plan review is skipped, as Mike chose on 2026-11-06: the `second-opinion` skill isn't available in this session.

## Risks

- The Blueprint camera repeats the Runner camera's logic rather than sharing it. A later change in Runner won't reach this copy. Numbers are in the contract so the framing can be checked.
- Mannequin clips may reference GASP notifies or data. Task 1 finds this from the files, and task 2 stops and reports if a clean clip doesn't exist.
- The clips are in-place or root-motion by clip. Task 2 reads which and matches the speed, so feet may slide a little in a simple walk.
- The two labs use instanced groups and may carry their own lighting or projections. Task 1 reports what can't move cleanly, and task 3 keeps those as one group exhibit.
- A long row makes Hall A's station about 130 m of walking. It stays one station unless Mike asks to split it.
- Copying to `/Game/Characters/UEFN_Mannequin/` is a new copy from another project. Mike asked for this character, which meets the PipelineSandbox brief's rule. Task 3 adds the decision line to that brief.
- Without captures, framing and readability are proved by numbers only. Mike's walk is the visual check.

## Progress

- [x] 1 Inventory: `t1_check.py` RESULT PASS, 279 exhibits on 14 stations, 18-file copy list; `hashes.py compare` EQUAL on 74,868 files
- [x] 2 Player: `t2_check.py` RESULT PASS, 92 passed, 0 failed, output in `Docs/signage_museum/t2_check_output.txt`; 18 copied files equal Runner; `hashes.py compare` EQUAL. Real keys, the black screen and looks are unproven until Mike's walk
- [x] 3 Build `L_SGN_Museum_All`: `t3_check.py` RESULT PASS after an editor restart, output in `Docs/signage_museum/t3_check_output.txt`, notes in `t3_notes.md`. 279 of 279 exhibits on 14 stations, no nulls, payload mismatches or X overlaps, one box each way, `hashes.py compare` EQUAL. Five exhibits run above the frame: 4 portraits and the tube matrix.
- [x] 4 Verify: 274 of 279 exhibits are in frame. The 4 portraits and the tube matrix run above it, and Mike accepted that on 2026-11-07. `Docs/signage_museum/verification.md` has one verdict per check. 28 of 28 PIE trips landed on target, 112 `SGN_TRIP` lines with 0 rejected (lead recounted from `t4_editor_log.txt`), 7 approved `LoadErrors` and no other error lines, 279 of 279 exhibits equal the sources, `hashes.py compare` EQUAL (lead reran). Real keys, the black screen, looks and blur at the row are unproven until Mike's walk.
- [x] End review: Codex `gpt-6.1-sol`, high effort, three findings, no blocker. Framing verdict changed to failed. Saved instance transforms read and equal to the source, and a continuous PIE walk with no teleports passed, both in `t4b_check_output.txt` (RESULT PASS, `hashes.py compare` EQUAL). The walk found one new thing: W held through a return trip re-enters the same box after 0.384 s. Not changed, Mike decides.
- [x] Mike's first walk, 2026-11-07: notes applied and rechecked. `t3_check.py` and `t5_check.py` RESULT PASS, one section at the top of `Docs/signage_museum/verification.md`. `hashes.py compare` lists only 3 library curation files changed at 09:42, outside this work.
- [ ] Mike's second walk: signs sharp, labels readable, editor and Play match
