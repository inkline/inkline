import { defineComponent, Slot } from "@inkline/core";

// Headless base whose root binds a prop (`id`) a styled wrapper may NOT forward. When a wrapper
// collapses onto this root, the Angular host must bind against the wrapper's actual arguments, so an
// unforwarded `id` resolves to undefined (omitted) instead of leaking the wrapper's same-named prop.
export interface CollapseUnforwardedBaseProps {
  id?: string;
  label?: string;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CollapseUnforwardedBaseProps) => {
    return (
      <div class="cu" id={props.id}>
        <Slot>{props.label}</Slot>
      </div>
    );
  },
);
