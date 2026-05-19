// @ts-nocheck
import { defineComponent } from "@inkline/core";

export default defineComponent((props: { label: string; disabled?: boolean }) => {
  return <button disabled={props.disabled}>{props.label}</button>;
});
