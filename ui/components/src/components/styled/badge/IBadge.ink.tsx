import { defineComponent } from "@inkline/core";
import BadgeBase, { type BadgeBaseProps } from "../../headless/badge/IBadgeBase.ink.tsx";
import { badge, type BadgeProps as BadgeStylingProps } from 'virtual:styleframe';

export interface BadgeProps extends BadgeBaseProps, BadgeStylingProps {
}

export default defineComponent((props: BadgeBaseProps) => {
  return <BadgeBase class={badge(props)}>{props.label}</BadgeBase>;
});
