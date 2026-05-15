import { describe, it, expect } from "vitest";
import { resolveOptions } from "./options.ts";

describe("resolveOptions", () => {
  it("resolves with all defaults", () => {
    const opts = resolveOptions({ targets: ["react"] });

    expect(opts.targets).toEqual(["react"]);
    expect(opts.outDir).toBe("dist");
    expect(opts.sourceMap).toBe("external");
    expect(opts.targetOptions).toEqual({});
    expect(opts.plugins).toEqual([]);
    expect(opts.verbose).toBe(false);
  });

  it("accepts multiple targets", () => {
    const opts = resolveOptions({ targets: ["react", "vue", "solid"] });
    expect(opts.targets).toEqual(["react", "vue", "solid"]);
  });

  it("preserves custom outDir", () => {
    const opts = resolveOptions({ targets: ["react"], outDir: "build" });
    expect(opts.outDir).toBe("build");
  });

  it("preserves custom sourceMap mode", () => {
    const opts = resolveOptions({ targets: ["react"], sourceMap: "inline" });
    expect(opts.sourceMap).toBe("inline");
  });

  it("preserves sourceMap none", () => {
    const opts = resolveOptions({ targets: ["react"], sourceMap: "none" });
    expect(opts.sourceMap).toBe("none");
  });

  it("preserves verbose flag", () => {
    const opts = resolveOptions({ targets: ["react"], verbose: true });
    expect(opts.verbose).toBe(true);
  });

  it("preserves target options", () => {
    const opts = resolveOptions({
      targets: ["react"],
      targetOptions: { react: { strict: true } },
    });
    expect(opts.targetOptions).toEqual({ react: { strict: true } });
  });

  it("preserves plugins", () => {
    const plugin = { name: "test", hooks: {} };
    const opts = resolveOptions({ targets: ["react"], plugins: [plugin] });
    expect(opts.plugins).toEqual([plugin]);
  });

  it("throws on empty targets", () => {
    expect(() => resolveOptions({ targets: [] })).toThrow("At least one target is required");
  });

  it("throws on undefined config with no targets", () => {
    expect(() => resolveOptions(undefined)).toThrow("At least one target is required");
  });

  it("throws on unknown target", () => {
    expect(() => resolveOptions({ targets: ["unknown" as "react"] })).toThrow(
      'Unknown target: "unknown"',
    );
  });

  it("accepts all valid target names", () => {
    const allTargets = ["react", "solid", "vue", "svelte", "angular", "qwik", "astro"] as const;
    const opts = resolveOptions({ targets: allTargets });
    expect(opts.targets).toEqual(allTargets);
  });

  it("default registry has built-in targets", () => {
    const opts = resolveOptions({ targets: ["react"] });
    expect(opts.registry.get("react")).toBeDefined();
    expect(opts.registry.has("react")).toBe(true);
    expect(opts.registry.list().length).toBeGreaterThan(0);
  });

  it("defaults targetOutDir to empty object", () => {
    const opts = resolveOptions({ targets: ["react"] });
    expect(opts.targetOutDir).toEqual({});
  });

  it("preserves targetOutDir mapping", () => {
    const opts = resolveOptions({
      targets: ["react", "vue"],
      targetOutDir: {
        react: "../react/generated",
        vue: "../vue/generated",
      },
    });
    expect(opts.targetOutDir).toEqual({
      react: "../react/generated",
      vue: "../vue/generated",
    });
  });

  it("preserves partial targetOutDir", () => {
    const opts = resolveOptions({
      targets: ["react", "vue"],
      targetOutDir: { react: "./out/react" },
    });
    expect(opts.targetOutDir).toEqual({ react: "./out/react" });
  });
});
