# Out-of-Scope (v0) & Future Work

This document tracks features deliberately excluded from v0 and sketches their v1 implementation path.

## Deferred to v1+

### Component-ref forwarding

- **v0**: `IRComponentInstance.refs` exists in the IR. `03-lower/refs.ts` sets `category: "component"` and pushes INK0070. The IR shape is forward-compatible.
- **v1**: per-target emission — React: `forwardRef` + `useImperativeHandle`; Vue: `defineExpose`; Svelte 5: `bind:this`; Solid: `ref={ref}` pattern.

### `<style>` blocks / scoped CSS

- **v0**: not in IR.
- **v1**: add `IRStyleBlock { css: string; scoped: boolean }` to `IRComponent`. Vue: `<style scoped>`, Svelte: `<style>`, React/Solid: CSS modules.

### Server/client component boundaries

- **v0**: React always emits `'use client'`.
- **v1**: `defineComponent({ runtime: "server" | "client" | "iso" })` option with per-target handling.

### Async components / Suspense

- **v0**: not handled.
- **v1**: `createResource()` primitive with per-target async-component patterns.

### Vite plugin / HMR

- **v0**: separate package `@inkline/vite-plugin` consumes `compile()`.
- **v1**: HMR boundary tracking via `IRComponent.id`; `compileIncremental(prev, changes)`.

### Cross-process IR caching

- **v0**: in-memory only. `IRModule` is not serializable (holds `ts.Expression` references).
- **v1**: store `raw: string` + `span` on `IRExprNode`; cache hit re-parses via small TS scaffold.

### Sub-expression source-map granularity

- **v0**: one mapping per `CExpr`, `CJsxElement` opening tag, `CStmt`, `CImport`.
- **v1**: `expr-rewrite.ts` emits `CExpr` subtrees with per-identifier spans.

### IR migration framework

- **v0**: no `IRModule.version` field.
- **v1**: introduce `version: number` + `migrate(module, fromVersion, toVersion)`.

### New targets (Angular, Qwik, Astro)

- **v0**: reserved in `TargetName` union type.
- **v1+**: one directory per target under `codegen/targets/<name>/`. See `docs/adding-a-target.md`.

### Multi-file components

- **v0**: one `.ink.tsx` per component (multiple `defineComponent` in one file is supported).
- **v1**: split-file components (template/script/style siblings) with a virtual-file resolver in P1.

### Props parsing from options

- **v0**: `component.props` is always `[]`. Props are passed through but not statically analyzed.
- **v1**: parse `defineComponent({ props: { ... } }, setup)` options object to produce `IRProp[]` with types, defaults, and required flags.

### Full expression rewriting in setup

- **v0**: `rewriteExpr` handles render-tree expressions and top-level calls. Compound expressions in memo/effect bodies (e.g., `count() * 2` → `count * 2` for React) use the recursive walker but may not cover all edge cases.
- **v1**: guaranteed recursive rewriting of all reactive calls in all expression contexts.
