import { defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ICheckbox color="light" checked label="Light" />
      <ICheckbox color="dark" checked label="Dark" />
      <ICheckbox color="neutral" checked label="Neutral" />
    </div>
  );
});
