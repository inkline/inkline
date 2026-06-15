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

const FIELD_GROUP = resolveComponent(import.meta.url, "./IFieldGroupBase.ink.tsx");

describe("FieldGroupBase", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(FIELD_GROUP);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    const result = await compileComponent(FIELD_GROUP);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(FIELD_GROUP);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(FIELD_GROUP);
    assertConformance(result);
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(FIELD_GROUP);
    const output = snapshotOutput(result);
    expect(output).toMatchSnapshot();
  });
});
