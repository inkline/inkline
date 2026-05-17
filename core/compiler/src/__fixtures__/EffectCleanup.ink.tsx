// @ts-nocheck
import { createSignal, createEffect, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [active, setActive] = createSignal(true);
  createEffect(() => {
    if (active()) {
      const id = setInterval(() => console.log("tick"), 1000);
      return () => clearInterval(id);
    }
  });
  return <button onClick={() => setActive(!active())}>Toggle</button>;
});
