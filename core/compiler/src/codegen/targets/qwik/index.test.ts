import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { DYNAMIC_DEPS, type SymbolId } from "../../../ir/reactivity.ts";
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
  makeCtxWithExternalImport,
  mockExpr,
  propsLabelDisabled,
  richComp,
  runInvariants,
  transitionWithIf,
} from "../../../testing/codegen.ts";
import { qwik } from "./index.ts";

function emitCode(comp: IRComponent): string {
  return emitFor(qwik, comp);
}

describe("Qwik codegen fixes", () => {
  describe("refs", () => {
    it("emits ref attribute and declaration", () => {
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
      expect(code).toContain("ref={inputRef");
      expect(code).toContain("const inputRef = useSignal<HTMLInputElement | null>(null)");
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

  describe("For loop", () => {
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

    it("renders element body inside For loop", () => {
      const forNode: IRNode = {
        kind: "For",
        each: createExpr({ expr: mockExpr("items()") }),
        itemBinding: "item",
        key: createExpr({ expr: mockExpr("item") }),
        syntheticKey: true,
        body: createElement({ tag: "li", children: [createText({ value: "row" })] }),
        loc,
      };
      const comp = makeComp("List", createElement({ tag: "ul", children: [forNode] }));
      const code = emitCode(comp);
      expect(code).toContain("<li>");
      expect(code).toContain("row");
      expect(code).toContain("</li>");
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

  describe("multiple resources", () => {
    it("does not duplicate useTask$ import", () => {
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
      const importLine = code.split("\n").find((l) => l.includes("@qwik.dev/core"))!;
      const resourceCount = importLine.match(/useTask\$/g);
      expect(resourceCount).toHaveLength(1);
    });
  });

  describe("style handling", () => {
    it("emits side-effect CSS import when styles are present", () => {
      const comp = makeComp("Button", createElement({ tag: "button" }), {
        styles: [{ css: "button { color: red; }", scoped: true, lang: "css" as const, loc }],
      });
      const code = emitCode(comp);
      expect(code).toContain('import "./Button.css";');
      expect(code).not.toContain("module.css");
    });

    it("omits CSS import when no styles", () => {
      const comp = makeComp("Button", createElement({ tag: "button" }));
      const code = emitCode(comp);
      expect(code).not.toContain(".css");
    });
  });

  describe("resource handling", () => {
    it("lowers resources to signals plus an async useTask$ loader", () => {
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
      expect(code).toContain("const data = useSignal(undefined)");
      expect(code).toContain("const loading = useSignal(true)");
      expect(code).toContain("const error = useSignal(undefined)");
      expect(code).toContain("useTask$(() =>");
      expect(code).toContain(".then((d) => data.value = d)");
      expect(code).toContain(".catch((e) => error.value = e)");
      expect(code).toContain(".finally(() => loading.value = false)");
      expect(code).not.toContain("useResource$");
    });
  });
});

describe("qwik conformance", () => {
  it("uses oxlint with the qwik jsPlugin", () => {
    expect(qwik.conformance).toBeDefined();
    const c = qwik.conformance!;
    expect(c.lint.tool).toBe("oxlint");
    expect(c.lint.config).toContain("qwik.oxlintrc.json");
    expect(c.typecheck.dtsImports).toContain("@qwik.dev/core");
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.ts", contents: "" })).toHaveLength(1);
  });

  it("declares no control-flow imports", () => {
    expect(Object.keys(qwik.conformance!.controlFlowImports)).toHaveLength(0);
  });
});

describe("qwik emit + print", () => {
  it("Counter component", () => {
    const { fileName, code } = emitWithFile(qwik, richComp("Counter", counterRender));
    expect(fileName).toBe("Counter.tsx");
    expect(code).toMatchSnapshot();
  });

  it("output contains component$", () => {
    expect(emitCode(richComp("Counter", counterRender))).toContain("component$");
  });

  it("output imports from @qwik.dev/core", () => {
    expect(emitCode(richComp("Counter", counterRender))).toContain("@qwik.dev/core");
  });

  it("output uses useSignal and useComputed$", () => {
    const code = emitCode(richComp("Counter", counterRender));
    expect(code).toContain("useSignal");
    expect(code).toContain("useComputed$");
  });

  it("props type generation", () => {
    const comp = richComp("Button", createElement({ tag: "div" }), { props: propsLabelDisabled() });
    expect(emitCode(comp)).toMatchSnapshot();
  });

  it("external import appears after framework imports", () => {
    const code = emitWithCtx(
      qwik,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithExternalImport(qwik),
    );
    expect(code).toContain('import { badge } from "virtual:styleframe";');
    expect(code.indexOf('"@qwik.dev/core"')).toBeLessThan(code.indexOf("virtual:styleframe"));
  });

  it("emits an __InkTransition wrapper + helper", () => {
    const code = emitCode(
      richComp("Fade", createElement({ tag: "div", children: [transitionWithIf] })),
    );
    expect(code).toContain("__InkTransition");
    expect(code).toContain("transitionend");
    expect(code).toMatchSnapshot();
  });
});
