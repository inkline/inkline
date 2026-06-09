import { createSignal, defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";
import IInputGroup from "../styled/IInputGroup.ink.tsx";
import IInputControl from "../styled/IInputControl.ink.tsx";
import IInputAppend from "../styled/IInputAppend.ink.tsx";

// Two-way binding: typing in the control updates `text`, and "Clear" resets it through the binding.
export default defineComponent(() => {
  const [text, setText] = createSignal("world");
  return (
    <>
      <IInputGroup size="md">
        <IInput>
          <IInputControl name="name" placeholder="Type your name" $bind:value={text} />
        </IInput>
        <IInputAppend>
          <button onClick={() => setText("")}>Clear</button>
        </IInputAppend>
      </IInputGroup>

      <p>Hello, {text()}!</p>
    </>
  );
});
