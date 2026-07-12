import { defineComponent, Slot } from "@inkline/core";

export interface SwitchLabelBaseProps {}

// The switch's text container. Sits after the control inside the shell `<label>`; the `switch`
// recipe owns the gap and typography. Rendered unconditionally by the styled component and collapsed
// via a `.switch-label:empty` CSS rule when no label is supplied, so an unlabelled switch leaves no
// trailing gap on every target (no `hasSlot` needed).
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (_props: SwitchLabelBaseProps) => {
    return (
      <span class="switch-label">
        <Slot />
      </span>
    );
  },
);
