# Bid workspace and project partners — 2026-09-10

Updates the existing Bid Workspace lesson and its single Academy card in place.
The first five verified production scenes retain the email-to-opportunity flow.
Scenes six through nine show the current Project partners tab: existing accounts,
fixed roles and notes, automatic source-supported partners, uncertain suggestions,
and relationship edits/removal. Every write uses visibly labeled QA records.
Private sessions and raw recordings stay outside this repository.

Releases: intake b20cb43b; CRM applications 44308cd (Project Team 0.2.7,
Email Intake 0.3.0). The source service is deployed and the applications installed.

Verification:
- 407 intake tests across 21 suites; source TypeScript and production build.
- Real extractor input: explicit architect added automatically, abbreviated
  contractor held for account confirmation; repeated sync did not duplicate.
- Source reassignment removed only the untouched source-owned relationship.
- Live browser add/edit/apply/remove/restore/account navigation with real typing
  while recording; selected account displayed and existing notes loaded intact.
- Confirming an abbreviated suggestion against an already-linked account persisted
  across reload and retained exactly one relationship.
- Twenty older confirmed emails checked in review-only mode: zero verified
  suggestions and no changed deadlines or review decisions.
- Existing legacy roles migrated explicitly; legacy detail preserved in notes.

`audio_request.json` is the canonical narration. `walkthrough.json` contains the
final genuine screen-recording timings; `captions.py` generates caption cues.
The delivered MP4 is checked by full decode, audio measurement, actual audiovisual
transcript/privacy review, and live Academy playback including sound, seek, ending,
captions, tracking, and phone fit. QA evidence is retained alongside this file.
