import { createSignal, defineComponent } from "@inkline/core";
import ISelect from "../styled/ISelect.ink.tsx";

// The select owns a writable signal for `value`, two-way bound via `$bind:value`, so opening the
// listbox and choosing a row actually moves the selection. It defaults to "apple".
export default defineComponent(() => {
  const [value, _setValue] = createSignal("apple");
  return (
    <div id="story">
      <ISelect
        id="select-default"
        label="Fruit"
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
