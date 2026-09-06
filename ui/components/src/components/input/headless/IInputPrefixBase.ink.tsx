import { defineComponent, defineProps, Slot } from "@inkline/core";

export interface InputPrefixBaseProps {}

export default defineComponent({ meta: { headless: true }, slots: { default: {} } }, () => {
  const _props = defineProps<InputPrefixBaseProps>();

  return (
    <span class="input-prefix">
      <Slot />
    </span>
  );
});
