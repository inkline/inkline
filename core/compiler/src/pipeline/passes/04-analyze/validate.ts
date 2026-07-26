import * as ts from "typescript";
import type { IRComponent, IRExprNode } from "../../../ir/render/nodes.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
import { emittedSetupNames, setupLocalDefs } from "../../../ir/setup.ts";
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

/** Free-identifier names referenced by an expression, skipping property/member names (`e.target`
 * contributes `e`, not `target`). Over-approximates (object-literal keys are counted) but only
 * toward reporting a genuinely-declared-but-undroppable local, never toward hiding one. */
function collectReferenced(node: ts.Node, out: Set<string>): void {
  const visit = (n: ts.Node): void => {
    if (ts.isPropertyAccessExpression(n)) {
      visit(n.expression);
      return;
    }
    if (ts.isIdentifier(n)) {
      out.add(n.text);
      return;
    }
    ts.forEachChild(n, visit);
  };
  visit(node);
}

/**
 * INK0121: a setup-body local is declared (e.g. `let x = 1`, a destructuring, a class) whose
 * definition codegen cannot emit — only const/let arrow/function expressions and function
 * declarations are emitted — yet the render, an effect/memo, or an emitted handler references it.
 * Without this the reference compiles to an undefined binding at runtime on every target. Names that
 * are dropped but never referenced are silently fine (no emission, no reference, no error).
 */
export function validateSetupLocals(component: IRComponent, ctx: PassContext): void {
  if (component.setup.length === 0) return;

  const referenced = new Set<string>();
  for (const m of component.memos) collectReferenced(m.expr.expr, referenced);
  for (const e of component.effects) collectReferenced(e.body, referenced);
  for (const l of component.lifecycle.onMount) collectReferenced(l.body, referenced);
  for (const l of component.lifecycle.onCleanup) collectReferenced(l.body, referenced);
  // Emitted handlers/helpers can reference a dropped local (a handler calling a dropped helper);
  // scan their initializers, not the declaration names, so a drop is caught one level deep.
  for (const s of component.setup)
    for (const def of setupLocalDefs(s.stmt)) collectReferenced(def.initializer, referenced);

  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind === "Expression") collectReferenced(node.expr, referenced);
      if (node.kind === "Element" || node.kind === "ComponentInstance") {
        for (const attr of node.attrs)
          if (attr.value.kind === "Expression") collectReferenced(attr.value.expr, referenced);
        for (const ev of node.events) collectReferenced(ev.handler.expr, referenced);
      }
      if (node.kind === "If")
        for (const branch of node.branches) collectReferenced(branch.test.expr, referenced);
      if (node.kind === "For") {
        collectReferenced(node.each.expr, referenced);
        collectReferenced(node.key.expr, referenced);
      }
      if (node.kind === "Switch")
        for (const c of node.cases) collectReferenced(c.test.expr, referenced);
    },
  });

  for (const s of component.setup) {
    const emitted = new Set(emittedSetupNames(s.stmt));
    for (const name of s.defines) {
      if (!emitted.has(name) && referenced.has(name)) {
        ctx.diagnostics.push("INK0121", s.loc, { name });
      }
    }
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
