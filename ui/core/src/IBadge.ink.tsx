// @ts-nocheck
import { defineComponent } from "@inkline/core";

export interface BadgeProps {
  label: string;
  variant?: string;
}

export default defineComponent((props: { label: string; variant?: string }) => {
  return (
    <span class={props.variant ? `badge badge--${props.variant}` : "badge"}>{props.label}</span>
  );
});
