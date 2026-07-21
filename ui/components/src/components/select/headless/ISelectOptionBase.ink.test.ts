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

const SELECT_OPTION = resolveComponent(import.meta.url, "./ISelectOptionBase.ink.tsx");

describe("SelectOption", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(SELECT_OPTION);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro custom-event notice (INK0045)", async () => {
    const result = await compileComponent(SELECT_OPTION);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(SELECT_OPTION);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(SELECT_OPTION);
    assertConformance(result);
  });

  it("renders a native list item with role=option and the option class", async () => {
    const result = await compileComponent(SELECT_OPTION);
    expectOutputContains(result.files.react ?? [], '"select-option"');
    expectOutputContains(result.files.react ?? [], 'role="option"');
    expectOutputContains(result.files.angular ?? [], "'role': 'option'");
  });

  it("exposes selection via aria-selected and the active row via data-active", async () => {
    const result = await compileComponent(SELECT_OPTION);
    expectOutputContains(
      result.files.react ?? [],
      'aria-selected={props.selected ? "true" : "false"}',
    );
    expectOutputContains(result.files.react ?? [], 'data-active={props.active ? "true" : "false"}');
  });

  it("guards selection so a disabled option cannot emit select", async () => {
    const result = await compileComponent(SELECT_OPTION);
    // `aria-disabled` for AT, plus the emit is gated behind `!disabled` so a disabled row is inert.
    expectOutputContains(
      result.files.react ?? [],
      'aria-disabled={props.disabled ? "true" : undefined}',
    );
    expectOutputContains(result.files.react ?? [], "!props.disabled");
    expectOutputContains(result.files.react ?? [], "props.onSelect?.()");
  });

  it("syncs the active row with the pointer via an activate emit on hover", async () => {
    const result = await compileComponent(SELECT_OPTION);
    expectOutputContains(result.files.react ?? [], "props.onActivate?.()");
    expectOutputContains(result.files.angular ?? [], "activate.emit()");
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(SELECT_OPTION);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});
