import { defineComponent, defineModel } from "@inkline/core";

// The model pair is reachable only through the binding, and the call is erased, so a bare
// `defineModel()` declares the two-way prop while giving the body no way to read or set it —
// INK0075.
export default defineComponent(() => {
  defineModel<string>("value");
  return <div />;
});
