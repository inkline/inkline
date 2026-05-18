import type { IRComponent, IRExprNode } from "../../../ir/render/nodes.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
import type { PassContext } from "../../types.ts";
import type { ReactivityGraph } from "./graph.ts";

export function validateComponent(component: IRComponent, ctx: PassContext): void {
  // INK0010: effect has no reactive dependencies
  for (const effect of component.effects) {
    if (effect.deps.length === 0 && !effect.isDynamic) {
      ctx.diagnostics.push("INK0010", effect.loc);
    }
  }

  // INK0011: memo has no reactive dependencies
  for (const memo of component.memos) {
    if (memo.expr.deps.length === 0 && !memo.expr.isDynamic) {
      ctx.diagnostics.push("INK0011", memo.loc);
    }
  }

  // INK0020: dynamic reactive read (React-only warning)
  const targetsReact = ctx.options.targets.includes("react");
  if (targetsReact) {
    const reportDynamic = (expr: IRExprNode): void => {
      if (expr.isDynamic) ctx.diagnostics.push("INK0020", expr.loc);
    };

    for (const memo of component.memos) reportDynamic(memo.expr);

    walkRenderTree(component.render, {
      enter(node) {
        if (node.kind === "Expression") reportDynamic(node);
        if (node.kind === "Element" || node.kind === "ComponentInstance") {
          for (const attr of node.attrs) {
            if (attr.value.kind === "Expression") reportDynamic(attr.value);
          }
          for (const ev of node.events) reportDynamic(ev.handler);
        }
        if (node.kind === "If") {
          for (const branch of node.branches) reportDynamic(branch.test);
        }
        if (node.kind === "For") {
          reportDynamic(node.each);
          reportDynamic(node.key);
        }
        if (node.kind === "Switch") {
          for (const c of node.cases) reportDynamic(c.test);
        }
      },
    });
  }
}

export function diagnoseCycles(
  component: IRComponent,
  graph: ReactivityGraph,
  ctx: PassContext,
): void {
  if (graph.cycles.length === 0) return;

  const nameOf = new Map(component.memos.map((m) => [m.symbolId, m.name]));

  for (const cycle of graph.cycles) {
    const names = cycle.map((id) => nameOf.get(id) ?? id);
    const display = [...names, names[0]!].join(" -> ");
    ctx.diagnostics.push("INK0030", component.loc, { cycle: display });
  }
}
