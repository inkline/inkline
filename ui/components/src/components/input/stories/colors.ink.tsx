import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";
import IInputControl from "../styled/IInputControl.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IInput color="light">
        <IInputControl placeholder="Light" />
      </IInput>
      <IInput color="dark">
        <IInputControl placeholder="Dark" />
      </IInput>
      <IInput color="neutral">
        <IInputControl placeholder="Neutral" />
      </IInput>
    </div>
  );
});
