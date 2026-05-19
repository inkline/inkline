import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { SymbolTable, type SymbolId } from "../../../ir/reactivity.ts";
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
import { astro } from "./index.ts";

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
    options: resolveOptions({ targets: ["astro"] }),
    symbols: new SymbolTable(),
    rewrites: astro.rewrites,
  };
}

function emitCode(comp: IRComponent): string {
  return print(astro.emit(comp, makeCtx()).root).code;
}

describe("Astro codegen fixes", () => {
  describe("Element events", () => {
    it("emits event handlers on elements", () => {
      const render = createElement({
        tag: "button",
        events: [
          {
            name: "onClick",
            handler: createExpr({ expr: mockExpr("() => handleClick()") }),
            loc,
          },
        ],
        children: [createText({ value: "Click" })],
      });
      const comp = makeComp("Btn", render);
      const code = emitCode(comp);
      expect(code).toContain("onClick=");
      expect(code).toContain("handleClick");
    });

    it("emits attrs and events together", () => {
      const render = createElement({
        tag: "input",
        attrs: [
          { name: "type", value: { kind: "Static", value: "text", loc }, binding: "normal", loc },
        ],
        events: [
          {
            name: "onInput",
            handler: createExpr({ expr: mockExpr("(e) => update(e)") }),
            loc,
          },
        ],
      });
      const comp = makeComp("Input", render);
      const code = emitCode(comp);
      expect(code).toContain('type="text"');
      expect(code).toContain("onInput=");
    });
  });

  describe("ComponentInstance attrs and slots", () => {
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

    it("renders default slot content", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Card") as ts.Identifier,
        resolved: { module: null, name: "Card" },
        slots: [
          {
            name: "default",
            body: createText({ value: "body content" }),
            scopedParams: [],
            loc,
          },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("<Card>");
      expect(code).toContain("body content");
      expect(code).toContain("</Card>");
    });

    it("renders named slots with Fragment", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Layout") as ts.Identifier,
        resolved: { module: null, name: "Layout" },
        slots: [
          {
            name: "header",
            body: createText({ value: "nav bar" }),
            scopedParams: [],
            loc,
          },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain('slot="header"');
      expect(code).toContain("nav bar");
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

  describe("For loop indexBinding", () => {
    it("includes both item and index params", () => {
      const forNode: IRNode = {
        kind: "For",
        each: createExpr({ expr: mockExpr("items") }),
        itemBinding: "item",
        indexBinding: "i",
        key: createExpr({ expr: mockExpr("item") }),
        syntheticKey: true,
        body: createText({ value: "row" }),
        loc,
      };
      const comp = makeComp("List", createElement({ tag: "ul", children: [forNode] }));
      const code = emitCode(comp);
      expect(code).toContain("(item, i)");
    });

    it("uses only item param when no indexBinding", () => {
      const forNode: IRNode = {
        kind: "For",
        each: createExpr({ expr: mockExpr("items") }),
        itemBinding: "item",
        key: createExpr({ expr: mockExpr("item") }),
        syntheticKey: true,
        body: createText({ value: "row" }),
        loc,
      };
      const comp = makeComp("List", createElement({ tag: "ul", children: [forNode] }));
      const code = emitCode(comp);
      expect(code).toContain("(item)");
      expect(code).not.toContain(", i)");
    });
  });

  describe("Switch fallback", () => {
    it("renders fallback node instead of null", () => {
      const switchNode = createSwitch({
        cases: [{ test: createExpr({ expr: mockExpr("x") }), body: createText({ value: "X" }) }],
        fallback: createText({ value: "default case" }),
      });
      const comp = makeComp("Sw", createElement({ tag: "div", children: [switchNode] }));
      const code = emitCode(comp);
      expect(code).toContain("default case");
    });

    it("renders null when no fallback", () => {
      const switchNode = createSwitch({
        cases: [{ test: createExpr({ expr: mockExpr("x") }), body: createText({ value: "X" }) }],
      });
      const comp = makeComp("Sw", createElement({ tag: "div", children: [switchNode] }));
      const code = emitCode(comp);
      expect(code).toContain(": null");
    });
  });

  describe("style handling", () => {
    it("emits scoped style block when styles are present", () => {
      const comp = makeComp("Button", createElement({ tag: "button" }), {
        styles: [{ css: "button { color: red; }", scoped: true, lang: "css" as const, loc }],
      });
      const code = emitCode(comp);
      expect(code).toContain("<style scoped>");
      expect(code).toContain("button { color: red; }");
      expect(code).toContain("</style>");
    });

    it("omits style block when no styles", () => {
      const comp = makeComp("Button", createElement({ tag: "button" }));
      const code = emitCode(comp);
      expect(code).not.toContain("<style");
    });
  });

  describe("resource handling", () => {
    it("emits top-level await in frontmatter", () => {
      const comp = makeComp("Page", createElement({ tag: "div" }), {
        resources: [
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
      expect(code).toContain("const posts = await");
      expect(code).toContain("fetchPosts");
    });
  });
});
