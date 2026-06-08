import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { type SymbolId } from "../../../ir/reactivity.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import {
  createComponentInstance,
  createElement,
  createExpr,
  createSwitch,
  createText,
} from "../../../ir/render/builders.ts";
import {
  counterRender,
  emitCode as emitFor,
  emitWithCtx,
  emitWithFile,
  loc,
  makeComp,
  makeCtxWithComponentImport,
  makeCtxWithExternalImport,
  mockExpr,
  propsLabelDisabled,
  richComp,
  runInvariants,
  transitionWithIf,
} from "../../../testing/codegen.ts";
import { astro } from "./index.ts";

function emitCode(comp: IRComponent): string {
  return emitFor(astro, comp);
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
    it("lowers a resource to a server-rendered loader in frontmatter", () => {
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
      // Astro renders once on the server: data is a mutable `let`, awaited in a try/catch.
      expect(code).toContain("let error = undefined");
      expect(code).toContain("let posts");
      expect(code).toContain("try { posts = await (");
      expect(code).toContain("} catch (__e) { error = __e }");
      expect(code).toContain("fetchPosts");
      // loading is always resolved during server render.
      expect(code).toContain("const loading = false");
    });

    it("omits the catch binding and meta consts when only the data name is bound", () => {
      const comp = makeComp("Page", createElement({ tag: "div" }), {
        resources: [
          {
            name: "posts",
            fetcher: createExpr({ expr: mockExpr("() => fetchPosts()") }),
            symbolId: "t::signal::posts@0" as SymbolId,
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      expect(code).toContain("let posts");
      expect(code).toContain("try { posts = await (");
      expect(code).not.toContain("let error");
      expect(code).not.toContain("catch (__e)");
      expect(code).not.toContain("const loading");
    });
  });
});

describe("astro conformance", () => {
  it("uses eslint with the astro plugin", () => {
    expect(astro.conformance).toBeDefined();
    const c = astro.conformance!;
    expect(c.lint.tool).toBe("eslint");
    expect(c.lint.config).toContain("astro.eslint.config.js");
    expect(c.typecheck.dtsImports).toContain("astro");
    expect(runInvariants(c, { path: "X.astro", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(1);
  });

  it("declares no control-flow imports", () => {
    expect(Object.keys(astro.conformance!.controlFlowImports)).toHaveLength(0);
  });
});

describe("astro emit + print", () => {
  it("Counter component", () => {
    const { fileName, code } = emitWithFile(astro, richComp("Counter", counterRender));
    expect(fileName).toBe("Counter.astro");
    expect(code).toMatchSnapshot();
  });

  it("output contains --- frontmatter delimiters", () => {
    expect(emitCode(richComp("Counter", counterRender))).toContain("---");
  });

  it("props use Astro.props", () => {
    const comp = richComp("Button", createElement({ tag: "div" }), { props: propsLabelDisabled() });
    const code = emitCode(comp);
    expect(code).toContain("Astro.props");
    expect(code).toMatchSnapshot();
  });

  it("resolves a component instance to its reference name, not 'unknown'", () => {
    const comp = richComp(
      "Wrapper",
      createElement({
        tag: "div",
        children: [createComponentInstance({ reference: mockExpr("Child") as ts.Identifier })],
      }),
    );
    const code = emitCode(comp);
    expect(code).toContain("<Child");
    expect(code).not.toContain("unknown");
  });

  it("binds `props` so whole-object references resolve", () => {
    const comp = richComp("Button", createElement({ tag: "div" }), {
      props: [{ name: "label", required: true, symbolId: "t::prop::label@0" as SymbolId, loc }],
    });
    const code = emitCode(comp);
    expect(code).toContain("const props = Astro.props as Props;");
    expect(code).toContain("const { label } = props;");
  });

  it("external import appears inside the frontmatter", () => {
    const code = emitWithCtx(
      astro,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithExternalImport(astro),
    );
    expect(code).toContain('import { badge } from "virtual:styleframe";');
    const fences = [...code.matchAll(/---/g)];
    const importIdx = code.indexOf("virtual:styleframe");
    expect(importIdx).toBeGreaterThan(fences[0]!.index!);
    expect(importIdx).toBeLessThan(fences[1]!.index!);
  });

  it("component import appears inside the frontmatter", () => {
    const code = emitWithCtx(
      astro,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithComponentImport(astro),
    );
    const fences = [...code.matchAll(/---/g)];
    const importIdx = code.indexOf("IBadgeBase");
    expect(importIdx).toBeGreaterThan(fences[0]!.index!);
    expect(importIdx).toBeLessThan(fences[1]!.index!);
  });

  it("transition passes through to the child", () => {
    const code = emitCode(
      richComp("Fade", createElement({ tag: "div", children: [transitionWithIf] })),
    );
    expect(code).not.toContain("Transition");
    expect(code).toMatchSnapshot();
  });
});
