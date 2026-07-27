---
"@inkline/compiler": minor
"@inkline/cli": minor
---

Warn on unrecognised `inkline.config.*` keys instead of silently ignoring them.

`defineConfig` is an identity function and nothing validated the loaded config at runtime, so a
misspelled key such as `sourceMaps` (plural) or `plugns` was a no-op with exit code 0. The CLI now
checks the loaded config against the `InklineConfig` key set and reports unknown keys through the
diagnostic catalog:

- `INK0081` — unknown config key.
- `INK0082` — unknown config key that is within a small edit distance of a real one, including the
  suggested spelling (`sourceMaps` → `sourceMap`).

Both are warnings; unknown keys still do not fail the build and the exit code is unchanged. The key
list is derived from a record typed by `keyof InklineConfig`, so it cannot drift from the type.

New exports from `@inkline/compiler`: `validateConfigKeys` and `INKLINE_CONFIG_KEYS`.
