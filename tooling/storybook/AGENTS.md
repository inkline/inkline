# @inkline/storybook

Single-source story definitions + Storybook preset + per-framework story generator. **Private** (not published) — consumed only inside this monorepo by [`ui/components/`](../../ui/components/) and the seven framework UI packages.

For story authoring conventions and the dev workflow, see [docs/authoring-components.md](../../docs/authoring-components.md) → "Stories".

## Entry points

Declared in [`package.json`](./package.json) `exports`:

| Subpath                | Source                                                   | Purpose                                                                                                                                                                     |
| ---------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.`                    | [`src/index.ts`](./src/index.ts)                         | `defineStories` identity helper + `StoryMeta`, `StoryVariant`, `ArgType` types. Used inside `.ink.stories.ts` definition files for type inference.                          |
| `./preset/main`        | [`src/preset/main.ts`](./src/preset/main.ts)             | Storybook `main.ts` preset — shared addons, story globs, framework-agnostic settings. Re-used by each `ui/<framework>/.storybook/`.                                         |
| `./preset/parameters`  | [`src/preset/parameters.ts`](./src/preset/parameters.ts) | Storybook `preview.ts` parameters (`sharedParameters`: layout, control matchers) + the `setFramework` data-attribute helper.                                                |
| `./preset/preview.css` | [`src/preset/preview.css`](./src/preset/preview.css)     | Storybook `preview.ts` styles — copied as-is to `dist` and imported (side-effect) by each `ui/<framework>/.storybook/preview.ts`.                                           |
| `./generator`          | [`src/generator/index.ts`](./src/generator/index.ts)     | Compiler-adjacent: takes `defineStories` exports + the corresponding compiled render wrappers and emits per-framework CSF (`*.stories.ts`) into `ui/<framework>/.inkline/`. |

The generator is invoked by [`inkline compile`](../cli/AGENTS.md) — story generation runs as part of every compile. Keep both packages in sync when the story format changes.

## Story flow

```
ui/components/src/components/<name>/stories/I<Name>.ink.stories.ts    # defineStories meta
ui/components/src/components/<name>/stories/<Name><Variant>.ink.tsx   # render wrappers
  ↓ inkline compile  (CLI → @inkline/storybook/generator)
ui/<framework>/.inkline/components/<name>/stories/I<Name>.stories.ts
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
    ├── index.ts            # Entry: discovers *.ink.stories.{ts,tsx} defs → one CSF file per framework
    ├── config.ts           # Per-target generator config
    ├── render.ts           # Renders a CSF file from a story variant
    ├── story-keys.ts       # Cross-target story-id stability (extract + assert identical story keys)
    ├── templates/          # Per-target CSF templates
    └── __fixtures__/       # Generator fixtures (story modules → expected CSF)
```

## Build

`vp pack` (one-shot) / `vp pack --watch` (dev). Output goes to `dist/`, with one bundle per `exports` subpath. The generator's `templates/` are ordinary TS modules bundled into `dist/generator/index.mjs`; the only file copied as-is is `preset/preview.css` (see the `copy` entry in [`vite.config.ts`](./vite.config.ts)).

## Tests

Co-located: [`define.test.ts`](./src/define.test.ts), [`generator/*.test.ts`](./src/generator/), [`preset/*.test.ts`](./src/preset/). Generator fixtures live in [`src/generator/__fixtures__/`](./src/generator/__fixtures__/), excluded from lint and coverage via this package's [`vite.config.ts`](./vite.config.ts) `ignorePatterns`.

## See also

- [`tooling/cli/AGENTS.md`](../cli/AGENTS.md) → `compile` command — what invokes the generator.
- [docs/authoring-components.md](../../docs/authoring-components.md) → "Stories" — author-facing instructions.
- [`apps/storybook/AGENTS.md`](../../apps/storybook/AGENTS.md) — the unified aggregator that consumes the generated stories.
