# Changelog

## v1.0

### Phase 1A: IR migration framework (`f632ac1f8`)

- Added `IRModule.version` field and `IR_VERSION` constant
- Implemented `migrate(module, fromVersion, toVersion)` with version-aware transforms
- Added `registerMigration()` API for declaring version-to-version migration steps

### Phase 1B: Component-ref forwarding (`79b9eb49a`)

- Removed INK0070 diagnostic (component refs are now fully supported)
- Added `expose` field to IRComponent for declaring exposed members
- React: emit `forwardRef` wrapper with `useImperativeHandle`
- Vue: emit `defineExpose()` call with exposed bindings
- Svelte: emit exported functions and variables for parent access

### Phase 1C: Emit quality hardening (`97b66cfbf`)

- React/Solid: emit typed props interfaces instead of inline object types
- Introduced MemberRewriteRules for target-specific member access rewriting
- Added conformance invariants (`requirePropsNotDestructured`, `requireReactiveReadsPreserveCall`)
- Added 14 new emit tests covering edge cases in code generation

### Output validation tests (`675d1b67c`, `e1ac5ca35`, `2b9fa2f72`)

- Added 10 new fixture components covering v1 features
- Introduced `output-validation.test.ts` with 106 snapshot tests
- Full pipeline compilation and snapshot comparison for all fixtures across all targets

### Phase 2: Scoped CSS (`7a42c05a2`)

- Added `IRStyleBlock` IR node with `css` and `scoped` fields
- Added `CStyle` Code IR node for emitting style blocks
- Vue: emit `<style scoped>` blocks
- Svelte: emit `<style>` blocks (scoped by default)
- React/Solid: emit `.module.css` companion files with class-name bindings

### Phase 3A: Server/client boundaries (`3350d6b15`)

- Added `IRRuntimeMode` enum (`"server"`, `"client"`, `"iso"`)
- Conditional `'use client'` / `'use server'` directive emission based on runtime mode
- React/Solid: emit directives at file top; Vue/Svelte: annotate in script setup

### Phase 3B: Vite plugin + watch (`5cf83f361`)

- Implemented `compileIncremental(prev, changes)` for incremental recompilation
- Created `@inkline/vite-plugin` package with transform hook integration
- Added `--watch` CLI flag for file-system watching with automatic recompilation

### Phase 4: createResource (`7a336e623`)

- Added `IRResourceDeclaration` IR node for async data fetching
- React: emit `use()` hook with Suspense boundary
- Vue: emit async setup with `await` and Suspense
- Solid: emit `createResource()` with accessor pattern
- Svelte: emit `{#await}` block syntax

### Phase 5: IR caching + source maps (`07653eb62`)

- Implemented `serializeModule()` and `deserializeModule()` for IR persistence
- Added `raw` field to IR expression nodes for serialization without TS AST references
- Extended source-map span wiring to Solid, Vue, and Svelte emitters (previously React-only)

### Phase 6A: Angular/Qwik/Astro (`b57426585`)

- Added Angular target emitter (standalone components, signals, `@Input`/`@Output`)
- Added Qwik target emitter (`component$`, `useSignal`, `$` serialization boundaries)
- Added Astro target emitter (`.astro` frontmatter + template, island architecture)
- Total targets: 7 (React, Vue, Solid, Svelte, Angular, Qwik, Astro)

### Phase 6B: Multi-file components (`189b1b6bf`)

- Implemented sibling `.ink.css` file resolver in the parse pass
- Support for split-file component authoring (separate script and style files)
- CSS file contents merged into `IRStyleBlock` during compilation

## v0.0

### Foundation (Phases A-J)

- Phase A-B: Project scaffolding, IR type definitions (`IRModule`, `IRComponent`, `IRSetupBinding`)
- Phase C-D: IR builder API and visitor/traversal utilities
- Phase E-F: IR transforms (slot normalization, control flow, two-way binding)
- Phase G-H: Code IR types (`CModule`, `CStmt`, `CExpr`, `CJsxElement`) and printer
- Phase I-J: Source-map generation with `@jridgewell/gen-mapping`

### Parse pass (Phase P2)

- Bind-primitives extraction (createSignal, createMemo, createEffect, createRef)
- Render-site detection and JSX tree construction
- Setup function analysis and dependency scope tracking

### Lower pass (Phase I)

- Slot normalization and default slot injection
- Control-flow lowering (if/else, for/each, switch)
- Two-way binding transform for input elements
- Event handler normalization
- Ref attachment and category classification
- Key-prop warnings and static-node marking

### v0 gap remediation (Phases 1-10)

- Phase 1-2: Analyze pass implementation, props parsing from options object
- Phase 3-4: Conformance specs per target, options validation and diagnostics
- Phase 5: Testing harnesses (typecheck, lint, mount, equivalence, bench)
- Phase 6: CI task scripts wired to testing harnesses
- Phase 7: 34 additional fixture components expanding scenario coverage to 38 total
- Phase 8: CLI `--config` flag for configuration file support
- Phase 9: Source-map round-trip verification
- Phase 10: Performance baselines with tinybench
