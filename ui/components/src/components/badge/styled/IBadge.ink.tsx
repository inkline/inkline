import { defineComponent, Slot } from "@inkline/core";
import IBadgeBase, { type BadgeBaseProps } from "../headless/IBadgeBase.ink.tsx";
import { badge, type BadgeProps as BadgeStylingProps } from "virtual:styleframe";

export interface BadgeProps extends BadgeBaseProps, BadgeStylingProps {}

export default defineComponent({ slots: { default: {} } }, (props: BadgeProps) => {
  return (
    <IBadgeBase class={badge(props as BadgeStylingProps)}>
      <Slot>{props.label}</Slot>
    </IBadgeBase>
  );
});
