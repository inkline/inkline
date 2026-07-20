import { createSignal, defineComponent } from "@inkline/core";
import ISelect from "../styled/ISelect.ink.tsx";

// Each select owns a writable signal for `value`, two-way bound via `$bind:value`, so a choice
// actually moves the selection. Distinct `id`s keep the derived listbox/option ids unique per group.
export default defineComponent(() => {
  const [light, _setLight] = createSignal("apple");
  const [dark, _setDark] = createSignal("apple");
  const [neutral, _setNeutral] = createSignal("apple");
  return (
    <div id="story">
      <ISelect
        id="select-light"
        color="light"
        label="Fruit (light)"
        $bind:value={light}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <ISelect
        id="select-dark"
        color="dark"
        label="Fruit (dark)"
        $bind:value={dark}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <ISelect
        id="select-neutral"
        color="neutral"
        label="Fruit (neutral)"
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
