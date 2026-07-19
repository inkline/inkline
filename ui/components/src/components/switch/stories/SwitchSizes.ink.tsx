import { createSignal, defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

// Each size switch is live via `$bind:checked`; toggle any of them and the bound signal flips.
export default defineComponent(() => {
  const [sm, _setSm] = createSignal(false);
  const [md, _setMd] = createSignal(false);
  const [lg, _setLg] = createSignal(false);
  return (
    <div id="story">
      <ISwitch size="sm" label="Small" $bind:checked={sm} />
      <ISwitch size="md" label="Medium" $bind:checked={md} />
      <ISwitch size="lg" label="Large" $bind:checked={lg} />
    </div>
  );
});
