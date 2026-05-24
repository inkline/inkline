import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { createExpr, createSlotPlaceholder, createText } from "../../../ir/render/builders.ts";
import type { IRComponent } from "../../../ir/render/nodes.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { slotDeclarations } from "./slot-declarations.ts";

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

function makeComp(
  render: IRComponent["render"],
  existingSlots: IRComponent["slots"] = [],
): IRComponent {
  return {
    kind: "Component",
    id: "t#T",
    name: "T",
    loc: UNKNOWN_LOCATION,
    props: [],
    slots: existingSlots,
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
    targetOverrides: {},
  };
}

describe("slotDeclarations", () => {
  it("adds declaration for SlotPlaceholder not in component.slots", () => {
    const comp = makeComp(createSlotPlaceholder({ name: "header" }));
    const ctx = makeCtx();
    const result = slotDeclarations(comp, ctx);
    expect(result.slots).toHaveLength(1);
    expect(result.slots[0]!.name).toBe("header");
  });

  it("skips names already declared in component.slots", () => {
    const existing = [
      { name: "header", isScoped: false, scopedProps: [], required: false, loc: UNKNOWN_LOCATION },
    ];
    const comp = makeComp(createSlotPlaceholder({ name: "header" }), existing);
    const ctx = makeCtx();
    const result = slotDeclarations(comp, ctx);
    expect(result).toBe(comp);
  });

  it("handles multiple SlotPlaceholders with different names", () => {
    const comp = makeComp({
      kind: "Fragment",
      children: [
        createSlotPlaceholder({ name: "header" }),
        createSlotPlaceholder({ name: "default" }),
        createSlotPlaceholder({ name: "footer" }),
      ],
      loc: UNKNOWN_LOCATION,
    });
    const ctx = makeCtx();
    const result = slotDeclarations(comp, ctx);
    expect(result.slots).toHaveLength(3);
    expect(result.slots.map((s) => s.name).sort()).toEqual(["default", "footer", "header"]);
  });

  it("handles duplicate SlotPlaceholder names (only declares once)", () => {
    const comp = makeComp({
      kind: "Fragment",
      children: [
        createSlotPlaceholder({ name: "header" }),
        createSlotPlaceholder({ name: "header" }),
      ],
      loc: UNKNOWN_LOCATION,
    });
    const ctx = makeCtx();
    const result = slotDeclarations(comp, ctx);
    expect(result.slots).toHaveLength(1);
    expect(result.slots[0]!.name).toBe("header");
  });

  it("sets isScoped=true when scopedArgs present", () => {
    const comp = makeComp(
      createSlotPlaceholder({
        name: "item",
        scopedArgs: [createExpr({ expr: mockExpr("item") })],
      }),
    );
    const ctx = makeCtx();
    const result = slotDeclarations(comp, ctx);
    expect(result.slots[0]!.isScoped).toBe(true);
  });

  it("sets isScoped=false when no scopedArgs", () => {
    const comp = makeComp(createSlotPlaceholder({ name: "header" }));
    const ctx = makeCtx();
    const result = slotDeclarations(comp, ctx);
    expect(result.slots[0]!.isScoped).toBe(false);
  });

  it("returns component unchanged when no SlotPlaceholders", () => {
    const comp = makeComp(createText({ value: "plain" }));
    const ctx = makeCtx();
    const result = slotDeclarations(comp, ctx);
    expect(result).toBe(comp);
  });

  it("returns component unchanged when all placeholders already declared", () => {
    const existing = [
      { name: "default", isScoped: false, scopedProps: [], required: false, loc: UNKNOWN_LOCATION },
    ];
    const comp = makeComp(createSlotPlaceholder({ name: "default" }), existing);
    const ctx = makeCtx();
    const result = slotDeclarations(comp, ctx);
    expect(result).toBe(comp);
  });

  it("preserves existing slot declarations when adding new ones", () => {
    const existing = [
      { name: "header", isScoped: false, scopedProps: [], required: true, loc: UNKNOWN_LOCATION },
    ];
    const comp = makeComp(
      {
        kind: "Fragment",
        children: [
          createSlotPlaceholder({ name: "header" }),
          createSlotPlaceholder({ name: "footer" }),
        ],
        loc: UNKNOWN_LOCATION,
      },
      existing,
    );
    const ctx = makeCtx();
    const result = slotDeclarations(comp, ctx);
    expect(result.slots).toHaveLength(2);
    expect(result.slots[0]!.name).toBe("header");
    expect(result.slots[0]!.required).toBe(true);
    expect(result.slots[1]!.name).toBe("footer");
  });
});
