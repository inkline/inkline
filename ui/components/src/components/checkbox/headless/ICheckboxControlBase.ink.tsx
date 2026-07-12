import { defineComponent, defineModel } from "@inkline/core";

export interface CheckboxControlBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control. */
  name?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Marks the control as required (must be checked to submit). */
  required?: boolean;
  /** Renders the partially-checked ("mixed") state. */
  indeterminate?: boolean;
}

// The native `<input type="checkbox">` control: a single static root, so it host-extracts to
// `input[ink-checkbox-control-base]`. `checked` is two-way (a `checked` prop + an `update:checked`
// event, so a parent can `$bind:checked`); its setter reads the event's `currentTarget.checked`.
//
// `indeterminate` is bound as an attribute: Vue/Solid/Svelte/Qwik/Angular resolve it to the DOM IDL
// property (`el.indeterminate`), which drives the recipe's `:indeterminate` box and auto-exposes
// `aria-checked="mixed"`. React alone renders it as an inert HTML attribute — the IDL property needs
// a ref there — so the indeterminate visual/mixed-state does not surface on the React target yet.
// The ideal fix (a `createRef` + `createEffect` that assigns `el.indeterminate`) is blocked by a
// compiler ref/effect ordering defect (filed to @atlas); until it lands, the attribute binding is
// the crash-free path that is correct on the other six targets.
export default defineComponent({ meta: { headless: true } }, (props: CheckboxControlBaseProps) => {
  const [checked, setChecked] = defineModel<boolean>("checked");

  return (
    <input
      class="checkbox-field"
      type="checkbox"
      id={props.id}
      name={props.name}
      checked={checked() ?? false}
      indeterminate={props.indeterminate ?? false}
      disabled={props.disabled}
      required={props.required}
      onChange={(e: { currentTarget: HTMLInputElement }) => setChecked(e.currentTarget.checked)}
    />
  );
});
