"""Inventory local sources and inspect proposed FBXs without starting Unreal.

Run with python -B. Outputs stay beside this script. Source files are read only.
Blender's installed standalone FBX parser supplies the binary reader.
"""
import collections
import csv
import hashlib
import importlib
import json
from pathlib import Path
import sys
import types

sys.dont_write_bytecode = True
OUT = Path(__file__).resolve().parent
UPLOAD = Path('C:/Users/GameDevPC0403/Documents/Development/_asset-pull/anim-mocap')
PACKS = Path('C:/Prod/AssetPacks')
PACK_NAMES = ['PoseAnimations', 'SwimmingAnimationPack', 'CombatMagicAnims',
              'MusicalRockMotions', 'MorbidMotions_Pack', 'BSP_ZombieAnims',
              'MCO_Mocap_Basics', 'RollsAndDodges', 'TrumpetSaxPack', 'BossyEnemy']

def write_csv(name, rows):
    with (OUT / name).open('w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)

def excluded(path):
    return any(p in {'Saved', 'Intermediate', 'DerivedDataCache', '__MACOSX', '.git'}
               or p.startswith('._') for p in path.parts)

inventory = []
file_rows = []
locations = [('upload', p.name, p) for p in sorted(UPLOAD.iterdir()) if p.is_dir()]
locations += [('AssetPacks Content', name, PACKS / 'Content' / name) for name in PACK_NAMES]
locations += [('AssetPacks FBX', 'MCO_Mocap_Basics', PACKS / 'SourceFiles/MCO_Mocap_Basics')]
locations += [('upload', 'Loose files', UPLOAD)]
for source, pack, folder in locations:
    files = sorted(p for p in (folder.iterdir() if pack == 'Loose files' else folder.rglob('*'))
                   if p.is_file() and not excluded(p))
    counts = collections.Counter(p.suffix.lower() for p in files)
    docs = [p for p in files if p.suffix.lower() in {'.txt', '.md', '.pdf'}]
    restricted = [p for p in docs if p.suffix.lower() == '.txt'
                  and 'educational purposes only' in p.read_text(errors='replace').lower()]
    skeletons = [p for p in files if 'skeleton' in p.stem.lower() and p.suffix.lower() == '.uasset']
    inventory.append(dict(source=source, pack=pack, source_path=folder.as_posix(), exists=folder.exists(),
                          fbx_files=counts['.fbx'], uasset_files=counts['.uasset'],
                          c3d_files=counts['.c3d'], trc_files=counts['.trc'], blend_files=counts['.blend'],
                          restriction='educational purposes only' if restricted else 'not determined by this inventory',
                          restriction_evidence='; '.join(p.as_posix() for p in restricted),
                          documentation='; '.join(p.as_posix() for p in docs),
                          skeleton_asset_filenames='; '.join(p.as_posix() for p in skeletons)))
    for p in files:
        if p.suffix.lower() in {'.fbx', '.uasset', '.trc', '.c3d', '.blend'}:
            file_rows.append(dict(source=source, pack=pack, path=p.as_posix(),
                                  extension=p.suffix.lower(), bytes=p.stat().st_size))
write_csv('source-inventory.csv', inventory)
write_csv('source-files.csv', file_rows)

# Mike retained these 28 candidates on 2026-11-02. This is not an import allowlist.
choices = []
def add(source, relative, category, label, use, motion, props, check):
    choices.append(dict(source=source, relative=relative, category=category, label=label,
                        use=use, desired_motion=motion, props=props, review_check=check))

for filename, label, prop in [
    ('Walk_02_Cheerful_Loop_IP', 'Cheerful walk', 'none'),
    ('Walk_04_Texting_Loop_IP', 'Texting walk', 'phone'),
    ('Walk_06_Look_Around_Loop_IP', 'Looking around walk', 'none'),
    ('Walk_08_Listen_Music_Loop_IP', 'Listening to music walk', 'headphones if needed')]:
    add('MCO', 'Walks/In_Place/' + filename + '.fbx', 'CrowdWalk', label, 'background NPC',
        'in-place loop', prop, 'Check loop seam, foot slide and speed on the cast.')
for filename, label in [('MOB1_Stand_Relaxed_Idle_v2_IPC', 'Relaxed idle'),
                        ('MOB1_Stand_Relaxed_Fgt_v1_IPC', 'Relaxed fidget 1'),
                        ('MOB1_Stand_Relaxed_Fgt_v4_IPC', 'Relaxed fidget 4')]:
    add('MCO', 'Mobility/In_Place/' + filename + '.fbx', 'Idle', label, 'cast and background NPC',
        'stationary; inspect loopability', 'none', 'Check hand and shoulder pose, foot drift and return to idle.')
for filename, label in [('head nod yes', 'Agree'), ('shaking head no', 'Disagree'),
                        ('angry gesture', 'Angry gesture'), ('dismissing gesture', 'Dismiss'),
                        ('relieved sigh', 'Relieved sigh')]:
    add('Mixamo', 'Gestures Pack Basic/' + filename + '.fbx', 'Gesture', label, 'main cast dialogue',
        'stationary one-shot; candidate for UpperBody', 'none',
        'Check gesture readability, neck and fingers; test layering before calling it an upper-body clip.')

for filename, category, label, props, check in [
    ('01_Standing_Looking_Around', 'Idle', 'Standing look around', 'none', 'Find an idle segment and check its seam.'),
    ('02_Standing_Conversation_01', 'Conversation', 'Standing conversation 1', 'none', 'Choose useful gesture segments; check foot drift.'),
    ('03_Standing_Conversation_02', 'Conversation', 'Standing conversation 2', 'none', 'Judge whether it adds enough variation to conversation 1.'),
    ('10_Sitting_Chair_Conversation_Gesturing', 'Conversation', 'Seated conversation', 'chair', 'Match seat height and check hands against thighs.'),
    ('11_Sitting_Coffee_Conversation', 'Conversation', 'Coffee conversation', 'chair; cup', 'Align cup grip and seat; inspect whether a drinking segment exists.'),
    ('17_Standing_Wall_Lean_Phone_Use', 'Phone', 'Leaning phone use', 'wall; phone', 'Align shoulder to wall and phone to hands.')]:
    add('Rokoko', 'Mocap_Pack_03_Talking_and_Interacting/mocap/UE5/' + filename + '_ue5.fbx',
        category, label, 'cast and background NPC', 'trimmed stationary segment; loopability unverified', props, check)
for filename, category, label, props, check in [
    ('08_Open_Door', 'Interaction', 'Open door', 'door with handle', 'Check handle contact and actor alignment throughout the action.'),
    ('10_Close_Door', 'Interaction', 'Close door', 'door with handle', 'Check door direction, handle contact and ending stance.'),
    ('12_Sit', 'Seated', 'Sit on chair', 'chair', 'Inspect approach and seat contact; preserve required displacement.'),
    ('14_Sit_Sofa', 'Seated', 'Sit on sofa', 'sofa', 'Inspect seat height and body clearance.')]:
    add('Rokoko', 'Mocap_Pack_01_Everyday_Actions/mocap/UE5/' + filename + '_ue5.fbx',
        category, label, 'cast interaction and cinematic', 'one-shot; root motion candidate after trajectory inspection', props, check)
for filename, label, props in [('09_Dusting_With_Cloth', 'Wipe a surface', 'cloth; matching surface'),
                              ('12_Sweeping_01', 'Sweep floor', 'broom; floor')]:
    add('Rokoko', 'Mocap_Pack_02_Cleaning/mocap/UE5/' + filename + '_ue5.fbx', 'Work', label,
        'market and food alley NPC', 'trimmed work cycle; loopability unverified', props,
        'Check prop contact and hand grip; select a repeatable work segment.')
for filename, category, label, props in [('16_Scratch_Neck', 'Idle', 'Scratch neck', 'none'),
                                        ('18_Standing_Texting', 'Phone', 'Standing texting', 'phone'),
                                        ('20_Standing_Drinking', 'FoodDrink', 'Standing drink', 'cup'),
                                        ('21_Holding_Cup_Nodding', 'FoodDrink', 'Hold cup and nod', 'cup')]:
    add('Rokoko', 'Mocap_Pack_04_Crowd_Reactions/mocap/UE5/' + filename + '_ue5.fbx', category, label,
        'cast and background NPC', 'stationary segment; loopability unverified', props,
        'Check hand contact, fingers, face clearance and return to idle.')

pkg = types.ModuleType('fbx_readonly')
pkg.__path__ = ['C:/Program Files/Blender Foundation/Blender 5.2/5.2/scripts/addons_core/io_scene_fbx']
sys.modules[pkg.__name__] = pkg
parse = importlib.import_module('fbx_readonly.parse_fbx').parse

def inspect_fbx(path):
    tree, version = parse(str(path))
    assert version < 7700, 'Check FBX timecode definition for newer versions.'
    objects = next(e for e in tree.elems if e.id == b'Objects')
    models = {e.props[0]: e for e in objects.elems if e.id == b'Model'}
    names = {k: e.props[1].split(b'\x00')[0].decode('utf8') for k, e in models.items()}
    parents = {}
    conn = next(e for e in tree.elems if e.id == b'Connections')
    for c in conn.elems:
        if c.props[0] == b'OO' and c.props[1] in models and c.props[2] in models:
            parents[c.props[1]] = c.props[2]
    hierarchy = {names[k]: names[parents[k]] if k in parents else None for k in names}
    curves = [e for e in objects.elems if e.id == b'AnimationCurve']
    times = [x.props[0] for e in curves for x in e.elems if x.id == b'KeyTime' and len(x.props[0])]
    start, end = min(min(t) for t in times), max(max(t) for t in times)
    takes = next((e for e in tree.elems if e.id == b'Takes'), None)
    take_times = [x.props for e in takes.elems for x in e.elems if x.id == b'LocalTime'] if takes else []
    return dict(path=path.as_posix(), sha256=hashlib.sha256(path.read_bytes()).hexdigest(),
                fbx_version=version, model_count=len(models), hierarchy=hierarchy,
                animation_curve_count=len(curves), curve_key_span_seconds=round((end-start)/46186158000, 4),
                take_local_time_seconds=[[round(v/46186158000,4) for v in t] for t in take_times],
                scope='Binary structure and stored key times only; no pose evaluation or Unreal import.')

details, shortlist = [], []
for i, c in enumerate(choices, 1):
    path = (PACKS/'SourceFiles/MCO_Mocap_Basics/FBX' if c['source'] == 'MCO' else UPLOAD) / c['relative']
    assert path.is_file(), path
    detail = inspect_fbx(path)
    detail['id'] = f'AN-{i:02}'
    details.append(detail)
    family = {'MCO': 'UE4 template skeleton per bundled MCO notes',
              'Mixamo': 'Mixamo bones, mixamorig:Hips at hierarchy root',
              'Rokoko': 'Rokoko UE5 export, Manny-style names; exact compatibility unverified'}[c['source']]
    prep = {'MCO': 'Offline UE4-to-Manny retarget; verify in-place motion on cast.',
            'Mixamo': 'Offline Mixamo-to-Manny retarget; inspect hips drift and neutral pose.',
            'Rokoko': 'Check hierarchy and rest pose against target; pilot on isolated source skeleton before choosing direct import or retarget.'}[c['source']]
    licence = 'All packs open to use per Mike, 2026-11-02.'
    asset_name = 'A_' + c['category'] + '_' + c['label'].replace(' ', '') + '_01'
    shortlist.append(dict(id=detail['id'], status='retained by Mike 2026-11-02; import pending', category=c['category'],
                          clip=c['label'], use=c['use'], source=c['source'], source_file=path.as_posix(),
                          source_skeleton_evidence=family, duration_seconds=detail['curve_key_span_seconds'],
                          desired_motion=c['desired_motion'], props=c['props'], preparation=prep,
                          museum_check=c['review_check'], licence_evidence=licence,
                          proposed_destination='/Game/ProjectRunner/Animation/Library/'+c['category']+'/'+asset_name,
                          sha256=detail['sha256']))
assert len(shortlist) == 28
assert len({r['source_file'] for r in shortlist}) == 28
write_csv('shortlist.csv', shortlist)
(OUT/'fbx-evidence.json').write_text(json.dumps(details, indent=2), encoding='utf-8')
print(json.dumps({'shortlist_rows':len(shortlist), 'inventory_groups':len(inventory), 'source_files':len(file_rows),
                  'missing_inventory_folders':[r['source_path'] for r in inventory if not r['exists']],
                  'sources':dict(collections.Counter(r['source'] for r in shortlist)),
                  'fbx_model_counts':{s:sorted({d['model_count'] for d,c in zip(details,choices) if c['source']==s}) for s in ['MCO','Mixamo','Rokoko']},
                  'output':OUT.as_posix()}, indent=2))
