import { defineComponent } from "@inkline/core";
import IAvatar from "../styled/IAvatar.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IAvatar shape="circle" label="CI" />
      <IAvatar shape="square" label="SQ" />
    </div>
  );
});
