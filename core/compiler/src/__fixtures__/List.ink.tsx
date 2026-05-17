// @ts-nocheck
import { createSignal, defineComponent, For } from "@inkline/core";
export default defineComponent(() => {
  const [items, setItems] = createSignal(["A", "B"]);
  return (
    <div>
      <ul>
        <For each={items()} key={(item) => item}>
          {(item) => <li>{item}</li>}
        </For>
      </ul>
      <button onClick={() => setItems([...items(), "C"])}>Add</button>
    </div>
  );
});
