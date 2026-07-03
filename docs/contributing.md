# Contributing

How to develop, validate, and submit changes to Inkline.

## Prerequisites

- Node ≥ 22.12.0 (enforced via [`package.json`](../package.json) `engines.node`)
- pnpm 11.x (`packageManager` in [`package.json`](../package.json))
- A POSIX-ish shell

## Setup

```bash
git clone <repo>
cd inkline
vp install
```

`vp install` is the Vite+ wrapper around `pnpm install --frozen-lockfile`. Use it instead of `pnpm install` directly so Vite+ can configure git hooks (`vp config` runs on `prepare`).

If anything looks wrong with the toolchain (Node version, lockfile, package manager), run `vp env doctor` and include the output when asking for help.

## Dev loops

| Goal                                          | Command                                                                                      | Notes                                                                                                                                           |
| --------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Run the docs website                          | `vp run dev` (alias for `vp run website#dev`)                                                | Live-reloading website at the default Vite port.                                                                                                |
| Develop components against all 7 frameworks   | `pnpm run storybook`                                                                         | Runs four concurrent processes: compile, story-generate, framework Storybooks (ports 6006–6012), aggregator app (port 6100).                    |
| Visually compare all 7 frameworks             | `pnpm run test:e2e`                                                                          | Playwright cross-framework visual-parity suite (boots/reuses the composition Storybook). See [testing/e2e/AGENTS.md](../testing/e2e/AGENTS.md). |
| Develop components against a single framework | `pnpm run storybook:react` (also `:vue`, `:svelte`, `:solid`, `:angular`, `:qwik`, `:astro`) | Story generator + single Storybook.                                                                                                             |
| Work inside one package                       | `cd <pkg> && vp dev` (if applicable)                                                         | Most packages expose `vp build` / `vp test` / `vp check`.                                                                                       |

The full command surface for the root is in [`package.json`](../package.json) `scripts`. Vite+ specifics live at [viteplus.dev/guide/](https://viteplus.dev/guide/).

## Before opening a PR

Run the standard gate from the repo root:

```bash
vp run ready
```

This runs `pnpm run build && pnpm run check && pnpm run test` — the same shape as CI. `vp check` covers lint (OXLint) + format (Oxfmt) + typecheck (`tsc`).

If you only need part of the gate while iterating, use `vp check`, `vp lint`, `vp fmt --check`, or `vp test` independently. CI runs the same commands with stricter flags — see below.

## Continuous integration

Two workflows live under [`.github/workflows/`](../.github/workflows/):

- [`ci.yml`](../.github/workflows/ci.yml) — runs on every push to `main` and every PR. Granular parallel jobs: `build`, `build-storybook`, `build-website`, `lint`, `typecheck`, `test`, and a non-blocking `visual-parity` (Playwright cross-framework screenshot diffing, sharded ×2 — deliberately not part of `ci-success`). Each downstream job depends only on `build` and reuses its artifacts. A final `ci-success` job aggregates the status. PR runs are cancelled when a new push arrives on the same ref; main runs are not.
- [`changesets.yml`](../.github/workflows/changesets.yml) — runs on push to `main`. Uses `changesets/action` to maintain a "chore: update versions" PR. See [release-process.md](./release-process.md).

CI uses Node 22. If you see local-only test passes / CI failures, first compare your local Node version against the workflow's `NODE_VERSION`.

## Changesets

Any change to a published package's behavior, public API, types, or generated output **must** include a changeset:

```bash
pnpm changeset
```

Pick the affected packages, bump level (`patch` / `minor` / `major`), and write a one-sentence change description. The CLI writes a markdown file under [`.changeset/`](../.changeset/). Commit it with your code change.

Packages excluded from publishing are listed in [`.changeset/config.json`](../.changeset/config.json) `ignore`: today, `website` and `@inkline/components`. Internal-only packages (e.g. `apps/storybook`, `@inkline/storybook`) are also marked `private` in their `package.json`.

Full release flow: [release-process.md](./release-process.md).

## Pull requests

Opening a PR fills in the [pull request template](../.github/pull_request_template.md); [`CODEOWNERS`](../.github/CODEOWNERS) auto-requests review. Keep PRs scoped, include a changeset when applicable, ensure `vp run ready` passes locally, and write a commit message following [conventions.md](./conventions.md) → "Commit messages".

If your change touches public API, build flow, repo conventions, or directory structure, **also update the relevant `AGENTS.md` and/or `docs/*.md`**. See [maintenance.md](./maintenance.md) for what counts as a "doc-touching" change.

## Bug reports and issues

Open an issue from the [issue chooser](https://github.com/inkline/inkline/issues/new/choose) — the **Bug report** and **Feature request** forms prompt for everything we need:

- A minimal reproduction (a `.ink.tsx` snippet for compiler bugs).
- Inkline version (`pnpm list inkline @inkline/compiler`).
- `vp env doctor` output if the issue looks tooling-related.
- Expected vs actual behavior.

For "how do I…" questions and open-ended ideas, use [GitHub Discussions](https://github.com/inkline/inkline/discussions) instead.

## See also

- [conventions.md](./conventions.md) — code, file, commit conventions.
- [release-process.md](./release-process.md) — versioning and publishing.
- [maintenance.md](./maintenance.md) — keeping docs current.
