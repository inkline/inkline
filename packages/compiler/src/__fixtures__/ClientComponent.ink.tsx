// @ts-nocheck
import { createSignal, defineComponent } from "@inkline/core";

export default defineComponent({ runtime: "client" }, () => {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <span>{count()}</span>
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});
