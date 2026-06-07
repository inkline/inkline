import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";
import IInputControl from "../styled/IInputControl.ink.tsx";

export default defineComponent(() => {
  return (
    <IInput size="md">
      <IInputControl name="bio" type="textarea" placeholder="Tell us about yourself" />
    </IInput>
  );
});
