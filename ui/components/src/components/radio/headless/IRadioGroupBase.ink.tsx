import { defineComponent, Slot } from "@inkline/core";

export interface RadioGroupBaseProps {
  /** Id of the group element. */
  id?: string;
  /** Accessible name for the group, exposed as `aria-label`. */
  label?: string;
  /** Marks the whole group read-only — exposed as `aria-readonly` on the radiogroup. */
  readonly?: boolean;
}

// The radiogroup container: a single static `<div role="radiogroup">` root, so it host-extracts to
// `div[ink-radio-group-base]` and a styled parent's recipe `class` falls through onto it. It holds
// no state — the selected value lives on the styled `IRadioGroup`; mutual exclusivity comes from the
// child radios sharing a native `name`. `readonly` is surfaced as `aria-readonly` here (the ARIA
// state the `radiogroup` role supports); the interaction guard lives on each radio field.
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: RadioGroupBaseProps) => {
    return (
      <div
        class="radio-group"
        role="radiogroup"
        id={props.id}
        aria-label={props.label}
        aria-readonly={props.readonly ? "true" : undefined}
      >
        <Slot />
      </div>
    );
  },
);
