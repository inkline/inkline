import { defineStories } from "@inkline/storybook";
import type { BadgeProps } from "../src/components/styled/badge/IBadge.ink.tsx";

export default defineStories<BadgeProps>({
  component: "IBadge",
  title: "Components/Badge",
  args: {
    label: "Click me",
  },
  argTypes: {
    label: { control: "text", description: "Badge text content" },
  },
  stories: {
    Default: {},
    CustomLabel: { args: { label: "Submit" } },
  },
});
