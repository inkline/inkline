import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../types.ts";
import {
  createComponentInstance,
  createElement,
  createExpr,
  createFragment,
  createIf,
  createFor,
  createSwitch,
  createSlotPlaceholder,
  createText,
} from "./builders.ts";
import { SKIP, transform, transformComponent } from "./transform.ts";
import type { IRComponent, IRComponentInstance, IRNode } from "./nodes.ts";

function mockExpr(code = "x"): ts.Expression {
  const sf = ts.createSourceFile("test.ts", code, ts.ScriptTarget.Latest, true);
  const stmt = sf.statements[0]!;
  if (ts.isExpressionStatement(stmt)) return stmt.expression;
  throw new Error("Expected expression");
}

function makeComponent(render: IRNode): IRComponent {
  return {
    kind: "Component",
    id: "test.tsx#Test",
    name: "Test",
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

describe("transform", () => {
  it("replaces a node when enter returns a new node", () => {
    const original = createText({ value: "old" });
    const replacement = createText({ value: "new" });

    const result = transform(original, {
      enter: (node) => {
        if (node.kind === "Text" && node.value === "old") return replacement;
      },
    });

    expect(result).toBe(replacement);
  });

  it("replaces a child node within a parent", () => {
    const child = createText({ value: "old" });
    const el = createElement({ tag: "div", children: [child] });

    const result = transform(el, {
      enter: (node) => {
        if (node.kind === "Text") return createText({ value: "new" });
      },
    });

    expect(result.kind).toBe("Element");
    expect((result as typeof el).children[0]!.kind).toBe("Text");
    expect(((result as typeof el).children[0] as typeof child).value).toBe("new");
  });

  it("preserves reference when no changes", () => {
    const child = createText({ value: "hello" });
    const el = createElement({ tag: "div", children: [child] });

    const result = transform(el, {
      enter: () => {},
    });

    expect(result).toBe(el);
  });

  it("SKIP prevents visiting children", () => {
    const child = createText({ value: "a" });
    const el = createElement({ tag: "div", children: [child] });

    const visited: string[] = [];
    transform(el, {
      enter: (node) => {
        visited.push(node.kind);
        if (node.kind === "Element") return SKIP;
      },
    });

    expect(visited).toEqual(["Element"]);
  });

  it("exit can replace nodes", () => {
    const node = createText({ value: "old" });

    const result = transform(node, {
      exit: (n) => {
        if (n.kind === "Text") return createText({ value: "new" });
      },
    });

    expect(result.kind).toBe("Text");
    expect((result as typeof node).value).toBe("new");
  });

  it("transforms If branches", () => {
    const test = createExpr({ expr: mockExpr("true") });
    const body = createText({ value: "old" });
    const node = createIf({ branches: [{ test, body }] });

    const result = transform(node, {
      enter: (n) => {
        if (n.kind === "Text") return createText({ value: "new" });
      },
    });

    expect(result.kind).toBe("If");
    const ifNode = result as typeof node;
    expect((ifNode.branches[0]!.body as typeof body).value).toBe("new");
  });

  it("transforms If fallback", () => {
    const test = createExpr({ expr: mockExpr("true") });
    const body = createText({ value: "body" });
    const fallback = createText({ value: "old" });
    const node = createIf({ branches: [{ test, body }], fallback });

    const result = transform(node, {
      enter: (n) => {
        if (n.kind === "Text" && (n as typeof body).value === "old")
          return createText({ value: "new" });
      },
    });

    const ifNode = result as typeof node;
    expect((ifNode.fallback as typeof fallback).value).toBe("new");
  });

  it("transforms For body", () => {
    const each = createExpr({ expr: mockExpr("items") });
    const key = createExpr({ expr: mockExpr("item") });
    const body = createText({ value: "old" });
    const node = createFor({ each, itemBinding: "item", key, body });

    const result = transform(node, {
      enter: (n) => {
        if (n.kind === "Text") return createText({ value: "new" });
      },
    });

    expect(((result as typeof node).body as typeof body).value).toBe("new");
  });

  it("transforms Switch cases", () => {
    const test = createExpr({ expr: mockExpr("x") });
    const body = createText({ value: "old" });
    const node = createSwitch({ cases: [{ test, body }] });

    const result = transform(node, {
      enter: (n) => {
        if (n.kind === "Text") return createText({ value: "new" });
      },
    });

    expect(((result as typeof node).cases[0]!.body as typeof body).value).toBe("new");
  });

  it("transforms Fragment children", () => {
    const child = createText({ value: "old" });
    const frag = createFragment({ children: [child] });

    const result = transform(frag, {
      enter: (n) => {
        if (n.kind === "Text") return createText({ value: "new" });
      },
    });

    expect(((result as typeof frag).children[0] as typeof child).value).toBe("new");
  });

  it("transforms SlotPlaceholder fallback", () => {
    const fallback = createText({ value: "old" });
    const node = createSlotPlaceholder({ fallback });

    const result = transform(node, {
      enter: (n) => {
        if (n.kind === "Text") return createText({ value: "new" });
      },
    });

    expect(((result as typeof node).fallback as typeof fallback).value).toBe("new");
  });

  it("transforms ComponentInstance slots", () => {
    const sf = ts.createSourceFile("test.ts", "Button", ts.ScriptTarget.Latest, true);
    const ident = (sf.statements[0] as ts.ExpressionStatement).expression as ts.Identifier;
    const slotBody = createText({ value: "old" });
    const comp = createComponentInstance({
      reference: ident,
      slots: [
        {
          name: "default",
          body: slotBody,
          scopedParams: [],
          loc: UNKNOWN_LOCATION,
        },
      ],
    });

    const result = transform(comp, {
      enter: (n) => {
        if (n.kind === "Text") return createText({ value: "new" });
      },
    });

    expect(result.kind).toBe("ComponentInstance");
    const ci = result as IRComponentInstance;
    expect(ci.slots[0]!.body).toEqual(createText({ value: "new" }));
  });

  it("transforms Switch fallback", () => {
    const test = createExpr({ expr: mockExpr("x") });
    const body = createText({ value: "keep" });
    const fallback = createText({ value: "old" });
    const node = createSwitch({ cases: [{ test, body }], fallback });

    const result = transform(node, {
      enter: (n) => {
        if (n.kind === "Text" && (n as typeof fallback).value === "old")
          return createText({ value: "new" });
      },
    });

    const sw = result as typeof node;
    expect((sw.fallback as typeof fallback).value).toBe("new");
    expect((sw.cases[0]!.body as typeof body).value).toBe("keep");
  });
});

describe("transformComponent", () => {
  it("transforms the render tree", () => {
    const render = createText({ value: "old" });
    const comp = makeComponent(render);

    const result = transformComponent(comp, {
      enter: (n) => {
        if (n.kind === "Text") return createText({ value: "new" });
      },
    });

    expect(result).not.toBe(comp);
    expect((result.render as typeof render).value).toBe("new");
  });

  it("returns same component when render unchanged", () => {
    const render = createText({ value: "hello" });
    const comp = makeComponent(render);

    const result = transformComponent(comp, { enter: () => {} });
    expect(result).toBe(comp);
  });
});
