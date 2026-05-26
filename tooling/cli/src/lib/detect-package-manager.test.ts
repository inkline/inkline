import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { detectPackageManager, getPackageManagerRunner } from "./detect-package-manager.ts";

describe("detectPackageManager", () => {
  let dir: string;

  beforeEach(() => {
    dir = join(tmpdir(), `inkline-test-pm-${Date.now()}`);
    mkdirSync(dir, { recursive: true });
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("detects pnpm from pnpm-lock.yaml", () => {
    writeFileSync(join(dir, "pnpm-lock.yaml"), "");
    expect(detectPackageManager(dir)).toBe("pnpm");
  });

  it("detects yarn from yarn.lock", () => {
    writeFileSync(join(dir, "yarn.lock"), "");
    expect(detectPackageManager(dir)).toBe("yarn");
  });

  it("detects bun from bun.lockb", () => {
    writeFileSync(join(dir, "bun.lockb"), "");
    expect(detectPackageManager(dir)).toBe("bun");
  });

  it("detects bun from bun.lock", () => {
    writeFileSync(join(dir, "bun.lock"), "");
    expect(detectPackageManager(dir)).toBe("bun");
  });

  it("detects npm from package-lock.json", () => {
    writeFileSync(join(dir, "package-lock.json"), "");
    expect(detectPackageManager(dir)).toBe("npm");
  });

  it("falls back to npm when no lockfile exists", () => {
    expect(detectPackageManager(dir)).toBe("npm");
  });

  it("prefers pnpm when multiple lockfiles exist", () => {
    writeFileSync(join(dir, "pnpm-lock.yaml"), "");
    writeFileSync(join(dir, "package-lock.json"), "");
    expect(detectPackageManager(dir)).toBe("pnpm");
  });
});

describe("getPackageManagerRunner", () => {
  it.each([
    ["pnpm", "pnpx"],
    ["yarn", "yarn dlx"],
    ["bun", "bunx"],
    ["npm", "npx"],
  ] as const)("returns %s runner as %s", (pm, expected) => {
    expect(getPackageManagerRunner(pm)).toBe(expected);
  });
});
