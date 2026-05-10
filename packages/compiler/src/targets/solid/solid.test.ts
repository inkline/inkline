import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vite-plus/test";

import { compile } from "../../compile.ts";
import type { IRModule } from "../../ir/module.ts";
import type { GenerateContext } from "../../plugin.ts";
import { solidTarget } from "./index.ts";

function fixture(name: string): string {
  return readFileSync(resolve(__dirname, "../../__fixtures__", name), "utf-8");
}

function generateSolid(name: string): string {
  const source = fixture(name);
  const result = compile({ fileName: `/${name}`, source });
  expect(result.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
  const component = result.module.components[0]!;
  const ctx = makeCtx(result.module);
  const files = solidTarget.generate(component, ctx);
  return files[0]!.contents;
}

function makeCtx(module: IRModule): GenerateContext {
  return {
    options: {},
    module,
    emitDiagnostic: () => {},
  };
}

describe("Solid target", () => {
  test("Counter fixture", () => {
    const output = generateSolid("Counter.ink.tsx");
    expect(output).toContain("import { createEffect, createMemo, createSignal } from 'solid-js'");
    expect(output).toContain("const [count, setCount] = createSignal(0)");
    expect(output).toContain("createMemo(() => count() * 2)");
    expect(output).toContain("createEffect(");
    expect(output).toContain("{count()}");
    expect(output).toMatchSnapshot();
  });

  test("Button fixture", () => {
    const output = generateSolid("Button.ink.tsx");
    expect(output).toContain("(props)");
    expect(output).toContain(" class=");
    expect(output).not.toContain("className");
    expect(output).toMatchSnapshot();
  });

  test("Conditional fixture", () => {
    const output = generateSolid("Conditional.ink.tsx");
    expect(output).toContain("<Show when=");
    expect(output).toMatchSnapshot();
  });

  test("ForLoop fixture", () => {
    const output = generateSolid("ForLoop.ink.tsx");
    expect(output).toContain("<For each=");
    expect(output).toMatchSnapshot();
  });

  test("List fixture", () => {
    const output = generateSolid("List.ink.tsx");
    expect(output).toContain("<For each=");
    expect(output).toMatchSnapshot();
  });

  test("Lifecycle fixture", () => {
    const output = generateSolid("Lifecycle.ink.tsx");
    expect(output).toContain("onMount(");
    expect(output).toContain("onCleanup(");
    expect(output).toContain("createEffect(");
    expect(output).toMatchSnapshot();
  });

  test("SwitchTabs fixture", () => {
    const output = generateSolid("SwitchTabs.ink.tsx");
    expect(output).toContain("<Switch");
    expect(output).toContain("<Match when=");
    expect(output).toMatchSnapshot();
  });

  test("Card fixture", () => {
    const output = generateSolid("Card.ink.tsx");
    expect(output).toContain("props.children");
    expect(output).toMatchSnapshot();
  });

  test("FormField fixture", () => {
    const output = generateSolid("FormField.ink.tsx");
    expect(output).toContain("createSignal");
    expect(output).toMatchSnapshot();
  });

  test("signal reads are preserved as count()", () => {
    const output = generateSolid("Counter.ink.tsx");
    expect(output).toContain("count()");
  });
});
