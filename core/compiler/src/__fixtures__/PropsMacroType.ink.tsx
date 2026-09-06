import { defineComponent, defineProps } from "@inkline/core";

export interface PropsMacroTypeProps {
  label: string;
  size?: string;
}

// The type form. `defineProps` declares the props at the call site, so the setup parameter carries
// no annotation — the two are separate channels and declaring through both is INK0047.
//
// The root is a fragment so the fixture stays out of the Solid attribute-passthrough defect
// quarantined in `typecheck-fixtures.ts`, which is about the root element's type and not about how
// the props were declared. Attribute passthrough already has ~60 fixtures covering it.
export default defineComponent(() => {
  const props = defineProps<PropsMacroTypeProps>();
  return (
    <>
      <h1>{props.label}</h1>
      <p>{props.size}</p>
    </>
  );
});
