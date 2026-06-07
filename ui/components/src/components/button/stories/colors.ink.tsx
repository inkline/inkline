import { defineComponent } from "@inkline/core";
import IButton from "../styled/IButton.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IButton color="primary">Primary</IButton>
      <IButton color="secondary">Secondary</IButton>
      <IButton color="success">Success</IButton>
      <IButton color="info">Info</IButton>
      <IButton color="warning">Warning</IButton>
      <IButton color="error">Error</IButton>
      <IButton color="light">Light</IButton>
      <IButton color="dark">Dark</IButton>
      <IButton color="neutral">Neutral</IButton>
    </div>
  );
});
