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

const INPUT_APPEND = resolveComponent(import.meta.url, "./IInputAppendBase.ink.tsx");

describe("InputAppend", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(INPUT_APPEND);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    const result = await compileComponent(INPUT_APPEND);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(INPUT_APPEND);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(INPUT_APPEND);
    assertConformance(result);
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(INPUT_APPEND);
    const output = snapshotOutput(result);
    expect(output).toMatchSnapshot();
  });
});
