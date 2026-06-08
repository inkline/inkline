import { defineComponent, defineModel } from "@inkline/core";
import IInputControlBase, {
  type InputControlBaseProps,
} from "../headless/IInputControlBase.ink.tsx";

export interface InputControlProps extends InputControlBaseProps {}

export default defineComponent((props: InputControlProps) => {
  // Expose the two-way value and forward it to the headless control via `$bind:value`. The setter is
  // consumed by the `$bind:` forward (the compiler wires it to the child's update event), so it is
  // unused in source — hence the `_` prefix.
  const [value, _setValue] = defineModel<string>("value");

  return (
    <IInputControlBase
      id={props.id}
      name={props.name}
      type={props.type}
      $bind:value={value}
      placeholder={props.placeholder}
      disabled={props.disabled}
      readonly={props.readonly}
    />
  );
});
