/**
 * `@inkline/compiler/ir` — the render intermediate representation.
 *
 * For plugin authors. The `ir:post` hook hands you an `AnalyzedModule`; everything you need to
 * read, walk, rewrite, serialize, or migrate what is inside it lives here.
 *
 * Stability: these names moved off the root in the same change that first published the package,
 * so nothing here is a break. They are supported, but they track the IR — `IR_VERSION` and the
 * migration registry exist because the IR shape does change between versions.
 *
 * Compiling, configuring, diagnostics, and `definePlugin` stay at `@inkline/compiler`.
 */

// ============ RENDER TREE TYPES ============
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
} from "./render/nodes.ts";
export { IR_VERSION } from "./render/nodes.ts";

// Re-exported from the root so an IR consumer annotating `node.loc` needs one import, not two.
export type { SourceLocation } from "./types.ts";

// ============ MIGRATION ============
export { migrate, registerMigration, type IRMigration } from "./migration.ts";

// ============ SERIALIZATION ============
export { serializeModule, deserializeModule } from "./serialize.ts";

// ============ BUILDERS ============
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
} from "./render/builders.ts";

// ============ VISITORS ============
export type { IRVisitor } from "./render/visit.ts";
export { walkRenderTree, walkNode } from "./render/visit.ts";
export type { IRTransformer } from "./render/transform.ts";
export { SKIP, transform, transformComponent } from "./render/transform.ts";

// ============ REACTIVITY ============
export type {
  SymbolId,
  IRReactiveKind,
  IRReactiveSymbol,
  IRDependency,
  IRDependencySet,
} from "./reactivity.ts";
export { SymbolTable } from "./reactivity.ts";
// `AnalyzedModule.graphs` is a `ReadonlyMap<string, ReactivityGraph>`. Without this export a
// plugin author cannot name the type of a field the `ir:post` hook hands them.
export type { ReactivityGraph } from "../pipeline/passes/04-analyze/graph.ts";

// ============ PIPELINE PRIMITIVES ============
// A `Pass` is a step over the IR, so the pass primitives sit with the IR rather than on the root,
// where they were indistinguishable from the entry points.
export type { Pass, PassContext } from "../pipeline/types.ts";
export { pipe } from "../pipeline/types.ts";
