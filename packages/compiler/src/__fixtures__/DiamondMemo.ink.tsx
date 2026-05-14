// @ts-nocheck
import { createSignal, createMemo, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [base, setBase] = createSignal(1);
  const left = createMemo(() => base() * 2);
  const right = createMemo(() => base() * 3);
  const combined = createMemo(() => left() + right());
  return (
    <div>
      <span>{combined()}</span>
      <button onClick={() => setBase(base() + 1)}>+1</button>
    </div>
  );
});
