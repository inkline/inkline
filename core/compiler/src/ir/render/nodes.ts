import type * as ts from "typescript";
import type { SourceLocation } from "../types.ts";
import type { IRDependencySet, SymbolId } from "../reactivity.ts";
import type { TargetName } from "../../codegen/context.ts";

// ── Primitives ──────────────────────────────────────────────────────

export type PrimitiveName =
  | "createSignal"
  | "createMemo"
  | "createEffect"
  | "createRef"
  | "createResource"
  | "createContext"
  | "provide"
  | "useContext"
  | "defineComponent"
  | "onMount"
  | "onCleanup"
  | "untrack"
  | "batch"
  | "defineSlot";

export interface PrimitiveUsage {
  readonly name: PrimitiveName;
  readonly localName: string;
}

// ── Render tree discriminated union ─────────────────────────────────

export type IRNode =
  | IRElement
  | IRComponentInstance
  | IRText
  | IRExprNode
  | IRIf
  | IRFor
  | IRSwitch
  | IRTransition
  | IRSlotPlaceholder
  | IRFragment;

// ── Element ─────────────────────────────────────────────────────────

export interface IRElement {
  readonly kind: "Element";
  readonly tag: string;
  readonly attrs: readonly IRAttribute[];
  readonly events: readonly IREventBinding[];
  readonly refs: readonly IRRefBinding[];
  readonly children: readonly IRNode[];
  readonly isStatic: boolean;
  /** True when this is the component's root and inherits the parent's fallthrough attributes. */
  readonly acceptsAttrFallthrough?: boolean;
  readonly loc: SourceLocation;
}

// ── Component Instance ──────────────────────────────────────────────

export interface IRComponentInstance {
  readonly kind: "ComponentInstance";
  readonly reference: ts.Identifier | ts.PropertyAccessExpression;
  readonly resolved?: {
    readonly module: string | null;
    readonly name: string;
  };
  readonly attrs: readonly IRAttribute[];
  readonly events: readonly IREventBinding[];
  readonly refs: readonly IRRefBinding[];
  readonly slots: readonly IRSlotContent[];
  /** True when this is the component's root and inherits the parent's fallthrough attributes. */
  readonly acceptsAttrFallthrough?: boolean;
  readonly loc: SourceLocation;
}

// ── Text and Expression ─────────────────────────────────────────────

export interface IRText {
  readonly kind: "Text";
  readonly value: string;
  readonly loc: SourceLocation;
}

export interface IRExprNode {
  readonly kind: "Expression";
  readonly expr: ts.Expression;
  readonly raw?: string;
  readonly deps: IRDependencySet;
  readonly isReactive: boolean;
  readonly emissionContext: "template" | "setup";
  readonly isDynamic: boolean;
  readonly loc: SourceLocation;
}

// ── Control flow ────────────────────────────────────────────────────

export interface IRIf {
  readonly kind: "If";
  readonly branches: readonly IRIfBranch[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}

export interface IRIfBranch {
  readonly test: IRExprNode;
  readonly body: IRNode;
}

export interface IRFor {
  readonly kind: "For";
  readonly each: IRExprNode;
  readonly itemBinding: string;
  readonly indexBinding?: string;
  readonly key: IRExprNode;
  readonly syntheticKey?: boolean;
  readonly body: IRNode;
  readonly loc: SourceLocation;
}

export interface IRSwitch {
  readonly kind: "Switch";
  readonly cases: readonly IRSwitchCase[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}

export interface IRSwitchCase {
  readonly test: IRExprNode;
  readonly body: IRNode;
}

// ── Transition ─────────────────────────────────────────────────────

export interface IRTransition {
  readonly kind: "Transition";
  readonly name: string;
  readonly appear: boolean;
  readonly child: IRNode;
  readonly loc: SourceLocation;
}

// ── Slot placeholder and Fragment ───────────────────────────────────

export interface IRSlotPlaceholder {
  readonly kind: "SlotPlaceholder";
  readonly name: string;
  readonly scopedArgs: readonly IRExprNode[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}

export interface IRFragment {
  readonly kind: "Fragment";
  readonly children: readonly IRNode[];
  readonly loc: SourceLocation;
}

// ── Attributes, events, refs ────────────────────────────────────────

export type IRAttributeBinding = "normal" | "class" | "style" | "twoWay";

export interface IRAttribute {
  readonly name: string;
  readonly value: IRStaticValue | IRExprNode;
  readonly binding: IRAttributeBinding;
  readonly loc: SourceLocation;
}

export interface IRStaticValue {
  readonly kind: "Static";
  readonly value: string | number | boolean | null;
  readonly loc: SourceLocation;
}

export interface IREventBinding {
  readonly name: string;
  readonly handler: IRExprNode;
  readonly paramTypes?: readonly (ts.TypeNode | undefined)[];
  readonly loc: SourceLocation;
  readonly synthesized?: boolean;
}

export interface IRRefBinding {
  readonly ref: IRExprNode;
  readonly category: IRRefCategory;
  readonly loc: SourceLocation;
}

export type IRRefCategory = "element" | "component";

// ── Slot content (provided by a parent) ─────────────────────────────

export interface IRSlotContent {
  readonly name: string;
  readonly body: IRNode;
  readonly scopedParams: readonly string[];
  readonly loc: SourceLocation;
}

// ── Component-level declarations ────────────────────────────────────

export interface IRProp {
  readonly name: string;
  readonly typeNode?: ts.TypeNode;
  readonly defaultValue?: IRExprNode;
  readonly required: boolean;
  readonly symbolId?: SymbolId;
  readonly loc: SourceLocation;
}

export interface IRSlotDeclaration {
  readonly name: string;
  readonly isScoped: boolean;
  readonly scopedProps: readonly IRProp[];
  readonly required: boolean;
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}

export interface IREventDeclaration {
  readonly name: string;
  readonly payloadType?: ts.TypeNode;
  readonly loc: SourceLocation;
}

export interface IRStateDeclaration {
  readonly name: string;
  readonly setterName: string;
  readonly initial: IRExprNode;
  readonly typeNode?: ts.TypeNode;
  readonly symbolId: SymbolId;
  readonly setterSymbolId: SymbolId;
  readonly loc: SourceLocation;
}

export interface IRRefDeclaration {
  readonly name: string;
  readonly symbolId: SymbolId;
  readonly category: IRRefCategory;
  readonly elementType?: string;
  readonly loc: SourceLocation;
}

export interface IRMemoDeclaration {
  readonly name: string;
  readonly symbolId: SymbolId;
  readonly expr: IRExprNode;
  readonly loc: SourceLocation;
}

export type IREffectCleanup = "present" | "absent" | "unknown";

export interface IREffectDeclaration {
  readonly body: ts.Expression;
  readonly deps: IRDependencySet;
  readonly cleanup: IREffectCleanup;
  readonly isDynamic: boolean;
  readonly loc: SourceLocation;
}

export interface IRLifecycle {
  readonly onMount: readonly IREffectDeclaration[];
  readonly onCleanup: readonly IREffectDeclaration[];
}

export interface IRSetupStatement {
  readonly stmt: ts.Statement;
  readonly defines: readonly SymbolId[];
  readonly loc: SourceLocation;
}

// ── Context declarations ───────────────────────────────────────────

export interface IRContextDefinition {
  readonly name: string;
  readonly typeText?: string;
  readonly defaultValue?: IRExprNode;
  readonly loc: SourceLocation;
}

export interface IRProvideDeclaration {
  readonly contextRef: ts.Expression;
  readonly contextName: string;
  readonly value: IRExprNode;
  readonly loc: SourceLocation;
}

export interface IRConsumeDeclaration {
  readonly name: string;
  readonly contextRef: ts.Expression;
  readonly contextName: string;
  readonly symbolId: SymbolId;
  readonly loc: SourceLocation;
}

// ── IRComponent and IRModule ────────────────────────────────────────

export interface IRStyleBlock {
  readonly css: string;
  readonly scoped: boolean;
  readonly lang: "css" | "scss" | "less";
  readonly loc: SourceLocation;
}

export interface IRResourceDeclaration {
  readonly name: string;
  readonly fetcher: IRExprNode;
  readonly source?: IRExprNode;
  readonly symbolId: SymbolId;
  /**
   * Local binding names for the resource's meta accessors, present only when the author actually
   * destructured them (e.g. `[data, { loading, error: err }]` → `loadingName: "loading"`,
   * `errorName: "err"`, `refetchName: undefined`). Targets emit only the metas that are bound, so
   * an undestructured `refetch` never becomes an unused variable.
   */
  readonly loadingName?: string;
  readonly errorName?: string;
  readonly refetchName?: string;
  readonly loc: SourceLocation;
}

export type IRRuntimeMode = "client" | "server" | "iso";

export interface IRComponent {
  readonly kind: "Component";
  readonly id: string;
  readonly name: string;
  readonly loc: SourceLocation;
  readonly props: readonly IRProp[];
  readonly propsTypeText?: string;
  readonly slots: readonly IRSlotDeclaration[];
  readonly events: readonly IREventDeclaration[];
  readonly state: readonly IRStateDeclaration[];
  readonly refs: readonly IRRefDeclaration[];
  readonly memos: readonly IRMemoDeclaration[];
  readonly effects: readonly IREffectDeclaration[];
  readonly resources: readonly IRResourceDeclaration[];
  readonly provides: readonly IRProvideDeclaration[];
  readonly consumes: readonly IRConsumeDeclaration[];
  readonly lifecycle: IRLifecycle;
  readonly setup: readonly IRSetupStatement[];
  readonly render: IRNode;
  readonly primitives: readonly PrimitiveUsage[];
  readonly expose?: readonly string[];
  readonly styles: readonly IRStyleBlock[];
  readonly runtime: IRRuntimeMode;
  readonly targetOverrides: Readonly<Partial<Record<TargetName, IRTargetOverride>>>;
  readonly slotBindings?: ReadonlyMap<string, string>;
}

export interface IRTargetOverride {
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly render?: IRNode;
}

export const IR_VERSION = 1;

export interface IRModule {
  readonly version: number;
  readonly fileName: string;
  readonly components: readonly IRComponent[];
  readonly contexts: readonly IRContextDefinition[];
  readonly imports: readonly ts.ImportDeclaration[];
  readonly sourceFile: ts.SourceFile;
}
