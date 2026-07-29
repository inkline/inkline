---
"@inkline/compiler": minor
---

Split `@inkline/compiler` into three entry points so the import path states the support tier.

The root exported 158 names, which buried the handful of real entry points in compiler internals. It now exports 35: compiling, configuring, diagnostics, plugin authoring, and target selection.

- `@inkline/compiler` — `compile`, `compileIncremental`, `defineConfig`, `resolveOptions`, the diagnostic types and helpers, `definePlugin`, `TargetName`/`ALL_TARGETS`/`builtinRegistry`.
- `@inkline/compiler/ir` — the render IR: node types, builders, visitors, `transform`, serialization, migration, `SymbolTable`, and the pass primitives.
- `@inkline/compiler/codegen` — **unstable**: Code IR, the `Target` contract, the printer, and the built-in targets. Unstable for as long as `TargetName` is a closed union, since an external target cannot typecheck or run today. Marked in `package.json` under `inkline.unstableExports`.

Nothing was removed — every name still ships, at the path that describes it. Two types that were previously unnameable are now exported: `SourceLocation` (the type of `Diagnostic.loc`) from the root, and `ReactivityGraph` (the value type of `AnalyzedModule.graphs`, which the `ir:post` plugin hook hands you) from `/ir`.
