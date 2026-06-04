import { defineComponent, Slot } from "@inkline/core";
import IInputPrependBase, {
  type InputPrependBaseProps,
} from "../headless/IInputPrependBase.ink.tsx";
import { inputPrepend } from "virtual:styleframe";

// The `input-prepend` recipe has no variant axes (its styling props type is empty),
// so there is nothing to merge in from styleframe — extend only the base props.
export interface InputPrependProps extends InputPrependBaseProps {}

export default defineComponent({ slots: { default: {} } }, (_props: InputPrependProps) => {
  return (
    <IInputPrependBase class={inputPrepend()}>
      <Slot />
    </IInputPrependBase>
  );
});
