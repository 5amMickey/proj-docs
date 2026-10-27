"""Compile and render unchanged Designer sources into a new diagnostic folder."""
import hashlib
import json
from pathlib import Path
import struct
import subprocess
import time

PROJECT = Path("C:/Users/GameDevPC0403/Documents/GitHub/HoudiniSource/ProjectRunner")
TOOLS = Path("C:/Program Files/Allegorithmic/SubstanceDesigner")
OUTPUT = PROJECT / "backup/texture_preflight_20261026_01"
REPORT = Path(__file__).parent / "designer_source_compatibility.json"
MATERIALS = ["painted_metal", "metal_corrugated_002", "brushed_metal", "plastic", "stucco_001", "brick_wall_001"]
CHANNELS = {"basecolor", "normal", "roughness", "metallic", "ambient_occlusion"}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def command(args, logfile):
    started = time.monotonic()
    try:
        result = subprocess.run([str(arg) for arg in args], capture_output=True, text=True, timeout=90)
        output = result.stdout + "\n" + result.stderr
        code = result.returncode
    except subprocess.TimeoutExpired:
        output = "Process exceeded the 90-second diagnostic limit.\n"
        code = -1
    logfile.write_text(output, encoding="utf-8")
    return {"exit_code": code, "seconds": round(time.monotonic() - started, 2), "log": str(logfile)}


if OUTPUT.exists() or REPORT.exists():
    raise SystemExit("Refusing to overwrite an existing diagnostic run.")
OUTPUT.mkdir(parents=True)
records = []
for name in MATERIALS:
    source = PROJECT / "substance/materials" / (name + ".sbs")
    folder = OUTPUT / name
    folder.mkdir()
    before = digest(source)
    record = {"name": name, "source": str(source), "source_sha256_before": before}
    record["compile"] = command([TOOLS / "sbscooker.exe", "--inputs", source, "--output-path", folder], folder / "compile.log")
    archive = folder / (name + ".sbsar")
    if record["compile"]["exit_code"] == 0 and archive.exists():
        record["info"] = command([TOOLS / "sbsrender.exe", "info", archive], folder / "info.log")
        record["render"] = command([TOOLS / "sbsrender.exe", "render", "--inputs", archive,
                                    "--output-path", folder, "--output-name", "{outputNodeName}",
                                    "--output-format", "png", "--output-bit-depth", "8",
                                    "--set-value", "$outputsize@8,8", "--engine", "sse2"], folder / "render.log")
    record["images"] = []
    for path in sorted(folder.glob("*.png")):
        data = path.read_bytes()
        if data[:8] != b"\x89PNG\r\n\x1a\n":
            raise RuntimeError("Invalid PNG: " + str(path))
        width, height = struct.unpack(">II", data[16:24])
        record["images"].append({"path": str(path), "channel": path.stem,
                                  "width": width, "height": height, "sha256": digest(path)})
    record["missing_channels"] = sorted(CHANNELS - {x["channel"] for x in record["images"]})
    record["source_sha256_after"] = digest(source)
    record["source_unchanged"] = before == record["source_sha256_after"]
    record["passed"] = (record["source_unchanged"] and not record["missing_channels"]
                         and all(x["width"] == 256 and x["height"] == 256 for x in record["images"])
                         and record["compile"]["exit_code"] == 0
                         and record.get("render", {}).get("exit_code") == 0)
    records.append(record)
    print(json.dumps({"material": name, "passed": record["passed"],
                      "outputs": len(record["images"]), "missing": record["missing_channels"]}), flush=True)

report = {"purpose": "Source compatibility only. Default source appearance is not a proposed or approved look.",
          "designer_version": "11.2.2 build 5117", "output": str(OUTPUT), "materials": records,
          "passed": all(x["passed"] for x in records)}
with REPORT.open("x", encoding="utf-8") as stream:
    json.dump(report, stream, indent=2)
print("Report: " + str(REPORT), flush=True)
raise SystemExit(0 if report["passed"] else 1)
