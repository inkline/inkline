import type * as ts from "typescript";

import type { IRComponent } from "../ir/nodes.ts";

/**
 * The reactivity dependency graph for a single component.
 *
 * - `dependents` — forward edges: for symbol `a`, the set of memo symbols
 *   whose body reads `a`. Used by future incremental-recompilation tooling.
 * - `dependencies` — reverse edges: for memo symbol `m`, the set of symbols
 *   whose values feed into `m`. Used to compute transitive deps.
 * - `topo` — topological order of memo symbols only (signals/props/refs are
 *   leaves and are intentionally not included). When cycles exist, members
 *   of the cycle still appear, but the order is approximate.
 * - `cycles` — every cycle detected during the build, each represented as
 *   the list of memo symbols traversed plus the closing symbol.
 */
export interface ReactivityGraph {
  dependents: Map<ts.Symbol, Set<ts.Symbol>>;
  dependencies: Map<ts.Symbol, Set<ts.Symbol>>;
  topo: ts.Symbol[];
  cycles: ts.Symbol[][];
}

/**
 * Build the reactivity dependency graph from a component's memos.
 *
 * The graph encodes derivation relationships between memos and their input
 * symbols (signals, props, refs, other memos). It is used to:
 *   - Validate the order of memo declarations.
 *   - Detect cycles before any target sees the IR.
 *   - Allow target generators to compute transitive deps when needed.
 *
 * Effects are not in the graph because they have no return value to feed
 * downstream nodes; they are leaves of the reactivity flow.
 */
export function buildReactivityGraph(component: IRComponent): ReactivityGraph {
  const dependents = new Map<ts.Symbol, Set<ts.Symbol>>();
  const dependencies = new Map<ts.Symbol, Set<ts.Symbol>>();

  const ensure = (m: Map<ts.Symbol, Set<ts.Symbol>>, k: ts.Symbol): Set<ts.Symbol> => {
    let s = m.get(k);
    if (!s) {
      s = new Set<ts.Symbol>();
      m.set(k, s);
    }
    return s;
  };

  for (const memo of component.memos) {
    for (const dep of memo.expr.deps) {
      ensure(dependencies, memo.symbol).add(dep.symbol);
      ensure(dependents, dep.symbol).add(memo.symbol);
    }
  }

  const memoSymbols = new Set(component.memos.map((m) => m.symbol));
  const visited = new Set<ts.Symbol>();
  const stack = new Set<ts.Symbol>();
  const topo: ts.Symbol[] = [];
  const cycles: ts.Symbol[][] = [];

  const visit = (sym: ts.Symbol, path: ts.Symbol[]): void => {
    if (visited.has(sym)) return;
    if (stack.has(sym)) {
      const cycleStart = path.indexOf(sym);
      cycles.push(path.slice(cycleStart).concat(sym));
      return;
    }
    stack.add(sym);
    path.push(sym);
    const deps = dependencies.get(sym);
    if (deps) {
      for (const dep of deps) {
        if (memoSymbols.has(dep)) visit(dep, path);
      }
    }
    path.pop();
    stack.delete(sym);
    visited.add(sym);
    topo.push(sym);
  };

  for (const memo of component.memos) visit(memo.symbol, []);

  return { dependents, dependencies, topo, cycles };
}
