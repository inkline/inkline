---
"@inkline/compiler": minor
"@inkline/cli": minor
---

Validate `inkline.config.*` at load time instead of silently ignoring what it does not understand.

`defineConfig` is an identity function and nothing checked the loaded config at runtime, so a
misspelled key such as `sourceMaps` (plural) or `plugns`, and a value of the wrong type, were both
silent no-ops with exit code 0. `@inkline/cli` now parses the loaded config against a zod schema and
reports the failures through the diagnostic catalog:

- `INK0081` — unknown config key.
- `INK0082` — unknown config key within a small edit distance of a real one, including the suggested
  spelling (`sourceMaps` → `sourceMap`).
- `INK0083` — value of the wrong type, naming the path and what was expected.

All three are warnings. The config is used exactly as loaded — nothing is coerced or dropped — and
the exit code is unchanged.

The schema lives in `@inkline/cli`, the only place a config file is read, so `@inkline/compiler`
keeps its hand-written `InklineConfig` type and its zero runtime dependencies. A compile-time
assertion ties the schema's key set to `keyof InklineConfig`, so the two cannot drift.

New exports from `@inkline/compiler`: `createDiagnosticCollector` (with its `DiagnosticCollector`
type) and `ALL_TARGETS`.
