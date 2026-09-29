# Handoff: per-game production folders under C:\Prod

## Goal

Stop switching between `HoudiniSource` and `Unreal Projects` by giving each game one root folder that holds its Unreal project, its Houdini files, and its docs. Reusable assets go in a shared `_Library`.

## Done

- Created the layout below. `C:\Prod` is not a git repo.
- Moved `%USERPROFILE%\Documents\Unreal Projects\RunnerSandbox_01` to `C:\Prod\CyberRunner\Unreal`. Before and after counts matched at 4,801 files and 7,893,545,802 bytes. The old folder is gone. Because it was a rename on the same drive, the DerivedDataCache moved too.
- Made `C:\Prod\CyberRunner\Houdini` a junction to `%USERPROFILE%\Documents\GitHub\HoudiniSource\ProjectCyberRunner`. The files are still in the HoudiniSource repo.
- Rewrote 12 old paths in `C:\Prod\CyberRunner\Unreal\Saved\Config\WindowsEditor\EditorPerProjectUserSettings.ini` (the file-dialog defaults and `SwarmIntermediateFolder`). A search of `Config\` and `Saved\Config\WindowsEditor\` found no other mentions of `Unreal Projects`.
- The user said to leave the other projects in `Unreal Projects` where they are.

```
C:\Prod\
├── _Library\
│   ├── HDAs\
│   ├── Materials\
│   └── Scripts\        (all three empty)
└── CyberRunner\
    ├── Unreal\         RunnerSandbox_01.uproject, UE 5.8, no version control
    ├── Houdini\        junction to HoudiniSource\ProjectCyberRunner
    └── Docs\           empty
```

No files in HoudiniSource changed. Another task was working at the same time, so this session stayed out of HoudiniSource.

## Not yet verified

Nobody has opened the moved project in Unreal. Open `C:\Prod\CyberRunner\Unreal\RunnerSandbox_01.uproject` and confirm it loads without redirector or missing-asset errors. The Epic Launcher's recent list still shows the old path, so open the `.uproject` directly or use Browse.

## Next step

Set up Auto Reimport in the RunnerSandbox_01 editor. In Editor Preferences > Loading & Saving > Auto Reimport, add a watched directory at `C:\Prod\CyberRunner\Houdini\geo\export` and map it to a Content path such as `/Game/Houdini/`. Test it by exporting one `SM_*` file and confirming Unreal picks it up.

## Later, once the other HoudiniSource task is finished

- Add `C:/Prod/_Library/HDAs` to `HOUDINI_OTLSCAN_PATH` in `HoudiniSource/houdini/packages/HoudiniSource.json`.
- Put the Unreal project under version control. Git LFS would match HoudiniSource, and Perforce is the other option. The user hasn't chosen yet.
- Optionally, write an `Open-Game <Name>` launcher script that opens the latest hip, the `.uproject`, and an Explorer window.
- Move other games into `C:\Prod` only when the user asks. The Unreal and Houdini folder names don't line up yet. For example, RunnerTrailer_01 probably belongs with CyberRunner, and ProjectDawnPrototype with ProjectDawn. Confirm each pairing with the user.

## Suggested skills

- `ue5-export` for the Auto Reimport test export and FBX ROP paths.
- `verify-asset` to prove an export cooks before testing reimport.
- `houdini-mode`, the HoudiniSource map skill, before touching anything in that repo.
- `unslop` for any replies or docs.
