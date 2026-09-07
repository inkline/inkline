import { defineComponent, defineProps, defineSlot, Slot } from "@inkline/core";

export interface RadioBaseProps {
  /** Id of the label element. */
  id?: string;
}

// A single radio row: a `<label>` that wraps its native control and text. Wrapping the control in
// the label associates the two implicitly (no `for`/`id` needed). Single static root so a styled
// parent's recipe `class` falls through onto the `<label class="radio">`.
export default defineComponent({ meta: { headless: true } }, () => {
  const props = defineProps<RadioBaseProps>();
  defineSlot();

  return (
    <label class="radio" id={props.id}>
      <Slot />
    </label>
  );
});
