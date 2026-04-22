---
title: Events
description: The calendar of every game, concert, and service event across every venue.
---

# Events

Every event ANC is working — tonight, this week, three months out — lives on the Events page. Calendar view for visual scanning, list view for bulk work, and a powerful filter bar across both.

![Events list view](/img/screenshots/service-dashboard/02-events-list.png)

## What you see

- **Calendar view** — day / week / month, color-coded by league
- **List view** — sortable, searchable
- **Filters** — pending workflow, needs staffing, warranty-only, AI-imported, URL feed
- **Status badges** — how many techs assigned, what their check-in state is, which events need attention

## Where events come from

Three sources feed the calendar:

1. **Ticketmaster Discovery API** — for every sports/concert venue, we pull the official event list keyed by the venue's Ticketmaster ID. No road games, no speculative "Home Game 1 (If Necessary)" playoff placeholders.
2. **MLB Schedule API** — full season of MLB games, filtered to ANC-managed venues.
3. **AI discovery** — for venues without a structured feed, our AI scans the venue's own calendar page + Google results to find upcoming events.

All three paths go through the same placeholder filter, so phantom playoff entries ("Round 1, Game 3", "vs. TBD") never land in the calendar.

## Personal view

Admins and managers can open **My Assignments** (also in the sidebar) to see only events they're personally assigned to — useful if leadership also works events occasionally.

The **Preview Staff View** tool (also admin-only) lets you pick any staff member from a dropdown and see their dashboard exactly as they'd see it. Useful for verifying a tech has the right events before their shift.

## See also

- [Staff and Assignments](./staff-and-assignments) — how people get assigned to events
- [Workflows](./workflows) — check-in, game ready, post-game report
