import { createSignal, defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

// Disabled demonstrates the non-interactive state: the control keeps its bound value but a disabled
// switch takes no input, so it does not toggle — that is the point of this story.
export default defineComponent(() => {
  const [checked, _setChecked] = createSignal(false);
  return (
    <div id="story">
      <ISwitch label="Airplane mode" disabled={true} $bind:checked={checked} />
    </div>
  );
});
