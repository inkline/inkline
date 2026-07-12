// React unit-emit tests: hand-build IR, emit through the React target, assert the printed source.
// Real-world `.ink.tsx` → compile assertions live in ./__tests__/.

import { describe, it, expect } from "vitest";
import { type SymbolId } from "../../../ir/reactivity.ts";
import type { IRNode } from "../../../ir/render/nodes.ts";
import {
  createAttribute,
  createComponentInstance,
  createElement,
  createExpr,
  createSlotPlaceholder,
  createStaticValue,
  createSwitch,
  createText,
} from "../../../ir/render/builders.ts";
import * as ts from "typescript";
import { cRaw } from "../../code-ir/builders.ts";
import {
  counterRender,
  elementRef,
  emitCode,
  emitWithCtx,
  emitWithFile,
  loc,
  makeComp,
  makeCtxWithComponentImport,
  makeCtxWithExternalImport,
  mockExpr,
  propsLabelDisabled,
  richComp,
  runInvariants,
  scopedButtonStyle,
  transitionWithIf,
} from "../../../testing/codegen.ts";
import { react } from "./index.ts";

describe("react conformance", () => {
  it("uses oxlint with the react plugin", () => {
    expect(react.conformance).toBeDefined();
    const c = react.conformance!;
    expect(c.lint.tool).toBe("oxlint");
    expect(c.lint.config).toContain("react.oxlintrc.json");
    expect(c.typecheck.dtsImports).toContain("react");
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.vue", contents: "" })).toHaveLength(1);
  });

  it("declares no control-flow imports", () => {
    expect(Object.keys(react.conformance!.controlFlowImports)).toHaveLength(0);
  });
});

describe("react models + emit", () => {
  it("reads a model getter as props.<prop> and writes it via an update callback", () => {
    const comp = makeComp(
      "Field",
      createElement({
        tag: "input",
        attrs: [
          createAttribute({ name: "value", value: createExpr({ expr: mockExpr("value()") }) }),
        ],
        events: [
          {
            name: "onInput",
            handler: createExpr({ expr: mockExpr("(e) => setValue(e.target.value)") }),
            loc,
          },
        ],
      }),
      {
        models: [
          {
            name: "value",
            setterName: "setValue",
            propName: "value",
            getterSymbolId: "g" as SymbolId,
            setterSymbolId: "s" as SymbolId,
            loc,
          },
        ],
      },
    );
    const code = emitCode(react, comp);
    expect(code).toContain("value={props.value}");
    expect(code).toContain("props.onUpdateValue?.(e.target.value)");
    expect(code).toContain("value?: unknown");
    expect(code).toContain("onUpdateValue?: (value: unknown) => void");
    expect(code).not.toContain("useState"); // a model is not local state
  });

  it("rewrites emit(name, …) to a callback prop", () => {
    const comp = makeComp(
      "Btn",
      createElement({
        tag: "button",
        events: [
          {
            name: "onClick",
            handler: createExpr({ expr: mockExpr('() => emit("press", 1)') }),
            loc,
          },
        ],
      }),
      { emitName: "emit", events: [{ name: "press", loc }] },
    );
    const code = emitCode(react, comp);
    expect(code).toContain("props.onPress?.(1)");
    expect(code).toContain("onPress?: (...args: any[]) => void");
  });
});

describe("react emit + print", () => {
  it("Counter component", () => {
    const { fileName, code } = emitWithFile(react, richComp("Counter", counterRender));
    expect(fileName).toBe("Counter.tsx");
    expect(code).toMatchSnapshot();
  });

  it("strips reactive calls in a simple expression", () => {
    const render = createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count()"), isReactive: true })],
    });
    expect(emitCode(react, richComp("Simple", render))).toMatchSnapshot();
  });

  it("strips reactive calls in a compound expression", () => {
    const render = createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count() * 2 + doubled()"), isReactive: true })],
    });
    expect(emitCode(react, richComp("Compound", render))).toMatchSnapshot();
  });

  it("typed props", () => {
    const comp = richComp("Button", createElement({ tag: "div" }), { props: propsLabelDisabled() });
    expect(emitCode(react, comp)).toMatchSnapshot();
  });

  it("reads the unscoped default slot from props.children", () => {
    const comp = richComp(
      "Slotted",
      createElement({
        tag: "div",
        children: [
          createSlotPlaceholder({ fallback: createExpr({ expr: mockExpr("props.label") }) }),
        ],
      }),
      { slots: [{ name: "default", isScoped: false, scopedProps: [], required: false, loc }] },
    );
    expect(emitCode(react, comp)).toContain("props.children ?? props.label");
  });

  it("emits granular, deduped memo dependency refs (props.x), not the base object", () => {
    const comp = richComp("Styled", createElement({ tag: "div" }), {
      props: [
        { name: "color", required: false, symbolId: "t::prop::color@0" as SymbolId, loc },
        { name: "size", required: false, symbolId: "t::prop::size@1" as SymbolId, loc },
      ],
      memos: [
        {
          name: "cls",
          symbolId: "t::memo::cls@2" as SymbolId,
          expr: createExpr({
            expr: mockExpr("recipe({ color: props.color, size: props.size })"),
            deps: [
              {
                symbolId: "p0" as SymbolId,
                kind: "prop",
                name: "props",
                path: ["color"],
                conditional: false,
              },
              {
                symbolId: "p1" as SymbolId,
                kind: "prop",
                name: "props",
                path: ["size"],
                conditional: false,
              },
              {
                symbolId: "p0" as SymbolId,
                kind: "prop",
                name: "props",
                path: ["color"],
                conditional: false,
              },
            ],
            isReactive: true,
          }),
          loc,
        },
      ],
    });
    const code = emitCode(react, comp);
    expect(code).toContain(
      "const cls = useMemo(() => recipe({ color: props.color, size: props.size }), [props.color, props.size])",
    );
    expect(code).not.toMatch(/\[props, props/);
  });

  it("useRef with element type", () => {
    const comp = richComp("Form", createElement({ tag: "div" }), { refs: elementRef() });
    expect(emitCode(react, comp)).toMatchSnapshot();
  });

  it("declares refs before the memos and effects that read them (INK-12 TDZ)", () => {
    // richComp carries a `doubled` memo and a `console.log` effect; adding a ref must not leave the
    // `const inputRef = useRef(...)` declaration below the `useMemo`/`useEffect` calls, or a deps
    // array referencing `inputRef.current` would be a temporal-dead-zone ReferenceError.
    const code = emitCode(
      react,
      richComp("Form", createElement({ tag: "div" }), { refs: elementRef() }),
    );
    const refIdx = code.indexOf("const inputRef = useRef");
    const memoIdx = code.indexOf("useMemo(");
    const effectIdx = code.indexOf("useEffect(");
    expect(refIdx).toBeGreaterThanOrEqual(0);
    expect(memoIdx).toBeGreaterThanOrEqual(0);
    expect(effectIdx).toBeGreaterThanOrEqual(0);
    expect(refIdx).toBeLessThan(memoIdx);
    expect(refIdx).toBeLessThan(effectIdx);
  });

  it("forwardRef: expose and props both present", () => {
    const comp = richComp("Modal", createElement({ tag: "div" }), {
      props: [{ name: "title", required: true, symbolId: "t::prop::title@0" as SymbolId, loc }],
      expose: ["open", "close"],
    });
    expect(emitCode(react, comp)).toMatchSnapshot();
  });

  it("emits a side-effect CSS import for scoped styles", () => {
    const comp = richComp(
      "Styled",
      createElement({ tag: "button", children: [createText({ value: "click" })] }),
      { styles: scopedButtonStyle() },
    );
    const code = emitCode(react, comp);
    expect(code).toContain('import "./Styled.css";');
    expect(code).not.toContain("module.css");
    expect(code).not.toContain("import styles");
  });

  it("Switch fallback renders without regex replacement", () => {
    const switchNode = createSwitch({
      cases: [{ test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "X" }) }],
      fallback: createText({ value: "fallback" }),
    });
    const code = emitCode(
      react,
      richComp("Sw", createElement({ tag: "div", children: [switchNode] })),
    );
    expect(code).toContain("fallback");
    expect(code).not.toMatch(/: null\}/);
  });

  it("Switch renders null when no fallback", () => {
    const switchNode = createSwitch({
      cases: [{ test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "X" }) }],
    });
    const code = emitCode(
      react,
      richComp("Sw", createElement({ tag: "div", children: [switchNode] })),
    );
    expect(code).toContain(": null");
  });

  it("external import appears after framework imports", () => {
    const code = emitWithCtx(
      react,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithExternalImport(react),
    );
    expect(code).toContain('import { badge } from "virtual:styleframe";');
    expect(code.indexOf('"react"')).toBeLessThan(code.indexOf("virtual:styleframe"));
  });

  it("empty externalImports produces no extra output", () => {
    const code = emitCode(react, richComp("Test", createElement({ tag: "div" })));
    expect(code).not.toContain("virtual:styleframe");
  });

  it("component import appears before external imports", () => {
    const ctx = {
      ...makeCtxWithComponentImport(react),
      externalImports: [cRaw({ text: 'import { x } from "pkg";' })],
    };
    const code = emitWithCtx(react, richComp("Test", createElement({ tag: "div" })), ctx);
    expect(code.indexOf("IBadgeBase")).toBeLessThan(code.indexOf("pkg"));
  });

  it("empty componentImports produces no extra output", () => {
    const code = emitCode(react, richComp("Test", createElement({ tag: "div" })));
    expect(code).not.toContain("IBadgeBase");
  });

  it("emits an __InkTransition wrapper + helper", () => {
    const code = emitCode(
      react,
      richComp("Fade", createElement({ tag: "div", children: [transitionWithIf] })),
    );
    expect(code).toContain("__InkTransition");
    expect(code).toContain("transitionend");
    expect(code).toContain('name="fade"');
    expect(code).toMatchSnapshot();
  });

  it("emits no transition helper when there is no transition", () => {
    const code = emitCode(react, richComp("Plain", createElement({ tag: "div" })));
    expect(code).not.toContain("__InkTransition");
  });
});

describe("react ComponentInstance slot fills", () => {
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
    const code = emitCode(react, makeComp("Parent", ci));
    // Matches the consumption side: `{props.prefix}` gated by `props.prefix != null`.
    expect(code).toContain("prefix={<span>$</span>}");
    expect(code).not.toContain("IInput.prefix");
    expect(code).not.toContain("renderPrefix");
    // No default slot → component self-closes.
    expect(code).toContain("/>");
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
    const code = emitCode(react, makeComp("Parent", ci));
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
    const code = emitCode(react, makeComp("Parent", ci));
    expect(code).toContain("card content");
    expect(code).not.toContain("renderDefault");
    expect(code).not.toContain("/>");
  });

  // A fill whose body is itself a <Slot/> (re-projection) inlines the slot read; cover every variant
  // of that bare read (scoped/unscoped × named/default × with/without fallback).
  const reproject = (init: Parameters<typeof createSlotPlaceholder>[0]) =>
    emitCode(
      react,
      makeComp(
        "Parent",
        createComponentInstance({
          reference: mockExpr("IChild") as ts.Identifier,
          resolved: { module: null, name: "IChild" },
          slots: [{ name: "icon", body: createSlotPlaceholder(init), scopedParams: [], loc }],
        }),
      ),
    );

  it("re-projects a named slot with fallback as `props.x ?? fallback`", () => {
    expect(reproject({ name: "icon", fallback: createText({ value: "·" }) })).toContain(
      'icon={props.icon ?? "·"}',
    );
  });

  it("re-projects a scoped named slot as `props.x?.(args)` (with and without fallback)", () => {
    const args = [createExpr({ expr: mockExpr("row") })];
    expect(reproject({ name: "icon", scopedArgs: args })).toContain("icon={props.icon?.(row)}");
    expect(
      reproject({ name: "icon", scopedArgs: args, fallback: createText({ value: "·" }) }),
    ).toContain('icon={props.icon?.(row) ?? "·"}');
  });

  it("re-projects the default slot as `props.children` / `renderDefault?.(args)`", () => {
    expect(reproject({ fallback: createText({ value: "·" }) })).toContain(
      'icon={props.children ?? "·"}',
    );
    const args = [createExpr({ expr: mockExpr("row") })];
    expect(reproject({ scopedArgs: args })).toContain("icon={props.renderDefault?.(row)}");
  });
});

// Merged from the former react/fallthrough.test.ts.
describe("react attribute fallthrough", () => {
  function prop(name: string) {
    return { name, required: false, symbolId: `t::prop::${name}` as SymbolId, loc };
  }
  function defaultSlot() {
    return { name: "default", isScoped: false, scopedProps: [], required: false, loc };
  }
  function fallthroughComp(
    render: IRNode,
    opts: { props?: ReturnType<typeof prop>[]; slots?: ReturnType<typeof defaultSlot>[] } = {},
  ) {
    return makeComp("C", render, { props: opts.props ?? [], slots: opts.slots ?? [] });
  }

  it("merges an inherited className with a static root class", () => {
    const comp = fallthroughComp(
      createElement({
        tag: "div",
        attrs: [
          createAttribute({
            name: "class",
            value: createStaticValue({ value: "badge" }),
            binding: "class",
          }),
        ],
        children: [createText({ value: "x" })],
        acceptsAttrFallthrough: true,
      }),
      { props: [prop("label")], slots: [defaultSlot()] },
    );
    const code = emitCode(react, comp);
    expect(code).toContain("const { children, label, ...__attrs } = props");
    expect(code).toContain(
      '<div {...__attrs} className={["badge", props.className].filter(Boolean).join(" ")}>',
    );
    expect(code).toContain("React.HTMLAttributes<HTMLElement>");
  });

  it("merges an inherited className with a dynamic root class", () => {
    const comp = fallthroughComp(
      createElement({
        tag: "div",
        attrs: [
          createAttribute({
            name: "class",
            value: createExpr({ expr: mockExpr("badge(props)") }),
            binding: "class",
          }),
        ],
        acceptsAttrFallthrough: true,
      }),
    );
    const code = emitCode(react, comp);
    expect(code).toContain('className={[badge(props), props.className].filter(Boolean).join(" ")}');
  });

  it("forwards the inherited className when the root has no authored class", () => {
    const comp = fallthroughComp(createElement({ tag: "div", acceptsAttrFallthrough: true }));
    const code = emitCode(react, comp);
    expect(code).toContain("const { ...__attrs } = props");
    expect(code).toContain("<div {...__attrs} className={props.className} />");
  });

  it("does not leak declared props onto the root element", () => {
    const comp = fallthroughComp(createElement({ tag: "div", acceptsAttrFallthrough: true }), {
      props: [prop("label"), prop("disabled")],
    });
    const code = emitCode(react, comp);
    expect(code).toContain("const { label, disabled, ...__attrs } = props");
    expect(code).not.toMatch(/<div[^>]*\blabel=/);
  });

  it("emits no fallthrough wiring when the root does not accept it", () => {
    const comp = fallthroughComp(
      createElement({
        tag: "div",
        attrs: [
          createAttribute({
            name: "class",
            value: createStaticValue({ value: "badge" }),
            binding: "class",
          }),
        ],
      }),
    );
    const code = emitCode(react, comp);
    expect(code).toContain('className="badge"');
    expect(code).not.toContain("__attrs");
    expect(code).not.toContain("React.HTMLAttributes");
  });
});
