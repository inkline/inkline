import { defineComponent, defineSlot } from "@inkline/core";

const NAME = "extra";

// The macro is erased from the output, so a value read at runtime is gone by the time anything
// could use it. `defineSlot` needs the name at build time — INK0048.
export default defineComponent(() => {
  const extra = defineSlot(NAME);
  return <div>{extra()}</div>;
});
