// Vue codegen assertions for the "composition" feature area: components that instantiate other
// components (same-file children, multiple components per file, cross-file imports), exercising the
// full pipeline (parse → lower → analyze → codegen).

import { describe, it, expect } from "vitest";
import { compileTo, compileToAll } from "../../../../testing/codegen.ts";

describe("ComponentRef: same-file child instance + forwarded ref", () => {
  it("Vue: <Child> tag is emitted in the template", async () => {
    const out = await compileToAll("ComponentRef", "vue");
    expect(out).toContain('<Child ref="childRef" />');
    // BUG: the second component's <script setup> never imports `Child`, so the template references
    // an undefined component at runtime. The same-file child emits as a separate file but is not
    // wired into the parent's module.
    expect(out).not.toContain("import Child");
  });
});

describe("Composite: signal setters dropped from non-React event handlers", () => {
  it("Vue: setter is rewritten to a direct assignment in the template handler", async () => {
    const out = await compileTo("Composite", "vue");
    expect(out).toContain("const x = ref(1)");
    // The setter call `setX(x + 1)` is rewritten to `x = x + 1` in the Vue template (Vue's
    // compiler adds `.value`), so no undefined `setX` reference remains.
    expect(out).toContain('@click="() => x = x + 1"');
    expect(out).not.toContain("setX");
  });
});

describe("CrossFileBase / CrossFileStyled: cross-file component composition", () => {
  it("Vue: cross-file import is rewritten to .vue and bound with :class / :label", async () => {
    const out = await compileTo("CrossFileStyled", "vue");
    expect(out).toContain(
      'import CrossFileBase, { type CrossFileBaseProps } from "./CrossFileBase.vue";',
    );
    expect(out).toContain('<CrossFileBase :class="size" :label="label">');
  });

  it("Base component default slot falls back to the label prop (Vue)", async () => {
    const vue = await compileTo("CrossFileBase", "vue");
    expect(vue).toContain("<slot>");
  });
});
