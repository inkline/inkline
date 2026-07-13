// Vue unit-emit tests: hand-build IR, emit through the Vue target, assert the printed source.
// Real-world `.ink.tsx` → compile assertions live in ./__tests__/.

import { describe, it, expect } from "vitest";
import { createElement, createText } from "../../../ir/render/builders.ts";
import {
  counterRender,
  elementRef,
  emitCode,
  emitWithCtx,
  emitWithFile,
  makeCtxWithComponentImport,
  makeCtxWithExternalImport,
  propsLabelDisabled,
  richComp,
  runInvariants,
  scopedButtonStyle,
  transitionAppear,
  transitionWithIf,
} from "../../../testing/codegen.ts";
import { vue } from "./index.ts";

describe("vue conformance", () => {
  it("uses eslint with the vue plugin", () => {
    expect(vue.conformance).toBeDefined();
    const c = vue.conformance!;
    expect(c.lint.tool).toBe("eslint");
    expect(c.lint.config).toContain("vue.eslint.config.js");
    expect(c.typecheck.dtsImports).toContain("vue");
    expect(runInvariants(c, { path: "X.vue", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(1);
  });

  it("declares no control-flow imports", () => {
    expect(Object.keys(vue.conformance!.controlFlowImports)).toHaveLength(0);
  });
});

describe("vue emit + print", () => {
  it("Counter component", () => {
    const { fileName, code } = emitWithFile(vue, richComp("Counter", counterRender));
    expect(fileName).toBe("Counter.vue");
    expect(code).toMatchSnapshot();
  });

  it("defineProps with types", () => {
    const comp = richComp("Button", createElement({ tag: "div" }), { props: propsLabelDisabled() });
    expect(emitCode(vue, comp)).toMatchSnapshot();
  });

  it("ref() for element ref", () => {
    const comp = richComp("Form", createElement({ tag: "div" }), { refs: elementRef() });
    expect(emitCode(vue, comp)).toMatchSnapshot();
  });

  it("declares refs before the computed and watchEffect that read them (INK-12 TDZ)", () => {
    // richComp carries a `doubled` computed and a `watchEffect`; the ref declaration must sit above
    // them, or `watchEffect` (which runs synchronously at setup) would read `inputRef.value` before
    // its `const inputRef = ref(null)` declaration — a temporal-dead-zone error.
    const code = emitCode(
      vue,
      richComp("Form", createElement({ tag: "div" }), { refs: elementRef() }),
    );
    const refIdx = code.indexOf("const inputRef = ref");
    const computedIdx = code.indexOf("computed(");
    const effectIdx = code.indexOf("watchEffect(");
    expect(refIdx).toBeGreaterThanOrEqual(0);
    expect(computedIdx).toBeGreaterThanOrEqual(0);
    expect(effectIdx).toBeGreaterThanOrEqual(0);
    expect(refIdx).toBeLessThan(computedIdx);
    expect(refIdx).toBeLessThan(effectIdx);
  });

  it("emits a scoped style block", () => {
    const comp = richComp(
      "Styled",
      createElement({ tag: "button", children: [createText({ value: "click" })] }),
      { styles: scopedButtonStyle() },
    );
    const code = emitCode(vue, comp);
    expect(code).toContain("<style scoped>");
    expect(code).toContain("button { color: red; }");
  });

  it("external import appears inside <script setup>", () => {
    const code = emitWithCtx(
      vue,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithExternalImport(vue),
    );
    expect(code).toContain('import { badge } from "virtual:styleframe";');
    const scriptStart = code.indexOf("<script");
    const importIdx = code.indexOf("virtual:styleframe");
    const templateStart = code.indexOf("<template>");
    expect(importIdx).toBeGreaterThan(scriptStart);
    expect(importIdx).toBeLessThan(templateStart);
  });

  it("component import inside <script setup>", () => {
    const code = emitWithCtx(
      vue,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithComponentImport(vue),
    );
    const scriptStart = code.indexOf("<script");
    const importIdx = code.indexOf("IBadgeBase");
    const templateStart = code.indexOf("<template>");
    expect(importIdx).toBeGreaterThan(scriptStart);
    expect(importIdx).toBeLessThan(templateStart);
  });

  it("wraps a transition child in <Transition>", () => {
    const code = emitCode(
      vue,
      richComp("Fade", createElement({ tag: "div", children: [transitionWithIf] })),
    );
    expect(code).toContain("<Transition");
    expect(code).toContain('name="fade"');
    expect(code).toMatchSnapshot();
  });

  it("emits the appear prop on a transition", () => {
    const code = emitCode(
      vue,
      richComp("Slide", createElement({ tag: "div", children: [transitionAppear] })),
    );
    expect(code).toContain("appear");
    expect(code).toMatchSnapshot();
  });
});
