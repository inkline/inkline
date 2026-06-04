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

const INPUT_CONTROL = resolveComponent(import.meta.url, "./IInputControlBase.ink.tsx");

describe("InputControl", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(INPUT_CONTROL);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    const result = await compileComponent(INPUT_CONTROL);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(INPUT_CONTROL);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(INPUT_CONTROL);
    assertConformance(result);
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(INPUT_CONTROL);
    const output = snapshotOutput(result);
    expect(output).toMatchSnapshot();
  });
});
