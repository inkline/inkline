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

const SWITCH_LABEL = resolveComponent(import.meta.url, "./ISwitchLabelBase.ink.tsx");

describe("SwitchLabelBase", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(SWITCH_LABEL);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("is a plain slotted span: no two-way notice (INK0045), no hasSlot notice (INK0068)", async () => {
    const result = await compileComponent(SWITCH_LABEL);
    expect(result.diagnostics.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(SWITCH_LABEL));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(SWITCH_LABEL));
  });

  it('renders a `<span class="switch-label">` across targets', async () => {
    const result = await compileComponent(SWITCH_LABEL);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      expectOutputContains(result.files[target] ?? [], "switch-label");
    }
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(SWITCH_LABEL))).toMatchSnapshot();
  });
});
