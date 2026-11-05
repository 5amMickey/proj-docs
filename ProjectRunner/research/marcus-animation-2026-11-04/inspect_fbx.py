"""Read existing FBX structure without importing, exporting, or changing assets."""
import hashlib
import importlib
import json
from pathlib import Path
import sys
import types

sys.dont_write_bytecode = True
pkg = types.ModuleType("fbx_readonly")
pkg.__path__ = ["C:/Program Files/Blender Foundation/Blender 5.2/5.2/scripts/addons_core/io_scene_fbx"]
sys.modules[pkg.__name__] = pkg
parse = importlib.import_module("fbx_readonly.parse_fbx").parse
base = Path("C:/Users/GameDevPC0403/Documents/GitHub/HoudiniSource/ProjectRunner")
paths = [base / "anim/mixamo" / n for n in ["Walking.fbx", "Walking (1).fbx",
    "Crouched Walking.fbx", "Sneak Walk.fbx", "Sneaking Forward.fbx"]]
paths += [base / "geo/export" / n for n in ["SKM_Cast_Marcus_coat_ARP_08.fbx",
    "AS_Marcus_Walk_01_ARP_08.fbx"]]
records = []
for path in paths:
    tree, version = parse(str(path))
    objects = next(e for e in tree.elems if e.id == b"Objects")
    models = {e.props[0]: e for e in objects.elems if e.id == b"Model"}
    names = {key: e.props[1].split(b"\x00")[0].decode("utf8") for key, e in models.items()}
    parents = {}
    connections = next(e for e in tree.elems if e.id == b"Connections")
    for c in connections.elems:
        if c.props[0] == b"OO" and c.props[1] in models and c.props[2] in models:
            parents[c.props[1]] = c.props[2]
    curves = [e for e in objects.elems if e.id == b"AnimationCurve"]
    record = {"path": str(path), "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
              "fbx_version": version, "model_hierarchy": {names[k]: names.get(parents.get(k)) for k in models},
              "bone_models": [names[k] for k, e in models.items() if e.props[2] == b"LimbNode"],
              "animation_curves": len(curves),
              "scope": "Binary structure only. No pose evaluation, retargeting, or Unreal import."}
    records.append(record)
out = Path(__file__).with_name("fbx-audit.json")
out.write_text(json.dumps(records, indent=2), encoding="utf-8")
print(json.dumps([{"file": Path(r["path"]).name, "bones": len(r["bone_models"]),
                   "roots": [n for n, p in r["model_hierarchy"].items() if p is None],
                   "curves": r["animation_curves"],
                   "custom_bones": [n for n in r["bone_models"] if n.startswith("cc_")]}
                  for r in records], indent=2))
