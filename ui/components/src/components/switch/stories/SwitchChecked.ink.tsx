import { defineComponent } from "@inkline/core";
import ISwitch from "../styled/ISwitch.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ISwitch label="Off" checked={false} />
      <ISwitch label="On" checked={true} />
    </div>
  );
});
