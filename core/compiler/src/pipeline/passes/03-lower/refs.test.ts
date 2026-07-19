import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { createElement, createComponentInstance, createExpr } from "../../../ir/render/builders.ts";
import type { IRComponent, IRElement, IRRefDeclaration } from "../../../ir/render/nodes.ts";
import type { SymbolId } from "../../../ir/reactivity.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { refs } from "./refs.ts";

function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function ident(name: string): ts.Identifier {
  const sf = ts.createSourceFile("t.ts", name, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression as ts.Identifier;
}

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

const refSymbolId = "t#T::ref::myRef@0" as SymbolId;

function makeComp(render: IRElement, refDecls: IRRefDeclaration[] = []): IRComponent {
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
    refs: refDecls,
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

describe("refs", () => {
  it("infers elementType from element tag", () => {
    const refExpr = createExpr({
      expr: mockExpr("myRef"),
      deps: [{ symbolId: refSymbolId, kind: "ref", name: "myRef", path: [], conditional: false }],
    });
    const el = createElement({
      tag: "input",
      refs: [{ ref: refExpr, category: "element", loc: UNKNOWN_LOCATION }],
    });
    const decl: IRRefDeclaration = {
      name: "myRef",
      symbolId: refSymbolId,
      category: "element",
      loc: UNKNOWN_LOCATION,
    };
    const ctx = makeCtx();
    const result = refs(makeComp(el, [decl]), ctx);
    expect(result.refs[0]!.elementType).toBe("HTMLInputElement");
    expect(ctx.diagnostics.freeze()).toHaveLength(0);
  });

  it("defaults to HTMLElement for unknown tags", () => {
    const refExpr = createExpr({
      expr: mockExpr("myRef"),
      deps: [{ symbolId: refSymbolId, kind: "ref", name: "myRef", path: [], conditional: false }],
    });
    const el = createElement({
      tag: "custom-element",
      refs: [{ ref: refExpr, category: "element", loc: UNKNOWN_LOCATION }],
    });
    const decl: IRRefDeclaration = {
      name: "myRef",
      symbolId: refSymbolId,
      category: "element",
      loc: UNKNOWN_LOCATION,
    };
    const ctx = makeCtx();
    const result = refs(makeComp(el, [decl]), ctx);
    expect(result.refs[0]!.elementType).toBe("HTMLElement");
  });

  it("classifies refs on ComponentInstance as component category (without resolved deps)", () => {
    // A component-instance ref binding carries an empty `deps` array in the real pipeline, so the
    // link to its declaration must resolve through the binding's identifier text — not
    // `deps[0].symbolId` (INK-15). Build the binding with no deps to pin that behavior directly.
    const refExpr = createExpr({ expr: mockExpr("myRef") });
    expect(refExpr.deps).toHaveLength(0);
    const ci = createComponentInstance({
      reference: ident("Button"),
      refs: [{ ref: refExpr, category: "element", loc: UNKNOWN_LOCATION }],
    });
    const decl: IRRefDeclaration = {
      name: "myRef",
      symbolId: refSymbolId,
      category: "element",
      loc: UNKNOWN_LOCATION,
    };
    const comp: IRComponent = {
      ...makeComp(createElement({ tag: "div" }), [decl]),
      render: ci,
    };
    const ctx = makeCtx();
    const result = refs(comp, ctx);
    expect(result.refs[0]!.category).toBe("component");
    expect(ctx.diagnostics.freeze()).toHaveLength(0);
  });

  it("returns same component when no refs", () => {
    const el = createElement({ tag: "div" });
    const comp = makeComp(el);
    const ctx = makeCtx();
    const result = refs(comp, ctx);
    expect(result).toBe(comp);
  });
});
