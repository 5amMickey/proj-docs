# Signage grit from the screen/transition FX, plus a portrait hologram

Researched 2026-11-04 from local files only. Nothing run in Unreal; no asset or script changed. Labels: **Local** = file read this session. **Proposal** = my design, untested. **Unverified** = reasoning, no source.

Sources: `PipelineSandbox/Unreal/Scripts/glitch_r2/build_materials.py` (R2), `PipelineSandbox/Unreal/Scripts/pr_build_glitch.py` (R1), `PipelineSandbox/Docs/glitch_review/round02/README.md`, `ProjectRunner/Unreal/Scripts/signage/build_materials.py` (SGN), `research/signage-atlas-materials.md`, `research/glitch-game-references-v2.md`, `Graphics/signage/atlas_tests/README.md`. Epic UE 5.8 pages are cited in those notes, not re-fetched.

## Why the grit repeats

Local. SGN `FX_CODE` hashes one fixed cell grid (`WearCellPixels`) with `Seed`, so a cell is dead or alive forever. Only the flicker stepper (`stepTime`) changes. It also uses `frac(sin(...))`; R1/R2 use sin-free `hash`/`H.h2`.

## Six families, cheapest first

| # | Family | Adapt from | Extra texture samples |
|---|---|---|---|
| 1 | Dead blocks with hold time and varied size | R1 `GLITCH_CODE`: `BlockCells`, `BlockChance`, `BlockHold`, `hold=floor(s/BlockHold)`, `DeadDensity`. R1 `BREAK_CODE`: `DeadCols`, `ColCount`. Output stays the SGN scalar mask. | 0 |
| 2 | Row dropout runs (partial-width bars) | R1 `GLITCH_CODE`: `DropRows`, `DropChance`, `DropLen`, `x0` hash, `DropGlow`. | 0 |
| 3 | Row slip and block shift | R1 `SliceRows`/`SliceCover`/`SliceStrength`, gate `g=h1(s*0.37+sd)<Chance*A`; `BlockShift`. Add to `UV_CODE` before the clamp. | 0 |
| 4 | Roll bar and scan band | R1 `RollSpeed`/`RollWidth`/`RollGlow`/`Wobble`; R2 `scan` term in points; R1 `PanelFlicker`. | 0 |
| 5 | Dot/cell quantize | R2 `code_for('points')`: `CellPx`, `Threshold`, `Radius`, `SquareDots`, `Sparsity`, `TintAmount`. Luminance gate drops dark detail. | 0 extra (1 centre sample replaces the pixel sample) |
| 6 | Channel split / ghost | R2 `code_for('channels')`: `Shift`, `BeatRate`, `GrayMix`, `GhostTint`, `inside*` tests. | 2 to 3 |

Skip for ordinary signs: R2 `streaks` (R5/R6 drip, `[unroll]` 8-tap loop, 9 samples counted in the R2 README). Hologram near-LOD only. R2 README says its counts are source-level, and `get_statistics` reported zero texture samples for Custom nodes, so SGN stats cannot rank these. No GPU timings exist.

Transitions (power-on/off, Proposal): R1 `TRANSITION_CODE` Kind 3 (stable codec dissolve, `thr=h2(c+Seed)`, `P>=thr`) and Kind 2 (collapse to line). R2 T6 point thinning needs scene sampling; not for signs.

Cheap path: families 1 to 4 only. They add no texture sample and fit `UV_CODE`/`FX_CODE`. Each is its own Custom node behind `UseEffects`-style switches. Port R1 `HASH`/`H.h2`.

## Pitfalls

- **UV bleed (Local).** SGN `UV_CODE` clamps to a half-texel inset of the tile. A displaced sample then smears the tile's edge texel into streaks. Prefer a bounds test on tile-local `uv` (R2 `insideR`) before mapping to the rect, as R2 does. The atlas README says gutters are transparent but not validated beyond that; I did not find the gutter width. Check `atlas_manifest.json` and cap displacement to it.
- **Alpha.** Neon/Panel take `MP_OPACITY_MASK` from `texture.A`. If displacement is inside the UV Custom node, colour and alpha tear together (wanted). For channel split, use the max of the three alphas, and clip at 0.333.
- **Pixel snap.** Shift by whole texels, `floor(d*N)/(W*PageSize)`, so nearest stays crisp. `fwidth` in points AA is only needed if radii are sub-texel.
- **Multi-sample needs the texture inside the Custom node.** R2 passes `Tex` and reads `TexSampler`. SGN samples outside the node today; only families 5 and 6 force that rewire.
- **Instancing.** Static switches (R2 `UsePoints`/`UseChannels`) are per Material Instance, so one ISM cannot mix families per sign. Use one instance per family. Vary only scalars per sign through the 9-float payload (`sign_payload`, `instance_scalar`). A "family id" scalar branch is Unverified under divergence. R1's `seed_node` uses `ObjectPositionWS`; it is Unverified whether that is per-instance in an ISM. Use the existing `Seed` slot.
- **Switch growth.** Each static switch multiplies permutations (R1 note, Local). Keep to one per family.

## Portrait hologram: needs beyond a material

Not seen: the user's cyberpunk reference. This list assumes a tall figure with scanlines, ghosting and a cyan tint.

1. **New flat art.** The 12-sample library holds signs, not people. A portrait needs its own transparent, flat source, pixelated per the pipeline, nearest/no mips, with no baked glow or wear. Atlas cell with `W/H` (e.g. 646x2048) already supports tall aspect.
2. **Card.** Two-sided quad scaled by `source_aspect`. Additive means no Nanite (Local).
3. **Facing.** Fixed facing if the camera is side-on and fixed; camera-facing needs WPO or a Blueprint (Unverified).
4. **Backing.** Additive vanishes on bright walls. Add a dark masked underlay plate or AlphaComposite.
5. **Pass and DoF.** Test Standard against AfterDOF (existing note).
6. **Real light.** Translucent cards give no GI. A proxy light, flicker-linked, plus a projector base mesh, a beam cone card and a floor glow decal.
7. **Layers.** Ghost copies as extra quads cost overdraw; the 3-sample channel split costs samples. Choose one.
8. **TSR.** Flicker on translucent may ghost (Unverified). Test velocity output.
9. **Accessibility.** Reuse `FlashScale` and `ReducedMotion` from R2 (README controls).

Keep the original signage assets intact: add a new master and new instances in separate files.

## Parent implementation and checks

The parent inspected the supplied reference. It shows a large magenta portrait billboard; the material test uses original portrait art requested by Mike, not a cyan-only figure. The reference's city haze and moving portrait are outside this material test.

Seven separate presets now adapt section flicker, tracking bars, row slip, raster bands, points, colour echoes and short trails. The implementation keeps the original nine-float payload. Five family-specific masters avoid running the echo or trail reads on ordinary signal faults. The reduced trail path uses four shifted brightness-gated reads plus its base read, rather than the sandbox's eight shifted reads. A maximum with the base colour keeps the source visible.

The saved-map check passed for all 36 added cards. A newly placed Blueprint and the simulated group each retained eight instances and 72 custom-data floats. All 35 original signage package hashes match. Evidence is in `Unreal/Saved/SignageEvidence/Round02` and usage is in `Unreal/Scripts/signage/ROUND02.md`. These checks do not establish GPU timing or packaged-build behaviour.

Clarifications to the proposals above: point reconstruction can be adapted to a sign by sampling its artwork, so it does not inherently require scene colour. No transition system was migrated in this pass. A flat billboard does not require a projector cone or a floor decal; the current portrait test uses cards and comparison walls. The earlier blanket statement about translucent GI was not validated here and should not guide lighting decisions without testing the selected render path. Epic documents the additive blend as adding source colour to destination colour in [Material Properties](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-material-properties). That supports the dark-background comparison, but does not establish this lab's illumination cost.
