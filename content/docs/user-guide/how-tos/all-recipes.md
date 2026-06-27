---
title: How-Tos
description: Step-by-step recipes for every common task in the CRM.
---

# How-Tos

Exact clicks for the tasks teams run every week. Where a recipe can be done with an assistant prompt, the prompt is included — just copy-paste.

---

## Opportunities & deals

### How to log a new RFP
1. Open the **ANC** workspace app (top-left switcher — not "Standard")
2. Sidebar → **Deals** → **+ New**
3. Set `company` (search first — don't create a duplicate)
4. Set `stage = PROPOSAL`, `bidStatus = RFP_RECEIVED`
5. Fill `proposalDueDate`, `businessUnit`, `league`, `accountExecutive`
6. Save

**Assistant shortcut:**
```
log a new RFP: Louisville Athletics, TECHNOLOGY, due April 30, AE [name]
```

### How to move a deal through the pipeline
Open **Bid Tracker** (Kanban) → drag the card between columns. The flow is:
```
RFP_RECEIVED → SCOPING → BID_SUBMITTED → SHORTLISTED → WON
                                              ↘ LOST / NO_BID
```

### How to mark pricing complete
1. Open the Opportunity
2. Toggle `pricingComplete = TRUE`
3. `pricingCompleteDate` auto-stamps to now

**Why it matters:** The **Estimation & Proposals** view groups by this flag — the proposal team uses it to see what's ready to send.

### How to record per-year revenue
Two options:

**Option A (simple):** Fill flat fields directly — `revenue2026`, `margin2026`, `revenue2027`, `margin2027`. Dashboard widgets read these.

**Option B (detailed):** Add child `opportunityRevenueSplit` records with `fiscalYear`, `allocatedAmount`, `splitType` (INSTALL/SERVICE/LICENSING/OTHER). Used for deals with mid-year splits.

Pick A for standard deals. Pick B when accounting needs the breakdown.

### How to log team allocations (Hankook pattern)
For advertising deals that spread across multiple teams:

1. Open the Opportunity (e.g., "Hankook Tire - MLB 2024")
2. Click the **Team Allocations** tab
3. **+ New Allocation** — set `team` (Company), `fiscalYear`, `revenue`, `cost`, `margin`
4. Repeat for each team

See [Team Allocations](/docs/data-model/capabilities/team-allocations) for the data model.

### How to find overdue deals
**Assistant:**
```
which deals have proposalDueDate in the past and bidStatus is not WON or LOST
```

**Manual:** Open Proposal Pipeline view → filter `proposalDueDate` < today + `bidStatus` NOT IN (WON, LOST, NO_BID).

---

## Companies

### How to create a new Company
1. Sidebar → **Companies** → **+ New**
2. Set `name` (exact canonical form — check duplicates first)
3. `league`, `revenueType`, address
4. Save

**Always search first.** 20+ duplicates have been merged so far.

### How to merge duplicate Companies
1. Identify canonical record (the one with more linked opps/people)
2. Ask an admin to reassign linked records before archiving the duplicate
3. Confirm Opportunities, People, Venues, and Service Tickets point to the canonical record
4. Archive the duplicate instead of deleting it permanently

### How to see everything for one account
Open the Company → use the tabs. Every linked object is there: Opportunities, Revenue Splits, Tickets, Estimates, Design Requests, RFP Analyses, Team Allocations, Venues.

---

## People

### How to add a new contact
1. Sidebar → **People** → **+ New**
2. **Crucial:** link `company` to an existing Company — don't create a duplicate
3. Save

### How to import a contact list
Use the CRM import flow or ask an admin to run a controlled import. See [Data Migration — Imports](/docs/data-migration/capabilities/imports).

---

## Dashboards & views

### How to switch to the ANC app
Top-left app switcher → **ANC**. All ANC dashboards and folders live here. Bookmarks should include the app path.

### How to pin a dashboard to your sidebar
Open it → click the **star** icon. It goes into your Favorites section at the top.

### How to share a view with a stakeholder
Open the view → copy the URL. URLs include the view ID so the recipient lands exactly where you did.

### How to build a new widget
1. Open a dashboard → Edit
2. Add widget → pick type (bar, pie, number, gauge, line)
3. Pick the object, fields, filters, and display style
4. Save and confirm the count matches the source view

**Assistant shortcut:**
```
add a widget to ANC 2026 showing pipeline value for TECHNOLOGY vertical with probability >= 50
```

---

## Assistant (Scout)

### How to ask the assistant anything
Open the chat bubble (top-right) and type naturally. The assistant picks the right skill automatically.

### How to force a specific skill
Prefix with: *"use the `skill-name` skill"*. See the [full skill list with example prompts](/docs/user-guide/capabilities/scout-skills).

### How to generate a design mockup
```
touchdown graphic for Louisville, night game vibe
```
Takes ~20 seconds. A Design Request record is auto-created.

### How to teach the assistant something new
```
learn this: our default payment terms are 50/50 on projects over $500K
```

---

## Data operations

### How to export a view to CSV
Open the view → right-side options → Export → CSV.

### How to bulk update 1,000 opportunities
Export the target view, review the rows, then ask an admin to run a controlled bulk update.

### How to backfill a new field from Salesforce
See [Data Migration — Salesforce Field Map](/docs/data-migration/capabilities/salesforce-field-map) for the mapping table, then ask an admin to run the backfill.

---

## Notifications & follow-ups

### How to get alerted on overdue deals
Automated overdue alerts are a Phase 2 item. For now, open Proposal Pipeline daily. An in-sidebar assistant digest is in progress.

### How to assign a task
On any record, open the **Tasks** tab → **+ New Task** → assign.

---

## When things go wrong

### The assistant picks the wrong skill
Force it: *"use the `pipeline-tracker` skill: ..."*.

### A view shows no rows
Check filters haven't accidentally AND'd to impossible. Remove filters one at a time.

### Design AI didn't generate
Give it a minute, then confirm the prompt was saved. If it still does not generate, ask an admin to check the image-generation service.

### Dashboard widget shows wrong count
Check whether the widget filters match the source view, especially status filters and probability thresholds.

### Stakeholder lands on empty "Standard" app
They need to switch to the **ANC** app (top-left). Or send them a direct-view URL — those include the app path.
