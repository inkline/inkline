// @ts-nocheck
import { defineComponent, createSignal, createContext, provide } from "@inkline/core";

export const FormContext = createContext<{ disabled: boolean; size: string }>({
  disabled: false,
  size: "md",
});

export default defineComponent(() => {
  const [disabled, setDisabled] = createSignal(false);

  provide(FormContext, { disabled: disabled(), size: "md" });

  return (
    <div>
      <button onClick={() => setDisabled(!disabled())}>Toggle</button>
    </div>
  );
});
