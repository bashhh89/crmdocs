---
title: Everything Shows Up in the CRM Live
description: Tickets, events, and game-day status appear in the CRM in about a second — automatic, no extra step.
---

# Everything Shows Up in the CRM Live

Joe's team works in the Service Dashboard. Leadership works in the CRM. To keep both views truthful without forcing the ops team to switch tools, every operational change in the Service Dashboard appears in the CRM in about a second.

## What syncs and how fast

| When you do this in the Service Dashboard | The CRM shows |
|---|---|
| Open a new ticket | The ticket on the Company page |
| Update a ticket — status, priority, assignment, category, resolution | The latest version |
| Schedule a new event (game, concert, service event) | The event on the Company and on the linked deal |
| Update an event's date, summary, or league | The latest version |
| Tech checks in, files game-ready, submits post-game | The live workflow status |
| Add or update a technician | The matching record |

Everything above happens in about one second.

## Where it shows up in the CRM

- **Company page → Tickets tab** — every ticket linked to that account
- **Company page → Events tab** — every game-day or service event at the venue
- **Deal page → Tickets / Events tab** — same, but scoped to the deal
- **Dashboards** — operational rollups (open tickets, SLA breaches) read from the same data

Leadership doesn't need to ask the ops team for status — it's already there.

## When the CRM is briefly unavailable

Operations never stop. Tickets still get created, technicians still finish their workflow, events still save. The CRM just briefly shows the older version, and a safety net catches it within a few minutes.

This is a deliberate design choice: the Service Dashboard is what runs the field. The CRM is downstream.

## A note on venue names

The sync looks up the matching CRM venue by name. If a venue is called "Madison Square Garden" in one place and "MSG" in the other, they may not match automatically. If you spot a venue's tickets or events not appearing in the CRM, the fix is on the CRM side: open the venue and fill in its Service Dashboard ID — that's the explicit match key.

## See also

- [CRM overview](/docs/crm/overview)
- [Workflows](./workflows) — the state machine that fires sync on each step
- [Tickets](./tickets) — what triggers a sync when a ticket changes
