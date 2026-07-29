import { createSignal, defineComponent, defineModel } from "@inkline/core";

const Field = defineComponent(() => {
  const [value, setValue] = defineModel<string>("value");
  return <input value={value()} onInput={(e) => setValue(e.target.value)} />;
});

export default defineComponent(() => {
  // `$bind:value={text}` passes only the getter; the compiler pairs it with the setter by
  // convention, so `setText` is consumed by the lowering and never named in the source.
  // @ts-expect-error -- setter consumed by `$bind:`, not by this file
  // eslint-disable-next-line no-unused-vars -- same reason
  const [text, setText] = createSignal("");
  return (
    <div>
      <Field $bind:value={text} />
      <p>{text()}</p>
    </div>
  );
});
