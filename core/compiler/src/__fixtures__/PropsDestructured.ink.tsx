import { defineComponent, defineProps } from "@inkline/core";

export interface PropsDestructuredProps {
  label: string;
  size?: string;
  tone?: string;
}

// Destructuring the props object in the setup body, in all three supported shapes: plain (`tone`),
// renamed (`label: text`), and renamed + defaulted (`size: dimension = "md"`). Each local is an
// alias of the prop it names, so every target must read it exactly as it reads `props.<prop>`.
//
// The root is a fragment for the same reason as `PropsMacroType`: it keeps the fixture out of the
// Solid attribute-passthrough defect quarantined in `typecheck-fixtures.ts`.
export default defineComponent(() => {
  const props = defineProps<PropsDestructuredProps>();
  const { label: text, size: dimension = "md", tone } = props;
  return (
    <>
      <h1 title={text}>{text}</h1>
      <p>{dimension}</p>
      <span>{tone}</span>
    </>
  );
});
