---
"@inkline/cli": patch
---

`inkline check` now accepts the same inputs and honours the same config as `inkline compile`.

`check` takes a glob pattern instead of a single file, and a pattern that matches nothing prints
`no files matched the given patterns` and exits `2` instead of throwing a raw `ENOENT` stack trace.

Both commands now build their compiler options through one shared mapping, closing four ways `check`
could pass while `compile` failed: `tsconfig` (ambient `.d.ts` type files were never loaded, so
`check` ran against a weaker TypeScript program), `targetOptions` (unknown target option keys went
unreported and codegen ran with defaults), `verbose`, and `outDir`/`srcDir`/`targetOutDir` as seen by
plugins. `sourceMap` remains the one intentional difference — `check` writes no output.

`check` no longer silently falls back to `react,solid,vue,svelte` when no targets are configured; it
reports INK0084 and exits `2`, matching `compile`.
