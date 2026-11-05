# UI vector assets for UE 5.8 on PC and Steam Deck

Researched 2026-11-02. Documentation review only. Nothing here was tested in Unreal, built, installed or imported. Every recommendation is a proposal, not a project decision.

## How to read this report

- "Epic doc" means a page on dev.epicgames.com that the site serves under "Unreal Engine 5.8 Documentation" on 2026-11-02. That site header does not prove a page was written or checked for 5.8. Where a page carries no version of its own, the entry says so.
- "5.8 install" means a file I read (not ran) in the local UE 5.8 install at `C:\Program Files\Epic Games\UE_5.8\Engine`. That is the strongest evidence for what 5.8 contains, and it only shows what exists, not how it behaves.
- Claims I could not source are marked **Gap** or **Inference**.
- Context from the project: `BRIEF.md` (Updated 2026-11-02) bans experimental plugins in the main project, sets controller prompts as a four-dot diamond with the pressed position filled, keyboard prompts as the key, and prompts that follow the last device used. The brief's nearest filtering and no-mips rule covers pixelated world textures only, and this report does not carry it into smooth UI. The 2026-10-21 UI pass (tasks archive, section "UI pass and hacking minigame") records fonts, subtitle sizes and prompts, and mentions a C++ draw file (`PRUIDraw.cpp`). The parent review subsequently read the Canvas drawing code; see the integration note below.

## Short answer

1. My proposed default is PNG imported as Texture2D for static artwork, native text for labels, and widgets or UI materials for adjustable shapes. Keep editable vector originals and SVG exports. Epic documents PNG texture import; it is not the only supported image format.
2. Vector sources let you regenerate sharp artwork at new sizes. Runtime performance and accessibility depend on the renderer and UI implementation. Slate's SVG path rasterizes and caches bitmaps at requested pixel sizes; it does not redraw every vector path every frame.
3. Epic ships a native SVG brush API in Slate, but I found no complete packaged-game guide or ordinary UMG SVG asset workflow. The separate SVG Importer plugin targets geometry and is flagged Experimental and Beta. Only that plugin conflicts with the brief's experimental-plugin rule; that label does not apply to every Slate vector brush.
4. EPS has no import path in Epic's documented 5.8 texture format list. Convert it outside Unreal.
5. Steam Deck's screen reader is a SteamOS feature for Steam's own UI. Valve's announcement does not say it reads a Windows game running under Proton. Epic's documented screen reader support targets Windows, and I found no source that it works under Proton. Treat Deck screen reader support for the game as unverified.

## Proposed default and alternatives

Proposed default for Runner: author in a vector tool, export separate PNG layers sized for their maximum intended display size, import as UI textures, tint at runtime, keep text as live `FText`, and resolve prompts from input mappings. This is a proposal, not a change to the project.

Runner currently draws gameplay UI and menus through Canvas. The parent review read [PRHUD.cpp](C:/Prod/ProjectRunner/Unreal/Source/RunnerSandbox_01/Private/PRHUD.cpp:328) and [PRUIDraw.cpp](C:/Prod/ProjectRunner/Unreal/Source/RunnerSandbox_01/Private/PRUIDraw.cpp:96). C++ drawing does not mean it uses Slate widgets. UMG DPI rules, Common UI controls and the Slate accessibility tree would need integration or an equivalent custom implementation. PNG imports can still be used by Canvas. No project code was changed.

| Option | What it is | Fit | Main risk |
|---|---|---|---|
| A. Vector source, PNG runtime (default) | SVG/AI/Figma authored, PNG exported, Texture2D in UMG | Stable, documented, works with Common UI and Deck | Fixed pixel size per export; needs a plan for 1080p, 800p and 4K |
| B. Slate SVG brush | `.svg` files rasterized at the requested pixel size and cached in an atlas | Custom Slate integration; Runner's current Canvas HUD would need adaptation | API exists; file staging and packaged behaviour remain unverified |
| C. Epic SVG Importer plugin | Experimental plugin that turns SVG into 3D actors and meshes | World-space vector art, not UMG | Experimental and Beta; violates brief; not a UMG route |
| D. Third-party UMG SVG plugin | A vendor plugin with an SVG asset and UMG widget | Would give a real UMG vector widget | Vendor doc deleted; 5.8 and Linux/Proton support unverified |
| E. Rive | Vector animation runtime with its own state machines | Complex animated or interactive artwork | The documented 5.7.3+ range includes 5.8; no project test. Added authoring workflow and runtime; accessibility bridge unconfirmed |
| F. UI materials | Material in the User Interface domain drawing shapes, strokes, gradients | Procedural bars, glows, timers | Epic says prefer textures over materials; SDF use is custom work |
| G. NoesisGUI | Vector UI framework using XAML, with Unreal integration | A larger move to vector-based UI authoring | Maintainer explicitly lists UE 5.8; new framework and licensing decision, no project or Deck test |

## Three layers that people mix up

| Layer | Meaning | Examples | Notes |
|---|---|---|---|
| Source authoring format | What artists edit | SVG, AI, EPS, Figma, Affinity, PSD | Free to choose. Unreal never needs to read these if you export. |
| Import conversion | What turns a source into an Unreal asset | PNG/PSD/TGA to Texture2D; SVG Importer plugin; vendor plugin; Rive `.riv` import | EPS has no first-party conversion. |
| Runtime representation | What the GPU or Slate actually draws | Texture2D bitmap; Slate bitmap rasterized from SVG; dynamic mesh; Rive render target; UI material | The runtime form decides cost and scaling behaviour, not the source format. |

## Version verification

| Source | What it covers | Version it supports | How I checked | Gap |
|---|---|---|---|---|
| [UE 5.8 release notes](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-5-8-release-notes) | 5.8 changes | 5.8 | Fetched and searched the full page | Contains no entry mentioning SVG. It lists "Bring Common UI out of beta, it is now production ready", a "Unified Input System: Common UI and Enhanced Input" section, `FCommonInputTypeInfo::AdditionalKeys`, and the `CommonUI.TextGlobalScaling` console variable. |
| [SVGImporter API index](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Plugins/SVGImporter), [USVGData](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Plugins/SVGImporter/USVGData), [FSVGImporterUtils](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Plugins/SVGImporter/FSVGImporterUtils) | Plugin classes | Pages titled "Unreal Engine 5.8 Documentation" | Fetched; confirmed against `SVGImporter.uplugin` in the 5.8 install (Category "Experimental", `IsBetaVersion` true, `DocsURL` empty) | API reference only. No usage guide found. |
| 5.8 install: `SlateCore` (`SlateBrush.h`, `SlateImageBrush.h`, `SlateVectorGraphicsCache.h`, `SlateSVGRasterizer.cpp`, `SlateStyleMacros.h`) | Slate SVG brush path | 5.8 | Read the files | Source shows what exists, not packaged behaviour. [FSlateVectorImageBrush](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/SlateCore/FSlateVectorImageBrush) API page has no description. |
| [Supporting Screen Readers](https://dev.epicgames.com/documentation/en-us/unreal-engine/supporting-screen-readers-in-unreal-engine), [Blind Accessibility Features Overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/blind-accessibility-features-overview-in-unreal-engine) | Screen reader plugins | Page titled 5.8; text describes UE 5 era | Fetched; plugin descriptors in the 5.8 install are `Experimental/TextToSpeech`, `ScreenReader`, `SlateScreenReader`, version 0.1 | The first page is labelled Experimental: "use caution when shipping with it". No Proton statement. |
| [Common UI Quickstart](https://dev.epicgames.com/documentation/en-us/unreal-engine/common-ui-quickstart-guide-for-unreal-engine) | Input action tables and controller data | Titled 5.8, but the steps describe separate Common UI data tables | Fetched | **Gap.** The 5.8 notes say Enhanced Input and Common Input/UI are now unified and "removes the need for duplicate data assets". The quickstart may be stale for 5.8. I did not find an updated guide. |
| [DPI Scaling](https://dev.epicgames.com/documentation/en-us/unreal-engine/dpi-scaling-in-unreal-engine), [User Interface settings](https://dev.epicgames.com/documentation/en-us/unreal-engine/user-interface-settings-in-the-unreal-engine-project-settings), [Font DPI Scaling](https://dev.epicgames.com/documentation/en-us/unreal-engine/font-dpi-scaling-in-unreal-engine) | Scaling | Titled 5.8 | Fetched. The settings page lists six rules including Scale to Fit and Custom; the shorter DPI Scaling page lists four. | Pages disagree on the rule list; the settings page is the fuller one. |
| [Textures in Unreal Engine](https://dev.epicgames.com/documentation/en-us/unreal-engine/textures-in-unreal-engine), [Texture Asset Editor](https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-asset-editor-in-unreal-engine) | Import formats, properties | Titled 5.8 | Fetched. Enum and device profile read in the 5.8 install (`TextureDefines.h`, `BaseDeviceProfiles.ini`). | The two pages disagree about non-power-of-two mips (see PNG section). |
| [Steamworks: Steam Deck and Steam Machine compatibility](https://partner.steamgames.com/doc/steamhardware/compat), [Getting your game ready](https://partner.steamgames.com/doc/steamdeck/recommendations), [Accessibility features](https://partner.steamgames.com/doc/accessibility_features), [ISteamInput](https://partner.steamgames.com/doc/api/isteaminput) | Deck rules | Current Steamworks pages on 2026-11-02; no engine version | Fetched | Pages carry no revision date. |
| [Valve: New accessibility settings in Beta](https://steamcommunity.com/ogg/593110/announcements/detail/824835185591718586) | Steam Deck accessibility | Dated 2025-06-19 (Steam news API timestamp 1750292147) | Fetched through the Steam news API | A Steam Client Beta post from 2025. I did not find a later official statement. |
| [Xbox Accessibility Guidelines v3.2](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines) | Guidelines | Version 3.2 published 2023-06-08; page last updated 2026-08-14 | Fetched index and guidelines 101, 102, 103, 106, 107, 116, 117 | Guidelines are not a compliance checklist, per Microsoft's own intro. |
| [Rive Unreal overview](https://rive.app/docs/game-runtimes/unreal/unreal.md), [Getting started](https://rive.app/docs/game-runtimes/unreal/getting-started) | Rive runtime | Overview says 5.7.3 and above; getting started says 5.6 or above | Fetched | The pages disagree on the minimum version. Both stated ranges include 5.8, which is documented-range support rather than a project compatibility test. An earlier search snippet mentioned a paused rewrite of the plugin; I could not find that text on the current pages. |
| [UMG SVG forum post](https://forums.unrealengine.com/t/txc-stock-umg-svg-svg-importer/2706826) | Vendor plugin | Post dated 2026-03-17; no version stated in the post | Fetched | The vendor documentation Google Doc returned HTTP 410 (deleted) on 2026-11-02. A search snippet said 5.6 to 5.7, resvg, Win64; I cannot confirm it. |

## SVG, EPS and PNG

### EPS

- Epic's documented texture import list for 5.8 is `.bmp .float .jpeg .jpg .pcx .png .psd .tga .dds .exr .tif .tiff` ([Textures in Unreal Engine](https://dev.epicgames.com/documentation/en-us/unreal-engine/textures-in-unreal-engine)). EPS and SVG are not on it.
- I found no first-party EPS importer. Convert EPS to SVG or PNG in a vector tool first. Gap: I did not test a converter's output.

### Native Slate SVG brush (5.8 install, no Epic usage doc)

- `ESlateBrushImageType::Vector` is documented in the header as "vector graphics ... rendered and cached in full color using size/scale requested by slate" (`SlateBrush.h`).
- `FSlateVectorImageBrush` builds a brush of that type from an image name ([API page](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/SlateCore/FSlateVectorImageBrush), which has no description). `IMAGE_BRUSH_SVG`, `BOX_BRUSH_SVG` and `BORDER_BRUSH_SVG` macros append `.svg` to a content path (`SlateStyleMacros.h`).
- `FSlateSVGRasterizer::RasterizeSVGFromFile` loads the file as a string and rasterizes it with nanosvg into RGBA pixels at the requested size. `FSlateVectorGraphicsCache` keys results by brush name and pixel size and stores them in atlas pages.
- **Inference from the cache key:** each distinct on-screen size makes a new raster request, so continuous scale animation or a smooth UI-size slider could create many cache entries. I did not measure this.
- The nanosvg [README](https://raw.githubusercontent.com/memononen/nanosvg/master/README.md) says the project is not actively maintained and that the rasterizer "currently only renders flat filled shapes". The Epic call is `nsvgRasterizeFull`; whether gradients, strokes, masks, filters or text survive is a **Gap**. Expect a restricted SVG subset and flatten or outline text and effects before export.
- This route reads a `.svg` file by path, not a cooked UAsset. How the file is staged in a packaged build is a **Gap**.
- **Gap:** I found no Epic doc or UMG widget that exposes this path to Blueprint users.

### Epic SVG Importer plugin

- Plugin descriptor in the 5.8 install: "SVG Importer", Category "Experimental", `IsBetaVersion` true, lives under `Plugins/VirtualProduction/SVGImporter`, needs GeometryScripting and GeometryMask.
- API pages show `ASVGActor` and dynamic mesh components, bake-to-Blueprint and bake-to-StaticMesh helpers, and `FSVGImporterUtils::CreateSVGTexture`, documented as "Uses the nanosvg parser and rasterizer" ([FSVGImporterUtils](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Plugins/SVGImporter/FSVGImporterUtils)). `USVGData` holds a `UTexture2D* SVGTexture` ([USVGData](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Plugins/SVGImporter/USVGData)).
- Its output is 3D geometry in the level. I found nothing documenting it as a UMG icon route. Using `SVGTexture` in UMG is unverified.
- Fit with the brief: Experimental plus Beta conflicts with the "no experimental plugins in this project" line. Evaluating it would belong in a separate sandbox project.

### Slate "vector art" is a different thing

[USlateVectorArtData](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/UMG/USlateVectorArtData) converts static mesh data into Slate vertices drawn with a material. It is not SVG.

### Third-party UMG SVG plugin (maintainer-documented only)

- The vendor's forum post says the plugin adds `.svg` import stored as `USVGAsset` and an SVG Image widget "in editor and at runtime" ([forum post](https://forums.unrealengine.com/t/txc-stock-umg-svg-svg-importer/2706826)).
- The post links documentation. That Google Doc is deleted (HTTP 410). The 5.6 to 5.7 and resvg details came only from a search snippet of that deleted doc, so I treat them as unconfirmed.
- 5.8, Linux and Proton support: unverified. I did not evaluate other Fab SVG products or Figma importers.

### PNG as the runtime form

PNG is on Epic's import list and becomes a Texture2D usable by image brushes without a third-party runtime. Its fixed pixel dimensions limit enlargement. One suitably sized source can serve multiple display resolutions; exporting every icon separately for each device is not required.

## PNG preparation and import settings

Epic's own guidance: pick a target resolution first, author UMG at DPI scale 1.0, trim built-in padding, and split frames into pieces (corners, edges, fill) so Border or Box draw modes can tile them ([UMG Best Practices](https://dev.epicgames.com/documentation/en-us/unreal-engine/umg-best-practices-in-unreal-engine)).

### Size and layout

1. Fix one design resolution (the existing UI pass works at 1080p, e.g. 40 px subtitles). Epic suggests authoring at DPI scale 1.0.
2. Record each icon's design size and largest intended on-screen size, including the maximum user UI scale. Export enough pixels for that largest size. A 2x export may cover 1080p to 4K at unchanged relative UI size, but does not also cover unlimited zoom or additional accessibility enlargement. Keep the vector original for re-export.
3. Crop transparent padding tightly and use UMG padding instead ([UMG Best Practices](https://dev.epicgames.com/documentation/en-us/unreal-engine/umg-best-practices-in-unreal-engine)).
4. Dimensions: block compression formats such as BC use blocks of 4 by 4 pixels; account for the selected format's dimension requirements. This is not a requirement of PNG or all texture formats. Epic's [Textures page](https://dev.epicgames.com/documentation/en-us/unreal-engine/textures-in-unreal-engine) says non-power-of-two textures "are never streamed and do not generate mipmaps". The [Texture Asset Editor page](https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-asset-editor-in-unreal-engine) says they support mips but are not streamed, are set to NoMipMap at import, and can have mips enabled by changing Mip Gen Settings. The editor page is more detailed; treat the Textures page as simplified.

### Layer separation, tint and masks

- Keep neutral (white or grayscale) art for shapes that change colour, and tint it with the brush tint. `FSlateBrush` has `TintColor`, `DrawAs` (None, Box, Border, Image, RoundedBox), `Tiling` and `Mirroring` in the 5.8 install (`SlateBrush.h`).
- Separate layers worth exporting: frame, fill, glow, icon glyph, and any state overlay (pressed dot, locked, disabled). Layers let high-contrast and color-blind themes recolour or swap one layer without redrawing the set.
- Export colored artwork as RGB/RGBA in sRGB, retaining transparency. Treat dedicated mask or distance-field textures as linear data. An ordinary colored texture does not need sRGB disabled merely because it has transparency. Avoid a baked background matte and check tinted edges against both light and dark backgrounds later.
- Bake no text into art. See Localization.

### Import settings (conditional, not blanket)

- Texture group. The 5.8 `BaseDeviceProfiles.ini` sets `TEXTUREGROUP_UI` to `MinMagFilter=aniso`, `MipFilter=point`, `MipGenSettings=TMGS_NoMipmaps`, max LOD size 16384. Epic's [Texture Format Support](https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-format-support-and-settings-in-unreal-engine) page shows an example config with `TMGS_SimpleAverage` and 4096 for the same group. The shipped file is the better authority for the default, but a project can override it, so check the project's own device profile.
- Do not copy the world-texture nearest/no-mip settings. In 5.8 the filter options per texture are Nearest, Bi-linear, Tri-linear or "Texture Group (default)" (Texture Asset Editor), so a pixel-art HUD piece can opt in individually.
- Mips: the UI group default is none. Art drawn well below its source size (for example 1080p art on an 800p Deck, a scale near 0.74 with a Shortest Side rule) can shimmer or alias without mips, and with mips can soften. Pick per asset after viewing it on a Deck. Epic does not state which to use.
- Compression: the 5.8 enum offers Default (BC1, or BC3 with alpha), BC7 ("High quality compressed texture, same size as BC3") and "Uncompressed (RGBA8)" with the tooltip "Very high memory use; prefer BC7 or Default instead" (`TextureDefines.h`). Epic search snippets referred to a "UserInterface2D" name; I did not find that label in 5.8 source. BC7 for gradient-heavy art and uncompressed only for tiny critical pieces is a common practice, not Epic text.
- Never Stream: Epic describes the flag ("this texture will never be streamed"). Use it only for always-resident items such as splash art. Gap: no Epic statement about UI group streaming behaviour.
- Alpha: edge bleed, premultiplied alpha and haloing on tinted art have no Epic doc that I found. Check tinted edges visually on dark and light backgrounds.
- Alpha coverage scaling for mips (`Do Scale Mips for Alpha Coverage`) exists in the Texture Asset Editor, relevant only if mips are on.

## Static icons, prompts, diagrams, text, animation

| Content | Proposed default | Alternatives | Notes |
|---|---|---|---|
| Static icons | Layered PNG, tinted | Slate SVG brush (C++ only); UI material for simple shapes | Epic's [UMG Best Practices](https://dev.epicgames.com/documentation/en-us/unreal-engine/umg-best-practices-in-unreal-engine) says "Use Textures instead of Materials for your art whenever possible." |
| Button prompts | Common UI action widgets with a controller data asset per input device | Custom prompt widget (as the 2026-10-21 UI pass did); Steam Input glyphs on Deck | See Prompts below. |
| Diagrams (control maps, hacking schematics) | PNG backdrop plus live text labels; text alternative written for each | Rive for animated diagrams | XAG 106 asks for text alternatives for charts, diagrams and animations. |
| Body text, subtitles, labels | Live `FText` with real fonts | Rich text with inline images; SDF fonts | Never in a bitmap. See Text. |
| Animation | UMG widget animation on layered PNG | UI material animation; Rive | See Animation. |

### Prompts

- Common UI: an Input Action row has a keyboard key, a default gamepad key, per-gamepad overrides, a display name and a "Hold Display Name"; controller data assets map keys to brushes; the system swaps icons by detected device ([Quickstart](https://dev.epicgames.com/documentation/en-us/unreal-engine/common-ui-quickstart-guide-for-unreal-engine)). Common UI left beta in 5.8 ([release notes](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-5-8-release-notes)). Re-check the quickstart steps against the unified-input change before building.
- `FCommonInputTypeInfo::AdditionalKeys` (5.8) lets extra keys trigger an action while "the primary key continues to drive displayed prompts" ([release notes](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-5-8-release-notes)).
- Runner's four-dot position diamond is a custom glyph set. One brush per input position per device fits Common UI's key-to-brush map, but I did not verify how a position glyph handles remapping.
- **Review uncertainty, not a confirmed conflict.** The Steamworks [compatibility page](https://partner.steamgames.com/doc/steamhardware/compat) requires "On-screen glyphs must match the inputs being used, whether it's Deck, Steam Controller, or Xbox glyphs" and says non-controller glyphs must not appear while using controller inputs. Whether a position-diamond style passes review is not stated anywhere I read. Valve recommends the Steam Input API to show correct glyphs.
- Steam Input glyph API: `GetGlyphPNGForActionOrigin` returns PNG at 32, 128 or 256 px with styles Knockout, Light and Dark and modifiers; `GetGlyphSVGForActionOrigin` returns an SVG path ([ISteamInput](https://partner.steamgames.com/doc/api/isteaminput)). The page warns the Xbox-origin translation "doesn't take into account any remapping a user has made". Gap: I did not verify how UE 5.8 would call this API.

### Text

- Keep text as live `FText`. Epic's [Font DPI Scaling](https://dev.epicgames.com/documentation/en-us/unreal-engine/font-dpi-scaling-in-unreal-engine) explains that each font and size makes its own glyph atlas and that scaling a widget rasterizes text "at the closest size after applying the transform", so use few sizes. A continuous text-size slider could create many atlases; stepped sizes avoid it (my inference from that page).
- 5.8 added runtime access to font size conversions and `SetFontSize`/`GetFontSize` on `UTextBlock`, and `CommonUI.TextGlobalScaling` ([release notes](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-5-8-release-notes)).
- Font materials and outlines are documented ([Font Materials and Outlines](https://dev.epicgames.com/documentation/en-us/unreal-engine/font-materials-and-outlines-in-unreal-engine)): materials must be in the User Interface domain, outline size is in Slate units.
- Epic documents SDF and MSDF UI text in UE 5.5 and newer. Enable Distance Field Font Rasterization in project UI settings, then enable distance-field rendering on the font face. Benefits include reuse across sizes and efficient outlines. Costs include more expensive field generation, approximation of thin features, and loss of hinting at small sizes. Epic recommends it for large or dynamically scaled text. This is a font feature, not a general SVG importer. Keep ordinary rasterized fonts as an option for small Deck text. [Signed Distance Field Text Rendering](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-signed-distance-field-text-rendering-in-unreal-engine).
- Rich text supports inline images through decorators ([UMG Rich Text Blocks](https://dev.epicgames.com/documentation/en-us/unreal-engine/umg-rich-text-blocks-in-unreal-engine)), which suits inline prompt icons.
- Localization: Epic's [Asset Localization](https://dev.epicgames.com/documentation/en-us/unreal-engine/asset-localization-in-unreal-engine) swaps whole assets by culture using `Content/L10N/<culture>/` paths, and needs LocRes data. Use it only for art that must carry language, and prefer live text. Per-culture fonts are possible; for runtime language switching use composite fonts (from the 4.27 page; I did not re-verify on 5.8). The [Text To Speech plugin](https://dev.epicgames.com/documentation/en-us/unreal-engine/blind-accessibility-features-overview-in-unreal-engine) currently supports English only, per that page.

### Animation

- UMG widget animations drive render transforms. Epic warns render transforms are good for temporary effects and not for permanent scale ([UMG Best Practices](https://dev.epicgames.com/documentation/en-us/unreal-engine/umg-best-practices-in-unreal-engine)). Keep tint-and-opacity pulses as the cheap default.
- UI materials can animate bars and glows. Gap: I found no Epic performance figures comparing them with textures beyond the "prefer textures" line.
- Rive (maintainer docs): Unreal runtime supports animation playback, state machines, ViewModel data binding, text rendering, image assets and multiple artboards. Documented support is "Unreal Engine 5.7.3 and above" (overview) or "5.6 or above" (getting started), with Steam Deck listed as "Proton D3D11". Both version ranges include 5.8. This is not proof of a tested 5.8 project. Assets must be embedded in the `.riv` ("does not yet support referenced assets"). The plugin installs from Fab or GitHub and compiles as C++ in the project ([getting started](https://rive.app/docs/game-runtimes/unreal/getting-started)). Gaps: how Rive text interacts with Unreal localization, `FText` and screen readers, reduced-motion handling, and actual behaviour in this project remain unverified. Rive is not an Epic-experimental plugin, but it adds a third-party C++ dependency to the main project, which is a decision for Mike.

### NoesisGUI as a larger alternative

NoesisGUI's maintainer explicitly lists UE 5.8 support in its 4.0 Unreal integration guide. It uses XAML UI assets and its own authoring environment, with a NoesisView that can sit inside UMG. Its integration also supports Rive assets. This is a candidate if vector UI authoring becomes central to the game, rather than an SVG-import setting to enable. It adds a framework, authoring workflow and licensing decision. Noesis accessibility, Steam Deck packaging and performance were not evaluated here. [NoesisGUI Unreal integration](https://www.noesisengine.com/docs/Gui.Core.UnrealTutorial.html).

## UI scaling and small screens

- Epic's DPI system: Project Settings > User Interface; Shortest Side, Longest Side, Horizontal, Vertical, Scale to Fit (uses Design Screen Size) or Custom; DPI Curve; Application Scale "if you want to expose a property in your game title" ([User Interface settings](https://dev.epicgames.com/documentation/en-us/unreal-engine/user-interface-settings-in-the-unreal-engine-project-settings), [DPI Scaling](https://dev.epicgames.com/documentation/en-us/unreal-engine/dpi-scaling-in-unreal-engine)). "Allow High DPI in Game Mode" is recommended only if the UI lets users change 3D resolution scaling.
- 5.8 added `bForceHighDPIInGameMode` to Windows target settings (release notes). Effect on Proton: unverified.
- Proposed layout approach: support the Deck's 16:10 screen as well as desktop aspect ratios. Use responsive containers and anchors, allow labels to wrap, and give enlarged text more space. Scaling a fixed composition alone will not prevent clipping or make its small labels readable.
- Steam Deck rules ([compatibility page](https://partner.steamgames.com/doc/steamhardware/compat)): support 1280x800 (preferred) or 1280x720; the smallest font character must not fall below 9 pixels high at 1280x800, text must read at 12 inches; Valve recommends aiming for 12 px and supporting user-configurable text size and contrast. [Getting ready for Deck](https://partner.steamgames.com/doc/steamdeck/recommendations) adds supporting different aspect ratios and a controller-reachable text input (on-screen keyboard API).
- XAG 101 ([text display](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/101)): PC default text at least 18 px at 1080p and 36 px at 4K, players able to scale text up to 200 percent, icons and glyphs scale with text. Proportional arithmetic (mine): 18 px at 1080p is about 13 px at 800p, near Valve's recommended 12 px.
- Use 800p, 1080p and 4K as later layout review points, not a requirement for three sets of icons. Include maximum user text/UI scale. A larger PNG can cover several sizes, but its small-size readability still depends on stroke weight and detail.

## Performance notes

- Do not assume vector is faster. The engine's own SVG path rasterizes on the CPU with nanosvg then uploads into atlas pages, keyed by pixel size (5.8 install). An imported PNG becomes engine texture data; source-file size is not GPU memory usage or rendering cost.
- Epic recommends event-driven updates and caching with invalidation. Animated layout and paint updates, material complexity, transparent overlap and render targets can affect cost. There is no measured PNG-versus-vector winner for this project. [UMG optimization guidelines](https://dev.epicgames.com/documentation/en-us/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine).
- Fonts: count of font and size combinations drives atlases ([Font DPI Scaling](https://dev.epicgames.com/documentation/en-us/unreal-engine/font-dpi-scaling-in-unreal-engine)).
- Rive adds its own renderer and render thread coordination (Rive overview). Cost on Steam Deck hardware: no figures found.
- Valve's current compatibility page specifies a default playable framerate of 30 fps at 800p on Deck. That is a review minimum, not a replacement for Runner's 60 fps project target. [Steam hardware compatibility](https://partner.steamgames.com/doc/steamhardware/compat).

## Accessibility checklist

Items marked with a guideline come from Microsoft's XAG, which Microsoft says is not a compliance checklist. Steam tags come from [Steamworks accessibility features](https://partner.steamgames.com/doc/accessibility_features).

### Contrast and themes

- Normal text and meaningful visuals 4.5:1, large text 3:1, inactive text 3:1, and a high-contrast mode at 7:1 for all UI elements ([XAG 102](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/102)). Large text is 36 px at 1080p on PC.
- Measure text over a non-solid background against the lowest-contrast area.
- XAG 102 says to read the platform's contrast setting where available to set the default. Whether UE 5.8 exposes OS high-contrast or reduced-motion settings: my search of `Engine/Source/Runtime` for common Windows and generic names found only a Renderer temporal upsampling file, which I did not open. Treat OS-setting detection as a **Gap**.
- Shipping a Default theme and a High contrast theme is a design choice. Common UI style assets and project template styles (Quickstart section 5) are the documented place to centralize style; using them as the theme switch is my inference.
- Valve's tags ask whether contrast is adjustable (Contrast Controls) and whether text size is adjustable (Adjustable Text Size).

### Color vision

- Do not use color alone ([XAG 103](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/103)): add shape, pattern, icon or label; let players configure colors when color is the primary signal.
- Valve's accessibility page: do not rely on full-screen filters; if you offer red/green presets, also let players pick specific colors per element.
- Epic provides a Blueprint node, [Set Color Vision Deficiency Type](https://dev.epicgames.com/documentation/en-us/unreal-engine/BlueprintAPI/Widget/Accessibility/SetColorVisionDeficiencyType) (type, severity 0 to 1, correct deficiency, show correction with deficiency) that applies to the game window. It is a whole-window filter, so it should be a supplement.
- SteamOS has a color filter (grayscale, invert brightness, invert colors) that applies "for both Steam and games" ([Valve announcement](https://steamcommunity.com/ogg/593110/announcements/detail/824835185591718586)). It is not a color-blind correction.

### Remapping and input

- Remap all controls in game, including the Esc key on PC; relabel hints and tutorials to match the new mapping; make every UI element operable digitally; no required simultaneous presses or long holds without an alternative ([XAG 107](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/107)).
- Enhanced Input documents Player Mappable Input Config presets and "runtime control remapping" ([Enhanced Input](https://dev.epicgames.com/documentation/en-us/unreal-engine/enhanced-input-in-unreal-engine)). Common UI prompts must follow the remap; Common UI keeps displayed prompts on the primary key while extra keys also trigger (5.8 notes).
- Steam Deck: the default controller configuration must reach all content; text input needs the on-screen keyboard API or a controller-only entry; mixed mouse and controller input should coexist ([recommendations](https://partner.steamgames.com/doc/steamdeck/recommendations)).

### Screen readers and narration

- Windows, documented by Epic: set `Accessibility.Enable=1`; per-widget Accessible Behavior (Auto, Summary, Custom, Tool Tip, Not Accessible); Text Block, Editable Text Box, Slider, Button and Checkbox work out of the box; third-party readers (NVDA, JAWS) on Windows or VoiceOver on iOS; custom Slate widgets need `CreateAccessibleWidget()` ([Supporting Screen Readers](https://dev.epicgames.com/documentation/en-us/unreal-engine/supporting-screen-readers-in-unreal-engine)). Epic labels the feature Experimental and says to use caution when shipping. The Text To Speech, Screen Reader and Slate Screen Reader plugins are in the Experimental folder at version 0.1 in the 5.8 install. Common UI widgets and the plugin's list of supported widget types were not cross-checked.
- XAG 106 expects core UI text to work with the platform's screen readers or a speech synthesizer, and wants interactive elements to say their label, type and state ([XAG 106](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/106)). XAG 103 warns against icon-fonts and Unicode glyphs for graphics under a screen reader, and wants images with text alternatives.
- Steamworks suggests exposing the UI tree through Microsoft UI Automation or providing narration, and defines "Playable without Vision" as complete enough to play without seeing the screen ([accessibility features](https://partner.steamgames.com/doc/accessibility_features)).
- **Steam Deck versus Windows, stated plainly.** Valve's June 2025 beta announcement adds a screen reader "only on devices running SteamOS" that "will read out the item you're currently focused on" in Steam, toggled with Steam + View, plus UI scaling, high contrast and Reduce Motion for Steam's own UI. It does not say it reads a Windows game under Proton. Epic's documented path is Windows UI Automation style support. I found no source for it working under Proton. The 5.8 TTS plugin has Windows and Linux factories and builds against Flite on Windows, Android and Unix groups (`TextToSpeech.Build.cs`), which suggests an in-game narration route that does not depend on a host reader, but I did not verify it under Proton. Verification needs a real Deck test, which this report did not do.

### Reduced motion and photosensitivity

- Provide a way to disable, pause or hide moving, blinking, scrolling or auto-updating UI content; allow turning off camera shake, bob and motion blur ([XAG 117](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/117)). Steam's tag is Camera Comfort.
- Proposed implementation: one reduced-motion preference should control widget, Rive and material animation, with static equivalents for important feedback. For the hacking UI, provide a way to disable decorative scrolling, glitches and pulses. XAG 118 also covers flashing and repeating spatial patterns. A high-contrast theme must not introduce stronger flashing. [XAG 118](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/118).

### Timing and QTE

- XAG 107: avoid mechanics that require repeated rapid presses, long holds or simultaneous presses; if unavoidable, offer a less demanding alternative or a way to bypass them. Example from the page: Gears 5 lets players choose tap or hold for quick-tap scenes. Another: The Long Dark converts press-and-hold into press. A single-pointer action should fire on release, not press.
- Steam tags "Playable without Quick Time Events" and "Playable at Your Own Pace" ([accessibility features](https://partner.steamgames.com/doc/accessibility_features)).
- XAG 116: UI time limits should be essential, adjustable (up to ten times the default), extendable with 20 seconds of warning, or switchable off; text that disappears on a timer should be adjustable to at least ten times or dismissed by input. Timers that are part of core mechanics are outside that guideline, but its resources list recommends offering alternatives or skip options for precise timing ([XAG 116](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/116)). Whether Runner's timed dialogue choices count as a core mechanic is Mike's call.

Practical QTE option set, to choose from:

| Axis | Options | Source or status |
|---|---|---|
| Input type | Mash, hold, single press, toggle-to-hold | XAG 107 examples (Gears 5, The Long Dark) |
| Timing | Longer window, no window (wait for input), auto-complete or skip | XAG 107, 116; Steam tags |
| Readability | Large prompt at a stable screen position, shape plus color, progress shown as shape and number, audio cue as well | XAG 102, 103; prompt contrast 4.5:1 or 3:1 for large |
| Engine hold handling | Common UI hold actions show a "Hold Display Name"; 5.8 console variables `CommonUI.AlwaysWaitForHoldActionToComplete` and `CommonUI.bEnhancedInputDynamicallyResolveHoldKeysForInputAction` change hold behaviour | [Quickstart](https://dev.epicgames.com/documentation/en-us/unreal-engine/common-ui-quickstart-guide-for-unreal-engine), [5.8 notes](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-5-8-release-notes) |
| Project items to check | The hold-Interact-for-1-second cutscene skip from the 2026-10-21 pass needs a tap or toggle alternative; timed dialogue choices need an extend or off setting | Tasks archive item U4 |

## Preparation checklist (for a UI art batch)

1. Choose design resolution, DPI rule and Application Scale approach. Author UMG at scale 1.0.
2. Decide which assets stay live (text, numbers, timers, prompts) and which are art.
3. Export layered, tightly cropped, neutral-color PNGs; masks in a separate channel or file with sRGB off.
4. Name by role and state, not by device color (so themes can retint).
5. Import with the UI texture group; set compression and mips per asset; leave pixel-art world textures alone.
6. Verify contrast of every state against 4.5:1, 3:1 and the 7:1 theme.
7. Preview at 1280x800, 1920x1080 and 3840x2160, at minimum and maximum user text scale.
8. Test remapped prompts and last-device switching with keyboard, Xbox-style pad and Deck controls.
9. Check Deck-specific rules: glyph accuracy, 9 px minimum text, on-screen keyboard for text entry.

## Unresolved choices for Mike

1. Keep the settled positional-diamond prompt style for now. Valve does not explicitly address it; confirm its acceptability during a later review rather than assuming it fails. Ensure remapping updates the displayed position and accessible action label.
2. Whether to keep Canvas and implement equivalent accessibility/layout support, or move controls to UMG/Slate with Common UI. C++ alone does not make the current HUD a Slate widget tree.
3. Whether any third-party runtime (Rive, a UMG SVG vendor) is acceptable in the main project, or only in a sandbox project first.
4. Whether to ship screen reader support at all, given Epic labels it Experimental and the Deck path is unverified. Alternative is an in-game narration option.
5. Accessibility scope: high-contrast theme, color-blind presets, reduced motion and QTE alternatives as launch features or later.
6. How many scale buckets to export for icons.
7. Whether timed dialogue choices count as a core mechanic (XAG 116) and what extend or off setting to offer.

## Gaps and things I could not confirm

- 5.8 behaviour of the Slate SVG path in a packaged build and under Proton.
- Any Epic usage doc for `FSlateVectorImageBrush` or a UMG SVG asset.
- Whether the Epic SVG Importer's `SVGTexture` can feed UMG.
- Current vendor documentation and 5.8 support for the UMG SVG plugin (documentation deleted).
- Rive in this specific 5.8 project; its documented version range includes 5.8, but its text/localization, screen-reader and reduced-motion integration still need evaluation.
- Updated Common UI setup steps after the 5.8 input unification.
- OS high-contrast and reduced-motion detection in UE 5.8.
- Windows UI Automation screen reader behaviour under Proton, and the 5.8 TTS plugin on Deck.
- Whether Valve's SteamOS screen reader or color filter changed after the 2025-06-19 beta post.
- Pages not read in full: UMG Safe Zones, XAG 101 beyond text size and spacing, the Common Input base controller API pages.
- Nothing here was engine-tested.

## Research artifacts

The research agent saved downloaded reference pages in `~/dl_ue58`, `~/dl_tools` and `~/dl_umgsvg`, outside the allowed project folders. That did not follow the workspace rule. Those scratch files remain untouched; no cleanup or deletion was performed. No game assets, engine configuration or project code were changed.
