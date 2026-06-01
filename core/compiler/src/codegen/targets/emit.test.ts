import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../ir/types.ts";
import { DYNAMIC_DEPS, SymbolTable, type SymbolId } from "../../ir/reactivity.ts";
import type { IRComponent, IRNode } from "../../ir/render/nodes.ts";
import {
  createElement,
  createExpr,
  createIf,
  createSlotPlaceholder,
  createSwitch,
  createText,
  createTransition,
} from "../../ir/render/builders.ts";
import { createDiagnosticCollector } from "../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../core/options.ts";
import type { CodegenContext } from "../context.ts";
import { cRaw } from "../code-ir/builders.ts";
import { print } from "../print/printer.ts";
import { solid } from "./solid/index.ts";
import { react } from "./react/index.ts";
import { svelte } from "./svelte/index.ts";
import { vue } from "./vue/index.ts";
import { angular } from "./angular/index.ts";
import { qwik } from "./qwik/index.ts";
import { astro } from "./astro/index.ts";

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

function makeCtx(target: { rewrites: (typeof solid)["rewrites"] }): CodegenContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    rewrites: target.rewrites,
    contexts: [],
    externalImports: [],
    componentImports: [],
    typeDeclarations: [],
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

describe("default slot emission", () => {
  function makeSlottedComp(name: string, fallthrough = false): IRComponent {
    return {
      ...makeComp(
        name,
        createElement({
          tag: "div",
          acceptsAttrFallthrough: fallthrough,
          children: [
            createSlotPlaceholder({ fallback: createExpr({ expr: mockExpr("props.label") }) }),
          ],
        }),
      ),
      slots: [{ name: "default", isScoped: false, scopedProps: [], required: false, loc }],
    };
  }

  it("Solid: reads the unscoped default slot from props.children, not props.default", () => {
    const result = print(solid.emit(makeSlottedComp("Slotted"), makeCtx(solid)).root);
    expect(result.code).toContain("props.children ?? props.label");
    expect(result.code).not.toContain("props.default");
    expect(result.code).toContain("children?: any");
  });

  it("Solid: keeps children out of the attribute fallthrough rest", () => {
    const result = print(solid.emit(makeSlottedComp("Slotted", true), makeCtx(solid)).root);
    expect(result.code).toContain('splitProps(props, ["children"])');
    expect(result.code).not.toContain('"default"');
  });

  it("React: reads the unscoped default slot from props.children (parity reference)", () => {
    const result = print(react.emit(makeSlottedComp("Slotted"), makeCtx(react)).root);
    expect(result.code).toContain("props.children ?? props.label");
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

describe("Angular target", () => {
  it("Counter component", () => {
    const comp = makeComp("Counter", renderTree);
    const module = angular.emit(comp, makeCtx(angular));
    const result = print(module.root);
    expect(module.fileName).toBe("Counter.component.ts");
    expect(result.code).toMatchSnapshot();
  });

  it("output contains @Component decorator", () => {
    const comp = makeComp("Counter", renderTree);
    const result = print(angular.emit(comp, makeCtx(angular)).root);
    expect(result.code).toContain("@Component");
  });

  it("output imports from @angular/core", () => {
    const comp = makeComp("Counter", renderTree);
    const result = print(angular.emit(comp, makeCtx(angular)).root);
    expect(result.code).toContain("@angular/core");
  });

  it("props type generation", () => {
    const comp: IRComponent = {
      ...makeComp("Button", createElement({ tag: "div" })),
      props: [
        { name: "label", required: true, symbolId: "t::prop::label@0" as SymbolId, loc },
        { name: "disabled", required: false, symbolId: "t::prop::disabled@1" as SymbolId, loc },
      ],
    };
    const result = print(angular.emit(comp, makeCtx(angular)).root);
    expect(result.code).toMatchSnapshot();
  });

  it("control flow: If emits @if/@else if", () => {
    const ifNode = createIf({
      branches: [
        { test: createExpr({ expr: mockExpr("a()") }), body: createText({ value: "A" }) },
        { test: createExpr({ expr: mockExpr("b()") }), body: createText({ value: "B" }) },
      ],
      fallback: createText({ value: "fallback" }),
    });
    const comp = makeComp("IfTest", createElement({ tag: "div", children: [ifNode] }));
    const result = print(angular.emit(comp, makeCtx(angular)).root);
    expect(result.code).toContain("@if");
    expect(result.code).toContain("@else if");
    expect(result.code).toContain("@else");
  });
});

describe("Qwik target", () => {
  it("Counter component", () => {
    const comp = makeComp("Counter", renderTree);
    const module = qwik.emit(comp, makeCtx(qwik));
    const result = print(module.root);
    expect(module.fileName).toBe("Counter.tsx");
    expect(result.code).toMatchSnapshot();
  });

  it("output contains component$", () => {
    const comp = makeComp("Counter", renderTree);
    const result = print(qwik.emit(comp, makeCtx(qwik)).root);
    expect(result.code).toContain("component$");
  });

  it("output imports from @qwik.dev/core", () => {
    const comp = makeComp("Counter", renderTree);
    const result = print(qwik.emit(comp, makeCtx(qwik)).root);
    expect(result.code).toContain("@qwik.dev/core");
  });

  it("output uses useSignal and useComputed$", () => {
    const comp = makeComp("Counter", renderTree);
    const result = print(qwik.emit(comp, makeCtx(qwik)).root);
    expect(result.code).toContain("useSignal");
    expect(result.code).toContain("useComputed$");
  });

  it("props type generation", () => {
    const comp: IRComponent = {
      ...makeComp("Button", createElement({ tag: "div" })),
      props: [
        { name: "label", required: true, symbolId: "t::prop::label@0" as SymbolId, loc },
        { name: "disabled", required: false, symbolId: "t::prop::disabled@1" as SymbolId, loc },
      ],
    };
    const result = print(qwik.emit(comp, makeCtx(qwik)).root);
    expect(result.code).toMatchSnapshot();
  });
});

describe("Astro target", () => {
  it("Counter component", () => {
    const comp = makeComp("Counter", renderTree);
    const module = astro.emit(comp, makeCtx(astro));
    const result = print(module.root);
    expect(module.fileName).toBe("Counter.astro");
    expect(result.code).toMatchSnapshot();
  });

  it("output contains --- frontmatter delimiters", () => {
    const comp = makeComp("Counter", renderTree);
    const result = print(astro.emit(comp, makeCtx(astro)).root);
    expect(result.code).toContain("---");
  });

  it("props use Astro.props", () => {
    const comp: IRComponent = {
      ...makeComp("Button", createElement({ tag: "div" })),
      props: [
        { name: "label", required: true, symbolId: "t::prop::label@0" as SymbolId, loc },
        { name: "disabled", required: false, symbolId: "t::prop::disabled@1" as SymbolId, loc },
      ],
    };
    const result = print(astro.emit(comp, makeCtx(astro)).root);
    expect(result.code).toContain("Astro.props");
    expect(result.code).toMatchSnapshot();
  });
});

describe("Svelte onCleanup lifecycle", () => {
  it("emits $effect with cleanup return", () => {
    const comp: IRComponent = {
      ...makeComp("Cleanup", createElement({ tag: "div" })),
      lifecycle: {
        onMount: [],
        onCleanup: [
          {
            body: mockExpr("() => unsubscribe()"),
            deps: DYNAMIC_DEPS,
            cleanup: "present",
            isDynamic: false,
            loc,
          },
        ],
      },
    };
    const result = print(svelte.emit(comp, makeCtx(svelte)).root);
    expect(result.code).toContain("$effect");
    expect(result.code).toContain("return");
    expect(result.code).toContain("unsubscribe");
  });
});

describe("style emission", () => {
  function makeCompWithStyles(name: string): IRComponent {
    return {
      ...makeComp(
        name,
        createElement({ tag: "button", children: [createText({ value: "click" })] }),
      ),
      styles: [{ css: "button { color: red; }", scoped: true, lang: "css" as const, loc }],
    };
  }

  it("React: emits side-effect CSS import", () => {
    const comp = makeCompWithStyles("Styled");
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toContain('import "./Styled.css";');
    expect(result.code).not.toContain("module.css");
    expect(result.code).not.toContain("import styles");
  });

  it("Solid: emits side-effect CSS import", () => {
    const comp = makeCompWithStyles("Styled");
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toContain('import "./Styled.css";');
    expect(result.code).not.toContain("module.css");
    expect(result.code).not.toContain("import styles");
  });

  it("Qwik: emits side-effect CSS import", () => {
    const comp = makeCompWithStyles("Styled");
    const result = print(qwik.emit(comp, makeCtx(qwik)).root);
    expect(result.code).toContain('import "./Styled.css";');
    expect(result.code).not.toContain("module.css");
  });

  it("Astro: emits scoped style block", () => {
    const comp = makeCompWithStyles("Styled");
    const result = print(astro.emit(comp, makeCtx(astro)).root);
    expect(result.code).toContain("<style scoped>");
    expect(result.code).toContain("button { color: red; }");
    expect(result.code).toContain("</style>");
  });

  it("Vue: emits scoped style block", () => {
    const comp = makeCompWithStyles("Styled");
    const result = print(vue.emit(comp, makeCtx(vue)).root);
    expect(result.code).toContain("<style scoped>");
    expect(result.code).toContain("button { color: red; }");
  });

  it("Svelte: emits scoped style block", () => {
    const comp = makeCompWithStyles("Styled");
    const result = print(svelte.emit(comp, makeCtx(svelte)).root);
    expect(result.code).toContain("<style scoped>");
    expect(result.code).toContain("button { color: red; }");
  });
});

describe("React Switch fallback (accumulator)", () => {
  it("renders fallback without regex replacement", () => {
    const switchNode = createSwitch({
      cases: [{ test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "X" }) }],
      fallback: createText({ value: "fallback" }),
    });
    const comp = makeComp("Sw", createElement({ tag: "div", children: [switchNode] }));
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toContain("fallback");
    expect(result.code).not.toMatch(/: null\}/);
  });

  it("renders null when no fallback", () => {
    const switchNode = createSwitch({
      cases: [{ test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "X" }) }],
    });
    const comp = makeComp("Sw", createElement({ tag: "div", children: [switchNode] }));
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toContain(": null");
  });
});

describe("external import emission", () => {
  function makeCtxWithImports(target: { rewrites: (typeof solid)["rewrites"] }): CodegenContext {
    return {
      ...makeCtx(target),
      externalImports: [cRaw({ text: 'import { badge } from "virtual:styleframe";' })],
    };
  }

  it("React: external import appears after framework imports", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = makeCtxWithImports(react);
    const result = print(react.emit(comp, ctx).root);
    expect(result.code).toContain('import { badge } from "virtual:styleframe";');
    const reactIdx = result.code.indexOf('"react"');
    const sfIdx = result.code.indexOf("virtual:styleframe");
    expect(reactIdx).toBeLessThan(sfIdx);
  });

  it("Solid: external import appears after framework imports", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = makeCtxWithImports(solid);
    const result = print(solid.emit(comp, ctx).root);
    expect(result.code).toContain('import { badge } from "virtual:styleframe";');
    const solidIdx = result.code.indexOf('"solid-js"');
    const sfIdx = result.code.indexOf("virtual:styleframe");
    expect(solidIdx).toBeLessThan(sfIdx);
  });

  it("Vue: external import appears inside <script setup>", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = makeCtxWithImports(vue);
    const result = print(vue.emit(comp, ctx).root);
    expect(result.code).toContain('import { badge } from "virtual:styleframe";');
    const scriptStart = result.code.indexOf("<script");
    const importIdx = result.code.indexOf("virtual:styleframe");
    const templateStart = result.code.indexOf("<template>");
    expect(importIdx).toBeGreaterThan(scriptStart);
    expect(importIdx).toBeLessThan(templateStart);
  });

  it("Svelte: external import appears inside <script>", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = makeCtxWithImports(svelte);
    const result = print(svelte.emit(comp, ctx).root);
    expect(result.code).toContain('import { badge } from "virtual:styleframe";');
    const scriptStart = result.code.indexOf("<script");
    const importIdx = result.code.indexOf("virtual:styleframe");
    expect(importIdx).toBeGreaterThan(scriptStart);
  });

  it("Angular: external import appears at top of file", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = makeCtxWithImports(angular);
    const result = print(angular.emit(comp, ctx).root);
    expect(result.code).toContain('import { badge } from "virtual:styleframe";');
    const angularIdx = result.code.indexOf('"@angular/core"');
    const sfIdx = result.code.indexOf("virtual:styleframe");
    expect(angularIdx).toBeLessThan(sfIdx);
  });

  it("Qwik: external import appears after framework imports", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = makeCtxWithImports(qwik);
    const result = print(qwik.emit(comp, ctx).root);
    expect(result.code).toContain('import { badge } from "virtual:styleframe";');
    const qwikIdx = result.code.indexOf('"@qwik.dev/core"');
    const sfIdx = result.code.indexOf("virtual:styleframe");
    expect(qwikIdx).toBeLessThan(sfIdx);
  });

  it("Astro: external import appears inside frontmatter", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = makeCtxWithImports(astro);
    const result = print(astro.emit(comp, ctx).root);
    expect(result.code).toContain('import { badge } from "virtual:styleframe";');
    const fences = [...result.code.matchAll(/---/g)];
    const importIdx = result.code.indexOf("virtual:styleframe");
    expect(importIdx).toBeGreaterThan(fences[0]!.index!);
    expect(importIdx).toBeLessThan(fences[1]!.index!);
  });

  it("empty externalImports produces no extra output", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctxEmpty = makeCtx(react);
    const result = print(react.emit(comp, ctxEmpty).root);
    expect(result.code).not.toContain("virtual:styleframe");
  });
});

describe("component import placement", () => {
  function makeCtxWithComponentImports(target: {
    rewrites: (typeof solid)["rewrites"];
  }): CodegenContext {
    return {
      ...makeCtx(target),
      componentImports: [
        { localName: "IBadgeBase", componentName: "IBadgeBase", relativePath: "../IBadgeBase" },
      ],
    };
  }

  it("React: component import appears before external imports", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = {
      ...makeCtxWithComponentImports(react),
      externalImports: [cRaw({ text: 'import { x } from "pkg";' })],
    };
    const result = print(react.emit(comp, ctx).root);
    const compIdx = result.code.indexOf("IBadgeBase");
    const extIdx = result.code.indexOf("pkg");
    expect(compIdx).toBeLessThan(extIdx);
  });

  it("Vue: component import inside <script setup>", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = makeCtxWithComponentImports(vue);
    const result = print(vue.emit(comp, ctx).root);
    const scriptStart = result.code.indexOf("<script");
    const importIdx = result.code.indexOf("IBadgeBase");
    const templateStart = result.code.indexOf("<template>");
    expect(importIdx).toBeGreaterThan(scriptStart);
    expect(importIdx).toBeLessThan(templateStart);
  });

  it("Svelte: component import inside <script>", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = makeCtxWithComponentImports(svelte);
    const result = print(svelte.emit(comp, ctx).root);
    const scriptIdx = result.code.indexOf("<script");
    const importIdx = result.code.indexOf("IBadgeBase");
    expect(importIdx).toBeGreaterThan(scriptIdx);
  });

  it("Astro: component import inside frontmatter", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const ctx = makeCtxWithComponentImports(astro);
    const result = print(astro.emit(comp, ctx).root);
    const fences = [...result.code.matchAll(/---/g)];
    const importIdx = result.code.indexOf("IBadgeBase");
    expect(importIdx).toBeGreaterThan(fences[0]!.index!);
    expect(importIdx).toBeLessThan(fences[1]!.index!);
  });

  it("empty componentImports produces no extra output", () => {
    const comp = makeComp("Test", createElement({ tag: "div" }));
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).not.toContain("IBadgeBase");
  });
});

describe("transition emission", () => {
  const transitionWithIf = createTransition({
    name: "fade",
    child: createIf({
      branches: [
        {
          test: createExpr({ expr: mockExpr("visible()") }),
          body: createElement({ tag: "p", children: [createText({ value: "Hello" })] }),
        },
      ],
    }),
  });

  const transitionAppear = createTransition({
    name: "slide",
    appear: true,
    child: createIf({
      branches: [
        {
          test: createExpr({ expr: mockExpr("show()") }),
          body: createElement({ tag: "div", children: [createText({ value: "Content" })] }),
        },
      ],
      fallback: createText({ value: "Hidden" }),
    }),
  });

  it("Vue: wraps child in <Transition>", () => {
    const comp = makeComp("Fade", createElement({ tag: "div", children: [transitionWithIf] }));
    const result = print(vue.emit(comp, makeCtx(vue)).root);
    expect(result.code).toContain("<Transition");
    expect(result.code).toContain('name="fade"');
    expect(result.code).toMatchSnapshot();
  });

  it("Vue: appear prop emitted", () => {
    const comp = makeComp("Slide", createElement({ tag: "div", children: [transitionAppear] }));
    const result = print(vue.emit(comp, makeCtx(vue)).root);
    expect(result.code).toContain("appear");
    expect(result.code).toMatchSnapshot();
  });

  it("Svelte: pushes transition directive into child element", () => {
    const comp = makeComp("Fade", createElement({ tag: "div", children: [transitionWithIf] }));
    const result = print(svelte.emit(comp, makeCtx(svelte)).root);
    expect(result.code).toContain("in:__inkTransitionIn");
    expect(result.code).toContain("out:__inkTransitionOut");
    expect(result.code).toContain("{#if");
    expect(result.code).toMatchSnapshot();
  });

  it("React: emits __InkTransition wrapper + helper", () => {
    const comp = makeComp("Fade", createElement({ tag: "div", children: [transitionWithIf] }));
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toContain("__InkTransition");
    expect(result.code).toContain("transitionend");
    expect(result.code).toContain('name="fade"');
    expect(result.code).toMatchSnapshot();
  });

  it("React: no helper when no transition", () => {
    const comp = makeComp("Plain", createElement({ tag: "div" }));
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).not.toContain("__InkTransition");
  });

  it("Solid: emits __InkTransition wrapper + helper", () => {
    const comp = makeComp("Fade", createElement({ tag: "div", children: [transitionWithIf] }));
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toContain("__InkTransition");
    expect(result.code).toContain("transitionend");
    expect(result.code).toMatchSnapshot();
  });

  it("Qwik: emits __InkTransition wrapper + helper", () => {
    const comp = makeComp("Fade", createElement({ tag: "div", children: [transitionWithIf] }));
    const result = print(qwik.emit(comp, makeCtx(qwik)).root);
    expect(result.code).toContain("__InkTransition");
    expect(result.code).toContain("transitionend");
    expect(result.code).toMatchSnapshot();
  });

  it("Angular: passes through to child", () => {
    const comp = makeComp("Fade", createElement({ tag: "div", children: [transitionWithIf] }));
    const result = print(angular.emit(comp, makeCtx(angular)).root);
    expect(result.code).not.toContain("Transition");
    expect(result.code).toContain("@if");
    expect(result.code).toMatchSnapshot();
  });

  it("Astro: passes through to child", () => {
    const comp = makeComp("Fade", createElement({ tag: "div", children: [transitionWithIf] }));
    const result = print(astro.emit(comp, makeCtx(astro)).root);
    expect(result.code).not.toContain("Transition");
    expect(result.code).toMatchSnapshot();
  });
});
