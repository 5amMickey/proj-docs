# Signage and parallax museum

Project: ProjectRunner, brief at $PROJ_DOCS/ProjectRunner/BRIEF.md. The work happens in PipelineSandbox, brief at $PROJ_DOCS/PipelineSandbox/BRIEF.md.
Lead: claude (Opus 5.5)
Run thread: <t3-thread://v2/f570ea0b-5aec-4f9d-82cb-141046ccfbf3/mcp:launch:5637736962ee613aeecf79085d9982932b3cb508443775137d9c7c839dc21d78>
Board parent: not on board. Mike said yes, but the board tools load only in sessions rooted in `C:\Prod\ProjectRunner` or proj-docs, and this run is in the `C:\Prod` project. Progress is tracked below.

## Outcome

A labelled museum level in PipelineSandbox shows a selective red-light signage set on SignKit geometry, resolution tests and parallax windows, and once Mike approves it, a handoff is ready to bring the result into ProjectRunner.

Done when: Mike has approved the signs in `/Game/ProjectRunner/VFX/Signage/Round03/Maps/L_SGN_Museum`, the saved map passes its reopen check, and the handoff and its import script are saved. Importing into Runner is not part of this plan.

## Decisions (Mike's, settled)

- 2026-11-06: New museum level in PipelineSandbox, laid out in labelled rows like Runner's `L_KitMuseum`. Runner's signage masters are copied in at the same `/Game` path so the handoff keeps its references. Runner stays untouched.
- 2026-11-06: "Signage environment kits" means both. SignKit meshes are the geometry. The flat sign library and the Environment_Kit sign modules are the art. Only shortlisted art gets imported.
- 2026-11-06: The team proposes about 24 red-light signs, chosen for variety of shape and type. They appear in the museum on a first atlas. Mike cuts or swaps them, in UE or the library, and only the approved set gets the final atlas.
- 2026-11-06: Parallax test: Bump Offset, Parallax Occlusion Mapping and six stacked layers on two contrasting windows, each native and pixelated. All 8 windows also go up on the cheapest technique, set into a red-light wall section with cost figures. Our own material, not the pack's installer.
- 2026-11-06: Sign art reaches SignKit through `SM_SGN_` copies made from the frozen FBX files, with only the sign-face slot re-UV'd to 0-1.
- 2026-11-06: Signs use Box reduction, with one clean and one gritty material look. Pixel8r palette and Bayer stay in Runner's lab as references.
- Mike chooses the signs. He views results in UE. No screenshots or videos get delivered.

Standing rules from the briefs:

- Pixel-art textures are pixelated before import, with nearest filtering and no mips. 2K page maximum. Glow and wear come from materials, not art (2026-10-02, 2026-11-02).
- Texel density is a menu: 64, 128, 256 and 512 px/m (2026-10-07).
- Generated art stays out of pitch and application material. The Environment_Kit modules and the parallax pack are generated, and the CMF intake closes 2026-11-10, so the handoff carries that line.

## Contracts

Copied into each brief that uses them.

**Paths in PipelineSandbox**

| What | Where |
|---|---|
| Runner signage copy, byte-identical | `/Game/ProjectRunner/VFX/Signage/` (Materials, Textures, Instances, Blueprints, Maps, Round02) |
| All new sign assets | `/Game/ProjectRunner/VFX/Signage/Round03/` with `Textures`, `Materials`, `Instances`, `Meshes`, `Maps` |
| Parallax assets | `/Game/ProjectRunner/VFX/ParallaxWindows/` with `Textures`, `Materials`, `Instances` |
| Museum map | `/Game/ProjectRunner/VFX/Signage/Round03/Maps/L_SGN_Museum` |
| Editor scripts | `C:/Prod/PipelineSandbox/Unreal/Scripts/sgn_r3/`, run through `Unreal/Scripts/ps_editor.py` |
| Evidence | `C:/Prod/PipelineSandbox/Docs/signage_r3/` |
| Atlas builder and outputs | `C:/Prod/ProjectRunner/Graphics/signage/atlas_tests/round03/` |
| Mesh copy builder and FBX | `C:/Prod/PipelineSandbox/Houdini/asset_signFaceCopies_01.hiplc`, `Houdini/geo/export/SM_SGN_<Piece>_01.fbx` |
| Shortlist | `$PROJ_DOCS/ProjectRunner/research/signage-shortlist-2026-11-06.md` and `signage-shortlist-2026-11-06.json` |

**Sources, read only**

- Signs: `C:/Prod/ProjectRunner/Graphics/signage/sign_library` through `Graphics/_library/tools/graphics_db.py`.
- Modules: top level of `C:/Prod/PipelineSandbox/Environment_Kit`. `_new/` holds byte-identical copies of the same 698 BaseColor maps; do not read from it or change it.
- Meshes: `C:/Prod/ProjectDev/SourceContent/Meshes/export/Environment/SignKit/` plus `SignKit_sockets.json`. These are frozen; see `C:/Prod/ProjectDev/AGENTS.md`. The Runner brief's `D:\projects\ProjectDev` path is out of date.
- Parallax: `C:/Prod/PipelineSandbox/Graphics/Neon_Window_Parallax_UE5_Full/Neon_Window_Parallax_UE5`. Do not run `UE5/InstallNeonWindows.py`.
- Runner signage: `C:/Prod/ProjectRunner/Unreal/Content/ProjectRunner/VFX/Signage`, copied from disk. Do not connect to the Runner editor.

**Shortlist JSON, one entry per sign**

`{ "id", "source": "library"|"module", "path", "face_rect_px", "aspect", "kind": "neon"|"panel", "mesh": "SM_SGN_<Piece>_01", "density_px_m", "lettering": "none"|"ja"|"en"|"ja,en", "notes" }`

**Atlas**

- Rect format is `[u_origin, v_origin, u_span, v_span]`, as in `atlas_tests/atlas_manifest.json`.
- Tile origins and sizes are multiples of 4. Gutter at least 4 px, with RGB dilated under alpha 0.
- Module faces are cropped to their face rect, read from `asset.json`, with square padding removed. They are opaque.
- Box is alpha-weighted reduction, same as `build_comparisons.py`.
- UE settings: BC7, sRGB colour, nearest filter, NoMipmaps, clamp. Pages are 2048 or smaller.
- Names: `T_SGN_R3_<Page>_<Density>_C`.

**Material payload**

Nine custom-data floats, unchanged from Runner: 0,1 rect origin; 2,3 rect span; 4,5,6 tint RGB; 7 emission; 8 seed. Emission covers the whole artwork, neon about 6 and panels about 1.5, as the first lab did. The source art has no tube mask.

**Mesh copies**

- `SM_SGN_<Piece>_01`. Same pivot, scale, axes and triangle count as the frozen FBX.
- Sign face material slot is named `M_SGN_Face`, UV0 spans 0-1 across each face, and reverse faces read left to right with no mirrored lettering.
- All other slots and UVs stay as they were.

**Labels and tags**

- Every museum exhibit has a floor label with sign id, mesh, density, look and technique.
- Library tags: `sgn-proposed` for the shortlist, `sgn-approved` after Mike's picks. Existing tags and locations stay. Check how `graphics_db.py edit --tags` merges before writing.

**Exclusions**

Leave out `City_Sign_Arasaka_01`, `Room_Sign_Arasaka_01`, `RetroMarket_Sign_Shinra_01` and `Sector7_Sign_Sector7_01`, and any other art that uses a name from another game.

**Editor**

- PipelineSandbox editor only, launched with `-LiveCoding=false`, closed by PID after matching `PipelineSandbox` in its command line.
- Runner's editor stays untouched, whoever has it open.
- `save_assets` gets explicit paths only. An empty list saves everything.

## Tasks

| # | Task | Done when | Writes | After | Model | Effort | Board id |
|---|---|---|---|---|---|---|---|
| 1 | Assess assets and propose shortlist: about 24 red-light signs across library and modules, mesh and density for each, plus a change verdict for each asset type (SignKit, library, modules, parallax pack) and an atlas plan with page count and memory | JSON validates against the contract, every path exists, no excluded name appears, tags read back through `graphics_db.py` | Shortlist md and json; `Graphics/_library/curation.json` tags only | - | claude-sonnet-5-5 | high | |
| 2 | Build atlases: shortlist page or pages, plus a ladder at 64, 128, 256 and 512 px/m for three sign shapes | Builder runs from clean, `validation.json` passes dimensions, multiples of 4, gutters, dilation and source hashes unchanged | `Graphics/signage/atlas_tests/round03/` | 1 | claude-opus-5-5 | medium | |
| 3 | Make `SM_SGN_` mesh copies for the sign-face pieces the shortlist uses | Headless cook with no errors, per-mesh report shows triangle count and bounds equal to source and face UVs in 0-1, frozen FBX hashes unchanged | `Houdini/asset_signFaceCopies_01.hiplc`, `Houdini/geo/export/SM_SGN_*.fbx`, `Houdini/scripts/` | 1 | claude-opus-5-5 | high | |
| 4 | Sandbox import: copy Runner signage, import atlases and mesh copies, make Round03 clean and gritty instances, import parallax textures and build the three parallax materials | File hashes match Runner for the copy, import report has 0 errors, texture settings read back from UE, materials compile with statistics saved | `/Game/ProjectRunner/VFX/Signage/`, `/Game/ProjectRunner/VFX/ParallaxWindows/`, `Scripts/sgn_r3/`, `Docs/signage_r3/` | 2, 3 | claude-opus-5-5 | high | |
| 5 | Build `L_SGN_Museum`: halls for shortlist on SignKit, density ladder, modules against library art, parallax matrix and a red-light wall section with all 8 windows | Map saved and reopened in the editor, script confirms every exhibit has its payload and label, shader stats and any GPU timings recorded per parallax technique | `Round03/Maps/L_SGN_Museum`, `Scripts/sgn_r3/`, `Docs/signage_r3/` | 4 | claude-opus-5-5 | high | |
| 6 | Verify, read only: rerun the reopen check, confirm texture settings, triangle budgets and Runner and frozen source hashes, then list anything unproven | Report saved with command output and one verdict per check | `Docs/signage_r3/verification.md` | 5 | claude-sonnet-5-5 | medium | |
| 7 | Apply Mike's picks: final atlas, update museum, tag `sgn-approved`, write the handoff and Runner import script | Map reopen check passes on the final set, a dry-run of the import script against `L_SGN_Museum`'s asset list resolves every path and every reference, handoff and files list saved | `Round03/`, `round03/`, `Scripts/sgn_r3/`, `curation.json` tags, `$PROJ_DOCS/handoffs/<date>-projectrunner-signage.md` and `.files.txt`, `$PROJ_DOCS/PipelineSandbox/BRIEF.md` decision line | Mike's picks | claude-opus-5-5 | medium | |

Tasks 2 and 3 may run at once. Tasks 4 to 7 hold the one PipelineSandbox editor and run in order. A viewport capture is allowed only to check placement; it isn't proof and doesn't get delivered.

## Checkpoints

| After | Kind | Why |
|---|---|---|
| plan | required | Mike's go |
| task 6 | required | Mike walks `L_SGN_Museum`, makes his picks and approves or redirects parallax. Task 7 waits for this |
| end review | required | Mike checks the museum and the handoff |

Nothing in this plan deletes or overwrites existing files, so no destructive checkpoint is needed. If a task finds it needs one, it stops and asks.

## Budget

7 child agents, 1 review at the end. One child over the default: task 7 waits on Mike's picks, and a fresh child there costs less than one left holding context across the wait.

Mike's overrides at approval, 2026-11-06: tasks 2, 3, 4, 5 and 7 run on Opus 5.5 instead of Fable 5.1, and the plan review is skipped. The end review still runs.

## Risks

- The handoff path copies Round03 only. If Round03 needs changes to a Runner master, make a new master in Round03, because Runner's masters must stay identical. Task 4 checks this.
- SignKit's sign faces may not be one clean slot per face; the blades use several glyph cells. Task 1 checks with the source FBX before task 3 starts, and reports any piece that can't take a 0-1 face.
- Some Runner `SM_SignKit_` meshes, such as `WallAd_*`, have no FBX in the SignKit export folder. Task 1 finds their source or leaves them out.
- Pixelated height maps may step visibly under Bump Offset and POM. That's a result to show, not a failure; the pixelated arm keeps its own height map.
- The six-layer material reads six textures per pixel. Cost is reported per technique. Shader statistics aren't frame times, and any figure that wasn't measured gets marked.
- Module faces can hold AI-inferred lettering. Task 1 flags malformed lettering, and the library version is preferred where one exists.
- The Runner editor is open under another session. Copying its signage from disk is a read, and no task connects to it.

## Lead rulings during the run

Not Mike's decisions. All are in sandbox copies and can be changed at the checkpoint.

- 2026-11-06: The box sign end cap (0.2 x 0.6 m, on `Box_Sign_1m` and `Box_Sign_2m`) moves to `M_CyberMarket_Trim`, because a box side isn't a sign face. Triangle count stays equal.
- 2026-11-06: `WallAd_*` stays out, as the plan's risk line allows. Copies come from frozen FBX files only.
- 2026-11-06: Library art is contain-fit in a face-sized tile. Module art fills its tile. Kind decides emission, and every module is `panel`.
- 2026-11-06: The banner copies have no collision and no sockets, because the frozen banners have none. Accepted for the museum.
- 2026-11-06: Round03 signs use a new master, `M_SGN_R3_Sign`, because Runner's masters take one square `AtlasSize` and are two-sided. It is Default Lit, so neon costs 354 pixel instructions against 115 on Runner's unlit neon. An unlit twin is a small change if Mike wants it.
- 2026-11-06: Parallax windows are W05 VelvetCurtains and W03 ParticleRain, and pixelated copies are 128 x 256. Bump Offset is the cheapest technique, by compiler statistics.
- 2026-11-06: Task 6's check 8 failure stands as written in `verification.md`, and the map is unchanged. The four are Hall E context signs placed on purpose: the blade and medallion stick out of the wall as on a street, so they read from along the wall. The labels are on the floor under signs mounted high. The billboard sits 20 cm into the header with its face 13 cm proud.

## Mike's picks at the checkpoint, 2026-11-06

- Remove the 5 signs he raised in `L_SGN_Museum`: `ContainerMarket_Sign_Bar_01`, `Market_Sign_Noodle_Bowl_01`, `Room_Sign_Heart_Woman_01`, `SGN_0146`, `SGN_1024`. The other 19 stay. His reasons: thin lines don't look good and the vectorization didn't go well.
- The team picks 5 replacements from his Red-light district favorites. That set of 24 goes on the final atlas.
- Lantern images are fine for a hologram, not for a fold sign. They go up as holograms on flat cards.
- The library's source sheets are generated, so the handoff's generated-art line covers every approved sign.
- Neon gets an unlit twin master. Panels stay lit.
- Parallax is redirected: the windows read flat. Retest with a stronger arm and six real stacked planes, with the current windows kept for comparison. Parallax stays out of the handoff until he picks after the retest.

## Progress

- [x] 1 Assess assets and propose shortlist (24 signs, 12 meshes; JSON check PASS, 23 tags read back; `research/signage-shortlist-2026-11-06.md`)
- [x] 2 Build atlases (8 pages, 6176 KiB; `round03/validation.json` passed, repeat build byte-identical)
- [x] 3 Make `SM_SGN_` mesh copies (12 FBX, verifier ALL PASS, frozen hashes unchanged; `Docs/signage_r3/mesh_copies_report.json`. In-engine checks are in task 4)
- [x] 4 Sandbox import and materials (70 files hash-equal to Runner, 113 new assets with 0 errors, settings read back; `Docs/signage_r3/task4_report.md`)
- [x] 5 Build `L_SGN_Museum` (92 of 92 exhibits pass after reopen, GPU ratios measured; `Docs/signage_r3/task5_report.md`, `museum_check.json`, `parallax_costs.md`)
- [x] 6 Verify (11 of 12 pass after a full editor restart. Check 8 fails on four Hall E context signs, which the lead accepted as by design, see rulings; `Docs/signage_r3/verification.md`)
- [x] Mike walks the museum and picks (see "Mike's picks at the checkpoint")
- [x] 7 Apply picks and write the handoff (114 of 114 exhibits pass after reopen, final atlas verifier passes, import dry run resolves every path and reference, 30 tags read back; `Docs/signage_r3/task7_report.md`, `handoffs/2026-11-06-projectrunner-signage.md`)
- [ ] End review (Mike runs `/second-opinion review`)
- [ ] Mike checks the museum and the handoff, and picks parallax after Hall G
