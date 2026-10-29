# PipelineSandbox tasks

## Environment texture library, 2026-10-27

- [x] Inventory visible module candidates across all 26 references; refine identities during source matching.
- [x] Validate aligned 2048 x 2048 PBR exports and DirectX Y-minus normals.
- [x] Apply Mike's revised scope: prioritize major modules; defer small components to a later pass.
- [ ] Generate and visually review the remaining major modules.
- [ ] Verify all current-pass map dimensions, alignment, channels and normal convention.
- [ ] Deliver the current-pass ZIP, contact sheets, manifest and deferred queue.
- [ ] Later pass: complete deferred small and secondary components.

Current checkpoint: 419 reviewed assets, 1,676 verified PNG maps, 38 CRC-checked batch archives containing 413 reviewed assets. Reviewed by family: 163 City, 69 ContainerMarket, 169 Market, 18 Room. Market's current major-module pass is complete; its remaining small components are deferred. Existing exports, source references, upscales, detail variants and superseded revisions are preserved. Mike's final visual approval is pending.

Current pass has 279 major modules remaining; 423 small or secondary modules are deferred. The full catalog has 1,121 candidates in 94 stable numbered batches. Four primary stall canopy surfaces from the earlier separation audit were added and are reviewed. Do not spend this pass on extra pole hardware, small boxes, loose cables, clutter or secondary background variants. Prioritize architecture, large furniture and machinery, and main signs. The alternative source-extraction workflow was not selected; native image reconstruction remains available for the major modules.

Every set has 2048 x 2048 BaseColor RGB sRGB, Normal_DirectX RGB linear, Roughness grayscale linear and AO grayscale linear. No mesh UVs were supplied: layouts are provisional visible-surface arrangements, not exact unwraps. Native generated inputs are resampled to 2K; fine wear, markings, relief and material response are inferred. Emission, metalness, opacity and transmission require later material setup.

Resume from `Docs/environment_kit/resume_checkpoint.json` and `priority_scope.json`. `Environment_Kit/deferred_assets.json` records the later pass. `Environment_Kit/manifest.json` distinguishes pending major assets from deferred entries. Review gallery: `Environment_Kit/review.html`. Current archive list and packaged asset counts: `Environment_Kit/archive_index.json`. Partial batches completed for this scope use `Environment_Kit_Major_Batch_NNN.zip` and list their deferred members explicitly. Earlier detailed progress notes and archive hashes are preserved in `Docs/environment_kit/tasks_before_major_scope_20261027.txt`.

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
