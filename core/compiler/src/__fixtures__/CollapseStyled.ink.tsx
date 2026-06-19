import { defineComponent, Slot, createMemo } from "@inkline/core";
import CollapseBase, { type CollapseBaseProps } from "./CollapseBase.ink.tsx";

// Styled wrapper whose entire render is a single headless child. Marked `meta.headless` to opt into
// the Angular collapse: its element-selector wrapper stays, and a second attribute-selector variant
// inlines CollapseBase's root as the host, merging this recipe class. Uses a local memo (not a
// styleframe recipe) to keep the fixture self-contained.
export interface CollapseStyledProps extends CollapseBaseProps {
  variant?: "solid" | "outline";
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CollapseStyledProps) => {
    const className = createMemo(() => (props.variant === "outline" ? "cb--outline" : "cb--solid"));
    return (
      <CollapseBase class={className()} disabled={props.disabled}>
        <Slot>{props.label}</Slot>
      </CollapseBase>
    );
  },
);
