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

const INPUT_CONTROL = resolveComponent(import.meta.url, "./IInputControlBase.ink.tsx");

describe("InputControl", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(INPUT_CONTROL);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro two-way notice (INK0045)", async () => {
    // The `defineModel` value is two-way; on the static Astro target that can't be interactive, so the
    // compiler emits an info-level notice (INK0045). Every other target compiles cleanly.
    const result = await compileComponent(INPUT_CONTROL);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(INPUT_CONTROL);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(INPUT_CONTROL);
    assertConformance(result);
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(INPUT_CONTROL);
    const output = snapshotOutput(result);
    expect(output).toMatchSnapshot();
  });

  it('Solid coalesces the bound value so an unset model never renders the string "undefined"', async () => {
    // Solid's client runtime does `node.value = props.value` with no nullish guard, so an unset model
    // (value === undefined) surfaces as the literal "undefined" in the field. The binding coalesces to
    // "" to render an empty control. (React/Vue drop nullish bindings; the coalesce is harmless there.)
    const result = await compileComponent(INPUT_CONTROL);
    expectOutputContains(result.files.solid ?? [], 'value={props.value ?? ""}');
  });
});
