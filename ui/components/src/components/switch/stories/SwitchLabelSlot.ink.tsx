import { defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

// Parity: the `label` prop and the default slot resolve to the same accessible name; the slot wins
// when both are present.
export default defineComponent(() => {
  return (
    <div id="story">
      <ISwitch label="Label via prop" />
      <ISwitch>Label via slot</ISwitch>
    </div>
  );
});
