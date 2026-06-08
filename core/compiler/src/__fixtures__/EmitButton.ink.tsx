import { defineComponent, defineEmits } from "@inkline/core";

export default defineComponent(() => {
  const emit = defineEmits<{ press: [count: number] }>();
  return <button onClick={() => emit("press", 1)}>Go</button>;
});
