import { defineComponent, Slot } from "@inkline/core";

export interface CalloutContentBaseProps {
  /** Text content; overridden by the default slot. */
  label?: string;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CalloutContentBaseProps) => {
    return (
      <div class="callout-content">
        <Slot>{props.label}</Slot>
      </div>
    );
  },
);
