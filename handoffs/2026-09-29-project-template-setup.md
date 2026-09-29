# Handoff: project brief template and the proj-docs repo

## Goal

A template for starting any project with an agent. Web and game projects stay separate, and the setup behaves the same on the PC and the Mac. It can be filled out as a Markdown file or through an interview skill like `ask-mike`.

## Notes from the discussion

### What we took from "Getting the most out of Opus 5.5"

Source: https://claude.dev/blog/getting-the-most-out-of-opus-5-5/ (Addy Osmani, 2026-09-22). Most of it is advice for a single request. These points shaped the template:

- **State what "done" means** in the task, then let the agent work. This became the brief's main section.
- **Stopping rules.** Keep going when a step doesn't need input; stop only when blocked or before anything destructive. This replaced the vaguer "ask when a decision is mine" in the global rules.
- **Specific avoid lists** for design ("no pill-shaped buttons", not "avoid generic"). This became the brief's Avoid section and a question in both domains.
- **A task file that lasts** (`TASKS.md`) for long runs, so progress survives context summaries and syncs between devices.
- **"Needs from you" first** at the end of a long run, and mark unconfirmed findings with where the agent looked.
- **Attach images** instead of describing them. Briefs keep them in `refs/`.
- **Lock earlier decisions.** The brief's Decisions section is treated as settled unless reopened.
- **Remove "think carefully" phrases.** A search of ai-toolkit found none.

### Decisions

- **The interview is a skill, and the template is still a file.** A form you fill in alone can't push back on vague answers. `/project-brief` runs the `grilling` interview and writes the same shape as `TEMPLATE.md`, so both ways give the same file.
- **Named `project-brief`, not `brief`,** so it doesn't clash with HoudiniSource's `/asset-brief`, which covers one asset rather than a whole project.
- **Shared questions are global; domain questions stay in their layer** (`games-map/BRIEF-QUESTIONS.md`, `web-map/BRIEF-QUESTIONS.md`).
- **Project content lives in its own private repo, `proj-docs`,** not in ai-toolkit. Reasons: reference images would bloat the tools repo, ai-toolkit can go public later without leaking project content, and briefs change much more often than skills. The name is `proj-docs` because it holds docs, not tools.
- **`C:\Prod` couldn't hold briefs** because it isn't a git repo and wouldn't sync to the Mac.
- **Handoffs moved to `proj-docs/handoffs/`**, since they're project history too.
- **proj-docs uses Git LFS** for images, video, PSD, and PDF, matching HoudiniSource.
- **The installer finds proj-docs next to ai-toolkit** and sets `PROJ_DOCS`. If it's missing, it prints the clone command and carries on.
- **Setup commands live only in the ai-toolkit README;** the proj-docs README links to them so the two can't drift.

### Folder access

- The only limit is the rule in `global/AGENTS.md`: stop and ask before deleting data, force-pushing, or changing files outside the current repo, the brief's "Where it lives" folders, `$PROJ_DOCS`, and `$AI_TOOLKIT`.
- Nothing enforces it. `~/.claude/settings.json` has no `permissions` block, neither repo has project settings, Codex has no `config.toml`, and this session ran with permission checks bypassed.
- The biggest risk is the CyberRunner Unreal project in `C:\Prod\CyberRunner\Unreal`, which has no version control.

### Connecting devices

- Both repos are private, so each device needs a GitHub login. Windows: Git for Windows asks on the first clone. macOS and Linux: `gh auth login`, then `gh auth setup-git`.
- Each device needs `git lfs install` once, before cloning proj-docs.
- Day to day: `git pull` in both repos, and rerun the installer when skills are added or removed.

## Done

- ai-toolkit (`main`, pushed through `69a4ae8`):
  - `global/skills/project-brief/SKILL.md` and `TEMPLATE.md` (new)
  - `games/skills/games-map/BRIEF-QUESTIONS.md`, `web/skills/web-map/BRIEF-QUESTIONS.md` (new)
  - `global/AGENTS.md`: stopping rules, the allowed folders, briefs, `TASKS.md`, "needs from you" first
  - `global/skills/ask-mike/SKILL.md`, `games/skills/games-map/SKILL.md`, `web/skills/web-map/SKILL.md`: point to `/project-brief`
  - `global/skills/handoff/SKILL.md`: writes to `$PROJ_DOCS/handoffs/`
  - `install.ps1`, `install.sh`: set `PROJ_DOCS`
  - `README.md`: proj-docs, and setup for Windows, macOS, and Linux
  - `handoffs/` removed
- proj-docs (`main`, pushed through `ece7f05`): `README.md`, `.gitattributes`, `handoffs/2026-09-25-prod-folder-layout.md`.
- On the PC, `install.ps1` ran. `PROJ_DOCS` is set in the user environment and Claude Code's `settings.json`, `/project-brief` is linked, and `~/.codex/AGENTS.md` has the new rules. `install.sh` only passed a syntax check.

## Still to do

1. **Restart agents on the PC** so they load the new rules and `PROJ_DOCS`.
2. **Set up the Mac** with the macOS steps in the ai-toolkit README. This is the first real run of the `install.sh` changes; afterwards check that `echo $PROJ_DOCS` prints the proj-docs path.
3. **Test `/project-brief` on CyberRunner.** The skill hasn't been run yet. Done when `proj-docs/CyberRunner/BRIEF.md` exists and every "Done means" line is checkable.
4. **Decide on folder-access enforcement.** Options: `deny` rules in `~/.claude/settings.json` written by the installer (check the path syntax and how deny rules behave with permissions bypassed against the Claude Code docs first), and version control for the Unreal project (Git LFS or Perforce).
5. The CyberRunner items in `2026-09-25-prod-folder-layout.md` are still open (open the moved `.uproject`, set up Auto Reimport).

## Suggested skills

- `project-brief` for step 3.
- `writing-skills` before changing any skill.
- `update-config` for deny rules in step 4.
- `unslop` for any docs or replies.
