// IR — types
export type { Diagnostic, DiagnosticSeverity, SourceLocation, TargetName } from "./ir/types.ts";
export { ALL_TARGETS, UNKNOWN_LOCATION } from "./ir/types.ts";

// IR — reactivity
export type {
  IRDependency,
  IRDependencySet,
  IRDepResolution,
  IRReactiveKind,
  IRReactiveSymbol,
} from "./ir/reactivity.ts";
export { DYNAMIC_DEPS, STATIC_RESOLUTION } from "./ir/reactivity.ts";

// IR — nodes & module
export type {
  IRAttribute,
  IRAttributeBinding,
  IRComponent,
  IRComponentInstance,
  IREffectCleanup,
  IREffectDeclaration,
  IRElement,
  IREventBinding,
  IREventDeclaration,
  IRExpressionNode,
  IRFor,
  IRFragment,
  IRIf,
  IRIfBranch,
  IRLifecycle,
  IRMemoDeclaration,
  IRNode,
  IRProp,
  IRRefBinding,
  IRRefCategory,
  IRRefDeclaration,
  IRSetupStatement,
  IRSlotContent,
  IRSlotDeclaration,
  IRSlotPlaceholder,
  IRStateDeclaration,
  IRStaticValue,
  IRSwitch,
  IRSwitchCase,
  IRTargetOverride,
  IRText,
  PrimitiveName,
  PrimitiveUsage,
} from "./ir/nodes.ts";
export type { IRModule } from "./ir/module.ts";

// IR — builders
export type {
  AttributeInit,
  ComponentSkeletonInit,
  ElementInit,
  ExpressionInit,
  ForInit,
  IfInit,
  IRDeclaration,
  SlotContentInit,
  SwitchInit,
} from "./ir/builders.ts";
export {
  createAttribute,
  createComponentSkeleton,
  createDynamicExpression,
  createElement,
  createExpression,
  createFor,
  createFragment,
  createIf,
  createSlotContent,
  createStaticValue,
  createSwitch,
  createText,
} from "./ir/builders.ts";

// IR — visitor
export type { IRVisitor } from "./ir/visit.ts";
export { walkNode, walkRenderTree } from "./ir/visit.ts";

// Scope
export { ReactiveScope } from "./scope.ts";

// Primitives
export type { ImportRecord } from "./primitives.ts";
export {
  collectPrimitiveImports,
  INKLINE_CORE_MODULE,
  isPrimitiveName,
  PRIMITIVE_SET,
  REACTIVE_PRODUCING_PRIMITIVES,
  TRACKING_SCOPE_PRIMITIVES,
  UNTRACK_SCOPE_PRIMITIVES,
} from "./primitives.ts";

// Analyze
export type { DepExtractionContext } from "./analyze/deps.ts";
export { extractDeps, reactDepsArray } from "./analyze/deps.ts";
export type { ReactivityGraph } from "./analyze/graph.ts";
export { buildReactivityGraph } from "./analyze/graph.ts";
export { validateComponent } from "./analyze/validate.ts";

// Parser
export type { CreatedProgram, CreateProgramOptions } from "./parser/program.ts";
export { createSingleFileProgram } from "./parser/program.ts";
export { locOf } from "./parser/source-location.ts";
export type { ComponentDefinitionSite } from "./parser/component.ts";
export { findComponentDefinitions } from "./parser/component.ts";
export { applyDefineComponentOptions } from "./parser/options.ts";
export type { SetupParseContext, SetupParseResult } from "./parser/setup.ts";
export { parseSetupBody } from "./parser/setup.ts";
export type { JSXParseContext } from "./parser/jsx.ts";
export { parseJSXExpression } from "./parser/jsx.ts";
export type { ParseOptions } from "./parser/index.ts";
export { parseModule } from "./parser/index.ts";

// Plugin / Target API
export type { GeneratedFile, GenerateContext, Plugin, PluginHooks, Target } from "./plugin.ts";
export { definePlugin, defineTarget } from "./plugin.ts";

// Top-level orchestration
export type { CompileResult } from "./compile.ts";
export { compile, diagnoseCycles } from "./compile.ts";

// Targets
export { reactTarget } from "./targets/react/index.ts";
export { solidTarget } from "./targets/solid/index.ts";
export type { CodegenScope, PrintExpressionOptions, ReadStyle } from "./targets/print.ts";
export {
  buildCodegenScope,
  printAttrValue,
  printExpression,
  printStaticValue,
} from "./targets/print.ts";
