import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const REPO_ROOT = resolve(import.meta.dirname, "../../..");
const GUARD_BIN = resolve(import.meta.dirname, "../bin/tsc.mjs");

/**
 * The one supported type-check invocation. Every assertion below exists to keep these three in
 * agreement: what the guard tells you to run, what the root `package.json` defines, and what CI's
 * Type Check job executes. Drift between them is how a "verified" claim stops meaning anything.
 */
const GATE_SCRIPT = "typecheck";
const GATE_COMMAND = `pnpm run ${GATE_SCRIPT}`;

function readRepoFile(relativePath: string): string {
  return readFileSync(resolve(REPO_ROOT, relativePath), "utf8");
}

function runGuard() {
  return spawnSync(process.execPath, [GUARD_BIN], { encoding: "utf8" });
}

describe("repo-root tsc guard", () => {
  it("exits non-zero", () => {
    // The entire point. Without this bin, `npx tsc` resolves the npm decoy package outside the
    // repo, which type-checks nothing. Whatever this prints, it must never be readable as success.
    expect(runGuard().status).not.toBe(0);
  });

  it("names the supported gate command", () => {
    const { stdout, stderr } = runGuard();
    expect(`${stdout}${stderr}`).toContain(GATE_COMMAND);
  });

  it("is what `tsc` resolves to from the repo root", () => {
    const rootPackageJson = JSON.parse(readRepoFile("package.json")) as {
      devDependencies?: Record<string, string>;
    };
    // pnpm only links a bin into the root `node_modules/.bin` if the owning package is a root
    // dependency. Drop this entry and `npx tsc` silently goes back to resolving the decoy.
    expect(rootPackageJson.devDependencies?.["@inkline/tsc-guard"]).toBeDefined();
  });
});

describe("the gate itself", () => {
  it("is a single root script that builds before checking", () => {
    const rootPackageJson = JSON.parse(readRepoFile("package.json")) as {
      scripts?: Record<string, string>;
    };
    const script = rootPackageJson.scripts?.[GATE_SCRIPT];

    expect(script).toBeDefined();
    // Types resolve through each package's `exports` into `dist/`, so a check without a build
    // type-checks the pre-change types and reports success. The build is the fix for that.
    expect(script).toContain("build");
    expect(script).toContain("vp check --no-fmt --no-lint");
  });

  it("is the command CI runs", () => {
    const workflow = readRepoFile(".github/workflows/ci.yml");
    // Job keys are the only two-space-indented keys in the file; everything inside a job is
    // indented further. Splitting there gives one block per job.
    const job = workflow.split(/^ {2}(?=\S)/m).find((block) => block.startsWith("typecheck:"));

    expect(job, "no `typecheck` job found in ci.yml").toBeDefined();
    expect(job).toContain("Type Check");
    expect(job).toContain(GATE_COMMAND);
  });
});
