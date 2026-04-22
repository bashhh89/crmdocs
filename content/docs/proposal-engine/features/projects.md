---
title: Projects
description: Where won deals live during execution.
---

# Projects

When a deal closes Won, it becomes a Project (`/projects`). This is where the execution happens — submittal tracking, install scheduling, site visits, acceptance testing.

## What a Project page shows

- The Opportunity it came from (link back to the Pipeline record)
- The final scope (estimator line items, signed SOW)
- Submittal status — what's been compiled, what's been approved
- Install milestones and dates
- Site visit log
- Handoff date to the Service Dashboard (when LED panels go live and become a service venue)

## Creating and scheduling

- `/projects/new` — spin up a new Project manually (most are created automatically when an Opportunity closes Won)
- `/projects/[id]` — individual project detail with timeline and activity log

## Handoff to Service Dashboard

When a project reaches "Live" status, the venue, screen specs, and client record all flow into the [Service Dashboard](../../service-dashboard/introduction). The service team doesn't need to re-enter anything — they inherit everything Sales + Execution already captured.

## See also

- [Submittal Compiler](./submittal-compiler) — generates the spec package submittals depend on
- [Service Dashboard](../../service-dashboard/introduction) — the downstream tool for "now we operate it"
