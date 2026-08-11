import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import {
  createAttribute,
  createElement,
  createExpr,
  createSlotPlaceholder,
  createText,
} from "../../../ir/render/builders.ts";
import type { IRComponent } from "../../../ir/render/nodes.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { unloweredSlots } from "./unlowered-slots.ts";

function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
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

function makeComp(render: IRComponent["render"]): IRComponent {
  return {
    kind: "Component",
    id: "t#T",
    name: "T",
    loc: UNKNOWN_LOCATION,
    props: [],
    slots: [],
    events: [],
    models: [],
    state: [],
    refs: [],
    memos: [],
    effects: [],
    resources: [],
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render,
    primitives: [],
    styles: [],
    runtime: "iso",
    provides: [],
    consumes: [],
    targetOverrides: {},
  };
}

function codes(component: IRComponent): string[] {
  const ctx = makeCtx();
  unloweredSlots(component, ctx);
  return ctx.diagnostics.freeze().map((d) => d.code);
}

describe("unloweredSlots", () => {
  it("refuses a <Slot> left inside an expression node (INK0069)", () => {
    const comp = makeComp(createExpr({ expr: mockExpr(`(() => <Slot name="icon" />)()`) }));
    expect(codes(comp)).toEqual(["INK0069"]);
  });

  it("reports every unlowered <Slot>, not just the first", () => {
    const comp = makeComp(createExpr({ expr: mockExpr(`[<Slot name="a" />, <Slot name="b" />]`) }));
    expect(codes(comp)).toEqual(["INK0069", "INK0069"]);
  });

  // The visitor `walkRenderTree` uses does not descend into attributes, so the structural walk is
  // what covers this position — and a new IR node carrying an expression somewhere new too.
  it("reaches expressions held in element attributes", () => {
    const comp = makeComp(
      createElement({
        tag: "div",
        attrs: [
          createAttribute({
            name: "content",
            value: createExpr({ expr: mockExpr(`(() => <Slot name="icon" />)()`) }),
          }),
        ],
      }),
    );
    expect(codes(comp)).toEqual(["INK0069"]);
  });

  it("stays silent on a slot lowering already materialised", () => {
    const comp = makeComp(createSlotPlaceholder({ name: "icon" }));
    expect(codes(comp)).toEqual([]);
  });

  it("stays silent on a render tree holding no <Slot>", () => {
    const comp = makeComp(
      createElement({
        tag: "div",
        children: [createText({ value: "hi" }), createExpr({ expr: mockExpr(`count() + 1`) })],
      }),
    );
    expect(codes(comp)).toEqual([]);
  });

  it("leaves the component unchanged", () => {
    const comp = makeComp(createExpr({ expr: mockExpr(`(() => <Slot name="icon" />)()`) }));
    expect(unloweredSlots(comp, makeCtx())).toBe(comp);
  });
});
