import type * as ts from "typescript";

import { buildReactivityGraph, type ReactivityGraph } from "./analyze/graph.ts";
import { validateComponent } from "./analyze/validate.ts";
import type { IRComponent } from "./ir/nodes.ts";
import type { IRModule } from "./ir/module.ts";
import type { Diagnostic } from "./ir/types.ts";
import { parseModule, type ParseOptions } from "./parser/index.ts";

export interface CompileResult {
  module: IRModule;
  /** Per-component reactivity graphs, keyed by component id. */
  graphs: Map<string, ReactivityGraph>;
  diagnostics: Diagnostic[];
}

/**
 * Convert any cycles detected in a reactivity graph into INK0030 diagnostics
 * keyed at the component's location. Exported so tests can drive the
 * cycle-emission path with a synthetic graph (the parser can't currently
 * produce cycles because it's single-pass).
 */
export function diagnoseCycles(component: IRComponent, graph: ReactivityGraph): Diagnostic[] {
  if (graph.cycles.length === 0) return [];
  const memoNames = new Map<ts.Symbol, string>();
  for (const memo of component.memos) memoNames.set(memo.symbol, memo.name);
  const out: Diagnostic[] = [];
  for (const cycle of graph.cycles) {
    const names = cycle.map((s) => memoNames.get(s) ?? s.name).join(" -> ");
    out.push({
      code: "INK0030",
      severity: "error",
      message: `createMemo cycle detected: ${names}`,
      loc: component.loc,
    });
  }
  return out;
}

/**
 * Run the parse → analyze pipeline. The result is consumable by per-target
 * code generators which live in separate packages.
 *
 * Diagnostics from every stage merge into `result.diagnostics`:
 *   - parser-level diagnostics come from `module.diagnostics`.
 *   - per-component validation (INK0010 / INK0011 / INK0020) comes from
 *     `validateComponent`.
 *   - cycles in the reactivity graph surface as INK0030 errors.
 */
export function compile(options: ParseOptions): CompileResult {
  const module = parseModule(options);
  const graphs = new Map<string, ReactivityGraph>();
  const diagnostics: Diagnostic[] = [...module.diagnostics];
  for (const component of module.components) {
    const graph = buildReactivityGraph(component);
    graphs.set(component.id, graph);
    diagnostics.push(...validateComponent(component));
    diagnostics.push(...diagnoseCycles(component, graph));
  }
  return { module, graphs, diagnostics };
}
