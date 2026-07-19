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

const CALLOUT_CONTENT = resolveComponent(import.meta.url, "./ICalloutContentBase.ink.tsx");

describe("CalloutContentBase", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(CALLOUT_CONTENT);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    expectNoDiagnostics(await compileComponent(CALLOUT_CONTENT));
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(CALLOUT_CONTENT));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(CALLOUT_CONTENT));
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(CALLOUT_CONTENT))).toMatchSnapshot();
  });
});
