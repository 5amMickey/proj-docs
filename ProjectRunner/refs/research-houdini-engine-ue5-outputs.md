# Houdini Engine for Unreal: how a SOP HDA must shape its output

Researched 2026-10-01 for ProjectRunner. Plugin in use: Houdini Engine for Unreal "3.0 - H22.0.429" on UE 5.8, installed with source at `C:\Prod\ProjectRunner\Unreal\Plugins\Runtime\HoudiniEngine`.

## Sources and how to read the citations

- **[src]** is the installed plugin source. Paths are relative to `C:\Prod\ProjectRunner\Unreal\Plugins\Runtime\HoudiniEngine\Source\`. `PCH.h` means `HoudiniEngine/Private/HoudiniEnginePrivatePCH.h`. I diffed the key files against the public repo (github.com/sideeffects/HoudiniEngineForUnreal, branch `Houdini22.0-Unreal5.00`, commit ce36c5b, 2026-09-28). The contents match apart from line endings, so the line numbers hold for both.
- **[doc]** is SideFX's Unreal plugin docs for Houdini 22.0, `https://www.sidefx.com/docs/unreal/<page>`, fetched 2026-10-01.
- **[ex]** is SideFX's example HDAs shipped in the plugin, `Content/Examples/Chaos/*.hda`. I opened them with hython 22.0.429 and dumped the networks.
- **[ue]** is the UE 5.8 engine headers at `C:\Program Files\Epic Games\UE_5.8\Engine\Source\`, plus Epic's docs at dev.epicgames.com (UE 5.8).

Where the docs and the source disagree, the source wins, and each case is marked **CONFLICT**. Anything I could not confirm is marked **UNCONFIRMED**.

Owner names: prim = primitive attribute, point, vertex, detail. "any" means the plugin reads the attribute with `HAPI_ATTROWNER_INVALID`, which accepts whichever owner the attribute has.

---

## 0. Rules that apply to every output

- **Before or after Pack matters.** "Attributes created before packing will be applied to the generated mesh, whereas attributes created after packing will be applied to the generated component/actor." [doc attributes.html, Note at top]
- **One packed prim is one part, which is one Static Mesh.** A packed prim that appears only once becomes a plain StaticMeshComponent, not an instancer. Only lod and collision groups split a part further. [doc meshes/basics.html "Mesh Generation"; doc instancing.html "Packed Primitives"]
- **Only primitive groups whose names start with `lod`, `collision_geo` or `rendered_collision_geo` (case-insensitive) count as split groups.** The plugin ignores all other groups for mesh splitting and sorts the split group names alphabetically. [src HoudiniEngine/Private/HoudiniOutputTranslator.cpp:2330-2358]
- **Units and axes.** The plugin multiplies positions by 100 (m to cm) and swaps Y and Z. [src PCH.h:113-114; HoudiniMeshTranslator.cpp:4750-4752]
- **Proxy meshes are on by default** (`bEnableProxyStaticMesh = true`) [src HoudiniEngineRuntime/Private/HoudiniRuntimeSettings.cpp:114]. The project Config has no Houdini overrides, so the default applies. "Proxy Meshes ... only create their main level LOD, won't have colliders, and can't be instanced." [doc outputs.html "Static Meshes"]. Nanite "only applies to refined meshes". [doc attributes.html "Meshes Nanite"]. Judge collision, LOD and Nanite results only after refining or baking.

---

## 1. Chaos Geometry Collection

### Required structure

1. Fracture the geometry. Give **every prim** a **prim int `unreal_gc_piece` >= 1** *before* packing. The value is the cluster level, and 0 turns the feature off. [doc chaosintegration.html; src PCH.h:590]
2. Pack each piece into its own **Packed Geometry** prim: Pack SOP with `packbyname = 1`, `packedfragments = 0`, `nameattribute` = the piece name attribute. Both official examples use exactly these settings. [ex unreal_gc_example.hda pack1; unreal_gc_example_clustering.hda pack3]
3. Output the packed prims. The plugin first builds them as instancer outputs, then converts them. It finds the GC pieces by reading `unreal_gc_piece` on the **instanced (inner) part**, and ignores any piece whose value is <= 0. [src HoudiniGeometryCollectionTranslator.cpp:737-781, 567-590]. So the attribute must be inside the packed geometry. The docs say "packed primitives with a non-zero unreal_gc_piece primitive attribute" [doc outputs.html], and the examples bear this out: after packing, the outer prims carry only `path`, while the inner prims carry `unreal_gc_piece` and `name`. [ex, hython dump]
4. The `unreal_gc_piece` values must be sequential: "if there exists an unreal_gc_piece with value X, then there must exist an unreal_gc_piece with value (X - 1)." [doc chaosintegration.html]

### How levels and clusters map

- The plugin appends each piece's static mesh as one bone, then calls `AddSingleRootNodeIfRequired`. Level 0 is therefore an automatic root, and pieces with `unreal_gc_piece = 1` sit at Level 1. [src HoudiniGeometryCollectionTranslator.cpp:182, 196]
- For each (`unreal_gc_piece`, `unreal_gc_cluster`) pair with a piece value > 1, the plugin calls `ClusterBonesUnderNewNode` (piece - 1) times on those bones. Pieces that share a level and a cluster index get pushed down under new cluster nodes together. [src HoudiniGeometryCollectionTranslator.cpp:198-231]
- `unreal_gc_cluster` is a prim int. It is optional, and -1 means no cluster. [src :600-621; doc chaosintegration.html]
- The docs say "Full control over the exact GeometryCollection hierarchy is not supported at this time". [doc chaosintegration.html]
- The official clustering example runs RBD Material Fracture, sets `i@unreal_gc_piece = 1`, runs RBD Cluster, adds `i@unreal_gc_piece++` for prims with `i@cluster >= 0`, sets `i@unreal_gc_cluster = i@cluster`, then packs by `gc_name`, "because the name attribute get overwritten by the RBD nodes". [ex unreal_gc_example_clustering.hda gc_piece5, gc_cluster, pack3; doc chaosintegration.html]

### Names

- **`unreal_gc_name`** (string, prim or detail, read from the inner part) splits pieces into separate GC assets. You need it when one HDA outputs more than one GC. [doc; src HoudiniGeometryCollectionTranslator.cpp:414-443, 624-648]
- Asset name: if the instancer part has **`unreal_output_name`**, the plugin uses its first value as the GC object name. Otherwise the split string is `<unreal_gc_name>_GC`. [src :466-479]
- The actor is spawned as `<HDA actor name>_<GC name>_Actor`. [src :114-115]

### Materials

- The plugin builds each piece as a Static Mesh first, then appends it with that mesh component's materials (`AppendStaticMesh(..., SourceMaterials, ...)`). Per-piece material assignment therefore follows the static mesh rules in section 2, so put `unreal_material` on the prims inside the pack. [src HoudiniGeometryCollectionTranslator.cpp:170-182]. This is an inference from the code path and **UNCONFIRMED** by a test cook.
- The plugin adds every material twice. "Materials are ganged in pairs", with the second slot of each pair for interior faces. [src :1430-1475]. This matches Epic's description: "each original Material ID has been duplicated ... to represent the internal surfaces." [ue docs: Geometry Collections User Guide, UE 5.8]

### Detail attributes (set before packing)

The plugin reads these from the **first piece only**: "One-of detail attributes, so only need to take the first GeometryCollectionPiece". [src :233-237]. Both examples set them in a wrangle before the Pack SOP, and Pack copies them into each packed geometry. [ex]

| Attribute | Class / type | Maps to |
|---|---|---|
| `unreal_gc_clustering_damage_threshold` | detail float array | `UGeometryCollection::DamageThreshold`, one value per level [src :790-818] |
| `unreal_gc_clustering_cluster_connection_type` | detail int | Attribute value 0 gives PointImplicit. Any other value N is cast to `EClusterConnectionTypeEnum(N + 1)` [src :820-849], so 1 = MinimalSpanningSubsetDelaunay, 2 = PointImplicitAugmentedWithMinimalDelaunay, 3 = BoundsOverlapFilteredDelaunay [ue ChaosSolverEngine/Public/Chaos/ChaosSolverActor.h:33-43; Chaos/ClusterCreationParameters.h:15-23]. **CONFLICT**: the docs and the example comment say "3 = PointImplicitAugmentedMinimalDelaunay". Per the source it is 2. |
| `unreal_gc_collisions_mass_as_density` | detail int (0/1) | `bMassAsDensity` |
| `unreal_gc_collisions_mass` | detail float | `Mass` |
| `unreal_gc_collisions_minimum_mass_clamp` | detail float | `MinimumMassClamp` |
| `unreal_gc_collisions_max_size` | detail float array | One `SizeSpecificData` entry per value. You need it for more than one entry. |
| `unreal_gc_collisions_damage_threshold` | detail int array | `SizeSpecificData[i].DamageThreshold` |
| `unreal_gc_collisions_collision_type[_X]` | detail int or int array | `ECollisionTypeEnum`: 0 Implicit-Implicit, 1 Particle-Implicit [ue GeometryCollectionSimulationTypes.h:11-17] |
| `unreal_gc_collisions_implicit_type[_X]` | detail int or int array | Cast straight to `EImplicitTypeEnum` [src :1028]: **0 Box, 1 Sphere, 2 Capsule, 3 LevelSet, 4 None, 5 Convex** [ue GeometryCollectionSimulationTypes.h:20-30]. **CONFLICT**: the UE5 table in the docs and the example comments say "0 = None, 1 = Box, ... 4 = Level Set". Trust the enum. The example's value of 4, meant as Level Set, actually gives None. |
| `unreal_gc_collisions_min/max_level_set_resolution[_X]`, `..._min/max_cluster_level_set_resolution[_X]`, `..._collision_object_reduction_percentage[_X]`, `..._collision_margin_fraction[_X]`, `..._collision_particles_fraction[_X]`, `..._maximum_collision_particles[_X]` | detail int or float, scalar or array | `SizeSpecificData[X].CollisionShapes[i]` [src :994-1230; doc] |

`_X` is the SizeSpecificData index, and leaving the suffix off means index 0. Array element i is collision shape i. [doc chaosintegration.html]

If any size entry uses Convex and the GC has no convex hull data, the plugin switches it to Box and rebuilds the simulation data. [src :253-259]

### Other GC limits and notes

- `DamageThreshold` only takes effect while `DamageModel` = User-Defined, which is the default, and `bUseSizeSpecificDamageThreshold` is off. [ue GeometryCollectionEngine/Public/GeometryCollection/GeometryCollectionObject.h:569-577; Private/.../GeometryCollectionObject.cpp:107]
- The plugin applies generic `unreal_uproperty_*` attributes to the GC asset, the component and the owning actor. [src HoudiniGeometryCollectionTranslator.cpp:321-362]. `UGeometryCollection::EnableNanite` is a UPROPERTY that defaults to false [ue GeometryCollectionObject.h:653-654; .cpp:118], so `i@unreal_uproperty_EnableNanite = 1` should turn Nanite on. **UNCONFIRMED** by a cook.
- The pieces pass through StaticMeshComponents. The plugin skips any component that is not a `UStaticMeshComponent` [src :159-163], and the plugin's own GC test turns proxy meshes off (`SetProxyMeshEnabled(false)`) [src HoudiniEngineEditor/Private/Tests/HoudiniEditorTestGeometryCollections.cpp]. Test GC HDAs with proxy meshes off. Whether proxies break GC output is **UNCONFIRMED**.
- Epic's rules for the source meshes: they "should be 'water tight' ... Objects that make up a Geometry Collection should not intersect each other." [ue docs: Geometry Collections User Guide, 5.8]. "During the simulation, the higher level clusters will break first". [ue docs: Cluster Geometry Collections User Guide, 5.8]

---

## 2. Static meshes: splitting, names, materials, UPROPERTYs

### Splitting into several meshes

- **Default path: one packed prim per mesh.** Pack each mesh, merge, output. [doc meshes/basics.html; doc outputs.html]
- **`unreal_split_attr` does not split meshes.** Only the instancer translator reads it. [src HoudiniInstanceTranslator.cpp:402-419; no other use in the source]. For instancers its value is a string naming another attribute, read from prims on packed-prim instancers and from points on attribute instancers. [src :435, :533]
- **Split Mesh Support**, a per-HDA checkbox, lets you get several meshes from one unpacked part via group-name suffixes such as `rendered_collision_geo_A` / `lod_1_A`. [doc meshes/basics.html "Split Meshes"]. **CONFLICT**: the docs describe it as current behaviour, but it defaults to **off** and the source comment calls it "currently in Alpha testing" [src HoudiniEngineRuntime/Private/HoudiniCookable.h:226-228]. Its group parser also has typos (`"xdop10z"`, `"xkop26"`), and a dangling `else` resets box/sphere/capsule to plain Simple. [src HoudiniMeshTranslator.cpp:7171-7195]. Leave it off and split with packs.

### Names

- **`unreal_output_name`** is a string, any owner (point, then prim, then detail) [src HoudiniEngineUtils.cpp:7478-7560]. For a packed mesh, set it **inside the pack** to name the Static Mesh asset. Set it on the **packed prim** (after Pack) to name the component or instancer output. [doc attributes.html note; src HoudiniInstanceTranslator.cpp:2066 reads it per packed prim]. The older `unreal_generated_mesh_name` still works as a fallback [src HoudiniEngineUtils.cpp:7493-7497]. `unreal_bake_name` is deprecated. [doc]
- Bake placement: `unreal_bake_folder` (prim or detail string), `unreal_bake_actor`, `unreal_bake_actor_class`, `unreal_bake_outliner_folder`, `unreal_level_path` (any string, supports `{hda_level}` / `{world}` tokens). [doc attributes.html "Bake Outputs", "String Tokens"]

### Materials

- **`unreal_material`** is a string holding the asset path, as **prim or detail only**. Point or vertex owners are rejected with a warning. [src HoudiniMeshTranslator.cpp:1343-1355]. **CONFLICT**: meshes/basics.html lists it as "point, vertex". An optional `[N]` prefix sets the slot, for example `[0]/Game/M/M_Wall.M_Wall`. [src :4486-4508; doc materials.html]
- **`unreal_material_instance`** is a prim or detail string with the parent material path. The plugin creates an instance in the temp folder on cook. The same prim/detail rule and `[N]` prefix apply. [src :1358-1368, 1400-1407; doc materials.html]
- `unreal_face_material` is the old fallback name, read only if neither attribute above exists. [src :1370-1386]
- **`unreal_material_parameter_<name>`**: the plugin reads the detail copy first, then prim or point. [src HoudiniMaterialTranslator.cpp:710-732]. Use a single value (float or int) for scalars, 3 or 4 components for vectors (float gives FLinearColor, int gives FColor), a string or int for enums like `blendmode`, and a string path for textures. `<INDEX>_<name>` targets one slot. [doc materials.html "Material Instance Parameters"]
- `unreal_physical_material` and `unreal_simple_physical_material` are prim or detail strings. [doc attributes.html "Materials"]

### UPROPERTY attributes

- **`unreal_uproperty_<PropertyName>`** takes int, float or string, and a tuple of 3 for vectors. The plugin reads detail, then prim, vertex and point. [src HoudiniEngineUtils.cpp:6605-6635]. It applies them to the Static Mesh asset [src HoudiniMeshTranslator.cpp:3315-3327] and to the mesh component [src :689-697]. The name can be the C++ property name or the display name without spaces. [doc attributes.html "Generic UProperty Attributes"]
- Mesh build settings only accept **detail** attributes, for example `i@unreal_uproperty_UseFullPrecisionUVs = 1`. [doc outputs.html "Mesh Build Settings"]
- To list the property names for a class, type `Houdini.DumpGenericAttribute StaticMesh` in the Output Log Cmd box. [doc]
- Tags use `unreal_uproperty_tag_*`, `..._actorTag_*`, `..._componentTag_*` and `..._mainComponentTag_*`. [doc "Bake Outputs"]
- Other mesh attributes: `unreal_lightmap_resolution` (any int), `unreal_face_smoothing_mask` (prim int), `unreal_num_custom_primitive_data` + `unreal_custom_primitive_dataX` (any int / float). [doc]

---

## 3. Collision

The prefixes are primitive **group** names, matched case-insensitively with `StartsWith`. [src PCH.h:386-394; HoudiniMeshTranslator.cpp:4672-4726]

| Group prefix | Result |
|---|---|
| `collision_geo` | Invisible complex collision. The plugin makes a second Static Mesh and assigns it as the main mesh's `ComplexCollisionMesh` with customized collision. Only one per mesh. [src :4360-4390] |
| `rendered_collision_geo` | The visible mesh itself is also used as the complex collider. The docs warn: "DO NOT use the rendered_collision_geo attribute for your custom collision." [doc meshes/collisions.html] |
| `collision_geo_ucx*` / `rendered_collision_geo_ucx*` | Convex hull (`FKConvexElem`) built from the group's points. A name containing `ucx_multi` runs `DecomposeMeshToHulls` with 8 hulls of 16 verts max. [src :4732-4830] |
| `collision_geo_simple*` / `rendered_collision_geo_simple*` | A simple shape chosen by a case-insensitive substring match: `box` gives an oriented box, `sphere` a sphere, `capsule` an oriented capsule, and `kdop10x/y/z` or `kdop18` those K-DOPs. Any other name, including plain `collision_geo_simple`, gives a **26-DOP**. [src :4833-4920] |

- **`collision_geo_simple_ucx` is not a convex hull.** It classifies as "simple", then matches none of the shape names, so the plugin builds a 26-DOP. Use `collision_geo_ucx` for convex. [src :4705-4722, 4901-4916]. The plugin's own *input* exporter writes UE convex colliders as `collision_geo_simple_ucx<N>` groups [src UnrealMeshTranslator.cpp:3080]. A round trip through Houdini therefore turns convex hulls into 26-DOPs unless you rename the groups. This is inferred from the code and **UNCONFIRMED** by a cook.
- To get several colliders on one mesh, give each group a numbered suffix: `collision_geo_simple_box_1`, `collision_geo_simple_box_2`, and so on. [doc meshes/collisions.html; doc meshes/proceduralcollision.html]
- Invisible simple and UCX colliders go into the main mesh's aggregate geometry. Rendered colliders and invisible complex colliders each get their own Static Mesh. [src HoudiniMeshTranslator.cpp:4556-4580, 812-870]
- **Combining with split outputs.** Collision groups attach to the Static Mesh of the part they sit in. Put each mesh's collision prims **inside that mesh's pack**, and create the groups before the Pack SOP. This follows from one part = one mesh [doc meshes/basics.html] and from the plugin reading groups per part [src HoudiniOutputTranslator.cpp:2330-2358]. It is inferred, not stated in a single doc line.
- **LOD as collision**: `i@unreal_uproperty_LODForCollision = <lod index>`, as a detail attribute. [doc meshes/collisionsetup.html]
- `unreal_simple_physical_material` (prim or detail) sets the physical material of the simple collision. [doc]

---

## 4. LODs and Nanite

- **LODs are primitive groups starting with `lod`**, for example `lod0`, `lod1`, `lod2`. The plugin sorts them alphabetically, so `lod10` comes before `lod2`. [doc meshes/lod.html; src HoudiniMeshTranslator.cpp:812-870, 2240-2262]. The docs use both `lod0` and `lod_0`. Any name starting with `lod` works.
- **Gotcha**: prims in no lod or collision group become `main_geo`, and main_geo is **LOD0**. The lod groups follow it, so with leftover geometry `lod0` becomes LOD1. Put every render prim in an lod group. [src HoudiniMeshTranslator.cpp:985-996, 1944-1965, 2243-2261]
- Keep the geometry inside the LOD groups **unpacked**, or each packed piece becomes its own instancer. [doc meshes/lod.html]
- The maximum is `MAX_STATIC_MESH_LODS`. [src :1967-1971]
- Screen size, in lookup order: prim float `lod_screensize` on the group's first prim, then detail float `<groupname>_screensize` (for example `lod1_screensize`), then `lod_screensize` on detail or prim. Values above 1 are divided by 100. [src HoudiniMeshTranslator.cpp:5250-5318]. "Manual change of the screensize values turns off AutoComputeLODScreenSize". [doc]
- Other LOD settings: `unreal_uproperty_MinLOD`, `unreal_uproperty_LODGroup`, `unreal_uproperty_LODForCollision` (detail). [doc meshes/lod.html]
- **Nanite**: `unreal_nanite_enabled` is an int, read as prim first, then any owner. The plugin writes `bEnabled` from **this attribute alone** on every build, so the mesh is **not** Nanite when the attribute is missing. [src HoudiniMeshTranslator.cpp:1557-1577, 1705-1710]. **CONFLICT**: the docs say "Having any of those three attributes automatically enables Nanite". The source does not do that.
- Other Nanite attributes: `unreal_nanite_position_precision` (int), `unreal_nanite_percent_triangles` (read as a **float** clamped to 0..1, which also sets the fallback target to PercentTriangles; the docs say int), `unreal_nanite_fallback_relative_error` (float, sets the fallback target to RelativeError), `unreal_nanite_trim_relative_error` (float). [src :1580-1703; doc attributes.html "Meshes Nanite"]

---

## 5. Instancing (rubble)

### Packed-prim instancing, for meshes the HDA generates

- Copy To Points with Pack and Instance on. The plugin makes an instancer only when a packed prim is copied more than once. Otherwise you get a StaticMeshComponent, unless `unreal_force_instancer = 1`. [doc instancing.html]
- Instancer settings are read **per packed prim** (prim owner), with detail values as defaults: `unreal_output_name`, `unreal_foliage`, `unreal_hierarchical_instancer`, `unreal_force_instancer`, `unreal_level_path`, `unreal_bake_*`, `unreal_instance_origin`. [src HoudiniInstanceTranslator.cpp:2018-2105, :484]
- The plugin splits instancers by instanced part and by the `unreal_split_attr` target read on prims. [src :425-490]

### Attribute instancing, for existing Unreal assets

- Points carry **`unreal_instance`**, a point string with the asset path. A detail string works for all points. A class name such as `PointLight` spawns actors. [src HoudiniInstanceTranslator.cpp:515-530; doc instancing.html]
- The instancer points must be in a **separate part** from the main geometry. [doc]
- The transform comes from the standard Houdini instance attributes: "You can apply the Houdini rot/orient and scale attributes". [doc instancing.html]
- Per-point settings: `unreal_foliage`, `unreal_hierarchical_instancer`, `unreal_force_instancer`, `unreal_output_name`, and `unreal_material` / `unreal_material<N>` material overrides per point. [src :2018-2105, 1500-1620; doc]

### Component type

- ISM is the default. The plugin uses HISM when the instanced mesh has LODs or `unreal_hierarchical_instancer = 1`. "For Nanite meshes, forcing the use of HierarchicalInstancedStaticMeshComponents is not recommended". [doc instancing.html]
- **Foliage**: `unreal_foliage = 1` (int, detail, prim or point) adds the instances to the level's foliage. With a Static Mesh reference the plugin creates Foliage Type assets. With an existing Foliage Type it uses a temporary copy during cook and the real type at bake. [doc instancing.html "Foliage Types"]
- Foliage attachment: `unreal_foliage_attachment_type` (point int: 0 none, 1 any collision, 2 landscape only) and `unreal_foliage_attachment_distance` (point float, default 1000). [doc]
- Per-instance custom data: `unreal_num_custom_floats` (int) plus `unreal_per_instance_custom_data0..N` (float), on prims for packed instancers and points for attribute instancers. [src HoudiniInstanceTranslator.cpp:1916-1960]

### For rubble

A small set of rubble meshes scattered many times fits packed-prim instancing, or `unreal_instance` points if the meshes already exist in Unreal. To split by variant or material, use `s@unreal_split_attr = "<attrname>"`. The old `unreal_split_instances` is deprecated, and `i@id = @ptnum; s@unreal_split_attr = "id";` reproduces it. [doc instancing.html "Splitting Instancers"]

---

## 6. Inputs (Unreal to Houdini)

### Static Mesh through a Geometry or World input

| Attribute | Class / type | Source |
|---|---|---|
| `P` | point float3, in metres with Y and Z swapped | [src UnrealMeshTranslator.cpp] |
| `N` | vertex float3 | [src :837; doc inputs.html] |
| `uv`, `uv2`... | vertex float3 | [src :793] |
| **`Cd`** | **vertex float3** | [src UnrealMeshTranslator.cpp:895-918, 1407-1425] |
| **`Alpha`** | **vertex float** | [src :920-933] |
| `unreal_material_slot` | prim int | [src :3206-3222] |
| `unreal_material` | prim string, material path | [src :3225-3242] |
| `unreal_face_smoothing_mask` | prim int | [doc] |
| `unreal_lightmap_resolution` | detail int | [src :1065-1071] |
| `unreal_input_mesh_name` | prim string, source asset path | [src :1088-1096] |
| `unreal_input_source_file` | prim string | [src :1126-1132] |
| `lod<N>` groups, `lod<N>_screensize` detail | only with Export LODs on (default off) | [src :1147, 1173; HoudiniEngineRuntime/Private/HoudiniInputTypes.cpp:41] |
| `collision_geo_simple_box<N>` / `_sphere<N>` / `_capsule<N>` / `_ucx<N>` groups | only with Export Colliders on (default off) | [src UnrealMeshTranslator.cpp:2751, 2816, 2950, 3080; HoudiniInputTypes.cpp:44] |
| `unreal_nanite_*` | written when the source mesh has Nanite settings | [src :3394-3480] |

**Vertex colour**: `Cd` arrives on **vertices**, not points. It holds the **raw 8-bit sRGB values / 255 with no linear decode**, via `ReinterpretAsLinear` / `ToFColor(true).ReinterpretAsLinear()`. [src UnrealMeshTranslator.cpp:733-749, 1864-1874]. On output the plugin treats `Cd` as linear, and UE gamma-encodes it when it stores 8-bit colour. `i@unreal_disable_gamma_correction = 1` reverses that. [src HoudiniMeshTranslator.cpp:2956-2961, 8712-8721; doc attributes.html "Meshes"]. So a mask painted in UE and sent back out without the flag comes back brighter. Set the flag on any output that passes input `Cd` through. This is traced through the code and **UNCONFIRMED** by a round-trip cook.

Component override colours (vertex paint on a placed actor) are exported when present. [src UnrealMeshTranslator.cpp:489-500, 1250-1266]

### World input, full geometry (actors)

The plugin adds these to each component's mesh with a prim-class wrangle: **prim string `unreal_actor_path`** (actor path name), **prim string `unreal_level_path`**, and **prim groups named after the actor and component tags**. [src HoudiniEngine/Private/UnrealObjectInputTypes.cpp:672-730 (wrangle `class` = 1, prims)]. `Keep World Transform` puts the geometry in world space (Object Merge INTO_THIS_OBJECT) or at the origin. [doc inputs.html]

### World input as points ("Export input as references")

There is no dedicated "points" input type. The points form of a World or Geometry input is **Import/Export input as References**. It is off by default. When it is on, its sub-options rot/scale, bbox and material all default **on**. [src HoudiniEngineRuntime/Private/HoudiniInputTypes.cpp:34-39]. Each input object, or each mesh component of an actor, becomes **one point**:

| Attribute | Class / type | Notes |
|---|---|---|
| `P` | point float3 | object or component location |
| **`rot`** | **point float4 quaternion** | Written as (X, Z, Y, -W) from the UE quat. The attribute is `rot`, **not `orient`**. [src HoudiniInputTranslator.cpp:5419-5448] |
| `scale` | point float3 | (X, Z, Y) [src :5451-5476] |
| `unreal_bbox_min`, `unreal_bbox_max` | point float3 | local bounds [src :5480-5522] |
| `unreal_material`, `unreal_material1`, ... | point string | one per slot [src :5525-5552; doc inputs.html] |
| `unreal_instance` | point string, asset reference of the mesh | [src :5556-5573] |
| `unreal_level_path`, `unreal_actor_path` | **point** string, World inputs only | [src HoudiniInputTranslator.cpp:4264-4276; UnrealObjectInputTypes.cpp:434-497 (wrangle `class` = 2, points)] |

Designing an HDA input that takes points:

1. Name the input so its label contains `world` (or `outliner`). The first instantiation then defaults to a World input. `curve` gives a Curve input, `landscape`/`terrain`/`heightfield` a World input, and anything else a Geometry input. [src HoudiniInputTranslator.cpp:609-642]
2. The HDA cannot set Export as References itself. The user turns it on in the input panel. **UNCONFIRMED** that no parm tag or attribute presets it. I found no code path for one.
3. Inside the HDA, treat `rot` as the orientation. `p@orient = p@rot;` should give the same rotation, because (X, Z, Y, -W) is the quaternion re-expressed after the Y/Z axis swap. This is my inference, **UNCONFIRMED** by a test. Read `unreal_bbox_min/max` for size and `unreal_instance` for the source mesh.
4. Pass `unreal_instance` straight through to output points to re-instance the same assets. [doc inputs.html "Export Input as References"]

### Curve input and Unreal spline components

- Curve inputs and Unreal Spline Components become a Houdini curve with point `P`. [doc inputs.html]
- `rot` (point float4) and `scale` (point float3) are added **only if** the plugin setting `bAddRotAndScaleAttributesOnCurves` is on. It defaults to **false**. [src HoudiniEngine/Private/HoudiniSplineTranslator.cpp:1020-1060, 1340-1425; HoudiniEngineRuntime/Private/HoudiniRuntimeSettings.cpp:156]. **CONFLICT**: inputs.html lists `rot`/`scale` on curves unconditionally.
- Unreal splines are resampled every `MarshallingSplineResolution` cm (default 50; 0 sends control points only). [src HoudiniRuntimeSettings.cpp:111; doc inputs.html]
- World-input splines also get prim `unreal_actor_path` and `unreal_level_path`, plus groups from component and actor tags. [src HoudiniEngine/Private/UnrealSplineTranslator.cpp:186-205]
- `bUseLegacyInputCurves` defaults to true. [src HoudiniRuntimeSettings.cpp:157]

### Geometry Collection input

- The input gets detail `unreal_input_gc_name`. "unpack the incoming geometry before accessing its attributes". [doc chaosintegration.html]

---

## Open items

- Round-trip `Cd` brightness with and without `unreal_disable_gamma_correction`. This needs one UE cook.
- The GC path with proxy meshes on, and `unreal_uproperty_EnableNanite` on a GC.
- `p@orient = p@rot` on reference points.
- `collision_geo_simple_ucx` giving a 26-DOP on output. Traced in the source, not cooked.
