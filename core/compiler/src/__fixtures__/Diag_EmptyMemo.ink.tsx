import { createMemo, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const value = createMemo(() => 42);
  return <div>{value()}</div>;
});
