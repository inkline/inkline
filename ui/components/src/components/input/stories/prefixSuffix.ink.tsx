import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";
import IInputControl from "../styled/IInputControl.ink.tsx";
import IInputPrefix from "../styled/IInputPrefix.ink.tsx";
import IInputSuffix from "../styled/IInputSuffix.ink.tsx";

export default defineComponent(() => {
  return (
    <IInput color="light" size="md">
      <IInputPrefix>$</IInputPrefix>
      <IInputControl name="amount" type="text" placeholder="0.00" />
      <IInputSuffix>USD</IInputSuffix>
    </IInput>
  );
});
