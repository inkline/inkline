import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import {
  createAttribute,
  createElement,
  createExpr,
  createFragment,
  createStaticValue,
  createText,
} from "../../../ir/render/builders.ts";
import type { IRComponent, IRElement } from "../../../ir/render/nodes.ts";
import { staticMark } from "./static-mark.ts";

function mockExpr(code = "x"): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function makeComp(render: IRElement): IRComponent {
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
    styles: [],
    targetOverrides: {},
  };
}

describe("staticMark", () => {
  it("marks element with only static attrs and text children as static", () => {
    const el = createElement({
      tag: "p",
      attrs: [createAttribute({ name: "class", value: createStaticValue({ value: "x" }) })],
      children: [createText({ value: "hello" })],
    });
    const result = staticMark(makeComp(el));
    expect((result.render as IRElement).isStatic).toBe(true);
  });

  it("marks element with dynamic attr as non-static", () => {
    const el = createElement({
      tag: "p",
      attrs: [
        createAttribute({
          name: "class",
          value: createExpr({ expr: mockExpr("cls") }),
        }),
      ],
    });
    const result = staticMark(makeComp(el));
    expect((result.render as IRElement).isStatic).toBe(false);
  });

  it("marks element with events as non-static", () => {
    const handler = createExpr({ expr: mockExpr("fn") });
    const el = createElement({
      tag: "button",
      events: [{ name: "onClick", handler, loc: UNKNOWN_LOCATION }],
    });
    const result = staticMark(makeComp(el));
    expect((result.render as IRElement).isStatic).toBe(false);
  });

  it("marks element with refs as non-static", () => {
    const ref = createExpr({ expr: mockExpr("r") });
    const el = createElement({
      tag: "div",
      refs: [{ ref, category: "element", loc: UNKNOWN_LOCATION }],
    });
    const result = staticMark(makeComp(el));
    expect((result.render as IRElement).isStatic).toBe(false);
  });

  it("marks nested static elements bottom-up", () => {
    const inner = createElement({
      tag: "span",
      children: [createText({ value: "hi" })],
    });
    const outer = createElement({ tag: "div", children: [inner] });
    const result = staticMark(makeComp(outer));
    const outerResult = result.render as IRElement;
    expect(outerResult.isStatic).toBe(true);
    expect((outerResult.children[0] as IRElement).isStatic).toBe(true);
  });

  it("marks parent non-static when child has dynamic attr", () => {
    const inner = createElement({
      tag: "span",
      attrs: [createAttribute({ name: "id", value: createExpr({ expr: mockExpr("x") }) })],
    });
    const outer = createElement({ tag: "div", children: [inner] });
    const result = staticMark(makeComp(outer));
    expect((result.render as IRElement).isStatic).toBe(false);
  });

  it("marks element with Expression child as non-static", () => {
    const el = createElement({
      tag: "div",
      children: [createExpr({ expr: mockExpr("x") })],
    });
    const result = staticMark(makeComp(el));
    expect((result.render as IRElement).isStatic).toBe(false);
  });

  it("marks element with static Fragment children as static", () => {
    const frag = createFragment({ children: [createText({ value: "a" })] });
    const el = createElement({ tag: "div", children: [frag] });
    const result = staticMark(makeComp(el));
    expect((result.render as IRElement).isStatic).toBe(true);
  });

  it("preserves reference when nothing changes", () => {
    const el = createElement({ tag: "div" });
    const comp = makeComp(el);
    const result = staticMark(comp);
    expect(result.render).not.toBe(el);
    expect((result.render as IRElement).isStatic).toBe(true);
  });
});
