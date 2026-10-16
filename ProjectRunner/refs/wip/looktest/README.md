# Pixel look test, 2026-10-15

Four stills and one clip from the same side-on night street in `RunnerSandbox_01`, UE 5.8.

| File | Treatment |
|---|---|
| `looktest_A_tex.png` | A. Textures only, nearest filtering, about 33 texels per metre |
| `looktest_B_640.png` | B. Whole-screen grid, 640x360 (3x3 screen pixels per cell) |
| `looktest_C_480.png` | C. Whole-screen grid, 480x270 (4x4 screen pixels per cell) |
| `looktest_B_640_nodof.png` | B with depth of field off |
| `looktest_C_480_truck.mp4` | C, 6 s camera truck at 30 fps with Manny walking |

All stills have depth of field on except the `nodof` one. Output is 1920x1080 from Movie Render Queue with the project's TSR and 64 warm-up frames.

## Pack

Big Slum Alley, copied from `C:\Prod\AssetPacks\Content\SlumAlley` to `/Game/SlumAlley`. It is 409 files and 3.12 GB. I scanned every package for `/Game/` paths and found none outside `/Game/SlumAlley`, only `/Engine` content, so a folder copy is the same as Migrate. The packs table lists it as UE 5.9, but the assets load in 5.8.

I chose it because the showcase map is one long alley along X with a dressed south facade. That facade faces +Y, which is the G1 camera direction, so it needed no rotation. It has shopfronts, a lit passage, wall lights, neon and billboards. Cyber-Town and Cyberpunk City both reference folders outside themselves (`/Game/IcePalace`, `/Game/Scifi_Alley`, `/Game/BP`, `/Game/Developers`). Neon Point is 12.7 GB. Downtown Alley is self-contained but has no neon.

## Scene

`/Game/ProjectRunner/Maps/L_LookTest`, built by `Unreal/Scripts/pr_build_looktest.py`. The builder adds `Map_SlumAlley` as a sublevel, duplicates 2244 actors from its south side into the new map, and removes the sublevel again. That is every actor with origin X -2600 to 3400, Y below -330, Z below 900, and it includes 148 of the pack's lights. Leaving out the north side opens the street to the camera. Leaving out the top floors lets the city show above the roofs. The showcase map is never saved.

Five layers, front to back:

1. Foreground, 11 to 18 m from the camera: two dark poles, a hanging wire, a lit billboard stand, barrels.
2. Play plane at Y -350: Manny (`SKM_UEFN_Mannequin`, idle loop), the Houdini vending machine and hack terminal, trash bags.
3. Street set: the copied facade with the lit passage as the doorway. The Houdini AC unit and neon sign use their 128 px instances.
4. Mid city, 40 to 300 m behind: box towers with `M_LT_Tower`, a procedural window grid in world space.
5. Far skyline, 600 to 1200 m: taller towers in exponential height fog.

The ground is one wet plane, `M_LT_WetGround`, with noise-driven roughness. Fog is Exponential Height Fog with volumetric fog on. Lighting is Lumen with the pack lights plus a sodium spot over Manny, a cyan rim light and a few neon point lights. Exposure is manual.

## Camera and depth of field

`CAM_LookTest` is a CineCamera at (300, 3250, 505), yaw -90, pitch 0, so the horizon is flat. The filmback is 72 x 40.5 mm with a 134.4 mm lens, which gives a 30 degree horizontal FOV. The camera is 36 m from the play plane. Manny is about 170 px tall, 16% of the frame.

Depth of field is the camera's own diaphragm DOF. Focus is manual at 3600 cm, aperture f/1.0. The large filmback doubles the blur in pixels compared with a 36 mm sensor. At f/1.0 the foreground poles blur by about 20 to 50 px and the far city by about 10 px. The `nodof` still sets the focus method to Disable.

## How each treatment is built

The renderer `Unreal/Scripts/pr_render_looktest.py` sets each treatment on `CAM_LookTest` in memory before each job. None of it is saved into the map.

**A, textures only.** For every Slum Alley texture the level uses, the script sets the filter to Nearest and an LOD bias. The bias brings the texture to about 33 texels per metre, which is one texel per 640x360 cell at the play plane. The script gets each surface's density from the mesh's UV0 streaming density times the actor scale. Material UV tiling is ignored, so the density is approximate. 97 textures went from 4K and 8K to between 32 and 256 px. Geometry edges, lighting and Manny stay at full resolution. The Houdini props already use 128 px nearest textures.

The texel density menu (64 to 512 px/m) is finer than the screen at this camera. One metre at the play plane is about 100 screen pixels, so even 64 px/m is only 1.5 screen pixels per texel. I rendered A at 33 px/m because A at 128 px/m looked the same as no treatment.

**B and C, whole-screen grid.** `M_PP_PixelGrid` is a Post Process material at blendable location Scene Color Before DOF. `MI_PP_PixelGrid_640` and `MI_PP_PixelGrid_480` set its `GridRes` parameter. The script adds one of them to the camera's Weighted Blendables at weight 1. The graph is ScreenPosition (ViewportUV) into a Custom node `GridSnap`, then SceneTexture PostProcessInput0 with filtering off, into Emissive Color.

`GridSnap` subtracts the TSR jitter (`View.TemporalAAJitter`) before it picks the cell, then adds it back to the sample position. That keeps the grid fixed in unjittered screen space, so TSR sees a blocky image that holds still between frames. Without the jitter step, TSR softened every cell edge by about 1 px. With TSR off (`r.AntiAliasingMethod 0`) the cells were sharp but aliased and noisy. With the jitter step the cells come out sharp and the content inside each cell is still antialiased. I tested all three.

Scene Color Before DOF runs at render resolution before DOF, TSR, bloom and tonemapping. All of those therefore work on the blocky image and stay smooth.

I did not test a low `r.ScreenPercentage`. In UE 5.8, DOF runs at render resolution and the upscale comes later, so a nearest upscale would make the DOF and bloom blocky too.

## What is pixelated and what stays smooth

Pixelated in B and C: geometry edges, textures, Manny, lighting, reflections on the wet ground, and fog.

Height fog and volumetric fog are pixelated, because UE composites both into scene colour before the Before DOF location. I measured it on pixels. In a fog-only patch of sky with DOF off, 81% of pixels match the top-left pixel of their 3x3 cell, against 57% with no grid. With DOF on, the same patch drops back to 56%, because the blur runs after the snap. On the in-focus play plane the haze stays stepped (93% against 81%). It barely shows there because haze is a soft gradient. A hard-edged light shaft would show steps.

Smooth: depth of field, bloom (the neon tubes have stepped edges and a smooth glow), TSR, tonemapping and vignette.

Translucent materials should stay smooth too. The engine source says Before DOF materials see scene colour without the After DOF translucency pass, which is the default for translucent materials. I did not test it because the shot has no translucent effects in view.

## Problems found

- Thin geometry breaks up. At 480x270 the overhead cables turn into dotted lines, because each cell takes one sample.
- In the truck clip only the play plane moves by whole cells. The camera steps one 480 cell (4.02 cm) per frame, so the facade and Manny's path line up with the grid. The city, the foreground and Manny's limbs move by fractions of a cell and shimmer.
- Manny's walk clip moves at 165 cm/s and the camera at 121 cm/s, so he drifts about 2.7 m to the right over the clip. One cell per frame was the closest whole-cell speed. The walk uses the clip's root motion, and a transform key steps the actor forward each time the 4.1 s loop restarts.
- 480x270 divides 1080p and 4K evenly but not 1440p (5.33 px per cell). The grid could be set in whole screen pixels instead (4 at 1080p, 5 at 1440p, 8 at 4K). Vertical resolution would then change slightly between 270 and 288 lines.
- The Houdini AC unit and neon sign ended up in dark corners and don't read. The vending machine and terminal do.
- The scene is over budget. GPU time is 17.6 ms at 1080p. The 148 pack lights cost 5.5 ms and Lumen reflections 1.9 ms.
- `EditorActorSubsystem.duplicate_actors` crashes the headless commandlet, so the builder runs in the GUI editor with `-ExecutePythonScript`. The editor sometimes crashes on exit after a finished render (exit code 139). The outputs were complete each time.

## Frame time

Measured by `Unreal/Scripts/pr_time_looktest.sh` in `-game` at 1920x1080, editor build, RTX 5070 Laptop. Each run is 900 frames with the CSV profiler, and the first 300 are dropped. The figures are medians.

| Run | Frame | GPU | Post-processing pass |
|---|---|---|---|
| No grid | 18.7 ms | 17.6 ms | 0.19 ms |
| 480x270 grid | 19.0 ms | 17.7 ms | 0.22 ms |

The grid adds about 0.03 ms. The difference in total frame time is within run-to-run noise. A screenshot from each run confirmed the grid was on in the second.

## Recommendation

C, the 480x270 grid with depth of field, built as above. Its 4 px cells match the 4 to 6 px grid measured in Replaced and The Last Night. It pixelates edges and the character the way the references do, while DOF and bloom stay smooth. B looks cleaner but reads as softened HD more than pixel art. A leaves edges and the character at full resolution, and at this camera distance the texel menu values are finer than the screen.

The 2026-10-02 decision says pixelate textures before import, not at runtime. A screen pass adds to that decision, so it is your call. If you take C, I would set the cell size in whole screen pixels per output resolution and snap the follow camera by whole cells at the play plane.

## Rebuild and rerender

With the editor closed:

- Build: `UnrealEditor.exe RunnerSandbox_01.uproject -ExecutePythonScript="<abs>/Scripts/pr_build_looktest.py" -unattended`
- Render: `UnrealEditor.exe RunnerSandbox_01.uproject /Game/ProjectRunner/Maps/L_LookTest -EnablePlugins=MovieRenderPipeline -unattended -ExecutePythonScript="<abs>/Scripts/pr_render_looktest.py"`, with `PR_RENDER` set to a job JSON. The script's docstring shows the format.
- Frame time: `Scripts/pr_time_looktest.sh`

Assets are in `/Game/ProjectRunner/LookTest/` (`Materials/`, `Sequences/LS_LookTest_Still`, `LS_LookTest_Truck_640`, `LS_LookTest_Truck_480`). `PPV_PixelGrid_TimingOnly` in the map holds the 480 grid at weight 0 for the timing runs. Nothing is committed.

## Result, 2026-10-16

Mike picked A, textures only. `Unreal/Scripts/pr_setup_looktest_play.py` makes `L_LookTest` playable and saves treatment A to the 97 Slum Alley textures (nearest filtering plus LOD bias, 33 texels per metre). It sets PRGameMode, puts a PlayerStart on the play plane, adds `CAM_Follow` (a PNFollowCamera at the same 30 degree, 36 m framing with the same depth of field), and adds three invisible walls that keep the player on the street. The idle Manny is hidden in game; `pr_render_looktest.py` unhides him for renders. `CAM_LookTest` no longer takes the view on its own, so `pr_time_looktest.sh` now times through the follow camera.

`EditorStartupMap` and `GameDefaultMap` in `Config/DefaultEngine.ini` point at `L_LookTest` while the look is tested. A `-game` launch with no map argument loaded `L_LookTest` with PRGameMode and framed the player through `CAM_Follow`.

Camera reframed 2026-10-16 to Mike's editor viewport: `CAM_Follow` at (-146, 313, 371), pitch 0 (Mike zeroed it), 90 degree FOV, 6.6 m to the play plane, with focus at the play plane. The character is about a quarter of the frame height, up from 16%. The foreground layer (Y 1550 to 2150) is now behind the camera. `CAM_LookTest` and the stills keep the 30 degree, 36 m framing.

Set scaled 2026-10-16: the copied Slum Alley set (2,246 actors, plus the Houdini AC unit and neon sign) is scaled by 0.88 about (400, -600, 175), so pack doors go from 218 to 192 cm against the 164 cm Mannequin. Lights keep their look (attenuation and source size times 0.88, intensity times 0.88^2). Change `ENV_SCALE` in `pr_setup_looktest_play.py` and run it again to try another value; each actor's `PRScale=` tag records its current scale. The renders in this folder predate the scale.
