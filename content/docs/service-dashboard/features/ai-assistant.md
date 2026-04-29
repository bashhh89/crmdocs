---
title: AI Assistant
description: The in-dashboard AI that answers questions, takes actions, and diagnoses LED issues from a photo.
---

# AI Assistant

The Service Dashboard has two AI surfaces, both useful from day one:

1. **Chat Assistant** — ask it anything about the live state of operations, or tell it to do things
2. **LED Display Diagnostic** — snap a photo of a misbehaving LED, get a structured diagnosis

Both respect your role — a technician sees only their venues; a manager sees everything in their scope.

## Chat Assistant

The slide-out AI panel on every dashboard page. The same AI is available in Slack as **@ANC** — anything you can ask in chat you can ask in Slack.

### Things you can ask (live data)

- "What events are tonight?"
- "Who's working Fenway this week?"
- "How many open tickets at Prudential Center?"
- "Show me the labor budget for NYC this month"
- "Any overdue post-game reports?"
- "What's the SLA breach rate this week?"

### Things you can ask it to do

With the right role, the assistant takes action:

- Create a ticket on a venue with a given title and priority
- Search staff by role or venue
- Log a walkthrough or maintenance entry
- Move a design request to client review
- Pull the canned-response library
- Generate a quick stats summary

A technician can't ask it to create tickets on venues they're not assigned to — every action checks role and venue scope.

### Chat history

Conversations are saved per user. Open the same chat later, see the full history. Useful if you started something the day before and want to keep going.

## LED Display Diagnostic

A field tool for technicians. A tech shoots a photo of a malfunctioning LED, the dashboard returns a structured diagnosis:

- **Title** — short summary of the problem
- **Issue type** — category (display defect, power, content, calibration, etc.)
- **Description** — what the AI sees
- **Likely cause** — best-guess root cause
- **Suggested fix** — first thing to try
- **Urgency** — Low / Medium / High / Critical

Takes about 2-5 seconds. Use it on the way to the venue or while standing in front of the wall.

## Where you can use the assistant

- **Inside the dashboard** — the AI panel in the sidebar
- **In Slack** — @ANC in any channel
- **From the support phone line** — voicemails feed the same intake (see Voicemail → Ticket)

## See also

- [Tickets](./tickets) — the assistant can create tickets for you
- [Reports and Dashboards](./reports-and-dashboards) — the assistant pulls the same numbers shown there
- [Everything shows up in the CRM live](./crm-sync) — anything the assistant creates also lands in the CRM in about a second
