#!/usr/bin/env python3
"""Narration for the two venue-workflow lessons (Joe 2026-08-17).

Matches the Academy house voice: OpenAI tts-1-hd, `nova`, same as the other 39
training clips. Filenames follow the `<track>-<slug>.mp3` convention the
AudioPlayer in each lesson expects.
"""
import os, sys, pathlib, urllib.request, json

key = None
for line in pathlib.Path("/root/rag2/.env.local").read_text().splitlines():
    if line.startswith("OPENAI_API_KEY="):
        key = line.split("=", 1)[1].strip()
if not key:
    print("no OPENAI_API_KEY"); sys.exit(1)

OUT = pathlib.Path("/root/anc-docs/public/audio/training")
OUT.mkdir(parents=True, exist_ok=True)

CLIPS = {
    "venue-services-game-day-workflow": (
        "Three taps carry your whole game day. Check in when you arrive. Mark game ready "
        "when the building is ready for doors. File the post-event report when it's over. "
        "That's the entire workflow. "
        "Everything starts from My Events. You don't need to hunt through the full venue "
        "schedule — the dashboard already knows which events are yours, listed in date order "
        "with the next one first. If an event you expected isn't there, you're not assigned to "
        "it yet. Tell your manager rather than working it unrecorded, because an unassigned "
        "event doesn't count as covered. "
        "Check in when you physically arrive, not when you leave the house. Check-in is the "
        "signal that the venue is covered. It's the difference between someone being scheduled "
        "and someone being there. "
        "Mark game ready when the room is genuinely ready for doors. Screens up, control system "
        "live, content loaded. It's a statement about the building, not about you being busy. "
        "Then the post-event report. This is where anything that went wrong gets written down. "
        "If something broke, put it in the incident field — what broke, where, and when. That "
        "text is what somebody reads on Monday when they're trying to fix it, and it's the only "
        "record that the problem happened at all. You have twenty-four hours after the event "
        "ends to edit the report, so file it while the detail is fresh. "
        "Your venue manager and lead rep are notified as each step lands. That's not "
        "surveillance. It's the reason nobody calls you mid-warmup to ask if you made it."
    ),
    "venue-services-staffing-your-events": (
        "Staffing is the part of this job that's invisible when it works. Nobody thanks you for "
        "a fully covered Saturday. Everybody notices the one event that went out unassigned. "
        "Home sporting events for your venue's teams go onto the master schedule automatically. "
        "Anything else the venue calendar carries — concerts, private hires, one-off bookings — "
        "does not. It waits for you under Suggested. "
        "Open Events, switch to the Suggested tab, and read what the event is and when it is. "
        "Add it to the schedule if ANC is covering it. Reject it if we're not, and it won't come "
        "back — the same concert will not reappear every time the calendar syncs. "
        "Only the lead for that venue can make this call. If you can't see the buttons on a "
        "suggestion, that venue is led by someone else, and that's deliberate. It stops anyone "
        "quietly adding work to a building they don't run. "
        "For staffing itself, filter to Needs Staffing. Those are the events with nobody on them. "
        "Open one, assign the tech or techs covering it, and check the names appear. Remember "
        "that not every event needs staff — warranty-only venues are covered without an "
        "assignment and are marked as such. Chasing names for those is the fastest way to stop "
        "trusting the unassigned count. "
        "Once an event is staffed you'll be told as each step happens — the tech checks in, marks "
        "game ready, and files the post-event report, which tells you straight away whether an "
        "incident was reported. You're still alerted when a step is missed. What's new is that "
        "you also see the steps that go right, so a quiet night reads as confirmed rather than "
        "unknown."
    ),
}

for name, text in CLIPS.items():
    body = json.dumps({"model": "tts-1-hd", "voice": "nova", "input": text, "speed": 1.0}).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/audio/speech", data=body,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = r.read()
        (OUT / f"{name}.mp3").write_bytes(data)
        print(f"{name:42s} ok  {len(data)}B")
    except Exception as e:
        print(f"{name:42s} FAIL {e}"); sys.exit(1)

print("venue workflow narration done")
