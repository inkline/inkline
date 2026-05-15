// @ts-nocheck
import { createSignal, defineComponent } from "@inkline/core";
const Label = defineComponent((props: { text: string }) => {
  return <span>{props.text}</span>;
});
const Counter = defineComponent(() => {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <Label text={String(count())} />
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});
export default Counter;
