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

const SWITCH_BASE = resolveComponent(import.meta.url, "./ISwitchBase.ink.tsx");

describe("SwitchBase", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(SWITCH_BASE);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("is a plain slotted shell: no two-way notice (INK0045), no hasSlot notice (INK0068)", async () => {
    // The shell holds no model and reads no runtime slot presence, so it lowers cleanly everywhere.
    const result = await compileComponent(SWITCH_BASE);
    expect(result.diagnostics.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(SWITCH_BASE));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(SWITCH_BASE));
  });

  it('renders a `<label class="switch">` shell across targets', async () => {
    const result = await compileComponent(SWITCH_BASE);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      const files = result.files[target] ?? [];
      expectOutputContains(files, "switch");
    }
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(SWITCH_BASE))).toMatchSnapshot();
  });
});
