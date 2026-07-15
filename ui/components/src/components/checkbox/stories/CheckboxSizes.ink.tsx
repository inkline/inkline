import { defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <ICheckbox size="sm" checked label="Small" />
      <ICheckbox size="md" checked label="Medium" />
      <ICheckbox size="lg" checked label="Large" />
    </div>
  );
});
