import { defineComponent, Slot } from "@inkline/core";

export interface SwitchBaseProps {}

// The switch shell: a `<label>` that wraps the control and its text, so clicking anywhere on the
// label toggles the field (implicit label association) and the label text supplies the accessible
// name. Single static root, so it host-extracts to `label[ink-switch-base]` and the styled `class`
// falls through to it.
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (_props: SwitchBaseProps) => {
    return (
      <label class="switch">
        <Slot />
      </label>
    );
  },
);
