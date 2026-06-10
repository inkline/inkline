import { defineComponent, defineModel } from "@inkline/core";

export default defineComponent(() => {
  const [value, setValue] = defineModel<string>("value");
  return (
    <div>
      <input value={value()} onInput={(e) => setValue(e.target.value)} />
      <p>{value()}</p>
    </div>
  );
});
