import { defineComponent } from "@inkline/core";
import IBadgeBase, { type BadgeBaseProps } from "../../headless/badge/IBadgeBase.ink.tsx";
import { badge, type BadgeProps as BadgeStylingProps } from "virtual:styleframe";

export interface BadgeProps extends BadgeBaseProps, BadgeStylingProps {}

export default defineComponent((props: BadgeProps) => {
  return <IBadgeBase class={badge(props as BadgeStylingProps)}>{props.label}</IBadgeBase>;
});
