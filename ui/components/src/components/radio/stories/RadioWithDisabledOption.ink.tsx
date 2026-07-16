import { createSignal, defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

// One option is disabled at the option level while the group stays interactive: the enabled options
// ("apple", "cherry") are clickable, "banana" isn't. The signal defaults to "apple".
export default defineComponent(() => {
  const [value, _setValue] = createSignal("apple");
  return (
    <div id="story">
      <IRadioGroup
        name="fruit"
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
