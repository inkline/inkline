---
"@inkline/compiler": minor
"@inkline/cli": minor
---

fix(cli): report an invalid or missing target as a diagnostic instead of a raw throw

`inkline compile --target reakt` used to fail with `Error: Unknown target: "reakt"` and a stack
trace through bundled compiler internals, which told the author nothing about their config. The same
class of failure had three separate raw throws — two in `resolveOptions`, one in `compile` for a
target the registry cannot serve.

All three now go through the diagnostic catalog as `INK0084` (no target specified), `INK0085`
(unknown target) and `INK0086` (target absent from the registry), thrown as a new
`InklineConfigError` that carries a fully formed `Diagnostic`. The registry check moved into
`resolveOptions`, so there is one validation point for every entry path.

```
$ inkline compile "src/**/*.ink.tsx" --target reakt
error  INK0085  Unknown target "reakt"
    help: Did you mean "react"? Available targets: react, solid, vue, svelte, angular, qwik, astro.
    docs: https://docs.inkline.dev/diagnostics/INK0085
```

The CLI exits `2` for unusable input (`1` remains "the compile ran and reported errors") and prints
the underlying stack only under `--verbose`. Targets are validated before `--clean` deletes output
directories, so a typo in one of several targets no longer wipes the others' output.

Also fixes a latent bug: placeholders in a diagnostic's `help` text were never interpolated, so
`INK0121` leaked a literal `{name}` to users. `help` is now interpolated alongside `title`, and
`DiagnosticParams<C>` extracts required params from both.

New public exports from `@inkline/compiler`: `resolveOptions`, `InklineConfigError`,
`isInklineConfigError`.
