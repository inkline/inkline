import { createSignal, defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

// Each colour switch is live and seeded off so its off-state track colour shows; toggle any of them
// and the bound signal flips.
export default defineComponent(() => {
  const [light, _setLight] = createSignal(false);
  const [dark, _setDark] = createSignal(false);
  const [neutral, _setNeutral] = createSignal(false);
  return (
    <div id="story">
      <ISwitch color="light" label="Light" $bind:checked={light} />
      <ISwitch color="dark" label="Dark" $bind:checked={dark} />
      <ISwitch color="neutral" label="Neutral" $bind:checked={neutral} />
    </div>
  );
});
