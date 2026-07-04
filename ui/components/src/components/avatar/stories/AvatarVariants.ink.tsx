import { defineComponent } from "@inkline/core";
import IAvatar from "../styled/IAvatar.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IAvatar variant="solid" color="primary" label="SO" />
      <IAvatar variant="soft" color="primary" label="SF" />
    </div>
  );
});
