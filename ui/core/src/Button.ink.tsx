// @ts-nocheck
import { defineComponent } from "@inkline/core";

export interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export default defineComponent((props: { label: string; disabled?: boolean }) => {
  return <button disabled={props.disabled}>{props.label}</button>;
});
