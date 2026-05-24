import { createSignal, defineComponent, For } from "@inkline/core";
export default defineComponent(() => {
  const [items] = createSignal([1, 2, 3]);
  return (
    <ul>
      <For each={items()}>{(item) => <li>{item}</li>}</For>
    </ul>
  );
});
