import { describe, it, expect, afterEach } from "vitest";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { loadConfig, defineConfig } from "./index.ts";

const TMP = resolve(import.meta.dirname!, "..", ".tmp-config-loader-test");

afterEach(() => {
  try {
    rmSync(TMP, { recursive: true });
  } catch {}
});

interface TestConfig extends Record<string, unknown> {
  greeting: string;
  count?: number;
}

describe("loadConfig", () => {
  it("returns empty config when no config file exists", async () => {
    mkdirSync(TMP, { recursive: true });
    const { config } = await loadConfig<TestConfig>({
      cwd: TMP,
      name: "nonexistent",
    });
    expect(config).toEqual({});
  });

  it("loads .mjs config from explicit configFile", async () => {
    mkdirSync(TMP, { recursive: true });
    const cfgPath = resolve(TMP, "my.config.mjs");
    writeFileSync(cfgPath, `export default { greeting: "hello" };\n`, "utf-8");

    const { config, configFile } = await loadConfig<TestConfig>({ configFile: cfgPath });
    expect(config.greeting).toBe("hello");
    expect(configFile).toBe(cfgPath);
  });

  it("auto-discovers inkline.config.mjs in cwd", async () => {
    mkdirSync(TMP, { recursive: true });
    writeFileSync(
      resolve(TMP, "inkline.config.mjs"),
      `export default { greeting: "discovered" };\n`,
      "utf-8",
    );

    const { config } = await loadConfig<TestConfig>({ cwd: TMP });
    expect(config.greeting).toBe("discovered");
  });

  it("uses custom name for config file discovery", async () => {
    mkdirSync(TMP, { recursive: true });
    writeFileSync(
      resolve(TMP, "myapp.config.mjs"),
      `export default { greeting: "custom" };\n`,
      "utf-8",
    );

    const { config } = await loadConfig<TestConfig>({ cwd: TMP, name: "myapp" });
    expect(config.greeting).toBe("custom");
  });

  it("merges defaults under loaded config", async () => {
    mkdirSync(TMP, { recursive: true });
    writeFileSync(
      resolve(TMP, "inkline.config.mjs"),
      `export default { greeting: "from-file" };\n`,
      "utf-8",
    );

    const { config } = await loadConfig<TestConfig>({
      cwd: TMP,
      defaults: { greeting: "default", count: 42 },
    });
    expect(config.greeting).toBe("from-file");
    expect(config.count).toBe(42);
  });

  it("returns defaults when no config file exists", async () => {
    mkdirSync(TMP, { recursive: true });
    const { config } = await loadConfig<TestConfig>({
      cwd: TMP,
      defaults: { greeting: "fallback", count: 1 },
    });
    expect(config.greeting).toBe("fallback");
    expect(config.count).toBe(1);
  });
});

describe("defineConfig", () => {
  it("returns the config object as-is", () => {
    const cfg = { greeting: "hello", count: 5 };
    expect(defineConfig(cfg)).toBe(cfg);
  });
});
