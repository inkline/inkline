// @ts-nocheck
/* eslint-disable */
import { createSignal, defineComponent } from "@inkline/core";

const Conditional = defineComponent(() => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [count, setCount] = createSignal(0);

  return (
    <div>
      {isVisible() ? <p>Content is visible</p> : <p>Content is hidden</p>}

      {count() > 0 && <span>Count: {count()}</span>}

      <Show when={isVisible()} fallback={<button onClick={() => setIsVisible(true)}>Show</button>}>
        <button onClick={() => setIsVisible(false)}>Hide</button>
      </Show>

      <button onClick={() => setCount(count() + 1)}>Increment</button>
    </div>
  );
});
