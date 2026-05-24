import { defineComponent, Slot, createSignal } from "@inkline/core";
export default defineComponent(() => {
  const [value] = createSignal("hello");
  return (
    <div>
      <Slot args={[value()]}>
        <span>{value()}</span>
      </Slot>
    </div>
  );
});
