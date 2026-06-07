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

  it("decomposes a JSX-valued attr into structural render nodes (not an opaque Expression)", () => {
    const ci = createComponentInstance({
      reference: ident("IButton"),
      attrs: [
        {
          name: "icon",
          value: createExpr({ expr: mockExpr("<span>star</span>") }),
          binding: "normal",
          loc: UNKNOWN_LOCATION,
        },
      ],
      slots: [],
    });
    const out = slots(makeComp(ci)).render as IRComponentInstance;
    expect(out.slots).toHaveLength(1);
    expect(out.slots[0]!.name).toBe("icon");
    // Must be a real Element, not an `Expression` wrapping the JSX. An opaque Expression
    // makes template targets emit a text interpolation (`{{ <span/> }}`). See UXF-12.
    expect(out.slots[0]!.body.kind).toBe("Element");
  });

  it("decomposes a JSX component fill (`<Slot/>` re-projection) into a ComponentInstance", () => {
    const ci = createComponentInstance({
      reference: ident("IButton"),
      attrs: [
        {
          name: "icon",
          value: createExpr({ expr: mockExpr('<Slot name="icon" />') }),
          binding: "normal",
          loc: UNKNOWN_LOCATION,
        },
      ],
      slots: [],
    });
    const out = slots(makeComp(ci)).render as IRComponentInstance;
    // The control-flow pass (which runs after `slots`) lowers this `Slot` instance to a
    // SlotPlaceholder; here we only assert `slots` decomposed it past an Expression.
    expect(out.slots[0]!.body.kind).toBe("ComponentInstance");
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
      resources: [],
      provides: [],
      consumes: [],
      lifecycle: { onMount: [], onCleanup: [] },
      setup: [],
      render: createText({ value: "plain" }),
      primitives: [],
      styles: [],
      runtime: "iso",
      targetOverrides: {},
    };
    const result = slots(comp);
    expect(result).toBe(comp);
  });

  it("moves multiple JSX-valued attrs to named slots", () => {
    const ci = createComponentInstance({
      reference: ident("Layout"),
      attrs: [
        {
          name: "header",
          value: createExpr({ expr: mockExpr("<h1>Title</h1>") }),
          binding: "normal",
          loc: UNKNOWN_LOCATION,
        },
        {
          name: "footer",
          value: createExpr({ expr: mockExpr("<footer>End</footer>") }),
          binding: "normal",
          loc: UNKNOWN_LOCATION,
        },
      ],
      slots: [
        {
          name: "default",
          body: createText({ value: "body" }),
          scopedParams: [],
          loc: UNKNOWN_LOCATION,
        },
      ],
    });
    const result = slots(makeComp(ci));
    const out = result.render as IRComponentInstance;
    expect(out.attrs).toHaveLength(0);
    expect(out.slots).toHaveLength(3);
    expect(out.slots.map((s) => s.name)).toEqual(["default", "header", "footer"]);
  });

  it("component with no attrs and no slots returns unchanged", () => {
    const ci = createComponentInstance({
      reference: ident("Empty"),
      attrs: [],
      slots: [],
    });
    const comp = makeComp(ci);
    const result = slots(comp);
    expect(result).toBe(comp);
  });
});
