# Promotion video template, research note

Date: 2026-11-04. Scope: how to build an adjustable ProjectRunner promotion video template (placeholders in, MP4 out). Research only. Nothing was built, and the open Blender and Unreal sessions were not touched.

## The video (from Mike)

1. Intel gathering dialogue.
2. Choose Vhoori.
3. Fast-forward through the arrival.
4. Two dialogue choices.
5. VHS stop. Narrator: "Wait, I'm getting ahead of myself. Let's go back."
6. Real reverse back to the start of the Vhoori scene.
7. Replay with pauses that explain the Hacker, Tech and Enforcer build options.
8. Play the Hacker route.

Each scene starts as a grey placeholder with a large X and a text block that describes the footage to capture.

## Recommendation

Use a JSON manifest as the single source of truth and a Python script that builds a Blender VSE `.blend` from it. Render the MP4 with `blender -b ... -a` as a separate process. Use FFmpeg only for the placeholder clips, probing durations, and a quick preview or final re-encode. Skip Resolve for now.

Why:
- Mike gets a real timeline GUI (move, trim, retime) and still has a one-command rebuild when the manifest changes.
- Blender 5.2 is installed and the VSE has reverse, retiming, speed and sound strips natively (sources below).
- FFmpeg plus JSON alone renders well but has no visual timeline, and reverse buffers the whole clip in memory.
- Resolve scripting from outside needs Studio, per third-party reports. Interchange (EDL, XML, OTIO) loses or distorts speed changes in user reports. Not worth the risk for a template that depends on reverse and freezes.

If Mike names a different editor, the manifest still works. Only the builder script changes.

## Comparison

| | Blender VSE, scripted `.blend` | Resolve via interchange | FFmpeg + JSON |
|---|---|---|---|
| Timeline GUI | Yes | Yes (best editor) | No |
| MP4 render | CLI, headless | GUI or Studio script | CLI, one command |
| Reverse | "Reverse Frames" strip option | Retime, not through interchange reliably | `reverse` / `areverse` filters, buffer the whole clip |
| Freeze | Retiming freeze frame / hold, or a still strip | Retime | `tpad`, `freezeframes` |
| Speed ramp (fast-forward) | Retiming `R` key, Speed Control strip | Retime | `setpts` |
| Footage swap | Change the strip path, same file name | Relink | Edit the path in JSON |
| Narration | Sound strips plus text strips | Audio tracks | Audio inputs with `amix` or `concat` |
| Risk | Blender 5.x API renames | Studio gating, speed lost in interchange | Hand-written filter graphs get hard to edit |

## Facts and sources

Blender (official, 5.2 LTS):
- Reverse on a strip is "Reverse Frames" in the Strip tab, Video section. [Strip properties](https://docs.blender.org/manual/en/latest/video_editing/edit/montage/strips/strip_properties.html)
- Retiming (`R` to set speed, Set Speed, Add Speed Transition, Reset Retiming, freeze and hold commands in the Strip > Retiming menu). Retiming handles strip content only, not animation. Effect strips cannot be retimed. [Editing strips](https://docs.blender.org/manual/en/latest/video_editing/edit/montage/editing.html)
- Speed Control effect. Multiply mode accepts negative values to play in reverse. When the strip runs out of frames it repeats the last one. [Speed control](https://docs.blender.org/manual/en/latest/video_editing/edit/montage/strips/effects/speed_control.html)
- Movie strip and footage options. [Movie strip](https://docs.blender.org/manual/en/latest/video_editing/edit/montage/strips/movie.html)
- Headless render: `blender -b file.blend -a`. Put `-o`, `-F` and similar before `-a`; the manual warns that options after the render flag are ignored. [Command line rendering](https://docs.blender.org/manual/en/latest/advanced/command_line/render.html), [arguments](https://docs.blender.org/manual/en/latest/advanced/command_line/arguments.html)
- Python API: `Strips.new_movie / new_sound / new_effect`, `speed_factor`. Types were renamed from Sequence to Strip in 4.4. 5.2 adds a `stream` argument to `new_movie` and `new_sound`. [SequenceEditor](https://docs.blender.org/api/current/bpy.types.SequenceEditor.html), [change log](https://docs.blender.org/api/current/change_log.html), [5.2 sequencer notes](https://developer.blender.org/docs/release_notes/5.2/sequencer/), [compatibility](https://developer.blender.org/docs/release_notes/compatibility/)

FFmpeg (official):
- `reverse` and `areverse` buffer the entire clip in memory, so trim first, for example `trim=end=5,reverse`. [Filters](https://ffmpeg.org/ffmpeg-filters.html)
- `setpts` scales speed (`0.5*PTS` is twice as fast). `tpad` holds the first or last frame (`stop_mode=clone`, `stop=-1` pads without end). `freezeframes` replaces a frame span with one frame from a second input. [Filters](https://ffmpeg.org/ffmpeg-filters.html)
- The concat demuxer needs matching codecs and time bases across files, so re-encode every segment to one profile first. [Formats](https://ffmpeg.org/ffmpeg-formats.html)
- Local build checked 2026-11-04: `N-122985-g145f6e5878` (2026-02-24) at `C:/ffmpeg/bin`, with `libx264`, `h264_nvenc`, `aac`, and the `reverse`, `areverse`, `tpad`, `freezeframes`, `setpts`, `drawtext`, `minterpolate` filters.

DaVinci Resolve:
- Resolve 18.6 manual says EDL import supports only linear speed effects. XML (Premiere, FCP7, FCPX) supports linear and variable speed, and variable speed becomes one keyframe per frame. [Manual 18.6 text](https://www.steakunderwater.com/VFXPedia/__man/Resolve18-6/DaVinciResolve18_Manual_files/part1403.htm) (a mirror, not the Blackmagic site).
- External Python scripting being Studio-only comes from third-party projects, not an official page I could open. [Community scripting notes](https://wiki.dvresolve.com/developer-docs/scripting-api)
- Not verified: OTIO speed handling and the current `ImportTimelineFromFile` formats. Check the README in the Resolve install's Developer/Scripting folder before relying on either.

## Pitfalls

- Reverse in FFmpeg buffers the whole segment. Keep the reversed span short or the template will eat RAM at 4K.
- Blender 5.x renamed sequence types to strips. Write the builder against 5.2 and print `bpy.app.version_string` first. Property names such as the reverse flag and the retiming API need a check in a scratch session before the builder relies on them.
- Retiming does not make a smooth transition into or out of a freeze (Blender manual), so cut to a still strip for the pauses instead of a ramp.
- Reverse and fast-forward segments need their audio muted or swapped for a rewind effect. Reversed speech is noise.
- Replacement footage will not match the placeholder length. Keep cut points (in, out, hold seconds) in the manifest, not in file length, and probe real durations with `ffprobe` at build time.
- Mixed frame rates and resolutions between UE captures and placeholders cause drift. Fix the project at one size and rate (suggest 1920x1080, 30 fps) and conform captures with FFmpeg.
- Do not run the builder in Mike's open Blender. Launch a new `blender.exe -b` process with `--python`. The Unreal editor is not involved.
- The project avoids AI-generated images in pitch material (BRIEF, 2026-10-15 decision). Placeholders are plain grey graphics, and narration should be Mike's voice or a plainly marked scratch track.

## File layout and version policy

```
ProjectRunner/promo/                      (repo location is Mike's call, proposed)
  promo.json              manifest: fps, size, scenes, in/out, speed, holds, narration, notes
  build_promo.py          reads promo.json, writes promo_vNN.blend
  footage/<scene_id>.mp4  captures; same name replaces the placeholder
  audio/<scene_id>_vo.wav narration and sfx
  placeholders/           generated grey X clips and PNGs (rebuildable, not committed)
  renders/promo_vNN.mp4   output
```

- The manifest and the script are the source. The `.blend` and the MP4 can be rebuilt, so keep only the latest one of each and tag manifest changes in git.
- Name outputs `promo_vNN.*` with two digits and bump on every manifest change that Mike reviews. Never overwrite a render he has seen.
- Use `footage/` names that match scene ids so a swap needs no edit.
- Store media outside git or under LFS (BRIEF: LFS quota is unconfirmed, so do not push large files yet).

## Suggestions (not from sources)

- Scene ids: `intel`, `choose_vhoori`, `arrival_ff`, `choices`, `vhs_stop`, `rewind`, `replay_hacker`, `replay_tech`, `replay_enforcer`, `hacker_route`.
- Use a text strip for each placeholder, with the scene id, its length, and a shot list ("capture: dialogue timer visible, left and right choices"). Keep the narrator lines as a separate text track so Mike can retype them.
- VHS stop: a frame hold of about 0.5 s, then scanline and tracking noise overlay, with a tape-stop audio slow-down. A "REW" on-screen label and a speed ramp backward sells the reverse. Reuse the glitch notes in `research/glitch-screen-effects.md`.
- Replay build pauses: freeze on the choice screen, show a one-line label ("Hacker. Breach devices.") and hold 2 s each, then resume. Keep the labels as manifest fields.
- Fast-forward: 4x to 8x with the dialogue subtitles hidden, so the footage reads as passing time.
- Open with the question the player asks, not the logo. Put the logo on the last frame.

## Open questions for Mike

- Editor preference (Blender, Resolve or FFmpeg-only).
- Length and frame rate target, and whether a vertical cut is needed.
- Who records narration, and whether the build names Hacker, Tech and Enforcer are final.
