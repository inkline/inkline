import { defineComponent } from "@inkline/core";
import IInputControlBase, {
  type InputControlBaseProps,
} from "../headless/IInputControlBase.ink.tsx";

export interface InputControlProps extends InputControlBaseProps {}

export default defineComponent((props: InputControlProps) => {
  return (
    <IInputControlBase
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      disabled={props.disabled}
      readonly={props.readonly}
    />
  );
});
