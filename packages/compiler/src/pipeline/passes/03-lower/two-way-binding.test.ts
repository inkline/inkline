import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import {
  createAttribute,
  createElement,
  createExpr,
  createStaticValue,
} from "../../../ir/render/builders.ts";
import type { IRComponent, IRElement } from "../../../ir/render/nodes.ts";
import { twoWayBinding } from "./two-way-binding.ts";

function mockExpr(code: string): ts.Expression {
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
    targetOverrides: {},
  };
}

describe("twoWayBinding", () => {
  it("desugars $bind:value on input to value attr + onInput event", () => {
    const el = createElement({
      tag: "input",
      attrs: [
        createAttribute({
          name: "value",
          value: createExpr({ expr: mockExpr("setValue") }),
          binding: "twoWay",
        }),
      ],
    });
    const result = twoWayBinding(makeComp(el));
    const out = result.render as IRElement;
    expect(out.attrs[0]!.binding).toBe("normal");
    expect(out.events).toHaveLength(1);
    expect(out.events[0]!.name).toBe("onInput");
    expect(out.events[0]!.synthesized).toBe(true);
  });

  it("desugars $bind:checked on checkbox to onChange", () => {
    const el = createElement({
      tag: "input",
      attrs: [
        createAttribute({ name: "type", value: createStaticValue({ value: "checkbox" }) }),
        createAttribute({
          name: "checked",
          value: createExpr({ expr: mockExpr("setChecked") }),
          binding: "twoWay",
        }),
      ],
    });
    const result = twoWayBinding(makeComp(el));
    const out = result.render as IRElement;
    expect(out.events[0]!.name).toBe("onChange");
  });

  it("desugars $bind:value on select to onChange", () => {
    const el = createElement({
      tag: "select",
      attrs: [
        createAttribute({
          name: "value",
          value: createExpr({ expr: mockExpr("setValue") }),
          binding: "twoWay",
        }),
      ],
    });
    const result = twoWayBinding(makeComp(el));
    const out = result.render as IRElement;
    expect(out.events[0]!.name).toBe("onChange");
  });

  it("uses valueAsNumber for type=number", () => {
    const el = createElement({
      tag: "input",
      attrs: [
        createAttribute({ name: "type", value: createStaticValue({ value: "number" }) }),
        createAttribute({
          name: "value",
          value: createExpr({ expr: mockExpr("setNum") }),
          binding: "twoWay",
        }),
      ],
    });
    const result = twoWayBinding(makeComp(el));
    const handler = (result.render as IRElement).events[0]!.handler;
    const text = handler.expr.getText?.() ?? "";
    expect(text).toContain("valueAsNumber");
  });

  it("returns same component when no twoWay attrs", () => {
    const el = createElement({
      tag: "input",
      attrs: [createAttribute({ name: "value", value: createStaticValue({ value: "x" }) })],
    });
    const comp = makeComp(el);
    const result = twoWayBinding(comp);
    expect(result).toBe(comp);
  });
});
