import { createSignal, defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

// The canonical single switch, live via `$bind:checked` — click it and it flips and stays flipped.
export default defineComponent(() => {
  const [checked, _setChecked] = createSignal(false);
  return (
    <div id="story">
      <ISwitch label="Airplane mode" name="airplane" $bind:checked={checked} />
    </div>
  );
});
