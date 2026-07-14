---
name: release-train
description: The Inkline release process — changesets flow, the CI gate, the not-yet-enabled publish step, post-release verification, and rollback. Use for versioning, releasing, and release-adjacent CI work.
---

# The release train

Releases run on [changesets]. **Reality first: every package is at `0.0.0` and nothing has been published to npm yet** — the publish step in `changesets.yml` is deliberately commented out. Until the first release, the train's job is keeping the version machinery honest so that flipping the switch is boring. **Only Alex presses publish.**

## The flow

```
contributors add .changeset/*.md per change
        ▼
audit: every merged PR touching a published package has one
       (ignore list: website, @inkline/components — see .changeset/config.json;
        component changes carry changesets for each affected @inkline/<framework>)
        ▼
changesets.yml (push to main) → changesets/action maintains the
"chore: update versions" PR (applies bumps, updates internal deps at patch,
writes CHANGELOGs, deletes consumed changesets)
        ▼
green gate on the Version PR: the ci.yml jobs — build → lint / typecheck /
test (2 shards, coverage → Codecov) / build-storybook / build-website →
ci-success. visual-parity runs non-blocking — read its artifacts anyway.
        + benchmark regression check from @gauntlet (>5% compile time /
          >2% output size delta → hold and explain)
        ▼
Alex approves & merges → publish:
  today (manual):  pnpm run ci:prepublish && pnpm exec changeset publish
  future (workflow): re-enable the commented publish step; NPM_TOKEN is already wired
        ▼
post-release verification (below) → @herald drafts release notes/announcement
```

CI details: workflows run **Node 22**; PR runs cancel on new pushes, main runs don't; the CI test shards zero the coverage thresholds (Codecov merges shards) — the ~100% thresholds bind on full local runs.

## Rules

- **Never ship red.** Any gate failure holds the whole train; no partial publishes.
- Bump-level review: scan the Version PR's aggregated bumps — a "patch" that changes emitted component output, generated CSS, or types is mislabeled; push back before versioning. Framework packages ship generated code: releasing them releases the latest compilation of `@inkline/components`, so "the component changed" = bumps across all affected framework packages, consistently.
- Breaking changes need: major bump + migration section in the changeset + Alex sign-off. Breaking = removed exports/subpaths (the `inkline` barrel map!), IR schema changes affecting serialized caches, component prop/axis renames, plugin option changes.
- Never publish manually from a laptop/agent on your own authority; the escape-hatch manual flow in `docs/release-process.md` is Alex-coordinated only.
- First-release extras (the launch checklist): npm org access + 2FA, provenance settings, `publishConfig.access: public` sanity across packages, the unscoped `inkline` name, README/homepage fields — stage these before enabling the workflow publish.

## Post-release verification (15 minutes that save a week)

1. `npm view @inkline/react version` (+ each bumped package + `inkline`) — registry has the new versions.
2. Smoke: fresh temp Vite app → `pnpm add @inkline/<framework>` → import a styled component + `@inkline/<framework>/css` → renders. (Once `inkline init` matures: `pnpx inkline init` smoke too.)
3. Changelogs rendered correctly; tags pushed.
4. Comment the release summary on the release issue; hand @herald the notes draft; ping @herald to bump starters when they exist.

## Rollback doctrine

npm unpublish is a last resort (24h window, breaks caches). Default: **fix forward** with an immediate patch release; if the bad version is dangerous, `npm deprecate` it with a message pointing to the fixed version. Keep a revert PR ready while diagnosing.
