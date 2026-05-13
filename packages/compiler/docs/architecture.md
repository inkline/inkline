# Architecture

`@inkline/compiler` converts `.ink.tsx` files (TSX with signal primitives) into framework-native components for React, Vue 3, Svelte 5, and Solid.

## Pipeline

The compiler is a chain of six passes operating on immutable artifacts:

```
CompileInput
    │
    ▼
P1  program    → TsProgramArtifact  (ts.Program, SourceFile, TypeChecker)
    │
    ▼
P2  parse      → IRModule           (components with render tree, decls, deps)
    │
    ▼
P3  lower      → IRModule           (normalized: <Show>→IRIf, static marks, etc.)
    │
    ▼
P4  analyze    → AnalyzedModule     (reactivity graph, validation diagnostics)
    │
    ▼
P5  emit       → CodeModule[]       (per component, per target — Code IR tree)
    │
    ▼
P6  print      → GeneratedFile[]    (source text + optional source map)
```

Plugin hooks fire at two points:

- `ir:post` — after P4, read-only inspection of the analyzed module.
- `code:post` — after P6 per target, may replace generated files.

## Key abstractions

### IR (Intermediate Representation)

The render IR is a discriminated union of 9 node kinds:

`Element | ComponentInstance | Text | Expression | If | For | Switch | SlotPlaceholder | Fragment`

Every node carries a `SourceLocation`. Expression nodes hold a `ts.Expression` reference (in-memory only, not serializable) and an `IRDependencySet` tracking which reactive symbols they read.

### SymbolId

Reactive declarations (signals, memos, refs, props) are identified by a branded `SymbolId` string: `componentId::kind::name@offset`. The `SymbolTable` mints, resolves, and links (getter↔setter) these ids. No `ts.Symbol` leaks into the IR beyond the `expr` field.

### Code IR

Targets emit a Code IR tree (`Code` discriminated union) consumed by a single shared printer. Node kinds include `CFile`, `CScript`, `CImport`, `CStmt`, `CExpr`, `CJsxElement`, `CTmplElement`, and formatting helpers (`CGroup`, `CIndent`). The printer owns indentation, newlines, and source-map generation.

### RewriteRules

Each target declares rewrite rules that control how reactive reads, setters, refs, attribute casing, and event names are transformed during emission:

| Rule          | React           | Solid           | Vue                      | Svelte            |
| ------------- | --------------- | --------------- | ------------------------ | ----------------- |
| reactiveRead  | strip-call      | preserve-call   | strip-call               | strip-call        |
| setterStyle   | function-call   | function-call   | field-assignment(.value) | direct-assignment |
| eventNameCase | camel (onClick) | lower (onclick) | kebab (@click)           | lower (onclick)   |

## Directory layout

```
src/
├── index.ts                    # public API surface
├── bin/inkline.ts              # CLI
├── core/                       # diagnostics, options, config, assert, source maps
├── ir/                         # types, reactivity (SymbolTable), render nodes/builders/visit/transform
├── codegen/
│   ├── context.ts              # Target, RewriteRules, CodeModule, GeneratedFile
│   ├── registry.ts             # createRegistry, builtinRegistry
│   ├── shared/expr-rewrite.ts  # expression rewriting per RewriteRules
│   ├── code-ir/                # Code IR nodes, builders, visitor
│   ├── print/printer.ts        # shared printer with source-map support
│   └── targets/{solid,react,svelte,vue}/
├── pipeline/
│   ├── compile.ts              # compile() orchestrator
│   ├── types.ts                # Pass, PassContext, pipe
│   └── passes/
│       ├── 01-program.ts
│       ├── 02-parse/           # bind-primitives, sites, setup, jsx/, deps, scope
│       ├── 03-lower/           # slots, control-flow, two-way-binding, events, refs, key-warnings, static-mark
│       └── 04-analyze/graph.ts
├── plugin/                     # Plugin types, PluginRunner
└── testing/                    # harness, conformance, sourcemap, coverage
```
