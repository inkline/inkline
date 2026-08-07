import { defineComponent, Slot, defineEmits } from "@inkline/core";

export interface SelectOptionBaseProps {
  /** Id of the option element (referenced by the trigger's `aria-activedescendant`). */
  id?: string;
  /** Whether this option is the selected value, exposed as `aria-selected`. */
  selected?: boolean;
  /** Whether this option is virtually focused, exposed as `data-active`. */
  active?: boolean;
  /** Disables this option, exposed as `aria-disabled` (selection guarded). */
  disabled?: boolean;
}

// A single Select option: a single static `<li role="option">` root, so it host-extracts to
// `li[ink-select-option-base]` and a styled parent's recipe `class` falls through onto the
// `.select-option`. Selection state is `aria-selected`; the keyboard-active row is `data-active`;
// disabled is `aria-disabled` (and selection is guarded here so a disabled option can't emit
// `select`). DOM events are reported up as semantic emits — `select` (pointer activation) and
// `activate` (pointer hover, to sync the active row with the mouse). The trailing
// `.select-option-check` is revealed by the recipe when the row is `aria-selected`.
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: SelectOptionBaseProps) => {
    const emit = defineEmits<{ select: []; activate: [] }>();

    return (
      <li
        class="select-option"
        role="option"
        id={props.id}
        aria-selected={props.selected ? "true" : "false"}
        aria-disabled={props.disabled ? "true" : undefined}
        data-active={props.active ? "true" : "false"}
        onClick={() => !props.disabled && emit("select")}
        onMouseEnter={() => !props.disabled && emit("activate")}
      >
        <Slot />
        <span class="select-option-check" aria-hidden="true" />
      </li>
    );
  },
);
