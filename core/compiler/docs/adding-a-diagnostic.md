# Adding a Diagnostic

Diagnostics are typed compiler messages with a stable code (`INKxxxx`), severity, location, and optional help text.

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
- **Placeholders**: use `{name}` syntax in the title. The type system extracts these via `DiagnosticParams<C>` and enforces callers supply them.
- **Help text**: one sentence explaining what to do. Set to `undefined` if not applicable.
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
- Every title's placeholder count matches `DiagnosticParams<C>`.
- The placeholder list is complete.

## Current diagnostic codes

| Code    | Severity | Phase    | Title                                                   |
| ------- | -------- | -------- | ------------------------------------------------------- |
| INK0001 | error    | parse    | Namespace import of @inkline/core                       |
| INK0010 | warning  | analyze  | Effect has no reactive dependencies                     |
| INK0011 | warning  | analyze  | Memo has no reactive dependencies                       |
| INK0020 | warning  | analyze  | Dynamic reactive read prevents static dep tracking      |
| INK0030 | error    | analyze  | createMemo cycle detected                               |
| INK0040 | error    | parse    | defineComponent must have a setup function              |
| INK0041 | error    | parse    | defineComponent options must be a static object literal |
| INK0050 | warning  | lower    | Missing key in iteration                                |
| INK0060 | error    | lower    | `<Show>` requires a 'when' prop                         |
| INK0061 | info     | lower    | Nullish-coalescing (??) in JSX is ambiguous             |
| INK0062 | error    | lower    | `<For>` requires an 'each' prop                         |
| INK0070 | error    | lower    | Component-ref forwarding not yet supported              |
| INK0080 | warning  | config   | Unknown target option                                   |
| INK0090 | error    | plugin   | Plugin threw                                            |
| INK0100 | error    | pipeline | Parse failure in component                              |
| INK0110 | error    | pipeline | Internal compiler error                                 |
