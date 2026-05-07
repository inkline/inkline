import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createComponentSkeleton, createExpression, createText } from "../ir/builders.ts";
import type { IRComponent, IRMemoDeclaration } from "../ir/nodes.ts";
import type { IRDependency } from "../ir/reactivity.ts";
import { UNKNOWN_LOCATION } from "../ir/types.ts";

import { buildReactivityGraph } from "./graph.ts";

const stubSymbol = (name: string): ts.Symbol =>
  ({ name, flags: 0, declarations: [] }) as unknown as ts.Symbol;

const ident = (name: string): ts.Identifier => ts.factory.createIdentifier(name);

interface MemoSpec {
  name: string;
  deps: Array<{ symbol: ts.Symbol; name: string; kind?: IRDependency["kind"] }>;
}

/** Build a component populated with the given memo specs. */
function componentOf(memos: Record<string, MemoSpec & { symbol: ts.Symbol }>): IRComponent {
  const skeleton = createComponentSkeleton({
    id: "test#test",
    name: "Test",
    render: createText(""),
  });
  for (const memo of Object.values(memos)) {
    const ir: IRMemoDeclaration = {
      name: memo.name,
      symbol: memo.symbol,
      expr: createExpression({
        expr: ident(memo.name),
        resolution: {
          deps: memo.deps.map((d) => ({
            symbol: d.symbol,
            kind: d.kind ?? "signal",
            name: d.name,
            path: [],
            conditional: false,
          })),
          isReactive: memo.deps.length > 0,
          isDynamic: false,
        },
      }),
      loc: UNKNOWN_LOCATION,
    };
    skeleton.memos.push(ir);
  }
  return skeleton;
}

describe("buildReactivityGraph", () => {
  it("returns empty maps and empty topo for a component with no memos", () => {
    const skeleton = createComponentSkeleton({
      id: "x#x",
      name: "X",
      render: createText(""),
    });
    const g = buildReactivityGraph(skeleton);
    expect(g.dependents.size).toBe(0);
    expect(g.dependencies.size).toBe(0);
    expect(g.topo).toEqual([]);
    expect(g.cycles).toEqual([]);
  });

  it("builds linear chain a -> m1 -> m2", () => {
    const a = stubSymbol("a");
    const m1 = stubSymbol("m1");
    const m2 = stubSymbol("m2");
    const component = componentOf({
      m1: { name: "m1", symbol: m1, deps: [{ symbol: a, name: "a" }] },
      m2: { name: "m2", symbol: m2, deps: [{ symbol: m1, name: "m1", kind: "memo" }] },
    });
    const g = buildReactivityGraph(component);
    // Dependencies: m1 -> {a}, m2 -> {m1}
    expect(g.dependencies.get(m1)).toEqual(new Set([a]));
    expect(g.dependencies.get(m2)).toEqual(new Set([m1]));
    // Dependents: a -> {m1}, m1 -> {m2}
    expect(g.dependents.get(a)).toEqual(new Set([m1]));
    expect(g.dependents.get(m1)).toEqual(new Set([m2]));
    // Topo: m1 must come before m2 (memo nodes only).
    const idxM1 = g.topo.indexOf(m1);
    const idxM2 = g.topo.indexOf(m2);
    expect(idxM1).toBeGreaterThanOrEqual(0);
    expect(idxM2).toBeGreaterThan(idxM1);
    expect(g.cycles).toEqual([]);
  });

  it("handles a diamond a -> m1, a -> m2, {m1, m2} -> m3", () => {
    const a = stubSymbol("a");
    const m1 = stubSymbol("m1");
    const m2 = stubSymbol("m2");
    const m3 = stubSymbol("m3");
    const component = componentOf({
      m1: { name: "m1", symbol: m1, deps: [{ symbol: a, name: "a" }] },
      m2: { name: "m2", symbol: m2, deps: [{ symbol: a, name: "a" }] },
      m3: {
        name: "m3",
        symbol: m3,
        deps: [
          { symbol: m1, name: "m1", kind: "memo" },
          { symbol: m2, name: "m2", kind: "memo" },
        ],
      },
    });
    const g = buildReactivityGraph(component);
    expect(g.dependents.get(a)?.has(m1)).toBe(true);
    expect(g.dependents.get(a)?.has(m2)).toBe(true);
    expect(g.dependencies.get(m3)).toEqual(new Set([m1, m2]));
    const idxM1 = g.topo.indexOf(m1);
    const idxM2 = g.topo.indexOf(m2);
    const idxM3 = g.topo.indexOf(m3);
    expect(idxM3).toBeGreaterThan(idxM1);
    expect(idxM3).toBeGreaterThan(idxM2);
    expect(g.cycles).toEqual([]);
  });

  it("detects a self-cycle m1 -> m1", () => {
    const m1 = stubSymbol("m1");
    const component = componentOf({
      m1: { name: "m1", symbol: m1, deps: [{ symbol: m1, name: "m1", kind: "memo" }] },
    });
    const g = buildReactivityGraph(component);
    expect(g.cycles.length).toBeGreaterThan(0);
    expect(g.cycles[0]).toContain(m1);
  });

  it("detects a 2-node cycle m1 <-> m2", () => {
    const m1 = stubSymbol("m1");
    const m2 = stubSymbol("m2");
    const component = componentOf({
      m1: { name: "m1", symbol: m1, deps: [{ symbol: m2, name: "m2", kind: "memo" }] },
      m2: { name: "m2", symbol: m2, deps: [{ symbol: m1, name: "m1", kind: "memo" }] },
    });
    const g = buildReactivityGraph(component);
    expect(g.cycles.length).toBeGreaterThan(0);
    const cycle = g.cycles[0]!;
    expect(cycle.includes(m1) && cycle.includes(m2)).toBe(true);
  });

  it("treats a memo with no deps as a topo leaf", () => {
    const m = stubSymbol("m");
    const component = componentOf({
      m: { name: "m", symbol: m, deps: [] },
    });
    const g = buildReactivityGraph(component);
    expect(g.dependencies.size).toBe(0);
    expect(g.topo).toEqual([m]);
    expect(g.cycles).toEqual([]);
  });

  it("does not add non-memo symbols (signals, props) into the topo order", () => {
    const sig = stubSymbol("sig");
    const m = stubSymbol("m");
    const component = componentOf({
      m: { name: "m", symbol: m, deps: [{ symbol: sig, name: "sig" }] },
    });
    const g = buildReactivityGraph(component);
    // topo only contains memo symbols.
    expect(g.topo).toEqual([m]);
    expect(g.topo.includes(sig)).toBe(false);
  });

  it("handles two independent memos in stable order", () => {
    const a = stubSymbol("a");
    const b = stubSymbol("b");
    const m1 = stubSymbol("m1");
    const m2 = stubSymbol("m2");
    const component = componentOf({
      m1: { name: "m1", symbol: m1, deps: [{ symbol: a, name: "a" }] },
      m2: { name: "m2", symbol: m2, deps: [{ symbol: b, name: "b" }] },
    });
    const g = buildReactivityGraph(component);
    expect(g.topo).toContain(m1);
    expect(g.topo).toContain(m2);
    expect(g.cycles).toEqual([]);
  });
});
