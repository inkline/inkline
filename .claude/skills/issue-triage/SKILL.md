---
name: issue-triage
description: Intake, labeling, routing, and hygiene for the Styleframe board — including the path→owner routing table and repro request protocol. Use for triage sweeps and board maintenance.
---

# Issue triage & board hygiene

The board is the team's shared memory. Stale boards kill agent teams faster than bad code — an agent assigned a dead issue burns a task slot on archaeology. Current reality to fix: the GitHub tracker went stale (single-digit, months-old issues) while the real roadmap lived in 200+ branches. Mirror reality into the board and keep it there.

## Intake protocol (per new issue)

1. **Dedupe** against open issues; link + close duplicates with a pointer.
2. **Classify**: `bug` / `feature` / `docs` / `docs-drift` / `perf` / `skills` / `question`.
3. **Area label** from the routing table below.
4. **Repro check** (bugs): no reproduction → post the repro request template, label `needs-repro`, don't route further. With repro → confirm it minimally, label `confirmed`.
5. **Priority**: `p0` (broken release/security/license) · `p1` (blocks users or Inkline, no workaround) · `p2` (default) · `p3` (nice-to-have).
6. **Route**: assign or leave for Maestro if cross-cutting/ambiguous. Ensure the issue has Goal / Acceptance criteria / Verify sections — add them if writable from the report, else ask.

## Routing table (path → owner)

```
engine/**                         → Atlas
theme/**                          → Palette
tooling/plugin | cli | config/**  → Forge
tooling/figma | dtcg              → Bridge
apps/docs, AGENTS.md drift        → Quill
apps/storybook, starters, examples→ Herald
apps/playground                   → Forge
apps/app, apps/shared, pro repo   → Patron
testing/**, repro requests        → Gauntlet
.changeset, .github, releases     → Keeper
cross-cutting / disputes          → Maestro
```

## Repro request template

```
Thanks for the report! To act on this we need a minimal reproduction:
- styleframe.config.ts (smallest that shows it)
- the *.styleframe.ts / component file involved
- bundler + version, styleframe package versions, node version
- expected vs actual (screenshot or emitted CSS snippet welcome)
A repo link or stackblitz is ideal. We label reproducible bugs `confirmed` and they get fixed fast.
```

## Hygiene sweeps

- **Daily**: new issues triaged within the day; `needs-repro` older than 14 days get one nudge, closed-with-invite at 21.
- **Weekly**: (a) mirror active branch work into issues (branch with no issue → create one, label `tracking`); (b) dead-branch report — merged or >60-days-idle branches listed for Alex to prune; (c) stale `in-progress` issues (>7 days no comment) → ping the assignee, then Maestro.
- **Milestones**: keep one open milestone per active wave (see TEAM.md missions); issues without a milestone are backlog by definition.
