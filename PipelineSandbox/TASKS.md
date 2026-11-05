# PipelineSandbox tasks

## Glitch comparison round 2, 2026-11-04

User requested game-reference research and additional looks. Preserve every first-round asset and file. Task-board tools are unavailable; this checklist tracks the explicitly requested work.

- [x] Research Cyberpunk 2077, Narita Boy and contrasting game references. Report: `$PROJ_DOCS/ProjectRunner/research/glitch-game-references-v2.md`.
- [x] Confirm PipelineSandbox is idle in L_GlitchLab with no unsaved packages.
- [x] Add six screen presets and three transitions in Round02 and L_GlitchLab_R2. The original area is included in the new map for comparison.
- [x] Compile materials and exercise all six new screen triggers and six transition pads in PIE. Normal and inset-view endpoints passed; captures are in `Docs/glitch_review/round02`.
- [x] Confirm all 41 recorded first-round files have unchanged SHA-256 hashes. Review: `Docs/glitch_review/round02/README.md` and `review.html`.
- [ ] Mike chooses the looks after reviewing them in Unreal.

## Environment texture library, 2026-10-27

- [x] Inventory visible module candidates across all 26 references; refine identities during source matching.
- [x] Validate aligned 2048 x 2048 PBR exports and DirectX Y-minus normals.
- [x] Apply Mike's revised scope: prioritize major modules; defer small components to a later pass.
- [x] Generate and visually review base color only for the remaining major modules.
- [x] Verify new base colors are 2048 x 2048 RGB sRGB and remove obvious baked lighting, reflections and cast shadows where possible. Fine color-versus-relief ambiguity is recorded per asset.
- [x] Record the smaller numbered batch ZIP delivery format and list all remaining modules.
- [x] Switch new exports to base color only and verify 2K RGB sRGB output, aspect ratio, mixed-format previews and small batch archives. Evidence: `Docs/environment_kit/basecolor_mode_verification.json`.
- [x] Deliver the remaining current-pass batch ZIPs, contact sheets, manifest and deferred queue. No consolidated ZIP is required.
- [x] Restore the 38 missing production batch ZIPs from intact reviewed exports. Source map hashes and archive CRCs passed. All 462 reviewed modules are now covered by 48 current small archives. Evidence: `Docs/environment_kit/repackage_reviewed_batches_report.json` and `Environment_Kit/archive_index.json`.
- [ ] Later pass: complete deferred small and secondary components.
- [x] Create and check `Environment_Kit/Environment_Kit_Preview_Catalog.pdf`: 144 pages covering 419 completed modules, 109 contact sheets and all 26 original/upscale/detail reference groups. Includes searchable filenames, bookmarks, page links and local file paths. All pages render, linked locations exist, and nine representative pages passed visual layout checks. Evidence: `Docs/environment_kit/pdf_preview_catalog_report.json`.
- [x] Finish the Room sheet's major-module pass: 43 new base-color-only exports, bringing Room to 61 reviewed modules. Each new PNG is 2048 x 2048 RGB sRGB. Small Room components remain deferred.
- [x] Update the PDF as `Environment_Kit/Environment_Kit_Preview_Catalog_v2.pdf`: 161 pages, 462 reviewed modules, 124 contact sheets and all 78 earlier reference versions. All pages render, all module names are searchable, and 11 representative pages passed visual checks. Evidence: `Docs/environment_kit/pdf_preview_catalog_report_v2.json`. The original PDF is preserved.
- [x] Finish the RuinedApartment major-module pass: 43 base-color-only 2048 x 2048 RGB sRGB exports, visually reviewed and saved in five small ZIPs: 054, 055, 056, 057 and 063. Fine wear and intrinsic colors are inferred; layouts remain provisional.
- [x] Update the PDF as `Environment_Kit/Environment_Kit_Preview_Catalog_v3.pdf`: 172 pages, 505 reviewed modules, 135 contact sheets and all 78 earlier reference versions. All pages render and filenames are searchable; 11 representative pages passed visual checks. Evidence: `Docs/environment_kit/pdf_preview_catalog_report_v3.json`. Prior PDFs are preserved.

- [x] Finish all 70 Factory major-module base colors at 2048 x 2048 RGB sRGB, with native and final contact-sheet visual checks. Batches 066 through 072, 074, 075 and 076 are packaged. Batch_076 includes the two final Factory props and six reviewed PostApoc roads. Fine hardware, wear and patch arrangements remain inferred.

- [x] Update the PDF as `Environment_Kit/Environment_Kit_Preview_Catalog_v4.pdf`: 195 pages, 581 reviewed modules, 157 contact sheets and all 78 earlier reference versions. All pages render, all module names are searchable and 12 representative pages passed visual checks. Evidence: `Docs/environment_kit/pdf_preview_catalog_report_v4.json`. Prior PDFs are preserved.

Current checkpoint: 698 reviewed assets, 1,955 verified PNG maps, 80 CRC-checked batch archives containing 698 reviewed assets. Reviewed by family: 2 Alley, 163 City, 69 ContainerMarket, 3 ContainerScene, 70 Factory, 19 Loft, 169 Market, 1 NightMarket, 71 PostApoc, 9 RetroMarket, 61 Room, 43 RuinedApartment, 16 Salvage, 2 Sector7. Market's current major-module pass is complete; its remaining small components are deferred. Existing exports, source references, upscales, detail variants and superseded revisions are preserved. Mike's final visual approval is pending.

Current pass has 0 major modules remaining; 423 small or secondary modules are deferred. The full catalog has 1,121 candidates in 94 stable numbered batches. Four primary stall canopy surfaces from the earlier separation audit were added and are reviewed. Do not spend this pass on extra pole hardware, small boxes, loose cables, clutter or secondary background variants. Prioritize architecture, large furniture and machinery, and main signs. The alternative source-extraction workflow was not selected; native image reconstruction remains available for the major modules.

On 2026-11-02 Mike changed the remaining assets to base color only for later trim sheets or specific models. New assets require one 2048 x 2048 RGB sRGB BaseColor PNG; do not generate Normal, Roughness or AO. Preserve all 419 completed PBR sets and their DirectX normals. No mesh UVs were supplied: layouts are provisional visible-surface arrangements, not exact unwraps. Native generated inputs are resampled to 2K; fine wear, markings and intrinsic colors can be inferred. Other material maps and geometry-dependent bakes belong to later model or trim-sheet work.

Resume from `Docs/environment_kit/resume_checkpoint.json` and `priority_scope.json`. `Environment_Kit/deferred_assets.json` records the later pass. `Environment_Kit/manifest.json` distinguishes pending major assets from deferred entries. Review gallery: `Environment_Kit/review.html`. Current archive list and packaged asset counts: `Environment_Kit/archive_index.json`. Partial batches completed for this scope use `Environment_Kit_Major_Batch_NNN.zip` and list their deferred members explicitly. Earlier detailed progress notes and archive hashes are preserved in `Docs/environment_kit/tasks_before_major_scope_20261027.txt`.

Exact remaining filenames are in `Environment_Kit/remaining_major_modules.txt` and `Environment_Kit/deferred_modules.txt`. `Environment_Kit/remaining_modules.csv` contains both queues with source, section and batch columns. Mike chose smaller individual numbered batch ZIPs on 2026-11-02; do not build one consolidated archive.

- [x] Finish all 71 PostApoc major-module base colors at 2048 x 2048 RGB sRGB. Native images and all final contact sheets passed visual checks. Batches 076 through 080 and 082 through 086 are packaged; the beacon is packaged in Batch 087 with three reviewed Loft cushions/sofa assets. Hidden faces, fine wear, exact fractures and tiny hardware remain inferred. Small PostApoc components stay deferred.
- [x] Finish the 19 Loft, 16 Salvage and 17 remaining scene modules, then refresh the PDF catalog with all new previews and existing reference history.
- [x] Create and check `Environment_Kit/Environment_Kit_Preview_Catalog_v5.pdf`: 232 pages, all 698 reviewed modules, 192 contact sheets, 80 batches and all 78 earlier reference versions. All pages render; every module name is searchable; 975 local targets exist. Eleven representative pages passed visual layout checks. Evidence: `Docs/environment_kit/pdf_preview_catalog_report_v5.json`. Earlier PDFs are preserved.
- [x] Verify final delivery: 1,955 PNG hashes, dimensions, channels and color tags match the saved records and visual reviews; 80 current ZIPs pass CRC checks and cover every asset exactly once. All 78 original/upscale/detail files match their saved hashes. Evidence: `Docs/environment_kit/major_completion_verification.json`.

The current major-module pass is ready for Mike's final visual check: 419 preserved PBR sets and 279 base-color-only textures. Zero major modules remain. The 423 small or secondary components are still deferred. These are provisional visible-surface patches for manual UV placement; inferred wear, color, graphics and patch shapes are documented in each asset record. No exact mesh unwrap, hidden-face coverage or measured texel density is claimed. Built-in image generation/editing supplied the new raster artwork; FFmpeg only fitted and converted exports. Exact prompts and retained drafts are in `Docs/environment_kit/prompts` and `Docs/environment_kit/generated`.

## AI detail pass, 2026-10-27

- [x] Validate a new AI detail pass on an existing upscale.
- [x] Save all 26 detailed versions separately, at the existing upscale dimensions.
- [x] Verify that the originals and existing upscales remain unchanged.
- [x] Visually compare all new versions and prepare a review gallery.

Mike requested a further AI detail pass and explicitly asked to keep the existing upscaled versions. The new outputs will be saved in `_ref/detailed_ai_v2`.

All 26 detailed PNGs are saved and decoded, totaling 831,305,203 bytes. Each received a built-in image-tool material-detail edit, followed by Real-ESRGAN x4plus to match the existing upscale dimensions. The original 26 references and the 28 prior upscale files still match their saved hashes. All seven comparison sheets were visually checked. Small markings, faces, lettering, and wear shapes can differ; some regions are smoother. The separate versions are ready for Mike's check in `_ref/detailed_ai_v2/review.html`. Evidence and exact prompts are in `Docs/reference_detail_v2/verification.json`, `visual_review.json`, and `prompts/`.

## Reference image upscale, 2026-10-27

- [x] Read the brief and inspect all 26 source images in `_ref`.
- [x] Check the previous enlargement test. It changed details without increasing resolution.
- [x] Settle the upscale method. Mike selected conservative AI enhancement with inferred surface detail and preserved design.
- [x] Save enlarged copies of every source image, preserving the originals.
- [x] Check output dimensions, source hashes, and all outputs visually.
- [x] Prepare the comparison gallery for Mike's final check.

Source sizes are 1536 x 1024, 1671 x 941, and 1672 x 941. The prior `_redetail_test_01` file is a separate input and is included because Mike requested every image. Task-board tools are unavailable in this session; this checklist records the explicitly requested work.

The 2026-10-27 image-tool trial explicitly requested interpolation only, no reconstructed detail, and 3072 x 2048 output. It returned 1536 x 1024 and changed surface marks and paint brightness. Rejected. Evidence is in `Docs/reference_upscale/image_tool_trial_report.json` and `rejected_image_tool_trial.png`. Mike subsequently selected conservative AI enhancement, allowing inferred surface detail while preserving design.

All 26 final PNGs exist in `_ref/upscaled_ai_4x`. The method blends 65% Real-ESRGAN x4plus with 35% Lanczos enlargement of each original. Dimensions are exactly 4x in each axis, from 6144 x 4096 to 6688 x 3764. Every output decoded successfully and all original SHA-256 hashes still match. The output PNGs total 683,786,653 bytes.

All 26 before/after compositions and native-pixel detail crops were visually checked across seven contact sheets. No large design or layout changes were observed. Fine lettering can look stylized. The viewer's image selection, comparison slider, and selectable detail crops passed browser checks. Mike's final visual check is ready at `_ref/upscaled_ai_4x/review.html`; his approval is not recorded.

Evidence: `Docs/reference_upscale/verification.json`, `visual_review.json`, `review/sheet_01.png` through `sheet_07.png`, and `_ref/upscaled_ai_4x/manifest.json`. The method and official tool sources are in `Docs/reference_upscale/processing_notes.md`.

## Shipping container test, 2026-10-26

- [x] Read project brief and game asset workflow.
- [x] Confirm scope: one blue A3 shipping container using standard 20-foot dimensions.
- [x] Verify isolated Houdini 22.0.466 launches with zero HoudiniSource HDAs.
- [x] Test reference enlargement and record the result. Mike approved building from the original resolution on 2026-10-26; further enlargement is deferred for this test.
- [x] Build the container with editable Houdini SOPs.
- [x] Add UVs, Substance textures, markings, and collision.
- [x] Cook and lint the source, export FBX, and record verification results.
- [x] Import and stage the asset in PipelineSandbox UE 5.8.
- [ ] Obtain Mike's visual approval in UE.

Stop and ask if the initial asset build has issues or Mike calls all stop. Task-board tools are unavailable in this session; this checklist records the explicitly requested work.

### Resolved reference issue

The built-in image tool returned 1536 x 1024 for a requested 3072 x 2048 enlargement. Both input and output dimensions were checked with System.Drawing. The output changes detail but is not an upscale. It is saved as `_ref/Industrial Sci-Fi Factory Asset Sheet_redetail_test_01.png`; the original is unchanged. Mike approved continuing from the original resolution, which is sufficient for this build.

### Ready for visual review

- Current source: `C:/Prod/PipelineSandbox/Houdini/asset_containerBuilder_02.hiplc`.
- Cooked source: 44,833 triangles, no errors or warnings, zero invalid positions, zero invalid UVs, zero zero-length normals, zero collapsed triangles. Network lint passes all rules.
- UE mesh: `/Game/Houdini/Props/ShippingContainer_Blue_01/SM_ShippingContainer_Blue_01`, 44,774 imported triangles, six assigned material slots, one box collider.
- UE size: 605.8 x 244.0 x 259.1 cm. Side fasteners add 2 mm to the nominal 243.8 cm width.
- Saved and open level: `/Game/Houdini/Preview/L_Preview_ShippingContainer_Blue_01`.
- Evidence: `Docs/container_verification.json`, `Docs/container_unreal_report.json`, `Docs/container_ue_preview.png` in the project.
- Initial casting bevel and door-rail bounds issues were corrected with Mike's approval. Projected lettering was cleaned before the final export.
- A Sonnet 5.5 export review is running under the games-map workflow. Mike's visual approval is still pending.

