import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";
import IInputControl from "../styled/IInputControl.ink.tsx";
import IInputGroup from "../styled/IInputGroup.ink.tsx";
import IInputPrepend from "../styled/IInputPrepend.ink.tsx";
import IInputAppend from "../styled/IInputAppend.ink.tsx";

export default defineComponent(() => {
  return (
    <IInputGroup size="md">
      <IInputPrepend>https://</IInputPrepend>
      <IInput>
        <IInputControl name="site" type="text" placeholder="example" />
      </IInput>
      <IInputAppend>.com</IInputAppend>
    </IInputGroup>
  );
});
