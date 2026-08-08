import { defineStories } from "@inkline/storybook";
import type { AvatarGroupProps } from "../styled/IAvatarGroup.ink.tsx";

const meta = defineStories<AvatarGroupProps>({
  component: "IAvatarGroup",
  title: "Components/Data Display/AvatarGroup",
  args: {},
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Overlap spacing; set each child avatar's own size to match",
    },
  },
});

export default meta;

export const Default = { render: "./AvatarGroupStack.ink.tsx" };
export const Sizes = { render: "./AvatarGroupSizes.ink.tsx" };
export const Overflow = { render: "./AvatarGroupOverflow.ink.tsx" };
