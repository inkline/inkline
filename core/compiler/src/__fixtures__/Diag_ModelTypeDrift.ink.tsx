import { defineComponent, defineModel } from "@inkline/core";

// Both sides name `count`, but the type-only declaration says `String` where defineModel says
// `number`: a parent binding to it type-checks against a shape the compiler never emits — INK0094.
export default defineComponent({ models: { count: String } }, () => {
  const [count, setCount] = defineModel<number>("count");
  return (
    <button type="button" onClick={() => setCount(count() + 1)}>
      {count()}
    </button>
  );
});
