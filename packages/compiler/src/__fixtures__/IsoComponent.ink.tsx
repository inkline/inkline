// @ts-nocheck
import { createSignal, defineComponent } from "@inkline/core";

export default defineComponent({ runtime: "iso" }, () => {
  const [value, setValue] = createSignal(0);
  return <span>{value()}</span>;
});
