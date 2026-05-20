import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectCorrectFileExtensions,
  expectNoDiagnostics,
  assertConformance,
  snapshotOutput,
  expectOutputContains,
  resolveComponent,
} from "@inkline/test-utils";

const BADGE = resolveComponent(import.meta.url, "./IBadge.ink.tsx");

describe("Badge", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(BADGE);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    const result = await compileComponent(BADGE);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(BADGE);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(BADGE);
    assertConformance(result);
  });

  it("renders label in all targets", async () => {
    const result = await compileComponent(BADGE);
    for (const target of ["react", "vue", "solid", "svelte"] as const) {
      expectOutputContains(result.filesFor(target), "label");
    }
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(BADGE);
    const output = snapshotOutput(result);
    expect(output).toMatchSnapshot();
  });
});
