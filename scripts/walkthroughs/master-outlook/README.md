# Master Outlook walkthrough

Source for the second video chapter in the Who's On Academy lesson.
Work outside this repository: copy this folder to `/root/anc-walkthroughs/master-outlook`.
The scripts use the existing Services and browser dependencies on the VPS.

1. Run `live-check.mjs`: compares Chris's live master feed to all published rows,
   confirms personal isolation and checks both desktop and phone.
2. Generate narration using the screen-recording-walkthrough skill's
   `generate-vps-voice.sh audio_request.json voice`.
3. Run `capture.mjs`, then the skill's `build-project.sh <folder> --skip-voice`.
4. Run `audit-audio.mjs` on the extracted final audio and review the actual film.
5. Publish MP4, VTT and poster only after media, transcript and visual QA.

Recording uses a short-lived signed session, without changing account credentials.
The private calendar URL is blurred before any capture. The board demonstration
opens a published period. Playwright's 1920x1080 recording has a 1600x900 viewport
in the top left; the capture script crops the padding before scaling each clip.

Verified 2026-09-10: Services `3aa5c14`, 65 shifts / 9 people, personal 6 unchanged,
0 page errors, clipboard and scope switch working at 1440 and 390 pixels.
Final 70.83s H.264/AAC, 1920x1080; full decode passes, narration -17.2 dB mean,
-1.3 dB peak; audio transcript audit passes all six segments.
