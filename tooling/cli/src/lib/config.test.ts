import { describe, it, expect, vi, afterEach } from "vitest";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { loadInklineConfig } from "./config.ts";

const TMP = resolve(import.meta.dirname!, "..", "..", ".tmp-config-test");

afterEach(() => {
  try {
    rmSync(TMP, { recursive: true });
  } catch {}
});

describe("loadInklineConfig", () => {
  it("returns empty object when no config file exists", async () => {
    expect(await loadInklineConfig()).toEqual({});
  });

  it("loads config from explicit path", async () => {
    mkdirSync(TMP, { recursive: true });
    const configPath = resolve(TMP, "inkline.config.mjs");
    writeFileSync(configPath, `export default { targets: ["react"] };\n`, "utf-8");
    const config = await loadInklineConfig(configPath);
    expect(config.targets).toEqual(["react"]);
  });

  it("logs error and returns empty on failure", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const config = await loadInklineConfig("/nonexistent/inkline.config.ts");
    expect(config).toEqual({});
    spy.mockRestore();
  });
});
