import * as ts from "typescript";
import type {
  IRComponent,
  IRComponentInstance,
  IRExprNode,
  IRFor,
  IRNode,
  IRSwitchCase,
} from "../../../ir/render/nodes.ts";
import { transformComponent } from "../../../ir/render/transform.ts";
import type { PassContext } from "../../types.ts";
import { parseExpression } from "../02-parse/jsx/index.ts";

function getAttr(ci: IRComponentInstance, name: string): IRExprNode | undefined {
  const attr = ci.attrs.find((a) => a.name === name);
  if (!attr || attr.value.kind !== "Expression") return undefined;
  return attr.value;
}

function getDefaultSlotBody(ci: IRComponentInstance): IRNode | undefined {
  return ci.slots.find((s) => s.name === "default")?.body;
}

function getNamedSlotBody(ci: IRComponentInstance, name: string): IRNode | undefined {
  return ci.slots.find((s) => s.name === name)?.body;
}

function getRefName(ci: IRComponentInstance): string | undefined {
  if (ts.isIdentifier(ci.reference)) return ci.reference.text;
  return undefined;
}

function unwrapParens(expr: ts.Expression): ts.Expression {
  return ts.isParenthesizedExpression(expr) ? unwrapParens(expr.expression) : expr;
}

function isJsxLike(expr: ts.Expression): boolean {
  const e = unwrapParens(expr);
  return ts.isJsxElement(e) || ts.isJsxSelfClosingElement(e) || ts.isJsxFragment(e);
}

function resolveArrowBody(arrow: ts.ArrowFunction): ts.Expression | undefined {
  if (!ts.isBlock(arrow.body)) return arrow.body;
  const ret = arrow.body.statements.find(ts.isReturnStatement);
  return (ret as ts.ReturnStatement | undefined)?.expression;
}

function tryDecomposeJsxExpr(node: IRNode): IRNode {
  if (node.kind !== "Expression") return node;
  const inner = unwrapParens(node.expr);
  const sf = inner.getSourceFile();
  if (sf && isJsxLike(inner)) return parseExpression(node.expr, sf);
  return node;
}

function lowerShow(ci: IRComponentInstance, ctx: PassContext): IRNode | undefined {
  const when = getAttr(ci, "when");
  if (!when) {
    ctx.diagnostics.push("INK0060", ci.loc);
    return undefined;
  }

  const body = getDefaultSlotBody(ci);
  if (!body) return undefined;

  const rawFallback = getNamedSlotBody(ci, "fallback") ?? getAttr(ci, "fallback");
  const fallback = rawFallback ? tryDecomposeJsxExpr(rawFallback) : undefined;

  return {
    kind: "If",
    branches: [{ test: when, body }],
    fallback,
    loc: ci.loc,
  };
}

function lowerFor(ci: IRComponentInstance, ctx: PassContext): IRNode | undefined {
  const each = getAttr(ci, "each");
  if (!each) {
    ctx.diagnostics.push("INK0062", ci.loc);
    return undefined;
  }

  const defaultSlot = ci.slots.find((s) => s.name === "default");
  if (!defaultSlot) return undefined;
  let body: IRNode = defaultSlot.body;

  let itemBinding = defaultSlot.scopedParams[0] ?? "item";
  let indexBinding: string | undefined = defaultSlot.scopedParams[1];

  if (body.kind === "Expression" && ts.isArrowFunction(body.expr)) {
    const arrow = body.expr;
    if (arrow.parameters.length >= 1) itemBinding = arrow.parameters[0]!.name.getText();
    if (arrow.parameters.length >= 2) indexBinding = arrow.parameters[1]!.name.getText();
    const arrowBody = resolveArrowBody(arrow);
    if (arrowBody) {
      const sf = arrowBody.getSourceFile();
      if (sf) body = parseExpression(arrowBody, sf);
    }
  }

  const key = getAttr(ci, "key");
  const syntheticKey = !key;
  const resolvedKey = key ?? { ...each, expr: ts.factory.createIdentifier(itemBinding) };

  if (!indexBinding && key && ts.isArrowFunction(key.expr) && key.expr.parameters.length >= 2) {
    indexBinding = key.expr.parameters[1]!.name.getText();
  }

  return {
    kind: "For",
    each,
    itemBinding,
    indexBinding,
    key: resolvedKey,
    syntheticKey,
    body,
    loc: ci.loc,
  };
}

function lowerSwitch(ci: IRComponentInstance): IRNode | undefined {
  const cases: IRSwitchCase[] = [];

  const fallbackSlot = ci.slots.find((s) => s.name === "fallback");
  let fallback: IRNode | undefined = fallbackSlot?.body ?? getAttr(ci, "fallback");

  const body = getDefaultSlotBody(ci);
  if (body) {
    const children = body.kind === "Fragment" ? body.children : [body];
    for (const child of children) {
      if (child.kind === "ComponentInstance" && getRefName(child) === "Match") {
        const when = getAttr(child, "when");
        const matchBody = getDefaultSlotBody(child);
        if (when && matchBody) {
          cases.push({ test: when, body: matchBody });
        }
      } else if (fallback === undefined) {
        fallback = child;
      }
    }
  }

  if (cases.length === 0) return undefined;

  return { kind: "Switch", cases, fallback, loc: ci.loc };
}

export function controlFlow(component: IRComponent, ctx: PassContext): IRComponent {
  return transformComponent(component, {
    enter(node) {
      if (node.kind === "ComponentInstance") {
        const name = getRefName(node);
        if (name === "Show") return lowerShow(node, ctx);
        if (name === "For") return lowerFor(node, ctx);
        if (name === "Switch") return lowerSwitch(node);
      }

      if (node.kind === "Expression") {
        const expr = node.expr;

        if (
          ts.isCallExpression(expr) &&
          ts.isPropertyAccessExpression(expr.expression) &&
          expr.expression.name.text === "map" &&
          expr.arguments.length === 1 &&
          ts.isArrowFunction(expr.arguments[0]!)
        ) {
          const arrow = expr.arguments[0]! as ts.ArrowFunction;
          const arrayExpr = expr.expression.expression;
          const arrowBody = resolveArrowBody(arrow);
          if (arrowBody && isJsxLike(arrowBody)) {
            const sf = arrowBody.getSourceFile();
            if (sf) {
              const itemBinding =
                arrow.parameters.length >= 1 ? arrow.parameters[0]!.name.getText() : "item";
              const indexBinding =
                arrow.parameters.length >= 2 ? arrow.parameters[1]!.name.getText() : undefined;
              const parsedBody = parseExpression(arrowBody, sf);
              const eachExpr: IRExprNode = { ...node, expr: arrayExpr };

              let keyExpr: IRExprNode | undefined;
              let bodyNode: IRNode = parsedBody;
              if (parsedBody.kind === "Element") {
                const keyAttr = parsedBody.attrs.find((a) => a.name === "key");
                if (keyAttr && keyAttr.value.kind === "Expression") {
                  keyExpr = keyAttr.value;
                  bodyNode = {
                    ...parsedBody,
                    attrs: parsedBody.attrs.filter((a) => a.name !== "key"),
                  };
                }
              }

              return {
                kind: "For",
                each: eachExpr,
                itemBinding,
                indexBinding,
                key: keyExpr ?? eachExpr,
                syntheticKey: !keyExpr,
                body: bodyNode,
                loc: node.loc,
              } satisfies IRFor;
            }
          }
        }

        if (ts.isConditionalExpression(expr)) {
          const whenTrue = expr.whenTrue;
          const whenFalse = expr.whenFalse;
          if (isJsx(whenTrue) && isJsx(whenFalse)) {
            return {
              kind: "If",
              branches: [
                { test: { ...node, expr: expr.condition }, body: exprToNode(whenTrue, node) },
              ],
              fallback: exprToNode(whenFalse, node),
              loc: node.loc,
            };
          }
        }

        if (
          ts.isBinaryExpression(expr) &&
          expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
        ) {
          if (isJsx(expr.right)) {
            return {
              kind: "If",
              branches: [
                { test: { ...node, expr: expr.left }, body: exprToNode(expr.right, node) },
              ],
              loc: node.loc,
            };
          }
        }
      }
    },
  });
}

function isJsx(expr: ts.Expression): boolean {
  return ts.isJsxElement(expr) || ts.isJsxSelfClosingElement(expr) || ts.isJsxFragment(expr);
}

function exprToNode(expr: ts.Expression, parent: IRExprNode): IRExprNode {
  return { ...parent, expr };
}
