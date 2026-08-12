import { defineComponent, defineEmits } from "@inkline/core";

type ChangeEvents<T> = { change: [value: T] };

// A generic instantiation type-checks for the author but names a declaration whose members are the
// uninstantiated ones. Declaring zero events would compile `emit("change", …)` into a write to a
// prop nothing declares, so the compiler refuses — INK0042.
export default defineComponent(() => {
  const emit = defineEmits<ChangeEvents<string>>();
  return <button onClick={() => emit("change", "next")}>Change</button>;
});
