import ts from "typescript";
import type { IRComponent, IRExprNode } from "../../../ir/render/nodes.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
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
      ts.isIdentifier(node.tagName)
    ) {
      if (node.tagName.text === "Slot") ctx.diagnostics.push("INK0069", toLoc(node, sourceFile));
      if (node.tagName.text === "slot") ctx.diagnostics.push("INK0077", toLoc(node, sourceFile));
    }
    ts.forEachChild(node, visit);
  };
  visit(expr);
}

/**
 * Refuses every slot tag that lowering never turned into a slot placeholder — INK0069 for `<Slot>`,
 * INK0077 for the lowercase `<slot>`.
 *
 * Two distinct ways a slot goes unlowered:
 *
 *  - **Out of reach.** Being inside the returned expression is not enough to be lowered.
 *    `controlFlow` materialises JSX out of a fixed set of shapes (a `.map` callback returning JSX,
 *    `Show`/`For`/`Switch` bodies, and so on); anything else stays an {@link IRExprNode} whose
 *    `expr` is printed verbatim. A `<Slot>` still sitting in one of those expressions after lowering
 *    — say inside an IIFE — therefore declares no slot and is emitted as an undefined element,
 *    exactly like one written outside the render tree. Surviving in an expression *is* the
 *    definition of unreached, so this reports the real set rather than a syntactic approximation of
 *    it: a construct lowering handles (the `.map` callback) is gone from the expressions by the time
 *    this runs and cannot be flagged.
 *  - **Never eligible.** `controlFlow` lowers the capitalized `Slot` only, so a lowercase `<slot>`
 *    parses as an ordinary intrinsic and reaches this point as a plain `IRElement` — see
 *    INK0077 for why that is an error on all seven targets. It is matched on the IR element rather
 *    than on the emitted text because Vue and Astro print `<slot>` for a correctly lowered `<Slot>`
 *    too; the IR is the last place the two are still distinguishable.
 *
 * Must run after every lowering that materialises slots.
 */
export function unloweredSlots(component: IRComponent, ctx: PassContext): IRComponent {
  for (const node of collectExpressions(component.render)) {
    const sourceFile = node.expr.getSourceFile();
    if (sourceFile) reportSlotTags(node.expr, sourceFile, ctx);
  }

  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind === "Element" && node.tag === "slot") {
        ctx.diagnostics.push("INK0077", node.loc);
      }
    },
  });

  return component;
}
