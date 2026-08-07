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

const SELECT_LISTBOX = resolveComponent(import.meta.url, "./ISelectListboxBase.ink.tsx");

describe("SelectListbox", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(SELECT_LISTBOX);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits no diagnostics (no model, no custom events)", async () => {
    const result = await compileComponent(SELECT_LISTBOX);
    expect(result.diagnostics.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(SELECT_LISTBOX);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(SELECT_LISTBOX);
    assertConformance(result);
  });

  it("renders a native list with role=listbox and the panel class", async () => {
    const result = await compileComponent(SELECT_LISTBOX);
    expectOutputContains(result.files.react ?? [], '"select-panel"');
    expectOutputContains(result.files.react ?? [], 'role="listbox"');
    expectOutputContains(result.files.angular ?? [], "'role': 'listbox'");
  });

  it("wires the accessible name via labelledBy and label", async () => {
    const result = await compileComponent(SELECT_LISTBOX);
    expectOutputContains(result.files.react ?? [], "aria-labelledby={props.labelledBy}");
    expectOutputContains(result.files.react ?? [], "aria-label={props.label}");
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(SELECT_LISTBOX);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});
