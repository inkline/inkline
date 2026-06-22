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

const INPUT_TEXTAREA = resolveComponent(import.meta.url, "./IInputTextareaBase.ink.tsx");

describe("InputTextarea", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(INPUT_TEXTAREA);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro two-way notice (INK0045)", async () => {
    // The `defineModel` value is two-way; on the static Astro target that can't be interactive, so the
    // compiler emits an info-level notice (INK0045). Every other target compiles cleanly.
    const result = await compileComponent(INPUT_TEXTAREA);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(INPUT_TEXTAREA));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(INPUT_TEXTAREA));
  });

  it("host-extracts to a native textarea[ink-input-textarea-base] on Angular", async () => {
    const result = await compileComponent(INPUT_TEXTAREA);
    expectOutputContains(
      result.files.angular ?? [],
      "selector: 'textarea[ink-input-textarea-base]'",
    );
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(INPUT_TEXTAREA))).toMatchSnapshot();
  });

  it('Solid coalesces the bound value so an unset model never renders the string "undefined"', async () => {
    const result = await compileComponent(INPUT_TEXTAREA);
    expectOutputContains(result.files.solid ?? [], 'value={props.value ?? ""}');
  });
});
