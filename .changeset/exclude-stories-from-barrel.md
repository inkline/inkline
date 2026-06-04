---
"@inkline/cli": patch
---

fix(cli): exclude story files from the generated barrel

`inkline compile` re-exported every compiled non-CSS file from each target's
`.inkline/index.ts`, including story render variants under `components/<name>/stories/`
(e.g. `colors`, `sizes`). Multiple components share those generic variant names, so the
barrel emitted duplicate exports and the build failed with `Duplicated export`.

Story variants are now skipped when collecting barrel entries (via a new `isStoryRelDir`
guard) in both the one-shot and watch compile paths. They are still compiled and written to
`.inkline/` — the generated Storybook `.stories.ts` import them by relative path — they are
just no longer re-exported from the package barrel.
