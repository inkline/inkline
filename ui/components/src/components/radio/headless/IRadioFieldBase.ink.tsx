import { defineComponent, defineEmits } from "@inkline/core";

export interface RadioFieldBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Shared control name — radios with the same name are mutually exclusive. */
  name?: string;
  /** The value submitted when this radio is selected. */
  value?: string;
  /** Whether this radio is selected. */
  checked?: boolean;
  /** Disables the control. */
  disabled?: boolean;
  /** Marks the control as required. */
  required?: boolean;
  /**
   * Prevents the selection from changing while still showing (and keeping focusable) the current
   * state. Native radios ignore the HTML `readonly` attribute, so this is enforced behaviorally:
   * the click is cancelled and the `change` event is suppressed.
   */
  readonly?: boolean;
}

// The native `<input type="radio">` control: a single static root, so it host-extracts to
// `input[ink-radio-field-base]`. Native radio gives `role="radio"`, `aria-checked` (from `checked`),
// Arrow-key roving focus, and single-selection for free when siblings share a `name`. It is
// controlled — `checked` is driven by the parent — and reports selection through a `change` event.
export default defineComponent({ meta: { headless: true } }, (props: RadioFieldBaseProps) => {
  // Selection is reported up as a semantic `change` event carrying this radio's value; the parent
  // group maps it to its two-way `value`. (Custom events are inert on static Astro — INK0045.)
  const emit = defineEmits<{ change: [value: string] }>();

  return (
    <input
      class="radio-field"
      type="radio"
      id={props.id}
      name={props.name}
      value={props.value ?? ""}
      checked={props.checked}
      disabled={props.disabled}
      required={props.required}
      onClick={(e: { preventDefault: () => void }) => props.readonly && e.preventDefault()}
      onChange={() => !props.readonly && emit("change", props.value ?? "")}
    />
  );
});
