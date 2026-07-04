import { defineComponent } from "@inkline/core";
import ICallout from "../styled/ICallout.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ICallout size="sm" label="Small" />
      <ICallout size="md" label="Medium" />
      <ICallout size="lg" label="Large" />
    </div>
  );
});
