import { createSignal, defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

// Parity: the `label` prop and the default slot resolve to the same accessible name; the slot wins
// when both are present. Both switches are live via `$bind:checked` so the accessible name is
// demonstrated on a real, toggleable control.
export default defineComponent(() => {
  const [viaProp, _setViaProp] = createSignal(false);
  const [viaSlot, _setViaSlot] = createSignal(false);
  return (
    <div id="story">
      <ISwitch label="Label via prop" $bind:checked={viaProp} />
      <ISwitch $bind:checked={viaSlot}>Label via slot</ISwitch>
    </div>
  );
});
