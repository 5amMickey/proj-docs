# Comparables for the gameplay systems proposal

Project: ProjectRunner. Plan: `plans/2026-11-05-gameplay-systems.md`, task 1 (RUN-182). Date: 2026-11-05.

Short answer: the comparables support a small proposal. Authored cases that rejoin quickly, a skill system that changes the hacking assist more than the hacking game, and an assist layer that keeps the same story outcome are all backed by sources. Three things have no comparable evidence: the checkpointed hold-to-fill treatment bar, a rumble proximity cue for the ring search, and the exact cost of one patient case. These are listed under "Open uncertainties".

## How to read this file

- Each finding names its source and marks it primary or secondary. Primary means a developer's own page, talk or blog. Secondary means a review, wiki, guide or news report.
- Pages were opened through a fetch agent on 2026-11-05. A page that returned only a headline, or that failed, is not used as a finding.
- This builds on the "Timing and QTE" section of `research/ui-vector-assets-ue58-2026-11-02.md` (XAG 107 and 116, Steam tags, the QTE option table). That section is not repeated here.
- Findings describe how comparable games work. None of them proposes copying a game's content.

## Starting material read

These are local files, so they carry no URL and are not findings.

- Ring assets (`Graphics/_library/loose/minigame/hacking_ring_assets/README.md` and `Unreal_PNG/assembled_without_piece.png`): four rings (coral, magenta, violet, cyan) at radii 480, 390, 300 and 210, each with a 56 degree gap, all gaps centered on the right side. One gap piece fits the outer ring only. A separate center lock icon exists. Rings rotate by Render Transform Angle in UMG.
- Mike's three early images: four concentric rings with a gap near the lower right and a cyan inner ring with a small arrow; five rings with a small arrow in the center ring; a C-shaped stack of rings around a padlock. All three show the same idea: one stack of rings with an opening, solved from the outside in.
- A design point from the assets: because every gap sits at the same angle, the search step (finding the gap with the stick) only matters if the proposal rotates each ring to a different start angle. The README does not say whether the ring set is meant to be randomized.
- `Graphics/UI` sheets are mood reference only (C5). They were not mined for names or plot.

## Questions

| # | Question | C1 system it could change |
|---|---|---|
| Q1 | How do choice-driven games keep authored outcomes per beat small, and where do routes rejoin? | 1 Core loop, 2 Clinic hub and patient cases, 9 Failure costs (C7 cost check) |
| Q2 | Which held, repeated or timed inputs do shipped games let players change, and does the story stay the same? | 3 Medical aid, 4 Hacking, 5 QTEs (C9) |
| Q3 | How hard do hacking minigames get, and what do games do about retry fatigue? | 4 Hacking, 5 QTEs |
| Q4 | Does a specialty change the hacking minigame itself, or only what the player may attempt? | 4 Hacking, 8 Growth |
| Q5 | How do comparables carry a position cue (sound, rumble) and what stands beside it? | 4 Hacking (the gap search), C4 rumble rule |
| Q6 | How do games present sending a companion on a task (cost, odds, result, unavailability)? | 6 Intelligence gathering, 9 Money and favours |
| Q7 | How are skills, points and skill checks handled in a choice-driven story, and how many skills before it overwhelms? | 8 Growth |
| Q8 | How do games make failure cost something in the story without ending play? | 9 Failure costs, 3 Medical aid, 5 QTEs |

## Games

| Game | Why picked |
|---|---|
| Dispatch (AdHoc Studio, 2025) | In the BRIEF. It has a hacking minigame with QTEs, a send-a-hero stat-matching loop and timed choices, so it tests Q2, Q3, Q6. |
| The Walking Dead (Telltale, 2012) | In the BRIEF. A reference for choice tracking, authored consequence and timed choices, so it tests Q1 and Q8. |
| Life is Strange (Dontnod, 2015) | In the BRIEF. A reference for episode structure and consequences that carry between episodes, so it tests Q1. |
| Disco Elysium (ZA/UM, 2019) | A choice-driven story where skills gate dialogue and failure plays out as story. It tests Q7 and Q8. |
| Papers, Please (Lucas Pope, 2013) | A daily loop of small authored cases with money pressure. It is the nearest evidence for a clinic or patient-case loop, and it tests Q1 and Q8. |
| Starfield (Bethesda, 2023) | Its digipick lock is a concentric-ring minigame tied to a skill, so it tests Q3 and Q4. |
| Cyberpunk 2077 (CD Projekt Red, 2020) | A hacking minigame tied to an attribute and skill, so it tests Q4. |
| The Last of Us Part II (Naughty Dog, 2020) | A developer-written list of tap, hold, toggle, skip and vibration alternatives, so it tests Q2 and Q5. |

## Findings by question

### Q1. Keeping authored outcomes small and rejoining

1. Telltale's postmortem says the studio kept handcrafting "the spine of the story". Its end-of-episode screen "shows five critical decisions", while the game "also tracked dozens of other decisions". It also lists "choice notifications" among the features added. Source (primary): https://gamedeveloper.com/design/classic-postmortem-telltale-games-the-walking-dead-2012 (Kevin Bruner, Game Developer, March 2013).
   Consequence for the proposal: each patient case should name a small fixed number of surfaced decisions (the page shows five per episode, so two or three per case is a safe ceiling) and track the rest as flags. The corner notice already in the HUD list ("Vex will remember that.") covers the choice notification without a new HUD element.

2. In a Game Developer feature, Lucas Pope says scripted content sits on "a complicated network of dependencies" and that "adding even one little encounter or rule would blow out all the scheduling for the rest of the game". He also says that with "gobs of 3D assets or voice overs or exciting cutscenes, it'd be a lot harder to maintain these nuances". The same page says the game has 20 endings. Source (secondary reporting of Pope's quotes, written by Leigh Alexander, 2013): https://www.gamedeveloper.com/design/designing-the-bleak-genius-of-i-papers-please-i-.
   Consequence for the proposal: cases that carry voice, animation and a cinematic should be few and fixed. The C7 count should show that every added authored outcome in a case multiplies later scheduling, so a case gets a hard cap on distinct outcomes, and cases that are text and a hold bar stay cheap to add.

3. An analysis of Telltale's structure says branches "must converge at a finite number of leaf nodes". It describes two ways Telltale kept the tree small: delaying a character's death by one episode so either choice leads to the same loss, and showing the consequence through character reactions. It also calls explicit feedback such as "Clementine will remember that" "absolutely vital". Source (secondary, blog post by Nikhil Kashyap, 2017): https://gamedeveloper.com/design/meaningful-decisions-in-branching-narratives.
   Consequence for the proposal: the Fighter case can rejoin at the clinic hub the same day, with the difference carried by one flag, one changed reaction and one notice. The proposal should list the rejoin point for every route (Tech, Netrunning, companion) as a single scene, not a branch that lasts to the next episode.

4. A news report of Dontnod's PLAY15 talk says "it is impossible to branch the game every time a decision is made", and that severe-seeming changes "may not make large changes to the world towards the end". Source (secondary, journalist's paraphrase of the talk, Christina Kutscher, 2015): https://darkzero.co.uk/?p=82616.
   Consequence for the proposal: it supports a rule that case consequences show up in dialogue, relationships and one later scene, and do not change the episode's authored beats.

5. The creative director of Life is Strange is reported as saying "the main narrative will move forward in the same direction for all players" and "there will be a few different endings". Source (secondary, MCV news piece quoting the director through VG247, 2015): https://www.mcvuk.com/life-is-strange-a-game-for-telltale-and-heavy-rain-fans/.
   Consequence for the proposal: the core loop can state that episode beats are fixed and that clinic cases customise, not redirect, them. This keeps the full-game outcome count near the number of episodes, not above it.

### Q2. Alternatives for held, repeated and timed inputs

6. Naughty Dog's page says "we have individual options to change every button hold into a toggle, and every rapid press into a hold". It lists Hold or Toggle choices for aiming, listen mode, sprinting, crafting and breath holding. Source (primary): https://naughtydog.com/blog/THE_LAST_OF_US_PART_II_ACCESSIBILITY_FEATURES_DETAILED (2020).
   Consequence for the proposal: the hold-to-fill treatment bar and the hold-to-hack should each ship with a toggle (press once to start, press again to pause) and a tap-to-advance option. Each is a setting, not a separate mode, so it costs no extra authored content.

7. The same page describes a skip option: "When in a puzzle, select SKIP PUZZLE from the pause menu to advance to the puzzle's completion". It says some puzzle progression "may not be fully accessible". The page does not say what skipping does to story or trophies. Source (primary): https://naughtydog.com/blog/THE_LAST_OF_US_PART_II_ACCESSIBILITY_FEATURES_DETAILED.
   Consequence for the proposal: a ring-hack skip that completes the hack as a success is a shipped pattern. The proposal must say whether a skip keeps the same story outcome (C9). Because the hack has no failed branch authored for it, a skip that returns the success outcome keeps the story the same and still charges any cost (money or favour).

8. In Dispatch, a review by Leo Macleod on Majestic Accessibility (2025) records "Some quick time events can be turned off" and "Option for unlimited attempts on the 'hacking' puzzle levels". The same review says the reviewer could not finish the hacking levels without a partner, and asks for the option to remove the antivirus enemies, remove button holds, show key numbers on screen and remove the choice timer. Source (secondary): https://majesticaccessibility.substack.com/p/dispatch-accessibility-review.
   Consequence for the proposal: two settings (unlimited attempts, QTEs off) are not enough for a motor-limited player in a moving ring hack. The assist list for the ring hack should include a slower or paused timer, no chase element, a tap alternative to holds and always-visible input prompts. The same applies to timed dialogue choices, which Dispatch's reviewer also flagged.

9. Reports of the Dispatch GDC 2026 talk say the team limited QTEs to two types, would not use them as jump scares, would not let a miss feel unfair, and would make them "fully optional". Source (secondary, Game*Spark summary in Japanese of a GDC talk by Nick Herman and Dennis Lenart, citing PC Gamer): https://www.gamespark.jp/article/2026/03/12/163843.html.
   Consequence for the proposal: it supports a cap of two QTE input types for the whole game (for example one directional prompt and one hold) and a rule that a fight QTE has no unfair fail. It fits the settled rule that fights are authored cinematic QTEs. The Majestic review above says only "some" QTEs can be turned off, so "fully optional" is the talk's stated aim, not a confirmed shipped result.

10. The Game Accessibility Guidelines full list includes the titles "Avoid repeated inputs (button-mashing/quick time events)", "Avoid / provide alternatives to requiring buttons to be held down", "Do not make precise timing essential to gameplay – offer alternatives, actions that can be carried out while paused, or a skip mechanism" and "Offer a means to bypass gameplay elements that aren't part of the core mechanic, via settings or in-game skip option". Only the titles were read, not the sub-pages. Source (primary reference list; titles only): https://gameaccessibilityguidelines.com/full-list/.
    Consequence for the proposal: the core-mechanic question decides whether the ring hack must offer a bypass. Hacking is one of the nine systems and carries over to ProjectSilence, so the proposal should state the answer for it and for the treatment bar.

### Q3. Hacking difficulty and retry fatigue

11. Dispatch's hacking minigame is described as moving a shape through a map, building bridges with button sequences, with a timer in later sequences, "antiviruses" that chase the player and electrical charges added in episode 6. The guide says "The hacking mini-games get more intense as the game progresses", and "unlimited hacking attempts" can be toggled at any time. Source (secondary, Escapist guide, 2025): https://www.escapistmagazine.com/dispatch-hacking-guide/.
    Consequence for the proposal: the ring hack should not add new mechanics each episode. Introduce one variant at most (a longer ring count or a shorter timer) and make unlimited retries a default-visible setting. Each new element adds testing work in every difficulty and assist state.

12. A Gamepressure columnist calls Dispatch's hacking "the most irritating part of Dispatch" and says the last hacking minigame in Chapter 6 was still "horrible", with the unlimited-attempts option as the tip. Source (secondary, opinion by Damian Gacek, 2025): https://www.gamepressure.com/newsroom/the-one-thing-players-always-forget-about-hacking-in-dispatch/zc88e7.
    Consequence for the proposal: hacking that escalates is the part of a story game most likely to annoy players. A fixed short ring count (two to four rings, matching the four ring assets) and a setting that removes the fail state fit Mike's wish not to overwhelm the player.

13. Starfield's lock is a set of "1 to 4 rings depending on the lock's security level". A pick is expended when the first key is slotted and when the minigame is reset. Source (secondary, community wiki, incomplete in places): https://starfieldwiki.net/wiki/Starfield:Security_(Tech_Skill).
    Consequence for the proposal: it is the closest comparable for a one-to-four ring lock and shows a lock whose difficulty comes from ring count, not from new rules. A fail that spends a cost item suits the "failure has a story cost" rule if the cost is money or a favour, not a consumable the player must hunt.

### Q4. Specialty and the hacking minigame

14. In Starfield the Security skill gates lock tiers: Rank 1 allows Advanced locks, Rank 2 Expert locks and Rank 3 Master locks. Rank 2 makes "rings turn blue when the pick can be slotted". Rank 4 can "expend a digipick to eliminate keys that aren't required". Ranks rise by completed challenges ("Pick 5 locks", "Pick 15 locks", "Pick 30 locks"). Source (secondary, wiki): https://starfieldwiki.net/wiki/Starfield:Security_(Tech_Skill).
    Consequence for the proposal: a specialty can lower the effort of the same minigame (fit highlights, fewer rings to solve) as well as gate what may be tried. It fits Mike's idea that a Netrunner finds the hack easier. It also shows that skill rank can be earned by use, which Runner's chapter-based points do not need.

15. In Cyberpunk 2077, Breach Protocol is "a skill that is related to the Intelligence attribute". Skill levels add "Breach Protocol Time by 5%" at several levels, "+1" to the buffer at level 19, and "+1 Perk Point" at levels 2, 6, 10, 14, 16 and 18. Source (secondary, Fextralife wiki, last edited September 2026): https://cyberpunk2077.wiki.fextralife.com/Breach+Protocol.
    Consequence for the proposal: skill rewards that add time and slack to a hack keep one minigame for all players. The Netrunning specialty can give more time or a longer solve window for rings, and the other specialties use the same ring hack with the default window.

16. A fan guide for Dispatch says tech challenges are Intellect-based, lists "Intellect (3-4 required)" and says Intellect 1 heroes "fail tech challenges automatically". Source (secondary, fan-made, not affiliated with the studio, 2025): https://dispatchtips.pages.dev/guides/tech-challenges.
    Consequence for the proposal: it shows a simple stat threshold as a way to say who can attempt a hack, with no roll. For Runner, a specialty or companion tag (Hacker Companion) can open a route without adding a probability layer.

### Q5. Position cues and what stands beside them

17. Naughty Dog's list includes "Combat Vibration Cues: Enables vibration cues to assist with combat" and "Guitar Vibration Cues: Enables a vibration cue when the correct guitar note for story progression is selected". The same page lists audio cues alongside, such as "Traversal Cues" and "Combat Audio Cues". Source (primary): https://naughtydog.com/blog/THE_LAST_OF_US_PART_II_ACCESSIBILITY_FEATURES_DETAILED.
    Consequence for the proposal: vibration is shipped as a separate toggle that sits beside audio cues, not as the only cue. The ring-gap search should have its own vibration toggle plus an audio pitch or volume cue and a visual cue (a glow on the gap or a proximity ring), which meets the C4 rule that rumble needs an audio and visual cue.

18. The Game Accessibility Guidelines full list includes "Ensure no essential information is conveyed by sounds alone" and "Include toggle/slider for any haptics". Only the titles were read. The list has no guideline specifically about vibration-only information. Source (primary reference list; titles only): https://gameaccessibilityguidelines.com/full-list/.
    Consequence for the proposal: the ring hack needs a visual route to the gap, and a setting to turn rumble off or down. A no-search assist (the gap highlighted or auto-aligned) removes the need to find it by stick.

### Q6. Sending a companion on a task

19. Wikipedia describes Dispatch's loop as sending heroes to events, where players "must strategically decide which hero or heroes best fit the activity based on their stats and character traits", "while also managing their cooldowns". The page gives no success formula and no failure outcome. Source (secondary): https://en.wikipedia.org/wiki/Dispatch_(video_game).
    Consequence for the proposal: a cooldown is a built-in way to handle an unavailable companion (C7). A companion who is busy is a normal state, so the case still plays with the other routes (talk, pay a hacker, hack it yourself) and needs no extra authored branch.

20. The fan guide says a hacking mission has "Medium" difficulty and "3 before system lockout" attempts, and that failure "requires physical intervention (escalates mission complexity)". The same guide treats hacking as a mission mechanic, which conflicts with the Escapist guide above. Source (secondary, fan-made): https://dispatchtips.pages.dev/guides/tech-challenges.
    Consequence for the proposal: a failed errand can escalate the situation (a second step) instead of ending it. That fits "failure has a story cost", but it adds an authored follow-up, so it counts toward the C7 total. The conflict with the Escapist guide means this finding is a design idea at best, not a confirmed Dispatch mechanic.

### Q7. Skills, points and skill checks

21. Disco Elysium's developer blog says "Every dialogue has at least one active skill check moment" and "A tooltip menu tells you what your chances of succeeding are". A check draws on the character's stats, learned skill, inventory and thoughts. Source (primary, developer blog, 2016): https://discoelysium.com/devblog/2016/10/06/active-skill-checks.
    Consequence for the proposal: skills can act as dialogue gates that show the player what is needed before committing. The specialty (Tech, Netrunning, Enforcer) can add one extra dialogue option or one extra route per case, each shown with a clear label, with no dice.

22. The same page says white checks are "locked gates for content and rewards" that can be retried after raising the skill, and that a red check "can be rolled only once" and its negative result is "played out too". Source (primary): https://discoelysium.com/devblog/2016/10/06/active-skill-checks.
    Consequence for the proposal: skill points can unlock content later (the "all skills can unlock by the end" rule), and a one-shot check is the only kind that needs an authored failure. The proposal can use mostly retry-able gates, which cost no failure content.

23. In Cyberpunk 2077 the Breach Protocol skill levels give "+1 Perk Point" at six of its levels. Source (secondary, wiki): https://cyberpunk2077.wiki.fextralife.com/Breach+Protocol.
    Consequence for the proposal: it is an example of a points-per-level cadence. Runner's chapter-based points can be one to three points per chapter, so the number of skills is bounded by chapters (five episodes), and each skill should change one thing the player does.

### Q8. Failure that costs something and never ends play

24. Disco Elysium's blog says that on a red check "THE NEGATIVE RESULT IS PLAYED OUT TOO", and that it "can be rewarding to be bad at some things" because of the failures it produces. A white check failure means the player "suffer[s] damage (mental or physical), but nothing happens in the world". Source (primary): https://discoelysium.com/devblog/2016/10/06/active-skill-checks.
    Consequence for the proposal: failure as story content matches the settled rule. The proposal should mark which failures need an authored outcome (red type) and which only cost a small stat or money (white type). The Fighter case's failed-input path should be of the cheaper type.

25. Papers, Please earns pay for correct processing and loses money for errors, with a family status screen at night. The feature says "supervisors pay you extra if you choose to detain" suspected cases, and Pope describes encounters that "could resolve in several different ways" without seeming good or bad. Source (secondary, Gamasutra feature built on Pope quotes): https://www.gamedeveloper.com/design/designing-the-bleak-genius-of-i-papers-please-i-.
    Consequence for the proposal: money pressure makes small decisions matter without an extra system. Too little money in the Fighter case can mean a cheaper route (a partial treatment, a favour owed) that rejoins at the clinic. That cost is a flag, not a branch.

26. Pope's cut features (Kill Screen's summary of a forum post) include an alternate ending where the officer had to present correct documents or be detained. Pope asked "Did I want people to fail at this point, by offering the wrong docs/bribe?" and says it "caused problems". Source (secondary, news summary of a developer forum post, 2013): https://www.killscreen.com/peek-behind-scenes-papers-please-reveals-baggage-search-and-gun-fights/.
    Consequence for the proposal: it is a warning against failure states that feel like punishment for a player who did nothing wrong. A failed hack or QTE should change the story, and never move the player into a worse state they could not see coming.

27. Telltale's postmortem says "There are deliberately no right or wrong choices in The Walking Dead", and Kevin Bruner rejects "a blanket good or evil ranking". Sources (primary): https://gamedeveloper.com/design/classic-postmortem-telltale-games-the-walking-dead-2012 and https://www.gamedeveloper.com/design/-i-the-walking-dead-i-and-the-art-of-providing-no-good-choice.
    Consequence for the proposal: the money and favours system should not be a morality score. It should record who owes whom, which the story can read, and show it through the corner notice.

## Open uncertainties

These did not reach the standard of a finding. None of them appears above as one.

- Medical aid (system 3). No comparable was opened for a hold-to-fill bar with checkpoints, or for a clinic or medical-case game. Papers, Please is the nearest case-loop comparable, but it has no treatment action. The proposal should treat the checkpointed bar as unevidenced and keep its simpler alternative.
- Patient-case cost. No comparable gives a figure for the writing, animation and testing cost of one case. The C7 count has to come from the proposal's own authoring plan.
- The Walking Dead GDC 2013 panel. The PC Gamer report (https://www.pcgamer.com/au/the-walking-dead-panel-gdc-2013-clementine) returned only its headline, so the panel's statements on over-branching are not used. The GDC Vault recording was not opened.
- Cyberpunk 2077 Breach Protocol rules. The grid, buffer and daemon rules, and whether the minigame can be skipped, were not confirmed. The Cyberpunk Fandom page (HTTP 402), the Vulkk page and the Prima Games page (both HTTP 403) did not load, and the Fextralife page covers only skill rewards.
- Starfield. The PC Gamer lockpicking page returned only its headline. The wiki does not say what an "auto attempt" does, whether a skip exists or what a failed pick costs beyond the pick.
- Dispatch hacking rules. The Escapist guide (a separate minigame with an unlimited-attempts setting) and the fan guide (3 attempts before lockout, tied to a mission) disagree. Majestic Accessibility says only "some" QTEs can be turned off, while the GDC report says QTEs are "fully optional". The Dispatch success-chance display and failure outcomes are not described on any page opened.
- Dispatch GDC talk. Only a Japanese news summary that cites PC Gamer was read. The PC Gamer article body did not load, and the talk itself was not opened. The Insider Gaming interview is a video with no transcript.
- Life is Strange. The God is a Geek interview (HTTP 403) and the GamesRadar Double Exposure article (headline only) did not load. Nothing was confirmed about Max's object comments, or about what a no-rewind design teases.
- Game Accessibility Guidelines. Only titles on the full list were read. The sub-pages were not opened, so their wording on timers and haptics is unconfirmed, and the list has no guideline specifically about vibration-only information.
- Papers, Please. The cases per day, the pay rate and the way the 20 endings are bounded are not stated on the pages opened. The "20 endings" figure comes from the feature's author, not from Pope.
- Disco Elysium. The blog does not give a skill count, a point formula or how many checks appear per scene. Fan sources for "24 skills" and passive checks were not opened.
- Whether any shipped game lets a skip or assist keep the same story outcome in a branching test. The Naughty Dog page does not say what skip does to progress, beyond advancing "to the puzzle's completion".
