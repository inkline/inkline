import { defineStories } from "../../../define.ts";

interface BadgeProps {
  label: string;
}

const meta = defineStories<BadgeProps>({
  component: "IBadge",
  title: "Components/Badge",
  args: { label: "Badge" },
  argTypes: { label: { control: "text", description: "Badge text content" } },
});

export default meta;

export const Default = {};
export const CustomLabel = { args: { label: "Submit" } };
export const Colors = { render: "./colors.ink.tsx" };
export const Sizes = { render: "./sizes.ink.tsx" };
