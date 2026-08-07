import { createSignal, defineComponent } from "@inkline/core";
import ISelect from "../styled/ISelect.ink.tsx";

// Nothing is selected, so the trigger shows the placeholder with its `-placeholder` modifier. The
// signal starts empty; choosing a row fills it in.
export default defineComponent(() => {
  const [value, _setValue] = createSignal("");
  return (
    <div id="story">
      <ISelect
        id="select-placeholder"
        label="Fruit"
        placeholder="Pick a fruit"
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
