# Cascadeur animation: Marcus gameplay clips and the chair fight

Project: ProjectRunner, brief at $PROJ_DOCS/ProjectRunner/BRIEF.md
Lead: claude
Run thread: <t3-thread://v2/f570ea0b-5aec-4f9d-82cb-141046ccfbf3/mcp:launch:7073574b344229fa4cb83ae1c3a417a81b24128e40373a470d9c21425d8729fc> (launched 2026-11-05)
Board parent: RUN-164

Research: `$PROJ_DOCS/ProjectRunner/research/cascadeur-2026-11-05/` (cascadeur-workflow.md, cascadeur-python-api.md, PLAN.md). Second opinion (Codex gpt-6.1-sol, 2026-11-05) folded in; its points are marked [SO n].

## Outcome

Marcus's five locomotion loops and eight transitions are re-authored in Cascadeur and play in the playable UE map, and the chair fight (Marcus vs two guards, Vhoori at gunpoint) is blocked, inbetweened and plays as a Level Sequence in UE.

Done when: the playable map plays the Cascadeur loops and transitions through a revision04 AnimBP with no visible pop at any transition in a PIE capture, the revision04 automation and the contact checks pass, and a capture of `LS_Fight_01` in UE shows all ten beats on Marcus, Guard 1, Guard 2 and Vhoori. Every clip has its .casc, FBX, UE asset and capture at the paths in the contracts.

## Decisions (Mike's, settled 2026-11-05)

- Cascadeur 2026.2.3 Pro, driven through its in-app MCP script server. Mike starts the server each Cascadeur session (Commands > MCP.Start script server).
- Source clips are the Mixamo-derived clips behind MarcusPlayable_02, not the Blender ARP formula clips. The walk is stiff and gets re-blocked with Marcus's attitude. The jog is okay and gets improved. The sneak (crouch walk) is good and is cleaned, not changed.
- The real goal for gameplay is transitions. First pass: WalkStart, WalkStop, StandToCrouch, CrouchToStand. Second pass: JogStart, JogStop, CrouchWalkStart, CrouchWalkStop. Each is authored from the loop's own contact pose.
- Gameplay clips import onto the playable `SK_Marcus` (MarcusPlayable_02), verified in the pipeline proof before clip work. The AnimBP gets transition states in a revision04 copy; revision03 stays intact.
- Loops: in place, 30 fps, root at origin, first and last pose identical.
- Fight: Marcus plus two guards animated; Vhoori holds two poses (gun to Marcus's head, knocked down). The support character is voice only and is not in the scene. One continuous take, cut at beat boundaries on export. No fail states; the QTE completes by default with a slow effect.
- Staging: Marcus in the chair, Vhoori in front of him with the gun to his head, the two guards a few steps behind Marcus on either side. Side-on readability. Mike blocks the cameras later.
- Weapons are Mike's FBXs: Vhoori's handgun `Houdini/geo/source/weapon-01-handgun.fbx` and the guards' rifles `Houdini/geo/source/weapon-01-rifle.fbx`. The rifle FBX is 4x too big and imports at 0.25. The handgun's scale (36 cm long at face value) is not confirmed yet. The chair stays a placeholder box in Cascadeur and a placeholder mesh in UE.
- Pose sheets are drawn SVG stick figures plus PNG, so Mike can draw over them. No AI-generated images.
- Fight v2 (Mike's drawovers, approved 2026-11-05): `refs/wip/cascadeur/Fight/fight-beats.md` v2 is the source for tasks 14 to 16. B03 is a push, not a strike. Marcus dashes at the guards. Vhoori is he/him.
- Guard and Vhoori rigs keep `cc_*` bones at reference pose and export with `roots`. No `Hem_*` curves for now.
- Never call in Cascadeur: `play_to_video_file`, `set_mode_visualizers`, any `Timeline.*cycle*` action. Each crashed it or broke saves.
- Rows left after 2026-11-06 run on claude-opus-5-5 instead of claude-fable-5-1, on Mike's instruction.
- Review is both: screenshots and captures in `refs/wip/cascadeur/`, and the .casc left open in Cascadeur.
- UE editor RunnerSandbox_01 on port 8002 may be launched. New assets go under `/Game/ProjectRunner/Animation/Cascadeur/` and `MarcusPlayable_04`. No other session's maps are touched.
- Never save over Mike's scenes in `Houdini/anim/*.casc`. New scenes go in `Houdini/anim/cascadeur/`.

Recommended defaults, Mike may override at approval:

- Stops are phase aware [SO 5]: two stop clips per gait, left foot forward and right foot forward, and the AnimBP picks the one matching the loop phase. Starts begin from the idle pose and enter the loop at its contact phase.
- Crouch while moving blends CrouchWalk in over the existing timings; StandToCrouch and CrouchToStand play only when stopped [SO 4].
- Revision04 is activated by an explicit asset override on the playable map's character, not by changing the native default in PRCharacter.cpp [SO 4].

## Contracts

### C1. Cascadeur access

- Endpoint: `POST http://127.0.0.1:8765/run` with JSON `{"code": "<python>"}`. Globals in scope: `csc`, `scene`, `app`. Runs on the next scene_idle in one serial queue; 30 s timeout per HTTP call. The response has `ok` and `messages`; `print` output appears in `messages`. A `modify*` call that fails still returns `ok: true`; check its return value and read the tail of `%LOCALAPPDATA%\Nekki Limited\Cascadeur\logs\cascadeur_log.log`.
- Timeouts are unknown outcomes, not failures [SO 3]. Every long operation (unbake, Inbetweening, AutoPhysics, export, render) gets a job id and writes `Houdini/anim/cascadeur/jobs/<job_id>.json` with `status`, `started`, `finished`, `error` when it ends. On a timeout the caller polls that file with short `/run` calls and never re-sends the mutation. Scene ownership is not released until the job file says finished or error.
- One Cascadeur writer at a time [SO 2]. The run thread never starts two children that touch Cascadeur at once. Within a child, every operation that reads `current_scene()` (unbaking does, through `ml.editable_animation`; Toolbar actions do) runs with the child's scene set current, and Mike's scene is restored at the end of the child's session, not between calls.
- Helper module: `C:\Prod\ProjectRunner\Houdini\anim\cascadeur\casc_lib.py` (task 1 writes it; everyone else only imports it by path with importlib). Public functions, fixed by task 1 and copied into every later brief: `open_scene(path) -> app_scene`, `new_from_base(base_path, save_path) -> app_scene`, `make_current(app_scene)`, `import_animation(app_scene, fbx, start_frame=0)`, `unbake(app_scene, first, last) -> job_id`, `set_key(app_scene, frame, layer_names=None)`, `set_interval(app_scene, first, last, mode)` with mode in `STEP|LINEAR|BEZIER|CLAMPED_BEZIER|FIXED|AI` (the stub enum is `CLAMPED_BEZIER`), `set_point(app_scene, frame, point_name, xyz)`, `run_action(action_id) -> job_id`, `export_animation(app_scene, fbx_out, first, last, roots=None) -> job_id` (uses `export_joints_selected_frames` and selected roots; `roots` picks one character in a multi-character scene), `render_frames(app_scene, out_dir, frames) -> job_id`, `render_video(app_scene, out_mp4, first, last) -> job_id`, `wait_job(job_id, timeout_s)`, `save(app_scene, path)`.
- Task 1 proves each function by its result, not by the method existing [SO 9]: sparse keys after unbake, generated motion after an AI interval, a trimmed export with the requested frame count, a render with the requested frame count. Destructive helper tests run on disposable copies under `Houdini/anim/cascadeur/_scratch/`.
- Base rig scene for Marcus: `C:\Prod\ProjectRunner\Houdini\anim\castMarcus_start_02.casc` (Marcus coat mesh, SK_PR_Human bones, UE5 quick-rig template, 30 fps, cm). Read only.
- New scene naming: `Houdini/anim/cascadeur/<Char>_<Clip>_<NN>.casc`, for example `Marcus_Walk_01.casc`, `Fight_Take_01.casc`. Never overwrite a lower number; bump NN.
- Tools with no scripted path: the child stops at that step, leaves the scene current with the interval selected, posts what button to press, and waits for Mike.

### C2. Clip names and specs

| Clip | Kind | Frames (30 fps) | Notes |
|---|---|---|---|
| Walk, Jog, CrouchWalk | loop | one full cycle, both steps | in place, identical first and last pose; stride speed measured and recorded |
| Idle, CrouchIdle | loop | 120 to 240 | subtle, no foot moves. CrouchIdle is the approved intermediate-height D pose |
| WalkStart, JogStart, CrouchWalkStart | transition | 10 to 24 | idle pose to the loop's contact pose, entering at the loop's phase |
| WalkStop_L, WalkStop_R, JogStop_L, JogStop_R, CrouchWalkStop_L, CrouchWalkStop_R | transition | 10 to 24 | from the loop's left or right contact pose to the idle pose |
| StandToCrouch, CrouchToStand | transition | 12 to 20 | Idle pose to CrouchIdle pose and back |
| Fight_Take | scene | about 300 | one take; beats B01 to B10 as frame ranges in `fight-beats.md` |

Join check for transitions: position under 1 cm and rotation under 3 degrees per joint against the loop frame it joins, both pasted in the report [SO 5].

Export: FBX binary, Animation preset, meshes off, bake on, Euler filter on, up axis as task 1 proves (Y first, Z if UE shows a 90 degree roll). Path `C:\Prod\ProjectRunner\Houdini\geo\export\cascadeur\A_<Char>_<Clip>_<NN>.fbx`. Fight: the full take per character first; beat cuts `A_<Char>_Fight_B<NN>_<NN>.fbx` only after the take plays in UE.

### C3. UE import and review

- Editor: RunnerSandbox_01 at `C:\Prod\ProjectRunner\Unreal\RunnerSandbox_01.uproject`, MCP port 8002, Python remote execution through `Unreal/Scripts/pr_remote.py`. Only kill an editor by PID whose command line contains `RunnerSandbox_01`.
- Requests, not arguments [SO 11]: `pr_remote.py` passes no arguments, so each UE script reads `Unreal/Saved/cascadeur/request.json` written by a host wrapper `Unreal/Scripts/cascadeur/casc_ue.py <import|capture|sources> ...` and writes `Unreal/Saved/cascadeur/result_<id>.json`. The wrapper holds `Unreal/Saved/cascadeur/.ue_lock` until the result file exists, including through PIE playback and capture. Failures propagate as a non-zero exit.
- Import (`import`): onto `/Game/ProjectRunner/Animation/MarcusPlayable_02/SK_Marcus` for Marcus, or the cast skeleton under `/Game/ProjectRunner/Characters/<Char>/` for Guard and Vhoori (task 2 records the exact paths), into `/Game/ProjectRunner/Animation/Cascadeur/<Char>/A_<Char>_<Clip>_<NN>`, root motion off and force root lock on for loops. The result json has asset path, frames, bone count, missing bones, and the per-bone reference-transform difference against the target skeleton.
- Gameplay data rebuild [SO 6]: the import step for Marcus clips also computes `PR_SoleHeight`, foot sync markers, garment curves and the mirror table with the same code the playable build uses (`Unreal/Scripts/marcus_playable/build_assets.py` and `build_revision_02.py`), recomputed from the new motion, never copied from the old clip.
- Capture (`capture`): plays the clip in PIE on the character's mesh in `/Game/ProjectRunner/Animation/Cascadeur/L_CascReview` through a SceneCapture2D and writes PNG frames and an mp4. It never saves the map.
- Sources (`sources`): writes `Unreal/Saved/cascadeur/playable_sources.json` for Walk, Jog, CrouchWalk, Idle, CrouchIdle, StealthIdle: the playable asset, its provenance (marcus_test revision, label such as `Run` or `Crouch`), effective rate scale, role, and a 30 fps FBX exported from the UE sequence itself to `geo/export/cascadeur/sources/` [SO 8]. Clip tasks author from those FBXs, so the accepted timing is baked in.

### C4. Evidence

`C:\Prod\ProjectRunner\refs\wip\cascadeur\<Char>_<Clip>\`: `breakdown.md` (frame, pose name, what the body does, what changed from the source), `key_<frame>_<pose>.png` per key from Cascadeur (side view, plus front for idles), `<Clip>_casc.mp4` from Cascadeur, `<Clip>_ue.mp4` and `<Clip>_ue_<frame>.png` from UE. Fight: `refs/wip/cascadeur/Fight/` with `sheets/B<NN>_<name>.svg` and `.png`, `fight-beats.md`, and the same captures.

### C5. Fight beats

`refs/wip/cascadeur/Fight/fight-beats.md` v2 and `Fight/sheets/` v2 override this summary. B01 Marcus in the chair, hands bound behind. B02 cuffs release (hands come free; the hack is off screen). B03 Marcus takes the handgun Vhoori points at his face and pushes Vhoori down. B04 Guard 1 raises his rifle. B05 Marcus dashes in and pulls Guard 1 between himself and Guard 2. B06 Marcus disarms Guard 1. B07 Marcus roundhouse kicks Guard 2. B08 Marcus knocks out Guard 1 with the gun. B09 Marcus knocks out Guard 2 with Guard 1's rifle. B10 Marcus spins and points the gun at Vhoori (hold). Characters: Marcus (base rig), Guard 1 and Guard 2 (rig_Guard_01.casc, namespaces guard_1 and guard_2), Vhoori (rig_Vhoori_01.casc, two poses only). Props: chair, pistol_vhoori, rifle_guard1, rifle_guard2, each parented to the hand that holds it per beat; the parent changes are listed in `fight-beats.md` so UE attachment follows them [SO 10].

## Tasks

| # | Task | Done when | Writes | After | Model | Effort | Board id |
|---|---|---|---|---|---|---|---|
| 1 | Cascadeur helper library and proof: `casc_lib.py` with the C1 functions, each proven by result on scratch copies, plus export of `castMarcus_walk_test_03.casc` to FBX and a 3-frame render | `A_Marcus_WalkTest_01.fbx` has the SK_PR_Human bone list and 102 frames (checked headless in Blender), scratch tests show sparse keys after unbake, generated motion after an AI interval, a trimmed export and a render with the requested counts, and `README.md` lists which tools needed a click | `Houdini/anim/cascadeur/casc_lib.py`, `README.md`, `jobs/`, `_scratch/`, `geo/export/cascadeur/A_Marcus_WalkTest_01.fbx`, `refs/wip/cascadeur/Marcus_WalkTest/` | - | claude-fable-5-1 | high | RUN-165 |
| 2 | UE side: launch the editor, write `casc_ue.py` and the editor scripts (import, capture, sources), build `L_CascReview`, export the playable sources, import the proof FBX onto SK_Marcus and prove it both ways [SO 1] | import json shows 0 missing bones and per-bone reference-transform differences under 0.5 cm and 1 degree on SK_Marcus; `WalkTest_ue.mp4` shows the clip on the playable Marcus mesh in PIE; the reverse trip (a playable source FBX imported into the Cascadeur base, exported, re-imported) matches the original within 1 cm per joint; `playable_sources.json` lists six assets with FBXs on disk | `Unreal/Scripts/cascadeur/*`, `/Game/ProjectRunner/Animation/Cascadeur/L_CascReview`, `.../Cascadeur/Marcus/A_Marcus_WalkTest_01`, `Unreal/Saved/cascadeur/*`, `geo/export/cascadeur/sources/*`, `Houdini/anim/cascadeur/_scratch/`, `refs/wip/cascadeur/Marcus_WalkTest/` | 1 | claude-fable-5-1 | high | RUN-166 |
| 3 | Walk loop: import the source walk, unbake, breakdown, re-block 8 keys with Marcus's casual wary attitude, Inbetweening per gap, AutoPhysics on the travelling version, Stay In Place, cycle, export, import, capture | `breakdown.md` plus 8 key PNGs, `Walk_casc.mp4`, FBX, UE json with 0 missing bones and the rebuilt curves listed, `Walk_ue.mp4` with no foot slide at the loop seam, stride speed recorded | `Houdini/anim/cascadeur/Marcus_Walk_*.casc`, `geo/export/cascadeur/A_Marcus_Walk_*.fbx`, `/Game/.../Cascadeur/Marcus/A_Marcus_Walk_*`, `refs/wip/cascadeur/Marcus_Walk/` | 2 | claude-fable-5-1 | high | RUN-167 |
| 4 | WalkStart, WalkStop_L, WalkStop_R from the approved walk and the current playable idle pose | three FBXs pass the C2 join check (pasted), three UE captures | `Marcus_WalkStart_*`, `Marcus_WalkStop_L_*`, `Marcus_WalkStop_R_*` equivalents of row 3 | 3 | claude-fable-5-1 | high | RUN-168 |
| 5 | Revision04 early test [SO 12, SO 4, SO 7]: transition rules written down, AnimBP graph builder (extend `PRAnimationBuildLibrary` or a Python graph build), `MarcusPlayable_04` with the Cascadeur walk plus WalkStart and the two WalkStops, activated by asset override on the playable map's character, revision04 identity and transition-playback assertions added | PIE capture of walk start and stop at three stride phases and a short tap with no pop; the 54 existing assertions plus the new revision04 assertions pass; the contact checks pass; cook 0 errors | `/Game/ProjectRunner/Animation/MarcusPlayable_04/*`, `Unreal/Source/RunnerSandbox_01/**/PRAnimationBuildLibrary.*` and the test file, `Unreal/Scripts/marcus_playable/build_revision_04.py`, `Unreal/Saved/MarcusPlayableBuild/revision04*`, `$PROJ_DOCS/ProjectRunner/research/cascadeur-2026-11-05/transition-rules.md` | 4 | claude-fable-5-1 | high | RUN-169 |
| 6 | Jog loop: same path as 3; keep the source timing, fix float and arm swing | as 3, for Jog | `Marcus_Jog_*` equivalents of row 3 | 3 | claude-fable-5-1 | high | RUN-170 |
| 7 | CrouchWalk loop: import, unbake, keep the motion, Fix Feet and contact cleanup only, cycle, export | as 3, for CrouchWalk, with a before and after frame pair | `Marcus_CrouchWalk_*` equivalents of row 3 | 6 | claude-fable-5-1 | medium | RUN-171 |
| 8 | Idle and CrouchIdle loops: import, unbake, trim to a clean loop, export; CrouchIdle holds the D pose | as 3, for both idles | `Marcus_Idle_*`, `Marcus_CrouchIdle_*` equivalents of row 3 | 7 | claude-fable-5-1 | medium | RUN-172 |
| 9 | Transitions pass 1 remainder: StandToCrouch, CrouchToStand | two FBXs pass the join check, two UE captures | `Marcus_StandToCrouch_*`, `Marcus_CrouchToStand_*` | 8 | claude-fable-5-1 | high | RUN-173 |
| 10 | Transitions pass 2: JogStart, JogStop_L, JogStop_R, CrouchWalkStart, CrouchWalkStop_L, CrouchWalkStop_R | six FBXs pass the join check, six UE captures | `Marcus_JogStart_*` etc. | 9 | claude-fable-5-1 | high | RUN-174 |
| 11 | Revision04 full: all loops and transitions in `MarcusPlayable_04`, crouch-while-moving rule, mirrored directions | PIE capture of every transition in both directions with no pop; all assertions and contact checks pass; cook 0 errors | `MarcusPlayable_04/*`, `build_revision_04.py`, `Unreal/Saved/MarcusPlayableBuild/revision04*` | 10 | claude-fable-5-1 | high | RUN-175 |
| 12 | Fight pose sheets: per beat B01 to B10, drawn SVG stick figures (side view, key poses with timing, weight, contact and prop-hand notes) plus PNG, and `fight-beats.md` with frame ranges and prop parent changes | 10 SVG and 10 PNG render (SVG to PNG headless), `fight-beats.md` has a frame range per beat summing to about 300 and a prop parent per beat | `refs/wip/cascadeur/Fight/sheets/*`, `refs/wip/cascadeur/Fight/fight-beats.md` | - | claude-fable-5-1 | medium | RUN-176 |
| 13 | Guard and Vhoori Cascadeur rigs from `SKM_NPC_Guard_coat_ARP_08.fbx` and `SKM_Cast_Vhoori_coat_ARP_08.fbx` with the UE5 template, and a two-character export proof [SO 10] | each rig scene passes AutoPosing (a scripted pose change moves the limbs); a scratch scene with guard_1 and guard_2 at different positions exports one FBX per guard, each with only its own skeleton, and both import onto the Guard UE skeleton with 0 missing bones and their relative placement preserved | `Houdini/anim/cascadeur/rig_Guard_01.casc`, `rig_Vhoori_01.casc`, `_scratch/TwoGuards_01.casc`, `geo/export/cascadeur/A_Guard_RigTest_*.fbx`, `A_Vhoori_RigTest_01.fbx` | 2 | claude-fable-5-1 | medium | RUN-177 |
| 14 | Fight blocking: one scene with Marcus, guard_1, guard_2, Vhoori and box props, every key pose from the sheets in Step interpolation, side-view render per key, playback speed checked | `Fight_Take_01.casc` with keys at every beat pose, `Fight_casc_blocking.mp4` and key PNGs; the pose count matches the sheets; playback fps recorded | `Houdini/anim/cascadeur/Fight_Take_*.casc`, `refs/wip/cascadeur/Fight/blocking/` | 12, 13 | claude-fable-5-1 | high | RUN-178 |
| 15 | Fight motion and take export: Inbetweening per gap, AutoPhysics per character (main centre of mass per body), contact cleanup, export the full take per character | FBX per character for the take, each with 0 missing bones on import, `Fight_casc.mp4` | `Fight_Take_*.casc` (next number), `geo/export/cascadeur/A_*_Fight_Take_*.fbx`, `refs/wip/cascadeur/Fight/motion/` | 14 | claude-fable-5-1 | high | RUN-179 |
| 16 | Fight in UE: import the takes, placeholder chair and pistols with socket attachment following `fight-beats.md`, build `LS_Fight_01` with the four characters, capture; then export and import the beat cuts | `LS_Fight_01` plays all ten beats in PIE with props in the right hands, `Fight_ue.mp4`; beat-cut assets exist and each plays | `/Game/ProjectRunner/Animation/Cascadeur/Fight/*`, `LS_Fight_01`, `geo/export/cascadeur/A_*_Fight_B*.fbx`, `refs/wip/cascadeur/Fight/ue/` | 15 | claude-fable-5-1 | medium | RUN-180 |

Verification children (claude-sonnet-5-5, medium) are not rows: the run thread may spawn one after rows 3 to 11 and 15 to re-run the import json check and join check when a report lacks output.

## Checkpoints

| After | Kind | Why |
|---|---|---|
| plan | required | Mike's go |
| task 2 | required | pipeline proof both ways: Cascadeur to SK_Marcus to PIE and back. A mismatch stops everything until Mike decides |
| task 3 blocking (before Inbetweening) | required | Mike reviews the 8 walk key poses in Cascadeur and the PNGs |
| task 5 | required | first gameplay result: walk with start and stop in the playable map; writes `MarcusPlayable_04` and source |
| tasks 6, 7, 8 blocking | required, one batched review | Mike reviews jog, crouch walk and both idles together |
| tasks 9, 10 | recommended | Mike checks the joins |
| task 11 | required | full revision04 on the playable map |
| task 12 | required | Mike draws over the sheets before blocking starts |
| task 14 | required | fight blocking review in Cascadeur before motion |
| task 16 | required | end review |

## Budget

16 child tasks, 2 reviews. Over 6 because every clip is its own scene with one writer, and the fight needs separate rig, sheet, blocking, motion and UE writers so no two children touch one .casc or UE asset. Parallelism: one Cascadeur child at a time [SO 2], one UE writer at a time (the C3 lock); task 12 (sheets) runs beside anything. Task 13 runs between Cascadeur clip tasks when the queue is free.

## Risks

- Inbetweening, AutoPhysics, Cycles and Fix Feet may not be callable from Python (only on/off flags were found). Task 1 tries `call_action` ids first and records what needs a click; those steps then wait for Mike.
- Long operations and the 30 s timeout: covered by job files (C1). A child that loses track of a job stops and reports rather than re-running it.
- SK_Marcus may not match the Cascadeur export (twist or ik bones, root scale, axis, reference transforms). Task 2 reports before any clip work; the fallback is an offline conversion onto SK_Marcus, decided by Mike, not a skeleton change.
- Task 5 is real engineering: the current build library refuses a non-empty graph and PRCharacter defaults to revision03 in native code. The task owns the builder and uses an asset override; if it needs a C++ rebuild while Mike's editor is open, it stops and asks.
- UE editor concurrency with Mike: the editor on 8002 is launched by task 2 and left open. The run thread posts before any import.
- Transitions need final loop poses. Loop rework after approval reopens the transition rows that depend on it.
- The fight on four bodies at 300 frames may be slow in Cascadeur; task 14 records playback fps and reports if the Scene Linking Tool is needed.

## Progress

- [x] 1 Cascadeur helper library and proof (2026-11-05; 102 frames, 88 bones, no cc_* bones in the base rig; Cascadeur crashed on play_to_video_file, needs relaunch; 7 helpers untested)
- [x] 2 UE side scripts, review map, sources, proof both ways (2026-11-05: 0 missing bones, ref transforms 0.0005 cm, WalkTest_ue.mp4; reverse trip body under 0.6 cm, right arm 0.6 to 2.6 cm steady offset, Mike to accept)
- [x] 3 Walk loop (2026-11-05: Marcus_Walk_03.casc, A_Marcus_Walk_01.fbx, UE A_Marcus_Walk_01 0 missing bones, seam 0.017 cm, stride 150 cm/s; 3 Cascadeur crashes from script, see README never-call list)
- [x] 4 WalkStart and WalkStops (2026-11-05: 17/19/21 frames, join max 0.014 cm 0.22 deg, 3 UE assets 0 missing bones; open: the Cascadeur round trip changes right-arm roll on every clip, upperarm_r 67 to 90 degrees, cause and visibility not established, measured in task 5)
- [ ] 5 Revision04 early test
- [ ] 6 Jog loop
- [ ] 7 CrouchWalk loop
- [ ] 8 Idle and CrouchIdle loops
- [ ] 9 StandToCrouch, CrouchToStand
- [ ] 10 Transitions pass 2
- [ ] 11 Revision04 full
- [x] 12 Fight pose sheets (2026-11-05, sheets + fight-beats.md, 300 frames; v2 from Mike drawover approved; rifle FBX is 4x too big, import at 0.25)
- [ ] 13 Guard and Vhoori rigs, two-character export proof
- [ ] 14 Fight blocking
- [ ] 15 Fight motion and take export
- [ ] 16 Fight in UE
