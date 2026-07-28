import { describe, it, expect } from "vitest";
import { buildCompileOptions, resolveOutDir, resolveTargets } from "./compile-options.ts";

const OVERRIDES = {
  targets: ["react"] as const,
  outDir: "out",
  sourceMap: "external" as const,
  verbose: false,
};

describe("buildCompileOptions", () => {
  it("forwards every compiler-consumed config field", () => {
    const options = buildCompileOptions({}, OVERRIDES);

    // `barrels` is CLI-only and deliberately absent. Any other InklineConfig field missing here is a
    // silent divergence between `check` and `compile`, so the key set is asserted, not just values.
    expect(Object.keys(options).sort()).toEqual([
      "outDir",
      "plugins",
      "registry",
      "sourceMap",
      "srcDir",
      "targetOptions",
      "targetOutDir",
      "targets",
      "tsconfig",
      "verbose",
    ]);
  });

  it("takes flag-resolved values from the overrides and the rest from the config", () => {
    const registry = { has: () => true } as never;
    const options = buildCompileOptions(
      {
        srcDir: "from-config",
        outDir: "from-config",
        targetOutDir: { react: "out/react" },
        sourceMap: "inline",
        targetOptions: { react: { forwardRef: true } },
        plugins: [],
        verbose: true,
        registry,
        tsconfig: "types.tsconfig.json",
      },
      { ...OVERRIDES, srcDir: "from-flag" },
    );

    expect(options).toMatchObject({
      targets: ["react"],
      srcDir: "from-flag",
      outDir: "out",
      sourceMap: "external",
      verbose: false,
      targetOutDir: { react: "out/react" },
      targetOptions: { react: { forwardRef: true } },
      tsconfig: "types.tsconfig.json",
      registry,
    });
  });

  it("falls back to the config srcDir when no flag is given", () => {
    expect(buildCompileOptions({ srcDir: "from-config" }, OVERRIDES).srcDir).toBe("from-config");
  });
});

describe("resolveTargets", () => {
  it("prefers the flag, splits on commas and trims", () => {
    expect(resolveTargets(" react , vue ", { targets: ["svelte"] })).toEqual(["react", "vue"]);
  });

  it("falls back to the config targets", () => {
    expect(resolveTargets(undefined, { targets: ["svelte"] })).toEqual(["svelte"]);
  });

  it("returns an empty list when neither is set, so resolveOptions can report INK0084", () => {
    expect(resolveTargets(undefined, {})).toEqual([]);
  });
});

describe("resolveOutDir", () => {
  it("prefers the flag, then the config, then dist", () => {
    expect(resolveOutDir("flag", { outDir: "config" })).toBe("flag");
    expect(resolveOutDir(undefined, { outDir: "config" })).toBe("config");
    expect(resolveOutDir(undefined, {})).toBe("dist");
  });
});
