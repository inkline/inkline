import { existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { typecheckEmittedForTarget, type TypecheckResult } from "./typecheck.ts";
import { compileFixture } from "./harness.ts";
import type { GeneratedFile, TargetConformanceSpec, TargetName } from "../codegen/context.ts";
import { builtinRegistry } from "../codegen/registry.ts";
import {
  TYPECHECKED_TARGETS,
  typecheckExclusion,
  typecheckExclusions,
} from "./typecheck-fixtures.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, "..", "__fixtures__");

const reactConformance = builtinRegistry.get("react")!.conformance!;

function file(path: string, contents: string): GeneratedFile {
  return { path, contents } as GeneratedFile;
}

describe("typecheckEmittedForTarget", () => {
  it("returns pass for empty file list, and reports nothing was checked", async () => {
    const result: TypecheckResult = await typecheckEmittedForTarget(reactConformance, []);
    expect(result.pass).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
    expect(result.checkedFiles).toBe(0);
  });

  // ── The anti-vacuity gate ────────────────────────────────────────────────────
  // This helper spent its whole life reporting `pass: true` for every input, because it shelled out
  // to `npx tsc` — which resolves to the `tsc` decoy package, not TypeScript — and read "no line
  // containing `error TS`" as success. Ill-typed emitted output passed identically to clean output.
  // These two tests are the reason that cannot silently recur: if the typechecker ever stops
  // typechecking, the poisoned case goes green and this fails.

  it("passes well-typed emitted output", async () => {
    const result = await typecheckEmittedForTarget(reactConformance, [
      file(
        "Ok.tsx",
        `export function Ok(props: { size: number }) {\n  return <div>{props.size}</div>;\n}\n`,
      ),
    ]);
    expect(result.raw).toBe("");
    expect(result.pass).toBe(true);
    expect(result.checkedFiles).toBe(1);
  });

  it("fails ill-typed emitted output — the gate must not be vacuous", async () => {
    const result = await typecheckEmittedForTarget(reactConformance, [
      file("Bad.tsx", `export const size: number = "definitely not a number";\n`),
    ]);
    expect(result.pass).toBe(false);
    expect(result.checkedFiles).toBe(1);
    expect(result.diagnostics.map((d) => d.title).join("\n")).toContain("TS2322");
  });

  it("fails loudly when the tsconfig is missing rather than reporting a clean typecheck", async () => {
    const broken: TargetConformanceSpec = {
      ...reactConformance,
      typecheck: { ...reactConformance.typecheck, tsconfig: "/nope/does-not-exist.json" },
    };
    const result = await typecheckEmittedForTarget(broken, [
      file("Ok.tsx", "export const a = 1;\n"),
    ]);
    expect(result.pass).toBe(false);
    expect(result.diagnostics[0]!.title).toContain("tsconfig not found");
  });

  it("reports checkedFiles 0 for output tsc cannot read", async () => {
    const result = await typecheckEmittedForTarget(reactConformance, [
      file("Component.vue", "<template><div /></template>\n"),
    ]);
    expect(result.checkedFiles).toBe(0);
  });
});

describe("target typecheck configuration", () => {
  for (const name of builtinRegistry.list()) {
    const path = builtinRegistry.get(name)?.conformance?.typecheck.tsconfig;
    if (!path) continue;
    it(`${name} points at a tsconfig that exists`, () => {
      expect(existsSync(path), `${name}: ${path}`).toBe(true);
    });
  }
});

// ── Fixture sweep ────────────────────────────────────────────────────────────
// Only the targets in `TYPECHECKED_TARGETS` are swept. The others emit `.vue` / `.svelte` /
// `.astro` (which `tsc` cannot read) or have no tsconfig — see `typecheck-fixtures.ts`.

const fixtures = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith(".ink.tsx"))
  .map((f) => f.replace(".ink.tsx", ""));

describe("typecheck exclusions stay live", { timeout: 180_000 }, () => {
  for (const targetName of TYPECHECKED_TARGETS) {
    it(`${targetName}: every excluded fixture still fails, and still exists`, async () => {
      const stale: string[] = [];
      for (const fixture of typecheckExclusions(targetName)) {
        if (!fixtures.includes(fixture)) {
          stale.push(`${fixture}: no such fixture`);
          continue;
        }
        const compiled = await compileFixture(fixture, [targetName as TargetName]);
        const files = compiled.files[targetName as TargetName];
        if (!files?.length) continue;
        const target = builtinRegistry.get(targetName as TargetName);
        const result = await typecheckEmittedForTarget(target!.conformance!, files);
        if (result.pass) stale.push(`${fixture}: now typechecks clean — remove the exclusion`);
      }
      expect(stale, `stale exclusions in typecheck-fixtures.ts:\n${stale.join("\n")}`).toEqual([]);
    });
  }
});

describe("typecheck emitted fixtures", { timeout: 180_000 }, () => {
  for (const targetName of TYPECHECKED_TARGETS) {
    for (const fixture of fixtures) {
      const excluded = typecheckExclusion(targetName, fixture);
      const run = excluded ? it.skip : it;
      run(`${fixture} → ${targetName}`, async () => {
        const compiled = await compileFixture(fixture, [targetName as TargetName]);
        if (compiled.diagnostics.some((d) => d.severity === "error")) return;

        const files = compiled.files[targetName as TargetName];
        if (!files || files.length === 0) return;

        const target = builtinRegistry.get(targetName as TargetName);
        const result = await typecheckEmittedForTarget(target!.conformance!, files);

        // A sweep that checks nothing asserts nothing — every swept target emits `.ts`/`.tsx`.
        expect(
          result.checkedFiles,
          `${fixture} → ${targetName}: nothing was typechecked`,
        ).toBeGreaterThan(0);
        expect(result.pass, `typecheck failures:\n${result.raw}`).toBe(true);
      });
    }
  }
});
