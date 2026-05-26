import { defineComponent } from "@inkline/core";
import IBadge from "../styled/IBadge.ink.tsx";

export default defineComponent(() => {
  return (
    <div>
      <IBadge size="xs">Extra Small</IBadge>
      <IBadge size="sm">Small</IBadge>
      <IBadge size="md">Medium</IBadge>
      <IBadge size="lg">Large</IBadge>
      <IBadge size="xl">Extra Large</IBadge>
    </div>
  );
});
