import { defineComponent, defineProps, Slot } from "@inkline/core";

export interface FieldGroupBaseProps {
  /** Id of the field group element. */
  id?: string;
}

export default defineComponent({ meta: { headless: true }, slots: { default: {} } }, () => {
  const props = defineProps<FieldGroupBaseProps>();

  return (
    <div class="field-group" id={props.id}>
      <Slot />
    </div>
  );
});
