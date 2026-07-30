import { describe, it, expect } from "vitest";
import { isInklineConfigError, meetsLevel } from "@inkline/compiler";
import {
  buildCompileOptions,
  resolveOutDir,
  resolveReportLevel,
  resolveTargets,
} from "./compile-options.ts";

const OVERRIDES = {
  targets: ["react"] as const,
  outDir: "out",
  sourceMap: "external" as const,
  verbose: false,
};

describe("buildCompileOptions", () => {
  it("forwards every compiler-consumed config field", () => {
    const options = buildCompileOptions({}, OVERRIDES);

    // `barrels` and `reportLevel` are CLI-only and deliberately absent — the compiler pipeline
    // ignores both, and `reportLevel` governs printing, which happens after `compile` returns. Any
    // other InklineConfig field missing here is a silent divergence between `check` and `compile`, so
    // the key set is asserted, not just values.
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

describe("resolveReportLevel", () => {
  it("prefers the flag, then the config, then the caller's default", () => {
    expect(resolveReportLevel("error", { reportLevel: "warning" }, "info")).toBe("error");
    expect(resolveReportLevel(undefined, { reportLevel: "warning" }, "info")).toBe("warning");
    expect(resolveReportLevel(undefined, {}, "info")).toBe("info");
  });

  it("returns the caller's per-mode default untouched, so today's behaviour is unchanged", () => {
    // `compile` passes `info` for a one-shot build and `warning` under `--watch`. Neither is a
    // constant in here, so neither can be changed by accident from this side.
    expect(resolveReportLevel(undefined, {}, "warning")).toBe("warning");
  });

  it("reports an unknown flag value as INK0087 rather than throwing raw", () => {
    try {
      resolveReportLevel("verbose", {}, "info");
      expect.unreachable("an unknown level must not resolve");
    } catch (err) {
      // `reportConfigError` only formats an InklineConfigError; anything else reaches the user as a
      // stack trace through compiler internals.
      expect(isInklineConfigError(err)).toBe(true);
      if (!isInklineConfigError(err)) return;
      expect(err.diagnostic.code).toBe("INK0087");
      expect(err.diagnostic.title).toContain("verbose");
      expect(err.diagnostic.help).toContain("info");
    }
  });

  it("rejects an unknown config value too, instead of passing it to the filter", () => {
    // The zod schema reports a bad `reportLevel` as INK0083 and passes the value through unchanged,
    // so this is the only thing standing between it and `meetsLevel`.
    expect(() => resolveReportLevel(undefined, { reportLevel: "loud" as never }, "info")).toThrow();
  });

  it("never returns a level meetsLevel cannot rank", () => {
    // The failure this guards: an unranked level makes every comparison false and suppresses the
    // whole build's output silently.
    for (const level of ["error", "warning", "info"] as const) {
      expect(meetsLevel("error", resolveReportLevel(level, {}, "info"))).toBe(true);
    }
  });
});
