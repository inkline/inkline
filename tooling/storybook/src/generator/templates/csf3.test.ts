import { describe, it, expect } from "vitest";
import { renderCsf3 } from "./csf3.ts";
import { frameworkByTarget } from "../config.ts";
import type { StoryDefinition } from "../../define.ts";

const react = frameworkByTarget("react")!;
const vue = frameworkByTarget("vue")!;

const buttonDef: StoryDefinition<unknown> = {
  component: "Button",
  title: "Components/Button",
  args: { label: "Click me", disabled: false },
  argTypes: { label: { control: "text", description: "Button text" } },
  stories: {
    Default: {},
    Disabled: { args: { disabled: true } },
  },
};

describe("renderCsf3", () => {
  it("emits a banner, renderer type import and scoped component import", () => {
    const out = renderCsf3(buttonDef, react);
    expect(out).toContain("AUTO-GENERATED");
    expect(out).toContain('import type { Meta, StoryObj } from "@storybook/react-vite";');
    expect(out).toContain('import { Button } from "@inkline/react";');
  });

  it("emits a typed meta with args and argTypes", () => {
    const out = renderCsf3(buttonDef, react);
    expect(out).toContain('title: "Components/Button",');
    expect(out).toContain('args: {"label":"Click me","disabled":false},');
    expect(out).toContain('argTypes: {"label":{"control":"text","description":"Button text"}},');
    expect(out).toContain("} satisfies Meta<typeof Button>;");
    expect(out).toContain("type Story = StoryObj<typeof meta>;");
  });

  it("emits one export per story, with and without arg overrides", () => {
    const out = renderCsf3(buttonDef, react);
    expect(out).toContain("export const Default: Story = {};");
    expect(out).toContain('export const Disabled: Story = { args: {"disabled":true} };');
  });

  it("omits args/argTypes lines when absent", () => {
    const out = renderCsf3(
      { component: "Box", title: "Components/Box", stories: { Default: {} } },
      react,
    );
    expect(out).not.toContain("args:");
    expect(out).not.toContain("argTypes:");
  });

  it("differs from React only by type import and component package", () => {
    const reactOut = renderCsf3(buttonDef, react);
    const vueOut = renderCsf3(buttonDef, vue);
    const normalize = (s: string) =>
      s
        .replaceAll("@storybook/vue3-vite", "@storybook/react-vite")
        .replaceAll("@inkline/vue", "@inkline/react");
    expect(normalize(vueOut)).toBe(reactOut);
  });

  it("rejects an invalid component identifier", () => {
    expect(() => renderCsf3({ ...buttonDef, component: "My-Button" }, react)).toThrow(
      /Invalid component/,
    );
  });

  it("rejects an invalid story export name", () => {
    expect(() => renderCsf3({ ...buttonDef, stories: { "1st": {} } }, react)).toThrow(
      /Invalid story name/,
    );
  });

  it("emits a createElement import and meta render when meta has slots", () => {
    const def: StoryDefinition<unknown> = {
      component: "Card",
      title: "Components/Card",
      slots: { default: "Card body" },
      stories: { Default: {} },
    };
    const out = renderCsf3(def, react);
    expect(out).toContain('import { createElement } from "react";');
    expect(out).toContain('render: (args) => createElement(Card, args, "Card body"),');
    expect(out).toContain("export const Default: Story = {};");
  });

  it("emits a story-level render when a story overrides slots", () => {
    const def: StoryDefinition<unknown> = {
      component: "Card",
      title: "Components/Card",
      slots: { default: "Default body" },
      stories: {
        Default: {},
        Custom: { slots: { default: "Custom body" } },
      },
    };
    const out = renderCsf3(def, react);
    expect(out).toContain("export const Default: Story = {};");
    expect(out).toContain(
      'export const Custom: Story = { render: (args) => createElement(Card, args, "Custom body") };',
    );
  });

  it("merges story slots with meta slots", () => {
    const def: StoryDefinition<unknown> = {
      component: "Card",
      title: "Components/Card",
      slots: { default: "Body", header: "Title" },
      stories: {
        Custom: { slots: { header: "Custom title" } },
      },
    };
    const out = renderCsf3(def, react);
    expect(out).toContain('renderHeader: () => "Custom title"');
    expect(out).toContain('"Body"');
  });

  it("emits a story with both args and slot render", () => {
    const def: StoryDefinition<unknown> = {
      component: "Card",
      title: "Components/Card",
      stories: {
        WithSlot: { args: { color: "red" }, slots: { default: "Content" } },
      },
    };
    const out = renderCsf3(def, react);
    expect(out).toContain('args: {"color":"red"}');
    expect(out).toContain("render: (args) => createElement(Card,");
  });

  it("emits Vue h() render for slots", () => {
    const def: StoryDefinition<unknown> = {
      component: "Card",
      title: "Components/Card",
      slots: { default: "Body", header: "Title" },
      stories: { Default: {} },
    };
    const out = renderCsf3(def, vue);
    expect(out).toContain('import { h } from "vue";');
    expect(out).toContain("render: (args) => h(Card, args, {");
    expect(out).toContain('default: () => "Body"');
    expect(out).toContain('header: () => "Title"');
  });

  it("emits scoped slot with destructured params for Vue", () => {
    const def: StoryDefinition<unknown> = {
      component: "List",
      title: "Components/List",
      slots: { item: { params: ["item", "index"], content: "item.label" } },
      stories: { Default: {} },
    };
    const out = renderCsf3(def, vue);
    expect(out).toContain("item: ({ item, index }) => item.label");
  });

  it("skips slot rendering for unsupported targets", () => {
    const svelte = frameworkByTarget("svelte")!;
    const def: StoryDefinition<unknown> = {
      component: "Card",
      title: "Components/Card",
      slots: { default: "Body" },
      stories: { Default: {} },
    };
    const out = renderCsf3(def, svelte);
    expect(out).not.toContain("render:");
    expect(out).not.toContain("createElement");
    expect(out).not.toContain("import { h }");
  });
});
