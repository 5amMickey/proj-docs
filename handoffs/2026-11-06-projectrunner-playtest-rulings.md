# ProjectRunner gameplay: after Mike's play-tests

## Goal

Turn Mike's play-test notes into approved gameplay systems, then hand the design to the build. Mike rules on each demo: keep, change or cut. No gameplay work in UE during this phase.

## Start here

1. Read `ProjectRunner/BRIEF.md`.
2. Read the plan: `ProjectRunner/plans/2026-11-05-gameplay-systems.md`. Its dated "(Mike, 2026-11-06)" notes are the latest rulings and overrule the proposal.
3. Apply Mike's play-test notes. Ask with the question popup only where a note leaves a real choice.

## Done

- Proposal: `ProjectRunner/design/gameplay-systems.md`. It does not yet include the demo rulings.
- Demos, linked from `ProjectRunner/design/gameplay-demos/index.html`: treatment, QTE fight, dialogue and spec option, Fighter case, week, and the ring hack in `ProjectRunner/design/ring-hack-prototype/`.
- Last check: `node --test` in `gameplay-demos` passed 84 of 84. Simulated runs of the week demo had no page errors. Before Mike's session, no demo had been checked in a real browser or on a controller.

## Settled on 2026-11-06

- An XP bar replaces reputation and the episode skill points. Failures, including abandoning people, cut it. Levels never drop.
- Each level gives one shop or body upgrade, and level sets the daily materials.
- Time is counted as actions per day, not a clock, starting at 3 days with 3 actions each. Story-critical cases never expire. This means about 30 cases, not 15.
- If the malware stays in, the Fighter dies, even if told, and a rumor can blame Marcus.
- If it is removed, Marcus can bet on him, staking a favor owed to the Scavenger Leader. A win buys both their freedom from the gang leader.
- The AI Companion and the paid human hacker are separate characters.

The week demo's patients, XP values, upgrades and prices are placeholders. Its lead calls, such as story patients taking 2 actions, are flagged in the plan and need Mike's ruling.

## Next, in order

1. Fix and tune the demos from Mike's notes. Change only what the notes ask for.
2. Log each ruling in the plan, including the ring hack search step.
3. Replace reputation with XP in `treatment.html`, `fighter.html` and `demo-core.js`.
4. Fold the rulings into `gameplay-systems.md`: rewrite sections 7 to 9, the Fighter case and the cost check.
5. After Mike approves the concept, write the build hand-off and make the `BRIEF.md` changes he approves (plan tasks 5 and 6).
6. Do the CMF rewrite as a separate pass. The drafts in `ProjectRunner/cmf/drafts/` still carry the rejected Chase and Tether story.

## Repo and files

Repo: `proj-docs`, branch `main`. Nothing below was committed at hand-off. Other uncommitted work in the repo belongs to other sessions, so stage these paths by name.

Modified:

- `ProjectRunner/plans/2026-11-05-gameplay-systems.md`
- `ProjectRunner/design/gameplay-demos/`: `demo-core.js`, `demo-core.test.js`, `dialogue.html`, `fighter.html`, `index.html`, `shared.css`, `shared.js`, `treatment.html`
- `ProjectRunner/design/ring-hack-prototype/`: `HOW-TO-TEST.txt`, `hack-analytics.js`, `hack-analytics.test.js`, `hack-core.js`, `hack-core.test.js`, `index.html`

New:

- `ProjectRunner/design/gameplay-demos/`: `chip-icon.png`, `week-core.js`, `week-core.test.js`, `week.html`
- `handoffs/2026-11-06-projectrunner-playtest-rulings.md`

Add logic to the core files and test it with `node --test`. Don't use `preview_*` tools to check your own edits unless Mike asks.

## Suggested skills

- `unslop`: for all writing.
- `task-board`: RUN-181 to RUN-187 track this work.
- `grilling`: only if Mike asks to stress-test a ruling.
