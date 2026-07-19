import { createSignal, defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

// Group-level `disabled`: the selection ("apple") stays visible but nothing can be clicked — that's
// the point of the story. The signal still backs `value` so the default selection renders.
export default defineComponent(() => {
  const [value, _setValue] = createSignal("apple");
  return (
    <div id="story">
      <IRadioGroup
        disabled
        name="fruit"
        $bind:value={value}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
    </div>
  );
});
