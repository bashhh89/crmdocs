---
title: IoT Operations Workspace
description: Spreadsheet-style operations workspace for venue hardware, walkthroughs, maintenance, forms, and operational documents.
---

# IoT Operations Workspace

The **IoT Operations Workspace** is the spreadsheet-style workspace inside the Service Dashboard. Open **Field Ops -> Operations Workspace** or go to `/operations`.

Use it for the physical side of the venue: displays, locations, rack equipment, IP notes, walkthrough logs, maintenance records, forms, and operational documents.

## What belongs here

| Area | What it tracks |
|---|---|
| **Displays and assets** | Installed displays, physical locations, model details, status, connected devices, rack notes, IP details |
| **Walkthrough Log** | Field inspection visits, result, location/display checked, technician notes, follow-up status |
| **Maintenance** | Operational maintenance events, affected equipment, assigned techs, date, status, resolution notes |
| **Forms** | Fast field-entry forms for visits, audits, and operational updates |
| **Documents** | Working documents and SOPs the ops team needs near the live data |

## When to use it

Use the IoT Operations Workspace when the work is a table-first operational record:

- "What displays are installed at this venue?"
- "Which rack/device is connected to this screen?"
- "Log today's walkthrough."
- "Show open maintenance rows for Fenway."
- "Update the status on this equipment issue."
- "Pull the venue's operational notes or document."

Use **Tickets** instead when the work is a support case with SLA, client communication, assignment, and resolution tracking.

Use **Venues** when you are changing the venue record itself: address, timezone, client link, contracted services, Slack channel, staffing requirement, or event feed settings.

## Daily workflow

1. Open **Operations Workspace** from Field Ops.
2. Choose the table or saved view you need.
3. Filter by venue, status, location, display type, or technician.
4. Update the row directly when the field team has new information.
5. Use the assistant for bulk lookup, counting, drafting documents, or safe multi-row updates.

## AI support

The Service Dashboard assistant can work with the operations tables when your role allows it. It can:

- List available operations tables
- Show a table schema before creating or updating rows
- Query records with filters
- Count matching records
- Create or update rows in bulk
- Draft or update operational documents
- Export workspace documents to PDF

Good prompts:

```text
List the operations tables and show me which one tracks walkthroughs.
```

```text
Count open maintenance rows for Prudential Center.
```

```text
Show the schema for the Walkthrough Log before I add a new record.
```

```text
Draft a short SOP document for checking a ribbon board before doors open.
```

## Boundaries

- The workspace is for operational tables and documents, not sales pipeline or pricing.
- Tickets still live in `/tickets`; walkthrough observations do not automatically become support tickets unless the team intentionally opens one.
- CRM leadership views still live in Twenty CRM. The workspace is where the ops team keeps the table-level truth current.
- If a venue's operational records are not lining up with CRM data, check the venue name and Service Dashboard ID first.

## See also

- [Venues](./venues) - venue records and contracted services
- [Tickets](./tickets) - SLA-backed support cases
- [AI Assistant](./ai-assistant) - natural-language lookup and actions
- [Real-time CRM Sync](./crm-sync) - what pushes into the CRM
