import type { SymbolId } from "../../../ir/reactivity.ts";
import type { IRComponent } from "../../../ir/render/nodes.ts";

export interface ReactivityGraph {
  readonly dependencies: ReadonlyMap<SymbolId, ReadonlySet<SymbolId>>;
  readonly dependents: ReadonlyMap<SymbolId, ReadonlySet<SymbolId>>;
  readonly topo: readonly SymbolId[];
  readonly cycles: readonly (readonly SymbolId[])[];
}

export function buildReactivityGraph(component: IRComponent): ReactivityGraph {
  const dependencies = new Map<SymbolId, Set<SymbolId>>();
  const dependents = new Map<SymbolId, Set<SymbolId>>();
  const memoIds = new Set<SymbolId>();

  for (const memo of component.memos) {
    memoIds.add(memo.symbolId);
    const depIds = new Set<SymbolId>();

    for (const dep of memo.expr.deps) {
      depIds.add(dep.symbolId);

      let revSet = dependents.get(dep.symbolId);
      if (!revSet) {
        revSet = new Set();
        dependents.set(dep.symbolId, revSet);
      }
      revSet.add(memo.symbolId);
    }

    dependencies.set(memo.symbolId, depIds);
  }

  const visited = new Set<SymbolId>();
  const inStack = new Set<SymbolId>();
  const path: SymbolId[] = [];
  const topo: SymbolId[] = [];
  const cycles: SymbolId[][] = [];

  function dfs(id: SymbolId): void {
    if (visited.has(id)) return;
    if (inStack.has(id)) {
      const start = path.indexOf(id);
      if (start !== -1) cycles.push(path.slice(start));
      return;
    }

    if (!memoIds.has(id)) return;

    inStack.add(id);
    path.push(id);

    const deps = dependencies.get(id);
    if (deps) {
      for (const dep of deps) {
        if (memoIds.has(dep)) dfs(dep);
      }
    }

    path.pop();
    inStack.delete(id);
    visited.add(id);
    topo.push(id);
  }

  for (const id of memoIds) {
    dfs(id);
  }

  return {
    dependencies,
    dependents,
    topo: Object.freeze(topo),
    cycles: Object.freeze(cycles.map((c) => Object.freeze(c))),
  };
}
