#!/usr/bin/env python3
# Generate voice clips for the guided onboarding simulator (nova voice, matches lessons).
import os, sys, pathlib, urllib.request, json

# read OPENAI_API_KEY from rag2 env
key = None
for line in pathlib.Path("/root/rag2/.env.local").read_text().splitlines():
    if line.startswith("OPENAI_API_KEY="):
        key = line.split("=", 1)[1].strip()
if not key:
    print("no OPENAI_API_KEY"); sys.exit(1)

OUT = pathlib.Path("/root/anc-docs/public/audio/onboarding")
OUT.mkdir(parents=True, exist_ok=True)

CLIPS = {
    "step-1": "This is your pipeline — every card is a deal, and the columns are the stages. Let's move one. Drag the Dodgers deal from Prospecting into Proposal.",
    "step-2": "Now open it. Click the Dodgers card to see the full deal — every field in one place.",
    "step-3": "Here's the magic part. Instead of clicking, just ask. In the assistant box at the bottom, type: move this deal to won.",
}

for name, text in CLIPS.items():
    body = json.dumps({"model": "tts-1-hd", "voice": "nova", "input": text, "speed": 1.0}).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/audio/speech", data=body,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        (OUT / f"{name}.mp3").write_bytes(data)
        print(f"{name:10s} ok  {len(data)}B")
    except Exception as e:
        print(f"{name:10s} FAIL {e}"); sys.exit(1)

print("onboarding voice done")
