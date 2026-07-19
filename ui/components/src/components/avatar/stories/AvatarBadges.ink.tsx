import { defineComponent } from "@inkline/core";
import IAvatar from "../styled/IAvatar.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IAvatar label="ON" badge={true} badgeColor="success" badgePosition="bottom-right" />
      <IAvatar label="AW" badge={true} badgeColor="warning" badgePosition="top-right" />
      <IAvatar label="BZ" badge={true} badgeColor="error" badgePosition="top-left" />
      <IAvatar label="OF" badge={true} badgeColor="neutral" badgePosition="bottom-left" />
    </div>
  );
});
