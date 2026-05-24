import { createSignal, createMemo, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [obj] = createSignal({ a: 1, b: 2 });
  const [key] = createSignal("a");
  const value = createMemo(() => obj()[key()]);
  return <span>{value()}</span>;
});
