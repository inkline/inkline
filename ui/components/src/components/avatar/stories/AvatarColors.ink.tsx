import { defineComponent } from "@inkline/core";
import IAvatar from "../styled/IAvatar.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IAvatar color="primary" label="PR" />
      <IAvatar color="light" label="LI" />
      <IAvatar color="dark" label="DA" />
      <IAvatar color="neutral" label="NE" />
    </div>
  );
});
