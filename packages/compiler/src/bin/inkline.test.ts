import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, rmSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI_PATH = resolve(__dirname, "inkline.ts");
const FIXTURES_DIR = resolve(__dirname, "..", "__fixtures__");
const TMP_OUT = resolve(__dirname, "..", "..", ".tmp-cli-test");

function run(...args: string[]): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = execFileSync("npx", ["tsx", CLI_PATH, ...args], {
      encoding: "utf-8",
      cwd: resolve(__dirname, "..", ".."),
      timeout: 30_000,
      stdio: ["pipe", "pipe", "pipe"],
    });
    return { stdout, stderr: "", status: 0 };
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; status?: number };
    return {
      stdout: e.stdout ?? "",
      stderr: e.stderr ?? "",
      status: e.status ?? 1,
    };
  }
}

describe("inkline CLI", () => {
  it("version prints package version", () => {
    const { stdout, status } = run("version");
    expect(status).toBe(0);
    expect(stdout).toContain("inkline v");
  });

  it("help prints usage", () => {
    const { stdout, status } = run("help");
    expect(status).toBe(0);
    expect(stdout).toContain("build");
    expect(stdout).toContain("diagnose");
  });

  it("help build prints build options", () => {
    const { stdout, status } = run("help", "build");
    expect(status).toBe(0);
    expect(stdout).toContain("--target");
    expect(stdout).toContain("--out-dir");
  });

  it("build without --target exits 2", () => {
    const { status, stderr } = run("build", resolve(FIXTURES_DIR, "Counter.ink.tsx"));
    expect(status).toBe(2);
    expect(stderr).toContain("--target");
  });

  it("build with --target react exits 0", () => {
    try {
      const { status } = run(
        "build",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        "--target",
        "react",
        "--out-dir",
        TMP_OUT,
      );
      expect(status).toBe(0);
    } finally {
      if (existsSync(TMP_OUT)) rmSync(TMP_OUT, { recursive: true });
    }
  });

  it("unknown command exits 2", () => {
    const { status } = run("unknown-cmd");
    expect(status).toBe(2);
  });

  it("diagnose runs without writing files", () => {
    const { status } = run(
      "diagnose",
      resolve(FIXTURES_DIR, "Counter.ink.tsx"),
      "--target",
      "react",
    );
    expect(status).toBe(0);
  });
});
