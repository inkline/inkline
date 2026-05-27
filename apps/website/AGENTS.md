# website

The documentation and marketing site for Inkline. Private (`"private": true` in [`package.json`](./package.json)) — never published to npm. Deployed as a static site (deploy target out of scope here).

## Layout

```
apps/website/
├── index.html        # Vite entry
├── public/           # Static assets served at root
├── src/
│   ├── main.ts       # App bootstrap
│   ├── style.css
│   └── …
├── tsconfig.json
└── dist/             # Build output (NODE_ENV=production)
```

Today the contents are a Vite vanilla starter (`counter.ts`, default `style.css`). Replacing this with the real docs site happens on a feature branch; when that lands, update this file with the actual framework + content layout.

## Running

```bash
vp run dev                  # or `pnpm run dev` from the repo root (root alias)
pnpm --filter website dev   # alternative direct invocation
```

`vp dev` starts Vite's dev server with HMR. Default port is whatever Vite picks (usually 5173).

## Build

```bash
pnpm build         # tsc && vp build
pnpm preview       # vp preview — serve the built dist locally
```

CI builds the website in [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) `build-website` job and uploads `dist/` as an artifact.

## Conventions

- Pure Vite + TS, no Inkline framework dependency. The website demonstrates Inkline; it is not itself built with it. If that changes, the corresponding `@inkline/<framework>` packages need to be added as deps and noted here.
- Public assets go in `public/`. Anything `import`-ed from `src/` is bundled.

## See also

- [docs/contributing.md](../../docs/contributing.md) → "Dev loops" — `vp run dev` is the root alias for this app.
- [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) `build-website` — the CI job.
