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

const RADIO_GROUP = resolveComponent(import.meta.url, "./IRadioGroupBase.ink.tsx");

describe("RadioGroup", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(RADIO_GROUP);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics (no hasSlot, no two-way binding)", async () => {
    const result = await compileComponent(RADIO_GROUP);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(RADIO_GROUP);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(RADIO_GROUP);
    assertConformance(result);
  });

  it("exposes the radiogroup role and aria-label on the container", async () => {
    const result = await compileComponent(RADIO_GROUP);
    // The container is the group's accessibility root: role=radiogroup names the set, and `label`
    // surfaces as its accessible name.
    expectOutputContains(result.files.react ?? [], 'role="radiogroup"');
    expectOutputContains(result.files.react ?? [], "aria-label={props.label}");
    expectOutputContains(result.files.angular ?? [], "'role': 'radiogroup'");
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(RADIO_GROUP);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});
