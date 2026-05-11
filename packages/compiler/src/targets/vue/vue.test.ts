import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vite-plus/test";

import { compile } from "../../compile.ts";
import type { IRModule } from "../../ir/module.ts";
import type { GenerateContext } from "../../plugin.ts";
import { vueTarget } from "./index.ts";

function fixture(name: string): string {
  return readFileSync(resolve(__dirname, "../../__fixtures__", name), "utf-8");
}

function generateVue(name: string): string {
  const source = fixture(name);
  const result = compile({ fileName: `/${name}`, source });
  expect(result.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
  const component = result.module.components[0]!;
  const ctx = makeCtx(result.module);
  const files = vueTarget.generate(component, ctx);
  return files[0]!.contents;
}

function makeCtx(module: IRModule): GenerateContext {
  return { options: {}, module, emitDiagnostic: () => {} };
}

describe("Vue target", () => {
  test("Counter fixture", () => {
    const output = generateVue("Counter.ink.tsx");
    expect(output).toContain('<script setup lang="ts">');
    expect(output).toContain("<template>");
    expect(output).toContain("import { computed, ref, watchEffect } from 'vue'");
    expect(output).toContain("const count = ref(0)");
    expect(output).toContain("computed(() => count.value * 2)");
    expect(output).toContain("watchEffect(");
    expect(output).toMatchSnapshot();
  });

  test("Button fixture", () => {
    const output = generateVue("Button.ink.tsx");
    expect(output).toContain("defineProps");
    expect(output).toContain("ref(false)");
    expect(output).toMatchSnapshot();
  });

  test("Conditional fixture", () => {
    const output = generateVue("Conditional.ink.tsx");
    expect(output).toContain("v-if=");
    expect(output).toContain("v-else");
    expect(output).toMatchSnapshot();
  });

  test("ForLoop fixture", () => {
    const output = generateVue("ForLoop.ink.tsx");
    expect(output).toContain("v-for=");
    expect(output).toContain(":key=");
    expect(output).toMatchSnapshot();
  });

  test("List fixture", () => {
    const output = generateVue("List.ink.tsx");
    expect(output).toContain("v-for=");
    expect(output).toMatchSnapshot();
  });

  test("Lifecycle fixture", () => {
    const output = generateVue("Lifecycle.ink.tsx");
    expect(output).toContain("onMounted(");
    expect(output).toContain("onUnmounted(");
    expect(output).toContain("watchEffect(");
    expect(output).toContain("computed(");
    expect(output).toMatchSnapshot();
  });

  test("SwitchTabs fixture", () => {
    const output = generateVue("SwitchTabs.ink.tsx");
    expect(output).toContain("v-if=");
    expect(output).toContain("v-else-if=");
    expect(output).toMatchSnapshot();
  });

  test("Card fixture", () => {
    const output = generateVue("Card.ink.tsx");
    expect(output).toContain("<slot");
    expect(output).toMatchSnapshot();
  });

  test("FormField fixture", () => {
    const output = generateVue("FormField.ink.tsx");
    expect(output).toContain("v-model=");
    expect(output).toContain("useTemplateRef");
    expect(output).toMatchSnapshot();
  });

  test("template expressions do not contain .value", () => {
    const output = generateVue("Counter.ink.tsx");
    const templateSection = output.split("<template>")[1]!.split("</template>")[0]!;
    expect(templateSection).not.toContain(".value");
  });

  test("setup expressions contain .value for reactive reads", () => {
    const output = generateVue("Counter.ink.tsx");
    const scriptSection = output.split('<script setup lang="ts">')[1]!.split("</script>")[0]!;
    expect(scriptSection).toContain(".value");
  });

  test("arrow returning a string containing '=' stays an expression body", () => {
    const source = `
      import { defineComponent } from "@inkline/core";
      const Test = defineComponent(() => {
        return (
          <button onClick={() => "a = b"}>Test</button>
        );
      });
    `;
    const result = compile({ fileName: "/Test.ink.tsx", source });
    expect(result.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
    const component = result.module.components[0]!;
    const files = vueTarget.generate(component, makeCtx(result.module));
    const output = files[0]!.contents;
    expect(output).toContain(`@click='() => "a = b"'`);
    expect(output).not.toMatch(/@click=['"`].*\(\) => \{\s*"a = b"/);
  });

  test("functional updater with single return inlines to assignment", () => {
    const source = `
      import { createSignal, defineComponent } from "@inkline/core";
      const Test = defineComponent(() => {
        const [count, setCount] = createSignal(0);
        return (
          <button onClick={() => setCount(prev => prev + 1)}>{count()}</button>
        );
      });
    `;
    const result = compile({ fileName: "/Test.ink.tsx", source });
    expect(result.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
    const component = result.module.components[0]!;
    const output = vueTarget.generate(component, makeCtx(result.module))[0]!.contents;
    expect(output).toContain("count = count + 1");
    expect(output).not.toContain("setCount(");
  });

  test("functional updater with multi-statement block preserves all statements", () => {
    const source = `
      import { createSignal, defineComponent } from "@inkline/core";
      declare const logUpdate: (n: number) => void;
      const Test = defineComponent(() => {
        const [count, setCount] = createSignal(0);
        return (
          <button onClick={() => setCount(prev => { logUpdate(prev); return prev + 1; })}>
            {count()}
          </button>
        );
      });
    `;
    const result = compile({ fileName: "/Test.ink.tsx", source });
    expect(result.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
    const component = result.module.components[0]!;
    const output = vueTarget.generate(component, makeCtx(result.module))[0]!.contents;
    expect(output).toContain("logUpdate(prev)");
    expect(output).toContain(")(count)");
    expect(output).not.toContain("setCount(");
  });
});
