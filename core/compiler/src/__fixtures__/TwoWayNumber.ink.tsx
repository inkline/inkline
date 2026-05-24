import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [value, setValue] = createSignal(0);
  return (
    <div>
      <input type="number" value={value()} onInput={(e) => setValue(Number(e.target.value))} />
      <span>{value()}</span>
    </div>
  );
});
