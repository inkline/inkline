# Adding a Diagnostic

Diagnostics are typed compiler messages with a stable code (`INKxxxx`), severity, location, and help text.

## 1. Add the code to the catalog

In `src/core/diagnostics/codes.ts`, add an entry to the `DIAGNOSTICS` object:

```ts
export const DIAGNOSTICS = {
  // ...existing codes...

  INK0120: {
    severity: "warning" as const,
    title: "Unused slot '{name}' in component {component}" as const,
    help: "Remove the slot or add content to it" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0120" as const,
  },
} as const;
```

### Conventions

- **Code ranges**: 00xx = parse, 01xx = analyze, 05xx = lower, 06xx-08xx = options/config, 09xx = plugin, 10xx = pipeline.
- **Severity**: `"error"` (blocks compilation), `"warning"` (informational), `"info"` (hint).
- **Placeholders**: use `{name}` syntax in the title and/or the help text; both are interpolated. The type system extracts them from both via `DiagnosticParams<C>` and enforces callers supply them.
- **Help text**: required — the catalog test asserts a non-empty `help` on every code. Give the fix, not a restatement of the title: a corrected example the author can copy.
- **URL**: link to `https://docs.inkline.dev/diagnostics/INKxxxx`.

## 2. Push the diagnostic

Use the typed `DiagnosticCollector.push()` method. TypeScript enforces the correct parameters:

```ts
// No placeholders — no params needed:
ctx.diagnostics.push("INK0050", node.loc);

// With placeholders — params required:
ctx.diagnostics.push("INK0120", node.loc, { name: slotName, component: compName });

// Type error if placeholders are missing:
ctx.diagnostics.push("INK0120", node.loc); // ← compile error
```

## 3. Add tests

Every diagnostic code must be exercised by at least one test. Source-level codes (INK0001, INK0040, INK0050, etc.) are tested via fixtures or unit tests in the relevant pass. Runtime codes (INK0090, INK0100, INK0110) are tested in `plugin/runner.test.ts` and `pipeline/compile.test.ts`.

The catalog test in `src/core/diagnostics/codes.test.ts` verifies:

- Every code has a valid severity.
- Every code has a non-empty title, `help`, and docs URL — asserted over `Object.keys(DIAGNOSTICS)`, so a new code with no help fails the suite.
- Every title's placeholder count matches `DiagnosticParams<C>`.
- The placeholder list is complete.

`src/core/diagnostics/docs-tables.test.ts` covers the documentation side: it parses the diagnostics
tables in this file and in [`README.md`](../README.md) and compares every row against `DIAGNOSTICS`.
Adding a code without a row here, or changing a severity without updating both tables, fails the
suite naming the file, the line and the code. Add the row in the same commit as the catalog entry.

## Current diagnostic codes

This table is the complete mirror of `DIAGNOSTICS`, and `docs-tables.test.ts` holds it to that: a
new code with no row here fails the suite, as does a row whose `Severity` disagrees with the
catalog. `Phase` and `Title` are editorial — `Title` abbreviates the catalog title rather than
restating it, so neither column is asserted.

| Code    | Severity | Phase    | Title                                                     |
| ------- | -------- | -------- | --------------------------------------------------------- |
| INK0001 | error    | parse    | Namespace import of @inkline/core                         |
| INK0010 | warning  | analyze  | Effect has no reactive dependencies                       |
| INK0011 | warning  | analyze  | Memo has no reactive dependencies                         |
| INK0020 | warning  | analyze  | Dynamic reactive read prevents static dep tracking        |
| INK0030 | error    | analyze  | createMemo cycle detected                                 |
| INK0040 | error    | parse    | defineComponent must have a setup function                |
| INK0041 | error    | parse    | defineComponent options must be a static object literal   |
| INK0043 | error    | parse    | defineModel must be a [getter, setter] tuple, static name |
| INK0044 | warning  | parse    | Model collides with a declared prop of the same name      |
| INK0045 | info     | codegen  | Two-way binding and events are inert on the Astro target  |
| INK0050 | warning  | lower    | Missing key in iteration                                  |
| INK0060 | error    | lower    | `<Show>` requires a 'when' prop                           |
| INK0061 | info     | lower    | Nullish-coalescing (??) in JSX is ambiguous               |
| INK0062 | error    | lower    | `<For>` requires an 'each' prop                           |
| INK0063 | error    | lower    | `<Transition>` requires a single child element            |
| INK0064 | warning  | lower    | `<Transition>` child is not conditional                   |
| INK0065 | error    | lower    | `<Transition>` cannot wrap `<For>`                        |
| INK0066 | info     | codegen  | `<Transition>` on Angular needs manual animation setup    |
| INK0067 | warning  | lower    | `<Slot>` name must be a string literal                    |
| INK0068 | info     | codegen  | hasSlot() always returns true on Qwik and Angular         |
| INK0070 | error    | lower    | Component-ref forwarding not yet supported                |
| INK0071 | error    | parse    | JSX spread attributes are not supported                   |
| INK0072 | warning  | lower    | Unknown ARIA attribute                                    |
| INK0073 | error    | lower    | Cannot two-way bind `$bind:<name>` on an element          |
| INK0080 | warning  | config   | Unknown target option                                     |
| INK0081 | warning  | config   | Unknown config key                                        |
| INK0082 | warning  | config   | Unknown config key, with a suggested spelling             |
| INK0083 | error    | config   | Config value has the wrong type                           |
| INK0084 | error    | config   | No compilation target specified                           |
| INK0085 | error    | config   | Unknown target                                            |
| INK0086 | error    | config   | Target not present in the configured registry             |
| INK0087 | error    | config   | Invalid diagnostic report level                           |
| INK0090 | error    | plugin   | Plugin threw                                              |
| INK0094 | warning  | analyze  | Declared model does not match the setup body              |
| INK0100 | error    | pipeline | Parse failure in component                                |
| INK0110 | error    | pipeline | Internal compiler error                                   |
| INK0111 | warning  | codegen  | Headless component root must be a single static element   |
| INK0120 | warning  | analyze  | Attributes passed to a component cannot be inherited      |
| INK0121 | error    | analyze  | Setup-body local is referenced but cannot be emitted      |
