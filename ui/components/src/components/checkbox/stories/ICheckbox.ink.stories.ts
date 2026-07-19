import { defineStories } from "@inkline/storybook";
import type { CheckboxProps } from "../styled/ICheckbox.ink.tsx";

const meta = defineStories<CheckboxProps>({
  component: "ICheckbox",
  title: "Components/Forms/Checkbox",
  // `checked` is a two-way `defineModel`, so it can't be a Storybook argType. These stories therefore
  // use render helpers that own a local `createSignal` bound via `$bind:checked` — the same pattern as
  // Radio and Switch — so each has a seeded state and clicks actually move it.
  args: {},
  argTypes: {
    label: { control: "text", description: "Label text; overridden by the default slot" },
    indeterminate: { control: "boolean", description: 'Partially-checked ("mixed") state' },
    disabled: { control: "boolean", description: "Disabled state" },
    readonly: { control: "boolean", description: "Read-only: focusable but not toggleable" },
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

export const Default = { render: "./CheckboxDefault.ink.tsx" };
export const Indeterminate = { render: "./CheckboxIndeterminate.ink.tsx" };
export const Disabled = { render: "./CheckboxDisabled.ink.tsx" };
export const ReadOnly = { render: "./CheckboxReadOnly.ink.tsx" };
export const Colors = { render: "./CheckboxColors.ink.tsx" };
export const Sizes = { render: "./CheckboxSizes.ink.tsx" };
export const States = { render: "./CheckboxStates.ink.tsx" };
export const TwoWay = { render: "./CheckboxTwoWay.ink.tsx" };
