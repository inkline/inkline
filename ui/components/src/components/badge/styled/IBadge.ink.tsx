import { defineComponent, Slot, createMemo } from "@inkline/core";
import IBadgeBase, { type BadgeBaseProps } from "../headless/IBadgeBase.ink.tsx";
import { badgeRecipe, type BadgeRecipeProps as BadgeStylingProps } from "virtual:styleframe";

export interface BadgeProps extends BadgeBaseProps, BadgeStylingProps {}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: BadgeProps) => {
    const className = createMemo(() =>
      badgeRecipe({ color: props.color, variant: props.variant, size: props.size }),
    );
    return (
      <IBadgeBase class={className()}>
        <Slot>{props.label}</Slot>
      </IBadgeBase>
    );
  },
);
