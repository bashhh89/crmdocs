---
title: Tickets
description: Issue tracking with SLA, auto-assignment, merge, and bulk actions.
---

# Tickets

The ticket system is the core triage surface for tech support. Lives at `/tickets` with list-view by default.

## Ticket basics

- **Number** — T-00001 onwards, auto-increment
- **Title / description**
- **Priority** — low / medium / high / critical
- **Status** — new → on hold → in progress → escalated → closed
- **Category** — hardware, software, content, operational, general, voicemail
- **Source** — where the ticket came from: web, email, Slack, voicemail
- **Venue** — editable on any ticket (useful when voicemails come in unassigned)
- **Assigned to** — which tech owns it
- **SLA** — response due, resolution due, met flags

## List view and search

Default view is the list (you can toggle to cards; your choice sticks). Search by ticket number, title, venue, assignee, or category. Filter by status with the tab row at the top.

## Merging duplicate tickets

When the same issue gets reported twice (e.g., client calls back five minutes later), open one ticket, click the dropdown next to "Send to Slack", and pick **Merge into another ticket…** A searchable modal opens — pick the primary ticket, confirm. The duplicate closes automatically with a banner linking back to the primary. Comments move to the primary. The primary shows a banner listing every ticket merged into it.

## Bulk actions

Check the boxes next to any tickets in list view. A floating action bar appears with:

- **Close all** — bulk-close every selected ticket
- **Merge N** — pick which selected ticket becomes the primary; all others merge into it

Fast way to clear stale tickets or bundle duplicates.

## Slack notifications

When a ticket is created:
- Voicemail tickets → tech support Slack channel (`#tech-support`)
- Regular tickets → the venue's own Slack channel (or default if none)

Status changes also ping Slack so the team sees updates without opening the dashboard.

## SLA tracking

Every ticket has a response-due and resolution-due time based on priority:

| Priority | Response due | Resolution due |
|----------|------|------|
| Critical | 1 hour | 4 hours |
| High | 2 hours | 8 hours |
| Medium | 4 hours | 24 hours |
| Low | 8 hours | 72 hours |

Met/breached/overdue flags update automatically based on first response time and resolution time.

## See also

- [Voicemail → Ticket](./voicemail-to-ticket) — phone calls become tickets automatically
- [Roles and Access](./roles-and-access) — who can close, merge, and assign
