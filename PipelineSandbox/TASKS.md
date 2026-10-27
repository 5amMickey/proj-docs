# PipelineSandbox tasks

## Environment texture library, 2026-10-27

- [x] Inventory visible module candidates across all reference sheets and scenes, with source locations and repeated reference families; refine identities during individual source matching.
- [x] Validate one provisional planar 2048 x 2048 PBR set before batch processing.
- [ ] Generate and visually check every inventoried module in numbered batches.
- [ ] Verify map alignment, dimensions, grayscale maps, color space, and DirectX normals.
- [ ] Export the complete library, manifest, contact sheets, and ZIP.

Mike confirmed DirectX Y-minus normals. Use `_Normal_DirectX.png` filenames. No asset UV layouts were supplied. Layouts must be labeled provisional in the manifest, with no presentation labels inside the textures. Preserve both saved reference versions. Four maps per asset are required: base color, normal, roughness, and AO. Separate emissive and metallic maps are outside the requested set; record that limitation for neon and bare-metal assets.

The current inventory covers all 26 references with 1,054 candidates in 88 batches. Two duplicate identifications are recorded in `Docs/environment_kit/aliases.json`; source matching continues. Batches 001 through 006 contain 72 reviewed assets and 288 verified 2K textures, with one further reviewed asset in Batch 007. Current archives are `Environment_Kit_Batch_001_v2.zip` and `Environment_Kit_Batch_002.zip` through `Environment_Kit_Batch_006.zip`. Their ZIP CRC checks passed. Batch 001 v2 narrows native AO radius to 0.01; the earlier archive and replaced maps remain preserved. Batch 006 is 100,619,570 bytes with SHA-256 `64b04462767782619968c764245f47ef5e4373ad7310683401ee9b1ec2e08a54`. Cloth uses shallower relief and AO; torn silhouettes and transparency require mesh geometry or opacity. The full library remains in progress. `Environment_Kit/review.html` supports selection, filtering and full-resolution viewing; those controls passed browser checks. Per-asset JSON records inference limits, residual small edge cues, provisional layouts and native generation sizes.
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
