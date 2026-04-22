---
title: AI Agents
description: AI features baked into the proposal workflow.
---

# AI Agents

The Proposal Engine is AI-assisted throughout, not just in one place. Here's where AI touches the work:

## In the Estimator

- **AI Quick** (`/api/estimator/ai-quick`) — type a natural-language requirement ("10-panel 4mm videowall with spare modules, full install and commissioning"), get back a first-pass line-item list
- **AI Reason** (`/api/estimator/ai-reason`) — on any line item, ask "why is this priced this way?" — the AI explains the math referencing the current rate card
- **AI Chat** (`/api/estimator/ai-chat`) — open-ended estimating conversations; the AI has the Opportunity context + rate card + prior estimates loaded

## In the SOW pipeline

- **SOW Scan** (`/api/sow/scan`) — drop any SOW (yours or a client's RFP), get a structured summary of in-scope / out-of-scope / acceptance criteria
- **Premium SOW generation** — AI drafts the full narrative scope from the estimator line items + venue context; you refine

## In the RFP workflow

- **RFP Analyzer** — extracts requirements, proposes responses, flags compliance gaps
- **Agent Enrich** (`/api/agent/enrich`) — takes a Company name, fills in what we know (past deals, venue history, industry context)
- **Intelligence Brief** (`/api/agent/intelligence-brief`) — generates a pre-meeting briefing for any client

## In the knowledge base

- **Rag sync** (`/api/rag/sync`) — keeps the AI's knowledge of past proposals, SOWs, and case studies current. Every new document becomes searchable context for the next estimate.

## See also

- [Estimator](./estimator) — main home of most AI features
- [RFP Analyzer](./rfp-analyzer) — RFP-specific AI pipeline
