import * as ts from "typescript";
import type {
  IRComponent,
  IRComponentInstance,
  IRExprNode,
  IRNode,
  IRSwitchCase,
} from "../../../ir/render/nodes.ts";
import { transformComponent } from "../../../ir/render/transform.ts";
import type { PassContext } from "../../types.ts";

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

function lowerShow(ci: IRComponentInstance, ctx: PassContext): IRNode | undefined {
  const when = getAttr(ci, "when");
  if (!when) {
    ctx.diagnostics.push("INK0060", ci.loc);
    return undefined;
  }

  const body = getDefaultSlotBody(ci);
  if (!body) return undefined;

  const fallback = getNamedSlotBody(ci, "fallback") ?? getAttr(ci, "fallback");

  return {
    kind: "If",
    branches: [{ test: when, body }],
    fallback: fallback as IRNode | undefined,
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
  const body = defaultSlot?.body;
  if (!body) return undefined;

  const itemBinding = defaultSlot.scopedParams[0] ?? "item";
  const indexBinding = defaultSlot.scopedParams[1];

  const key = getAttr(ci, "key");
  const syntheticKey = !key;
  const resolvedKey = key ?? each;

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
