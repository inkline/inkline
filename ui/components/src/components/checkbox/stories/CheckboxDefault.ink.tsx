import { createSignal, defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// The canonical single checkbox, live via `$bind:checked` — click it and it flips and stays flipped.
export default defineComponent(() => {
  const [checked, _setChecked] = createSignal(false);
  return (
    <div id="story">
      <ICheckbox label="Accept terms" name="terms" $bind:checked={checked} />
    </div>
  );
});
