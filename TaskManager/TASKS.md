# TaskManager tasks

Hand-written until the board can generate this file.

## v1

- [x] T1 Brief written (2026-10-25)
- [x] T2 Repo layout, venv, requirements, .gitignore (2026-10-25)
- [x] T3 Store: schema, task and comment operations, lapse and stale rules (2026-10-25)
- [x] T4 Server: auth, REST, MCP tools, static page route (2026-10-25)
- [x] T5 CLI `board` (2026-10-25)
- [x] T6 Page: six columns, project filter, badges, admin buttons (2026-10-25)
- [x] T7 TASKS.md export per project (2026-10-25)
- [x] T8 Tests with pytest, 23 passing (2026-10-25)
- [x] T9 Import of Runner TASKS.md: 71 runner, 9 cmf; old file kept as `ProjectRunner/TASKS-archive-2026-10-25.md` (2026-10-25)
- [x] T10 Install: tokens, Scheduled Task "TaskManager board", local-scope MCP in ProjectRunner and proj-docs, SessionStart hook in ProjectRunner (2026-10-25)
- [x] T11 Skills `task-board` and `board-sweep` in ai-toolkit, ask-mike updated, installer rerun (2026-10-25)
- [ ] T12 Mike tests the demo and gives notes
- [ ] T13 Mike confirms the import mapping (which items went to `cmf`) or asks for changes
- [ ] T14 Verify the Scheduled Task starts the server after a reboot
- [ ] T15 Verify the SessionStart hook prints in a fresh ProjectRunner session
- [ ] T16 First `/board-sweep` run on the imported board

## Later

- [ ] ChatGPT identities and a tunnel (Cloudflare or Tailscale); ask Mike before exposing the port
- [ ] Weekly scheduled sweep once the manual one is trusted
- [ ] Board the other projects (Dawn, Fury, Alpha)

## Log

- 2026-10-25: Grill session settled the design. Brief written. v1 built, tested, installed, and loaded with the Runner and CMF tasks.
