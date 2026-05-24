import { defineComponent } from "@inkline/core";

export interface BadgeBaseProps {
  label?: string;
  disabled?: boolean;
}

export default defineComponent(
  {
    slots: { default: {} },
  },
  (props: BadgeBaseProps) => {
    return (
      <div class="badge" disabled={props.disabled}>
        <slot>{props.label}</slot>
      </div>
    );
  },
);
