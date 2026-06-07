import { describe, it, expect } from "vitest";
import { renderCsf3 } from "./csf3.ts";
import { frameworkByTarget } from "../config.ts";
import type { LoadedStoryModule, ResolvedRenderImport } from "../index.ts";

const react = frameworkByTarget("react")!;
const vue = frameworkByTarget("vue")!;
const svelte = frameworkByTarget("svelte")!;
const astro = frameworkByTarget("astro")!;

const badgeColorsModule: LoadedStoryModule = {
  meta: { component: "IBadge", title: "Components/Badge" },
  stories: { Colors: { render: "./colors.ink.tsx" } },
  sourcePath: "/fake/IBadge.stories.ts",
};

const colorsImport = (importPath: string): ResolvedRenderImport[] => [
  {
    storyName: "Colors",
    localName: "ColorsStory",
    exportedName: "colors",
    importPath,
    selector: "colors",
  },
];

const buttonModule: LoadedStoryModule = {
  meta: {
    component: "Button",
    title: "Components/Button",
    args: { label: "Click me", disabled: false },
    argTypes: { label: { control: "text", description: "Button text" } },
  },
  stories: {
    Default: {},
    Disabled: { args: { disabled: true } },
  },
  sourcePath: "/fake/Button.stories.ts",
};

describe("renderCsf3", () => {
  it("emits a banner, renderer type import and scoped component import", () => {
    const out = renderCsf3(buttonModule, react, []);
    expect(out).toContain("AUTO-GENERATED");
    expect(out).toContain('import type { Meta, StoryObj } from "@storybook/react-vite";');
    expect(out).toContain('import { Button } from "@inkline/react";');
  });

  it("emits a typed meta with args and argTypes", () => {
    const out = renderCsf3(buttonModule, react, []);
    expect(out).toContain('title: "Components/Button",');
    expect(out).toContain('args: {"label":"Click me","disabled":false},');
    expect(out).toContain('argTypes: {"label":{"control":"text","description":"Button text"}},');
    expect(out).toContain("} satisfies Meta<typeof Button>;");
    expect(out).toContain("type Story = StoryObj<typeof meta>;");
  });

  it("emits one export per story, with and without arg overrides", () => {
    const out = renderCsf3(buttonModule, react, []);
    expect(out).toContain("export const Default: Story = {};");
    expect(out).toContain('export const Disabled: Story = { args: {"disabled":true} };');
  });

  it("omits args/argTypes lines when absent", () => {
    const mod: LoadedStoryModule = {
      meta: { component: "Box", title: "Components/Box" },
      stories: { Default: {} },
      sourcePath: "/fake/Box.stories.ts",
    };
    const out = renderCsf3(mod, react, []);
    expect(out).not.toContain("args:");
    expect(out).not.toContain("argTypes:");
  });

  it("differs from React only by type import and component package", () => {
    const reactOut = renderCsf3(buttonModule, react, []);
    const vueOut = renderCsf3(buttonModule, vue, []);
    const normalize = (s: string) =>
      s
        .replaceAll("@storybook/vue3-vite", "@storybook/react-vite")
        .replaceAll("@inkline/vue", "@inkline/react");
    expect(normalize(vueOut)).toBe(reactOut);
  });

  it("emits render story imports and expressions", () => {
    const mod: LoadedStoryModule = {
      meta: { component: "IBadge", title: "Components/Badge" },
      stories: {
        Default: {},
        Colors: { render: "./colors.ink.tsx" },
      },
      sourcePath: "/fake/IBadge.stories.ts",
    };
    const renderImports: ResolvedRenderImport[] = [
      {
        storyName: "Colors",
        localName: "ColorsStory",
        exportedName: "colors",
        importPath: "../generated/badge/stories/colors.tsx",
        selector: "colors",
      },
    ];
    const out = renderCsf3(mod, react, renderImports);
    expect(out).toContain('import { createElement } from "react";');
    expect(out).toContain(
      'import { colors as ColorsStory } from "../generated/badge/stories/colors.tsx";',
    );
    expect(out).toContain(
      "export const Colors: Story = { render: () => createElement(ColorsStory) };",
    );
  });

  it("deduplicates the import when two stories share one render source", () => {
    const mod: LoadedStoryModule = {
      meta: { component: "IInput", title: "Components/Input" },
      stories: {
        Default: { render: "./prefixSuffix.ink.tsx" },
        PrefixSuffix: { render: "./prefixSuffix.ink.tsx" },
      },
      sourcePath: "/fake/IInput.stories.ts",
    };
    const shared: ResolvedRenderImport = {
      localName: "PrefixSuffixStory",
      exportedName: "prefixSuffix",
      importPath: "./prefixSuffix.tsx",
      selector: "prefixSuffix",
      storyName: "Default",
    };
    const renderImports: ResolvedRenderImport[] = [
      shared,
      { ...shared, storyName: "PrefixSuffix" },
    ];
    const out = renderCsf3(mod, react, renderImports);
    const importCount = out.split("\n").filter((l) => l.includes("PrefixSuffixStory")).length;
    // One import line + two render expressions reference the binding (3 lines total, not 4).
    expect(out.match(/import { prefixSuffix as PrefixSuffixStory }/g)).toHaveLength(1);
    expect(importCount).toBe(3);
    expect(out).toContain(
      "export const Default: Story = { render: () => createElement(PrefixSuffixStory) };",
    );
    expect(out).toContain(
      "export const PrefixSuffix: Story = { render: () => createElement(PrefixSuffixStory) };",
    );
  });

  it("omits framework import when no render stories exist", () => {
    const out = renderCsf3(buttonModule, react, []);
    expect(out).not.toContain("createElement");
  });

  it("uses vue h() for render stories", () => {
    const mod: LoadedStoryModule = {
      meta: { component: "IBadge", title: "Components/Badge" },
      stories: { Colors: { render: "./colors.ink.tsx" } },
      sourcePath: "/fake/IBadge.stories.ts",
    };
    const renderImports: ResolvedRenderImport[] = [
      {
        storyName: "Colors",
        localName: "ColorsStory",
        exportedName: "colors",
        importPath: "../generated/badge/stories/colors.vue",
        selector: "colors",
      },
    ];
    const out = renderCsf3(mod, vue, renderImports);
    expect(out).toContain('import { h } from "vue";');
    expect(out).toContain('import ColorsStory from "../generated/badge/stories/colors.vue";');
    expect(out).toContain("export const Colors: Story = { render: () => h(ColorsStory) };");
  });

  it("renders Svelte stories as a { Component } object with no framework import", () => {
    const out = renderCsf3(badgeColorsModule, svelte, colorsImport("./colors.svelte"));
    // Svelte exports no `createElement` — importing it would crash the whole module.
    expect(out).not.toContain('from "svelte"');
    expect(out).not.toContain("createElement");
    expect(out).toContain('import ColorsStory from "./colors.svelte";');
    expect(out).toContain(
      "export const Colors: Story = { render: () => ({ Component: ColorsStory }) };",
    );
  });

  it("renders Astro stories by returning the component factory, not invoking it", () => {
    const out = renderCsf3(badgeColorsModule, astro, colorsImport("./colors.astro"));
    // Calling the factory client-side throws ("rendered server-side"); it must be returned.
    expect(out).not.toContain("ColorsStory()");
    expect(out).toContain('import ColorsStory from "./colors.astro";');
    expect(out).toContain("export const Colors: Story = { render: () => ColorsStory };");
  });

  it("rejects an invalid component identifier", () => {
    const mod: LoadedStoryModule = {
      meta: { component: "My-Button", title: "X" },
      stories: { Default: {} },
      sourcePath: "/fake/X.stories.ts",
    };
    expect(() => renderCsf3(mod, react, [])).toThrow(/Invalid component/);
  });

  it("rejects an invalid story export name", () => {
    const mod: LoadedStoryModule = {
      meta: { component: "Button", title: "X" },
      stories: { "1st": {} },
      sourcePath: "/fake/X.stories.ts",
    };
    expect(() => renderCsf3(mod, react, [])).toThrow(/Invalid story name/);
  });
});
