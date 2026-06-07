// Svelte unit-emit tests: hand-build IR, emit through the Svelte target, assert the printed source.
// Real-world `.ink.tsx` → compile assertions live in ./__tests__/.

import { describe, it, expect } from "vitest";
import { createElement, createExpr, createText } from "../../../ir/render/builders.ts";
import { DYNAMIC_DEPS, type SymbolId } from "../../../ir/reactivity.ts";
import {
  counterRender,
  emitCode,
  emitWithCtx,
  emitWithFile,
  loc,
  makeCtxWithComponentImport,
  makeCtxWithExternalImport,
  mockExpr,
  propsLabelDisabled,
  richComp,
  runInvariants,
  scopedButtonStyle,
  transitionWithIf,
} from "../../../testing/codegen.ts";
import { svelte } from "./index.ts";

describe("svelte conformance", () => {
  it("uses eslint with the svelte plugin", () => {
    expect(svelte.conformance).toBeDefined();
    const c = svelte.conformance!;
    expect(c.lint.tool).toBe("eslint");
    expect(c.lint.config).toContain("svelte.eslint.config.js");
    expect(c.typecheck.dtsImports).toContain("svelte");
    expect(runInvariants(c, { path: "X.svelte", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(1);
  });

  it("declares no control-flow imports", () => {
    expect(Object.keys(svelte.conformance!.controlFlowImports)).toHaveLength(0);
  });
});

describe("svelte emit + print", () => {
  it("Counter component", () => {
    const { fileName, code } = emitWithFile(svelte, richComp("Counter", counterRender));
    expect(fileName).toBe("Counter.svelte");
    expect(code).toMatchSnapshot();
  });

  it("$props destructuring", () => {
    const comp = richComp("Button", createElement({ tag: "div" }), { props: propsLabelDisabled() });
    expect(emitCode(svelte, comp)).toMatchSnapshot();
  });

  it("emits a scoped style block", () => {
    const comp = richComp(
      "Styled",
      createElement({ tag: "button", children: [createText({ value: "click" })] }),
      { styles: scopedButtonStyle() },
    );
    const code = emitCode(svelte, comp);
    expect(code).toContain("<style scoped>");
    expect(code).toContain("button { color: red; }");
  });

  it("external import appears inside <script>", () => {
    const code = emitWithCtx(
      svelte,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithExternalImport(svelte),
    );
    expect(code).toContain('import { badge } from "virtual:styleframe";');
    expect(code.indexOf("virtual:styleframe")).toBeGreaterThan(code.indexOf("<script"));
  });

  it("component import inside <script>", () => {
    const code = emitWithCtx(
      svelte,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithComponentImport(svelte),
    );
    expect(code.indexOf("IBadgeBase")).toBeGreaterThan(code.indexOf("<script"));
  });

  it("onCleanup emits an $effect with a cleanup return", () => {
    const comp = richComp("Cleanup", createElement({ tag: "div" }), {
      lifecycle: {
        onMount: [],
        onCleanup: [
          {
            body: mockExpr("() => unsubscribe()"),
            deps: DYNAMIC_DEPS,
            cleanup: "present",
            isDynamic: false,
            loc,
          },
        ],
      },
    });
    const code = emitCode(svelte, comp);
    expect(code).toContain("$effect");
    expect(code).toContain("return");
    expect(code).toContain("unsubscribe");
  });

  it("rewrites a bare `props` reference to the reconstructed destructured bindings", () => {
    const comp = richComp(
      "Styled",
      createElement({
        tag: "div",
        acceptsAttrFallthrough: true,
        children: [createExpr({ expr: mockExpr("badge(props)") })],
      }),
      {
        props: [{ name: "label", required: false, symbolId: "t::prop::label@0" as SymbolId, loc }],
      },
    );
    const code = emitCode(svelte, comp);
    expect(code).toContain("badge({ label, ...__attrs })");
    expect(code).not.toMatch(/badge\(props\)/);
  });

  it("pushes the transition directive into the child element", () => {
    const code = emitCode(
      svelte,
      richComp("Fade", createElement({ tag: "div", children: [transitionWithIf] })),
    );
    expect(code).toContain("in:__inkTransitionIn");
    expect(code).toContain("out:__inkTransitionOut");
    expect(code).toContain("{#if");
    expect(code).toMatchSnapshot();
  });
});
