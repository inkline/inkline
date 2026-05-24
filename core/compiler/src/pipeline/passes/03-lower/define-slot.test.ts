import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { createExpr, createElement, createText } from "../../../ir/render/builders.ts";
import type { IRComponent, IRSlotPlaceholder } from "../../../ir/render/nodes.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { defineSlotLowering } from "./define-slot.ts";

function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.tsx", code, ts.ScriptTarget.Latest, true);
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

function makeComp(render: IRComponent["render"], slotBindings?: Map<string, string>): IRComponent {
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
    render,
    primitives: [],
    styles: [],
    runtime: "iso",
    provides: [],
    consumes: [],
    targetOverrides: {},
    slotBindings,
  };
}

describe("defineSlotLowering", () => {
  it("replaces identifier reference with SlotPlaceholder", () => {
    const bindings = new Map([["header", "header"]]);
    const comp = makeComp(createExpr({ expr: mockExpr("header") }), bindings);
    const ctx = makeCtx();
    const result = defineSlotLowering(comp, ctx);
    expect(result.render.kind).toBe("SlotPlaceholder");
    expect((result.render as IRSlotPlaceholder).name).toBe("header");
  });

  it("uses correct slot name from defineSlot arg", () => {
    const bindings = new Map([["mySlot", "sidebar"]]);
    const comp = makeComp(createExpr({ expr: mockExpr("mySlot") }), bindings);
    const ctx = makeCtx();
    const result = defineSlotLowering(comp, ctx);
    expect((result.render as IRSlotPlaceholder).name).toBe("sidebar");
  });

  it('defaults to "default" when slot name is "default"', () => {
    const bindings = new Map([["content", "default"]]);
    const comp = makeComp(createExpr({ expr: mockExpr("content") }), bindings);
    const ctx = makeCtx();
    const result = defineSlotLowering(comp, ctx);
    expect((result.render as IRSlotPlaceholder).name).toBe("default");
  });

  it("returns component unchanged when no slotBindings", () => {
    const comp = makeComp(createText({ value: "plain" }));
    const ctx = makeCtx();
    const result = defineSlotLowering(comp, ctx);
    expect(result).toBe(comp);
  });

  it("returns component unchanged when slotBindings is empty", () => {
    const comp = makeComp(createText({ value: "plain" }), new Map());
    const ctx = makeCtx();
    const result = defineSlotLowering(comp, ctx);
    expect(result).toBe(comp);
  });

  it("handles multiple defineSlot bindings in same component", () => {
    const bindings = new Map([
      ["header", "header"],
      ["content", "default"],
    ]);
    const comp = makeComp(
      {
        kind: "Fragment",
        children: [
          createExpr({ expr: mockExpr("header") }),
          createExpr({ expr: mockExpr("content") }),
        ],
        loc: UNKNOWN_LOCATION,
      },
      bindings,
    );
    const ctx = makeCtx();
    const result = defineSlotLowering(comp, ctx);
    const frag = result.render;
    expect(frag.kind).toBe("Fragment");
    if (frag.kind === "Fragment") {
      expect(frag.children[0]!.kind).toBe("SlotPlaceholder");
      expect((frag.children[0] as IRSlotPlaceholder).name).toBe("header");
      expect(frag.children[1]!.kind).toBe("SlotPlaceholder");
      expect((frag.children[1] as IRSlotPlaceholder).name).toBe("default");
    }
  });

  it("does not replace identifiers that are not in slotBindings", () => {
    const bindings = new Map([["header", "header"]]);
    const comp = makeComp(createExpr({ expr: mockExpr("someOtherVar") }), bindings);
    const ctx = makeCtx();
    const result = defineSlotLowering(comp, ctx);
    expect(result.render.kind).toBe("Expression");
  });

  it("replaces references inside nested elements", () => {
    const bindings = new Map([["content", "default"]]);
    const comp = makeComp(
      createElement({
        tag: "div",
        children: [createExpr({ expr: mockExpr("content") })],
      }),
      bindings,
    );
    const ctx = makeCtx();
    const result = defineSlotLowering(comp, ctx);
    if (result.render.kind === "Element") {
      expect(result.render.children[0]!.kind).toBe("SlotPlaceholder");
    }
  });
});
