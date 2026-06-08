import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { SymbolTable } from "../../../ir/reactivity.ts";
import type { SymbolId } from "../../../ir/reactivity.ts";
import type { IRComponent, IRExprNode, IRMemoDeclaration } from "../../../ir/render/nodes.ts";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { buildReactivityGraph } from "./graph.ts";

function mockExpr(code = "x"): ts.Expression {
  const sf = ts.createSourceFile("test.ts", code, ts.ScriptTarget.Latest, true);
  const stmt = sf.statements[0]!;
  if (ts.isExpressionStatement(stmt)) return stmt.expression;
  throw new Error("Expected expression");
}

function makeExprNode(deps: Array<{ symbolId: SymbolId; kind: "signal" | "memo" }>): IRExprNode {
  return {
    kind: "Expression",
    expr: mockExpr("x"),
    deps: deps.map((d) => ({
      symbolId: d.symbolId,
      kind: d.kind,
      name: "x",
      path: [],
      conditional: false,
    })),
    isReactive: deps.length > 0,
    emissionContext: "setup",
    isDynamic: false,
    loc: UNKNOWN_LOCATION,
  };
}

function makeComponent(memos: IRMemoDeclaration[]): IRComponent {
  return {
    kind: "Component",
    id: "test.tsx#Test",
    name: "Test",
    loc: UNKNOWN_LOCATION,
    props: [],
    slots: [],
    events: [],
    models: [],
    state: [],
    refs: [],
    memos,
    effects: [],
    resources: [],
    provides: [],
    consumes: [],
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render: { kind: "Text", value: "", loc: UNKNOWN_LOCATION },
    primitives: [],
    styles: [],
    runtime: "iso",
    targetOverrides: {},
  };
}

const compId = "test.tsx#Test";
const loc = (offset: number) => ({ file: "test.tsx", line: 1, column: 1, offset, length: 5 });

describe("buildReactivityGraph", () => {
  it("returns empty graph for component with no memos", () => {
    const comp = makeComponent([]);
    const graph = buildReactivityGraph(comp);

    expect(graph.dependencies.size).toBe(0);
    expect(graph.topo).toEqual([]);
    expect(graph.cycles).toEqual([]);
  });

  it("memo depending only on signals has no memo edges", () => {
    const table = new SymbolTable();
    const signalId = table.mint({
      componentId: compId,
      kind: "signal",
      name: "count",
      loc: loc(0),
    });
    const memoId = table.mint({ componentId: compId, kind: "memo", name: "doubled", loc: loc(10) });

    const comp = makeComponent([
      {
        name: "doubled",
        symbolId: memoId,
        expr: makeExprNode([{ symbolId: signalId, kind: "signal" }]),
        loc: loc(10),
      },
    ]);

    const graph = buildReactivityGraph(comp);

    expect(graph.topo).toEqual([memoId]);
    expect(graph.cycles).toEqual([]);
    expect(graph.dependencies.get(memoId)?.has(signalId)).toBe(true);
    expect(graph.dependents.get(signalId)?.has(memoId)).toBe(true);
  });

  it("chain of memos: A depends on B, topological order is [B, A]", () => {
    const table = new SymbolTable();
    const memoB = table.mint({ componentId: compId, kind: "memo", name: "b", loc: loc(0) });
    const memoA = table.mint({ componentId: compId, kind: "memo", name: "a", loc: loc(10) });

    const comp = makeComponent([
      {
        name: "b",
        symbolId: memoB,
        expr: makeExprNode([]),
        loc: loc(0),
      },
      {
        name: "a",
        symbolId: memoA,
        expr: makeExprNode([{ symbolId: memoB, kind: "memo" }]),
        loc: loc(10),
      },
    ]);

    const graph = buildReactivityGraph(comp);

    expect(graph.topo).toEqual([memoB, memoA]);
    expect(graph.cycles).toEqual([]);
  });

  it("detects a cycle between two memos", () => {
    const table = new SymbolTable();
    const memoA = table.mint({ componentId: compId, kind: "memo", name: "a", loc: loc(0) });
    const memoB = table.mint({ componentId: compId, kind: "memo", name: "b", loc: loc(10) });

    const comp = makeComponent([
      {
        name: "a",
        symbolId: memoA,
        expr: makeExprNode([{ symbolId: memoB, kind: "memo" }]),
        loc: loc(0),
      },
      {
        name: "b",
        symbolId: memoB,
        expr: makeExprNode([{ symbolId: memoA, kind: "memo" }]),
        loc: loc(10),
      },
    ]);

    const graph = buildReactivityGraph(comp);

    expect(graph.cycles.length).toBeGreaterThan(0);
    const cycleIds = graph.cycles[0]!;
    expect(cycleIds).toContain(memoA);
    expect(cycleIds).toContain(memoB);
  });

  it("diamond dependency: no false cycle", () => {
    const table = new SymbolTable();
    const signalId = table.mint({ componentId: compId, kind: "signal", name: "s", loc: loc(0) });
    const memoA = table.mint({ componentId: compId, kind: "memo", name: "a", loc: loc(10) });
    const memoB = table.mint({ componentId: compId, kind: "memo", name: "b", loc: loc(20) });
    const memoC = table.mint({ componentId: compId, kind: "memo", name: "c", loc: loc(30) });

    const comp = makeComponent([
      {
        name: "a",
        symbolId: memoA,
        expr: makeExprNode([{ symbolId: signalId, kind: "signal" }]),
        loc: loc(10),
      },
      {
        name: "b",
        symbolId: memoB,
        expr: makeExprNode([{ symbolId: signalId, kind: "signal" }]),
        loc: loc(20),
      },
      {
        name: "c",
        symbolId: memoC,
        expr: makeExprNode([
          { symbolId: memoA, kind: "memo" },
          { symbolId: memoB, kind: "memo" },
        ]),
        loc: loc(30),
      },
    ]);

    const graph = buildReactivityGraph(comp);

    expect(graph.cycles).toEqual([]);
    const cIndex = graph.topo.indexOf(memoC);
    const aIndex = graph.topo.indexOf(memoA);
    const bIndex = graph.topo.indexOf(memoB);
    expect(cIndex).toBeGreaterThan(aIndex);
    expect(cIndex).toBeGreaterThan(bIndex);
  });

  it("populates dependents (reverse map)", () => {
    const table = new SymbolTable();
    const signalId = table.mint({ componentId: compId, kind: "signal", name: "s", loc: loc(0) });
    const memoId = table.mint({ componentId: compId, kind: "memo", name: "m", loc: loc(10) });

    const comp = makeComponent([
      {
        name: "m",
        symbolId: memoId,
        expr: makeExprNode([{ symbolId: signalId, kind: "signal" }]),
        loc: loc(10),
      },
    ]);

    const graph = buildReactivityGraph(comp);

    expect(graph.dependents.get(signalId)?.has(memoId)).toBe(true);
  });
});
