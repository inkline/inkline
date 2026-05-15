import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { DYNAMIC_DEPS, SymbolTable, type SymbolId } from "../../../ir/reactivity.ts";
import type { IRComponent, IRExprNode, IRMemoDeclaration } from "../../../ir/render/nodes.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { buildReactivityGraph } from "./graph.ts";
import { diagnoseCycles, validateComponent } from "./validate.ts";

function mockExpr(code = "x"): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function makeExprNode(opts: Partial<IRExprNode> = {}): IRExprNode {
  return {
    kind: "Expression",
    expr: mockExpr("x"),
    deps: DYNAMIC_DEPS,
    isReactive: false,
    emissionContext: "setup",
    isDynamic: false,
    loc: UNKNOWN_LOCATION,
    ...opts,
  };
}

function makeCtx(targets: ("react" | "solid" | "vue" | "svelte")[] = ["react"]): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

function makeComp(overrides: Partial<IRComponent> = {}): IRComponent {
  return {
    kind: "Component",
    id: "t#T",
    name: "T",
    loc: UNKNOWN_LOCATION,
    props: [],
    slots: [],
    events: [],
    state: [],
    refs: [],
    memos: [],
    effects: [],
    resources: [],
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render: { kind: "Text", value: "", loc: UNKNOWN_LOCATION },
    primitives: [],
    styles: [],
    runtime: "iso",
    targetOverrides: {},
    ...overrides,
  };
}

describe("validateComponent", () => {
  it("pushes INK0010 for effect with no reactive deps", () => {
    const ctx = makeCtx();
    const comp = makeComp({
      effects: [
        {
          body: mockExpr("() => {}"),
          deps: DYNAMIC_DEPS,
          cleanup: "absent",
          isDynamic: false,
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    validateComponent(comp, ctx);
    const diags = ctx.diagnostics.freeze();
    expect(diags).toHaveLength(1);
    expect(diags[0]!.code).toBe("INK0010");
  });

  it("does not push INK0010 for effect with deps", () => {
    const ctx = makeCtx();
    const comp = makeComp({
      effects: [
        {
          body: mockExpr("() => {}"),
          deps: [
            {
              symbolId: "x" as SymbolId,
              kind: "signal",
              name: "x",
              path: [],
              conditional: false,
            },
          ],
          cleanup: "absent",
          isDynamic: false,
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    validateComponent(comp, ctx);
    expect(ctx.diagnostics.freeze()).toHaveLength(0);
  });

  it("does not push INK0010 for dynamic effect", () => {
    const ctx = makeCtx();
    const comp = makeComp({
      effects: [
        {
          body: mockExpr("() => {}"),
          deps: DYNAMIC_DEPS,
          cleanup: "absent",
          isDynamic: true,
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    validateComponent(comp, ctx);
    expect(ctx.diagnostics.freeze()).toHaveLength(0);
  });

  it("pushes INK0011 for memo with no reactive deps", () => {
    const ctx = makeCtx();
    const memo: IRMemoDeclaration = {
      name: "m",
      symbolId: "m" as SymbolId,
      expr: makeExprNode({ deps: DYNAMIC_DEPS, isReactive: false, isDynamic: false }),
      loc: UNKNOWN_LOCATION,
    };
    const comp = makeComp({ memos: [memo] });
    validateComponent(comp, ctx);
    const diags = ctx.diagnostics.freeze();
    expect(diags).toHaveLength(1);
    expect(diags[0]!.code).toBe("INK0011");
  });

  it("pushes INK0020 for dynamic expressions when targeting react", () => {
    const ctx = makeCtx(["react"]);
    const comp = makeComp({
      memos: [
        {
          name: "m",
          symbolId: "m" as SymbolId,
          expr: makeExprNode({
            deps: [
              {
                symbolId: "s" as SymbolId,
                kind: "signal",
                name: "s",
                path: [],
                conditional: false,
              },
            ],
            isReactive: true,
            isDynamic: true,
          }),
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    validateComponent(comp, ctx);
    const codes = ctx.diagnostics.freeze().map((d) => d.code);
    expect(codes).toContain("INK0020");
  });

  it("does not push INK0020 when not targeting react", () => {
    const ctx = makeCtx(["solid"]);
    const comp = makeComp({
      memos: [
        {
          name: "m",
          symbolId: "m" as SymbolId,
          expr: makeExprNode({
            deps: [
              {
                symbolId: "s" as SymbolId,
                kind: "signal",
                name: "s",
                path: [],
                conditional: false,
              },
            ],
            isReactive: true,
            isDynamic: true,
          }),
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    validateComponent(comp, ctx);
    const codes = ctx.diagnostics.freeze().map((d) => d.code);
    expect(codes).not.toContain("INK0020");
  });

  it("reports INK0020 for dynamic expression in Expression node", () => {
    const ctx = makeCtx(["react"]);
    const comp = makeComp({
      render: makeExprNode({ isDynamic: true }),
    });
    validateComponent(comp, ctx);
    expect(ctx.diagnostics.freeze().filter((d) => d.code === "INK0020")).toHaveLength(1);
  });

  it("reports INK0020 for dynamic attribute and event handler", () => {
    const ctx = makeCtx(["react"]);
    const comp = makeComp({
      render: {
        kind: "Element",
        tag: "div",
        attrs: [
          {
            name: "id",
            value: makeExprNode({ isDynamic: true }),
            binding: "normal",
            loc: UNKNOWN_LOCATION,
          },
        ],
        events: [
          {
            name: "click",
            handler: makeExprNode({ isDynamic: true }),
            loc: UNKNOWN_LOCATION,
          },
        ],
        refs: [],
        children: [],
        isStatic: false,
        loc: UNKNOWN_LOCATION,
      },
    });
    validateComponent(comp, ctx);
    expect(ctx.diagnostics.freeze().filter((d) => d.code === "INK0020").length).toBeGreaterThan(0);
  });

  it("reports INK0020 for dynamic If branch tests", () => {
    const ctx = makeCtx(["react"]);
    const comp = makeComp({
      render: {
        kind: "If",
        branches: [
          {
            test: makeExprNode({ isDynamic: true }),
            body: { kind: "Text", value: "x", loc: UNKNOWN_LOCATION },
          },
        ],
        loc: UNKNOWN_LOCATION,
      },
    });
    validateComponent(comp, ctx);
    expect(ctx.diagnostics.freeze().filter((d) => d.code === "INK0020")).toHaveLength(1);
  });

  it("reports INK0020 for dynamic For each/key expressions", () => {
    const ctx = makeCtx(["react"]);
    const comp = makeComp({
      render: {
        kind: "For",
        each: makeExprNode({ isDynamic: true }),
        itemBinding: "item",
        key: makeExprNode({ isDynamic: true }),
        body: { kind: "Text", value: "x", loc: UNKNOWN_LOCATION },
        loc: UNKNOWN_LOCATION,
      },
    });
    validateComponent(comp, ctx);
    expect(ctx.diagnostics.freeze().filter((d) => d.code === "INK0020")).toHaveLength(2);
  });

  it("reports INK0020 for dynamic Switch case tests", () => {
    const ctx = makeCtx(["react"]);
    const comp = makeComp({
      render: {
        kind: "Switch",
        cases: [
          {
            test: makeExprNode({ isDynamic: true }),
            body: { kind: "Text", value: "a", loc: UNKNOWN_LOCATION },
          },
          {
            test: makeExprNode({ isDynamic: true }),
            body: { kind: "Text", value: "b", loc: UNKNOWN_LOCATION },
          },
        ],
        loc: UNKNOWN_LOCATION,
      },
    });
    validateComponent(comp, ctx);
    expect(ctx.diagnostics.freeze().filter((d) => d.code === "INK0020")).toHaveLength(2);
  });
});

describe("diagnoseCycles", () => {
  it("pushes INK0030 for each cycle", () => {
    const ctx = makeCtx();
    const memoA: SymbolId = "a" as SymbolId;
    const memoB: SymbolId = "b" as SymbolId;
    const comp = makeComp({
      memos: [
        {
          name: "a",
          symbolId: memoA,
          expr: makeExprNode({
            deps: [{ symbolId: memoB, kind: "memo", name: "b", path: [], conditional: false }],
          }),
          loc: UNKNOWN_LOCATION,
        },
        {
          name: "b",
          symbolId: memoB,
          expr: makeExprNode({
            deps: [{ symbolId: memoA, kind: "memo", name: "a", path: [], conditional: false }],
          }),
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    const graph = buildReactivityGraph(comp);
    diagnoseCycles(comp, graph, ctx);
    const diags = ctx.diagnostics.freeze();
    expect(diags.length).toBeGreaterThan(0);
    expect(diags[0]!.code).toBe("INK0030");
    expect(diags[0]!.title).toContain("->");
  });

  it("does not push for no cycles", () => {
    const ctx = makeCtx();
    const comp = makeComp();
    const graph = buildReactivityGraph(comp);
    diagnoseCycles(comp, graph, ctx);
    expect(ctx.diagnostics.freeze()).toHaveLength(0);
  });
});
