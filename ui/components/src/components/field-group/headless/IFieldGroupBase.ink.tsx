import { defineComponent, defineProps, defineSlot, Slot } from "@inkline/core";

export interface FieldGroupBaseProps {
  /** Id of the field group element. */
  id?: string;
}

export default defineComponent({ meta: { headless: true } }, () => {
  const props = defineProps<FieldGroupBaseProps>();
  const _defaultSlot = defineSlot();

  return (
    <div class="field-group" id={props.id}>
      <Slot />
    </div>
  );
});
