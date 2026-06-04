import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectCorrectFileExtensions,
  expectNoDiagnostics,
  assertConformance,
  snapshotOutput,
  resolveComponent,
} from "@inkline/test-utils";

const INPUT_PREFIX = resolveComponent(import.meta.url, "./IInputPrefixBase.ink.tsx");

describe("InputPrefix", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(INPUT_PREFIX);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    const result = await compileComponent(INPUT_PREFIX);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(INPUT_PREFIX);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(INPUT_PREFIX);
    assertConformance(result);
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(INPUT_PREFIX);
    const output = snapshotOutput(result);
    expect(output).toMatchSnapshot();
  });
});
