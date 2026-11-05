# Glitch references v2: Cyberpunk 2077, Narita Boy, contrasts

Researched 2026-11-04. Target: UE 5.8, ProjectRunner. Research only. Nothing ran in Unreal and no project file changed. This builds on `glitch-screen-effects.md` (v1) and the lab described in `C:/Prod/PipelineSandbox/Docs/glitch_review/README.md`. It does not repeat v1's engine and accessibility detail, only what v2 re-checked or added.

Labels. **Read** means I read the page or file. **Viewed** means I downloaded the publisher's own trailer file and looked at sampled frames myself. **Search only** means I only saw a search snippet. **Inference** is my reading of how something could be built. Nothing here claims to reproduce a proprietary shader.

## Constraints carried over

- Runner has no persistent whole-screen pixel filter (BRIEF 2026-10-16, textures-only look). Pixel treatments are allowed on world screens, and inside a transition for its short duration (the same rule the lab's T4 Mosaic follows).
- Existing looks to avoid duplicating: D1 slice tears, D2 macroblocks, D3 VHS roll, D4 dropout, D5 dead panel, D6 bitcrush, S1 cracks, S2 ink, S3 static, S4 combo. Transitions T1 burst, T2 CRT collapse, T3 blocks, T4 mosaic, T5 scatter.
- Open items from the lab README that matter here: no flash test yet, `FlashScale` is built but unused, HUD interaction unchecked, costs are compiler estimates.

## 1. Strongest references

| Rank | Source | Why it is useful | Status |
|---|---|---|---|
| 1 | Swierad, Ankermann, Krzyscin, "The Tech and Art of Cyberspaces in Cyberpunk 2077", SIGGRAPH 2021 Talks. [PDF](https://history.siggraph.org/wp-content/uploads/2022/06/2021-Talks-Swierad_The-Tech-and-Art-of-Cyberspaces-in-Cyberpunk-2077.pdf), [archive page](https://history.siggraph.org/?p=75737), DOI 10.1145/3450623.3464662 | First-party, names the mechanisms: point-cloud rendering, vertical pixel sorting by luminosity, datamosh by blending the last frame through a noise mask | Read, 2 pages |
| 2 | Steam store trailer "022_CP_Gameplay_Trailer_EN_ESRB" (Steam app 1091500, movie id 256810255, 309.8 s). Store page: https://store.steampowered.com/app/1091500 | Shows the point-cloud look in motion | Viewed |
| 3 | Steam "Launch Trailer" for Narita Boy (app 1069530, movie id 256828028, 170.2 s). Store page: https://store.steampowered.com/app/1069530 | Studio Koba and Team17 trailer with the look in motion | Viewed |
| 4 | Steam "Observer Trailer, The Year is 2084" (app 514900, movie id 256690604, 80.0 s at 60 fps). Store page: https://store.steampowered.com/app/514900 | Contrast: glitch as sparse blocks and displaced geometry | Viewed |
| 5 | Engadget, "Tube TVs, VCRs and magnets give Alien: Isolation its signature look". https://www.engadget.com/2014-10-07-alien-isolation-launch-interview.html | Contrast: art-directed baked footage instead of procedural noise | Read |
| 6 | Kim Asendorf, ASDFPixelSort (2010). https://github.com/kimasendorf/ASDFPixelSort | Original pixel-sort algorithm the CDPR talk names by description | Read, first 120 lines |

I got the Steam files from the public store API (`store.steampowered.com/api/appdetails`) and cut frames with ffmpeg in a scratch folder, `C:/Users/GameDevPC0403/AppData/Local/Temp/gr`. The folder is outside every repo and may be cleared. The trailer cuts on YouTube may differ from the Steam files.

## 2. Cyberpunk 2077

### Read, first-party (SIGGRAPH 2021 paper)

- Scenes are captured from several viewpoints, stored as textures where one pixel is one point (a quad), and drawn from those textures. Braindance captures live, with 2 or 3 extra low-resolution cameras per location that keep only Z depth. Cyberspace is captured offline.
- Point colour comes from the scene colour after lighting and before post. Then 3D noise and a shadow mask are applied.
- Character shader. Opaque with a 1-bit alpha mask, Bayer-dithered and resolved by TAA. A Fresnel mask hides surfaces parallel to the camera. An animated 3D noise array adds randomness.
- Post. Standard bloom, tint, chromatic aberration and grading, plus two custom effects.
  - Pixel sorting. "sorting the pixels of the screen color buffer, in our case vertically, by luminosity", run as a compute shader.
  - Datamosh. "store the last frame of the rendered color buffer and blended it with the current one via a noise mask", with motion vectors applied to the old frame first. "This post-process went through multiple iterations and the softer dream-like transition ended up in the final game."
- Asendorf's file says thresholds decide where a sorted span starts and ends, and has modes for white, black, bright and dark pixels. This is the algorithm the CDPR text refers to by description. The paper does not cite it.

### Viewed (Steam gameplay trailer, 022)

- About 24.5 s to 27.5 s. A hard cut from a dark red and teal first-person scene to a blue point-cloud frame. The frame is nearly still for about 3 s. Dots cluster along edges and vertical streaks smear outward at the frame sides. Then a hard cut to a clean street. I sampled at 6 fps and saw no tear, flash or dissolve at either cut.
- I could not tell from the trailer which in-game sequence this is. The look matches the paper's description of braindance and cyberspace rendering.
- Caveat. The cuts are editing, not necessarily the game's own transition.

### Read, safety precedent

- Hotfix 1.04 (December 2020) changed braindance: "Modified the flashing effect on braindances to reduce the risk of inducing epileptic symptoms. The effect has been smoothed out and the flashes reduced in frequency and magnitude." [Game Informer](https://www.gameinformer.com/2020/12/11/new-cyberpunk-2077-update-addresses-major-epilepsy-issue) quotes the patch notes. cyberpunk.net did not load, so this is a second-hand quote of a first-party text.

### Search only, not read

- FMX 2024 and GDC 2024, Mathieu Girard, "Creating the Blackwall VFX for Cyberpunk 2077: Phantom Liberty". Abstract only: custom shaders, narrative purpose, failed experiments. [FMX](https://fmx.de/en/program/program-2024/detail/event/28881) (read). The GDC pages ([schedule](https://schedule.gdconf.com/session/visual-effects-summit-creating-the-blackwall-vfx-for-cyberpunk-2077-phantom-liberty/901991), [vault](https://gdcvault.com/play/1034523/Visual-Effects-Summit-Creating-the)) returned 403 or were search snippets. Video-on-demand access might give real shader detail.
- Official videos I did not watch: [Night City Wire episode 1](https://www.youtube.com/watch?v=ToWfeUEAeeQ) (CDPR channel, 25:01, where press reports the first braindance demo) and the [Official Gameplay Trailer](https://www.youtube.com/watch?v=BO8lX3hDU30) (CDPR channel, 5:14). I did not check that the second matches the Steam 022 file. No timestamps are given for either.

## 3. Narita Boy

### Found

No developer talk, shader breakdown or making-of turned up in searches. The two interview pages (Game Rant, The Gamer) did not yield usable effect detail, one returned a bot wall. Everything below is observation of the official trailer only.

### Viewed (Steam launch trailer, 170 s; timestamps are from 2 s and 0.25 s samples, so about plus or minus 0.5 s)

- 0 s to 3 s. Opens on static noise, then the Studio Koba logo fades in. The triangle mark shows orange and blue offset copies behind it, like a three-plate misregistration. The text letters stay clean.
- About 5 s to 6 s. The retro Team17 logo has short horizontal slice displacement over part of the letters, then settles. A short, local glitch, not a whole-frame one.
- Most shots from about 20 s to 130 s sit inside a curved, rounded-corner CRT bezel with a vignette. It is absent on the "NARITA BOY" title card and the end card. This is probably trailer framing, not an in-game filter. I cannot tell from the trailer.
- Black cards with small monospace text ("HIM is back...", "The Creator has forgotten", "Explore the Digital Kingdom") cut hard in and out between shots. Several have a blue perspective-grid horizon line along the bottom edge (about 85 s to 100 s and 132 s to 136 s).
- About 30 s to 32 s. "Activating Narita Boy protocol". A white and green rectangular ring pulses around the figure on a blue CRT-shaped panel.
- About 134 s. A large glyph is defocused by a blur and then cut away.
- Not seen. No dissolve between levels, no screen tearing, no full-frame glitch. The trailer's visual identity is hard cuts, flat bright colour and layered glow. I do not claim the game shares this.

Other trailers I did not watch: Team17 [Launch Trailer on YouTube](https://www.youtube.com/watch?v=60bOP3nCi08) (2:51, the same length as the Steam file, not checked frame for frame), [Partnership Announcement](https://www.youtube.com/watch?v=8NawAz2clr8), Studio Koba's [2017 final trailer](https://www.youtube.com/watch?v=5SUos6MgTjA).

## 4. Contrasts

### Observer (Bloober Team, Unreal Engine 4), Viewed

Steam trailer, 60 fps.

- About 18 s. A near-black frame with a few isolated lit blocks and specks, no full image.
- About 57 s. A dark frame where one lit patch is broken into small square blocks (roughly 8 px at 1080p) and the rest stays black. The disruption is gated by brightness.
- About 60 s. A corridor whose walls are extruded, offset cuboids, desaturated, with a strong vignette. The disruption is in the geometry, not the picture.
- Use. A look where the glitch eats light, not the whole frame.
- Not found. A first-party breakdown. The Epic interview page returned 403, and I only saw its intro in a search snippet.

### Alien: Isolation (Creative Assembly), Read

- Alistair Hope: "It's a world very much of CRT, not LCD." The team transferred inventory and loading screens to VHS, played them on tube TVs, crushed cables and put magnets near the TV "to make it glitch and cause interference", filmed it, and re-imported the footage. [Engadget](https://www.engadget.com/2014-10-07-alien-isolation-launch-interview.html)
- Use. Hand-made, baked damage plates instead of generated noise. The result reads as warm and physical, in Hope's words, where digital reads "cold". I did not view footage, so the on-screen look is from the interview only.
- Fit. This overlaps D3 Tape, so I did not turn it into a proposal. The baked-plate idea is listed as an option in the notes below.

### SOMA

Not used. No first-party effect breakdown found. The only first-party artifact is Frictional's [Amnesia: Rebirth VideoDistortion API](https://wiki.frictionalgames.com/page/HPL3/Amnesia:_Rebirth/Scripting/cPostEffect_VideoDistortion) (amount, random seed, line density, offset multiplier, screen offset, screen bend), and it is for a different game.

## 5. Four proposed pairs

Each pair has a screen look (on in-world screen materials, new `MF_` function or branch) and a transition (a new `Kind` in `M_PP_Transition`). All endpoints are defined so `P=0` is the clean frame and `P=1` is exact black. Parameter numbers are starting points, not measured.

| Pair | Screen look | Transition | Reference | Differs from existing by |
|---|---|---|---|---|
| A | Drip | Melt-down | Cyberpunk pixel sort | Image-driven, one axis, no tears or blocks |
| B | Point scan | Reconstruct | Cyberpunk point cloud, Observer blocks | Sparse lit points on black, not a full-coverage mosaic |
| C | Trichroma | Colour-sequential | Narita Boy trailer logo misregistration | Three clean colour copies that snap, not tears or smear |
| D | Stale hold | Freeze-mosh | Cyberpunk datamosh | Old picture persists in regions, not new noise |

### A. Drip and Melt-down

- Observation. CDPR's post sorts the colour buffer vertically by luminosity (paper). The viewed point-cloud frame has vertical streaks at the sides.
- Inference. A true sort needs a compute pass and a sort network. A material can approximate it with a max-luminance smear: for each pixel, take N taps upward along the column and keep the brightest sample above a threshold. Streak length per column comes from a hash of the column id plus the seed, so streaks are stable.
- Screen look. Bright parts of the content run downward in short streaks, dark parts stay. The picture stays readable because only pixels above the threshold move. Threshold drifts with stepped time.
- Transition. The threshold falls from 1.0 (nothing qualifies, so the frame is identical) to 0 over `P` 0 to 0.8, streak length grows with `P`, and a final multiply fades to black over 0.8 to 1.0.
- Perceptual difference. D1 tears are random horizontal slips that ignore the image. This follows the image, flows in one direction and drains downward. It reads as something melting or falling, not corruption.
- Use. A hack failing, a memory collapsing, exiting a netrunning scene. Downward flow suggests loss.
- Cost, inference. 6 to 8 extra scene or Content samples in the glitch permutation only (the lab's `M_PP_Transition` has 6 today, `M_LCD_Master` has 4). Longer streaks can use two or three User Scene Texture passes (section 6). Use explicit-LOD sampling inside branches.
- Risk. At 6 to 8 taps, long streaks step visibly. Look at it with the pixel treatment off to confirm it still reads.

### B. Point scan and Reconstruct

- Observation. CDPR reconstructs scenes as sparse points (paper), and the viewed frame is mostly dark with dots along edges. Observer's trailer breaks a bright patch into small blocks on black.
- Screen look. Pixel cells of 6 to 8 px. Each cell draws one disc, radius from the cell-centre luminance, tinted, on black. Coverage thins in dark areas with a Bayer threshold. A thin band sweeps vertically and lifts the dots under it. Cell jitter comes from a hash of the cell id and the seed, so dots do not shimmer.
- Transition. `lerp(scene, dots, smoothstep(0, 0.3, P))`, then radius and coverage fall to 0 in hashed order by `P=0.9`, with the final fade at 1.0. The same function from 1 to 0 reveals the scene as a reconstruction.
- Perceptual difference. D6 Bitcrush and T4 Mosaic keep full-coverage coloured cells. This leaves most of the frame black and draws light as points. It reads as an image being rebuilt, not a degraded one.
- Use. Memory or recording playback, scanning, entering a device. The best candidate for a screen that is a data view, not a display.
- Cost, inference. One scene or Content sample per cell, plus ALU for the disc. Probably cheaper than the others.
- Runner rule. On screens it is a local pixel treatment, allowed. As a transition it runs only while `P` is above 0 and the blendable is removed at idle, like T4.
- Flash risk. Dots at 6 px or more with moderate contrast. A fine, high-contrast dot grid across the whole frame is the kind of pattern Xbox guideline 118 treats as a spatial pattern risk, so check it with Harding.

### C. Trichroma and Colour-sequential

- Observation. The trailer's Studio Koba logo has offset orange and blue copies behind the mark for the first seconds. Narita Boy's own text cards name a "Trichroma" but I did not link that to any rendering.
- Screen look. The Content is sampled three times and masked per channel, with large offsets (10 to 40 px equivalent) along three fixed directions. The offsets snap to a new hashed vector 2 to 4 times a second and hold. Where the copies do not overlap you see pure R, G and B ghosts. The picture is not otherwise damaged.
- Transition. Offsets scale with `P` along the three directions. Channels fade out in sequence: R from 0.5 to 0.7, G from 0.65 to 0.85, B from 0.8 to 1.0. The reveal runs it backward, so the colours converge. At `P=0` offsets are 0 and all gains are 1. At `P=1` all gains are 0.
- Perceptual difference. D3's chroma fringe is small and continuous. Here the split is large, discrete and readable as three separate images. The cover is colour-ordered, not a luminance fade.
- Use. Impact, power surge, a character's ability firing, a swap between two scenes where a brief colourful beat is wanted.
- Cost, inference. 3 samples. v1's T1 recipe included a channel split, so check the built `M_PP_Transition` for code to share. I did not open it.
- Flash risk. Channel fades are monotonic, not pulses. The saturated red ghost needs the red-flash check, and `FlashScale` should shrink offsets, not only brightness.

### D. Stale hold and Freeze-mosh

- Observation. CDPR keeps the previous frame and blends it with the current one through a noise mask, moving the old frame with motion vectors (paper). The shipped version was the softer one.
- Screen look. Hashed rectangular regions (24 to 64 px, varied aspect) show the Content from a short time ago, with a faint streak along the last motion. Needs content that changes over time (scroll, video or flipbook). I did not confirm what the lab's Content texture is. A static texture would show nothing.
- Transition, the high-complexity one. At cover start, grab one frame of the old scene into a render target. UE 5.8 source has `USceneCaptureComponent2D::CaptureScene()` (`SceneCaptureComponent2D.h` line 299), usable with `bCaptureEveryFrame` off. The post material shows that frame in regions that have not "updated" yet, smeared along the player's last horizontal movement, and hashed regions switch to live over `P`. The held frame also covers the load hitch, replacing the plain black hold.
- Perceptual difference. Every other look and transition here either adds noise or removes the picture. This keeps the old picture as stale content that gets replaced. It reads as the system failing to refresh.
- Use. Scene swaps where the player should feel continuity broken, not a dip to black. Narrative cuts between memories.
- Cost, inference. One extra scene render when the capture fires (a hitch risk, hidden because the frame is still the old scene) plus one full-resolution render target in memory. It also costs a UI-capture decision, because a scene capture does not include UMG.
- Fallback with no capture. A smear-only variant that uses the live frame: blocks hold a 1-row streak of themselves, which is closer to D2 and less distinct.
- Risk. The most work, and I have not seen a working UE example in 5.8. Build last, after A, B and C show which direction Mike wants.

### Suggested build order

B first (cheapest, most distinct), then C, then A. D only if the other three are rejected for lacking a "continuity" look.

## 6. UE 5.8 checks

Epic pages below were read through the 5.8 doc URLs unless noted. Engine facts marked source come from `C:/Program Files/Epic Games/UE_5.8/Engine/Source`, read only.

| Topic | What I confirmed | Use |
|---|---|---|
| Scene UV vs viewport UV | The ScreenPosition node's ViewportUV output is 0,0 at the viewport's top left and 1,1 at its bottom right. SceneTextureUV may differ because the render target "is potentially larger than the viewport" (editor, scene capture, split screen, VR). For pixel-size offsets, scale by the SceneTexture node's Size and InvSize outputs. `r.ViewPortTest` tests the variants. [Epic, Post process materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-materials-in-unreal-engine?application_version=5.8) | Build cell grids, rows and columns from ViewportUV and `ViewSize`. Sample with the scene texture's own UV. Never mix them. |
| Post-tonemap sampling | After Tonemapping is "the preferred location for performance since the color is LDR". It runs after tone mapping, grading and TAA, "the best spot for many simple post processing effects". With it, SceneTexture Post Process Inputs 2 and 3 select scene colour before or after the tonemapper (Epic's wording). Before Tonemapping gives HDR via Input 0. Same page | Keep After Tonemapping so hard cells, dots and channel copies stay crisp. Which Input gives the intended colour is not something I tested. The lab's transition already matches the clean frame within 0.8/255 at `P=0` per its README. |
| Post material cost | Epic: use post process materials "sparingly and only when you really need them". Alpha output is unsupported, use Opacity. Same page | One master with `Kind`, passes combined where possible. |
| Endpoint exactness | Not an Epic topic. Design rule: all effect strength and the final cover go through `lerp(scene, effect, w)` and a last multiply, where `w=0` at `P=0` and the multiply is 0 at `P=1`. Do not feed `P` into `frac` or `sin` terms that are non-zero at the ends. | Keep `P` clamped with `saturate`. Test by frame diff, as the lab already does. |
| Inactive cost | Source: `SceneView.cpp` lines 2014 to 2018 apply a blendable only when its local weight is above 0. Epic: `Is Blendable` false "causes each instance of the material to render independently (this can be potentially costly)". | Weight 0 or removing the blendable both skip the pass. Keep `Is Blendable` true. v1 recorded the same. |
| Stable seeds | Epic has no guidance. Design rule from v1: set `TransitionSeed` once per transition in the MPC, hash integer cell and row ids with it, use `floor(t*rate)` for beats. Engine PCG hashes are in `Random.ush` (v1). | Per-cell, per-row, per-column ids only. No per-frame hash on pixel position. |
| Reusable instances | Epic: "A new Material is compiled for every combination of static parameters in the base Material that are used by instances." Minimise static parameters. A static switch skips the masked branch at runtime. Constant instances are fixed before runtime, dynamic instances edit at runtime. [Epic, Instanced materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/instanced-materials-in-unreal-engine?application_version=5.8) | One static switch per master (`UseGlitch` already), a scalar `Kind` for the rest, one constant instance per look. Keep MPC as the driver (v1). |
| Custom nodes | "prevents constant folding and may use significantly more instructions than an equivalent version done with built in nodes". Be explicit with `float4`. [Epic, Custom material expressions](https://dev.epicgames.com/documentation/en-us/unreal-engine/custom-material-expressions-in-unreal-engine?application_version=5.8) | Keep the per-cell disc and the tap loop in one Custom node each, with everything else in nodes. |
| Multi-pass and history | [User Scene Textures](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-material-user-scene-textures-in-unreal-engine?application_version=5.8) are "user-defined transient render targets" written and read within post process materials. The page's example is a two-pass blur at Scene Color Before Bloom. Per the PP page, materials that write one are not blended. | Fine for longer streaks in A. They are not a previous-frame buffer, so they do not give datamosh history. D needs the capture route. |
| UI and HUD | Unconfirmed in 5.8, per v1. The lab has no HUD yet. | Check a post material against a real HUD before choosing. Use the cover-widget route from v1 if the transition must cover UI. |
| Flash and reduced motion | WCAG 2.3.1 and Xbox guideline 118 numbers are in v1 and I re-read both: more than three flashes per second, 10% luminance change, darker side under 0.80, red flash test `(R-G-B)*320 > 20` with saturated red at `R/(R+G+B) >= 0.8`. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html), [Xbox 118](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/118). CDPR had to patch braindance within days of launch (section 2). | Add `ReduceFlash` and `ReduceMotion` user settings that write to `MPC_Glitch`. In v2 looks `FlashScale` shrinks offsets and drip length as well as brightness. Run Harding on 60 fps captures of every new look. I did not run Harding. |

## 7. Uncertainty

- Narita Boy. No first-party effect explanation found, and the trailer's CRT bezel may be trailer framing. The "Trichroma" mapping in pair C is a design link, not a documented one.
- Cyberpunk. The paper gives mechanisms but not parameters. The viewed point-cloud shot is a trailer cut, and I did not identify the in-game scene.
- Timestamps are from sampled frames of the Steam files, about plus or minus 0.5 s. YouTube versions may be edited differently. None of the YouTube links were watched.
- Alien: Isolation and Observer are contrasts. I did not view Alien footage.
- Pair A's tap-based smear and pair B's disc cells are my approximations of the observed looks, not how those games work.
- Pair D depends on two things I did not check: what the lab's Content texture is, and how a scene capture behaves with Runner's streaming and fade.
- Frame cost for all four is reasoning from sample counts, not compiler output.
- Not read. GDC and FMX Blackwall talk video, Epic's Observer interview, the Game Rant and The Gamer Narita Boy interviews.
