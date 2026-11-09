# Graphics library assessment

Written 2026-11-05 before building the searchable asset database. Read-only: nothing was moved, extracted or deleted. Hashes come from a SHA-1 scan of every loose file and a CRC listing of every zip entry (script and `inventory.json` in the session scratchpad; rerun takes two minutes).

## What is there

| Root | Files | Size | Zips | Notes |
|---|---|---|---|---|
| `C:\Prod\ProjectRunner\Graphics` | 65,601 | 13.2 GB | 20 | Untracked in the ProjectRunner git repo (`?? Graphics/`). 97% is the signage pipeline. |
| `...\Development\_asset-gen` | 483 | 4.0 GB | 90 | Original AI-generated packs. 41 Environment Kit batch zips are 2.7 GB of it. |

Graphics by area:

| Folder | Size | What it is |
|---|---|---|
| `signage/sign_library` | 7.3 GB | Final raster sign library: 1,577 entries, masters 4K, game 2K, masks, `previous/`, `sources/`, `records/`, offline `index.html` gallery and `manifest.json`. |
| `signage/reconstruction_06` | 3.2 GB | Working folder for the last rebuild. `outputs/` is byte-identical to `sign_library` (9,478 files). `before/` is the previous library (same as `reconstruction_04/outputs`). |
| `signage/individual_signs`, `_02` | 2.2 GB | Sheet-to-sign extraction stages (crops, masks, cleaned, native). Zipped copies sit next to them. |
| `signage/sign_library_*.zip` | 5.1 GB | Four snapshots of the library at different stages. The three big ones overlap almost entirely with the folders. |
| `signage/reconstruction_04` | 1.1 GB | Earlier library build. |
| `signage/sign_library_svg` | 1.0 GB | SVG sign library, 1,577 files plus references and thumbnails. |
| `signage/vector_reconstruction_03` | 0.4 GB | SVG build working folder. |
| `signage/images` | 53 MB | The 29 original signage sheets (the actual source art). |
| `UI` | 14 MB | Two extracted UE5 UI packs plus 10 source sheets. |
| `logos`, `fonts`, `templates` | small | Logo sheets, font kits and OpenDyslexic zips, handoff templates. |

_asset-gen by area:

| Folder | What it is |
|---|---|
| `Environment_Kit_Batch_*.zip` (41) | 413 asset folders, each `asset.json` + four 2048 PBR maps (BaseColor, Normal, Roughness, AO) + contact-sheet JPGs. Batch numbers 029, 036 and 037 are missing. `Batch_001_v2` has the same 13 assets as `Batch_001`; 28 of 65 files changed. |
| `_image_ref/*.png` (123) | The original generated sheets: asset kits, texture atlases, logo grids, hairstyles, masks, UI mockups. |
| `_image_ref/chibi` (244 files, 16 zips) | Six-character companion cast: pose sheets, turnarounds, atlases, handoff PDFs. Several zips are revisions of the same sheets. |
| `_image_ref/minigame`, `hair`, `demo` | Extracted copies of three zips that also sit at the top level. |
| Other top-level zips (19) | Neon nightlife packs, vector tests, UV parts, hair cards, UI packs. |
| `_image_ref/Persona 5 ... .mp4` | Reference video, not an asset. |

## Duplicates found

Byte-identical or near-identical. Nothing was removed.

| Candidate | Twin | Redundant |
|---|---|---|
| `signage/reconstruction_06/outputs/` | `signage/sign_library/` (all 9,478 files identical) | 1.4 GB |
| `signage/reconstruction_06/before/` | `signage/reconstruction_04/outputs/` | ~1.8 GB |
| `signage/sign_library_4k_2k_source_rebuilt.zip` | `sign_library/` folder (12,840 of 12,840 entries) | 1.6 GB |
| `signage/sign_library_4k_2k_cleaned.zip` | `reconstruction_06/before/` (12,757 of 12,764) | 1.6 GB |
| `signage/sign_library_4k_2k.zip` | `reconstruction_04/outputs/` (partial, 6,764 of 12,757) | 1.4 GB |
| `signage/sign_library_svg_smooth.zip` | `sign_library_svg/` (8,084 of 8,084) | 0.5 GB |
| `signage/individual_signs_01.zip`, `_02.zip` | the two folders beside them | 0.3 GB |
| `Graphics/UI/UE5_Cyber_Hacking_Asset_Pack/`, `UE5_Cyberpunk_QTE_PNG_SVG_Pack/` | the same-named zips in `_asset-gen` | 14 MB |
| `Graphics/signage/vector_icons_18_svg_files.zip` | `_asset-gen/_image_ref/vector_icons_18_svg_files.zip` (identical bytes) | 0.1 MB |
| `_asset-gen/_image_ref/cyberpunk_25_svg_vectors_only.zip` | subset of `cyberpunk_25_actual_editable_vector_logos.zip` | small |
| `_asset-gen/_image_ref/{minigame,hair,demo}/` | `hacking_ring_unreal_vector_pack.zip`, `UE5_HairCards_Starter.zip`, `Cyberware_..._Kit.zip` | small |
| `signage/atlas_tests/.venv` | a Python venv inside the asset folder | n/a |

Total recoverable if all are approved: about 8.5 GB of the 13.2 GB in Graphics. Within `sign_library` itself, `previous/` and `sources/` are history, not deliverables.

Not checked: visually similar but byte-different images (chibi sheet revisions, `Batch_001` vs `_v2`, the `(1)` sheet copies). Those need eyes.

## Proposed build

- One folder, `C:\Prod\ProjectRunner\Graphics\_library\` (name open): `archive/` for the original zips, `loose/` for sheets and files that never had a zip, `thumbs/` for 256 px previews, `assets.db` (SQLite), `assets.csv` and `index.html`.
- One row per deliverable: a sign, an icon, a texture set (four maps as one row), a sheet, a font kit. Columns: id, name, category, tags, description, pack, source zip or folder, path inside the zip, format, pixel size, hash, status, provenance (which sheet it was cut from).
- Search: `index.html` works offline with a text filter and thumbnails, like the existing sign gallery. A small `graphics_db.py search "neon fish"` prints rows for agents, and the CSV opens in a spreadsheet.
- Signage: ingest the 1,577 final entries from `sign_library/manifest.json` and the SVG library, with provenance back to the 29 sheets. The intermediate folders stay out of the index.
- Environment Kit: 413 rows from `asset.json`, previews from the BaseColor map.
- Descriptions and tags come from file names, `asset.json`, manifests and READMEs first. Captioning by looking at each thumbnail is a later pass if wanted.

## Outcome, same day

Mike approved all of the above. Done: 25 duplicate items recycled (about 8.5 GB), `_asset-gen` moved into `Graphics/_library/archive` and `loose/` (472 files, log in `archive/MOVES_2026-11-05.csv`), library built: 106 packs, 4,430 rows (1,577 signs, 890 vectors, 643 images, 622 sheets, 446 texture sets, 225 docs, 27 fonts), 4,204 thumbnails. Entry points: `_library/index.html`, `_library/tools/graphics_db.py`, `_library/assets.db`, `_library/assets.csv`. How it works: `_library/README.md`.

## Curation controls, 2026-11-05

Mike requested hidden flags, editable tags and browsing by scene location across signage and environment images.

- [x] Add hide/restore, editable tags and multiple location assignments.
- [x] Add a location filter, visibility filter, review status and sequential Save & next workflow.
- [x] Preserve edits separately from the generated catalog, with JSON backups and edit history.
- [x] Give agents the same effective metadata through CLI search, show, edit and export.
- [x] Suggest locations from asset names and source sheets, with explicit user overrides.
- [x] Verify API persistence, concurrent edits, catalog rebuilds, hidden filtering and location matching using isolated fixtures.
- [x] Complete the final independent code review and resolve findings.
- [ ] Mike checks the browser layout and reviews suggestions.

Entry point: `C:\Prod\ProjectRunner\Graphics\_library\Start library.cmd`. It starts the local editor; `index.html` remains available for offline browsing. Source art was not moved, deleted or rewritten in this increment. The SQLite edit store is `curation.db`; `curation.json` is its readable backup. Tests never write to the real edit store.

Initial suggestions: Wasteland 1; Waystation and market 223; Food alley 72; Red-light district 474; Station market 0. These are metadata matches, not a visual review or scene-use approval. Red-light matches include 416 signs, 25 texture sets, 19 sheets, 8 images and 6 vectors. No manual image assignments or hidden flags were prefilled.

Verification after review fixes: `tools/.venv/Scripts/python.exe tools/test_curation.py` passed 11 integration tests, and `node tools/test_library.js` passed the JavaScript filter, state and stable review-navigation checks. Fixtures are retained at `_library/tools/test-runs/20261105-143459-901309`. The real hidden launcher started successfully; the live page, scripts, thumbnail and original ZIP image routes returned HTTP 200. Browser rendering remains unverified. The installed WebView2 engine exited without opening a standalone test session; no browser tools or dependencies were installed.

Task tracking stays here and in the session plan because `TASKS.md` is board-generated and this machine has no Runner Codex board identity. No existing board task was claimed or changed through another identity.

### Review findings and decisions

The plan and implementation received read-only Sonnet 5.5 reviews through the project's second-opinion workflow.

- Accepted: a missing or empty edit database could overwrite the JSON backup. `curation.py` now refuses that overwrite, keeps daily backup copies, appends readable edit history and provides `restore-curation` for a missing or empty database. Recovery refuses to replace existing edits. Tests cover missing, empty and corrupt stores. Earlier history remains in JSONL; restored SQLite history records the recovery.
- Accepted: clicking a card did not keep a stable review set, so hiding or saving it could disable navigation. `library.js` now captures the ID list on any card selection. Previous, Next, Hide and Save & next use that same list, including cards without thumbnails. Node checks cover removal from filtered results and missing previews.
- Accepted: hidden launcher failures were invisible. `start_library.ps1` now checks the health endpoint, serializes launcher starts and shows a failure message. `serve_library.py` records startup errors in `tools/serve.log`. The hidden launcher was run successfully.
- Accepted: a different primary file can change an ID without a file move. The guide now states this limitation. The orphan report includes candidate matches, and CLI search warns when saved edits no longer match the catalog. Identity changes never silently transfer an edit.
- Accepted: an absent ZIP member could break original previews. The server now tries the next raster and then the cached thumbnail. An integration check uses a missing ZIP member followed by a valid member.
- Accepted limitation: location suggestions are incomplete and can be broad for bar/club assets. Names and source sheets do not establish every image's scene suitability. Suggestions remain labelled and editable; generic walls and storefronts need a manual pass. No bulk assignment or visual classification of every asset was claimed.
- Rebutted scope expansion: another duplicate audit and duplicate badges are outside this curation increment. The earlier audit and its unresolved visual variants remain documented above. No additional source cleanup was performed.
- Retained design: SQLite remains authoritative because saves and revisions use transactions. Readable JSON backups and an append-only history support recovery; treating the snapshot as a second editable source would create competing versions.

The fixes were tested by the lead after review. Browser layout, real button interactions and Mike's acceptance remain open.

### Pagination fix after Mike's review

Mike reported that hiding an image after Show more collapsed the list. Every successful save called `filter()`, which reset the display limit to 160. `library.js` now preserves that limit for saves and metadata reloads, resets it on search/filter changes, and restores scroll coordinates after rebuilding the grid. No server restart or catalog rebuild is needed; refresh the browser to load the changed script.

`node tools/test_library_pagination.js` passes expansion to 480 entries, hide/restore, tag saves, Save & next, metadata reload and filter-change checks against the actual page handlers using a DOM stand-in. Reintroducing the previous save call in memory reproduces the 480-to-160 collapse and fails this test. The existing `node tools/test_library.js` checks also pass. These checks do not write real annotations; physical browser scroll behavior still needs Mike's confirmation.

## Editing without a server, pins, favorites and bulk actions (2026-11-06)

Mike asked for four things: drag-select for bulk hide and sorting, loading on scroll, nothing saved off-device and a library that moves to another drive without an executable, and pinning plus a separate favorites set. Answers given before the build: nothing was saved off-device (the server listened on 127.0.0.1 only), but the page baked in the absolute root and the venv tied `Start library.cmd` to this PC. Decisions: the browser writes `curation.json` itself; a selection can hide, restore, pin, favorite, add tags and add or clear locations; pins order newest first; marquee plus Ctrl-click and Shift-click.

What changed

- `curation.json` is now the record (format 2). `curation.db` is superseded and not read; it matched the JSON byte for byte at switch-over (71 entries) and stays in place until Mike says to recycle it. `curation.js`, `curation-history.jsonl` and `curation-backups/` keep their roles. Python writers take a lock file; the browser re-reads the file right before each write. Simultaneous browser and CLI writes can still race; noted in the README.
- `tools/library_store.js`: the page saves with the File System Access API after one **Connect library folder** click per browser session (Edge and Chrome). Verified in Edge 156 headless that `showDirectoryPicker` exists and `file://` is a secure context. IndexedDB on `file://` never answers in headless Edge, so remembering the folder handle is bounded by a 1.5 s timeout and the page renders before trying. Whether headed Edge keeps the handle between sessions is for Mike to see; if not, the picker opens each session.
- `tools/library.js`: results load as the sentinel scrolls into view (IntersectionObserver, 600 px ahead), with **Show more** kept for keyboards; cards append instead of rebuilding. Marquee, Ctrl-click, Shift-click range, Ctrl+A for all results, Esc. Selection bar with hide, restore, pin, unpin, favorite, unfavorite, add tags, add location, clear locations. Pin and favorite buttons in the detail pane save at once and keep unsaved drafts. The root path for copied file paths is read from the page's own location.
- `tools/curation.py`: `save_many`, `apply_edits`, `order`, `favorites` and `pinned` filters, `pinned_at` set on pin and cleared on unpin, `restore-curation` accepts `curation.js` and daily backups. `serve_library.py`: `/api/bulk`. `graphics_db.py`: `edit` takes many IDs and `--pin/--unpin/--favorite/--unfavorite`; `search --favorites/--pinned`; pinned listed first. `start_library.ps1` falls back to the installed Python after a move.

Proof: `test_curation.py` 14 tests pass (store, bulk all-or-nothing, pins and order, format-1 upgrade, recovery from `curation.js`, corrupt file left alone, CLI multi-edit, `/api/bulk`, Python and JavaScript parity of filter results and of applied edits). `node tools/test_library.js`, `node tools/test_library_store.js` (in-memory folder: first write, merge with an external edit, daily backup, history append, conflict writes nothing, orphans) and `node tools/test_library_pagination.js` (pin from the pane keeps a draft, favorites filter, Ctrl-click and Shift-click, bulk hide keeps 480 expanded and the scroll position, Ctrl+A, bulk tags, Esc) pass. Edge headless renders `index.html` from `file://` with 160 cards, the summary and the Connect button, and the served page with the live store. The live `curation.json` was upgraded to format 2 with a backup in `curation-backups/2026-11-06.json`.

- [x] JSON store, lock, bulk save, pins, favorites, ordering
- [x] Browser folder store with backup, history and conflict handling
- [x] Scroll loading, marquee and modifier selection, selection bar
- [x] CLI and server parity
- [x] README, memory
- [ ] Mike: Connect library folder in Edge, pin and favorite a few images, lasso a set and hide it, scroll to the end of a long result
- [ ] Mike: decide whether `curation.db` goes to the Recycle Bin

The task board MCP was not connected in this session, so this checklist lives here.
