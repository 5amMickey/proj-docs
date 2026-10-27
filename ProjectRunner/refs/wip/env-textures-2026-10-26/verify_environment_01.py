"""Read rendered maps without changing them; save first-review checks."""
import hashlib
import json
import os
from pathlib import Path

_dll = os.add_dll_directory('C:/Program Files/Side Effects Software/Houdini 22.0.466/bin')
import numpy as np
from PIL import Image

root = Path('C:/Users/GameDevPC0403/Documents/GitHub/HoudiniSource/ProjectRunner')
tex = root / 'tex/environment_01'
report = {'files': [], 'checks': {}}
arrays = {}
for variant in ['A_Restrained', 'B_Worn']:
    for surface in ['Trim', 'Wall']:
        for channel in ['BC', 'N', 'ORM', 'M', 'E', 'H']:
            path = tex / variant / ('T_' + surface + '_' + channel + '.png')
            with Image.open(path) as im:
                assert im.size == (2048, 2048), str(path)
                a = np.array(im)
            arrays[variant, surface, channel] = a
            assert a.dtype == np.uint8
            report['files'].append({'path': str(path), 'bytes': path.stat().st_size,
                                    'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                                    'min': a.min(axis=(0, 1)).tolist(), 'max': a.max(axis=(0, 1)).tolist()})
            if channel == 'N':
                n = a.astype(float) / 127.5 - 1
                deviation = float(np.max(abs(np.linalg.norm(n, axis=2) - 1)))
                assert deviation < .01, deviation
                assert np.all(a[:, :, 2] >= 128)
                report['checks'][variant + '_' + surface + '_normal_length_error'] = deviation
            if channel == 'M':
                codes = np.unique(a[:, :, 0]).tolist()
                assert set(codes).issubset({0, 63, 64, 127, 128, 191, 192, 255}), codes
                report['checks'][variant + '_' + surface + '_tint_codes'] = codes
for surface in ['Trim', 'Wall']:
    for ch in ['H', 'N']:
        assert np.array_equal(arrays['A_Restrained', surface, ch], arrays['B_Worn', surface, ch])
    a, b = [arrays[v, surface, 'BC'].astype(float) for v in ['A_Restrained', 'B_Worn']]
    change = float(np.mean(np.any(a != b, axis=2)))
    assert change > 0, surface
    report['checks'][surface + '_changed_colour_fraction'] = change
    report['checks'][surface + '_mean_colour_difference_8bit'] = float(abs(a - b).mean())
    # Edge values reveal seams that need checking on repeated geometry.
    report['checks'][surface + '_A_mean_U_edge_difference_8bit'] = float(abs(a[:, 0] - a[:, -1]).mean())
source = root / 'substance/environment_01/runner_environment_04.sbs'
report['source'] = {'path': str(source), 'sha256': hashlib.sha256(source.read_bytes()).hexdigest()}
report['passed'] = True
out = Path(__file__).with_name('environment_01_map_checks.json')
out.write_text(json.dumps(report, indent=2))
print(json.dumps(report['checks'], indent=2))
print('PASS: 24 maps checked. Report:', out)
