import type * as ts from "typescript";
import { UNKNOWN_LOCATION, type SourceLocation } from "../types.ts";
import { DYNAMIC_DEPS, type IRDependencySet } from "../reactivity.ts";
import type {
  IRAttribute,
  IRAttributeBinding,
  IRComponentInstance,
  IRElement,
  IREventBinding,
  IRExprNode,
  IRFor,
  IRFragment,
  IRIf,
  IRIfBranch,
  IRNode,
  IRRefBinding,
  IRSlotContent,
  IRSlotPlaceholder,
  IRStaticValue,
  IRSwitch,
  IRSwitchCase,
  IRText,
  IRTransition,
} from "./nodes.ts";

export function createComponentInstance(init: {
  reference: ts.Identifier | ts.PropertyAccessExpression;
  resolved?: { readonly module: string | null; readonly name: string };
  attrs?: readonly IRAttribute[];
  events?: readonly IREventBinding[];
  refs?: readonly IRRefBinding[];
  slots?: readonly IRSlotContent[];
  acceptsAttrFallthrough?: boolean;
  loc?: SourceLocation;
}): IRComponentInstance {
  return {
    kind: "ComponentInstance",
    reference: init.reference,
    resolved: init.resolved,
    attrs: init.attrs ?? [],
    events: init.events ?? [],
    refs: init.refs ?? [],
    slots: init.slots ?? [],
    acceptsAttrFallthrough: init.acceptsAttrFallthrough,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export function createElement(init: {
  tag: string;
  attrs?: readonly IRAttribute[];
  events?: readonly IREventBinding[];
  refs?: readonly IRRefBinding[];
  children?: readonly IRNode[];
  acceptsAttrFallthrough?: boolean;
  loc?: SourceLocation;
}): IRElement {
  return {
    kind: "Element",
    tag: init.tag,
    attrs: init.attrs ?? [],
    events: init.events ?? [],
    refs: init.refs ?? [],
    children: init.children ?? [],
    isStatic: false,
    acceptsAttrFallthrough: init.acceptsAttrFallthrough,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export function createText(init: { value: string; loc?: SourceLocation }): IRText {
  return {
    kind: "Text",
    value: init.value,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export function createExpr(init: {
  expr: ts.Expression;
  deps?: IRDependencySet;
  isReactive?: boolean;
  emissionContext?: "template" | "setup";
  isDynamic?: boolean;
  loc?: SourceLocation;
}): IRExprNode {
  return {
    kind: "Expression",
    expr: init.expr,
    deps: init.deps ?? DYNAMIC_DEPS,
    isReactive: init.isReactive ?? false,
    emissionContext: init.emissionContext ?? "template",
    isDynamic: init.isDynamic ?? false,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export function createIf(init: {
  branches: readonly IRIfBranch[];
  fallback?: IRNode;
  loc?: SourceLocation;
}): IRIf {
  return {
    kind: "If",
    branches: init.branches,
    fallback: init.fallback,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export function createFor(init: {
  each: IRExprNode;
  itemBinding: string;
  indexBinding?: string;
  key: IRExprNode;
  body: IRNode;
  loc?: SourceLocation;
}): IRFor {
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

export function createSwitch(init: {
  cases: readonly IRSwitchCase[];
  fallback?: IRNode;
  loc?: SourceLocation;
}): IRSwitch {
  return {
    kind: "Switch",
    cases: init.cases,
    fallback: init.fallback,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export function createTransition(init: {
  name?: string;
  appear?: boolean;
  child: IRNode;
  loc?: SourceLocation;
}): IRTransition {
  return {
    kind: "Transition",
    name: init.name ?? "ink",
    appear: init.appear ?? false,
    child: init.child,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export function createSlotPlaceholder(init: {
  name?: string;
  scopedArgs?: readonly IRExprNode[];
  fallback?: IRNode;
  loc?: SourceLocation;
}): IRSlotPlaceholder {
  return {
    kind: "SlotPlaceholder",
    name: init.name ?? "default",
    scopedArgs: init.scopedArgs ?? [],
    fallback: init.fallback,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export function createFragment(init: {
  children: readonly IRNode[];
  loc?: SourceLocation;
}): IRFragment {
  return {
    kind: "Fragment",
    children: init.children,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export function createAttribute(init: {
  name: string;
  value: IRStaticValue | IRExprNode;
  binding?: IRAttributeBinding;
  loc?: SourceLocation;
}): IRAttribute {
  return {
    name: init.name,
    value: init.value,
    binding: init.binding ?? "normal",
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}

export function createStaticValue(init: {
  value: string | number | boolean | null;
  loc?: SourceLocation;
}): IRStaticValue {
  return {
    kind: "Static",
    value: init.value,
    loc: init.loc ?? UNKNOWN_LOCATION,
  };
}
