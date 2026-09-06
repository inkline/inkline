import { defineComponent, defineProps, Slot } from "@inkline/core";

export interface InputSuffixBaseProps {}

export default defineComponent({ meta: { headless: true }, slots: { default: {} } }, () => {
  const _props = defineProps<InputSuffixBaseProps>();

  return (
    <span class="input-suffix">
      <Slot />
    </span>
  );
});
