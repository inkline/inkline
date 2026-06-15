import { defineComponent } from "@inkline/core";
import IButton from "../styled/IButton.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IButton>
        <span aria-hidden="true">★</span> Starred
      </IButton>
      <IButton color="primary">
        <span aria-hidden="true">→</span> Continue
      </IButton>
    </div>
  );
});
