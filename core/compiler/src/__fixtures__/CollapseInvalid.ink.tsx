import { defineComponent } from "@inkline/core";
import HeadlessFragmentRoot from "./HeadlessFragmentRoot.ink.tsx";

// A headless styled wrapper whose root headless child has a non-element (fragment) root, so the
// Angular collapse cannot inline it: the target warns (INK0111) and emits only the element wrapper.
export default defineComponent({ meta: { headless: true } }, () => {
  return <HeadlessFragmentRoot />;
});
