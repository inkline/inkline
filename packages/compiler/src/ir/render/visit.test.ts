import { describe, it, expect } from "vitest";
import * as ts from "typescript";
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
import { walkNode, walkRenderTree } from "./visit.ts";
import type { IRNode } from "./nodes.ts";

function mockExpr(code = "x"): ts.Expression {
  const sf = ts.createSourceFile("test.ts", code, ts.ScriptTarget.Latest, true);
  const stmt = sf.statements[0]!;
  if (ts.isExpressionStatement(stmt)) return stmt.expression;
  throw new Error("Expected expression");
}

describe("walkNode", () => {
  it("visits a single Text node", () => {
    const node = createText({ value: "hello" });
    const visited: string[] = [];
    walkNode(node, {
      enter: (n) => {
        visited.push(`enter:${n.kind}`);
      },
      exit: (n) => {
        visited.push(`exit:${n.kind}`);
      },
    });
    expect(visited).toEqual(["enter:Text", "exit:Text"]);
  });

  it("visits Element children", () => {
    const child1 = createText({ value: "a" });
    const child2 = createText({ value: "b" });
    const el = createElement({ tag: "div", children: [child1, child2] });

    const kinds: string[] = [];
    walkNode(el, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["Element", "Text", "Text"]);
  });

  it("visits If branches and fallback", () => {
    const test = createExpr({ expr: mockExpr("true") });
    const body = createText({ value: "yes" });
    const fallback = createText({ value: "no" });
    const node = createIf({ branches: [{ test, body }], fallback });

    const kinds: string[] = [];
    walkNode(node, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["If", "Text", "Text"]);
  });

  it("visits For body", () => {
    const each = createExpr({ expr: mockExpr("items") });
    const key = createExpr({ expr: mockExpr("item") });
    const body = createText({ value: "item" });
    const node = createFor({ each, itemBinding: "item", key, body });

    const kinds: string[] = [];
    walkNode(node, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["For", "Text"]);
  });

  it("visits Switch cases and fallback", () => {
    const test = createExpr({ expr: mockExpr("x") });
    const body = createText({ value: "a" });
    const fallback = createText({ value: "b" });
    const node = createSwitch({ cases: [{ test, body }], fallback });

    const kinds: string[] = [];
    walkNode(node, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["Switch", "Text", "Text"]);
  });

  it("visits Fragment children", () => {
    const child = createText({ value: "a" });
    const frag = createFragment({ children: [child] });

    const kinds: string[] = [];
    walkNode(frag, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["Fragment", "Text"]);
  });

  it("visits SlotPlaceholder fallback", () => {
    const fallback = createText({ value: "fallback" });
    const node = createSlotPlaceholder({ fallback });

    const kinds: string[] = [];
    walkNode(node, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["SlotPlaceholder", "Text"]);
  });

  it("skips children when enter returns false", () => {
    const child = createText({ value: "a" });
    const el = createElement({ tag: "div", children: [child] });

    const kinds: string[] = [];
    walkNode(el, {
      enter: (n) => {
        kinds.push(`enter:${n.kind}`);
        if (n.kind === "Element") return false;
      },
      exit: (n) => {
        kinds.push(`exit:${n.kind}`);
      },
    });
    expect(kinds).toEqual(["enter:Element", "exit:Element"]);
  });

  it("passes parent to visitor", () => {
    const child = createText({ value: "a" });
    const el = createElement({ tag: "div", children: [child] });

    const parents: Array<IRNode | undefined> = [];
    walkNode(el, {
      enter: (_, parent) => {
        parents.push(parent);
      },
    });
    expect(parents[0]).toBeUndefined();
    expect(parents[1]).toBe(el);
  });

  it("does not visit Expression children", () => {
    const expr = createExpr({ expr: mockExpr("x") });
    const kinds: string[] = [];
    walkNode(expr, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["Expression"]);
  });

  it("visits ComponentInstance slots", () => {
    const sf = ts.createSourceFile("test.ts", "Button", ts.ScriptTarget.Latest, true);
    const ident = (sf.statements[0] as ts.ExpressionStatement).expression as ts.Identifier;
    const slotBody = createText({ value: "child" });
    const comp = createComponentInstance({
      reference: ident,
      slots: [
        {
          name: "default",
          body: slotBody,
          scopedParams: [],
          loc: { file: "test.tsx", line: 1, column: 1, offset: 0, length: 6 },
        },
      ],
    });

    const kinds: string[] = [];
    walkNode(comp, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["ComponentInstance", "Text"]);
  });
});

describe("walkRenderTree", () => {
  it("delegates to walkNode", () => {
    const node = createText({ value: "hello" });
    const visited: string[] = [];
    walkRenderTree(node, {
      enter: (n) => {
        visited.push(n.kind);
      },
    });
    expect(visited).toEqual(["Text"]);
  });
});
