---
name: issue-triage
description: Intake, labeling, routing, and hygiene for the Inkline board — including the path→owner routing table, the legacy-issue reality, and the repro request protocol. Use for triage sweeps and board maintenance.
---

# Issue triage & board hygiene

The board is the team's shared memory. Stale boards kill agent teams faster than bad code — an agent assigned a dead issue burns a task slot on archaeology. Inkline's specific reality: `github.com/inkline/inkline` carries **legacy issues from the v0 era** (the old Vue-only Inkline, now archived in `.old/`) alongside the rebuild. Reconcile them: label `v0-legacy`, close-with-pointer or migrate the still-relevant ones, so the board reflects the rebuild — and keep the real roadmap mirrored as issues, not implied by branches.

## Intake protocol (per new issue)

1. **Dedupe** against open issues; link + close duplicates with a pointer.
2. **Classify**: `bug` / `feature` / `docs` / `docs-drift` / `perf` / `skills` / `question` — plus `target:<framework>` when it's specific to one of the seven outputs, and `upstream:styleframe` when the cause lives in the sibling repo.
3. **Area label** from the routing table below.
4. **Repro check** (bugs): no reproduction → post the repro request template, label `needs-repro`, don't route further. With repro → confirm it minimally, label `confirmed`.
5. **Priority**: `p0` (broken main/release/security/supply-chain) · `p1` (a framework target broken, the component pipeline blocked, or upstream breaking change — no workaround) · `p2` (default) · `p3` (nice-to-have).
6. **Route**: assign or leave for Maestro if cross-cutting/ambiguous. Ensure the issue has Goal / Acceptance criteria / Verify sections — add them if writable from the report, else ask.

## Routing table (path → owner)

```
core/core, core/compiler, core/config-loader, core/inkline → Atlas
ui/components/** (headless, styled, .styleframe.ts, tests)  → Palette
ui/components/**/stories/**, tooling/storybook, apps/storybook → Herald
ui/{react,vue,svelte,solid,angular,qwik,astro} shells,
  framework upgrades, styleframe boundary, upstream liaison  → Bridge
core/plugin, tooling/cli                                     → Forge
apps/website, docs/**, AGENTS.md drift, compiler README,
  tooling/agents-check                                       → Quill
testing/e2e, tooling/test-utils, repro requests, benchmarks  → Gauntlet
.changeset, .github, releases, CI health                     → Keeper
license/supply-chain/secrets, Studio & product surfaces      → Patron
starters & examples (repos to be created)                    → Herald
cross-cutting / disputes / skills curation                   → Maestro
```

## Repro request template

```
Thanks for the report! To act on this we need a minimal reproduction:
- for compiler bugs: the smallest .ink.tsx that shows it + your inkline.config.ts
  (or the CLI/plugin invocation) + which target(s) misbehave
- for component bugs: component + story id + framework(s) + what you did
- versions: inkline/@inkline/* packages, node, bundler (if plugin path)
- expected vs actual (emitted code snippet, diagnostic output, or screenshot)
A repo link or StackBlitz is ideal. Reproducible bugs get labeled `confirmed`
and fixed fast.
```

## Hygiene sweeps

- **Daily**: new issues triaged within the day; `needs-repro` older than 14 days get one nudge, closed-with-invite at 21.
- **Weekly**: (a) mirror active branch/roadmap work into issues (work with no issue → create one, label `tracking`); (b) dead-branch report — merged or >60-days-idle branches listed for Alex to prune; (c) stale `in-progress` issues (>7 days no comment) → ping the assignee, then Maestro; (d) `v0-legacy` burn-down until the label is empty.
- **Milestones**: keep one open milestone per active wave (see TEAM.md missions); issues without a milestone are backlog by definition.
