---
title: Real-time CRM Sync
description: Every ticket, event, and workflow change in the Service Dashboard pushes to Twenty CRM in about a second.
---

# Real-time CRM Sync

Joe's operations team works in the Service Dashboard. Leadership works in the CRM. To keep both views truthful without making the ops team switch tools, every operational event syncs to the CRM in about a second.

This was completed end-to-end on **2026-04-20**. Every gap is closed.

## What syncs and when

| Action | CRM target | Latency |
|---|---|---|
| Ticket created | `ServiceTicket` (linked to Company, optionally Opportunity) | ~1 s |
| Ticket updated (status, priority, assignment, category, resolution) | `ServiceTicket` | ~1 s |
| Event created (auto-discovered or manual) | `venueEvent` (with venue + assigned techs) | ~1 s |
| Event updated (summary, date, league) | `venueEvent` | ~1 s |
| Workflow transition (pending → checked-in → game-ready → post-game-submitted) | `venueEvent.workflowStatus` + post-game report | ~1 s |
| Staff record created or updated | `technician` | ~1 s |

Before 2026-04-20 these only synced via a 15-minute cron — operations were always "up to a quarter hour stale" in the CRM. The push removed that lag.

## How it actually works

- Each route that mutates state (`/api/tickets`, `/api/events/*`, `/api/workflow/[eventId]`, `/api/staff/*`) calls a sync helper after the local write succeeds:
  - `syncTicketsToTwenty([fresh])`
  - `syncEventsToTwenty([fresh])`
  - `syncTechniciansToTwenty([fresh])`
- The call is **fire-and-forget** — async, non-blocking. The local op completes first; the CRM push runs in the background.
- The 15-minute cron at `/api/cron/sync-twenty` stays as a safety net — if real-time push misses anything, the cron catches it within 30 minutes (it queries records updated in the last 30m window).

## Failure mode

If the CRM is briefly unreachable, the Service Dashboard **does not block local operations**. The technician finishes their workflow, the ticket gets created, the event saves — locally everything is fine. The CRM gets a stale entry until the next cron sweep.

Errors are logged to `activity_log` so you can audit unmatched venues or rate-limit hits.

## Rate limit handling

Twenty has a 100 requests / 60-second shared rate limit. The sync layer applies:

- 80 req/min self-imposed cap (under the actual limit)
- 4 retries with exponential backoff
- Honors `Retry-After` on 429
- Fails immediately on 4xx (other than 429), retries on 5xx

The 2026-04-27 rate-limit env bump on the CRM service raised the actual ceiling to 1M/min, so the 80/min cap is now generous headroom.

## Venue matching (and a gotcha)

The sync looks up the matching CRM venue by name. This is fuzzy-match, not exact — "Madison Square Garden" matches "Madison Sq Garden" matches "MSG" only if the substring matches.

If a venue exists in the Service Dashboard but not the CRM, the sync silently skips it and logs the unmatched name in `activity_log`. To fix this for a specific venue, fill in the CRM Venue's `servicesId` field (the Service Dashboard venue UUID) — that's the explicit match key that bypasses fuzzy matching.

## Where it lives in the code

- Sync layer: `lib/twenty-sync.ts` (events / tickets / staff) and `lib/twenty-ops.ts` (Twenty-backed objects)
- Cron safety net: `app/api/cron/sync-twenty/route.ts` (incremental) and `app/api/cron/sync-twenty/full/route.ts` (full resync)
- Rate limiter: in-memory, per Node process

## Twenty-backed objects (separate path)

Some objects don't live in Postgres on the Service Dashboard side at all — they're stored directly in Twenty and read through a thin proxy. These are gated behind env flags so you can flip them on per-deploy:

| Object | Env flag |
|---|---|
| Inventory assets | `TWENTY_BACKED_INVENTORY` |
| Maintenance logs | `TWENTY_BACKED_MAINTENANCE` |
| Design requests | `TWENTY_BACKED_DESIGNS` |
| Designer time entries | `TWENTY_BACKED_TIME_ENTRIES` |
| (5 more — see `isTwentyBackedEnabled()` in `lib/twenty-ops.ts`) | |

When a flag is on, the Service Dashboard reads/writes that object directly against Twenty's GraphQL — no local copy.

## See also

- [Architecture / Data flow](/docs/architecture/data-flow) — every cross-system sync mapped
- [Workflows](./workflows) — the state machine that fires sync on each transition
- [Tickets](./tickets) — what gets pushed when a ticket changes
