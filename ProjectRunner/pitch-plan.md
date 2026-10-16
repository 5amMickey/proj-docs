# ProjectRunner pitch plan: deck, CMF Prototyping, demo and trailer

Drafted 2026-10-15. Status: decisions in, work started 2026-10-15.

## The deadline

The CMF Prototyping Program's final 2026-27 intake opens 2026-10-27 and closes 2026-11-10 (cmf-fmc.ca/program/prototyping-program, read 2026-10-15). That leaves 26 days. Aim to submit by 2026-11-06 so a Dialogue upload problem doesn't cost the intake.

Prototyping money pays for building the prototype. The application doesn't need a finished prototype. It needs a strong case plus support material, and the CMF wants ProjectRunner video on links that stay live for 5 months. So the demo for this deadline is a short vertical slice we can film, not the full G1 milestone.

## What we have

| Area | State | Source |
|---|---|---|
| Playable | G1 grey-box blockout: walk, crouch zone, look/use, hold-to-hack, Vex timed choice, cutscene by choice. Tests passed 2026-10-02. UEFN Mannequin only. No recordings. | `C:\Prod\ProjectRunner\Unreal` |
| Look | HD-2D decided. Nothing in engine in that style yet beyond the vending machine preview. | BRIEF decisions 2026-10-08 |
| Environment tools | `cyber_facade`, `env_city_generator` 2.0, `env_derelict_corridor` 2.0 in HoudiniSource | `docs/reviews/runner_tools.md` |
| Owned UE packs | Big Slum Alley, Cyber-Town, Cyberpunk City, Neon Point, Downtown Alley, City Sample | `assets/packs_unreal.md` |
| Asset pull | NYC Alley (`70NYCAlley.rar`), Cyberpunk Rooftop Market, Floating Slums, LP Cyberpunk City, `building-examples` FBX, autoRig 2.0. Coloso course files are study only. | `asset-pull-index.md` |
| Story | Split. Repo has Runner, Vex, Vhoori (placeholder). The June 2026 concept doc "Project Echo" has Chase Roberts, a runner with a cyberware clinic, in the city NoWhere. No synopsis or episode outline. | `Story/G1_build`, `CMF/_past-applications/2026-ProjectCyberRunner` |
| Art bible | Affinity files only (`art-bible.af`), not exported | same folder |
| Pitch formats | Project Silence decks (PDF, incl. 3-minute version), Dawn art bible | `CMF/_past-applications/2024-ProjectSilence` |
| CMF rules | Max 75% of eligible costs or $250,000, a repayable advance. 15 uploads plus company records. Originality and creativity is 60 of 100 points and must reach 45 or the rest isn't scored. | `cmf/requirements.md` |
| Visual targets | Replaced, The Last Night. Whole frame on a pixel grid, about 4-6 screen px per pixel at 1080p. 75 s trailer beat sheet. | `refs/visual-reference.md`, `refs/frames/` |

## Workstreams

### A. Foundations (Oct 15-20)

Everything else depends on these.

1. Title locked as Project Runner. Canon draft in `story/one-pager.md` (Echo base, Vhoori and Vex in the cast).
2. Write a one-page story: logline, the lead, the city, the five episodes in a line each, and what choices change.
3. Look test in UE (`L_LookTest`): one side-on street shot with three pixel treatments (textures only, whole-screen grid at 640x360, at 480x270), each with the camera depth effect, plus one without it. Renders in `refs/wip/looktest/`. Mike picks one.
4. Team, budget size and financing source, so the budget and team docs can start.

### B. Vertical slice and video (Oct 18-Nov 5)

One scene, about 60-90 seconds of play, filmed in the final look.

1. Scene: a night street that leads into one interior, both side-on. Houdini city and facade pieces plus owned pack props. The UEFN Mannequin plays the lead.
2. Bring in the G1 systems that already work: follow camera and camera zones, look/use, the hack terminal, the Vex conversation with a timed choice, and both cutscene branches.
3. Lighting: wet street, volumetric fog, neon, following `visual-reference.md`.
4. Capture: a 2-3 minute gameplay video with both choice branches, plus cinematic shots from Sequencer.
5. Edit a 60-75 s teaser from the beat sheet in `visual-reference.md`. Host both videos unlisted, on links that will stay live for 5 months.

### B2. Trailer route (Mike, 2026-10-16)

Five areas, filmed as one walk in a C shape. Each area is its own map, so it can be played or filmed alone. All five share one world layout and also stream from `L_TR_Persistent`. The camera stays on the same side throughout, at the framing Mike set in `L_LookTest` (90 degree FOV, 6.6 m, level), with treatment A.

| # | Area | Walk | What's in it |
|---|---|---|---|
| 1 | Wasteland | right to left | Broken buildings behind, trash and abandoned tech, grime. Thunder in the distance; rain starts partway and gets heavy. Fliers fly past, Rovers run past, the Spider Mech walks in the far distance. Ends at a large wall; the lead stands at a huge gate that opens to a white-out transition. |
| 2 | Waystation and market | right to left | A tech warehouse with piles of tech for repurposing, leading into a market of stacked shipping containers. Some containers are storefronts, possibly on more than one level. |
| 3 | Food alley | away from camera | The camera swings behind the lead and follows. People eating, drinking, going about their business. |
| 4 | Red-light district | left to right | Shops and brothels. Suggestive only: neon, curtained doorways, figures in lit windows, no nudity, no readable sign text. |
| 5 | Station market | left to right | A market inside a train station. |

Layout in world cm (camera looks along -Y, screen right is +X): areas 1 and 2 on the front street (Y 0), area 3 running back from its left end, areas 4 and 5 on the back street (Y -7000).

Decisions (Mike, 2026-10-16):

- Mechs are Mike's three rigged blockout models (`charMech_Flier_01`, `charMech_Rover_01`, `charMech_Spider_01`), placed as they are for now.
- Crowds are UE5 and UEFN mannequins with idle, sit and talk animations.
- The areas are film sets. They're walkable along the route and dressed only where the camera sees. All five get blocked out first, then dressed one at a time, starting with the wasteland.
- The red-light district stays suggestive (above).

Packs to draw from (owned; no AI-made textures, no Coloso course files, no unlicensed Sketchfab downloads):

| Area | Packs |
|---|---|
| 1 | Future Slums (Leartes), Junkyard and Unfinished Building (Megascans FBX), Industrial VOL.1 Worksite, Construction Site, Military Base (wall, gate). Houdini `env_city_generator` for the ruined skyline. |
| 2 | Warehouse, Warehouse Environment, Storage House, Modular Container Houses, Cyberpunk Rooftop Market (Leartes). |
| 3 | Neon Point, Rooftop Market food props. |
| 4 | Big Slum Alley (in the project), Cyber-Town, Cyberpunk City. |
| 5 | CCA Subway Train Terminal, Underground Subway, Modular Urban City (train station). |

Open items:

- The food alley uses a second follow camera behind the lead through a camera zone. `PNFollowCamera` makes whichever camera begins play last the default, and actors begin play in spawn order, so the builder spawns the behind camera first. That works in a single map. A "zone-only" flag on `PNFollowCamera` (C++ in PhantomInteraction, editor restart) would make it safe when areas stream together.
- The follow camera follows depth along its own forward axis, so a pitched camera sinks or rises as the lead moves in depth. Keep follow cameras level.
- The gate's white-out needs a white fade. The transition stage fades to black today.
- Rain, lightning and thunder: Niagara rain plus timed light flashes. Thunder audio isn't found yet.

### C. Pitch deck (Oct 22-Nov 3)

Around 14 slides, built on the Silence deck's structure, using only in-engine captures from B:

title, logline, the hook (what's different), the lead and the city, how a scene plays, choices and consequence, look (HD-2D with refs), five-episode structure, the systems shared with ProjectSilence, market and comparables (Dispatch, Life is Strange, Replaced), team, budget and plan, the ask, contact.

### D. CMF application (Oct 20-Nov 6)

Claude drafts, Mike edits and signs. Rules and page citations are in `cmf/requirements.md` section 3. Upload rules: PDF, Word or .xlsx, 25 MB each, Arial or Helvetica over 11 pt, black on white, no columns. Pages over the limit aren't read. Name each file with its document name from the CMF list. Names and roles must match across Dialogue, the budget and the team description.

#### To make (new for ProjectRunner)

- [ ] D1 Originality, Creativity and Advancement Description (5 pages, 60 of 100 points, a 45 gate). Pitch the narrative design and the side-on play, not the pipeline. Name every generative AI tool used. Start from the Project Echo concept doc.
- [ ] D2 Detailed Project Summary (1 page).
- [ ] D3 Market Study (2 pages): narrative-game comparisons (Dispatch, The Walking Dead, Life is Strange, Replaced) with sales numbers. Reuse the 2024 structure.
- [ ] D4 Revenue Model (2 pages): the same comparison games, with a simpler scenario table than 2024.
- [ ] D5 Budget and Cashflow on the 2026-27 template, summary tab signed. Market salaries, one management line, prorated equipment, no localization, dated cash flow with no deficit. At least $333,334 eligible costs to ask for the full $250,000.
- [ ] D6 Narrative Positioning Statement (300 words, CMF form), rewritten for a cyberpunk story with a male lead.
- [ ] D7 Description of the Applicant's Financial Stability (1 page) with current numbers.
- [ ] D8 Financing commitment letters: the applicant's investment letter, a deferral letter from each shareholder (counts only if on payroll), and a bank letter if interim financing is used.
- [ ] D9 Support material: the gameplay video and teaser from workstream B as direct links (not Google Drive, OneDrive or Dropbox) live for 5 months, plus one PDF of in-engine stills with no text pages.
- [ ] D10 Dialogue form text: the 2,000-character description, materials to deliver at final costs (the prototype scope), schedule, and website URL (mandatory).

#### To add (update or gather)

- [ ] D11 Team Description (5 pages): update the Dawn and Echo versions. Add both past CMF-funded projects and how ProjectRunner and ProjectSilence share work.
- [ ] D12 CVs (3 pages each) for every team member, including marketing. One combined PDF is fine.
- [ ] D13 History (1 page): reuse the 2024 rights wording and write the ProjectRunner origin.
- [ ] D14 Community Engagement Plan and Sustainability Plan (300 words each): both scored 2/2 in 2024. Move the text onto the 2026-27 forms and sign.
- [ ] D15 Narrative Positioning Attestation: re-sign with the new title.
- [ ] D16 Canadian status declaration: the Dialogue e-form, or tick that nothing changed.
- [ ] D17 Certificate of Incorporation and 3 years of financial statements (Mike, in Dialogue records).
- [ ] D18 PERSONA-ID numbers for every owner and key person (parity and diversity points).
- [x] D19 Dawn and Silence files are closed (Mike, 2026-10-15).

#### Nice to have

- Pitch deck (workstream C). The CMF doesn't score it, but it serves publishers and investors, and its stills feed D9.
- Art bible exported from Affinity as image-only pages for D9.
- A Steam page or wishlist link as market proof, if time allows.
- An emailed question to the CMF on whether PhantomInteraction and PhantomStory count as proprietary technology. If yes, $2M Errors and Omissions insurance is required.
- A short playable build to back the video.

Skip letters of support. The CMF doesn't consider them.

## Risks

- 26 days for four deliverables. The slice is the long pole. If it slips, submit with the look test and grey-box capture, and say what the prototype will build.
- Personal loan and sweat equity are not eligible financing. See "Financing" for the eligible routes.
- Parity scores 0 at 100% single ownership. Diversity now comes from the owner's PERSONA-ID answers.
- The unreal-editor MCP didn't connect this session. The slice work needs it on port 8002, or headless Python.
- The Last Night E3 download is broken after 1:12. It doesn't block anything.

## Decisions (Mike, 2026-10-15)

1. The title is "Project Runner" on every application for now.
2. Dawn and Silence are closed (both rejected for Prototyping). Their documents are the starting point for the "to add" items.
3. Team: the current list minus Taia DeBona. Michael Brandt, Satomi Brandt, Hamish Harrison, Dillan Schmitz, Mike Lohaus, Sarah Alonso, and Matthew Freedman as gameplay consultant. More people may join later. The art director role is open.
4. Financing: a personal loan, sweat equity and outside investment. See "Financing" below for how the CMF treats each.
5. Environment: Houdini pieces and owned packs together, adjusted as we go.
6. Look: test textures-only and whole-screen pixel grid. Add the camera depth effect (smooth depth of field after the pixel step, narrow-FOV parallax across five layers).
7. Character: the UEFN Mannequin plays the lead for now. Vhoori is in the cast, not the lead.
8. Website: build a static landing page now (`C:\Prod\ProjectRunner\Web\`). Mike hosts it on his URL later.
9. No AI-generated images anywhere: not in the deck, the site, the support material or the application.

## Financing

The Dialogue financial structure and the budget's cash flow have these inflow lines: CMF Advance, Applicant Investment, Deferrals, Distributor, Federal Tax Credit, Provincial Tax Credit, and three Other Funding lines. The total must equal the budget total exactly. Each source needs a signed, dated commitment letter. The CMF pays at most 75% or $250,000, so a $333,334 budget needs $83,334 from the other lines.

| Mike's source | How the CMF treats it | What to do |
|---|---|---|
| Personal loan | Loans and lines of credit are not eligible financing sources (RD p.11). In 2024 a Shred tax-credit loan backed the applicant investment; the reviewer accepted it but flagged the prime + 12% rate. In 2023-24 an unconfirmed $75,000 investment cost points. | If Mike lends or injects the cash into Phantom Break, it shows as Applicant Investment, backed by the company's investment letter and a bank statement or bank letter showing the money. Ask the CMF whether shareholder funds raised by a personal loan are acceptable before relying on it. |
| Sweat equity | Not eligible (RD p.11, BUD Instructions). Free or volunteer work doesn't count either. | Use a shareholder salary deferral instead. It counts only if Mike is on Phantom Break's payroll (T4) and is budgeted at an hourly, weekly or monthly rate. It needs a deferral letter. |
| Outside investment | Eligible as Other Funding (or Distributor, if it's a publisher deal) with a signed commitment letter. If the investor is related to Mike, related-party rules apply. | Get a letter stating the amount, timing and terms (equity, recoupment). The CMF advance converts to an investment if production is funded, so the investor's recoupment terms will be read against that. |
| Tax credits (not raised yet) | Federal and provincial tax credit lines exist on the cash flow. Alberta dropped plans to revive a games tax credit in March 2025, and the Alberta Media Fund excludes games (thelogic.co/news/alberta-drop-game-industry-tax-credit). | Leave the provincial line at zero. A federal SR&ED claim on the C++ systems work is possible but unconfirmed; ask an accountant before counting it. |

The 2024 structure for reference: CMF $226,350 (75%), applicant investment $40,000, shareholder deferral $35,450, total $301,800.
