import { createSignal, defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

// The group owns a writable signal for `value`, two-way bound via `$bind:value`, so a click actually
// moves the selection. It defaults to "apple" so one option is selected on load.
export default defineComponent(() => {
  const [value, _setValue] = createSignal("apple");
  return (
    <div id="story">
      <IRadioGroup
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
