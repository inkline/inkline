import { createSignal, defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// Every meaningful state at a glance. The two live positions (unchecked, checked) each bind a signal
// so they toggle; the mixed and disabled states stay fixed to show the state itself.
export default defineComponent(() => {
  const [unchecked, _setUnchecked] = createSignal(false);
  const [checked, _setChecked] = createSignal(true);
  return (
    <div id="story">
      <ICheckbox label="Unchecked" $bind:checked={unchecked} />
      <ICheckbox label="Checked" $bind:checked={checked} />
      <ICheckbox indeterminate label="Indeterminate" />
      <ICheckbox disabled label="Disabled" />
      <ICheckbox checked disabled label="Checked disabled" />
    </div>
  );
});
