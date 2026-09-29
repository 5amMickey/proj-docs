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

## VFX round 2 (Mike, 2026-09-29: "do all of the list, minus lightning, and all new requests")

- [x] Heavy charge-up: `NS_Attack_ChargeUp` loops on OnChargeStarted, pops `NS_Attack_ImpactHeavy` on OnChargeFull, stops on OnAttackStarted or when she leaves AttackCharging
- [x] Dodge: dust kick-off and speed streaks on OnDodged (landing puff dropped: footsteps resume after it)
- [x] Shala hurt (ECS_Staggered): red-white burst, red flash on her, bigger shake
- [x] Shala death (ECS_Dead): big dust burst; respawn (OnShalaRespawned): blue beam, ring, sparkle
- [x] Goblin death: dust-and-rock poof with sparkle on AGoblin::OnEnemyDied
- [x] Review pass: all systems seen in Simulate or PIE; found and fixed the slash meshes rendering with the default material. Timing and size tuning still wants Mike's play-test
- [ ] Afterimage on dodge once Shala has a real mesh

## Combat round 3: feel fixes (combat session, 2026-09-29)

Done and pushed (ProjectDawn 51284ff): gamepad A light/interact, B dodge, X heavy, Y reserved for block/parry; three-light combo with ComboCooldown and SwingInterval; finisher after one or two lights; SlidingTime 0.5; "A  Talk" prompt on the HUD; boundary walls round the gym; camera lag 10; camera boom absolute rotation (fixed the rotated-frame flash). VFX session: flashes and screen shake toned down.

Open for next time:
- [x] (81a3ba5, hold threshold chosen: tap swings on press, held 0.2 s = charge; hold path untested in PIE, needs Mike) Mike: how should the charge heavy be reworked? (options offered: tap = quick swing with charge only past a hold threshold; release-to-strike with no auto overhead; just retune ChargeTime)
- [ ] Mike: keep one direction for a whole light combo, and/or shorter light lunges? (offered after the camera fix)
- [ ] Mike play-tests: slide length, heavy lunge distance (LungeDistance on Heavy rows), dodge timing vs goblin wind-ups, sprint thrust/spin
- [ ] Block/parry on Y

## Combat round 4: hit-stop and combo debug (combat session, 2026-09-30)

Mike's requests, relayed by the VFX session. Pushed as ProjectDawn bd3c811.
- [x] Slide re-sprint: holding sprint during a slide finishes the wind-up after the slide ends (was dropped when SlidingTime = SlideChargeTime)
- [x] HitStop per attack (AttackStats.csv); landed hits hold the combat clock; GetCurrentHitStop() for Hit FX
- [x] bComboOnlyOnHit switch (off by default)
- [x] bShowComboDebug: a line per press on screen and as "Combo:" in the Output Log
- [x] Fix: a queued press was dropped when a press and the chain timer fired the queue in the same frame
- [x] Light-combo turning: turn cap per swing, ComboTurnLimit 45 (9216b5c)
- [ ] Mike: "heavy moves on the heavy weapon, one attack button" (discuss before building)
- [ ] Mike play-tests: heavy hold (0.5 s = charge bar, then lunge), slide re-sprint, hit-stop feel, then decide bComboOnlyOnHit

## VFX round 3: hit-stop, charge glow, lunge drill (VFX session, 2026-09-30)

- [x] Attack punch partly restored after the camera fix (ProjectDawn 5e71767): impact frame on heavy hits, heavy flash disc back, shake 0.3 light / 0.7 heavy
- [x] Hit FX freezes for each attack's HitStop and shakes the struck enemy's mesh (ProjectDawn ec78290)
- [x] Houdini: lunge drill cone and wind ribbon (HoudiniSource a995e44, builder 11, brief docs/briefs/dawn_lunge_fx.md)
- [x] Charge glow grows with GetChargeRatio(), pops at full, holds until release (ProjectDawn b3df378; not seen in PIE, needs a held button)
- [x] UE: lunge meshes imported (drill 100 cm), M_VFX_LungeDrill, NS_Attack_Lunge; checked in a looped Simulate preview (b3df378)
- [x] Hit FX plays the lunge drill on OnChargedLunge (combat 9216b5c), lunges of 100 cm or more only (b3df378)
- [ ] Mike: drill on the heavy weapon's early-release lunge too (300 cm), or light weapon only?
- [ ] Mike play-tests: hit-stop and enemy shake, charge glow, lunge drill

## Combat round 5: charge on release (combat session, 2026-09-30)

Pushed as ProjectDawn 9216b5c.
- [x] Neither weapon auto-fires at full charge; OnChargeFull fires once
- [x] Light weapon: tap X = sweep, hold and release = lunge that grows with the charge, ChargeTime 0.45, full lunge 280 cm
- [x] Heavy rows renamed: Heavy (tap), ChargedEarly, Charged (was Overhead)
- [x] SlidingTime 0.75 (between the sticky 0.5 and the overshooting 1.0)
- [x] PressBufferTime 0.4 for "combo didn't reset" (best guess: stale queued presses firing late; not reproduced)
- [x] OnChargedLunge and public GetChargeRatio for the VFX session's drill and charge glow
- [ ] Mike play-tests: charge feel on both weapons, slide transitions, turn limit, combo reset (check the "Combo:" log lines if it happens again)
- [ ] Mike: one attack button with moves per weapon (still open)
