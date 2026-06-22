import { defineComponent } from "@inkline/core";

// Headless void leaf (like IInputControlBase): a single `<input>` root, no children. When a composite
// collapses, this renders as a self-closing attribute-selector child (`<input ink-collapse-nested-input />`).
export interface CollapseNestedInputProps {
  disabled?: boolean;
}

export default defineComponent({ meta: { headless: true } }, (props: CollapseNestedInputProps) => {
  return <input class="ni-field" disabled={props.disabled} />;
});
