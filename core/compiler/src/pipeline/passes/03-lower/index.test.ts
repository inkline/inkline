import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { createElement, createText } from "../../../ir/render/builders.ts";
import type { IRComponent, IRElement, IRModule } from "../../../ir/render/nodes.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { lower } from "./index.ts";

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

function makeModule(components: IRComponent[]): IRModule {
  const sf = ts.createSourceFile("t.tsx", "", ts.ScriptTarget.Latest, true);
  return {
    version: 1,
    fileName: "t.tsx",
    components,
    imports: [],
    sourceFile: sf,
  };
}

function makeComp(name: string, render: IRElement): IRComponent {
  return {
    kind: "Component",
    id: `t.tsx#${name}`,
    name,
    loc: UNKNOWN_LOCATION,
    props: [],
    slots: [],
    events: [],
    state: [],
    refs: [],
    memos: [],
    effects: [],
    resources: [],
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render,
    primitives: [],
    styles: [],
    runtime: "iso",
    targetOverrides: {},
  };
}

describe("lower", () => {
  it("applies all lowerings to each component", () => {
    const el = createElement({
      tag: "div",
      children: [createText({ value: "hello" })],
    });
    const comp = makeComp("Test", el);
    const module = makeModule([comp]);
    const ctx = makeCtx();
    const result = lower(module, ctx);

    expect(result.components).toHaveLength(1);
    expect((result.components[0]!.render as IRElement).isStatic).toBe(true);
  });

  it("handles multiple components", () => {
    const comp1 = makeComp("A", createElement({ tag: "div" }));
    const comp2 = makeComp("B", createElement({ tag: "span" }));
    const module = makeModule([comp1, comp2]);
    const ctx = makeCtx();
    const result = lower(module, ctx);

    expect(result.components).toHaveLength(2);
    expect((result.components[0]!.render as IRElement).isStatic).toBe(true);
    expect((result.components[1]!.render as IRElement).isStatic).toBe(true);
  });

  it("preserves component render when already static", () => {
    const el = createElement({ tag: "div" });
    const comp = makeComp("T", el);
    const compWithStatic: IRComponent = { ...comp, render: { ...el, isStatic: true } };
    const module = makeModule([compWithStatic]);
    const ctx = makeCtx();
    const result = lower(module, ctx);
    expect(result.components[0]!.render).toBe(compWithStatic.render);
  });
});
