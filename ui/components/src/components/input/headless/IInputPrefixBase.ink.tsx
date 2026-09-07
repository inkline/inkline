import { defineComponent, defineProps, defineSlot, Slot } from "@inkline/core";

export interface InputPrefixBaseProps {}

export default defineComponent({ meta: { headless: true } }, () => {
  const _props = defineProps<InputPrefixBaseProps>();
  const _defaultSlot = defineSlot();

  return (
    <span class="input-prefix">
      <Slot />
    </span>
  );
});
