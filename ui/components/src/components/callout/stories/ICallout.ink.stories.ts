import { defineStories } from "@inkline/storybook";
import type { CalloutProps } from "../styled/ICallout.ink.tsx";

const meta = defineStories<CalloutProps>({
  component: "ICallout",
  title: "Components/Feedback/Callout",
  args: {
    label: "Heads up — this is a callout worth your attention.",
    dismissible: false,
  },
  argTypes: {
    label: { control: "text", description: "Callout text content" },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "light",
        "dark",
        "neutral",
      ],
      description: "Color variant",
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "soft", "subtle"],
      description: "Style variant",
    },
    size: { control: "select", options: ["sm", "md", "lg"], description: "Size variant" },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Stacking direction of the icon and content",
    },
    dismissible: { control: "boolean", description: "Shows a dismiss button" },
    dismissAriaLabel: {
      control: "text",
      description: "Accessible name for the dismiss button",
    },
  },
});

export default meta;

export const Default = {};
export const Dismissible = { args: { dismissible: true } };
export const Colors = { render: "./CalloutColors.ink.tsx" };
export const Variants = { render: "./CalloutVariants.ink.tsx" };
export const Sizes = { render: "./CalloutSizes.ink.tsx" };
export const Orientation = { render: "./CalloutOrientation.ink.tsx" };
export const WithIcon = { render: "./CalloutWithIcon.ink.tsx" };
