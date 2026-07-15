import { defineStories } from "@inkline/storybook";
import type { CheckboxProps } from "../styled/ICheckbox.ink.tsx";

const meta = defineStories<CheckboxProps>({
  component: "ICheckbox",
  title: "Components/Forms/Checkbox",
  args: {
    label: "Accept terms",
    indeterminate: false,
    disabled: false,
    required: false,
  },
  argTypes: {
    label: { control: "text", description: "Label text; overridden by the default slot" },
    indeterminate: { control: "boolean", description: 'Partially-checked ("mixed") state' },
    disabled: { control: "boolean", description: "Disabled state" },
    required: { control: "boolean", description: "Required for form submission" },
    color: {
      control: "select",
      options: ["light", "dark", "neutral"],
      description: "Box color variant",
    },
    size: { control: "select", options: ["sm", "md", "lg"], description: "Size variant" },
  },
});

export default meta;

export const Default = {};
export const Indeterminate = { args: { indeterminate: true } };
export const Disabled = { args: { disabled: true } };
export const Colors = { render: "./CheckboxColors.ink.tsx" };
export const Sizes = { render: "./CheckboxSizes.ink.tsx" };
export const States = { render: "./CheckboxStates.ink.tsx" };
export const TwoWay = { render: "./CheckboxTwoWay.ink.tsx" };
