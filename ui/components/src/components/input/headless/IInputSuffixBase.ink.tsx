import { defineComponent, Slot } from "@inkline/core";

export interface InputSuffixBaseProps {}

export default defineComponent(
  { slots: { default: {} }, element: "span" },
  (_props: InputSuffixBaseProps) => {
    return (
      <span class="input-suffix">
        <Slot />
      </span>
    );
  },
);
