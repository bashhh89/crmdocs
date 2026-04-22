---
title: Workflows
description: Check-in, game ready, post-game report — the daily rhythm for assigned techs.
---

# Workflows

Every event that requires staffing goes through a 3-step workflow. The system tracks progress and nudges the right people at the right time.

## The three steps

| Step | What happens | Who does it |
|------|------|------|
| **Check-in** | Tech arrives on site, opens the workflow link, confirms they're there | Assigned technician |
| **Game Ready** | Equipment checked, crew ready, content loaded, comms tested | Assigned technician |
| **Post-Game Report** | Notes + any incidents + equipment status after the event | Assigned technician |

Each step moves the event's `workflow_status` forward: `pending → checked_in → game_ready → post_game_submitted`.

## Reminder tiers (automatic Slack pings)

The system fires reminders at specific times before and after the event:

- **T-minus 3 hours:** friendly reminder to the tech in the venue Slack channel ("reminder for [tech], you're assigned to [event] at [venue] tonight at [time] ET")
- **T-minus 1 hour:** escalation to managers if the tech hasn't checked in yet
- **T-0 (game start):** critical alert if still no check-in
- **Post-game + 30 min:** Game Ready reminder if the tech checked in but didn't submit Game Ready
- **Post-event + 30 min to 6 hours:** Post-Game Report reminder

All reminders dedupe within a 2-hour window, so nobody gets spammed.

## Post-game report edit window

Once submitted, post-game reports are editable for 24 hours. After that they're locked. This matches how ANC's existing processes work — fix typos same-night, but the report becomes the canonical record after a day.

## See also

- [Events](./events) — where the workflow starts
- [Staff and Assignments](./staff-and-assignments) — who gets reminded
