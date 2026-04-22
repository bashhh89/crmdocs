---
title: Submittal Compiler
description: Rolls specs, cut sheets, and drawings into the submittal package.
---

# Submittal Compiler

Lives at `/admin/submittal-compiler`. This tool assembles the submittal package an installer or general contractor actually reads before putting hands on hardware.

## What goes into a submittal

- Product spec sheets (LED module, processor, mounts, cabling)
- Vendor cut sheets
- CAD drawings (pixel map, rigging plan, elevation views)
- Compliance docs (UL, FCC, fire safety)
- Project-specific custom drawings

## What the compiler does

1. Loads products and drawings attached to a specific Project or Estimate
2. Deduplicates overlapping spec pages across products
3. Inserts a branded cover page, TOC, and section dividers
4. Exports a single PDF the installer can carry to site

## See also

- [Projects](./projects) — where submittals live once compiled
- [SOW Generation](./sow-generation) — the scope document that accompanies the submittal
