import { defineComponent, defineProps } from "@inkline/core";

// The macro channel binds the props object to `p`. Every target rewrites that object under the
// fixed name `props`, so `p.label` would be copied to the output unrewritten and would name an
// identifier the generated component never declares. INK0074.
export default defineComponent(() => {
  const p = defineProps<{ label: string }>();
  return <div>{p.label}</div>;
});
