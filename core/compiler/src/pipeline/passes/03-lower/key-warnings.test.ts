import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { createExpr, createText } from "../../../ir/render/builders.ts";
import type { IRComponent, IRFor } from "../../../ir/render/nodes.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { keyWarnings } from "./key-warnings.ts";

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

function makeComp(render: IRFor): IRComponent {
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
    provides: [],
    consumes: [],
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render,
    primitives: [],
    styles: [],
    runtime: "iso",
    targetOverrides: {},
  };
}

describe("keyWarnings", () => {
  it("pushes INK0050 when syntheticKey is true", () => {
    const forNode: IRFor = {
      kind: "For",
      each: createExpr({ expr: mockExpr("items") }),
      itemBinding: "item",
      key: createExpr({ expr: mockExpr("item") }),
      syntheticKey: true,
      body: createText({ value: "x" }),
      loc: UNKNOWN_LOCATION,
    };
    const ctx = makeCtx();
    keyWarnings(makeComp(forNode), ctx);
    const diags = ctx.diagnostics.freeze();
    expect(diags).toHaveLength(1);
    expect(diags[0]!.code).toBe("INK0050");
  });

  it("does not push diagnostic when syntheticKey is false", () => {
    const forNode: IRFor = {
      kind: "For",
      each: createExpr({ expr: mockExpr("items") }),
      itemBinding: "item",
      key: createExpr({ expr: mockExpr("item.id") }),
      body: createText({ value: "x" }),
      loc: UNKNOWN_LOCATION,
    };
    const ctx = makeCtx();
    keyWarnings(makeComp(forNode), ctx);
    expect(ctx.diagnostics.freeze()).toHaveLength(0);
  });

  it("does not push diagnostic when syntheticKey is undefined", () => {
    const forNode: IRFor = {
      kind: "For",
      each: createExpr({ expr: mockExpr("items") }),
      itemBinding: "item",
      key: createExpr({ expr: mockExpr("item.id") }),
      body: createText({ value: "x" }),
      loc: UNKNOWN_LOCATION,
    };
    const ctx = makeCtx();
    keyWarnings(makeComp(forNode), ctx);
    expect(ctx.diagnostics.freeze()).toHaveLength(0);
  });
});
