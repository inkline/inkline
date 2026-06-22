import { defineComponent, Slot, createMemo } from "@inkline/core";
import CollapseNestedShell, { type CollapseNestedShellProps } from "./CollapseNestedShell.ink.tsx";
import CollapseNestedLeaf from "./CollapseNestedLeaf.ink.tsx";
import CollapseNestedInput from "./CollapseNestedInput.ink.tsx";

// Styled composite (like IInput): its root is the headless shell, but it projects a nested headless
// leaf into the shell's slot. The Angular collapse must inline the shell as the host, substitute the
// shell's `<Slot>` with this content, and render the leaf as an attribute-selector child.
export interface CollapseNestedProps extends CollapseNestedShellProps {
  size?: "sm" | "md";
  disabled?: boolean;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CollapseNestedProps) => {
    const shellCls = createMemo(() => (props.size === "sm" ? "shell--sm" : "shell--md"));
    const leafCls = createMemo(() => "leaf--x");
    return (
      <CollapseNestedShell id={props.id} class={shellCls()}>
        <CollapseNestedLeaf class={leafCls()}>
          <Slot />
        </CollapseNestedLeaf>
        <CollapseNestedInput disabled={props.disabled} />
      </CollapseNestedShell>
    );
  },
);
