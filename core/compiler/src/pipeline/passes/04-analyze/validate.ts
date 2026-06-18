import * as ts from "typescript";
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

/**
 * INK0130: a component declares `element: "<tag>"` (opting into Angular attribute-selector codegen)
 * but its render root is not a single native `<tag>` element — so it can't be emitted as that host
 * element (the Angular target falls back to the `ink-*` wrapper). Mirrors the classifier's
 * element-acceptance condition so the two never silently disagree.
 */
export function validateElementFlag(component: IRComponent, ctx: PassContext): void {
  if (component.element === undefined) return;
  let root = component.render;
  while (root.kind === "Transition") root = root.child;
  const ok = root.kind === "Element" && root.tag === component.element && root.refs.length === 0;
  if (!ok) {
    ctx.diagnostics.push("INK0130", component.loc, {
      name: component.name,
      element: component.element,
    });
  }
}

/**
 * INK0120: a parent passes a `class` (a fallthrough attribute) to a child component whose root
 * cannot inherit it (fragment / control-flow / multiple roots). Resolution is limited to components
 * defined in the same module; cross-module children are skipped (their root kind is not known here).
 */
export function validateAttrFallthrough(
  component: IRComponent,
  localComponents: ReadonlyMap<string, IRComponent>,
  ctx: PassContext,
): void {
  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind !== "ComponentInstance") return;
      const passesClass = node.attrs.some((a) => a.binding === "class");
      if (!passesClass) return;

      const name =
        node.resolved?.name ?? (ts.isIdentifier(node.reference) ? node.reference.text : undefined);
      if (!name) return;
      const child = localComponents.get(name);
      if (!child) return; // cross-module child — root kind unknown, skip

      const root = child.render;
      const rootAccepts =
        (root.kind === "Element" || root.kind === "ComponentInstance") &&
        root.acceptsAttrFallthrough === true;
      if (!rootAccepts) {
        ctx.diagnostics.push("INK0120", node.loc, { name });
      }
    },
  });
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
