import { defineComponent } from "@inkline/core";
import IBadge from "../styled/IBadge.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IBadge color="primary">Primary</IBadge>
      <IBadge color="secondary">Secondary</IBadge>
      <IBadge color="success">Success</IBadge>
      <IBadge color="warning">Warning</IBadge>
      <IBadge color="error">Error</IBadge>
      <IBadge color="info">Info</IBadge>
    </div>
  );
});
