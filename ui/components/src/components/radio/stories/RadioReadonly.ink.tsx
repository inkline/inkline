import { createSignal, defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

// `readonly` freezes the selection ("banana") while keeping the controls focusable — unlike disabled.
// The signal backs `value` so the default selection renders; clicks can't change it, by design.
export default defineComponent(() => {
  const [value, _setValue] = createSignal("banana");
  return (
    <div id="story">
      <IRadioGroup
        readonly
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
