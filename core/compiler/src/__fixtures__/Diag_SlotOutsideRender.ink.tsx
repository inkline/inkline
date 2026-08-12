import { defineComponent, Slot } from "@inkline/core";

// `<Slot>` is lowered from the render tree, so one nested in a helper function is never reached:
// the component would declare no slot and emit the element verbatim — INK0069.
export default defineComponent(() => {
  function renderIcon() {
    return <Slot name="icon" />;
  }
  return <div>{renderIcon()}</div>;
});
