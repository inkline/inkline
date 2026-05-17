# Implemented Features & Future Work

This document tracks what has been implemented in each version and what remains for future work.

## Implemented in v0

- **6-pass compilation pipeline**: parse, analyze, lower, codegen, print, source-map
- **4 target emitters**: React, Vue, Solid, Svelte
- **IR type system**: IRModule, IRComponent, IRSetupBinding, IRJsxTree, IRSlot, IRRef, IRDiagnostic
- **Code IR and printer**: CModule, CStmt, CExpr, CJsxElement with target-agnostic code generation
- **Diagnostics**: structured INK-prefixed diagnostics with severity, span, and suggestions
- **CLI**: `inkc` command with `--target`, `--outDir`, `--verbose` flags
- **Plugin system**: compiler plugin API with before/after hooks per pass
- **Props parsing**: constructor-ref shorthand, full `{ type, required, default }`, default-value inference
- **Reactive dependency tracking**: scope-based binding analysis for signals, memos, and effects
- **Source maps**: one mapping per CExpr, CJsxElement, CStmt, CImport
- **Testing harnesses**: typecheck, lint, mount, equivalence, and bench harnesses
- **38 fixture components**: Counter, Button, TodoList, and scenario-based test cases

## Implemented in v1

- **IR migration framework** (Phase 1A) -- IRModule.version, migrate(), registerMigration(), IR_VERSION constant
- **Component-ref forwarding** (Phase 1B) -- React forwardRef, Vue defineExpose, Svelte export functions; removed INK0070 diagnostic
- **Emit quality hardening** (Phase 1C) -- typed props in React/Solid, MemberRewriteRules, conformance invariants, 14 new emit tests
- **Scoped CSS / style blocks** (Phase 2) -- IRStyleBlock, CStyle node, per-target emission (Vue `<style scoped>`, Svelte `<style>`, React/Solid `.module.css`)
- **Server/client boundaries** (Phase 3A) -- IRRuntimeMode, conditional `'use client'`/`'use server'` directives
- **Build plugin + HMR + watch** (Phase 3B) -- @inkline/plugin (multi-bundler via unplugin), compileIncremental, `--watch` CLI flag
- **createResource async primitive** (Phase 4) -- IRResourceDeclaration, per-target async patterns (React use/Suspense, Vue async setup, Solid createResource, Svelte await)
- **IR serialization/caching** (Phase 5A) -- serializeModule, deserializeModule, raw field on IR expression nodes
- **Source-map spans all targets** (Phase 5B) -- span wiring for Solid, Vue, and Svelte emitters (previously React-only)
- **Angular/Qwik/Astro targets** (Phase 6A) -- 3 new target emitters, bringing total to 7
- **Multi-file components** (Phase 6B) -- sibling `.ink.css` resolver for split-file component authoring
- **Output validation suite** -- 106 snapshot tests, 56 fixtures covering all targets and feature combinations

## Deferred to v2+

- **Sub-expression source-map granularity** -- per-identifier CExpr subtrees in rewriteExpr for finer-grained mappings
- **Full recursive expression rewriting in ALL setup contexts** -- guaranteed rewriting of all reactive calls in every expression context (memo/effect bodies, nested calls)
- **PostCSS-based scope hashing** -- currently raw CSS with no selector rewriting; future: PostCSS transform for scoped attribute selectors
- **Runtime type validation for props** -- custom validators, runtime type checking beyond static analysis
- **Angular/Qwik/Astro tsconfigs and eslint configs** -- target-specific TypeScript and lint configurations for new targets
- **Server component primitive validation (INK0120 diagnostic)** -- validate that server components do not use client-only primitives
- **Async component Suspense boundary injection** -- automatic Suspense wrapper insertion for async components
- **HMR module graph invalidation in Vite plugin** -- invalidate dependent modules in the Vite dev server module graph on recompilation
- **`.ink.html` template file support** -- multi-file HTML templates as an alternative to JSX in `.ink.tsx`
