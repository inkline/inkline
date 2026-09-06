import { defineComponent, defineProps, defineSlot, Slot } from "@inkline/core";

export interface InputSuffixBaseProps {}

export default defineComponent({ meta: { headless: true } }, () => {
  const _props = defineProps<InputSuffixBaseProps>();
  const _defaultSlot = defineSlot();

  return (
    <span class="input-suffix">
      <Slot />
    </span>
  );
});
