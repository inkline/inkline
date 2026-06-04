import { defineComponent, Slot, createMemo } from "@inkline/core";
import IInputSuffixBase, { type InputSuffixBaseProps } from "../headless/IInputSuffixBase.ink.tsx";
import { inputSuffix, type InputSuffixProps as InputSuffixStylingProps } from "virtual:styleframe";

export interface InputSuffixProps extends InputSuffixBaseProps, InputSuffixStylingProps {}

export default defineComponent({ slots: { default: {} } }, (props: InputSuffixProps) => {
  const className = createMemo(() => inputSuffix({ size: props.size }));
  return (
    <IInputSuffixBase class={className()}>
      <Slot />
    </IInputSuffixBase>
  );
});
