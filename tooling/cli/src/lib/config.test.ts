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

function writeConfig(source: string): string {
  mkdirSync(TMP, { recursive: true });
  const configPath = resolve(TMP, "inkline.config.mjs");
  writeFileSync(configPath, source, "utf-8");
  return configPath;
}

describe("loadInklineConfig", () => {
  it("returns empty object when no config file exists", async () => {
    expect(await loadInklineConfig()).toEqual({ config: {}, valid: true });
  });

  it("loads config from explicit path", async () => {
    const configPath = writeConfig(`export default { targets: ["react"] };\n`);
    const { config, valid } = await loadInklineConfig(configPath);
    expect(config.targets).toEqual(["react"]);
    expect(valid).toBe(true);
  });

  it("warns on an unrecognised key and keeps the config", async () => {
    const configPath = writeConfig(
      `export default { targets: ["react"], sourceMaps: "inline" };\n`,
    );
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { config, valid } = await loadInklineConfig(configPath);

    expect(config.targets).toEqual(["react"]);
    // An unknown key is ignored, not consumed — it never makes the config unusable.
    expect(valid).toBe(true);
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

  it("reports a wrong value type as an error and marks the config unusable", async () => {
    const configPath = writeConfig(`export default { targets: ["react"], verbose: "yes" };\n`);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    const { config, valid } = await loadInklineConfig(configPath);

    // The config is still returned as loaded — nothing is rewritten — but the caller is told not to
    // consume it.
    expect(config.verbose).toBe("yes");
    expect(valid).toBe(false);
    expect(warn).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledTimes(1);
    const message = error.mock.calls[0]![0] as string;
    expect(message).toContain("INK0083");
    expect(message).toContain("error");
    expect(message).toContain("verbose");

    warn.mockRestore();
    error.mockRestore();
  });

  it("reports an unknown key and a wrong value type in one load", async () => {
    const configPath = writeConfig(`export default { sourceMaps: "inline", targets: "react" };\n`);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    const { valid } = await loadInklineConfig(configPath);

    expect(valid).toBe(false);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledTimes(1);

    warn.mockRestore();
    error.mockRestore();
  });

  it("warns nothing for a valid config", async () => {
    const configPath = writeConfig(`export default { targets: ["react"], outDir: "dist" };\n`);
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { valid } = await loadInklineConfig(configPath);

    expect(valid).toBe(true);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("logs error and returns empty on failure", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { config, valid } = await loadInklineConfig("/nonexistent/inkline.config.ts");
    // Defaults are consumable, so a failed load is not the unusable-config case.
    expect(config).toEqual({});
    expect(valid).toBe(true);
    spy.mockRestore();
  });
});
