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

const INPUT_GROUP = resolveComponent(import.meta.url, "./IInputGroupBase.ink.tsx");

describe("InputGroup", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(INPUT_GROUP);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    const result = await compileComponent(INPUT_GROUP);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(INPUT_GROUP);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(INPUT_GROUP);
    assertConformance(result);
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(INPUT_GROUP);
    const output = snapshotOutput(result);
    expect(output).toMatchSnapshot();
  });
});
