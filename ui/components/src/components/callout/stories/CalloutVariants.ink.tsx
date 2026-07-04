import { defineComponent } from "@inkline/core";
import ICallout from "../styled/ICallout.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ICallout color="info" variant="solid" label="Solid" />
      <ICallout color="info" variant="outline" label="Outline" />
      <ICallout color="info" variant="soft" label="Soft" />
      <ICallout color="info" variant="subtle" label="Subtle" />
    </div>
  );
});
