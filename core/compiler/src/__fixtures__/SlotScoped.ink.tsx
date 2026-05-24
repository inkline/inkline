import { defineComponent, Slot, createSignal, For } from "@inkline/core";
export default defineComponent(() => {
  const [items] = createSignal([
    { id: 1, label: "One" },
    { id: 2, label: "Two" },
  ]);
  return (
    <ul>
      <For each={items()} key={(item) => item.id}>
        {(item, index) => (
          <li>
            <Slot name="item" args={[item, index]}>
              {index}: {item.label}
            </Slot>
          </li>
        )}
      </For>
    </ul>
  );
});
