// @ts-nocheck
import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [text, setText] = createSignal("");
  return (
    <div>
      <textarea value={text()} onInput={(e) => setText(e.target.value)} />
      <p>{text().length} characters</p>
    </div>
  );
});
