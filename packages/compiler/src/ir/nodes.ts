import type * as ts from "typescript";

import type { IRDependencySet } from "./reactivity.ts";
import type { SourceLocation, TargetName } from "./types.ts";

/**
 * Discriminated union of every node that can appear in a component's render
 * tree. Distinct from `ts.Node` — this IR is normalized so per-target
 * generators don't have to re-derive structure from raw JSX.
 */
export type IRNode =
  | IRElement
  | IRComponentInstance
  | IRText
  | IRExpressionNode
  | IRIf
  | IRFor
  | IRSwitch
  | IRSlotPlaceholder
  | IRFragment;

/** Native DOM element (lowercase tag) — `<div>`, `<button>`, etc. */
export interface IRElement {
  kind: "Element";
  tag: string;
  attrs: IRAttribute[];
  events: IREventBinding[];
  refs: IRRefBinding[];
  children: IRNode[];
  /** Whether the entire subtree is static — eligible for template hoisting. */
  isStatic: boolean;
  loc: SourceLocation;
}

/** A `<MyButton>` or `<Foo.Bar>` component invocation. */
export interface IRComponentInstance {
  kind: "ComponentInstance";
  /** The identifier as written in source: <Button/> or <Foo.Bar/>. */
  reference: ts.Identifier | ts.PropertyAccessExpression;
  /** Optional resolution metadata produced when the parser can determine the import origin. */
  resolved?: {
    module: string | null;
    name: string;
  };
  attrs: IRAttribute[];
  events: IREventBinding[];
  slots: IRSlotContent[];
  loc: SourceLocation;
}

/** A literal text run between elements. */
export interface IRText {
  kind: "Text";
  value: string;
  loc: SourceLocation;
}

/**
 * An expression node embedded in JSX or used as an attribute / handler / memo body.
 *
 * Renamed from IRExpression in the architectural blueprint to avoid colliding with
 * the TS compiler's `ts.Expression` in type contexts.
 */
export interface IRExpressionNode {
  kind: "Expression";
  expr: ts.Expression;
  deps: IRDependencySet;
  isReactive: boolean;
  /**
   * Where this expression will ultimately be emitted. Vue cares about this because
   * refs auto-unwrap inside templates but not inside the setup script.
   */
  emissionContext: "template" | "setup";
  /** True when static dep extraction bailed (e.g. dynamic indexed signal access). */
  isDynamic: boolean;
  loc: SourceLocation;
}

/** Single conditional (`<Show>`, ternary, short-circuit). */
export interface IRIf {
  kind: "If";
  branches: IRIfBranch[];
  fallback?: IRNode;
  loc: SourceLocation;
}

export interface IRIfBranch {
  test: IRExpressionNode;
  body: IRNode;
}

/** Iteration (`<For>`, array `.map`). */
export interface IRFor {
  kind: "For";
  /** The iterable expression (post signal-call: `items()`). */
  each: IRExpressionNode;
  itemBinding: string;
  indexBinding?: string;
  /** Track expression — required by IR even if source uses array .map(). */
  key: IRExpressionNode;
  body: IRNode;
  loc: SourceLocation;
}

/** Multi-way conditional (`<Switch>` / `<Match>`). */
export interface IRSwitch {
  kind: "Switch";
  cases: IRSwitchCase[];
  fallback?: IRNode;
  loc: SourceLocation;
}

export interface IRSwitchCase {
  test: IRExpressionNode;
  body: IRNode;
}

/**
 * A render-time placeholder for a named slot, produced when source code
 * invokes `slots.<name>(...)` from inside the setup function's render.
 */
export interface IRSlotPlaceholder {
  kind: "SlotPlaceholder";
  name: string;
  scopedArgs: IRExpressionNode[];
  fallback?: IRNode;
  loc: SourceLocation;
}

/** JSX fragment (`<>...</>`). */
export interface IRFragment {
  kind: "Fragment";
  children: IRNode[];
  loc: SourceLocation;
}

export type IRAttributeBinding = "normal" | "class" | "style" | "twoWay";

export interface IRAttribute {
  name: string;
  value: IRStaticValue | IRExpressionNode;
  binding: IRAttributeBinding;
  loc: SourceLocation;
}

/** A statically known attribute value — string, number, boolean, or null. */
export interface IRStaticValue {
  kind: "Static";
  value: string | number | boolean | null;
  loc: SourceLocation;
}

export interface IREventBinding {
  /** camelCase event name as written in source: onClick, onMouseDown, onChange. */
  name: string;
  handler: IRExpressionNode;
  loc: SourceLocation;
  /**
   * True when the parser synthesized this handler from a `$bind:` attribute
   * (e.g. `(e) => setValue(e.target.value)`). Targets with native two-way
   * binding sugar (Vue's v-model, Svelte's bind:) skip these so the source
   * handler is not double-emitted.
   */
  synthesized?: boolean;
}

export interface IRRefBinding {
  ref: IRExpressionNode;
  loc: SourceLocation;
}

/** Content provided to a component instance for a specific slot. */
export interface IRSlotContent {
  name: string;
  body: IRNode;
  scopedParams: string[];
  loc: SourceLocation;
}

/** Component-level prop declaration. Sourced from options or setup-fn type. */
export interface IRProp {
  name: string;
  /** Original TypeScript type node from defineComponent props declaration. */
  typeNode?: ts.TypeNode;
  defaultValue?: IRExpressionNode;
  required: boolean;
  symbol?: ts.Symbol;
  loc: SourceLocation;
}

/** Component-level slot declaration (the consumer-facing slot contract). */
export interface IRSlotDeclaration {
  name: string;
  isScoped: boolean;
  scopedProps: IRProp[];
  required: boolean;
  fallback?: IRNode;
  loc: SourceLocation;
}

/** Component-level event declaration. */
export interface IREventDeclaration {
  name: string;
  payloadType?: ts.TypeNode;
  loc: SourceLocation;
}

/** Local reactive state (`createSignal` result) — value + setter. */
export interface IRStateDeclaration {
  name: string;
  setterName: string;
  initial: IRExpressionNode;
  typeNode?: ts.TypeNode;
  symbol: ts.Symbol;
  setterSymbol: ts.Symbol;
  loc: SourceLocation;
}

export type IRRefCategory = "element" | "component";

export interface IRRefDeclaration {
  name: string;
  symbol: ts.Symbol;
  category: IRRefCategory;
  /** Element type if statically known: HTMLInputElement, HTMLDivElement, etc. */
  elementType?: string;
  loc: SourceLocation;
}

export interface IRMemoDeclaration {
  name: string;
  symbol: ts.Symbol;
  expr: IRExpressionNode;
  loc: SourceLocation;
}

export type IREffectCleanup = "present" | "absent" | "unknown";

export interface IREffectDeclaration {
  /** The () => { ... } body passed to createEffect. */
  body: ts.Expression;
  deps: IRDependencySet;
  cleanup: IREffectCleanup;
  isDynamic: boolean;
  loc: SourceLocation;
}

export interface IRLifecycle {
  onMount: IREffectDeclaration[];
  onCleanup: IREffectDeclaration[];
}

export interface IRSetupStatement {
  /** A setup-phase TS statement: variable declaration, expression statement, etc. */
  stmt: ts.Statement;
  /** Reactive symbols introduced by this statement, if any. */
  defines: ts.Symbol[];
  loc: SourceLocation;
}

/**
 * The closed set of primitive identifiers Inkline source may import from
 * `@inkline/core`. Anything outside this set is treated as user code.
 */
export type PrimitiveName =
  | "createSignal"
  | "createMemo"
  | "createEffect"
  | "createRef"
  | "defineComponent"
  | "defineSlot"
  | "untrack"
  | "batch"
  | "onMount"
  | "onCleanup"
  | "$bind"
  | "$on"
  | "$if"
  | "$for";

export interface PrimitiveUsage {
  primitive: PrimitiveName;
  loc: SourceLocation;
}

export interface IRTargetOverride {
  /** Free-form per-target metadata, populated from useMetadata-like APIs. */
  metadata?: Record<string, unknown>;
  /** Replacement render tree for this target, if the author overrode it. */
  render?: IRNode;
}

/**
 * The fully analyzed IR for a single component definition. `state`, `memos`,
 * `effects`, and `lifecycle` form the reactivity graph; `render` is the pure
 * render tree consumed by per-target generators.
 */
export interface IRComponent {
  kind: "Component";
  /** Stable identifier — typically `${file}#${name}`. */
  id: string;
  name: string;
  loc: SourceLocation;
  props: IRProp[];
  slots: IRSlotDeclaration[];
  events: IREventDeclaration[];
  state: IRStateDeclaration[];
  refs: IRRefDeclaration[];
  memos: IRMemoDeclaration[];
  effects: IREffectDeclaration[];
  lifecycle: IRLifecycle;
  setup: IRSetupStatement[];
  render: IRNode;
  primitives: PrimitiveUsage[];
  targetOverrides: Partial<Record<TargetName, IRTargetOverride>>;
}
