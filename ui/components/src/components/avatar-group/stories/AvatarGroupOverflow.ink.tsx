import { defineComponent } from "@inkline/core";
import IAvatarGroup from "../styled/IAvatarGroup.ink.tsx";
import IAvatar from "../../avatar/styled/IAvatar.ink.tsx";

// The "+N" overflow is just another avatar with a label — no dedicated API needed.
export default defineComponent(() => {
  return (
    <div id="story">
      <IAvatarGroup>
        <IAvatar color="primary" label="AB" />
        <IAvatar color="light" label="CD" />
        <IAvatar color="dark" label="EF" />
        <IAvatar color="neutral" label="+5" />
      </IAvatarGroup>
    </div>
  );
});
