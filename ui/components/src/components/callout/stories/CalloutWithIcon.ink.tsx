import { defineComponent } from "@inkline/core";
import ICallout from "../styled/ICallout.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ICallout color="success" icon={<>✓</>} label="Changes saved successfully." />
      <ICallout color="warning" icon={<>⚠</>} label="Your session is about to expire." />
      <ICallout
        color="error"
        icon={<>✕</>}
        dismissible={true}
        label="Something went wrong. Please retry."
      />
    </div>
  );
});
