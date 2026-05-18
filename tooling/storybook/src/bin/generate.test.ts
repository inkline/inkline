import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import { mkdtempSync, existsSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";

const CLI = resolve(import.meta.dirname, "generate.ts");
const PKG_ROOT = resolve(import.meta.dirname, "..", "..");
const FIXTURE_STORIES = resolve(import.meta.dirname, "..", "generator", "__fixtures__", "stories");

function run(args: string[]): { stdout: string; stderr: string; status: number } {
  const r = spawnSync(process.execPath, ["--import", "tsx", CLI, ...args], {
    encoding: "utf-8",
    cwd: PKG_ROOT,
    timeout: 30_000,
  });
  return { stdout: r.stdout ?? "", stderr: r.stderr ?? "", status: r.status ?? 1 };
}

describe("inkline-storybook CLI (end to end)", () => {
  it("help prints usage and exits 0", () => {
    const { stdout, status } = run(["help"]);
    expect(status).toBe(0);
    expect(stdout).toContain("inkline-storybook <command>");
  });

  it("unknown command exits 2", () => {
    const { status, stderr } = run(["frobnicate"]);
    expect(status).toBe(2);
    expect(stderr).toContain("Unknown command: frobnicate");
  });

  it("generate emits per-framework story files and exits 0", () => {
    const out = mkdtempSync(join(tmpdir(), "inkline-sb-cli-"));
    try {
      const { status, stdout } = run(["generate", "--core-dir", FIXTURE_STORIES, "--ui-dir", out]);
      expect(status).toBe(0);
      expect(stdout).toContain("story file(s)");
      const reactButton = join(out, "react", "stories", "Button.stories.ts");
      expect(existsSync(reactButton)).toBe(true);
      expect(readFileSync(reactButton, "utf-8")).toContain('from "@inkline/react";');
    } finally {
      rmSync(out, { recursive: true, force: true });
    }
  });
});
