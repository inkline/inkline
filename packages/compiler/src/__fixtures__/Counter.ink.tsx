// @ts-nocheck
/* eslint-disable */
import { createEffect, createMemo, createSignal, defineComponent } from "@inkline/core";

const Counter = defineComponent(() => {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);
  createEffect(() => {
    console.log("count is", count());
  });
  return (
    <div>
      <p>{count()}</p>
      <p>{doubled()}</p>
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});
