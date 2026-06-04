import { defineComponent, Slot, createMemo } from "@inkline/core";
import IInputGroupBase, { type InputGroupBaseProps } from "../headless/IInputGroupBase.ink.tsx";
import { inputGroup, type InputGroupProps as InputGroupStylingProps } from "virtual:styleframe";

export interface InputGroupProps extends InputGroupBaseProps, InputGroupStylingProps {}

export default defineComponent({ slots: { default: {} } }, (props: InputGroupProps) => {
  const className = createMemo(() => inputGroup({ size: props.size }));
  return (
    <IInputGroupBase class={className()} id={props.id}>
      <Slot />
    </IInputGroupBase>
  );
});
