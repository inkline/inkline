import { defineComponent } from "@inkline/core";

// A minimal headless component whose root has NO class attribute and a phrasing (inline) child:
// exercises the `[class]: klass()` fallback host binding and the inline children-template path.
export interface HeadlessBoxProps {
  label?: string;
}

export default defineComponent({ meta: { headless: true } }, (props: HeadlessBoxProps) => {
  return <div>{props.label}</div>;
});
