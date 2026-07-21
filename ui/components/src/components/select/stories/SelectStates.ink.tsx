import { createSignal, defineComponent } from "@inkline/core";
import ISelect from "../styled/ISelect.ink.tsx";

// `invalid` carries error styling and `aria-invalid`; `disabled` removes the tab stop and blocks
// interaction; `readonly` shows the value but blocks opening/changing it (staying focusable, unlike
// disabled). Each owns its own signal so a default value renders.
export default defineComponent(() => {
  const [invalid, _setInvalid] = createSignal("apple");
  const [disabled, _setDisabled] = createSignal("apple");
  const [readonly, _setReadonly] = createSignal("apple");
  return (
    <div id="story">
      <ISelect
        id="select-invalid"
        invalid
        label="Fruit (invalid)"
        $bind:value={invalid}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <ISelect
        id="select-disabled"
        disabled
        label="Fruit (disabled)"
        $bind:value={disabled}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <ISelect
        id="select-readonly"
        readonly
        label="Fruit (read-only)"
        $bind:value={readonly}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
    </div>
  );
});
