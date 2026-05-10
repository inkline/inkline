// @ts-nocheck
/* eslint-disable */
import {
  createEffect,
  createMemo,
  createSignal,
  defineComponent,
  onCleanup,
  onMount,
} from "@inkline/core";

const Lifecycle = defineComponent(() => {
  const [count, setCount] = createSignal(0);
  const [title, setTitle] = createSignal("Inkline");
  const heading = createMemo(() => `${title()} — ${count()}`);

  onMount(() => {
    document.title = heading();
  });

  onCleanup(() => {
    document.title = "Inkline";
  });

  createEffect(() => {
    const id = setInterval(() => setCount(count() + 1), 1000);
    return () => clearInterval(id);
  });

  createEffect(() => {
    document.title = heading();
  });

  return (
    <div>
      <h1 style={{ fontWeight: count() > 10 ? "bold" : "normal" }}>{heading()}</h1>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setTitle("Updated")}>Change Title</button>
    </div>
  );
});
