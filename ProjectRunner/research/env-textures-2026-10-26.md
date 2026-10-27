# ProjectRunner environment textures: documentation findings

Date: 2026-10-26. Scope: Substance Designer 11.2.2 (engine 8.1.0) and Unreal Engine 5.8. This file records what the primary docs say and lists checks to run. It makes no art decisions.

## Summary

- Epic's 5.8 pages confirm sRGB off for any packed non-colour data and sRGB on for base colour. They name BC7 as a good fit for packed masks.
- The 5.8 compression page would not load, so the "Masks" and "Normalmap" setting names come from the 4.27 page. Confirm them in the 5.8 editor dropdown.
- Epic documents no engine-wide normal convention. Only the Fortnite page names DirectX. Designer's own default is DirectX.
- Designer sizes are powers of two per axis, so 2048x3072 is not a direct Designer output. Unreal accepts 2048x3072 and turns mips off for it on import.
- A "2K limit" appears in Epic's Fortnite page only. The Unreal texture pages list no 2K cap.
- Epic documents no trim-sheet gutter rule. Adobe says padding matters for mips but gives no pixel count. The gutter math below is derived, not cited.
- Adobe's pages are the current Experience League versions. Their stamps are newer than Designer 11.2.2, so limits and node options may differ in 11.2.2.

## 1. Base colour versus light and shadow

- Epic: base colour describes the surface, not its lighting. Each channel is clamped to 0..1. Listed non-metal extremes are charcoal 0.02 and fresh asphalt 0.02 at the dark end, fresh snow 0.81 at the bright end. [Physically Based Materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/physically-based-materials-in-unreal-engine)
- Epic: a cavity map is "typically an AO map with very short trace distance". Epic multiplies it into base colour and specular as a separate step. Same page.
- The fetch did not state whether the listed values are linear or sRGB, and it did not state a page version. Check the page in a browser before using the numbers as pass/fail limits.
- The existing mask has AO in B. If the base colour also carries baked shading, the AO applies twice.

Checks:
1. Per strip, record min, max and mean luminance of the base colour. Flag a strip that sits outside the Epic range for its material.
2. Render the kit with only an ambient light and with a directional light. Compare against the same view with the base colour alone. Any shadow shape that survives with the light off is baked into the colour.
3. Compare the lit result with AO-from-mask on and off. A visible double darkening means AO is in both places.

## 2. Normal maps and sRGB

- Designer: normal maps use DirectX or OpenGL, set in Project settings, default DirectX. Several nodes expose their own switch. [Project settings](https://experienceleague.adobe.com/en/docs/substance-3d-designer/using/workspace/preferences/project-settings)
- Adobe: the formats differ in green channel direction. OpenGL is Y+ (bottom-up) and DirectX is Y- (top-down). The page names no engine. [OpenGL vs DirectX](https://experienceleague.adobe.com/en/docs/substance-3d/bakers/common-questions/what-is-the-difference-between-the-opengl-and-directx-normal-format)
- Epic: Fortnite assets use DirectX normals, set as "Normal DirectX" when exporting from Painter. [Fortnite-ready assets](https://dev.epicgames.com/documentation/fortnite/fortniteready-assets-best-practices-in-fortnite) I found no page that states the convention for general Unreal materials. The project's existing rule (DirectX, Flip Green Channel off) matches the Fortnite page but is not backed by a general Epic statement.
- Epic: Flip Green Channel "inverts" the green channel and "is useful for some normal maps". [Texture Asset Editor, 5.8](https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-asset-editor-in-unreal-engine) The Interchange import has Flip Normal Map Green Channel and Detect Normal Map Texture. Detect adjusts SRGB, Compression Settings and LOD Group when it finds a normal map. [Interchange import reference, 5.8](https://dev.epicgames.com/documentation/en-us/unreal-engine/interchange-import-reference-in-unreal-engine)
- Epic: sRGB "should be unchecked if using alpha channels individually as masks". Texture Asset Editor page above. Epic's masks page says to uncheck it for packed masks, and warns that a material fails to compile until its sampler type changes from Color to Linear Color. [Using Texture Masks, 5.8](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-texture-masks-in-unreal-engine)
- Compression names: the 4.27 page lists Normalmap (BC5 on DX11), Masks (no sRGB, DXT1/5), Grayscale, Alpha (BC4) and BC7. [Texture Compression Settings, 4.27](https://dev.epicgames.com/documentation/unreal-engine/texture-compression-settings?application_version=4.27) The 5.8 Texture Asset Editor page names BC7 and does not list Masks or Normalmap.

Checks:
1. Build a test normal map with a raised bump lit from one known side. Light it in Unreal from that side. A bump that looks dented means the green channel is wrong. Run once with Flip Green Channel off and once on to see both.
2. Read back the imported asset settings (the project's report JSON): normal map has sRGB off and a normal compression setting, base colour has sRGB on.
3. Put a flat tile (128,128,255) in the normal strip. It must render as a flat surface with no shading change under a moving light.
4. For the packed mask, import a 0..1 ramp in each channel with sRGB on and off. With sRGB on, 0.5 reads back near 0.21 when shown as a linear value. With it off, 0.5 reads 0.5.

## 3. Packed ORM and the existing mask

- The existing mask is R tint ID, G grunge, B AO. It has no roughness or metallic.
- Epic: roughness and metallic are 0..1. Metallic is treated as mostly binary: "either 0 or 1, not anything in between", with in-between values for hybrids such as corroded metal. [Physically Based Materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/physically-based-materials-in-unreal-engine)
- Epic names no required channel order for ORM. Order is whatever the material graph wires. The Fortnite page uses its own order (R specular, G metallic, B roughness). Fortnite page above.
- Epic: packing is "the preferred method" for masks, but adding an alpha channel "will greatly increase the memory footprint". Using Texture Masks page above. It adds that the green channel often compresses best because of DirectX, and suggests moving a mask that shows artifacts to G and then to alpha.
- Epic: BC7 is a good fit for images that do not encode well in BC1, such as packed masks, at twice the bytes of BC1. Texture Asset Editor page above.

Checks:
1. List every channel the kit needs: tint ID, grunge, AO, roughness, metallic. Five values do not fit in RGB. Decide between a second texture and an alpha channel by measuring the memory of each at 2048x2048 and 2048x3072.
2. Put the most compression-sensitive data in G in a trial pack, then compare its error against the same data in R and B after BC7.
3. Compare metallic as a binary 0/1 channel against a 0..1 channel, on a kit with only a few metal parts.

## 4. Categorical IDs and compression

- Epic: DXT compression packs pixels into 4x4 blocks and is lossy. [Texture Format Support, titled 5.8 but written for UE4](https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-format-support-and-settings-in-unreal-engine) The page gives no statement about categorical data. The risk below is an inference from the block size.
- Inference: a tint ID changes value at region edges. A 4x4 block that holds two IDs can decode to an in-between value, which a material that looks up the ID would read as a third ID.
- Mips average neighbouring IDs the same way. With mips off this does not apply.

Checks:
1. Make a test mask with eight ID values and sharp edges, each region at least 1 texel wide. Import it as BC7 and as uncompressed. Show R through a material that rounds it to the nearest ID and colours each ID. Count texels that differ from the source false-colour image.
2. Repeat with IDs on evenly spaced values and with the nearest-ID rounding at several tolerances, to see how much error the lookup absorbs.
3. Repeat with mips on and Filter Nearest, to confirm that mips alone damage the IDs.

## 5. Trim sheet layout, gutters and mip bleeding

Layout: 512 + 384 + 256 + 256 + 256 + 128 + 8x32 = 2048 px, at 1024 px per metre. Every strip edge falls on a multiple of 32.

- Epic: Mip Gen Settings include SimpleAverage (a 2x2 average, the default), Sharpen (8x8 kernel), Blur, Unfiltered, Angular, LeaveExistingMips and NoMipMaps. [Texture Properties, 4.27](https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-properties?application_version=4.27) and Texture Asset Editor page above.
- Adobe: padding "is very important for mipmaps as it avoids incorrect colors to bleed inside the UVs" at lower resolutions. [Texture dilation or Padding](https://experienceleague.adobe.com/en/docs/substance-3d-painter/using/technical-support/workflow-issues/export-issues/texture-dilation-or-padding) The page gives no pixel count. Bakers' Dilation (px) and Apply Diffusion say the same. [Common Parameters](https://experienceleague.adobe.com/en/docs/substance-3d/bakers/bakers-settings/common-parameters) Painter's export padding offers infinite dilation, a set-distance dilation and a diffusion fill. [Export settings](https://experienceleague.adobe.com/en/docs/substance-3d-painter/using/export/export-window/export-settings)
- Epic documents no trim-sheet gutter rule. The numbers below are derived from the 2x2 average.

Derived (not cited): with a 2x2 average, mip level k combines 2^k source texels per axis. Strip edges at multiples of 32 stay clean through mip 5, where a 32 px strip becomes 1 texel. At mip 6 and above, the 32 px strips blend with their neighbours. A strip or an island whose edge is not a multiple of 2^k blends at mip k. Each strip spans the full width, so the horizontal tiling seam is not affected by strip-to-strip bleed.

Nearest with no mips (the settled Runner look):
- No mip bleeding is possible, because there are no mips.
- Minification aliasing is the risk. When one screen pixel covers more than one texel, Nearest picks a texel at random and the result shimmers while the camera moves.
- 1024 px/m means one texel is about 1 mm. A 32 px strip is about 3 cm tall, and it will be sub-pixel at long range.
- Epic does not say how Filter Nearest picks a mip when mips are on. Test it.

Checks:
1. Build a strip test texture where each strip is a flat distinct colour. Show it on a quad with UV rows at the middle of each strip and 1 texel from each edge. Step Mip Gen on, then use LOD Bias 0 to 7 (the Combined LOD Bias field reports the value). Record the first bias where a colour changes. The derivation predicts mip 6 for the 32 px strips, and later for the thicker ones.
2. Do the same with an island that is not aligned to 32 px, with padding of 0, 2, 4 and 8 px, to find the least padding that survives the lowest mip the project uses.
3. With Nearest and NoMipMaps, dolly a camera along a floor. Record the distance where the texel-to-pixel ratio passes 1, and watch a 32 px strip for shimmer. Capture a short video at the Runner camera distance.
4. Compare Nearest + NoMipMaps against Nearest with mips and against bilinear with mips. These are the options for the initial style comparison. Use the same source files for all three, as the texture-pipeline skill does for the smooth set.

## 6. Designer subgraphs, SBSAR and SBS

- Adobe: a graph instance is a node that references another graph. It makes a graph reusable "in one or more graphs, even across different packages". Drag a graph from the Explorer to create an instance. "Create graph from selection" splits nodes out into a new graph. [Graph instances and subgraphs](https://experienceleague.adobe.com/en/docs/substance-3d-designer/using/substance-graphs/graph-instances-sub-graphs)
- Adobe: "Exposed in SBSAR" in the graph properties controls whether a subgraph is published. Same page.
- Adobe: an instance loaded from an SBS shows a dark red label and "Open reference" opens its source. An instance loaded from an SBSAR shows a green label and cannot be inspected, "since they're already compiled". "Load package" lists the exposed graphs and parameters. Same page.
- Adobe: SBSAR is "a one-way file format" and you "cannot 'decompile'" it to SBS. You can use SBSAR contents as nodes in new graphs. Published files embed all resources and keep exposed parameters adjustable. [Publishing SBSAR](https://experienceleague.adobe.com/en/docs/substance-3d-designer/using/substance-graphs/publishing-substance-3d-asset-files-sbsar)
- Adobe: Designer 11.2.2 (2021-09-28) ships Substance engine 8.1.0. Materials work "in applications which support the same version of the substance engine or a newer one". [Substance engine versioning](https://experienceleague.adobe.com/en/docs/substance-3d/general-knowledge/ecosystem/substance-engine-versioning) This matches the texture-pipeline skill: an SBSAR built by Designer 12 or newer may not load in 11.2.2. The Houdini engine number (9.1.3) comes from the skill and I did not check it.
- Adobe's instance page does not say how an edit to a subgraph reaches existing instances. Test it.

Checks:
1. Make a new `.sbs` with a small subgraph, instance it twice at different output sizes, edit the subgraph, and confirm both instances update. This covers the propagation gap.
2. Instance an owned `.sbsar` as a node and confirm its label, its exposed parameters, and that the inner graph cannot be opened.
3. Cook and render a kit `.sbs` with `sbscooker` and `sbsrender`, as the skill describes, and confirm the output sizes. Keep helper subgraphs unexposed if you publish.
4. Where an `.sbsar` fails to load in 11.2.2, record the file name and its engine version.

## 7. Output size: 2048 x 3072 road sheet and "2K"

- Designer: sizes use logarithmic steps and so are powers of two. The current page's table runs from 128 to 8192. The cap is set by the Cooking Size Limit preference. The page implies width and height can differ (a lock button matches height to width, and examples show 1024x512). [Output size](https://experienceleague.adobe.com/en/docs/substance-3d-designer/using/substance-graphs/output-size)
- Designer: Bitmap nodes default to Absolute size. Graphs default to Relative to parent. Same page.
- The Output size page is the current one, so 11.2.2's table and cap may differ.
- Result: a graph cannot produce 3072 in one axis. The options to test are 2048x4096 with an unused band, two sheets (2048x2048 and 2048x1024), or a 2048x4096 render cropped in Houdini.
- Epic: non-power-of-two textures get Mip Gen Settings set to NoMipMap on import. Mips can be turned back on. "Power of 2 textures are required to stream". The top mip must be a multiple of 4 to compress. [Texture Asset Editor, 5.8](https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-asset-editor-in-unreal-engine) 3072 is a multiple of 4.
- Epic: "Maximum Texture Size ... A value of 0 means the maximum size for the format on each platform." Same page. Virtual textures can be imported up to 32768x32768 without UDIM. Same page. An older page says 8192x8192. [Texture Format Support](https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-format-support-and-settings-in-unreal-engine)
- Epic: "All texture maps should have a size/resolution of 2k or less." This is on the Fortnite page, so it is a Fortnite rule. It is not an Unreal Engine limit. [Fortnite-ready assets](https://dev.epicgames.com/documentation/fortnite/fortniteready-assets-best-practices-in-fortnite) If the project has its own 2K limit, it comes from the brief.
- Size math: 2048x3072 is 6,291,456 texels, about 6 MB in BC7 and about 3 MB in BC1 with no mips. 2048x4096 is a third larger.

Checks:
1. Render a 2048x4096 sheet with `sbsrender` using `$outputsize@11,12` and confirm the file size.
2. Import a 2048x3072 PNG into UE 5.8. Confirm Mip Gen becomes NoMipMap, the texture compresses, and the report shows its streaming state and memory.
3. Compare memory and load of one 2048x3072 against 2048x4096, and against two sheets.

## Gaps and limits

- Epic's 5.8 "Texture Compression Settings" page loaded as an empty table of contents. The setting names come from 4.27.
- Epic's 5.8 Virtual Texturing pages say nothing about Nearest filtering or non-power-of-two source textures.
- No page gave a trim-sheet gutter size or an NPOT mip rule beyond the quotes above.
- Adobe's `helpx.adobe.com` pages returned 403. Every Adobe citation above is the Experience League copy that loaded. The 11.2 release notes loaded for 11.2.0 only.
- Designer's colour management page (sRGB handling for 8-bit outputs) was not fetched.
- The Unreal editor MCP failed to connect, so nothing here was checked in the editor.
- Pages marked 5.8 were marked by the page title, as the fetch tool read it.
