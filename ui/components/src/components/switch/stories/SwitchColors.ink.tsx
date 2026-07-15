import { defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ISwitch color="light" label="Light" />
      <ISwitch color="dark" label="Dark" />
      <ISwitch color="neutral" label="Neutral" />
    </div>
  );
});
