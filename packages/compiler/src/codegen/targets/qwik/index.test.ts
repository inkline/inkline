import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { DYNAMIC_DEPS, SymbolTable, type SymbolId } from "../../../ir/reactivity.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import {
  createElement,
  createExpr,
  createSwitch,
  createText,
  createComponentInstance,
} from "../../../ir/render/builders.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import type { CodegenContext } from "../../context.ts";
import { print } from "../../print/printer.ts";
import { qwik } from "./index.ts";

function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

const loc = UNKNOWN_LOCATION;

function makeComp(name: string, render: IRNode, overrides?: Partial<IRComponent>): IRComponent {
  return {
    kind: "Component",
    id: `t.tsx#${name}`,
    name,
    loc,
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
    ...overrides,
  };
}

function makeCtx(): CodegenContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["qwik"] }),
    symbols: new SymbolTable(),
    rewrites: qwik.rewrites,
  };
}

function emitCode(comp: IRComponent): string {
  return print(qwik.emit(comp, makeCtx()).root).code;
}

describe("Qwik codegen fixes", () => {
  describe("refs in jsxAttrs", () => {
    it("emits ref attribute on elements", () => {
      const render = createElement({
        tag: "input",
        refs: [
          {
            ref: createExpr({ expr: mockExpr("inputRef"), deps: DYNAMIC_DEPS }),
            category: "element",
            loc,
          },
        ],
      });
      const comp = makeComp("Form", render, {
        refs: [
          {
            name: "inputRef",
            symbolId: "t::ref::inputRef@0" as SymbolId,
            category: "element",
            elementType: "HTMLInputElement",
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      expect(code).toContain("ref={");
      expect(code).toContain("inputRef");
    });
  });

  describe("ComponentInstance slots", () => {
    it("renders default slot as children", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Card") as ts.Identifier,
        resolved: { module: null, name: "Card" },
        slots: [
          {
            name: "default",
            body: createText({ value: "card content" }),
            scopedParams: [],
            loc,
          },
        ],
      });
      const comp = makeComp("Parent", ci);
      const code = emitCode(comp);
      expect(code).toContain("<Card");
      expect(code).toContain("card content");
      expect(code).not.toContain("/>");
    });

    it("renders named slots as sub-elements", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Card") as ts.Identifier,
        resolved: { module: null, name: "Card" },
        slots: [
          {
            name: "header",
            body: createText({ value: "title" }),
            scopedParams: [],
            loc,
          },
        ],
      });
      const comp = makeComp("Parent", ci);
      const code = emitCode(comp);
      expect(code).toContain("Card.header");
      expect(code).toContain("title");
    });

    it("self-closes when no slots", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Icon") as ts.Identifier,
        resolved: { module: null, name: "Icon" },
        attrs: [
          {
            name: "name",
            value: { kind: "Static", value: "check", loc },
            binding: "normal",
            loc,
          },
        ],
      });
      const comp = makeComp("Parent", ci);
      const code = emitCode(comp);
      expect(code).toContain('name="check"');
      expect(code).toContain("/>");
    });
  });

  describe("For loop indexBinding", () => {
    it("includes both item and index params", () => {
      const forNode: IRNode = {
        kind: "For",
        each: createExpr({ expr: mockExpr("items()") }),
        itemBinding: "item",
        indexBinding: "idx",
        key: createExpr({ expr: mockExpr("item") }),
        syntheticKey: true,
        body: createText({ value: "row" }),
        loc,
      };
      const comp = makeComp("List", createElement({ tag: "div", children: [forNode] }));
      const code = emitCode(comp);
      expect(code).toContain("(item, idx)");
    });

    it("uses only item param when no indexBinding", () => {
      const forNode: IRNode = {
        kind: "For",
        each: createExpr({ expr: mockExpr("items()") }),
        itemBinding: "item",
        key: createExpr({ expr: mockExpr("item") }),
        syntheticKey: true,
        body: createText({ value: "row" }),
        loc,
      };
      const comp = makeComp("List", createElement({ tag: "div", children: [forNode] }));
      const code = emitCode(comp);
      expect(code).toContain("(item)");
      expect(code).not.toContain("idx");
    });
  });

  describe("Switch fallback", () => {
    it("renders fallback node instead of null", () => {
      const switchNode = createSwitch({
        cases: [{ test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "X" }) }],
        fallback: createText({ value: "default case" }),
      });
      const comp = makeComp("Sw", createElement({ tag: "div", children: [switchNode] }));
      const code = emitCode(comp);
      expect(code).toContain("default case");
    });

    it("renders null when no fallback", () => {
      const switchNode = createSwitch({
        cases: [{ test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "X" }) }],
      });
      const comp = makeComp("Sw", createElement({ tag: "div", children: [switchNode] }));
      const code = emitCode(comp);
      expect(code).toContain(": null");
    });
  });

  describe("resource handling", () => {
    it("emits useResource$ for resources", () => {
      const comp = makeComp("Data", createElement({ tag: "div" }), {
        resources: [
          {
            name: "data",
            fetcher: createExpr({ expr: mockExpr("() => fetchData()") }),
            symbolId: "t::signal::data@0" as SymbolId,
            loadingName: "loading",
            errorName: "error",
            refetchName: "refetch",
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      expect(code).toContain("useResource$");
      expect(code).toContain("const data");
      expect(code).toContain("fetchData");
    });
  });
});
