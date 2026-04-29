---
title: AI inside the Proposal Engine
description: The AI stack that powers Copilot, the RFP Analyzer, and the estimator's quick-answer experience.
---

# AI inside the Proposal Engine

The Proposal Engine uses several AI models, each picked for the job. Some are user-facing (Copilot chat, RFP Analyzer); others are deterministic services that wrap an LLM (intent parsing, OCR).

## The model lineup

| Model | Where it's used | Why this one |
|---|---|---|
| **Gemini 2.5 Flash** | RFP Analyzer vision + OCR, Copilot quick actions, intent parsing, vision analysis | Fast, deterministic, strong vision |
| **GPT-5.4-mini** | RFP Analyzer reasoning passes (extraction confidence, ambiguity resolution) | Reasoning tokens, structured output |
| **Kimi K2.5** | Copilot chat (knowledge questions, deep reasoning) via AnythingLLM | 200k context, free on Ollama Cloud |
| **AnythingLLM** | RAG over the knowledge base feeding Copilot | Local, configurable retrieval |
| **Mistral OCR** | Image classification fallback for RFP drawings | Last-resort when Gemini misclassifies |

## The Copilot

The slide-out **Copilot panel** on every proposal page is the most visible AI surface. It does two distinct things, and routes between them based on intent:

### LOCAL routing (fast UI actions)

For requests like *"set the bond to 3%"*, *"change margin to 45%"*, *"swap to Yaham 3.9mm"* — the Copilot:

1. Parses intent locally using Gemini 2.5 Flash + regex patterns
2. Maps the intent to a form action (`setValue('bondRate', 0.03)`)
3. Executes the change in the active proposal form

This path is sub-second and doesn't leave the proposal — the form just updates.

### ANYTHINGLLM routing (knowledge questions)

For requests like *"what's the difference between Yaham Halo and Aura?"*, *"what should I use for an outdoor scoreboard?"* — the Copilot routes to AnythingLLM, which RAGs over the LED Product Knowledge Base and answers with citations.

### Where it lives

- UI: `app/components/chat/CopilotPanel.tsx`
- Router: `services/chat/copilotRouter.ts`
- Intent parser: `services/chat/intentParser.ts`
- Action executor: `services/chat/actionExecutor.ts`
- Routes: `POST /api/copilot/chat`, `POST /api/copilot/stream`, `POST /api/copilot/prompt`

## In the Estimator

- **AI Quick** (`/api/estimator/ai-quick`) — type a natural-language requirement, get back a first-pass line-item list
- **AI Reason** (`/api/estimator/ai-reason`) — on any line item, ask "why is this priced this way?" — the AI explains the math referencing the current rate card
- **AI Chat** (`/api/estimator/ai-chat`) — open-ended estimating conversations; the AI has the Opportunity context + rate card + prior estimates loaded

## RFP Analyzer AI pipeline

The RFP Analyzer is **frozen** at production-approved behavior (2026-04-02). The AI pipeline behind it has multiple passes:

1. **Classify** the input PDF — bid form, drawing, schedule, narrative
2. **Route to extractor**:
   - Vision (Gemini 2.5 Flash) for visual layouts
   - Text heuristics for structured docs
   - Mistral OCR fallback for ambiguous images
3. **Extract** specs, pricing, display schedules, drawing identifiers
4. **Cross-check** with a reasoning pass (GPT-5.4-mini) to flag low-confidence extractions

The whole pipeline lives in `services/rfp/unified/analyzeRfp.ts`. No edits without explicit approval and a regression test — see the project root CLAUDE.md.

## Intelligence Mode (built, currently hidden)

Intelligence Mode is a deterministic margin/pricing engine — it's not technically AI, but it's the brain behind the audit-grade pricing flow:

- Engine: `services/pricing/intelligenceMathEngine.ts`
- Margin formula: `sellingPrice = cost / (1 - marginPercent)`
- Four presets: Aggressive (50%), Standard (45%), Premium (40%), Strategic (custom)

The engine is fully built and shipped. The UI is gated behind `FEATURES.INTELLIGENCE_MODE = false` in `lib/featureFlags.ts` — pending billing decision before exposing to operators.

## Quick estimates from the CRM

Twenty CRM's **Scout** agent has a `quick-estimator` skill. When an operator asks Scout *"give me a back-of-napkin price for a 100-foot ribbon at 6mm"*, Scout:

1. Builds an `Estimate` + `EstimateLines` directly in the CRM
2. Calls `/api/twenty-bridge/export-excel?estimateId=<uuid>` on the Proposal Engine
3. Returns the rendered scoping workbook to the Scout chat

This gives sales a 30-second "ballpark" path that bypasses opening the full Estimator. The detailed proposal still goes through the Proposal Engine's full flow when ready.

## Currency FX (live since 2026-04-17)

Multi-currency support is live behind `FEATURES.CURRENCY_EXCHANGE_RATE = true`. The Proposal Engine threads currency through six surfaces: wizard, PDF, cost sheet, Excel, margin analysis, rate card. USD/CAD/EUR/GBP all work end-to-end.

## What's hidden behind feature flags

These features are **built and tested** but not yet exposed to operators (file: `lib/featureFlags.ts`):

| Feature flag | What it gates |
|---|---|
| `INTELLIGENCE_MODE` | Margin presets UI, audit table, P&L breakdown |
| `DASHBOARD_CHAT` | "Ask Intelligence Core" search bar on the dashboard |
| `STRATEGIC_MATCH_BADGE` | The "17/20 Strategic Match" audit badge on proposals |
| `CLIENT_REQUESTS` | Client-side share link portal for change requests |
| `VERIFICATION_STUDIO` | Excel vs PDF dual-view comparison tool |

Each one can be flipped on per-deploy via env. The decision to expose is product/billing-side, not engineering.

## See also

- [Estimator](./estimator) — main home of most AI features
- [RFP Analyzer](./rfp-analyzer) — RFP-specific AI pipeline
- [Universal CRM Push](./universal-crm-push) — every artifact lands in Twenty
