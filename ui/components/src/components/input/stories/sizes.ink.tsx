import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";
import IInputControl from "../styled/IInputControl.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IInput size="sm">
        <IInputControl placeholder="Small" />
      </IInput>
      <IInput size="md">
        <IInputControl placeholder="Medium" />
      </IInput>
      <IInput size="lg">
        <IInputControl placeholder="Large" />
      </IInput>
    </div>
  );
});
