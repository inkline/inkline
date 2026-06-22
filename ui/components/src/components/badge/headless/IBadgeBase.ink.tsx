import { defineComponent, Slot } from "@inkline/core";

export interface BadgeBaseProps {
  label?: string;
}

export default defineComponent(
  {
    meta: { headless: true },
    slots: { default: {} },
  },
  (props: BadgeBaseProps) => {
    return (
      <div class="badge">
        <Slot>{props.label}</Slot>
      </div>
    );
  },
);
