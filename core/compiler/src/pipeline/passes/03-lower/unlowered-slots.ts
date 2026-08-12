import ts from "typescript";
import type { IRComponent, IRExprNode } from "../../../ir/render/nodes.ts";
import { toLoc } from "../02-parse/loc.ts";
import type { PassContext } from "../../types.ts";

/**
 * Collects every {@link IRExprNode} held anywhere under `root`, including the ones the render-tree
 * visitor does not reach — attribute values, event handlers, `If` tests, `For` sources and keys.
 *
 * The walk is structural rather than a per-kind enumeration on purpose: a new IR node that carries
 * an expression in a new position is covered the day it is added, with no edit here. `ts.Node`
 * values are recognised by `kind` being a number and are never descended into.
 */
function collectExpressions(root: unknown): IRExprNode[] {
  const found: IRExprNode[] = [];
  const seen = new Set<object>();

  const visit = (value: unknown): void => {
    if (value === null || typeof value !== "object") return;
    if (seen.has(value)) return;
    seen.add(value);

    if (Array.isArray(value)) {
      for (const item of value) visit(item);
      return;
    }

    const kind = (value as { kind?: unknown }).kind;
    // A TypeScript AST node — `kind` is a `ts.SyntaxKind` number. Its subtree is source, not IR.
    if (typeof kind === "number") return;
    if (kind === "Expression") found.push(value as IRExprNode);

    for (const item of Object.values(value)) visit(item);
  };

  visit(root);
  return found;
}

function reportSlotTags(expr: ts.Expression, sourceFile: ts.SourceFile, ctx: PassContext): void {
  const visit = (node: ts.Node): void => {
    if (
      (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
      ts.isIdentifier(node.tagName) &&
      node.tagName.text === "Slot"
    ) {
      ctx.diagnostics.push("INK0069", toLoc(node, sourceFile));
    }
    ts.forEachChild(node, visit);
  };
  visit(expr);
}

/**
 * Refuses every `<Slot>` inside the render expression that lowering never reached — see INK0069.
 *
 * Being inside the returned expression is not enough to be lowered. `controlFlow` materialises JSX
 * out of a fixed set of shapes (a `.map` callback returning JSX, `Show`/`For`/`Switch` bodies, and
 * so on); anything else stays an {@link IRExprNode} whose `expr` is printed verbatim. A `<Slot>`
 * still sitting in one of those expressions after lowering — say inside an IIFE — therefore declares
 * no slot and is emitted as an undefined element, exactly like one written outside the render tree.
 *
 * Surviving in an expression *is* the definition of unreached, so this reports the real set rather
 * than a syntactic approximation of it: a construct lowering handles (the `.map` callback) is gone
 * from the expressions by the time this runs and cannot be flagged. Must run after every lowering
 * that materialises slots.
 */
export function unloweredSlots(component: IRComponent, ctx: PassContext): IRComponent {
  for (const node of collectExpressions(component.render)) {
    const sourceFile = node.expr.getSourceFile();
    if (sourceFile) reportSlotTags(node.expr, sourceFile, ctx);
  }
  return component;
}
