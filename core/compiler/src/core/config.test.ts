import { describe, it, expect } from "vitest";
import { defineConfig, validateConfigKeys } from "./config.ts";
import { INKLINE_CONFIG_KEYS } from "./options.ts";

describe("defineConfig", () => {
  it("returns the config unchanged", () => {
    const config = { targets: ["react"] as const };
    expect(defineConfig(config)).toBe(config);
  });
});

describe("validateConfigKeys", () => {
  it("reports nothing for a config using only known keys", () => {
    const config = Object.fromEntries(INKLINE_CONFIG_KEYS.map((k) => [k, undefined]));
    expect(validateConfigKeys(config)).toEqual([]);
  });

  it("reports nothing for an empty config", () => {
    expect(validateConfigKeys({})).toEqual([]);
  });

  it("suggests the nearest key for a typo (INK0082)", () => {
    const [diag, ...rest] = validateConfigKeys({ targets: ["react"], sourceMaps: "inline" });

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
    const [diag] = validateConfigKeys({ [typo]: true });
    expect(diag?.code).toBe("INK0082");
    expect(diag?.title).toContain(`Did you mean ${expected}?`);
  });

  it("reports an unrelated key without a suggestion (INK0081)", () => {
    const [diag, ...rest] = validateConfigKeys({ webpackShimEnabled: true });

    expect(rest).toEqual([]);
    expect(diag?.code).toBe("INK0081");
    expect(diag?.severity).toBe("warning");
    expect(diag?.title).toBe("Unknown config key: webpackShimEnabled");
  });

  it("ignores c12 environment-override keys", () => {
    expect(validateConfigKeys({ $development: { verbose: true } })).toEqual([]);
  });

  it("attributes the diagnostic to the config file when known", () => {
    const [diag] = validateConfigKeys({ plugns: [] }, "/app/inkline.config.ts");
    expect(diag?.loc.file).toBe("/app/inkline.config.ts");
  });

  it("defaults the location to <unknown>", () => {
    const [diag] = validateConfigKeys({ plugns: [] });
    expect(diag?.loc.file).toBe("<unknown>");
  });

  it("reports every unknown key", () => {
    const diags = validateConfigKeys({ sourceMaps: "inline", webpackShimEnabled: true });
    expect(diags.map((d) => d.code)).toEqual(["INK0082", "INK0081"]);
  });
});
