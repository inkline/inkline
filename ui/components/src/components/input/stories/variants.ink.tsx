import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";
import IInputControl from "../styled/IInputControl.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IInput variant="default">
        <IInputControl placeholder="Default" />
      </IInput>
      <IInput variant="soft">
        <IInputControl placeholder="Soft" />
      </IInput>
      <IInput variant="ghost">
        <IInputControl placeholder="Ghost" />
      </IInput>
    </div>
  );
});
