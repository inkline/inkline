import { defineComponent } from "@inkline/core";
import IRadioGroup from "../styled/IRadioGroup.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IRadioGroup
        color="light"
        name="color-light"
        value="apple"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        color="dark"
        name="color-dark"
        value="apple"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        color="neutral"
        name="color-neutral"
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
