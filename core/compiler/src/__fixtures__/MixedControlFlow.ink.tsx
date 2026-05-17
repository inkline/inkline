// @ts-nocheck
import { createSignal, defineComponent, For, Show } from "@inkline/core";
export default defineComponent(() => {
  const [items] = createSignal(["a", "b", "c"]);
  const [filter, setFilter] = createSignal("");
  return (
    <div>
      <input value={filter()} onInput={(e) => setFilter(e.target.value)} />
      <ul>
        <For each={items()} key={(item) => item}>
          {(item) => (
            <Show when={item.includes(filter())}>
              <li>{item}</li>
            </Show>
          )}
        </For>
      </ul>
    </div>
  );
});
