import { describe, it, expect } from "vitest";
import { defineStories, type StoryMeta } from "./define.ts";

interface ButtonProps {
  label: string;
  disabled?: boolean;
}

describe("defineStories", () => {
  it("returns the meta unchanged (identity, zero runtime)", () => {
    const meta: StoryMeta<ButtonProps> = {
      component: "Button",
      title: "Components/Button",
      args: { label: "Click me", disabled: false },
      argTypes: { label: { control: "text" } },
    };

    expect(defineStories(meta)).toBe(meta);
  });

  it("preserves optional fields when omitted", () => {
    const meta = defineStories<ButtonProps>({
      component: "Button",
      title: "Components/Button",
    });

    expect(meta.args).toBeUndefined();
    expect(meta.argTypes).toBeUndefined();
  });
});
