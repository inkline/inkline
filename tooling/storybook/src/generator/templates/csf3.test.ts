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
});
