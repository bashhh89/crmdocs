---
title: RFP Analyzer
description: Upload bid documents and extract screens, requirements, pricing, and workbook outputs.
---

# RFP Analyzer

RFP Analyzer turns client bid documents into structured ANC working outputs. It extracts display requirements, key dates, compliance items, pricing data, and workbook-ready screen details.

Open it at [proposals.anc.com/tools/rfp-analyzer](https://proposals.anc.com/tools/rfp-analyzer).

## When to use it

- A client sends an RFP, bid package, drawing set, or technical spec file.
- You need to identify LED screens, requirements, deadlines, or alternates.
- You need an extraction workbook or scoping workbook from source documents.
- You need to fill an AJP-style bid form from a priced/spec workbook.

## What happens when you upload an RFP

1. Upload the source file or file pair.
2. The analyzer reads the document and separates useful proposal content from noise.
3. It extracts screens, requirements, pricing tables, deadlines, and technical notes where available.
4. You review the result and download the needed workbook or form output.

## Supported workflows

- **RFP analysis:** upload a bid package and extract requirements.
- **Excel analysis:** upload priced Excel or LED/spec workbooks and extract screen details.
- **AJP bid-form fill:** upload the AJP bid form with the priced/spec workbook so the matching form can be filled.
- **Scoping workbook:** generate the internal workbook used for estimating and review.
- **History:** reopen prior analyses from RFP Analyzer history.

## AJP bid-form note

For AJP bid forms, the current recommended path is [Spec Sheets](./spec-sheets) → **AJP Bid Form**. The RFP Analyzer still holds the analysis history and advanced workflow, but Spec Sheets is the cleaner front door for bid-form filling.

## Common checks before sending output

- Confirm every screen in the workbook has a matching bid-form block.
- Confirm formulas are preserved in downloaded Excel files.
- Confirm any sponsorship section exists in the template before expecting sponsorship fields to fill.
- Confirm data differences, such as pixel length, against the priced Excel source.

## See also

- [Spec Sheets](./spec-sheets)
- [Estimator](./estimator)
- [SOW Generation](./sow-generation)
