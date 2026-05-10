import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vite-plus/test";

import { compile } from "../../compile.ts";
import type { IRModule } from "../../ir/module.ts";
import type { GenerateContext } from "../../plugin.ts";
import { reactTarget } from "./index.ts";

function fixture(name: string): string {
  return readFileSync(resolve(__dirname, "../../__fixtures__", name), "utf-8");
}

function generateReact(name: string): string {
  const source = fixture(name);
  const result = compile({ fileName: `/${name}`, source });
  expect(result.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
  const component = result.module.components[0]!;
  const ctx = makeCtx(result.module);
  const files = reactTarget.generate(component, ctx);
  return files[0]!.contents;
}

function makeCtx(module: IRModule): GenerateContext {
  return {
    options: {},
    module,
    emitDiagnostic: () => {},
  };
}

describe("React target", () => {
  test("Counter fixture", () => {
    const output = generateReact("Counter.ink.tsx");
    expect(output).toContain("'use client'");
    expect(output).toContain("import { useEffect, useMemo, useState } from 'react'");
    expect(output).toContain("const [count, setCount] = useState(0)");
    expect(output).toContain("useMemo(() => count * 2, [count])");
    expect(output).toContain("useEffect(");
    expect(output).toContain("{count}");
    expect(output).not.toContain("count()");
    expect(output).toMatchSnapshot();
  });

  test("Button fixture", () => {
    const output = generateReact("Button.ink.tsx");
    expect(output).toContain("{ label, tone }");
    expect(output).toContain("useState(false)");
    expect(output).toContain("className=");
    expect(output).not.toContain(" class=");
    expect(output).toMatchSnapshot();
  });

  test("Conditional fixture", () => {
    const output = generateReact("Conditional.ink.tsx");
    expect(output).toContain("isVisible ?");
    expect(output).toContain("count > 0 &&");
    expect(output).toMatchSnapshot();
  });

  test("ForLoop fixture", () => {
    const output = generateReact("ForLoop.ink.tsx");
    expect(output).toContain(".map(");
    expect(output).toMatchSnapshot();
  });

  test("List fixture", () => {
    const output = generateReact("List.ink.tsx");
    expect(output).toContain(".map(");
    expect(output).toMatchSnapshot();
  });

  test("Lifecycle fixture", () => {
    const output = generateReact("Lifecycle.ink.tsx");
    expect(output).toContain("useEffect(");
    expect(output).toContain(", []");
    expect(output).toContain("useMemo(");
    expect(output).toMatchSnapshot();
  });

  test("SwitchTabs fixture", () => {
    const output = generateReact("SwitchTabs.ink.tsx");
    expect(output).toContain("activeTab ===");
    expect(output).toMatchSnapshot();
  });

  test("Card fixture", () => {
    const output = generateReact("Card.ink.tsx");
    expect(output).toContain("{ children");
    expect(output).toMatchSnapshot();
  });

  test("FormField fixture", () => {
    const output = generateReact("FormField.ink.tsx");
    expect(output).toContain("useRef");
    expect(output).toContain("useState");
    expect(output).toMatchSnapshot();
  });

  test("signal reads are stripped in all positions", () => {
    const output = generateReact("Counter.ink.tsx");
    const matches = output.match(/count\(\)/g);
    expect(matches).toBeNull();
  });

  test("setter calls are preserved", () => {
    const output = generateReact("Counter.ink.tsx");
    expect(output).toContain("setCount(");
  });
});
