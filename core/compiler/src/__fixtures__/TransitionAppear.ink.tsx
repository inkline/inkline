import { createSignal, defineComponent, Show, Transition } from "@inkline/core";

export default defineComponent(() => {
  const [visible] = createSignal(true);

  return (
    <Transition name="slide" appear>
      <Show when={visible()}>
        <p>Animates in on mount</p>
      </Show>
    </Transition>
  );
});
