import { createSignal, defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

// Each group owns a writable signal for `value`, two-way bound via `$bind:value`, so a click actually
// moves the selection. Distinct `name`s keep the groups mutually independent.
export default defineComponent(() => {
  const [sm, _setSm] = createSignal("apple");
  const [md, _setMd] = createSignal("apple");
  const [lg, _setLg] = createSignal("apple");
  return (
    <div id="story">
      <IRadioGroup
        size="sm"
        name="size-sm"
        $bind:value={sm}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        size="md"
        name="size-md"
        $bind:value={md}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        size="lg"
        name="size-lg"
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
