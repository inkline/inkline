import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../types.ts";
import {
  createAttribute,
  createComponentInstance,
  createElement,
  createExpr,
  createFor,
  createFragment,
  createIf,
  createSlotPlaceholder,
  createStaticValue,
  createSwitch,
  createText,
} from "./builders.ts";

function mockExpr(code = "x"): ts.Expression {
  const sf = ts.createSourceFile("test.ts", code, ts.ScriptTarget.Latest, true);
  const stmt = sf.statements[0]!;
  if (ts.isExpressionStatement(stmt)) return stmt.expression;
  throw new Error("Expected expression");
}

const loc = { file: "test.tsx", line: 1, column: 1, offset: 0, length: 5 };

describe("createComponentInstance", () => {
  it("fills defaults", () => {
    const sf = ts.createSourceFile("test.ts", "Button", ts.ScriptTarget.Latest, true);
    const ident = (sf.statements[0] as ts.ExpressionStatement).expression as ts.Identifier;
    const ci = createComponentInstance({ reference: ident });
    expect(ci.kind).toBe("ComponentInstance");
    expect(ci.reference).toBe(ident);
    expect(ci.resolved).toBeUndefined();
    expect(ci.attrs).toEqual([]);
    expect(ci.events).toEqual([]);
    expect(ci.refs).toEqual([]);
    expect(ci.slots).toEqual([]);
    expect(ci.loc).toBe(UNKNOWN_LOCATION);
  });

  it("uses provided values", () => {
    const sf = ts.createSourceFile("test.ts", "Button", ts.ScriptTarget.Latest, true);
    const ident = (sf.statements[0] as ts.ExpressionStatement).expression as ts.Identifier;
    const slotBody = createText({ value: "child" });
    const ci = createComponentInstance({
      reference: ident,
      resolved: { module: "./Button", name: "Button" },
      slots: [{ name: "default", body: slotBody, scopedParams: [], loc }],
      loc,
    });
    expect(ci.resolved).toEqual({ module: "./Button", name: "Button" });
    expect(ci.slots).toHaveLength(1);
    expect(ci.loc).toBe(loc);
  });
});

describe("createElement", () => {
  it("fills defaults", () => {
    const el = createElement({ tag: "div" });
    expect(el.kind).toBe("Element");
    expect(el.tag).toBe("div");
    expect(el.attrs).toEqual([]);
    expect(el.events).toEqual([]);
    expect(el.refs).toEqual([]);
    expect(el.children).toEqual([]);
    expect(el.isStatic).toBe(false);
    expect(el.loc).toBe(UNKNOWN_LOCATION);
  });

  it("uses provided values", () => {
    const child = createText({ value: "hello" });
    const el = createElement({ tag: "p", children: [child], loc });
    expect(el.tag).toBe("p");
    expect(el.children).toEqual([child]);
    expect(el.loc).toBe(loc);
  });
});

describe("createText", () => {
  it("creates a Text node", () => {
    const text = createText({ value: "hello" });
    expect(text.kind).toBe("Text");
    expect(text.value).toBe("hello");
    expect(text.loc).toBe(UNKNOWN_LOCATION);
  });
});

describe("createExpr", () => {
  it("fills defaults", () => {
    const expr = mockExpr("count()");
    const node = createExpr({ expr });
    expect(node.kind).toBe("Expression");
    expect(node.expr).toBe(expr);
    expect(node.deps).toEqual([]);
    expect(node.isReactive).toBe(false);
    expect(node.emissionContext).toBe("template");
    expect(node.isDynamic).toBe(false);
  });

  it("uses provided values", () => {
    const expr = mockExpr("x");
    const node = createExpr({
      expr,
      isReactive: true,
      emissionContext: "setup",
      isDynamic: true,
      loc,
    });
    expect(node.isReactive).toBe(true);
    expect(node.emissionContext).toBe("setup");
    expect(node.isDynamic).toBe(true);
    expect(node.loc).toBe(loc);
  });
});

describe("createIf", () => {
  it("creates an If node with branches", () => {
    const test = createExpr({ expr: mockExpr("true") });
    const body = createText({ value: "yes" });
    const node = createIf({ branches: [{ test, body }] });
    expect(node.kind).toBe("If");
    expect(node.branches).toHaveLength(1);
    expect(node.fallback).toBeUndefined();
  });

  it("includes fallback", () => {
    const test = createExpr({ expr: mockExpr("true") });
    const body = createText({ value: "yes" });
    const fallback = createText({ value: "no" });
    const node = createIf({ branches: [{ test, body }], fallback });
    expect(node.fallback).toBe(fallback);
  });
});

describe("createFor", () => {
  it("creates a For node", () => {
    const each = createExpr({ expr: mockExpr("items()") });
    const key = createExpr({ expr: mockExpr("item") });
    const body = createText({ value: "item" });
    const node = createFor({
      each,
      itemBinding: "item",
      key,
      body,
    });
    expect(node.kind).toBe("For");
    expect(node.itemBinding).toBe("item");
    expect(node.indexBinding).toBeUndefined();
  });
});

describe("createSwitch", () => {
  it("creates a Switch node", () => {
    const test = createExpr({ expr: mockExpr("x") });
    const body = createText({ value: "a" });
    const node = createSwitch({ cases: [{ test, body }] });
    expect(node.kind).toBe("Switch");
    expect(node.cases).toHaveLength(1);
  });
});

describe("createSlotPlaceholder", () => {
  it("defaults to 'default' name", () => {
    const node = createSlotPlaceholder({});
    expect(node.kind).toBe("SlotPlaceholder");
    expect(node.name).toBe("default");
    expect(node.scopedArgs).toEqual([]);
  });
});

describe("createFragment", () => {
  it("creates a Fragment node", () => {
    const child = createText({ value: "a" });
    const node = createFragment({ children: [child] });
    expect(node.kind).toBe("Fragment");
    expect(node.children).toEqual([child]);
  });
});

describe("createAttribute", () => {
  it("defaults binding to normal", () => {
    const value = createStaticValue({ value: "x" });
    const attr = createAttribute({ name: "id", value });
    expect(attr.binding).toBe("normal");
  });
});

describe("createStaticValue", () => {
  it("creates a Static value", () => {
    const sv = createStaticValue({ value: "hello" });
    expect(sv.kind).toBe("Static");
    expect(sv.value).toBe("hello");
  });

  it("handles null", () => {
    const sv = createStaticValue({ value: null });
    expect(sv.value).toBeNull();
  });

  it("handles boolean", () => {
    const sv = createStaticValue({ value: true });
    expect(sv.value).toBe(true);
  });

  it("handles number", () => {
    const sv = createStaticValue({ value: 42 });
    expect(sv.value).toBe(42);
  });
});
