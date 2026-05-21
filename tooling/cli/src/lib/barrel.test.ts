import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { generateBarrel, resolveTargetDir, type BarrelEntry } from "./barrel.ts";

describe("resolveTargetDir", () => {
  it("uses targetOutDir when set for the target", () => {
    expect(resolveTargetDir("react", "dist", { react: "/custom/react" })).toBe("/custom/react");
  });

  it("falls back to outDir/target", () => {
    const result = resolveTargetDir("react", "dist", {});
    expect(result).toBe(resolve("dist/react"));
  });
});

describe("generateBarrel", () => {
  it("generates named exports for react", () => {
    const entries: BarrelEntry[] = [
      { componentName: "Button", fileName: "Button.tsx", target: "react" },
    ];
    expect(generateBarrel(entries)).toBe("export { Button } from './Button.tsx';\n");
  });

  it("generates default exports for vue, svelte, solid, astro", () => {
    for (const target of ["vue", "svelte", "solid", "astro"] as const) {
      const entries: BarrelEntry[] = [{ componentName: "Button", fileName: "Button.vue", target }];
      expect(generateBarrel(entries)).toContain("export { default as Button }");
    }
  });

  it("generates Component suffix exports for angular", () => {
    const entries: BarrelEntry[] = [
      { componentName: "Button", fileName: "Button.ts", target: "angular" },
    ];
    expect(generateBarrel(entries)).toBe(
      "export { ButtonComponent as Button } from './Button.ts';\n",
    );
  });

  it("sorts entries alphabetically by component name", () => {
    const entries: BarrelEntry[] = [
      { componentName: "Zebra", fileName: "Zebra.tsx", target: "react" },
      { componentName: "Alpha", fileName: "Alpha.tsx", target: "react" },
    ];
    const lines = generateBarrel(entries).trim().split("\n");
    expect(lines[0]).toContain("Alpha");
    expect(lines[1]).toContain("Zebra");
  });
});
