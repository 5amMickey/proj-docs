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

## Attack FX (prototype)

Brief: `HoudiniSource/docs/briefs/dawn_attack_fx.md`. Hooks: `UShalaCombatComponent::OnAttackHit` (added by the combat session).

- [x] Houdini: slash arcs (light 150°, heavy 220°) and impact atlas (sparkle, burst, radial lines, flash disc)
- [x] UE: `M_VFX_Slash`, `M_VFX_ImpactSprite`, `M_VFX_HitFlash` (overlay), `M_PP_ImpactFrame` (black-and-white frame)
- [x] Niagara: `NS_Attack_SlashLight/Heavy`, `NS_Attack_ImpactLight/Heavy`
- [x] `UShalaHitFXComponent`: slash per swing; per hit an impact burst, white flash, hit-stop (0.05 / 0.12 s), camera shake (`UShalaHitCameraShake`), heavy-only impact frame
- [ ] Play-test hits on the goblins and tune timing, sizes and hit-stop length. Not yet seen in play.

## Safe zone (prototype)

Brief: `HoudiniSource/docs/briefs/dawn_safezone_fx.md`. Interaction and enemy behaviour are the combat session's (X routing, goblins giving up).

- [x] Houdini: stone block, dome shell, orb, crack-vein texture
- [x] `IDawnInteractable` (Interact, GetInteractPrompt) and `ADawnSafeZone` (IsInsideActiveZone, ZoneRadius, idle/activate/active FX)
- [x] Materials and Niagara: `M_VFX_OrbDome`, `M_VFX_OrbCore`, `M_SafeZone_Stone`, `NS_SafeZone_Idle/Activate/Active`
- [x] Placed `SafeZone_Stone` at (4000, -5000, 0), radius 2000, in the gym's safe-zone area
- [x] Works in PIE (checked by the combat session): X activates it, dome, cracks and orb show from the game camera, light attacks are blocked inside the lit dome
- [ ] Mike judges the dome look: tint vs veins from the game camera. Dome is capped at 7 m tall so the camera stays above it.
