import { defineComponent, defineModel, createRef, createEffect } from "@inkline/core";

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
// `indeterminate` is an IDL-only DOM property (there is no reflecting HTML attribute), and it drives
// the recipe's native `:indeterminate` box plus the element's implicit `aria-checked="mixed"`. Two
// binding surfaces together cover every target:
//   - The `indeterminate={…}` prop compiles to a *property* binding on Vue/Solid/Svelte/Qwik/Angular
//     (`el.indeterminate = …`), which is exactly right there. React alone renders it inert.
//   - The `createRef` + `createEffect` assigns `el.indeterminate` imperatively, patching React (where
//     the prop is inert). It is redundant-but-harmless on the property-binding targets, and a no-op
//     on Angular — its element ref is an `ElementRef` the compiler does not yet unwrap to
//     `.nativeElement`, tracked upstream — where the property binding already does the job.
export default defineComponent({ meta: { headless: true } }, (props: CheckboxControlBaseProps) => {
  const [checked, setChecked] = defineModel<boolean>("checked");
  const controlRef = createRef<HTMLInputElement>();

  createEffect(() => {
    const el = controlRef.current;
    if (el) {
      el.indeterminate = props.indeterminate ?? false;
    }
  });

  return (
    <input
      ref={controlRef}
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
