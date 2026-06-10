import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import {
  createComponentInstance,
  createElement,
  createExpr,
  createFor,
  createFragment,
  createIf,
  createSlotPlaceholder,
  createSwitch,
  createText,
  createTransition,
} from "../../../ir/render/builders.ts";
import type {
  IRComponent,
  IRComponentInstance,
  IRElement,
  IRNode,
} from "../../../ir/render/nodes.ts";
import { markRootFallthrough } from "./mark-root-fallthrough.ts";

function mockExpr(code = "x"): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function makeComp(render: IRNode): IRComponent {
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

describe("markRootFallthrough", () => {
  it("marks a host-element root as accepting fallthrough", () => {
    const result = markRootFallthrough(makeComp(createElement({ tag: "div" })));
    expect((result.render as IRElement).acceptsAttrFallthrough).toBe(true);
  });

  it("marks a component-instance root as accepting fallthrough", () => {
    const root = createComponentInstance({ reference: ts.factory.createIdentifier("Child") });
    const result = markRootFallthrough(makeComp(root));
    expect((result.render as IRComponentInstance).acceptsAttrFallthrough).toBe(true);
  });

  it("leaves a Fragment root unmarked", () => {
    const comp = makeComp(createFragment({ children: [createText({ value: "a" })] }));
    expect(markRootFallthrough(comp)).toBe(comp);
  });

  it("leaves an If root unmarked", () => {
    const comp = makeComp(
      createIf({
        branches: [{ test: createExpr({ expr: mockExpr("c") }), body: createText({ value: "a" }) }],
      }),
    );
    expect(markRootFallthrough(comp)).toBe(comp);
  });

  it("leaves a For root unmarked", () => {
    const comp = makeComp(
      createFor({
        each: createExpr({ expr: mockExpr("items") }),
        itemBinding: "item",
        key: createExpr({ expr: mockExpr("item.id") }),
        body: createText({ value: "a" }),
      }),
    );
    expect(markRootFallthrough(comp)).toBe(comp);
  });

  it("leaves a Switch root unmarked", () => {
    const comp = makeComp(
      createSwitch({
        cases: [{ test: createExpr({ expr: mockExpr("c") }), body: createText({ value: "a" }) }],
      }),
    );
    expect(markRootFallthrough(comp)).toBe(comp);
  });

  it("leaves a Text root unmarked", () => {
    const comp = makeComp(createText({ value: "a" }));
    expect(markRootFallthrough(comp)).toBe(comp);
  });

  it("leaves an Expression root unmarked", () => {
    const comp = makeComp(createExpr({ expr: mockExpr("x") }));
    expect(markRootFallthrough(comp)).toBe(comp);
  });

  it("leaves a SlotPlaceholder root unmarked", () => {
    const comp = makeComp(createSlotPlaceholder({}));
    expect(markRootFallthrough(comp)).toBe(comp);
  });

  it("leaves a Transition root unmarked", () => {
    const comp = makeComp(createTransition({ child: createText({ value: "a" }) }));
    expect(markRootFallthrough(comp)).toBe(comp);
  });

  it("is idempotent for an already-marked root", () => {
    const comp = makeComp(createElement({ tag: "div", acceptsAttrFallthrough: true }));
    expect(markRootFallthrough(comp)).toBe(comp);
  });
});
