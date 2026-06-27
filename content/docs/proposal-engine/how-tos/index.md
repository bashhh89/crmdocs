---
title: How-Tos
description: Recipe-style walkthroughs for common Proposal Engine tasks.
---

# How-Tos

Short, recipe-style guides for the things proposal teams do most often.

## Draft a proposal from scratch

1. Pipeline → **+ New Opportunity**
2. Fill in account, title, estimated value
3. Click into the Opportunity → **New Estimate**
4. Use **AI Quick** to seed line items, or chat: *"give me pricing for a 10-panel 4mm videowall with full install"*
5. Iterate pricing; save revisions as you go
6. Export PDF — it attaches to the Twenty Opportunity automatically
7. Send the PDF link to the client

## Respond to a client's RFP

1. Tools → **RFP Analyzer**
2. Upload the RFP file (PDF, Word, or Excel)
3. Review the extracted requirements and proposed responses
4. Refine the compliance matrix
5. Export — the response becomes the basis of your Opportunity proposal

## Generate an Installation SOW

1. Open the Opportunity detail
2. Make sure the estimate is final (or close to it)
3. Click **Generate Installation SOW**
4. AI drafts the doc using line items + venue context + uploaded drawings
5. Review, tweak, download PDF + Word versions
6. Both versions attach to the Opportunity in Twenty automatically

## Generate a Premium SOW

1. Open the Opportunity detail
2. Click **Generate Premium SOW**
3. Add the high-touch sections: creative scope, content production, training schedule, ongoing support SLA
4. AI drafts using the priced line items + the additional context
5. Download branded PDF
6. Auto-attaches to the Opportunity in Twenty

## Compare two estimate revisions

1. Open the Opportunity → Estimator
2. Click **Revisions** in the top-right
3. Pick Revision A and Revision B
4. The compare view shows added, removed, and changed line items

## Price a courtside table or stanchion

1. Open the Estimator on an Opportunity
2. Open the **Courtside Wizard**
3. Pick the pitch toggle (3.9mm or 2.9mm)
4. Pick the size card:
   - **Tables:** 10' / 8' / 6' / 5'
   - **Stanchions:** Single / Double
5. Dimensions auto-populate from the product database — no manual H/W entry
6. Add to the estimate

LED displays still use manual dimensions — only courtside tables and stanchions are fixed-dimension.

## Update a finalized estimate when the rate card changes

1. Open the Estimator on the Opportunity
2. Click **Refresh from Rate Card**
3. The estimator shows a per-line diff (old price → new price)
4. Accept the lines you want to update; reject the ones you don't
5. Save — creates a new revision; the prior revision is preserved

The estimator never silently overrides what you've already typed — you always see the diff first.

## Retire old estimate drafts

1. Estimator list view
2. Select the stale drafts with the checkboxes
3. **Bulk delete** — or mark cleanup status to archive without deleting

## Send a proposal for internal review

1. Open the Proposal Detail page
2. Click **Send for Review**
3. Pick a reviewer
4. They get a Slack notification + an email
5. Reviewer leaves comments inline; you address them
6. Once approved, mark the proposal as **Sent**

## Mark a proposal as sent

1. Open the Proposal Detail page
2. Click **Mark as Sent**
3. The proposal locks (no more edits)
4. Send-date is stamped
5. Universal CRM Push fires:
   - PDF attaches to the Opportunity in Twenty
   - Timeline activity logged
   - Slack notification posted

## Find the right SOW from six months ago

1. Open the Opportunity
2. Files tab — every generated SOW for this Opportunity is listed with timestamps
3. Or hit the SOW history endpoint at `/api/sow/history?opportunityId=...`

Every SOW ever generated is archived; nothing gets garbage-collected.

## Scan a client's existing SOW

1. Tools → **SOW Scan**
2. Drop the client's SOW (PDF, Word)
3. Get back a structured summary:
   - In-scope items
   - Out-of-scope items
   - Acceptance criteria they expect
   - Timeline they specify
4. Use the summary to inform your response

## Build the submittal package for an installer

1. Open the Project (won deal that's now in execution)
2. Click **Generate Submittal**
3. The Submittal Compiler pulls:
   - Spec sheets for each line item from the catalog
   - Cut sheets, drawings
   - Installation requirements from the SOW
4. Output: single PDF the installer can hand to the venue

## Change the AI mode for an estimate

1. Settings → **AI**
2. Pick the approved mode for the estimate
3. Save — the next estimate uses the selected mode

Admins manage provider credentials outside the user interface.

## Restore a deleted estimate

1. Estimator list view → filter to **Trashed**
2. Find the estimate
3. Click **Restore** — it goes back into the active list

Soft-delete is the default for bulk actions. Estimates are kept in trash for 14 days, then permanently removed.

## Troubleshooting

### The estimate export is missing line items
Most often: a line item without a unit price gets held back to avoid `$0` lines hitting the client. Fix the price, then re-export.

### The SOW generation timed out
Premium SOWs with 30+ line items can take 60-90 seconds. If it actually times out, retry once and then ask an admin to check the AI service health.

### The PDF didn't attach to the Opportunity
Most common cause: the Opportunity was deleted or archived between estimate save and export. Restore or recreate the Opportunity, then export again.

### "Rate card not found" on a new estimate
You're looking at a stale tab. Refresh — the rate card is loaded once per session.
