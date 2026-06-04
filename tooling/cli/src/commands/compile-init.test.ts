import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("consola", () => {
  const consola = {
    prompt: vi.fn(),
    info: vi.fn(),
    start: vi.fn(),
    success: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    box: vi.fn(),
  };
  return { default: consola };
});

import consola from "consola";
import { scaffoldCompiler } from "./init.ts";

describe("scaffoldCompiler", () => {
  let dir: string;
  let originalCwd: string;

  beforeEach(() => {
    dir = join(tmpdir(), `inkline-test-compile-init-${Date.now()}`);
    mkdirSync(dir, { recursive: true });
    originalCwd = process.cwd();
    process.chdir(dir);
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.chdir(originalCwd);
    rmSync(dir, { recursive: true, force: true });
  });

  function writePkg(scripts: Record<string, string> = {}) {
    writeFileSync(join(dir, "package.json"), JSON.stringify({ scripts }));
  }

  it("creates inkline.config.ts with specified targets", async () => {
    writePkg();
    await scaffoldCompiler(dir, ["react", "vue"]);

    const config = readFileSync(join(dir, "inkline.config.ts"), "utf-8");
    expect(config).toContain('import { defineConfig } from "inkline/compiler"');
    expect(config).toContain('"react"');
    expect(config).toContain('"vue"');
  });

  it("creates example component file", async () => {
    writePkg();
    await scaffoldCompiler(dir, ["react"]);

    const componentPath = join(dir, "src/components/hello-world/HelloWorld.ink.tsx");
    expect(existsSync(componentPath)).toBe(true);

    const content = readFileSync(componentPath, "utf-8");
    expect(content).toContain("defineComponent");
    expect(content).toContain("HelloWorldProps");
  });

  it("adds inkline:build and inkline:dev scripts to package.json", async () => {
    writePkg();
    await scaffoldCompiler(dir, ["react"]);

    const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf-8"));
    expect(pkg.scripts["inkline:build"]).toContain("inkline compile");
    expect(pkg.scripts["inkline:dev"]).toContain("--watch");
  });

  it("does not overwrite existing inkline.config.ts", async () => {
    writePkg();
    writeFileSync(join(dir, "inkline.config.ts"), "existing content");

    await scaffoldCompiler(dir, ["react"]);

    const config = readFileSync(join(dir, "inkline.config.ts"), "utf-8");
    expect(config).toBe("existing content");
    expect(consola.warn).toHaveBeenCalledWith(expect.stringContaining("already exists"));
  });

  it("does not overwrite existing example component", async () => {
    writePkg();
    const componentDir = join(dir, "src/components/hello-world");
    mkdirSync(componentDir, { recursive: true });
    writeFileSync(join(componentDir, "HelloWorld.ink.tsx"), "existing");

    await scaffoldCompiler(dir, ["react"]);

    const content = readFileSync(join(componentDir, "HelloWorld.ink.tsx"), "utf-8");
    expect(content).toBe("existing");
    expect(consola.warn).toHaveBeenCalledWith(
      expect.stringContaining("Example component already exists"),
    );
  });

  it("does not overwrite existing scripts", async () => {
    writePkg({ "inkline:build": "custom", "inkline:dev": "custom" });

    await scaffoldCompiler(dir, ["react"]);

    const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf-8"));
    expect(pkg.scripts["inkline:build"]).toBe("custom");
    expect(pkg.scripts["inkline:dev"]).toBe("custom");
    expect(consola.warn).toHaveBeenCalledWith(expect.stringContaining("already exist"));
  });

  it("shows completion message", async () => {
    writePkg();
    await scaffoldCompiler(dir, ["react"]);

    expect(consola.box).toHaveBeenCalledWith(expect.stringContaining("inkline compile"));
  });
});
