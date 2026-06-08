import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { createElement, createFragment, createText } from "../../../ir/render/builders.ts";
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
    contexts: [],
    imports: [],
    sourceFile: sf,
  };
}

function makeComp(name: string, render: IRComponent["render"]): IRComponent {
  return {
    kind: "Component",
    id: `t.tsx#${name}`,
    name,
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
    // A single host-element root is marked for attribute fallthrough, which makes it non-static.
    const root = result.components[0]!.render as IRElement;
    expect(root.acceptsAttrFallthrough).toBe(true);
    expect(root.isStatic).toBe(false);
  });

  it("handles multiple components", () => {
    const comp1 = makeComp("A", createElement({ tag: "div" }));
    const comp2 = makeComp("B", createElement({ tag: "span" }));
    const module = makeModule([comp1, comp2]);
    const ctx = makeCtx();
    const result = lower(module, ctx);

    expect(result.components).toHaveLength(2);
    expect((result.components[0]!.render as IRElement).acceptsAttrFallthrough).toBe(true);
    expect((result.components[1]!.render as IRElement).acceptsAttrFallthrough).toBe(true);
  });

  it("does not mark a fragment root for attribute fallthrough", () => {
    const frag = createFragment({ children: [createText({ value: "hello" })] });
    const comp = makeComp("T", frag);
    const module = makeModule([comp]);
    const ctx = makeCtx();
    const result = lower(module, ctx);
    expect(result.components[0]!.render.kind).toBe("Fragment");
    expect(
      (result.components[0]!.render as { acceptsAttrFallthrough?: boolean }).acceptsAttrFallthrough,
    ).toBeUndefined();
  });
});
