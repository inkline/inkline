import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";

export default defineComponent(() => {
  return (
    <IInput
      color="light"
      size="md"
      name="amount"
      type="text"
      placeholder="0.00"
      prefix={<>$</>}
      suffix={<>USD</>}
    />
  );
});
