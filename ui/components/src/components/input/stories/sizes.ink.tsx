import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IInput size="sm" placeholder="Small" />
      <IInput size="md" placeholder="Medium" />
      <IInput size="lg" placeholder="Large" />
    </div>
  );
});
