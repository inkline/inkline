import { defineComponent, defineProps } from "@inkline/core";

// A macro is erased at build time, so one nested in a condition still declares unconditionally
// while reading as if it did not — INK0049.
export default defineComponent(() => {
  if (Math.random() > 0.5) {
    const props = defineProps<{ label: string }>();
    return <div>{props.label}</div>;
  }
  return <div />;
});
