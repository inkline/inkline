import { describe, it, expect } from "vitest";
import { inklineConfigSchema, validateConfig } from "./config-schema.ts";

describe("validateConfig — unknown keys", () => {
  it("reports nothing for a config using only known keys", () => {
    const config = Object.fromEntries(
      Object.keys(inklineConfigSchema.shape).map((k) => [k, undefined]),
    );
    expect(validateConfig(config)).toEqual([]);
  });

  it("reports nothing for an empty config", () => {
    expect(validateConfig({})).toEqual([]);
  });

  it("reports nothing for a fully populated valid config", () => {
    const diags = validateConfig({
      targets: ["react", "vue"],
      srcDir: "src",
      outDir: "dist",
      targetOutDir: { react: "dist/react" },
      sourceMap: "inline",
      targetOptions: { vue: { runtime: "esm" } },
      plugins: [{ name: "my-plugin", hooks: { onEmit: () => undefined } }],
      verbose: true,
      registry: { get: () => undefined, has: () => false, list: () => [] },
      barrels: [{ file: "headless.ts", match: "headless", mode: "named" }],
      reportLevel: "warning",
      tsconfig: "tsconfig.json",
    });

    expect(diags).toEqual([]);
  });

  it("suggests the nearest key for a typo (INK0082)", () => {
    const [diag, ...rest] = validateConfig({ targets: ["react"], sourceMaps: "inline" });

    expect(rest).toEqual([]);
    expect(diag?.code).toBe("INK0082");
    expect(diag?.severity).toBe("warning");
    expect(diag?.title).toBe("Unknown config key: sourceMaps. Did you mean sourceMap?");
  });

  it.each([
    ["targetsOutDir", "targetOutDir"],
    ["plugns", "plugins"],
    ["SourceMap", "sourceMap"],
  ])("suggests %s → %s", (typo, expected) => {
    const [diag] = validateConfig({ [typo]: true });
    expect(diag?.code).toBe("INK0082");
    expect(diag?.title).toContain(`Did you mean ${expected}?`);
  });

  it("reports an unrelated key without a suggestion (INK0081)", () => {
    const [diag, ...rest] = validateConfig({ webpackShimEnabled: true });

    expect(rest).toEqual([]);
    expect(diag?.code).toBe("INK0081");
    expect(diag?.severity).toBe("warning");
    expect(diag?.title).toBe("Unknown config key: webpackShimEnabled");
  });

  it("ignores c12 environment-override keys", () => {
    expect(validateConfig({ $development: { verbose: true } })).toEqual([]);
  });

  it("attributes the diagnostic to the config file when known", () => {
    const [diag] = validateConfig({ plugns: [] }, "/app/inkline.config.ts");
    expect(diag?.loc.file).toBe("/app/inkline.config.ts");
  });

  it("defaults the location to <unknown>", () => {
    const [diag] = validateConfig({ plugns: [] });
    expect(diag?.loc.file).toBe("<unknown>");
  });

  it("reports every unknown key", () => {
    const diags = validateConfig({ sourceMaps: "inline", webpackShimEnabled: true });
    expect(diags.map((d) => d.code).sort()).toEqual(["INK0081", "INK0082"]);
  });
});

describe("validateConfig — value types", () => {
  it("reports a wrong scalar type as INK0083 without throwing", () => {
    const [diag, ...rest] = validateConfig({ srcDir: 42 });

    expect(rest).toEqual([]);
    expect(diag?.code).toBe("INK0083");
    // A recognised key holding a wrong-typed value is an error: the commands consume every
    // recognised key, so there is nothing safe to do but stop. Unknown keys stay warnings.
    expect(diag?.severity).toBe("error");
    expect(diag?.title).toContain("Invalid config value at srcDir");
    expect(diag?.title).toContain("expected string");
  });

  it("reports an out-of-range enum value", () => {
    const [diag] = validateConfig({ sourceMap: "linline" });

    expect(diag?.code).toBe("INK0083");
    expect(diag?.title).toContain("Invalid config value at sourceMap");
  });

  // Non-fatal here by design, so `resolveReportLevel` reports the same value again as INK0087 and
  // refuses to build; this only says the config key is wrong, not that the build stopped.
  it("reports a reportLevel outside the accepted severities", () => {
    const [diag, ...rest] = validateConfig({ reportLevel: "verbose" });

    expect(rest).toEqual([]);
    expect(diag?.code).toBe("INK0083");
    expect(diag?.title).toContain("Invalid config value at reportLevel");
  });

  it("reports an unknown target name", () => {
    const [diag] = validateConfig({ targets: ["react", "reakt"] });

    expect(diag?.code).toBe("INK0083");
    expect(diag?.title).toContain("targets[1]");
  });

  it("reports a nested unknown key by path, as a non-fatal unknown key", () => {
    const [diag, ...rest] = validateConfig({ barrels: [{ file: "a.ts", match: "", extra: true }] });

    // Still an unknown key, just a nested one: reported by full path, no suggestion (only top-level
    // names can be matched against the schema), and non-fatal like every other unknown key.
    expect(rest).toEqual([]);
    expect(diag?.code).toBe("INK0081");
    expect(diag?.severity).toBe("warning");
    expect(diag?.title).toBe("Unknown config key: barrels[0].extra");
  });

  // Record-keyed fields report an unknown key under a different zod code (`invalid_key`, with the
  // key already on the path) than objects do (`unrecognized_keys`). Both are unknown keys and both
  // must stay non-fatal, or a leftover entry for a target you no longer build stops the run.
  it.each(["targetOutDir", "targetOptions"] as const)(
    "reports an unknown %s target as a non-fatal unknown key",
    (key) => {
      const value = key === "targetOutDir" ? "out" : { jsx: true };
      const [diag, ...rest] = validateConfig({ [key]: { preact: value } });

      expect(rest).toEqual([]);
      expect(diag?.code).toBe("INK0081");
      expect(diag?.severity).toBe("warning");
      expect(diag?.title).toBe(`Unknown config key: ${key}.preact`);
    },
  );

  it("still reports a wrong-typed value under a known target key as an error", () => {
    const [diag, ...rest] = validateConfig({ targetOutDir: { react: 42 } });

    expect(rest).toEqual([]);
    expect(diag?.code).toBe("INK0083");
    expect(diag?.severity).toBe("error");
    expect(diag?.title).toContain("targetOutDir.react");
  });

  it("reports a wrong-typed value inside an array element as an error", () => {
    const [diag] = validateConfig({ barrels: [{ file: 42, match: "" }] });

    expect(diag?.code).toBe("INK0083");
    expect(diag?.severity).toBe("error");
    expect(diag?.title).toContain("barrels[0].file");
  });

  it("reports both an unknown key and a bad value in one pass", () => {
    const diags = validateConfig({ sourceMaps: "inline", verbose: "yes" });
    expect(diags.map((d) => d.code).sort()).toEqual(["INK0082", "INK0083"]);
  });

  it("never throws on a wholly malformed config", () => {
    expect(() => validateConfig({ targets: "react", plugins: 3, registry: 7 })).not.toThrow();
    expect(validateConfig({ targets: "react", plugins: 3, registry: 7 }).length).toBeGreaterThan(0);
  });
});
