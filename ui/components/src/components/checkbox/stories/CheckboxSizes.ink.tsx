import { createSignal, defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// Each box owns its own signal via `$bind:checked`, so every one toggles independently.
export default defineComponent(() => {
  const [small, _setSmall] = createSignal(true);
  const [medium, _setMedium] = createSignal(true);
  const [large, _setLarge] = createSignal(true);
  return (
    <div id="story">
      <ICheckbox size="sm" label="Small" $bind:checked={small} />
      <ICheckbox size="md" label="Medium" $bind:checked={medium} />
      <ICheckbox size="lg" label="Large" $bind:checked={large} />
    </div>
  );
});
