import { defineComponent } from "@inkline/core";
import IButton from "../styled/IButton.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IButton size="xs">Extra Small</IButton>
      <IButton size="sm">Small</IButton>
      <IButton size="md">Medium</IButton>
      <IButton size="lg">Large</IButton>
      <IButton size="xl">Extra Large</IButton>
    </div>
  );
});
