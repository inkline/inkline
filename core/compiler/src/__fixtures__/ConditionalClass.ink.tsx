import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [active, setActive] = createSignal(false);
  return (
    <div class={active() ? "active" : "inactive"}>
      <button onClick={() => setActive(!active())}>Toggle</button>
    </div>
  );
});
