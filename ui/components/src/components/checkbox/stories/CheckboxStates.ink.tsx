import { defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// Every meaningful state at a glance: unchecked, checked, the mixed (indeterminate)
// state, and disabled in both checked and unchecked positions.
export default defineComponent(() => {
  return (
    <div id="story">
      <ICheckbox label="Unchecked" />
      <ICheckbox checked label="Checked" />
      <ICheckbox indeterminate label="Indeterminate" />
      <ICheckbox disabled label="Disabled" />
      <ICheckbox checked disabled label="Checked disabled" />
    </div>
  );
});
