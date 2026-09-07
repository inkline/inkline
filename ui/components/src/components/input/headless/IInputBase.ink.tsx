import { defineComponent, defineProps, defineSlot, Slot } from "@inkline/core";

export interface InputBaseProps {
  /** Id of the field shell element. */
  id?: string;
}

export default defineComponent(
  {
    meta: { headless: true },
  },
  () => {
    const props = defineProps<InputBaseProps>();
    const _defaultSlot = defineSlot();

    return (
      <div class="input" id={props.id}>
        <Slot />
      </div>
    );
  },
);
