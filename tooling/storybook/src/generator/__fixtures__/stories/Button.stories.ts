import { defineStories } from "../../../define.ts";

interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export default defineStories<ButtonProps>({
  component: "Button",
  title: "Components/Button",
  args: { label: "Click me", disabled: false },
  argTypes: { label: { control: "text", description: "Button text content" } },
  stories: {
    Default: {},
    Disabled: { args: { disabled: true } },
  },
});
