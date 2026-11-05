# Cascadeur 2026.2 workflow research

Researched 2026-11-05 against the official help at cascadeur.com. Installed build: 2026.2.3. All pages were read through a fetch tool that summarizes pages, so wording is paraphrased. Where a page did not cover a point, it is listed under "Open questions" and not guessed. Version tags in brackets say which release a claim applies to. Help pages are not versioned, so a claim without a tag describes the current help (2026.2.x).

## 1. Release line and AI tools

Release line: 2026.1 (April 2026), 2026.2, then patches 2026.2.1, 2026.2.2, 2026.2.3. Index: https://cascadeur.com/help/release_notes

2026.1 (https://cascadeur.com/help/category/312):
- Filament renderer replaces the old one.
- New Unreal Live Link, rebuilt, funded by an Epic MegaGrant.
- Root Motion, a generative AI tool (renamed Motion Generation in 2026.2).
- Collision Penetration Cleaning.
- AutoPosing: better quadrupeds, Point Constraints supported, no more pulling other rigs in multi-character scenes.
- Point Constraints also count in AutoPhysics and Ragdoll.
- Quick Rigging Tool templates for meshy.ai and Auto Rig Pro.
- Inbetweening now accounts for surrounding interpolation.

2026.2 (https://cascadeur.com/help/category/319):
- Additive Layers (Alpha), under Window > Animation Layers (https://cascadeur.com/help/category/318).
- Easing button on the Timeline, adds weight controls to intervals (https://cascadeur.com/help/category/317).
- UI localization, PySide custom UI, a simple MCP server (Scripts menu), BVH animation import (Commands > Import BVH animation, animation data only), Python stub files.
- Inbetweening retrained on larger datasets and now passes styles between keys (https://cascadeur.com/help/category/278).
- Root Motion renamed Motion Generation, also retrained (https://cascadeur.com/help/category/309).
- AutoPosing: hands and feet adjust to the environment; updated neural networks for AutoPosing and Retargeting.
- Collision Penetration Cleaning now respects Fulcrums and runs inside the AutoPhysics pass, but only against ground and Kinematic colliders.
- Snap to Physics redesigned: asks whether to apply to all frames or only keyframes. All frames marks interpolation green; keyframes only does not.
- Live Link updated for Unreal Engine 5.8.
- Textures deprecated in favor of Materials.

Patches: 2026.2.1 fixed Live Link, an FBX blendshape-without-skin crash, FBX non-ASCII texture paths, and made quadruped AutoPosing adjust to the environment (https://cascadeur.com/help/category/322). 2026.2.2 fixed a Mocap crash and non-ASCII save paths (https://cascadeur.com/help/category/323). 2026.2.3 improved AutoPosing performance, fixed a Live Link reconnection crash and the Meshy template (https://cascadeur.com/help/category/324).

AI tools, as the official "Use of AI Tools" page defines them (https://cascadeur.com/help/category/285):
- AutoPosing, Inbetweening, AutoInterpolation and the Video Mocap tool use machine learning.
- AutoPhysics, Ragdoll, Animation Unbaking and Fulcrum Motion Cleaning do not.
- AutoPosing, AutoInterpolation and Inbetweening were trained on Nekki's own animation (Shadow Fight series, SPINE), extra mocap and certified third-party packs. Video Mocap uses open-source libraries plus post-processing.
- Nekki says it does not collect users' animations for training.
- The page says the tools assist and "do not entirely replace" animation.

What each tool does and its limits:
- Inbetweening (https://cascadeur.com/help/category/278): generates animation for a selected Timeline interval from the poses in its keyframes. Needs at least two keyframes, and the gap between neighboring keys can be at most 120 frames. Started with the "AI" button in the Interpolation mode selector (since 2025.3; before that a Toolbar button). Output is Fixed interpolation. Settings: AI description, Style, Fulcrum Motion Cleaning, Update Inbetweening. The Limitations section of this page did not load (the page is 336k characters, mostly an inline image).
- Motion Generation, formerly Root Motion (https://cascadeur.com/help/category/309) [2026.1+]: produces an animation from a character's trajectory. Needs a start and end key at minimum, an interval selected, then Run Motion Generation on the Toolbar. It does not strictly follow keys and can ignore them, even at max Keyframes force. Output is Fixed interpolation and not physically accurate, so the page says to follow it with Physics Tools. Settings are in Scene Settings > Motion Generation: Head Direction force, Keyframes force, Styles, Style force, Trajectory Force, Reference Mode and Reference force, Use Fulcrum Motion Cleaning.
- Video Mocap, "Mocap (Alpha)" (https://cascadeur.com/help/category/203): about 700 MB download on first click. Input is .mp4 only, imported through File > Import > Reference video. One actor only. Accuracy is limited by single-view 2D. Slow.
- Direct answer to "AI agent / animate from key poses": I found no text-to-motion, no AI agent, and no "animate with AI" feature in the help. The closest are Inbetweening (fills between your keys) and Motion Generation (generates from keys plus trajectory). The 2026.2 MCP server is described only as "simple" (Scripts menu); the release notes give no detail on what it exposes.

## 2. Keyframe workflow

Official pipeline (https://cascadeur.com/help/animation_pipeline): Reference, Drafting, Spline, Physics, Polishing.

- Drafting (https://cascadeur.com/help/animation_pipeline/drafting_creating_poses): select a frame, click Add or remove key (F). Point Controller Mode is the main posing mode; Box Controller Mode is for fingers and cloth. Translate is W, Rotate is E. R fixes (pins) a controller. Silhouette Mode checks readability. The page does not discuss stepped blocking explicitly, but Step is the default interpolation (below).
- Spline (https://cascadeur.com/help/animation_pipeline/spline): add interpolation intervals between key poses, refine timing and spacing, check spacing with Trajectories, adjust limbs with Kinematics, and use Animation Tracks only when body parts need different keys or interpolation.
- Interpolation types (https://cascadeur.com/help/tools/timeline_tools/interpolation). Select frames on the Timeline and choose a type:
  - Step (default, white): no in-between values. This is the blocking mode.
  - Linear (beige), Bezier (light blue), Bezier viscous, Bezier clamped (teal; recommended for ground-level motion and Fulcrum Points).
  - Fixed (green): every frame stores a full pose, so you can edit single frames without adding keys.
  - Inbetweening: a tool that outputs Fixed.
  - Mixed (light pink): folders whose tracks differ.
  - Kinematics per interval or key: Inverse (IK, default), Forward (FK), Global Rotation (GR).
  - Copy an interval with Edit > Copy Timeline Interval, paste with Edit > Paste Timeline Interval (overwrites).
  - Easing [2026.2+]: Easing button on the Timeline.
- Timeline interval tools: Stretching Mode, Interval Edit Mode, Fixing interpolation on change, Reset tangents, Change interpolation (On interval or On current frame) (https://cascadeur.com/help/interface/timeline).
- Tween Machine (https://cascadeur.com/help/tools/animation_tools/tween_machine): a tab on the right of the Viewport. Filter type (Previous/Next, Inverse/Forward inertial, Interpolation/Average), Target (Current Frame or Selected Frames), Mode (Global, Local, Relative), All frames or Only key frames, and a slider. Advanced: Factor 0 to 100, Relaxation, Frame change mode (Set key, Set fixed, Do nothing). The page lists no hotkeys.
- Ghosts (https://cascadeur.com/help/category/22): Toolbar modes Off, Previous frames, Subsequent frames, Both, Selected frames; KeyFrame mode; frame counts; Ghost outlined mode.
- Trajectories (https://cascadeur.com/help/tools/animation_tools/trajectories): modes Parent, All, Edges, Object and Edge, Using only key frames; Relative to pivot (Trajectory tab in Scene settings); Set Trajectory Interval; Trajectory Edit Mode. Moving an interpolation frame in edit mode sets that interval to Fixed. AutoPosing controllers show no trajectories.
- Fulcrum and contact points: see section 4.
- Animation Cycles (https://cascadeur.com/help/tools/timeline_tools/animation_cycles): Timeline buttons Create cycle, Cycle resizing, Remove cycles, Create cycle with position and rotation offset, Create cycle with position offset. Select an interval with at least one key first. Border colors: bright purple regular, darker purple position and rotation, orange position only. First and last frames merge. Stretching Mode does not work with cycles. Cycles cannot be copied (a copy becomes a regular interval).
- Polishing (https://cascadeur.com/help/animation_pipeline/polishing): Time Factor 0.3 for slow motion; remove jitter by copying Global position onto keys; remove sliding with Bezier clamped on legs on their own Animation Track, extra keys, or Fixed (only when otherwise done); Trajectory Edit Mode; Tween Machine "Attract to previous position" (hotkey only).
- Secondary Motion is an AutoPhysics add-on (section 4), not a step on the Polishing page. Its own page is https://cascadeur.com/help/category/195 (not read).

## 3. AutoPosing

Source: https://cascadeur.com/help/tools/animation_tools/autoposing

- How it works: you move a controller with Manipulators and the neural network predicts the rest of the pose. Moved controllers turn blue (active), unmoved ones stay green (inactive) and follow. Active sets are per keyframe. It overwrites existing poses, so use it for blocking or building from scratch.
- The page does not use the term "Smart points". It names Main controllers (follow the body chain, no Locked parameter), Additional controllers (toggle with "AutoPosing: Additional points", have Locked), Direction controllers (set facing), and Ankle controllers (always active).
- Keys: R fixes or unfixes, Shift+Z is "AutoPosing: Switch lock" (deactivate), "AutoPosing: Update" recalculates from Point Controller poses, Alt+right-click places the pivot.
- Supported rigs: humanoid and quadruped. Quadruped needs Pro or higher (https://cascadeur.com/plans). It needs the standard Cascadeur rig. Easiest route is the Quick Rigging Tool (Humanoid or Quadruped tab, Add rig elements, Generate rig). Tick "Create autoposing" in the Rigging Tool, or enable the tool afterwards.
- Custom rig: element counts must match (spine 5: pelvis, stomach, chest, neck, head; each arm 4; each leg 4). Add heel Additional Points via Rigging tools > Additional actions > Point controller > Add. Fill the Auto posing info parameters per element (turn on "Show hidden behaviors" in Object Properties). Missing required fields block controller generation. Quadruped counts: 8 spine, 6 per foreleg, 5 per hind leg, 5 tail.
- Props can get AutoPosing points ("Autoposing props" Add). Fingers via the Quick Rigging Tool Hand tabs (https://cascadeur.com/help/category/205).
- Limits: do not fix Point Controllers that do not coincide with AutoPosing controllers; avoid fixing elbows and knees; copy and paste of AutoPosing controllers works only in Global; "Enable AutoPosing tool" twice on one character errors; Snapping Inverted Angle default is 70 (Settings Window > AutoPosing).
- Multi-character: works; select the point controllers of the character you want. 2026.1 fixed AutoPosing points pulling other rigs.

## 4. AutoPhysics and Physics tools

Sources: https://cascadeur.com/help/tools/physics_tools/autophysics, https://cascadeur.com/help/animation_pipeline/physics, https://cascadeur.com/help/tools/physics_tools/fulcrum_points, https://cascadeur.com/help/tools/physics_tools

- Tool list: AutoPhysics, Ballistic Trajectory, Ballistic Ghosts, Center of Mass, Fulcrum Points, Ragdoll, Fulcrum Motion Cleaning, Interaction with Environment. Angular momentum is not a named tool or page in the docs I read.
- When to apply: after the animation is built. AutoPhysics shows a Physics Assistant ghost; click "Snap to AutoPhysics" to accept. The character needs a Center of Mass with the Mesh connected. Toolbar: Switch AutoPhysics, Snap to AutoPhysics, Switch Frozen AutoPhysics, Set Priority Frame (each extra priority frame costs speed).
- Colors: green (original is fine), red (no physical solution, fix poses or timing), blue (edited, recalculate by turning off Frozen). Timeline fulcrum line: orange ballistic, yellow weak, green strong, gray unused.
- Point Controller options: Keep global rotation and Keep global translation (0 to 100).
- Snap add-ons: Compensation Motion, Smooth Rotation, Secondary Motion, Restore Unbound, Smooth Trajectory, Separation of Motion. The page says they are meant to be used once, so they are typically disabled after the first snap.
- [2026.2] Snap to Physics asks all frames or keyframes only. Collision Penetration Cleaning now runs inside the AutoPhysics pass.
- Ballistic Trajectory: select the Center of Mass, select the interval from the last frame before takeoff to the first frame after landing, click Ballistic Trajectory, edit the curve, then "Snap centers of mass to selected trajectory". Ballistic ghosts: purple means rotation is not physically accurate, red means accurate; "Snap to ballistic ghosts" applies.
- Pose balance: the CoM projection should land on the fulcrum point, or between several, for standing poses.
- Fulcrum points are detected automatically when a Point Controller is near ground level and barely moves between frames. "Show All Fulcrum Points" is on the Toolbar. Per-point Fulcrum Point tab in Object Properties: Fulcrum State (Fulcrum, Enforce, NotFulcrum), Collision radius, Max speed. Settings Window > Custom Logic Fulcrum Point has Is Custom Logic Fulcrum Point and Activation Threshold (default 0.01, lower to 0.001 for precision).
- Keeping feet planted: if feet slide they are not detected as fulcrums and AutoPhysics may treat the pose as ballistic (a squat becomes a jump). Fix by copying the feet positions from frame 0 across the interval. Meshes have no collisions by default; add them.
- In-place versus root motion: the Fulcrum page says AutoPhysics "usually does not work well with stay-in-place animation". So animate with travel, run physics, then convert to in-place if needed. Stay In Place how-to (https://cascadeur.com/help/animation_pipeline/tips_and_how_tos/stay_in_place_animation): Method 1 uses the Center of Mass with Scene Settings > Copier set to Global, Pivot Fixed, Position X and Z on and Y off; copy at the first frame, then Edit > Paste Into Interval. Method 2 uses Copier Mode Relative with Pivot Moving, copy all character Points, set Pivot Fixed, paste.
- Loops: Animation Cycles (section 2), with "position and rotation offset" for a travelling loop and the plain cycle for an in-place loop. The Animation Cycles page does not use the words in-place or root motion, so that mapping is my reading.
- A Root Constraint tool exists "to create root-motion animation" (https://cascadeur.com/help/root_constraint). Not read.

## 5. Importing FBX animation

Main page: https://cascadeur.com/help/getting_started/import_fbxdae (File > Import > Fbx/Dae).

- (a) Animation onto an existing character: open the .casc and use the Animation preset (applies to the existing skeleton hierarchy). Also available: Animation to selected frames, Animation to selected objects, Add model, Model, Scene. Import mode Update applies to existing objects; Add new creates new ones. Options: Import to selected interval, Fbx up axis (Y default), Adjust axis system on import (Off, Root default, Deep), Change start frame, Open first take, Skip take time.
- (b) "Import animation to existing rig": there is no separate feature by that name in the docs. It is the Animation preset above. The skeleton hierarchy, naming, proportions and root object names must match; otherwise try "Animation to selected objects" on the joint hierarchy, or Retargeting.
- UE to Cascadeur (https://cascadeur.com/help/getting_started/import_fbxdae/import_animation_from_ue): export from UE as FBX 2022 or 2020; in Cascadeur choose the Animation preset, Fbx up axis Z, Adjust axis system on import Root. The character must have the exact same skeleton, and be the same model, or distortion results. Unreal "full" rigs have extra joints; set Bake Actor Animation to Bake All in the UE export dialog so extra joints bake onto the regular ones. Manny and Quinn are not mentioned on this page. The UE export page says to use the UE5 Manny or UE5 Quinn file in Cascadeur when the project uses the default Epic skeleton (https://cascadeur.com/help/getting_started/export_fbxdae/export_to_unreal_engine). The FAQ says UE4 and UE5 mannequins ship as sample rigged models (https://cascadeur.com/help/faq).
- (c) Mocap cleanup: Animation Unbaking converts baked animation into fewer keys with varied interpolation (https://cascadeur.com/help/category/221, not read in full). Fulcrum Motion Cleaning (https://cascadeur.com/help/category/206) and Collision Penetration Cleaning (https://cascadeur.com/help/category/310) also exist. BVH import was added in 2026.2 (animation only).
- (d) Retargeting (https://cascadeur.com/help/category/219): Edit > Retargeting copy, then Edit > Retargeting paste on the target. Both characters need an AutoPosing rig, a symmetrical rigging pose (T or A), and an identical Point Controller hierarchy. Fulcrum points are treated as stationary, so intended sliding is removed unless Settings Window > Retargeting > Root Motion Correction is off. Retargeting is Pro and up.
- Quick Rigging Tool (https://cascadeur.com/help/rig/rig_mode/quick_rigging_tool): templates are Humanoid (tabs Body, Hand Left, Hand Right, Twists) and Quadruped. No automatic name matching: you drag joints onto points. Saved skeleton templates can be dropped into the autorig_templates folder so the tool places elements automatically. The page does not mention a "UE5" template or Manny/Quinn mapping. The 2026.1 notes list templates for meshy.ai and Auto Rig Pro only.
- Twist bones (https://cascadeur.com/help/rig/advanced_rigging/advanced_rigging_techniques/twist_bones): handled with Box controllers and a Twist behavior. The Quick Rigging Tool Twists tab has 8 slots (2 per limb), humanoid only. Untwist is limited to upper arms and thighs in the tool. The Manny skeleton is shown as an example with one untwist and two twist joints. Export behavior of twists is not documented there.
- ik_foot and ik_hand: the UE import page says Unreal characters often include IK joints that must be rigged correctly for IK, and links to scene preparation. No ik_foot or ik_hand name handling is documented.

## 6. Export to Unreal Engine 5

FBX export (https://cascadeur.com/help/getting_started/export_fbxdae): File > Export > Fbx/Dae, or Shift+F8.
- Presets: Animation (no models or aux objects), Model, Scene, Scene - selected objects.
- Export selected intervals and Export selected objects, both off by default. Include Animations and Meshes, both on; turn Meshes off to export joints plus animation only.
- Bake animation is on by default (every frame keyed). Apply euler filter on export is on. Fbx up axis Y (default) or Z. Fbx uint for scale problems. Type Fbx ascii: Binary is the default. Fbx compatibility version.
- Per-joint override in Object Properties > FBX Export tab (Is exported, Use namespaces).
- Known export problems: duplicate root names, mesh and root sharing a name, multiple root bones (delete extras), a hidden Animation Track or Is exported off drops parents.
- Settings > APP > Bake Animation Off keeps original keys (https://cascadeur.com/help/animation_pipeline/polishing).
- The export page gives no frame rate or root motion guidance. Frame rate is set in Scene Settings (section 8).

UE import steps (https://cascadeur.com/help/getting_started/export_fbxdae/export_to_unreal_engine): use binary FBX. For the default Epic skeleton: Import to, Skeleton SK_Mannequin, Import Only Animations on. Custom character: mesh import with Skeleton None and Import Only Animations and Force Front XAxis off; animation import with the custom Skeleton and Import Mesh, Convert Scene and Force Front XAxis off. For wrong rotation, set Import Rotation (no preview), or fix in the animation viewer then Reimport (the example is 90 degrees on X). Scale 100, frame rate 30 vs 60 and root motion are not covered on that page. The FAQ says Blender FBX at scale 100 has no official fix (https://cascadeur.com/help/faq). The FAQ also notes Unreal strips the "Armature" root which Cascadeur keeps, so import to UE first, then export from UE.

Live Link (https://cascadeur.com/help/category/268): paid plans only (Indie, Pro, Teams), Windows only. Plugin "Cascadeur Live Link" from FAB, UE 5.5 through 5.8, needs Cascadeur 2026.1+. Joint names and hierarchy must match. Cascadeur root Local Rotation -90/0/0 for the axis difference; root scale 1/1/1 (Blender models can carry a hidden 100x scale). Flow: Synchronization > Live Link; in UE add source Casc Live Link > Cascadeur; pick Cascadeur Root, UE Skeleton, UE Animation, Start Live Link; then apply in a Level Sequence (disable an auto-generated Control Rig). One-way only. Needs at least two keyframes. For multiple characters, repeat per root. For paired Manny/Quinn alignment, disable the root constraint and reset root Global Position each frame.

## 7. Multi-character scenes

- Yes. Add a second character with File > Import > Import Fbx/Dae and pick the .casc (https://cascadeur.com/help/getting_started/scenes/scenes_with_multiple_characters). It lands at the scene center; move it by selecting its Center of Mass in Point Controller mode with Translate. Namespaces character_1, character_2 are assigned. Commands > Change namespace renames them. Duplicate names break FBX/DAE export, hence the namespaces.
- Performance: many characters slow the scene. The Scene Linking Tool (Pro and up) links separate scenes synced frame by frame (https://cascadeur.com/help/tools/animation_tools/scene_linking_tool).
- Physics: AutoPhysics looks for the Center of Mass used by every Rigid Body; with several you pick the main one manually (the page's examples are a character with a sword, composite versus own CoM). Other multi-character physics behavior is not documented. Fulcrum Points can include another character as an obstacle (fulcrum page).
- Older multi-character scenes need rig regeneration per character: Rig Mode, Generate Rig, using the main Center of Mass (https://cascadeur.com/help/category/209).
- Exporting separately: the docs show only the Scene - selected objects preset and Export selected objects (export page), plus namespaces. There is no explicit per-character export recipe. Live Link supports multiple characters one root at a time.
- Official fight or combat tutorials: I did not find any on the help site. YouTube and the forum were not searched.

## 8. Timeline

Sources: https://cascadeur.com/help/interface/timeline and https://cascadeur.com/help/interface/scene_settings
- Framerate is in Scene Settings > FPS panel: presets 24, 30, 60 or a custom value. FPS factor adds frames between keys without changing speed. Time factor scales speed. Units are centimeters. The Timeline Settings panel shares these.
- Frame count: the editable range has a first frame (default 0) and a last frame; drag the bar corners or type values; + and - add or remove frames to the right of the selected frame. The Free plan caps scenes at 300 frames (section 9).
- Layers: called Animation Tracks (independent layers). The Timeline page mentions no folders, though "Mixed" interpolation refers to folders (https://cascadeur.com/help/category/15). Additive Layers (Alpha) arrived in 2026.2.
- Selection: click; drag for ranges; Ctrl+Left/Right expands; Ctrl+right-click selects the same frame on all tracks. Shift+middle-drag copies keys.
- Copy and paste: Copy Tools (https://cascadeur.com/help/category/32, not read), Scene Settings > Copier (Global, Local, Relative, Pivot Fixed or Moving, Factor), Edit > Paste Into Interval, Timeline interval copy and paste.
- Mirror: Mirror Tool with Plane XY (default), XZ, YZ, or Set by 3 objects; Mirror On Current Frame or Mirror On Interval; Mirror Pelvis Position; start from a symmetrical pose (https://cascadeur.com/help/tools/animation_tools/mirror_tools).
- Pose library: not found in the help.

## 9. Licensing

Sources: https://cascadeur.com/plans and https://cascadeur.com/help/faq. The FAQ and plans page disagree on prices (FAQ: Indie $19/mo, Pro and Teams $49/mo; plans page: Indie $27/mo or $11/mo annual, Pro $68/mo or $46/mo annual). Check the live page. There is no "Basic" tier; the free plan is called Free. The plans-page feature table lost its checkmarks in the fetch.
- Free: exports .casc only (no FBX), non-commercial only, 300 frames per scene and 120 joints per scene per the plans page. This would block our FBX-to-UE pipeline.
- Indie: FBX and DAE (plans text), USD and GLTF (table). Commercial use if revenue is under US$100,000 a year. No retargeting, scene linking, environment interaction in AutoPhysics, or quadruped AutoPosing.
- Pro: all tools, unrestricted commercial use, quadruped AutoPosing, retargeting, scene linking, environment interaction.
- Teams: Pro plus admin features.
- Live Link: paid plans (Indie, Pro, Teams) per the Live Link page. Plan limits for Motion Generation and Mocap: the plans page lists Inbetweening for all tiers and does not mention Motion Generation or Mocap.
- Perpetual license for versions released during a yearly Indie or Pro subscription; lapsed plans revert to Free.

## Open questions

1. The Inbetweening Limitations and "Usage with other tools" sections did not load. Read https://cascadeur.com/help/tools/animation_tools/inbetweening in a browser.
2. What does the 2026.2 MCP server expose? The release notes give no detail.
3. Is there a UE5 Manny/Quinn Quick Rigging Tool template with joint mapping, and how are ik_foot, ik_hand and twist joints handled on export to UE? Not documented in the pages read. Test with the shipped UE5 Manny sample scene.
4. Frame rate (30 vs 60), root motion and scale 100 for UE5 import are not covered on Nekki's Unreal export page.
5. Angular momentum is not in the physics docs. Secondary Motion's page (category/195) and AutoPhysics Settings were not read.
6. How do physics tools behave with two characters beyond choosing the main Center of Mass? Is there a documented per-character export?
7. Are there official combat or fight-scene tutorials? Only the help site was checked, not the YouTube channel or forum.
8. Plan limits for Motion Generation, Mocap and Live Link in Indie versus Pro, and whether the Free-plan limits (300 frames, 120 joints) are current. The plans-page fetch had missing checkmarks.
9. Which license is active on this machine, and does it allow FBX export? Check in the app.
10. Pages not read: Animation Unbaking, Copy Tools, Easing, Additive Layers, Root Constraint, Interval Edit Mode, MetaHumans, Mixamo, Animation Behaviors (FBX Export tab).
