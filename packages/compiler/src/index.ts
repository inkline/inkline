// ============ TOP-LEVEL ENTRY POINT ============
export { compile } from "./pipeline/compile.ts";
export type { CompileInput, CompileResult, AnalyzedModule } from "./pipeline/compile.ts";
export {
  compileIncremental,
  createIncrementalState,
  type IncrementalState,
  type IncrementalCompileResult,
} from "./pipeline/incremental.ts";

// ============ CONFIGURATION ============
export type { InklineConfig, ResolvedCompilerOptions, SourceMapMode } from "./core/options.ts";
export { defineConfig } from "./core/config.ts";

// ============ PIPELINE PRIMITIVES (advanced users) ============
export type { Pass, PassContext } from "./pipeline/types.ts";
export { pipe } from "./pipeline/types.ts";

// ============ DIAGNOSTICS ============
export type { Diagnostic, DiagnosticSeverity, DiagnosticCode } from "./core/diagnostics/codes.ts";
export { DIAGNOSTICS } from "./core/diagnostics/codes.ts";

// ============ IR — RENDER TREE TYPES ============
export type {
  IRNode,
  IRElement,
  IRComponentInstance,
  IRText,
  IRExprNode,
  IRIf,
  IRIfBranch,
  IRFor,
  IRSwitch,
  IRSwitchCase,
  IRSlotPlaceholder,
  IRFragment,
  IRAttribute,
  IRAttributeBinding,
  IRStaticValue,
  IREventBinding,
  IRRefBinding,
  IRSlotContent,
  IRProp,
  IRSlotDeclaration,
  IREventDeclaration,
  IRStateDeclaration,
  IRRefDeclaration,
  IRMemoDeclaration,
  IREffectDeclaration,
  IRResourceDeclaration,
  IRLifecycle,
  IRSetupStatement,
  IRRefCategory,
  IREffectCleanup,
  IRComponent,
  IRRuntimeMode,
  IRStyleBlock,
  IRTargetOverride,
  IRModule,
  PrimitiveName,
  PrimitiveUsage,
} from "./ir/render/nodes.ts";
export { IR_VERSION } from "./ir/render/nodes.ts";

// ============ IR — MIGRATION ============
export { migrate, registerMigration, type IRMigration } from "./ir/migration.ts";

// ============ IR — BUILDERS ============
export {
  createElement,
  createComponentInstance,
  createText,
  createExpr,
  createIf,
  createFor,
  createSwitch,
  createSlotPlaceholder,
  createFragment,
  createAttribute,
  createStaticValue,
} from "./ir/render/builders.ts";

// ============ IR — VISITORS ============
export type { IRVisitor } from "./ir/render/visit.ts";
export { walkRenderTree, walkNode } from "./ir/render/visit.ts";
export type { IRTransformer } from "./ir/render/transform.ts";
export { SKIP, transform, transformComponent } from "./ir/render/transform.ts";

// ============ IR — REACTIVITY ============
export type {
  SymbolId,
  IRReactiveKind,
  IRReactiveSymbol,
  IRDependency,
  IRDependencySet,
} from "./ir/reactivity.ts";
export { SymbolTable } from "./ir/reactivity.ts";

// ============ PLUGIN API ============
export type { Plugin, PluginHooks, PluginContext } from "./plugin/types.ts";
export { definePlugin } from "./plugin/types.ts";

// ============ TARGET API ============
export type {
  Target,
  TargetName,
  TargetPlan,
  TargetConformanceSpec,
  ControlFlowImportSpec,
  MemberRewriteRules,
  RewriteRules,
  TargetRegistry,
  CodegenContext,
  GeneratedFile,
  CodeModule,
} from "./codegen/context.ts";
export { defineTarget, createRegistry, builtinRegistry } from "./codegen/registry.ts";

// ============ CODE IR (target/plugin authors) ============
export type {
  Code,
  CFile,
  CScript,
  CImport,
  CStmt,
  CExpr,
  CRaw,
  CJsxElement,
  CJsxAttr,
  CJsxText,
  CTmplElement,
  CTmplDirective,
  CTmplAttr,
  CTmplText,
  CTmplMustache,
  CGroup,
  CIndent,
  CStyle,
} from "./codegen/code-ir/nodes.ts";
export {
  cFile,
  cScript,
  cImport,
  cStmt,
  cExpr,
  cRaw,
  cJsxElement,
  cJsxAttr,
  cJsxText,
  cTmplElement,
  cTmplDirective,
  cTmplAttr,
  cTmplText,
  cTmplMustache,
  cGroup,
  cIndent,
  cStyle,
} from "./codegen/code-ir/builders.ts";

// ============ PRINTER ============
export { print, type PrintOptions, type PrintResult } from "./codegen/print/printer.ts";

// ============ BUILT-IN TARGETS ============
export { react as reactTarget } from "./codegen/targets/react/index.ts";
export { vue as vueTarget } from "./codegen/targets/vue/index.ts";
export { svelte as svelteTarget } from "./codegen/targets/svelte/index.ts";
export { solid as solidTarget } from "./codegen/targets/solid/index.ts";
