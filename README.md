# proj-docs

Project content for my coding agents: one folder per project, plus session handoffs. The tools that read and write it live in [ai-toolkit](https://github.com/5amMickey/ai-toolkit). Its installer sets `PROJ_DOCS` to this folder when the two repos are cloned side by side.

## Layout

| Path | What | Written by |
|---|---|---|
| `<Project>/BRIEF.md` | What the project is, what "done" means, what to avoid, where its files live on each device, and settled decisions | `/project-brief`, or by hand from `ai-toolkit/global/skills/project-brief/TEMPLATE.md` |
| `<Project>/TASKS.md` | Checklist for work that spans many steps | The agent, as it works |
| `<Project>/refs/` | Reference images and files for the brief | Me |
| `handoffs/` | Session handoffs for moving between sessions and devices | `/handoff` |

Images and other binaries are stored with Git LFS (see `.gitattributes`). The setup steps below include `git lfs install`.

## Set up a device

Setup for Windows, macOS, and Linux is in the [ai-toolkit README](https://github.com/5amMickey/ai-toolkit#set-up-a-device). It clones this repo next to `ai-toolkit`, and the installer sets `PROJ_DOCS` from there.
