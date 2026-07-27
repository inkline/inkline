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

  it("warns on an unrecognised key and keeps the config", async () => {
    mkdirSync(TMP, { recursive: true });
    const configPath = resolve(TMP, "inkline.config.mjs");
    writeFileSync(
      configPath,
      `export default { targets: ["react"], sourceMaps: "inline" };\n`,
      "utf-8",
    );
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const config = await loadInklineConfig(configPath);

    expect(config.targets).toEqual(["react"]);
    expect(spy).toHaveBeenCalledTimes(1);
    const message = spy.mock.calls[0]![0] as string;
    expect(message).toContain("INK0082");
    expect(message).toContain("warning");
    expect(message).toContain("sourceMaps");
    expect(message).toContain("Did you mean sourceMap?");
    expect(message).toContain("inkline.config");
    expect(process.exitCode).toBeFalsy();

    spy.mockRestore();
  });

  it("warns nothing for a valid config", async () => {
    mkdirSync(TMP, { recursive: true });
    const configPath = resolve(TMP, "inkline.config.mjs");
    writeFileSync(configPath, `export default { targets: ["react"], outDir: "dist" };\n`, "utf-8");
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

    await loadInklineConfig(configPath);

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("logs error and returns empty on failure", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const config = await loadInklineConfig("/nonexistent/inkline.config.ts");
    expect(config).toEqual({});
    spy.mockRestore();
  });
});
