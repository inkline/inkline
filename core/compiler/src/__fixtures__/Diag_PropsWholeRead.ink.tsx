import { defineComponent, defineProps } from "@inkline/core";

// The macro channel reads the props object as a whole. Only `props.<name>` carries a member the
// rewriter can map per target, so the bare read reaches Angular as an undeclared class member and
// Svelte as the destructured shape — a different object than the one written here. INK0075.
export default defineComponent(() => {
  const props = defineProps<{ label: string }>();
  return <div title={JSON.stringify(props)} />;
});
