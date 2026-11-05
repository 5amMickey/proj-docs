# Cascadeur animation plan

2026-11-05. Draft for Mike's review. Research: [cascadeur-workflow.md](cascadeur-workflow.md), [cascadeur-python-api.md](cascadeur-python-api.md).

## Where we are

- Cascadeur 2026.2.3, Pro licence (log flags: export, profeatures). It is running. The in-app MCP script server (port 8765) is not started.
- `Houdini/anim/castMarcus_start_02.casc` is the rigged base: `SKM_Cast_Marcus_coat_ARP_08.fbx` (Manny bones, Marcus short coat) with the UE5 quick-rig template, one key at frame 0.
- `castMarcus_walk_test_03.casc` has keys at 0, 1 and 101 and one AI (Inbetweening) interval across all 100 frames, plus a text description. Nothing has been exported from Cascadeur yet.
- Existing clips: Blender ARP formula clips in `Houdini/geo/export/AS_Marcus_*_ARP_08.fbx` (idle, walk, run, crouch idle, crouch walk, ROM) and the Mixamo-derived review clips in `geo/rig/marcus_test_01..12/UE_*.fbx` that feed `MarcusPlayable_02` in UE.
- UE editor is not running. Import scripts exist in `Unreal/Scripts`.

## Why the recent attempts were poor (from the docs and the scene)

- Inbetweening fills between key poses. One interval from frame 1 to 101 gives it no contact, passing or down poses to hit, so it invents a generic walk. The docs cap a gap at 120 frames, but quality needs keys at every pose change. A walk needs 4 keys per step (contact, down, passing, up), so 8 to 9 keys per cycle.
- AutoPhysics is documented to work poorly on stay-in-place motion. Animate with travel, snap physics, then convert to in-place.
- Feet that drift are not detected as fulcrums, so physics treats the pose as airborne.

## Workflow every clip follows

1. New scene from `castMarcus_start_02.casc` (never edit Mike's files; save as `castMarcus_<clip>_v<NN>.casc`).
2. Import the existing FBX with the Animation preset as reference on its own track, or as the starting motion.
3. Animation Unbaking to reduce it to keys, then edit down to the named key poses. Write the breakdown (frame, pose name, what the body does) with a screenshot per key to `refs/wip/cascadeur/<clip>/`.
4. Set key poses in Step interpolation. Review.
5. Run Inbetweening (AI interval) per gap, with a short description. Then AutoPhysics on the travelling version, snap, then Stay In Place and Animation Cycle.
6. Export FBX (Animation preset, meshes off, bake on, binary) to `Houdini/geo/export/cascadeur/A_Marcus_<Clip>_<NN>.fbx`.
7. Import to UE onto the Marcus skeleton, place in a review map, record a short capture, post the path.

## Phases

### 0. Pipeline proof (first, before any art)

- Start the Cascadeur MCP script server (Mike: Commands > MCP.Start script server), or approve an autostart script.
- Script: open walk_test_03, export the animation FBX, import to UE, play on Marcus in a review map, capture. This proves Cascadeur to UE end to end on the current rig.
- Check axis, scale, root, twist and ik bones after import.

### 1. Gameplay clips (one agent per clip, in parallel after phase 0)

Walk, run (jog), crouch idle, crouch walk, standing idle. 30 fps, in-place loops, root at origin.

### 2. Fight scene

- Research: key poses for the chosen beats, as drawn pose sheets (SVG stick figures with timing and weight notes) plus links to real reference. No AI-generated images unless Mike says otherwise.
- Second character rigged in Cascadeur with the same UE5 template.
- Both characters in one scene (import the second .casc; namespaces character_1 and character_2).
- Step-blocked key poses first, review with Mike, then Inbetweening, AutoPhysics, export per character, assemble in a Level Sequence.

### 3. UE import and review

- One import script for Cascadeur FBXs, one review map, captures to `refs/wip/cascadeur/`.

## How agents drive Cascadeur

- Through the in-app MCP script server (`127.0.0.1:8765`, `/run` with Python; `csc`, `scene`, `app` in scope; 30 s timeout). Mike starts it once per Cascadeur session from Commands > MCP.Start script server. There is no per-user scripts folder, so any helper module lives in our repo and is loaded by path from the `/run` code.
- Confirmed API: `ProjectLoader.load_from`, `view_scene.save`, `FbxSceneLoader` (`import_model`, `add_model`, `import_animation`, `export_model`, `export_joints*`), `rig_mode.on/off`, `layers_editor` keys and interpolation, Transform `global_position` writes, `MirrorTool`, `AttractorTool` (tween), AutoPosing add/update, animation unbaking (`ml/editable_animation.py`), `RenderToFile` (`take_image`, `play_to_video_file`).
- Not confirmed by script: running Inbetweening and AutoPhysics (only on/off flags found), Animation Cycles, Fix Feet, and applying a `.qrigcasc` template without the dialog. Phase 0 tests each; what fails falls back to `call_action` ids or a click by Mike.

## Open questions for Mike

See the chat message of 2026-11-05.
