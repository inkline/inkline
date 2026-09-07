import { defineComponent, defineEmits } from "@inkline/core";

// The emit function is reachable only through the binding, and the call is erased, so a bare
// `defineEmits()` declares the events while giving the body no way to raise them — INK0075.
export default defineComponent(() => {
  defineEmits<{ change: [value: string] }>();
  return <div />;
});
