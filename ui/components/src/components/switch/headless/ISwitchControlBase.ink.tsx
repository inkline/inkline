import { defineComponent, defineModel } from "@inkline/core";

export interface SwitchControlBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control (form submission). */
  name?: string;
  /** Disables the control. */
  disabled?: boolean;
}

// The native toggle: an `<input type="checkbox">` styled (via `.switch-field`) as a sliding switch.
// A single static root, so it host-extracts to `input[ink-switch-control-base]`. `role="switch"` +
// `aria-checked` announce it as a switch; the browser toggles on Space natively, and Enter is
// handled explicitly to complete the APG switch keyboard map.
export default defineComponent({ meta: { headless: true } }, (props: SwitchControlBaseProps) => {
  // Two-way-bindable on/off state: a `checked` prop + an `update:checked` event, so a parent can
  // `$bind:checked`.
  const [checked, setChecked] = defineModel<boolean>("checked");

  return (
    <input
      class="switch-field"
      type="checkbox"
      role="switch"
      id={props.id}
      name={props.name}
      checked={checked() ?? false}
      aria-checked={checked() ? "true" : "false"}
      disabled={props.disabled}
      onChange={(e: { currentTarget: HTMLInputElement }) => setChecked(e.currentTarget.checked)}
      // Space toggles the checkbox natively; Enter does not, so complete the APG switch keyboard map
      // by synthesising the native click on Enter (which flips the box and fires `onChange` →
      // `setChecked`). A single guarded expression (arrow body, not a block statement) so it survives
      // Angular's event bindings, which carry only a single expression.
      onKeyDown={(e: { key: string; currentTarget: HTMLInputElement }) =>
        e.key === "Enter" && e.currentTarget.click()
      }
    />
  );
});
