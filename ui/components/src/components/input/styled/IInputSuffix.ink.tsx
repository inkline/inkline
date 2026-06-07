import { defineComponent, Slot, createMemo } from "@inkline/core";
import IInputSuffixBase, { type InputSuffixBaseProps } from "../headless/IInputSuffixBase.ink.tsx";
import {
  inputSuffixRecipe,
  type InputSuffixRecipeProps as InputSuffixStylingProps,
} from "virtual:styleframe";

export interface InputSuffixProps extends InputSuffixBaseProps, InputSuffixStylingProps {}

export default defineComponent({ slots: { default: {} } }, (props: InputSuffixProps) => {
  const className = createMemo(() => inputSuffixRecipe({ size: props.size }));
  return (
    <IInputSuffixBase class={className()}>
      <Slot />
    </IInputSuffixBase>
  );
});
