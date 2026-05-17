// @ts-nocheck
import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [tags] = createSignal(["a", "b", "c"]);
  return (
    <div>
      {tags().map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
});
