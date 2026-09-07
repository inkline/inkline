import { defineComponent, defineProps } from "@inkline/core";

// The props object is reachable only through the binding, and the call is erased, so a bare
// `defineProps()` declares the props while giving the body no way to read them — INK0075.
// `defineSlot()` is the exception, and is exercised by the corpus rather than here.
export default defineComponent(() => {
  defineProps<{ label: string }>();
  return <div />;
});
