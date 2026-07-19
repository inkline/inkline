import { createSignal, defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

// Both switches are live: each owns a signal via `$bind:checked`, so the initial off/on state is
// only the seed — click either and it flips and stays flipped.
export default defineComponent(() => {
  const [off, _setOff] = createSignal(false);
  const [on, _setOn] = createSignal(true);
  return (
    <div id="story">
      <ISwitch label="Off" $bind:checked={off} />
      <ISwitch label="On" $bind:checked={on} />
    </div>
  );
});
