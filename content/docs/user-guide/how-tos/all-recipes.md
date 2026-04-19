---
title: How-Tos
description: Step-by-step recipes for every common task in the CRM.
---

# How-Tos

These are the exact clicks for the tasks people do every week. If a recipe can be done with a Boyka prompt, the prompt is included — just copy-paste.

---

## Opportunities & deals

### How to log a new RFP
1. Open the **ANC** workspace app (top-left switcher — not "Standard")
2. Sidebar → **Deals** → **+ New**
3. Set `company` (search first — don't create a duplicate)
4. Set `stage = PROPOSAL`, `bidStatus = RFP_RECEIVED`
5. Fill `proposalDueDate`, `businessUnit`, `league`, `accountExecutive`
6. Save

**Boyka shortcut:**
```
log a new RFP: Louisville Athletics, TECHNOLOGY, due April 30, AE Natalia
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

**Why it matters:** Natalia's **Estimation & Proposals** view groups by this flag — it's how she knows what's ready to send.

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
**Boyka:**
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
2. Bulk-reassign linked records. For Opportunities:
   ```graphql
   mutation {
     updateOpportunities(
       data: {companyId: "CANONICAL_UUID"},
       filter: {companyId: {eq: "DUPLICATE_UUID"}}
     ) { affectedCount }
   }
   ```
3. Same pattern for People, Venues
4. For ServiceTickets use `companyIdId` (note the double-Id)
5. Soft-delete the duplicate: `deleteCompanies(filter: {id: {in: ["DUPLICATE_UUID"]}})`
6. Reversible via `restoreCompany(id)`

See [Operators — API Access](/docs/operators/api-access) for the full cheat-sheet.

### How to see everything for one account
Open the Company → use the tabs. Every linked object is there: Opportunities, Revenue Splits, Tickets, Estimates, Design Requests, RFP Analyses, Team Allocations, Venues.

---

## People

### How to add a new contact
1. Sidebar → **People** → **+ New**
2. **Crucial:** link `company` to an existing Company — don't create a duplicate
3. Save

### How to import a contact list
Use GraphQL `createPeople(data: [...])` in 50-row chunks. See [Data Migration — Imports](/docs/data-migration/capabilities/imports).

---

## Dashboards & views

### How to switch to the ANC app
Top-left app switcher → **ANC**. This is where all ANC dashboards and folders live. Jireh's bookmark should include the app path.

### How to pin a dashboard to your sidebar
Open it → click the **star** icon. It goes into your Favorites section at the top.

### How to share a view with a stakeholder
Open the view → copy the URL. URLs include the view ID so the recipient lands exactly where you did.

### How to build a new widget
1. Open a dashboard → Edit
2. Add widget → pick type (bar, pie, number, gauge, line)
3. Filter JSON — SELECT values are JSON-stringified arrays:
   ```json
   {"operator":"AND","children":[
     {"fieldMetadataId":"<uuid>","operand":"IS_NOT","value":"[\"WON\"]"}
   ]}
   ```
4. For numeric: `"operand":"GREATER_THAN_OR_EQUAL","value":"50"` (string-encoded)

**Boyka shortcut:**
```
add a widget to ANC 2026 showing pipeline value for TECHNOLOGY vertical with probability >= 50
```

---

## Boyka AI

### How to ask Boyka anything
Open chat bubble top-right, type naturally. Boyka picks the right skill automatically.

### How to force a specific skill
Prefix with: *"use the `skill-name` skill"*. See the [full skill list with example prompts](/docs/user-guide/capabilities/boyka-skills).

### How to generate a design mockup
```
touchdown graphic for Louisville, night game vibe
```
Takes ~20 seconds. A Design Request record is auto-created.

### How to teach Boyka something new
```
learn this: our default payment terms are 50/50 on projects over $500K
```

---

## Data operations

### How to export a view to CSV
Open the view → right-side options → Export → CSV.

### How to bulk update 1,000 opportunities
Use GraphQL `updateOpportunities(data, filter)` — capped at 200 per call. For per-record unique updates, REST PATCH at ~1.5/s. See [Rate Limits](/docs/operators/rate-limits).

### How to backfill a new field from Salesforce
See [Data Migration — Salesforce Field Map](/docs/data-migration/capabilities/salesforce-field-map) for the mapping table + pickle file locations.

---

## Notifications & follow-ups

### How to get alerted on overdue deals
(Phase 2 — explicit ask from Jireh.) For now, open Proposal Pipeline daily. Boyka digest in-sidebar is coming.

### How to assign a task
On any record, open the **Tasks** tab → **+ New Task** → assign.

---

## When things go wrong

### Boyka returns the wrong skill
Force it: *"use the `pipeline-tracker` skill: ..."*.

### A view shows no rows
Check filters haven't accidentally AND'd to impossible. Remove filters one at a time.

### Design AI didn't generate
The fallback worker (`designer-ai.service`) polls every 15s — give it a minute. If still nothing, check `aiPrompt` was actually saved and `GOOGLE_API_KEY` env var is present on the CRM server.

### Dashboard widget shows wrong count
Widget filter values must be JSON-stringified — `"[\"WON\"]"` not `"WON"`. Numeric values must be string-encoded — `"50"` not `50`.

### Stakeholder lands on empty "Standard" app
They need to switch to the **ANC** app (top-left). Or send them a direct-view URL — those include the app path.
