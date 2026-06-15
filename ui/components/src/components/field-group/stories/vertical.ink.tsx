import { defineComponent } from "@inkline/core";
import IFieldGroup from "../styled/IFieldGroup.ink.tsx";
import IButton from "../../button/styled/IButton.ink.tsx";

// A vertical group stacks its direct children, collapsing the seams between them.
export default defineComponent(() => {
  return (
    <IFieldGroup orientation="vertical">
      <IButton label="Top" />
      <IButton label="Middle" />
      <IButton label="Bottom" />
    </IFieldGroup>
  );
});
