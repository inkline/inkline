import { defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IRadioGroup
        orientation="vertical"
        name="orientation-vertical"
        value="apple"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        orientation="horizontal"
        name="orientation-horizontal"
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
