import { createSignal, defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// `readonly` freezes the value while keeping the box focusable and announcing `aria-readonly` — unlike
// disabled. The signal backs `checked` so the seeded state renders; clicks can't change it, by design.
export default defineComponent(() => {
  const [checked, _setChecked] = createSignal(true);
  const [unchecked, _setUnchecked] = createSignal(false);
  return (
    <div id="story">
      <ICheckbox readonly label="Read-only checked" $bind:checked={checked} />
      <ICheckbox readonly label="Read-only unchecked" $bind:checked={unchecked} />
    </div>
  );
});
