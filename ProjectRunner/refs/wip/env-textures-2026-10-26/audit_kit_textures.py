"""Read the exported kit geometry. Write a new audit without changing assets."""
import collections
import csv
import json
from pathlib import Path
import hou

ROOT = Path("C:/Users/GameDevPC0403/Documents/GitHub/HoudiniSource/ProjectRunner")
OUT = Path(__file__).parent / "kit_geometry_audit.json"
targets = list(csv.DictReader((ROOT / "data/projectdev_uv_targets.csv").open()))
strips = [r for r in targets if r["kind"] == "trim"]
report = {"houdini_version": hou.applicationVersionString(), "source": str(ROOT),
          "assets": [], "errors": [], "slot_assets": {}, "strip_faces": {},
          "missing_uv": [], "missing_uv2": [], "unmatched_trim_faces": 0}
slot_assets = collections.defaultdict(list)
strip_faces = collections.Counter()
for path in sorted((ROOT / "geo/export/projectdev").rglob("*.bgeo.sc")):
    try:
        geo = hou.Geometry()
        geo.loadFromFile(str(path))
        uv = geo.findVertexAttrib("uv")
        uv2 = geo.findVertexAttrib("uv2")
        mat = geo.findPrimAttrib("shop_materialpath")
        slots = collections.Counter()
        piece_strips = collections.Counter()
        for prim in geo.prims():
            slot = prim.stringAttribValue(mat).rsplit("/", 1)[-1] if mat else "MISSING"
            slots[slot] += 1
            if slot == "M_CyberMarket_Trim" and uv and prim.vertices():
                v = sum(vertex.attribValue(uv)[1] for vertex in prim.vertices()) / len(prim.vertices())
                hits = [s for s in strips if float(s["v0"]) - 1e-6 <= v <= float(s["v1"]) + 1e-6]
                if hits:
                    piece_strips[hits[0]["target_name"]] += 1
                else:
                    report["unmatched_trim_faces"] += 1
        for slot in slots:
            slot_assets[slot].append(path.name.removesuffix(".bgeo.sc"))
        strip_faces.update(piece_strips)
        if not uv:
            report["missing_uv"].append(path.name)
        if not uv2:
            report["missing_uv2"].append(path.name)
        report["assets"].append({"piece": path.name.removesuffix(".bgeo.sc"), "kit": path.parent.name,
                                 "points": len(geo.points()), "primitives": len(geo.prims()),
                                 "slots": dict(slots), "trim_strips": dict(piece_strips),
                                 "vertex_attributes": [a.name() for a in geo.vertexAttribs()],
                                 "point_attributes": [a.name() for a in geo.pointAttribs()]})
    except Exception as exc:
        report["errors"].append({"file": str(path), "error": str(exc)})
report["slot_assets"] = dict(slot_assets)
report["strip_faces"] = dict(strip_faces)
with OUT.open("x", encoding="utf-8") as stream:
    json.dump(report, stream, indent=2)
print(json.dumps({"report": str(OUT), "houdini_version": report["houdini_version"],
                  "assets": len(report["assets"]), "errors": report["errors"],
                  "missing_uv": report["missing_uv"], "missing_uv2": report["missing_uv2"],
                  "slot_asset_counts": {k: len(v) for k, v in slot_assets.items()},
                  "strip_faces": report["strip_faces"],
                  "unmatched_trim_faces": report["unmatched_trim_faces"]}, indent=2))
