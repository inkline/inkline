// @ts-nocheck
import { createSignal, defineComponent, For } from "@inkline/core";

export default defineComponent(() => {
  const [items] = createSignal(["Apple", "Banana", "Cherry"]);

  return (
    <ul>
      <For each={items()} key={(item) => item}>
        {(item) => <li>{item}</li>}
      </For>
    </ul>
  );
});
