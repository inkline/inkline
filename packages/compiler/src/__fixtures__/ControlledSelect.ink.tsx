// @ts-nocheck
import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [value, setValue] = createSignal("b");
  return (
    <select value={value()} onChange={(e) => setValue(e.target.value)}>
      <option value="a">A</option>
      <option value="b">B</option>
      <option value="c">C</option>
    </select>
  );
});
