# Animation sources for ProjectRunner

Researched 2026-10-28. Data files are in `research/mixamo/`. Items marked (unconfirmed) were not verified from a primary page.

## Mixamo catalogue list

Adobe publishes no official list or API docs. Community scripts call the undocumented endpoint `https://www.mixamo.com/api/v1/products` with `type=Motion%2CMotionPack`, `limit=96`, a bearer token and `X-Api-Key: mixamo2` (https://gist.github.com/bruteforks/c1f8ff7b50a46bcd3edfa2e61523a4c2). Scraping with a personal token may breach Adobe's terms (unconfirmed). I did not run any scraper.

Best sources:

1. Hugging Face dataset Linzhan/Mixamo-Animations-Characters (https://huggingface.co/datasets/Linzhan/Mixamo-Animations-Characters). A full snapshot: 2,317 moving clips, 2,446 files with 129 static poses, 114 characters. Last modified 2026-09-07 (https://huggingface.co/api/datasets/Linzhan/Mixamo-Animations-Characters). `animation_motion_prompts.json` maps each FBX to a short `prompt` name, a longer `description` and the Mixamo `motion_id`. There are 1,516 unique short names. No category tags, so the description text is the only filter hook; I filtered by keyword. The licence tag is `adobe-mixamo-terms` and the card calls it a research convenience mirror. A second copy exists at tanish434/Mixamo-Animations-Characters (https://huggingface.co/datasets/tanish434/Mixamo-Animations-Characters).
2. gnuton's downloader (https://github.com/gnuton/mixamo_anims_downloader) and MixamoHarvester (https://github.com/paulpierre/MixamoHarvester). These generate a fresh list from your own login. Use one if you need the live catalogue.
3. MetalRenderer pull request 75 reports a 2,446-motion export (https://github.com/IIMrFreemanII/MetalRenderer/pull/75). Secondary; no list I could reuse.

Saved: `research/mixamo/mixamo-prompts-hf.json` (the 381 KB prompts index, data only). Written: `research/mixamo/mixamo-candidates.csv`, 83 clips across locomotion, idle, leaning, talking, phone, smoking, eating_drinking, sitting and interaction. Every name was checked against the JSON. Columns are category, mixamo_name, use, notes.

Gaps: the JSON has no eating clip, no hacking clip and no broom or sweeping clip. Bartending, Button Pushing, Pulling Lever and Using A Fax Machine are the nearest stand-ins.

Mixamo terms: a 2022 Adobe community FAQ says use is free for unlimited commercial use, but you cannot distribute the raw character or animation files, and you cannot train machine-learning models on them (https://community.adobe.com/t5/mixamo-discussions/mixamo-faq-licensing-royalties-ownership-eula-and-tos/td-p/13234775). That post dates from a preview period. The live terms are at https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html, which returned 403 to me. Mixamo animations are bipedal humanoid only. Shipping a game that uses baked animations is fine; shipping the raw FBX is not.

Manny fit: Mixamo uses the 65-joint `mixamorig` skeleton (dataset card above). It needs an IK Retargeter to Manny.

## Mesh2Motion

What it does: a browser tool. You import a model (GLB, GLTF, DAE, FBX), pick a skeleton type, fit it to the mesh, and export with bundled animations as GLB or FBX (https://mesh2motion.org). Skeleton types listed: human, bird, dragon, spider, kaiju, fox, horse, fish, snake. The site says over 170 animations.

Licence: code is MIT, art assets and animations are CC0, "free for personal or commercial use" (https://github.com/Mesh2Motion/mesh2motion-app and https://mesh2motion.org). The GitHub API reports the licence as "other" because the repo ships two files, `LICENSE-MIT.MD` and `LICENSE-CC0.MD`.

Maturity: created 2023-12-07, last push 2026-10-26, 3,603 stars, 34 open issues and PRs (https://api.github.com/repos/Mesh2Motion/mesh2motion-app). Actively developed.

Manny fit: unconfirmed. Neither the README nor the site mentions Unreal or Manny. Issue 130 noted that Unreal handles animated GLB badly; it was closed on 2026-08-06 because FBX export was being added (https://github.com/Mesh2Motion/mesh2motion-app/issues/130). Expect an IK Retargeter step to Manny, as with Mixamo, and test one clip first. How many of the 170 clips are human, and whether they include sit, lean, phone or smoke, is unconfirmed.

## Other sources

Quaternius Universal Animation Library: 120+ animations on a universal humanoid rig, CC0, commercial OK, FBX/GLB/Blend, with an Unreal version in the Source tier. Covers locomotion, sitting, death, combat and emotes (https://quaternius.com/packs/universalanimationlibrary.html). The page does not claim Manny compatibility, and the price is not readable on it.

Rokoko free packs: its resource pages say free packs can be used in games including commercial work, and export to Mixamo, Unreal and Human IK skeletons (https://www.rokoko.com/resources/download-263-rokoko-motion-capture-assets). This is a marketing page, not licence text. Check the terms in Rokoko Studio.

Fab free pack: one listing offers 24 mocap animations on SKM_Manny/Quinn, no retarget needed, free for commercial use, with locomotion, rifle and injured sets (https://www.fab.com/listings/8de31c5d-93bc-4bd4-9606-ca789ce91b99). Only 24 clips, mostly combat. I found no source for a monthly free animation schedule (unconfirmed).

CMU mocap database: "free for all uses", and may be included in commercially sold products but not resold directly, even converted (http://mocap.cs.cmu.edu/). ASF/AMC and BVH; needs cleanup and retargeting. Raw, noisy, no Manny skeleton.

100STYLE: CC BY 4.0, credit "The 100STYLE Dataset - Ian Mason" (https://ianxmason.github.io/100style). Locomotion styles only, not seated or social.

Bandai Namco Research motion dataset: CC BY-NC 4.0 per the repo README (https://github.com/BandaiNamcoResearchInc/Bandai-Namco-Research-Motiondataset/blob/master/README.md). Some press says CC BY-NC-ND (https://www.cgchannel.com/2022/05/download-3000-free-mocap-moves-from-bandai-namco-research/). Not for commercial use either way.

Cascadeur: the free tier is non-commercial and exports .casc only. Indie adds FBX export and requires revenue under $100k a year. Pro removes the cap (https://cascadeur.com/plans). Prices differ between sources. Good for hand-keying, not a library.

Rigify and Blender: Rigify rigs need a game-rig export to reach Unreal cleanly. A recent forum thread shows a Rigify to UE 5.8 retarget failing until the bone hierarchy matched (https://forums.unrealengine.com/t/blender-rigify-to-ue-5-8-gasp/2746160). Add-ons such as Rigify Exporter (https://www.blenderkit.com/addons/ac766b5e-b730-4763-aba8-fe8f4bea7544) and the paid Rig2U5 (https://superhivemarket.com/products/rig2u5) exist. I did not fetch the licence for Rigify itself (unconfirmed).

UE built-in auto-rig: I found no Epic documentation of a built-in auto-rig in the Skeletal Mesh Editor for 5.4 to 5.8 (unconfirmed; the editor page lists none: https://dev.epicgames.com/documentation/en-us/unreal-engine/skeletal-mesh-editor-in-unreal-engine). Mutable generates meshes at runtime and is not an auto-rigger (https://dev.epicgames.com/documentation/unreal-engine/mutable-overview-in-unreal-engine). Ludus is a third-party plugin that auto-rigs in UE 5.4 to 5.8 (https://docs.ludusengine.com/generation/rigging). I did not check its licence.

ActorCore free motions: not found (unconfirmed). Kenney animations: not checked.

## Text-to-motion models

MotionGPT and MDM code are MIT, but both depend on SMPL, SMPL-X, CLIP and datasets with their own licences (https://github.com/OpenMotionLab/MotionGPT, https://github.com/GuyTevet/motion-diffusion-model). I did not check the SMPL or HumanML3D terms (unconfirmed). MoMask is listed as MIT on a third-party page (https://www.sourcepulse.org/projects/1834288). The ReMoMask derivative is CC BY-NC-SA 4.0, which forbids commercial use (https://huggingface.co/AIGeeksGroup/ReMoMask/blob/refs%2Fpr%2F1/README.md). HY-Motion: nothing found. All of these output SMPL skeletons and would need retargeting plus cleanup. Treat them as non-commercial until the weights and dataset licences are read.

## Comparison

| Tool or library | What it gives | Licence | Commercial OK | Manny fit |
|---|---|---|---|---|
| Mixamo | 2,317 humanoid clips, auto-rig | Adobe terms, no raw redistribution | Yes, in a built game | Retarget from mixamorig |
| Mesh2Motion | Browser auto-rig, 170+ clips, GLB/FBX | MIT code, CC0 assets | Yes | Unconfirmed, retarget likely |
| Quaternius UAL | 120+ clips, universal rig | CC0 | Yes | Retarget; Unreal version in Source tier |
| Rokoko free packs | Mocap clips | Free incl. commercial (marketing page) | Yes | Exports for Unreal skeleton |
| Fab free pack | 24 clips | Free incl. commercial | Yes | Native Manny |
| CMU mocap | Raw mocap, thousands of clips | Free for all uses, no resale | Yes | Retarget plus cleanup |
| 100STYLE | Locomotion styles | CC BY 4.0 | Yes, with credit | Retarget |
| Bandai Namco | 3,000 clips | CC BY-NC 4.0 | No | Retarget |
| Cascadeur | Animation authoring | Free tier non-commercial | Indie and up | FBX needs paid tier |
| Rigify | Blender rig system | Not checked | Unconfirmed | Needs game-rig export |
| Text-to-motion (MDM, MotionGPT, MoMask) | Generated SMPL motion | MIT code, restricted deps | Unclear, treat as no | Retarget plus cleanup |
