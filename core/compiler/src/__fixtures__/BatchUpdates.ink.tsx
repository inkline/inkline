// @ts-nocheck
import { createSignal, createMemo, defineComponent, batch } from "@inkline/core";
export default defineComponent(() => {
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const sum = createMemo(() => x() + y());
  return (
    <div>
      <span>{sum()}</span>
      <button
        onClick={() =>
          batch(() => {
            setX(x() + 1);
            setY(y() + 1);
          })
        }
      >
        Both
      </button>
    </div>
  );
});
