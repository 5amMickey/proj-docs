# ProjectDawn tasks

## Dust kit VFX (prototype)

Brief: `HoudiniSource/docs/briefs/dawn_dust_kit.md`. Look: `ProjectDawn/Unreal/SourceArt/VFX/_ref/`. Approach: Houdini meshes and mask textures, Niagara in UE (option A). Lightning comes later.

- [x] Pick the approach and write the asset brief
- [x] Build `asset_vfxBuilder_02.hiplc`: dust meshes, rocks, noise texture, shapes atlas (2026-09-29, script `houdini/vfx_builder/build_vfxBuilder.py`)
- [x] Verify headless against the brief's acceptance criteria (all but the UE import pass)
- [x] Review the FBX exports against the UE5 checklist (v01 failed on units and materials; fixed in v02)
- [x] Import meshes and textures into `Content/VFX/Dust/` (2026-09-29: ring 200 cm, Z up, slots named, textures linear masks)
- [x] Materials `M_VFX_Dust` (mesh: unlit masked two-sided, U panning noise, erodes by particle alpha), `M_VFX_DustSprite` (2x2 atlas, erodes inward by depth), `M_VFX_Rock`
- [x] Niagara systems built and compiling: `NS_Dash_Charge` (loops), `NS_Dash_Takeoff` (once), `NS_Dash_Slide` (loops, world space), `NS_Footstep` (once). Mesh emitters are local space: spawn takeoff/footstep detached at the feet with Shala's rotation. Built by `%TEMP%\mcpw\nia_build.py` (not in a repo yet).
- [x] `UShalaDustVFXComponent` on `AShalaCharacter` fires the systems from `GetCurrentState()`; footsteps by distance. Builds and loads (2026-09-29). Emitter fix: mesh emitters need SolveForcesAndVelocity or they don't render.
- [x] Each system seen in Simulate from the game camera: charge swirl + motes, slide shards, takeoff crescent + rocks
- [ ] Mike plays the gym (hold K) and tunes timing/scale. Takeoff wall and ring weren't caught on camera; check they read at game speed. Dust is close in value to the grey gym floor.
