import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vite-plus/test";

import { compile } from "../../compile.ts";
import type { IRModule } from "../../ir/module.ts";
import type { GenerateContext } from "../../plugin.ts";
import { svelteTarget } from "./index.ts";

function fixture(name: string): string {
  return readFileSync(resolve(__dirname, "../../__fixtures__", name), "utf-8");
}

function generateSvelte(name: string): string {
  const source = fixture(name);
  const result = compile({ fileName: `/${name}`, source });
  expect(result.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
  const component = result.module.components[0]!;
  const ctx = makeCtx(result.module);
  const files = svelteTarget.generate(component, ctx);
  return files[0]!.contents;
}

function makeCtx(module: IRModule): GenerateContext {
  return { options: {}, module, emitDiagnostic: () => {} };
}

describe("Svelte target", () => {
  test("Counter fixture", () => {
    const output = generateSvelte("Counter.ink.tsx");
    expect(output).toContain("let count = $state(0)");
    expect(output).toContain("let doubled = $derived(count * 2)");
    expect(output).toContain("$effect(");
    expect(output).not.toContain("import { $state");
    expect(output).toMatchSnapshot();
  });

  test("Button fixture", () => {
    const output = generateSvelte("Button.ink.tsx");
    expect(output).toContain("$props()");
    expect(output).toContain("$state(false)");
    expect(output).toMatchSnapshot();
  });

  test("Conditional fixture", () => {
    const output = generateSvelte("Conditional.ink.tsx");
    expect(output).toContain("{#if");
    expect(output).toContain("{:else}");
    expect(output).toContain("{/if}");
    expect(output).toMatchSnapshot();
  });

  test("ForLoop fixture", () => {
    const output = generateSvelte("ForLoop.ink.tsx");
    expect(output).toContain("{#each");
    expect(output).toContain("{/each}");
    expect(output).toMatchSnapshot();
  });

  test("List fixture", () => {
    const output = generateSvelte("List.ink.tsx");
    expect(output).toContain("{#each");
    expect(output).toMatchSnapshot();
  });

  test("Lifecycle fixture", () => {
    const output = generateSvelte("Lifecycle.ink.tsx");
    expect(output).toContain("import { onDestroy, onMount } from 'svelte'");
    expect(output).toContain("onMount(");
    expect(output).toContain("onDestroy(");
    expect(output).toContain("$effect(");
    expect(output).toMatchSnapshot();
  });

  test("SwitchTabs fixture", () => {
    const output = generateSvelte("SwitchTabs.ink.tsx");
    expect(output).toContain("{#if");
    expect(output).toContain("{:else if");
    expect(output).toMatchSnapshot();
  });

  test("Card fixture", () => {
    const output = generateSvelte("Card.ink.tsx");
    expect(output).toContain("{@render children()}");
    expect(output).toContain("{@render header");
    expect(output).toMatchSnapshot();
  });

  test("FormField fixture", () => {
    const output = generateSvelte("FormField.ink.tsx");
    expect(output).toContain("bind:value=");
    expect(output).toContain("bind:this=");
    expect(output).toMatchSnapshot();
  });

  test("signal reads are stripped (no count())", () => {
    const output = generateSvelte("Counter.ink.tsx");
    expect(output).not.toMatch(/\bcount\(\)/);
  });

  test("setter calls are rewritten to assignments", () => {
    const output = generateSvelte("Counter.ink.tsx");
    expect(output).not.toContain("setCount(");
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
    const files = svelteTarget.generate(component, makeCtx(result.module));
    const output = files[0]!.contents;
    expect(output).toContain(`onclick={() => "a = b"}`);
    expect(output).not.toMatch(/onclick=\{\(\) => \{\s*"a = b"/);
  });

  test("arrow with nested arrow body keeps implicit return", () => {
    const source = `
      import { createSignal, defineComponent } from "@inkline/core";
      const Test = defineComponent(() => {
        const [items, setItems] = createSignal<number[]>([]);
        return (
          <button onClick={() => items().filter(x => x > 0).length}>Test</button>
        );
      });
    `;
    const result = compile({ fileName: "/Test.ink.tsx", source });
    expect(result.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
    const component = result.module.components[0]!;
    const files = svelteTarget.generate(component, makeCtx(result.module));
    const output = files[0]!.contents;
    expect(output).toContain("onclick={() => items.filter(x => x > 0).length}");
    expect(output).not.toMatch(/onclick=\{\(\) => \{\s*items\.filter/);
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
    const output = svelteTarget.generate(component, makeCtx(result.module))[0]!.contents;
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
    const output = svelteTarget.generate(component, makeCtx(result.module))[0]!.contents;
    expect(output).toContain("logUpdate(prev)");
    expect(output).toContain("count = (");
    expect(output).toContain(")(count)");
    expect(output).not.toContain("setCount(");
  });
});
