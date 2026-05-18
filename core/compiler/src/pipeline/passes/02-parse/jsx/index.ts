import * as ts from "typescript";
import { DYNAMIC_DEPS } from "../../../../ir/reactivity.ts";
import type { IRExprNode, IRNode, IRSlotContent } from "../../../../ir/render/nodes.ts";
import { toLoc } from "../loc.ts";
import { parseAttributes } from "./attributes.ts";

function makeExpr(expr: ts.Expression, sf: ts.SourceFile): IRExprNode {
  return {
    kind: "Expression",
    expr,
    raw: expr.getText(sf),
    deps: DYNAMIC_DEPS,
    isReactive: false,
    emissionContext: "template",
    isDynamic: false,
    loc: toLoc(expr, sf),
  };
}

function isUpperCase(ch: string | undefined): boolean {
  return !!ch && ch >= "A" && ch <= "Z";
}

function getTagName(tagName: ts.JsxTagNameExpression): {
  text: string;
  isComponent: boolean;
  node: ts.JsxTagNameExpression;
} {
  if (ts.isIdentifier(tagName)) {
    return { text: tagName.text, isComponent: isUpperCase(tagName.text[0]), node: tagName };
  }
  if (ts.isPropertyAccessExpression(tagName)) {
    return { text: tagName.getText(), isComponent: true, node: tagName };
  }
  return { text: tagName.getText(), isComponent: false, node: tagName };
}

function parseChildren(children: ts.NodeArray<ts.JsxChild>, sf: ts.SourceFile): IRNode[] {
  const nodes: IRNode[] = [];
  for (const child of children) {
    const parsed = parseJsxChild(child, sf);
    if (parsed) nodes.push(parsed);
  }
  return nodes;
}

function parseJsxChild(node: ts.JsxChild, sf: ts.SourceFile): IRNode | undefined {
  if (ts.isJsxText(node)) {
    const text = node.text.trim();
    if (text.length === 0) return undefined;
    return { kind: "Text", value: text, loc: toLoc(node, sf) };
  }

  if (ts.isJsxExpression(node)) {
    if (!node.expression) return undefined;
    return parseExpression(node.expression, sf);
  }

  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
    return parseJsxElement(node, sf);
  }

  if (ts.isJsxFragment(node)) {
    return {
      kind: "Fragment",
      children: parseChildren(node.children, sf),
      loc: toLoc(node, sf),
    };
  }

  return undefined;
}

function parseJsxElement(
  node: ts.JsxElement | ts.JsxSelfClosingElement,
  sf: ts.SourceFile,
): IRNode {
  const isSelfClosing = ts.isJsxSelfClosingElement(node);
  const openingTag = isSelfClosing ? node : node.openingElement;
  const tag = getTagName(openingTag.tagName);
  const { attrs, events, refs } = parseAttributes(openingTag.attributes, sf);
  const children = isSelfClosing ? [] : parseChildren(node.children, sf);
  const loc = toLoc(node, sf);

  if (tag.isComponent) {
    const reference = tag.node as ts.Identifier | ts.PropertyAccessExpression;

    const slots: IRSlotContent[] = [];
    if (children.length > 0) {
      const body =
        children.length === 1 ? children[0]! : { kind: "Fragment" as const, children, loc };
      slots.push({ name: "default", body, scopedParams: [], loc });
    }

    return {
      kind: "ComponentInstance",
      reference,
      attrs,
      events,
      refs,
      slots,
      loc,
    };
  }

  return {
    kind: "Element",
    tag: tag.text,
    attrs,
    events,
    refs,
    children,
    isStatic: false,
    loc,
  };
}

export function parseExpression(expr: ts.Expression, sf: ts.SourceFile): IRNode {
  if (ts.isJsxElement(expr) || ts.isJsxSelfClosingElement(expr)) {
    return parseJsxElement(expr, sf);
  }
  if (ts.isJsxFragment(expr)) {
    return {
      kind: "Fragment",
      children: parseChildren(expr.children, sf),
      loc: toLoc(expr, sf),
    };
  }
  if (ts.isParenthesizedExpression(expr)) {
    return parseExpression(expr.expression, sf);
  }

  return makeExpr(expr, sf);
}
