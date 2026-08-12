import { defineComponent, defineEmits } from "@inkline/core";

// `change` is declared twice — once in the options `events` object and once via `defineEmits`.
// The two declarations must collapse into a single event channel (last wins, so the typed
// `defineEmits` payload survives) and the redundant options entry must report INK0046.
// `close` is declared only in the options object and must be left untouched.
export default defineComponent({ events: { change: {}, close: {} } }, () => {
  const emit = defineEmits<{ change: [value: string] }>();
  return (
    <button id="change" onClick={() => emit("change", "next")}>
      Change
    </button>
  );
});
