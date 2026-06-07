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

const BUTTON = resolveComponent(import.meta.url, "./IButtonBase.ink.tsx");

describe("Button", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(BUTTON);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    const result = await compileComponent(BUTTON);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(BUTTON);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(BUTTON);
    assertConformance(result);
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(BUTTON);
    const output = snapshotOutput(result);
    expect(output).toMatchSnapshot();
  });
});
