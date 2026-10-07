# ProjectFury

Domain: games   Status: stage 1 play test   Updated: 2026-10-01

## What and who

A throwaway test. It answers one question for ProjectDawn: do Dawn's controls (sprint wind-up, slide, dash) feel better when GASP motion matching and Combat Fury's animations drive the character instead of Dawn's capsule stand-in? ProjectDawn stays the main line. Anything that works here gets ported back to Dawn on purpose; this repo never becomes Dawn's base.

Combat Fury is a paid Fab pack by BP Systems (v1.3.2): Blueprint combat components on a copy of GASP 5.5, under `/Game/CombatFury/`.

## Done means

Stage 1 (current):

- [x] ProjectFury builds with UBT (`ProjectFuryEditor Win64 Development`) and opens in UE 5.8.
- [x] In PIE on `Map_FuryGym`, the player has Dawn's top-down camera, and the sprint wind-up, slide and dash run from `FuryMovement.csv` (checked with `fury.TestSprint` and `fury.TestDodge`, 2026-10-01).
- [ ] Mike plays the gym with a gamepad and keyboard and makes the stage 1 call: motion matching sells Dawn's movement from above, needs montages for the wind-up and slide, or isn't worth it.

## Stages

Each stage ends in a play test that decides the next. Stop at any gate.

| Stage | Build | Gate |
|---|---|---|
| 0 | Copy Combat Fury, add a C++ module, remove jump and traversal | Opens in 5.8 and plays |
| 1 | Top-down camera plus Dawn's sprint, wind-up, slide and dash, animated by GASP | Does motion matching sell it from above? |
| 2 | Play Combat Fury's combat top-down; list what's janky | Keep, fix or swap per system: lock-on, dodge, combos, hit stop |
| 3 | Enemies: Combat Fury AI against Dawn's goblins | Keep, fix or swap |
| 4 | Write up what goes back to Dawn | Mike picks what gets ported |

## Stop and ask me when

- Only the global rules apply. Build first; I'll adjust after play tests.

## Avoid

- Editing Combat Fury's Blueprints for stage 1. Dawn's movement is added at runtime by `UFuryPlayerSubsystem`.
- Killing editors by image name. ProjectFury's editor is killed only by PID when its command line contains `ProjectFury`. MCP ports: Fury 8001, Runner 8002, Dawn 8003, Alpha 8004, Sandbox 8005, AssetPacks 8006.
- Live Coding. It's off for ProjectFury because it blocks UBT builds for every project on the shared engine install.

## Where it lives

| What | PC | Mac |
|---|---|---|
| Repo (`Phantom-Break-Studio/ProjectFury`, private, LFS) and Unreal project | `Documents\GitHub\ProjectFury\ProjectFury.uproject` | n/a |
| Combat Fury original (untouched, not in git) | `Documents\Unreal Projects\COMBATFURY` | n/a |
| Brief and tasks | `$PROJ_DOCS/ProjectFury` | `$PROJ_DOCS/ProjectFury` |
| Editor helpers (prefix `f1_`) | `%TEMP%\mcpw\f1_fury.sh`, `f1_run.sh`, `f1_gym.py` | n/a |

## Domain

- **Engine**: UE 5.8.3, C++ module `ProjectFury`. The player is GASP's `CBP_SandboxCharacter` (UEFN Mannequin) with Combat Fury's components.
- **Proof**: a UBT build and a PIE run on `Map_FuryGym`, with `LogFury` lines for state changes and dashes.
- **License**: Fab Standard License, accepted by Mike on 2026-10-01 for a private repo.

## Decisions

Settled 2026-10-01. Don't reopen unless I ask.

- Goal: test Dawn's controls on GASP and Combat Fury animation. Throwaway; wins are ported back to Dawn on purpose.
- Base: a copy of the whole Combat Fury project, plus a C++ module. UE 5.8.
- Dawn's movement is a standalone `UFuryMovementComponent` added to the player at runtime, not a reparent of `CBP_SandboxCharacter`.
- Dawn's component owns the speeds, acceleration, braking and friction, and sets GASP's Gait to Sprint while sprinting.
- Motion matching animates sprint, wind-up and slide. The dash plays Combat Fury's dodge montage with its root motion ignored; the capsule moves by `DodgeSpeed`.
- Jump and GASP traversal are removed. Dawn's movement buttons win clashes.
- Camera: Dawn's spring-arm top-down camera from `CameraSettings.csv`. GASP's Gameplay Camera system is off (`DDCVar.NewGameplayCameraSystem.Enable` false), so Combat Fury's finisher camera moves don't work.
- Gym: `Map_FuryGym`, a copy of DemoRoom with three lanes added. Combat Fury's dummies and enemies stay in the DemoRoom part.
