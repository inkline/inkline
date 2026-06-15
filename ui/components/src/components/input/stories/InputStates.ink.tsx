import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IInput invalid={true} placeholder="Invalid" />
      <IInput disabled={true} placeholder="Disabled" />
      <IInput readonly={true} value="Read only" />
    </div>
  );
});
