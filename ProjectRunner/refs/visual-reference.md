# ProjectRunner visual reference

Built 2026-10-15 from the videos in `Documents\Development\reference\`, the images in `Documents\Development\_ref\`, and `Documents\Development\runner-notes.txt`. The sources were only read, never changed.

Frames are in `refs/frames/<slug>/`. Each file is named `<slug>_tNNN.jpg`, where NNN is the second it was taken from, scaled to 960 px wide. Contact sheets are `<slug>_sheetN.jpg` and have the timecode printed on each tile. Timestamps below are mm:ss.

| Slug | Source file | Length | Resolution | Frame step | Frames | Sheets |
|---|---|---|---|---|---|---|
| `replaced-launch-trailer` | REPLACED - Official Launch Trailer - Thunderful Games (1080p, h264).mp4 | 1:38.5 | 1920x1080, 60 fps | 4 s | 25 | 3 (2 s per tile) |
| `lastnight-e3-2017-gameplay` | THE LAST NIGHT Gameplay (New CyberPunk Game) E3 2017 - Punish (720p, h264).mp4 | 5:51 audio, **1:12.7 video** | 1280x720, 60 fps | 5 s | 15 | 3 (2 s per tile) |
| `lastnight-ign-first-journey` | The Last Night The Journey to One of the Most Beautiful Games of E3 - IGN First - IGN (720p, h264).mp4 | 11:16 | 1280x720, 30 fps | 6 s | 113 | 4 (6 s per tile) |
| `kitsune-kaeru-pv` | 1uS1qoPOZb1R0ulL.mp4 | 0:27.2 | 1280x720, 30 fps | 3 s | 9 | 3 (1 s per tile) |

The E3 gameplay file is a broken download. Its video track stops at 1:12.7 and the rest is audio only, with h264 decode errors near the end. Download it again to see the rest.

## 1. Per video

### Replaced, official launch trailer (Sad Cat Studios, Thunderful)

98.5 s. It shows side-on exploration, combat, dialogue and set pieces in a dystopian 1980s city, with pixel-art characters inside lit 3D scenes. The game area is letterboxed to about 2.37:1. The HUD and dialogue sit inside the picture.

**(a) Side-on framing and depth layers**
- 00:36–00:38, `_t037`: overgrown gate. A tree canopy in the foreground frames the top of the picture. Two characters stand on a lit path, with ticket machines and gates behind them and fog and a light shaft at the back. This is the clearest five-layer shot.
- 00:44–00:46, `_t045`: Tower District. Out-of-focus pole and sign in the foreground, cars and a crowd on the play plane, a neon facade, then towers in haze.
- 00:28–00:30, `_t029`: Level -2 service area. A flat side-on industrial set with two floors, a walkway, and the character small on the upper level.
- 00:16, `_t017`: wooden houses in fog, grass in the foreground, combat on the play plane.
- 01:20, `_t081`: hangar with drones and searchlights. The foreground pillars are stair-stepped.

**(b) Lighting, fog, neon, volumetrics**
- 00:44, `_t045`: a red volumetric beam from the drone, neon letters with bloom, green and red traffic light glow in the fog.
- 01:20, `_t081`: three red cone lights in fog with pink haze, and reflections on wet ground.
- 00:40, `_t041`: a warm bar interior. Low sun throws window shapes across a chequered floor, with a cool rim on the left.
- 01:08, `_t069`: dark interior. A cold white practical and a red sodium source, haze between the crate layers, and a laser line drawn at full resolution.
- 00:59–01:04 (sheet 2): a crowd backlit through thick orange fog with long shadows toward the camera.

**(c) Pixel treatment**
- Characters sit on a pixel grid of about 4–5 screen px at 1080p, so roughly 240 lines of vertical resolution. Measured on 4x nearest zooms of 00:44 and 01:10. Video compression softens the grid, so the number is approximate.
- Geometry edges are stair-stepped too (foreground pillars at 01:20, `_t081`). The whole scene colour looks rendered at low resolution, not only the textures.
- Fog, light shafts, bloom halos, depth of field and lasers are smooth at full resolution. They sit on top of the pixel layer.
- The UI is chunky pixel art in one orange-red colour: hearts, medkit and weapon icons (`_t069`). Dialogue names use a red pixel font (`_t041`). The studio cards at 00:04 and 00:10 use the same red pixel font on black.

**(d) Character scale and animation**
- Gameplay cameras put the hero at about 8–18% of the active frame height: 8% in the crowd at `_t045`, 12% at `_t037`, 18% in the combat at `_t069`.
- Animation is fluid with many frames. Its frame rate can't be read reliably from 60 fps compressed video.
- Silhouettes stay readable because characters are darker or brighter than whatever is behind them, and rim light picks out their edges (`_t069`).

**(e) Editing and pacing**
- Scene-change detection found 40 cuts. The average shot is about 2 s in the montages (00:13–00:49 and 01:05–01:28). A slow section runs from 00:49 to 01:05 with single held shots: elevator at 00:52, scaffold at 00:54–00:57, black at 00:58.
- Cards: ESRB over the cold open (00:00–00:04), "A game by Sad Cat Studios" (00:04–00:06), "Published by Thunderful" (00:10–00:13), then the end card "REPLACED / PLAY NOW" with platforms from 01:28 to 01:38 (10 s).
- Music, measured as RMS per second: a steady bed of about -16 dB until 00:57, a dip to -24 dB at 00:59–01:02, a hit at 01:05, the loudest stretch (-12 to -14 dB) from 01:15 to 01:28, then a fade under the end card.
- The order runs world, then story and characters, then a breath, then action, then spectacle (explosion at 01:22, silhouette on a bridge at sunset at 01:24 `_t085`, rooftop train chase at 01:26), then the title.

### The Last Night, E3 2017 gameplay (Punish upload)

The video track is 72.7 s long. It shows the title screen, then the apartment and the street of the E3 2017 reveal. The letterbox is about 2.5:1, with "PREALPHA FOOTAGE" printed under the picture.

**(a) Framing and layers**
- 00:56, `_t056`: a balcony. Bushes in the foreground, the character and lantern on the balcony, a street and neon kiosk in the middle, and a tower block behind. This is the best side-on depth stack in any of the references.
- 00:46–00:51, `_t046`, `_t051`: the apartment seen through two round windows. A dark wall frames the scene in the foreground and the city sits behind it.
- 01:06–01:11, `_t066`, `_t071`: a street crowd. Out-of-focus pedestrians walk in front of the play plane.

**(b) Lighting**
- 00:01–00:34, `_t001`–`_t031`: a neon title sign in the rain. Lens droplets, bokeh, a light shaft sweeping across (00:14, 00:26), and handheld drift.
- 01:01, `_t061`: green shop light spills onto wet ground. Bloom, scatter in the fog, glints on puddles.
- 00:56, `_t056`: warm practicals against a blue-black night, with red lanterns as accents.

**(c) Pixel treatment**
- The pixel grid is about 3–4 px at 720p, roughly 4.5–6 px at 1080p. Video compression limits how exactly this can be measured.
- Characters, props, signs and building windows are pixelated. Bloom, fog, bokeh and depth of field are smooth. Out-of-focus pixel characters in the foreground blur smoothly (`_t071`), so the blur runs after the pixel step.
- There is no HUD. The title menu is a 3D neon sign with three items ("Wake up… / Settings / Sleep").

**(d) Character scale**
- About 12% of frame height on the balcony (`_t056`), about 25% in the apartment (`_t046`), and 35–45% in the street close-up (`_t071`).
- Animation is rotoscoped sprites (see the IGN video).

**(e) Pacing**
- One 34 s shot of the title screen, black at 00:36, then 2–4 s shots. The file breaks off before the trailer ends.

### The Last Night, "The Journey to One of the Most Beautiful Games of E3" (IGN First)

11:16. A making-of: the influences, the 2014 Cyberpunk Jam version, the Unity production, and how the E3 2017 trailer was planned. The most useful parts for us are the trailer-planning segments.

- **Influences** (00:30–02:54): Flashback 1992 (`_t037`), Hong Kong 2012 photos (`_t043`, `_t049`), Blade Runner 1982 (`_t061`), Ghost in the Shell 1995 (`_t073`), Garou: Mark of the Wolves 1999 (`_t139`, `_t145`), Another World 1991 (`_t169`, `_t175`), Prince of Persia 1989 rotoscoping (`_t181`). Lorn music videos "Anvil" and "Acid Rain" appear at 07:36–07:42 (`_t457`, `_t463`).
- **2014 jam version** (01:18–02:06, `_t079`–`_t127`): flat 2D pixel art with no 3D lighting. It shows how much the later lighting adds.
- **How it was built** (03:30, `_t211`): the Unity editor. The selected character "charlie_aim_f1" has a Sprite Renderer with sprite "charlie_walk_cycl…" and material "OddSpriteBacklit", and the hierarchy holds "blackPixel", "weather", "Neon yellow" and many spotlights. **The characters are 2D pixel sprites standing in a lit 3D scene**, with a backlit sprite material. The floor and props are 3D with pixel textures.
- **Rotoscoping** (03:00, `_t181`): an actor filmed side by side with the in-game character.
- **Pipeline strip** (05:36–06:12, `_t337`–`_t373`): concept art, then animation, then environment art, then in-game, for one alley shot. `_t373` and `_t001` show the finished shot: a man in an alley, warm light shafts, blue dusk and bokeh city lights.
- **Trailer facts** (04:24–04:48, `_t265`–`_t289`): "E3 reveal trailer 2017. 100% realtime, 4K 30 fps, 1:15 duration, about 45 days. Team: 1 environment artist, 2 animators, 1 audio designer, 1 programmer. Goals: introduce a new IP, reveal the new visual style, tease the story, tease the gameplay."
- **Trailer plan** (04:54–07:24, `_t295`–`_t439`): the storyboard is a grid with rows WHEN / WHERE / WHO / WHAT / HOW, and the arc labels run THE WORLD → THE CHARACTER → THE PROBLEM → THE ACTION → THE TEASE.
- **Tension curve** (09:00–10:24, `_t541`–`_t625`): a plotted intensity line under audience reaction clips. It rises slowly, peaks first at about 36–39 s (marked "!"), dips, climbs to the climax at about 60–65 s, and ends with a hard cut at 71 s.

Best shots for (a)/(b): `_t001` (alley with light shafts), `_t013` (wet street, bokeh reflections, taxi headlight beams), `_t481` (street with a tree, a taxi in volumetric light, and reflections), `_t025` (sunset skyline, a strong silhouette layer). For (c): `_t193`–`_t205` (2015 street demo, pixel detail at 720p). For (e): the stats and storyboard frames above.

### 1uS1qoPOZb1R0ulL.mp4: 狐ト蛙ノ旅 アダシノ島のコトロ鬼 PV

This is a promo video for *Kitsune to Kaeru no Tabi: Adashino-jima no Kotoro Oni* ("Fox and Frog's Journey"), a 3D exploration adventure by Rias (リアス). The title and credits card appears at 00:22–00:27. The file was created on 2021-12-21, which fits a PV released in December 2021. The game was announced in 2020 and is set for PC (Steam) in autumn 2026 ([4Gamer](https://www.4gamer.net/games/649/G064920/), [Automaton](https://automaton-media.com/articles/newsjp/adventure-20251211-370659/)).

27.2 s. A fox girl and a frog explore a Japanese night town with lanterns, an onsen-style interior and stone stairs. **It is not pixel art and not side-on.** The camera is high and three-quarter, the shading painterly, with heavy bloom and depth of field.

- (a) Framing: only `_t013` (notice board) comes close to side-on. The rest are top-down three-quarter views (`_t004`, `_t010`, `_t016`).
- (b) Lighting: the most useful part. Warm lantern pools in deep dark scenes, red lanterns, a green neon sign, reflections on wet stone (`_t001`, `_t010`).
- (c) Pixel: none. The UI is a thin gold-framed dialogue box with the name above it, and circular kanji button prompts (移動, 灯す, 話す). A good model for low-key diegetic-style prompts.
- (d) Characters are small, about 8–12% of frame height.
- (e) 9 cuts in the first 18.5 s (shots of about 2 s), then vertical Japanese text on black (00:18–00:21), then a 5 s title and credits card.

## 2. Common visual rules for ProjectRunner

These rules come from the shots above and the `_ref` images. Each UE note is a starting point to test in a level. None of them has been tested.

**Camera**
- Side-on, eye level, horizon flat, the play plane parallel to the picture. Every strong reference holds this (Replaced `_t037`, The Last Night `_t056`, `_ref` night market `hi_808f9733`).
- Use a perspective camera, not an orthographic one, with a narrow field of view so the background layers show parallax as the camera follows. Both games show parallax on the background layers. A starting range of 20–35° horizontal FOV is a guess to tune in `L_TexelTest` or the G1 level.
- Put out-of-focus foreground occluders (plants, poles, passers-by, wall edges) in front of the play plane in most rooms.
- Trailers and cinematics are letterboxed to 2.35–2.5:1. Whether gameplay is letterboxed is a separate call. Replaced appears to letterbox gameplay too, but the trailer framing could be added in the edit.

**Layers (front to back)**
1. Foreground occluders: dark, out of focus, partly cropped.
2. Play plane: the character, interactables, the props the player uses. Sharpest focus and the clearest light.
3. Room or street set: the back wall, shopfronts, stalls, balcony rails.
4. Background city: towers with emissive windows and signs, softened by height fog.
5. Sky or fog gradient, sometimes with a single light source (sunset or searchlight).

**Palette**
- Low key overall. Most pixels sit in the bottom third of the value range.
- Cool ambient light (teal, blue-green, blue-black) against warm practicals (sodium orange, tungsten yellow). Accents are neon red, magenta and cyan, used sparingly.
- Each scene gets a dominant grade, as Replaced does: teal exteriors, orange interiors, a red alarm room, a green lab. This is the easiest way to tell rooms apart in a narrative game.
- Wet, reflective ground is in almost every exterior reference. It doubles every neon source.

**Pixel scale and what gets pixelated**
- In both games the pixel grid is about 4–6 screen px at 1080p, roughly 180–270 lines of vertical resolution.
- Pixelated: textures, character surfaces, geometry silhouettes, signs, screens, UI.
- Smooth: volumetric fog, light shafts, bloom, depth of field, lens effects, rain on the lens, lasers and some particles.
- An integer grid keeps pixels even. 640x360 scales by 3 to 1080p, 4 to 1440p and 6 to 4K. 480x270 gives the chunkier look closer to the references, but it only scales evenly to 1080p and 4K (x4, x8).

**How the look seems to be made (from what's visible)**
- The Last Night: 2D rotoscoped pixel sprites with a backlit sprite material, placed in a 3D scene with real-time spotlights, fog and post-processing at full resolution (IGN 03:30, `_t211`).
- Replaced: the low-res grid covers geometry edges as well as characters (`_t081`), while fog, bloom and depth of field stay smooth. That points to a scene rendered at low resolution and then upscaled, with lighting effects composited at output resolution. The footage doesn't show whether its characters are sprites or 3D models.

**UE 5.8 notes**
- *Textures*: as decided on 2026-10-02 and 2026-10-08, pixelate before import with Pixel8r 2, then use nearest filter (`TF_Nearest`) and no mipmaps.
- *Whole-scene pixel grid*: the references also pixelate geometry edges and characters, which pre-pixelated textures alone don't do. Adding a screen-space pass would add to the 2026-10-02 decision, so Mike should rule on it. Ways to test it:
  - A post-process material that snaps the UV to a fixed grid (`floor(UV * Res) / Res`) and samples `PostProcessInput0`. Put it at the earliest blendable location so bloom, depth of field and tonemapping run after it, so they stay smooth. Check the 5.8 location names and the pass order in a test level. Height fog and volumetric fog are composited before most post locations, so they will get pixelated too unless they render after the pass.
  - A low `r.ScreenPercentage` (about 33% for 640x360 at 1080p) with temporal upsampling and AA off and nearest upscaling (`r.Upscale.Quality 0`). This is cheaper. Check which passes then run at full resolution.
  - A SceneCapture2D into a render target at 640x360 or 480x270, shown full screen with nearest sampling. This gives the most control but renders the scene twice and works against Lumen and TSR.
  - Snap the follow camera to the world size of one screen pixel at the play plane, so pixels don't shimmer while the camera tracks. In the references the edges stay clean in slow pans.
- *Volumetric fog*: Exponential Height Fog with Volumetric Fog on. Set Volumetric Scattering Intensity on the key lights (the drone beams and shop spill in the references). Use Local Fog Volumes for haze inside rooms.
- *Lumen or baked*: the references use moving lights (searchlights, flicker, backlit crowds), and the brief allows depth movement inside rooms. Lumen GI with real rect and point lights behind the neon fits that. Don't rely on emissive meshes alone to light the scene, because small emissives get noisy in Lumen. Baked lighting (GPU Lightmass) is cheaper and has no noise in fixed side-on rooms, but it can't follow lights that change by choice. Measure Lumen against the 60 fps budget in the G1 level before deciding.
- *Wet ground*: low-roughness floor material instances with puddle masks. Lumen reflections, or SSR as the fallback.
- *Rain and lens*: Niagara at full resolution, kept off the pixel grid like the references.
- *UI*: pixel font and icons in one or two accent colours (Replaced), or a thin framed dialogue box (Kitsune PV). This fits the HUD limits in the brief.

**Character scale**
- Play cameras: the lead at 15–20% of frame height (Replaced 12–18%, `_ref` night market 15–17%).
- Dialogue and choice cameras: 25–45% (The Last Night apartment and street shots).
- Rim or back light on the character in every room, so the silhouette reads against a dark set.

## 3. Trailer structure template (75 s target, range 60–90 s)

This is based on The Last Night's stated plan (1:15, world → character → problem → action → tease, first peak at about 37 s, climax at about 62 s, cut at 71 s) and on Replaced's measured edit (cards at 0–13 s, about 2 s shots, a slow section and audio dip before the action, a 10 s end card). ProjectRunner has no combat, so the tension has to come from choices, hacks, cutscenes and the music.

| Time | Beat | Content | Shot length | Audio |
|---|---|---|---|---|
| 0–4 s | Cold open | One quiet side-on wide shot: rain, neon, the lead small in frame. No text. | 4 s | Ambience and a single note |
| 4–7 s | Studio card | Name in pixel font on black (Replaced 00:04) | 3 s | Music bed starts |
| 7–18 s | The world | 3–4 establishing shots that each show the layer stack: street, balcony, interior, skyline | 3 s | Low, steady bed |
| 18–30 s | The character | The lead walking through rooms, a look/use interaction, one spoken line | 2–3 s | Bed plus the voice line |
| 30–40 s | The problem | Dialogue choice with the timer showing, a hold-to-hack, the first cutscene. **First peak at 36–39 s** on a sting or reveal | 1.5–2 s | Rising, a hit at the peak |
| 40–47 s | Breath | One held shot of 4–6 s (Replaced elevator, 00:52), then black | 4–6 s | Drop to near silence (Replaced dipped 8 dB) |
| 47–63 s | Consequence | Montage of branching outcomes and Sequencer cutscenes, 1.5–2 s shots, cut on the beat. **Climax at about 60–63 s** | 1.5–2 s | Loudest section |
| 63–66 s | Tease | Hard cut to black, one last line or image | 2–3 s | Cut out, one line |
| 66–76 s | Title | Logo, "Episode 1", platforms or wishlist, held | 8–10 s | Tail of the music |

For 60 s: cut the world to 2 shots and the consequence montage to 10 s. For 90 s: add a second interaction run between the character and problem beats, and stretch the breath to 8 s.

## 4. `_ref` images by theme

There are 113 files: 112 images and one PSD (`00_Indie-Folk-Fest-LandingPage.psd`, the source of the matching PNG). Exact duplicates: `ab_05cc4b7c` = `ab_3e2ede11` = `props/warehouse-market-01.png`; `ab_8e54148e` = `props/ab_9437708d`; `ab_2cf21333` = `props/ab_c2623fab`; `CHAR_1cd428f0_0` = `CHAR_4cfbc408`. `CHAR_53b66955` and `CHAR_8d26c951` are 2x upscales of `CHAR_1cd428f0_2` and `CHAR_0f214add` (about 37 dB PSNR at matching size). `props/bar-01`–`04`, `bar-07`, `room/room-01.jpg`, `room-02.png` and `room-03.png` are already in `refs/`.

Prefixes used below: `NM_` = `pixel_art_style_Cyberpunk_night_market_scene_in_Night_City_`, `SIGN_` = `pixel_art_style_Cyberpunk_night_market_signage_filled_with_ne_`, `CHAR_` = `pixel_art_style_stylized_game_character_design_concept_art._b_`, `BLDG_` = `32_bit_pixel_art_sprite_sheet_game_assets_cyberpunk_building__`. The first 8 characters of the ID are enough to find a file.

"Side-on readability" means a frontal elevation, a flat horizon, clear layers, and a character scale that would work on a play plane.

| Theme | Files (unique) | Strongest for side-on |
|---|---|---|
| Night market | 26 (22): 18 in the root `NM_*`, 7 in `props/NM_*`, plus `props/warehouse-market-01.png` | `NM_hi_808f9733…_0` (a fully frontal elevation: wet street, kiosk row, overpass with a neon sign, skyline in the rain, characters at about 17% of frame height; the best template in the set). `NM_ab_0e43627e…_0` (stalls under an elevated train, reflections). `NM_ab_76dbd8f4…_0` (stall row parallel to the frame under a rail bridge). `NM_hi_89d4504e…_0` (buses under the elevated rail, strong layers). `NM_hi_8f446de1…_0` (street stalls under wires). The top-down ones (`props/NM_ab_98ba69df`, `NM_ab_2cf21333` container market) are mood only. |
| Signage | 6: `SIGN_*` | `SIGN_9021c73b…_0`, `_1`, `_3` (sign sheets in frontal elevation with frames, glow and grime). `SIGN_565ed81a…_0`. `SIGN_00f90173…_3` (a whole storefront with signs, also a facade reference). All of them carry fake kana. Per the 2026-10-07 decision, use them for frame shape, colour and glow only, with a blurred fill instead of text. |
| Characters | 28 (25): `CHAR_*` (25), `16_pixel_art_characters_*` (2), `3d_stylized_…electric__802bfe72` (1, a creature) | `CHAR_0dad1866…_0` (four large figures, the clearest silhouettes). `CHAR_3e2d023d…_0` (strong silhouettes with orange accents). `CHAR_0a5e4090…_0`. `CHAR_0e2dfc53…_0`. All are front or three-quarter flat-colour concepts on lilac grounds. None shows a side profile, which is what a side-on walker needs, so they are costume and shape sources only. |
| Interiors | 25: bars `props/bar-01`–`07`, `props/…extreme_close-up…bar_man_*` (4), `alley/tofusurprise_*` (2, crowded bars); rooms `room/*` (8), `the_interior_of_a_futuristic_appartment_*` (3), `…ripperdoc_clinic…b928bdf7` (1) | `room/room-02.jpg` (a loft in frontal cross-section, a near-perfect side-on room). `room/room-04.jpg` (two-level loft, warm lit nook under a cool upper level). `props/bar-04.png` (frontal bar counter, two figures at play-plane scale). `props/bar-01.png`. `…ripperdoc_clinic…b928bdf7` (a frontal clinic counter, for the planned clinic). `room-02.png`, `room-03.png` and `room-04.png` are high three-quarter and isometric views, so they don't work as side-on references. |
| Buildings | 19: `building/*` (15: 4 AI, 9 Kowloon photos and drawings, 2 other photos), plus root `BLDG_0d074dbc_0`, `_3`, `BLDG_1f1b6b38`, `BLDG_6bb5c786` | `BLDG_6bb5c786…_0` (three side-on pixel facades at night with layered towers behind, ready to use as a facade reference). `BLDG_0d074dbc…_0`. `BLDG_1f1b6b38…_0` (facade with a shopfront base). `building/balconies-windows-and-washing-kowloon…A3A83C.jpg` (a real frontal facade with clutter). `building/kowloon-1.jpg` (the Kowloon cross-section drawing, a side-on cutaway of stacked rooms that fits the room-behind-facade idea). |
| Alleys | 2: `props/alley-01.jpg`, `props/alley-02.jpg` | Both are one-point perspective views down an alley, not side-on. Use them for clutter, cables and wet-ground mood. The `alley/` folder actually holds two crowded-bar images, listed under interiors. |
| Props | 5: `BLDG_0d96cbeb_0`, `BLDG_0f405562_1`, `_3`, `props/pixelize_…noodle_bar…cdefc782_0`, `_3` | `BLDG_0d96cbeb…_0` (a side-on prop sheet: water tower, tanks, AC units, shanty kiosks. It matches the env_v1 keep list of roof tanks, shanty boxes and antennas). `BLDG_0f405562…_1` and `_3` (facade element sheets with shutters, vents, doors and panels, laid out like a trim sheet). `noodle_bar…cdefc782_3` (container shop, isometric, for parts only). |
| Off topic | 1: `00_Indie-Folk-Fest-LandingPage.png` (+ .psd) | A web landing page with no relevance. |

Counts add up to 112 images, plus the PSD.

## 5. Links in runner-notes.txt

Titles were checked with YouTube oEmbed on 2026-10-15.

| Note label | Link | YouTube title | Local file |
|---|---|---|---|
| The Last Night, trailer (full) | https://www.youtube.com/watch?v=kXeQJnbc9bA | THE LAST NIGHT Gameplay (New CyberPunk Game) E3 2017 (Punish) | `THE LAST NIGHT Gameplay … - Punish (720p, h264).mp4`. **The local copy is truncated: video ends at 1:12.7 of 5:51.** This upload is a third-party gameplay video, not the official 1:15 reveal trailer. |
| The Last Night, trailer (breakdown) | https://www.youtube.com/watch?v=UJfeziEzSg4 | The Last Night: The Journey to One of the Most Beautiful Games of E3 - IGN First (IGN) | `The Last Night The Journey … - IGN (720p, h264).mp4`, complete |
| Replaced, trailer | https://www.youtube.com/watch?v=YheMqHoeHVc | REPLACED - Official Launch Trailer (Thunderful Games) | `REPLACED - Official Launch Trailer - Thunderful Games (1080p, h264).mp4`, complete |

Every link has a local file. The opposite gap: `1uS1qoPOZb1R0ulL.mp4` (the Kitsune PV) has no link in the notes.
