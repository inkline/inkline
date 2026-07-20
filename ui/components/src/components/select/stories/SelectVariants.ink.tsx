import { createSignal, defineComponent } from "@inkline/core";
import ISelect from "../styled/ISelect.ink.tsx";

// Each select owns a writable signal for `value`, two-way bound via `$bind:value`. Distinct `id`s
// keep the derived listbox/option ids unique per group.
export default defineComponent(() => {
  const [solid, _setSolid] = createSignal("apple");
  const [soft, _setSoft] = createSignal("apple");
  const [ghost, _setGhost] = createSignal("apple");
  return (
    <div id="story">
      <ISelect
        id="select-solid"
        variant="solid"
        label="Fruit (solid)"
        $bind:value={solid}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <ISelect
        id="select-soft"
        variant="soft"
        label="Fruit (soft)"
        $bind:value={soft}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <ISelect
        id="select-ghost"
        variant="ghost"
        label="Fruit (ghost)"
        $bind:value={ghost}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
    </div>
  );
});
