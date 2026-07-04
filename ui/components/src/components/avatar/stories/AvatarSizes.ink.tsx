import { defineComponent } from "@inkline/core";
import IAvatar from "../styled/IAvatar.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IAvatar size="xs" label="XS" />
      <IAvatar size="sm" label="SM" />
      <IAvatar size="md" label="MD" />
      <IAvatar size="lg" label="LG" />
      <IAvatar size="xl" label="XL" />
    </div>
  );
});
