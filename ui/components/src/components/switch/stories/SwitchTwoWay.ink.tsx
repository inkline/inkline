import { createSignal, defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

// Two-way binding: toggling the switch updates `on`, reflected live below.
export default defineComponent(() => {
  const [on, _setOn] = createSignal(false);
  return (
    <div id="story">
      <ISwitch label="Airplane mode" name="airplane" $bind:checked={on} />
      <p>Airplane mode is {on() ? "on" : "off"}.</p>
    </div>
  );
});
