---
name: engine-pipeline-internals
description: The Styleframe engine's end-to-end pipeline — loader → core AST → transpiler → runtime/scanner — including the recipe→utility bridge, two-faced virtual modules, HMR invalidation, minification contract, and known sharp edges. Use for any engine/* or tooling/plugin work, or when reviewing it.
---

# Engine pipeline internals

## The spine (one screen)

```
styleframe.config.ts ──┐
*.styleframe.ts ───────┤ loader (jiti) loads ALL into ONE mutable core Root AST
                       ▼
Root { variables, utilities[], modifiers[], recipes[], themes[], children[],
       _registry: Map<id,node>,
       _usage: { variables:Set, utilities:Set, recipes:Set, recipeUtilities:Map } }
                       ▼
scanner: content scan → _usage.utilities        import scan → which recipes are used
                       ▼
transpiler (pure string gen, no I/O):
  type:"css" → index.css   (tree-shaken via _usage when enabled)
  type:"ts"  → index.ts    (createRecipe calls; only _exportName-tagged tokens)
  type:"dts" → styleframe.d.ts + shims.d.ts
                       ▼
runtime (~1.4KB): createRecipe(name, runtimeObj) → (props) => "_utility:value ..." string
```

**Contracts that hold it together:** `_usage` (tree-shaking), `_exportName` (TS/DTS emission, set by loader's `trackExports`), and the shared-instance shim (multi-file authoring). Break one and a distant package fails.

## The recipe→utility bridge (core, undocumented in AGENTS.md)

`recipe(config)` at author time: (a) attaches `_runtime` (token values → string keys via each utility factory's `autogenerate`); (b) `processRecipeUtilities()` walks base/variants/compoundVariants, resolves each declaration to a registered utility factory — **throws if the utility/modifier isn't registered yet** (ordering-sensitive!) — materializes utility children, records class names in `_usage.recipeUtilities[name]`; (c) pushes onto `root.recipes`. Later, `registerRecipeUtilities(root, usedNames?)` promotes recorded class names into `_usage.utilities` — the set the CSS consumer actually emits. Recipes themselves are **never emitted as CSS**; their utilities are.

## Tree-shaking gates (transpiler `consume/css/root.ts`)

- Variables filtered when `treeshake` alone.
- Utility children + themes filtered only when `treeshake && scanner` BOTH set.
  Mis-setting these silently over- or under-emits CSS.

## The plugin is the real pipeline (tooling/plugin, unplugin, 9 adapters incl. bun)

`buildStart`: shared jiti → load config as global instance → discover `*.styleframe.ts` → `sortByLoadOrder` (default alphabetical) → load all (each mutates the one root via a temp `.mjs` shim whose `styleframe()` returns `globalThis.__STYLEFRAME_GLOBAL_INSTANCE__`) → build importree dependency graph → scan content (`registerMatchedUtilities`, dynamic utilities for known CSS properties) → recipe tree-shake via `scanImports('virtual:styleframe')` → `registerRecipeUtilities` → watch files → generate `.d.ts`.

**Two-faced `virtual:styleframe`**: importer is a `*.styleframe.ts` → extension face (instance shim); anything else → consumer face (transpiled `type:"ts"`). `virtual:styleframe.css` → `type:"css"` with `treeshake:true, scanner:!!content`.

**Minification contract**: build-time `generateShorteningMap(root)` shortens class names in CSS/consumer output, while `transformSourceClassNames` rewrites app source with the SAME map. Both sides must share one `ShorteningMap` or classes desync — any change here needs both sides + an integration test.

**HMR strategy table** (importree-driven selective jiti invalidation):
| Change | Action |
|---|---|
| config file | full reload + graph rebuild |
| `*.styleframe.ts` | reload; invalidate file + dependents (BFS) |
| content file | incremental `scanFileAndRegister`, CSS-only update |
| tracked shared composable | BFS to affected files |
| add/delete styleframe file | rebuild graph |
Failure during reload → rollback to previous state so dev server survives. `.d.ts` regen debounced 100ms.

**Plugin error classes**: `ExportCollisionError` (two files export same name), `GlobalInstanceNotInitializedError`, `CircularDependencyError` (circular styleframe-file imports rejected — share via non-styleframe files).

## Scanner specifics

Class pattern `_[mods:]name[:value]`; arbitrary values via `_`→space; dynamic utility creation only for names in the known-CSS-property registry (453-line list) — typos yield warned-but-unmatched classes. `createScanner` is Node-only (`/node` subpath). Namespace or dynamic imports of `virtual:styleframe` defeat recipe tree-shaking → plugin includes ALL recipes and warns.

## Two build paths diverge by design

CLI `styleframe build` = `loadConfiguration` + `build()`: full output, **no extension-file discovery, no scanner, no tree-shake**. Plugin path = everything above. Bugs that appear in one path only are expected — test the right path.

## Sharp edges & current gaps

- **`@styleframe/loader` has ZERO unit tests** despite owning I/O, jiti cache invalidation (`clearJitiCache` handles two cache shapes), and license-gated `build()`. Treat changes there as high-risk; add tests.
- `build()` validates license via env (`@styleframe/license`, external private pkg); invalid → fixed-position CSS watermark injection (`transpiler/src/license.ts`). Never "fix" this.
- `getVariable/getUtility/getModifier` throw on miss (not null).
- Runtime recipe `name` must match build-time name or classes won't match CSS. Undefined variant props are silently skipped.
- Test volumes (snapshot): core 20 files/~13k LOC, transpiler 31/~11.4k, scanner 8/~3.2k, runtime 1/713, loader 0.
- Open engine frontiers: native `@layer`/`@container`/`@supports` (issues #15–17), sourcemaps (#20), Tailwind compat (#21).
