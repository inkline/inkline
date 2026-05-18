// @ts-nocheck
import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [checked, setChecked] = createSignal(false);
  return (
    <div>
      <input type="checkbox" checked={checked()} onChange={() => setChecked(!checked())} />
      <span>{checked() ? "on" : "off"}</span>
    </div>
  );
});
