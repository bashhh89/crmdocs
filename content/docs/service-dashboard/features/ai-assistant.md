---
title: AI Assistant
description: The in-dashboard AI that understands events, venues, staff, tickets, and workflows.
---

# AI Assistant

The dashboard has a built-in AI assistant you can use from anywhere. It's the same AI that powers Claw (the Slack bot) — running on GLM 5.1 with access to the live database.

## What it can do

Natural-language answers about the live state of operations:

- "What events are tonight?"
- "Who's working Fenway this week?"
- "How many open tickets at Prudential Center?"
- "Show me the labor budget for NYC this month"
- "Any overdue post-game reports?"

## What it can do (write-side)

With the right permission, it also takes actions:

- Create a ticket on a venue with a given title and priority
- Search staff by role or venue
- Log a walkthrough or maintenance entry
- Move a design request to client review
- Generate the dashboard stats summary

Every skill is permission-gated — a technician can't ask the AI to create tickets on venues they're not linked to.

## Where you can invoke it

- **In the dashboard** — the AI panel in the sidebar
- **In Slack** — @ANC in any channel; the bot has the same skills
- **From Claw** — Claw has all the same skills via the internal API

## See also

- [Tickets](./tickets) — the AI can create tickets for you
- [Reports and Dashboards](./reports-and-dashboards) — the AI pulls the same live stats you see there
