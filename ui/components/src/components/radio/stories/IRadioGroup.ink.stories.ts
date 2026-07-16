import { defineStories } from "@inkline/storybook";
import type { RadioGroupProps } from "../styled/IRadioGroup.ink.tsx";

const meta = defineStories<RadioGroupProps>({
  component: "IRadioGroup",
  title: "Components/Forms/Radio",
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
    ],
    name: "fruit",
    disabled: false,
  },
  argTypes: {
    options: {
      control: "object",
      description: "The choices, each `{ value, label?, disabled? }`",
    },
    name: { control: "text", description: "Shared native control name (mutual exclusivity)" },
    color: {
      control: "select",
      options: ["light", "dark", "neutral"],
      description: "Color variant",
    },
    size: { control: "select", options: ["sm", "md", "lg"], description: "Size variant" },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Layout orientation",
    },
    disabled: { control: "boolean", description: "Disables every option in the group" },
    readonly: {
      control: "boolean",
      description: "Freezes the selection (stays focusable, unlike disabled)",
    },
  },
});

export default meta;

// `value` is a two-way `defineModel`, so it can't be a Storybook argType. These stories therefore use
// render helpers that own a local `createSignal` bound via `$bind:value` — the same pattern as the
// showcases below — so each has a default selection and clicks actually move it.
export const Default = { render: "./RadioDefault.ink.tsx" };
export const Horizontal = { render: "./RadioHorizontal.ink.tsx" };
export const Disabled = { render: "./RadioDisabled.ink.tsx" };
export const Readonly = { render: "./RadioReadonly.ink.tsx" };
export const WithDisabledOption = { render: "./RadioWithDisabledOption.ink.tsx" };
export const Sizes = { render: "./RadioSizes.ink.tsx" };
export const Colors = { render: "./RadioColors.ink.tsx" };
export const Orientations = { render: "./RadioOrientations.ink.tsx" };
