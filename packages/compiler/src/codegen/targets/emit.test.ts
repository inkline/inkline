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

describe("target emit + print", () => {
  it("Solid: emits valid Code IR that prints", () => {
    const comp = makeComp("Counter", renderTree);
    const ctx = makeCtx(solid);
    const module = solid.emit(comp, ctx);
    const result = print(module.root);
    expect(result.code).toContain("createSignal");
    expect(result.code).toContain("createMemo");
    expect(result.code).toContain("Counter");
    expect(module.fileName).toContain(".tsx");
  });

  it("React: emits valid Code IR that prints", () => {
    const comp = makeComp("Counter", renderTree);
    const ctx = makeCtx(react);
    const module = react.emit(comp, ctx);
    const result = print(module.root);
    expect(result.code).toContain("useState");
    expect(result.code).toContain("useMemo");
    expect(result.code).toContain("Counter");
    expect(module.fileName).toContain(".tsx");
  });

  it("Svelte: emits valid Code IR that prints", () => {
    const comp = makeComp("Counter", renderTree);
    const ctx = makeCtx(svelte);
    const module = svelte.emit(comp, ctx);
    const result = print(module.root);
    expect(result.code).toContain("$state");
    expect(result.code).toContain("$derived");
    expect(result.code).toContain("<script");
    expect(module.fileName).toContain(".svelte");
  });

  it("Vue: emits valid Code IR that prints", () => {
    const comp = makeComp("Counter", renderTree);
    const ctx = makeCtx(vue);
    const module = vue.emit(comp, ctx);
    const result = print(module.root);
    expect(result.code).toContain("ref(");
    expect(result.code).toContain("computed(");
    expect(result.code).toContain("<script");
    expect(module.fileName).toContain(".vue");
  });

  it("each target produces different file extensions", () => {
    const comp = makeComp("X", createElement({ tag: "div" }));
    expect(solid.emit(comp, makeCtx(solid)).fileName).toMatch(/\.tsx$/);
    expect(react.emit(comp, makeCtx(react)).fileName).toMatch(/\.tsx$/);
    expect(svelte.emit(comp, makeCtx(svelte)).fileName).toMatch(/\.svelte$/);
    expect(vue.emit(comp, makeCtx(vue)).fileName).toMatch(/\.vue$/);
  });

  it("Solid preserves reactive calls in output", () => {
    const comp = makeComp("Counter", renderTree);
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toContain("count()");
  });

  it("React strips reactive calls in render expressions", () => {
    const simpleRender = createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count()"), isReactive: true })],
    });
    const comp = makeComp("Simple", simpleRender);
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toContain("{count}");
    expect(result.code).not.toContain("{count()}");
  });

  it("React strips reactive calls in compound expressions", () => {
    const render = createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count() * 2 + other()"), isReactive: true })],
    });
    const comp = makeComp("Compound", render);
    const result = print(react.emit(comp, makeCtx(react)).root);
    expect(result.code).toContain("{count * 2 + other}");
    expect(result.code).not.toContain("count()");
  });

  it("Solid preserves reactive calls in compound expressions", () => {
    const render = createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count() * 2"), isReactive: true })],
    });
    const comp = makeComp("Compound", render);
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toContain("{count() * 2}");
  });

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
    const showCount = (result.code.match(/<Show/g) ?? []).length;
    expect(showCount).toBe(3);
    expect(result.code).toContain("A");
    expect(result.code).toContain("B");
    expect(result.code).toContain("C");
    expect(result.code).toContain("fallback");
  });

  it("Solid: single-branch If with fallback unchanged", () => {
    const ifNode = createIf({
      branches: [
        { test: createExpr({ expr: mockExpr("ok()") }), body: createText({ value: "yes" }) },
      ],
      fallback: createText({ value: "no" }),
    });
    const comp = makeComp("Single", createElement({ tag: "div", children: [ifNode] }));
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    const showCount = (result.code.match(/<Show/g) ?? []).length;
    expect(showCount).toBe(1);
    expect(result.code).toContain("yes");
    expect(result.code).toContain("no");
    expect(result.code).toContain("fallback");
  });

  it("Solid: Switch with fallback passes fallback prop", () => {
    const switchNode = createSwitch({
      cases: [
        { test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "X" }) },
        { test: createExpr({ expr: mockExpr("y()") }), body: createText({ value: "Y" }) },
      ],
      fallback: createText({ value: "default" }),
    });
    const comp = makeComp("Sw", createElement({ tag: "div", children: [switchNode] }));
    const result = print(solid.emit(comp, makeCtx(solid)).root);
    expect(result.code).toContain("<Switch");
    expect(result.code).toContain("fallback");
    expect(result.code).toContain("default");
    expect(result.code).toContain("<Match");
    const matchCount = (result.code.match(/<Match/g) ?? []).length;
    expect(matchCount).toBe(2);
  });
});
