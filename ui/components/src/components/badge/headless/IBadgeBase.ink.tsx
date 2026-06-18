import { defineComponent, Slot } from "@inkline/core";

export interface BadgeBaseProps {
  label?: string;
}

export default defineComponent(
  {
    slots: { default: {} },
    element: "div",
  },
  (props: BadgeBaseProps) => {
    return (
      <div class="badge">
        <Slot>{props.label}</Slot>
      </div>
    );
  },
);
