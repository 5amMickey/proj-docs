"""Read a rig in background Blender. Never save or modify the source file."""
import bpy
import json
import sys
from pathlib import Path

result = {
    "file": bpy.data.filepath,
    "version": bpy.app.version_string,
    "unit_scale": bpy.context.scene.unit_settings.scale_length,
    "fps": bpy.context.scene.render.fps,
    "rigs": [],
    "actions": [{"name": a.name, "range": list(a.frame_range)} for a in bpy.data.actions],
}
for obj in bpy.data.objects:
    if obj.type != "ARMATURE":
        continue
    bones = []
    for bone in obj.data.bones:
        bones.append({
            "name": bone.name,
            "parent": bone.parent.name if bone.parent else None,
            "head": list(bone.head_local),
            "tail": list(bone.tail_local),
            "matrix_local": [list(row) for row in bone.matrix_local],
            "deform": bone.use_deform,
            "constraints": [{"type": c.type, "subtarget": getattr(c, "subtarget", ""),
                             "influence": c.influence} for c in obj.pose.bones[bone.name].constraints],
        })
    result["rigs"].append({"name": obj.name, "scale": list(obj.scale), "bones": bones})
result["meshes"] = [{
    "name": obj.name,
    "vertex_count": len(obj.data.vertices),
    "groups": [g.name for g in obj.vertex_groups],
    "armature_modifiers": [{"target": mod.object.name if mod.object else None,
                            "preserve_volume": mod.use_deform_preserve_volume}
                           for mod in obj.modifiers if mod.type == "ARMATURE"],
} for obj in bpy.data.objects if obj.type == "MESH" and obj.find_armature()]
result["arp_settings"] = {k: str(bpy.context.scene[k]) for k in bpy.context.scene.keys()
                          if k.startswith("arp_")}
output = Path(sys.argv[sys.argv.index("--") + 1])
output.write_text(json.dumps(result, indent=2), encoding="utf-8")
print(json.dumps({"output": str(output), "rigs": [{"name": r["name"], "bones": len(r["bones"]),
                  "custom": [b for b in r["bones"] if b["name"].startswith("cc_")]}
                  for r in result["rigs"]], "actions": result["actions"],
                  "mesh_count": len(result["meshes"])}, default=str))
