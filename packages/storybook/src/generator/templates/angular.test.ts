import { describe, it, expect } from "vitest";
import { renderAngular } from "./angular.ts";
import { frameworkByTarget } from "../config.ts";
import type { StoryDefinition } from "../../define.ts";

const angular = frameworkByTarget("angular")!;

const buttonDef: StoryDefinition<unknown> = {
  component: "Button",
  title: "Components/Button",
  args: { label: "Click me" },
  argTypes: { label: { control: "text" } },
  stories: { Default: {}, Disabled: { args: { disabled: true } } },
};

describe("renderAngular", () => {
  it("imports the class-based component and Storybook Angular types", () => {
    const out = renderAngular(buttonDef, angular);
    expect(out).toContain('import type { Meta, StoryObj } from "@storybook/angular";');
    expect(out).toContain('import { Button } from "@inkline/angular";');
  });

  it("uses the component type directly (not typeof) for Angular generics", () => {
    const out = renderAngular(buttonDef, angular);
    expect(out).toContain("const meta: Meta<Button> = {");
    expect(out).toContain("type Story = StoryObj<Button>;");
    expect(out).not.toContain("typeof");
  });

  it("emits title, args, argTypes and one export per story", () => {
    const out = renderAngular(buttonDef, angular);
    expect(out).toContain('title: "Components/Button",');
    expect(out).toContain('args: {"label":"Click me"},');
    expect(out).toContain('argTypes: {"label":{"control":"text"}},');
    expect(out).toContain("export const Default: Story = {};");
    expect(out).toContain('export const Disabled: Story = { args: {"disabled":true} };');
  });

  it("omits args/argTypes lines when absent", () => {
    const out = renderAngular(
      { component: "Box", title: "Components/Box", stories: { Default: {} } },
      angular,
    );
    expect(out).not.toContain("args:");
    expect(out).not.toContain("argTypes:");
  });

  it("validates component and story identifiers", () => {
    expect(() => renderAngular({ ...buttonDef, component: "x-y" }, angular)).toThrow(
      /Invalid component/,
    );
    expect(() => renderAngular({ ...buttonDef, stories: { "9": {} } }, angular)).toThrow(
      /Invalid story name/,
    );
  });
});
