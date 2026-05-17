// @ts-nocheck
import { createSignal, createMemo, createEffect, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [x, setX] = createSignal(1);
  const [y, setY] = createSignal(2);
  const sum = createMemo(() => x() + y());
  createEffect(() => {
    console.log("sum:", sum());
  });
  return (
    <div>
      <span id="sum">{sum()}</span>
      <button id="incX" onClick={() => setX(x() + 1)}>
        +X
      </button>
      <button id="incY" onClick={() => setY(y() + 1)}>
        +Y
      </button>
    </div>
  );
});
