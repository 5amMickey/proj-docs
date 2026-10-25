# ProjectRunner tasks

## Pitch, CMF Prototyping and trailer (intake closes 2026-11-10)

Plan: [pitch-plan.md](pitch-plan.md). CMF rules: [cmf/requirements.md](cmf/requirements.md). Refs: [refs/visual-reference.md](refs/visual-reference.md). Assets: [asset-pull-index.md](asset-pull-index.md).

- [x] P0 Index Development folder, CMF rules, refs and project state (2026-10-15).
- [x] P1 Mike answered the open questions (2026-10-15).
- [x] P2 Title, canon and one-page story. Draft in `story/one-pager.md` (2026-10-15); 60 "(draft)" inventions and 8 questions wait on Mike.
- [x] P3 Look test: three pixel treatments on one side-on street shot. Renders 2026-10-15 in `refs/wip/looktest/`. Mike picked A, textures only (2026-10-16). `L_LookTest` is now the startup and default game map, playable with PRGameMode and a follow camera with depth of field (`Scripts/pr_setup_looktest_play.py`).
  - [ ] Mike walks the street and gives notes on the look.
- [ ] P4b Trailer route, five areas (`pitch-plan.md` B2)
  - [x] Import Mike's three mechs (`Scripts/pr_import_mechs.py`; the FBX clips are single poses, so walk and fly cycles are still needed)
  - [x] Block out all five areas in the C layout (`Scripts/pr_build_trailer.py`, maps in `/Game/ProjectRunner/Maps/Trailer/`; renders in `refs/wip/trailer/blockout_2026-10-16/`)
  - [x] Walk between areas both ways for testing (2026-10-16): each area's exit opens the next at `Start`; walking off an area's start opens the previous one at `End`, a few metres before its exit (`Scripts/pr_trailer_links.py`). Area 1 and area 5 link both ways. Checked in PIE, the full loop forward and back.
  - [ ] Decide the lead's gait options. For level testing, `pr.TestRun` (on by default) runs, with Left Shift or the left stick to sprint; `pr.TestRun 0` is the G1 walk. G1 tests force the walk and haven't been rerun since (2026-10-16).
  - [x] Packs into `C:\Prod\AssetPacks` (2026-10-16): Cyberpunk Rooftop Market (Leartes, `Content/CyberpunkRooftopMarket`, 1,009 files) unzipped; Future Slums was already there (`Content/TheFloatingSlums`). Mike's Procedural Modeling Cyberpunk Escalator tutorial (UE 4.26) copied to `Content/ProceduralEscalator` plus the level's dependencies, Houdini project in `SourceFiles/ProceduralEscalator`. Both levels load in 5.8 headless (2,908 and 2,264 actors).
  - [x] Escalator in 5.8 (2026-10-16): `ProceduralEscalator_UE58` map in AssetPacks with the author's 4.26 cook placed at the Houdini Engine actor's position. Houdini 22 cook of the HDA with the level's values exported as `SM_Escalator_Cyberpunk_01.fbx` (181k tris, 14 slots, screens wired back in) from `SourceFiles/ProceduralEscalator/Houdini/.../ProceduralEscalator_UE58_02.hiplc`, imported to `/Game/ProceduralEscalator/Escalator/`. LCD look: `Master_Led_Escalator` with `T_Led_mask` and `SM_Led_Glitch`. Stills in `refs/wip/escalator_2026-10-16/`.
  - [x] LCD look tests in AssetPacks (2026-10-16): `/Game/LCDLab/Materials/M_LCD_Master` (content UV turn/scale/pan, T_Led_mask pixels, RGB subpixels, scanlines, flicker, glitch, colour grid, off-angle falloff) and eight instances on screens in `/Game/LCDLab/L_LCD_Lab`. Build script `C:\Prod\AssetPacks\SourceFiles\LCDLab_build.py`. Stills in `refs/wip/lcd_2026-10-16/`. Mike likes all eight as a starting point (2026-10-16); second row added: 01a-c terminal code repeated top to bottom at three scroll speeds, 04b-h Naga grid recoloured in two tones (SecondaryTint: from the texture's blue/red split, or left to right with SecondaryFromUV), static. Sticker panel image to be replaced.
  - [ ] Dress area 1, Wasteland. Mechs on paths done (`APRPathMover`, `Scripts/pr_dress_tr01_mechs.py`). Set first pass done 2026-10-16 (`Scripts/pr_dress_tr01_set.py`: Future Slums trash, shacks and towers, poles, tankers; world-aligned ground `M_TR_GroundWorld`). Storm and gate done 2026-10-17 (`Scripts/pr_dress_tr01_storm.py`): overcast light, rain from X 9000 getting heavier from 5500 (`APRWeatherZone`, 3+4 P_RainStorm copies, splashes, loop), lightning (`APRLightning`, 15 lux), gate (`APRGate`: lead stops, doors open, glow, `CAM_Gate` zone, white fade into area 2 via new PhantomInteraction `TravelToWithCover`, uncommitted in the _Library plugin repo). Stills in `refs/wip/trailer/storm_2026-10-17/`. Landscape done 2026-10-17 (`Scripts/pr_dress_tr01_landscape.py`): ModularSciFi's landscape material (copied from AssetPacks to `/Game/ModularSciFi`, git-ignored) on a 1 km x 630 m Landscape made by the new `UPRLandscapeLibrary::CreateLandscape` (Python can't create one); low bumps along the walk, mounds behind the trash line, dunes to 33 m on the skyline; props settled onto it (original Z in `PRZ0` tags); sinks to -4 m under areas 2-5 so `L_TR_Persistent` stays clean (traced: no terrain above any floor); blockout Ground box hidden. Rerun it after `pr_dress_tr01_set.py` or `pr_dress_tr01_mechs.py`. Stills in `refs/wip/trailer/landscape_split_2026-10-17/`. Hangar pass removed again 2026-10-17 (Mike: scattered; the Hangar pack goes to the warehouse and market; `pr_dress_tr01_hangar.py` kept as reference). Same day: all debris off (`pr_dress_tr01_set.DEBRIS = False`), one of each ConstructionSite rubble piece (`Scripts/pr_dress_tr01_rubble.py`), Mike's start wall restored (two resized blockout cubes past X 16000, lost to the set script on 2026-10-16, now `StartWall_*`), background fog thicker (`pr_dress_tr01_storm.FOG_DENSITY`, `FOG_START`), wet ground (`pr_dress_tr01_landscape.WET`, the pack material's wetness parameters), sun specular off the wet ground. Stills in `refs/wip/trailer/wasteland_2026-10-17b/`. Still to do: thunder sound (left for later), skyline; Mike to judge the ground's look (only the Sand layer is painted; Soil and Bedrock need layer infos).
  - [x] LCD set imported into Runner (2026-10-16): `/Game/ProjectRunner/LCD` (master, 18 instances, `L_LCD_Lab`), `Scripts/pr_build_lcd.py`, sources in `Unreal/SourceArt/LCD`.
  - [ ] LCD screens across areas 1-5 (`Scripts/pr_dress_lcd.py`, 2026-10-17): signs and billboard ad slots restyled, new screens placed; naga looks left out (USE_NAGA). Checked in PIE: areas 2 and 5 good. Still to check: area 4 facade screens didn't show in the test frame, area 3 billboards, area 1 broken screens; terminal looks over-represented (weight by family). Rerun after pr_dress_tr03_alley.py.
  - [x] Split area 2 (2026-10-17, `Scripts/pr_split_tr02.py`): warehouse stays in `L_TR_02_Waystation`, container market moved to new `L_TR_02B_Market` (keeps the warehouse shell as backdrop), own lanes, cameras and starts; route 1 -> 2 -> 2B -> 3 with back links (`pr_trailer_links.py` area "2b"); added to `L_TR_Persistent`. Walked in PIE: warehouse -> market -> warehouse. `pr_dress_tr02_waystation.py` and `pr_dress_lcd.py` now dress each map separately (edited, not rerun). Rebuilding area 2 in `pr_build_trailer.py` makes the combined map again.
  - [x] Packs consolidated (2026-10-17): every pack copied from AssetPacks now lives in `/Game/ThirdParty/<Pack>` (CastleTown, ConstructionSite, Cyberpunk, Hangar, ModularSciFi, SlumAlley, SoulCity, TheFloatingSlums), git-ignored as one folder; scripts repointed; no missing references. Museum map `/Game/ProjectRunner/Museum/L_PackMuseum` (`Scripts/pr_build_museum.py`). Cyberpunk trains, boats, lanterns, magnets left out. Stills in `refs/wip/museum_2026-10-17/`.
  - [x] Cyberpunk buildings reworked (2026-10-17, option A): `/Game/ProjectRunner/Buildings/Rework/BP_PR_*` (`Scripts/pr_rework_cyber_buildings.py`): metal awnings, pagoda tops and tile eaves off, flat slab, metal rails, LCD looks on the sign screens, rooftop AC, vents, antennas. Stills in `refs/wip/cyber_rework_2026-10-17/`. Open: the pack's sign images look AI-generated, so not used for new LCD looks (Mike to decide); House E slab overhang and rooftop dressing; place them in scenes.
  - [ ] Dress area 2, Waystation and market. First pass done 2026-10-16 (`Scripts/pr_dress_tr02_waystation.py`: trusses, floodlights, weld sparks, wet floor, storefront spill, bulbs, cranes). Still to do: pack props for the tech piles and stalls, crowd, rain.
  - [ ] Dress area 3, Food alley. First pass done 2026-10-16 (`Scripts/pr_dress_tr03_alley.py`: Big Slum Alley both sides, lanterns; widened to about twice the showcase width and the blocked mouth opened, 2026-10-16). Still to do: food stalls and props, crowd eating and drinking, remove signs with readable text, corner dressing.
  - [ ] Dress area 4, Red-light district
  - [ ] Dress area 5, Station market
- [ ] P4 Vertical slice scene: street into one interior, final look, G1 systems.
- [ ] P5 Gameplay capture (both branches) and 60-75 s teaser, hosted on links that will stay live for 5 months.
- [ ] P6 Pitch deck.
- [ ] P7 CMF documents: D1-D19 in [pitch-plan.md](pitch-plan.md) workstream D (10 to make, 9 to add). Drafts in `cmf/drafts/`.
  - [x] First drafts of D6, D7, D8, D11-D18 (2026-10-15). Gaps marked "Needs Mike" in each file.
  - [x] D1 originality (about 5 pages), D2 summary, D10 Dialogue fields drafted (2026-10-15). Market numbers still in brackets until D3/D4 land.
  - [ ] D3 market study, D4 revenue model (in progress).
  - [ ] D5 budget: waits on team hours, rates and financing.
- [ ] P8 Nice-to-haves from the plan, as time allows.
- [x] P8a Landing page built at `C:\Prod\ProjectRunner\Web\` (2026-10-15). Needs contact email, press kit link, final copy and look-test images.
- [ ] P9 Mike signs forms and adds company records (D5, D6, D8, D14-D17).
- [ ] P10 Submit in Dialogue by 2026-11-06.

### Branded documents (started 2026-10-16)

Source files: `Documents\Development\branding` (Phantom Break Studio business cards, v14). Studio colours stay fixed. Each game uses them with its own palette and theme. "Phantom Break Studio" is the display name, and "Phantom Break Inc." is used only where the legal name is required.

- [x] B1 Studio kit in `$PROJ_DOCS/brand/`: logos, ghost, pattern, colours, fonts, `tokens.css`, `BRAND.md` (2026-10-16). Logos cut from the card SVGs and checked in a Brave render.
- [x] B2 Project Runner theme: `ProjectRunner/brand.md` and `C:\Prod\ProjectRunner\Docs\brand\runner-theme.css` (2026-10-16).
- [x] B3 Landing page restyled with the Runner theme and studio frame (`Web/`). Previews in `Web/_preview/` (2026-10-16).
- [x] B4 Pitch deck template: HTML slides rendered to a 16:9 PDF with Brave (`Docs\deck\`), 10 layouts (2026-10-16). P6 builds the real deck on it.
- [x] B5 Word templates: studio letterhead and a Project Runner document, Roboto embedded, checked with a LibreOffice render (2026-10-16).
- [ ] B6 Mike reviews the kit: Runner palette, pixel font for game headings, contact email for the site.
- [x] B7 Landing page restyled to the Indie Folk Fest reference (panels with tabs, coral story band, quote, city image, studio footer) and moved to Tailwind v4 with the deck (2026-10-16). Site ground is slate-deep; deck stays night. Open: hero line art (slot only), `[filler]` text on the Gameplay cards, `[draft]` episode and quote copy.

## UI pass and hacking minigame (started 2026-10-21)

Refs: Dispatch screens in `refs/ui/dispatch/` (from gameuidatabase.com, 33 stills and the dialogue-choice clip). Proof: `refs/wip/ui_2026-10-21/` (20 shots from `ProjectRunner.UI.Screens`).

- [x] U1 Side bars when crouching under the passage ceiling (2026-10-21). Cine cameras defaulted to a constrained 4:3 aspect. Off on CAM_Passage, CAM_RoomC, the three Vex shots and the three cutscene cameras (`Scripts/pr_fix_g1_ui.py`); `pr_build_g1.py` turns it off for new ones.
- [x] U2 Position-based prompts (2026-10-21): a four-dot diamond with the button to press filled, L/R shoulders, a stick, and +/-; keyboard shows key caps. Follows the last device; Settings > Button prompts can force one. Choices sit where their button is: 1 bottom, 2 left/right, 3 left/top/right; keys 1-3 by order.
- [x] U3 Fonts and sizes (2026-10-21): Chakra Petch (body, labels) and Saira Extra Condensed ExtraBold (headings), OFL, in `Content/ProjectRunner/UI/Fonts`, loaded from disk and staged for packaging. Subtitles 40 px at 1080p by default (32-56 in settings). Claude picked the fonts; Mike to confirm or swap (one file list in `PRUIDraw.cpp`).
- [x] U4 Film-style dialogue (2026-10-21): subtitles at the bottom, speaker name above in a per-character colour, lines move on after their reading time (or audio), Interact skips a line. Choices show only when a line has them, with the Dispatch timer bar and the "limited time" notice; the pick flashes coral. `remember:<Name>`, `toast:` and `hint:` StoryFlow tags show corner notices; the Vex truth and lie replies now carry `remember:Vex`. Hold Interact for 1 s to skip a cutscene.
- [x] U4b Choice timing (2026-10-21, Mike's notes): the choice line plays as a subtitle for its reading time (Interact cuts it short), then slides up while the choices fade in below it; the timer starts 0.5 s later (`UPNStoryDirectorComponent::bHoldChoiceTimer`). Choices can't be picked before they show. Glyphs form a diamond in the middle, with even gaps to the pills; the timer bar spans the choices. G1 tests check the order.
- [x] U5 Menus (2026-10-21): title (Continue / New game / Settings / Quit; `pr.TitleScreen` 1 = packaged game only, 2 = PIE too), pause (scene and episode, last save time), settings in four tabs (General, Display, Sound, Accessibility, with a live subtitle preview), conversation log (lines and choices made), confirm boxes. Keyboard, mouse and controller. Pause is P or Start in PIE, plus Esc in a packaged game.
  - Music, Effects and Voice volume are saved but do nothing yet: the project has no sound classes. Colour filter applies only in a packaged game.
- [x] U6 Proof (2026-10-21): editor build 0 errors; G1 headless tests pass on all four branches; `ProjectRunner.UI.Screens` passes in a windowed editor and saves the 20 shots.
- [ ] U7 Mike plays `L_PR_Persistent` and gives notes on the UI (fonts, sizes, colours, glyph style).
- [x] U8 Hacking, first pass (2026-10-21): one press on a hack device plays a cinematic. Over-the-shoulder shot with a cyan breach panel (scrolling hex, segmented bar, %) filling over `HackSeconds` (2.5 s), "access granted" for 0.6 s, a cut to the door sliding up over 1.2 s, then back to the zone camera. Cameras are placed from the lead, the device and the door, or set by hand (`HackCamera`, `DoorCamera` on `APRHackDevice`). G1 tests and `ProjectRunner.UI.Screens` cover it (shots `pr_ui_hack_*`).
- [ ] U8b The actual minigame on top of the cinematic: design to agree with Mike.
- [ ] U9 Dispatch screens not built yet: episode select with scene thumbnails, end-of-episode choice summary, extras, tutorials. Choice percentages need an online service, so the log shows your own choices instead.
- [ ] U10 The game target (`RunnerSandbox_01 Win64 Development`) doesn't build: `PRLandscapeLibrary` uses the editor-only Landscape module. This was already the case before the UI pass. It needs moving to an editor module or wrapping in `WITH_EDITOR` before packaging.

## Steam and smoke VFX look test (started 2026-10-23)

Brief: `HoudiniSource/docs/briefs/runner_steam_vfx.md`. Research: `HoudiniSource/docs/research/pixel_smoke_look.md`, `houdini_flipbook_pipeline.md`. Mike's picks: four looks (2-tone, 3-tone with outline, grey, neon-lit), 64 and 128 px/m, 8 and 12 fps, new `L_VFXMuseum`.

- [x] V1 Houdini scene `asset_vfxBuilder_01.hiplc` (HoudiniSource): vent, stall and cig puff sims cached to `geo/sim`. Sparse pyro, coarse voxels, source limited to the first frames so one puff rises and thins; cig takes ~16s to cache, vent ~5s.
- [x] V2 Karma renders: six-direction light passes per frame (`pos` = red +X, green +Y, blue +Z; `neg` the opposite), `render/vfx/<src>_<pass>.####.exr`, every 2nd frame to frame 63. ~5 min per source.
- [x] V3 Copernicus looks: `/obj/vfx_looks/pixel_sheet` subnet builds four looks (2-tone, 3-tone + outline, grey, lit albedo + normal) and tiles 32 frames into an 8x4 sheet. 30 sheets in `tex/vfx/` (3 sources x 5 looks x 64/128 px), rendered directly by a throwaway loop over the subnet parms (the HDA wrapper `mike::vfx_pixel_sheet::1.0` exists but its parms didn't promote, so it is not used yet). Verified: tone2 has 2 greys + hard alpha, tone3 4 values, normal averages ~(0.5,0.5,1.0).
- [x] V4 UE: 30 sheets imported (Nearest, no mips, 2D Pixels group), 2 masters (`M_VFX_PixelSteam`, `_Lit`) + 20 instances, 9 Niagara systems (`NS_Steam_<src>_<f8|f12|free>`) under `/Game/ProjectRunner/VFX/Steam/`. Scripts: `pr_build_vfx_materials.py`, `pr_build_vfx_niagara.py` (both via MCP), import in `pr_build_vfx_steam.py`.
- [x] V5 `L_VFXMuseum` built by `Scripts/pr_build_vfx_steam.py` (editor Python via `pr_remote.py`): a dark room, 17 labelled columns (4 looks x 64/128 px x 8/12 fps, plus one unsnapped), each with vent on the floor, stall and cig on shelves. 51 FX actors. Stills in `refs/wip/vfx_museum_2026-10-23/`.
- [ ] V6 Mike walks `L_VFXMuseum` and picks a look, pixel density and frame rate. Open polish: the three source rows sit at different heights so no single pose frames all three; consider one row per look instead. The lit look needs brighter scene light to read.

### Reoriented 2026-10-24: one looping smoke column, stock tools, then a pixel filter

Mike's picks: one looping column, baked colour only, compare Copernicus and Pixel8r. Scene `HoudiniSource/ProjectRunner/vfx_smoke/asset_smokeColumn_02.hiplc` (v02 fixes the Pixel8r input; v01 kept). The old museum above stays untouched.

- [x] S1 Sim: volume-scatter source, Pyro Solver (0.03 voxels, 2 substeps, dissipation 0.2, turbulence 1.0), cached 1-145 to `geo/sim/`. Labs Loop Volume over 81-145 (overlay source must be Self; Second Input errors with nothing wired).
- [x] S2 Flipbook: Pyro Bake Volume -> Labs Flipbook Textures (final colour only), 32 frames (81-143 step 2), 8x4 of 512x1024 = 4096². The Labs viewport render ignores ortho cameras, so `cam_flipbook` is a 500 mm lens at 24.14 m (2 m wide frame). PNG is straight alpha.
- [x] S3 Filters in `/obj/smoke_pixel` (Copernicus) and `/obj/pixel8r_tops` (sbsrender): Raw (Mitchell 2048), Copernicus box 64 px/m, Copernicus posterize 1/8 steps, Pixel8r 12-colour palette, Pixel8r Bayer dither + palette. Pixel8r drops alpha, so its RGB is joined with the box alpha. 1024² sheets in `vfx_smoke/tex/`. Still: `refs/wip/vfx_smokecolumn_2026-10-24/`.
- [x] S4 UE material `M_VFX_SmokeFlipbook` and `NS_SmokeColumn` under `/Game/ProjectRunner/VFX/SmokeColumn/` (built by `Scripts/pr_build_smoke_column_mcp.py`).
- [x] S5 Sheets imported and `L_VFXSmokeColumn` built (2026-10-25: 5 textures, 5 instances, 16 actors, no errors). Stills from Simulate: `ue_smokecolumn_a.png` and close-ups in `refs/wip/vfx_smokecolumn_2026-10-24/`.
  - Pixel8r fix in v02: its generated palette is weighted by the input's alpha, so writing RGBA dropped the thin dark smoke from the palette (darkest entry 0.64, wisps clamped bright). Now the input is written RGB only (`drop_alpha_for_p8`, unpremultiply off) and the fill only touches alpha-0 pixels; palette spans 19-206 and the Pixel8r sheets match the box tones per alpha band.
- [x] S6 Mike's pick (2026-10-25): Copernicus posterized 64 px/m, kept as the jet / power-vent look.
- [x] S7 Pass 2 at 32 px/m for the other four (Raw smooth, box, Pixel8r palette, Pixel8r dither): columns 7-8 in `asset_smokeColumn_03.hiplc`, Pixel8r jobs `*_32` (pixel count 512). `L_VFXSmokeColumn` now shows posterized 64 next to the four 32 px/m sheets; stills `ue_pass2_*.png`.
- [ ] S8 Mike reviews pass 2.
- [x] S9 Steam variants test built (2026-10-25). Mike's filters: Copernicus posterized 64 px/m and Pixel8r 12-colour palette (no dither) 32 px/m. Scene `vfx_smoke/asset_steamVariants_01.hiplc`: 11 stage objects (cooking, sewer, coldroll, coldfall, acexhaust, pipeburst, cigarette, groundfog, firebarrel, electrical, breath), shared render (OpenGL ROP, headless), COP2 Mosaic sheet, Copernicus filters and Pixel8r TOP, all driven by `/obj/steam_control` variant; lint passes. UE: `NS_Steam_<Name>` (copies of NS_SmokeColumn), 22 textures and instances, level `L_VFXSteamVariants` (one bay per variant, grey stand-ins). Stills in `refs/wip/vfx_steamvariants_2026-10-25/`.
- [ ] S10 Mike reviews the variants and picks which to keep or tune.

## Interior generators (room, bar, clinic, workshop)

**Archived 2026-10-02.** The environment restart moved this work to `HoudiniSource/archive/env_v1/`. Open items below won't be done.

Refs: [refs/](refs/). Side-on, fixed-camera scenes. UE pixelates the render, so detail stays low to mid. Props are modeled in Houdini. Rooms stand alone. Output is emissive materials plus light points. Cameras are placed in UE.

Defaults picked 2026-09-29 (change any of them): Houdini metres, Y up. Floor centred on the origin. Back wall at -Z, front open at +Z. Room 8 x 5 x 3.6 m. Counter 1.1 m high, stool seat 0.75 m, character 1.8 m.

Scene: `C:\Prod\ProjectRunner\Houdini\asset_interiorBuilder_NN.hiplc`. HDAs go in `Houdini/hda/`.

- [x] **M1 Shell.** `mike::room_shell::1.0` builds the floor, the back wall, optional side walls, and a ceiling (none, flat, or sloped glazed). The back wall can have a glazed window, and a side wall can have a door. A shelf niche isn't built yet. Done when it cooks clean at default settings and with every toggle on.
- [x] **M2 Materials and props.** `mike::room_mat::1.0` tags the material slot and Cd. `mike::room_props::1.0` holds the shared props: stool, bottle, pendant lamp, wall screen, neon sign, poster, and crate. Done when every prop and variant cooks clean and sits on its mount (floor at y=0, wall props at z=0 facing +Z).
- [x] **M3 Bar program.** `mike::room_bar::1.0` places a counter, back-bar shelves with backlight, bottles, stools, pendants, screens, and neon. Output 1 is geometry, output 2 is light points. Done when it cooks clean over three seeds and two room sizes, and a side-on render is saved to `refs/wip/`.
- [ ] **M4 Wall dressing.** `mike::room_dressing::1.0` adds cables, pipes, vents, and posters, driven by a density setting.
- [ ] **M5 UE test.** Export the bar room, import it into RunnerSandbox, place a camera, and apply pixelation.
- [ ] **M6 Clinic program:** surgical chair, arm lamp, carts, monitors.
- [ ] **M7 Workshop program:** desk, monitor wall, racks.
- [ ] **M8 Room program:** bed, TV, and window seat, using the sloped glazed roof option.
- [ ] **M9 Interior trim sheet and UVs.**

## Destruction tools (`mike::destruct_*`)

**Archived 2026-10-02.** The environment restart moved this work to `HoudiniSource/archive/env_v1/`. Open items below won't be done.

Brief: `HoudiniSource/docs/briefs/destruct_concrete.md`. Scene: `Houdini/asset_destructBuilder_01.hiplc`. Reference: `HoudiniSource/sandbox/grot_ruins_project_files`.

- [x] **D0 Research.** Get the Houdini Engine 3.0 output attributes (Geometry Collection, collision, instancing, naming, inputs) from the plugin source. Saved to `refs/research-houdini-engine-ue5-outputs.md`.
- [x] **D1 Presets.** Build the wall panel, jersey barrier, pillar and slab, with UVs and the `surface` slot. Input 1 overrides the preset.
- [x] **D2 Damage mask.** Combine impact pieces and points (input 2), the Impacts multiparm, and painted `Cd` (point or vertex) into damage points with `pscale`, scaled by `damage_amount` and the state.
- [x] **D3 Fracture.** Stretched Voronoi with clusters, interior noise and the `interior` slot, then the intact, damaged and destroyed states.
- [x] **D4 Rebar and cracks.**
- [x] **D5 Rubble.** Instanced chunks on the ground.
- [x] **D6 UE outputs.** Output 1 static mesh with cracks and `collision_geo_ucx_multi`, output 2 Geometry Collection, output 3 rebar, output 4 rubble instances.
- [x] **D7 HDA and proof.** Save `mike.destruct_concrete.1.0.hdalc`, then run the cook matrix and the brief's acceptance checks.
- [ ] **D8 UE test.** Instance it in RunnerSandbox with a static mesh and a Geometry Collection, and check that the GC breaks in PIE. Save a recording to `refs/wip/`.

## Environment kit (pixel trim)

**Superseded 2026-10-07** by Environment kit 2. Its trim sheets, atlases and props aren't reused.

Decisions are in the brief (2026-10-02). Work happens in `C:\Prod\Sandbox`. Houdini files are in `HoudiniSource/ProjectSandbox`, and the build script is `scripts/trim_build/build.py`.

- [x] **E1 Palette.** Cut Endesga 64 down to material ramps plus neon accents. Save `tex/palette/palette.json` and a swatch image.
- [x] **E2 Test trim sheet.** `asset_trimBuilder_02.hiplc` (same maps as `_01`, COP network laid out for debugging) builds the strip layout, detail, normals and palette mapping in COPs, and exports BC, N, ORM and E maps at 32 and 64 px/m.
- [x] **E3 Test props.** `mike::trim_box::1.0` (`hda/mike.trim_box.1.0.hdalc`) with Crate and AC Unit presets in `asset_propBuilder_01.hiplc`. Every face maps to one strip, and it outputs `unreal_material` for Houdini Engine. `verify_props.py` passes: crate 64 tris, AC unit 48 tris.
- [x] **E4 UE test.** In `C:\Prod\Sandbox\Unreal\Sandbox_01` (GASP 5.8 with Houdini Engine 3.0 for H22.0.429), `L_TrimTest` holds a crate and an AC unit at each density, cooked live through Houdini Engine. `ue_trim_check.py` passes for all four: 100 x 100 x 100 cm and 80 x 37.5 x 62.5 cm, with the right material. Screenshots are `refs/wip/trim_test_room.png` (8 m framing) and `trim_test_close.png` (3 m).
- [x] **E5 Lock the density.** 64 px/m (Mike, 2026-10-02). Mipmaps are still open; see the log.
- [x] **E6 Full prop trim sheet and atlas.**
  - [x] E6a Strips. `asset_trimBuilder_03.hiplc`: 20 strips natively at 64 px/m on a 1024 sheet with 8-texel gutters (mip-safe to mip 3). `mike::trim_box::1.1` in `asset_propBuilder_02.hiplc`. UE mips on (simple average, point-sampled). `L_TrimTest` passes; shot `refs/wip/trim_sheet_e6.png`.
  - [x] E6b Atlas cells. `scripts/trim_build/atlas.py` paints ten cells texel by texel (vending front, large fan, AC front, round vent, screen, keypad, gauge, three signs) into `asset_trimBuilder_04.hiplc`. `mike::trim_box::1.2` maps a front face to a cell (AC unit, new Vending preset). verify.py checks every atlas texel; verify_props.py and ue_trim_check.py pass for all three props. Shot `refs/wip/trim_atlas_e6b.png`.
- [x] **E7 Decal atlas and sign atlas.** `asset_decalBuilder_01.hiplc` (scripts in `ProjectSandbox/scripts/decal_build/`).
  - Sign atlas `tex/sign_pixel/T_SignPixel_Glyphs.png`: 512 px, 16 x 16 cells of 32 px (0.5 m glyphs at 64 px/m) in the facade's glyph order, plus 13 icons in cells 243-255. R core, G outline, B halo.
  - Decal atlas `tex/decal_pixel/T_DecalPixel_{BC,Opacity,N,ORM}.png`: 26 decals at 64 px/m (posters, flyers, stickers, graffiti, stains, rust, cracks, puddle, manhole, drain, road line, arrow, floor tape). UV table in `decals.json`.
  - `mike::pixel_sign::1.0` (`asset_signBuilder_01.hiplc`): trim-sheet board plus glyph quads, eight neon colours, horizontal or vertical, icons as `{name}`.
  - UE: `M_Sign`, `M_Decal`, `MI_Decal_*`; `L_TrimTest` has 3 signs and 21 decals. `verify_decals.py`, `verify_sign_hda.py` and `ue_e7_check.py` pass. Shots `refs/wip/e7_signs_decals.png`, `e7_floor_decals.png`.
- [ ] **E8 Props, tier by tier.** Review each tier in UE before starting the next.
  - [x] Tier 1, box + trim: `mike::trim_box::1.3` presets PC tower, server rack, fuse box, utility cabinet, tool chest, washing machine, CRT TV, speaker and wood crate (plus crate, AC unit, vending). New atlas cells in `asset_trimBuilder_05.hiplc`. `verify_props.py` and `ue_props_check.py` pass for all 12 in `L_PropsT1`. Shots `refs/wip/e8_tier1_{left,right}.png`. Waiting on Mike's review.
  - [x] Tier 2, box + a little geo (16): shipping container, container shop, AC condenser, bar and kitchen counters, desk, workbench, kiosk, serving window, water tank, rooftop shack, ticket machine, drinks fridge, arcade cabinet, bed, sofa.
  - [x] Tier 3, real geometry (29): stool, chair, cafe table, oil and plastic drums, traffic cone, bollard, hydrant, bottles, glasses, pendant lamp, paper lantern, street lamp, desk lamp, utility pole, antenna, satellite dish, railing, ladder, stairs, food cart, hand truck, bike, monitor, TV bracket, security camera, awning, canopy, plant pot.
  - [x] Tier 4, curves (5): cable run, pipe run, conduit, laundry line, lantern string.
  - [x] Library: `/Game/Sandbox/Maps/L_PropLibrary` in Sandbox_01, a corridor of bays (T1, T2, T3, T4, Signs, Decals) with labels and a camera per bay. 69 baked static meshes in `/Game/Sandbox/Library/<group>/SM_*` plus 26 decals. `verify_kit.py` (50 presets) and `ue_library_check.py` pass. Shots `refs/wip/library_*.png`. Waiting on Mike's review.
  - [x] Houdini library: `asset_propLibrary_01.hiplc` (`scripts/library/build_library.py`), the same bays as live HDA nodes (`lib_<group>_<key>`) plus the decals, the four atlases and one facade, with preview shaders and a camera per bay. 73 objects cook with 0 errors.
  - [ ] Not built: cloth (bedding, throws), security grille, cage, sign truss, litter.

## Environment kit 2 (bake to low)

Started 2026-10-07. Brief: `HoudiniSource/docs/briefs/runner_props.md`. Scene `HoudiniSource/ProjectRunner/asset_propBuilder_01.hiplc`, HDAs in `ProjectRunner/hda/`. UE test level `L_TexelTest` in RunnerSandbox_01.

- [x] **K1 Detail switch.** `mike::env_detail_switch::1.0`: Blockout/Low/High menu, UCX collision from the blockout.
- [x] **K2 First prop.** `mike::prop_vending_drinks::1.0`: Blockout, Low (boxes, at most 4-sided polygons, closed, UVs at density), High (bevels, bottles, edge damage, `mat_id`).
- [x] **K3 Bake.** `mike::env_bake_maps::1.0`: stock Bake Geometry Textures COP (Labs Maps Baker is deprecated, removed in H23) at the density's resolution, Supersample 1/2/4x, Ray Offset so parts sitting proud of the shell win.
- [x] **K4 Sign fill.** `mike::env_texture_signfill::1.0`: blurred blocks or colour field, no text.
- [x] **K5 Texture.** `mike::env_texture_cops::1.0`: BC, N, ORM, E from the bakes. Density menu, Pixel Art toggle, Endesga 64 ramps.
- [ ] **K6 Export and density test.** Houdini side done 2026-10-07: FBX plus maps at 64-512 px/m, Pixel Art on and off, in `ProjectRunner/tex/<Asset>/<density>px[_smooth]/`. UE: 4 meshes, 128 textures (Pixel Art sets nearest-filtered and uncompressed), `/Game/Houdini/Materials/M_EnvProp` and 32 instances `MI_<Asset>_<density>px[_smooth]` imported 2026-10-07 under `/Game/Houdini/Props/`. `/Game/ProjectRunner/Maps/L_TexelTest` exists (copy of Template_Default) but isn't laid out: the editor won't leave `L_PR_Persistent` while it has unsaved changes. `SM_VendingMachine_Drinks_01` plus maps at 64, 128, 256 and 512 px/m, with Pixel Art on and off. Import into `L_TexelTest` with a game-camera bookmark. Mike picks the density.
- [x] **K7 Other props.** `mike::prop_terminal_hack`, `mike::prop_acunit_wall`, `mike::prop_sign_neon`, all through the same core.
- [x] **K8 Verify.** 2026-10-07: 39/39 checks per prop, lint passes on 8 HDAs and 8 networks. Every acceptance criterion in the brief, checked with hython output and `lint`.
- [ ] **K9 UE reimports.** Blocked on the editor MCP: it can't read or set import source paths or reimport skeletal meshes. Do it by hand (Reimport With New File). Repoint `SKM_Female_Body_01`, `SKM_Male_Body_01` and `SKM_Cast_Vhoori_01` from `ProjectCyberRunner` to `C:\Prod\ProjectRunner\Houdini\geo\export\`.

## Textures (Designer, Painter, Pixel8r)

Skill: `texture-pipeline`. Research: `HoudiniSource/docs/research/texture_pipeline.md`.

- [x] Pixel8r 2 in `Development/_assets/_substance/Pixel8r/` (2026-10-08)
- [x] Pixel8r 2.72 renders from the command line in Designer 11.2's engine: a 64-pixel grid on a cliff base colour (2026-10-08)
- [x] Palette test (2026-10-08): an Endesga 64 LUT snapped every pixel to the palette but turned muted colours grey. Mike dropped the palette: Pixel8r pixelates in full colour (cliff at a 256 grid kept about 7,500 colours).
- [x] Normals: pixelate with no palette, then renormalize (cliff: 3% of texels more than 5% off unit length) (2026-10-08)
- [ ] Load Pixel8r in Painter 7.3 as a filter
- [ ] Re-texture the four kit 2 props through the new pipeline and compare with the COP versions in `L_TexelTest`

### HD-2D vending machine test (approved 2026-10-08)

Flow: Houdini High and Low with material IDs and vertex colour, then FBX, then Painter bakes and paints with Designer materials, then a UE 5.8 material. Every stage stays editable. Final grid 128 px/m (source at 512 px/m, 2048 map). Two versions in UE: Pixel8r at 128 px/m, and no Pixel8r. Old vending textures and MIs stay in RunnerSandbox for comparison.

- [x] `mike::prop_vending_drinks::2.0`: bottle necks fixed (2026-10-08)
- [x] `asset_propBuilder_02`: `_low` and `_high` FBX in `geo/bake/`, first Houdini bake (8 maps, 2048) in `tex/VendingMachine_Drinks_01/bake/` (2026-10-08)
- [x] Designer part materials in `ProjectRunner/substance/materials/`: painted metal, plastic, brushed metal (unmodified copies, ready to restyle) (2026-10-08)
- [x] Painter made optional (2026-10-08): `asset_propBuilder_03` adds fixed ID colours, `prop_texture.sbs` (Designer, headless), a resize COP to 128 px/m, Unreal import scripts, and `/obj/pipeline_vending_drinks` to run it all
- [ ] Mike: judge the preview level `/Game/Houdini/Preview/L_Preview_VendingMachine_Drinks_01` (old COP 128px, sd_512px, sd_128px_smooth, sd_128px)
- [ ] Mike: confirm the shrink moves from Pixel8r to Houdini (with no palette or dither, Pixel8r equals a box shrink; Houdini also renormalizes normals)
- [ ] Pixel8r pass, UE import, MIs, side by side in `L_TexelTest`

## Room shell (`mike::env_room_shell`)

Started 2026-10-08. Brief: `HoudiniSource/docs/briefs/runner_room.md`. Built live in the open Houdini session, scene to be saved as `HoudiniSource/ProjectRunner/asset_roomBuilder_01.hiplc`.

- [x] **R1 Kit.** 1 m pieces (wall, low wall, door, window, glass, post, tile, rail) with UVs at density, packed by `name`.
- [x] **R2 Footprint and balcony cells.** Flatten, ray-test cell centres, subtract cutters.
- [x] **R3 Wall slots, openings, posts.**
- [x] **R4 Walls, levels, floor, balcony build, output, Show Stage.**
- [x] **R5 HDA.** `hda/mike.env_room_shell.1.0.hdalc`.
- [ ] **R6 Three layouts.** `/obj/room_layout_01..03` cook with 0 errors and 0 warnings. Captures are `refs/wip/room_shell_layout_0{1,2,3}.png` and `_02_back.png`. HDA lint passes. Still open: save the scene as `asset_roomBuilder_01.hiplc` and lint the builder network.

## Facade trim sheet (`mike::env_facade_trim`, `mike::env_facade_modules`)

Started 2026-10-09. Brief: `HoudiniSource/docs/briefs/runner_facade_trim.md`. Scene: `HoudiniSource/ProjectRunner/asset_facadeBuilder_01.hiplc`. Milestone 1 ends at Mike's approval of the render. Nothing goes to UE before that.

- [x] **F1 Profiles and High.** 8 strips, each a low and a high profile; the High is swept 8 m with rounded corners, bumps and chipped edges (2026-10-09).
- [x] **F2 Layout and bake.** Strips are their unrolled profile length at 512 px/m with 8 px gutters: 2,136 of 4,096 rows on a 4096² sheet (planned 4096 x 2048; it didn't fit). Baked with `bakegeometrytextures::2.0` in the builder, not `env_bake_maps` (square only). The zone mask comes from a single-mesh bake of the Low (2026-10-09).
- [x] **F3 Sheet and surfaces.** `T_FacadeTrim_{BC,N,ORM,M}` (M is RGB; accent = 1 - R - G - B) and plaster, brick and ribbed metal from Database 2.1 at 1024 (2026-10-09).
- [x] **F4 Modules.** 13 modules on the 0.4 m grid through the new `mike::env_facade_sweep::1.0` (2026-10-09).
- [x] **F5 Sample facade.** 4 + 2 bays, 3 floors plus ground, a convex corner; 1,444 tris (2026-10-09).
- [x] **F6 Look render.** 9 Karma renders, `render/facade_trim/contact_sheet.png` and `sheet_maps.png`. `verify_m1.py` 18/18, lint passes on 3 HDAs and 5 networks (2026-10-09).
- [ ] **F7 Gate.** Mike approves the contact sheet.
- [ ] **F8 Labs adapter.** `mike::env_facade_labs::1.0` with `labs::building_generator::4.0` on a test blockout on the grid.
- [ ] **F9 Down-res.** Density from the menu, pixelation on and off, compared in renders.
- [ ] **F10 Export and UE.** `SM_Facade_*`, `M_FacadeTrim`, `M_FacadeGlass`, and an MI per preset.

## City generator (`mike::env_city_generator`)

Started 2026-10-09. Brief: `HoudiniSource/docs/briefs/city_generator.md`. Built headless in hython. Scene: `HoudiniSource/ProjectSandbox/asset_cityBuilder_01.hiplc`.

- [x] **C1 Split tool.** `mike::env_split_guillotine::1.0` cuts every piece over its size limit each pass, with an optional street or alley gap. It's used for both streets and lots. 2 km: 10,492 lots in 0.65 s.
- [x] **C2 Roads, corridors, blocks.** Random or input road graph. Blocks are the bounds minus road and corridor slabs from `mike::env_ribbon_slabs::1.0`. PolyExpand 2D on the graph failed in 11 of 120 cases.
- [x] **C3 Zones, streets, lots, massing.**
- [x] **C4 Ground and export.** Carriageway, sidewalks, curbs, tiles, PCG points, centrelines. Tile FBX through the `/obj/export_tiles` TOP network.
- [x] **C5 HDA and builder scene.** Show Stage, help, tooltips, ROPs. Lint passes on 3 HDAs and 5 networks.
- [x] **C6 Verify.** 19 of 19 checks pass, and a 120-case sweep cooks with 0 errors and 0 warnings (2026-10-09).
- [ ] **C8 v2 tensor-field roads and Tokyo style.** Brief: `HoudiniSource/docs/briefs/city_generator_v2.md`. Scene: `HoudiniSource/ProjectSandbox/asset_cityBuilder_02.hiplc`.
  - [x] `env_road_tensorfield`, `env_road_streamlines` (approved `trace_streamlines`), `env_fill_lanes`, `env_lots_frontage`, `env_buildings_massing`; split and ribbon HDAs extended in place.
  - [x] `env_city_generator::2.0` and the builder scene: three test cities shown through `OUT_Preview`, Tokyo deliverables written.
  - [x] Lint passes on 9 HDAs and 5 networks. Verify: 23 of 25 checks pass, including a 64-case sweep with 0 issues and 15.2 s at 2 km (2026-10-09, HoudiniSource `43f320d`). Plots: `refs/wip/citygen_v2_{tokyo,tokyo_rail,grid}.png`.
  - [ ] Open: in `city_tokyo_rail`, major roads come within 90 m of each other (limit 96 m) and 13.9% of road ends are dead ends (limit 10%), where the rail fields pull roads parallel.
- [ ] **C7 UE check.** Load Alembic into Static Mesh Spawner in Sandbox, and import the ground tiles. Not started: the unreal-editor MCP server didn't connect on 2026-10-09.

## G1 Playable scene (narrative game)

Brief: [BRIEF.md](BRIEF.md). A peer Claude session works in another UE project, so never touch its editor or MCP. Headless runs target `RunnerSandbox_01` only, and scripts are prefixed `pr_`.

- [x] **G1.1 Repo.** Move the empty `Documents\GitHub\ProjectRunner` repo to `C:\Prod\ProjectRunner`, add LFS `.gitattributes` and `.gitignore` (ignore `Houdini/`, DDC, Intermediate, Saved, Binaries), and make the first local commit. Pushing waits for the user.
- [x] **G1.2 StoryFlow.** Copy StoryFlow 1.2.3 from ProjectAlpha into `Unreal/Plugins` (source only).
- [x] **G1.3 C++ project.** Add `Unreal/Source` (the `RunnerSandbox_01` module and targets), and point `AdditionalPluginDirectories` at `_Library/Unreal/Plugins`.
- [x] **G1.4 Phantom plugins.** PhantomInteraction covers the interactable and interactor, hold-to-hack, camera zone (with the move-direction hold), and crouch zone. PhantomStory covers the StoryFlow–Sequencer bridge, timed choices, and checkpoint save. Done when UBT builds with 0 errors.
- [x] **G1.5 Blockout level.** Two rooms with camera zones, a crouch passage, interactables, a hack device, an NPC with a StoryFlow conversation, and two cutscene variants.
- [x] **G1.6 Hook up GASP.** The character walks only, uses the interact and hold input, and the move basis comes from the camera zone.
- [x] **G1.7 StoryFlow script.** The G1 conversation with a timed choice, a flag, and a relationship value.
- [x] **G1.9 Follow camera and transitions.** A follow camera handles framing everywhere except locked zones. L_G1_Street has passers-by. L_PR_Persistent streams the scenes behind a fade to black (the silhouette crowd was removed 2026-10-02). The player faces the direction of movement.
- [ ] **G1.8 Proof.** Both branches play in PIE, a mid-scene save reloads correctly, and recordings are saved to `refs/wip/`.
  - [x] Automated: `Unreal/Scripts/pr_run_g1_tests.sh` runs `ProjectRunner.G1.Playthrough.{Silent,Truth}` headless. 27/27 checks pass on both branches (2026-10-01). `ProjectRunner.G1.Transition` covers the exit, the return, and a save loaded in another scene, and passes.
  - [x] Stills in `refs/wip/`: `g1_*_cam.png`, `g1_transition_stage.png`, `g1_street_walkers.png`, `g1_follow_start.png`.
  - [ ] Screen recordings of each branch played by hand (needs Mike; OS input is off-limits for agents).

- [ ] **R1 Character rigs on Manny's joint frames.** Vhoori, Male and Female (`asset_charBuilder_10.hiplc`) share Manny's bone names and hierarchy, but their joint orientations differ, so live retargeting breaks their arms and fingers. `ProjectRunner.Rigs.CompareToManny` writes the per-bone gap to `Saved/pr_rig_check.json`.
  - [ ] Base the skeleton on `geo/fbx/SKM_UEFN_Mannequin.fbx` fitted to each body, instead of building it with `mike::build_joints_*`, Rig Doctor, and Orient Joints.
  - [ ] Export with the FBX ROP's "Unreal Engine" preset instead of `zupright` with axis conversion.
  - [ ] Check the ring and pinky phalanges: `buildJoints_Hand_L` doesn't output them in the current scene (70 joints, against 82 in the exported FBXs).
  - [ ] Re-import. Done when `CompareToManny` reports under 10° on every key bone, and the player and walkers switch back from the UEFN Mannequin.

## Scrivener story pipeline (started 2026-10-21)

Mike writes scenes in Scrivener (`Story/*.scriv`). An importer reads the `.scriv` folder directly and builds PhantomStory assets in UE. StoryFlow leaves the project. The StoryFlow-based plugin is kept in `_Library` as PhantomStoryFlow (not enabled; StoryFlow 1.2.3 source stays in ProjectAlpha).

- [ ] S1 Script markup agreed: screenplay elements plus Choice, Cue and Branch (`Story/SCRIPT_FORMAT.md`). Mike's mockup scene is the test case.
  - [x] Cinematic sequences and line IDs added to the format (2026-10-23): `SEQ: Name` starts a cinematic, the importer splits it into one sequence per run of lines between choices and branches, `SEQ: OFF` goes back to live. Lines and options get IDs (`L0012`) kept across rewrites by a ledger in `Story/ids`. START_HERE.md and the template rebuilt (not installed).
  - [x] Scrivener "Game Development" template built and installed (2026-10-21): `Story/template/build_scrivtemplate.py --install` writes `Game Development.scrivtemplate` and copies it to `%LOCALAPPDATA%\LiteratureAndLatte\Scrivener\ProjectTemplates`. Script format in `Story/template/scriptformat.xml`, guide in `START_HERE.md`. One project per game (`runner.scriv`), folders `ep010`, scenes `runner_ep010_scn010`.
  - [x] Mike wrote the mockup scene in `Story/projRunner.scriv` (2026-10-23) and laid the page out his way: options with their lines nested under them, cues and choices in one column, a `CHOICE` header. Template v2 built from it the same day (`build_scrivtemplate.py --install`): Choice moved to the cue column (1.0 in, bold blue), Branch is a left-aligned underlined header at the margin, Enter/Tab flow follows the nested layout, sample scene is the mockup. The importer reads nested options (implicit labels per option, joins), `CHOICE` headers and `(CONT'D)`. `SCRIPT_FORMAT.md` and `START_HERE.md` updated. The mockup imports with 0 errors; its 4 warnings are the hand-formatted header and `->` arrows that END makes unreachable.
  - [x] Mike's answers (2026-10-23): `CHOICE SEQ` is a flag for which choice UI the game shows (exported as the block's `style`); sequence names are `Who_WhatHappens`; the template uses NPC and PLAYER as stand-in names, and PLAYER always means the lead (CHASE is a temp name); all instruction lines at the margin, with a new element if needed; cue text in the normal colour, not grey; less vertical space; options numbered `1. (X)` with the button. Template v3 built from that: new Setup element (margin, after Action, Alt+Shift+3, key U) for MAP/TIMER/DEFAULT, Cue stays one tab in under an option; both plain italic with no space above; `(X)` kept as the option's `button`; "Choice Block" template sheet to copy a whole block from. Sample re-imports with 0 warnings.
  - [x] v4 (2026-10-23, after Mike's screenshots): the misalignment was the builder writing `\fi` as an absolute indent (RTF wants it relative to `\li`), fixed; `CHOICE_SEQ` with an underscore now read as the header; elements reordered so the six screenplay ones come first, then Setup, Choice, Cue, Branch and a new Shot element (right-aligned like Transition) for `CAM:`; new keys `CAST:` (stand-ins in Shot Blocker, numbered on repeats) and `NEXT:` (scene after END); START_HERE rewritten short. Mike's rewritten scene (NPC/PLAYER names, `NPC_GiveChip` sequences) imports with 0 warnings.
  - [ ] Mike tries v4 in a fresh project from the template (his `projRunner.scriv` keeps the old format until he loads `template/scriptformat.xml` through Script Settings > Manage).
- [x] S2 Rename `_Library/.../PhantomStory` to PhantomStoryFlow (module, API macro, uplugin), keeping its uncommitted 2026-10-21 edits. Needs the RunnerSandbox editor closed.
  - [x] Done 2026-10-24. Class redirects in `PhantomStoryFlow/Config/DefaultPhantomStoryFlow.ini` keep `L_G1_Blockout` and old saves loading. Runner enables both plugins and depends on both until S5; the 2026-10-21 edits are still uncommitted. UBT build succeeded; ProjectRunner.G1 (4), ProjectRunner.UI.Screens and PhantomStory.* (9) pass in Runner, no new warnings against a baseline run before the rename.
- [ ] S3 New PhantomStory runtime: story asset per scene, dialogue component (auto-advance by reading time or audio, timed choices with default, seq/cam cues), story state (flags, relationships), checkpoint save without the mid-dialogue limit.
  - [x] Built and tested in `ProjectRunner/Tests/StoryTest` (2026-10-23), away from Runner's editors: `Plugins/PhantomStory` has the story asset (`ImportJson`), the flow runner, the dialogue component (live lines, timed choices, cinematics from Shot Blocker sequences with subtitles from line markers, held frame behind a choice, pawn as Lead, end pose kept), story state, and checkpoint saves that work mid-dialogue (`OnGather`/`OnRestore` for the game's own data; no PhantomInteraction dependency). `python -I run_tests.py`: 35 Python, Shot Blocker 30/30, PhantomStory 9/9, PIE routes 5/5 (clinic live, clinic cinematic, held choice both ways, save and load mid-line).
  - [x] Moved to `_Library/Unreal/Plugins/PhantomStory` with S2 (2026-10-24). StoryTest's `setup.py` copies its source in, so StoryTest builds its own DLL and stays safe while Runner's editor is open.
- [ ] S4 Importer: `.scriv` (scrivx binder + RTF) to JSON (stdlib Python, runs outside UE for tests) to story assets (editor import, re-run updates in place).
  - [x] `.scriv` to JSON (2026-10-23): `_Library/Unreal/Plugins/PhantomScript` (Python-only editor plugin, untracked in the _Library repo), `phantom_script` package; CLI `python -m phantom_script import <scriv> --out Story/build --ids Story/ids`; line-ID ledger, sequence split and timing, VO CSV. 24 unit tests pass (`python -m unittest discover -s Tests`). First real import of `projRunner.scriv` written to `Story/build` and `Story/ids`.
  - [x] Shot Blocker (2026-10-23): `phantom_shots`, the Shots menu in the level editor. Builds `LS_<scene>_<Name>` blockout sequences from the JSON (markers per line, stand-ins, placeholder cameras from `CAM:` cues, VO sync, retime on rewrite). Headless UE test `Tests/ue_shot_blocker_test.py` passed 24/24 (`Saved/PhantomScript_ue_test.json`). Config `Unreal/Config/PhantomScript.json`; PhantomScript is enabled in the uproject. Not yet used on a real scene.
  - [x] JSON to PhantomStory assets (2026-10-23): `phantom_shots/story_assets.py`; Import Script writes a `PNStoryAsset` per scene to `story_content` when the runtime is loaded. Used by the StoryTest map build.
  - [x] `.scriv` to JSON (2026-10-23): `_Library/Unreal/Plugins/PhantomScript/Content/Python/phantom_script`, `python -m phantom_script import`. 14 unit tests pass. Reads Mike's mockup: 4 lines, 3 options, flags, branches, and warns about the two real draft issues (option 1 formatted as a Cue; `Vex Leaves` vs `VexLeaves`).
- [ ] S5 Port RunnerSandbox C++ (`PRStoryNPC`, `PRHUD`, `PRPlayerComponent`, `PRInteractableProp`, G1 tests) to the new API. Rewrite the G1 Vex conversation as a Scrivener scene.
- [ ] S6 Remove StoryFlow from Runner: plugin, `Content/StoryFlow`, `Story/G1_build`, `Story/FORMAT.md`, uproject entry. Update the brief's Done-means and Domain lines.
- [ ] S7 Proof: UBT build with 0 errors, `pr_run_g1_tests.sh` passes both branches on the new runtime, importer round-trips Mike's mockup.

## Shot Blocker (started 2026-10-23)

Blockout cinematics in Sequencer from the script. Python editor tool in the PhantomScript plugin (`_Library/Unreal/Plugins/PhantomScript`, enabled in RunnerSandbox_01, editor only). Usage and API notes: the plugin's README.

- [x] SB1 Build a sequence from a scene for the selected trigger: lead stand-in tagged `Lead`, trigger bound as its character, line markers, reading-time timeline, `CAM:` placeholder shots, level sequence actor, story director entry.
- [x] SB2 Add Shot at the playhead from the viewport (snaps to line starts, splits shots), Reframe, Key Camera Move, Remove Shot, Pilot, lens presets.
- [x] SB3 Retime on rewrite: shots, camera keys and animations follow their line IDs.
- [x] SB4 Voice: Sync Audio imports `VO_<scene>_<ID>` from `Story/VO`, lines take the audio length plus 0.3 s, stale recordings reported; Export VO Script CSV.
- [x] SB5 Animation: Add Animation at Playhead; Parenthetical words and `ANIM:` cues placed from `Story/anim_map.json`.
- [x] SB6 Tests: 5 timing tests (plain Python) and a headless UE run, `Tests/ue_shot_blocker_test.py`, 24/24 checks, no log errors (2026-10-23).
- [x] SB7 Mike opens the editor and checks the Shots menu and the Sequencer toolbar buttons (menus can't be checked headless). Confirmed 2026-10-23.
- [ ] SB8 Check animation sections play on a possessed `PRStoryNPC` and on the stand-ins in the editor (GASP anim blueprint slot question).
- [x] SB9 Runtime (part of S3): play a cinematic's lines from its sequence, subtitles from the line markers by ID, hold the last frame during a choice, rebind or hide the `Lead` binding against the player pawn, teleport the player to the lead's end pose. Done in StoryTest (2026-10-23), PIE-proven; Runner gets it with S2.
- [ ] SB10 Optional: talking idle for the speaker and listening idle for the others on every line.
- [x] SB11 Planned cameras placed by `CAM:` prefix (`phantom_shots/framing.py`): WS, FS/MS/MCU/CU/ECU singles with their own lens, OTS, all on one side of the line. 8 framing tests (2026-10-23).
- [x] SB12 Fix: `bind_characters` never bound the trigger from the level (the CAST loop had taken the trigger check's `else`). Stand-ins and the trigger now stand at feet height for Characters.
- [x] SB13 UE proof of SB11, SB12 and CAST: `ue_shot_blocker_test.py` in a throwaway blank project (Runner's editors were open), 28/30. The 2 misses are the animation checks, which need Runner's UEFN mannequin; that code is unchanged since the 24/24 Runner run. Re-run in Runner when its editors are closed (2026-10-23). Re-run in Runner 2026-10-24: 30/30 with `PRStoryNPC` as the trigger (the test assumed a Character; fixed).
- [x] SB14 Line IDs: a character renamed across a scene (VEX to NPC) keeps their lines' IDs; reported as `renamed` (2026-10-23).

## ProjectDev kit library (started 2026-10-22)

Source: `C:\Prod\ProjectDev` (moving from `D:\projects\ProjectDev`), read-only (its `AGENTS.md`). Triage: [projectdev-kit-triage.md](projectdev-kit-triage.md). HDA plan: [hda-rebuild-assessment.md](hda-rebuild-assessment.md). Decisions: brief, 2026-10-22.

- [x] PD1 Copy checked, committed locally and tagged `blender-build-v1` (never pushed).
- [x] PD2 HDA rebuild assessment, including the ProjectTitan_New and tutorial-files folders.
- [x] PD3 Dropped (Mike, 2026-10-24). `C:\Prod\ProjectDev` stays the source.
- [x] PD4 Re-UV in Houdini. `ProjectRunner/hda/mike.env_trim_uv.1.0.hdalc` (brief `HoudiniSource/docs/briefs/projectdev_kit_reuv.md`, lint passes). 2026-10-22: all 513 pieces and 44 LOD1s cook with 0 errors. Stretched faces drop from 20,272 to 103 of 57,438; the rest are curved non-planar quads. Triangles +9.6% from row cuts. Built from the C: copy, which matches its git index exactly.
- [x] PD5 Asset museum: `asset_kitMuseum_01.hiplc`, 27 halls (lint passes), renders in `refs/wip/museum/`, review table in [kit-museum-review.md](kit-museum-review.md).
- [ ] PD6 Mike reviews the museum. 2026-10-23: atlases approved. Still open: row cuts or a tiling material for tall panels.
- [ ] PD7 HDA families from repeated pieces (list in the 2026-10-22 reply; Mike adds or removes), plus the generators and assemblers in the HDA plan. 2026-10-24: Mike asked for all 13 families. Each is one generator with its kit pieces as presets (`data/projectdev_family_presets.csv`), on the shared family pattern (part points → unit shapes → metric UVs → `env_trim_map` → box hulls).
  - [x] 13 HDAs, 130 presets, one per kit piece (2026-10-24):
    - `env_box_crate`, `env_shelving`, `env_cabinet`, `env_seating`, `env_lantern_light`, `env_sign_panel`, `env_vent_ac`, `env_barrier`, `env_drum_can`, `env_food_bowl`, `env_wheel`, `env_tarp_curtain`, `env_planter`.
    - Every preset passes `verify_fam.py`: it cooks clean, its size and pivot are within 15% or 3 cm of the kit piece, its UVs sit inside their strip or cell, and it has hulls where the kit has UCX.
    - All 13 pass lint, and each has a brief with its known gaps.
  - [x] Review scene `asset_kitFamilies_01.hiplc` (generated preset beside the re-UV'd kit piece, 143 renders in `refs/wip/families/`) and review table [kit-families-review.md](kit-families-review.md).
  - [x] UE `/Game/ProjectRunner/Museum/L_KitFamiliesMuseum` (`Unreal/Scripts/pr_build_kit_families.py`). All 130 presets are live Houdini Asset actors, and the map reloads with every cook. The 60 kit pieces already imported stand beside their presets. Pawn traces hit every preset that has hulls.
  - [ ] Mike reviews the families: keep, fix or drop per preset.
    - [x] First notes (2026-10-25), in the review table. Keep: barriers, Lamp Pendant (both), the kit food pieces unchanged.
    - [x] Fixed 2026-10-25:
      - Lamp Cage rebuilt low-res from Mike's example (140 tris).
      - Sign cells fill their faces like the kit (new Cell Border toggle, off by default; Neon now off by default).
      - Drawer handles on the Tool Chest and Desk.
      - Drum cluster no longer clips.
      - Z-fighting in 48 of 57 presets, from a coplanar-overlap scan (`zfight.py`); the 9 left are touches under 5 cm2, or food.
      - Every family mesh welded; `env_trim_uv` now welds every kit piece too.
      - Family normals are per vertex with the 40 degree cusp. The Normal node had been writing point normals, which only looked right while nothing was welded.
    - Proof: all 14 HDAs lint, `verify_fam.py` passes on 130 of 130, the review scene is reloaded in Mike's Houdini, and 40 close-ups are re-rendered in `refs/wip/families/`.
    - [x] Second notes (2026-10-25), done the same day:
      - Seating: Folding leg style for the folding chair; office chair back narrower than the seat; Bevel toggle (office chair, couches); Foot Rest on stools.
      - Neon: the toggle covers Box Sign, Billboard and Medallion too. Neon faces carry a mask in vertex colour (magenta, G = 0) on family meshes and kit pieces. Kit FBXs re-exported with it, and the welding.
      - `pr_import_projectdev.py`: the masters tint the mask by NeonColor and NeonGlow (Custom Primitive Data per actor), and vertex colours are imported. Not run yet: the open RunnerSandbox_01 editor is another session's (MCP 8002).
      - Kit z-fighting pass on all 513 pieces: 49 have overlaps over 5 cm2. 3 are coplanar; the other 46 are decals 0.5 to 3 mm off a surface. Biggest: the AlleyKit steel doors and the CyberStreetKit kiosk. List: [kit-zfight-2026-10-25.csv](kit-zfight-2026-10-25.csv).
      - `asset_kitMuseumAll_01.hiplc`: every kit piece, family preset and option, one object each, a row per kit (651 objects), for Mike's cleanup pass. `read_museum.py` reads back what's left.
      - Builder scripts committed to HoudiniSource `ProjectRunner/scripts/projectdev_kit/`.
    - [ ] Mike's cleanup pass in the all-kits museum, then read it back.
    - [ ] UE: run `pr_import_projectdev.py` and rebuild `L_KitFamiliesMuseum` in an editor that's free.
    - [ ] Tarps: Vellum-simulated tarp roofs with torn variants. Mike's idea (2026-10-25): pin to the frame, cut the overhangs off the body, and simulate overhang variants to swap onto body versions. Waiting on scope.
- [ ] PD8 Lean facade tool: connected wall bands on the trim, kit windows, shutters and AC units as instances. Replaces `cyber_facade` for kit-based streets.
  - [x] `mike::env_kit_facade::1.0` (brief `env_kit_facade.md`, lint passes, `verify_facade.py` passes on 6 presets) (2026-10-24):
    - One connected wall per run, cut into trim rows, with openings for the kit inserts. The inserts are slab-free copies of 36 AlleyKit panels, `SM_AlleyKit_Insert_*`, made in `asset_kitFacadeInserts_01.hiplc`.
    - Review scene: `asset_kitFacade_01.hiplc`.
  - [x] UE: the 22 inserts the tool uses are imported. `L_KitDemo_FacadeStreet` has three facades, 32 family presets, cables, stalls and a stack, and all 39 actors reload with meshes.
  - [ ] Mike reviews the facade (open questions in the brief: shop interiors past the wall ends, solid collision over openings, 2 m bays plain on 4 m floors).
- [ ] PD9 Cable tool in UE through Houdini Engine, with material sway. Houdini Engine 3.0 for H22.0.466 is in RunnerSandbox_01 (checked 2026-10-23). HDA built 2026-10-23 (`mike::env_cable_sag::1.0`, brief `HoudiniSource/docs/briefs/env_cable_sag.md`, in review with PD11). Still to do: `M_CableSway` and a UE test level.
- [ ] PD10 UE import of approved pieces, local-only.
- [ ] PD11 Generator HDAs 1-4 from [hda-rebuild-assessment.md](hda-rebuild-assessment.md), built 2026-10-23, lint and checks pass: `mike::env_trim_map::1.0` (trim mapping for generated pieces), `env_cable_sag`, `env_pipe_run`, `env_railing_run`. Review scene `asset_kitGenerators_01.hiplc`, review table [kit-generators-review.md](kit-generators-review.md). Waiting on Mike's review, then the UE test through Houdini Engine.
  - [x] Fixed in `env_trim_uv` and `env_trim_map`: atlas islands no longer join parts that only overlap in UV space (923 kit faces on 58 pieces, now 0). Museum halls re-rendered.
- [ ] PD12 HDAs 5-9 and the UE kit museum (Mike, 2026-10-23: build all of 5-9, demo them in UE, feedback on the Houdini and UE files). Picks: my own editor, kept clear of the VFX session (its folders, maps and scripts are off limits); import only the kit pieces the tools and demos use; one hall map plus three vignettes; HDAs 5-9 only (no PD7 families, no PD8 facade).
  - [x] HDAs `env_market_stall`, `env_stack_props`, `env_fire_escape`, `env_scaffold_frame`, `env_stairs_fit`, plus the shared `env_kit_preview` (kit meshes on assembler points, Houdini only), with briefs, checks and a review scene `asset_kitAssemblers_01.hiplc` (`asset_kitGenerators_01` is open in Mike's Houdini). Lint passes on all six HDAs and five halls; `verify_asm.py` 159 checks pass, including no overlaps in 13 stacked props. 35 renders in `refs/wip/assemblers/`, review table [kit-assemblers-review.md](kit-assemblers-review.md) (2026-10-23).
  - [x] Re-UV'd kit pieces exported to `HoudiniSource/ProjectRunner/geo/export/projectdev/` (git-ignored) and imported to `/Game/ProjectDev/<Kit>/` (git-ignored), with slot materials on the template and reference textures and `M_CableSway`. 163 pieces (list `data/projectdev_ue_import.csv`), sizes, triangles, UCX hulls and slots match Houdini; script `Unreal/Scripts/pr_import_projectdev.py` (2026-10-23).
  - [x] `/Game/ProjectRunner/Museum/L_KitToolsMuseum` (a labelled row of presets per HDA, 1-9) and three vignettes: `L_KitDemo_NightMarket`, `L_KitDemo_BackAlley`, `L_KitDemo_Rooftop`. Build script `Unreal/Scripts/pr_build_kit_museum.py`. 81 live Houdini Asset actors; all four maps reload with every saved cook. HDA assets in `/Game/ProjectDev/Tools`, cooks in `/Game/ProjectDev/HoudiniTemp` (2026-10-23).
  - [ ] Mike reviews the Houdini halls and the UE maps.
  - [x] Collision, sway and baking checked in RunnerSandbox_01 (2026-10-24):
    - **Collision:** Pawn-profile traces in `L_KitToolsMuseum` hit the tools' simple collision at the right heights. Stairs rise step by step (46 to 289 cm on the 3 m flight), scaffold decks are at each lift, fire escape and balcony platforms at each floor, and stack tops at their layer heights. Cables have no collision by design.
    - **Sway:** in PIE, two captures 1.3 s apart differ only along the `M_CableSway` cables.
    - **Baking:** all 45 museum presets bake TO_ACTOR in `/Game/ProjectDev/BakeTest/L_BakeTest`. Generated meshes become static meshes, and kit pieces become instanced static meshes. The same traces against the baked actors match the live results.
    - Scripts: `pdreuv/ue_trace_check.py`, `ue_sway.py` and `ue_bake2.py`.
  - [ ] Fire escape platforms have no stair opening (kit limit; needs a new copied piece, Mike's call).

## Log

- 2026-10-03: Renumbered so the current version of each ProjectSandbox scene is `_01`: `asset_trimBuilder_05` became `asset_trimBuilder_01` and `asset_propBuilder_04` became `asset_propBuilder_01` (older names in this file refer to removed versions; git history has them). Sheet A scene regenerated with `build.py` because its baked palette swatch predated the sheet B ramps; all its exports are byte-identical to the committed ones. New `scripts/check_all.py` loads and cooks every scene, re-renders every image ROP and compares it pixel by pixel with the shipped file, and cooks every HDA preset: 4 HDAs and 8 scenes pass under Houdini 22.0.459. The per-asset verifies (trim A and B, decals, trim_box, prop_kit, pixel_sign) pass too.
- 2026-10-03: Cleanup. Kept the newest of each builder (`asset_trimBuilder_05`, `asset_propBuilder_04`, `mike::trim_box::1.3`) and removed `asset_trimBuilder_01`-`_04`, `asset_propBuilder_01`-`_03`, `trim_box` 1.0-1.2 and `tex/prop_trim/32px/` (all in git history). `ue_trim_level.py` now uses `trim_box` 1.3. Houdini updated itself to 22.0.459 and 22.0.429 is gone, so `$HYTHON` points at a missing file. Houdini GL viewports ignore principled emission textures and draw flat emitcolor, so the library preview shaders have no emission.
- 2026-10-02: E8 tiers 2-4 and the library done. Sheet A was full, so sheet B (`layout_b.py`, `atlas_b.py`, `MI_PropTrimB`) holds the new strips and cells; `build.py` and `verify.py` pick the sheet with `TRIM_SHEET`. `mike::prop_kit::1.0` writes every UV itself (no trim_frame wrangle), which allows partial bands, vertical bands, panels with holes, tubes whose circumference is a strip height, and caps projected from a cell centre. Library props are baked with the Houdini Engine public API (`bake_all_outputs_with_settings`, TO_ACTOR) and the meshes renamed to `SM_<Name>`. Things that bit: a stacked gallery hid each bay behind the previous wall, so the bays sit side by side along one wall; the first capture of a new bay can come back empty while shaders compile.
- 2026-10-02: E8 tier 1 done. Each prop is a trim_box preset: side bands add up to the front cell's height, and the width follows the cell plus the two chamfers (4.4 cm each). The Houdini-measured sizes go to `presets.json`, and the UE check compares against them. `ue_stage.py` holds the shared review stage for new levels. Open for review: the wood planks read orange at a distance; the chamfers are wide on the small PC tower.
- 2026-10-02: E7 done. Glyphs are Yu Gothic Bold rendered with no anti-aliasing by PIL in hython; decals are painted with PIL's aliased primitives, so every texel is exact and verify compares all of them. Things that bit: the image ROP zeroes RGB under alpha 0, so decal opacity is its own map; UE's `decal_size` is half extents; UE decal texcoords are swapped against the atlas, so `M_Decal` swaps them and `ue_e7_import.py` flips V. Facade swap to the pixel glyph atlas is not done (same layout, needs a 512 px atlas in the facade HDA's Glyph Atlas folder).
- 2026-10-02: E6 done. Atlas cells are painted in Python from palette ramps, not drawn in COPs, so every texel is exact; COPs only rasterise and composite them. Cells use 8-texel clamped gutters and sit 16 texels apart. Cell fronts are split at the side band heights so they share points with the chamfers (no T-junctions). Atlas row uses 464 of 1024 columns and 112 of 260 rows.
- 2026-10-02: E6a done. Strips: edge_wear, trim_rim, frame_band, paint_teal, paint_red, metal_black, metal_bare, tread_plate, corrugated, wood_planks, plastic, concrete, louvres, vent_slots, hazard, emissive_{cyan,magenta,orange,green,wide}; 764 of 1024 rows. UE mips confirmed by memory size (5504 KB against 4096 KB bare for 1024 x 1024 BGRA8). Left in place, not deleted: `tex/prop_trim/32px/`, `hda/mike.trim_box.1.0.hdalc`, and in UE `/Game/Sandbox/Textures/T32` and `MI_PropTrim_64`.
- 2026-10-02: E5 locked at 64 px/m. `asset_trimBuilder_02.hiplc` lays the COP network out in sections (input, detail, one column per strip, composite, output) with an overview note; all 10 exported files are byte-identical to `_01`'s and `verify.py` passes. Open: UE textures have no mipmaps, so at distance 64 px/m point-samples to the same look as 32 and shimmers in motion. Turning mips on would show the 32 px/m level automatically at range.
- 2026-10-02: E4 done. The editor is driven through MCP on port 8003 (`ProjectSandbox/scripts/ue/sb_ue.py`, `sb_capture.py`) and UE Python remote execution (`sb_py.py`; MCP's script tool can't import `unreal`). Things that bit: Houdini Engine parameters only exist after instantiation, so set them in `on_post_instantiation_delegate` with a bound method (the delegate counts default arguments). High-res screenshots don't fire while the editor is in the background, but MCP `CaptureViewport` does; it needs an `annotations` block and game view to hide icons.
- 2026-10-02: E1–E2 done. `HoudiniSource/ProjectSandbox/scripts/trim_build/build.py` builds `asset_trimBuilder_01.hiplc` and exports `tex/prop_trim/{32,64}px/T_PropTrim_{BC,N,ORM,E}.png` plus `tex/palette/`. `verify.py` passes at both densities: every BC pixel is in its strip's ramp, E, roughness and metal match the strip values, flat strips have flat normals, and green is DirectX. 14 test strips use 218 of 512 rows. Quantize outputs bin k as k/(n-1), so tones are snapped to bin centres before the ramp lookup.
- 2026-10-02: Vex's conversation is three shots: the CAM_Vex two-shot with a hello, over Vex's shoulder onto the player for the player's line, and the reverse onto Vex for the timed choice. Talking moves the player to the NPC's `TalkMark`, and they stay there afterwards. Silent now plays its own profile two-shot, `LS_G1_Silent`. Exits from a scene map played on its own fade to black and fade in at the entry. `pr_build_g1.py` now keeps existing maps (set `PR_REBUILD=1` to rebuild them). Tests: silent and truth 14/14, transition 9/9, scene exit 4/4. Stills: `refs/wip/g1_vex_{shot1,shot2,choice,cutscene}.png`.

- 2026-10-02: Environment restart. Old systems archived to `HoudiniSource/archive/env_v1/` (tag `env-v1-final`). Every archived scene and the facade cook with 0 errors; the renamed building and facade HDAs produce the same point and prim counts as before.
- 2026-10-02: The Persona 5 transition was removed (fade to black now), and the player and walkers went back to the UEFN Mannequin for the demo. G1 tests pass: silent and truth 13/13 steps, transition 9/9.

- 2026-10-01: D0–D7 done. `mike::destruct_concrete::1.0` and `asset_destructBuilder_01.hiplc` were built by `Houdini/scripts/destruct_build/main.py`. `verify.py` ran 44 cooks (4 presets × 3 states × 3 seeds, plus input, paint and impact cases): all checks passed, 0 warnings, max cook 0.63 s. The log and previews are `refs/wip/destruct_concrete_*`. D8 is waiting: the unreal-editor MCP didn't connect this session.
- 2026-10-01: G1 built. Repos: ProjectRunner (`C:\Prod\ProjectRunner`, remote `Phantom-Break-Studio/ProjectRunner`, not pushed yet) and the plugins (`C:\Prod\_Library\Unreal\Plugins`, local only).
  - Rebuild the level with `Unreal/Scripts/pr_build_g1.py`, run headless (see its docstring).
  - Headless UBT builds need `-NoHotReloadFromIDE`, because the Live Coding mutex is shared across every editor on the engine.
  - Launch the editor with `-LiveCoding=false`; the ini setting didn't take.
  - Agent MCP helpers are in `%TEMP%\pr_mcp` (port 8002).

- 2026-09-29: M1–M3 built in `asset_interiorBuilder_01.hiplc` (`/obj/bar_room`). Cook matrix: 6 configs (seeds 0–5; 8x5, 6x4.5 sloped glass + window, 12x6, and no ceiling or side walls) gave 0 errors and 0 warnings. Renders are in `refs/wip/`. `mike::room_bar` also builds a city backdrop behind the window style, matching bar-04. The build scripts are in `Houdini/scripts/interior_build/`, but the scene and HDAs are canonical. `/mat/MI_Room_*`, `/obj/preview_lights`, and `/out/preview_render` are for the Houdini preview only.
