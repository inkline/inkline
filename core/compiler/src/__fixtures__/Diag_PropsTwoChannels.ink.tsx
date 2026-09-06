import { defineComponent, defineProps } from "@inkline/core";

// Props are declared twice — once by the options `props` map, once by the macro. Only one channel
// wins, so the losing declaration would compile clean and emit props the body never reads. INK0047.
export default defineComponent({ props: { label: String } }, () => {
  const props = defineProps<{ size?: string }>();
  return <div>{props.size}</div>;
});
