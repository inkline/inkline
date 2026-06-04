import { defineComponent, Slot, createMemo } from "@inkline/core";
import IInputPrefixBase, { type InputPrefixBaseProps } from "../headless/IInputPrefixBase.ink.tsx";
import {
  inputPrefixRecipe,
  type InputPrefixRecipeProps as InputPrefixStylingProps,
} from "virtual:styleframe";

export interface InputPrefixProps extends InputPrefixBaseProps, InputPrefixStylingProps {}

export default defineComponent({ slots: { default: {} } }, (props: InputPrefixProps) => {
  const className = createMemo(() => inputPrefixRecipe({ size: props.size }));
  return (
    <IInputPrefixBase class={className()}>
      <Slot />
    </IInputPrefixBase>
  );
});
