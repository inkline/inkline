import { createSignal, defineComponent, Show, Transition } from "@inkline/core";

export default defineComponent(() => {
  const [visible, setVisible] = createSignal(true);

  return (
    <div>
      <Transition name="fade">
        <Show when={visible()}>
          <p>Hello</p>
        </Show>
      </Transition>
      <button onClick={() => setVisible(!visible())}>Toggle</button>
    </div>
  );
});
