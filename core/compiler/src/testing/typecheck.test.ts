import { existsSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { isAbsolute, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect, afterEach } from "vitest";
import { typecheckEmittedForTarget, isTypecheckable, type TypecheckResult } from "./typecheck.ts";
import { compileFixture } from "./harness.ts";
import { EXCLUSIONS } from "./typecheck-fixtures.ts";
import type { GeneratedFile, TargetConformanceSpec, TargetName } from "../codegen/context.ts";
import { builtinRegistry } from "../codegen/registry.ts";

const reactConformance = builtinRegistry.get("react")!.conformance!;

/**
 * A deliberately broken emitted file, kept permanently. Before UXF-205 the harness reported this
 * as a pass: it shelled `npx tsc` into an OS temp dir with no `node_modules`, npx's refusal text
 * carried no `error TS`, and the diagnostic parse found nothing. If this test ever goes green the
 * gate has gone vacuous again.
 */
const BROKEN: readonly GeneratedFile[] = [
  { path: "Broken.tsx", contents: "export const broken: number = 'not a number';\n" },
];

const WELL_TYPED: readonly GeneratedFile[] = [
  { path: "WellTyped.tsx", contents: "export const ok: number = 1;\n" },
];

describe("typecheckEmittedForTarget", { timeout: 60_000 }, () => {
  it("returns pass for empty file list", async () => {
    const result: TypecheckResult = await typecheckEmittedForTarget(reactConformance, []);
    expect(result.pass).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
    expect(result.raw).toBe("");
  });

  it("fails when emitted output has a type error", async () => {
    const result = await typecheckEmittedForTarget(reactConformance, BROKEN);
    expect(result.pass).toBe(false);
    expect(result.diagnostics.map((d) => d.title).join("\n")).toMatch(/error TS2322:/);
  });

  it("passes when emitted output typechecks", async () => {
    const result = await typecheckEmittedForTarget(reactConformance, WELL_TYPED);
    expect(result.pass, result.raw).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
  });

  it("resolves bare imports in emitted output against the compiler's node_modules", async () => {
    const usesReact: readonly GeneratedFile[] = [
      {
        path: "UsesReact.tsx",
        contents: 'import { useState } from "react";\nexport const s = useState(0);\n',
      },
    ];
    const result = await typecheckEmittedForTarget(reactConformance, usesReact);
    expect(result.pass, result.raw).toBe(true);
  });

  describe("a toolchain that will not start never reads as a pass", () => {
    function withTsconfig(tsconfig: string): TargetConformanceSpec {
      return { ...reactConformance, typecheck: { ...reactConformance.typecheck, tsconfig } };
    }

    it.each([
      ["empty", ""],
      ["relative", "./tsconfigs/react.tsconfig.json"],
      ["missing", resolve(tmpdir(), "no-such-dir", "react.tsconfig.json")],
    ])("rejects a %s tsconfig path rather than reporting a pass", async (_label, tsconfig) => {
      const result = await typecheckEmittedForTarget(withTsconfig(tsconfig), WELL_TYPED);
      expect(result.pass).toBe(false);
      expect(result.diagnostics[0]?.title).toMatch(/Typecheck harness did not run/);
    });

    it("rejects a file set plain tsc cannot read", async () => {
      const result = await typecheckEmittedForTarget(reactConformance, [
        { path: "Widget.vue", contents: "<template><div /></template>\n" },
      ]);
      expect(result.pass).toBe(false);
      expect(result.diagnostics[0]?.title).toMatch(/no typecheckable files/);
    });
  });

  describe("cwd independence", () => {
    const origCwd = process.cwd();
    afterEach(() => process.chdir(origCwd));

    it("every builtin target declares an absolute, existing tsconfig or none at all", () => {
      for (const name of builtinRegistry.list()) {
        const { tsconfig } = builtinRegistry.get(name)!.conformance?.typecheck ?? { tsconfig: "" };
        if (tsconfig === "") continue;
        expect(isAbsolute(tsconfig), `${name}: ${tsconfig}`).toBe(true);
        expect(existsSync(tsconfig), `${name}: ${tsconfig}`).toBe(true);
      }
    });

    it("reaches the same verdicts when the suite runs from another directory", async () => {
      process.chdir(tmpdir());
      expect((await typecheckEmittedForTarget(reactConformance, BROKEN)).pass).toBe(false);
      expect((await typecheckEmittedForTarget(reactConformance, WELL_TYPED)).pass).toBe(true);
    });
  });
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, "..", "__fixtures__");

/**
 * Targets emitting `.tsx`. Vue and Svelte emit single-file components that plain `tsc` cannot
 * read, so the sweep does not cover them — that needs `vue-tsc`/`svelte-check`, neither of which
 * is a dependency here. `emits only files plain tsc cannot read` below records the gap so it
 * cannot widen silently.
 */
const SWEPT_TARGETS: TargetName[] = ["react", "solid"];
const UNSWEPT_TARGETS: TargetName[] = ["vue", "svelte"];

const fixtures = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith(".ink.tsx"))
  .map((f) => f.replace(".ink.tsx", ""));

async function sweep(fixture: string, targetName: TargetName): Promise<TypecheckResult | null> {
  const compiled = await compileFixture(fixture, [targetName]);
  if (compiled.diagnostics.some((d) => d.severity === "error")) return null;

  const files = compiled.files[targetName];
  if (!files || files.length === 0) return null;

  const conformance = builtinRegistry.get(targetName)?.conformance;
  if (!conformance) return null;

  return typecheckEmittedForTarget(conformance, files);
}

describe("typecheck emitted fixtures", { timeout: 300_000 }, () => {
  for (const fixture of fixtures) {
    for (const targetName of SWEPT_TARGETS) {
      const excluded = EXCLUSIONS[targetName]?.includes(fixture) ?? false;

      it(`${fixture} → ${targetName}`, { skip: excluded }, async () => {
        const result = await sweep(fixture, targetName);
        if (!result) return;
        expect(
          result.pass,
          `typecheck failures:\n${result.diagnostics.map((d) => d.title).join("\n")}`,
        ).toBe(true);
      });

      // Quarantine can only shrink: an entry that no longer fails must be deleted, not left
      // behind to silently exempt a fixture that has started passing.
      it.runIf(excluded)(`${fixture} → ${targetName} is still excluded for a reason`, async () => {
        const result = await sweep(fixture, targetName);
        expect(
          result?.pass ?? true,
          `"${fixture}" now typechecks for ${targetName} — remove it from EXCLUSIONS.${targetName}`,
        ).toBe(false);
      });
    }
  }

  it("EXCLUSIONS names only real fixtures and swept targets", () => {
    for (const [targetName, names] of Object.entries(EXCLUSIONS)) {
      expect(SWEPT_TARGETS, `EXCLUSIONS.${targetName}`).toContain(targetName);
      for (const name of names) expect(fixtures, `EXCLUSIONS.${targetName}`).toContain(name);
    }
  });

  for (const targetName of UNSWEPT_TARGETS) {
    it(`${targetName} emits only files plain tsc cannot read`, async () => {
      const compiled = await compileFixture("Counter", [targetName]);
      const files = compiled.files[targetName] ?? [];
      expect(files.length).toBeGreaterThan(0);
      expect(files.filter(isTypecheckable)).toHaveLength(0);
    });
  }
});
