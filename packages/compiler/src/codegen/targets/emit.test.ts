import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../ir/types.ts";
import { DYNAMIC_DEPS, SymbolTable, type SymbolId } from "../../ir/reactivity.ts";
import type { IRComponent, IRNode } from "../../ir/render/nodes.ts";
import {
  createElement,
  createExpr,
  createIf,
  createSwitch,
  createText,
} from "../../ir/render/builders.ts";
import { createDiagnosticCollector } from "../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../core/options.ts";
import type { CodegenContext } from "../context.ts";
import { print } from "../print/printer.ts";
import { solid } from "./solid/index.ts";
import { react } from "./react/index.ts";
import { svelte } from "./svelte/index.ts";
import { vue } from "./vue/index.ts";

function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

const loc = UNKNOWN_LOCATION;

function makeComp(name: string, render: IRNode): IRComponent {
  return {
    kind: "Component",
    id: `t.tsx#${name}`,
    name,
    loc,
    props: [],
    slots: [],
    events: [],
    state: [
      {
        name: "count",
        setterName: "setCount",
        initial: createExpr({ expr: mockExpr("0") }),
        symbolId: "t::signal::count@0" as SymbolId,
        setterSymbolId: "t::signal::setCount@10" as SymbolId,
        loc,
      },
    ],
    refs: [],
    memos: [
      {
        name: "doubled",
        symbolId: "t::memo::doubled@20" as SymbolId,
        expr: createExpr({
          expr: mockExpr("count() * 2"),
          deps: [
            {
              symbolId: "t::signal::count@0" as SymbolId,
              kind: "signal",
              name: "count",
              path: [],
              conditional: false,
            },
          ],
          isReactive: true,
        }),
        loc,
      },
    ],
    effects: [
      {
        body: mockExpr('() => { console.log("effect") }'),
        deps: DYNAMIC_DEPS,
        cleanup: "absent",
        isDynamic: false,
        loc,
      },
    ],
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render,
    primitives: [],
    targetOverrides: {},
  };
}

function makeCtx(target: { rewrites: (typeof solid)["rewrites"] }): CodegenContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    rewrites: target.rewrites,
  };
}

const renderTree = createElement({
  tag: "div",
  children: [
    createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count()"), isReactive: true })],
    }),
    createElement({
      tag: "button",
      events: [
        {
          name: "onClick",
          handler: createExpr({ expr: mockExpr("() => setCount(count() + 1)") }),
          loc,
        },
      ],
      children: [createText({ value: "+1" })],
    }),
  ],
});

describe("target emit + print (full output)", () => {
  it("Solid: Counter component", () => {
    const comp = makeComp("Counter", renderTree);
    const module = solid.emit(comp, makeCtx(solid));
    const result = print(module.root);
    expect(module.fileName).toBe("Counter.tsx");
    expect(result.code).toMatchSnapshot();
  });

  it("React: Counter component", () => {
    const comp = makeComp("Counter", renderTree);
    const module = react.emit(comp, makeCtx(react));
    const result = print(module.root);
    expect(module.fileName).toBe("Counter.tsx");
    expect(result.code).toMatchSnapshot();
  });

  it("Svelte: Counter component", () => {
    const comp = makeComp("Counter", renderTree);
    const module = svelte.emit(comp, makeCtx(svelte));
    const result = print(module.root);
    expect(module.fileName).toBe("Counter.svelte");
    expect(result.code).toMatchSnapshot();
  });

  it("Vue: Counter component", () => {
    const comp = makeComp("Counter", renderTree);
    const module = vue.emit(comp, makeCtx(vue));
    const result = print(module.root);
    expect(module.fileName).toBe("Counter.vue");
    expect(result.code).toMatchSnapshot();
  });
});

describe("reactive call rewriting", () => {
  it("React: strips reactive calls in simple expression", () => {
    const render = createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count()"), isReactive: true })],
    });
    const comp = makeComp("Simple", render);
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toMatchSnapshot();
  });

  it("React: strips reactive calls in compound expression", () => {
    const render = createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count() * 2 + other()"), isReactive: true })],
    });
    const comp = makeComp("Compound", render);
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toMatchSnapshot();
  });

  it("Solid: preserves reactive calls in compound expression", () => {
    const render = createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count() * 2"), isReactive: true })],
    });
    const comp = makeComp("Compound", render);
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toMatchSnapshot();
  });
});

describe("control flow emission", () => {
  it("Solid: multi-branch If emits nested Show", () => {
    const ifNode = createIf({
      branches: [
        { test: createExpr({ expr: mockExpr("a()") }), body: createText({ value: "A" }) },
        { test: createExpr({ expr: mockExpr("b()") }), body: createText({ value: "B" }) },
        { test: createExpr({ expr: mockExpr("c()") }), body: createText({ value: "C" }) },
      ],
      fallback: createText({ value: "fallback" }),
    });
    const comp = makeComp("Multi", createElement({ tag: "div", children: [ifNode] }));
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toMatchSnapshot();
  });

  it("Solid: single-branch If with fallback", () => {
    const ifNode = createIf({
      branches: [
        { test: createExpr({ expr: mockExpr("ok()") }), body: createText({ value: "yes" }) },
      ],
      fallback: createText({ value: "no" }),
    });
    const comp = makeComp("Single", createElement({ tag: "div", children: [ifNode] }));
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toMatchSnapshot();
  });

  it("Solid: Switch with fallback", () => {
    const switchNode = createSwitch({
      cases: [
        { test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "X" }) },
        { test: createExpr({ expr: mockExpr("y()") }), body: createText({ value: "Y" }) },
      ],
      fallback: createText({ value: "default" }),
    });
    const comp = makeComp("Sw", createElement({ tag: "div", children: [switchNode] }));
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toMatchSnapshot();
  });
});

describe("props type generation", () => {
  function makeCompWithProps(name: string): IRComponent {
    return {
      ...makeComp(name, createElement({ tag: "div" })),
      props: [
        { name: "label", required: true, symbolId: "t::prop::label@0" as SymbolId, loc },
        { name: "disabled", required: false, symbolId: "t::prop::disabled@1" as SymbolId, loc },
      ],
    };
  }

  it("React: typed props", () => {
    const comp = makeCompWithProps("Button");
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toMatchSnapshot();
  });

  it("Solid: typed props", () => {
    const comp = makeCompWithProps("Button");
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toMatchSnapshot();
  });

  it("Vue: defineProps with types", () => {
    const comp = makeCompWithProps("Button");
    const result = print(vue.emit(comp, makeCtx(vue)).root);
    expect(result.code).toMatchSnapshot();
  });

  it("Svelte: $props destructuring", () => {
    const comp = makeCompWithProps("Button");
    const result = print(svelte.emit(comp, makeCtx(svelte)).root);
    expect(result.code).toMatchSnapshot();
  });
});

describe("ref emission", () => {
  function makeCompWithRef(name: string): IRComponent {
    return {
      ...makeComp(name, createElement({ tag: "div" })),
      refs: [
        {
          name: "inputRef",
          symbolId: "t::ref::inputRef@0" as SymbolId,
          category: "element" as const,
          elementType: "HTMLInputElement",
          loc,
        },
      ],
    };
  }

  it("React: useRef with element type", () => {
    const comp = makeCompWithRef("Form");
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toMatchSnapshot();
  });

  it("Solid: let declaration for ref", () => {
    const comp = makeCompWithRef("Form");
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toMatchSnapshot();
  });

  it("Vue: ref() for element ref", () => {
    const comp = makeCompWithRef("Form");
    const result = print(vue.emit(comp, makeCtx(vue)).root);
    expect(result.code).toMatchSnapshot();
  });
});

describe("React forwardRef + props", () => {
  it("expose and props both present", () => {
    const comp: IRComponent = {
      ...makeComp("Modal", createElement({ tag: "div" })),
      props: [{ name: "title", required: true, symbolId: "t::prop::title@0" as SymbolId, loc }],
      expose: ["open", "close"],
    };
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toMatchSnapshot();
  });
});
