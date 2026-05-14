// @ts-nocheck
import { createSignal, createMemo, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [flag, setFlag] = createSignal(true);
  const [a] = createSignal(10);
  const [b] = createSignal(20);
  const value = createMemo(() => (flag() ? a() : b()));
  return (
    <div>
      <span>{value()}</span>
      <button onClick={() => setFlag(!flag())}>Toggle</button>
    </div>
  );
});
