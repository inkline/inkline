import { createSignal, defineComponent, defineModel } from "@inkline/core";

const Field = defineComponent(() => {
  const [value, setValue] = defineModel<string>("value");
  return <input value={value()} onInput={(e) => setValue(e.target.value)} />;
});

export default defineComponent(() => {
  const [text, setText] = createSignal("");
  return (
    <div>
      <Field $bind:value={text} />
      <p>{text()}</p>
    </div>
  );
});
