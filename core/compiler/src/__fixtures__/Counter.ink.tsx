import { createSignal, createMemo, createEffect, defineComponent } from "@inkline/core";

export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);

  createEffect(() => {
    console.log("count:", count());
  });

  return (
    <div>
      <p>{count()}</p>
      <p>{doubled()}</p>
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});
