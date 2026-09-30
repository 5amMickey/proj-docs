# ProjectFury tasks

## Stage 0: set up

- [x] Copy Combat Fury into the repo, without Saved, DerivedDataCache, Intermediate and Developers (2,802 files, 2.65 GB)
- [x] Rename to ProjectFury, add the C++ module, MCP on port 8001, Live Coding off, `.gitattributes` for LFS from Dawn
- [x] Remove jump, traversal, GASP sprint and walk, and crouch on B from `IMC_Sandbox`. Add `IA_FurySprint` (K, RT) and `IA_FuryDodge` (Left Shift, Space, B)
- [x] Builds and opens in 5.8.3
- [x] First commit pushed (e3948b1, 2026-10-01)

## Stage 1: Dawn movement on GASP

- [x] `UFuryMovementComponent`: sprint wind-up, jog wind-up, sprint, slide, slide wind-up, dash, ported from `UShalaMovementComponent`
- [x] Ticks after GASP's PreCMCTick and before the Character Movement component; Dawn's speeds and braking win
- [x] Top-down camera from `CameraSettings.csv`; T toggles GASP's third-person camera
- [x] F5 reloads `FuryMovement.csv` and `CameraSettings.csv`
- [x] `Map_FuryGym`: lanes for sprint (50 m), slide (release line and aim targets) and dash (1 m marks); 7 and 8 teleport between the gym and DemoRoom
- [x] PIE checks with `fury.TestSprint` and `fury.TestDodge`: wind-up turns to the aim, sprint reaches 1200 cm/s, slide eases to 600, dash about 1.4 m
- [x] Combat Fury on the gamepad: A light, X heavy, LB dodge, RB cycle weapons, Y grab, L3 spell, View takedown, D-pad left/right switch target (2026-10-01)
- [x] SprintSpeed 1200 to 1100 after Mike's first play
- [ ] Confirm X heavy on the gamepad; a single press showed no attack in the automated test
- [ ] Mike's play test and the stage 1 call
