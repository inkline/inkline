import { defineComponent } from "@inkline/core";
import IAvatarGroup from "../styled/IAvatarGroup.ink.tsx";
import IAvatar from "../../avatar/styled/IAvatar.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IAvatarGroup>
        <IAvatar color="primary" label="AB" />
        <IAvatar color="light" label="CD" />
        <IAvatar color="dark" label="EF" />
        <IAvatar color="neutral" label="GH" />
      </IAvatarGroup>
    </div>
  );
});
