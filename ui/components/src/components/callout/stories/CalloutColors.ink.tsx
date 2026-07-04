import { defineComponent } from "@inkline/core";
import ICallout from "../styled/ICallout.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ICallout color="primary" label="Primary" />
      <ICallout color="secondary" label="Secondary" />
      <ICallout color="success" label="Success" />
      <ICallout color="info" label="Info" />
      <ICallout color="warning" label="Warning" />
      <ICallout color="error" label="Error" />
      <ICallout color="light" label="Light" />
      <ICallout color="dark" label="Dark" />
      <ICallout color="neutral" label="Neutral" />
    </div>
  );
});
