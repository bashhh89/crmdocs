# Subsidiary LTV narrated screen walkthrough

Real production Company-panel screenshots, with scene-aligned narration and instructional labels. This is a narrated screen walkthrough, not continuous screen-recording footage. No Company fields or layouts were mutated.

Canonical lesson: `/docs/training/core/subsidiary-ltv`.

Production assets: `public/videos/training/subsidiary-ltv.{mp4,srt,vtt}` and `public/img/screenshots/crm/subsidiary-ltv-poster.jpg`.

Source narration: `audio_request.json`. Voice: MiniMax `speech-2.8-hd`, `English_ManWithDeepVoice`. Capture: live Diamond Baseball Holdings record, specifically supplied by the requester as the populated example. Only the Company header and Fields panel are in the published captures.

Run in an authorized VPS session. Create `private`, `frames`, `voice`, `review`, and `output` directories, then run `capture.cjs`, `scenes.cjs`, and `compose.cjs`. Generate narration with the shared screen-recording-walkthrough `generate-vps-voice.sh`, run `captions.py`, then `render.mjs walkthrough.json`. The private authentication state must stay out of version control and all published paths.

Verification: full-file media decode; audio-level measurement; complete exported video/transcript review with `audit.py`; beginning, middle and ending visuals; `verify-academy.cjs` for the actual catalog, lesson, playback with sound, seeking, ending, captions, mobile layout and analytics script. Local lesson checks use `ACADEMY_BASE=http://localhost:<port>` and `WALKTHROUGH_ROOT` can point to the generated media/evidence directory.
