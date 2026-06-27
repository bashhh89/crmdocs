---
title: How-Tos
description: Recipe-style walkthroughs for common Service Dashboard tasks.
---

# How-Tos

Short, recipe-style guides for the tasks people do most often.

## Tickets

### Create a ticket from the dashboard

1. **Tickets** in the sidebar → **+ Create Ticket**
2. Type to search the venue (no need to scroll 200+ options)
3. Fill title, priority, category, assignee
4. Save — Slack fires automatically to the venue's channel

### Link a voicemail ticket to the right venue

Voicemails come in unattached because the caller doesn't usually announce which venue they're at.

1. Open the voicemail ticket (title format: "Voicemail from [name] ([number])")
2. In the Case Information panel, hover the **Venue** row → click **Link**
3. Type to search, pick the venue
4. The ticket inherits venue-linked services, Slack channel, and reports routing

### Merge duplicate tickets

When the same issue gets reported twice (client calls back five minutes later, or two techs file the same thing).

1. Open the newer duplicate ticket
2. Click the dropdown next to **Send to Slack**
3. Pick **Merge into another ticket…**
4. Search for the primary → select → confirm
5. The duplicate closes with a banner; comments move to the primary

### Bulk close a batch of tickets

1. Tickets in list view
2. Check the boxes on every ticket you want to close
3. Floating action bar at the bottom → **Close all**

### Bulk merge multiple tickets

1. Tickets in list view
2. Check the boxes on the duplicates
3. Floating action bar → **Merge N**
4. Pick which selected ticket becomes the primary
5. The rest merge into it

### Filter to your assigned tickets

Sidebar → **My Tickets**. List of every ticket assigned to you, sorted by SLA urgency. The default filter strips closed tickets.

### Spot SLA breaches before they happen

The Tickets list has an **SLA badge** column:
- 🟢 met
- 🟡 approaching due time
- 🔴 breached

Sort by SLA → fix the red ones first, the yellow ones next.

### Escalate a ticket

1. Open the ticket
2. Status dropdown → **Escalated**
3. Add a reason in the comments
4. Slack fires to the tech-support escalation channel

## Events & Workflows

### Assign a tech to an event

1. Open the event from the Events page
2. Under Assignments, pick the tech from the dropdown (hours per week show next to each name to help you balance load)
3. Save — Slack fires to the tech

### Run event discovery on a venue

1. Open the venue detail page
2. Click **Discover Events**
3. Ticketmaster + AI search pull upcoming events up to 60 days out
4. Review the candidates; high-confidence ones auto-import
5. Phantom playoff entries ("Round 1, Game 3") and "vs. TBD" placeholders are filtered out automatically

### Check yourself in for an event

1. Sidebar → **My Assignments**
2. Open the event
3. Click **Check In** — geo-stamped, time-stamped
4. Slack confirms in the venue channel

### Submit a game-ready report

1. Open the event you've checked into
2. Click **Game Ready**
3. Run through the checklist: screens up, audio working, content loaded, network OK
4. Add photos if anything's worth flagging
5. Submit — workflow advances to "ready for kickoff"

### Submit a post-game report

1. Open the event after the game ends
2. Click **Post-Game Report**
3. Note any issues, equipment problems, content glitches
4. Submit — closes the workflow for this event

### See what one tech has on their plate

Admin only:
1. Sidebar → **Preview Staff View**
2. Pick a staff member from the dropdown
3. You see their dashboard exactly as they'd see it
4. Useful for checking a tech has the right events before their shift

## Voicemail Pipeline

### Verify a voicemail came through correctly

1. Sidebar → Tickets
2. Filter by **Source: voicemail**
3. Recent voicemail tickets should appear within ~30 seconds of the caller hanging up

### A voicemail ticket has no caller info

Most often: the voicemail parser did not detect a caller number. If the fallback detection also misses it, you can edit `Contact phone` directly on the ticket.

### Stop voicemails from creating tickets

This is a critical pipeline. If it needs to be paused temporarily, ask an admin to disable it through platform settings.

## Venues

### Add a new venue

1. Sidebar → **Venues** → **+ New Venue**
2. Set name, location, league, Ticketmaster ID (for event discovery)
3. Set the Slack channel for ticket routing
4. List contracted services
5. Add installed screens to inventory
6. Save

### Switch a venue's Slack channel

1. Open the venue detail
2. **Slack channel** field → edit
3. Save — every new ticket created for this venue routes to the new channel; existing tickets keep their original routing

### See every screen at a venue

1. Open the venue
2. **Inventory** tab
3. Filter by equipment type if needed
4. Each item shows serial, install date, warranty status

## Roles & Access

### Change someone's role to Tech Support

1. **Staff** → click the staff member
2. Edit → Role dropdown → **Tech Support** → Save
3. They now see every venue and ticket, plus inventory / RMA / parts / maintenance

### Promote a manager to admin

1. **Staff** → click the staff member
2. Edit → Role dropdown → **Admin** → Save
3. They get access to Settings, Portal Admin, Preview Staff View, role management

### Revoke someone's access

1. **Staff** → click the staff member
2. Edit → **Status: Inactive** → Save
3. They can't log in. All historical activity is preserved (don't delete; deactivate).

### Change your own password

1. **Account** link at the bottom-left of the sidebar (above Sign out)
2. Current password → new password (8+ chars) → confirm → save

## Client Portal

### Generate a portal link for a venue

1. Sidebar → **Portal Admin**
2. Find the venue → **Generate Link**
3. Copy the link → send it to the client

### Rotate a portal link

1. Sidebar → **Portal Admin** → find the venue
2. Click **Revoke** on the existing link
3. Click **Generate Link** to create a new one
4. Send the new link; the old one returns 404

### See what the client sees

1. Open the portal link in an incognito window
2. You see exactly what they see (read-only, no login)
3. Useful for debugging "I can't see X" questions

## Reports

### Pull SLA compliance for last month

1. Sidebar → **Reports**
2. Pick **SLA Compliance**
3. Date range → last month
4. Filter by venue, priority, category as needed
5. Export to CSV or PDF

### Generate a labor-hours report for a client

1. Sidebar → **Hours Budgets**
2. Pick the client
3. Date range
4. Export — they get actual hours used vs. allocated, by designer

### Spot under-staffed events

1. Sidebar → **Events** → list view
2. Filter: **Needs Staffing**
3. Sort by event date ascending
4. Anything in the next 7 days needs immediate attention

## Troubleshooting

### Slack isn't firing on new tickets

Ask an admin to verify the notification integration. If messages still do not appear, the venue's channel may have been archived or renamed — check the venue detail page for the channel field.

### Event discovery returned nothing

The venue's Ticketmaster ID might be wrong or stale. Open the venue → re-enter the Ticketmaster ID → run discovery again. For non-Ticketmaster venues, the AI fallback runs against the venue's own calendar page — make sure the URL field is set.

### A workflow won't advance

Check-in is required before Game Ready, Game Ready is required before Post-Game. If a tech skipped check-in, an admin can manually advance the workflow on the event page.

### A tech can't see their assignments

Check their role — Technician role only sees their own events. If they're filling in for someone, an admin needs to assign them explicitly.

### Voicemail tickets coming in with wrong priority

All voicemails are **critical** by design — someone bothered to call instead of emailing. Don't downgrade the priority; if the issue is genuinely low-priority, close the ticket with a note.
