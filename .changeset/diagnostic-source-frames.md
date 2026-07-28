---
"@inkline/compiler": minor
"@inkline/cli": minor
---

feat(cli): render a source frame and relative paths in diagnostics

A diagnostic used to be a single line naming an absolute path, which put a ~140-character prefix on
every line of output and never showed the code it was complaining about. `SourceLocation` already
carried `offset` and `length` alongside line/column — enough to slice the source and underline the
exact span — and nothing used them.

`formatDiagnostic` now prints a `rustc`-style code frame under the header and makes the path
relative to the invocation directory:

```
$ inkline check src/Menu.ink.tsx
src/Menu.ink.tsx:8:7  error  INK0060  <Show> requires a 'when' prop
  8 |       <Show>
    |       ^^^^^^
    help: Pass the condition as a prop: <Show when={visible()}>…</Show>. …
    docs: https://docs.inkline.dev/diagnostics/INK0060
```

The formatter stays pure — the source text is a second argument, never an `fs` read — so the `check`
and `compile` commands pass the text they already hold, and callers with no source (config-time
failures) get the previous one-line output unchanged. The line number is derived from `offset` so
the gutter can never disagree with the slice it labels; a span crossing a line boundary is clamped
to the end of its first line; tabs are preserved in the caret padding so alignment survives any tab
width. A path is kept absolute when climbing out of the tree with `../..` would be the longer read.

Separately, the 7 catalog codes that shipped with `help: undefined` — `INK0060`, `INK0061`,
`INK0062`, `INK0065`, `INK0066`, `INK0080`, `INK0090` — now carry help text containing a corrected
example rather than a restatement of the title. A catalog test asserts non-empty `help` over
`Object.keys(DIAGNOSTICS)` so the gap cannot reopen as codes are added. `INK0090` was building its
diagnostic by hand and bypassing the catalog's `help` and interpolation; it now goes through
`createDiagnostic` like every other code.
