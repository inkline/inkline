import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { DYNAMIC_DEPS, SymbolTable, type SymbolId } from "../../../ir/reactivity.ts";
import type { IRComponent, IRModule } from "../../../ir/render/nodes.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { analyzePass } from "./index.ts";

function mockExpr(code = "x"): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

function makeModule(components: IRComponent[]): IRModule {
  const sf = ts.createSourceFile("t.tsx", "", ts.ScriptTarget.Latest, true);
  return { version: 1, fileName: "t.tsx", components, imports: [], sourceFile: sf };
}

function makeComp(overrides: Partial<IRComponent> = {}): IRComponent {
  return {
    kind: "Component",
    id: "t.tsx#T",
    name: "T",
    loc: UNKNOWN_LOCATION,
    props: [],
    slots: [],
    events: [],
    state: [],
    refs: [],
    memos: [],
    effects: [],
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render: { kind: "Text", value: "", loc: UNKNOWN_LOCATION },
    primitives: [],
    styles: [],
    targetOverrides: {},
    ...overrides,
  };
}

describe("analyzePass", () => {
  it("has name 'analyze'", () => {
    expect(analyzePass.name).toBe("analyze");
  });

  it("returns AnalyzedModule with graphs map keyed by component.id", async () => {
    const compA = makeComp({ id: "f#A", name: "A" });
    const compB = makeComp({ id: "f#B", name: "B" });
    const module = makeModule([compA, compB]);
    const result = await analyzePass.run(module, makeCtx());

    expect(result.module).toBe(module);
    expect(result.graphs.has("f#A")).toBe(true);
    expect(result.graphs.has("f#B")).toBe(true);
  });

  it("fires INK0010 for empty effect", async () => {
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
    const ctx = makeCtx();
    await analyzePass.run(makeModule([comp]), ctx);
    const codes = ctx.diagnostics.freeze().map((d) => d.code);
    expect(codes).toContain("INK0010");
  });

  it("fires INK0030 for cycle", async () => {
    const a: SymbolId = "a" as SymbolId;
    const b: SymbolId = "b" as SymbolId;
    const comp = makeComp({
      memos: [
        {
          name: "a",
          symbolId: a,
          expr: {
            kind: "Expression",
            expr: mockExpr("x"),
            deps: [{ symbolId: b, kind: "memo", name: "b", path: [], conditional: false }],
            isReactive: true,
            emissionContext: "setup",
            isDynamic: false,
            loc: UNKNOWN_LOCATION,
          },
          loc: UNKNOWN_LOCATION,
        },
        {
          name: "b",
          symbolId: b,
          expr: {
            kind: "Expression",
            expr: mockExpr("x"),
            deps: [{ symbolId: a, kind: "memo", name: "a", path: [], conditional: false }],
            isReactive: true,
            emissionContext: "setup",
            isDynamic: false,
            loc: UNKNOWN_LOCATION,
          },
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    const ctx = makeCtx();
    await analyzePass.run(makeModule([comp]), ctx);
    const codes = ctx.diagnostics.freeze().map((d) => d.code);
    expect(codes).toContain("INK0030");
  });

  it("returns empty graphs map for empty module", async () => {
    const result = await analyzePass.run(makeModule([]), makeCtx());
    expect(result.graphs.size).toBe(0);
  });
});
