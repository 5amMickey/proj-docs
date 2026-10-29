# Character rigging and animation plan

Status: approved by Mike 2026-10-28 (decisions A to D below). Nothing built yet. Board: RUN-129 to RUN-137.
Research with sources: `research/character-animation-pipeline-2026-10-28.md`.

## Goal

Get the lead, the cast (Vhoori first) and male and female NPC bodies into UE 5.8 on one skeleton. Build a curated animation library on that skeleton for the cast and background NPCs. Replace the GASP character with a traditional character that uses root motion where it helps.

## What exists today

- **Houdini rigger** (`HoudiniSource/ProjectRunner`):
  - `asset_charRig_04` rigs Vhoori with Manny bone names, cooks clean and exports `SKM_Cast_Vhoori_01`. Three things are still open:
    - Joint frames were never checked against Manny.
    - The rig has 70 joints but the exported FBX re-imports with 82.
    - The FBX ROP doesn't use the Unreal Engine preset.
  - `asset_charBuilder_10` holds rig and capture networks for maleMain, maleNPC, femaleMain, femaleNPC and three mechs. Their export axis settings disagree. Not cooked in this survey.
  - `asset_animRetarget_01` is a stub. It has no mapping nodes and its input folder is missing.
  - `asset_animGenerator_01` targets Electra, not Manny.
- **AutoRig Pro**: version 3.79.12 is installed in Blender 5.2, with Quick Rig and Rig Library.
  - Quick Rig has `UE5_manny` and `UE_mannequin` presets.
  - Remap has `mixamo_*` and `unreal_mannequin_remap` presets.
- **Animations in Runner**: GASP's set on the UEFN Mannequin. Walk, run and crouch have about 450 assets each, built for motion matching.
- **Animations in `C:\Prod\AssetPacks`**:

  | Pack | Assets |
  |---|---|
  | PoseAnimations | 939 |
  | SwimmingAnimationPack | 836 |
  | CombatMagicAnims | 128 |
  | MusicalRockMotions | 118 |
  | MorbidMotions | 123 |
  | BSP_ZombieAnims | 41 |
  | MCO_Mocap_Basics | 38 (FBX source in both in-place and root-motion versions) |
  | RollsAndDodges | 36 |
  | TrumpetSaxPack | 46 |

  I haven't checked which skeleton each pack uses.
- **Imported in Runner**: `SKM_Male_Body_01`, `SKM_Female_Body_01` and `SKM_Cast_Vhoori_01`. All three are parked until they match Manny (RUN-44).

## Recommendations

### 1. One shared skeleton: UE5 Manny (`SK_Mannequin`)

Every human character uses the same skeleton asset, with Manny's bone names, rest orientations and bone count. Animations then play on any character with no retargeting at runtime.

UE5 Manny beats the UEFN Mannequin as the target for two reasons:
- Most Fab packs and Mixamo-to-UE guides target it.
- Leaving GASP removes the reason to use UEFN.

Each body keeps its own proportions through its own skeletal mesh. UE allows differing proportions on a shared skeleton, using the mesh's ref pose for translation.

### 2. Rig the demo cast with AutoRig Pro; keep the Houdini rigger off the critical path

AutoRig Pro is installed and its UE5 Manny preset handles names, axes and the 6-spine/2-neck layout in one export. That makes the risk of meeting the pitch date (2026-11-10) much lower.

The Houdini rigger still has an unverified joint-frame match and a 70-vs-82 joint gap. Carry on with it as its own track (RUN-44 to RUN-48). Swap a character over to it once `CompareToManny` passes on that body. Both paths export to the same skeleton, so the swap doesn't touch animations.

Plan for some hand reshaping. The research found spine and shoulder differences from Manny on custom bodies.

### 3. Retarget offline, in UE

Runtime retargeting (Retarget Pose From Mesh, as GASP does for Echo) runs an IK retarget every frame for every character. Epic publishes no cost figure, and a third-party write-up calls it expensive at runtime. Crowds would multiply the cost.

Offline retargeting costs nothing at runtime: the output is an ordinary animation sequence on the shared skeleton. The same is true of a Houdini KineFX retarget once it's baked to FBX. At runtime, UE and Houdini retargets perform the same.

Where to do it:
- Use UE's IK Retargeter with "Export Retargeted Animations" for the bulk. It works in batches, inside the editor, onto the same skeleton.
- Use Houdini only when a clip needs cleanup that UE can't do: foot contacts, fixing mocap, generated clips from `animGenerator`.

### 4. A curated library, not whole packs

Keep a CSV wish list of the clips the game needs, with one row per clip and these columns:
- category
- use (player, cast, NPC, cinematic)
- source (pack, Mixamo or GASP)
- in-place or root motion
- licence
- status

Pull only what the list asks for. Starter categories, taken from the five areas and G1:
- walk variants (casual, tired, injured, phone)
- idles and fidgets
- talking gestures
- sit, lean and crouch
- eating and drinking (food alley)
- smoking
- door, hack and use-object

The library lives at `/Game/ProjectRunner/Animation/Library/<Category>/` with names like `A_<Category>_<Name>_<NN>`. Each pack gets a one-time IK Rig, and its clips are batch-retargeted into the library. The source packs stay out of git, the same rule as the environment packs.

### 5. Mixamo: script the download, filtered by the wish list

Adobe offers no bulk download. Community console scripts can pull every animation for a character. The UE forum script also takes an in-place or root flag. Read the script before running it, and check whether it sets fps and skin. I couldn't confirm either.

The plan:
1. Download the wish-list clips without skin, on Mixamo's default character, at 30 fps.
2. Build one IK Rig for `mixamorig:` and retarget into the library.
3. For root-motion clips, add a ground root bone in Blender first. Mixamo puts root motion on Hips, and UE expects it on `root`. AutoRig Pro Remap can do this.

On licence, a 2022 Adobe FAQ allows use in commercial games. You can't redistribute raw files or train ML models on them. Adobe's own help page blocked access, so this is unconfirmed.

There's a starting wish list for Mixamo clips at `research/mixamo/mixamo-candidates.csv`. It has 83 clips, each checked against a list of 2,317 Mixamo clips from a Hugging Face dataset. Mixamo has no eating, hacking or sweeping clips, so those will come from packs or Mesh2Motion.

Other free sources (details in `research/animation-sources-2026-10-28.md`):
- **Mesh2Motion**: CC0 clips and an MIT-licensed browser auto-rig. Test one clip on Manny first.
- **Quaternius Universal Animation Library**: CC0.
- **100STYLE**: walk styles under CC BY 4.0, so the game must credit it.
- **Bandai Namco's dataset**: non-commercial only. Leave it out.

### 6. Movement: in-place loops for walking, root-motion montages for actions

For a walk-only side-on player, the Character Movement Component (CMC) driving in-place walk loops is responsive and keeps the AnimBP off the game thread. Epic warns that root-motion extraction moves the Anim Graph update to the game thread.

Use root motion in montages for anything where the feet must land exactly: sitting down, opening a door, the hack approach, stumbles. Set Root Motion Mode to "Root Motion from Montages Only".

Background NPCs stay on splines with in-place walk clips.

### 7. Upper and lower body layering

- **Gameplay**: use Layered Blend Per Bone from `spine_01` in the AnimBP, with an `UpperBody` montage slot. A walking NPC can then play a phone or drink clip on top. This is Epic's documented pattern, and it's cheap.
- **Cinematics**: Sequencer animation tracks can target a named AnimBP slot when the skeletal mesh runs its AnimBP in the sequence, so cutscenes reuse the same `UpperBody` slot. That was confirmed only for old engine versions, so verify it in 5.8.
- **Animation Mixer**: experimental in 5.8, and 5.8.1 fixed crashes in it. Under the brief's Avoid rule, test it in a separate sandbox project, not in Runner. Use it only if slot-based tracks fall short.

## Keep the trailer untouched

All of this work happens in a test level, `L_AnimTest`, inside Runner.

- **New content lives in its own folders.** New characters and the library go under `/Game/ProjectRunner/Animation/` and `/Game/ProjectRunner/Characters/<Name>/`.
- **The new character is set per level.** `BP_PRCharacter` and its GameMode are set in `L_AnimTest`'s World Settings, through GameMode Override. The project defaults don't change: `GameDefaultMap` and `EditorStartupMap` stay on `L_PR_Persistent`.
- **No existing assets change.** That includes GASP's character, its animations and `SK_UEFN_Mannequin`, the trailer maps (`Maps/Trailer`, `Maps/TrailerKit`) and `APNWalkerLane`. Retargeted clips are new assets on `SK_Mannequin`.
- **Walker changes go in a subclass.** If the walkers need changes, make a test subclass placed only in `L_AnimTest`.
- **Animation Mixer stays out of Runner**, under the brief's experimental-plugin rule. Test it in a separate sandbox project.

Swapping G1 or the trailer over to the new character is a later decision, made after the test level proves it.

## Steps

1. **Pick the target.** Confirm UE5 Manny as the shared skeleton (decision A). Check which skeleton each AssetPacks animation pack uses.
2. **Rig one body end to end.** Use AutoRig Pro on `Male_Body_01`: Quick Rig UE5_manny, then export with the Humanoid UE preset. Import onto `SK_Mannequin`. Play GASP and Manny clips on it and check arms and fingers. Done when `CompareToManny` shows under 10 degrees on key bones and a walk plays without broken limbs.
3. **Rig the rest of the demo cast** the same way: female body, Vhoori, the lead.
4. **Build the movement character in `L_AnimTest`.** A new `BP_PRCharacter` with CMC, in-place walk, crouch zone, `UpperBody` slot, and root-motion montages for interactions. G1 and the trailer keep `CBP_SandboxCharacter` until you approve the swap.
5. **Start the library.**
   1. Write the wish-list CSV.
   2. Make IK Rigs for Mixamo and each pack used.
   3. Batch-retarget the first 20 to 30 clips.
   4. Point the NPC walkers at library clips.
6. **Test Sequencer layering.** One test cutscene with a walk on the base track and a gesture on the `UpperBody` slot. If that fails, try Animation Mixer in a sandbox.
7. **Houdini rigger track (parallel).** Fix the joint frames, the 82-joint export and the Unreal preset (RUN-45 to RUN-48). Swap bodies over to it once it passes.

## Decisions (Mike, 2026-10-28)

- A. Every human character uses the UE5 Manny skeleton.
- B. Auto-Rig Pro rigs the demo cast. The Houdini rigger continues in parallel.
- C. The player walks on in-place loops with the CMC. Root-motion montages handle interactions.
- D. The pitch lead changes from the UEFN Mannequin to UE5 Manny. The trailer and G1 change only after `L_AnimTest` proves the new character.

## Brief decisions replaced (done 2026-10-28)

- Domain, Skeleton: "UEFN Mannequin drives the animation ... runtime-retargeted visual overrides".
- 2026-10-01: "Background NPCs are spline walkers (`APNWalkerLane`) using GASP walk clips. GASP NPC patrols ..."
- 2026-10-01 and 2026-10-02: the UEFN Mannequin for the blockout and the demo.

## Unconfirmed

- Mixamo's current terms: Adobe's page returned 403, so this rests on the 2022 FAQ.
- Whether UE's auto-retarget handles `mixamorig:` without a hand-made IK Rig.
- The per-frame cost of runtime retargeting. Epic gives no figure.
- Sequencer slot targeting in 5.8.
- Whether Animation Mixer can target AnimBP slots.
- Which skeletons the AssetPacks animation packs use.
- The Houdini rig's joint frames against Manny. The survey's comparison read 0 joints, so it proved nothing.
