import { defineStories } from "@inkline/storybook";
import type { SwitchProps } from "../styled/ISwitch.ink.tsx";

const meta = defineStories<SwitchProps>({
  component: "ISwitch",
  title: "Components/Forms/Switch",
  args: {},
  argTypes: {
    label: { control: "text", description: "Label text; overridden by the default slot" },
    color: {
      control: "select",
      options: ["light", "dark", "neutral"],
      description: "Off-state track color",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    name: { control: "text", description: "Native control name (form submission)" },
    disabled: { control: "boolean", description: "Disabled state" },
  },
});

export default meta;

export const Default = { render: "./SwitchDefault.ink.tsx" };
export const Disabled = { render: "./SwitchDisabled.ink.tsx" };
export const Checked = { render: "./SwitchChecked.ink.tsx" };
export const Colors = { render: "./SwitchColors.ink.tsx" };
export const Sizes = { render: "./SwitchSizes.ink.tsx" };
export const States = { render: "./SwitchStates.ink.tsx" };
export const LabelSlot = { render: "./SwitchLabelSlot.ink.tsx" };
export const TwoWay = { render: "./SwitchTwoWay.ink.tsx" };
