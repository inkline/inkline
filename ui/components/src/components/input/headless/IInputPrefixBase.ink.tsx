import { defineComponent, Slot } from "@inkline/core";

export interface InputPrefixBaseProps {}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (_props: InputPrefixBaseProps) => {
    return (
      <span class="input-prefix">
        <Slot />
      </span>
    );
  },
);
