import { createSignal, defineComponent } from "@inkline/core";

export default defineComponent(
  {
    style: `.container { color: red; font-size: 14px; }
.title { font-weight: bold; }`,
  },
  () => {
    const [active, setActive] = createSignal(false);
    return (
      <div class="container">
        <h1 class="title">Hello</h1>
        <button onClick={() => setActive(!active())}>Toggle</button>
      </div>
    );
  },
);
