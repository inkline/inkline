import { createSignal, defineComponent } from "@inkline/core";

// Native-element two-way binding via `$bind:` using the getter convention (`$bind:value={text}`).
export default defineComponent(() => {
  const [text, setText] = createSignal("");
  return (
    <div>
      <input $bind:value={text} />
      <p>{text()}</p>
    </div>
  );
});
