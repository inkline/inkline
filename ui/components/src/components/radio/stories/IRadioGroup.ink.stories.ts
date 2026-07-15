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
  },
});

export default meta;

export const Default = {};
export const Horizontal = { args: { orientation: "horizontal" } };
export const Disabled = { args: { disabled: true } };
export const WithDisabledOption = {
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana", disabled: true },
      { value: "cherry", label: "Cherry" },
    ],
  },
};
export const Sizes = { render: "./RadioSizes.ink.tsx" };
export const Colors = { render: "./RadioColors.ink.tsx" };
export const Orientations = { render: "./RadioOrientations.ink.tsx" };
