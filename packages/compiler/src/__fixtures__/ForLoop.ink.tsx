// @ts-nocheck
/* eslint-disable */
import { createSignal, defineComponent } from "@inkline/core";

const ForLoop = defineComponent(() => {
  const [items, setItems] = createSignal<Array<{ id: number; label: string; done: boolean }>>([]);

  return (
    <ul>
      <For each={items()} fallback={<li>No items yet.</li>}>
        {(item, index) => (
          <li key={item.id}>
            {index + 1}. {item.label}
          </li>
        )}
      </For>
    </ul>
  );
});
