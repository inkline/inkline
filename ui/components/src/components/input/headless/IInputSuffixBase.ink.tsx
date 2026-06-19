import { defineComponent, Slot } from "@inkline/core";

export interface InputSuffixBaseProps {}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (_props: InputSuffixBaseProps) => {
    return (
      <span class="input-suffix">
        <Slot />
      </span>
    );
  },
);
