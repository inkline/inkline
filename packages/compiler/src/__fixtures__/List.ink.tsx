// @ts-nocheck
/* eslint-disable */
import { createSignal, defineComponent } from "@inkline/core";

const List = defineComponent(() => {
  const [items, setItems] = createSignal<Array<{ id: number; name: string }>>([]);
  return (
    <ul>
      {items().map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});
