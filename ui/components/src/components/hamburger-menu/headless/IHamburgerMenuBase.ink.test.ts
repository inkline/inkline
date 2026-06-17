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

const HAMBURGER = resolveComponent(import.meta.url, "./IHamburgerMenuBase.ink.tsx");

describe("HamburgerMenuBase", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(HAMBURGER);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro two-way notice (INK0045)", async () => {
    // The `open` model is two-way; on the static Astro target it lowers to a one-way value and emits
    // an info notice (INK0045). There are no slots, so no INK0068. Every other target is clean.
    const result = await compileComponent(HAMBURGER);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
    expect(result.diagnostics.filter((d) => d.code === "INK0068")).toHaveLength(0);
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(HAMBURGER));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(HAMBURGER));
  });

  it("renders a native button with the disclosure ARIA contract and decorative bars", async () => {
    const result = await compileComponent(HAMBURGER);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      const files = result.files[target] ?? [];
      expectOutputContains(files, "hamburger-menu-inner");
      expectOutputContains(files, "aria-expanded");
    }
  });

  it('Solid coalesces the optional ARIA strings so unset props never render "undefined"', async () => {
    // Solid's runtime assigns optional string bindings with no nullish guard, so the binding coalesces
    // to a string. (React/Vue drop nullish bindings; the coalesce is harmless there.)
    const result = await compileComponent(HAMBURGER);
    expectOutputContains(result.files.solid ?? [], 'aria-controls={props.ariaControls ?? ""}');
    expectOutputContains(result.files.solid ?? [], 'aria-label={props.ariaLabel ?? "Toggle menu"}');
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(HAMBURGER))).toMatchSnapshot();
  });
});
