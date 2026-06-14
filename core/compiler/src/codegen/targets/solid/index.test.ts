// Solid unit-emit tests: hand-build IR, emit through the Solid target, assert the printed source.
// Real-world `.ink.tsx` → compile assertions live in ./__tests__/.

import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import {
  createComponentInstance,
  createElement,
  createExpr,
  createIf,
  createSlotPlaceholder,
  createSwitch,
  createText,
} from "../../../ir/render/builders.ts";
import {
  counterRender,
  elementRef,
  emitCode,
  emitWithCtx,
  emitWithFile,
  loc,
  makeComp,
  makeCtxWithExternalImport,
  mockExpr,
  propsLabelDisabled,
  richComp,
  runInvariants,
  scopedButtonStyle,
  transitionWithIf,
} from "../../../testing/codegen.ts";
import { solid } from "./index.ts";

function slottedComp(fallthrough = false) {
  return richComp(
    "Slotted",
    createElement({
      tag: "div",
      acceptsAttrFallthrough: fallthrough,
      children: [
        createSlotPlaceholder({ fallback: createExpr({ expr: mockExpr("props.label") }) }),
      ],
    }),
    { slots: [{ name: "default", isScoped: false, scopedProps: [], required: false, loc }] },
  );
}

describe("ComponentInstance event casing", () => {
  it("preserves camelCase callback-prop names on component instances", () => {
    const ci = createComponentInstance({
      reference: mockExpr("Field") as ts.Identifier,
      resolved: { module: null, name: "Field" },
      events: [
        {
          name: "onValueChange",
          handler: createExpr({ expr: mockExpr("(v) => setValue(v)") }),
          loc,
        },
      ],
    });
    const code = emitCode(solid, makeComp("Page", ci));
    expect(code).toContain("onValueChange={");
    expect(code).not.toContain("onvaluechange");
  });

  it("keeps native DOM event names lowercase on elements", () => {
    const el = createElement({
      tag: "input",
      events: [{ name: "onInput", handler: createExpr({ expr: mockExpr("(e) => setX(e)") }), loc }],
    });
    const code = emitCode(solid, makeComp("Page", el));
    expect(code).toContain("oninput={");
  });
});

describe("solid ComponentInstance slot fills", () => {
  it("emits an unscoped named slot fill as a node prop, not a <Tag.name> child", () => {
    const ci = createComponentInstance({
      reference: mockExpr("IInput") as ts.Identifier,
      resolved: { module: null, name: "IInput" },
      slots: [
        {
          name: "prefix",
          body: createElement({ tag: "span", children: [createText({ value: "$" })] }),
          scopedParams: [],
          loc,
        },
      ],
    });
    const code = emitCode(solid, makeComp("Parent", ci));
    // Matches the consumption side: `{props.prefix}`.
    expect(code).toContain("prefix={<span>$</span>}");
    expect(code).not.toContain("IInput.prefix");
  });

  it("emits a scoped named slot fill as a function prop, threading scopedParams", () => {
    const ci = createComponentInstance({
      reference: mockExpr("IList") as ts.Identifier,
      resolved: { module: null, name: "IList" },
      slots: [
        {
          name: "item",
          body: createElement({ tag: "span", children: [createText({ value: "row" })] }),
          scopedParams: ["item"],
          loc,
        },
      ],
    });
    const code = emitCode(solid, makeComp("Parent", ci));
    expect(code).toContain("item={(item) => (<span>row</span>)}");
  });

  it("keeps the default slot as children", () => {
    const ci = createComponentInstance({
      reference: mockExpr("ICard") as ts.Identifier,
      resolved: { module: null, name: "ICard" },
      slots: [
        { name: "default", body: createText({ value: "card content" }), scopedParams: [], loc },
      ],
    });
    const code = emitCode(solid, makeComp("Parent", ci));
    expect(code).toContain("card content");
  });

  it("inlines a re-projected slot fill to the bare prop read (no double braces)", () => {
    const ci = createComponentInstance({
      reference: mockExpr("IButton") as ts.Identifier,
      resolved: { module: null, name: "IButton" },
      slots: [
        { name: "icon", body: createSlotPlaceholder({ name: "icon" }), scopedParams: [], loc },
      ],
    });
    const code = emitCode(solid, makeComp("Parent", ci));
    expect(code).toContain("icon={props.icon}");
    expect(code).not.toContain("icon={{");
  });
});

describe("solid conformance", () => {
  it("uses oxlint with the solid jsPlugin and native control-flow imports", () => {
    expect(solid.conformance).toBeDefined();
    const c = solid.conformance!;
    expect(c.controlFlowImports.if).toEqual({ module: "solid-js", named: ["Show"] });
    expect(c.controlFlowImports.for).toEqual({ module: "solid-js", named: ["For"] });
    expect(c.controlFlowImports.switch).toEqual({ module: "solid-js", named: ["Switch", "Match"] });
    expect(c.lint.tool).toBe("oxlint");
    expect(c.lint.config).toContain("solid.oxlintrc.json");
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(0);
  });

  it("declares three control-flow imports", () => {
    expect(Object.keys(solid.conformance!.controlFlowImports)).toHaveLength(3);
  });
});

describe("solid emit + print", () => {
  it("Counter component", () => {
    const { fileName, code } = emitWithFile(solid, richComp("Counter", counterRender));
    expect(fileName).toBe("Counter.tsx");
    expect(code).toMatchSnapshot();
  });

  it("preserves reactive calls in a compound expression", () => {
    const render = createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count() * 2"), isReactive: true })],
    });
    expect(emitCode(solid, richComp("Compound", render))).toMatchSnapshot();
  });

  it("typed props", () => {
    const comp = richComp("Button", createElement({ tag: "div" }), { props: propsLabelDisabled() });
    expect(emitCode(solid, comp)).toMatchSnapshot();
  });

  it("reads the unscoped default slot from props.children, not props.default", () => {
    const code = emitCode(solid, slottedComp());
    expect(code).toContain("props.children ?? props.label");
    expect(code).not.toContain("props.default");
    expect(code).toContain("children?: any");
  });

  it("keeps children out of the attribute fallthrough rest", () => {
    const code = emitCode(solid, slottedComp(true));
    expect(code).toContain('splitProps(props, ["children"])');
    expect(code).not.toContain('"default"');
  });

  it("let declaration for ref", () => {
    const comp = richComp("Form", createElement({ tag: "div" }), { refs: elementRef() });
    expect(emitCode(solid, comp)).toMatchSnapshot();
  });

  it("multi-branch If emits nested Show", () => {
    const ifNode = createIf({
      branches: [
        { test: createExpr({ expr: mockExpr("a()") }), body: createText({ value: "A" }) },
        { test: createExpr({ expr: mockExpr("b()") }), body: createText({ value: "B" }) },
        { test: createExpr({ expr: mockExpr("c()") }), body: createText({ value: "C" }) },
      ],
      fallback: createText({ value: "fallback" }),
    });
    const comp = richComp("Multi", createElement({ tag: "div", children: [ifNode] }));
    expect(emitCode(solid, comp)).toMatchSnapshot();
  });

  it("single-branch If with fallback", () => {
    const ifNode = createIf({
      branches: [
        { test: createExpr({ expr: mockExpr("ok()") }), body: createText({ value: "yes" }) },
      ],
      fallback: createText({ value: "no" }),
    });
    const comp = richComp("Single", createElement({ tag: "div", children: [ifNode] }));
    expect(emitCode(solid, comp)).toMatchSnapshot();
  });

  it("Switch with fallback", () => {
    const switchNode = createSwitch({
      cases: [
        { test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "X" }) },
        { test: createExpr({ expr: mockExpr("y()") }), body: createText({ value: "Y" }) },
      ],
      fallback: createText({ value: "default" }),
    });
    const comp = richComp("Sw", createElement({ tag: "div", children: [switchNode] }));
    expect(emitCode(solid, comp)).toMatchSnapshot();
  });

  it("emits a side-effect CSS import for scoped styles", () => {
    const comp = richComp(
      "Styled",
      createElement({ tag: "button", children: [createText({ value: "click" })] }),
      { styles: scopedButtonStyle() },
    );
    const code = emitCode(solid, comp);
    expect(code).toContain('import "./Styled.css";');
    expect(code).not.toContain("module.css");
    expect(code).not.toContain("import styles");
  });

  it("external import appears after framework imports", () => {
    const code = emitWithCtx(
      solid,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithExternalImport(solid),
    );
    expect(code).toContain('import { badge } from "virtual:styleframe";');
    expect(code.indexOf('"solid-js"')).toBeLessThan(code.indexOf("virtual:styleframe"));
  });

  it("emits an __InkTransition wrapper + helper", () => {
    const code = emitCode(
      solid,
      richComp("Fade", createElement({ tag: "div", children: [transitionWithIf] })),
    );
    expect(code).toContain("__InkTransition");
    expect(code).toContain("transitionend");
    expect(code).toMatchSnapshot();
  });
});
