import { createSignal, defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// Each box owns its own signal via `$bind:checked`, so every one toggles independently.
export default defineComponent(() => {
  const [light, _setLight] = createSignal(true);
  const [dark, _setDark] = createSignal(true);
  const [neutral, _setNeutral] = createSignal(true);
  return (
    <div id="story">
      <ICheckbox color="light" label="Light" $bind:checked={light} />
      <ICheckbox color="dark" label="Dark" $bind:checked={dark} />
      <ICheckbox color="neutral" label="Neutral" $bind:checked={neutral} />
    </div>
  );
});
