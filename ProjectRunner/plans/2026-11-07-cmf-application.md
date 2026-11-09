# CMF Prototyping application

Project: ProjectRunner, brief at $PROJ_DOCS/ProjectRunner/BRIEF.md
Lead: claude
Run thread: <t3-thread://v2/f570ea0b-5aec-4f9d-82cb-141046ccfbf3/mcp:3d3c5e45-1abe-4e7e-8a8a-29b9cd2e6b4f> (launched 2026-11-07)
Board parent: not on board. The task-board tools weren't available when this launched; Mike can link it to CMF-10 later.
Approved: Mike said go on 2026-11-07. Models as in the table. Tasks 1, 2, 4 and 6 start together.

## Outcome

Mike has the team submission list, his own list to fill, and every CMF document taken as far as it can go without him, in `C:\Prod\ProjectRunner\Admin`, ahead of the 2026-11-10 close.

Done when: all 15 upload documents and the Dialogue field text exist as Word, .xlsx or filled CMF PDF forms under `01-Upload` and `03-Dialogue`, with only `[MIKE: ...]` or `[NAME: ...]` fields and signatures left open; page and word limits pass on LibreOffice-converted PDFs; the budget recalculates to $240,000 with no template warning cells; the terms checks in C3 and C4 pass; and `Application-Tracker.md` states what each document still needs and who owns it.

Mike submits in Dialogue, signs, and sends everything himself. Nothing here sends mail or touches Dialogue.

## Decisions (Mike's, settled 2026-11-07)

- Team: Michael Brandt, Satomi Brandt, Dillan Schmitz and Brendan Hunter. Hamish Harrison, Mike Lohaus, Sarah Alonso and Matthew Freedman are off the application. Other roles are open slots Mike fills. This replaces the team in the 2026-10-15 decision.
- Story and scope: pitch from `design/gameplay-systems.md`, treated as approved for this application. Unnamed characters stay as roles. Marcus's backstory is a `[MIKE: ...]` field.
- AI: a short paragraph in the one place the CMF asks for it, naming the tools. Generated signs are described as prototype placeholders, replaced with hand-made art in the finished game, and kept out of support stills and video where possible.
- Motion capture: planned work, contracted sessions with a Canadian studio during the prototype. Not described as existing.
- Hand-made statement: characters, music and voice acting in the finished game.
- Technical development is described as focused on existing project assets, motion capture and procedural tools.
- Dates: 2027-03-01 to 2027-11-30, 9 months.
- Money: $240,000 total. CMF $180,000 (75%). Applicant investment $20,000 cash. Shareholder deferral $40,000, Michael on T4 payroll. Sweat equity and loans are not financing lines.
- Brendan Hunter: key personnel. Prototype is fully voiced. He covers casting, voice direction and consulting, and acts in a role.
- Past applications and past files are read-only. New files go in `C:\Prod\ProjectRunner\Admin`.

## Contracts

### C1. Paths

Root: `C:\Prod\ProjectRunner\Admin\CMF-2026-27\`

| Folder | Holds |
|---|---|
| `00-Lists\` | `Team-Submissions.docx`, `Brendan-Hunter-Packet.docx`, `Michael-To-Fill.docx`, `Application-Tracker.md` |
| `01-Upload\` | One file per CMF document, named with the CMF list's document name |
| `02-Support\` | Support material inventory, cleared stills, stills PDF |
| `03-Dialogue\` | `Dialogue-Fields.docx` |
| `04-Notes\` | One `<doc>-notes.md` per upload document: sources and open questions. Upload files stay free of notes. |

`Admin\.gitignore` contains `*`, so nothing here enters ProjectRunner git (PERSONA-IDs, bank and payroll data). The lead creates it first. No commits to the ProjectRunner repo: it is on `gasp-walkthrough` with another session's uncommitted maps.

Source paths moved. Where `cmf/requirements.md` and `cmf/drafts/` say `_past-applications\`, read `C:\Users\GameDevPC0403\Documents\Development\CMF\Applications\CMF\`. Where they say `2026-ProjectCyberRunner\2026-06-15\`, read `2026-ProjectCyberRunner\2026-06-15-prototype - Ineligible\`. Rules are in `$PROJ_DOCS/ProjectRunner/cmf/requirements.md`, with sources in `C:\Users\GameDevPC0403\Documents\Development\CMF\prototyping-program-*`.

### C2. Document format

Word `.docx` via python-docx. Arial 11.5 pt, black on white, one column, 1-inch margins, no branding. Budget stays on the CMF template. The Attestation, Statement, Community Engagement Plan and Sustainability Plan are the official fillable CMF PDFs. Verify limits by converting with `"C:\Program Files\LibreOffice\program\soffice.exe" --headless --convert-to pdf` and counting pages. Office is not installed, so state that LibreOffice page counts may differ slightly from Word and leave a margin of at least a quarter page on any document at its limit. Prose follows the `unslop` rules.

### C3. Story canon and banned terms

Source: `$PROJ_DOCS/ProjectRunner/design/gameplay-systems.md`, sections "Summary", "Mike's answers", "Mike's demo rulings", 1 to 9, and "CMF hand-off". Read it fresh: another thread owns and updates it. Do not edit it.

Lead: Marcus, who fled the City of Lights and hides in The Hive, running a secret clinic, the Hidden Room. The Medis are a medical cartel posing as the hospital services. The Scavengers. Five episodes, about 30 hand-written patient cases, three endings. Title on every document: "Project Runner".

Must not appear in any file under `01-Upload` or `03-Dialogue`: Chase, Roberts, Tether, Tollmen, Sifter, Dace, Juno, Ilse, Aeon, NoWhere, ledger, "six rules", "silent option". Vex appears only if `gameplay-systems.md` still uses the name. Claims listed as displaced in the CMF hand-off stay out.

Allowed only where accurate history or licensing needs them: Hamish, Lohaus, Alonso, Freedman and DeBona as past contributors to Dawn or Silence in Team Description and History, never as Project Runner team; StoryFlow, the GASP sample and the UEFN mannequin in the History licence list. Task 7 lists each such hit and checks it, rather than expecting zero.

### C4. AI wording

The term appears only under one heading, "Generative AI use and tools", at the end of the Originality document, and in that document's notes. Everywhere else in `01-Upload` and `03-Dialogue`, zero matches for `\bAI\b`, "artificial intelligence", "generative", "machine learning". The story role "AI Companion" is written "the Companion" in all application documents.

Paragraph, as short as it can be while naming every confirmed tool and use. The CMF asks for any use, so accuracy beats brevity if a new use turns up:

> ChatGPT (OpenAI) produced source images for placeholder signs in prototype environments[MIKE: name the generator used for the kit sign modules and parallax pack]. These are replaced with hand-made art in the finished game. Claude Code (Anthropic) assists with code, tool scripts and first drafts of documents, all reviewed and edited by the team. [MIKE: name Cascadeur inbetweening if it stays in the animation path.] Characters, music and voice acting in the finished game are made by people. Phantom Break Inc. owns the original IP, developed by Canadians; licensed third-party assets are listed in the History.

The sentence "does not use generative AI" from draft 09 does not carry over. No document says "all art is hand-made". The hand-made claim is limited to characters, music and voice acting.

### C5. Team roster

Exact names and titles, identical in Dialogue, the budget and the team description.

| Person | Title | Budget line |
|---|---|---|
| Michael Brandt | Producer and Creative Director | 01.05, 04 Creative Director |
| Satomi Brandt | Project Manager | 04.05, related party |
| Dillan Schmitz | Composer and Sound Designer | 07 Audio |
| Brendan Hunter | Voice and Casting Director | 08 Talent, 10 Consultant |
| `[NAME: Lead Programmer]` | Lead Programmer | 06 |
| `[NAME: Art Director]` | Art Director | 04 |
| `[NAME: Character Artist]` | Character Artist | 05 |
| `[NAME: UI/UX Designer]` | UI/UX Designer | 05 |
| `[NAME: Marketing Lead]` | Marketing Lead | 10.57 |

Open slots are proposals; Mike decides which stay at the task 1 checkpoint. The rules neither allow nor forbid vacancies, and they require real names, current CVs and PERSONA-IDs for key personnel. So a slot still open at submission is described honestly as a role to be contracted, is not presented as part of the assembled team, and is kept out of Dialogue key personnel unless the CMF says otherwise. Fill as many as possible first: the CMF does not accept material changes after applying. The motion capture studio and voice cast are suppliers, not team members. Pronouns are not stated for anyone until that person confirms them.

### C6. Money and dates

Budget $240,000. CMF advance $180,000. Applicant investment $20,000. Deferrals $40,000. Period 2027-03-01 to 2027-11-30. CMF pays 80% ($144,000) on agreement and 20% ($36,000) after closing documents.

Deferred salary is an unpaid cost, so on cash terms $200,000 goes out against $164,000 in ($144,000 CMF plus $20,000 cash), a $36,000 gap before financing costs, until the holdback arrives. Task 5 calculates this month by month with real salary payment dates, and says plainly if any deferred amount would actually be paid before the holdback. Reviewers marked down a deficit in 2024, so the cash flow must show the bridge and never go below zero. RD p.3 limits the cash flow to the prototype period while the template's Instructions allow columns up to the last CMF payment: flag that conflict to Mike rather than assuming one. Bridge borrowing is not a financing source. It needs its drawdown, repayment and cost shown, a cost on line 15.65, and a bank letter. The bridge source is `[MIKE: ...]`.

Rules: producer line at most 10% of B+C; overhead at most 10%; contingency at most 10%; marketing 10% to 25% of B+C, inside the period, at least 50% Canadian; at least 75% Canadian costs overall; one management line per person; market salaries, hourly, weekly or monthly for internal and related lines; equipment prorated; no localization; Michael's budgeted salary must be at least the $40,000 deferred. Uncertified final cost report applies, so no review engagement line.

### C7. Prototype scope

From the "CMF hand-off" section: 20 to 30 minutes measured by a timed playthrough; four locations; eight speaking roles outside the fight, 11 or 12 characters in total; two treatment cases (the Fighter and one cheap case); ring hack on the Fighter's two locks and one door; chair fight only for QTEs; four intelligence routes on the Fighter fact; specialty pick with a few upgrades and one spec option; two playtest rounds with a choice log; the five proof questions in the hand-off. The prototype is fully voiced, by actors. Motion capture sessions drive the cinematic and chair fight performance.

### C8. Evidence

Every fact comes from a file or a cited web source. A fact that needs Mike or a team member becomes a `[MIKE: ...]` or `[NAME: ...]` field, never an invention. Existing work is described as existing only if a file shows it, and game systems exist today as web demos and Unreal levels, not as an integrated Unreal build. Motion capture and hand-made final art are future tense.

### C9. Do not touch

Anything under `Documents\Development\CMF`, `$PROJ_DOCS/ProjectRunner/cmf/`, `design/`, `pitch-plan.md`, `story/`, any Unreal project or editor, Houdini scenes, the Dialogue portal, email.

## Tasks

| # | Task | Done when | Writes | After | Model | Effort | Board id |
|---|---|---|---|---|---|---|---|
| 1 | Team submission list, Brendan packet, Mike's list to fill (including assets), tracker | The 3 Word files and the tracker exist. Every CMF document and record from requirements section 3 appears in the tracker with one owner: CVs, licences, corporate records, PERSONA-IDs, bank letter, signed budget Summary. Every open-slot row names its CV and PERSONA-ID needs. Team items return by end of day 2026-11-08; bank and accountant items by noon 2026-11-09. | `00-Lists\*`, `Admin\.gitignore` | - | claude-sonnet-5-5 | high | |
| 2 | Pitch rewrite: Originality, Detailed Project Summary, Dialogue fields | OCA is 5 pages or fewer and Summary is 1 page, by PDF. The Dialogue description is 2,000 characters or fewer, by count. C3 and C4 checks pass. | `01-Upload\Originality-Creativity-and-Advancement.docx`, `01-Upload\Detailed Project Summary.docx`, `03-Dialogue\*`, their notes | - | claude-fable-5-1 | high | |
| 3 | Team Description, combined CVs, History, and the four official CMF forms filled in | Team Description is 5 pages or fewer and History is 1 page, by PDF. The official fillable PDFs for the Attestation, Statement, Community Engagement Plan and Sustainability Plan are filled, with signatures left for Mike, and read back with field values shown. Statement and plan answers are 300 words or fewer, by count. CVs for Michael, Satomi and Dillan are redrafted from the newest files in the shared format, with `[NAME: ...]` fields. C3 and C4 checks pass. | `01-Upload\Team Description.docx`, `History.docx`, `Curriculum Vitae.docx`, the four filled form PDFs, their notes | 1 | claude-sonnet-5-5 | high | |
| 4 | Market Study and Revenue Model with sourced sales figures | Each is 2 pages or fewer by PDF. Both use the same comparison games, and each figure has a source URL in the notes. | `01-Upload\Market Study.docx`, `Revenue Model Description.docx`, their notes | - | claude-sonnet-5-5 | high | |
| 5 | Budget and cash flow on the 2026-27 template, financing letters, Financial Stability | LibreOffice recalculation of a copy shows a $240,000 total, zero warning cells, and a cumulative cash position at or above zero. A before-and-after comparison shows template formulas, data validations, sheet protection, drawings, print areas and cash flow allocations are preserved. If a script can't preserve them, the deliverable is a line-by-line entry sheet for Mike to key in, and the task says so. Financing lines match C6. Financial Stability is 1 page by PDF. | `01-Upload\Budget and Cashflow.xlsx`, letters A and B, bank letter template, `Description of the Applicants Financial Stability.docx`, their notes | 1 | claude-fable-5-1 | medium | |
| 6 | Support material inventory, signage check, cleared stills PDF | A table lists every existing video and still with a pass or fail against generated signage, based on frames actually viewed. Passing stills are in a PDF under 25 MB with no text pages. Capture and hosting steps for Mike are in `Michael-To-Fill` via the lead. | `02-Support\*` | - | claude-sonnet-5-5 | medium | |
| 7 | Cross-check all documents | The lead runs and pastes: names and titles against C5, every dollar against the budget, dates against C6, page and word limits, C3 and C4 terms with each allowed exception listed. The tracker is updated. | `00-Lists\Application-Tracker.md` | 2,3,4,5,6 | lead | - | |

## Checkpoints

| After | Kind | Why |
|---|---|---|
| plan | required | Mike's go |
| task 1 | required | Mike asked to check after the team list and asset list. He decides which roles stay and what to add. Tasks 3 and 5 wait for this, because the roster sets the team document and the budget lines. Tasks 2, 4 and 6 start alongside task 1 and don't wait, because of the deadline. |
| task 2 | recommended | The pitch carries 60 of 100 points with a 45 gate |
| task 5 | recommended | Budget size versus scope, and the $36,000 bridge |
| end review | required | Mike checks the proof, then edits, signs and submits |

## Budget

6 child agents, 2 reviews (Codex plan critique, Codex end review). Task 7 is the lead.

## Risks

- Three days to close, over a weekend (today is Saturday; the close is Tuesday). Team names, CVs, bank statement, statements and signatures all depend on people. Time of day for the close is not published, so aim to submit on Monday 2026-11-09, with Tuesday as the reserve for upload failures. Open slots at submission cost Team points, and the CMF will not accept material changes after applying.
- $240,000 may not cover nine months of market-rate work, voice and motion capture. Task 5 reports the gap and what to cut rather than lowering rates.
- OCA gate. 2024 scored exactly 45, and reviewers called procedural tools and engine features standard. Mike's technical focus goes in the technical section. Originality has to come from the design (clinic loop, ring hack, four routes, no-fail fights).
- "Made by hand" and character sources. Filenames show `BaseMetaHuman_01` and `metahuman-test-01.fbx` in the character sources, and how the cast was first modelled is not documented. Mike confirms on his list.
- Generated signs may be visible in existing captures. Task 6 checks by viewing frames. If most footage fails, Mike needs new captures, and the Unreal bridge is down and another session holds the editor, so that is his step.
- June 2026 folder is labelled "Ineligible". Mike confirmed on 2026-11-07 that the reason was the new-applicant rule for Conceptualization, so this application is unaffected.
- Bought packs, script-built kits and third-party motion libraries are not hand-made. History names them, per the rights rule, and third-party licence agreements must be attached (RD p.3).
- Whether the Phantom plugins count as proprietary technology ($2M E&O insurance) is unconfirmed. On Mike's list as a question for the CMF.

## Second opinion (Codex gpt-6.1-sol, 2026-11-07)

Accepted: official forms get filled (task 3), the eligibility check moves up front, CVs and other uploads each get an owner, open slots are described honestly (C5), C4 rights wording and C3 exceptions, spreadsheet preservation proof (task 5), and independent drafting starts now with earlier return dates. Accepted in part: the cash gap is $36,000 on cash terms. Codex's $76,000 figure applies only if deferred salary is paid before the holdback, which a deferral by definition is not, so task 5 reports it if the schedule ever does that.

## Progress

Board tools did not load, so this list is the tracker. `Admin\.gitignore` written and checked with `git check-ignore` on 2026-11-07; output folders created.

- [x] 1 Team submission list, Brendan packet, Mike's list, tracker (done 2026-11-07. Proof: 4 files in `00-Lists`; tracker checked against requirements section 3 with one owner per row; forwardable files have no PERSONA numbers, dollar figures or removed names. Lead fixed one pronoun in `Michael-To-Fill`.)
- [x] 2 Pitch rewrite (done 2026-11-07. Proof: OCA 5 pages, Summary 1 page, Dialogue description 1,597 characters; terms check 0 disallowed hits, AI only under its heading. Lead edited three sentences for C3, C8 and the technical-focus decision, and rechecked pages.)
- [ ] 3 Team, history, forms and CVs (running since 2026-11-07, claude-sonnet-5-5 high)
- [x] 4 Market and revenue (done 2026-11-07. Proof: 2 pages each with over 40% of the last page free; same five games in both; each sales figure mapped to a URL in the notes; terms check 0 hits. Price, units and the store fee are assumptions, marked.)
- [ ] 5 Budget, letters, financial stability (running since 2026-11-07, claude-fable-5-1 medium)
- [x] 6 Support material (done 2026-11-07. Proof: 79-row inventory; 8-page stills PDF, 2.4 MB, no text; lead viewed all 8 stills and found no signage-library sign. Group passes rest on contact sheets, and 5 rows are "not viewed, not cleared". No existing video is usable, so new captures are Mike's step, now in `Michael-To-Fill` section 10. PDF placed at `01-Upload\Support Material.pdf`.)
- [ ] 7 Cross-check

Task 1 checkpoint, Mike's answers 2026-11-07:

- Lead Programmer, Art Director and Marketing Lead stay. Character Artist and UI/UX Designer stay only if Mike has a name by end of day 2026-11-08.
- An open Lead Programmer or Marketing Lead is a contracted role at a market rate, described as a role to be contracted.
- Michael keeps both 01.05 and 04 Creative Director. The producer cap at 10% of B+C is under $24,000, so the $40,000 deferral can't fit on 01.05 alone.
- Mike is checking Dialogue today for the eligibility items, including whether files 324630 and 330815 are closed. Tasks 3 and 5 started without waiting for that.

- Generated signs: any still showing one fails. Video avoids them where possible, with timecodes listed, and the Originality document discloses the placeholders. This narrows the brief's 2026-10-15 and 2026-11-02 bar for this application.
- Cash flow columns run to the holdback month, with those after 2027-11-30 marked. The question stays in the draft email to the CMF.
- Titles: President and Director on the declaration and attestation; Producer and Creative Director on team documents, the budget and Dialogue.
- Project Echo: Mike checks Dialogue today. The fields stay `[MIKE: ...]` until then.
