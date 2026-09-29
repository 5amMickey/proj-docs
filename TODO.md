# TODO

Background for each item is in [handoffs/2026-09-29-project-template-setup.md](handoffs/2026-09-29-project-template-setup.md).

## Project brief template

- [ ] **Restart agents on the PC** so they load the new rules and `PROJ_DOCS`.
- [ ] **Set up the Mac** with the macOS steps in the [ai-toolkit README](https://github.com/5amMickey/ai-toolkit#set-up-a-device). Done when `echo $PROJ_DOCS` prints the proj-docs path. This is the first real run of the `install.sh` changes.
- [ ] **Run `/project-brief` on CyberRunner.** Done when `CyberRunner/BRIEF.md` exists and every "Done means" line can be checked.
- [ ] **Decide on folder-access limits.** Nothing enforces the rule in `global/AGENTS.md` yet. Options:
  - [ ] `deny` rules in `~/.claude/settings.json`, written by the installer. Check the path syntax and how they behave with permissions bypassed against the Claude Code docs first.
  - [ ] Version control for the Unreal project (Git LFS or Perforce).

## CyberRunner

From [handoffs/2026-09-25-prod-folder-layout.md](handoffs/2026-09-25-prod-folder-layout.md).

- [ ] Open `C:\Prod\CyberRunner\Unreal\RunnerSandbox_01.uproject` and confirm it loads without redirector or missing-asset errors.
- [ ] Set up Auto Reimport from `C:\Prod\CyberRunner\Houdini\geo\export` to `/Game/Houdini/`, and test it with one `SM_*` export.
