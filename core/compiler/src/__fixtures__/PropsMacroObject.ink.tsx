import { defineComponent, defineProps } from "@inkline/core";

// The object form. The declaration map is the one the options object takes, parsed by the same
// code, so a constructor reference is a required prop and a bare default value is an optional one.
export default defineComponent(() => {
  const props = defineProps({ label: String, color: "blue" });
  return <span class={props.color}>{props.label}</span>;
});
