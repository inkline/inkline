import { createSignal, defineComponent } from "@inkline/core";
import ISelect from "../styled/ISelect.ink.tsx";

// One option is disabled at the option level while the control stays interactive: "apple" and
// "cherry" are selectable, "banana" is skipped by both pointer and keyboard navigation. The signal
// defaults to "apple".
export default defineComponent(() => {
  const [value, _setValue] = createSignal("apple");
  return (
    <div id="story">
      <ISelect
        id="select-disabled-option"
        label="Fruit"
        $bind:value={value}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana", disabled: true },
          { value: "cherry", label: "Cherry" },
        ]}
      />
    </div>
  );
});
