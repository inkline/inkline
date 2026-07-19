import { createSignal, defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

// A horizontally-laid-out group with a writable signal for `value`, two-way bound via `$bind:value`,
// defaulting to "apple" so one option is selected on load and clicks move the selection.
export default defineComponent(() => {
  const [value, _setValue] = createSignal("apple");
  return (
    <div id="story">
      <IRadioGroup
        orientation="horizontal"
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
