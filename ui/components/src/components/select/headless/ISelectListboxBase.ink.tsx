import { defineComponent, Slot } from "@inkline/core";

export interface SelectListboxBaseProps {
  /** Id of the listbox element (referenced by the trigger's `aria-controls`). */
  id?: string;
  /** Id of the labelling element, exposed as `aria-labelledby`. */
  labelledBy?: string;
  /** Accessible name, exposed as `aria-label` (use when there is no labelling element). */
  label?: string;
}

// The Select listbox panel: a single static `<ul role="listbox">` root, so it host-extracts to
// `ul[ink-select-listbox-base]` and a styled parent's recipe `class` falls through onto the
// `.select-panel`. It holds no state — the options and the active/selected wiring live on the styled
// `ISelect`. Rendered only while the select is open.
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: SelectListboxBaseProps) => {
    return (
      <ul
        class="select-panel"
        role="listbox"
        id={props.id}
        aria-labelledby={props.labelledBy}
        aria-label={props.label}
      >
        <Slot />
      </ul>
    );
  },
);
