import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";
import IInputControl from "../styled/IInputControl.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IInput invalid={true}>
        <IInputControl placeholder="Invalid" />
      </IInput>
      <IInput disabled={true}>
        <IInputControl placeholder="Disabled" disabled={true} />
      </IInput>
      <IInput readonly={true}>
        <IInputControl value="Read only" readonly={true} />
      </IInput>
    </div>
  );
});
