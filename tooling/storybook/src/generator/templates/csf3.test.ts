import { describe, it, expect } from "vitest";
import { renderCsf3 } from "./csf3.ts";
import { frameworkByTarget } from "../config.ts";
import type { LoadedStoryModule, ResolvedRenderImport } from "../index.ts";

const react = frameworkByTarget("react")!;
const vue = frameworkByTarget("vue")!;

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
      },
    ];
    const out = renderCsf3(mod, vue, renderImports);
    expect(out).toContain('import { h } from "vue";');
    expect(out).toContain('import ColorsStory from "../generated/badge/stories/colors.vue";');
    expect(out).toContain("export const Colors: Story = { render: () => h(ColorsStory) };");
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
