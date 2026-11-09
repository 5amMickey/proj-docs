# AnimGen test and GASP restore: findings

Date: 2026-11-06. Engine on this PC: UE 5.8.4 (`Engine/Build/Build.version`, changelist 58902052). Research only: no project file changed, no editor opened. The only files written are this one and `gasp-restore-list.txt` next to it.

Marks used below: **Confirmed** means I read it in a file or ran a check. **Unconfirmed** means inference or a source I could not read fully.

## Short answers

| # | Answer |
|---|---|
| 1 | AnimGen runs a trained neural network inside the anim graph every frame (runtime). Training is offline in the editor with Python and PyTorch. It does not bake clips. |
| 2 | The example ships four trained assets that run as is. Nothing needs training for the first test. The NPC training clips are not shipped, so the NPC controller cannot be retrained from the example alone. |
| 3 | The NPC needs a Mover pawn, a nav mesh, and a skeleton with the UEFN/Manny bone names. It matches bones by name, so a different skeleton can work, but it needs its own anim blueprint and may stretch. |
| 4 | Enabling it pulls 29 plugins not enabled at HEAD, all present in the engine install. It needs a pip download of PyTorch on first launch. No C++ change. No documented conflict with PoseSearch, Mover or GASP. |
| 5 | Enable AnimGenExample, open `/AnimGenExample/Levels/AnimGenExampleLevel`, press Play. |
| 6 | The restore set is 1261 files and 1155 MB, not 5.6 GB. The big blocker is `PC_Sandbox` casting to `GM_Sandbox`, which pulls in every other character. |
| 7 | Yes. All 4038 LFS objects of the commit are present. The 1261 needed ones are hash-checked. |
| 8 | 18 plugins listed below. 11 are needed (one only if the smart object component stays), 7 are not. |
| 9 | No path or file collides. SK_PR_Human never had the compatible skeletons in git. |

## AnimGen

### 1. What AnimGen does as implemented

- **Runtime, confirmed.** `FAnimNode_AnimGenController` is an anim graph node. Each frame it encodes the control input, runs a LOD0/1/2 denoiser network and a decoder, and writes a local-space pose, curves, notifies and root motion. It runs the networks through NNE (`NNERuntimeBasicCpu`), so inference is on the CPU, not the GPU. Source: `Engine/Plugins/Experimental/Animation/AnimGen/Source/AnimGen/Private/AnimNode_AnimGenController.cpp` (lines 96-113 create the inference objects, 364-480 evaluate them), `Public/AnimNode_AnimGenController.h`.
- **Pose history needed, confirmed.** The node reads root and bone history from PoseSearch's pose history (`AnimNode_AnimGenController.cpp:238`). So PoseSearch must be on at runtime.
- **Cost knobs, confirmed.** `LODLevel` 0 to 2, and `EvaluationPeriodInFrames` 0 to 8 (header lines 140-160). Both matter for a crowd of background NPCs. I did not measure cost.
- **Offline, confirmed.** Training only. `train_autoencoder.py` and `train_controller.py` in `AnimGen/Content/Python` are launched from the editor toolkits (`AnimGenEditorAutoEncoderToolkit.cpp:1238`, `AnimGenEditorControllerToolkit.cpp:1500`). Training data is an `AnimDatabase` asset.
- **No clip baking, confirmed.** A search of the source for creating `UAnimSequence` assets found only reads of existing sequences.
- **Two trained assets per character, confirmed.** `UAnimGenAutoEncoder` (AGAE_) learns the pose space. `UAnimGenController` (AGC_) learns control to pose, for one `UAnimGenBehavior` (trajectory follow, move to target, tagged style, idle and others, `AnimGenBehavior.h`).
- **Epic wording.** The API page calls the controller "a trained character controller that uses flow-matching and a neural-network to auto-regressively produce the character's pose frame by frame". Source: https://dev.epicgames.com/documentation/unreal-engine/API/Plugins/AnimGen/UAnimGenController?lang=en-US . Epic's learning page describes the plugin as experimental, for building and training ML animation controllers in the editor and evaluating them at runtime (search snippet only; the page returned 403 to my fetch): https://www.unrealengine.com/learning/septembers-epic-learning-content-metahumans-physics-animation-and-more .
- **Status.** `AnimGen.uplugin` says `IsExperimentalVersion: true`, `EnabledByDefault: false`, version 0.1.
- **Unconfirmed.** Epic's 5.8 release notes: a partial read of https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-5-8-release-notes found no AnimGen section, but about 100k of its 357k characters were only summarized and the last 78k were not read.

**Consequence:** The NPC test is a runtime test with no Python needed. Crowd cost is the open question, so the test must record frame time.

### 2. Trained model in the example, or training needed

- **Trained models ship, confirmed.** In `Engine/Plugins/Marketplace/AnimGenExample/Content/Characters/UEFN_Mannequin/Animations/`:

| Asset | Size | Role |
|---|---|---|
| `AGAE_AnimGenCharacter` | 3.0 MB | autoencoder, player |
| `AGC_AnimGenCharacter` | 41.9 MB | controller, player (walk, strafe, pistol aim and fire) |
| `AGAE_AnimGenNPC` | 3.4 MB | autoencoder, NPC |
| `AGC_AnimGenNPC` | 47.4 MB | controller, NPC (about 40 walk styles with props) |

  The name tables hold `ModelData`, `EncoderNetwork`, `DecoderNetwork`, `LOD0Network` to `LOD2Network`, `TrainedContentHash` and normalization stats, so they are trained, not empty shells. I did not load them in the editor, so "works immediately" is **unconfirmed** until the level runs.
- **Training data is only partly shipped, confirmed.** The plugin has five clips in `Civ/`: four long walk takes (415 to 559 MB each, 1.8 GB total) and one pistol fire. `ADB_AnimGenCharacter` (5 KB) points at the four walks plus `SM_Pistol`. The NPC controller names about 40 style clips (`Civ_Loc_Walk_Eating_Burger`, `..._Heels_Glamourous` and so on) and only the neutral male pair is shipped. There is no `ADB_AnimGenNPC`.
- **If we train our own:**
  - Inputs: an `AnimDatabase` asset with frame ranges and attributes, an autoencoder trained first, then a controller for one behavior (`AnimGenControllerToolkit`, `AnimGenAutoEncoderToolkit`).
  - Python: `PythonFoundationPackages` (numpy, scipy, Pillow, sympy and others), `PythonMLPackages` (torch 2.5.1+cu124, torchvision, torchaudio on Win64), `Tensorboard` (tensorboard 2.14.1), `LearningCore` (boto3 and others). Source: the `PythonRequirements` blocks in the `.uplugin` files under `Engine/Plugins/Experimental`. The editor installs them with pip into `Unreal/Intermediate/PipInstall`. That folder is empty at HEAD (confirmed), so this is a fresh download of several GB (size **unconfirmed**; torch cu124 wheels are large).
  - Defaults: autoencoder 250,000 iterations and batch 512 (`AnimGenAutoEncoder.h:441,453`), controller 500,000 training plus 200,000 distillation iterations and batch 512 (`AnimGenController.h:382,389,401`), device default GPU for both. The code comment says CPU training is "extremely slow" (`AnimGenController.h:447`).
  - GPU: **Likely broken on this PC.** `nvidia-smi` shows an RTX 5070 Laptop GPU with 8 GB. Torch 2.5.1+cu124 has no sm_120 (Blackwell) kernels; PyTorch 2.7.0 with CUDA 12.8 added them (https://discuss.pytorch.org/t/nvidia-geforce-rtx-5070-ti-with-cuda-capability-sm-120/221509). An Epic forum user hit the same on an RTX 5060 Ti and had to update PyTorch in the engine (https://forums.unrealengine.com/t/community-tutorial-animgen/2743773). Another user reported "training not started" on an RX 6800 XT and Epic replied it is looking into it. The training script falls back to CPU only when `torch.cuda.is_available()` is false, so a Blackwell card that reports available but lacks kernels would fail.
  - Time (community, not Epic): "half an hour" for a full run on a cloud GPU; "6 hours per attempt" on a weaker setup; about 5 minutes of mocap is the stated minimum for a new style; no checkpoint resume; cloud training not supported. Same forum thread.

**Consequence:** Skip training in this round. Use the shipped NPC controller. Training our own cast data later needs a torch upgrade or CPU, a data set of about 5 minutes per style, and hours per run.

### 3. What AnimGenNPC and ABP_AnimGenNPC need

- **Pawn, confirmed.** `AnimGenNPC` is a `Pawn`, not a `Character`. It has a `MoverComponent`, a `NavMoverComponent`, a capsule and a skeletal mesh. It uses `AIMoveTo`, a `DetourCrowdAIController`, and the `NavigationTarget` actor (`/AnimGenExample/Levels/LevelPrototyping/NavigationTarget`). It implements `MoverInputProducerInterface` and reads nav velocity. Source: name table of `Blueprints/AnimGenNPC.uasset`.
- **Anim blueprint, confirmed.** `ABP_AnimGenNPC` references `AGC_AnimGenNPC`, `BS_Neutral_AO_Stand` (aim offset), `CR_Biped_FootPlacement` (Control Rig), `BP_FoleyEvent`, `S_NPCPropertiesForAnimation`, and script modules AnimGen, PoseSearch, AnimationWarpingRuntime, ControlRig, DrawDebugLibrary and Mover.
- **Skeleton, confirmed.** Both bind to the plugin's own `/AnimGenExample/Characters/UEFN_Mannequin/Meshes/SK_UEFN_Mannequin`. The autoencoder lists the bones it was trained on: root, pelvis, spine_01 to 05, neck_01/02, head, clavicle, upperarm, lowerarm, hand, all finger and metacarpal bones, thigh, calf, foot, ball, twist bones, `ik_*`, `prop_01`, `props_root`, `weapon_l/r`, `contact_l/r`, `walk_bwd`, `walk_foley_l/r`, plus virtual bones `hand_l_prop_01` and `hand_r_prop_01`.
- **Matching is by bone name, confirmed.** The node looks bones up by name on the anim instance's skeleton and skips any it cannot find (`AnimNode_AnimGenController.cpp:295-297, 665-680`). It does not compare skeleton assets. `TrainedSkeleton` is only used by the editor.

| Target | Verdict |
|---|---|
| `SK_UEFN_Mannequin` from GASP in `/Game` | Works by bone name. The plugin copy and the GASP copy have the same bone-name set (name-table comparison, **approximate**). The plugin's ABP is bound to the plugin copy, so make a new ABP on the GASP skeleton. |
| `SK_PR_Human` (Manny bones plus `cc_` bones) | Has the main chain by name. Lacks `contact_l/r`, `prop_01`, `props_root`, `hand_*_prop_01`, `attach*` (name-table comparison). The node writes the trained local bone translations too, so limb lengths from the UEFN mannequin land on Marcus-sized bones. **Unconfirmed** whether that stretches visibly or whether the missing bones are in the required-bone list. |
| Any other skeleton | Same rule. One forum user's custom character trained fine but did not animate; Epic's advice was to check the log, add the Make Control Object node, check Mover setup, and enable root motion and force root lock on the data. |

**Consequence:** The safe route is to run AnimGen on the UEFN mannequin and retarget to cast meshes with an IK Retargeter, like GASP did with `ABP_GenericRetarget`. Driving `SK_PR_Human` directly is a second experiment.

### 4. What enabling it pulls in

- **Plugin list, confirmed.** `AnimGen.uplugin` requires PythonFoundationPackages, PythonMLPackages, AnimationWarping, LearningCore, NNERuntimeBasicCpu, AnimDatabase, TensorBoard, DrawDebugLibrary, PoseSearch, UAF, UAFAnimGraph and UAFPoseSearch. `AnimGenExample.uplugin` adds AnimGen, PoseSearch and Mover.
- **Full dependency walk, confirmed** (script over every `.uplugin` in the engine install, compared with the HEAD `.uproject`). AnimGen plus AnimGenExample gives a closure of 47 plugins. 29 of them are not enabled at HEAD: AnimDatabase, AnimGen, AnimGenExample, AnimationModifierLibrary, AnimationWarping, BlendStack, BlueprintMaterialTextureNodes, ChaosVD, Chooser, DrawDebugLibrary, EvaluationNotifies, HierarchyTable, HierarchyTableAnimation, Landmass, LearningCore, MotionWarping, Mover, NNERuntimeBasicCpu, NetworkPrediction, PoseSearch, PythonFoundationPackages, PythonMLPackages, Tensorboard, UAF, UAFAnimGraph, UAFAnimNode, UAFPoseSearch, Water, Workspace.
- **All present in the engine install, confirmed.** Every name resolved to a `.uplugin` under `C:\Program Files\Epic Games\UE_5.8\Engine\Plugins`. AnimGen ships Win64 editor DLLs. AnimGenExample is content only (1.9 GB, `Installed: true`).
- **Downloads.** Only pip. PythonFoundationPackages, PythonMLPackages, Tensorboard and LearningCore have `PythonRequirements`, installed by the editor on first launch after enabling. No Fab or launcher download is needed.
- **C++ changes.** None for enabling or using the node from Blueprint. The project is already a C++ project, so the build tolerates it. Not tested.
- **Conflicts.** I found no documented conflict with PoseSearch, Mover or GASP. AnimGenExample itself enables PoseSearch and Mover, and Epic's tutorial series has a "combine AnimGen with the Game Animation Sample Project" part (forum thread above). Known issues I found are the training-start failures in section 2. **Unconfirmed:** I did not read the 5.8.1 to 5.8.4 hotfix notes or the tutorial page itself (it renders with JavaScript and fetched empty).
- **Overlap with GASP.** The GASP plugins needed (section 8) and AnimGen overlap on PoseSearch, AnimationWarping, MotionWarping, Chooser, Mover, DrawDebugLibrary and UAF. `MovieSceneAnimMixer`, which the GASP anim blueprint uses, also depends on UAF.

**Consequence:** One plugin set serves both tasks: about 41 new plugins together, all local. Plan for the first-launch pip install (internet needed, several GB, Intermediate folder). Enable it on a branch or copy first, because Mover, UAF and NetworkPrediction change what the project loads.

### 5. Smallest test that shows AnimGen driving an NPC

1. Add `AnimGenExample` to the project's plugins (this enables AnimGen, PoseSearch and Mover). Let the editor finish the pip install.
2. Content Browser, show plugin content, open `/AnimGenExample/Levels/AnimGenExampleLevel`. It holds `AnimGenNPC` instances, about 50 `NavigationTarget` actors, a `RecastNavMesh`, a `NavMeshBoundsVolume` and a `PlayerStart`. Game mode is `/AnimGenExample/Blueprints/GM_AnimGenExample` (spawns `AnimGenCharacter`).
3. Press Play. Pass condition: NPCs walk between targets with varied styles and props, with no "controller not valid" log lines. Add `stat unit` for a rough cost reading.

The map name `/Game/Levels/AnimSandbox` appears in the level's name table. I do not know why (**unconfirmed**; likely a leftover). Watch for a load warning.

Second step, only after step 3 works: copy `ABP_AnimGenNPC` onto the GASP `SK_UEFN_Mannequin`, then onto `SK_PR_Human`, and compare.

## GASP restore

Method for 6 to 9: `git ls-tree`, `git cat-file` and `git lfs` read-only against `C:\Prod\ProjectRunner`. For every `.uasset` and `.umap` at `0cc2188~1` I read its LFS object directly (`.git/lfs/objects`) and pulled every `/Game/...` string from the first 24 MB (whole file under 48 MB). That is the name table plus soft references, so the closure is an upper bound, not an exact import list. Then I followed references transitively from the three roots. Sizes are the real LFS sizes. Nothing was checked out, restored or written in the repo or in `C:\Prod\_archive\Sandbox`.

### 6. Minimal closure for SandboxCharacter_CMC, PC_Sandbox, SKM_UEFN_Mannequin

**The cast problem, confirmed.** `PC_Sandbox` has a `K2Node_DynamicCast_AsGM_Sandbox` (name table), a hard reference to `GM_Sandbox`. `GM_Sandbox` references `BP_Echo`, `BP_Manny`, `BP_Quinn`, `BP_Twinblast`, `BP_UE4_Mannequin`, `BP_Kellan` and `SandboxCharacter_Mover`. Following all of that gives the full set: 2697 files, 4436 MB, including Echo (1.1 GB), Paragon (0.75 GB), MetaHumans (0.3 GB) and the UE5/UE4 mannequins.

Cutting at `GM_Sandbox` (restore the file, leave its children out) gives set B:

| Measure | Value |
|---|---|
| Files | 1261 (list in `gasp-restore-list.txt`) |
| Size | 1155 MB |
| Of which UEFN animations | 974 files, 1093 MB |
| Everything else | about 62 MB |

Set B by folder (old tree total in brackets):

| Folder under `Unreal/Content` | In set B | Whole folder at 0cc2188~1 | Verdict |
|---|---|---|---|
| Characters/UEFN_Mannequin | 1,101 MB (Animations 1,093, meshes 3.3, textures 4.5, rigs 0.4, materials 0.1) | 2,737 MB, 2363 files | Restore the part in the list. Skipped: Avoidance, LookAtPOI, Ragdoll, Slide folders; 97 of 169 PSD databases that the character does not reference (the Relaxed set, interactions, ragdoll); IK rig and retargeter assets. |
| Blueprints | 10.5 MB, 95 files | 35.7 MB, 176 files | Restore the listed ones. Left out: Mover character and ABP, RetargetedCharacters, Ragdoll game mode. |
| Audio | 7.1 MB, 138 files | 27.3 MB | Needed. `SandboxCharacter_CMC` references `AC_FoleyEvents`, which pulls the Foley bank and MetaSounds. Could be cut only by editing the character in the editor. |
| Input | 19 files, under 1 MB | 0.4 MB | Needed (`IMC_Sandbox` and `IA_*`). `TIS_MobileControls` and `MobileHUD` are not needed. |
| Levels | 36.1 MB, 21 files (LevelPrototyping only) | 39.8 MB | Only LevelPrototyping, pulled in through `AC_TraversalLogic` to `LevelBlock_Traversable`, 34.8 MB of it sky and grid textures. Skip the five sample maps (DefaultLevel, LocomotorLevel, LookAtPOI_Level, NPCLevel, RagdollLevel). |
| Misc | 1 file | 1 file | Needed (`SandboxAnimCurveCompressionSettings`). |
| Characters/Echo | 0 | 1,116 MB | Leave out. |
| Characters/Paragon | 0 | 750 MB | Leave out. |
| Characters/UE5_Mannequins | 0 | 349 MB | Leave out. |
| Characters/UE4_Mannequin | 0 | 16 MB | Leave out. |
| MetaHumans | 0 | 300 MB | Leave out. |
| IsolatedExamples | 0 | 142 MB | Leave out. |
| Movies | 0 | 55 MB | Leave out. |
| Widgets | 0 | 2.7 MB | Leave out (`GameAnimationWidget` is not referenced). |

**Motion matching databases, confirmed in the name table.** `SandboxCharacter_CMC_ABP` references `CHT_PoseSearchDatabases` and `CHT_CMCCharacterAnimations`. Set B holds 72 `PSD_` databases, 10 `PSS_` schemas and 7 chooser tables, plus the animations they list.

**Unresolved names, 62 in the full set and 45 in B.** All are either folder prefixes, numbered sound variants (`Foley_fs_1p_sneaker_concrete_walk` against `..._walk_01` files), or a developer path (`/Game/Developers/josevillarroel/Ciri`). None is a missing asset I could identify. **Unconfirmed** until the editor loads the set.

**Correction, 2026-11-06, from the editor load in task 1.** The "numbered sound variants" reading above is wrong, and set B was 158 files short. Unreal stores a trailing `_10`, `_20` or `_180` as a number on the name, so the name-table scan never saw those packages. The editor load found 140 Foley sound waves and 18 animations missing, all imported by restored assets. Set B is now 1419 files, in `ProjectRunner/Unreal/Scripts/walkthrough/gasp_restore_list.txt`. The cross-check below covers only the original 1261.

**Cross-check against the archive copy, confirmed.** All 1261 files in set B exist in `C:\Prod\_archive\Sandbox\Unreal\Content` with the same SHA-256 as the LFS object at `0cc2188~1`. So the archive is a valid second source and needs no LFS.

**Other things the closure needs, confirmed:**
- C++: none. No file in set B references the project module.
- Config: `DefaultEngine.ini` and `DefaultGameplayTags.ini` did not change between `0cc2188~1` and HEAD, so any GASP collision or tag settings are still there. Changed since: `DefaultInput.ini` (touch interface set to None), `DefaultGame.ini` (cook map), `DefaultEditor.ini`.
- Game mode: before `0cc2188`, `PRGameMode.cpp` loaded `/Game/Blueprints/SandboxCharacter_CMC` and `/Game/Blueprints/PC_Sandbox` as soft classes. HEAD sets `DefaultPawnClass = APRCharacter`. A walkthrough map needs a game mode that points back at the GASP pawn and controller (a Blueprint child of `PRGameMode` or a World Settings override; whether `DefaultPawnClass` is editable on it is **unconfirmed**).
- Do not restore `ABP_GenericRetarget`. The old setup hid the UEFN mannequin and copied its pose to cast meshes with it. For a visible UEFN player it is not needed, and it pulls in 468 more files and 2.2 GB through the retargeters.

**Consequence:** Restore set B (1.16 GB, 1261 files), or copy it from the archive. Decide before restoring how to handle `PC_Sandbox` to `GM_Sandbox`: (a) restore `GM_Sandbox` as is and accept load warnings for missing characters, (b) write a small new player controller and game mode and skip both, or (c) restore the 468-file extras. Option (b) removes the cast without touching GASP assets. The `K2Node_DynamicCast` in `PC_Sandbox` shows a cast-fail pin, so (a) likely loads, but that is **unconfirmed**.

### 7. LFS objects in `.git/lfs/objects`

- **All present, confirmed.** The `0cc2188~1` tree has 4040 files under `Unreal/Content`. 4038 are LFS pointers (the other two are font licence `.txt` files). All 4038 objects exist locally, and every object size matches its pointer. Total 5,637 MB for the whole tree. Local store is 7.1 GB.
- **Set B hash-checked, confirmed.** SHA-256 of all 1261 objects (1155 MB) equals the object ID. Zero missing, zero bad.
- Tools: `git ls-tree`, `git cat-file --batch`, filesystem checks, SHA-256. I did not run `git lfs fsck`.

**Consequence:** No network or `git lfs fetch` is needed to restore.

### 8. The 18 plugins removed from the `.uproject`

`0cc2188~1` listed 28 plugins, HEAD lists 10. Removed (all `Enabled: true`, no `TargetAllowList`):

| Plugin | Needed by set B? | Evidence |
|---|---|---|
| PoseSearch | Yes | Motion matching; `/Script/PoseSearch` in 795 files. |
| AnimationWarping | Yes | `SandboxCharacter_CMC_ABP`, `AC_TraversalLogic`. |
| MotionWarping | Yes | `SandboxCharacter_CMC`, traversal montages (74 files). Also a PoseSearch dependency. |
| Chooser | Yes | 18 files, includes ProxyTable. |
| Mover | Yes | Script module referenced in `SandboxCharacter_CMC_ABP`, `AC_TraversalLogic` and the smart object task assets, although the CMC character does not use Mover movement. |
| NetworkPrediction | Yes | Required by Mover. |
| DrawDebugLibrary | Yes | `SandboxCharacter_CMC_ABP`, `AC_SmartObjectAnimation`, `BFL_HelpfulFunctions`. Also an AnimGen requirement. |
| CurveExpression | Yes | One file: `SandboxCharacter_CMC_ABP`. |
| MovieSceneAnimMixer | Yes | One file: `SandboxCharacter_CMC_ABP`. Pulls in UAF, UAFAnimGraph, UAFMirroring and SequencerAnimTools. |
| SmartObjects | Yes | `SandboxCharacter_CMC` references it (18 files). |
| GameplayInteractions | Yes, if the smart object component stays | One file: `AC_SmartObjectAnimation`, which `SandboxCharacter_CMC` holds. Pulls StateTree, ContextualAnimation, NavCorridor. |
| RigLogic | No | MetaHumans only; no hit in set B. |
| HairStrands | No | No hit in set B (Echo and MetaHuman grooms are outside it). |
| AnimationLocomotionLibrary | No | No hit in set B. |
| AnimationLayering | No | No hit in set B. |
| ChaosMover | No | Mover character only. |
| MoverExamples | No | Mover character only. |
| Locomotor | No | Only the `IsolatedExamples` folder uses it. |

That makes 11 needed (10 plus GameplayInteractions, which depends on keeping `AC_SmartObjectAnimation`) and 7 not needed. Dropping the smart object component would also drop SmartObjects, StateTree, ContextualAnimation and NavCorridor, but it means editing `SandboxCharacter_CMC` in the editor.

Engine-default plugins that set B also touches: ControlRig, EnhancedInput, GameplayCameras (`EnabledByDefault: true` in their `.uplugin`). The dependency walk found all needed plugins in the engine install. GASP's 11 pull in 30 plugins not enabled at HEAD once dependencies are counted. AnimGen's group pulls 29. Together it is 41, so AnimGen adds 11 beyond GASP.

**Consequence:** Add 11 plugins to the `.uproject` for GASP, not 18.

### 9. Conflicts at HEAD

- **Paths, confirmed.** No file in set B, and no file in the whole GASP part of the old tree (Audio, Blueprints, Characters, Input, IsolatedExamples, Levels, MetaHumans, Misc, Movies, Widgets), exists at HEAD or in the working tree, by exact or case-insensitive match. The only overlaps with the old tree are `ProjectRunner/` and `StoryFlow/`, which are not GASP and are not in the restore list. Nothing would be overwritten.
- **`Characters/Mannequins`, confirmed.** HEAD has 3 meshes (`SK_Mannequin`, `SKM_Manny_Simple`, `SKM_Quinn_Simple`) and 102 animations (Rifle, Pistol, Unarmed, Death). This is the third-person template set, in a different folder from GASP's `UEFN_Mannequin`, `UE5_Mannequins` and `UE4_Mannequin`. No path collision. Set B skips `UE5_Mannequins`, which likely holds its own `SK_Mannequin` (**unconfirmed**), so two skeletons with that name should not appear. Those template assets already have 1,140 dangling `/Game/...` references at HEAD (for example `/Game/Characters/Mannequins/Rigs/PA_Mannequin`); none of them are GASP paths.
- **Untracked folders in the working tree.** `ProjectDev` (2687 files) and `ThirdParty` (1804) do not overlap with any restore path.
- **Plugin-content copies.** `AnimGenExample` has its own `SK_UEFN_Mannequin` and `SKM_UEFN_Mannequin` under `/AnimGenExample/...`. These are separate packages from the GASP copies under `/Game/...`. No collision, but two skeleton assets with the same name and bone set that Unreal treats as unrelated.
- **Dangling reference worth knowing.** `L_PR_Persistent`, `L_G1_Street` and `L_G1_Blockout` contain the string `/Game/Levels/DefaultLevel`, a map that exists only in the old tree. Probably a stale name; not in set B. **Unconfirmed.**
- **SK_PR_Human, confirmed history, unconfirmed content.** `Unreal/Content/ProjectRunner/Characters/Shared/SK_PR_Human.uasset` was added in `0cc2188` and has no earlier or later commit (`git log --all`). So git holds no "before" version with compatible skeletons or retarget sources. Its name table has the property name `CompatibleSkeletonList` but no skeleton path, and no retarget source names. So the list is empty or was never saved with entries. If someone removed them, it happened before the first commit (**unconfirmed**). `IK_PR_Human` (an IK Rig) was added in the same commit.
  - Effect on GASP: none for the player, who uses `SKM_UEFN_Mannequin`. It matters only if GASP animations or the GASP anim blueprint must play directly on `SK_PR_Human`. Then add `SK_UEFN_Mannequin` to its compatible skeletons or retarget through an IK Retargeter. The old tree has `IK_UEFN_Mannequin` (not in set B) and several `RTG_UEFN_to_*` examples.
  - Effect on AnimGen: none for the skeleton asset, since AnimGen matches bone names (section 3).

**Consequence:** The restore adds files only. The work is wiring (game mode, plugins), not conflict resolution.

## What this changes in the plan

- Restore GASP as set B (1261 files, 1.16 GB), not the old 5.6 GB tree. Copy from `_archive\Sandbox` (hash-identical) or restore from `0cc2188~1`; LFS is complete either way.
- Decide the `PC_Sandbox` to `GM_Sandbox` cast first: stub, or replace both with a small project controller and game mode.
- Re-enable 11 plugins for GASP, not 18 (30 with dependencies). AnimGen adds 11 more (41 total), all in the engine install, plus a first-launch pip download.
- Skip AnimGen training for now. The four shipped AGAE/AGC assets should run. Training on this RTX 5070 (Blackwell) needs a newer torch or CPU.
- Run the test in the plugin's own level first. Record frame time with a crowd, and try `LODLevel` and `EvaluationPeriodInFrames` before judging cost.
- Put AnimGen on the UEFN mannequin and retarget to cast meshes. Driving `SK_PR_Human` directly is a second experiment. Expect missing `contact_*` and `prop_*` bones and possible limb stretch.
- Do the plugin enable on a branch or copy of the project, and load the restored set once to confirm the 45 unresolved names are harmless.
