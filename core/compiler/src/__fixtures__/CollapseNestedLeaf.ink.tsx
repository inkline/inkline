import { defineComponent, Slot } from "@inkline/core";

// Headless leaf (like IInputPrefixBase): a `<span>` with a slot. When a composite collapses, this
// renders as an attribute-selector child (`<span ink-collapse-nested-leaf>`), zero wrapper.
export default defineComponent({ meta: { headless: true }, slots: { default: {} } }, () => {
  return (
    <span class="leaf">
      <Slot />
    </span>
  );
});
