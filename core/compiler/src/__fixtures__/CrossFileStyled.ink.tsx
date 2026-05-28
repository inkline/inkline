import { defineComponent, Slot } from "@inkline/core";
import CrossFileBase, { type CrossFileBaseProps } from "./CrossFileBase.ink.tsx";

export interface CrossFileStyledProps extends CrossFileBaseProps {
  size?: string;
}

export default defineComponent({ slots: { default: {} } }, (props: CrossFileStyledProps) => {
  return (
    <CrossFileBase class={props.size} label={props.label}>
      <Slot>{props.label}</Slot>
    </CrossFileBase>
  );
});
