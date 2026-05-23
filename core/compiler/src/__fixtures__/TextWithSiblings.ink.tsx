import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [name] = createSignal("world");
  return (
    <p>
      Hello, <strong>{name()}</strong>!
    </p>
  );
});
