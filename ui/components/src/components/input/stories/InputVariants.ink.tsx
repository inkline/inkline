import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IInput variant="default" placeholder="Default" />
      <IInput variant="soft" placeholder="Soft" />
      <IInput variant="ghost" placeholder="Ghost" />
    </div>
  );
});
