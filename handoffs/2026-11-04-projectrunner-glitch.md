# ProjectRunner glitch comparison handoff

Saved 2026-11-04. Both comparison sets are built and ready for the user's visual choice. No look has been approved for production. This handoff does not authorize deletion, migration or a new effect batch.

## Goal and next step

Build reusable broken-screen materials and matching level-transition looks for ProjectRunner. Research before implementation, compare variants in Unreal, and preserve earlier work. The latest request added references from Cyberpunk 2077, Narita Boy and other games.

The next step is to review timing in Play mode in `L_GlitchLab_R2` and record which screen looks and transitions the user wants developed. If continuing on another device, first confirm that the local sandbox assets have been transferred. Pulling the documentation alone will not transfer them.

1. Read `$PROJ_DOCS/PipelineSandbox/BRIEF.md`, `$PROJ_DOCS/ProjectRunner/BRIEF.md` and the round 2 review notes below.
2. Check editor ownership before connecting. A separate animation task was using ProjectRunner. Stop and ask if another task conflicts.
3. Open `C:/Prod/PipelineSandbox/Unreal/PipelineSandbox.uproject`, then `/Game/ProjectRunner/VFX/Glitch/Round02/L_GlitchLab_R2`.
4. Press Play. Use WASD and the mouse. Stand on an R1 to R6 pad to activate its screen, then step off to clear it. R0 is clean. T6 to T8 pads are about 20 metres behind the spawn. The original area is beside the new wing, toward decreasing world X.
5. Record the user's selections in `$PROJ_DOCS/PipelineSandbox/TASKS.md`. Keep both rounds until the user requests cleanup. Production integration comes after selection and a fresh conflict check.

## Repositories and branches

| Repository | Path | Branch and state at handoff |
|---|---|---|
| Working sandbox | `C:/Prod/PipelineSandbox` | `master`, HEAD `ffb24f8b9215494f93ad87944c28150b89a73c03`. No remote configured. Glitch deliverables are untracked. |
| Documentation | `$PROJ_DOCS` | `main`, HEAD `6b700b92bb290bf8e0b149a8b4aff5546a40cb6d`. Research and this handoff are untracked; the task checklist has local edits. |
| Intended game | `C:/Prod/ProjectRunner` | `main`. No game files changed by this glitch work. Unreal project is `Unreal/RunnerSandbox_01.uproject`. |

No commits, PRs or migrations were made for the glitch work. Both working repositories also contain unrelated changes. Do not stage their entire working trees. The sandbox has no remote, so a separate transfer or backup is needed for its assets and review captures.

`$PROJ_DOCS` is the local `proj-docs` checkout. `$AI_TOOLKIT` is the local `ai-toolkit` checkout. User-profile paths are omitted from this document.

## Completed work

The first round branched from the existing LCD material and also built new damage materials. It has D1 Slip, D2 Codec, D3 Tape, D4 Dropout, D5 Dying Panel, D6 Bitcrush, S1 Cracked, S2 Ink Bleed, S3 No Signal and S4 Cracked Slip. Transitions are T1 Burst Out, T2 Power Off, T3 Blocks, T4 Mosaic and T5 Scatter, plus T0 camera fade for comparison. Its original map is `/Game/ProjectRunner/VFX/Glitch/L_GlitchLab`.

Round 2 adds six screens, a clean baseline and three transitions under `/Game/ProjectRunner/VFX/Glitch/Round02`. The new map includes the original area and a separate comparison wing.

| Screens | Mechanism | Matching transition |
|---|---|---|
| R1 Point Scan, R2 Light Loss | Sparse cyan dots or bright squares on black | T6 Reconstruct thins points to black and rebuilds the next scene |
| R3 Trichroma, R4 Logo Echo | Large RGB copies on slow beats, or fixed orange and blue offsets | T7 Channel Exit separates and fades channels in sequence |
| R5 Drip, R6 Long Drip | Short or long downward brightness trails | T8 Melt Down extends trails and drains columns to black |

Two new masters use static switches to select the three families. They reuse the original trigger Blueprints and `MPC_Glitch` without edits. Screen materials are unlit. Post-process materials run after tonemapping, convert viewport UVs to scene-texture UVs and clamp samples. Progress zero returns the clean scene; progress one returns black. The post-process volume is disabled outside transitions.

`FlashScale=0` clears the new screen effects and makes transitions plain fades. `ReducedMotion=1` removes moving offsets, scan motion and trail motion. Neither is wired to the game's settings menu.

Cyberpunk's SIGGRAPH paper supports the reference mechanisms. Our sparse-screen and brightness-trail effects are approximations, not its point-cloud renderer or compute pixel sorter. Narita Boy's colour-offset reference is the Studio Koba logo in the official trailer, not a verified gameplay transition. True frame-history datamosh was researched but not built.

## Artifacts and changed files

The companion [file manifest](2026-11-04-projectrunner-glitch.files.txt) lists every known deliverable from both rounds by exact path, grouped by round. It also lists observed shared configuration changes with uncertain ownership, relevant supporting files and this handoff's files. Generated caches and transient editor logs are excluded.

Read these artifacts rather than reconstructing the work from chat:

- `C:/Prod/PipelineSandbox/Docs/glitch_review/README.md` documents round 1.
- `C:/Prod/PipelineSandbox/Docs/glitch_review/round02/README.md` documents navigation, implementation, reproduction and limits.
- `C:/Prod/PipelineSandbox/Docs/glitch_review/round02/review.html` contains clean/effect toggles and five captured stages per transition. These are stills, not animation.
- `C:/Prod/PipelineSandbox/Docs/glitch_review/round02/sheet_display_R2.png` and `sheet_transition_R2.png` are contact sheets.
- `$PROJ_DOCS/ProjectRunner/research/glitch-screen-effects.md` contains the initial implementation research.
- `$PROJ_DOCS/ProjectRunner/research/glitch-game-references-v2.md` contains cited game references, observed trailer timestamps and uncertainty.
- `$PROJ_DOCS/PipelineSandbox/TASKS.md` has the completed round 2 checklist and pending visual selection.

## Verification and remaining limits

Saved results in `C:/Prod/PipelineSandbox/Docs/glitch_review/round02` prove that all six new screen pads reached effect amount one on entry and zero on exit. All six transition pads completed their room swap, reset progress and disabled their post-process volume. See `screen_trigger_results.json` and `transition_trigger_results.json`.

`endpoint_pixel_results.json` records exact black at progress one for all three transitions. At progress zero, mean differences from the clean capture were below 0.44 per 8-bit channel. Inset-viewport endpoint tests also passed. `extra_pixel_results.json` records reduced-effect checks. These are captured-image comparisons, not flash-safety certification.

`preservation_results.json` records 41 original files with unchanged SHA-256 hashes against `preserved_before.json`. The final session had no material compile failures or Blueprint runtime errors. The saved new map has 214 actors. At the last editor verification, PIE was stopped and there were no dirty map or content packages. Editor state was not rechecked while writing this handoff.

The lab teleports between rooms while black. Real level streaming, Runner's camera and HUD, packaged builds, GPU frame time and a Harding flash test remain untested. Compiler statistics in `instance_shader_stats.json` undercount Custom-expression texture reads and must not be used to claim a performance improvement. User approval of the looks is still pending.

## Continuing safely

Use `C:/Prod/PipelineSandbox/Unreal/Scripts/glitch_r2/bridge.py`. It selects Python remote-execution targets by project name `PipelineSandbox` and uses the sandbox MCP endpoint at `http://127.0.0.1:8005/mcp`. ProjectRunner uses a separate editor and port. Verify the target before any editor mutation.

The bridge accepts one remote connection at a time. Run verification sequentially. The round 2 README documents its commands. `build_materials.py` rebuilds Round02 only. `build_lab.py` refuses to overwrite an existing round 2 map, so do not run it just to reopen the lab. `prepare_review.py` needs Pillow as listed in `requirements-review.txt`.

An initial attempt to duplicate and load the world through `EditorAssetLibrary.duplicate_asset` crashed the sandbox due to a retained world reference. `LevelEditorSubsystem.new_level_from_template` fixed that path. Do not restore the failed duplication method. UE 5.8 uses `r.Test.ConstrainedView 7` for the inset test; restore it to zero afterwards.

The original build scripts are `Unreal/Scripts/pr_build_glitch.py` and `pr_build_glitch_lab.py`. Rebuilding them would change the preserved first round. Do so only if later work requires it. The first-round README mentions cleanup after approval; the latest user instruction explicitly requires preserving existing work.

## Suggested skills

The next agent should call the Skill tool for these skills, or read their `SKILL.md` files if that tool is unavailable:

- `unslop` for replies and documentation.
- `ask-mike`, then `games-map`, before resuming project work. Check for a project map; none was found in PipelineSandbox during this pass.
- `task-board` to check ownership and conflicts. Its tools were unavailable during this run, so the explicit user-requested checklist is in `TASKS.md`.
- `research` if new reference or Unreal implementation research is needed. Reuse the existing reports first. Its research delegation requirement was fulfilled for round 2 with Sonnet 5.5; no delegate remains running.

## Transfer

Commit and push this document and its companion manifest in `proj-docs`, along with the two glitch research reports needed by the next session. Review the mixed `PipelineSandbox/TASKS.md` diff before including its glitch checklist. The handoff operation has not committed or pushed anything.

On the other device, pull `proj-docs` and start with: "read `$PROJ_DOCS/handoffs/2026-11-04-projectrunner-glitch.md` and continue". Confirm access to PipelineSandbox separately before attempting the Unreal review.
