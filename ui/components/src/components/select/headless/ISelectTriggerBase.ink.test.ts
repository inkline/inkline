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

const SELECT_TRIGGER = resolveComponent(import.meta.url, "./ISelectTriggerBase.ink.tsx");

describe("SelectTrigger", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro custom-event notice (INK0045)", async () => {
    // `toggle` and `navigate` are custom events; on the static Astro target they can't be
    // interactive, so the compiler emits a single info-level notice. No other diagnostics.
    const result = await compileComponent(SELECT_TRIGGER);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    assertConformance(result);
  });

  it("renders a div combobox (not a button) with the trigger class", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    // A div (not a native button) so Enter/Space never fire a native click that would double up
    // with the keyboard handler.
    expectOutputContains(result.files.react ?? [], '"select"');
    expectOutputContains(result.files.react ?? [], 'role="combobox"');
    expectOutputContains(result.files.react ?? [], 'aria-haspopup="listbox"');
    expectOutputContains(result.files.angular ?? [], "'role': 'combobox'");
  });

  it("reflects the open state via aria-expanded and data-open", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    expectOutputContains(
      result.files.react ?? [],
      'aria-expanded={props.expanded ? "true" : "false"}',
    );
    expectOutputContains(result.files.react ?? [], 'data-open={props.expanded ? "true" : "false"}');
  });

  it("removes the tab stop when disabled", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    expectOutputContains(result.files.react ?? [], "tabindex={props.disabled ? -1 : 0}");
  });

  it("prevents default on the combobox keys and emits navigate with the key", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    // The page must not scroll while the trigger is focused; every combobox key is prevented, then
    // reported up as a `navigate` emit carrying the key.
    expectOutputContains(result.files.react ?? [], "preventDefault()");
    expectOutputContains(result.files.react ?? [], "props.onNavigate?.(e.key)");
    expectOutputContains(result.files.vue ?? [], 'emit("navigate", e.key)');
    expectOutputContains(result.files.angular ?? [], "navigate.emit($event.key)");
  });

  it("emits toggle on pointer activation, guarded by disabled", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    expectOutputContains(result.files.react ?? [], "props.onToggle?.()");
    expectOutputContains(result.files.angular ?? [], "toggle.emit()");
  });

  it("applies the placeholder modifier to the value when placeholder is set", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    expectOutputContains(
      result.files.react ?? [],
      'props.placeholder ? "select-value -placeholder" : "select-value"',
    );
  });

  it("lets a styled parent override the arrow class", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    expectOutputContains(result.files.react ?? [], 'props.arrowClass ?? "select-arrow"');
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(SELECT_TRIGGER);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});
