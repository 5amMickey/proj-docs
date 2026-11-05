# ProjectRunner animation shortlist

Mike retained all 28 candidates on 2026-11-02. The first batch consists of existing FBX files for the main cast and background NPCs. No downloads are needed for this batch. Selection is based on file contents, names and game needs; performance quality awaits visual review.

This pass covers inventory and a shortlist only. Mike's decision records the clip selection only. Unreal imports, retargeting and museum changes still wait for the cast session's handover and resolution of the flagged source-provenance questions. The existing template idle, walk and jog remain the player baseline under the November 2 brief decision.

## Retained clips

The IDs match [shortlist.csv](shortlist.csv). The CSV contains each exact source path, intended use, prop requirements, preparation, proposed library destination and visual check. All 28 rows are retained; import and visual validation remain pending.

| ID | Clip | Intended use |
|---|---|---|
| AN-01 | Cheerful walk | A lighter crowd walk |
| AN-02 | Texting walk | Phone users moving through the market |
| AN-03 | Looking around walk | Visitors and cautious passersby |
| AN-04 | Listening to music walk | Background variation |
| AN-05 | Relaxed idle | Cast and stationary NPCs |
| AN-06 | Relaxed fidget 1 | Break up idle repetition |
| AN-07 | Relaxed fidget 4 | A second fidget to judge against AN-06 |
| AN-08 | Agree | Main cast dialogue |
| AN-09 | Disagree | Main cast dialogue |
| AN-10 | Angry gesture | Confrontation dialogue |
| AN-11 | Dismiss | Dialogue rejection |
| AN-12 | Relieved sigh | A reaction after tension |
| AN-13 | Standing look around | Waiting NPCs and establishing shots |
| AN-14 | Standing conversation 1 | General conversation |
| AN-15 | Standing conversation 2 | Conversation variation |
| AN-16 | Seated conversation | Chair conversations |
| AN-17 | Coffee conversation | Seated cast and cafe NPCs |
| AN-18 | Leaning phone use | Wall-side NPCs |
| AN-19 | Open door | Cast interaction or cinematic |
| AN-20 | Close door | Cast interaction or cinematic |
| AN-21 | Sit on chair | Enter a seated scene |
| AN-22 | Sit on sofa | Interior scenes |
| AN-23 | Wipe a surface | Stall or food alley worker |
| AN-24 | Sweep floor | Market worker |
| AN-25 | Scratch neck | Idle fidget |
| AN-26 | Standing texting | Stationary phone user |
| AN-27 | Standing drink | Food alley or bar NPC |
| AN-28 | Hold cup and nod | Listening during conversation |

## Source preparation

AN-01 through AN-07 come from AssetPacks' MCO Mocap Basics FBX sources. Its bundled `UE4_MocapOnline_Tech_Notes.txt` identifies the UE4 template skeleton. These files contain a `root` and three named spine bones. The selected filenames declare in-place variants. Plan an offline UE4-to-Manny retarget and verify the loop seam and foot motion on the cast. The FBX model count includes meshes and, in some files, cameras; it is not a bone count.

AN-08 through AN-12 come from the uploaded Gestures Pack Basic. Their FBXs identify Mixamo, with `mixamorig:Hips` at the top of the model hierarchy and no separate ground root. Plan an offline Mixamo-to-Manny retarget. These are full source performances; their suitability for the project's UpperBody slot remains a museum check. Do not label them additive or upper-body-only before testing.

AN-13 through AN-28 come from the uploaded Everyday Actions, Cleaning, Talking and Interacting, and Crowd Reactions packs. Use only the `mocap/UE5` export of each selected take. The iClone and Rokoko Default folders contain alternate exports of the same named performances. The inspected UE5 files contain a `root`, five named spine bones, two neck bones and 83 model nodes. Their exporter identifies Rokoko. Manny-style names do not establish matching rest orientations or exact skeleton compatibility. The supplied `RTG_RKK_to_MH` assets are not proof of compatibility with this cast.

Use one approved clip from each source family for the first import tests. Suggested pilots are AN-03 for crowd walking, AN-08 for a facial-direction gesture, and AN-14 for conversation. Keep imported source rigs separate until those tests establish how to produce the library animations. The approved cast skeleton is `/Game/ProjectRunner/Characters/Shared/SK_PR_Human`, with `SK_Mannequin` listed as compatible under RUN-148. Confirm the cast session's final asset state at handover. Library output should follow that established setup without modifying the shared skeleton or adding runtime retargeting.

Several Rokoko takes need editing. AN-14 spans 45.02 seconds of stored animation keys and AN-15 spans 53.53 seconds. The seated conversation takes span 17.98 and 24.18 seconds. Select useful segments after playback rather than treating the whole take as a seamless loop. The CSV durations measure the full source key span, not the duration of a future trimmed library clip.

Door and seating actions need trajectory and contact checks before choosing root-motion settings. A broom, cloth, phone, cup, chair, sofa or door must match the performance. A valid skeleton alone will not establish usable prop contact.

## Source records and exclusions

The source inventory records file counts, not unique animations. It includes alternate formats, mirrored versions, rigs and supporting Unreal assets. `uasset_files` does not mean AnimationSequence count. [source-files.csv](source-files.csv) lists the inventoried files; [source-inventory.csv](source-inventory.csv) groups them by pack. Generated caches and macOS resource files are excluded.

The MCO pack is listed as owned in the project asset catalog. Preserve its purchase provenance. The uploaded gesture FBXs identify Mixamo, but their folder contains no licence text. The Rokoko packs' bundled import PDF credits Anderson Rohr and links to his Gumroad page, but I found no usage terms in the inspected local documentation. Record the download provenance and applicable terms before these candidates enter the game. These are source checks pending import, not claims that the files are prohibited.

Mike confirmed on 2026-11-02 that all packs are open to use. This settles the provenance question for the retained clips. The educational-only exclusions below still apply because those readmes restrict use.

Sixteen uploaded folders have readmes stating "educational purposes only": all six `MCS_Data_Part*` folders and the C3D/TRC Circus, Dog, Dog 02, Game and Miscellaneous Motions packages. They are excluded from the proposed game library. The inventory records the exact readme paths. Raw marker recordings would also require a separate reconstruction step; they are not ready-made cast animations.

Other packs remain available for later selection:

- Human Basic Motions Free has 118 animation FBXs and two mesh FBXs. Its bundled PDF includes a commercial-use statement. Keep its male and female idle, talk and locomotion variants as alternatives if the first batch does not suit the cast.
- PoseAnimations has many numbered poses and transitions. Choose these after visual browsing, since names alone do not identify the desired performance.
- MusicalRockMotions and TrumpetSaxPack may suit buskers if the scene needs them. Instrument placement and finger contact would be part of that selection.
- Swimming, weapon, magic, zombie, creature, combat and sports packs have no selected use in this starter batch.
- The large sample Unreal projects stay unimported. Their supporting assets and overlapping motion variants do not justify copying entire projects into Runner.

The starter batch does not yet supply eating, smoking, a dedicated hacking action, or a confirmed stand-up transition. Coffee conversation and holding a cup do not establish an eating animation. Select these missing actions for concrete scenes after reviewing this batch.

## Coordination with the Manny change-over (RUN-158 to RUN-163)

That session replied on 2026-11-02:

- Target IK rig: `/Game/ProjectRunner/Animation/Retarget/IK_PR_Human`, which stays after GASP is removed. Reuse it. Each source-family retargeter needs its own target retarget pose with the fingers aligned: `IKRetargeterController.auto_align_bones` on every finger bone (metacarpal, 01, 02, 03, both sides) with `CHAIN_TO_CHAIN` on TARGET. The method is in `ProjectRunner/Unreal/Scripts/pr_retarget_locomotion.py`.
- `SK_PR_Human` keeps its bones and rest pose. `pr_cut_gasp_refs.py` will empty its compatible-skeletons list. After that it is final. Library clips must be retargeted onto `SK_PR_Human`, since nothing on another skeleton will play through compatibility.
- That session owns `Library/Locomotion`, including `A_Locomotion_*` and `BS_Locomotion_*`. AN-01 to AN-04 now go to `Library/CrowdWalk` instead.
- That session has the RunnerSandbox editor until it hands over. Then it closes the editor to delete GASP and rebuild C++. Don't open the editor until both steps are reported done.

## Museum acceptance after handover

Each retained clip needs a labelled station showing its source and use. Preview stationary clips at a fixed location; show displaced actions with a visible start point and the required prop. Crowd walk loops also need a moving playback test to judge foot sliding at their intended travel speed.

Test retained animations across all intended human cast meshes, including the male and female NPC bodies. Check shoulders, wrists, fingers, neck, hips, knees, feet, floor penetration and body proportions. Judge prop contact, loop seams and entry and exit poses. Exercise the UpperBody candidates over walking separately. Corrective coat and collar motion depends on the cast rig work and must not be mistaken for an animation import result. This human shortlist does not target the three mech rigs.

The museum pass requires actual playback and Mike's visual assessment. Import success alone does not complete the animation task.

## Import results (2026-11-02)

Scripts are in `ProjectRunner/Unreal/Scripts` and run in the open editor through `pr_remote.py`:

1. `pr_mocap_import_source.py` imports each source FBX onto its family's own skeleton in `Library/_Source/<Family>/`. The Gestures Pack FBXs hold no mesh, so `blender_mixamo_proxy.py` builds a skinned proxy from the same armature first. Its output is `Saved/mocap_proxy/SKM_Src_Mixamo.fbx`.
2. `pr_mocap_retarget.py` builds `IK_Src_<Family>` and `RTG_<Family>_to_PR_Human` in `Animation/Retarget`. Each targets `IK_PR_Human`, with the Root Motion op off and a `PR_Aligned` target pose (arms and fingers auto-aligned CHAIN_TO_CHAIN). It writes `Library/<Category>/A_*_01` on SK_PR_Human. In stationary categories it adds a constant root yaw when a take's median facing turns away. That applied to AN-14 (-78°), AN-15 (+111°), AN-23 (-57°) and AN-24 (-86°).
3. `pr_build_anim_museum.py` builds `/Game/ProjectRunner/Maps/L_AnimMuseum`. It has one labelled row per clip on Marcus, Vhoori, Sin, Guard, Male NPC and Female NPC (no coats), with single-node looping playback. `pr_museum_shot.py` captures rows during PIE. The shots are in `ProjectRunner/refs/wip/animmuseum/`, with contact sheets `sheet_a1/a2.jpg` and `sheet_b1/b2.jpg` taken a few seconds apart.

The reports `Saved/pr_mocap_import_source.json` and `Saved/pr_mocap_retarget.json` show 28 clips with 0 errors. Every clip's skeleton is SK_PR_Human. Evaluated on Marcus's mesh, the pilot clips place the pelvis at about 104 cm and the head at about 164.5 cm, with the feet on the floor.

Arm and hand fix after Mike's review (2026-11-02). Three faults, each fixed in `pr_mocap_retarget.py`:

1. Fuzzy chain mapping fed the source finger chains into the cast's metacarpal chains for MCO and Mixamo, whose sources have no metacarpals. That splayed the hands (index-pinky spread 45-48° against 13-20° in the source). Unmatched metacarpal chains are now left unmapped.
2. Each family needs its own target retarget pose. MCO aligns only the hands (MESH_TO_MESH) plus the fingers, because aligning the arms locked its elbows straight. Rokoko and Mixamo align the arms and fingers CHAIN_TO_CHAIN. With fingers-only alignment, Rokoko fingers bent about the wrong axis.
3. A second `auto_align_bones` call wiped `upperarm_l`, and the left arm hung 51° out from the body. Rokoko and Mixamo now use a single call.

Check: the upper-arm angle and elbow bend on both arms are within 8° of the source for AN-05, AN-03, AN-08, AN-10, AN-14 and AN-25. The close-ups `close_fix5.jpg` show natural arms on MCO and Rokoko. On the Mixamo gestures (AN-08 to AN-12) the arms are right, but the hands still turn flat and outward at the wrist.

Open items from the captures:

- The Mixamo gesture hands (AN-08 to AN-12) still turn outward at the wrist. The options are Rokoko replacements or a hand roll offset.

- The props are absent. AN-16, AN-17 and AN-21 sit on air, AN-18 leans on no wall, and AN-23 wipes no surface.
- AN-19 to AN-22 move the body sideways out of its column. They need start markers and a root-motion decision.
- The Rokoko takes (AN-13 to AN-28) are full-length: 15 to 54 seconds. Pick segments and trim them after playback review.
- Fingers and contact were not judged at the capture distance. The coat variants were not tested, pending RUN-152.

## Checklist

- [x] Inventory the uploaded sources and ten AssetPacks folders named in RUN-132.
- [x] Prepare 28 proposals with exact source paths and intended game uses.
- [x] Read each selected FBX's model hierarchy and animation key ranges.
- [x] Record the educational-only exclusions and unresolved source provenance.
- [x] Mike retained all 28 clips on 2026-11-02.
- [x] Mike confirmed on 2026-11-02 that all uploaded and AssetPacks packs are open to use in the game.
- [x] The change-over session handed over the editor on 2026-11-02, after GASP was removed and SK_PR_Human was final.
- [x] Piloted AN-03 (MCO), AN-08 (Mixamo) and AN-14 (Rokoko).
- [x] Imported and retargeted all 28 onto SK_PR_Human (2026-11-02).
- [x] Built L_AnimMuseum: 28 rows on six cast bodies, captured in PIE.
- [ ] Mike completes the visual assessment.

RUN-132 and RUN-133 remain the board references. This shortlist does not close either task. The generated `TASKS.md` and the approved character plan are unchanged.

## Evidence files

[fbx-evidence.json](fbx-evidence.json) contains the selected files' SHA-256 hashes, model hierarchies, stored take intervals and animation key spans. These checks do not evaluate poses. [inspect_sources.py](inspect_sources.py) reproduces the inventory and FBX inspection using Blender's installed standalone parser, without starting Blender or Unreal. Run it with `py -B inspect_sources.py`; it writes only the adjacent CSV and JSON reports.

Project context comes from [the brief](../../BRIEF.md), [the character animation plan](../../character-animation-plan.md), [the existing Mixamo wish list](../mixamo/mixamo-candidates.csv), and the read-only RUN-132, RUN-133 and RUN-148 task records inspected on 2026-11-02.
