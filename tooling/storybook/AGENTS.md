# @inkline/storybook

Single-source story definitions + Storybook preset + per-framework story generator. **Private** (not published) — consumed only inside this monorepo by [`ui/components/`](../../ui/components/) and the seven framework UI packages.

For story authoring conventions and the dev workflow, see [docs/authoring-components.md](../../docs/authoring-components.md) → "Stories".

## Entry points

Declared in [`package.json`](./package.json) `exports`:

| Subpath                | Source                                                   | Purpose                                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.`                    | [`src/index.ts`](./src/index.ts)                         | `defineStories` identity helper + `StoryMeta`, `StoryVariant`, `ArgType` types. Used inside `.ink.tsx` story files for type inference.                                         |
| `./preset/main`        | [`src/preset/main.ts`](./src/preset/main.ts)             | Storybook `main.ts` preset — shared addons, story globs, framework-agnostic settings. Re-used by each `ui/<framework>/.storybook/`.                                            |
| `./preset/parameters`  | [`src/preset/parameters.ts`](./src/preset/parameters.ts) | Storybook `preview.ts` parameters (theming, controls, viewports).                                                                                                              |
| `./preset/preview.css` | [`src/preset/preview.css`](./src/preset/preview.css)     | Storybook `preview.ts` styles — copied as-is to `dist` and imported (side-effect) by each `ui/<framework>/.storybook/preview.ts`.                                              |
| `./generator`          | [`src/generator/index.ts`](./src/generator/index.ts)     | Compiler-adjacent: takes `defineStories` exports + the corresponding compiled component and emits per-framework CSF (`*.stories.ts`) into `ui/<framework>/generated/stories/`. |

The generator is invoked by [`inkline compile stories`](../cli/AGENTS.md) — keep both packages in sync when the story format changes.

## Story flow

```
ui/components/src/components/<name>/stories/<variant>.ink.tsx
  ↓ inkline compile stories  (CLI → @inkline/storybook/generator)
ui/<framework>/generated/stories/<name>/<variant>.stories.ts
  ↓ Storybook reads it via the framework-specific .storybook/main.ts
Storybook UI on port 6006..6012
```

Stories are authored once as `.ink.tsx` and rendered seven times.

## Source map

```
src/
├── index.ts                # defineStories + types (public entry)
├── define.ts               # The identity implementation
├── preset/
│   ├── main.ts             # Storybook main preset
│   ├── parameters.ts       # Storybook preview parameters
│   └── preview.css         # Storybook preview styles (copied to dist)
└── generator/
    ├── index.ts            # Entry: takes (storiesModule, compiled, target) → CSF file
    ├── config.ts           # Per-target generator config
    ├── render.ts           # Renders a CSF file from a story variant
    ├── story-keys.ts       # Story key normalization (variant → camelCase export)
    ├── templates/          # Per-target CSF templates
    └── __fixtures__/       # Generator fixtures (story modules → expected CSF)
```

## Build

`vp pack` (one-shot) / `vp pack --watch` (dev). Output goes to `dist/`, with one bundle per `exports` subpath. The generator's `templates/` are emitted as-is (no compilation) — keep them inside `dist/generator/templates/` after build.

## Tests

Co-located: [`define.test.ts`](./src/define.test.ts), [`generator/*.test.ts`](./src/generator/), [`preset/*.test.ts`](./src/preset/). Generator fixtures live in [`src/generator/__fixtures__/`](./src/generator/__fixtures__/) (excluded from lint per the global `vite.config.ts` only if a per-package ignore is added — confirm before adding fixtures that look like broken TS).

## See also

- [`tooling/cli/AGENTS.md`](../cli/AGENTS.md) → `compile stories` command — what invokes the generator.
- [docs/authoring-components.md](../../docs/authoring-components.md) → "Stories" — author-facing instructions.
- [`apps/storybook/AGENTS.md`](../../apps/storybook/AGENTS.md) — the unified aggregator that consumes the generated stories.
