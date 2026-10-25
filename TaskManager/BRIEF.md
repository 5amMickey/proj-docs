# TaskManager

Domain: tools   Status: building   Updated: 2026-10-25

## What and who

A task board for my projects, used by me and by every coding agent I run. It holds the tasks for ProjectRunner and for the Canada Media Fund (CMF) application, with room for the other projects later. I look at it in a browser to see what is going on. Agents reach it over MCP and a CLI to find their next task, claim it, report progress, and add tasks they discover. It replaces hand-edited `TASKS.md` files, which the server now generates.

## Done means

Current milestone: v1 in daily use during the CMF push.

- [ ] `board status` reports the server up on port 8585 after a reboot, with no manual start.
- [ ] From a Claude Code session in `C:\Prod\ProjectRunner`, the `task-board` tools list, claim, update and comment on a `RUN-` task, and a `cmf-claude` token cannot touch it.
- [ ] The kanban page at `http://127.0.0.1:8585/` shows both projects with the six columns, overdue and stale badges, and buttons that set `ready`, clear `needs_review`, and apply a sweep proposal.
- [ ] A comment posted as `mike` sets `needs_review` and a claim attempt by an agent is refused until it is cleared.
- [ ] A claim with no update for 4 hours returns the task to `ready` with a comment, proven by a test that fakes the clock.
- [ ] Every open item from the old `ProjectRunner/TASKS.md` exists on the board with its `legacy_id`, split into `runner` and `cmf`, and the server regenerates both `TASKS.md` files on change.
- [ ] The `board-sweep` skill run on the imported board produces at least one duplicate, stale or split proposal as comments and flags, and changes nothing else.
- [ ] A SessionStart hook in ProjectRunner prints held and ready tasks, and prints nothing when the server is down.
- [ ] `pytest` passes in the repo.

## Stop and ask me when

- Before exposing the server beyond localhost (tunnel, VPS, ChatGPT connector).
- Before any migration that drops or rewrites columns in `board.sqlite`.
- Before adding a Python package beyond `mcp`, `uvicorn` and `pytest`.

## Avoid

- A build step or a JavaScript framework for the page. One static HTML file with plain JS.
- Deleting tasks. Anything unwanted goes to `dropped`.
- Agents setting `ready`, clearing `needs_review`, or working outside their own project.
- The server committing `proj-docs` on its own. Commits happen on `board export --commit` or by hand.
- Committing `data/` to git.

## References

- The grill session on 2026-10-25 that produced the Decisions below.
- `ai-toolkit/games/skills/houdini-live/` for the shape of an MCP server registered by the installer.

## Where it lives

| What | PC | Mac |
|---|---|---|
| Code and git repo (`5amMickey/TaskManager`) | `C:\Prod\TaskManager` | n/a |
| Database and nightly JSON dump (gitignored) | `C:\Prod\TaskManager\data\` | n/a |
| Python venv | `C:\Prod\TaskManager\.venv` | n/a |
| Tokens | `%USERPROFILE%\.board\tokens.json` | n/a |
| Agent skills (`task-board`, `board-sweep`) | `$AI_TOOLKIT/global/skills/` | same |
| Generated task lists | `$PROJ_DOCS/<Project>/TASKS.md` | same |
| Brief and tasks for this project | `$PROJ_DOCS/TaskManager` | same |

## Domain

- **Stack**: Python 3.14 in a venv. `mcp` (FastMCP over streamable HTTP) mounted on Starlette with `uvicorn`. SQLite through the standard library. One static HTML page with plain JS. `pytest` for tests.
- **Transport**: HTTP on `127.0.0.1:8585`. Every request carries a bearer token, including local ones and the page. MCP at `/mcp`, REST at `/api/`, page at `/`.
- **Identity**: one token per identity. `mike` is admin. Agents are `runner-claude` and `cmf-claude`, each scoped to its project. ChatGPT identities come later with a tunnel.
- **Lifecycle**: a Windows Scheduled Task starts the server at login. `board up` and `board status` cover the gaps.
- **Proof**: `pytest` output, a `curl` against the running server, and the page in a browser.

## Decisions

Settled. Don't reopen unless I ask.

- 2026-10-25: SQLite is the source of truth, not Markdown. Several agents writing one `TASKS.md` clobber each other and drift from git. The server regenerates `TASKS.md` as a read-only export so the "checklist in TASKS.md" rule still holds.
- 2026-10-25: One store with a `project` field, not one board per project. Projects now are `runner` and `cmf`. The CMF application is its own project with a hard deadline (submit 2026-11-06), not a Runner workstream.
- 2026-10-25: Task IDs are project-prefixed (`RUN-12`, `CMF-3`) so they read in commits and comments and can't be confused across projects.
- 2026-10-25: Statuses are `backlog`, `ready`, `in_progress`, `review`, `done`, `dropped`. Blockers are a `blocked_by` field with a badge, not a column.
- 2026-10-25: Fields: title, body, done_means, priority P0 to P3, due, assignee, session, claimed_at, updated_at, needs_review, stale, legacy_id, parent, blocked_by, labels, links. Comments are a separate table with author and time. No estimates. Links to files rather than attachments.
- 2026-10-25: Priority is a bucket (P0 blocking, P1 this week, P2 next, P3 someday) plus an optional due date. Agents pull `ready` tasks in priority then due order. I assign work by setting `ready`, not by naming an agent. Agents claim with their identity and a session id.
- 2026-10-25: Agents create, comment, update body and status, claim, and set a proposed priority on create, all within their own project. Only `mike` sets `ready`, clears `needs_review`, or works across projects. Nothing is ever deleted.
- 2026-10-25: A comment from `mike` sets `needs_review`, which blocks claiming until I clear it. No update for 7 days sets `stale`. Create returns similar titles and the protocol says attach to an existing task unless clearly new. The server never rejects a create as a duplicate.
- 2026-10-25: A claim lapses after 4 hours without an update. The task returns to `ready` (not `backlog`, since I already cleared it) with a comment naming the identity that held it.
- 2026-10-25: The `board-sweep` skill proposes and never acts. It writes comments and flags for duplicates, stale tasks and oversized tasks, may create child tasks in `backlog` under a parent, and sets `needs_review`. I approve from the page or with `board apply`. Manual trigger for now; a weekly schedule later.
- 2026-10-25: HTTP transport with tokens from day one, bound to localhost, because ChatGPT agents are coming and they can't reach a stdio server. When they arrive, a Cloudflare Tunnel or Tailscale Funnel exposes the same server. The database stays on this PC.
- 2026-10-25: Code lives in the `TaskManager` repo. The two skills live in `ai-toolkit/global/skills/` and reach the server by URL, so ChatGPT can get the same protocol text later.
- 2026-10-25: Database and nightly dump in `TaskManager/data/`, gitignored. The tracked history is the Markdown export in `proj-docs`.
- 2026-10-25: No global pip installs. A `.venv` in the repo with pinned `requirements.txt`. Port 8585; UE editors hold 8000 to 8006.
- 2026-10-25: A SessionStart hook in each project prints held and ready tasks, and fails quietly when the server is down.
- 2026-10-25: Import only the open items from the old Runner `TASKS.md`, keep IDs as `legacy_id`, and show the section-to-project mapping before writing. Dawn, Fury and Alpha stay out of v1.
- 2026-10-25: Approved up front: the Scheduled Task, the user-scope `claude mcp add`, the tokens file in my home folder, and the SessionStart hook in each project's settings.
