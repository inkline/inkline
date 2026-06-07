import { defineComponent, Slot, createMemo } from "@inkline/core";
import IButtonBase, { type ButtonBaseProps } from "../headless/IButtonBase.ink.tsx";
import { buttonRecipe, type ButtonRecipeProps as ButtonStylingProps } from "virtual:styleframe";

export interface ButtonProps extends ButtonBaseProps, ButtonStylingProps {
  block?: boolean;
}

export default defineComponent({ slots: { default: {} } }, (props: ButtonProps) => {
  const className = createMemo(() =>
    [
      buttonRecipe({ color: props.color, variant: props.variant, size: props.size }),
      props.block && "button--block",
    ]
      .filter(Boolean)
      .join(" "),
  );
  return (
    <IButtonBase
      class={className()}
      type={props.type}
      disabled={props.disabled}
      loading={props.loading}
    >
      <Slot>{props.label}</Slot>
    </IButtonBase>
  );
});
