// @ts-nocheck
import { createSignal, defineComponent } from "@inkline/core";

export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  return (
    <div class="counter">
      <span class="value">{count()}</span>
      <button class="btn" onClick={() => setCount(count() + 1)}>
        +1
      </button>
    </div>
  );
});
