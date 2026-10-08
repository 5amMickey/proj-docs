# Asset catalog

Everything owned that a game build can draw on. Last refreshed 2026-10-08. Refresh with `/asset-catalog` after new downloads.

| File | What it covers |
|---|---|
| [packs_unreal.md](packs_unreal.md) / [.csv](packs_unreal.csv) | 61 Fab and Marketplace packs cached in VaultCache, 25 library entries not downloaded yet, and what each game project has imported |
| [vault_duplicates.md](vault_duplicates.md) | Where each VaultCache pack also sits in a project, which vault copies are duplicates, and what was cleared on 2026-10-08. All packs now live in `C:\Prod\AssetPacks`, so the VaultCache folder names in packs_unreal are out of date until the next refresh |
| [library_sources.md](library_sources.md) | The `Development/_assets` library: Substance collections, Houdini tools, animation, VFX and courses |
| [library_substance.csv](library_substance.csv) | All 4,043 `.sbsar` and `.sbs` files, bucketed by material type, with whether an editable `.sbs` source exists |

Counts come from file and folder names, so they're close but not exact. Archives and `.uasset` files weren't opened.
