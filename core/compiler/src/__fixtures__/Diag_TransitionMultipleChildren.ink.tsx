import { defineComponent, Transition } from "@inkline/core";

export default defineComponent(() => {
  return (
    <Transition name="fade">
      <p>A</p>
      <p>B</p>
    </Transition>
  );
});
