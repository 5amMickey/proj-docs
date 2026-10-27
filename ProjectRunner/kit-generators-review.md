# Kit generators review

HDAs 1 to 4 from [hda-rebuild-assessment.md](hda-rebuild-assessment.md), built 2026-10-23 for Mike's review. Scene: `HoudiniSource/ProjectRunner/asset_kitGenerators_01.hiplc`, one object per tool (`/obj/review_cables`, `review_pipes`, `review_railings`). Each preset is its own node: change its parameters there to try other settings.

## How to read the pictures

- Each hall shows one tool. The front row is the presets, each labelled with its triangle count. The back row is the re-UV'd kit pieces the tool replaces, labelled with theirs.
- Under each hall are close-ups of every preset, and one detail shot of the texture.
- Textures are the trim template and the labelled reference atlases, as in the kit museum, so stretching shows as squashed labels. Collision is hidden (Show Stage shows it).
- Pipe triangle counts include the previewed kit clamps, which UE instances rather than merges.

## HDA 1: shared trim mapping

- `mike::env_trim_uv::1.0` (the kit re-UV) is HDA 1 for imported pieces.
- Generated pieces have no UVs to start from, so they use a small second tool, `mike::env_trim_map::1.0`, which every generator nests. It puts a generated face on a named strip, atlas cell or tile with the same rules as the kit re-UV: 1024 px/m, wide strips from the strip bottom, narrow strips wrapped, atlas islands fitted to their cell without stretching. Brief: `HoudiniSource/docs/briefs/env_trim_map.md`.
- Fix found while building it, applied to both tools: separate parts that only overlap in UV space were being fitted as one atlas island. In the kit that affected 923 of 5,177 atlas faces on 58 pieces (laundry items, litter, parts bins, banners, vehicle sides), which showed only part of their picture. Now 0. Kit totals are unchanged (557 meshes, 0 errors, 103 flagged faces). All 27 museum halls were re-rendered.

**Decision** column: keep, fix (say what), drop. Leave blank if no opinion.

## Cables: `mike::env_cable_sag::1.0`

Draw a curve; every span between two points hangs as a cable or a bundle (Labs Cable Generator look). Cables wrap the Rubber Seal (or Pipe) strip at 1024 px/m. Vertex colours carry the sway weight for the UE wind material, which isn't built yet. No collision.

Kit pieces it replaces: the StreetKit, SplineKit, StallKit and DamageKit cables. Bulb strings and laundry lines are not covered yet. Brief: `HoudiniSource/docs/briefs/env_cable_sag.md`.

![cables hall](refs/wip/generators/review_cables.png)

| Preset | Settings | Tris | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| Street span: 3 poles, 3 cables per span | Cables per Span 3, Bundle Radius 0.08, Slack 1.06 | 2520 | [shot](refs/wip/generators/review_cables_street_span.png) | | |
| Alley crossing: bundle of 5, loose | Cables per Span 5, Bundle Radius 0.15, Slack 1.1, Random Slack 0.08 | 2244 | [shot](refs/wip/generators/review_cables_alley_crossing.png) | | |
| Wall drop: one thick cable, steep | Radius 0.02, Random Radius off, Slack 1.15 | 228 | [shot](refs/wip/generators/review_cables_wall_drop.png) | | |
| Stall run: thin, short spans | Radius 0.008, Slack 1.03, Segment Length 0.2 | 396 | [shot](refs/wip/generators/review_cables_stall_run.png) | | |
| Pipe strip: 2 cables on the Pipe trim | Cables per Span 2, Radius 0.02, Strip Pipe | 624 | [shot](refs/wip/generators/review_cables_pipe_strip.png) | | |
| Sway colours: R phase per cable, G sway weight | Cables per Span 3, Bundle Radius 0.1, Slack 1.08 | 1284 | [shot](refs/wip/generators/review_cables_sway_colours.png) | | |

Detail: ![review_cables_street_span_detail](refs/wip/generators/review_cables_street_span_detail.png)

## Pipes and ducts: `mike::env_pipe_run::1.0`

Draw a curve; corners become elbows. Round pipes wrap a narrow strip; square ducts use Painted Metal Panel. Kit clamps and straps come out as instance points on a second output (shown here with the kit mesh copied on). Collision is optional, one box per straight segment.

Kit pieces it replaces: SplineKit pipes, ducts, elbows; AlleyKit risers and downpipes; the StructKit pipe rack. Clamps and straps stay kit meshes, instanced. Brief: `HoudiniSource/docs/briefs/env_pipe_run.md`.

![pipes hall](refs/wip/generators/review_pipes.png)

| Preset | Settings | Tris | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| Wall run with saddle clamps every 1.5 m | Clamps on, Clamp Mesh /Game/ProjectDev/ConnectorKit/SM_ConnectorKit_Pipe_Saddle_Clamp_R06 | 806 | [shot](refs/wip/generators/review_pipes_wall_run_clamped.png) | | |
| Riser with a jog: radius 8 cm, 10 sides | Radius 0.08, Sides 10, Bend Size 0.25 | 220 | [shot](refs/wip/generators/review_pipes_riser_jog.png) | | |
| Square duct overhead, mitred corners | Profile duct, Bend Size 0 | 16 | [shot](refs/wip/generators/review_pipes_duct_overhead.png) | | |
| Conduit: 2 cm Rubber Seal, sharp, straps | Radius 0.02, Sides 6, Strip RubberSeal, Bend Size 0, Clamps on, Clamp Spacing 0.75, Clamp Mesh /Game/ProjectDev/ConnectorKit/SM_ConnectorKit_Conduit_Strap | 846 | [shot](refs/wip/generators/review_pipes_conduit.png) | | |
| Pipe rack: three runs, collision on | Radius 0.06, Bend Size 0.4, Collision on | 288 | [shot](refs/wip/generators/review_pipes_pipe_rack.png) | | |

Detail: ![review_pipes_wall_run_detail](refs/wip/generators/review_pipes_wall_run_detail.png)

## Railings and fences: `mike::env_railing_run::1.0`

Draw a base curve; posts go at every corner and at most Post Spacing apart, with a top rail, mid rails and an infill per bay: bars, a cutout card or glass. Sloped curves give stair rails. One collision box per bay.

Kit pieces it replaces: SplineKit railing and chain link, StationKit glass balustrade, StreetKit guard fence, GroundKit handrails. The flat W-beam guardrail stays a kit piece. Brief: `HoudiniSource/docs/briefs/env_railing_run.md`.

![railings hall](refs/wip/generators/review_railings.png)

| Preset | Settings | Tris | Close-up | Decision | Feedback |
|---|---|---|---|---|---|
| Balcony: bars, one mid rail | defaults | 728 | [shot](refs/wip/generators/review_railings_balcony_bars.png) | | |
| Chain link fence: 1.8 m, cutout card | Height 1.8, Post Spacing 2.5, Post Radius 0.04, Mid Rails 0, Infill cutout | 88 | [shot](refs/wip/generators/review_railings_chainlink_fence.png) | | |
| Glass balustrade, Bare Bevel tubes | Mid Rails 0, Strip BareBevel, Infill glass | 88 | [shot](refs/wip/generators/review_railings_glass_balustrade.png) | | |
| Stair handrail: sloped, two mid rails | Mid Rails 2, Infill none | 188 | [shot](refs/wip/generators/review_railings_stair_handrail.png) | | |
| Guard fence: 0.9 m, Guard Fence cell | Height 0.9, Mid Rails 0, Infill cutout, Cutout Cell Guard_Fence | 88 | [shot](refs/wip/generators/review_railings_guard_fence.png) | | |
| Palisade: 2 m, Fence Palisade cell | Height 2, Mid Rails 0, Infill cutout, Cutout Cell Fence_Palisade | 88 | [shot](refs/wip/generators/review_railings_palisade.png) | | |

Detail: ![review_railings_balcony_corner_detail](refs/wip/generators/review_railings_balcony_corner_detail.png)
