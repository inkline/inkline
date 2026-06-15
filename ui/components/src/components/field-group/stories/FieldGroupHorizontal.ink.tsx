import { defineComponent } from "@inkline/core";
import IFieldGroup from "../styled/IFieldGroup.ink.tsx";
import IInput from "../../input/styled/IInput.ink.tsx";
import IButton from "../../button/styled/IButton.ink.tsx";

// Join a control and a button into one unit by making them direct children of the field group — the
// supported replacement for the Input's removed prepend/append addons.
export default defineComponent(() => {
  return (
    <IFieldGroup orientation="horizontal">
      <IInput name="search" type="text" placeholder="Search" />
      <IButton label="Search" color="primary" />
    </IFieldGroup>
  );
});
