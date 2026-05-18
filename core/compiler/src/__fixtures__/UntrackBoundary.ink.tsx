// @ts-nocheck
import { createSignal, createEffect, defineComponent, untrack } from "@inkline/core";
export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  const [log, _setLog] = createSignal("");
  createEffect(() => {
    const c = count();
    const l = untrack(() => log());
    console.log(c, l);
  });
  return (
    <div>
      <span>{count()}</span>
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});
