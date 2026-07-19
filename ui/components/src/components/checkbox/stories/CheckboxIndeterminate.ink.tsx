import { createSignal, defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// The partially-checked ("mixed") state: `indeterminate` renders the mixed box and auto-exposes
// `aria-checked="mixed"`. The signal backs `checked` so the box is a live two-way control underneath.
export default defineComponent(() => {
  const [checked, _setChecked] = createSignal(false);
  return (
    <div id="story">
      <ICheckbox label="Select all" indeterminate={true} $bind:checked={checked} />
    </div>
  );
});
