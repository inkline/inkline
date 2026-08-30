# @inkline/packaging

Packaging guards: assertions about what the published tarballs actually contain, as opposed to what the build says it produced.

## Why this exists

`exports` is a promise the build is never asked to keep. Five packages declared `"./css": "./dist/index.css"` against a file no build step emitted; `pnpm run build` exited 0, the whole pipeline was green, and `import "@inkline/react/css"` — the one instruction the Installation page gives every framework — died with `ERR_MODULE_NOT_FOUND` on a clean install (UXF-212, inkline#598).

## What it asserts

`src/exports-are-packed.test.ts` — for every publishable package under `core/`, `tooling/` and `ui/`, every file its `exports` map can resolve to is present in the file list `pnpm pack --dry-run` reports.

The assertion is about the tarball, not `dist/`. A file can be emitted and still not ship: `files`, `.npmignore` and the default include rules all sit between the two, and the consumer only ever sees the far side.

`pnpm pack`, not `npm pack` — the latter cannot resolve the workspace `catalog:` protocol and fails with `EUNSUPPORTEDPROTOCOL`.

### Known-broken waivers

`KNOWN_BROKEN` maps a package name to the issue tracking its breakage, and those packages run under `it.fails`. Fixing the package makes the test pass, which vitest reports as a failure until the entry is deleted — so a waiver cannot outlive the bug it excuses. Deleting the entry is part of closing the issue it names.

## Running it

```bash
pnpm --filter @inkline/packaging run test:build
```

Needs a prior `pnpm run build`. That is why the script is `test:build` and not `test`: the repo-wide `vp run -r test` runs in a CI job that downloads build artifacts _excluding_ `ui/*/dist`, so a `test` script here would fail there for the wrong reason. It runs instead as a step in the **Build Packages** job, against the `dist/` that job just produced.

## Adding a guard here

Anything that can only be checked against a real package artifact — tarball contents, resolved `exports`, published manifest shape. Behavioural tests belong in the package that owns the behaviour.
