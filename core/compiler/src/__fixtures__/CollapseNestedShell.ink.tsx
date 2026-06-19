import { defineComponent, Slot } from "@inkline/core";

// Headless shell (like IInputBase): a `<div>` whose only child is its slot. A styled composite
// collapses onto this and projects richer content (with nested headless children) into the slot.
export interface CollapseNestedShellProps {
  id?: string;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CollapseNestedShellProps) => {
    return (
      <div class="shell" id={props.id}>
        <Slot />
      </div>
    );
  },
);
