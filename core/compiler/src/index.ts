/**
 * `@inkline/compiler` — the supported entry point.
 *
 * The package ships three entry points, and the import path states the support tier:
 *
 * - `@inkline/compiler` (here) — compiling, configuring, reading diagnostics, and authoring
 *   plugins. Stable. This is what a consumer autocompletes against, so it stays small.
 * - `@inkline/compiler/ir` — the render IR: node types, builders, visitors, transforms,
 *   serialization, migration, and the reactivity symbol table. For plugin authors who inspect
 *   or rewrite the IR handed to them by the `ir:post` hook.
 * - `@inkline/compiler/codegen` — **unstable.** Code IR, the `Target` contract, the printer,
 *   and the built-in targets. See that file's header for why it is not stable yet.
 *
 * Nothing was deleted in the split — every name still ships, at the path that describes it.
 */

// ============ TOP-LEVEL ENTRY POINT ============
export { compile } from "./pipeline/compile.ts";
export type { CompileInput, CompileResult, AnalyzedModule } from "./pipeline/compile.ts";
export {
  compileIncremental,
  createIncrementalState,
  seedIncrementalState,
  type IncrementalSeed,
  type IncrementalState,
  type IncrementalCompileResult,
} from "./pipeline/incremental.ts";

// ============ CONFIGURATION ============
export type {
  BarrelGroup,
  InklineConfig,
  ResolvedCompilerOptions,
  SourceMapMode,
} from "./core/options.ts";
export { defineConfig } from "./core/config.ts";
// Validate a config up front — `compile` resolves options itself, but tooling that acts on the
// config before compiling (creating or cleaning output directories) needs to fail first.
export { resolveOptions } from "./core/options.ts";

// ============ TARGET NAMING ============
// The Angular element selector for a compiled component (`IBadge` → `ink-badge`). Exported for
// tooling that instantiates compiled components by tag (e.g. the Storybook story generator).
export { angularSelector } from "./codegen/targets/angular/selector.ts";

// ============ DIAGNOSTICS ============
export type { Diagnostic, DiagnosticSeverity, DiagnosticCode } from "./core/diagnostics/codes.ts";
export { DIAGNOSTICS } from "./core/diagnostics/codes.ts";
// `ALL_SEVERITIES` and `isDiagnosticSeverity` are the runtime side of `DiagnosticSeverity`, needed by
// any tool that takes a reporting level from a user: the CLI validates `--report-level` and config
// `reportLevel` with them before the value can reach `meetsLevel`, which would rank an unrecognised
// level as `undefined` and suppress everything.
export { ALL_SEVERITIES, isDiagnosticSeverity, meetsLevel } from "./core/diagnostics/level.ts";
export { InklineConfigError, isInklineConfigError } from "./core/diagnostics/error.ts";
// Exported so tooling that reports its own diagnostics (e.g. the CLI's config validation) emits
// the same catalog-resolved shape the compiler does, instead of hand-building Diagnostic objects.
export {
  createDiagnosticCollector,
  type DiagnosticCollector,
} from "./core/diagnostics/collector.ts";
// `Diagnostic.loc` is a `SourceLocation`. Without this a consumer that holds a Diagnostic cannot
// name the type of a field it was handed — the same leak `/ir` closes for `ReactivityGraph`.
export type { SourceLocation } from "./ir/types.ts";

// ============ PLUGIN API ============
// Plugins are a genuinely open extension point: `config.plugins` is honoured and `Plugin.name` is
// a free string, so plugin authoring is root-tier. The IR types a plugin inspects live at
// `@inkline/compiler/ir`.
export type { Plugin, PluginHooks, PluginContext } from "./plugin/types.ts";
export { definePlugin } from "./plugin/types.ts";

// ============ TARGETS ============
// Naming and selecting a target is root-tier; *implementing* one is not. `TargetName` is a closed
// union, so the `Target` contract and the Code IR it is written against live at
// `@inkline/compiler/codegen` and are marked unstable there.
export type { TargetName, GeneratedFile } from "./codegen/context.ts";
export { ALL_TARGETS } from "./codegen/context.ts";
export { builtinRegistry } from "./codegen/registry.ts";
