import { createSignal, createMemo, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const doubled = createMemo(() => count() * 2);
  const [count, setCount] = createSignal(5);
  return (
    <div>
      <span>{doubled()}</span>
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});
