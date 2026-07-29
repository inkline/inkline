import { createMemo, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const a = createMemo(() => b() + 1);
  const b = createMemo(() => a() + 1);
  return (
    <div>
      {a()}
      {b()}
    </div>
  );
});
