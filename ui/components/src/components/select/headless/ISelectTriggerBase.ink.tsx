import { defineComponent, Slot, defineEmits } from "@inkline/core";

export interface SelectTriggerBaseProps {
  /** Id of the trigger element. */
  id?: string;
  /** Accessible name, exposed as `aria-label` (use when there is no visible external label). */
  label?: string;
  /** Id of an external visible label, exposed as `aria-labelledby`. */
  labelledBy?: string;
  /** Id of the controlled listbox, exposed as `aria-controls`. */
  controls?: string;
  /** Id of the active (virtually-focused) option, exposed as `aria-activedescendant`. */
  activeDescendant?: string;
  /** Whether the listbox is open, exposed as `aria-expanded` and `data-open`. */
  expanded?: boolean;
  /** Marks the control invalid, exposed as `aria-invalid`. */
  invalid?: boolean;
  /** Disables the control (non-focusable, guarded), exposed as `aria-disabled`. */
  disabled?: boolean;
  /** Whether the displayed value is the placeholder (adds the `-placeholder` value modifier). */
  placeholder?: boolean;
  /** Class applied to the arrow indicator (defaults to the base `select-arrow`). */
  arrowClass?: string;
}

// The Select trigger: a single static `<div role="combobox">` root, so it host-extracts to
// `div[ink-select-trigger-base]` and a styled parent's recipe `class` falls through onto the
// `.select`. A `div` (not a `<button>`) is used deliberately — the select-only combobox pattern
// drives all activation from `keydown`/`click`, so a native button's Enter/Space "click" would
// double-fire against the handlers. `tabindex` makes it focusable (removed when disabled). Rather
// than rely on DOM-handler fallthrough (which Angular does not guarantee onto a child's root), the
// trigger owns its DOM events and reports them up as semantic emits — `toggle` (pointer activation)
// and `navigate` (a key press, carrying `event.key`) — so the styled parent can drive open/active
// state. Combobox keys are `preventDefault`-ed here so the page never scrolls while focused.
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: SelectTriggerBaseProps) => {
    const emit = defineEmits<{ toggle: []; navigate: [key: string] }>();

    return (
      <div
        class="select"
        id={props.id}
        role="combobox"
        tabindex={props.disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={props.expanded ? "true" : "false"}
        aria-controls={props.controls}
        aria-activedescendant={props.activeDescendant}
        aria-label={props.label}
        aria-labelledby={props.labelledBy}
        aria-invalid={props.invalid ? "true" : undefined}
        aria-disabled={props.disabled ? "true" : undefined}
        data-open={props.expanded ? "true" : "false"}
        onClick={() => !props.disabled && emit("toggle")}
        onKeyDown={(e: { key: string; preventDefault: () => void }) => {
          !props.disabled &&
            (e.key === "ArrowDown" ||
              e.key === "ArrowUp" ||
              e.key === "Home" ||
              e.key === "End" ||
              e.key === "Enter" ||
              e.key === " " ||
              e.key === "Escape") &&
            e.preventDefault();
          !props.disabled && emit("navigate", e.key);
        }}
      >
        <span class={props.placeholder ? "select-value -placeholder" : "select-value"}>
          <Slot />
        </span>
        <span
          class={props.arrowClass ?? "select-arrow"}
          aria-hidden="true"
          data-open={props.expanded ? "true" : "false"}
        />
      </div>
    );
  },
);
