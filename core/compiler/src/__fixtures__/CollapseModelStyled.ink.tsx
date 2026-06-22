import { defineComponent, defineModel, createMemo } from "@inkline/core";
import CollapseModelBase, { type CollapseModelBaseProps } from "./CollapseModelBase.ink.tsx";

// Styled wrapper that collapses onto a model-bearing headless child: the merged host must declare the
// `open` model and emit the child's `(click)` as `open.set(...)`, with the recipe class merged in.
export interface CollapseModelStyledProps extends CollapseModelBaseProps {
  variant?: "a" | "b";
}

export default defineComponent({ meta: { headless: true } }, (props: CollapseModelStyledProps) => {
  const [open, _setOpen] = defineModel<boolean>("open");
  const className = createMemo(() => (open() ? "cm--open" : "cm--closed"));
  return <CollapseModelBase class={className()} $bind:open={open} disabled={props.disabled} />;
});
