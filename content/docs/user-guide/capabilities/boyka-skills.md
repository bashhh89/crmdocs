---
title: All Boyka Skills (with Example Prompts)
description: 30 ANC-specific skills Boyka can invoke, each with copy-pastable prompts you can try now.
---

# All Boyka Skills — with example prompts

Boyka has 30 skills. Below is **what each one does, when to use it, and prompts you can copy-paste straight into Boyka chat**.

Each skill auto-triggers when your prompt matches its intent — you don't need to name the skill. But if Boyka picks the wrong one, you can force it with: *"use the `skill-name` skill"*.

:::tip How to open Boyka
Click the **chat bubble** top-right on any CRM page, or open any Opportunity/Company and use the right-hand assistant panel.
:::

---

## Pipeline & deals

### `anc-copilot` — default routing
General-purpose. Boyka falls back to this when nothing else matches.

**Try:**
```
give me a one-line summary of where our pipeline stands this week
```
```
what's the most important thing I should look at today
```

---

### `pipeline-tracker` — open deals & at-risk bids
Finds open opportunities filtered by stage, bidStatus, due date, or account.

**Try:**
```
show me the top 10 open deals by value
```
```
which bids are due in the next 7 days
```
```
what's in SHORTLISTED status right now
```
```
any RFPs where pricingComplete is still false and proposalDueDate is this week
```

---

### `contract-tracker` — backlog + payment status
Won deals + substantial completion dates + payment progress. Powers the Backlog view.

**Try:**
```
show my backlog sorted by completion date
```
```
which won deals are less than 50% paid
```
```
what's the total contract value of everything completing in Q3 2026
```

---

### `rfp-analyzer` — parse RFP documents
Extracts requirements, scope, due dates, evaluation criteria from an uploaded RFP PDF.

**Try:**
```
I just uploaded an RFP for Louisville — extract the scope and due date
```
```
summarize the technical requirements in the Pacers RFP I attached
```
```
what's the evaluation weighting on the MLS Miami RFP
```

---

### `rfp-to-deal-pipeline` — RFP → opportunity
Takes rfp-analyzer output and creates a proper Opportunity + links the Company.

**Try:**
```
create a new opportunity from the RFP I just analyzed for Aston Villa
```
```
convert the Celtics RFP analysis into a deal, set proposalDueDate from the RFP
```

---

### `quick-estimator` — back-of-napkin pricing
Quick pricing for LED products without the full Proposal Engine flow.

**Try:**
```
rough price for 3 4mm LED boards 10x5ft each, courtside
```
```
ballpark install cost for a 60ft ribbon at MSG
```
```
what would 200 stanchions cost including shipping
```

---

### `sow-generator` — SOW + one-pager
Generates statement of work and/or client-facing one-pager for an opportunity.

**Try:**
```
generate a one-pager for opportunity Celtics TD Garden – 3 Boards
```
```
draft a SOW for Dallas Stars ribbon install, 90-day delivery
```

---

## Design & content

### `designer-ai` — generate mockup images
Creates venue mockup graphics in ~20 seconds using Gemini 3 Pro Image Preview.

**Try:**
```
touchdown graphic for Louisville, night game vibe
```
```
celebration moment for Boston Celtics center-hung board
```
```
generate a broadcast lower-third for New York Yankees home opener
```
```
ribbon display mockup for Red Sox, Fenway green tones
```

See [Designer AI](./designer-ai) for the full flow.

---

### `design-request-triage` — route incoming design requests
Looks at an open Design Request and suggests designer + priority + deadline.

**Try:**
```
triage the open design requests that came in today
```
```
which designer should take the Marlins request
```

---

### `designer-hours-watchdog` — budget watch
Flags designers over their hour budget for the week/month.

**Try:**
```
who's over their design budget this week
```
```
show me all designers with more than 40 logged hours last week
```

---

### `print-request-assistant` — print routing
Helps route print requests to the right vendor based on size, material, venue.

**Try:**
```
where do I send a 20ft vinyl banner for the Knicks
```
```
recommend a vendor for 50 acrylic signs for Dodgers
```

---

### `similar-design-finder` — past-design search
Finds past Design Requests matching league/theme/venue.

**Try:**
```
find past touchdown graphics for NCAA schools in the south
```
```
anything similar to the Celtics TD Garden board we did in 2024
```
```
what do we have on file for MLB home opener promos
```

---

## Ops & tickets

### `ticket-triage` — categorize new tickets
Triages incoming service tickets — priority, venue link, assignee suggestion.

**Try:**
```
triage the open tickets from the last 24 hours
```
```
any critical tickets I should know about
```

---

### `venue-health-report` — per-venue rollup
Status summary for a specific venue — tickets, events, open issues.

**Try:**
```
health report for Gillette Stadium
```
```
how's MSG doing this month
```

---

### `venue-onboarding` — new venue checklist
Generates onboarding checklist for a newly-added venue.

**Try:**
```
onboarding checklist for our new venue at Nippert Stadium
```

---

### `readiness-scorer` — venue readiness
Scores a venue's readiness for an upcoming event.

**Try:**
```
is TD Garden ready for Friday's game
```
```
readiness score for Yankee Stadium before opening day
```

---

### `failure-pattern-detective` — recurring ticket patterns
Finds repeating failure patterns at a venue.

**Try:**
```
what keeps breaking at Citi Field
```
```
recurring ticket themes across NFL venues this season
```

---

### `walkthrough-scribe` — format walkthrough notes
Cleans up walkthrough notes into a client-ready report.

**Try:**
```
format the walkthrough notes I just saved for the Wake Forest visit
```

---

### `inventory-locator` — find parts/assets
Finds a specific part, LCD unit, rack device, or asset.

**Try:**
```
where's the 4mm LG panel SN LG20240112
```
```
how many spare power supplies do we have in Boston warehouse
```

---

### `parts-order-suggester` — restock
Suggests restock orders based on inventory + ticket history.

**Try:**
```
what should I reorder for the NCAA season
```
```
parts we're low on going into March Madness
```

---

## Events & staffing

### `event-staffing-assistant` — staff an event
Assigns staff to an upcoming event.

**Try:**
```
who should I staff for the Celtics-Lakers game Friday
```
```
staffing recommendation for 3 NBA games this weekend
```

---

### `checklist-builder` — pre-event checklist
Builds pre-event checklist based on venue + event type.

**Try:**
```
checklist for an MLB home opener at Fenway
```
```
checklist for a halftime show at MSG
```

---

## Advertising

### `estimator-excel` — excel-based media estimator
Spreadsheet-style estimator for media/ad sales deals.

**Try:**
```
estimate Hankook MLB 2026 across 9 teams, $2.5M total
```
```
per-team allocation for a $1M NFL media deal across 6 teams
```

---

## Analytics & reports

### `dashboard-building` — build widgets
Creates or modifies dashboard widgets. Knows our filter JSON format.

**Try:**
```
add a widget to ANC 2026 dashboard showing forecasted revenue for MEDIA_SPONSORSHIP with probability ≥ 75
```
```
build a pie chart of open deals grouped by league
```

---

### `performance-analytics` — team/league breakdowns
Win/loss, revenue, margin breakdowns by team, league, vertical, or AE.

**Try:**
```
win rate by league for 2025
```
```
which AE has the highest close rate
```
```
margin by vertical year to date
```

---

### `ops-daily-digest` — daily summary
End-of-day or start-of-day ops summary.

**Try:**
```
give me today's ops digest
```
```
what happened in ops yesterday
```

---

## Outreach

### `heyreach-linkedin` — LinkedIn outreach
Queues LinkedIn outreach via HeyReach integration.

**Try:**
```
queue LinkedIn messages to decision-makers at our top 10 open deals
```
```
connect with the new AD at Louisville
```

---

## Catalog & enrichment

### `product-catalog` — LED product spec lookup
Specs, prices, lead times for LED products.

**Try:**
```
spec on 3.9mm courtside tables
```
```
what's the lead time on LG 4mm panels right now
```
```
compare LG vs Yaham for a 120ft ribbon
```

---

### `web-browse` — open web lookup
Boyka fetches a URL or searches the open web.

**Try:**
```
look up Louisville's athletic director's email
```
```
what's the capacity of Allegiant Stadium
```

---

### `learn` — ingest a new document
Teaches Boyka about a new document, policy, or contract.

**Try:**
```
learn this contract — [attach PDF]
```
```
remember this: our default payment terms are 50/50 on projects over $500K
```

---

### `enrich` — company/person enrichment
Pulls enrichment data from the web for a Company or Person record.

**Try:**
```
enrich the Company record for Louisville Athletics
```
```
find LinkedIn for everyone on the Celtics record without one
```

---

## Forcing a skill

If Boyka picks the wrong skill, tell it directly (use the skill name as plain text — examples below):

```
use the quick-estimator skill: 4 4mm LED boards 8x4ft each
```

```
with the sow-generator skill, draft a SOW for opportunity 12345
```

## Skill IDs (for API / advanced)

- **Boyka agent id:** `c73dcdc4-5b5b-442a-bad2-2b1e50bb1df2`
- **Designer-AI skill id:** `df5f5790-857d-4dc3-adda-239652d8adbb`
- List all skills: `query { agents { id name prompt } }` against the CRM GraphQL endpoint. See [Operators — API Access](/docs/operators/api-access).
