import { defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ISwitch size="sm" label="Small" />
      <ISwitch size="md" label="Medium" />
      <ISwitch size="lg" label="Large" />
    </div>
  );
});
