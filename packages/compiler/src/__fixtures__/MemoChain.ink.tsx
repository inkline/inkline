// @ts-nocheck
import { createSignal, createMemo, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [base, setBase] = createSignal(1);
  const doubled = createMemo(() => base() * 2);
  const quadrupled = createMemo(() => doubled() * 2);
  const label = createMemo(() => `Value: ${quadrupled()}`);
  return (
    <div>
      <span>{label()}</span>
      <button onClick={() => setBase(base() + 1)}>+1</button>
    </div>
  );
});
