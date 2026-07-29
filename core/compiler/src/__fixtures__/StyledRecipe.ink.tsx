import { defineComponent, Slot, createMemo } from "@inkline/core";
import { badge } from "./recipe";

export interface BadgeProps {
  label?: string;
  color?: "primary" | "secondary" | "error";
  size?: "sm" | "md" | "lg";
}

// Real-world styled-component pattern: a module-level styling recipe is computed in a memo
// from a subset of props, then bound on the root. Exercises prop enumeration, memo dependency
// tracking (only the styling props), and default-slot projection with a prop fallback.
export default defineComponent({ slots: { default: {} } }, (props: BadgeProps) => {
  const className = createMemo(() => badge({ color: props.color, size: props.size }));
  return (
    <span class={className()}>
      <Slot>{props.label}</Slot>
    </span>
  );
});
