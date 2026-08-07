import { createSignal, defineComponent } from "@inkline/core";
import ISelect from "../styled/ISelect.ink.tsx";

// Each select owns a writable signal for `value`, two-way bound via `$bind:value`. Distinct `id`s
// keep the derived listbox/option ids unique per group.
export default defineComponent(() => {
  const [sm, _setSm] = createSignal("apple");
  const [md, _setMd] = createSignal("apple");
  const [lg, _setLg] = createSignal("apple");
  return (
    <div id="story">
      <ISelect
        id="select-sm"
        size="sm"
        label="Fruit (small)"
        $bind:value={sm}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <ISelect
        id="select-md"
        size="md"
        label="Fruit (medium)"
        $bind:value={md}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <ISelect
        id="select-lg"
        size="lg"
        label="Fruit (large)"
        $bind:value={lg}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
    </div>
  );
});
