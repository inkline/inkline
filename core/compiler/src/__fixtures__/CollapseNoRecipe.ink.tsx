import { defineComponent } from "@inkline/core";
import CollapseBase from "./CollapseBase.ink.tsx";

// A headless pass-through wrapper with NO styling class of its own: the collapse forwards behavior
// only, so the host `[class]` is just the child's base class merged with klass (no recipe).
export default defineComponent(
  { meta: { headless: true } },
  (props: { label?: string; disabled?: boolean }) => {
    return <CollapseBase label={props.label} disabled={props.disabled} />;
  },
);
