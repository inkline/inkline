import { describe, it, expect } from "vitest";
import { defineStories, type StoryDefinition } from "./define.ts";

interface ButtonProps {
  label: string;
  disabled?: boolean;
}

describe("defineStories", () => {
  it("returns the definition unchanged (identity, zero runtime)", () => {
    const def: StoryDefinition<ButtonProps> = {
      component: "Button",
      title: "Components/Button",
      args: { label: "Click me", disabled: false },
      argTypes: { label: { control: "text" } },
      stories: { Default: {}, Disabled: { args: { disabled: true } } },
    };

    expect(defineStories(def)).toBe(def);
  });

  it("preserves optional fields when omitted", () => {
    const def = defineStories<ButtonProps>({
      component: "Button",
      title: "Components/Button",
      stories: { Default: {} },
    });

    expect(def.args).toBeUndefined();
    expect(def.argTypes).toBeUndefined();
    expect(def.slots).toBeUndefined();
    expect(Object.keys(def.stories)).toEqual(["Default"]);
  });

  it("preserves slot definitions on meta and stories", () => {
    const def = defineStories<ButtonProps>({
      component: "Button",
      title: "Components/Button",
      slots: { default: "Click me" },
      stories: {
        Default: {},
        WithHeader: { slots: { header: "Title" } },
        Scoped: {
          slots: {
            item: { params: ["item", "index"], content: "item.label" },
          },
        },
      },
    });

    expect(def.slots).toEqual({ default: "Click me" });
    expect(def.stories["WithHeader"].slots).toEqual({ header: "Title" });
    expect(def.stories["Scoped"].slots).toEqual({
      item: { params: ["item", "index"], content: "item.label" },
    });
  });
});
