import { defineComponent, Slot, createMemo } from "@inkline/core";
import IInputBase, { type InputBaseProps } from "../headless/IInputBase.ink.tsx";
import { inputRecipe, type InputRecipeProps as InputStylingProps } from "virtual:styleframe";

export interface InputProps extends InputBaseProps, InputStylingProps {}

export default defineComponent({ slots: { default: {} } }, (props: InputProps) => {
  const className = createMemo(() =>
    inputRecipe({
      color: props.color,
      variant: props.variant,
      size: props.size,
      invalid: props.invalid,
      disabled: props.disabled,
      readonly: props.readonly,
    }),
  );
  return (
    <IInputBase class={className()} id={props.id}>
      <Slot />
    </IInputBase>
  );
});
