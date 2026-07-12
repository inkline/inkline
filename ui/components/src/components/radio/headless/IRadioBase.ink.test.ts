import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectCorrectFileExtensions,
  expectNoDiagnostics,
  expectOutputContains,
  assertConformance,
  snapshotOutput,
  resolveComponent,
} from "@inkline/test-utils";

const RADIO = resolveComponent(import.meta.url, "./IRadioBase.ink.tsx");

describe("Radio", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(RADIO);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics (no hasSlot, no two-way binding)", async () => {
    const result = await compileComponent(RADIO);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(RADIO);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(RADIO);
    assertConformance(result);
  });

  it("wraps its content in a <label> for implicit control association", async () => {
    const result = await compileComponent(RADIO);
    // The row is a <label> so wrapping the native control associates the two with no `for`/`id`.
    expectOutputContains(result.files.react ?? [], "<label");
    expectOutputContains(result.files.angular ?? [], "selector: 'label[ink-radio-base]'");
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(RADIO);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});
