import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { createComponentInstance, createExpr, createText } from "../../../ir/render/builders.ts";
import type { IRComponent, IRComponentInstance } from "../../../ir/render/nodes.ts";
import { slots } from "./slots.ts";

function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function ident(name: string): ts.Identifier {
  const sf = ts.createSourceFile("t.ts", name, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression as ts.Identifier;
}

function makeComp(render: IRComponentInstance): IRComponent {
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
    targetOverrides: {},
  };
}

describe("slots", () => {
  it("moves JSX-valued attr to named slot", () => {
    const jsxExpr = mockExpr("<span>fallback</span>");
    const ci = createComponentInstance({
      reference: ident("Show"),
      attrs: [
        {
          name: "when",
          value: createExpr({ expr: mockExpr("true") }),
          binding: "normal",
          loc: UNKNOWN_LOCATION,
        },
        {
          name: "fallback",
          value: createExpr({ expr: jsxExpr }),
          binding: "normal",
          loc: UNKNOWN_LOCATION,
        },
      ],
      slots: [
        {
          name: "default",
          body: createText({ value: "content" }),
          scopedParams: [],
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    const result = slots(makeComp(ci));
    const out = result.render as IRComponentInstance;
    expect(out.attrs).toHaveLength(1);
    expect(out.attrs[0]!.name).toBe("when");
    expect(out.slots).toHaveLength(2);
    expect(out.slots[1]!.name).toBe("fallback");
  });

  it("keeps non-JSX attrs unchanged", () => {
    const ci = createComponentInstance({
      reference: ident("Button"),
      attrs: [
        {
          name: "label",
          value: createExpr({ expr: mockExpr("'click me'") }),
          binding: "normal",
          loc: UNKNOWN_LOCATION,
        },
      ],
      slots: [
        {
          name: "default",
          body: createText({ value: "text" }),
          scopedParams: [],
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    const comp = makeComp(ci);
    const result = slots(comp);
    expect(result).toBe(comp);
  });

  it("returns same component when no ComponentInstance", () => {
    const comp: IRComponent = {
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
      render: createText({ value: "plain" }),
      primitives: [],
      targetOverrides: {},
    };
    const result = slots(comp);
    expect(result).toBe(comp);
  });
});
