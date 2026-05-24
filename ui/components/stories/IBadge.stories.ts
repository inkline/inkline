import { defineStories } from "@inkline/storybook";
import type { BadgeProps } from "../src/components/styled/badge/IBadge.ink.tsx";

export default defineStories<BadgeProps>({
  component: "IBadge",
  title: "Components/Badge",
  args: {
    label: "Click me",
    disabled: false,
  },
  argTypes: {
    label: { control: "text", description: "Badge text content" },
    disabled: { control: "boolean", description: "Whether the Badge is disabled" },
  },
  stories: {
    Default: {},
    Disabled: { args: { disabled: true } },
    CustomLabel: { args: { label: "Submit" } },
  },
});
