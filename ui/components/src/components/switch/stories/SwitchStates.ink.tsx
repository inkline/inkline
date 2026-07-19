import { createSignal, defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

// The two enabled switches are live; the disabled pair keep their seeded state (disabled controls
// don't take input) to show the off/on disabled appearance.
export default defineComponent(() => {
  const [off, _setOff] = createSignal(false);
  const [on, _setOn] = createSignal(true);
  const [disabledOff, _setDisabledOff] = createSignal(false);
  const [disabledOn, _setDisabledOn] = createSignal(true);
  return (
    <div id="story">
      <ISwitch label="Off" $bind:checked={off} />
      <ISwitch label="On" $bind:checked={on} />
      <ISwitch label="Disabled off" disabled={true} $bind:checked={disabledOff} />
      <ISwitch label="Disabled on" disabled={true} $bind:checked={disabledOn} />
    </div>
  );
});
