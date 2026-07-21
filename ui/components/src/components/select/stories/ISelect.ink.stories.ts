import { defineStories } from "@inkline/storybook";
import type { SelectProps } from "../styled/ISelect.ink.tsx";

const meta = defineStories<SelectProps>({
  component: "ISelect",
  title: "Components/Forms/Select",
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
    ],
    label: "Fruit",
    placeholder: "Pick a fruit",
    invalid: false,
    disabled: false,
    readonly: false,
  },
  argTypes: {
    options: {
      control: "object",
      description: "The choices, each `{ value, label?, disabled? }`",
    },
    label: { control: "text", description: "Accessible name for the trigger and listbox" },
    placeholder: { control: "text", description: "Shown when nothing is selected" },
    color: {
      control: "select",
      options: ["light", "dark", "neutral"],
      description: "Color variant",
    },
    variant: {
      control: "select",
      options: ["solid", "soft", "ghost"],
      description: "Style variant",
    },
    size: { control: "select", options: ["sm", "md", "lg"], description: "Size variant" },
    invalid: { control: "boolean", description: "Invalid-state styling and `aria-invalid`" },
    disabled: { control: "boolean", description: "Disables the whole control" },
    readonly: { control: "boolean", description: "Shows the value but blocks opening/changing it" },
  },
});

export default meta;

// `value` is a two-way `defineModel`, so it can't be a Storybook argType. These stories therefore use
// render helpers that own a local `createSignal` bound via `$bind:value` — so each has a default
// selection and keyboard/pointer interaction actually moves it.
export const Default = { render: "./SelectDefault.ink.tsx" };
export const Placeholder = { render: "./SelectPlaceholder.ink.tsx" };
export const Colors = { render: "./SelectColors.ink.tsx" };
export const Variants = { render: "./SelectVariants.ink.tsx" };
export const Sizes = { render: "./SelectSizes.ink.tsx" };
export const States = { render: "./SelectStates.ink.tsx" };
export const WithDisabledOption = { render: "./SelectWithDisabledOption.ink.tsx" };
