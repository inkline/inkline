import { createSignal, defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";

// Two-way binding: typing in the control updates `text`, reflected live below.
export default defineComponent(() => {
  const [text, _setText] = createSignal("world");
  return (
    <div id="story">
      <IInput size="md" name="name" placeholder="Type your name" $bind:value={text} />
      <p>Hello, {text()}!</p>
    </div>
  );
});
