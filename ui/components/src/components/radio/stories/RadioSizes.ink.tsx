import { defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IRadioGroup
        size="sm"
        name="size-sm"
        value="apple"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        size="md"
        name="size-md"
        value="apple"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        size="lg"
        name="size-lg"
        value="apple"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
    </div>
  );
});
