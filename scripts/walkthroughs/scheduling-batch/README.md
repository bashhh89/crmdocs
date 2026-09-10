# Support schedule planning, requests and notifications

Audience: Chris and support-schedule technicians. Canonical lesson: https://docs.ancsports.net/docs/training/venue-services/whos-on#planning-requests-and-notifications

Ten short scenes use the actual deployed interface: planning links, month filters, individual Outlook subscriptions, draft copying, deadlines, publishing review, requests, history, notification preferences, and published Who’s On.

`audio_request.json` is the narration source. `capture.mjs` records the live UI and clips it into scenes; `capture-request-scene.mjs` replaces only the requests scene. Calendar links are blurred before rendering. The recording does not submit requests, publish schedules, send reminders, enable email, or rotate subscription links. Authentication is short-lived and generated in memory from existing service configuration; tokens are never written to output files.

Build with the screen-recording-walkthrough skill scripts; narration uses the configured speech provider. Export at 1920×1080 with readable real interface motion, normalized spoken audio, and English captions. Revised scene 4 retains unconfirmed assignments in a draft so availability collection can follow draft creation; known unavailability and rule conflicts leave gaps for review.

Verification: `live-check.mjs` checks actual builder/technician access, private drafts, filters, clipboard, calendar scope, desktop/phone overflow and analytics. `verify-copy-live.mjs` briefly creates a future draft, confirms copied assignments and publishing warnings, then deletes that draft in a finally block and asserts original record/notification counts. `audit-audio.mjs` reviews the actual entire exported audio for script coverage, speech quality and timing. `verify-academy.mjs` follows the Academy card, checks sound-enabled playback, captions, poster, seeking, ending, analytics and both viewport sizes.

Local evidence and private production backup are under `/root/anc-walkthroughs/scheduling-batch`; never copy raw database backups, credential URLs, or authenticated browser state into the public site. Rendered final video, VTT/SRT and poster are the public artifacts.

Final review removed the last navigation frames from scene 4 so the draft form remains visible through its revised narration. Recordings retain a 0.6-second tail guard before navigation; the renderer holds the final frame when narration runs longer. The audio review passed at 10/10 with one minor publish/published transcription difference in scene 8, which does not change the workflow meaning.
