# Architecture

`@inkline/compiler` converts `.ink.tsx` files -- TSX with signal-based reactive
primitives -- into framework-native components for seven targets: React, Solid,
Vue 3, Svelte 5, Angular, Qwik, and Astro.

A single `.ink.tsx` source file produces one output per target, each using the
idioms of that framework (hooks, signals, SFCs, decorators, etc.) while
preserving source-map fidelity back to the original file.

---

## Pipeline

The compiler is a chain of 6.5 passes operating on immutable artifacts.
Each pass receives the output of the previous one and produces a new value;
nothing is mutated in place.

```
CompileInput (.ink.tsx source + fileName)
    |
    v
P1  program        --> TsProgramArtifact   (ts.Program, SourceFile, TypeChecker)
    |
    v
P2  parse          --> IRModule            (components with render tree, decls, deps)
    |
    v
P2.5 sibling       --> IRModule            (merge co-located .ink.css/.ink.scss styles)
    |
    v
P3  lower          --> IRModule            (normalize control flow, slots, bindings,
    |                                       two-way binding, refs, static marks)
    v
P4  analyze        --> AnalyzedModule      (reactivity graph, validation, cycle detect)
    |
    v                 [ir:post plugin hook]
    |
    v
P5  emit           --> CodeModule[]        (per component, per target -- Code IR tree)
    |
    v
P6  print          --> GeneratedFile[]     (source text + optional source map)
                      [code:post plugin hook, per target]
```

### Pass detail

| Pass | Module                                   | Input               | Output              | Notes                                                                                     |
| ---- | ---------------------------------------- | ------------------- | ------------------- | ----------------------------------------------------------------------------------------- |
| P1   | `pipeline/passes/01-program.ts`          | `CompileInput`      | `TsProgramArtifact` | Creates a TypeScript `Program` with virtual file, resolves `TypeChecker`                  |
| P2   | `pipeline/passes/02-parse/`              | `TsProgramArtifact` | `IRModule`          | Walks AST, binds primitives, extracts JSX, resolves scopes and deps                       |
| P2.5 | `pipeline/passes/01-program/resolver.ts` | file path           | `ResolvedSiblings`  | Scans for `.ink.css`, `.ink.scss`, `.ink.less` siblings                                   |
| P3   | `pipeline/passes/03-lower/`              | `IRModule`          | `IRModule`          | Sub-passes: control-flow, slots, events, refs, two-way-binding, key-warnings, static-mark |
| P4   | `pipeline/passes/04-analyze/`            | `IRModule`          | `AnalyzedModule`    | Builds reactivity graph, runs validation and cycle detection                              |
| P5   | `codegen/targets/*/index.ts`             | `IRComponent`       | `CodeModule`        | Each target converts IR to its Code IR tree                                               |
| P6   | `codegen/print/printer.ts`               | `Code` (root)       | `{ code, map }`     | Shared printer handles indentation, newlines, source maps                                 |

Passes are composed using the `pipe()` utility from `pipeline/types.ts` and
share a `PassContext` containing the `DiagnosticCollector`, `ResolvedCompilerOptions`,
`SymbolTable`, and `TargetRegistry`.

---

## Plugin hooks

Plugins implement the `Plugin` interface from `plugin/types.ts` and are
registered via `definePlugin()`. Two hooks are available:

| Hook        | Fires after            | Signature                                              | Capabilities                            |
| ----------- | ---------------------- | ------------------------------------------------------ | --------------------------------------- |
| `ir:post`   | P4 (analyze)           | `(module: AnalyzedModule, ctx: PluginContext) => void` | Read-only inspection of the analyzed IR |
| `code:post` | P6 (print), per target | `(target, files, ctx) => void \| GeneratedFile[]`      | May replace or augment generated files  |

The `PluginRunner` invokes hooks in registration order. The `PluginContext`
provides `pushDiagnostic` for reporting issues and `options` for reading
compiler configuration.

---

## IR (Intermediate Representation)

### Render tree

The render IR is a discriminated union of 9 node kinds:

```
Element | ComponentInstance | Text | Expression | If | For | Switch | SlotPlaceholder | Fragment
```

Each node carries a `SourceLocation` with `file`, `line`, `column`, `offset`,
and `length`. Nodes that are not attached to a real source position use the
frozen `UNKNOWN_LOCATION` sentinel.

Supporting structures on render nodes:

- **IRAttribute** -- `normal`, `class`, `style`, or `twoWay` binding types
- **IREventBinding** -- handler expression with optional param types
- **IRRefBinding** -- `element` or `component` category
- **IRSlotContent** -- named slot body provided by a parent component
- **IRStaticValue** -- constant string, number, boolean, or null

### IRExprNode

The `Expression` node deserves special attention:

| Field             | Type                    | Purpose                                            |
| ----------------- | ----------------------- | -------------------------------------------------- |
| `expr`            | `ts.Expression`         | In-memory AST reference (not serializable)         |
| `raw`             | `string?`               | Source text snapshot for serialization round-trips |
| `deps`            | `IRDependencySet`       | Which reactive symbols this expression reads       |
| `isReactive`      | `boolean`               | Whether the expression depends on any signal       |
| `isDynamic`       | `boolean`               | Whether deps cannot be statically determined       |
| `emissionContext` | `"template" \| "setup"` | Where this expression will be emitted              |

The `raw` field is populated during serialization so that `deserializeModule`
can reconstruct a `ts.Expression` by re-parsing `(raw)` through a synthetic
source file.

### Component-level declarations

An `IRComponent` aggregates all declarations extracted from the source:

| Declaration | Interface               | Key fields                                                 |
| ----------- | ----------------------- | ---------------------------------------------------------- |
| Props       | `IRProp`                | name, typeNode, defaultValue, required, symbolId           |
| Slots       | `IRSlotDeclaration`     | name, isScoped, scopedProps, required, fallback            |
| Events      | `IREventDeclaration`    | name, payloadType                                          |
| State       | `IRStateDeclaration`    | name, setterName, initial, symbolId, setterSymbolId        |
| Refs        | `IRRefDeclaration`      | name, category (element/component), elementType            |
| Memos       | `IRMemoDeclaration`     | name, expr (with deps), symbolId                           |
| Effects     | `IREffectDeclaration`   | body, deps, cleanup (present/absent/unknown)               |
| Resources   | `IRResourceDeclaration` | name, fetcher, source, loadingName, errorName, refetchName |
| Lifecycle   | `IRLifecycle`           | onMount[], onCleanup[]                                     |
| Setup       | `IRSetupStatement`      | stmt, defines (SymbolId[])                                 |
| Styles      | `IRStyleBlock`          | css, scoped, lang (css/scss/less)                          |
| Runtime     | `IRRuntimeMode`         | `"client"` / `"server"` / `"iso"`                          |
| Expose      | `string[]?`             | Public API surface for component refs                      |

### IR_VERSION and migration

The IR is versioned via `IR_VERSION` (currently `1`). The `migration.ts` module
maintains an ordered list of `IRMigration` objects. Each migration has a `from`
and `to` version and a `migrate(module)` function. Calling `migrate(module, target)`
walks the chain forward. Downgrades are rejected. New migrations are added via
`registerMigration()`.

---

## SymbolId

Reactive declarations are identified by a branded string type:

```
SymbolId = `${componentId}::${kind}::${name}@${offset}`
```

Where `kind` is one of: `signal`, `memo`, `effect`, `prop`, `context`, `ref`.

The `SymbolTable` class manages the lifecycle:

- **mint()** -- creates a new symbol, optionally linking it to a `ts.Symbol`
- **resolve()** -- looks up a `SymbolId` from a `ts.Symbol`
- **get()** -- retrieves the `IRReactiveSymbol` for a given id
- **linkSetter()** -- associates a getter symbol with its setter
- **setterOf()** -- finds the setter for a getter
- **forComponent()** -- returns all symbols belonging to a component
- **freeze()** -- prevents further mutations (called after P4)

No `ts.Symbol` leaks into the serializable IR beyond the `expr` field on
expression nodes.

---

## Code IR

Targets emit a `Code` discriminated union consumed by the shared printer.
The full set of node kinds:

| Kind             | Category   | Purpose                                                                |
| ---------------- | ---------- | ---------------------------------------------------------------------- |
| `CFile`          | Container  | Top-level file; flavor: `js-jsx`, `sfc-vue`, `sfc-svelte`, `ts`, `tsx` |
| `CScript`        | Container  | `<script>` block (SFC targets); lang: `ts`/`js`, setup flag            |
| `CImport`        | Statement  | Import declaration with module, default/named bindings, typeOnly       |
| `CStmt`          | Statement  | Statement with string or `CExpr` body                                  |
| `CExpr`          | Expression | Raw expression text                                                    |
| `CRaw`           | Literal    | Verbatim text (directives, blank lines)                                |
| `CJsxElement`    | JSX        | Element with tag, attrs, children, selfClose (React, Solid, Qwik)      |
| `CJsxAttr`       | JSX        | Attribute with static/expr/boolean value                               |
| `CJsxText`       | JSX        | Text content inside JSX                                                |
| `CTmplElement`   | Template   | Template element with directives and attrs (Vue, Svelte)               |
| `CTmplDirective` | Template   | `v-if`, `v-for`, `{#if}`, etc. with optional arg and modifiers         |
| `CTmplAttr`      | Template   | Attribute with static or expression value                              |
| `CTmplText`      | Template   | Text content inside templates                                          |
| `CTmplMustache`  | Template   | `{{ expr }}` interpolation                                             |
| `CGroup`         | Formatting | Groups children; optional `fit` flag                                   |
| `CIndent`        | Formatting | Indents children by one level                                          |
| `CStyle`         | Style      | CSS block with scoped flag                                             |

Every Code node has an optional `span` (SourceLocation) for source-map
tracking and optional `hints` for downstream tooling.

---

## RewriteRules

Each target declares a `RewriteRules` object that controls how the emitter
transforms reactive reads, state setters, ref access, attribute casing, and
event names. The full 7-target matrix:

| Rule                | React          | Solid         | Vue                      | Svelte            | Angular       | Qwik                     | Astro         |
| ------------------- | -------------- | ------------- | ------------------------ | ----------------- | ------------- | ------------------------ | ------------- |
| reactiveRead        | strip-call     | preserve-call | strip-call               | strip-call        | preserve-call | field-access(.value)     | strip-call    |
| setterStyle         | function-call  | function-call | field-assignment(.value) | direct-assignment | function-call | field-assignment(.value) | function-call |
| refAccess           | field(current) | bare          | bare                     | bare              | bare          | field(value)             | bare          |
| jsxAttrCasing       | react          | html          | html                     | html              | html          | html                     | html          |
| eventNameCase       | camel          | lower         | kebab                    | lower             | camel         | camel                    | camel         |
| members.props.strip | true           | false         | true                     | true              | false         | false                    | true          |

The `expr-rewrite.ts` module walks `ts.Expression` trees and applies these
rules. For example, a zero-argument call like `count()` becomes:

- **strip-call**: `count` (React, Vue, Svelte, Astro)
- **preserve-call**: `count()` (Solid, Angular)
- **field-access(.value)**: `count.value` (Qwik)

`rewriteAttrName` maps between React casing (`className`, `htmlFor`) and HTML
casing (`class`, `for`). The React DOM canonicalisation (`for` → `htmlFor`,
`readonly` → `readOnly`, …) applies only to **native host elements**; on a custom
component instance (`isComponent`) prop names cross the boundary verbatim so they
still match the child's HTML-native lowercase prop interface, with `class` →
`className` kept as the one deliberate exception. `rewriteEventName` handles prefix
and case conversion (and the same host-vs-component distinction).

---

## Incremental compilation

The `compileIncremental` function in `pipeline/incremental.ts` wraps
`compile()` with a SHA-256 hash-based cache:

1. For each input file, compute `sha256(source).slice(0, 16)`.
2. Compare against `IncrementalState.sourceHashes`.
3. If the hash matches and a cached `CompileResult` exists, skip recompilation.
4. Otherwise, run the full pipeline and store the result.
5. Return an `IncrementalCompileResult` with `changed` and `skipped` file lists.

State is held in an `IncrementalState` object (two `ReadonlyMap`s). The caller
is responsible for persisting this state across builds. The function merges
output files from all inputs into a single `files` map keyed by target name.

---

## IR serialization

`ir/serialize.ts` provides `serializeModule` and `deserializeModule` for
cross-process caching and debugging:

- **serializeModule** -- JSON.stringify with a custom replacer that:
  - Strips non-serializable fields (`sourceFile`, `imports`, `stmt`, `typeNode`, `reference`)
  - Converts `IRExprNode` to a `SerializedExpr` using `raw` (or `expr.getText()`)
  - Converts `Map`/`Set` to plain objects/arrays

- **deserializeModule** -- JSON.parse with a rehydration pass that:
  - Reconstructs `ts.Expression` from `raw` by parsing `(raw)` through a synthetic source file
  - Restores the `expr` field on every `Expression` node
  - Returns an `IRModule` with empty `imports` and a stub `sourceFile`

---

## Multi-file components

The P2.5 sibling resolver at `pipeline/passes/01-program/resolver.ts` scans
for co-located style files alongside a `.ink.tsx` source:

| Extension   | Language |
| ----------- | -------- |
| `.ink.css`  | CSS      |
| `.ink.scss` | SCSS     |
| `.ink.less` | Less     |

Resolved styles are appended to every component in the module as `IRStyleBlock`
entries with `scoped: true`. The file must share the same base name as the
`.ink.tsx` file (e.g., `IButton.ink.tsx` + `IButton.ink.css`).

---

## Scoped CSS

Style handling flows through three layers:

1. **IRStyleBlock** -- parsed in P2/P2.5, carries `css`, `scoped`, and `lang`
2. **CStyle** -- Code IR node emitted by targets, carries `css` and `scoped`
3. **Per-target output**:
   - **Vue**: `<style scoped>` block inside the SFC
   - **Svelte**: `<style>` block inside the SFC (Svelte scopes by default)
   - **React / Solid**: separate `.module.css` file with CSS Modules import
   - **Angular / Qwik / Astro**: target-specific scoping mechanisms

---

## Server/client boundaries

Each `IRComponent` has a `runtime` field of type `IRRuntimeMode`:

| Mode       | Meaning                                                           |
| ---------- | ----------------------------------------------------------------- |
| `"client"` | Client-only; emits `"use client"` directive for RSC-aware targets |
| `"server"` | Server-only; emits `"use server"` directive                       |
| `"iso"`    | Isomorphic (default); no directive emitted                        |

The directive is emitted as a `CRaw` node at the top of the generated file,
before any imports.

---

## Performance

Budgets are enforced by `testing/bench.ts` using tinybench. CI fails on >10%
regression from `.bench-baseline.json`.

| Benchmark                                        | Budget   | Baseline    |
| ------------------------------------------------ | -------- | ----------- |
| Parse + lower + analyze, Composite fixture, cold | < 30 ms  | --          |
| Parse + lower + analyze, Composite fixture, warm | < 5 ms   | --          |
| Emit + print, single component, single target    | < 10 ms  | --          |
| Full compile (Counter, react)                    | < 100 ms | ~0.28 ms/op |
| Full compile (Counter, all 4 targets)            | < 100 ms | ~0.24 ms/op |

Run `vp run bench` to compare against the baseline; `vp run bench -- --save-baseline`
to update it.

---

## Directory layout

```
src/
├── index.ts                        # public API surface
├── bin/inkline.ts                   # CLI entry point (--config flag)
├── core/
│   ├── assert.ts                   # assertNever and runtime assertions
│   ├── config.ts                   # config file loading
│   ├── options.ts                  # InklineConfig, resolveOptions
│   ├── sourcemap.ts                # source-map utilities and round-trip verify
│   └── diagnostics/
│       ├── codes.ts                # Diagnostic type, all INK0xxx codes
│       └── collector.ts            # DiagnosticCollector
├── ir/
│   ├── types.ts                    # SourceLocation, UNKNOWN_LOCATION
│   ├── reactivity.ts              # SymbolId, SymbolTable, IRDependency, IRReactiveSymbol
│   ├── migration.ts               # IR_VERSION, migrate(), registerMigration()
│   ├── serialize.ts               # serializeModule / deserializeModule
│   └── render/
│       ├── nodes.ts                # IRNode union, IRComponent, IRModule, IR_VERSION
│       ├── builders.ts            # Builder functions for IR nodes
│       ├── visit.ts               # IR tree visitor
│       └── transform.ts           # IR tree transformer
├── codegen/
│   ├── context.ts                  # Target, TargetName, RewriteRules, CodegenContext,
│   │                               # TargetRegistry, GeneratedFile, CodeModule
│   ├── registry.ts                # createRegistry(), builtinRegistry
│   ├── shared/
│   │   └── expr-rewrite.ts        # rewriteExpr, rewriteEventName, rewriteAttrName
│   ├── code-ir/
│   │   ├── nodes.ts               # Code union (17 node kinds)
│   │   ├── builders.ts            # Builder functions (cFile, cImport, cExpr, ...)
│   │   └── visit.ts               # Code IR visitor
│   ├── print/
│   │   └── printer.ts             # Shared printer with source-map generation
│   └── targets/
│       ├── react/                  # React target (JSX, hooks, CSS modules)
│       │   ├── index.ts
│       │   └── conformance.ts
│       ├── solid/                  # Solid target (JSX, signals, CSS modules)
│       │   ├── index.ts
│       │   └── conformance.ts
│       ├── vue/                    # Vue 3 target (SFC, Composition API)
│       │   ├── index.ts
│       │   └── conformance.ts
│       ├── svelte/                 # Svelte 5 target (SFC, runes)
│       │   ├── index.ts
│       │   └── conformance.ts
│       ├── angular/                # Angular target (template syntax, signals)
│       │   ├── index.ts
│       │   └── conformance.ts
│       ├── qwik/                   # Qwik target (JSX, fine-grained reactivity)
│       │   ├── index.ts
│       │   └── conformance.ts
│       └── astro/                  # Astro target (island architecture)
│           ├── index.ts
│           └── conformance.ts
├── pipeline/
│   ├── compile.ts                  # compile() orchestrator
│   ├── incremental.ts             # compileIncremental() with SHA-256 caching
│   ├── types.ts                    # Pass<I,O>, PassContext, pipe()
│   └── passes/
│       ├── 01-program.ts          # P1: create ts.Program
│       ├── 01-program/
│       │   └── resolver.ts        # P2.5: sibling .ink.css/.ink.scss resolver
│       ├── 02-parse/              # P2: parse .ink.tsx to IRModule
│       │   ├── index.ts
│       │   ├── bind-primitives.ts # Detect createSignal, createMemo, etc.
│       │   ├── sites.ts           # defineComponent call-site detection
│       │   ├── setup.ts           # Setup block extraction
│       │   ├── options.ts         # Component options parsing
│       │   ├── scope.ts           # Scope tracking
│       │   ├── deps.ts            # Dependency resolution
│       │   ├── loc.ts             # Source location helpers
│       │   └── jsx/               # JSX parsing
│       │       ├── index.ts
│       │       └── attributes.ts
│       ├── 03-lower/              # P3: lowering passes
│       │   ├── index.ts           # Orchestrates all sub-passes
│       │   ├── control-flow.ts    # <Show>/<For>/<Switch> to IR control flow
│       │   ├── slots.ts           # Slot normalization
│       │   ├── events.ts          # Event binding lowering
│       │   ├── refs.ts            # Ref binding lowering
│       │   ├── two-way-binding.ts # v-model / bind:value lowering
│       │   ├── key-warnings.ts    # Missing key diagnostics for <For>
│       │   └── static-mark.ts     # Mark subtrees with no reactive deps
│       └── 04-analyze/            # P4: analysis passes
│           ├── index.ts
│           ├── graph.ts           # Reactivity dependency graph
│           └── validate.ts        # Validation rules (INK0010, INK0011, etc.)
├── plugin/
│   ├── types.ts                    # Plugin, PluginHooks, PluginContext, definePlugin
│   └── runner.ts                   # PluginRunner (invokes ir:post, code:post)
└── testing/
    ├── index.ts                    # Re-exports
    ├── harness.ts                  # Test harness utilities
    ├── conformance.ts             # Invariant runners (requireFileExtension, etc.)
    ├── sourcemap.ts               # Source-map round-trip verification
    ├── coverage.ts                # Coverage collection
    ├── typecheck.ts               # Generated code type-checking
    ├── lint.ts                    # OxLint integration
    ├── mount.ts                   # Mount / render testing
    ├── equivalence.ts             # Cross-target equivalence checks
    └── bench.ts                   # Benchmark suite with baseline comparison
```
