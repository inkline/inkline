import { defineComponent, Slot } from "@inkline/core";

// The label wrapper: a single `<label>` root (so the styled layer's `class` falls through) that
// nests the control + its text. Nesting the control inside the `<label>` gives implicit label
// association — clicking the text toggles the box — with no `for`/`id` wiring.
export default defineComponent(
  {
    meta: { headless: true },
    slots: { default: {} },
  },
  () => {
    return (
      <label class="checkbox">
        <Slot />
      </label>
    );
  },
);
