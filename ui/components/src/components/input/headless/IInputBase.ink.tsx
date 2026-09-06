import { defineComponent, defineProps, Slot } from "@inkline/core";

export interface InputBaseProps {
  /** Id of the field shell element. */
  id?: string;
}

export default defineComponent(
  {
    meta: { headless: true },
    slots: { default: {} },
  },
  () => {
    const props = defineProps<InputBaseProps>();

    return (
      <div class="input" id={props.id}>
        <Slot />
      </div>
    );
  },
);
