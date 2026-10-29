# PipelineSandbox

Started 2026-10-26 from `C:\Prod\_base-project`. An isolated project for trying things out. Nothing from the other projects loads into it, and nothing in it feeds back into them.

## What and who

A test project for now, with no set pipeline. Mike tries things out here.

## Done means

- [x] The project opens headless in UE 5.8 with no shared plugin folder (`CompileAllBlueprints`: 0 errors, 0 warnings, 2026-10-26).
- [x] `Houdini\hython.cmd` loads 0 HDAs from HoudiniSource (a normal launch loads 58).
- [x] The UE MCP server answers `initialize` on port 8005 (checked with a windowless editor, 2026-10-26).

## Avoid

- Launching Houdini from the Start menu or the SideFX Launcher for this project. Use `Houdini\houdini.cmd` or `Houdini\hython.cmd`, which set `HOUDINI_USER_PREF_DIR` to `Houdini\prefs\houdini__HVER__`. A normal launch loads the HoudiniSource package and every project's HDAs.
- Adding `AdditionalPluginDirectories`, junctions, or copies from other projects without Mike asking. Copy assets in rather than referencing them.
- Moving `Houdini/` into HoudiniSource or adding it to `HoudiniSource.json`.
- Changing the MCP port. It's 8005 in `Unreal\Config\DefaultEditorPerProjectUserSettings.ini`, and Claude reaches it through a local-scope `unreal-editor` server registered for `C:\Prod\PipelineSandbox`. Close this editor only by PID after matching `PipelineSandbox` in its command line.

## Where it lives

| What | PC | Mac |
|---|---|---|
| Project folder (local git with LFS, no remote) | `C:\Prod\PipelineSandbox` | n/a |
| Unreal project (UE 5.8, Blueprint only, engine plugins only, MCP port 8005) | `C:\Prod\PipelineSandbox\Unreal\PipelineSandbox.uproject` | n/a |
| Houdini files and isolated prefs (local, not in HoudiniSource) | `C:\Prod\PipelineSandbox\Houdini` | n/a |
| Brief and tasks | `$PROJ_DOCS/PipelineSandbox` | `$PROJ_DOCS/PipelineSandbox` |

## Decisions

- 2026-10-26: The project is isolated. The `.uproject` doesn't read `C:\Prod\_Library\Unreal\Plugins`. Houdini runs with project-local prefs that hold only the houdini-live MCP package, so agents can still drive it.
- 2026-10-26: Keep houdini-live in the isolated Houdini prefs.
- 2026-10-26: PipelineSandbox takes MCP port 8005 from the archived Sandbox. ModelContextProtocol and AllToolsets are on.
- 2026-10-26: The old `C:\Prod\Sandbox` is archived at `C:\Prod\_archive\Sandbox`, untouched.
- 2026-10-27: For the environment texture library, finish major modules first and defer small or secondary components to a later pass. Preserve all completed sets; keep 2K output and DirectX Y-minus normals.
