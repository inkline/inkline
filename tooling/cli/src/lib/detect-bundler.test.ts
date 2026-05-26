import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { detectBundler } from "./detect-bundler.ts";

describe("detectBundler", () => {
  let dir: string;

  beforeEach(() => {
    dir = join(tmpdir(), `inkline-test-bundler-${Date.now()}`);
    mkdirSync(dir, { recursive: true });
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("detects vite from vite.config.ts", () => {
    writeFileSync(join(dir, "vite.config.ts"), "");
    const result = detectBundler(dir);
    expect(result).toEqual({ bundler: "vite", configPath: join(dir, "vite.config.ts") });
  });

  it("detects vite from vite.config.js", () => {
    writeFileSync(join(dir, "vite.config.js"), "");
    expect(detectBundler(dir)?.bundler).toBe("vite");
  });

  it("detects vite from vite.config.mts", () => {
    writeFileSync(join(dir, "vite.config.mts"), "");
    expect(detectBundler(dir)?.bundler).toBe("vite");
  });

  it("detects webpack from webpack.config.ts", () => {
    writeFileSync(join(dir, "webpack.config.ts"), "");
    expect(detectBundler(dir)?.bundler).toBe("webpack");
  });

  it("detects webpack from webpack.config.js", () => {
    writeFileSync(join(dir, "webpack.config.js"), "");
    expect(detectBundler(dir)?.bundler).toBe("webpack");
  });

  it("detects rollup from rollup.config.ts", () => {
    writeFileSync(join(dir, "rollup.config.ts"), "");
    expect(detectBundler(dir)?.bundler).toBe("rollup");
  });

  it("detects rollup from rollup.config.mjs", () => {
    writeFileSync(join(dir, "rollup.config.mjs"), "");
    expect(detectBundler(dir)?.bundler).toBe("rollup");
  });

  it("prefers vite over webpack when both exist", () => {
    writeFileSync(join(dir, "vite.config.ts"), "");
    writeFileSync(join(dir, "webpack.config.js"), "");
    expect(detectBundler(dir)?.bundler).toBe("vite");
  });

  it("returns undefined when no config file found", () => {
    expect(detectBundler(dir)).toBeUndefined();
  });
});
