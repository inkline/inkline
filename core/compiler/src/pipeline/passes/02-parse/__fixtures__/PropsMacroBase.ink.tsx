import { defineComponent } from "@inkline/core";

export interface PropsMacroBaseProps {
  label: string;
  size?: string;
}

export default defineComponent((props: PropsMacroBaseProps) => {
  return <span class={props.size}>{props.label}</span>;
});
