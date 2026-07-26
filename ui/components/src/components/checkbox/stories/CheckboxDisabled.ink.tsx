import { createSignal, defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// Disabled demonstrates the non-interactive state: the box keeps its bound value but a disabled
// checkbox takes no input, so it does not toggle — that is the point of this story.
export default defineComponent(() => {
  const [checked, _setChecked] = createSignal(false);
  return (
    <div id="story">
      <ICheckbox label="Accept terms" disabled={true} $bind:checked={checked} />
    </div>
  );
});
