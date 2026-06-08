import { createSignal, defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";
import IInputControl from "../styled/IInputControl.ink.tsx";

// Two-way binding: typing in the control updates `text`, and "Clear" resets it through the binding.
export default defineComponent(() => {
  const [text, setText] = createSignal("");
  return (
    <div>
      <IInput>
        <IInputControl name="name" placeholder="Type your name" $bind:value={text} />
      </IInput>
      <p>Hello, {text()}!</p>
      <button onClick={() => setText("")}>Clear</button>
    </div>
  );
});
