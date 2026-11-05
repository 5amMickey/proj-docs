# Cascadeur 2026.2.3 Python API for agents

Researched 2026-11-05. Nothing was run and no server was started. Everything below comes from files on disk or from the pages cited.

Abbreviations for paths:

- `SCR` = `C:/Program Files/Cascadeur/resources/scripts`
- `PY` = `SCR/python`
- `STUB` = `SCR/stubs/csc`
- `USER` = `C:/Users/GameDevPC0403/AppData/Local/Nekki Limited/Cascadeur`

Online sources used:

- Python Scripting help page: https://cascadeur.com/help/tools/animation_tools/python_scripting_in_cascadeur
- API reference: https://cascadeur.com/python-api/ (same content as `STUB`, generated from it)
- Action id list for `call_action`: https://cascadeur.com/help/category/301
- No official Nekki GitHub repository with Cascadeur Python scripts turned up in search.

The bundled interpreter is Python 3.11 (`C:/Program Files/Cascadeur/python311.dll`, and `PyEval_*` frames from `python311` in `USER/logs/cascadeur_log.log`). The help page still says Python 3.8, so it is out of date.

## 1. How scripts are discovered and run

### Folders

`C:/Program Files/Cascadeur/resources/settings.json`:

```json
{ "ScriptsDir": "./resources/scripts",
  "Python": { "Path": [], "Commands": ["commands"], "Scripts": ["scripts"], "Events": ["events"] },
  "LiveLink": { "UnicastEndpoint": "127.0.0.1:5454", "MulticastEndpoint": "230.0.0.1:6666" } }
```

- `ScriptsDir` is the root. `SCR/python` is the module root put on `sys.path` (`PY/reloader.py` says the root is the `.../scripts/python` folder, and its default action roots are `commands` and `scripts`). Packages such as `csc`, `pycsc`, `rig_mode`, `common`, `events` import from there.
- `Python.Commands` (`python/commands`), `Python.Scripts` (`python/scripts`) and `Python.Events` (`python/events`) are folders scanned at startup. `Python.Path` lists extra `sys.path` entries (empty).
- Discovery rule, `PY/python_actions_rule.py` (`get_actions`): it walks each package with `pkgutil.walk_packages`. A module counts as an action if it defines a function `run`. The menu label comes from `name()`, the tooltip from `description()`. A dot in the name makes a submenu, for example `"Quick export.Reexport"`. Older files (samples, the help page) use `command_name()` instead of `name()`.
- A bad module is logged with `logging.critical` and skipped. Every folder needs an `__init__.py`.
- Command signature is `def run(scene)`, where `scene` is a `csc.domain.Scene`.
- The help page says edits after launch are not picked up until you run the "Reload scripts" command. `PY/reloader.py` `reload(sc=None, quiet=True)` is the implementation. It purges project modules, re-warms `commands` and `scripts`, and restarts the MCP server if it was running.
- Events (`PY/events/__init__.py`) expose managers with `subscribe(cb) -> int`, `unsubscribe(id)`, `unsubscribe_all()`: `application_started_manager`, `scene_opened_manager`, `scene_activated_manager`, `scene_before_removed_manager`, `scene_created_manager`, `scene_removed_manager`, `scene_saved_manager`, `scene_idle_manager`, `event_message_manager`. `scene_idle_manager` also has `execute_when_idle(cb)` for one-shots (`PY/events/idle/idle_manager.py`, example `PY/samples/idle_event_test.py`).

### Per-user scripts folder

There is no per-user scripts folder under `%LOCALAPPDATA%\Nekki Limited\Cascadeur`. What exists there (checked):

- `USER/settings.json` (read-only attribute, 177 bytes): `{"ScriptsDir": "", "Python": {"Path": [], "Commands": ["commands"], "Scripts": ["scripts"]}}`. It has no `Events` key.
- `USER/Cascadeur.ini` (`AutosaveDir=...`), `USER/logs/`, `USER/config/v1`, `USER/autosave/`, `USER/cache/`.
- The log line `ScriptsDir: "C:/Program Files/Cascadeur/resources/scripts"` shows that an empty user `ScriptsDir` falls back to the install one.
- The help page says user commands live in "a dedicated folder" but shows the path only as an image. I could not read it. Setting `ScriptsDir` in the user `settings.json` to a custom root is the likely mechanism (inferred, not tested).
- Nothing exists under `%APPDATA%\Nekki Limited`.

Practical answer for agents: the install folders `SCR/python/commands` and `SCR/python/scripts` are where files get picked up today. Or skip files and use the MCP server (below), which needs no folder at all.

### Python console and Commands menu

- Window menu, "Python console": Load, Save, Execute, Close buttons (help page). It is a script runner, not an editor.
- Commands menu: one item per `commands/**` action with `run`. A `scripts/**` action with `run` is also an action; the Scripts menu is documented at https://cascadeur.com/help/category/320 (not fetched, so which menu shows `scripts/` is inferred).
- `csc.app.ActionManager.call_action(key: str)` runs a built-in menu action by id, for example `call_action("Scene.Undo")`. The help site says Nekki plans to remove functionality from this gradually.

### In-app MCP script server

Source: `PY/scripts/mcp/script_server/server.py` (VERSION `0.3.1`), the README next to it, and `SCR/README.md`.

- Start it from the Commands menu: "MCP.Start script server" (`PY/scripts/mcp/start_server.py`). Stop with "MCP.Stop script server". Nothing starts it automatically. It survives "Reload scripts".
- Listens on `127.0.0.1:8765` (`HOST`, `PORT` constants), no auth, `ThreadingHTTPServer` on a daemon thread.
- `GET /health` returns `{"ok": true, "version": "0.3.1", "idle_subscription": n, "message_subscription": n, "queued": n}`.
- `POST /run` with body `{"code": "..."}` returns the result object directly.
- `POST /mcp` speaks JSON-RPC 2.0 with protocol version `2024-11-05`. Methods: `initialize`, `notifications/initialized`, `tools/list`, `tools/call`, `resources/list`, `resources/read`. One tool: `run_script` with input `{"code": string}`. Resources: `cascadeur://docs/python-api` (just the website URL) and `cascadeur://modules` (top-level names of `csc` and `pycsc`). `tools/call` returns `{"content":[{"type":"text","text": <json of the result>}], "isError": !ok}`.
- Code is queued and executed on the main thread at the next `scene_idle` event, in `_execute_script`. If the code compiles with `eval` it is an expression and the result is `repr(value)`; otherwise it is `exec`'d. Globals and locals are one dict containing exactly `csc`, `scene` (the current `csc.domain.Scene` passed by the idle event) and `app` (`csc.app.get_application()`).
- Result object:

```json
{"ok": true, "value": "repr of expression or empty", "messages": [{"level": "...", "text": "..."}]}
{"ok": false, "error": "<traceback>", "messages": []}
```

- `messages` collects Cascadeur event-log messages emitted during the run (`scene.info/warning/error/success` and prints that reach the log). The README says `print(...)` output is "returned as `stdout`", but the code has no `stdout` field; use `messages`. Treat that as a doc mismatch.
- The wait is a hard 30 s (`_queue_script(code, timeout=30.0)`). On timeout the request is flagged cancelled and returns `{"ok": false, "error": "Timed out waiting for Cascadeur idle event"}`. Scripts that take longer than 30 s still hold the main thread, so split long jobs.
- The `scene` global is only valid for that call. Reacquire via `app.get_scene_manager().current_scene().domain_scene()` if you switch tabs.
- Modify return-value caveat: `scene.modify(...)`, `modify_with_session`, `modify_update`, `modify_update_with_session` (and `pyscene.edit`) return `False` when the callback raised. The exception goes to the event log but the MCP call still reports `ok: true`. Always check the return value and read the tail of `USER/logs/cascadeur_log.log` on `False`. `cascadeur_walk_test.py` does this (`assert ok`).
- Log file: `%LOCALAPPDATA%\Nekki Limited\Cascadeur\logs\cascadeur_log.log`. It already shows `[Cascadeur MCP] running queued script` lines from earlier sessions on this machine.
- `SCR/README.md` (the "Cascadeur MCP server" text, same as `PY/AGENTS.md`) mentions a `.mcp.json` entry named `cascadeur` giving the tool `mcp__cascadeur__run_script`. No `.mcp.json` exists in the install; it belongs to a project folder. Plain `curl http://127.0.0.1:8765/run` also works.

Minimal call:

```
POST http://127.0.0.1:8765/run
{"code": "app.get_scene_manager().current_scene().get_path_name()"}
```

## 2. Core csc API

All signatures are from `STUB` unless noted.

### Application, scenes, tabs

```python
app = csc.app.get_application()                 # csc.app.Application
sm  = app.get_scene_manager()                   # SceneManager
tm  = app.get_tools_manager()                   # ToolsManager
view_scene = sm.current_scene()                 # csc.view.Scene (the tab); also app.current_scene()
scene = view_scene.domain_scene()               # csc.domain.Scene (what scripts edit)
```

Two kinds of scene object. `csc.view.Scene` is the tab: `domain_scene()`, `get_path_name() -> str`, `name()`, `save(path_name: str)`, `animation_boundary()`, `viewports()`, `active_viewport()`, `gravity_per_frame() -> float`, `get_setting_handler()`. `csc.domain.Scene` is the data: `model_viewer()`, `behaviour_viewer()`, `data_viewer()`, `layers_viewer()`, `selector()`, `get_layers_selector()`, `get_current_frame(clamp_animation=True)`, `set_current_frame(frame)`, `info/warning/error/success(str)`, and the four modify methods.

`csc.app.SceneManager`:

```python
create_application_scene() -> csc.view.Scene     # new tab
set_current_scene(scene: csc.view.Scene) -> None
current_scene() -> csc.view.Scene
scenes() -> list[csc.view.Scene]
remove_application_scene(scene: csc.view.Scene) -> None   # closes the tab
```

Modify callbacks (`csc.domain.Scene`, each returns bool):

```python
modify(name: str, fn)                     # fn(model_editor, update_editor, scene)
modify_with_session(name: str, fn)        # fn(model_editor, update_editor, scene, session)
modify_update(name: str, fn)              # fn(model_editor, update_editor, scene_updater)
modify_update_with_session(name: str, fn) # fn(model_editor, update_editor, scene_updater, session)
```

### Load and save a .casc

```python
csc.app.ProjectLoader.load_from(file_path: str, scene: csc.domain.Scene)   # "Minimal Load": no selection groups, control picker
ds = app.get_data_source_manager()
ds.load_scene(file_name: str) -> bool        # full load incl. selection groups
ds.save_scene_as(scene_view, full_file_name: str)
ds.save_scene(scene_view) ; ds.save_current_scene() ; ds.close_scene(scene_view)
view_scene.save(path_name: str)              # used by samples/casc_import_export.py and cascadeur_walk_test.py
```

The stub says to prefer `load_scene` over `ProjectLoader.load_from` because it also restores selection groups and similar data. `samples/casc_import_export.py` uses `create_application_scene()`, `set_current_scene(...)`, then `load_from(path, tab.domain_scene())`.

New empty scene:

```python
tab = sm.create_application_scene(); sm.set_current_scene(tab); scene = tab.domain_scene()
```

### FBX import and export

Tool name is `"FbxSceneLoader"` (`STUB/fbx.pyi`).

```python
tool   = tm.get_tool("FbxSceneLoader")            # csc.fbx.FbxSceneLoader
loader = tool.get_fbx_loader(view_scene)          # csc.fbx.FbxLoader (takes the csc.view.Scene tab, not the domain scene)
```

`FbxSceneLoader` also has direct helpers, all taking `(scene: csc.view.Scene, file_name: str)`: `export_fbx_scene`, `import_fbx_animation`, `import_fbx_scene`.

`FbxLoader` methods (`file_name` is `csc.Path`; a plain string works in the repo's own samples):

```python
import_model(file_name)                                   # model into the scene
add_model(file_name)                                      # "Adds the model" (used by test_cases/import_load_save.py)
add_model_to_selected(file_name)
import_animation(file_name, num_take: int = -1)           # onto existing joints
import_animation_to_selected_frames(file_name, num_take=-1)
import_animation_to_selected_objects(file_name, num_take=-1)
import_scene(file_name, num_take=-1, is_set_offset=True)  # model + animation
get_takes(file_name) -> list[str]                         # list takes; num_take indexes into this
export_model(file_name)                                   # model only (used in casc_import_export.py)
export_all_objects(file_name)                             # everything exportable (scripts/quick_export/reexport.py)
export_joints(file_name: str)                             # joints + animation
export_joints_selected(file_name: str)
export_joints_selected_frames(file_name: str)             # selected frame interval (quick_export/export_to_default_folder.py)
export_joints_selected_objects(file_name: str)
export_scene_selected(file_name: str)
export_scene_selected_frames(file_name: str)
export_scene_selected_objects(file_name: str)
set_settings(settings: csc.fbx.FbxSettings)
```

There is no method called `export_animation` or `export_scene` on `FbxLoader`. The menu entries "Export > Animation/Model/Scene" map onto `export_joints*`, `export_model`, and `export_scene_selected*` (my mapping from names, not documented). Which one matches the menu's "Animation" entry is not verified.

Settings object:

```python
s = csc.fbx.FbxSettings()
s.mode = csc.fbx.FbxSettingsMode.Binary      # or Ascii
s.up_axis = csc.fbx.FbxSettingsAxis.Y        # X, Y, Z
s.bake_animation = True                       # bool
s.apply_euler_filter = False                  # bool
loader.set_settings(s)
```

Other formats: `STUB/glb.pyi` has `CommonOptions`, `ExportOptions`, `ImportOptions` (not inspected further). USD import and export exist as menu actions (`File.Export.Model.Usd...`, `File.Import.Animation.Usd...`).

Menu action ids (https://cascadeur.com/help/category/301) usable through `call_action`, but they open file dialogs, so prefer the loader methods: `File.Import.Model.Fbx...`, `File.Import.Add model.Fbx...`, `File.Import.Animation.Fbx...`, `File.Import.Scene.Fbx...`, `File.Export.Model.Fbx...`, `File.Export.Animation.Fbx...`, `File.Export.Scene.Fbx...`, `File.Export.Animation from selected frames.Fbx...`, `File.Open...`, `File.Save`, `File.Save as...`.

Selection-based exports depend on selection: set it first with `scene.selector().select({object_ids}, csc.model.ObjectId.null())` (as `PY/test/rig_scenarios/tween_machine.py` does).

## 3. Rigging by script

### Quick-rig templates

`C:/Program Files/Cascadeur/resources/autorig_templates/*.qrigcasc` are JSON text. `UE5.qrigcasc` starts `{"Document":[{"Title":"Body","Sections":[{"Section":"Body","Names":[{"Bone name":"pelvis","Joint name":"pelvis","Joint path":["root"]}, ...`. Templates shipped: UE5, UE4_New, Metahuman, Mixamo (with and without namespace), Blender (two), CC3, Daz3d Gen8 and Gen9, Cascy, Chibi, MoveAI, Playerme, Quadruped, Rokoko, blender_autorig_pro, meshy, standard.

The only Python-visible entry point for applying one is `csc.tools.RiggingWindow` (tool name `"RiggingToolWindowTool"`, `STUB/tools/__init__.pyi`):

```python
w = tm.get_tool("RiggingToolWindowTool").editor(view_scene)
w.load_template_by_fileName(path: str)          # also load_template_by_content(str)
w.create_from_qrt_by_fileName(path: str)        # also create_from_qrt_by_content(str)
w.generate_rig_elements()
w.set_character_mirror_plane(plane: int) ; w.get_character_mirror_plane() -> int
w.set_is_create_autoposing(on: bool)     ; w.get_is_create_autoposing() -> bool
w.set_axis_after_qrt(axis: int)
w.get_template_from_qrt() -> str ; w.is_create_qrt() -> bool
w.open_quick_rigging_tool()                     # opens the GUI window
```

The stubs have no docstrings for these, and no repo script calls `load_template_*` or `create_from_qrt_*`. The Python side that runs after the C++ tool builds `csc.rig.QrtData` is in `PY/prototypes/qrt_prototypes/create.py` (`create_rig_elements_by_qrt`) and `PY/prototypes/rigs/qrt/_qrt.py`. `csc.rig.QrtData` (`STUB/rig.pyi`) holds `body`, `left_hand`, `right_hand`, `quadruped`, `twists`, `untwists` (lists of `BoneProperty` with `bone_name`, `joint_path_name`, `object_id`), plus flags `is_replace_existing`, `is_create_layers`, `is_align_pelvis`, `is_spline_ik`, `hinge_arm_direction`, `hinge_leg_direction`. Whether `create_from_qrt_by_fileName` runs headless (no dialog) is unverified. Test it on a throwaway scene.

### Rig mode on and off

From `PY/rig_mode/on.py` and `off.py`, used by `PY/samples/casc_import_export.py`:

```python
import rig_mode.on as rm_on
import rig_mode.off as rm_off
rm_on.run_raw(scene: csc.domain.Scene, color: list[float], with_dialogs: bool = False)   # color e.g. [0.0, 0.5, 0.0]
rm_on.run(scene, color)                 # deletes autoposing info first, then run_raw(with_dialogs=True)
rm_on.run_after_import(scene, obj_ids, color)   # makes a "Rig info" object from the listed joints and enters rig mode; then pops a dialog offering the quick-rig tool
rm_off.run(scene: csc.domain.Scene, is_func_on: bool, change_view_mode: bool = False)   # generates the rig and leaves rig mode
```

- `run_raw` shows an error dialog and returns if more than one Rig info is selected, or if several exist with none selected. With several characters, select an object related to the target one first.
- `run_raw(..., with_dialogs=False)` skips the "old version" confirmation. Both functions call `scene.modify_update_with_session` themselves; do not wrap them in your own `modify`.
- `off.run` also adds or updates autoposing when the setting `RiggingTool/Update autoposing` is true and the tool's `is_create_autoposing` is set (`off.py` around lines 440-480).
- A round trip exists in `PY/test/test_cases/rig_on_off.py`: `rm_on.run_raw(...)`, `p_ja_ji.generate_proto_from_json(scene, json_path, None, [0.0, 0.0, 0.5], False)`, `rm_off.run(scene, True)`.

### Rig from JSON (pure Python)

`prototypes.json_actions.json_import.generate_proto_from_json(scene, json_file_path, selected_path, point_color, is_set_t_pose, is_set_hierarchy_by_joints=True)` builds rig elements from a rig JSON (examples in `SCR/test_data/rig/*.json`). That is the scripted route the repo's own tests use. `rig_gen` and `rigging` are the generators `off.run` calls (`rig_gen.generation_methods.generate_rig`, `rigging.generation`).

### Suggested flow, FBX to rigged scene (untested)

1. `tab = sm.create_application_scene(); sm.set_current_scene(tab)`.
2. `loader = tm.get_tool("FbxSceneLoader").get_fbx_loader(tab); loader.import_model(path)`. `bv.get_behaviours('Joint')` should then list the joints (the repo test checks exactly this after `add_model`).
3. Option A: `rm_on.run_after_import(tab.domain_scene(), joint_ids, [0,0.5,0])`, then `RiggingWindow.load_template_by_fileName(...)` and `create_from_qrt_by_fileName(...)`, then `rm_off.run(scene, True)`.
   Option B: `rm_on.run_raw`, `generate_proto_from_json(...)` with a rig JSON, `rm_off.run`.
4. `loader.import_animation(path)` or key by script, then export.

## 4. Animation by script

### Data model

- Objects: `mv = scene.model_viewer()`; `mv.get_objects() -> list[ObjectId]`, `mv.get_objects(name)`, `mv.get_object_name(id)`, `mv.get_object_type_name(id)` (type `'Point'` for rig controls, `'Joint'` and so on).
- Behaviours: `bv = scene.behaviour_viewer()`; `bv.get_behaviours('Joint') -> list[BehaviourId]`, `bv.get_behaviour_by_name(obj, 'Transform')`, `bv.get_behaviour_data(beh, 'global_position') -> DataId`, `bv.get_behaviour_owner(beh)`, `bv.get_behaviour_property_names(beh)`.
- `Transform` behaviour properties (`PY/pycsc/datatypes/domain/behaviours/_generated.py`): `global_position`, `local_position`, `global_rotation`, `local_rotation`, `local_scale`. `Joint` has `global_matrix` (`samples/iterate_joints.py`).
- Read: `dv = scene.data_viewer()`; `dv.get_data_value(data_id)` for static data, `dv.get_data_value(data_id, frame)` for animated; `dv.get_data(id).mode` is `csc.model.DataMode.Static` or `.Animation`; `dv.get_animation_size()`.
- Write inside a modify callback: `de = model.data_editor()`; `de.set_data_value(id, value)` (static), `de.set_data_value(id, frame, value)`, `de.set_data_value(id, {frames}, value)`. Vector values are numpy float32 arrays or lists; rotations are `csc.math.Rotation` or `Quaternion`.
- After writing, call `scene_updater.run_update({data_ids}, frame)` (or a `FramesIndices`) so dependent data (joints from points, constraints) recalculate. `samples/move_joints.py` is the canonical example.
- Object names carry namespaces as a `ns:` prefix (see section 6).

### Layers (tracks) and keys

`lv = scene.layers_viewer()` (`csc.layers.Viewer`):

```python
frames_count() -> int ; frames_count(id_arr)          # length of animation
all_layer_ids() -> list[Guid] ; default_layer_id() ; root_id()
layer(id) -> Layer ; layer_id_by_obj_id(obj_id) ; obj_ids_by_layer_ids([...])
last_key_pos() ; significant_frames() -> FramesIndices
```

`Layer`: `is_key(pos)`, `is_key_or_fixed(pos)`, `key(pos)`, `section(pos)`, `find_section(pos)`, `interval(pos)`, `key_frame_indices() -> FramesIndices`, `last_key_pos()`, `sections() -> dict[int, Section]`, `obj_ids`.

Editor, `le = model.layers_editor()` (`csc.layers.Editor`):

```python
set_section(section: layer.Section, pos: int, id: Guid)
set_sections(sections: dict[int, Section], id: Guid)
unset_section(pos: int, id: Guid)
set_fixed_interpolation_if_need(id, frame)            # or (id, start, end)
set_fixed_interpolation_or_key_if_need(id, frame, set_key: bool) -> bool
normalize_sections(scene)
create_layer(name, parent, pos=None) ; create_folder(...) ; delete_layer(id) ; move_item(...)
set_locked_for_layer(bool, id) ; set_visible_for_layer(bool, id) ; set_name(name, id)
```

On the model editor: `model.fit_animation_size_by_layers()`, `model.set_fixed_interpolation_if_need(actuals: set[DataId], frame, ignore_locked=False)`, `model.layers_selector()`, `model.move_objects_to_layer(ids, layer_id)`.

Interpolation types (`STUB/layers/layer.pyi`, `csc.layers.layer.Interpolation`): `BEZIER=0`, `LOW_AMPLITUDE_BEZIER=1` (viscous), `LINEAR=2`, `STEP=3`, `FIXED=4`, `NONE=5`, `CLAMPED_BEZIER=6`, `AI=7`. Stepped is `STEP`. `FIXED` is the "Fixed" interpolation (pose held by the fixing mechanism), not a hold-previous step. `layer.Interval` has `.interpolation` and `.common`; `layer.Key` has `.common`, `.tangents` (`Continuous` or `UserDefined`), `.left_weight_velocity`, `.right_weight_velocity`, `.label`. `layer.Common` has `.ik_fk` (`IK`, `FK`, `GR`) and `.fixation` (`Free`, `Fulcrum`). `layer.Section` has `.key` and `.interval`. To change interpolation: take `layer.find_section(pos)`, modify `.interval.interpolation`, write it back with `le.set_section(section, pos, layer_id)`. `PY/scripts/animation_scripts/reverse_animation.py` does this copy-and-set pattern.

Scene-level toggles that affect writes: setting `('Scene', 'FixingInterpolationOnInrevalChange')` read with `view_scene.get_setting_handler().get_bool_value('Scene', 'FixingInterpolationOnInrevalChange')`; menu ids `Scene.Set key on change`, `Scene.Set fixed interpolation on change`.

Selection of frames and layers (used by tools): `model.layers_selector()` or `scene.get_layers_selector()` give `selection().frames_interval()` with `.first`, `.last`, and `all_included_layer_ids()`.

### Setting a controller's position and rotation at a frame

```python
tr  = bv.get_behaviour_by_name(obj_id, 'Transform')
pos = bv.get_behaviour_data(tr, 'global_position')
rot = bv.get_behaviour_data(tr, 'global_rotation')
def mod(model, update, updater):
    de = model.data_editor()
    model.layers_editor().set_fixed_interpolation_or_key_if_need(layer_id, frame, True)
    de.set_data_value(pos, frame, np.array([x, y, z], np.float32))
    updater.run_update({pos}, frame)
ok = scene.modify_update("set pose", mod)       # check ok
```

Rig-mode `Point` objects are the control layer in a point-based rig: moving `global_position` of Points drives joints through the update graph, which is why `run_update` is needed. Joint rotation is derived. Whether writing a joint's `global_rotation` directly on a rigged joint is respected is unverified. Rotation-writing code for FBX import exists in `PY/fbx_import/actions.py`, which sets `model_local_position`, `model_local_rotation`, `model_local_scale` on the `Node3d` behaviour.

### cascadeur_walk_test.py review

File: `C:/Prod/ProjectRunner/Tests/cascadeur_walk_test.py`. I read it in full.

What it does: asserts the open tab path equals `OUT` and the scene has 1 frame; collects every `Point` object's `global_position` DataId and frame-0 value; computes a 36-frame walk pose per frame in numpy (pelvis sway and bob, stance and swing foot paths with a Hermite swing, analytic two-bone knee solve with a +Z pole, arm swing); then in one `scene.modify_update`: extends every layer with `le.set_section(csc.layers.layer.Section(), FRAMES + 1, lid)`, calls `fit_animation_size_by_layers()`, per frame sets a fixed-or-key on every layer, writes each point with `de.set_data_value(id, frame, pos.astype(np.float32))`, runs `updater.run_update(all point ids, frame)` inside a try, and ends with `le.normalize_sections(scene)`. Afterwards it checks the return value, reads back all points, reports loop error, target error and reach error as JSON, sets the animation boundary to frames 0..35 and calls `view.save(OUT)`.

Judgment: the approach is sound and matches the API as documented and as used in `move_joints.py` and `reverse_animation.py`.

- It uses the right primitives (`modify_update`, `set_data_value(id, frame, np.float32)`, `run_update` per frame, `normalize_sections`) and checks `ok`, which is the caveat in the MCP README.
- It writes only Point `global_position`, so the rig solver derives joint rotations. That is correct for a point-based Cascadeur rig. It moves all point groups (Main, Direction, Additional, Self) together with their parent, so no solver fights.
- It guards against running twice on a dirty file and records evidence.

Risks and gaps:

1. Every frame becomes a key on every layer (`set_fixed_interpolation_or_key_if_need(..., True)`), so the result is a dense baked animation. Fine for a test and for FBX export, but not editable. Set intervals explicitly (BEZIER or LINEAR) if tweening matters.
2. `set_section(Section(), FRAMES + 1, lid)` uses a default-constructed `Section`. The default interval and key are not documented. The script then relies on `fit_animation_size_by_layers()` to size the timeline. It reports `frames_count()` but never asserts 37. The position `FRAMES + 1` versus frames 0..36 is plausible but unproven.
3. Loop seam: frame 36 equals frame 0, and `animation_boundary().last_frame` is set to 35. That is a correct loop setup, but export must honour the boundary or a selected interval (`export_joints_selected_frames`). `export_joints` may export the whole range including the duplicate frame (unverified).
4. Root motion: the pelvis does not travel; feet slide backward by `TRAVEL` (60 units) relative to the pelvis. That is an in-place cycle, which UE wants. The constants (`-5.8` pelvis offset, `TRAVEL = 60`, +Z forward) assume this rig's units and axes.
5. Validation only reads Points back. It never checks joint rotations, joint bone lengths, or whether the rig stayed in rig mode. Loop and reach errors are computed from numpy targets and read-back points.
6. All layer ids are touched, including locked or hidden ones. Writes to locked layers may be refused inside the callback. Not handled.
7. Foot contacts are authored by formula only. Nothing uses Fix feet or Auto Physics to clean skating.

Verdict: sound for a procedural walk test, not enough by itself for production output.

### Copying poses between frames, mirroring

- Raw copy: read `dv.get_data_value(did, src)` and write `de.set_data_value(did, dst, value)` for each animated DataId, then `run_update`, plus `le.set_fixed_interpolation_or_key_if_need(layer_id, dst, True)`.
- Layer-level copy: `csc.layers.layer.copy_frames_from_src_layer_to_dst_layer(session, frames: FramesIndices, layer: csc.layers.Layer, dst_layer_id: Guid, offset: int = 0)`. It needs a `session`, so use `modify_with_session`. Build frames with `csc.layers.index.FramesIndices.from_range(min, max)`.
- Frame move: `pycsc` `scene.timeline.move_frames(frame_pairs, nodes)` (`PY/pycsc/datatypes/domain/timeline/timeline.py`, example `PY/scripts/animation_scripts/remove_step_interpolation.py` using `pycsc.wrap(scene).edit(...)`).
- Mirror: `MirrorTool` (name `"MirrorTool"`):

```python
core = tm.get_tool('MirrorTool').editor(view_scene).core()      # csc.tools.mirror.Core
core.set_plane(csc.math.Plane([1.0, 0.0, 0.0], [0.0, 0.0, 0.0])) # normal, point
core.plane() -> csc.math.Plane
core.mirror_frame(ids: set[ObjectId | Tool_object_id])         # current frame
core.mirror_interval(ids: set[...])                            # selected interval
```

  Set the frame first (`scene.set_current_frame(f)`), as `PY/test/rig_scenarios/mirror_tool.py` does.
- Other animation scripts shipped in `PY/scripts/animation_scripts`: `add_noise_to_selected_objs`, `go_to_origin`, `invert_selection`, `keyframe_reduction`, `remove_step_interpolation`, `reverse_animation`, `untwist_animation`.

## 5. Built-in tools by script

Tool names for `tm.get_tool(name)` found in the repo (grep over `PY` and `STUB`): `FbxSceneLoader`, `RiggingModeTool`, `RiggingToolWindowTool`, `AttractorTool`, `MirrorTool`, `AutoPosingTool`, `AutoPhysicsTool`, `InbetweeningTool`, `AnimationUnbakingTool`. Pattern: `tm.get_tool(name).editor(view_scene)` returns the scene tool (`FbxSceneLoader` differs: it has `get_fbx_loader`). `tm.tools()` lists all tools and `tool.name()` gives each name, so an agent can enumerate the rest at runtime. The install folder also has `tool_fix_foot.dll`, `tool_trajectory.dll`, `tool_ballistic_trajectory.dll`, `tool_mocap.dll`, `tool_retargeting.dll`, `tool_default_fbx_synchronization.dll`, `tool_ghost.dll`, `tool_selection_groups.dll`, `tool_ue_live_link.dll`, `tool_fix_collisions.dll`, `tool_angular_momentum_tool.dll`. No Python names for these were found.

| Tool | Python entry point | Notes |
|---|---|---|
| AutoPosing | `tm.get_tool('AutoPosingTool').editor(view_scene)` gives `AutoPosingTool` with `add(session)`, `update(session)`, and `ActivateDeactivate.activate(session, {ObjectId: ObjectId}) -> bool`, `deactivate(session, {ObjectId})` | `add` and `update` are used in `rig_mode/off.py` inside `modify_update_with_session`. Menu ids: `AutoPosingTool.AutoPosing`, `.Update`, `.AutoUnlock`, `.SwitchLock`. |
| AutoPhysics | `tm.get_tool('AutoPhysicsTool').editor(view_scene)` gives `turn_off()`, `turn_off_all_fulcrum_points()` | Stub class is `AutoPhysicTool`, tool name has an `s`. No run method. Run it with `call_action`: `AutoPhysicsTool.Switch Auto Physics`, `AutoPhysicsTool.Snap to Auto Physics`, `AutoPhysicsTool.Set priority frame`. |
| Tween machine | `tm.get_tool('AttractorTool').editor(view_scene)` gives `get_general_settings()`, `is_only_key_frames()`; then `csc.tools.attractor.attract(Args)` | See below. Covered by `PY/test/rig_scenarios/tween_machine.py`. |
| Inbetweening (interpolation switcher) | `tm.get_tool('InbetweeningTool').editor(view_scene)` gives `get_update_parameter()`, `set_update_parameter(bool)` | Only a flag; `ml/editable_animation.py` turns it off while it runs. Menu id `Scene.Inbetween interpolation switcher`. |
| Fix feet | No Python class | `call_action("View.FixFoot")` or `"View.FixFoot_KeepKeyFrames"` (labelled Fulcrum Motion Cleaning on the id list). Acts on the current selection and interval, so set those first. |
| Animation cycles | `CyclesEditor` and `CyclesViewer` in `STUB/layers/__init__.pyi` | `create_cycle(a: int, b: int, c: bool) -> Cycle`, `delete_cycle(int)`, `find_cycle(int)`, `change_inactive_parts(int, int, int)`, `normalize()`; viewer: `get_cycles_in_frames`, `is_pos_in_active_cycle_zone`, `last_pos`. The stubs show no accessor from a scene. Menu ids: `Timeline.Create cycle`, `Timeline.Create cycle with position offset`, `Timeline.Create cycle with position and rotation offsets`, `Timeline.Remove cycles`, `Timeline.Resize cycles`. |
| Trajectory | `csc.tools.Trajectory` and `csc.tools.BallisticTrajectory` classes exist (`ActivateDeactivate`) | No `get_tool` name found. Menu ids `TrajectoryTool.*`, `BallisticTrajectoryTool.*`. |
| Animation unbaking | `tm.get_tool('AnimationUnbakingTool').editor(view_scene).get_interpolation_difference()` | Used by `ml/editable_animation.py`, see section 8. |

Attractor (tween) call, from `PY/test/rig_scenarios/tween_machine.py` and `STUB/tools/attractor.pyi`:

```python
tool = tm.get_tool('AttractorTool').editor(view_scene)
settings = tool.get_general_settings(); settings.factor = 1
args = csc.tools.attractor.Args(scene, view_scene.gravity_per_frame(), settings,
                                tool.is_only_key_frames(), csc.tools.attractor.ArgsMode.Next)
# Args(scene, gravity, general_settings, only_key_frames, mode, for_interval=False, hard=False,
#      frame_action_on_change=FrameActionOnChange..., interval_action_on_change=IntervalActionOnChange...)
scene.set_current_frame(f)
scene.selector().select(point_object_ids, csc.model.ObjectId.null())
csc.tools.attractor.attract(args)
```

`ArgsMode`: `Previous=0`, `Next=1`, `Inertial=2`, `InverseInertial=3`, `Average=4`, `Interpolation=5`. `FrameActionOnChange`: `AutoKey=0`, `Fixing=1`, `DoNothing=2`. `IntervalActionOnChange`: `Fixing=0`, `DoNothing=1`. Use `for_interval=True` to apply over the selected interval.

Other helpers: `csc.tools.get_collision_shape_storage(scene, scale_system=0.05)`, `csc.tools.get_all_collision_for_object(...)`, `generate_convex_hull_mesh*`, `generate_acd_meshes`; `STUB/additive_layers.pyi` `Manager` (`add_stacked_layer`, `set_stacked_layer_weight(float, int)`, `set_stacked_layer_enabled(bool, int)`).

## 6. Multi-character

- Add another character to the same scene: call `loader.add_model(path)` or `loader.import_model(path)` again on the same tab (the repo test `import_load_save.py` uses `add_model`; whether `import_model` replaces or appends is not documented, so test on a scratch scene). Or load a second `.casc` with `ds.load_scene(path)` into another tab and copy over. The ids `File.Import.Scene to current...` and `Selectable.Linked scenes meshes` show that scene linking exists in the GUI; no Python API for linking scenes was found in the stubs.
- The rig keeps one `RigInfo` behaviour per character (`bv.get_behaviours('RigInfo')`; related objects in the `related_joints` and `rig_objects` ranges). `rm_on.run_raw`, `export_inplace_animation`, and `ml/editable_animation` all require selecting an object of one character when more than one RigInfo exists, via `common.selection_operations.get_rig_info(scene)` and `selected_obj_ids(scene)`.
- Namespaces: object names use a `namespace:name` prefix. `PY/commands/change_namespace.py` renames selected objects with a regex, `re.sub(r"^([\w\(\)\[\]]+):|^", f"{new_ns}:", name)`, through `model.set_object_name(id, new_name)` inside `scene.modify(...)`. `csc.model.PathName` has `get_namespace()` and `set_namespace(str)`. The FBX exporter has a per-object `FbxExport` behaviour with a `use_namespace` data item (`PY/fbx_import/actions.py`, `set_export_and_set_order`).
- Mixamo templates ship both with and without namespace (`Mixamo_Namespace_Template_New.qrigcasc`, `Mixamo_No_Namespace_Template_New.qrigcasc`).
- Export one character's animation: select that character's objects (for example `bv.get_behaviour_objects_range(rig_info, 'related_joints')`), select the frame interval, then `loader.export_joints_selected_objects(path)`, `export_joints_selected_frames(path)` or `export_scene_selected_objects(path)`. `PY/commands/custom_export/export_inplace_animation.py` ("Custom Export.Export in-place animation") is a worked example of picking one RigInfo, finding its root, zeroing root translation and rotation, and exporting the selected joints. Its `get_correct_rig_info(scene)` and `find_root(bv, dv, joints)` can be reused.

## 7. Viewport capture

Yes, there is a Python class: `csc.tools.RenderToFile` and `csc.tools.RenderParameters` (`STUB/tools/__init__.pyi`).

```python
p = csc.tools.RenderParameters()      # attributes: width: int, height: int, samples: int
p.width, p.height, p.samples = 1280, 720, 4
r.take_image(scene_view: csc.view.Scene, render_parameters: RenderParameters, file_name: str)
r.play_to_images_sequence(scene_view, render_parameters, folder_name: str)
r.play_to_video_file(scene_view, render_parameters, file_name: str)
```

Open point: no `get_tool(...)` name for `RenderToFile` appears anywhere in the repo, and the class has no documented constructor. The online reference lists the class but no accessor. Enumerate at runtime with `[t.name() for t in tm.tools()]` and look for a render-like name. The menu action `File.Export.Video...` exists but opens a dialog.

Camera control for framing: `view_scene.active_viewport().domain_viewport()` gives `camera()`, `camera_struct()` and `set_camera_struct(SphericalCameraStruct)`, `set_mode_visualizers(ViewportMode)`; `csc.view.Camera.set_target(vec3)` and `zoom_to_points([vec3])`; `csc.view.camera_utils.get_cameras(scene)`, `set_camera_active(viewport, camera)`, `reset_camera(viewport)`. `view_scene.viewports()` lists viewports. The walk test collects JSON evidence rather than images.

## 8. The ml and editable_animation modules

`PY/ml/` has `__init__.py`, `functions.py`, `editable_animation.py`.

- `ml/editable_animation.py` (about 900 lines, title `"Editable animation"` via `command_name()`) converts a baked, key-on-every-frame animation into sparse keys with chosen interpolation, which is the "Animation unbaking" feature. It reads thresholds from the `AnimationUnbakingTool` (`get_interpolation_difference()`) and the settings `AnimationUnbakingTool/InterpolationFingersDifference`, `/IkPreference`, `/ClampPreference`. It works per layer in hierarchy-depth order (`generate_layers_by_depth`), picks keys where the interpolated curve deviates beyond the threshold, then chooses between IK, FK and GR (`csc.layers.layer.IkFk`) and between `BEZIER` and `CLAMPED_BEZIER`. It temporarily turns off the `InbetweeningTool` update flag. It needs exactly one character (one RigInfo) or a selected RigInfo object, a layer selection, and a selected frame interval. It uses `PY/commands/editable_animation_point_coef.json`. It ends with `run(scene)`, so it can be called directly (`import ml.editable_animation as ea; ea.run(scene)`) after selecting layers and frames, but on a bad selection it shows a dialog and raises. This is the tool to run on imported or mocap animation.
- `ml/functions.py`: one helper, `add_enforce_save_and_fill(model_editor, model_viewer)`, which adds an `EnforceSaveData` behaviour holding `Position` and `Rotation` for every object with a `RigidBody` behaviour.
- The "ml" name refers to Cascadeur's bundled models (`torch_cpu.dll`, `onnxruntime.dll` in the install) behind AI interpolation (`Interpolation.AI`, `description_for_ai_interpolation` on `layer.Interval`). `PY/models/` (for example `add_noise_to_selected_objects/model.py`) holds model wrappers. I did not read them.

## Gaps in the stubs worth knowing

- Many stub methods have no docstring body or only `arg0` names (for example all of `RiggingWindow`, `AutoPosingTool`, `CyclesEditor`). Behaviour descriptions above for those come from names and repo call sites, and are marked where inferred.
- `csc.app.Application.current_scene()` and `SceneManager.current_scene()` both return the `csc.view.Scene` tab. The MCP `scene` global is the domain scene.
- Per `PY/AGENTS.md`, `pyscene.edit(...)` (the `pycsc` wrapper) also returns `False` on callback failure.

## Open questions

1. Can `RiggingWindow.create_from_qrt_by_fileName` run without dialogs on an imported skeleton, and does it also call `generate_rig_elements`? Do the names inside a `.qrigcasc` need an exact joint match (the UE5 template expects `pelvis`, `spine_01` and so on under `root`)? Needs a scratch-scene test.
2. How is `csc.tools.RenderToFile` obtained? No `get_tool` name found. Enumerate `tm.tools()` names at runtime.
3. Does a custom `ScriptsDir` in `%LOCALAPPDATA%\Nekki Limited\Cascadeur\settings.json` replace or add to the install one? The user file is read-only and has `"ScriptsDir": ""`. Where is the "dedicated folder" the help page shows only as a screenshot?
4. Is the `print` to `stdout` claim in the MCP README stale (the code has only `messages`)? Confirm on first run.
5. `add_model` versus `import_model` behaviour when a character already exists (append or replace), and which `export_*` call equals the menu's "Export Animation" (likely `export_joints*`). Check on a two-character scratch scene.
6. Meaning and default of `layer.Section()` and why the walk test positions the extra section at `FRAMES + 1`. Verify `frames_count()` equals 37 after that script runs.
7. Is there a Python accessor for `CyclesEditor`, Fix feet, Trajectory, and Auto Physics runs (beyond `call_action`)? Enumerate `tm.tools()` and `dir()` them.
8. Can joint `global_rotation` be keyed directly on a rigged (non-rig-mode) character, and does the update graph respect it? Needed for retarget-style authoring without points.
9. Which menu (Commands or Scripts) shows `python/scripts/**` actions, and is there a documented way to register a script folder outside the install tree?
