import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { DYNAMIC_DEPS, SymbolTable, type SymbolId } from "../../../ir/reactivity.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import {
  createElement,
  createExpr,
  createText,
  createComponentInstance,
} from "../../../ir/render/builders.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import type { CodegenContext } from "../../context.ts";
import { print } from "../../print/printer.ts";
import { angular } from "./index.ts";

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
    provides: [],
    consumes: [],
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
    options: resolveOptions({ targets: ["angular"] }),
    symbols: new SymbolTable(),
    rewrites: angular.rewrites,
    contexts: [],
    externalImports: [],
    componentImports: [],
    typeDeclarations: [],
  };
}

function emitCode(comp: IRComponent): string {
  return print(angular.emit(comp, makeCtx()).root).code;
}

describe("Angular codegen fixes", () => {
  describe("ComponentInstance attrs, events, slots", () => {
    it("renders attrs on component instances", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Card") as ts.Identifier,
        resolved: { module: null, name: "Card" },
        attrs: [
          { name: "title", value: { kind: "Static", value: "Hello", loc }, binding: "normal", loc },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("<Card");
      expect(code).toContain('title="Hello"');
    });

    it("renders dynamic attrs with binding syntax", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Panel") as ts.Identifier,
        resolved: { module: null, name: "Panel" },
        attrs: [
          {
            name: "visible",
            value: createExpr({ expr: mockExpr("isOpen()") }),
            binding: "normal",
            loc,
          },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("[visible]=");
    });

    it("renders events with Angular event syntax", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Button") as ts.Identifier,
        resolved: { module: null, name: "Button" },
        events: [
          {
            name: "onClick",
            handler: createExpr({ expr: mockExpr("() => handleClick()") }),
            loc,
          },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("(click)=");
    });

    it("renders slot content", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Card") as ts.Identifier,
        resolved: { module: null, name: "Card" },
        slots: [
          {
            name: "default",
            body: createText({ value: "card body" }),
            scopedParams: [],
            loc,
          },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("card body");
      expect(code).toContain("</Card>");
    });

    it("self-closes when no slots", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Icon") as ts.Identifier,
        resolved: { module: null, name: "Icon" },
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("/>");
    });
  });

  describe("Element refs", () => {
    it("emits template reference variable and viewChild declaration", () => {
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
      expect(code).toContain("#inputRef");
      expect(code).toContain("viewChild<ElementRef>('inputRef')");
      expect(code).toContain("viewChild");
    });
  });

  describe("multiple refs", () => {
    it("does not duplicate viewChild/ElementRef imports", () => {
      const render = createElement({
        tag: "div",
        children: [
          createElement({
            tag: "input",
            refs: [
              {
                ref: createExpr({ expr: mockExpr("inputRef"), deps: DYNAMIC_DEPS }),
                category: "element" as const,
                loc,
              },
            ],
          }),
          createElement({
            tag: "button",
            refs: [
              {
                ref: createExpr({ expr: mockExpr("buttonRef"), deps: DYNAMIC_DEPS }),
                category: "element" as const,
                loc,
              },
            ],
          }),
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
          {
            name: "buttonRef",
            symbolId: "t::ref::buttonRef@0" as SymbolId,
            category: "element",
            elementType: "HTMLButtonElement",
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      expect(code).not.toMatch(/viewChild.*viewChild.*viewChild/);
      expect(code).toContain("viewChild<ElementRef>('inputRef')");
      expect(code).toContain("viewChild<ElementRef>('buttonRef')");
    });
  });

  describe("multiple resources", () => {
    it("does not duplicate resource import", () => {
      const comp = makeComp("Data", createElement({ tag: "div" }), {
        resources: [
          {
            name: "users",
            fetcher: createExpr({ expr: mockExpr("() => fetchUsers()") }),
            symbolId: "t::signal::users@0" as SymbolId,
            loadingName: "loading",
            errorName: "error",
            refetchName: "refetch",
            loc,
          },
          {
            name: "posts",
            fetcher: createExpr({ expr: mockExpr("() => fetchPosts()") }),
            symbolId: "t::signal::posts@0" as SymbolId,
            loadingName: "loading",
            errorName: "error",
            refetchName: "refetch",
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      const importLine = code.split("\n").find((l) => l.includes("@angular/core"))!;
      const resourceCount = importLine.match(/resource/g);
      expect(resourceCount).toHaveLength(1);
    });
  });

  describe("resource handling", () => {
    it("emits resource with loader for resources", () => {
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
      expect(code).toContain("resource({");
      expect(code).toContain("loader:");
      expect(code).toContain("fetchData");
    });
  });
});
