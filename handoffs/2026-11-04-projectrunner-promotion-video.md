# ProjectRunner promotion video handoff

## Goal and next step

Build an adjustable rough cut and visual brief for a narrated Project Runner gameplay promotion video. Footage is still represented by grey X placeholders with scene descriptions. Settle the VHS look before replacing placeholders or polishing the edit.

Next, review `C:/Prod/ProjectRunner/Video/Promotion/ProjectRunner_EffectsStudy.mp4` with the user. This is revision 2, the deliberately strong VHS pass. It has not been approved. Apply further feedback to `effects.json` and `build_effects.py`. Once the look is approved, integrate it into the full 90-second timeline and verify a new render.

Important: the latest effect feedback has only been applied to the separate effects study. `ProjectRunner_Promotion.mp4` and its Blender project still contain the original lighter effects and source timers. Do not mistake them for the approved final look.

## Location and repository state

- Project repository: `C:/Prod/ProjectRunner`, branch `main`, HEAD `1c7b653` at handoff.
- Video work: `C:/Prod/ProjectRunner/Video/Promotion`.
- Documentation repository: `$PROJ_DOCS`, branch `main`.
- Project brief: `$PROJ_DOCS/ProjectRunner/BRIEF.md`. Read it before continuing.
- All video work is local and uncommitted. Git reports `?? Video/Promotion/`. No commit, push or PR was created.
- The project has many unrelated changes from other sessions. Do not stage them, alter the open UE/Blender scenes, or clean up their files.
- At the initial conflict check, the task board had no tasks in progress and the thread search found no overlapping promotion-video task. Recheck before work that could overlap. The user explicitly wants a stop if parallel work conflicts.
- The brief requires confirmation of LFS quota before the first large ProjectRunner push. This session did not obtain it.

## Required video sequence

1. Intelligence gathering with dialogue options.
2. Choose to see Vhoori first.
3. Fast-forward to Vhoori's scene.
4. Let two dialogue choices play.
5. Stop with a VHS effect.
6. Narration: "Wait, I'm getting ahead of myself. Let's go back."
7. Rewind to the start of Vhoori's scene.
8. Replay with pauses to explain dialogue and gameplay options opened by Hacker, Tech and Enforcer builds.
9. Choose and play through the Hacker route.

The user has not supplied footage or recorded narration. Dialogue wording in the template is explicitly placeholder text, not settled game dialogue or invented mechanics. The 90-second runtime is provisional.

## Latest user instructions

- Remove the on-screen timer. Enlarge the top-left transport display to resemble the supplied PLAY reference.
- Increase pause tearing and analogue distortion substantially.
- Make the red, green and blue channels separate and wobble. This was described as RGB split or chromatic aberration with animated channel displacement.
- Increase screen-pixel texture and tracking distortion. Try the strong treatment first; reduce it after review if necessary.
- VHS processing belongs only to PLAY, PAUSE, REWIND and FFWD. Normal gameplay stays clean.
- Keep files clean and reduce duplicate versions once one is approved. Current renders overwrite stable filenames. No existing project data was deleted.

The blue narration pause remains a proposal, not an explicitly approved choice. The user did not answer the prior question about blue screen versus frozen gameplay; the latest feedback requested stronger distortion.

## What exists and what was verified

### Full structure draft

- `C:/Prod/ProjectRunner/Video/Promotion/ProjectRunner_Promotion.mp4`: 90 seconds, 1920 x 1080, 30 fps, 2,700 frames and 16 beats. Full FFmpeg decode passed.
- `C:/Prod/ProjectRunner/Video/Promotion/ProjectRunner_Promotion.blend`: Blender 5.2.2 VSE timeline, 33 strips, relative media paths. Reopened in a separate background process and rendered representative opening, rewind and build-pause frames.
- `timeline.json` is the rebuild source. `cue_sheet.csv` lists timing and narration cues.
- `verification.json` records the checks. Human pacing review remains pending.
- Picture clips and overlay cards occupy separate Blender tracks. Cards are rendered images, so wording changes belong in JSON and require a rebuild. Timing can also be edited manually in Blender.
- The same Vhoori source supplies the first pass, reverse, replay and freeze frames. Replacement media paths and narration can be specified in JSON. Source gameplay audio is currently muted; it is not mixed automatically through speed changes.

### Current effects study

- `C:/Prod/ProjectRunner/Video/Promotion/ProjectRunner_EffectsStudy.mp4`: revision 2, 25.5 seconds, 1280 x 720, 30 fps, 765 frames, roughly 55 MB. Full decode passed.
- `effects_verification.json` records the stage timings and verification. All 240 clean gameplay frames were checked against the untreated source plate before encoding and matched exactly.
- The study includes clean footage, PLAY, clean footage, FFWD, a strong PAUSE hit, colour bars/static, blue narration pause, REWIND, PLAY return, clean replay and a paused build explanation.
- Timers, TAPE A, SLP and the study footer were removed. Large white top-left labels have drawn triangle/pause symbols.
- Transport processing includes independent RGB channel motion, broad sweeping tracking tears, coarse RGB phosphor columns, scanlines and dropout noise. Narration and editorial build callouts remain readable above the damaged picture.
- Current controls are in `effects.json`: PLAY 1.4, PAUSE 2.4, REWIND 2.0, FFWD 1.8, RGB split 9 pixels, tear displacement 24 pixels, pixel pitch 3, label font size 19 before 4x enlargement. The file is authoritative.
- All effects and tape sounds are procedural. No stock reference footage, stock audio or generated speech is incorporated.
- The study is a rendered look test, not a newly edited Blender or Shotcut project. Its script uses the full template's generated Vhoori source.

## Rebuild commands

Run from `C:/Prod/ProjectRunner/Video/Promotion`:

```powershell
python build_effects.py
```

This overwrites the current effects study and verification report. Dependencies and the Vhoori source must already exist. To rebuild the original complete template and its sources:

```powershell
python build.py
```

That overwrites the original MP4, `.blend`, cue sheet, generated media and verification report. Preserve any later manual Blender changes before rebuilding. It does not incorporate the revision 2 effects automatically.

Environment used: Python 3.14, local Pillow 12.0.0 and NumPy 2.5.4 under `.deps`, FFmpeg at `C:/ffmpeg/bin`, Blender at `C:/Program Files/Blender Foundation/Blender 5.2/blender.exe`. Scripts use Windows Arial and Consolas fonts. Set paths appropriately on another device.

```powershell
python -m pip install --target .deps Pillow==12.0.0 numpy==2.5.4
```

`build_blend.py` uses Blender 5.2's `sequence_editor.strips`, `fit_method='FIT'` and `image_settings.media_type='VIDEO'` before choosing FFMPEG. Use `--python-exit-code 1` in background Blender calls, because Python errors otherwise returned a successful process exit during development. `verify_blend.py` reopens and renders the saved project without saving changes.

## Editor decision

No new editor was installed or selected by the user. The user wants an open-source editor they can operate and the agent can adjust.

The parent recommendation is Shotcut for its conventional rough-cut timeline, voiceover recording and filters. Agent access would be through saved `.mlt` XML files, followed by an open/save/render test. No Shotcut round-trip has been tested yet. Do not claim live control over unsaved edits.

Blender is the already-tested option with a supported Python API. The editor research note prioritizes Blender for automation, while its final section records the parent's provisional Shotcut recommendation for this user's editing workflow. Kdenlive was also researched, but its XML adds more application-specific state. See `$PROJ_DOCS/ProjectRunner/research/promotion-editor-choice.md`.

## References and inspection limits

All original seven Vecteezy URLs, observations and proposed uses are recorded in `C:/Prod/ProjectRunner/Video/Promotion/README.md`. Public watermarked preview copies and contact sheets are under `generated/references`, ignored by Git. Six frames across each preview were inspected, not continuous real-time playback.

The strongest references for the latest pass:

- Colour bars and distortion: https://www.vecteezy.com/video/9738601-vj-loops-background
- Tracking-noise overlay: https://www.vecteezy.com/video/68333266-analog-distortion-background-glitch-noise-tv-broken-visual-art-effect
- Lighter rewind: https://www.vecteezy.com/video/75249105-nostalgic-vhs-rewind-effect-a-journey-back-in-time
- Strong rewind reference: https://www.youtube.com/watch?v=L49oWRGfHLk

The YouTube item is Creative Film's 24-second "VHS Rewind Green Screen 4K (With sound)". Playback was throttled. Public storyboard frames at one-second intervals were inspected instead. They show broad sweeping tracking bands and deformed REWIND text. Actual motion and audio were not verified by playback. The last reply disclosed this limitation.

The two user screenshots showed a large soft white PLAY triangle and a colour-bar screen with severe horizontal tearing. Their visual requirements are captured above; do not depend on machine-specific chat attachment paths.

## Files created or changed

Every authored or deliverable file in the video root is listed below. All were created during this conversation, and some were subsequently revised:

- `C:/Prod/ProjectRunner/Video/Promotion/.gitignore`
- `C:/Prod/ProjectRunner/Video/Promotion/README.md`
- `C:/Prod/ProjectRunner/Video/Promotion/timeline.json`
- `C:/Prod/ProjectRunner/Video/Promotion/build.py`
- `C:/Prod/ProjectRunner/Video/Promotion/build_blend.py`
- `C:/Prod/ProjectRunner/Video/Promotion/verify_blend.py`
- `C:/Prod/ProjectRunner/Video/Promotion/cue_sheet.csv`
- `C:/Prod/ProjectRunner/Video/Promotion/verification.json`
- `C:/Prod/ProjectRunner/Video/Promotion/ProjectRunner_Promotion.mp4`
- `C:/Prod/ProjectRunner/Video/Promotion/ProjectRunner_Promotion.blend`
- `C:/Prod/ProjectRunner/Video/Promotion/effects.json`
- `C:/Prod/ProjectRunner/Video/Promotion/build_effects.py`
- `C:/Prod/ProjectRunner/Video/Promotion/effects_verification.json`
- `C:/Prod/ProjectRunner/Video/Promotion/ProjectRunner_EffectsStudy.mp4`
- `$PROJ_DOCS/ProjectRunner/research/promotion-video-template.md`
- `$PROJ_DOCS/ProjectRunner/research/promotion-editor-choice.md`
- `$PROJ_DOCS/ProjectRunner/TASKS.md`, appended checklists only. This is otherwise board-generated and contains other sessions' edits. Do not overwrite it wholesale.
- `$PROJ_DOCS/handoffs/2026-11-04-projectrunner-promotion-video.md`, this handoff.
- `$PROJ_DOCS/handoffs/2026-11-04-projectrunner-promotion-video.files.txt`, complete file-path inventory.

The companion inventory lists every current video-work file, including generated media, reference previews, verification images and installed local dependency files. It contains paths only, with no file contents or credentials.

`generated/` and `.deps/` are Git-ignored. The Blender project requires `generated/cuts/`, `generated/overlays/` and `generated/tape_cues.wav`. The effects builder requires `generated/sources/vhoori.mp4`. Regenerate these on another device or transfer the required files alongside the project. Committing this handoff does not transfer the videos or their dependencies.

## Suggested skills

Use the Skill tool to call these, or read their SKILL.md files if no Skill tool is exposed:

- `unslop`, for replies and documentation.
- `ask-mike` and `games-map`, for the project entry rules. Paths are under `$AI_TOOLKIT/global/skills/ask-mike` and `$AI_TOOLKIT/games/skills/games-map`.
- `task-board`, to check current work before resuming. This session used the scoped board CLI for read-only checks because task-board MCP tools were unavailable. Do not print credential-bearing settings files.
- `research`, if further editor or implementation research is needed. It requests a Sonnet 5.5 research delegate. Use the available cross-provider delegation workflow and verify provider availability; do not silently substitute a model.
- `handoff`, to refresh this note at the end of the next session.

No Houdini or Unreal asset work is needed for the present video task. No image-generation skill is needed for code-drawn placeholders or procedural video effects.

## Continue on another device

Commit and push this handoff and its path inventory in `proj-docs`. Pull that repository on the other device, then start with:

"Read `$PROJ_DOCS/handoffs/2026-11-04-projectrunner-promotion-video.md` and continue."

The actual video assets are still on this PC. Confirm they have been transferred or regenerated before claiming the handoff is runnable elsewhere.
