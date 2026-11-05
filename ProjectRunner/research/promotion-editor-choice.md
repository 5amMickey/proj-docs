# Promotion editor choice

Date: 2026-11-04. Scope: Shotcut, Kdenlive and Blender VSE for the ProjectRunner rough cut and visual brief, on Windows. Template under review is `C:/Prod/ProjectRunner/Video/Promotion` (`timeline.json` and FFmpeg for clips, `build_blend.py` for a Blender 5.2.2 VSE project).

## Recommendation

Use Blender VSE as the editor. It is the only option of the three with a documented scripting API, the template already builds and reopens a `.blend` through that API, and the headless render path is documented. The agent adjusts the project through `bpy`, and Mike edits the same file by hand in the VSE.

Pick Shotcut instead if Mike wants a conventional editor and accepts that the agent edits plain XML. Its `.mlt` file is the simplest of the three to patch by hand, and its Windows install bundles `melt.exe` for headless export. Kdenlive has the best editing UI of the three but the heaviest file format, so it ranks last for agent edits.

## Comparison

| | Shotcut | Kdenlive | Blender VSE |
|---|---|---|---|
| Native file | `.mlt`, MLT XML | `.kdenlive`, MLT XML plus `kdenlive:` properties | `.blend`, binary |
| Agent edit route | Direct XML editing. No supported API. | Direct XML editing. No supported API. | Full `bpy` API, documented |
| Headless render | `melt project.mlt -consumer avformat:out.mp4`, documented by Shotcut | Project is playable by `melt`. Kdenlive also writes render scripts that call `kdenlive_render`. | `blender -b file.blend -a`, `--python script.py` |
| Titles | Text: Simple, Text: Rich filters and a text generator | Title clips, stored inside the project file | `TEXT` effect strip, `TextStrip` has text, font, size, color, box, outline, shadow |
| Audio | Many audio filters, auto duck (26.9) | Audio mixer, effects, recording | Sound strips with volume, pitch correction, waveform. Template adds a narration channel. |
| Speed and time remap | Speed filters (forward only, forward and reverse), Time Remap filter with keyframes | Speed change on a clip, Time Remapping with keyframed speed (since 21.08) | `SPEED` effect strip, retiming keys, freeze frame operator |
| Reverse | Speed: Forward & Reverse filter | Not confirmed in the pages I read | `MovieStrip.use_reverse_frames` |
| Freeze frame | Timeline > Freeze Frame (since 25.05) | Not confirmed in the pages I read. MLT has a `freeze` filter. | `bpy.ops.sequencer.retiming_freeze_frame_add` |

## What each source says

### Blender (official API docs, current)

- `SequenceEditor.strips` and `strips_all` are the strip collections. `StripsTopLevel` has `new_movie`, `new_sound`, `new_image`, `new_meta` and `new_effect`. `new_effect` accepts `TEXT`, `SPEED`, `CROSS`, `ADJUSTMENT` and others. https://docs.blender.org/api/current/bpy.types.StripsTopLevel.html
- `MovieStrip` and `SoundStrip` expose `retiming_keys`. `RetimingKeys.add(timeline_frame=...)` adds a key, and `RetimingKey.timeline_frame` moves it, which changes playback speed. A `RetimingKey` has no speed value of its own, so speed ramps come from key positions. https://docs.blender.org/api/current/bpy.types.RetimingKeys.html
- `bpy.ops.sequencer` includes `retiming_freeze_frame_add` and `retiming_transition_add`. Operators need a sequencer context, so scripting them in background mode needs a context override or a different route.
- `--background`, `--render-anim` (`-a`), `-S` and `--python` are documented command-line arguments. https://docs.blender.org/manual/en/latest/advanced/command_line/arguments.html
- Caveat on versions. The page I fetched marks `frame_start`, `frame_final_duration` and related names as deprecated since 5.10, replaced by `content_start`, `duration` and handle properties. The template uses `frame_final_duration` and runs on 5.2.2. Check any new property name against the installed Blender's own docs before using it.

### Shotcut and MLT (official sources)

- The Shotcut FAQ says Save writes a MLT XML file, and that manually authored XML can use any MLT filter. https://www.shotcut.org/FAQ/
- Shotcut's own export article gives `LC_ALL=C melt project.mlt -consumer avformat:export.mp4` and says Windows installs include `melt.exe`, `ffmpeg`, `ffplay` and `ffprobe` in the install folder. It also describes saving a job XML from the Jobs panel, which adds a `<consumer>` element so `melt job.xml` runs alone. https://forum.shotcut.org/t/export-at-the-command-line/44067/1
- MLT XML is documented as a hand-authoring format with a DTD, producers, playlists and tractors. The parser does not validate. https://www.mltframework.org/docs/mltxml/
- `melt` is documented as a multitrack command-line editor. https://www.mltframework.org/docs/melt/
- MLT has SWIG script bindings (Python among them), but the MLT docs state there is no documentation for them and point to the C API. That is a library you can call, not a supported editing API for Shotcut projects. https://www.mltframework.org/docs/scriptbindings/
- Time Remap filter limits, from the Shotcut docs. It works only on clips without B-frames, cannot be disabled, does not support simple keyframes or filter trimming, and is not available on clips with a speed multiplier other than 1.0. https://forum.shotcut.org/t/time-remap-filter/27289/1
- Shotcut 26.9 is the latest release on the site (27 Sep 2026). MLT is at 7.42.0 (3 Oct 2026).

### Kdenlive (official docs and source repository)

- `dev-docs/fileformat.md` in the Kdenlive repository documents the format. `.kdenlive` is MLT XML plus extra `kdenlive:` properties. MLT renders it directly and ignores the Kdenlive-specific data. The current generation (23.04 on, document version 1.1) wraps each sequence in a tractor with a `kdenlive:uuid`, keeps clips in a `main_bin` playlist, and ends with a wrapper tractor for the last opened sequence. Title and color clips live inside the file. Subtitles go to a sidecar `.srt`. https://invent.kde.org/multimedia/kdenlive/-/raw/master/dev-docs/fileformat.md
- The format notes warn that track-wide effects made older files invalid XML until the `kdenlive` namespace was declared by hand. Plan to patch that if any XML tool rejects a file.
- The render dialog has Generate Script for batch rendering, and the docs say the script passes the thread count to `melt`. https://docs.kdenlive.org/en/exporting/render.html
- The repository holds `renderer/kdenlive_render.cpp`, which takes the path to a melt renderer as an argument.
- Time Remapping and OpenTimelineIO import and export (25.04) appear in the What's New page. https://docs.kdenlive.org/en/more_information/whats_new.html
- Kdenlive 26.08 is the current manual version.

## Scripting API versus XML editing

- Blender is a supported API. Properties, types and operators are documented and versioned, and the template already depends on it.
- Shotcut and Kdenlive have no supported editing API. The agent would parse and patch XML, and a wrong edit shows up only when the GUI or `melt` loads the file. Kdenlive's `kdenlive:` data can drift from the MLT data when edited by hand. I did not find a Shotcut page that documents its own `shotcut:` properties.
- OpenTimelineIO export from Kdenlive is a possible bridge, but I did not test it and it is outside the sources above.

## Caveats

- A `.blend` is binary, so a text diff shows nothing. Keep `timeline.json` as the readable source and treat the `.blend` as generated, as the README already says.
- The agent must not write a `.blend` while Mike has it open. The README's rule of saving manual edits under another name covers this.
- Blender's retiming API is thin. For exact speed ramps and freezes, the template's FFmpeg-prepared clips remain the reliable route, and the VSE holds the trimmed result.
- Nothing was installed and no project files changed. I did not test any editor here. The claims above come from the cited pages.

## Not confirmed

- That Kdenlive's Windows build ships a `melt.exe` and what its render script looks like on Windows. I did not find a doc page that says so.
- Kdenlive reverse and freeze frame in the user manual. The speed and freeze pages returned 404 at the guessed URLs.
- The Blender 5.2 manual page on retiming (404 at the guessed URL). The API pages above cover the properties.
- Round-trip behavior when Shotcut or Kdenlive reopens a hand-edited file.

## Fit for Mike's clarified task

The research above prioritizes a supported automation API. For a conventional rough-cut editor, the parent assessment favors Shotcut provisionally. Mike can edit its timeline and the agent can patch saved XML, subject to an initial open/save/render test. Blender remains the already-tested option. No installation or editor migration has been made.

