# Two-agent workflow: team and second-opinion skills

Date: 2026-11-05. Repo: `$AI_TOOLKIT` (ai-toolkit), branch `main`, head 31d6706, pushed. Installer rerun; junctions for `team` and `second-opinion` exist in `~/.claude/skills` and `~/.agents/skills`.

## Goal

Make Claude and Codex work in tandem inside T3 Code: one lead per task, the other vendor reviews at two points, and a single prompt ("get the team together") that interviews Mike, writes a plan of board tasks with a model per task, and runs it in a second thread with his checkpoints.

## Done

- `global/skills/second-opinion/` (58d6e31): `/second-opinion plan` before the first edit, `/second-opinion review` after the lead's own check. Runs the other vendor read-only through `delegate_task`; falls back to a handoff file.
- `global/skills/ask-mike/TWO-AGENTS.md`: "Working in tandem" and "Session cadence" sections; the rules the rest builds on.
- `global/skills/team/` (baef875): `SKILL.md` (ground, interview, plan, approve, launch), `TEAM-PLAN.md` (plan template, default models, child brief), `TEAM-RUN.md` (what the run thread does).
- `global/skills/ask-mike/T3-TASKS.md`: the 53-line guide. Glossary, the one prompt, the long-thread table, the "signs something is off" table.
- `global/AGENTS.md` (31d6706): the short form of the unslop rules inline, plus "use the question popup" for both agents. Done because Codex loads AGENTS.md every turn but rarely opens the unslop skill.
- Memory note `codex-side-by-side.md` updated with the Codex popup tool and `personality` setting.

## Not done

- No end-to-end run of `team` or `second-opinion` yet. The first real "get the team together" on a small piece of work is the test.
- Codex-led path unverified: whether `t3_thread_launch` and `delegate_task` work from a Codex thread, and whether T3 enables Codex's `request_user_input` popup. Fallbacks are written into both skills.
- Mike may add `personality = "pragmatic"` and `model_verbosity = "low"` to `~/.codex/config.toml` (above the first `[table]`). Not done by an agent because that file is outside the editable folders.

## Next step

Open a new thread on a project and run the prompt from T3-TASKS.md on something small. Note which step of `team/SKILL.md` misbehaves, fix the skill in ai-toolkit, commit, push, rerun `install.ps1`.

Mike's revised per-task prompt for a team run (Pieces, Decisions that are mine, Check with me after, Lead, By when) lives only in the chat reply of 2026-11-05. If it proves useful, add it to T3-TASKS.md under "One prompt".

## Suggested skills

- `team`, when Mike says "get the team together".
- `second-opinion`, for a single task's plan or result review.
- `writing-skills` and `unslop`, before editing any of the skill files.
- `task-board`, before creating tasks for the run.
