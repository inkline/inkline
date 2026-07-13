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

const CHECKBOX_CONTROL = resolveComponent(import.meta.url, "./ICheckboxControlBase.ink.tsx");

describe("CheckboxControl", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(CHECKBOX_CONTROL);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro two-way notice (INK0045)", async () => {
    // The `defineModel` checked state is two-way; on the static Astro target that can't be
    // interactive, so the compiler emits an info-level notice (INK0045). Every other target
    // compiles cleanly.
    const result = await compileComponent(CHECKBOX_CONTROL);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(CHECKBOX_CONTROL);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(CHECKBOX_CONTROL);
    assertConformance(result);
  });

  it("coalesces the bound checked so an unset model renders unchecked, never `undefined`", async () => {
    // `checked` is a boolean IDL property; an unset model (checked === undefined) must render an
    // unchecked box, not the literal string, so the binding coalesces to `false`.
    const result = await compileComponent(CHECKBOX_CONTROL);
    expectOutputContains(result.files.react ?? [], "checked={props.checked ?? false}");
    expectOutputContains(result.files.solid ?? [], "checked={props.checked ?? false}");
  });

  it("binds indeterminate as an attribute that resolves to the DOM IDL property", async () => {
    // `indeterminate` is forwarded as an attribute binding; Vue/Solid/Svelte/Qwik/Angular resolve
    // it to the native `el.indeterminate` IDL property (driving the recipe's `:indeterminate` box
    // and auto-exposing `aria-checked="mixed"`).
    const result = await compileComponent(CHECKBOX_CONTROL);
    expectOutputContains(result.files.react ?? [], "indeterminate={props.indeterminate ?? false}");
    expectOutputContains(result.files.vue ?? [], ':indeterminate="indeterminate ?? false"');
  });

  it("patches indeterminate imperatively via a ref effect for the React IDL path", async () => {
    // React renders the `indeterminate` attribute inert, so a `createRef` + `createEffect` assigns
    // `el.indeterminate` imperatively — making the mixed state correct on all seven targets. The
    // effect reads the ref into a local first so React's dependency array never dereferences a null
    // ref during the first render.
    const result = await compileComponent(CHECKBOX_CONTROL);
    expectOutputContains(
      result.files.react ?? [],
      "el.indeterminate = props.indeterminate ?? false",
    );
    expectOutputContains(result.files.vue ?? [], "el.indeterminate = props.indeterminate ?? false");
  });

  it("emits the change setter reading currentTarget.checked per target", async () => {
    const result = await compileComponent(CHECKBOX_CONTROL);
    expectOutputContains(result.files.react ?? [], "e.currentTarget.checked");
    expectOutputContains(result.files.vue ?? [], "e.currentTarget.checked");
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(CHECKBOX_CONTROL);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});
