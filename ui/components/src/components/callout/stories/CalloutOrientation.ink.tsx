import { defineComponent } from "@inkline/core";
import ICallout from "../styled/ICallout.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ICallout color="info" orientation="horizontal" icon={<>ℹ</>} label="Horizontal" />
      <ICallout color="info" orientation="vertical" icon={<>ℹ</>} label="Vertical" />
    </div>
  );
});
