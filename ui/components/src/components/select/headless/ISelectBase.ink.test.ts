import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectCorrectFileExtensions,
  expectOutputContains,
  assertConformance,
  snapshotOutput,
  resolveComponent,
} from "@inkline/test-utils";

const SELECT_BASE = resolveComponent(import.meta.url, "./ISelectBase.ink.tsx");

describe("SelectBase", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(SELECT_BASE);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits no diagnostics (no model, no custom events)", async () => {
    // A stateless slotted container has neither a two-way binding nor a custom event, so nothing is
    // interactivity-limited on Astro — the compiler stays silent.
    const result = await compileComponent(SELECT_BASE);
    expect(result.diagnostics.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(SELECT_BASE);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(SELECT_BASE);
    assertConformance(result);
  });

  it("renders the positioning container with the base class", async () => {
    const result = await compileComponent(SELECT_BASE);
    // The container is the positioning context for the trigger + absolutely-positioned panel.
    expectOutputContains(result.files.react ?? [], '"select-container"');
    expectOutputContains(result.files.vue ?? [], "select-container");
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(SELECT_BASE);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});
