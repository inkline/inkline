import * as ts from "typescript";

import { extractDeps } from "../analyze/deps.ts";
import {
  createAttribute,
  createElement,
  createExpression,
  createFor,
  createFragment,
  createIf,
  createSlotContent,
  createStaticValue,
  createSwitch,
  createText,
} from "../ir/builders.ts";
import type {
  IRAttribute,
  IRAttributeBinding,
  IRComponentInstance,
  IREventBinding,
  IRExpressionNode,
  IRFor,
  IRIf,
  IRIfBranch,
  IRNode,
  IRRefBinding,
  IRSlotContent,
  IRSlotPlaceholder,
  IRStaticValue,
  IRSwitch,
  IRSwitchCase,
} from "../ir/nodes.ts";
import { UNKNOWN_LOCATION, type Diagnostic, type SourceLocation } from "../ir/types.ts";
import type { ReactiveScope } from "../scope.ts";

import { locOf } from "./source-location.ts";

/** Inputs the JSX parser needs to produce IR. */
export interface JSXParseContext {
  scope: ReactiveScope;
  checker: ts.TypeChecker;
  sourceFile: ts.SourceFile;
  /** Symbol of the setup function's `slots` parameter (if any). */
  slotsSymbol?: ts.Symbol;
  /** Diagnostic sink (parser-level diagnostics surface here). */
  diagnostics?: Diagnostic[];
}

/**
 * Parse any JSX-shaped TS expression into an IR node. The entrypoint
 * dispatches on the expression kind:
 *
 *   - `JsxElement` / `JsxSelfClosingElement` -> Element / ComponentInstance.
 *     Components named `Show`, `For`, or `Switch` lower to control-flow IR.
 *   - `JsxFragment` -> Fragment.
 *   - `ParenthesizedExpression` -> recurse on the inner expression.
 *   - Anything else -> the expression branch (ternary / && / .map / slots
 *     calls get lowered; everything else becomes an `IRExpressionNode`
 *     with the analyzer's resolution attached).
 */
export function parseJSXExpression(expr: ts.Expression, ctx: JSXParseContext): IRNode {
  if (ts.isJsxElement(expr)) return parseJsxElement(expr, ctx);
  if (ts.isJsxSelfClosingElement(expr)) return parseJsxSelfClosing(expr, ctx);
  if (ts.isJsxFragment(expr)) return parseJsxFragment(expr, ctx);
  if (ts.isParenthesizedExpression(expr)) return parseJSXExpression(expr.expression, ctx);
  return parseJsxEmbeddedExpression(expr, ctx);
}

// ---------- JSX shapes ------------------------------------------------------

function parseJsxElement(node: ts.JsxElement, ctx: JSXParseContext): IRNode {
  const opening = node.openingElement;
  const tagName = opening.tagName;
  const children = parseJsxChildren(node.children, ctx);
  const loc = locOf(node, ctx.sourceFile);
  if (isComponentTag(tagName)) {
    return parseComponentInstance(tagName, opening.attributes, children, loc, ctx);
  }
  return parseDomElement(tagName, opening.attributes, children, loc, ctx);
}

function parseJsxSelfClosing(node: ts.JsxSelfClosingElement, ctx: JSXParseContext): IRNode {
  const loc = locOf(node, ctx.sourceFile);
  if (isComponentTag(node.tagName)) {
    return parseComponentInstance(node.tagName, node.attributes, [], loc, ctx);
  }
  return parseDomElement(node.tagName, node.attributes, [], loc, ctx);
}

function parseJsxFragment(node: ts.JsxFragment, ctx: JSXParseContext): IRNode {
  return createFragment(parseJsxChildren(node.children, ctx), locOf(node, ctx.sourceFile));
}

function parseJsxChildren(children: ts.NodeArray<ts.JsxChild>, ctx: JSXParseContext): IRNode[] {
  const out: IRNode[] = [];
  for (const child of children) {
    if (ts.isJsxText(child)) {
      const text = child.text;
      // Drop whitespace-only newlines between elements; they're layout artifacts.
      if (text.trim().length === 0 && /\n/.test(text)) continue;
      out.push(createText(text, locOf(child, ctx.sourceFile)));
      continue;
    }
    if (ts.isJsxExpression(child)) {
      if (!child.expression) continue;
      out.push(parseJSXExpression(child.expression, ctx));
      continue;
    }
    if (ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child) || ts.isJsxFragment(child)) {
      out.push(parseJSXExpression(child, ctx));
    }
  }
  return out;
}

function parseDomElement(
  tagName: ts.JsxTagNameExpression,
  attrs: ts.JsxAttributes,
  children: IRNode[],
  loc: SourceLocation,
  ctx: JSXParseContext,
): IRNode {
  const tag = ts.isIdentifier(tagName) ? tagName.text : tagName.getText(ctx.sourceFile);
  const { attributes, events, refs } = parseAttributes(tag, attrs, ctx);
  return createElement({
    tag,
    attrs: attributes,
    events,
    refs,
    children,
    loc,
  });
}

function parseComponentInstance(
  tagName: ts.JsxTagNameExpression,
  attrs: ts.JsxAttributes,
  children: IRNode[],
  loc: SourceLocation,
  ctx: JSXParseContext,
): IRNode {
  const componentName = ts.isIdentifier(tagName) ? tagName.text : null;
  // Recognised control-flow components lower to dedicated IR shapes.
  if (componentName === "Show") return lowerShow(attrs, children, loc, ctx);
  if (componentName === "For") return lowerFor(attrs, children, loc, ctx);
  if (componentName === "Switch") return lowerSwitch(attrs, children, loc, ctx);

  const { attributes, events } = parseAttributes(componentName ?? "<component>", attrs, ctx);
  let reference: ts.Identifier | ts.PropertyAccessExpression;
  if (ts.isIdentifier(tagName)) {
    reference = tagName;
  } else if (ts.isPropertyAccessExpression(tagName)) {
    reference = tagName;
  } else {
    reference = ts.factory.createIdentifier(tagName.getText(ctx.sourceFile));
  }
  const slots: IRSlotContent[] = collectComponentSlots(attributes, children, loc);
  // Strip slot-prop-shaped attributes (those whose values are JSX subtrees) —
  // they've been lifted into named slots above.
  const remainingAttrs = attributes.filter(
    (a) => !isSlotPropAttribute(a.value, attributes, a.name),
  );
  const ci: IRComponentInstance = {
    kind: "ComponentInstance",
    reference,
    attrs: remainingAttrs,
    events,
    slots,
    loc,
  };
  return ci;
}

/**
 * Slot content lifting. JSX children become a `default` slot (when present);
 * any attribute whose value is a JSX subtree is lifted to a named slot.
 */
function collectComponentSlots(
  attrs: IRAttribute[],
  children: IRNode[],
  loc: SourceLocation,
): IRSlotContent[] {
  const slots: IRSlotContent[] = [];
  for (const attr of attrs) {
    if (isSlotPropAttribute(attr.value, attrs, attr.name)) {
      // The expression was the JSX content — lift it as a named slot.
      const exprValue = attr.value as IRExpressionNode;
      // We synthesize an IR body by re-parsing the JSX would require ctx; for
      // the slot-prop pattern, the IR expression node itself acts as the body
      // since downstream targets simply re-render the expression.
      slots.push(
        createSlotContent({
          name: attr.name,
          body: exprValue,
          loc: attr.loc,
        }),
      );
    }
  }
  if (children.length > 0) {
    slots.push(
      createSlotContent({
        name: "default",
        body: children.length === 1 ? children[0]! : createFragment(children, loc),
        loc,
      }),
    );
  }
  return slots;
}

function isSlotPropAttribute(
  value: IRAttribute["value"],
  _attrs: IRAttribute[],
  _name: string,
): boolean {
  if (value.kind !== "Expression") return false;
  // A slot-prop attribute carries a JSX-like expression value.
  const expr = value.expr;
  return (
    ts.isJsxElement(expr) ||
    ts.isJsxSelfClosingElement(expr) ||
    ts.isJsxFragment(expr) ||
    isJsxParens(expr)
  );
}

function isJsxParens(expr: ts.Expression): boolean {
  if (!ts.isParenthesizedExpression(expr)) return false;
  const inner = expr.expression;
  return ts.isJsxElement(inner) || ts.isJsxSelfClosingElement(inner) || ts.isJsxFragment(inner);
}

// ---------- Control flow lowering ------------------------------------------

function lowerShow(
  attrs: ts.JsxAttributes,
  children: IRNode[],
  loc: SourceLocation,
  ctx: JSXParseContext,
): IRIf {
  const props = readAttrExpressions(attrs, ctx);
  const test =
    props.get("when") ??
    createExpression({ expr: ts.factory.createTrue(), loc, emissionContext: "setup" });
  const fallback = props.get("fallback");
  const body = children.length === 1 ? children[0]! : createFragment(children, loc);
  const branches: IRIfBranch[] = [{ test, body }];
  return createIf({ branches, fallback, loc });
}

function lowerFor(
  attrs: ts.JsxAttributes,
  children: IRNode[],
  loc: SourceLocation,
  ctx: JSXParseContext,
): IRFor | IRExpressionNode {
  const props = readAttrExpressions(attrs, ctx);
  const each = props.get("each");
  if (!each) return synthesizeNullExpression(loc, ctx);
  // Children in <For> are expected to be a callback `{(item) => <Foo/>}`.
  // The first child that is an Expression with an arrow function is the body fn.
  let body: IRNode | null = null;
  let itemBinding = "item";
  let indexBinding: string | undefined;
  let key: IRExpressionNode | null = null;
  for (const child of children) {
    if (child.kind !== "Expression") continue;
    const inner = child.expr;
    if (!ts.isArrowFunction(inner) && !ts.isFunctionExpression(inner)) continue;
    const params = inner.parameters;
    if (params.length >= 1 && ts.isIdentifier(params[0]!.name)) {
      itemBinding = params[0]!.name.text;
    }
    if (params.length >= 2 && ts.isIdentifier(params[1]!.name)) {
      indexBinding = params[1]!.name.text;
    }
    const bodyExpr = ts.isBlock(inner.body) ? findReturnExpression(inner.body) : inner.body;
    if (bodyExpr) {
      body = parseJSXExpression(bodyExpr, ctx);
      key = extractKeyFromJsx(bodyExpr, ctx) ?? null;
    }
    break;
  }
  if (!body) return synthesizeNullExpression(loc, ctx);
  if (!key) {
    pushDiagnostic(ctx, {
      code: "INK0050",
      severity: "warning",
      message:
        "<For each={...}> body is missing a `key` prop on its root JSX element. Iteration is not keyed.",
      loc,
    });
    key = createExpression({ expr: ts.factory.createIdentifier(itemBinding), loc });
  }
  return createFor({ each, itemBinding, indexBinding, key, body, loc });
}

function lowerSwitch(
  attrs: ts.JsxAttributes,
  children: IRNode[],
  loc: SourceLocation,
  ctx: JSXParseContext,
): IRSwitch {
  const props = readAttrExpressions(attrs, ctx);
  const fallback = props.get("fallback");
  const cases: IRSwitchCase[] = [];
  for (const child of children) {
    // <Match when={...}>body</Match> parsed already as a ComponentInstance.
    if (child.kind !== "ComponentInstance") continue;
    const matchName = ts.isIdentifier(child.reference) ? child.reference.text : null;
    if (matchName !== "Match") continue;
    const whenAttr = child.attrs.find((a) => a.name === "when");
    const test =
      whenAttr && whenAttr.value.kind === "Expression"
        ? whenAttr.value
        : createExpression({ expr: ts.factory.createFalse(), loc, emissionContext: "setup" });
    const slot = child.slots.find((s) => s.name === "default") ?? child.slots[0];
    const body = slot ? slot.body : createFragment([], loc);
    cases.push({ test, body });
  }
  return createSwitch({ cases, fallback, loc });
}

/** Produce a placeholder expression IR for a control-flow lowering that bailed. */
function synthesizeNullExpression(loc: SourceLocation, _ctx: JSXParseContext): IRExpressionNode {
  return createExpression({
    expr: ts.factory.createNull(),
    loc,
    emissionContext: "template",
  });
}

function readAttrExpressions(
  attrs: ts.JsxAttributes,
  ctx: JSXParseContext,
): Map<string, IRExpressionNode> {
  const out = new Map<string, IRExpressionNode>();
  for (const a of attrs.properties) {
    if (!ts.isJsxAttribute(a)) continue;
    const nameNode = a.name;
    const name = ts.isIdentifier(nameNode) ? nameNode.text : null;
    if (!name) continue;
    const value = a.initializer;
    if (!value || !ts.isJsxExpression(value) || !value.expression) continue;
    out.set(name, makeExpression(value.expression, ctx, name === "when" ? "setup" : "template"));
  }
  return out;
}

function extractKeyFromJsx(expr: ts.Expression, ctx: JSXParseContext): IRExpressionNode | null {
  let inner: ts.Expression = expr;
  if (ts.isParenthesizedExpression(inner)) inner = inner.expression;
  let attrs: ts.JsxAttributes | null = null;
  if (ts.isJsxElement(inner)) attrs = inner.openingElement.attributes;
  if (ts.isJsxSelfClosingElement(inner)) attrs = inner.attributes;
  if (!attrs) return null;
  for (const a of attrs.properties) {
    if (!ts.isJsxAttribute(a)) continue;
    const name = a.name;
    if (!ts.isIdentifier(name)) continue;
    if (name.text !== "key") continue;
    if (!a.initializer || !ts.isJsxExpression(a.initializer) || !a.initializer.expression) {
      continue;
    }
    return makeExpression(a.initializer.expression, ctx, "setup");
  }
  return null;
}

function findReturnExpression(block: ts.Block): ts.Expression | null {
  for (const stmt of block.statements) {
    if (ts.isReturnStatement(stmt) && stmt.expression) return stmt.expression;
  }
  return null;
}

// ---------- Embedded `{...}` expressions ----------------------------------

function parseJsxEmbeddedExpression(expr: ts.Expression, ctx: JSXParseContext): IRNode {
  if (ts.isConditionalExpression(expr)) {
    const lowered = tryLowerTernary(expr, ctx);
    if (lowered) return lowered;
  }
  if (
    ts.isBinaryExpression(expr) &&
    expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
  ) {
    const lowered = tryLowerShortCircuit(expr, ctx);
    if (lowered) return lowered;
  }
  if (ts.isCallExpression(expr) && isMapCall(expr)) {
    const lowered = tryLowerMap(expr, ctx);
    if (lowered) return lowered;
  }
  if (ctx.slotsSymbol && ts.isCallExpression(expr) && isSlotsCall(expr, ctx)) {
    return lowerSlotPlaceholder(expr, ctx);
  }
  return makeExpression(expr, ctx, "template");
}

function tryLowerTernary(expr: ts.ConditionalExpression, ctx: JSXParseContext): IRIf | null {
  if (!isJsxLike(expr.whenTrue) && !isJsxLike(expr.whenFalse)) return null;
  const loc = locOf(expr, ctx.sourceFile);
  return createIf({
    branches: [
      {
        test: makeExpression(expr.condition, ctx, "setup"),
        body: parseJSXExpression(expr.whenTrue, ctx),
      },
    ],
    fallback: parseJSXExpression(expr.whenFalse, ctx),
    loc,
  });
}

function tryLowerShortCircuit(expr: ts.BinaryExpression, ctx: JSXParseContext): IRIf | null {
  if (!isJsxLike(expr.right)) return null;
  const loc = locOf(expr, ctx.sourceFile);
  return createIf({
    branches: [
      {
        test: makeExpression(expr.left, ctx, "setup"),
        body: parseJSXExpression(expr.right, ctx),
      },
    ],
    loc,
  });
}

function tryLowerMap(call: ts.CallExpression, ctx: JSXParseContext): IRFor | null {
  const callee = call.expression as ts.PropertyAccessExpression;
  const each = makeExpression(callee.expression, ctx, "setup");
  const arg = call.arguments[0];
  if (!arg || (!ts.isArrowFunction(arg) && !ts.isFunctionExpression(arg))) return null;
  const params = arg.parameters;
  if (params.length === 0 || !ts.isIdentifier(params[0]!.name)) return null;
  const itemBinding = params[0]!.name.text;
  let indexBinding: string | undefined;
  if (params.length >= 2 && ts.isIdentifier(params[1]!.name)) {
    indexBinding = params[1]!.name.text;
  }
  const bodyExpr = ts.isBlock(arg.body) ? findReturnExpression(arg.body) : arg.body;
  if (!bodyExpr || !isJsxLike(bodyExpr)) return null;
  const key = extractKeyFromJsx(bodyExpr, ctx);
  const loc = locOf(call, ctx.sourceFile);
  if (!key) {
    pushDiagnostic(ctx, {
      code: "INK0050",
      severity: "warning",
      message:
        "Array .map(...) returning JSX is missing a `key` prop on its root JSX element. Iteration is not keyed.",
      loc,
    });
    return null;
  }
  return createFor({
    each,
    itemBinding,
    indexBinding,
    key,
    body: parseJSXExpression(bodyExpr, ctx),
    loc,
  });
}

function lowerSlotPlaceholder(call: ts.CallExpression, ctx: JSXParseContext): IRSlotPlaceholder {
  const callee = call.expression as ts.PropertyAccessExpression;
  const slotName = callee.name.text;
  const scopedArgs = call.arguments.map((arg) => makeExpression(arg, ctx, "template"));
  return {
    kind: "SlotPlaceholder",
    name: slotName,
    scopedArgs,
    loc: locOf(call, ctx.sourceFile),
  };
}

// ---------- Helpers --------------------------------------------------------

function makeExpression(
  expr: ts.Expression,
  ctx: JSXParseContext,
  emissionContext: "template" | "setup",
): IRExpressionNode {
  return createExpression({
    expr,
    resolution: extractDeps(expr, { scope: ctx.scope, checker: ctx.checker }),
    emissionContext,
    loc: locOf(expr, ctx.sourceFile),
  });
}

function isComponentTag(tagName: ts.JsxTagNameExpression): boolean {
  if (ts.isPropertyAccessExpression(tagName)) return true;
  if (ts.isIdentifier(tagName)) {
    const first = tagName.text[0];
    return Boolean(first && first === first.toUpperCase() && first !== first.toLowerCase());
  }
  return false;
}

function isJsxLike(expr: ts.Expression): boolean {
  if (ts.isParenthesizedExpression(expr)) return isJsxLike(expr.expression);
  return ts.isJsxElement(expr) || ts.isJsxSelfClosingElement(expr) || ts.isJsxFragment(expr);
}

function isMapCall(call: ts.CallExpression): boolean {
  const callee = call.expression;
  return ts.isPropertyAccessExpression(callee) && callee.name.text === "map";
}

function isSlotsCall(call: ts.CallExpression, ctx: JSXParseContext): boolean {
  const callee = call.expression;
  if (!ts.isPropertyAccessExpression(callee)) return false;
  const sym = ctx.checker.getSymbolAtLocation(callee.expression);
  if (!sym) return false;
  return sym === ctx.slotsSymbol;
}

function pushDiagnostic(ctx: JSXParseContext, diag: Diagnostic): void {
  if (!ctx.diagnostics) return;
  ctx.diagnostics.push(diag);
}

function parseAttributes(
  tag: string,
  attrs: ts.JsxAttributes,
  ctx: JSXParseContext,
): {
  attributes: IRAttribute[];
  events: IREventBinding[];
  refs: IRRefBinding[];
} {
  const attributes: IRAttribute[] = [];
  const events: IREventBinding[] = [];
  const refs: IRRefBinding[] = [];
  for (const attr of attrs.properties) {
    if (!ts.isJsxAttribute(attr)) continue;
    const name = attr.name;
    const nameText = ts.isIdentifier(name) ? name.text : `${name.namespace.text}:${name.name.text}`;
    const loc = locOf(attr, ctx.sourceFile);
    if (nameText === "ref") {
      const value = parseAttributeValue(attr.initializer, ctx, "setup");
      if (value && value.kind === "Expression") {
        refs.push({ ref: value, loc });
      }
      continue;
    }
    if (isEventName(nameText)) {
      const handler = parseAttributeValue(attr.initializer, ctx, "setup");
      if (handler && handler.kind === "Expression") {
        events.push({ name: nameText, handler, loc });
      }
      continue;
    }
    const binding = classifyBinding(nameText);
    const expressionContext = binding === "twoWay" ? "setup" : "template";
    const cleanedName = binding === "twoWay" ? stripBindPrefix(nameText) : nameText;
    const value = parseAttributeValue(attr.initializer, ctx, expressionContext);
    if (!value) {
      attributes.push(
        createAttribute({
          name: cleanedName,
          value: createStaticValue(true, loc),
          binding,
          loc,
        }),
      );
      continue;
    }
    attributes.push(createAttribute({ name: cleanedName, value, binding, loc }));
    // For two-way binding, synthesize an event handler on form-control elements
    // so JSX-keeping targets can emit it directly.
    if (binding === "twoWay" && value.kind === "Expression" && isFormControl(tag)) {
      const eventName =
        tag === "select" || tag === "input" || tag === "textarea"
          ? defaultEventForControl(tag)
          : "onInput";
      const handler = synthesizeTwoWayHandler(value, ctx, loc);
      events.push({ name: eventName, handler, loc });
    }
  }
  return { attributes, events, refs };
}

function parseAttributeValue(
  initializer: ts.JsxAttributeValue | undefined,
  ctx: JSXParseContext,
  emissionContext: "template" | "setup",
): IRStaticValue | IRExpressionNode | null {
  if (!initializer) return null;
  if (ts.isStringLiteral(initializer)) {
    return createStaticValue(initializer.text, locOf(initializer, ctx.sourceFile));
  }
  if (ts.isJsxExpression(initializer)) {
    if (!initializer.expression) return null;
    return makeExpression(initializer.expression, ctx, emissionContext);
  }
  return null;
}

function isEventName(name: string): boolean {
  return /^on[A-Z]/.test(name);
}

function classifyBinding(name: string): IRAttributeBinding {
  if (name.startsWith("$bind:")) return "twoWay";
  if (name === "class" || name === "className") return "class";
  if (name === "style") return "style";
  return "normal";
}

function stripBindPrefix(name: string): string {
  return name.startsWith("$bind:") ? name.slice("$bind:".length) : name;
}

function isFormControl(tag: string): boolean {
  return tag === "input" || tag === "select" || tag === "textarea";
}

function defaultEventForControl(tag: string): string {
  if (tag === "select") return "onChange";
  return "onInput";
}

/**
 * Build a synthesized `(e) => signalSetterEquivalent(e.target.value)` handler
 * for a two-way binding. The handler body is a fresh ts.ArrowFunction so the
 * IR is a valid `IRExpressionNode`. Targets re-emit the expression body in
 * their idiomatic form (e.g. setName(e.target.value) for React, v-model for
 * Vue).
 */
function synthesizeTwoWayHandler(
  bound: IRExpressionNode,
  ctx: JSXParseContext,
  loc: SourceLocation,
): IRExpressionNode {
  const event = ts.factory.createIdentifier("event");
  const target = ts.factory.createPropertyAccessExpression(event, "target");
  const value = ts.factory.createPropertyAccessExpression(target, "value");
  // The handler captures the bound expression so generators can identify the
  // setter without re-parsing the source.
  const arrow = ts.factory.createArrowFunction(
    undefined,
    undefined,
    [
      ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        event,
        undefined,
        undefined,
        undefined,
      ),
    ],
    undefined,
    undefined,
    ts.factory.createCallExpression(bound.expr, undefined, [value]),
  );
  // The synthesized arrow has no original location — fall back to the
  // attribute's location.
  void ctx;
  return {
    kind: "Expression",
    expr: arrow,
    deps: bound.deps,
    isReactive: bound.isReactive,
    isDynamic: bound.isDynamic,
    emissionContext: "setup",
    loc: loc ?? UNKNOWN_LOCATION,
  };
}
