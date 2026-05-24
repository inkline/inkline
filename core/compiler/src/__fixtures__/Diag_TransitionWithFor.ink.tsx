import { defineComponent, For, Transition } from "@inkline/core";

export default defineComponent(() => {
  return (
    <Transition name="fade">
      <For each={[1, 2, 3]} key={(item) => item}>
        {(item) => <li>{item}</li>}
      </For>
    </Transition>
  );
});
