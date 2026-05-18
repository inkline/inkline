import { readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import {
  runConformanceInvariants,
  requireFileExtension,
  requireContains,
  requireNotContains,
  requireImports,
  requirePropsNotDestructured,
} from "./conformance.ts";
import { compileFixture } from "./harness.ts";
import { scenarios } from "../__fixtures__/scenarios.ts";
import type { GeneratedFile, TargetName } from "../codegen/context.ts";
import { builtinRegistry } from "../codegen/registry.ts";

const validFile: GeneratedFile = {
  path: "Counter.tsx",
  contents: 'import { useState } from "react";\nexport function Counter() {}',
};

describe("runConformanceInvariants", () => {
  it("returns empty when all invariants pass", () => {
    const diags = runConformanceInvariants(
      [requireFileExtension(".tsx"), requireContains("useState")],
      validFile,
    );
    expect(diags).toEqual([]);
  });

  it("returns diagnostics from failing invariants", () => {
    const diags = runConformanceInvariants([requireFileExtension(".vue")], validFile);
    expect(diags).toHaveLength(1);
    expect(diags[0]!.title).toContain(".vue");
  });

  it("accumulates diagnostics from multiple invariants", () => {
    const diags = runConformanceInvariants(
      [requireFileExtension(".vue"), requireContains("missing-import")],
      validFile,
    );
    expect(diags).toHaveLength(2);
  });
});

describe("requireFileExtension", () => {
  it("passes for correct extension", () => {
    const inv = requireFileExtension(".tsx");
    expect(inv(validFile)).toEqual([]);
  });

  it("fails for wrong extension", () => {
    const inv = requireFileExtension(".vue");
    expect(inv(validFile)).toHaveLength(1);
  });
});

describe("requireContains", () => {
  it("passes when content contains substring", () => {
    const inv = requireContains("useState");
    expect(inv(validFile)).toEqual([]);
  });

  it("fails when content does not contain substring", () => {
    const inv = requireContains("createSignal");
    expect(inv(validFile)).toHaveLength(1);
  });
});

describe("requireNotContains", () => {
  it("passes when content does not contain substring", () => {
    const inv = requireNotContains("createSignal");
    expect(inv(validFile)).toEqual([]);
  });

  it("fails when content contains substring", () => {
    const inv = requireNotContains("useState");
    expect(inv(validFile)).toHaveLength(1);
  });
});

describe("requireImports", () => {
  it("passes when all imports are present", () => {
    const inv = requireImports("react", ["useState"]);
    expect(inv(validFile)).toEqual([]);
  });

  it("fails when import is missing", () => {
    const inv = requireImports("react", ["useState", "useEffect"]);
    expect(inv(validFile)).toHaveLength(1);
  });
});

describe("requirePropsNotDestructured", () => {
  it("passes when props are not destructured", () => {
    const file: GeneratedFile = {
      path: "X.tsx",
      contents: "export default function X(props: any) { return props.x; }",
    };
    expect(requirePropsNotDestructured(file)).toEqual([]);
  });

  it("fails when props are destructured", () => {
    const file: GeneratedFile = {
      path: "X.tsx",
      contents: "export default function X(props: any) { const { x } = props; return x; }",
    };
    expect(requirePropsNotDestructured(file)).toHaveLength(1);
  });
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, "..", "__fixtures__");
const TARGETS: TargetName[] = ["react", "solid", "vue", "svelte"];

const fixtures = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith(".ink.tsx"))
  .map((f) => f.replace(".ink.tsx", ""));

describe("fixture conformance matrix", () => {
  for (const fixture of fixtures) {
    describe(fixture, () => {
      const fixtureScenarios = scenarios[fixture];
      const expectedDiags = fixtureScenarios?.[0]?.asserts.expectedDiagnostics;

      it("compiles without unexpected errors", async () => {
        const compiled = await compileFixture(fixture, TARGETS);

        if (expectedDiags) {
          const codes = compiled.diagnostics.map((d) => d.code);
          for (const expected of expectedDiags) {
            expect(codes, `expected diagnostic ${expected}`).toContain(expected);
          }
          return;
        }

        const errors = compiled.diagnostics.filter((d) => d.severity === "error");
        expect(
          errors,
          `unexpected compilation errors: ${errors.map((d) => `${d.code}: ${d.title}`).join(", ")}`,
        ).toHaveLength(0);
      });

      if (!expectedDiags) {
        for (const targetName of TARGETS) {
          it(`passes conformance for ${targetName}`, async () => {
            const compiled = await compileFixture(fixture, TARGETS);
            const files = compiled.files[targetName];
            if (!files || files.length === 0) return;

            const target = builtinRegistry.get(targetName);
            if (!target?.conformance) return;

            for (const file of files) {
              if (file.path.endsWith(".css")) continue;
              const diags = runConformanceInvariants(target.conformance.invariants, file);
              expect(diags, `${file.path}: ${diags.map((d) => d.title).join(", ")}`).toHaveLength(
                0,
              );
            }
          });
        }
      }
    });
  }
});
