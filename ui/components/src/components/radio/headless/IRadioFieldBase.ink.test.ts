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

const RADIO_FIELD = resolveComponent(import.meta.url, "./IRadioFieldBase.ink.tsx");

describe("RadioField", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(RADIO_FIELD);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro custom-event notice (INK0045)", async () => {
    // The `change` event is a custom event; on the static Astro target it can't be interactive, so
    // the compiler emits an info-level notice (INK0045). Every other target compiles cleanly.
    const result = await compileComponent(RADIO_FIELD);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(RADIO_FIELD);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(RADIO_FIELD);
    assertConformance(result);
  });

  it("renders a native radio input carrying the a11y semantics", async () => {
    const result = await compileComponent(RADIO_FIELD);
    // The native `<input type="radio">` provides role=radio, aria-checked (from `checked`), keyboard
    // roving, and mutual exclusivity via a shared `name` — all for free.
    expectOutputContains(result.files.react ?? [], 'type="radio"');
    expectOutputContains(result.files.react ?? [], "checked={props.checked}");
    expectOutputContains(result.files.react ?? [], "name={props.name}");
    expectOutputContains(result.files.angular ?? [], "'type': 'radio'");
  });

  it("coalesces the value binding so an unset value never renders undefined", async () => {
    const result = await compileComponent(RADIO_FIELD);
    // A radio always needs a submit value; coalescing to "" keeps the control valid when unset.
    expectOutputContains(result.files.react ?? [], 'value={props.value ?? ""}');
    expectOutputContains(result.files.angular ?? [], "'[value]': \"value() ?? ''\"");
  });

  it("emits the selected value on change per target", async () => {
    const result = await compileComponent(RADIO_FIELD);
    expectOutputContains(result.files.react ?? [], 'props.onChange?.(props.value ?? "")');
    expectOutputContains(result.files.angular ?? [], "change.emit(value() ?? '')");
    expectOutputContains(result.files.vue ?? [], 'emit("change", value ?? "")');
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(RADIO_FIELD);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});
