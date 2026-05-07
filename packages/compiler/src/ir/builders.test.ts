import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import {
  createAttribute,
  createComponentSkeleton,
  createDynamicExpression,
  createElement,
  createExpression,
  createFor,
  createFragment,
  createIf,
  createSlotContent,
  createStaticValue,
  createSwitch,
  createText,
} from "./builders.ts";
import type {
  IRComponentInstance,
  IRElement,
  IRExpressionNode,
  IRFor,
  IRIf,
  IRSlotPlaceholder,
  IRSwitch,
} from "./nodes.ts";
import { DYNAMIC_DEPS, type IRDepResolution } from "./reactivity.ts";
import { UNKNOWN_LOCATION, type SourceLocation } from "./types.ts";

const fakeLoc: SourceLocation = {
  file: "/sample.ink.tsx",
  line: 7,
  column: 11,
  offset: 100,
  length: 4,
};

const ident = (name: string): ts.Identifier => ts.factory.createIdentifier(name);
const stubSymbol = (name: string): ts.Symbol =>
  ({
    name,
    flags: 0,
    declarations: [],
  }) as unknown as ts.Symbol;

describe("createExpression", () => {
  it("defaults: empty deps, non-reactive, non-dynamic, setup context, unknown loc", () => {
    const node = createExpression({ expr: ident("x") });
    expect(node.kind).toBe("Expression");
    expect(node.expr).toBeDefined();
    expect(node.deps).toEqual([]);
    expect(node.isReactive).toBe(false);
    expect(node.isDynamic).toBe(false);
    expect(node.emissionContext).toBe("setup");
    expect(node.loc).toBe(UNKNOWN_LOCATION);
  });

  it("propagates resolution.deps / isReactive / isDynamic", () => {
    const sym = stubSymbol("count");
    const resolution: IRDepResolution = {
      deps: [
        {
          symbol: sym,
          kind: "signal",
          name: "count",
          path: [],
          conditional: false,
        },
      ],
      isReactive: true,
      isDynamic: false,
    };
    const node = createExpression({
      expr: ident("count"),
      resolution,
      emissionContext: "template",
      loc: fakeLoc,
    });
    expect(node.deps).toBe(resolution.deps);
    expect(node.isReactive).toBe(true);
    expect(node.isDynamic).toBe(false);
    expect(node.emissionContext).toBe("template");
    expect(node.loc).toBe(fakeLoc);
  });

  it("preserves the dynamic flag from resolution", () => {
    const node = createExpression({
      expr: ident("x"),
      resolution: {
        deps: DYNAMIC_DEPS,
        isReactive: true,
        isDynamic: true,
      },
    });
    expect(node.isDynamic).toBe(true);
    expect(node.deps).toBe(DYNAMIC_DEPS);
  });
});

describe("createDynamicExpression", () => {
  it("uses DYNAMIC_DEPS sentinel and reactive flags", () => {
    const node = createDynamicExpression(ident("signals"));
    expect(node.deps).toBe(DYNAMIC_DEPS);
    expect(node.isReactive).toBe(true);
    expect(node.isDynamic).toBe(true);
    expect(node.emissionContext).toBe("setup");
    expect(node.loc).toBe(UNKNOWN_LOCATION);
  });

  it("accepts an explicit location", () => {
    const node = createDynamicExpression(ident("signals"), fakeLoc);
    expect(node.loc).toBe(fakeLoc);
  });
});

describe("createStaticValue", () => {
  const cases: Array<[label: string, value: string | number | boolean | null]> = [
    ["string", "hello"],
    ["number", 42],
    ["boolean", true],
    ["null", null],
  ];
  it.each(cases)("preserves %s values", (_label, value) => {
    const node = createStaticValue(value);
    expect(node.kind).toBe("Static");
    expect(node.value).toBe(value);
    expect(node.loc).toBe(UNKNOWN_LOCATION);
  });

  it("propagates loc", () => {
    expect(createStaticValue("x", fakeLoc).loc).toBe(fakeLoc);
  });
});

describe("createText", () => {
  it("preserves the literal value", () => {
    const node = createText("hi");
    expect(node.kind).toBe("Text");
    expect(node.value).toBe("hi");
    expect(node.loc).toBe(UNKNOWN_LOCATION);
  });

  it("propagates loc", () => {
    expect(createText("hi", fakeLoc).loc).toBe(fakeLoc);
  });
});

describe("createElement", () => {
  it("fills empty defaults for collections", () => {
    const el = createElement({ tag: "div" });
    expect(el.kind).toBe("Element");
    expect(el.tag).toBe("div");
    expect(el.attrs).toEqual([]);
    expect(el.events).toEqual([]);
    expect(el.refs).toEqual([]);
    expect(el.children).toEqual([]);
    expect(el.loc).toBe(UNKNOWN_LOCATION);
  });

  it("infers isStatic=true for an empty element", () => {
    expect(createElement({ tag: "div" }).isStatic).toBe(true);
  });

  it("infers isStatic=true for an element with only static text", () => {
    const el = createElement({
      tag: "p",
      children: [createText("hi")],
    });
    expect(el.isStatic).toBe(true);
  });

  it("infers isStatic=false when an attribute is expression-valued", () => {
    const expr = createExpression({ expr: ident("count") });
    const attr = createAttribute({ name: "title", value: expr });
    const el = createElement({ tag: "div", attrs: [attr] });
    expect(el.isStatic).toBe(false);
  });

  it("infers isStatic=false when a child is an expression", () => {
    const expr = createExpression({ expr: ident("count") });
    const el = createElement({ tag: "div", children: [expr] });
    expect(el.isStatic).toBe(false);
  });

  it("infers isStatic=false when a child is a non-text/element/fragment kind", () => {
    const componentInstance: IRComponentInstance = {
      kind: "ComponentInstance",
      reference: ident("Foo"),
      attrs: [],
      events: [],
      slots: [],
      loc: UNKNOWN_LOCATION,
    };
    const el = createElement({ tag: "div", children: [componentInstance] });
    expect(el.isStatic).toBe(false);
  });

  it("infers isStatic transitively through fragments", () => {
    const inner = createFragment([createText("a"), createText("b")]);
    const el = createElement({ tag: "div", children: [inner] });
    expect(el.isStatic).toBe(true);
  });

  it("infers isStatic=false through fragments containing non-static nodes", () => {
    const inner = createFragment([createText("a"), createExpression({ expr: ident("x") })]);
    const el = createElement({ tag: "div", children: [inner] });
    expect(el.isStatic).toBe(false);
  });

  it("respects an explicit isStatic override", () => {
    const expr = createExpression({ expr: ident("x") });
    const el = createElement({
      tag: "div",
      children: [expr],
      isStatic: true,
    });
    expect(el.isStatic).toBe(true);
  });

  it("propagates events, refs, and loc", () => {
    const handler = createExpression({ expr: ident("h") });
    const refExpr = createExpression({ expr: ident("r") });
    const el = createElement({
      tag: "button",
      events: [{ name: "onClick", handler, loc: fakeLoc }],
      refs: [{ ref: refExpr, loc: fakeLoc }],
      loc: fakeLoc,
    });
    expect(el.events).toHaveLength(1);
    expect(el.refs).toHaveLength(1);
    expect(el.loc).toBe(fakeLoc);
  });

  it("treats an element child as static iff the child reports static", () => {
    const inner = createElement({
      tag: "span",
      children: [createExpression({ expr: ident("x") })],
    });
    expect(inner.isStatic).toBe(false);
    const outer = createElement({ tag: "div", children: [inner] });
    expect(outer.isStatic).toBe(false);

    const innerStatic = createElement({ tag: "span", children: [createText("a")] });
    expect(innerStatic.isStatic).toBe(true);
    const outerStatic = createElement({ tag: "div", children: [innerStatic] });
    expect(outerStatic.isStatic).toBe(true);
  });
});

describe("createAttribute", () => {
  it("defaults binding to 'normal' and inherits loc from value", () => {
    const value = createStaticValue("x", fakeLoc);
    const attr = createAttribute({ name: "title", value });
    expect(attr.name).toBe("title");
    expect(attr.value).toBe(value);
    expect(attr.binding).toBe("normal");
    expect(attr.loc).toBe(fakeLoc);
  });

  it("respects explicit binding and loc", () => {
    const value = createStaticValue("hidden");
    const otherLoc: SourceLocation = { ...fakeLoc, line: 99 };
    const attr = createAttribute({
      name: "class",
      value,
      binding: "class",
      loc: otherLoc,
    });
    expect(attr.binding).toBe("class");
    expect(attr.loc).toBe(otherLoc);
  });

  it("accepts an expression-valued attribute", () => {
    const expr = createExpression({ expr: ident("x"), loc: fakeLoc });
    const attr = createAttribute({
      name: "data-x",
      value: expr,
      binding: "twoWay",
    });
    expect(attr.value).toBe(expr);
    expect(attr.binding).toBe("twoWay");
  });
});

describe("createFragment", () => {
  it("defaults loc to UNKNOWN_LOCATION", () => {
    const frag = createFragment([]);
    expect(frag.kind).toBe("Fragment");
    expect(frag.children).toEqual([]);
    expect(frag.loc).toBe(UNKNOWN_LOCATION);
  });

  it("propagates children and loc", () => {
    const child = createText("a");
    const frag = createFragment([child], fakeLoc);
    expect(frag.children).toEqual([child]);
    expect(frag.loc).toBe(fakeLoc);
  });
});

describe("createIf", () => {
  it("supports a single branch with no fallback", () => {
    const test = createExpression({ expr: ident("cond") });
    const node: IRIf = createIf({
      branches: [{ test, body: createText("yes") }],
    });
    expect(node.kind).toBe("If");
    expect(node.branches).toHaveLength(1);
    expect(node.fallback).toBeUndefined();
    expect(node.loc).toBe(UNKNOWN_LOCATION);
  });

  it("supports multiple branches, fallback, and loc", () => {
    const t1 = createExpression({ expr: ident("a") });
    const t2 = createExpression({ expr: ident("b") });
    const node = createIf({
      branches: [
        { test: t1, body: createText("a") },
        { test: t2, body: createText("b") },
      ],
      fallback: createText("else"),
      loc: fakeLoc,
    });
    expect(node.branches).toHaveLength(2);
    expect(node.fallback).toBeDefined();
    expect(node.loc).toBe(fakeLoc);
  });
});

describe("createFor", () => {
  it("requires each / itemBinding / key / body and defaults loc", () => {
    const each = createExpression({ expr: ident("items") });
    const key = createExpression({ expr: ident("id") });
    const body = createText("row");
    const node: IRFor = createFor({
      each,
      itemBinding: "item",
      key,
      body,
    });
    expect(node.kind).toBe("For");
    expect(node.itemBinding).toBe("item");
    expect(node.indexBinding).toBeUndefined();
    expect(node.loc).toBe(UNKNOWN_LOCATION);
  });

  it("propagates indexBinding and loc", () => {
    const each = createExpression({ expr: ident("items") });
    const key = createExpression({ expr: ident("id") });
    const body = createText("row");
    const node = createFor({
      each,
      itemBinding: "item",
      indexBinding: "i",
      key,
      body,
      loc: fakeLoc,
    });
    expect(node.indexBinding).toBe("i");
    expect(node.loc).toBe(fakeLoc);
  });
});

describe("createSwitch", () => {
  it("defaults loc and propagates fallback and cases", () => {
    const t = createExpression({ expr: ident("a") });
    const node: IRSwitch = createSwitch({
      cases: [{ test: t, body: createText("a") }],
    });
    expect(node.kind).toBe("Switch");
    expect(node.cases).toHaveLength(1);
    expect(node.fallback).toBeUndefined();
    expect(node.loc).toBe(UNKNOWN_LOCATION);
  });

  it("propagates fallback and loc when given", () => {
    const node = createSwitch({
      cases: [],
      fallback: createText("d"),
      loc: fakeLoc,
    });
    expect(node.fallback).toBeDefined();
    expect(node.loc).toBe(fakeLoc);
  });
});

describe("createSlotContent", () => {
  it("defaults name to 'default', empty scopedParams, unknown loc", () => {
    const slot = createSlotContent({ body: createText("x") });
    expect(slot.name).toBe("default");
    expect(slot.scopedParams).toEqual([]);
    expect(slot.loc).toBe(UNKNOWN_LOCATION);
  });

  it("propagates name, scopedParams, and loc", () => {
    const slot = createSlotContent({
      name: "header",
      body: createText("h"),
      scopedParams: ["count"],
      loc: fakeLoc,
    });
    expect(slot.name).toBe("header");
    expect(slot.scopedParams).toEqual(["count"]);
    expect(slot.loc).toBe(fakeLoc);
  });
});

describe("createComponentSkeleton", () => {
  it("initializes every collection empty and respects required fields", () => {
    const render = createText("hello");
    const skel = createComponentSkeleton({
      id: "/x.ink.tsx#Button",
      name: "Button",
      render,
      loc: fakeLoc,
    });
    expect(skel.kind).toBe("Component");
    expect(skel.id).toBe("/x.ink.tsx#Button");
    expect(skel.name).toBe("Button");
    expect(skel.props).toEqual([]);
    expect(skel.slots).toEqual([]);
    expect(skel.events).toEqual([]);
    expect(skel.state).toEqual([]);
    expect(skel.refs).toEqual([]);
    expect(skel.memos).toEqual([]);
    expect(skel.effects).toEqual([]);
    expect(skel.lifecycle).toEqual({ onMount: [], onCleanup: [] });
    expect(skel.setup).toEqual([]);
    expect(skel.primitives).toEqual([]);
    expect(skel.targetOverrides).toEqual({});
    expect(skel.render).toBe(render);
    expect(skel.loc).toBe(fakeLoc);
  });

  it("defaults loc to UNKNOWN_LOCATION", () => {
    const skel = createComponentSkeleton({
      id: "id",
      name: "n",
      render: createText("x"),
    });
    expect(skel.loc).toBe(UNKNOWN_LOCATION);
  });
});

describe("isStatic propagation across all node kinds", () => {
  // Each non-Text / non-Element / non-Fragment kind is treated as non-static
  // so an element containing one is not eligible for template hoisting.
  const expr: IRExpressionNode = createExpression({ expr: ident("x") });

  const slotPh: IRSlotPlaceholder = {
    kind: "SlotPlaceholder",
    name: "default",
    scopedArgs: [],
    loc: UNKNOWN_LOCATION,
  };

  const ifNode: IRIf = createIf({
    branches: [{ test: expr, body: createText("a") }],
  });

  const forNode: IRFor = createFor({
    each: expr,
    itemBinding: "i",
    key: expr,
    body: createText("b"),
  });

  const switchNode: IRSwitch = createSwitch({ cases: [] });

  const componentInstance: IRComponentInstance = {
    kind: "ComponentInstance",
    reference: ident("Foo"),
    attrs: [],
    events: [],
    slots: [],
    loc: UNKNOWN_LOCATION,
  };

  const elementCases: Array<[label: string, element: IRElement]> = [
    ["Expression child", createElement({ tag: "div", children: [expr] })],
    ["SlotPlaceholder child", createElement({ tag: "div", children: [slotPh] })],
    ["If child", createElement({ tag: "div", children: [ifNode] })],
    ["For child", createElement({ tag: "div", children: [forNode] })],
    ["Switch child", createElement({ tag: "div", children: [switchNode] })],
    ["ComponentInstance child", createElement({ tag: "div", children: [componentInstance] })],
  ];
  it.each(elementCases)("%s makes the parent non-static", (_label, element) => {
    expect(element.isStatic).toBe(false);
  });
});
