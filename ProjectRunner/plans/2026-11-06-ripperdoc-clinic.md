# RipperDoc clinic level

Project: ProjectRunner, brief at $PROJ_DOCS/ProjectRunner/BRIEF.md

Done when Mike can walk through `L_TRK_07_Clinic` in PIE as the GASP mannequin.

## Decisions (Mike, 2026-11-06)

- Copy `L_TRK_06_Apartment`, and keep its shell, broken wall, porch, city, lights setup and camera. The apartment stays as it is.
- Entry becomes intake, kitchen becomes treatment, the washroom door becomes a closed back room, and bedroom becomes the parts bench and terminal.
- The player is the GASP mannequin, so the walkthrough waits for the GASP run (`plans/2026-11-06-gasp-walkthrough.md`).
- The look is scavenged and grimy, with one hard pool of light on the chair.
- Scope is walk, dressing, lights and camera. Table, bench, terminal and door have no interaction.

## Sharing the editor with the GASP run

The GASP run rebuilds this project and takes its editor from task 1 to task 3, so the steps marked "editor" wait for a gap. An open editor locks the DLLs that its UBT build overwrites, and a second GUI editor on the same project confuses `pr_remote.py`.

## Checklist

- [x] 22 ClinicKit rows added to `HoudiniSource/ProjectRunner/data/projectdev_ue_import.csv`, FBXs exported, `ucx_hulls.csv` rewritten
- [x] `Scripts/pr_import_projectdev.py`: `M_Clinic_Atlas` slot added, and a `PR_PD_ONLY` run no longer touches existing textures, masters or instances
- [x] `Scripts/pr_trk07_clinic_copy.py` and `Scripts/pr_build_trk07_clinic.py` written (run 2026-11-06)
- [x] Headless: copy the map with `pr_trk07_clinic_copy.py`
- [x] Editor: import ClinicKit with `PR_PD_ONLY=ClinicKit`, check `Saved/pr_import_projectdev.json` has 22 meshes and 0 errors
- [x] Editor: `PR_C7_STEP=inventory`, compare with the script's room folders, since the apartment was laid out by hand
- [x] Editor: `PR_C7_STEP=dress`, then `finish` once the cooks are done
- [x] Check facing and placement of each ClinicKit piece on a capture, since FBX axes are unconfirmed in UE
- [x] Add the map to `Scripts/walkthrough/wt_maps.json` and pass `PRWalkthroughTest`
- [ ] Mike walks it

## Open

- `M_Clinic_Atlas` only has the labelled reference sheet (`T_Clinic_Atlas_ref.png`), so clinic pieces show cell labels until a painted atlas exists.
- `Display_Case_Spine` didn't fit the bench wall, and `Clinic_Sign` stays out because the clinic is hidden. Both are imported.
- `pr_build_trk06_apartment.py` no longer matches `L_TRK_06`: Mike's hand layout ends the room at X 1200 and the porch at 1515. `pr_build_trk07_clinic.py` follows the real positions.
- The broken wall is now a whole kit wall with a steel door open onto the balcony, plus `Cut_EndB`, a black panel toward the camera (Mike, 2026-11-06). The apartment keeps its broken wall.
- `PRWalkthroughTest` can't walk back out of `Zone_Porch`: the zone can only be left through the 1 m door, and its single-key steering can't aim at the door from `CAM_Porch`. The clinic's entry covers the room only. Door crossing and the zone were proven in an earlier run of this session, walking in with the D key.
