import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { DYNAMIC_DEPS, type SymbolId } from "../../../ir/reactivity.ts";
import type { IRComponent } from "../../../ir/render/nodes.ts";
import {
  createComponentInstance,
  createElement,
  createExpr,
  createIf,
  createText,
} from "../../../ir/render/builders.ts";
import {
  counterRender,
  emitCode as emitFor,
  emitWithCtx,
  emitWithFile,
  loc,
  makeComp,
  makeCtxWithExternalImport,
  mockExpr,
  propsLabelDisabled,
  richComp,
  runInvariants,
  transitionWithIf,
} from "../../../testing/codegen.ts";
import { angular } from "./index.ts";

function emitCode(comp: IRComponent): string {
  return emitFor(angular, comp);
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

    it("preserves camelCase for multi-word component @Output events", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Field") as ts.Identifier,
        resolved: { module: null, name: "Field" },
        events: [
          {
            name: "onValueChange",
            handler: createExpr({ expr: mockExpr("(v) => handle(v)") }),
            loc,
          },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("(valueChange)=");
      expect(code).not.toContain("valuechange");
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

    it("emits a non-self-closing tag when no slots", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Icon") as ts.Identifier,
        resolved: { module: null, name: "Icon" },
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      // Angular's JIT template parser mishandles self-closed component tags.
      expect(code).toContain("<Icon></Icon>");
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
      // Resources lower to signal state + an async loader, so no `resource` symbol is imported.
      const importLine = code.split("\n").find((l) => l.includes("@angular/core"))!;
      expect(importLine).not.toContain("resource");
      expect(code).toContain("users = signal(undefined)");
      expect(code).toContain("posts = signal(undefined)");
    });
  });

  describe("resource handling", () => {
    it("lowers a resource to signal state plus an async loader", () => {
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
      // data/loading/error become reactive signal fields.
      expect(code).toContain("data = signal(undefined)");
      expect(code).toContain("loading = signal(true)");
      expect(code).toContain("error = signal(undefined)");
      // The async loader runs the fetcher and writes results into those signals.
      // `fetchData` is the resource fetcher (an external function), not a class signal, so it is
      // called plainly — no `this.` prefix (which would wrongly read it as a component member).
      expect(code).toContain("(() => fetchData())().then((d) => this.data.set(d))");
      expect(code).toContain(".catch((e) => this.error.set(e))");
      expect(code).toContain(".finally(() => this.loading.set(false))");
      // No `resource` runtime symbol is imported anymore.
      expect(code).not.toContain("resource({");
    });
  });
});

describe("angular conformance", () => {
  it("uses eslint with the angular plugin", () => {
    expect(angular.conformance).toBeDefined();
    const c = angular.conformance!;
    expect(c.lint.tool).toBe("eslint");
    expect(c.lint.config).toContain("angular.eslint.config.js");
    expect(c.typecheck.dtsImports).toContain("@angular/core");
    expect(runInvariants(c, { path: "X.ts", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(1);
  });

  it("declares no control-flow imports", () => {
    expect(Object.keys(angular.conformance!.controlFlowImports)).toHaveLength(0);
  });
});

describe("angular emit + print", () => {
  it("Counter component", () => {
    const { fileName, code } = emitWithFile(angular, richComp("Counter", counterRender));
    expect(fileName).toBe("Counter.component.ts");
    expect(code).toMatchSnapshot();
  });

  it("output contains the @Component decorator", () => {
    expect(emitCode(richComp("Counter", counterRender))).toContain("@Component");
  });

  it("output imports from @angular/core", () => {
    expect(emitCode(richComp("Counter", counterRender))).toContain("@angular/core");
  });

  it("props type generation", () => {
    const comp = richComp("Button", createElement({ tag: "div" }), { props: propsLabelDisabled() });
    expect(emitCode(comp)).toMatchSnapshot();
  });

  it("control flow: If emits @if/@else if", () => {
    const ifNode = createIf({
      branches: [
        { test: createExpr({ expr: mockExpr("a()") }), body: createText({ value: "A" }) },
        { test: createExpr({ expr: mockExpr("b()") }), body: createText({ value: "B" }) },
      ],
      fallback: createText({ value: "fallback" }),
    });
    const code = emitCode(richComp("IfTest", createElement({ tag: "div", children: [ifNode] })));
    expect(code).toContain("@if");
    expect(code).toContain("@else if");
    expect(code).toContain("@else");
  });

  it("external import appears at the top of the file", () => {
    const code = emitWithCtx(
      angular,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithExternalImport(angular),
    );
    expect(code).toContain('import { badge } from "virtual:styleframe";');
    expect(code.indexOf('"@angular/core"')).toBeLessThan(code.indexOf("virtual:styleframe"));
  });

  it("transition passes through to the child", () => {
    const code = emitCode(
      richComp("Fade", createElement({ tag: "div", children: [transitionWithIf] })),
    );
    expect(code).not.toContain("Transition");
    expect(code).toContain("@if");
    expect(code).toMatchSnapshot();
  });
});
