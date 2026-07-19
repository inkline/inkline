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
  /** Marks the control as read-only: it stays focusable but the value cannot be toggled. */
  readonly?: boolean;
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
//     the prop is inert). It is redundant-but-harmless on the property-binding targets, including
//     Angular, where the compiler unwraps the element ref to `.nativeElement`.
//
// `readonly` has no native effect on a checkbox (the HTML `readonly` attribute is ignored for the
// checkbox type), so read-only is expressed with `aria-readonly` and enforced by cancelling the click
// default — which stops both the toggle and the `change` that would follow. The guard is written as a
// single expression (`props.readonly && e.preventDefault()`) so Angular's template codegen can inline
// it; a block body collapses to an empty `(click)=""` there. Correct on all seven targets: React's
// host-only attribute canonicalisation (INK-26 / #515) forwards the `readonly` prop verbatim across
// the styled→headless boundary, so the value reaches this control everywhere.
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
      aria-readonly={props.readonly ? "true" : undefined}
      onClick={(e: { preventDefault: () => void }) => props.readonly && e.preventDefault()}
      onChange={(e: { currentTarget: HTMLInputElement }) => setChecked(e.currentTarget.checked)}
    />
  );
});
