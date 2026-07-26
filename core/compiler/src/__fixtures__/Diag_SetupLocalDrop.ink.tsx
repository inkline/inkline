import { defineComponent } from "@inkline/core";

// A setup-body local whose initializer is neither an arrow nor a function expression: codegen
// cannot emit a definition for it, yet the render references it — INK0121.
export default defineComponent(() => {
  const label = ["Hello", "world"].join(" ");
  return <div>{label}</div>;
});
