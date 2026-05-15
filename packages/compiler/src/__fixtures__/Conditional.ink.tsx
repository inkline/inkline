// @ts-nocheck
import { createSignal, defineComponent, Show } from "@inkline/core";

export default defineComponent(() => {
  const [visible, setVisible] = createSignal(true);

  return (
    <div>
      <Show when={visible()} fallback={<span>Hidden</span>}>
        <span>Visible</span>
      </Show>
      <button onClick={() => setVisible(!visible())}>Toggle</button>
    </div>
  );
});
