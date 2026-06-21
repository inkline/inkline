import { defineComponent, Slot, createMemo } from "@inkline/core";
import CollapseUnforwardedBase, {
  type CollapseUnforwardedBaseProps,
} from "./CollapseUnforwardedBase.ink.tsx";

// Styled wrapper that collapses onto the base but forwards only `class` — NOT `id` (it declares `id`
// via the inherited props). The collapsed host variant must therefore omit `[attr.id]` rather than
// leaking this wrapper's `id` onto the shell.
export interface CollapseUnforwardedStyledProps extends CollapseUnforwardedBaseProps {
  variant?: "solid" | "outline";
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CollapseUnforwardedStyledProps) => {
    const className = createMemo(() => (props.variant === "outline" ? "cu--outline" : "cu--solid"));
    return (
      <CollapseUnforwardedBase class={className()}>
        <Slot>{props.label}</Slot>
      </CollapseUnforwardedBase>
    );
  },
);
