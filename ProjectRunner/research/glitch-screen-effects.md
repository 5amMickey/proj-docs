# Glitch effects for ProjectRunner: screens, post process, transitions

Researched 2026-11-04. Target: UE 5.8, side-on 2.5D HD-2D, PC 60 fps. Nothing was run against the Unreal editor. Project files and engine source were read only.

Source labels: **[Epic]** Epic docs (the page title said UE 5.8 unless noted), **[Source]** UE 5.8 engine source at `C:/Program Files/Epic Games/UE_5.8/Engine`, **[W3C]**, **[MS]** Microsoft, **[Community]** forums, blogs and shader sites. Items marked **Unconfirmed** could not be checked in a primary source.

Fetch problems: several Epic pages (Retainer Box, UI material reference, Material Functions inlining, Material Layers) returned an empty shell on fetch, so claims about them rest on engine source or are marked unconfirmed. The Game Accessibility Guidelines page returned 404. The Elias Wick Gumroad page returned 404; the pack description comes from a search result.

---

## 1. Glitch on in-world screen meshes

### What the master does now

Read from `C:/Prod/ProjectRunner/Unreal/Scripts/pr_build_lcd.py`:

- One Time node feeds everything, so all effects run on continuous time.
- Four texture samples: `GlitchTex` (SM_Led_Glitch, panned noise), `Content`, `PixelMask`, `GridMask`.
- Three Custom nodes: ContentUV (rotate, scale, pan, repeat, `Shift`), LCD (subpixels, scanlines, flicker), TwoTone.
- Glitch is only `GlitchOffset` (noise R times offset, added to U) and `GlitchFlash` (noise added to emissive). No slices, no split, no gating.
- Flicker is already stepped: `floor(t * FlickerSpeed)` into a sine hash. That is the right pattern to reuse.
- Output is Emissive, so a glitch term must be applied to the emissive result, not Base Color.

### Cost facts

- The Custom node "prevents constant folding" and can use more instructions than equivalent built-in nodes. Epic says to use it only where nodes can't do the job. [Epic, Custom material expressions](https://dev.epicgames.com/documentation/en-us/unreal-engine/custom-material-expressions-in-unreal-engine)
- Custom nodes sample textures through inputs (`Texture2DSample(Tex, TexSampler, UV)` in Epic's example), and the page gives no sampling limit. Same page.
- Pure ALU glitch (slice, macroblock, stepped time, hash) adds no texture samples. RGB split needs the Content texture sampled three times, which is two extra samples. This is my reasoning from the algorithm, not a source claim.
- A material that must sample inside a runtime branch needs an explicit-LOD sample (`Texture2DSampleLevel`) to avoid derivative problems. Also my reasoning; unconfirmed in a source.
- Material Parameter Collections are cheaper to drive than per-instance writes: "Updating collection values is much more efficient than setting parameters on many individual Material Instances." [Epic, MPC](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-material-parameter-collections-in-unreal-engine)

### Three ways to layer the glitch

| Route | Fit | Cost | Risk |
|---|---|---|---|
| A. Extend M_LCD_Master | Best now. The glitch must edit UVs before the Content sample (displace first, then split), and the master already owns that path. | A few ALU ops per effect. Split adds 2 samples. | Master grows. Every look pays for every effect unless gated by a static switch. |
| B. Material Function layer | Good for sharing the same glitch across non-LCD screens (holo signs, monitors with other masters). Inputs: UV, time, params. Output: warped UV plus a mask and a colour offset. | Same ALU as A. Function calls expand into the parent material (my understanding; the Epic page on functions does not say whether they are inlined, unconfirmed). | Needs a master edit anyway to call it. |
| C. Material Layers | Poor fit. | Epic describes layered materials as potentially "heavy in terms of performance" because "all your layers are rendered simultaneously, and then blended". [Epic, Layered Materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/layered-materials-in-unreal-engine?application_version=5.8) That page covers the older Make Material Attributes layering and mentions Material Layers only as a newer alternative, without cost detail. | Layers blend Material Attributes, but glitch needs to change UVs inside another layer's texture sample. Wrong shape. |

Recommendation: build the glitch as one Material Function (`MF_ScreenGlitch`) with the algorithms from section 3, then call it once from M_LCD_Master in front of the ContentUV Custom node (replacing the single `Shift` term). Add one static switch `UseGlitch`. Instances that don't glitch compile the cheap permutation; instances that do get the full one. A static switch doubles that master's permutations, which is acceptable for one master. Keep `GlitchTex` as an optional mask source for the existing `SM_Led_Glitch` look.

Stepped time: replace the continuous Time input with a `StepT = floor(Time * GlitchRate)` integer and `Gate = hash(StepT) < Chance`. Bursts then hold still for a step, which reads as a digital fault. See section 3.

---

## 2. Full-screen post process on UE 5.8

### Blendable Location

From [Epic, Post process materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-materials-in-unreal-engine) (UE 5.8 title):

- **After Tonemapping** is the default and "the preferred option for performance". Color is LDR (4 bytes per pixel).
- **Before Tonemapping**: HDR scene color via `PostProcessInput0` (8 bytes per pixel). Epic says this avoids TAA and GBuffer lookup problems.
- **Before Translucency**: earlier still, before translucency is combined.
- **Replacing the Tonemapper**: marked work in progress. Do not use it.
- `PostProcessInput0` is the colour from the previous pass. "Using SceneColor can give different results."
- Filtered scene texture lookups cost more, and many buffers (GBuffer) don't support them.
- Each extra pass adds render cost. Epic suggests combining passes.
- Alpha output isn't supported; use Opacity.

For a glitch or transition that should also hit bloom and look "in the picture", Before Tonemapping works but HDR bright pixels will smear in a split. For a clean digital look and the lowest cost, After Tonemapping is the default choice. Which one looks better here is for a test, not a source.

### TSR and upscaling

[Epic, TSR](https://dev.epicgames.com/documentation/en-us/unreal-engine/temporal-super-resolution-in-unreal-engine) (UE 5.8 title; the last ~6k characters were not read):

- TSR runs mid post chain. Scene Color Before DOF, After DOF and Translucency After DOF run at render resolution. Scene Color Before Bloom, Replacing the Tonemapper and After Tonemapping run at display resolution, after TSR.
- A Tonemapper-stage material is therefore seen post-upscale and does not feed TSR history. Blocky displacement before TSR would be smeared by history; after it, it stays crisp. Epic's post-process page also recommends applying effects before temporal upscaling for filtering-sensitive effects, so there is a trade-off. This project's texture-only pixel look argues for After Tonemapping so macroblock edges stay hard.
- Page text noted no statement on UI/HUD.

### UV space and screen percentage

- Epic: SceneTextureUV can differ from ViewportUV because the render target may be larger than the viewport (editor viewports, scene capture, split-screen, VR). Use the Size and InvSize outputs for pixel-sized offsets. [Epic, Post process materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-materials-in-unreal-engine)
- Engine source: the ScreenPosition node has a `ViewportUV` output (`MaterialExpressions.cpp` ~line 10373), and the scene texture lookup code carries a comment about materials that "correctly handle BufferUV != ViewportUV" (~line 10409). [Source]
- Practical rule: use ViewportUV (ScreenPosition node) for effect geometry such as slice rows and macroblock cells, so they stay aligned to the visible frame at any screen percentage. Use SceneTexture's own UV, or `SceneTextureLookup` with the node's default coordinates, for the sample. Never mix them. Forum reports of misaligned Scene Depth and stretched post process after a screen-percentage change point at this. [Community](https://forums.unrealengine.com/t/postprocess-material-screws-viewport-aspect-ratio/113467)
- For cell sizes in pixels, use `ViewSize` (or Size) so a 16-px macroblock stays 16 px at 1080p and 1440p. Keep cell sizes tied to resolution, not UV, or blocks stretch on ultrawide.

### Blendables, weights and runtime control

- Assign in a Post Process Volume's Blendables. Same Blendable Location and Priority run in order. Setting "Is Blendable" false makes every instance render separately, which is costly. All instance properties blend, even unchecked ones, so defaults should be no-ops (multiply by white, lerp by 0). [Epic, Post process materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-materials-in-unreal-engine)
- The Epic page does not describe creating a dynamic material instance at runtime. Unconfirmed from Epic's side; standard practice is `Create Dynamic Material Instance` plus `Set Scalar Parameter Value`, then add the MID as a weighted blendable on a camera or volume.
- Preferred driver: one Material Parameter Collection, e.g. `MPC_Glitch` with scalars `TransitionProgress`, `TransitionSeed`, `TransitionKind`, `GlitchIntensity`, `FlashScale`. A material can reference at most two collections; a collection holds up to 1024 scalar and 1024 vector parameters. Setting from Blueprint is `Set Scalar Parameter Value` with the Collection pin. Adding or removing parameters recompiles every material that references it, so define the full set up front. [Epic, MPC](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-material-parameter-collections-in-unreal-engine); node description: [Epic, Set Scalar Parameter Value](https://dev.epicgames.com/documentation/en-us/unreal-engine/BlueprintAPI/Rendering/Material/SetScalarParameterValue?application_version=5.8)
- A single post material with a `TransitionKind` switch avoids many blendable entries. With a dynamic branch the unused branches do not run; with a static switch they are separate materials. Use one material per transition identity if they will not run at once, all weight 0 when idle. A weight-0 blendable still costs a pass unless the engine skips it; whether 5.8 skips weight-0 blendables is **unconfirmed**. The safe approach is to add the blendable when a transition starts and remove it at the end.

### Custom node in a post material

- Same limits as above: no constant folding, valid HLSL only, and the older HLSLcc backend may reject loosely typed vector code, so use explicit `float4`. [Epic, Custom material expressions](https://dev.epicgames.com/documentation/en-us/unreal-engine/custom-material-expressions-in-unreal-engine)
- Inputs are local to the Custom function; helper functions and structs need copies passed in. Same page.
- Scene texture lookups from inside a Custom node: use the `SceneTextureLookup` helper, or feed UVs through separate SceneTexture nodes. I did not confirm the exact 5.8 signature.

### Does post process affect UMG/HUD?

- Epic's post-process page does not say. **Unconfirmed in primary docs.**
- Community: a regular viewport UMG widget is not affected by post processing; 3D widget components in the world are. [Community](https://forums.unrealengine.com/t/how-post-process-dont-effect-umg/407885) This matches how the engine draws Slate over the finished frame, but I did not find the source line proving it.
- Camera fade, in contrast, is applied as the view's overlay colour: `LocalPlayer.cpp` copies `FadeColor` and `FadeAmount` into `ViewInitOptions.OverlayColor` (lines 811-814). It is part of the scene view, not a UMG layer. [Source] Where in the post chain the overlay lands relative to a post-process material was **not confirmed**.
- Result: a scene-space glitch material will not hit the HUD or the full-screen widgets. For a transition that must cover UI, see the next part.

### Including UI in a transition

Two routes:

1. **Cover widget.** A full-screen UMG Image on a top ZOrder with a UI-domain material (black, static, block dissolve) driven by `TransitionProgress` from the same MPC. This is the simplest route and covers the HUD by sitting on top of it. It cannot sample the scene (unconfirmed; the UI material page did not load).
2. **Retainer Box.** Put the HUD in a Retainer Box. Engine source (`RetainerBox.h`): `EffectMaterial`, `TextureParameter` (the sampler parameter that receives the render target), `GetEffectMaterial()` returns a dynamic material instance, and `PhaseCount`/`RenderOnPhase`/`RenderOnInvalidation` limit how often the content is redrawn. [Source] Use a UI-domain material that samples the retained texture to glitch the HUD itself. Epic's Retainer Box doc page did not load, so cost guidance is unconfirmed. A forum reply warns retainers add render-queue cost. [Community](https://forums.unrealengine.com/t/how-would-i-set-my-post-process-material-in-ui-widgets-with-no-post-process-effect-lost/453503)

For ProjectRunner: route 1 for transitions, route 2 only if the HUD itself needs a glitch look (e.g. a hit-by-hack effect).

---

## 3. Technique catalogue

Notation: `t` is time in seconds, `Step = floor(t * Rate)`, `H(x)` is an integer hash returning 0-1. `uv` is ViewportUV for post, mesh UV for screens. Order: gate, displace UVs, then sample (with RGB split), then overlays.

Hash choice: the engine ships PCG integer hashes in `Random.ush` and `RandomPCG.ush` (`Rand3DPCG16` is used in `Random.ush` at lines 151, 297-324, 476). [Source] Those are stable across GPUs. The common `frac(sin(x) * 43758.5453)` hash (used by M_LCD_Master and the CC0 Godot shader below) can differ between GPUs and drifts at large inputs; I did not find a primary source on this, so treat it as a caution. Whether a Custom node can include `/Engine/Private/RandomPCG.ush` in 5.8 is **unconfirmed**; the Include File Paths field exists but Epic's page gives no path rules. Fallback: paste a small PCG hash into the Custom code.

Reference code: [Community, Godot Shaders "Weird glitch shader"](https://godotshaders.com/shader/weird-glitch-shader/) (stated CC0 on the page). It gates by `step(1 - chance, rand(floor(TIME * speed)))`, splits into slices by `floor(uv.y * density + ...)`, offsets each slice by `(rand - 0.5) * strength`, then samples R and B at ±`chroma_offset`. It uses GLSL; port by hand. Other CC0 sources: [Glitch (CC0)](https://godotshaders.com/shader/glitch/), [Chromatic Chaos Distortion (CC0)](https://godotshaders.com/shader/chromatic-chaos-distortion-godot4/).

### Table

| Technique | Algorithm | HLSL-level recipe | Cost |
|---|---|---|---|
| Temporally gated burst | Hold the effect off most of the time, turn it on for short stepped intervals. | `float s = floor(t*Rate); float gate = H(s) < Chance; float env = gate * saturate(1 - frac(t*Rate)*Decay);` Multiply every amount by `gate` (or `env`). | ALU only. |
| Horizontal slice displacement | Divide into N rows with random height; shift each row in U by a hashed amount. | `float row = floor(uv.y*N + H(s)*N); float amt = (H(row + s*57.0) - 0.5) * Strength * (H(row+s) > Density);` `uv.x += amt * gate;` Vary row height by quantising `uv.y` with a hashed N per step. | ALU only. |
| Macroblock displacement | Divide into square cells in pixels; some cells copy from an offset cell. | `float2 cell = floor(uv * ViewSize / Block); float r = H2(cell + s); float2 off = (r < P) ? (H2(cell + 9.1 + s) - 0.5) * MaxOff : 0; uv += off;` Block sizes of 16 or 32 px echo codec macroblocks. | ALU only. |
| RGB split | After displacing, sample three times with per-channel offsets. | `float3 c = float3(S(uv+d).r, S(uv).g, S(uv-d).b);` Direction `d` can follow slice offset so split scales with tear. | 3 samples (2 extra). |
| Scanlines | Darken alternate rows. | `1 - A*(0.5+0.5*sin(uv.y*Lines*6.28318))`. Already in the LCD master. | ALU only. |
| VHS tracking / roll bar | A band that travels vertically with extra horizontal wobble and brightness change. | `float y = frac(uv.y - t*Speed); float band = smoothstep(0, W, y)*smoothstep(2*W, W, y); uv.x += band*Wobble*sin(uv.y*Freq + t*..);` Add noise lines in the band. | ALU only. |
| Interlace | Odd rows show the previous field's content shifted. | Row parity `fmod(floor(uv.y*H),2)`; on odd rows sample with `uv.x += Jitter` or from a field offset by a small time step. True interlace needs a history; the cheap fake just offsets odd rows. | ALU only (fake). |
| Bit-crush / posterize | Quantise colour and optionally UV. | `c = floor(c*Levels)/Levels;` Quantise UV with `floor(uv*Res)/Res` for a pixel look. Not wanted full screen in normal play (see section 5). | ALU only. |
| Signal dropout | Short horizontal streaks of black/white/noise, bright at the leading edge. | Gate rows like slices; for chosen rows `c = lerp(c, NoiseOrFlat, 1)`; keep width short in X with a hashed length. | ALU only. |
| Dead pixels / broken panel bands | Static defects, not animated. | Dead pixel: `H2(floor(uv*ViewSize*Density)) > 0.9999 -> colour`. Band: a constant column or row mask baked from parameters (no time). Cheap and stable. | ALU only. |
| Ghosting | Faint offset copy of the picture. | Add `S(uv + float2(Offset,0)) * G` to the sample. In a post material this is another scene sample; a true trailing ghost needs history. | +1 sample (fake). |
| Datamosh | Keep the previous decoded frame and move it by motion vectors instead of replacing it. | See below. | Impractical here. |

### Datamosh in UE

- Needs two things: motion vectors for the current frame, and a previous output frame you can read and write.
- A UE5 demo exists: previous frame moved by the motion vector the engine already renders, then blended with the new frame, using a paid shader. It was described as "borderline unplayable". [Community, 80.lv](https://80.lv/articles/check-out-real-time-datamosh-effect-running-in-unreal-engine-5)
- Algorithm described in a web write-up: warp the last decoded frame by motion vectors, add a residual from the new scene, and ping-pong two buffers because a buffer can't be read and written in place. [Community, Codrops](https://tympanus.net/codrops/?p=119915) (the page returned 403 on fetch; this is from a search summary, not a read).
- The UE velocity buffer: a UE4-era thread found values outside the expected range and mismatches with actual pixel movement; decoding uses the inverse of `EncodeVelocityToTexture` in `Common.ush`. [Community](https://forums.unrealengine.com/t/scenetexture-velocity-data-integrity-issues/222812) The function exists in 5.8 (`Common.ush` line 2064). [Source] Whether those 2021 findings still hold in 5.8 is **unconfirmed**.
- A post-process material cannot write a persistent history buffer by itself. It needs a render target that is read and written each frame, via a Blueprint or C++ capture step, or a custom scene view extension (C++). Static background pixels have no velocity, so the effect only moves dynamic objects and the camera.
- Verdict: not practical for a 2D-ish side-on game on a 60 fps budget. The look can be faked with macroblock displacement and held blocks (stale cells) that cost nothing in history. Skip real datamosh.

---

## 4. Transitions from one 0-1 progress value

All use `P` = `TransitionProgress`, 0 = scene visible, 1 = fully covered. The reveal runs the same function from 1 to 0 (or a different kind on the way out). Shared pieces: a stable seed per transition, a quantised progress step for hashed values, and a final lerp to the cover colour at `P` near 1 so the end state is exact.

Stable noise: patterns must not reshuffle each frame unless meant to. Seed hashes with `TransitionSeed` (an integer set once per transition) and a *cell id* only, not time. Use `PStep = floor(P * Steps)` when the pattern should change in discrete beats. In a dissolve, compare `H(cell + Seed) < P`: a cell turns on at a fixed P and stays on, so there is no flicker. This uses the same PCG hash as section 3.

| Look | Algorithm | Notes |
|---|---|---|
| Glitch burst into black | `Amount = smoothstep(0, 0.7, P)`; slice + macroblock + split strengths scale with `Amount`. Over `0.7..1` fade to black by `lerp(c, 0, saturate((P-0.7)/0.3))`. Bursts are gated by `PStep`. | Needs cap on flashes per second (below). |
| CRT power-off | Phase 1 (`P` 0 to 0.6): vertical squeeze `v' = (v - 0.5) / max(1 - P1, 0.002) + 0.5`, discard outside 0..1, brighten as it collapses. Phase 2 (0.6 to 1): horizontal squeeze to a dot with a radial falloff, then fade. | Single bright line and dot are a flash risk; keep luminance changes smooth. No primary source for the timing; a GameMaker asset named CRT Shutdown shows it exists as a look only. [Community](https://marketplace.gamemaker.io/assets/2880/crt-shutdown) |
| Macroblock dissolve | Cells of 16-32 px. Cell is covered when `H(cell+Seed) < P`. Optionally covered cells show the previous cell's content shifted. | Stable by construction. Close to a codec failure rather than a wipe. |
| Mosaic then cut | `Res = lerp(ViewSize, 8, smoothstep(0,0.8,P))`, `uv = (floor(uv*Res)+0.5)/Res`. At 0.8 to 1, fade or cut. | Uses full-screen pixelation only during the transition, which matches the "no whole-screen pixel grid in normal play" decision. |
| Slice-scatter wipe | Rows slide out horizontally with hashed delay: `RowP = saturate((P - H(row)*0.5)*2)`, `uv.x += RowP * Dir(row) * 1.2`; pixels outside become cover colour. | Reads as a wipe rather than noise. Rows shorter than the sample window stay stable via row id. |
| Signal-loss static | `lerp(scene, noise, smoothstep(0.2, 0.9, P))`. Noise is a hashed per-pixel value with `floor(t*24)` for frame rate. Add a roll bar and a hum bar. | Stepped time or noise looks like tv static. Low-contrast noise lowers flash risk. |

### Photosensitivity

- **WCAG 2.3.1 (Level A)**: no more than three general flashes or three red flashes in any one second, unless below the flash thresholds. A general flash is a pair of opposing luminance changes of 10% or more of maximum relative luminance, where the darker is below 0.80. A red flash is any pair of opposing transitions involving a saturated red. The area test: combined flashing area no more than 0.006 steradians within a 10-degree field, estimated as 341 x 256 px on a 1024 x 768 screen (25% of that field). Content flashing three times or fewer per second passes automatically. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html)
- **WCAG 2.3.2 (Level AAA)**: no content that flashes more than three times in any second, regardless of size or brightness. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes.html)
- **Xbox Accessibility Guideline 118** (game-specific): same 10% luminance and 0.8 limits, a failure at roughly more than three flashes per second covering roughly 20% or more of the screen, a red flash test using `(R-G-B)*320 > 20` and saturated red `R/(R+G+B) >= 0.8`, and a separate **spatial pattern** failure for alternating high-contrast bands over about 20% of the screen with a contrast difference above 10%. It prefers removing risky content over warnings, and lists the **Harding FPA test** as a tool. [MS](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/118) Tool: [Harding FPA](https://www.hardingfpa.com/)
- Implication for this game: scanlines at high contrast over the whole screen can hit the spatial pattern rule; macroblock flash or full-screen white/black alternation can hit the flash rule; the red-tinted neon palette needs the red-flash check. Run the Harding test on captured transition clips; I did not run it.
- Game Accessibility Guidelines' flashing page would be a second primary source but returned 404. Not used.

### Reduce-flash setting

- One user setting, `ReduceFlash` (off / on), stored in game user settings, which sets `FlashScale` in `MPC_Glitch` (1.0 or about 0.25) at startup and on change. [Epic, MPC](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-material-parameter-collections-in-unreal-engine) is how the value reaches every material at once. This is design, not a documented UE feature.
- With the setting on: scale flash luminance delta to under 10%, cap burst rate to 3 per second or fewer, replace flashes with a dissolve, avoid saturated red, and reduce scanline contrast.
- Even with the setting off, keep the default under 3 flashes per second. Do not rely on the toggle alone, because Xbox 118 prefers removing the content over splash warnings.

---

## 5. Integration with PNLevelFlow

### What the code does

Read from `C:/Prod/_Library/Unreal/Plugins/PhantomInteraction/Source/PhantomInteraction/Private/PNLevelFlow.cpp` and `Public/PNLevelFlow.h`:

- `UPNLevelFlowSubsystem` (a `UTickableWorldSubsystem`) runs phases `Idle -> Covering -> Loading -> (Placing) -> Revealing -> Idle`.
- Every visual cover goes through one private function, `Fade(From, To)`, which calls `PlayerCameraManager->StartCameraFade(From, To, GetCoverSeconds(), Color, false, true)`. It is called from `BeginTravel`, `ShowStageAndLoad`, the Loading branch, `PlacePlayer`, the arrival hold in `Tick`, and the reveal.
- Timing already lives in the subsystem: `GetCoverSeconds()` (stage `CoverSeconds`, override, or 0.4 s), `PhaseTime`, and the reveal hold (`bRevealHold`, 3 ticks and 0.2 s) so load hitches don't skip the fade.
- Streaming path (stage present): `LoadLevelInstanceBySoftObjectPtr` into the persistent world while covered. Hard path (no stage): fade, `OpenLevelBySoftObjectPtr`, then the new world's `OnWorldBeginPlay` reads `PNFadeIn` and covers until the pawn exists. A new world means a new subsystem instance and none of the old world's actors.
- `APNLevelTransitionVolume` already exists (box, `Trigger` profile, `TargetLevel`, `TargetEntry`; calls `TravelTo` on player overlap). `UPNLevelFlowSubsystem` functions `TravelTo`, `TravelToWithCover`, `IsTransitioning`, and the three delegates are `BlueprintCallable`/`BlueprintAssignable`.
- The fade is a view overlay, not a post-process material: `LocalPlayer.cpp` 811-814 sets `OverlayColor` from `FadeColor` and `FadeAmount`. [Source]

### Smallest way to swap a material transition in

Keep the phases untouched. Change only what draws the cover.

1. Add `MPC_Glitch` (asset) and a `PostProcessVolume` (unbound) with the transition post-process material to the persistent level `L_PR_Persistent`. The persistent level stays loaded while scenes stream in and out, so the volume survives every streaming transition.
2. Add to `APNTransitionStage` two properties: `TObjectPtr<UMaterialParameterCollection> TransitionMPC` and `FName TransitionKind`. The stage already owns `CoverColor` and `CoverSeconds`, so this is where cover settings belong.
3. In `UPNLevelFlowSubsystem::Fade(From, To)`, when `TransitionMPC` is set, do not call `StartCameraFade`. Instead store `CoverFrom`, `CoverTo`, `CoverStartTime`. Add a `UpdateCover()` call at the top of `Tick`: `Progress = Lerp(CoverFrom, CoverTo, saturate((Now - CoverStartTime)/GetCoverSeconds()))` then `UKismetMaterialLibrary::SetScalarParameterValue(this, TransitionMPC, "TransitionProgress", Progress)`. `Fade(1,1)` (the black hold) stays at 1. That is about 15 lines, and the existing `Covering`, `Loading`, `Revealing` logic and its timing don't change.
4. Set `TransitionSeed` once in `BeginTravel`, so the pattern stays stable for the transition.
5. Leave the camera-fade path as the fallback when no MPC is set, so scenes opened on their own keep working.

An alternative with no C++ change: leave `StartCameraFade` alone, read `PlayerCameraManager->FadeAmount` (public member, `PlayerCameraManager.h` line 232 [Source]) from a small Blueprint on the stage every frame, and write it to the MPC. But the black overlay would also cover the glitch, so the glitch would be invisible at high progress. Set `CoverColor` alpha cannot help since `FadeAmount` drives alpha. So step 3 is the right change.

### Surviving OpenLevel

- Streaming path: nothing extra, as above.
- Hard-travel path: the world is replaced, so the volume in `L_PR_Persistent` is gone. Either put an unbound post-process volume in each standalone scene map, or add the blendable to something that outlives the world. A camera component or the player's camera blueprint is recreated per world too, so only a `GameInstance`-owned approach persists; that needs C++ or a Blueprint `GameInstance`. **Unconfirmed**: I did not check how the project spawns its camera on hard travel.
- Since the project decision is that scenes stream into `L_PR_Persistent`, treat hard travel as the edge case and put the volume in the persistent level only.
- Add the blendable when a transition starts and remove it when `OnTransitionFinished` fires, so no pass runs while idle. Weight-0 skipping is unconfirmed (section 2).
- The `Loading` hold: the existing 3-tick and 0.2 s reveal hold means the material shows its fully covered state across the load hitch. Make sure `P = 1` is solid black (or the cover colour), not a pattern that the hitch freezes mid-flicker.

### Pixel look

- Decision: textures-only pixel look, no whole-screen pixel grid in normal play. So the posterize and mosaic techniques run in transitions only (progress > 0) and the post-process blendable is absent otherwise. This keeps a clean frame in normal play. Display glitches stay in the screen material, not in post.
- The render-resolution rule from section 2 means `ViewSize`-based cells give the same visual size on any monitor.

### Box trigger test actor

Option A, no C++ (preferred for testing; uses what already exists): drop an existing `APNLevelTransitionVolume` in a map and point `TargetLevel` at a scene. Nothing new to write. To test a transition without travelling, add a Level Blueprint with a `BoxTrigger` (or `TriggerBox` actor) with `On Actor Begin Overlap`, then `Set Scalar Parameter Value` on `MPC_Glitch` driven by a Timeline 0 to 1. Existing `UPNLevelFlowSubsystem` functions are `BlueprintCallable`, so `Get World Subsystem` should reach `TravelTo` from Blueprint (**unconfirmed**, not tried).

Option B, Python-built: the editor's Python can spawn a `TriggerBox` and set properties, but wiring overlap events into a Blueprint graph from Python is awkward. For a throwaway test this is not worth it. Do not do it with the editor in use by another session.

Option C, small C++: a test actor `APNTransitionTestVolume` with a `UBoxComponent`, a `UPROPERTY` `EPNTransitionKind`, a duration, and a tick that writes `TransitionProgress` to the MPC on overlap, going 0 to 1, hold, 1 to 0. About 60 lines and it mirrors `APNLevelTransitionVolume`. It is the quickest way to scrub a look in PIE without a level change. It needs a build, so wait until the other editor session is done.

Recommendation: Option C only if you want to loop looks while tuning. Otherwise option A with a Level Blueprint timeline.

---

## 6. Recommended test set

### One master per layer

- **Screens:** extend `M_LCD_Master` with `MF_ScreenGlitch`. Each look below is a `MI_LCD_*` instance; delete any that fail review.
- **Transitions:** one post-process master `M_PP_Transition` with `TransitionKind` (static switch per kind or a dynamic branch) and shared parameters read from `MPC_Glitch`: `TransitionProgress`, `TransitionSeed`, `FlashScale`. Each kind is an instance (`MI_Trans_*`) with its own cell size, colours and steps.
- Shared parameters across both: `GlitchRate` (steps per second), `GlitchChance`, `SliceRows`, `SliceStrength`, `BlockPx`, `BlockChance`, `SplitPx`, `ScanStrength`, `NoiseAmount`, `Seed`. Treat them as the same names in both masters so a look can be copied.

### Display looks (6)

Values are starting points for tuning, not measured.

| # | Name | Identity | Starting parameters |
|---|---|---|---|
| D1 | Slip | Occasional single horizontal tear, otherwise clean. Gated bursts. | GlitchRate 6, Chance 0.12, SliceRows 14, SliceStrength 0.06, SplitPx 1.5, BlockChance 0 |
| D2 | Codec | Macroblocks displace and hold; no tears. Stale cells. | BlockPx 24, BlockChance 0.15, GlitchRate 4, SliceStrength 0, SplitPx 0 |
| D3 | Tape | VHS tracking bar and wobble, constant. Slow roll bar, chroma smear. | RollSpeed 0.15, BarWidth 0.08, Wobble 0.01, SplitPx 2, ScanStrength 0.25, GlitchChance 1 (no gate) |
| D4 | Dropout | Short bright streaks on chosen rows, then black bars. Signal-loss feel. | GlitchRate 10, Chance 0.2, StreakLen 0.3, rows 40, SplitPx 0 |
| D5 | Dying panel | Dead pixels and a permanent bad band, with rare flicker; no animated tears. | DeadPixelDensity 0.0003, BandCol 0.37, BandWidth 3 px, FlickerAmt 0.15, Chance 0.03 |
| D6 | Bitcrush | Posterised colour and quantised UV steps that change per beat. | Levels 4, UVRes 64, GlitchRate 3, SplitPx 0 |

Review each at the screen's world size and at 1080p. D3 and D5 run all the time, so their contrast must stay low for the spatial pattern rule.

### Transition looks (5)

| # | Name | Identity | Starting parameters |
|---|---|---|---|
| T1 | Burst-out | Glitch ramps and drops to black. For hacks and damage. | Duration 0.5 s, slice + block ramp 0 to 0.7, black by 1.0, Steps 12 |
| T2 | Power-off | CRT collapse to a line then a dot. For shutdown, cutscene end. | Duration 0.6 s, line phase 0.6, dot phase 0.4, glow x2 on the line |
| T3 | Blocks | Macroblock dissolve, stable cells. For scene swaps. | BlockPx 32, Duration 0.45 s, fixed Seed per transition |
| T4 | Mosaic | Pixelation 1/1 down to about 8 px then cut. For flashback or memory. | Duration 0.7 s, Res from ViewSize to 8, cut at 0.85 |
| T5 | Scatter | Rows slide out with hashed delay. Wipe, no noise. For fast movement. | Rows 36, Duration 0.4 s, delay spread 0.5 |

Optional sixth, signal-loss static, is closest to T1 and the D4 screen look. Drop it unless T1 fails review.

Acceptance: record each transition at 60 fps, count flashes per second, then run the clips through the Harding test. Reject any look that fails with `ReduceFlash` off and cannot be softened. Check each with `ReduceFlash` on at `FlashScale` 0.25.

### Feature reference only: Elias Wick Glitch

A search result (not a page read) describes Elias Wick Glitch as six post-process materials applied through a camera or volume, listing Tutorial, Bug, Glitch, Chromatic Glitch, Infinite Zoom, Loading and Rain Glitch effects, with Frequency and Speed controls on its Glitch shader and Intensity and Speed on the Chromatic one. UE5, portable to UE4. [Community, Gumroad listing via search](https://eliaswick.gumroad.com/l/EliasWickGlitch); the Fab page "Elias Wick - Screen Effects" is a separate listing (brightness, colour-channel shifts, contrast, inversion, colour reduction, vintage look) [Community](https://www.fab.com/sellers/Elias%20Wick/about). Used only as a feature checklist. It uses plain Frequency and Speed controls, which maps to `GlitchRate` and `GlitchChance` above. Nothing to buy.

---

## Unconfirmed list

- Whether Epic's Retainer Box and UI material docs match what the engine source shows; their pages did not load.
- Whether post-process materials affect UMG/HUD in 5.8 (only community statements).
- Where the camera-fade overlay lands relative to a post-process material.
- Weight-0 blendables: settled 2026-11-04. `SceneView.cpp` lines 2014-2019 only apply a blendable when its weight is above 0.
- Whether Custom nodes can include `RandomPCG.ush` and the exact 5.8 SceneTexture lookup signature in Custom code.
- Whether Material Function calls are inlined (Epic's function page is silent).
- Whether the UE4/5-era velocity buffer problems (2021 thread) still apply in 5.8.
- Whether `UPNLevelFlowSubsystem` is reachable from Blueprint through `Get World Subsystem`.
- How the project creates its camera on hard travel.
- CRT power-off timing and the PCG/sin hash stability note are my design choices or cautions, with no primary source.
- The Game Accessibility Guidelines flashing page (404) and Codrops (403) were not read.
