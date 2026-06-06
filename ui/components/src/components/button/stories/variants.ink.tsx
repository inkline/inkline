import { defineComponent } from "@inkline/core";
import IButton from "../styled/IButton.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IButton variant="solid">Solid</IButton>
      <IButton variant="outline">Outline</IButton>
      <IButton variant="soft">Soft</IButton>
      <IButton variant="subtle">Subtle</IButton>
      <IButton variant="ghost">Ghost</IButton>
      <IButton variant="link">Link</IButton>
    </div>
  );
});
