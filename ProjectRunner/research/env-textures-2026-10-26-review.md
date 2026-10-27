# Review notes for the texture research

The [documentation findings](env-textures-2026-10-26.md) identify useful checks. Apply these corrections when implementing the [Runner plan](../environment-texture-plan-2026-10-26.md).

- Nearest sampling is deterministic. It selects the nearest texel, not a random texel. Camera movement changes which texel is selected and can cause shimmer during minification.
- No mipmaps removes mip generation as a source of bleeding. It does not prove that authored borders, UV placement, block compression or earlier image resampling are free of contamination.
- The mip-5 boundary calculation assumes an aligned 2-by-2 box reduction. It is not a guarantee about filtered samples at strip borders or about other mip filters.
- Five independent scalar masks do not fit in one RGBA texture. Adding alpha supplies only a fourth channel. The initial proposal keeps the old RGB mask contract and adds ORM, then measures the cost in Unreal.
- Applying AO through both base colour and the AO input can over-darken cavities. Assess this under controlled lighting; AO and shadow colour are not interchangeable in every lighting path.
- Runner's 2K maximum is its own project budget, recorded in BRIEF.md. It does not depend on Fortnite's limits. Do not adopt a 4096 road texture without a project decision.
- Do not use the cited base-colour numbers as sRGB thresholds without confirming their colour space.
- The review should not alter filtering policy on existing assets. The approved texture-only pixel treatment remains the baseline. Any alternate filtering test belongs in a separate review instance and needs Mike's approval.

No engine import or new material has been verified during this research phase.
