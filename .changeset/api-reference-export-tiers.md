---
"@inkline/compiler": patch
---

docs(compiler): state the export tier of every symbol in the API reference

`docs/api-reference.md` presented IR types, the Code IR and the `Target` contract as first-class
supported API. Since the three-entry-point split, the import path _is_ the support tier, and the page
did not say so anywhere.

Every section now opens with the path its symbols import from, and sections are grouped so the tier
never changes mid-section: `@inkline/compiler` (§1–5), `@inkline/compiler/ir` (§6–11),
`@inkline/compiler/codegen` (§12–15). The Target API section carries the instability warning and why
it applies — `TargetName` is a closed union, so an external target cannot typecheck or run today —
and Code IR, the printer and the built-in targets cross-reference it.

The `ir:post` section now shows a worked plugin that types `analyzed.graphs` with `ReactivityGraph`,
the type exported from `/ir` for exactly that purpose, along with two things that surprise plugin
authors: `SymbolId` is fully qualified, and `DiagnosticCode` is a closed union so a plugin must reuse
a catalog code.

Accuracy fixes found while checking every documented symbol against the shipped entry points:

- `IR_VERSION` was documented as `1`; it is `3`.
- Undocumented additions: `seedIncrementalState`/`IncrementalSeed`, `AnalyzedModule`, `BarrelGroup`,
  `angularSelector`, `ALL_TARGETS`, `builtinRegistry`, `meetsLevel`, `createDiagnosticCollector`,
  `SourceLocation`, `ReactivityGraph`, `Pass`/`PassContext`/`pipe`.
- Stale shapes corrected across `IRComponent`, `IRModule`, `IRElement`, `IRText`, `IRProp`,
  `IREventBinding`, `IRResourceDeclaration`, `IRSetupStatement`, `PrimitiveName`, `IRReactiveKind`,
  `InklineConfig`, `ResolvedCompilerOptions`, `CodegenContext`, `RewriteRules`, `MemberRewriteRules`,
  `TargetConformanceSpec`, `CJsxElement`, `CTmplElement` and `CTmplAttr`.
- The diagnostics table listed 23 of 35 codes with no indication it was partial; it now points at
  `pnpm docs:diagnostics`, generated from `src/core/diagnostics/codes.ts`, so it cannot rot again.

A new appendix lists the twelve types that appear in exported signatures but are not importable from
any entry point, so the page never documents a symbol at a path that does not resolve. Those gaps
pre-date the split and are tracked as follow-up work.
