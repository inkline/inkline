import { defineStories } from "../../../define.ts";

interface ButtonProps {
  label: string;
  disabled?: boolean;
}

const meta = defineStories<ButtonProps>({
  component: "Button",
  title: "Components/Button",
  args: { label: "Click me", disabled: false },
  argTypes: { label: { control: "text", description: "Button text content" } },
});

export default meta;

export const Default = {};
export const Disabled = { args: { disabled: true } };
