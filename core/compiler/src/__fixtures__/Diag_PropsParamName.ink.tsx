import { defineComponent } from "@inkline/core";

export interface PropsParamNameProps {
  label: string;
}

// The annotation channel reaches the same broken output through the setup parameter: the props
// object is bound to `p`, and `p.label` names an identifier the generated component never
// declares. INK0074, from the same rule as the macro channel's.
export default defineComponent((p: PropsParamNameProps) => {
  return <div>{p.label}</div>;
});
