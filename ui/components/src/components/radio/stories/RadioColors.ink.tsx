import { createSignal, defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

// Each group owns a writable signal for `value`, two-way bound via `$bind:value`, so a click actually
// moves the selection. Distinct `name`s keep the groups mutually independent.
export default defineComponent(() => {
  const [light, _setLight] = createSignal("apple");
  const [dark, _setDark] = createSignal("apple");
  const [neutral, _setNeutral] = createSignal("apple");
  return (
    <div id="story">
      <IRadioGroup
        color="light"
        name="color-light"
        $bind:value={light}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        color="dark"
        name="color-dark"
        $bind:value={dark}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        color="neutral"
        name="color-neutral"
        $bind:value={neutral}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
    </div>
  );
});
