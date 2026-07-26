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

const CHECKBOX_BASE = resolveComponent(import.meta.url, "./ICheckboxBase.ink.tsx");

describe("CheckboxBase", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(CHECKBOX_BASE);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    // The label wrapper is a single static `<label>` root with only a default slot — no two-way
    // binding and no `hasSlot` gating — so it compiles clean on every target.
    const result = await compileComponent(CHECKBOX_BASE);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(CHECKBOX_BASE);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(CHECKBOX_BASE);
    assertConformance(result);
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(CHECKBOX_BASE);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});
