# Release process

Inkline uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing. This document is the end-to-end flow.

## What gets published

All packages in `core/*`, `tooling/*`, and `ui/*` are published to npm under the `@inkline/` org (and the unscoped `inkline` barrel), except:

- Packages with `"private": true` in `package.json` (e.g. `apps/*`, `@inkline/storybook`, `@inkline/components`).
- Packages explicitly listed in [`.changeset/config.json`](../.changeset/config.json) `ignore` — today: `website`, `@inkline/components`.

Access is `public` (also configured in [`.changeset/config.json`](../.changeset/config.json)).

The framework output packages (`@inkline/react`, `@inkline/vue`, …) hold generated code; releasing them releases the latest compilation of `@inkline/components`. There is no separate "publish the source" step.

## Adding a changeset

Whenever you make a change that affects a publishable package's behavior, public API, or types:

```bash
pnpm changeset
```

You will be prompted to:

1. Select affected packages.
2. Pick a bump level per package — `patch` for fixes, `minor` for additive features, `major` for breaking changes.
3. Write a short summary that will land in the changelog.

The CLI writes a markdown file under [`.changeset/`](../.changeset/). Commit it alongside your code change. The summary is what will appear in CHANGELOG.md, so write it for end users — not for the diff.

Internal-only refactors that do not change behavior, public API, or generated output do not need a changeset.

## Release flow

The release runs in two phases via [`.github/workflows/changesets.yml`](../.github/workflows/changesets.yml):

### Phase A — collect changesets

On every push to `main`, the workflow invokes [`changesets/action`](https://github.com/changesets/action). The action either:

- Opens (or updates) a PR titled `chore: update versions` that:
  - Applies all pending `.changeset/*.md` files to `package.json` versions.
  - Updates internal `@inkline/*` deps according to `updateInternalDependencies: "patch"`.
  - Updates each package's `CHANGELOG.md`.
  - Deletes the consumed changeset files.

This PR accumulates until a maintainer is ready to release.

### Phase B — publish

Merging the `chore: update versions` PR triggers the workflow again, which now sees no pending changesets but the bumped versions. The publish step is **currently commented out** in [`changesets.yml`](../.github/workflows/changesets.yml#L60):

```yaml
# publish: pnpm exec changeset publish
```

Until that is enabled, `npm publish` is a manual step a maintainer takes after merging the version PR:

```bash
pnpm run ci:prepublish   # builds all packages
pnpm exec changeset publish  # publishes everything with bumped versions
```

`NPM_TOKEN` is already wired into the workflow env if/when publish is re-enabled.

## Versioning policy

Conventional commits suggest a bump level but **do not** automatically pick one — you do, in the changeset. Use:

- **`patch`** — bug fixes, internal refactors with no observable change, documentation that doesn't ship to npm.
- **`minor`** — new public APIs, new compilation targets that don't change existing output, new options with safe defaults.
- **`major`** — breaking changes: removed exports, changed function signatures, IR shape changes that affect serialized caches, output changes that break downstream consumers.

Internal package dep bumps are automatic at `patch` level via `updateInternalDependencies: "patch"` in [`.changeset/config.json`](../.changeset/config.json).

## Pre-releases

Not currently configured. If we add a `next` / `canary` channel, it goes here.

## Manual publish (escape hatch)

For one-off releases (e.g. CI down):

```bash
git checkout main && git pull
pnpm install --frozen-lockfile
pnpm run ci:prepublish
pnpm exec changeset version
pnpm exec changeset publish
git push --follow-tags
```

Coordinate via the team before doing this — the changesets/action PR is the preferred path.

## See also

- [contributing.md](./contributing.md) — when to add a changeset as part of a PR.
- [`.changeset/config.json`](../.changeset/config.json) — canonical config (ignore list, dep update policy).
- [`.github/workflows/changesets.yml`](../.github/workflows/changesets.yml) — the workflow itself.
