import { defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ISwitch label="Off" checked={false} />
      <ISwitch label="On" checked={true} />
      <ISwitch label="Disabled off" disabled={true} checked={false} />
      <ISwitch label="Disabled on" disabled={true} checked={true} />
    </div>
  );
});
