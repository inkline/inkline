import { defineComponent, Slot, Show, createSignal } from "@inkline/core";
export default defineComponent(() => {
  const [expanded] = createSignal(true);
  return (
    <div>
      <Slot name="header" />
      <Show when={expanded()}>
        <Slot />
      </Show>
    </div>
  );
});
