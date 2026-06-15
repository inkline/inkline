import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectNoDiagnostics,
  expectCorrectFileExtensions,
  expectOutputContains,
  expectImports,
  assertConformance,
  snapshotOutput,
  resolveComponent,
  type ComponentTestResult,
  type TargetName,
} from "@inkline/test-utils";
import { mountStyledOnAngular } from "../../angular-ssr-helper.ts";

const IFIELDGROUP = resolveComponent(import.meta.url, "./IFieldGroup.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

describe("IFieldGroup (styled)", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(IFIELDGROUP);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics (no hasSlot, no two-way binding)", async () => {
    const result = await compileComponent(IFIELDGROUP);
    expectNoDiagnostics(result);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(IFIELDGROUP);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(IFIELDGROUP);
    assertConformance(result);
  });

  it("composes the IFieldGroupBase wrapper", async () => {
    const result = await compileComponent(IFIELDGROUP);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      expectOutputContains(out(result, target), "IFieldGroupBase");
    }
  });

  it("pulls the field-group recipe from virtual:styleframe", async () => {
    const result = await compileComponent(IFIELDGROUP);
    for (const target of ["react", "vue", "solid"] as const) {
      expectImports(out(result, target), "virtual:styleframe", ["fieldGroupRecipe"]);
    }
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(IFIELDGROUP);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});

// Real-DOM verification on the Angular target (SSR via @angular/platform-server): the recipe classes
// land on the `.field-group` root, the orientation/block variants resolve, and slotted controls
// render as the group's direct children (the seam rules the recipe ships depend on that).
describe("IFieldGroup (styled) on Angular SSR", () => {
  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(
      import.meta.url,
      "./IFieldGroup.ink.tsx",
      ["../headless/IFieldGroupBase.ink.tsx"],
      props,
    );

  it("merges the recipe classes onto the .field-group root (horizontal)", async () => {
    const { html } = await mount({ orientation: "horizontal" });

    expect(html).toMatch(/<div[^>]*class="field-group field-group--orientation-horizontal"/);
  });

  it("adds the block modifier alongside the recipe classes", async () => {
    const { html } = await mount({ orientation: "vertical", block: true });

    // Codegen emits recipe props in alphabetical key order (`block` before `orientation`).
    expect(html).toMatch(
      /<div[^>]*class="field-group field-group--block field-group--orientation-vertical"/,
    );
  });

  it("renders the bare base class when no variants are set", async () => {
    const { html } = await mount({});

    expect(html).toMatch(/<div[^>]*class="field-group"/);
  });

  it("projects slotted controls as direct children of the group", async () => {
    const { html } = await mount({
      orientation: "horizontal",
      __slots: { default: '<button class="button">Go</button>' },
    });

    expect(html).toMatch(
      /<div[^>]*class="field-group[^"]*"[^>]*><button class="button">Go<\/button><\/div>/,
    );
  });
});
