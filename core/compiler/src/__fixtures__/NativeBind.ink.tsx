import { createSignal, defineComponent } from "@inkline/core";

// Native-element two-way binding via `$bind:` using the getter convention (`$bind:value={text}`).
export default defineComponent(() => {
  // `$bind:value={text}` passes only the getter; the compiler pairs it with the setter by
  // convention, so `setText` is consumed by the lowering and never named in the source.
  // @ts-expect-error -- setter consumed by `$bind:`, not by this file
  // eslint-disable-next-line no-unused-vars -- same reason
  const [text, setText] = createSignal("");
  return (
    <div>
      <input $bind:value={text} />
      <p>{text()}</p>
    </div>
  );
});
