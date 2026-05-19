import { defineStories } from "@inkline/storybook";
import type { ButtonProps } from "../src/IButton.ink.tsx";

export default defineStories<ButtonProps>({
  component: "IButton",
  title: "Components/Button",
  args: {
    label: "Click me",
    disabled: false,
  },
  argTypes: {
    label: { control: "text", description: "Button text content" },
    disabled: { control: "boolean", description: "Whether the button is disabled" },
  },
  stories: {
    Default: {},
    Disabled: { args: { disabled: true } },
    CustomLabel: { args: { label: "Submit" } },
  },
});
