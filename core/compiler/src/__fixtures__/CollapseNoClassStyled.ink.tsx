import { defineComponent, createMemo } from "@inkline/core";
import HeadlessBox from "./HeadlessBox.ink.tsx";

// Collapses onto a headless child whose root has NO class attribute: the host `[class]` is the
// styled recipe merged with klass (no base class to prepend).
export interface CollapseNoClassStyledProps {
  label?: string;
}

export default defineComponent(
  { meta: { headless: true } },
  (props: CollapseNoClassStyledProps) => {
    const cls = createMemo(() => "nc--x");
    return <HeadlessBox class={cls()} label={props.label} />;
  },
);
