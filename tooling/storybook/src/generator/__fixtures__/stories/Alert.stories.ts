import { defineStories } from "../../../define.ts";

interface AlertProps {
  color: string;
}

export default defineStories<AlertProps>({
  component: "Alert",
  title: "Components/Alert",
  args: { color: "info" },
  slots: {
    default: "Alert message",
    header: "Alert title",
  },
  stories: {
    Default: {},
    CustomSlots: {
      slots: { default: "Custom message", header: "Custom title" },
    },
  },
});
