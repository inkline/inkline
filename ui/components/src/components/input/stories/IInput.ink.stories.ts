import { defineStories } from "@inkline/storybook";
import type { InputProps } from "../styled/IInput.ink.tsx";

const meta = defineStories<InputProps>({
  component: "IInput",
  title: "Components/Input",
  args: {},
  argTypes: {
    color: {
      control: "select",
      options: ["light", "dark", "neutral"],
      description: "Color variant",
    },
    variant: {
      control: "select",
      options: ["default", "soft", "ghost"],
      description: "Style variant",
    },
    size: { control: "select", options: ["sm", "md", "lg"], description: "Size variant" },
    invalid: { control: "boolean", description: "Invalid state styling" },
    disabled: { control: "boolean", description: "Disabled state styling" },
    readonly: { control: "boolean", description: "Read-only state styling" },
  },
});

export default meta;

export const Default = { render: "./InputPrefixSuffix.ink.tsx" };
export const Colors = { render: "./InputColors.ink.tsx" };
export const Sizes = { render: "./InputSizes.ink.tsx" };
export const Variants = { render: "./InputVariants.ink.tsx" };
export const States = { render: "./InputStates.ink.tsx" };
export const PrefixSuffix = { render: "./InputPrefixSuffix.ink.tsx" };
export const Textarea = { render: "./InputTextarea.ink.tsx" };
export const TwoWay = { render: "./InputTwoWay.ink.tsx" };
