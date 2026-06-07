---
"@inkline/compiler": minor
"@inkline/cli": minor
---

feat(cli,compiler): configurable per-category barrels

`inkline.config.ts` gains an optional `barrels` field — a list of `BarrelGroup`
(`{ file, match, mode? }`) describing which generated re-export barrel each compiled file
belongs to. Files are routed to a barrel by matching a directory segment of their source path
(`components/<name>/<match>/…`), so a single source tree can be split into multiple per-category
entry points instead of one flat `index.ts`.

- `mode: "named"` (default) emits target-aware per-component exports, sourced from compiled components.
- `mode: "namespace"` emits `export * as <Name>Stories from …`, sourced from the generated
  `*.stories.ts` modules (whose named exports otherwise collide across components).

When `barrels` is omitted the CLI keeps its previous behaviour: a single `index.ts` re-exporting
every non-story component. `BarrelGroup` is exported from `@inkline/compiler`; the compiler pipeline
ignores the field (it is consumed by the CLI only).
