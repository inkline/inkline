import { defineComponent, Slot } from "@inkline/core";
import IInputAppendBase, { type InputAppendBaseProps } from "../headless/IInputAppendBase.ink.tsx";
import { inputAppendRecipe } from "virtual:styleframe";

// The `input-append` recipe has no variant axes (its styling props type is empty),
// so there is nothing to merge in from styleframe — extend only the base props.
export interface InputAppendProps extends InputAppendBaseProps {}

export default defineComponent({ slots: { default: {} } }, (_props: InputAppendProps) => {
  return (
    <IInputAppendBase class={inputAppendRecipe()}>
      <Slot />
    </IInputAppendBase>
  );
});
