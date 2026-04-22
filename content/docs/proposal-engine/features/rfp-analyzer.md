---
title: RFP Analyzer
description: Drop a client RFP, get back a compliance matrix and draft response.
---

# RFP Analyzer

The RFP Analyzer (`/tools/rfp-analyzer`) turns a client-issued Request for Proposal into an actionable ANC response draft.

## What happens when you upload an RFP

1. Upload the RFP document (PDF, Word, or Excel)
2. AI extracts: scope items, mandatory requirements, evaluation criteria, submission deadlines
3. For each requirement, the tool proposes an ANC response based on prior winning proposals in the knowledge base
4. Output: a compliance matrix (requirement → ANC response → status) and a first-draft proposal structure

## History

Every analyzed RFP is saved at `/tools/rfp-analyzer/history/[id]`. You can revisit past analyses to compare: "what did client X ask for last year vs. this year?"

## Typical use case

A new client sends a 40-page RFP on a Friday. Sales uploads it Friday afternoon. By Monday, they have a pre-filled compliance matrix and draft proposal they can refine instead of starting from zero.

## See also

- [Estimator](./estimator) — once the response is drafted, pricing goes here
- [SOW Generation](./sow-generation) — for the detailed work description that accompanies the pricing
