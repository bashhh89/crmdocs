---
title: Voicemail → Ticket
description: Zoom Phone voicemail becomes a ticket automatically, with recording, transcript, and caller number.
---

# Voicemail → Ticket

When a client calls the ANC Tech Support line and leaves a voicemail, a ticket is created automatically in the Service Dashboard within about 30 seconds. No manual step, no dropped calls, no "I'll check the voicemail inbox tomorrow."

## How it works

1. Client dials the support line → routes to Zoom's auto-receptionist → voicemail extension
2. Client leaves message, hangs up
3. Zoom Phone emails the voicemail notification (with audio attachment + auto-transcript) to a Zapier Email Parser
4. Zapier parses the caller number, formats it, and POSTs to the Service Dashboard's voicemail endpoint
5. Dashboard creates the ticket with:
   - **Source:** voicemail
   - **Category:** voicemail
   - **Priority:** critical (always — someone bothered to call)
   - **Title:** "Voicemail from [Caller Name] ([Phone Number])"
   - **Description:** full transcription + a link to listen to the recording
   - **Contact phone:** the caller's number (searchable, visible on list view)
6. Slack notification fires to the tech support channel

## Caller info extraction

If Zapier's parser doesn't have an explicit "caller number" field for a given mailbox template, the dashboard falls back to regex-extracting the phone number and name directly from the transcription text ("My name is X, callback number Y"). So even messages where the parser misses the structured fields still land with proper identification.

## Dual-write during transition

The voicemail pipeline was set up as a dual-write with Zendesk (ANC's prior system). Every voicemail creates a ticket in both places during the validation window, so nothing slips through. Once the Service Dashboard flow is proven out, the Zendesk side gets retired.

## Linking to a venue

Voicemails come in with no venue attached (the caller doesn't usually announce which venue they're at). On the ticket detail page, the Venue field is editable — hover and click "Link" to type-search and pick the right venue. The ticket then inherits venue-linked services, Slack channel, and reports routing.

## See also

- [Tickets](./tickets) — the wider ticket system this plugs into
- [Roles and Access](./roles-and-access) — who can edit venue on a voicemail ticket
