// @ts-nocheck
import { createSignal, defineComponent, For } from "@inkline/core";
export default defineComponent(() => {
  const [items, setItems] = createSignal([]);
  const [input, setInput] = createSignal("");
  return (
    <div>
      <input value={input()} onInput={(e) => setInput(e.target.value)} />
      <button
        onClick={() => {
          setItems([...items(), input()]);
          setInput("");
        }}
      >
        Add
      </button>
      <ul>
        <For each={items()} key={(item, i) => i}>
          {(item) => <li>{item}</li>}
        </For>
      </ul>
    </div>
  );
});
