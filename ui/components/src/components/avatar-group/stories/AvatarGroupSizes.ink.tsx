import { defineComponent } from "@inkline/core";
import IAvatarGroup from "../styled/IAvatarGroup.ink.tsx";
import IAvatar from "../../avatar/styled/IAvatar.ink.tsx";

// `size` on the group only tunes the overlap; each child avatar sets its own matching size.
export default defineComponent(() => {
  return (
    <div id="story">
      <IAvatarGroup size="sm">
        <IAvatar size="sm" color="primary" label="AB" />
        <IAvatar size="sm" color="light" label="CD" />
        <IAvatar size="sm" color="dark" label="EF" />
      </IAvatarGroup>
      <IAvatarGroup size="lg">
        <IAvatar size="lg" color="primary" label="AB" />
        <IAvatar size="lg" color="light" label="CD" />
        <IAvatar size="lg" color="dark" label="EF" />
      </IAvatarGroup>
    </div>
  );
});
