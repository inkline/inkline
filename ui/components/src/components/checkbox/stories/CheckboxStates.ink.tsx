import { createSignal, defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// Every meaningful state at a glance. The enabled boxes are live; the disabled pair keep their seeded
// state (disabled boxes don't take input) to show the off/on disabled appearance. Every box drives its
// value through a `$bind:checked` signal — never a bare `checked` attribute — so the seeded state
// renders identically on all seven targets.
export default defineComponent(() => {
  const [unchecked, _setUnchecked] = createSignal(false);
  const [checked, _setChecked] = createSignal(true);
  const [mixed, _setMixed] = createSignal(false);
  const [disabledOff, _setDisabledOff] = createSignal(false);
  const [disabledOn, _setDisabledOn] = createSignal(true);
  return (
    <div id="story">
      <ICheckbox label="Unchecked" $bind:checked={unchecked} />
      <ICheckbox label="Checked" $bind:checked={checked} />
      <ICheckbox label="Indeterminate" indeterminate={true} $bind:checked={mixed} />
      <ICheckbox label="Disabled" disabled={true} $bind:checked={disabledOff} />
      <ICheckbox label="Checked disabled" disabled={true} $bind:checked={disabledOn} />
    </div>
  );
});
