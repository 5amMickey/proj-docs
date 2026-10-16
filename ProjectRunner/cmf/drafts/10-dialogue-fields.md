# 10 Dialogue form fields (draft)

| | |
|---|---|
| CMF document | The Dialogue application form for CMF IDM Prototyping 2026-27 (RD p.8-11). Not an upload. Each section below is one form field. |
| Limits | Description: 2,000 characters. Other fields are picklists or short text. The schedule's start date can't be more than 3 months before the deadline, and start and end must match the budget period (RD p.11 Appendix 2). Choosing English-French means the prototype must be delivered in both languages (RD p.9). The website URL is mandatory (RD p.8-11). |
| Length of this draft | Description: 1,718 characters with line feeds, counted with `wc -m` on 2026-10-15. Dialogue may count each line break as 2 characters, which gives about 1,734. |
| Sources used | `cmf/requirements.md` (sections 1, 3, 6, 7); `2026-27_idm-definitions.pdf` p.2 (content types and delivery methods, read 2026-10-15); `IDM_Required-Documents_Prototyping-26-27-3.pdf` p.11 (schedule rules; pages 8-10 are images and were read through requirements.md); 2024 Dialogue snapshot (`2024-ProjectSilence\2024-06-18\Complete Application _ Compléter la demande - Project Dawn.pdf` p.1-4) for field names and the 2024 answers; `pitch-plan.md`; `story/one-pager.md`; `09-originality-creativity-advancement.md`; `15-market-study.md` (go-to-market list only). |
| Status | First pass, 2026-10-15. |

## Needs Mike

1. Website URL. Put your URL in the website field. The 2024 form used phantombreak.studio. The landing page is being built in `C:\Prod\ProjectRunner\Web\`.
2. Language. The draft says English. In 2024 you chose English-French, which under the 2026-27 guide would mean delivering the prototype in French too.
3. Dates. The draft proposes 2027-03-01 to 2027-11-30 (9 months). The 2023-24 decision came about 3.5 months after submission, which puts a decision in late February 2027 if you submit in early November. An earlier start is allowed (up to 3 months before the 2026-11-10 deadline), but costs before the CMF agreement are at your risk. The budget's cash flow must use the same dates.
4. Prototype scope. Confirm the materials list (6 scenes, 25-30 minutes, 6 characters). It is what the CMF checks at final costs.
5. Voice. Voiced lines or text-only in the prototype?
6. Production program. Dialogue asks whether production targets Innovation and Experimentation or Commercial Projects (RD p.9). 2024 picked Innovation. The draft suggests Commercial Projects, because the case rests on design and a premium sales plan rather than new technology. Your call.
7. Sovereignty- and Equity-Seeking Communities question. It's statistical only. Answer from the story as approved. If you pick "Persons with disabilities", that matches the prosthetics theme and the consultant in the Community Engagement Plan.
8. Distributor and market channel partner. The draft lists Steam only. 2024 also named Epic, GOG and Humble, and Bow Valley College as a market channel partner.
9. Steam Next Fest. The October 2027 Next Fest dates aren't published. The schedule assumes one runs in October.
10. Story canon: the description uses the one-pager's draft story (see the list under the description).

## Fields

### Business model

Premium.

### Content type

Game. (DEF p.2: "requires a high level of interaction from the user ... rules, progression, rewards and/or other playing features".)

### Delivery method

Application - Native. DEF p.2 names Steam installs as an example of this method. The 2024 form used "Downloadable - Offline", which DEF now describes as a fallback for content that fits no other category.

### Commercial distribution method and distributor

Online Stores. Distributor name: Steam. [Add others only if the revenue model counts them.]

### Language

English.

Choosing English-French would oblige Phantom Break to deliver the prototype in both languages (RD p.9). Localization belongs in the production budget (2024 reviewer feedback), so the prototype is English only.

### Website URL

[Mike's URL]

### Target audience

General public - Adult (Canadian Cultural Sector). This was the 2024 choice. The Children and Youth points (PG p.8) don't apply to an adult story.

### Description (2,000 characters max; this draft is 1,718)

> Project Runner is a side-on cyberpunk narrative game in five episodes for PC, made in Unreal Engine 5.8 by Phantom Break Inc. in Calgary.
>
> Chase Roberts, a medic trained in cyberware, slips into NoWhere, a lawless city with no medical care, and opens an unlicensed clinic in a fixer's back room. Every salvaged implant that reaches his table carries the Tether, a shutdown routine from Aeon, the city across The Wastes. Chase strips it out one hack at a time and tells no one why he knows how. He wrote it. Over five episodes the gang that takes a cut of every implant closes in, Aeon switches the Tether on, and the patients Chase treated, lied to or turned away decide who stands with him.
>
> The player walks through side-on streets and rooms, looks at and uses objects, hacks devices and makes timed dialogue choices on three buttons, with silence as the default when time runs out. The game is built on six rules:
>
> - No morality meter. A ledger on the clinic desk records who Chase treated, who paid and who he turned away, and it decides who helps him later.
> - Each completed hack plays a short piece of Chase's past.
> - What the player looked at adds options to later conversations.
> - Each character counts trust and silence separately.
> - Treated patients wear a marker in the street crowd.
> - Automatic crouch zones put Chase where he can overhear the gangs.
>
> The look is HD-2D: full-colour textures pixelated at the end, in lit 3D scenes seen side-on, with wet streets, fog and neon.
>
> The prototype is Episode 1, about 25-30 minutes over 6 scenes, built over 9 months and tested in three playtest rounds with a choice log. It runs on two plugins Phantom Break wrote for this game, which its next game will reuse.

Draft story elements in this text, from the one-pager: the clinic in a fixer's back room, Chase writing the Tether, the Tether as Aeon's shutdown routine, the gang that takes a cut (the Tollmen), Aeon switching it on, and all six rules. If Dialogue strips the bullet characters, replace them with plain line breaks; the count stays under 2,000.

### Materials to be delivered at the Final Costs stage

Proposed. Paste as a list.

- A playable Windows PC prototype build of Episode 1, "Intake" (draft): 25-30 minutes from start to finish, in the HD-2D look.
- 6 scenes: the edge of The Wastes; the night street and Vex's back door; the Tollmen lockup; Vex's back room; the first clinic shift with two patients; the scrap docks (draft).
- 3 branch cutscenes for the Episode 1 choice (truth, lie, silence), plus a backstory insert for each hack.
- 6 characters: Chase Roberts, Vex, Vhoori, Juno Reyes, a Tollmen collector and a second patient (draft). About [250-350] lines of dialogue, [voiced / text-only].
- At least 6 timed dialogue choices, each with a silent default.
- Systems:
  - look/use interactions with the lead's comments
  - hold-to-hack with backstory inserts
  - automatic crouch zones with overheard conversations
  - side-on follow camera and locked camera zones that keep stick direction across cuts
  - timed X/Y/B dialogue choices with defaults
  - dialogue options unlocked by what the player looked at or overheard
  - per-character trust and silence counts
  - the clinic ledger
  - patient markers on background walkers
  - scene streaming and checkpoint saves
  - a choice log for playtests
  - accessibility options: choice timer length with an untimed mode, subtitles, input remapping, colour-blind-safe markers
- The two shared Unreal plugins, PhantomInteraction and PhantomStory, at a tagged version in the studio's Git repository.
- An updated game design document.
- The Episode 1 script and a five-episode story outline.
- A playtest report covering three rounds, with choice-log results against the targets in the Originality document.
- A production plan, schedule and budget for the full game.
- A Steam store page with wishlist counts at the end of the prototype.
- The Community Engagement Plan and Sustainability Plan reports.
- The final cost report.

### Schedule

Dialogue needs only the first two lines (RD p.11). The marketing line follows the 2024 form. The milestones are for the budget, the cash flow and the team description, and can be added as extra lines if Dialogue allows.

| Item | Date | Description |
|---|---|---|
| Prototyping | 2027-03-01 | Prototyping start |
| Prototyping | 2027-11-30 | Prototyping end |
| Marketing and promotion | 2027-03-15 | Marketing start: Steam page live with the vertical slice trailer |

Milestones (proposed):

| Milestone | Due | What is done |
|---|---|---|
| M1 Pre-production | 2027-03-31 | Episode 1 script draft 1. Scene list and grey-box layouts for the 6 scenes. Playtest plan and choice-log format. Art director contracted. Look locked from the pitch look test. Steam page live. |
| M2 Systems in grey-box | 2027-05-31 | All systems in the materials list run in grey-box. Episode 1 plays start to finish with placeholder text. Playtest round 1: the team plus 8-10 outside players. |
| M3 First look pass | 2027-07-31 | 3 of 6 scenes in the final look. Music and sound in 2 scenes. Script draft 2 after the consultants' review. Playtest round 2: 20-25 outside players in Calgary. |
| M4 Content complete | 2027-09-30 | All 6 scenes in the final look. 3 branch cutscenes. All lines in [voiced / text-only]. 60 fps at 1080p on the target PC. Demo of the Episode 1 opening ready for Steam Next Fest. |
| M5 Public test | 2027-10-31 | Playtest round 3: Steam Next Fest demo, October 2027 [dates not published], plus one moderated session. |
| M6 Final | 2027-11-30 | Final build, playtest report, game design document, Episode 1 script, five-episode outline, production plan and budget, Community Engagement and Sustainability reports. Final cost report prepared. |

## Notes

- Matthew Freedman's design reviews (team description) fall at M2, M3 and M4.
- The market study's go-to-market list puts the Steam page in the first month and one Next Fest with the Episode 1 opening. The schedule follows both.
- Key personnel in Dialogue must use the same names and roles as `05-team-description.md` and the budget.
