import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [value, setValue] = createSignal("");
  return (
    <div>
      <input value={value()} onInput={(e) => setValue(e.target.value)} />
      <p>{value()}</p>
    </div>
  );
});
