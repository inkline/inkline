import * as ts from "typescript";
import { describe, expect, it, vi } from "vitest";

import {
  createAttribute,
  createComponentSkeleton,
  createElement,
  createExpression,
  createFor,
  createFragment,
  createIf,
  createStaticValue,
  createSwitch,
  createText,
} from "./builders.ts";
import type { IRComponentInstance, IRExpressionNode, IRNode, IRSlotPlaceholder } from "./nodes.ts";
import { UNKNOWN_LOCATION } from "./types.ts";
import { walkNode, walkRenderTree, type IRVisitor } from "./visit.ts";

const ident = (name: string): ts.Identifier => ts.factory.createIdentifier(name);
const expr = (name: string): IRExpressionNode => createExpression({ expr: ident(name) });

describe("walkRenderTree", () => {
  it("delegates to walkNode with the component's render tree", () => {
    const render = createText("hi");
    const component = createComponentSkeleton({
      id: "C",
      name: "C",
      render,
    });
    const enter = vi.fn();
    walkRenderTree(component, { enter });
    expect(enter).toHaveBeenCalledTimes(1);
    expect(enter).toHaveBeenCalledWith(render, null);
  });
});

describe("walkNode", () => {
  it("invokes enter then exit in DFS order, with correct parent links", () => {
    const events: Array<{ phase: "enter" | "exit"; kind: string; parent: string | null }> = [];
    const visitor: IRVisitor = {
      enter: (n, p) => events.push({ phase: "enter", kind: n.kind, parent: p?.kind ?? null }),
      exit: (n, p) => events.push({ phase: "exit", kind: n.kind, parent: p?.kind ?? null }),
    };
    const inner = createElement({
      tag: "span",
      children: [createText("hi")],
    });
    const outer = createElement({ tag: "div", children: [inner] });
    walkNode(outer, null, visitor);
    expect(events).toEqual([
      { phase: "enter", kind: "Element", parent: null },
      { phase: "enter", kind: "Element", parent: "Element" },
      { phase: "enter", kind: "Text", parent: "Element" },
      { phase: "exit", kind: "Text", parent: "Element" },
      { phase: "exit", kind: "Element", parent: "Element" },
      { phase: "exit", kind: "Element", parent: null },
    ]);
  });

  it("emits the expression hook for attributes, events, and refs of an Element", () => {
    const expression = expr("title");
    const handler = expr("handler");
    const refExpr = expr("ref");
    const node = createElement({
      tag: "input",
      attrs: [
        createAttribute({ name: "value", value: expression }),
        createAttribute({ name: "type", value: createStaticValue("text") }),
      ],
      events: [{ name: "onClick", handler, loc: UNKNOWN_LOCATION }],
      refs: [{ ref: refExpr, loc: UNKNOWN_LOCATION }],
    });
    const seen: IRExpressionNode[] = [];
    walkNode(node, null, {
      expression: (e) => {
        seen.push(e);
      },
    });
    expect(seen).toEqual([expression, handler, refExpr]);
  });

  it("does not emit the expression hook for static-valued attributes", () => {
    const node = createElement({
      tag: "div",
      attrs: [createAttribute({ name: "id", value: createStaticValue("x") })],
    });
    const expression = vi.fn();
    walkNode(node, null, { expression });
    expect(expression).not.toHaveBeenCalled();
  });

  it("walks ComponentInstance attrs, events, and slot bodies", () => {
    const attrExpr = expr("variant");
    const handler = expr("h");
    const slotChild = expr("inner");
    const componentInstance: IRComponentInstance = {
      kind: "ComponentInstance",
      reference: ident("Card"),
      attrs: [
        // Mix expression and static attrs to exercise both branches of the
        // attr.value.kind check inside the ComponentInstance traversal.
        createAttribute({ name: "variant", value: attrExpr }),
        createAttribute({ name: "tone", value: createStaticValue("dark") }),
      ],
      events: [{ name: "onClick", handler, loc: UNKNOWN_LOCATION }],
      slots: [
        {
          name: "default",
          body: slotChild,
          scopedParams: [],
          loc: UNKNOWN_LOCATION,
        },
      ],
      loc: UNKNOWN_LOCATION,
    };
    const seen: string[] = [];
    walkNode(componentInstance, null, {
      enter: (n) => seen.push(`enter:${n.kind}`),
      expression: (e) => seen.push(`expr:${(e.expr as ts.Identifier).text}`),
    });
    expect(seen).toEqual([
      "enter:ComponentInstance",
      "expr:variant",
      "expr:h",
      "enter:Expression",
      "expr:inner",
    ]);
  });

  it("emits expression hook for a top-level Expression node with the parent as owner", () => {
    const e = expr("x");
    const enter = vi.fn();
    const expression = vi.fn();
    walkNode(e, null, { enter, expression });
    expect(enter).toHaveBeenCalledWith(e, null);
    expect(expression).toHaveBeenCalledWith(e, null);
  });

  it("walks If branches (test + body) and the fallback", () => {
    const t1 = expr("a");
    const t2 = expr("b");
    const body1 = createText("yes-a");
    const body2 = createText("yes-b");
    const fallback = createText("none");
    const node = createIf({
      branches: [
        { test: t1, body: body1 },
        { test: t2, body: body2 },
      ],
      fallback,
    });
    const seen: string[] = [];
    walkNode(node, null, {
      enter: (n) => seen.push(`enter:${n.kind}`),
      expression: (e) => seen.push(`expr:${(e.expr as ts.Identifier).text}`),
    });
    expect(seen).toEqual([
      "enter:If",
      "expr:a",
      "enter:Text",
      "expr:b",
      "enter:Text",
      "enter:Text",
    ]);
  });

  it("walks If branches without a fallback when none is provided", () => {
    const node = createIf({ branches: [{ test: expr("a"), body: createText("a") }] });
    const enter = vi.fn();
    walkNode(node, null, { enter });
    // 1 If + 1 Text = 2 enter calls; no fallback enter
    expect(enter).toHaveBeenCalledTimes(2);
  });

  it("walks For each + key + body", () => {
    const each = expr("items");
    const key = expr("id");
    const body = createText("row");
    const node = createFor({ each, itemBinding: "item", key, body });
    const seen: string[] = [];
    walkNode(node, null, {
      enter: (n) => seen.push(`enter:${n.kind}`),
      expression: (e) => seen.push(`expr:${(e.expr as ts.Identifier).text}`),
    });
    expect(seen).toEqual(["enter:For", "expr:items", "expr:id", "enter:Text"]);
  });

  it("walks Switch cases and fallback", () => {
    const node = createSwitch({
      cases: [
        { test: expr("a"), body: createText("a") },
        { test: expr("b"), body: createText("b") },
      ],
      fallback: createText("else"),
    });
    const seen: string[] = [];
    walkNode(node, null, {
      enter: (n) => seen.push(`enter:${n.kind}`),
      expression: (e) => seen.push(`expr:${(e.expr as ts.Identifier).text}`),
    });
    expect(seen).toEqual([
      "enter:Switch",
      "expr:a",
      "enter:Text",
      "expr:b",
      "enter:Text",
      "enter:Text",
    ]);
  });

  it("walks Switch with no fallback", () => {
    const node = createSwitch({ cases: [{ test: expr("a"), body: createText("a") }] });
    const enter = vi.fn();
    walkNode(node, null, { enter });
    expect(enter).toHaveBeenCalledTimes(2); // Switch + Text
  });

  it("walks SlotPlaceholder scopedArgs and fallback", () => {
    const fallback = createText("fb");
    const placeholder: IRSlotPlaceholder = {
      kind: "SlotPlaceholder",
      name: "header",
      scopedArgs: [expr("count"), expr("total")],
      fallback,
      loc: UNKNOWN_LOCATION,
    };
    const seen: string[] = [];
    walkNode(placeholder, null, {
      enter: (n) => seen.push(`enter:${n.kind}`),
      expression: (e) => seen.push(`expr:${(e.expr as ts.Identifier).text}`),
    });
    expect(seen).toEqual(["enter:SlotPlaceholder", "expr:count", "expr:total", "enter:Text"]);
  });

  it("walks SlotPlaceholder without fallback", () => {
    const placeholder: IRSlotPlaceholder = {
      kind: "SlotPlaceholder",
      name: "default",
      scopedArgs: [],
      loc: UNKNOWN_LOCATION,
    };
    const enter = vi.fn();
    walkNode(placeholder, null, { enter });
    expect(enter).toHaveBeenCalledTimes(1);
  });

  it("walks Fragment children", () => {
    const a = createText("a");
    const b = createText("b");
    const frag = createFragment([a, b]);
    const seen: IRNode[] = [];
    walkNode(frag, null, { enter: (n) => seen.push(n) });
    expect(seen).toEqual([frag, a, b]);
  });

  it("treats Text as a leaf — no recursive descent", () => {
    const t = createText("hi");
    const enter = vi.fn();
    const expression = vi.fn();
    walkNode(t, null, { enter, expression });
    expect(enter).toHaveBeenCalledTimes(1);
    expect(expression).not.toHaveBeenCalled();
  });

  it("works when the visitor provides no callbacks", () => {
    const node = createElement({
      tag: "div",
      children: [createText("a"), expr("x")],
    });
    expect(() => walkNode(node, null, {})).not.toThrow();
  });
});
