import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { computeCoverageFromModules } from "./coverage.ts";
import { UNKNOWN_LOCATION } from "../ir/types.ts";
import {
  createElement,
  createText,
  createExpr,
  createIf,
  createFor,
  createFragment,
} from "../ir/render/builders.ts";
import type { IRComponent } from "../ir/render/nodes.ts";
import type { AnalyzedModule } from "../pipeline/compile.ts";

function mockExpr(code = "x"): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function makeModule(components: IRComponent[]): AnalyzedModule {
  const sf = ts.createSourceFile("t.tsx", "", ts.ScriptTarget.Latest, true);
  return {
    module: { version: 1, fileName: "t.tsx", components, imports: [], sourceFile: sf },
    graphs: new Map(),
  };
}

function makeComp(render: ReturnType<typeof createElement>): IRComponent {
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
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render,
    primitives: [],
    targetOverrides: {},
  };
}

describe("computeCoverageFromModules", () => {
  it("reports all kinds as missing when no components", () => {
    const module = makeModule([]);
    const report = computeCoverageFromModules([{ target: "react", module }]);
    expect(report.allCovered).toBe(false);
    expect(report.missingByTarget.react!.length).toBeGreaterThan(0);
  });

  it("tracks covered IR node kinds", () => {
    const comp = makeComp(
      createElement({
        tag: "div",
        children: [createText({ value: "hello" }), createExpr({ expr: mockExpr("x") })],
      }),
    );
    const module = makeModule([comp]);
    const report = computeCoverageFromModules([{ target: "react", module }]);
    const covered = report.coveredByTarget.react!;
    expect(covered.has("Element")).toBe(true);
    expect(covered.has("Text")).toBe(true);
    expect(covered.has("Expression")).toBe(true);
  });

  it("reports missing kinds", () => {
    const comp = makeComp(createElement({ tag: "div" }));
    const module = makeModule([comp]);
    const report = computeCoverageFromModules([{ target: "react", module }]);
    expect(report.missingByTarget.react).toContain("If");
    expect(report.missingByTarget.react).toContain("For");
  });

  it("reports allCovered when all kinds present", () => {
    const test = createExpr({ expr: mockExpr("true") });
    const each = createExpr({ expr: mockExpr("items") });
    const key = createExpr({ expr: mockExpr("i") });
    const render = createFragment({
      children: [
        createElement({ tag: "div", children: [createText({ value: "x" })] }),
        createExpr({ expr: mockExpr("y") }),
        createIf({ branches: [{ test, body: createText({ value: "a" }) }] }),
        createFor({ each, itemBinding: "i", key, body: createText({ value: "b" }) }),
        {
          kind: "Switch" as const,
          cases: [{ test, body: createText({ value: "c" }) }],
          loc: UNKNOWN_LOCATION,
        },
        {
          kind: "SlotPlaceholder" as const,
          name: "default",
          scopedArgs: [],
          loc: UNKNOWN_LOCATION,
        },
        {
          kind: "ComponentInstance" as const,
          reference: mockExpr("Btn") as unknown as ts.Identifier,
          attrs: [],
          events: [],
          refs: [],
          slots: [],
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    const comp = makeComp(render as unknown as ReturnType<typeof createElement>);
    const module = makeModule([comp]);
    const report = computeCoverageFromModules([{ target: "react", module }]);
    expect(report.allCovered).toBe(true);
  });
});
