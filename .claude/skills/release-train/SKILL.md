---
name: release-train
description: The Styleframe release process — changesets flow, the CI gate, publish approval, post-release verification, and rollback. Use for versioning, releasing, and release-adjacent CI work.
---

# The release train

Releases run on [changesets]. The train is scheduled (weekly) or on-demand (a fix users are waiting on). **Only Alex presses publish** — the train's job is to make that press boring.

## The flow

```
contributors add .changeset/*.md per change
        ▼
audit: every merged PR touching a published package has one
       (ignore list exempt: docs, plugin-playground, testing-integration, app, storybook
        — see .changeset/config.json)
        ▼
pnpm ci:version  → changeset version + pnpm install --no-frozen-lockfile  → Version PR
        ▼
green gate on the Version PR: pnpm build:nodocs && pnpm test && pnpm typecheck
                              && pnpm lint && pnpm test:integration
        + benchmark regression check from @gauntlet (>5% build time / >2% CSS size
          delta → hold and explain)
        ▼
Alex approves & merges → ci:publish (prepublish = build:nodocs, then changeset publish)
        ▼
post-release verification (below) → @herald drafts release notes/announcement
```

CI details: changesets workflow runs on **node 22**; publish builds `build:nodocs` (engine + tooling + theme — docs don't publish). GitHub changelog via `@changesets/changelog-github`.

## Rules

- **Never ship red.** Any gate failure holds the whole train; no partial publishes.
- Bump-level review: scan the Version PR's aggregated bumps — a "patch" that changes observable CSS output or types is mislabeled; push back before versioning.
- Breaking changes need: major bump + migration section in the changeset + Alex sign-off + Inkline heads-up (customer zero pins these packages).
- Never publish manually from a laptop/agent; the workflow publishes.
- License-sensitive packages (`@styleframe/license` lives in the pro repo) are NOT part of this train — Patron + Alex handle pro releases separately.

## Post-release verification (15 minutes that save a week)

1. `npm view styleframe version` (+ each bumped package) — registry has the new versions.
2. Smoke: fresh temp dir → `pnpx styleframe init` → `pnpm install` → build runs, CSS emits.
3. Docs deploy still green; changelog rendered correctly.
4. Comment the release summary on the release issue; hand @herald the notes draft.

## Rollback doctrine

npm unpublish is a last resort (24h window, breaks caches). Default: **fix forward** with an immediate patch release; if the bad version is dangerous, `npm deprecate` it with a message pointing to the fixed version. Keep a revert PR ready while diagnosing.
