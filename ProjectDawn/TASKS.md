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

## Combat round 2: Shala takes damage (combat session)

Decisions (Mike, 2026-09-29): health shown as a plain bar (not hearts, restyle later); A becomes a dodge with i-frames (the "dash" is RT: sprint, or gap-closer when locked on); death respawns at the last lit safe-zone stone; goblins get swipe + lunge, each with a ground marker that fills over the wind-up (no colour flash); a light attack from a sprint is a narrow forward thrust, a heavy from a sprint is a spin around her, both with a long recovery on a miss (shorter on a hit, combat session's suggestion); goblin health bars stay for now.

- [x] Shala health (CSV), taking damage, hit stagger, on-screen health bar (b85fbfe)
- [x] A = dodge: toward the stick (sidestep when locked on), invulnerable window, cancels attack recovery. Built; i-frames and the cancel not yet tested with held input
- [x] Death: respawn at the last lit stone (else level start), full health, goblins reset. Tested both cases in PIE
- [x] Goblin attacks: swipe + lunge in a CSV, wind-up with a filling ground marker, hits Shala. Tested in PIE
- [x] Sprint attacks: thrust (box hit shape) and spin (circle), per weapon, RecoveryOnHit. Built; needs a held sprint to test
- [x] CSV switch for goblin health bars (bShowHealthBar)
- [x] Docs, commit and push
- [ ] Mike play-tests on the controller: dodge timing vs goblin wind-ups, sprint thrust/spin, charge, goblin mesh facing
