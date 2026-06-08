import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import {
  createAttribute,
  createComponentInstance,
  createElement,
  createExpr,
  createStaticValue,
} from "../../../ir/render/builders.ts";
import type {
  IRComponent,
  IRComponentInstance,
  IRElement,
  IRExprNode,
  IRStateDeclaration,
} from "../../../ir/render/nodes.ts";
import type { SymbolId } from "../../../ir/reactivity.ts";
import { twoWayBinding } from "./two-way-binding.ts";

function makeState(name: string, setterName: string): IRStateDeclaration {
  return {
    name,
    setterName,
    initial: createExpr({ expr: mockExpr("0") }),
    symbolId: `t#T::signal::${name}@0` as SymbolId,
    setterSymbolId: `t#T::signal::${setterName}@10` as SymbolId,
    loc: UNKNOWN_LOCATION,
  };
}

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

  it("rewrites value to `<getter>()` when binding resolves to a known setter", () => {
    const el = createElement({
      tag: "input",
      attrs: [
        createAttribute({
          name: "value",
          value: createExpr({ expr: mockExpr("setCount") }),
          binding: "twoWay",
        }),
      ],
    });
    const comp: IRComponent = { ...makeComp(el), state: [makeState("count", "setCount")] };
    const out = twoWayBinding(comp).render as IRElement;

    const valueAttr = out.attrs[0]!;
    expect(valueAttr.binding).toBe("normal");
    const valueText = (valueAttr.value as IRExprNode).expr.getText();
    expect(valueText).toBe("count()");

    const handlerText = out.events[0]!.handler.expr.getText();
    expect(handlerText).toBe("(e) => setCount(e.target.value)");
  });

  it("rewrites checked to `<getter>()` when binding resolves to a known setter", () => {
    const el = createElement({
      tag: "input",
      attrs: [
        createAttribute({ name: "type", value: createStaticValue({ value: "checkbox" }) }),
        createAttribute({
          name: "checked",
          value: createExpr({ expr: mockExpr("setActive") }),
          binding: "twoWay",
        }),
      ],
    });
    const comp: IRComponent = { ...makeComp(el), state: [makeState("active", "setActive")] };
    const out = twoWayBinding(comp).render as IRElement;

    const checkedAttr = out.attrs.find((a) => a.name === "checked")!;
    const valueText = (checkedAttr.value as IRExprNode).expr.getText();
    expect(valueText).toBe("active()");

    const handlerText = out.events[0]!.handler.expr.getText();
    expect(handlerText).toBe("(e) => setActive(e.target.checked)");
  });

  it("uses valueAsNumber on the handler when type=number and setter resolves", () => {
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
    const comp: IRComponent = { ...makeComp(el), state: [makeState("num", "setNum")] };
    const out = twoWayBinding(comp).render as IRElement;

    const valueAttr = out.attrs.find((a) => a.name === "value")!;
    expect((valueAttr.value as IRExprNode).expr.getText()).toBe("num()");
    expect(out.events[0]!.handler.expr.getText()).toBe("(e) => setNum(e.target.valueAsNumber)");
  });

  it("leaves the value expression untouched when the binding identifier is unknown", () => {
    const el = createElement({
      tag: "input",
      attrs: [
        createAttribute({
          name: "value",
          value: createExpr({ expr: mockExpr("setUnknown") }),
          binding: "twoWay",
        }),
      ],
    });
    const out = twoWayBinding(makeComp(el)).render as IRElement;

    const valueAttr = out.attrs[0]!;
    expect(valueAttr.binding).toBe("normal");
    expect((valueAttr.value as IRExprNode).expr.getText()).toBe("setUnknown");
    expect(out.events[0]!.handler.expr.getText()).toBe("(e) => setUnknown(e.target.value)");
  });

  it("getter convention: $bind:value={getter} reads the getter and drives its linked setter", () => {
    const el = createElement({
      tag: "input",
      attrs: [
        createAttribute({
          name: "value",
          value: createExpr({ expr: mockExpr("count") }),
          binding: "twoWay",
        }),
      ],
    });
    const comp: IRComponent = { ...makeComp(el), state: [makeState("count", "setCount")] };
    const out = twoWayBinding(comp).render as IRElement;

    expect((out.attrs[0]!.value as IRExprNode).expr.getText()).toBe("count()");
    expect(out.events[0]!.handler.expr.getText()).toBe("(e) => setCount(e.target.value)");
  });
});

describe("twoWayBinding on component instances", () => {
  function child(attrs: IRComponentInstance["attrs"]): IRComponentInstance {
    return createComponentInstance({
      reference: mockExpr("Child") as ts.Identifier,
      resolved: { module: null, name: "Child" },
      attrs,
    });
  }

  it("desugars $bind:value to a value attr + a synthesized update:value event", () => {
    const ci = child([
      createAttribute({
        name: "value",
        value: createExpr({ expr: mockExpr("count") }),
        binding: "twoWay",
      }),
    ]);
    const comp: IRComponent = {
      ...makeComp(createElement({ tag: "div" })),
      state: [makeState("count", "setCount")],
    };
    const out = twoWayBinding({ ...comp, render: ci }).render as IRComponentInstance;

    const valueAttr = out.attrs[0]!;
    expect(valueAttr.binding).toBe("normal");
    expect((valueAttr.value as IRExprNode).expr.getText()).toBe("count()");

    expect(out.events).toHaveLength(1);
    const ev = out.events[0]!;
    expect(ev.name).toBe("update:value");
    expect(ev.twoWayProp).toBe("value");
    expect(ev.synthesized).toBe(true);
    // Components emit the unwrapped value, so the handler forwards `v` directly (not e.target.value).
    expect(ev.handler.expr.getText()).toBe("(v) => setCount(v)");
  });

  it("derives the update event from the bound prop name", () => {
    const ci = child([
      createAttribute({
        name: "open",
        value: createExpr({ expr: mockExpr("isOpen") }),
        binding: "twoWay",
      }),
    ]);
    const comp: IRComponent = {
      ...makeComp(createElement({ tag: "div" })),
      state: [makeState("isOpen", "setIsOpen")],
    };
    const out = twoWayBinding({ ...comp, render: ci }).render as IRComponentInstance;

    expect(out.events[0]!.name).toBe("update:open");
    expect(out.events[0]!.twoWayProp).toBe("open");
    expect(out.events[0]!.handler.expr.getText()).toBe("(v) => setIsOpen(v)");
  });

  it("demotes a static-valued $bind: to a normal attr without synthesizing an event", () => {
    const ci = child([
      createAttribute({
        name: "value",
        value: createStaticValue({ value: "x" }),
        binding: "twoWay",
      }),
    ]);
    const out = twoWayBinding({ ...makeComp(createElement({ tag: "div" })), render: ci })
      .render as IRComponentInstance;

    expect(out.attrs[0]!.binding).toBe("normal");
    expect(out.events).toHaveLength(0);
  });
});
