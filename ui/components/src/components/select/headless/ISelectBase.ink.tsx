import { defineComponent, Slot } from "@inkline/core";

export interface SelectBaseProps {
  /** Id of the select container element. */
  id?: string;
}

// The Select container: a single static `<div class="select-container">` root that positions the
// trigger and the (absolutely-positioned) listbox panel as a unit. It host-extracts to
// `div[ink-select-base]` and a styled parent's recipe/consumer `class` falls through onto it. It
// holds no state — open/selection state lives on the styled `ISelect`.
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: SelectBaseProps) => {
    return (
      <div class="select-container" id={props.id}>
        <Slot />
      </div>
    );
  },
);
