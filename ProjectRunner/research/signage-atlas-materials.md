# Signage atlas and light projection materials for ProjectRunner (UE 5.8)

Researched 2026-11-04. Nothing was run in Unreal. No editor was started, no asset or config was changed, and no image was processed. Engine source and project files were read only.

## How to read this

Every claim carries one label.

| Label | Meaning |
|---|---|
| Epic | Epic documentation page, fetched with `application_version=5.8`. The page title said "Unreal Engine 5.8 Documentation". |
| Source | UE 5.8.4 source at `C:/Program Files/Epic Games/UE_5.8/Engine` (`Build.version`: 5.8.4, changelist 58902052). Read only. |
| Other primary | Microsoft or Khronos documentation. |
| Local | A project file or an earlier note of ours. Prior evidence, not a new test. |
| Measured | I observed it this session by reading a file or running a read-only CLI. No render or cook was involved. |
| Community | Epic forum post. Not authoritative. |
| Proposal | My design. Needs a test or Mike's decision. |
| Unverified | My reasoning or recollection. No source confirmed it. |

Fetch notes. Epic pages for translucency, Custom Primitive Data (old slug), mesh decals and texture properties returned an empty shell, so I did not use them. The pages I did read are cited by URL below. I found no Epic page for the exact ISM/HISM translucency sorting behaviour, so that is Unverified.

## Summary

1. Start with an opaque or masked material that reads one atlas tile and writes Base Color plus Emissive. Add an additive translucent variant only for holograms. Treat decals and light functions as separate lighting experiments, not as sign rendering.
2. A light function can project a sign shape, but the 5.8 atlas bakes each light function material once into a small slot (128 px by default, 16 slots by default, bilinear sampled). Colour needs a project setting change. Plan it as a spill and projection test, not as a pixel-crisp sign.
3. Small bright emitters are a documented Lumen noise source. Plan neon as visible emissive plus bloom, with separate proxy lights for real illumination.
4. Per-sign selection, tint and flicker seed fit in `PerInstanceCustomData` on one ISM, with no Material Instance per sign and no tick. Global look knobs go in a Material Parameter Collection.
5. The source libraries have no emission information. Coverage alpha is only a silhouette. Any neon-versus-panel mask has to be a new derived file, and Mike has to decide how it is authored.
6. Mip comparison, Pixel8r palette and dither, glow tiers, light function colour and every performance number need UE or Substance runs. None exist yet.

## Inputs read

- `C:/Prod/ProjectRunner/Graphics/signage/atlas_tests/README.md`, `source_inventory.json`, `sample_selection.json` (Local, not edited). The audit found 1,577 raster, mask and SVG sets, PNG headers matching the manifest, and no byte-identical game PNGs. Categories: market 289, animals 131, cyberpunk 434, industrial 146, nightlife 577.
- The 12 proposed samples (sizes are width by height of the 2K game PNG):

| ID | Name | Size | Lettering |
|---|---|---|---|
| SGN_0054 | Fish icon | 2048 x 1590 | none |
| SGN_0741 | Boot (design 003) | 1754 x 2048 | none |
| SGN_0427 | Cat moon | 1647 x 2048 | ja |
| SGN_0070 | Snake | 1882 x 2048 | none |
| SGN_0290 | Izakaya | 646 x 2048 | ja, en |
| SGN_0099 | Red light district | 638 x 2048 | none |
| SGN_0151 | Warehouse | 774 x 2048 | ja, en |
| SGN_0161 | Logistics symbols | 749 x 2048 | none |
| SGN_0001 | Market | 739 x 2048 | ja, en |
| SGN_0041 | Fresh badge | 1752 x 2048 | none |
| SGN_1006 | Red light district (nightlife) | 688 x 2048 | ja, en |
| SGN_0739 | Design 001 | 2048 x 2004 | none |

- `BRIEF.md` decisions that bind this work. Textures are pixelated before import, imported nearest with no mipmaps (2026-10-02). Look is HD-2D full colour, Pixel8r without palette or dither (2026-10-08). Textures-only pixelation with smooth camera depth of field (2026-10-16). Glow-free flat artwork, wear and glow come from UE materials (2026-11-02). Textures 2K max.
- `texture-pipeline` skill, including its Pixel8r alpha note and import table (Local).
- `C:/Prod/ProjectRunner/Unreal/Config/DefaultEngine.ini` (Local, read only). Lumen GI and reflections on, virtual shadow maps on, TSR (`r.AntiAliasingMethod=4`), Nanite enabled, `r.VolumetricFog.LightFunction=True`, front-layer translucency reflections off, static lighting off. My grep found no MegaLights, Light Function Atlas format or Substrate keys, so engine defaults apply unless another ini sets them. Confirm in the editor.

Two things the audit implies for sizing:

- The tall signs are 646 to 774 px wide at 2048 tall. A 4 by 4 grid on a 2048 page gives 512 px cells, so a 2048 tall sign shrinks 4x to fit a cell. That is fine for a pixel-art baseline (the pixelation step sets the real resolution) but it means the grid is a layout choice, not a resolution guarantee. See section 3.
- `source_inventory.json` has no field for emission, segments or panel versus tube. Nothing in the libraries says which pixels are neon.

---

## 1. Render path: unlit or masked emissive, translucent hologram, decal, light function

### What the documentation says

- Masked is a binary on/off cut. Pixels the mask rejects do not render and cost no lighting. The clip value "is not designed to be changed at runtime". [Epic, Material blend modes](https://dev.epicgames.com/documentation/en-us/unreal-engine/material-blend-modes-in-unreal-engine?application_version=5.8)
- Additive adds material pixels to the background, so black reads as transparent. It suits fire, steam and holograms. It is hard to see on light backgrounds, and AlphaComposite improves that. Same page.
- Translucent and Additive do not respect specularity. Same page.
- Nanite supports Opaque and Masked only. Nanite meshes can receive decals but not mesh decals. [Epic, Nanite](https://dev.epicgames.com/documentation/en-us/unreal-engine/nanite-virtualized-geometry-in-unreal-engine?application_version=5.8)
- Translucency Pass "Separate Translucency" renders the material outside depth of field. [Epic, Material properties](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-material-properties?application_version=5.8) The 5.8 renderer has the passes Standard, AfterDOF, AfterMotionBlur and Holdout. [Source, `Renderer/Private/TranslucentRendering.cpp:225-237`]
- "Disable Depth Test" makes rendering "significantly slower since no occluded pixels can get Z-culled". Same Epic page.
- Decal materials use the Deferred Decal domain with Translucent or Alpha Composite. DBuffer carries base colour, normal and roughness. Emissive and ambient occlusion bypass the DBuffer and use "additional draw calls that do deferred blending to either SceneColor or screen space ambient occlusion". Decal cost grows with screen coverage and material complexity. [Epic, Decal materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/decal-materials-in-unreal-engine?application_version=5.8)
- A light function is a material with Material Domain Light Function whose output goes to Emissive Color. It works on Movable or Stationary lights only. [Epic, Light functions](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-light-functions-in-unreal-engine?application_version=5.8) The engine rejects a light function material that is not Unlit. [Source, `Engine/Private/Materials/MaterialShared.cpp:6414`]

### Light Function Atlas in 5.8

All from [Epic, Light functions](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-light-functions-in-unreal-engine?application_version=5.8) unless marked Source.

- The atlas bakes light function materials into 2D tiles on the GPU. The result is shared by all views. Lights that have a light function and cast no shadows can then accumulate in parallel. Epic cites a UEFN measurement of more than 2 ms saved on one template. That figure is theirs, not ours.
- Legacy light functions use the same expensive passes as shadow-casting lights. Our project uses virtual shadow maps, so a shadow-casting projector light pays both. Whether a shadow-casting light with a light function still gets the atlas benefit: the page says the parallel accumulation applies to lights "with no shadow casting enabled". Treat the saving as unconfirmed for shadow-casting lights.
- Restrictions. No depth buffer, world position or GBuffer sampling. UV manipulation must stay aligned to the light function's texture-space edges, or the slot is not repeatable. Directional lights are forced to skip the atlas. Source agrees: the compile step marks a material incompatible if it uses vertex position, scene depth or scene textures, or may manipulate texture coordinates. [Source, `Engine/Private/Materials/HLSLMaterialTranslator.cpp:1769`]
- Colour. The default format is "8 bits Gray Scale" (R8). "8 bits RGB Color" is a project setting under Engine > Rendering > Light Function Atlas. Colour works with volumetric fog, Lumen GI and reflections, translucent and single-layer water. It requires "Deferred Lighting Uses Light Function Atlas", which is on by default.
- Other defaults. Translucent Uses Light Function Atlas is off. Single Layer Water is off. Volumetric Fog and Deferred Lighting are on. Translucent support applies only to materials with Lighting Mode Surface ForwardShading.
- Debug view. `ShowFlag.VisualizeLightFunctionAtlas 1` lists compatible and non-compatible light functions.
- Limits. `r.LightFunctionAtlas.SlotResolution` defaults to 128 and is labelled "Experimental". `r.LightFunctionAtlas.Size` defaults to 4, so 4 by 4 = 16 slots. The engine caps the edge at 16, so 256 slots. [Source, `Renderer/Private/LightFunctionAtlas.cpp:54-80,129-148`]
- Slot sharing. The slot key is the light function material's unique ID, so two lights using the same material share one slot and an instanced material takes its own slot. [Source, `LightFunctionAtlas.h:91-110`; Epic says the same for instances.] Per-light variation of a baked slot is therefore not possible. Different projected signs need different Material Instances, and each uses one of the 16 default slots.
- Sampling. The atlas sampler is bilinear. [Source, `LightFunctionAtlas.cpp:564,605`] A pixel-art sign baked into a 128 px slot and sampled bilinearly will not stay crisp. Raising `SlotResolution` is the lever, but it is experimental and the engine clamps it to the maximum 2D texture size divided by the edge count.
- Over budget. The engine prints a warning when lights are skipped for lack of slots. [Source, `LightFunctionAtlas.cpp:809-830`]
- MegaLights supports light functions that are atlas-compatible and when the atlas is enabled. [Epic, MegaLights](https://dev.epicgames.com/documentation/en-us/unreal-engine/megalights-in-unreal-engine?application_version=5.8) Lumen direct lighting batches a light function only when the atlas is on for Lumen and the light holds a valid slot; otherwise it falls back to the per-light path. [Source, `Lumen/LumenSceneDirectLighting.cpp:250`]

### Comparison

| Path | What it gives | Limits found | Fit for signs |
|---|---|---|---|
| Opaque or Masked, emissive | Hard silhouette, correct depth, Nanite-compatible (Masked), no sorting, no overdraw blending. | Masked adds depth-test edge aliasing under TSR (Unverified). Emission is only what the material writes. | Baseline for every sign. |
| Unlit shading model | No lighting math. | Screen probe traces can hit the Unlit shading model, and `r.Lumen.ScreenProbeGather.ScreenTraces.HZBTraversal.SkipUnlitHits` exists "to work around strong emissives causing noise" (default false). [Source, `Lumen/LumenScreenProbeTracing.cpp:59-63`] Whether an Unlit material feeds Lumen GI as an emitter is not documented. | Comparison control only. Test it against a Default Lit emissive material. |
| Additive translucent card | Order-independent blend (a sum), glow-friendly, cheap when unlit. | Adds light, so it vanishes on bright backgrounds. Not Nanite. Overdraw cost rises with coverage and stacking. [Epic, Using transparency](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-transparency-in-unreal-engine-materials?application_version=5.8) | Hologram cards and halos. |
| Translucent or AlphaComposite card | Proper darkening and tint. | Per-object sort. Epic's own example shows steam popping in front of and behind spheres until Translucency Sort Priority is set. Same page. | Only where the card must occlude. |
| Emissive deferred decal | Puts a sign-shaped glow on existing walls without new geometry. | Emissive bypasses DBuffer and blends into scene colour after lighting, so it adds no light to Lumen GI (Unverified inference). Cost scales with screen coverage. Decal Actor sort order is per decal. | Wall spill and grime-lit halos. |
| Real light plus light function | Real light on scene geometry and fog, shaped like the sign. | 128 px slot, bilinear, 16 slots, gray default, no per-light variation, setting change for colour. | Spill and projection test. |

### Colour limitations to test, with the 5.8 defaults

- With the gray default, the projected sign is one channel, and the light's own colour tints it. A two-colour sign projected as gray plus a light colour is a one-colour projection. Multi-colour projection needs the RGB format. That is a project setting change, so it needs Mike's approval and an editor run. Not done.
- RGB atlas format uses R8G8B8 per the doc. [Epic] The memory cost at a raised slot resolution is not stated. Measure with the visualizer.
- Light colour times light function colour is the expected output (Unverified). Check that a saturated sign colour under a saturated light colour does not collapse to black.

---

## 2. Lumen, bloom, exposure, noise, and translucency budgets

### Lumen and small emitters

- Emissive materials feed Lumen's Final Gather "with no additional performance cost", but "there's a limit to how small and bright emissive areas can be before they begin to cause noise artifacts". [Epic, Lumen GI and reflections](https://dev.epicgames.com/documentation/en-us/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine?application_version=5.8)
- Small objects are culled from the Lumen Scene, so only screen traces pick up small emissive meshes, and the result is inconsistent. Epic's fix is the component property Emissive Light Source (`bEmissiveLightSource`, advanced, Lighting category). [Epic, Lumen technical details](https://dev.epicgames.com/documentation/en-us/unreal-engine/lumen-technical-details-in-unreal-engine?application_version=5.8) Source confirms the flag lowers the minimum card area to 0.2x. [Source, `Lumen/LumenMeshCards.cpp:128-131`]
- Translucent materials are added as a Lumen card to receive diffuse GI when Hit Lighting for Reflections is used. Same technical page. Front-layer translucency reflections are off in our config (`r.Lumen.TranslucencyReflections.FrontLayer.EnableForProject=False`). Local.
- Proposal. Treat neon tubes as visible emitters. Do not rely on them to light the street. Put real point, rect or spot proxy lights next to large signs, and keep the emissive peak capped so the Lumen GI contribution stays stable. Test the three options Epic and the source give: Emissive Light Source on, the SkipUnlitHits cvar (only matters for Unlit), and a lower emissive peak.

### Bloom and fake glow versus real lighting

- Bloom scales with how far a pixel exceeds the Threshold, with Intensity and five size/tint bands. Standard bloom is cheap; Convolution is "for high-end hardware" and cinematics. [Epic, Bloom](https://dev.epicgames.com/documentation/en-us/unreal-engine/bloom-in-unreal-engine?application_version=5.8)
- Bloom is screen space. It makes a tube look bright and gives no light to walls, fog or characters. Real light needs an actual light (a proxy or a light function).
- Post process materials run before or after the tonemapper. After-tonemapping is the performance default because colour is LDR. [Epic, Post process materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-materials-in-unreal-engine?application_version=5.8)
- Our decision to keep depth of field smooth after the pixel step (2026-10-16) interacts with translucency. Cards in the Standard pass are blurred by depth of field. Cards in the AfterDOF pass stay sharp, which can look wrong against a blurred street. Test both. [Epic Material properties, Source TranslucentRendering.cpp]

Glow tiers to compare (Proposal):

| Tier | What | Notes |
|---|---|---|
| G0 | Emissive HDR plus bloom only. | Cheapest. No second texture. |
| G1 | Halo in the material from a derived mask. | Needs a mask blurred offline or several taps in the shader. The brief says glow comes from materials and source PNGs stay glow-free. A separate derived halo texture still leaves sources untouched, but it is a decision for Mike. |
| G2 | G0 or G1 plus proxy light, and optionally a light function spill. | Real illumination. Highest light cost. |

### Exposure

- Auto Exposure Histogram is the default. Manual metering sets one fixed EV100 unaffected by scene luminance. Brightness before tonemapping is `B = Exposure * L`, and `Exposure = 1/(2^(EV100 + ExposureCompensation))`. [Epic, Auto exposure](https://dev.epicgames.com/documentation/en-us/unreal-engine/auto-exposure-in-unreal-engine?application_version=5.8)
- Proposal. Lock Manual exposure and bloom settings in an unbound post process volume for every comparison capture. Then run a second pass under the project's real auto exposure to see how a night street changes neon brightness. Compare like with like.

### Translucency sorting, overdraw, and visibility budget

- Epic names overdraw as the main translucency cost, and says lit translucency worsens it. Shader Complexity view mode shows it. [Epic, Using transparency](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-transparency-in-unreal-engine-materials?application_version=5.8)
- Translucency Sort Priority is per object; higher draws later. Epic advises fixing a convention (their example reserves 100 for spawned effects). Same page.
- Lit translucency with MegaLights or forward shading uses a front-layer pass that "can add significant overhead ... when there is a lot of forward shaded translucency on screen". [Epic, MegaLights](https://dev.epicgames.com/documentation/en-us/unreal-engine/megalights-in-unreal-engine?application_version=5.8) Unlit additive cards avoid lit translucency entirely.
- Unverified. Instances inside one translucent ISM are probably not sorted against each other. If so, additive (order-independent) cards inside one ISM are safe and alpha-blended ones are not. Test with two overlapping instances.
- Unverified. Translucent cards do not write velocity by default, which can ghost under TSR when they flicker or move. The material has an Output Velocity option. [Epic, Material properties](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-material-properties?application_version=5.8) Test with flicker on.

Visibility budget (Proposal, values set after measurement, not promised):

- Cap per camera view for translucent cards, total translucent screen coverage fraction, maximum overlap depth in Shader Complexity view, number of lights with a light function, and number of proxy lights.
- Run ladders (8, 16, 32, 64 cards; 1, 4, 8, 16 projector lights) in the fixed test scene. Record where the frame time delta leaves noise. Only then write the caps.

---

## 3. Atlas layout, padding, sampling, compression

### Baseline (decided)

Pixelated textures before import, Filter Nearest, Mip Gen NoMipmaps, full colour, 2K max page. Local. Engine enums exist as expected: `TF_Nearest`, `TMGS_NoMipmaps`, `TC_BC7`, `TC_Masks`, `TC_Default` ("BC1 or BC3 with A"). [Source, `Engine/Classes/Engine/TextureDefines.h:156,393-404,487`]

### Nearest sampling

- `VK_FILTER_NEAREST` specifies nearest filtering. [Other primary, Khronos VkFilter](https://registry.khronos.org/vulkan/specs/latest/man/html/VkFilter.html) With nearest, one texel is read per sample, so there is no blending across a tile edge. The remaining risk is a UV that lands one texel over the edge (interpolation or TSR jitter). I found no primary source on TSR jitter against atlas edges. Unverified, test at grazing angles.
- Community advice is consistent that padding and dilated edge colour matter for bilinear and mips. [Community, Khronos forum](https://community.khronos.org/t/texture-filter-and-atlas-image-distortion-problem/76802) That is background only.

### Layout proposals

- Tile origins and sizes are multiples of 4. BC7 uses fixed 4 by 4 texel blocks of 16 bytes. [Other primary, Microsoft BC7](https://learn.microsoft.com/en-us/windows/win32/direct3d11/bc7-format) Aligned tiles avoid blocks that mix two signs.
- Gutter. Baseline 4 px on each side (one full block), filled by extending the tile's edge colour with alpha 0. Wider (8 to 16 px) for the mip experiment. A mip level k averages 2^k source texels, so padding must cover the lowest mip you keep (Unverified reasoning, standard practice).
- Colour under zero alpha. Dilate RGB into the alpha-0 area before any compression or downscale. Blocks that mix transparent and opaque texels would otherwise fit endpoints to arbitrary RGB, and the same issue darkens fringes when averaging. Local prior evidence from the smoke work points the same way (fill only the alpha-0 pixels with nearby colour before the block average). Not a new test.
- Per-tile UVs. Keep aspect ratio. Store a rect (u0, v0, u1, v1) per tile. For the 12-sample test use a uniform grid and compute the rect from the tile index. For the full library use a small rect lookup texture, read with nearest, no mips, and a float format (Proposal). Clamp sampling to the rect inset by half a texel as a guard.
- Page size. 2048 by 2048 is the proposed page. At 4 by 4 that is 512 px cells. Because the pixelation step lowers resolution anyway, choose the target pixel height first (a ladder of 64, 128, 192, 256 px per sign) and pack from that. The decision-making number is pixels per metre on the placed sign, which the brief already treats as a menu (64, 128, 256, 512 px/m).
- Mips. Baseline none. The mip comparison is an experiment only: same atlas with the default mip generation, wider gutter, same cameras, judged at distance for shimmer. Not a change to the project baseline.

### Compression and colour space

| Atlas | Content | UE settings (Proposal) |
|---|---|---|
| Colour atlas | RGB colour, A coverage | sRGB on, `TC_BC7`, Filter Nearest, NoMipmaps, Address Clamp |
| Mask atlas (derived) | R neon emission, G panel face, B segment or glow id, A spare | sRGB off, Masks or BC7 non-sRGB, same sampling |
| Reference copy | Colour atlas uncompressed (`CompressionNone`) | Compare against BC7 on a few signs for edge artefacts |

- Size arithmetic (calculated): 2048 x 2048 RGBA8 is 16 MiB. BC7 stores 1 byte per texel, so 4 MiB. Mips would add about one third.
- Texture import table in the `texture-pipeline` skill already lists Default or BC7 for colour and Masks for non-colour data. Local.
- `TC_Default` compresses to BC1 or BC3 per its enum text. [Source] BC3 is the weaker choice for hard-edged colour, so compare it with BC7 as a test arm (Unverified expectation).
- Premultiplied or straight alpha. Masked cards use alpha as a binary cut, so the mask can be thresholded and the colour channels are never blended. Straight alpha with dilated RGB is the plan.

### Emission information is missing

The libraries ship colour plus a coverage mask. Printed-panel alpha covers the face, so it cannot stand for neon emission (the README says the same). Options for a derived emission mask (Proposal, Mike decides):

1. Hand or scripted classification for the 12 samples only. Save as new files beside the atlas, never over a source.
2. A shader heuristic from saturation and value. Fast, wrong on pastel panels and white tubes.
3. A per-sign mode parameter (all neon, all panel) from instance data. Cheapest, least accurate.

---

## 4. Material variation without a Material Instance per sign

### Documented facts

- ISM groups identical meshes. Draw calls merge. An ISM component shares material and collision across instances. Per-instance Custom Data and Custom Primitive Data "reduce draw calls further by passing data without generating a new dynamic material instance per mesh". [Epic, ISM component](https://dev.epicgames.com/documentation/en-us/unreal-engine/instanced-static-mesh-component-in-unreal-engine?application_version=5.8) Same page: a primitive costs roughly 672 bytes against 64 for a basic instance on the GPU (their figure).
- Custom Primitive Data stores floats on the primitive instead of the Material Instance. It "lowers the number of draw calls for similarly placed geometry". Parameters use "Use Custom Primitive Data" and a Primitive Data Index. [Epic, CPD](https://dev.epicgames.com/documentation/unreal-engine/storing-custom-data-in-unreal-engine-materials-per-primitive?application_version=5.8) The limit is 9 float4, so 36 floats. [Source, `Engine/Public/SceneTypes.h:38-39`]
- Per-instance custom data. `NumCustomDataFloats` on the component, `PerInstanceSMCustomData` stores `NumCustomDataFloats * InstanceCount` floats; batch setters exist (`SetCustomData`, `SetCustomDataValue`, `SetCustomDataById`). [Source, `Engine/Classes/Components/InstancedStaticMeshComponent.h:181-194,298-331`] The material reads it with the PerInstanceCustomData node. The Epic ISM page links to a Per Instance Custom Data tutorial that returned an empty page for me.
- Parameter changes through an MPC are "much more efficient than setting many different parameters on various Material instances". [Epic, MPC](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-material-parameter-collections-in-unreal-engine?application_version=5.8)
- Nanite does not support Translucent. [Epic, Nanite] A quad with an additive hologram material cannot use Nanite. A masked quad can, but two triangles gain nothing from it (Unverified). Plan non-Nanite sign quads and check the 2-triangle cost.

### Community reports (not authoritative)

- Both mechanisms reduce draw calls, with primitive data per component and instance data per instance. [Community, forum tip](https://forums.unrealengine.com/t/tips-custom-primitive-data-and-per-instance-custom-data/1212364)
- One poster reports Custom Primitive Data ignored on an ISM while per-instance data worked (through a vertex interpolator). Same thread.
- One thread reports HISM per-instance values not refreshing in standalone until a new instance was added; the poster traced it to the render-state-dirty flag. [Community](https://forums.unrealengine.com/t/material-custom-primitive-data-not-updating-each-frame-in-standalone-fine-in-editor/491211) The report concerns an earlier version. Test on 5.8 before choosing HISM.

### Proposal

- One ISM per atlas page (and per render path), with `NumCustomDataFloats = 4`:

| Index | Meaning |
|---|---|
| 0 | Tile index into the page |
| 1 | Tint selector or hue offset |
| 2 | Flicker seed and phase |
| 3 | Style bits (look, dead-segment amount) packed as an integer |

- Aspect ratio comes from instance scale on a unit quad, not from a mesh per sign.
- No tick. Flicker, scanline and warm-up come from the Time node inside the material, stepped with `floor(Time * rate)` and a hash seeded by instance data. Local prior (`glitch-screen-effects.md`) records the stepped-time pattern already in `M_LCD_Master`. Global knobs (gritty amount, flicker rate, scanline density, debug time) live in one MPC.
- Deterministic captures. Add an MPC "DebugTime" scalar that replaces Time when it is set to a non-negative value (Proposal). Without it, flicker frames differ between measurement runs.
- Use CPD instead of per-instance data only for values that apply to the whole component (page-wide look).
- Material Instance per look, not per sign. A handful of instances for the matrix in section 6 is fine.
- ISM versus HISM. A few dozen signs need no hierarchy. Start with ISM. Test HISM only if culling or the refresh issue matters.
- Verify batching. Check draw call counts for one ISM against N separate static meshes with N Material Instances. I did not read the 5.8 dynamic instancing code path; the cvar `r.MeshDrawCommands.DynamicInstancing` exists. [Source, `Renderer/Private/SceneRendering.cpp:293`] Unverified what it merges.

---

## 5. Pixelation, palettes, wear

### Local prior evidence (not new tests)

- With no palette and no dither, Pixel8r output equals a box average of each block (mean difference 0.3/255, 2048 to 256). The pipeline shrinks in Houdini instead. `texture-pipeline` skill.
- Pixel8r writes RGB only and weights its generated palette by input alpha. On the smoke sheet, thin dark wisps dropped out of the palette. Fix on record: RGB-only input, alpha from a box downscale, and fill alpha-0 pixels with nearby colour first. Same skill. Palette snapping through a custom LUT "greys muted colours" and was dropped.

### Pixel8r 2.72 metadata (Measured, read only)

I read the installed filter without running it. `sbsrender info` listed the inputs, and I unpacked the archive (a 7z) into a temp folder to read its XML. Nothing was copied into a repo or the source tree.

- Location. The skill says `Development/_assets/_substance/Pixel8r/Pixel8r_2.72.sbsar`. That folder does not exist on this PC. The file is at `C:/Users/GameDevPC0403/Documents/Adobe/Adobe Substance 3D Painter/assets/effects/Filter/Pixel8r_2.72.sbsar` (274,364 bytes, dated 2026-10-08). The skill path needs updating.
- Header. Graph "Pixel8r 2.72", author Victoria Holland, description ends "Single Seat Only License / NOT FOR REDISTRIBUTION". One output, `output`. Input `input` carries the tag `Padding=Extend`.
- Dimensions. `SquarePixelCount` default 256 (slider 0 to 2048, counts across the smallest dimension), or separate `PixelCountX`/`PixelCountY`.
- Downscale Mode. 0 "Nearest Neighbor" (default), 1 "Nearest Softer" ("very similar but reduces apparent noise"). The label says nearest. Our earlier equal-to-box-average measurement does not match that label. Do not trust the label. Re-measure before relying on it.
- Preview filtering. `FilterPreview` default 1 "None"; 2 Bilinear; 3 "N64 3-Point". The label warns not to export with filtering enabled.
- Dither types. 0 None, 1 White Noise, 5 Blue Noise, 2 Bayer, 3 Pattern, 4 Custom Dither Pattern, 6 another built-in pattern. Blend mode 0 Overlay, 1 Soft Light (default), 2 and 3 linear-space variants. Blend Strength default 0.25, Blend Saturation default 0.5, optional grayscale dither from the red channel, mask types None, by Edges, by Flats, custom.
- Quantize type. 1 None (default), 2 Generate Custom Palette [Intensive], 3 Per Channel [Naive Legacy], 4 Lookup Table / Palette. Palette creation space RGB, CIELAB, Oklab (default RGB). Palette apply space RGB, CIELAB, Oklab. Number of Colors default 32. Force Colors None, Darkest Brightest, Black White. Gamma Adjust default 1.
- LUT presets: Amiga, Apple II (two modes), Atari 2600, Commodore 64, Famicom/NES, Gameboy, Gameboy Color, Master System, Web Color, plus Custom LUT (must be 4096 by 4096) and Custom Palette.
- Sizes. `$outputsize` is log2 per axis (the skill already notes this).

What this does not tell us: how the shader treats alpha, whether the output is exactly box-averaged, and how Bayer behaves on flat neon colour. Those need a run.

### Pixelation arms for the 12 samples (Proposal)

| Arm | Method | Question it answers |
|---|---|---|
| P0 | Baseline: alpha-weighted box reduction to the target height, nearest at import | The project baseline. |
| P1 | P0 plus silhouette retention: reduce alpha by box, then threshold at a low cutoff (try 0.25 to 0.35) after a one-pixel dilate, so strokes thinner than a target pixel survive | Do tubes and thin kana strokes disappear at P0? |
| P2 | Pixel8r, palette 32 colours, CIELAB or Oklab, no dither | Does a shared palette unify signs? |
| P3 | Pixel8r, same palette, Bayer, Soft Light, strength near the 0.25 default and one higher value | Does dithering add grit or just noise? |
| P4 | Optional: Nearest Softer without a palette | Does it differ from P0? |

All arms use the same alpha handling as the local fix (RGB-only input, alpha from box, dilated colour under alpha 0). They feed the same atlas builder and the same UE settings.

Readability and silhouette checks (Proposal, no numbers claimed):

- Letter signs SGN_0290, 0151, 0001, 1006 at a ladder of glyph heights (try 12, 16, 24, 32 px). Record the smallest height where each kanji and Latin word stays readable by eye. Mike judges; no metric replaces him.
- Silhouette overlap against the 2K mask after nearest upscale, and thin-stroke survival count. Both are cheap to script later.
- Icons without lettering (0054 fish, 0741 boot, 0070 snake, 0739 design) check silhouette and internal cutouts. The boot and fish were approved at 4K, so any loss of their small marks is a failure signal.
- Dither can fake gradients but can also break text strokes. Judge letter signs separately.

### Restrained display wear (material only)

Wear stays out of source art and out of the atlas. All of it lives in the master as parameters (Proposal):

- Pixel-snapped scanlines. Row index from `floor(uv.y * tileHeightPx)`, one dimmed row every N rows. Needs tile pixel height as a parameter.
- Stepped flicker. `floor(Time * rate)` hashed with the instance seed, a low chance of a dropout frame, a buzz band of small amplitude. Warm-up on ignition optional.
- Dead segments. A hash on a coarse tile-space cell (N px) cuts patches of emission. True tube segments need a derived segment-ID channel (section 3). Start with the cell version.
- Grime and burn-in. Low-contrast noise multiplied into panel colour and emission, sampled in tile pixel space so it stays on the pixel grid. Edge darkening from the mask is a second option.
- Colour fringe on holograms only. Two extra nearest samples offset by one texel (the cost of the glitch work in `glitch-screen-effects.md` applies).
- Each effect gets a 0 to 1 amount. The gritty look is a Material Instance of the same master with higher amounts and a darker panel, not other art.

---

## 6. Proposed material split, variants, names, verification

### Master materials

| Master | Domain and blend | Shading | Reads | Notes |
|---|---|---|---|---|
| `M_SGN_Atlas_Lit` | Surface, Masked | Default Lit | Colour atlas, mask atlas | Baseline. Base Color from the atlas, Emissive = colour x EmissiveMask x strength. Nanite off. |
| `M_SGN_Atlas_Unlit` | Surface, Masked | Unlit | same | Comparison control against the lit master. |
| `M_SGN_Holo` | Surface, Translucent (Additive) | Unlit | Colour atlas, optional mask | Static switches for scanline, fringe, flicker. Variants for Standard pass versus AfterDOF. No depth-test disable. |
| `M_SGN_Decal_Glow` | Deferred Decal, Translucent | n/a | Mask atlas (derived halo) | Emissive only. Receives no DBuffer. Coverage counted against the budget. |
| `M_SGN_LF_Projection` | Light Function | Unlit | A tile of the colour atlas | Atlas-compatible: no world position, depth or UV distortion outside the tile. One instance per projected sign. |

Shared Material Functions:

- `MF_SGN_AtlasUV` takes tile index and returns the rect-clamped UV and the tile pixel size.
- `MF_SGN_Flicker` stepped time, hash, dropout.
- `MF_SGN_Scanline` pixel-snapped rows.
- `MF_SGN_Wear` dead cells, grime, burn-in.
- `MF_SGN_Instance` reads the four per-instance floats.

Static switches live in the masters (UseScanline, UseFlicker, UseFringe, UseWear). Our own glitch note records that a static switch doubles that master's permutations (`glitch-screen-effects.md`, Local, not an Epic claim). Keep the switch count low.

Parameters (Proposal, all 0 to 1 unless noted):

| Group | Parameters |
|---|---|
| Atlas | ColorAtlas, MaskAtlas, TilesPerRow, TileGutterPx, AtlasSizePx |
| Emission | EmissionStrength (HDR scale), PanelEmission, NeonEmission, TintMultiply, TintBlend |
| Wear | Scanline, FlickerAmount, FlickerRate (Hz), DropoutChance, DeadCellAmount, DeadCellSizePx, GrimeAmount, BurnIn |
| Hologram | HoloOpacity, FringePx, PulseRate |
| Global (MPC `MPC_SGN_Global`) | GrittyScale, TimeScale, DebugTime, ScanlineRows, FlickerEnable |

### Minimal useful variant matrix

Fixed inputs. The 12 samples, the baseline pixelation arm, nearest and no mips unless the row says otherwise.

| Run | Axis | Arms |
|---|---|---|
| R1 | Render path | `Atlas_Lit`, `Atlas_Unlit`, `Holo` (3 arms, clean look) |
| R2 | Pixelation | P0, P1, P2, P3 on `Atlas_Lit` (4 arms) |
| R3 | Mips | Off (baseline), on with wide gutter (2 arms) |
| R4 | Look | Clean, Gritty (Blade Runner) on `Atlas_Lit`, and on `Holo` (4 arms) |
| R5 | Glow | G0, G1, G2 on `Atlas_Lit` (3 arms) |
| R6 | Lighting | No spill, emissive decal, spot with gray light function, spot with RGB light function (4 arms). RGB needs the project setting change and Mike's approval. |

That is about 20 captures per camera, not a full cross. Add rows only when a result asks for them.

The gritty Blade Runner look is a look preset, not another art set. It means darker base panels, high emissive contrast with a cap that keeps small tubes out of the Lumen noise range, a non-zero scanline and grime, dead cells, occasional dropout, some haze, and coloured proxy lights. Clean and Gritty share all textures.

### Asset naming and folders (Proposal, destination to be checked before import)

The README says the exact signage destination will be checked. Existing folders under `Content/ProjectRunner` are Animation, Buildings, Characters, Cinematics, LCD, LookTest, Maps, Museum, Trailer, Transition, UI and VFX (listing only). Suggested root `/Game/ProjectRunner/Signage/`:

```
/Game/ProjectRunner/Signage/
  Textures/   T_SGN_Atlas_<Set>_<Arm>_<Page>_C   (colour, sRGB)
              T_SGN_Atlas_<Set>_<Arm>_<Page>_M   (mask, linear)
  Materials/  M_SGN_Atlas_Lit, M_SGN_Atlas_Unlit, M_SGN_Holo,
              M_SGN_Decal_Glow, M_SGN_LF_Projection
              MI_SGN_<Master>_<Look>             (a few, not one per sign)
  Functions/  MF_SGN_*
  Data/       MPC_SGN_Global
  Meshes/     SM_SGN_Quad_01
  Maps/       L_SGN_Lab
```

`<Set>` is `S12` for the 12-sample test. `<Arm>` is `P0`..`P4`. Atlas page and rect tables are generated from `sample_selection.json`, never from copies of the PNGs. The builder script lives with the Graphics tools. The rect table and settings are saved so each atlas can be rebuilt. Rejected outputs are listed, checked for references, and removed only with approval.

### Verification and measurement plan

Same scene, camera set and sample set for every arm.

Setup (Proposal).

- One lab map with the 12 signs on a fixed street mock-up. Four fixed cameras: wide street, medium cluster, close readability at 1 texel per screen pixel, grazing angle.
- Locked exposure and bloom volume. Fixed time via the `DebugTime` MPC value. Same resolution, `r.ScreenPercentage` and TSR settings. Record GPU, driver, engine build and the relevant `r.*` values with each result.
- Control capture with no signs, then one capture per arm.

Visual checks.

- Pixel inspection at 1:1 and 4x zoom for edge bleed (look at tile borders with nearest) and for missing strokes.
- Readability ladder for the lettered signs.
- Flicker, grit and holo checked in motion under TSR for ghosting.
- Light function visualizer (`ShowFlag.VisualizeLightFunctionAtlas 1`, Epic) to confirm each projector is in the atlas and to see slot resolution.

Performance.

- `stat unit` and `stat gpu`, plus Unreal Insights for CPU draw call and render thread cost. Names of the GPU categories need confirming in the editor. I have not verified them in 5.8.
- Warm up, record N frames per arm, and report median and 95th percentile frame time and the deltas against the control. Repeat three runs. Note run-to-run variance. No pass or fail threshold is chosen yet.
- Instancing check. Draw count for one ISM of N signs against N static meshes with N Material Instances.
- Shader Complexity view for translucent overdraw. Toggle decals and light functions in turn and compare `stat gpu` (Epic suggests this for decals).
- Lumen noise check. Look at GI on nearby walls with each emissive option from section 2.

## What still requires UE testing

Everything below is an expectation until a run proves it.

1. A masked emissive quad reads atlas tiles without bleed at tile edges under TSR and nearest.
2. BC7 against uncompressed on dilated tile edges.
3. Mip-on shimmer and bleed against the baseline (experiment only).
4. Unlit versus Default Lit emissive in Lumen GI, and whether the SkipUnlitHits cvar helps or matters.
5. Lumen stability with tubes at several emissive peaks, with and without Emissive Light Source.
6. Additive cards in the Standard pass versus AfterDOF against the project's depth of field.
7. Whether instances inside one translucent ISM sort, and whether translucent cards ghost under TSR.
8. PerInstanceCustomData and CPD behaviour on ISM and HISM in 5.8 (the forum reports).
9. Draw call merging for one ISM versus per-sign Material Instances.
10. Light function projection: slot resolution, bilinear softness, colour with the RGB format, slot count, and the shadow-casting question.
11. Emissive decal behaviour on Nanite walls, and whether it affects Lumen GI.
12. The Pixel8r behaviours in section 5, including the alpha handling and whether Nearest Neighbor equals a box average.
13. Every performance figure.

## Decisions for Mike

1. Who authors the derived emission and segment masks for the sample set, and may a derived halo texture exist given "glow from materials"?
2. May the project switch the Light Function Atlas format to RGB for the lighting test? It is a project-wide setting.
3. Is the atlas page size a flat 2048 grid for the sample set, or a packed layout from a target pixel height?
4. Update the Pixel8r path in the `texture-pipeline` skill (the old path is gone on this PC)?
5. Is a lit Default Lit emissive material acceptable as the baseline instead of Unlit?

## Sources

Epic (UE 5.8 pages unless noted):

- https://dev.epicgames.com/documentation/en-us/unreal-engine/using-light-functions-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/megalights-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/lumen-technical-details-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/bloom-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/auto-exposure-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-materials-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/material-blend-modes-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-material-properties?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/using-transparency-in-unreal-engine-materials?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/decal-materials-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/nanite-virtualized-geometry-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/instanced-static-mesh-component-in-unreal-engine?application_version=5.8
- https://dev.epicgames.com/documentation/unreal-engine/storing-custom-data-in-unreal-engine-materials-per-primitive?application_version=5.8
- https://dev.epicgames.com/documentation/en-us/unreal-engine/using-material-parameter-collections-in-unreal-engine?application_version=5.8

Other primary:

- https://learn.microsoft.com/en-us/windows/win32/direct3d11/bc7-format
- https://registry.khronos.org/vulkan/specs/latest/man/html/VkFilter.html

Community (not authoritative):

- https://forums.unrealengine.com/t/tips-custom-primitive-data-and-per-instance-custom-data/1212364
- https://forums.unrealengine.com/t/material-custom-primitive-data-not-updating-each-frame-in-standalone-fine-in-editor/491211
- https://community.khronos.org/t/texture-filter-and-atlas-image-distortion-problem/76802

Engine source files read (under `C:/Program Files/Epic Games/UE_5.8/Engine/Source/Runtime`):

- `Renderer/Private/LightFunctionAtlas.cpp`, `LightFunctionAtlas.h`
- `Renderer/Private/Lumen/LumenSceneDirectLighting.cpp`, `LumenScreenProbeTracing.cpp`, `LumenMeshCards.cpp`
- `Renderer/Private/TranslucentRendering.cpp`, `SceneRendering.cpp`
- `Engine/Private/Materials/HLSLMaterialTranslator.cpp`, `MaterialShared.cpp`
- `Engine/Classes/Components/InstancedStaticMeshComponent.h`, `Engine/Classes/Engine/TextureDefines.h`, `Engine/Public/SceneTypes.h`

Local files read: `ProjectRunner/BRIEF.md`, `texture-pipeline/SKILL.md`, `Graphics/signage/atlas_tests/{README.md,source_inventory.json,sample_selection.json}`, `Unreal/Config/DefaultEngine.ini`, `proj-docs/ProjectRunner/research/glitch-screen-effects.md`, `Pixel8r_2.72.sbsar` (metadata only).

## Parent review and offline results, 2026-11-04

The decisions above are research proposals, not additional approval gates. The first test will stay within the authorized scope: a uniform sample grid, whole-art emission with lower intensity for backlit panels, bloom from material emission, and both lit and unlit comparisons. It will not add a halo texture or change the Light Function Atlas format. RGB projection remains deferred. The discovered Pixel8r path is recorded in the local build script; no shared skill change is needed for this test.

The parent built eight atlases in `C:/Prod/ProjectRunner/Graphics/signage/atlas_tests/generated`, using the CPU Substance engine with two cores. The four treatments are box, plain Pixel8r, generated palette with 32 requested colours, and the same palette settings with Bayer dithering. The native page sizes are 512 and 1024, with 128 and 256 pixels per cell. The 2K page is an intermediate only. The final UE destination is `/Game/ProjectRunner/VFX/Signage/`, correcting the earlier proposal outside VFX.

All outputs share coverage alpha and have transparent tile boundaries. Source hashes are unchanged. `validation.json` passed for 12 sources and eight outputs. `atlas_manifest.json` stores parameters and hashes; the README describes the colour-extension and palette-weighting limitations.

Plain Pixel8r was measured against box and nearest on near-opaque pixels of the same RGB input. Its mean absolute errors against box were 0.064 at 512 and 0.000 at 1024, on a 0 to 255 byte scale. This supports the older local box-like finding for these settings only. It does not prove full-image equivalence. Palette and Bayer outputs use independently generated palettes; at 512 their visible colour sets differ, so this is not yet a fixed-palette dither experiment.

At the offline stage, the parent inspected the alpha-composited review images. Main silhouettes remained recognizable; low-resolution fine lettering needed in-engine judgment. Engine results follow below.

## Engine results, 2026-11-04

After Mike released the editor, the parent imported all eight atlases and built five masters and twenty material instances in UE 5.8.4. The saved `L_SGN_Lab` contains texture comparisons, clean/gritty neon, panels and holograms, two emissive decals and two grayscale spotlight projections. The project Light Function Atlas format remains unchanged. The lighting test takes its cyan colour from the spotlight.

The first implementation uses nine per-sign floats for the UV rectangle, RGB tint, emission and seed. Wear parameters belong to each shared look instance. This replaces the earlier four-float proposal because the test preserves variable artwork rectangles and independent RGB tint. Clean instances disable the effect branch with a static switch. No Material Parameter Collection was needed for this isolated test; each look has a fixed-time override for controlled comparisons.

The parent verified all 120 card payloads and twelve ISM payloads after reopening the saved map. A fresh Blueprint placement inherited twelve instances and 108 custom-data values. The existing group also retained them in simulation. Evidence lives in `C:/Prod/ProjectRunner/Unreal/Saved/SignageEvidence/engine_verification.json`, `blueprint_spawn_verification.json` and `runtime_verification.json`. Compiler statistics exist for the materials; no GPU frame-time claim follows from those counts.

The projection test exposed two setup details. A square artwork rectangle needs space inside the circular spotlight cone, so the light-function graph scales its coordinates and masks outside the artwork. Rotation and scale also need separate treatment for decals and lights. The local engine source, `Renderer/Private/LightFunctionRendering.cpp` and `LightFunctionAtlas.cpp`, swaps the light-function scale X and Z axes so user Z affects depth. The lab uses user X for the graphic's width after its projector rotation.

The rendered test confirms upright signs, shared-atlas selection, material wear and real wall projection. Whole-art emission is still a prototype choice; the source library does not distinguish luminous tubes from printed colour. Mike's visual selection, representative-level GPU profiling, TSR motion, grazing angles and hologram depth of field remain open. No generated treatment or source version has been removed.
