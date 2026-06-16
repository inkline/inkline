import { defineStories } from "@inkline/storybook";
import type { FieldGroupProps } from "../styled/IFieldGroup.ink.tsx";

const meta = defineStories<FieldGroupProps>({
  component: "IFieldGroup",
  title: "Components/Forms/FieldGroup",
  args: {},
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation",
    },
    block: { control: "boolean", description: "Fill the container width" },
  },
});

export default meta;

export const Default = { render: "./FieldGroupHorizontal.ink.tsx" };
export const Horizontal = { render: "./FieldGroupHorizontal.ink.tsx" };
export const Vertical = { render: "./FieldGroupVertical.ink.tsx" };
