import { createSignal, defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";

// Two-way binding: typing in the control updates `text`, and "Clear" resets it through the binding.
export default defineComponent(() => {
  const [text, setText] = createSignal("world");
  return (
    <>
      <IInput
        size="md"
        name="name"
        placeholder="Type your name"
        $bind:value={text}
        append={<button onClick={() => setText("")}>Clear</button>}
      />
      <p>Hello, {text()}!</p>
    </>
  );
});
