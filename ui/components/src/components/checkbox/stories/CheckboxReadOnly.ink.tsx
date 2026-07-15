import { defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// Read-only boxes stay focusable and announce `aria-readonly`, but their value is fixed at render —
// clicking or pressing space does not toggle them.
export default defineComponent(() => {
  return (
    <div id="story">
      <ICheckbox readonly checked label="Read-only checked" />
      <ICheckbox readonly label="Read-only unchecked" />
    </div>
  );
});
