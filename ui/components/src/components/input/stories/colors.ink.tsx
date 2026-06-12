import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IInput color="light" placeholder="Light" />
      <IInput color="dark" placeholder="Dark" />
      <IInput color="neutral" placeholder="Neutral" />
    </div>
  );
});
