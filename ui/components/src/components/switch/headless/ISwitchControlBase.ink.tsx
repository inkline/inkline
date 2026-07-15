import { defineComponent, defineModel } from "@inkline/core";

export interface SwitchControlBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control (form submission). */
  name?: string;
  /** Disables the control. */
  disabled?: boolean;
  /**
   * Marks the control read-only: announces `aria-readonly` and suppresses the toggle while keeping
   * the switch focusable and form-submittable (unlike `disabled`). A native checkbox ignores the
   * HTML `readonly` attribute, so this is enforced behaviourally.
   */
  readonly?: boolean;
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
      aria-readonly={props.readonly ? "true" : undefined}
      disabled={props.disabled}
      onChange={(e: { currentTarget: HTMLInputElement }) => setChecked(e.currentTarget.checked)}
      // Read-only enforcement: cancel the click's default action so the box can't flip. Mouse click,
      // Space (the browser fires a click), and Enter (synthesised as a click below) all funnel through
      // here, so one guard covers the whole keyboard/pointer map — and because the toggle never
      // happens, `onChange` never fires, leaving the two-way model untouched. `onChange` is left as-is
      // on purpose: guarding it with `&&` would collide with the Vue/Svelte model-set lowering (`= …`).
      // Focus and form submission are unaffected (unlike `disabled`). A single guarded expression so it
      // survives Angular's event bindings, which carry only one expression.
      onClick={(e: { preventDefault: () => void }) => props.readonly && e.preventDefault()}
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
