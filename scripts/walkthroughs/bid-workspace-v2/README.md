# Bid email and project team lesson — 2026-09-10

This replaces the existing Bid Workspace lesson in place. V2 media filenames avoid stale poster/video caching. The Academy retains one card linking to `/docs/workflows/bid-workspace`.

The real production recording demonstrates reading an original email, choosing a CRM opportunity, preserving or applying supported deadlines, reviewing the saved result, reading the original message on the opportunity, creating an Unassigned draft, and adding/editing/removing an existing project company with a direct account link.

All writes shown use explicitly labeled QA training records. Reconfirmation of an already applied source was used for the recorded confirmation; no test announcements were posted. QA companies, opportunities, source rows, notes and mirrors are removed after recording. Private sessions and raw recording files stay outside this repository.

Feature releases: proposals `e501556f`, final `86dc4faa`; installed CRM applications `8b58f9b` (Email Intake 0.2.1, Project Team 0.1.1).

Validation before publication:
- 243 focused source tests across ten suites, including 145 unchanged alert guard tests.
- Replay against all 6,693 pre-test opportunities using 18 real intake emails.
- Live writes: supported proposal/RFI deadlines, safe repeated confirmation, source note reassignment, Unassigned draft and duplicate refusal.
- Authenticated browser actions: existing company selection, direct account navigation, persisted role edits, relationship removal preserving the company, original email and exact source link.
- Final production browser checks: one persistent receipt, complete search, confirmation endpoint, original-email deep link, accurate alert wording, phone fit, correct University of Washington match and tracking.
- Separate actual extractor checks correctly identified the venue and deadline evidence in the University of Washington and Bank of America examples. This is a narrow benchmark, not a claim of universal extraction accuracy.

`audio_request.json` is the narration source. `captions.py` creates short caption cues from the final scene timings. Media QA evidence is recorded alongside these files. The delivered MP4 must pass full decode, audio levels, actual-video semantic review, and live Academy playback with sound, seek, ending, captions, tracking and phone checks.
