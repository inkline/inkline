import { createSignal, defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

// Each group owns a writable signal for `value`, two-way bound via `$bind:value`, so a click actually
// moves the selection. Distinct `name`s keep the groups mutually independent.
export default defineComponent(() => {
  const [vertical, _setVertical] = createSignal("apple");
  const [horizontal, _setHorizontal] = createSignal("apple");
  return (
    <div id="story">
      <IRadioGroup
        orientation="vertical"
        name="orientation-vertical"
        $bind:value={vertical}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        orientation="horizontal"
        name="orientation-horizontal"
        $bind:value={horizontal}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
    </div>
  );
});
