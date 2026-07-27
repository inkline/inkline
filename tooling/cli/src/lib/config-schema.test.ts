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
    expect(diag?.severity).toBe("warning");
    expect(diag?.title).toContain("Invalid config value at srcDir");
    expect(diag?.title).toContain("expected string");
  });

  it("reports an out-of-range enum value", () => {
    const [diag] = validateConfig({ sourceMap: "linline" });

    expect(diag?.code).toBe("INK0083");
    expect(diag?.title).toContain("Invalid config value at sourceMap");
  });

  it("reports an unknown target name", () => {
    const [diag] = validateConfig({ targets: ["react", "reakt"] });

    expect(diag?.code).toBe("INK0083");
    expect(diag?.title).toContain("targets[1]");
  });

  it("reports a nested key inside an array element by path, not as a config key", () => {
    const [diag] = validateConfig({ barrels: [{ file: "a.ts", match: "", extra: true }] });

    expect(diag?.code).toBe("INK0083");
    expect(diag?.title).toContain("barrels[0]");
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
