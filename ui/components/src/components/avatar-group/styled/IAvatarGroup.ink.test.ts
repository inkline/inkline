import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectCorrectFileExtensions,
  expectNoDiagnostics,
  expectOutputContains,
  expectImports,
  assertConformance,
  snapshotOutput,
  resolveComponent,
  type ComponentTestResult,
  type TargetName,
} from "@inkline/test-utils";
import { mountStyledOnAngular } from "../../angular-ssr-helper.ts";

const IAVATAR_GROUP = resolveComponent(import.meta.url, "./IAvatarGroup.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

describe("IAvatarGroup (styled)", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(IAVATAR_GROUP);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    expectNoDiagnostics(await compileComponent(IAVATAR_GROUP));
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(IAVATAR_GROUP));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(IAVATAR_GROUP));
  });

  it("composes the headless base", async () => {
    const result = await compileComponent(IAVATAR_GROUP);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      expectOutputContains(out(result, target), "IAvatarGroupBase");
    }
  });

  it("pulls the group recipe from virtual:styleframe", async () => {
    const result = await compileComponent(IAVATAR_GROUP);
    for (const target of ["react", "vue", "solid"] as const) {
      expectImports(out(result, target), "virtual:styleframe", ["avatarGroupRecipe"]);
    }
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(IAVATAR_GROUP))).toMatchSnapshot();
  });
});

describe("IAvatarGroup (styled) on Angular SSR", () => {
  const HEADLESS = ["../headless/IAvatarGroupBase.ink.tsx"];

  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(import.meta.url, "./IAvatarGroup.ink.tsx", HEADLESS, props);

  it("renders the group shell with the size recipe class and projects its avatars", async () => {
    const { html } = await mount({
      size: "lg",
      __slots: { default: '<span class="avatar">AB</span>' },
    });

    expect(html).toMatch(/<div[^>]*class="avatar-group[^"]*"/);
    expect(html).toContain("avatar-group--size-lg");
    expect(html).toContain('<span class="avatar">AB</span>');
  });

  it("renders the base class alone when no size is set", async () => {
    const { html } = await mount({ __slots: { default: '<span class="avatar">CD</span>' } });

    expect(html).toMatch(/<div[^>]*class="avatar-group"/);
    expect(html).not.toContain("avatar-group--");
  });
});
