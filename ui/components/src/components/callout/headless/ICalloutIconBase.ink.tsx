import { defineComponent, Slot } from "@inkline/core";

export interface CalloutIconBaseProps {}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (_props: CalloutIconBaseProps) => {
    return (
      <span class="callout-icon" aria-hidden="true">
        <Slot />
      </span>
    );
  },
);
