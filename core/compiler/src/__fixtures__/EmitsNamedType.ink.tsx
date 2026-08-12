import { defineComponent, defineEmits } from "@inkline/core";

// `defineEmits<T>()` where T is a named type declared in the same file. The members are resolved
// through the checker, so the events are declared exactly as an inline type literal would.
type DialogEvents = { close: []; resize: [width: number] };

export default defineComponent(() => {
  const emit = defineEmits<DialogEvents>();
  return (
    <div>
      <button onClick={() => emit("close")}>Close</button>
      <button onClick={() => emit("resize", 320)}>Resize</button>
    </div>
  );
});
