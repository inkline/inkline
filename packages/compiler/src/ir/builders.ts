import type * as ts from "typescript";

import type {
  IRAttribute,
  IRAttributeBinding,
  IRComponent,
  IREffectDeclaration,
  IRElement,
  IREventBinding,
  IRFor,
  IRFragment,
  IRIf,
  IRIfBranch,
  IRMemoDeclaration,
  IRNode,
  IRRefBinding,
  IRSlotContent,
  IRStateDeclaration,
  IRStaticValue,
  IRSwitch,
  IRSwitchCase,
  IRText,
} from "./nodes.ts";
import { type IRDepResolution, DYNAMIC_DEPS } from "./reactivity.ts";
import { type IRExpressionNode } from "./nodes.ts";
import { type SourceLocation, UNKNOWN_LOCATION } from "./types.ts";

export interface ExpressionInit {
  expr: ts.Expression;
  resolution?: IRDepResolution;
  emissionContext?: "template" | "setup";
  loc?: SourceLocation;
}

/**
 * Build an `IRExpressionNode` from a TS expression and an optional
 * pre-computed dep resolution. Defaults: empty deps, non-reactive,
 * non-dynamic, emission context `setup`, location `UNKNOWN_LOCATION`.
 */
export function createExpression(init: ExpressionInit): IRExpressionNode {
  const resolution = init.resolution;
  return {
    kind: "Expression",
    expr: init.expr,
    deps: resolution?.deps ?? Object.freeze([]),
    isReactive: resolution?.isReactive ?? false,
    isDynamic: resolution?.isDynamic ?? false,
    emissionContext: init.emissionContext ?? "setup",
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

/**
 * Convenience for the dynamic-bail path: an expression whose deps cannot be
 * resolved statically. Marks `isReactive` + `isDynamic`, with the shared
 * frozen `DYNAMIC_DEPS` sentinel.
 */
export function createDynamicExpression(
  expr: ts.Expression,
  loc: SourceLocation = UNKNOWN_LOCATION,
): IRExpressionNode {
  return {
    kind: "Expression",
    expr,
    deps: DYNAMIC_DEPS,
    isReactive: true,
    isDynamic: true,
    emissionContext: "setup",
    loc,
  };
}

export function createStaticValue(
  value: IRStaticValue["value"],
  loc: SourceLocation = UNKNOWN_LOCATION,
): IRStaticValue {
  return {
    kind: "Static",
    value,
    loc,
  };
}

export function createText(value: string, loc: SourceLocation = UNKNOWN_LOCATION): IRText {
  return {
    kind: "Text",
    value,
    loc,
  };
}

export interface ElementInit {
  tag: string;
  attrs?: IRAttribute[];
  events?: IREventBinding[];
  refs?: IRRefBinding[];
  children?: IRNode[];
  isStatic?: boolean;
  loc?: SourceLocation;
}

/**
 * Build an `IRElement`. If `isStatic` is omitted, it is inferred from the
 * static-ness of children + attrs (no expression-valued fields anywhere in
 * the subtree).
 */
export function createElement(init: ElementInit): IRElement {
  const children = init.children ?? [];
  const attrs = init.attrs ?? [];
  return {
    kind: "Element",
    tag: init.tag,
    attrs,
    events: init.events ?? [],
    refs: init.refs ?? [],
    children,
    isStatic: init.isStatic ?? isStaticTree(children, attrs),
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export interface AttributeInit {
  name: string;
  value: IRStaticValue | IRExpressionNode;
  binding?: IRAttributeBinding;
  loc?: SourceLocation;
}

export function createAttribute(init: AttributeInit): IRAttribute {
  return {
    name: init.name,
    value: init.value,
    binding: init.binding ?? "normal",
    loc: init.loc ?? init.value.loc,
  };
}

export function createFragment(
  children: IRNode[],
  loc: SourceLocation = UNKNOWN_LOCATION,
): IRFragment {
  return {
    kind: "Fragment",
    children,
    loc,
  };
}

export interface IfInit {
  branches: IRIfBranch[];
  fallback?: IRNode;
  loc?: SourceLocation;
}

export function createIf(init: IfInit): IRIf {
  return {
    kind: "If",
    branches: init.branches,
    fallback: init.fallback,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export interface ForInit {
  each: IRExpressionNode;
  itemBinding: string;
  indexBinding?: string;
  key: IRExpressionNode;
  body: IRNode;
  loc?: SourceLocation;
}

export function createFor(init: ForInit): IRFor {
  return {
    kind: "For",
    each: init.each,
    itemBinding: init.itemBinding,
    indexBinding: init.indexBinding,
    key: init.key,
    body: init.body,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export interface SwitchInit {
  cases: IRSwitchCase[];
  fallback?: IRNode;
  loc?: SourceLocation;
}

export function createSwitch(init: SwitchInit): IRSwitch {
  return {
    kind: "Switch",
    cases: init.cases,
    fallback: init.fallback,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export interface SlotContentInit {
  name?: string;
  body: IRNode;
  scopedParams?: string[];
  loc?: SourceLocation;
}

export function createSlotContent(init: SlotContentInit): IRSlotContent {
  return {
    name: init.name ?? "default",
    body: init.body,
    scopedParams: init.scopedParams ?? [],
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export interface ComponentSkeletonInit {
  id: string;
  name: string;
  render: IRNode;
  loc?: SourceLocation;
}

/**
 * Produce an IRComponent skeleton with empty collections — useful for tests
 * and for the parser to populate progressively.
 */
export function createComponentSkeleton(init: ComponentSkeletonInit): IRComponent {
  return {
    kind: "Component",
    id: init.id,
    name: init.name,
    loc: init.loc ?? UNKNOWN_LOCATION,
    props: [],
    slots: [],
    events: [],
    state: [],
    refs: [],
    memos: [],
    effects: [],
    lifecycle: {
      onMount: [],
      onCleanup: [],
    },
    setup: [],
    render: init.render,
    primitives: [],
    targetOverrides: {},
  };
}

/**
 * Union of declaration kinds that share a `symbol` field — exported as a
 * convenience for plugins that want to handle them uniformly.
 */
export type IRDeclaration = IRStateDeclaration | IRMemoDeclaration | IREffectDeclaration;

function isStaticTree(children: IRNode[], attrs: IRAttribute[]): boolean {
  for (const attr of attrs) {
    if (attr.value.kind !== "Static") return false;
  }
  for (const child of children) {
    if (!isStaticNode(child)) return false;
  }
  return true;
}

function isStaticNode(node: IRNode): boolean {
  switch (node.kind) {
    case "Text":
      return true;
    case "Element":
      return node.isStatic;
    case "Fragment":
      return node.children.every(isStaticNode);
    default:
      return false;
  }
}
