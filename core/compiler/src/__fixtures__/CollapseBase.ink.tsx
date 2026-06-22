import { defineComponent, Slot } from "@inkline/core";

// Headless base for the styled-collapse test: a single static `<button>` root with a base class, a
// forwarded KEEP_PROPERTY prop, and a default slot. A styled sibling (CollapseStyled) collapses onto
// this root via the cross-file headless registry.
export interface CollapseBaseProps {
  label?: string;
  disabled?: boolean;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CollapseBaseProps) => {
    return (
      <button class="cb" disabled={props.disabled}>
        <Slot>{props.label}</Slot>
      </button>
    );
  },
);
