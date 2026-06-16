import { defineStories } from "@inkline/storybook";
import type { BadgeProps } from "../styled/IBadge.ink.tsx";

const meta = defineStories<BadgeProps>({
  component: "IBadge",
  title: "Components/Feedback/Badge",
  args: {
    label: "Badge",
  },
  argTypes: {
    label: { control: "text", description: "Badge text content" },
  },
});

export default meta;

export const Default = {};
export const CustomLabel = { args: { label: "Submit" } };
export const Colors = { render: "./BadgeColors.ink.tsx" };
export const Sizes = { render: "./BadgeSizes.ink.tsx" };
