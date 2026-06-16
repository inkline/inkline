import { defineStories } from "@inkline/storybook";
import type { ButtonProps } from "../styled/IButton.ink.tsx";

const meta = defineStories<ButtonProps>({
  component: "IButton",
  title: "Components/Actions/Button",
  args: {
    label: "Button",
    disabled: false,
    loading: false,
    block: false,
  },
  argTypes: {
    label: { control: "text", description: "Button text content" },
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
      options: ["solid", "outline", "soft", "subtle", "ghost", "link"],
      description: "Style variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size variant",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Native button type",
    },
    disabled: { control: "boolean", description: "Disabled state" },
    loading: { control: "boolean", description: "Loading state with spinner" },
    block: { control: "boolean", description: "Full-width button" },
  },
});

export default meta;

export const Default = {};
export const Disabled = { args: { disabled: true } };
export const Loading = { args: { loading: true } };
export const Block = { args: { block: true } };
export const Colors = { render: "./ButtonColors.ink.tsx" };
export const Variants = { render: "./ButtonVariants.ink.tsx" };
export const Sizes = { render: "./ButtonSizes.ink.tsx" };
export const Icon = { render: "./ButtonIcon.ink.tsx" };
